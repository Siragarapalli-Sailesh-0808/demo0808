import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const svg = await readFile(join(process.cwd(), "public/brand/logo.svg"));
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#ffffff",
          color: "#0d2b45",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={292} height={120} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 70, fontWeight: 700, letterSpacing: -2, lineHeight: 1.04, maxWidth: 980 }}>
            The right people, with the right skills, at the right price.
          </div>
          <div style={{ marginTop: 26, fontSize: 28, color: "#0f6fa8", fontWeight: 600 }}>
            {`${site.tagline} · Since ${site.founded}`}
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, display: "flex", backgroundImage: "linear-gradient(90deg,#0f8c6f 0 33.3%,#1592d6 33.3% 66.6%,#f2961e 66.6%)" }} />
      </div>
    ),
    size,
  );
}
