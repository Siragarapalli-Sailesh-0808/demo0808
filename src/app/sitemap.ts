import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services, solutions } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/solutions", priority: 0.8 },
    ...solutions.map((s) => ({ path: `/solutions/${s.slug}`, priority: 0.7 })),
    { path: "/industries", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
