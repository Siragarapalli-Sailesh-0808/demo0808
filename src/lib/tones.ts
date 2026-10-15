/**
 * Colour "tones" — each service/solution gets its own colour so the site feels
 * consistent with the logo. Components read these through CSS variables:
 *   --c  (main)  --c2 (lighter, for gradients)  --cs (soft tint)  --ci (readable text on tint)
 */
export type Tone = "violet" | "blue" | "cyan" | "pink" | "emerald" | "amber";

export const tones: Record<Tone, { c: string; c2: string; cs: string; ci: string; cd: string }> = {
  // All tones come from the M & K logo (navy, blue, green, orange) so the site stays calm and on-brand.
  violet: { c: "#0d2b45", c2: "#2e4f6e", cs: "#e8eef4", ci: "#0d2b45", cd: "#0a2136" },
  blue: { c: "#1592d6", c2: "#3aace8", cs: "#eaf4fb", ci: "#0f6fa8", cd: "#0b4f78" },
  cyan: { c: "#1592d6", c2: "#3aace8", cs: "#eaf4fb", ci: "#0f6fa8", cd: "#0b4f78" },
  pink: { c: "#0f6fa8", c2: "#1592d6", cs: "#eaf4fb", ci: "#0b5a8a", cd: "#0b4f78" },
  emerald: { c: "#0f8c6f", c2: "#22a887", cs: "#e6f4f0", ci: "#0b6e57", cd: "#084c3c" },
  amber: { c: "#f2961e", c2: "#f8b24e", cs: "#fdf2e3", ci: "#a35a04", cd: "#6e3d03" },
};

export const toneOrder: Tone[] = ["violet", "blue", "cyan", "pink", "emerald", "amber"];

export function toneVars(t: Tone): React.CSSProperties {
  const v = tones[t];
  return { ["--c" as string]: v.c, ["--c2" as string]: v.c2, ["--cs" as string]: v.cs, ["--ci" as string]: v.ci, ["--cd" as string]: v.cd };
}
