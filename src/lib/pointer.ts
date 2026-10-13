/**
 * Hover helpers for cards: cursor spotlight position + gentle 3D tilt.
 * Only runs while the pointer is over a card, and writes CSS variables in one rAF.
 */
let raf = 0;

export function cardMove(e: React.PointerEvent<HTMLElement>, maxTilt = 5) {
  if (e.pointerType !== "mouse") return;
  const t = e.currentTarget;
  const x = e.clientX;
  const y = e.clientY;
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const r = t.getBoundingClientRect();
    const px = (x - r.left) / r.width;
    const py = (y - r.top) / r.height;
    t.style.setProperty("--mx", `${x - r.left}px`);
    t.style.setProperty("--my", `${y - r.top}px`);
    t.style.setProperty("--rx", `${(0.5 - py) * maxTilt}deg`);
    t.style.setProperty("--ry", `${(px - 0.5) * maxTilt}deg`);
  });
}

export function cardLeave(e: React.PointerEvent<HTMLElement>) {
  cancelAnimationFrame(raf);
  const t = e.currentTarget;
  t.style.setProperty("--rx", "0deg");
  t.style.setProperty("--ry", "0deg");
}
