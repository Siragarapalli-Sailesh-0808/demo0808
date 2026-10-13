import type { NextConfig } from "next";

/**
 * Permanent redirects from the old WordPress site at mandkstaffing.com,
 * so existing Google results and bookmarks land on the right new page.
 * Most specific paths first.
 */
const oldSiteRedirects: { source: string; destination: string }[] = [
  // Pages
  { source: "/about-us", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/home", destination: "/" },
  // Jobs (WP Job Manager)
  { source: "/jobs", destination: "/careers" },
  { source: "/jobs/:path*", destination: "/careers" },
  { source: "/job/:path*", destination: "/careers" },
  { source: "/job-category/:path*", destination: "/careers" },
  { source: "/post-a-job", destination: "/contact" },
  // Services
  { source: "/services/support-services/erp-support", destination: "/services/erp-support" },
  { source: "/services/support-services/:path*", destination: "/services/database-administration" },
  { source: "/services/database-support/:path*", destination: "/services/database-administration" },
  { source: "/services/contracting-options", destination: "/services/database-administration" },
  { source: "/services/methodology", destination: "/services/database-administration" },
  { source: "/services/tech-support/:path*", destination: "/services/managed-it-support" },
  { source: "/services/consulting-services/:path*", destination: "/services/it-consulting" },
  { source: "/support-services/:path*", destination: "/services/database-administration" },
  { source: "/tech-support/:path*", destination: "/services/managed-it-support" },
  { source: "/consulting-services/:path*", destination: "/services/it-consulting" },
  { source: "/erp-support", destination: "/services/erp-support" },
  // Pages from the earlier draft of this site
  { source: "/solutions/:path*", destination: "/services" },
  { source: "/insights/:path*", destination: "/" },
  { source: "/terms-of-service", destination: "/terms-of-use" },
  { source: "/cookie-policy", destination: "/privacy-policy" },
  // WordPress leftovers
  { source: "/feed/:path*", destination: "/" },
  { source: "/comments/feed/:path*", destination: "/" },
  { source: "/wp-admin/:path*", destination: "/" },
  { source: "/wp-login.php", destination: "/" },
  { source: "/category/:path*", destination: "/" },
  { source: "/tag/:path*", destination: "/" },
  { source: "/author/:path*", destination: "/" },
  { source: "/sample-page", destination: "/" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return oldSiteRedirects.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
