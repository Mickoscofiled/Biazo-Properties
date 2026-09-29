import type { Env } from '../../env';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ── POST /api/stripe/checkout ────────────────────────────────────────────────
// Creates a Stripe Checkout Session for a pending booking.
// INACTIVE until STRIPE_SECRET_KEY is set as a Cloudflare Secret.
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  const stripeKey = (env as any).STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return Response.json(
      { error: 'Stripe is not configured yet. Please use WhatsApp or Pay on Arrival.' },
      { status: 503, headers: CORS }
    );
  }

  try {
    const { bookingId } = await request.json() as { bookingId: string };
    if (!bookingId) return Response.json({ error: 'bookingId required' }, { status: 400, headers: CORS });

    const raw = await env.BVHDATA.get(`booking:${bookingId}`);
    if (!raw) return Response.json({ error: 'Booking not found' }, { status: 404, headers: CORS });

    const booking = JSON.parse(raw);
    const amountAed = Math.round(booking.totalAed * 100); // Stripe uses smallest currency unit (fils)

    const params = new URLSearchParams({
      'payment_method_types[]': 'card',
      'line_items[0][price_data][currency]': 'aed',
      'line_items[0][price_data][unit_amount]': String(amountAed),
      'line_items[0][price_data][product_data][name]': `${booking.residenceName} (${booking.checkIn} → ${booking.checkOut})`,
      'line_items[0][quantity]': '1',
      mode: 'payment',
      'metadata[bookingId]': bookingId,
      'customer_email': booking.guestEmail,
      success_url: `https://biazo-properties.pages.dev/?booking_success=${bookingId}`,
      cancel_url: `https://biazo-properties.pages.dev/?booking_cancel=${bookingId}`,
    });

    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await resp.json() as any;
    if (!resp.ok) {
      return Response.json({ error: session.error?.message ?? 'Stripe error' }, { status: 500, headers: CORS });
    }

    // Store session ID on booking
    const updated = { ...booking, stripeSessionId: session.id, status: 'pending_payment' };
    await env.BVHDATA.put(`booking:${bookingId}`, JSON.stringify(updated));

    return Response.json({ url: session.url }, { headers: CORS });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500, headers: CORS });
  }
};

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, { status: 204, headers: CORS });
