import type { Env } from '../env';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Parse iCal VEVENT blocks and extract DTSTART/DTEND date ranges
function parseIcal(icalText: string): { start: string; end: string; summary?: string }[] {
  const ranges: { start: string; end: string; summary?: string }[] = [];
  const events = icalText.split('BEGIN:VEVENT');

  for (let i = 1; i < events.length; i++) {
    const block = events[i];
    const toDate = (str: string): string => {
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

// ── GET /api/residences ── public, returns all residence data from KV
export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  try {
    if (!env || !env.BVHDATA) {
      return Response.json({ error: 'KV binding missing' }, { status: 503, headers: CORS });
    }
    
    const url = new URL(request.url);
    const doSync = url.searchParams.get('sync') === 'true';
    
    let rawResidences = await env.BVHDATA.get('residences', 'json') as any[];
    if (!rawResidences) return Response.json({ error: 'Not seeded yet' }, { status: 404, headers: CORS });
    
    if (doSync) {
      const rawFeeds = await env.BVHDATA.get('ical:feeds');
      const feeds: Record<string, { url: string; label?: string }[]> = rawFeeds ? JSON.parse(rawFeeds) : {};
      
      let modified = false;
      const syncPromises = rawResidences.map(async (residence) => {
        if (!feeds[residence.id] || feeds[residence.id].length === 0) return;
        
        let externalRanges: { start: string; end: string; icalSynced: boolean; icalSource: string }[] = [];
        
        for (const feed of feeds[residence.id]) {
          try {
            const res = await fetch(feed.url, { headers: { 'User-Agent': 'Biazo-iCal-Sync/1.0' } });
            if (res.ok) {
              const text = await res.text();
              const parsed = parseIcal(text);
              const mapped = parsed.map(p => ({
                start: p.start,
                end: p.end,
                icalSynced: true,
                icalSource: feed.label || 'iCal Sync'
              }));
              externalRanges = [...externalRanges, ...mapped];
            }
          } catch {
            // Ignore fetch errors to prevent breaking the API
          }
        }
        
        if (externalRanges.length > 0) {
          // Keep existing non-iCal ranges (manual and direct bookings)
          const manualRanges = (residence.bookedRanges ?? []).filter((r: any) => !r.icalSynced);
          // Combine and deduplicate
          const combined = [...manualRanges, ...externalRanges];
          // Remove exact duplicates to save KV space
          const unique = Array.from(new Set(combined.map(r => JSON.stringify(r)))).map(r => JSON.parse(r));
          
          if (JSON.stringify(residence.bookedRanges) !== JSON.stringify(unique)) {
            residence.bookedRanges = unique;
            modified = true;
          }
        }
      });
      
      await Promise.all(syncPromises);
      
      if (modified) {
        await env.BVHDATA.put('residences', JSON.stringify(rawResidences));
      }
    }

    return Response.json(rawResidences, { headers: CORS });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500, headers: CORS });
  }
};

// ── PUT /api/residences ── admin only, updates all residence data in KV
export const onRequestPut: PagesFunction<Env> = async ({ env, request }) => {
  try {
    if (!env || !env.BVHDATA) {
      return Response.json({ error: 'KV binding missing' }, { status: 503, headers: CORS });
    }

    // Validate session token
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) return new Response('Unauthorized', { status: 401, headers: CORS });
    const session = await env.BVHDATA.get(`session:${token}`);
    if (!session) return new Response('Session invalid. Please log in again.', { status: 401, headers: CORS });

    const body = await request.json() as unknown[];
    if (!Array.isArray(body)) {
      return Response.json({ error: 'Invalid data format' }, { status: 400, headers: CORS });
    }

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
