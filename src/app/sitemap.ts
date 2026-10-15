import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { getJobs } from "@/lib/jobs";

export const revalidate = 300; // seconds — keep in sync with JOBS_REVALIDATE in src/lib/jobs.ts

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const jobs = await getJobs();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/industries", priority: 0.7 },
    { path: "/careers", priority: 0.8 },
    ...jobs.map((j) => ({ path: `/careers/${j.slug}`, priority: 0.6 })),
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms-of-use", priority: 0.2 },
    { path: "/equal-opportunity", priority: 0.2 },
  ];
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
