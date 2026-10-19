const clients = [
  { name: "Commonwealth of Pennsylvania", src: "/clients/pennsylvania.png" },
  { name: "KPMG", src: "/clients/kpmg.png" },
  { name: "State of Alabama", src: "/clients/alabama.png" },
  { name: "Texas Woman's University", src: "/clients/twu.png" },
  { name: "Deloitte", src: "/clients/deloitte.png" },
  { name: "Kforce", src: "/clients/kforce.png" },
  { name: "UST Global", src: "/clients/ust.png" },
  { name: "Hitachi High-Tech America, Inc.", src: "/clients/hitachi.png" },
  { name: "OST Global Inc", src: "/clients/ost.png" },
  { name: "Computer Aid Inc", src: "/clients/cai.png" },
  { name: "Gaming Laboratories Inc", src: "/clients/gli.png" },
];

export function Trust() {
  return (
    <section aria-labelledby="trust-title" data-anim-zone className="relative border-y border-line bg-white py-16 md:py-20">
      <div className="container-x text-center">
        <p className="eyebrow justify-center text-[13px] uppercase tracking-[0.08em]" data-reveal>
          Trusted by leading enterprises &amp; government organizations
        </p>
        <h2 id="trust-title" className="sr-only">
          Our Clients and Partners
        </h2>
      </div>

      <div
        className="group relative mt-10 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div className="marquee flex w-max group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-5 pr-5">
              {[...clients, ...clients].map((client, i) => (
                <li
                  key={`${copy}-${i}`}
                  className="flex h-24 min-w-44 shrink-0 items-center justify-center rounded-xl bg-white px-6 py-2 ring-1 ring-line shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-accent"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-auto max-w-[160px] object-contain"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
