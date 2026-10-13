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
          backgroundColor: "#fbfaff",
          backgroundImage:
            "radial-gradient(55% 75% at 92% 15%, rgba(124,58,237,0.28), transparent 60%), radial-gradient(50% 60% at 75% 95%, rgba(6,182,212,0.25), transparent 70%)",
          color: "#0b1220",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={292} height={120} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 70, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.04, maxWidth: 980 }}>
            The right people, with the right skills, at the right price.
          </div>
          <div style={{ marginTop: 26, fontSize: 28, color: "#5b3df5", fontWeight: 600 }}>
            {`${site.tagline} · Since ${site.founded}`}
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, display: "flex", backgroundImage: "linear-gradient(90deg,#7c3aed,#2563eb,#06b6d4)" }} />
      </div>
    ),
    size,
  );
}
