import type { Env } from '../../env';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ── POST /api/auth/logout ── deletes session from KV
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (token) await env.BVHDATA.delete(`session:${token}`);
  return Response.json({ ok: true }, { headers: CORS });
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS });
};
