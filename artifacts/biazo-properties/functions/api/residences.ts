import type { Env } from '../env';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ── GET /api/residences ── public, returns all residence data from KV
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const data = await env.BVHDATA.get('residences', 'json');
    if (!data) return Response.json({ error: 'Not seeded yet' }, { status: 404, headers: CORS });
    return Response.json(data, { headers: CORS });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500, headers: CORS });
  }
};

// ── PUT /api/residences ── admin only, updates all residence data in KV
export const onRequestPut: PagesFunction<Env> = async ({ env, request }) => {
  try {
    // Validate session token
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) return new Response('Unauthorized', { status: 401, headers: CORS });
    const session = await env.BVHDATA.get(`session:${token}`);
    if (!session) return new Response('Session expired. Please log in again.', { status: 401, headers: CORS });

    const body = await request.json() as unknown[];
    await env.BVHDATA.put('residences', JSON.stringify(body));
    return Response.json({ ok: true, updatedBy: session, updatedAt: new Date().toISOString() }, { headers: CORS });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500, headers: CORS });
  }
};

// ── OPTIONS ── preflight
export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS });
};
