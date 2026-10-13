/**
 * Open positions shown on /careers, each with its own page and Google job listing data.
 *
 * To add a job, copy the example below into the `jobs` array and fill it in.
 * When the list is empty, the careers page invites candidates to send their résumé,
 * and the top bar shows company highlights instead of jobs.
 *
 * {
 *   slug: "senior-oracle-dba-harrisburg",          // unique, used in the web address
 *   title: "Senior Oracle DBA",
 *   location: "Harrisburg, PA",                      // or "Remote (US)"
 *   remote: false,
 *   type: "Contract",                                // Contract | Contract-to-Hire | Full-time | Part-time | Temporary
 *   experience: "8+ years",
 *   posted: "2026-10-13",                            // YYYY-MM-DD
 *   validThrough: "2026-12-31",                      // optional
 *   summary: "One or two sentences about the role.",
 *   responsibilities: ["…", "…"],
 *   requirements: ["…", "…"],
 * },
 */
export type Job = {
  slug: string;
  title: string;
  location: string;
  remote?: boolean;
  type: "Contract" | "Contract-to-Hire" | "Full-time" | "Part-time" | "Temporary";
  experience?: string;
  posted: string;
  validThrough?: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobs: Job[] = [];
