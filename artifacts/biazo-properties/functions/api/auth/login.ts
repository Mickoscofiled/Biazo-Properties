import type { Env } from '../../env';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Simple SHA-256 hash for password comparison (Web Crypto API)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate a random session token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── POST /api/auth/login ── validates credentials, creates session
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  try {
    const { username, password } = await request.json() as { username: string; password: string };

    if (!username || !password) {
      return Response.json({ error: 'Username and password required' }, { status: 400, headers: CORS });
    }

    // Look up stored credential for this username
    const storedHash = await env.BVHDATA.get(`creds:${username.toLowerCase().trim()}`);
    if (!storedHash) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401, headers: CORS });
    }

    const inputHash = await hashPassword(password);
    if (inputHash !== storedHash) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401, headers: CORS });
    }

    // Create session token — expires in 7 days
    const token = generateToken();
    const displayName = await env.BVHDATA.get(`name:${username.toLowerCase().trim()}`) ?? username;
    await env.BVHDATA.put(`session:${token}`, displayName, { expirationTtl: 60 * 60 * 24 * 7 });

    return Response.json({ ok: true, token, ownerName: displayName }, { headers: CORS });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500, headers: CORS });
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS });
};
