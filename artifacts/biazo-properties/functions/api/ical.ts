import type { Env } from '../env';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function verifyAdmin(env: Env, request: Request): Promise<string | null> {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return null;
  return await env.BVHDATA.get(`session:${token}`);
}

// Parse iCal VEVENT blocks and extract DTSTART/DTEND date ranges
function parseIcal(icalText: string): { start: string; end: string; summary?: string }[] {
  const ranges: { start: string; end: string; summary?: string }[] = [];
  const events = icalText.split('BEGIN:VEVENT');

  for (let i = 1; i < events.length; i++) {
    const block = events[i];
    const toDate = (str: string): string => {
      // Handle YYYYMMDD and YYYYMMDDTHHmmssZ formats
      const d = str.replace(/[T\s].*/, '').replace(/-/g, '');
      if (d.length === 8) return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
      return str;
    };
    const dtstart = block.match(/DTSTART(?:;[^:]*)?:(\S+)/)?.[1];
    const dtend = block.match(/DTEND(?:;[^:]*)?:(\S+)/)?.[1];
    const summary = block.match(/SUMMARY:(.+)/)?.[1]?.trim();

    if (dtstart && dtend) {
      ranges.push({ start: toDate(dtstart), end: toDate(dtend), summary });
    }
  }
  return ranges;
}

// ── GET /api/ical — list iCal feeds for all residences (admin)
export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  if (!env?.BVHDATA) return Response.json({ error: 'Service unavailable' }, { status: 503, headers: CORS });
  const owner = await verifyAdmin(env, request);
  if (!owner) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: CORS });

  const raw = await env.BVHDATA.get('ical:feeds');
  return Response.json(raw ? JSON.parse(raw) : {}, { headers: CORS });
};

// ── POST /api/ical — save iCal feed URL for a residence (admin)
// Body: { residenceId, url, label? }
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  if (!env?.BVHDATA) return Response.json({ error: 'Service unavailable' }, { status: 503, headers: CORS });
  const owner = await verifyAdmin(env, request);
  if (!owner) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: CORS });

  const { residenceId, url, label } = await request.json() as { residenceId: string; url: string; label?: string };
  if (!residenceId || !url) return Response.json({ error: 'residenceId and url are required' }, { status: 400, headers: CORS });

  const raw = await env.BVHDATA.get('ical:feeds');
  const feeds: Record<string, { url: string; label?: string; lastSynced?: string }[]> = raw ? JSON.parse(raw) : {};
  if (!feeds[residenceId]) feeds[residenceId] = [];
  feeds[residenceId].push({ url, label: label ?? 'External calendar' });
  await env.BVHDATA.put('ical:feeds', JSON.stringify(feeds));

  return Response.json({ ok: true }, { headers: CORS });
};

// ── DELETE /api/ical — remove iCal feed (admin)
// Body: { residenceId, url }
export const onRequestDelete: PagesFunction<Env> = async ({ env, request }) => {
  if (!env?.BVHDATA) return Response.json({ error: 'Service unavailable' }, { status: 503, headers: CORS });
  const owner = await verifyAdmin(env, request);
  if (!owner) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: CORS });

  const { residenceId, url } = await request.json() as { residenceId: string; url: string };
  const raw = await env.BVHDATA.get('ical:feeds');
  const feeds: Record<string, { url: string; label?: string; lastSynced?: string }[]> = raw ? JSON.parse(raw) : {};
  if (feeds[residenceId]) {
    feeds[residenceId] = feeds[residenceId].filter(f => f.url !== url);
  }
  await env.BVHDATA.put('ical:feeds', JSON.stringify(feeds));
  return Response.json({ ok: true }, { headers: CORS });
};

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, { status: 204, headers: CORS });

// Export parser for use by the cron worker
export { parseIcal };
