import type { Env } from '../../env';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// SHA-256 hash using Web Crypto API (constant-time via built-in)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Constant-time string comparison to prevent timing attacks
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

// Generate a cryptographically secure 64-character session token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── POST /api/auth/login ── validates credentials, creates session
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  try {
    // Guard: ensure KV binding is available
    if (!env || !env.BVHDATA) {
      return Response.json(
        { error: 'Server configuration error. Please contact the site owner.' },
        { status: 503, headers: CORS }
      );
    }

    // Rate limit: max 5 attempts per IP per 15 minutes
    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const rateLimitKey = `ratelimit:login:${ip}`;
    const attemptsRaw = await env.BVHDATA.get(rateLimitKey);
    const attempts = attemptsRaw ? parseInt(attemptsRaw, 10) : 0;

    if (attempts >= 5) {
      return Response.json(
        { error: 'Too many login attempts. Please try again in 15 minutes.' },
        { status: 429, headers: CORS }
      );
    }

    const body = await request.json() as { username?: string; password?: string };
    const { username, password } = body;

    if (!username || !password) {
      return Response.json({ error: 'Username and password are required' }, { status: 400, headers: CORS });
    }

    // Sanitize username
    const cleanUser = username.toLowerCase().trim();

    // Look up stored credential hash
    const storedHash = await env.BVHDATA.get(`creds:${cleanUser}`);

    // Always hash the input (prevents timing oracle even on unknown users)
    const inputHash = await hashPassword(password);

    if (!storedHash || !safeCompare(inputHash, storedHash)) {
      // Increment rate limit counter (TTL: 15 minutes)
      await env.BVHDATA.put(rateLimitKey, String(attempts + 1), { expirationTtl: 900 });
      return Response.json({ error: 'Invalid username or password' }, { status: 401, headers: CORS });
    }

    // Success — reset rate limit
    await env.BVHDATA.delete(rateLimitKey);

    // Create session token (no expiration — stays valid until logout)
    const token = generateToken();
    const displayName = (await env.BVHDATA.get(`name:${cleanUser}`)) ?? username;
    await env.BVHDATA.put(`session:${token}`, displayName);

    return Response.json({ ok: true, token, ownerName: displayName }, { headers: CORS });
  } catch (e) {
    console.error('Login error:', e);
    return Response.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500, headers: CORS });
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS });
};
