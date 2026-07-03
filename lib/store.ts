import fs from "node:fs";
import path from "node:path";

/**
 * Minimal file-backed store for page-view analytics and enquiries, read by
 * the admin panel. No external database required.
 *
 * ⚠ Storage caveat: on Vercel's serverless functions the filesystem is
 * ephemeral — this file resets on cold starts / redeploys. It works
 * reliably on a persistent-disk host (Railway, a VPS, `next start` on a
 * long-running box). For durable analytics on Vercel, swap this module for
 * Vercel KV / Upstash Redis / a Postgres table — the admin panel's read
 * shape (`getStats`) is the only thing that would need to stay the same.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "analytics.json");

const MAX_VISITS = 20000;
const MAX_ENQUIRIES = 2000;

type Visit = { path: string; ts: number; vid: string };
type Enquiry = Record<string, unknown> & { receivedAt: string; type: string };
type Store = { visits: Visit[]; enquiries: Enquiry[] };

function ensureFile(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({ visits: [], enquiries: [] } satisfies Store));
}

function readStore(): Store {
  try {
    ensureFile();
    const raw = fs.readFileSync(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      visits: Array.isArray(parsed.visits) ? parsed.visits : [],
      enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
    };
  } catch {
    return { visits: [], enquiries: [] };
  }
}

function writeStore(store: Store): void {
  try {
    ensureFile();
    fs.writeFileSync(FILE, JSON.stringify(store));
  } catch (err) {
    console.error("[alterra:store] write failed", err);
  }
}

export function recordVisit(visit: Visit): void {
  const store = readStore();
  store.visits.push(visit);
  if (store.visits.length > MAX_VISITS) store.visits = store.visits.slice(-MAX_VISITS);
  writeStore(store);
}

export function recordEnquiry(enquiry: Enquiry): void {
  const store = readStore();
  store.enquiries.push(enquiry);
  if (store.enquiries.length > MAX_ENQUIRIES) store.enquiries = store.enquiries.slice(-MAX_ENQUIRIES);
  writeStore(store);
}

function dayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

export function getStats() {
  const { visits, enquiries } = readStore();
  const now = Date.now();
  const todayKey = dayKey(now);

  const uniqueVisitors = new Set(visits.map((v) => v.vid)).size;
  const pageViews = visits.length;
  const viewsToday = visits.filter((v) => dayKey(v.ts) === todayKey).length;
  const visitorsToday = new Set(visits.filter((v) => dayKey(v.ts) === todayKey).map((v) => v.vid)).size;

  // last 14 days, oldest first
  const days: { date: string; views: number; visitors: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    const key = dayKey(d.getTime());
    const dayVisits = visits.filter((v) => dayKey(v.ts) === key);
    days.push({
      date: key,
      views: dayVisits.length,
      visitors: new Set(dayVisits.map((v) => v.vid)).size,
    });
  }

  const byPage = new Map<string, number>();
  for (const v of visits) byPage.set(v.path, (byPage.get(v.path) ?? 0) + 1);
  const topPages = [...byPage.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }));

  const recentEnquiries = [...enquiries].reverse().slice(0, 20);

  return {
    uniqueVisitors,
    pageViews,
    viewsToday,
    visitorsToday,
    days,
    topPages,
    totalEnquiries: enquiries.length,
    recentEnquiries,
  };
}
