/**
 * Colour "tones" — each service/solution gets its own colour so the site feels
 * vibrant without becoming chaotic. Components read these through CSS variables:
 *   --c  (main)  --c2 (lighter, for gradients)  --cs (soft tint)  --ci (readable text on tint)
 */
export type Tone = "violet" | "blue" | "cyan" | "pink" | "emerald" | "amber";

export const tones: Record<Tone, { c: string; c2: string; cs: string; ci: string; cd: string }> = {
  violet: { c: "#7c3aed", c2: "#a78bfa", cs: "#f3eeff", ci: "#6d28d9", cd: "#4c1d95" },
  blue: { c: "#2563eb", c2: "#60a5fa", cs: "#e8f0ff", ci: "#1d4ed8", cd: "#1e3a8a" },
  cyan: { c: "#0891b2", c2: "#22d3ee", cs: "#e2f8fc", ci: "#0e7490", cd: "#164e63" },
  pink: { c: "#db2777", c2: "#f472b6", cs: "#fdedf5", ci: "#be185d", cd: "#831843" },
  emerald: { c: "#059669", c2: "#34d399", cs: "#e3f9ef", ci: "#047857", cd: "#064e3b" },
  amber: { c: "#d97706", c2: "#fbbf24", cs: "#fef5e1", ci: "#b45309", cd: "#7c2d12" },
};

export const toneOrder: Tone[] = ["violet", "blue", "cyan", "pink", "emerald", "amber"];

export function toneVars(t: Tone): React.CSSProperties {
  const v = tones[t];
  return { ["--c" as string]: v.c, ["--c2" as string]: v.c2, ["--cs" as string]: v.cs, ["--ci" as string]: v.ci, ["--cd" as string]: v.cd };
}
