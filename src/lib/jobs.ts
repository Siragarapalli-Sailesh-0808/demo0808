/**
 * Job openings for the careers page — managed in a Google Sheet, no backend or database.
 *
 * How it works
 *  - The admin keeps one row per job in a Google Sheet (template: docs/jobs-template.csv).
 *  - The sheet is shared with "File → Share → Publish to web → (sheet) → Comma-separated values (.csv)".
 *  - That published link goes in `site.jobsSheetUrl` (src/lib/site.ts) or the JOBS_SHEET_URL environment variable.
 *  - The website re-reads the sheet at most every few minutes, so a new row appears without a redeploy.
 *
 * Columns (first row of the sheet, any order, names are not case-sensitive):
 *   Title | Location | Remote | Type | Experience | Posted | Closing date | Summary | Responsibilities | Requirements | Status
 *   - Remote: Yes / No           - Type: Contract, Contract-to-Hire, Full-time, Part-time or Temporary
 *   - Posted / Closing date: YYYY-MM-DD (closing date optional — the job hides itself after that day)
 *   - Responsibilities / Requirements: one item per line (Alt+Enter / Ctrl+Enter inside the cell)
 *   - Status: Open shows the job; Closed (or empty title) hides it
 *
 * Anything typed in the sheet is public once published — don't keep private notes in it.
 */
import { site } from "./site";

export type JobType = "Contract" | "Contract-to-Hire" | "Full-time" | "Part-time" | "Temporary";

export type Job = {
  slug: string;
  title: string;
  location: string;
  remote?: boolean;
  type: JobType;
  experience?: string;
  posted: string;
  validThrough?: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

/** How often (seconds) the site checks the sheet for changes. */
export const JOBS_REVALIDATE = 300;

/** Optional fallback list, used only when no sheet is configured or the sheet can't be reached. */
const fallbackJobs: Job[] = [];

const TYPES: JobType[] = ["Contract", "Contract-to-Hire", "Full-time", "Part-time", "Temporary"];

/** Minimal CSV parser: handles quoted fields, escaped quotes and line breaks inside cells. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 80);

const lines = (s = "") =>
  s
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean);

const isoDate = (s = "") => {
  const t = s.trim();
  if (!t) return "";
  const d = new Date(t);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
};

/** Turn sheet rows into jobs. Exported for testing. */
export function rowsToJobs(rows: string[][], today = new Date().toISOString().slice(0, 10)): Job[] {
  if (rows.length < 2) return [];
  const head = rows[0].map((h) => h.trim().toLowerCase());
  const col = (r: string[], ...names: string[]) => {
    for (const n of names) {
      const i = head.indexOf(n);
      if (i >= 0) return (r[i] ?? "").trim();
    }
    return "";
  };
  const seen = new Map<string, number>();
  const jobs: Job[] = [];
  for (const r of rows.slice(1)) {
    const title = col(r, "title", "job title");
    if (!title) continue;
    const status = col(r, "status").toLowerCase();
    if (status && status !== "open") continue;
    const validThrough = isoDate(col(r, "closing date", "valid through", "closes"));
    if (validThrough && validThrough < today) continue;

    const location = col(r, "location") || `${site.address.city}, ${site.address.region}`;
    const typeRaw = col(r, "type", "job type").toLowerCase();
    const type =
      TYPES.find((t) => t.toLowerCase() === typeRaw) ??
      (typeRaw.includes("hire") ? "Contract-to-Hire" : typeRaw.includes("full") ? "Full-time" : typeRaw.includes("part") ? "Part-time" : "Contract");

    let slug = slugify(`${title} ${location}`) || "job";
    const n = (seen.get(slug) ?? 0) + 1;
    seen.set(slug, n);
    if (n > 1) slug = `${slug}-${n}`;

    jobs.push({
      slug,
      title,
      location,
      remote: /^(y|yes|true|remote)$/i.test(col(r, "remote")),
      type,
      experience: col(r, "experience") || undefined,
      posted: isoDate(col(r, "posted", "date posted")) || today,
      validThrough: validThrough || undefined,
      summary: col(r, "summary", "description"),
      responsibilities: lines(col(r, "responsibilities")),
      requirements: lines(col(r, "requirements", "skills")),
    });
  }
  // newest first
  return jobs.sort((a, b) => b.posted.localeCompare(a.posted));
}

/** Current open jobs from the Google Sheet (cached for JOBS_REVALIDATE seconds). */
export async function getJobs(): Promise<Job[]> {
  let url = (process.env.JOBS_SHEET_URL || site.jobsSheetUrl).trim();
  if (!url) return fallbackJobs;
  // Accept the "web page" publish link too, by switching it to the CSV version.
  if (url.includes("/pubhtml")) {
    url = url.replace("/pubhtml", "/pub");
    if (!/[?&]output=csv/.test(url)) url += (url.includes("?") ? "&" : "?") + "output=csv";
  }
  try {
    const res = await fetch(url, { next: { revalidate: JOBS_REVALIDATE, tags: ["jobs"] } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (/^\s*</.test(text)) throw new Error("The sheet link returned a web page, not CSV — use the 'Publish to web' CSV link.");
    return rowsToJobs(parseCsv(text));
  } catch (err) {
    console.error("[jobs] Could not read the jobs sheet:", err);
    return fallbackJobs;
  }
}
