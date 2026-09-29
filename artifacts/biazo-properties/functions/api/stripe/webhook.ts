import type { Env } from '../../env';

// ── POST /api/stripe/webhook ─────────────────────────────────────────────────
// Called by Stripe when payment events occur.
// INACTIVE until STRIPE_WEBHOOK_SECRET is set as a Cloudflare Secret.
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  const webhookSecret = (env as any).STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return new Response('Stripe webhook not configured', { status: 503 });
  }

  try {
    const sig = request.headers.get('Stripe-Signature') ?? '';
    const rawBody = await request.text();

    // Verify webhook signature
    const encoder = new TextEncoder();
    const parts = sig.split(',');
    const timestamp = parts.find(p => p.startsWith('t='))?.slice(2) ?? '';
    const v1 = parts.find(p => p.startsWith('v1='))?.slice(3) ?? '';

    const payload = `${timestamp}.${rawBody}`;
    const key = await crypto.subtle.importKey(
      'raw', encoder.encode(webhookSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sigBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const computedSig = Array.from(new Uint8Array(sigBytes)).map(b => b.toString(16).padStart(2, '0')).join('');

    if (computedSig !== v1) {
      return new Response('Invalid signature', { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;
      if (!bookingId) return new Response('No bookingId in metadata', { status: 400 });

      const raw = await env.BVHDATA.get(`booking:${bookingId}`);
      if (!raw) return new Response('Booking not found', { status: 404 });

      const booking = JSON.parse(raw);
      const updated = {
        ...booking,
        status: 'confirmed',
        paymentMethod: 'stripe',
        updatedAt: new Date().toISOString(),
        stripePaymentIntent: session.payment_intent,
      };
      await env.BVHDATA.put(`booking:${bookingId}`, JSON.stringify(updated));

      // Send confirmation email to guest
      const resendKey = (env as any).RESEND_API_KEY;
      if (resendKey && booking.guestEmail) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Biazo Vacation Homes <noreply@biazo-properties.pages.dev>',
            to: [booking.guestEmail],
            subject: `Payment Confirmed — ${booking.residenceName} · ${bookingId}`,
            html: `
              <h2 style="color:#263442;font-family:Georgia,serif">Payment Received — You're all set! 🎉</h2>
              <p style="font-family:sans-serif;font-size:14px">Dear ${booking.guestName},</p>
              <p style="font-family:sans-serif;font-size:14px">Your payment of <strong>AED ${booking.totalAed.toLocaleString()}</strong> has been received and your stay at <strong>${booking.residenceName}</strong> is confirmed.</p>
              <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
                <tr><td style="padding:8px;color:#666">Booking ID</td><td style="padding:8px;font-weight:bold;color:#c56749">${bookingId}</td></tr>
                <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Check-In</td><td style="padding:8px">${booking.checkIn} from 3:00 PM</td></tr>
                <tr><td style="padding:8px;color:#666">Check-Out</td><td style="padding:8px">${booking.checkOut} by 11:00 AM</td></tr>
              </table>
              <p style="font-family:sans-serif;font-size:14px;margin-top:20px">Our concierge will be in touch soon with check-in details.</p>
              <p style="font-family:sans-serif;font-size:14px;color:#666">Biazo Vacation Homes · Dubai, UAE</p>
            `,
          }),
        });
      }
    }

    if (event.type === 'checkout.session.expired') {
      // Session expired without payment — release dates
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;
      if (bookingId) {
        const raw = await env.BVHDATA.get(`booking:${bookingId}`);
        if (raw) {
          const booking = JSON.parse(raw);
          if (booking.status === 'pending_payment') {
            // Unblock dates
            const residencesRaw = await env.BVHDATA.get('residences', 'json') as any[] | null;
            if (residencesRaw) {
              const updated = residencesRaw.map((r: any) => {
                if (r.id !== booking.residenceId) return r;
                return {
                  ...r,
                  bookedRanges: (r.bookedRanges ?? []).filter((br: any) => br.bookingId !== bookingId),
                };
              });
              await env.BVHDATA.put('residences', JSON.stringify(updated));
            }
            await env.BVHDATA.put(`booking:${bookingId}`, JSON.stringify({ ...booking, status: 'cancelled', updatedAt: new Date().toISOString() }));
          }
        }
      }
    }

    return new Response('ok', { status: 200 });
  } catch (e) {
    console.error('Webhook error:', e);
    return new Response(String(e), { status: 500 });
  }
};
