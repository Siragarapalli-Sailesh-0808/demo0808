import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background:
            "radial-gradient(60% 80% at 90% 20%, rgba(36,83,255,0.45), transparent 60%), radial-gradient(50% 60% at 70% 90%, rgba(178,230,245,0.8), transparent 70%)",
          backgroundColor: "#fafaf8",
          color: "#0b1220",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#0b1220", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
            {site.mark}
          </div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, maxWidth: 900 }}>
            Building enterprise technology that stays resilient.
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#2453ff", fontWeight: 600 }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
