import type { SVGProps } from "react";
import type { IconName } from "@/lib/content";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 24): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

const paths: Record<IconName, React.ReactNode> = {
  consulting: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 10a4 4 0 0 1-.5 8H7Z" />
      <path d="M12 12v5m0-5-2 2m2-2 2 2" />
    </>
  ),
  data: (
    <>
      <path d="M4 20V10m5 10V4m5 16v-7m5 7V8" />
      <path d="M3 20h18" />
    </>
  ),
  app: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2.5" />
      <path d="M8 21h8M12 17v4M7 9h4M7 12h7" />
    </>
  ),
  talent: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M16 14.6a4.5 4.5 0 0 1 5 4.4" />
    </>
  ),
  ops: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
    </>
  ),
  supply: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </>
  ),
  industry: (
    <>
      <path d="M3 21V10l5 3V10l5 3V6l8 4v11H3Z" />
      <path d="M7 17h2m4 0h2" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
};

export function Icon({ name, size, ...rest }: P & { name: IconName }) {
  return (
    <svg {...base(size)} {...rest}>
      {paths[name]}
    </svg>
  );
}

export function ArrowRight({ size = 16, ...rest }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ size = 16, ...rest }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <path d="M19 12H5m6-6-6 6 6 6" />
    </svg>
  );
}

export function ArrowUpRight({ size = 16, ...rest }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ExternalLink({ size = 16, ...rest }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
    </svg>
  );
}

export function Check({ size = 16, ...rest }: P) {
  return (
    <svg {...base(size)} strokeWidth={2} {...rest}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Phone({ size = 18, ...rest }: P) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function Mail({ size = 18, ...rest }: P) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function Pin({ size = 18, ...rest }: P) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function Social({ name, size = 18 }: { name: string; size?: number }) {
  const p = base(size);
  switch (name) {
    case "linkedin":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8 10.5V16M8 7.8v.01M12 16v-3.2a2.3 2.3 0 0 1 4.6 0V16M12 10.5V16" />
        </svg>
      );
    case "x":
      return (
        <svg {...p}>
          <path d="m4 4 16 16M20 4 4 20" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...p}>
          <path d="M14.5 8H16V4.5h-2.2A3.8 3.8 0 0 0 10 8.3V11H8v3.5h2V21h3.5v-6.5h2.3L16.5 11h-3V8.9c0-.5.4-.9 1-.9Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...p}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.8" />
          <path d="M17.2 6.8v.01" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...p}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="m10.5 9.5 4 2.5-4 2.5v-5Z" />
        </svg>
      );
    default:
      return null;
  }
}
