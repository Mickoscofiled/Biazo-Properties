import type { Env } from '../../env';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ── GET /api/auth/me ── checks if session token is still valid
export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  if (!env || !env.BVHDATA) {
    return Response.json({ authenticated: false, error: 'KV binding missing' }, { status: 503, headers: CORS });
  }
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return Response.json({ authenticated: false }, { headers: CORS });
  const ownerName = await env.BVHDATA.get(`session:${token}`);
  if (!ownerName) return Response.json({ authenticated: false }, { headers: CORS });
  return Response.json({ authenticated: true, ownerName }, { headers: CORS });
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS });
};
