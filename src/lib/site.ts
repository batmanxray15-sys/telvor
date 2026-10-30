/**
 * Single source of truth for brand + navigation + contact facts.
 *
 * Contact details are intentionally `null`: no business email or phone number
 * has been provided, and inventing them would be misleading. Pages must render
 * a truthful "not configured yet" state until real values are supplied here.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** Canonical origin. Falls back to localhost so no invented domain is ever published. */
export const siteUrl = (rawSiteUrl && rawSiteUrl.length > 0
  ? rawSiteUrl
  : "http://localhost:3000"
).replace(/\/+$/, "");

export const site = {
  name: "TELVOR",
  tagline: "Built to Purpose.",
  shortDescription:
    "TELVOR is a web development brand building fast, accessible and precisely engineered digital experiences.",
  description:
    "TELVOR builds fast, accessible and precisely engineered websites and web applications. Every interface is designed to a purpose, then shipped with performance and clarity intact.",
  url: siteUrl,
  locale: "en_US",
  themeColor: "#05070B",
} as const;

export type ContactChannel = {
  label: string;
  /** Real value, or `null` when the channel has not been provided yet. */
  value: string | null;
  href: string | null;
  note: string;
};

export const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    value: null,
    href: null,
    note: "A business email address has not been published yet.",
  },
  {
    label: "Phone",
    value: null,
    href: null,
    note: "A phone number has not been published yet.",
  },
];

export type NavItem = {
  href: string;
  label: string;
};

/** Only routes that actually exist. The wordmark links home, so "/" is not repeated here. */
export const primaryNav: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);
