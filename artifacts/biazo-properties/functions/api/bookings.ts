import type { Env } from '../env';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export interface Booking {
  id: string;
  residenceId: string;
  residenceName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  nights: number;
  guests: number;
  totalAed: number;
  currency: 'AED' | 'USD';
  specialRequests?: string;
  paymentMethod: 'card' | 'arrival' | 'whatsapp' | 'stripe';
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
  updatedBy?: string;
  stripeSessionId?: string;
}

function generateId(): string {
  return `BVH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function isAdmin(token: string | null): Promise<string | null> {
  return Promise.resolve(token); // we verify against KV in the handler
}

async function verifyAdmin(env: Env, request: Request): Promise<string | null> {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return null;
  return await env.BVHDATA.get(`session:${token}`);
}

// ── Helper: block dates on a residence ──────────────────────────────────────
async function blockDates(env: Env, residenceId: string, checkIn: string, checkOut: string, bookingId: string) {
  const residencesRaw = await env.BVHDATA.get('residences', 'json') as any[] | null;
  if (!residencesRaw) return;

  const updated = residencesRaw.map((r: any) => {
    if (r.id !== residenceId) return r;
    const bookedRanges = r.bookedRanges ?? [];
    // Remove any existing range with same bookingId (idempotent)
    const filtered = bookedRanges.filter((br: any) => br.bookingId !== bookingId);
    return { ...r, bookedRanges: [...filtered, { start: checkIn, end: checkOut, bookingId }] };
  });
  await env.BVHDATA.put('residences', JSON.stringify(updated));
}

// ── Helper: unblock dates on a residence ────────────────────────────────────
async function unblockDates(env: Env, residenceId: string, bookingId: string) {
  const residencesRaw = await env.BVHDATA.get('residences', 'json') as any[] | null;
  if (!residencesRaw) return;

  const updated = residencesRaw.map((r: any) => {
    if (r.id !== residenceId) return r;
    return {
      ...r,
      bookedRanges: (r.bookedRanges ?? []).filter((br: any) => br.bookingId !== bookingId),
    };
  });
  await env.BVHDATA.put('residences', JSON.stringify(updated));
}

// ── Helper: get all bookings ─────────────────────────────────────────────────
async function getAllBookings(env: Env): Promise<Booking[]> {
  const indexRaw = await env.BVHDATA.get('bookings:index');
  if (!indexRaw) return [];
  const ids: string[] = JSON.parse(indexRaw);
  const bookings = await Promise.all(
    ids.map(async (id) => {
      const raw = await env.BVHDATA.get(`booking:${id}`);
      return raw ? (JSON.parse(raw) as Booking) : null;
    })
  );
  return bookings.filter(Boolean) as Booking[];
}

// ── Helper: send email via Resend ────────────────────────────────────────────
async function sendEmail(env: Env, to: string, subject: string, html: string) {
  const apiKey = (env as any).RESEND_API_KEY;
  if (!apiKey) return; // Resend not configured yet — skip silently
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Biazo Vacation Homes <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
      }),
    });
  } catch {
    // Email failure should not break the booking flow
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST /api/bookings — Guest submits a booking request
// ═══════════════════════════════════════════════════════════════════════════════
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  try {
    if (!env?.BVHDATA) return Response.json({ error: 'Service unavailable' }, { status: 503, headers: CORS });

    const body = await request.json() as Partial<Booking>;
    const { residenceId, residenceName, guestName, guestEmail, guestPhone, checkIn, checkOut, nights, guests, totalAed, currency, specialRequests, paymentMethod } = body;

    if (!residenceId || !guestName || !guestEmail || !guestPhone || !checkIn || !checkOut) {
      return Response.json({ error: 'Missing required fields' }, { status: 400, headers: CORS });
    }

    // Check for date conflicts
    const residencesRaw = await env.BVHDATA.get('residences', 'json') as any[] | null;
    const residence = residencesRaw?.find((r: any) => r.id === residenceId);
    if (residence) {
      const conflict = (residence.bookedRanges ?? []).some(
        (br: any) => checkIn! < br.end && checkOut! > br.start
      );
      if (conflict) {
        return Response.json({ error: 'Selected dates are no longer available. Please choose different dates.' }, { status: 409, headers: CORS });
      }
    }

    const booking: Booking = {
      id: generateId(),
      residenceId: residenceId!,
      residenceName: residenceName ?? '',
      guestName: guestName!,
      guestEmail: guestEmail!,
      guestPhone: guestPhone!,
      checkIn: checkIn!,
      checkOut: checkOut!,
      nights: nights ?? 1,
      guests: guests ?? 1,
      totalAed: totalAed ?? 0,
      currency: currency ?? 'AED',
      specialRequests,
      paymentMethod: paymentMethod ?? 'whatsapp',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save booking
    await env.BVHDATA.put(`booking:${booking.id}`, JSON.stringify(booking));

    // Update index
    const indexRaw = await env.BVHDATA.get('bookings:index');
    const index: string[] = indexRaw ? JSON.parse(indexRaw) : [];
    index.unshift(booking.id);
    await env.BVHDATA.put('bookings:index', JSON.stringify(index));

    // Block dates on residence
    await blockDates(env, residenceId!, checkIn!, checkOut!, booking.id);

    // Notify owners via email
    const ownerEmails = ['mikiasdereje45@gmail.com']; // fallback; can be stored in KV
    const storedEmails = await env.BVHDATA.get('owner:emails');
    const emails: string[] = storedEmails ? JSON.parse(storedEmails) : ownerEmails;

    const ownerHtml = `
      <h2 style="color:#263442;font-family:Georgia,serif">New Booking Request — ${booking.id}</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:8px;color:#666">Residence</td><td style="padding:8px;font-weight:bold">${booking.residenceName}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Guest</td><td style="padding:8px">${booking.guestName}</td></tr>
        <tr><td style="padding:8px;color:#666">Email</td><td style="padding:8px">${booking.guestEmail}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Phone</td><td style="padding:8px">${booking.guestPhone}</td></tr>
        <tr><td style="padding:8px;color:#666">Check-In</td><td style="padding:8px">${booking.checkIn}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Check-Out</td><td style="padding:8px">${booking.checkOut}</td></tr>
        <tr><td style="padding:8px;color:#666">Nights</td><td style="padding:8px">${booking.nights}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Guests</td><td style="padding:8px">${booking.guests}</td></tr>
        <tr><td style="padding:8px;color:#666">Total (AED)</td><td style="padding:8px;font-weight:bold;color:#c56749">AED ${booking.totalAed.toLocaleString()}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Payment</td><td style="padding:8px">${booking.paymentMethod}</td></tr>
        ${booking.specialRequests ? `<tr><td style="padding:8px;color:#666">Special Requests</td><td style="padding:8px">${booking.specialRequests}</td></tr>` : ''}
      </table>
      <p style="margin-top:20px;font-family:sans-serif;font-size:14px">
        <strong>⚠️ These dates are currently blocked.</strong> Log in to the admin panel to 
        <a href="https://biazo-properties.pages.dev/admin" style="color:#c56749">Approve or Reject</a> this booking.
      </p>
    `;

    await Promise.all(emails.map(email => sendEmail(env, email, `New Booking Request: ${booking.residenceName} (${booking.checkIn} → ${booking.checkOut})`, ownerHtml)));

    return Response.json({ ok: true, bookingId: booking.id }, { headers: CORS });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Unexpected error. Please try again.' }, { status: 500, headers: CORS });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// GET /api/bookings — Admin: list all bookings
// ═══════════════════════════════════════════════════════════════════════════════
export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  try {
    if (!env?.BVHDATA) return Response.json({ error: 'Service unavailable' }, { status: 503, headers: CORS });

    const owner = await verifyAdmin(env, request);
    if (!owner) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: CORS });

    const bookings = await getAllBookings(env);
    // Sort newest first
    bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return Response.json(bookings, { headers: CORS });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500, headers: CORS });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PATCH /api/bookings — Admin: approve, reject, or cancel a booking
// Body: { bookingId, action: 'approve' | 'reject' | 'cancel' }
// ═══════════════════════════════════════════════════════════════════════════════
export const onRequestPatch: PagesFunction<Env> = async ({ env, request }) => {
  try {
    if (!env?.BVHDATA) return Response.json({ error: 'Service unavailable' }, { status: 503, headers: CORS });

    const owner = await verifyAdmin(env, request);
    if (!owner) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: CORS });

    const { bookingId, action } = await request.json() as { bookingId: string; action: string };
    if (!bookingId || !['approve', 'reject', 'cancel'].includes(action)) {
      return Response.json({ error: 'bookingId and action (approve/reject/cancel) are required' }, { status: 400, headers: CORS });
    }

    const raw = await env.BVHDATA.get(`booking:${bookingId}`);
    if (!raw) return Response.json({ error: 'Booking not found' }, { status: 404, headers: CORS });

    const booking: Booking = JSON.parse(raw);

    let newStatus: Booking['status'];
    if (action === 'approve') newStatus = 'confirmed';
    else if (action === 'reject') newStatus = 'rejected';
    else newStatus = 'cancelled';

    // Unblock dates if rejecting or cancelling
    if (action === 'reject' || action === 'cancel') {
      await unblockDates(env, booking.residenceId, bookingId);
    }

    const updated: Booking = { ...booking, status: newStatus, updatedAt: new Date().toISOString(), updatedBy: owner };
    await env.BVHDATA.put(`booking:${bookingId}`, JSON.stringify(updated));

    // Email guest
    if (action === 'approve') {
      const guestHtml = `
        <h2 style="color:#263442;font-family:Georgia,serif">Your booking is confirmed! 🎉</h2>
        <p style="font-family:sans-serif;font-size:14px">Dear ${booking.guestName},</p>
        <p style="font-family:sans-serif;font-size:14px">We are pleased to confirm your reservation at <strong>${booking.residenceName}</strong>.</p>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px;color:#666">Booking ID</td><td style="padding:8px;font-weight:bold;color:#c56749">${booking.id}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Check-In</td><td style="padding:8px">${booking.checkIn} from 3:00 PM</td></tr>
          <tr><td style="padding:8px;color:#666">Check-Out</td><td style="padding:8px">${booking.checkOut} by 11:00 AM</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Total</td><td style="padding:8px;font-weight:bold">AED ${booking.totalAed.toLocaleString()}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:14px;margin-top:20px">Our concierge will reach out shortly with check-in instructions.</p>
        <p style="font-family:sans-serif;font-size:14px;color:#666">Biazo Vacation Homes · Dubai, UAE</p>
      `;
      await sendEmail(env, booking.guestEmail, `Booking Confirmed — ${booking.residenceName} · ${booking.id}`, guestHtml);
    } else {
      const guestHtml = `
        <h2 style="color:#263442;font-family:Georgia,serif">Booking Update — ${booking.id}</h2>
        <p style="font-family:sans-serif;font-size:14px">Dear ${booking.guestName},</p>
        <p style="font-family:sans-serif;font-size:14px">We regret to inform you that your booking request for <strong>${booking.residenceName}</strong> (${booking.checkIn} → ${booking.checkOut}) could not be confirmed at this time.</p>
        <p style="font-family:sans-serif;font-size:14px">Please contact us on WhatsApp or try different dates. We look forward to welcoming you soon.</p>
        <p style="font-family:sans-serif;font-size:14px;color:#666">Biazo Vacation Homes · Dubai, UAE</p>
      `;
      await sendEmail(env, booking.guestEmail, `Booking Update — ${booking.residenceName}`, guestHtml);
    }

    return Response.json({ ok: true, booking: updated }, { headers: CORS });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500, headers: CORS });
  }
};

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, { status: 204, headers: CORS });
