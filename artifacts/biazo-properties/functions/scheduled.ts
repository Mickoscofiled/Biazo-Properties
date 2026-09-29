import type { Env } from './env';

// Parse iCal VEVENT blocks and extract date ranges
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

// ── Cloudflare Cron Trigger ─────────────────────────────────────────────────
// Runs every 6 hours. Fetches all iCal feeds from KV, parses booked dates,
// and syncs them to the bookedRanges of each residence in KV.
export default {
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext) {
    console.log('[iCal Sync] Starting scheduled sync...');

    const feedsRaw = await env.BVHDATA.get('ical:feeds');
    if (!feedsRaw) {
      console.log('[iCal Sync] No iCal feeds configured. Exiting.');
      return;
    }

    const feeds: Record<string, { url: string; label?: string; lastSynced?: string }[]> = JSON.parse(feedsRaw);
    const residencesRaw = await env.BVHDATA.get('residences', 'json') as any[] | null;
    if (!residencesRaw) {
      console.log('[iCal Sync] No residences found in KV. Exiting.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    let anyUpdated = false;

    const updatedResidences = await Promise.all(
      residencesRaw.map(async (residence: any) => {
        const residenceFeeds = feeds[residence.id];
        if (!residenceFeeds || residenceFeeds.length === 0) return residence;

        // Remove any ical-synced ranges older than today to clean up
        const existingRanges: any[] = (residence.bookedRanges ?? []).filter(
          (br: any) => !br.icalSynced || br.end >= today
        );

        // Fetch all feeds for this residence
        const newIcalRanges: any[] = [];
        const updatedFeeds: typeof residenceFeeds = [];

        for (const feed of residenceFeeds) {
          try {
            const resp = await fetch(feed.url, {
              headers: { 'User-Agent': 'Biazo-Vacation-Homes/1.0' },
              signal: AbortSignal.timeout(8000),
            });
            if (!resp.ok) {
              console.warn(`[iCal Sync] Failed to fetch ${feed.url}: ${resp.status}`);
              updatedFeeds.push(feed);
              continue;
            }
            const text = await resp.text();
            const ranges = parseIcal(text);

            // Only keep future dates
            for (const r of ranges) {
              if (r.end >= today) {
                newIcalRanges.push({
                  start: r.start,
                  end: r.end,
                  icalSynced: true,
                  icalSource: feed.label ?? feed.url,
                  summary: r.summary,
                });
              }
            }

            updatedFeeds.push({ ...feed, lastSynced: new Date().toISOString() });
            console.log(`[iCal Sync] ${residence.name}: fetched ${ranges.length} events from ${feed.label ?? feed.url}`);
          } catch (e) {
            console.error(`[iCal Sync] Error fetching ${feed.url}:`, e);
            updatedFeeds.push(feed);
          }
        }

        // Update feed metadata with lastSynced timestamps
        feeds[residence.id] = updatedFeeds;

        // Merge: keep manual bookings, replace ical-synced ones
        const manualRanges = existingRanges.filter((br: any) => !br.icalSynced);
        const mergedRanges = [...manualRanges, ...newIcalRanges];

        if (JSON.stringify(mergedRanges) !== JSON.stringify(existingRanges)) {
          anyUpdated = true;
        }

        return { ...residence, bookedRanges: mergedRanges };
      })
    );

    // Save updated residences
    await env.BVHDATA.put('residences', JSON.stringify(updatedResidences));

    // Save updated feed metadata (with lastSynced)
    await env.BVHDATA.put('ical:feeds', JSON.stringify(feeds));

    console.log(`[iCal Sync] Completed. Residences updated: ${anyUpdated ? 'yes' : 'no changes'}`);
  },
};
