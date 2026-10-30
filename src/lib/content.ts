/**
 * Brand copy lives here so Home, Services and Process never drift apart.
 * Every statement is about capability and method — no client counts, awards,
 * testimonials or case studies are claimed, because none have been supplied.
 */

export type CapabilityIcon = "code" | "layers" | "gauge" | "accessibility" | "search" | "shield";

export type Capability = {
  slug: string;
  icon: CapabilityIcon;
  title: string;
  summary: string;
  deliverables: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "engineering",
    icon: "code",
    title: "Web engineering",
    summary:
      "Production front ends built with Next.js, React and TypeScript — typed end to end, with a component structure that survives the second year as well as the first.",
    deliverables: ["Next.js & React builds", "Type-safe architecture", "Reusable component systems"],
  },
  {
    slug: "interface-design",
    icon: "layers",
    title: "Interface design",
    summary:
      "Interfaces designed to a purpose: clear hierarchy, deliberate spacing and typography that carries the brand without decoration for its own sake.",
    deliverables: ["Design systems & tokens", "Responsive layouts", "Motion with intent"],
  },
  {
    slug: "performance",
    icon: "gauge",
    title: "Performance engineering",
    summary:
      "Performance treated as a design constraint, not a cleanup task. Lean payloads, self-hosted fonts and rendering choices that keep interaction immediate.",
    deliverables: ["Core Web Vitals focus", "Asset & font optimisation", "Layout-shift prevention"],
  },
  {
    slug: "accessibility",
    icon: "accessibility",
    title: "Accessibility",
    summary:
      "Semantic structure, keyboard paths and readable contrast are part of the build — including visible focus states and support for reduced-motion preferences.",
    deliverables: ["WCAG-aware patterns", "Keyboard & screen-reader paths", "Reduced-motion support"],
  },
  {
    slug: "technical-seo",
    icon: "search",
    title: "Technical SEO",
    summary:
      "Clean semantics, per-page metadata, canonical URLs, sitemaps and structured data — the groundwork that makes content findable once it exists.",
    deliverables: ["Metadata & canonicals", "Sitemap & robots", "Structured data"],
  },
  {
    slug: "maintenance",
    icon: "shield",
    title: "Maintenance & iteration",
    summary:
      "Sites are maintained, not abandoned. Dependencies kept current, content updates handled, small improvements shipped without a rebuild every time.",
    deliverables: ["Dependency upkeep", "Content updates", "Iterative improvements"],
  },
];

export type ProcessStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  details: string[];
};

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    label: "01",
    title: "Discover",
    description:
      "Start with the problem, not the pixels. We agree on who the site is for, what it must achieve and how success will be measured before any interface exists.",
    details: ["Goals & audience", "Scope and constraints", "Success criteria"],
  },
  {
    id: "design",
    label: "02",
    title: "Design",
    description:
      "Structure first, then surface. Content hierarchy, navigation and states are resolved early; typography, colour and motion are applied to serve them.",
    details: ["Content structure", "Design system", "Responsive states"],
  },
  {
    id: "build",
    label: "03",
    title: "Build",
    description:
      "Engineered in Next.js and TypeScript with accessibility and performance treated as acceptance criteria rather than polish applied at the end.",
    details: ["Component development", "Accessibility checks", "Performance budgets"],
  },
  {
    id: "ship",
    label: "04",
    title: "Ship & refine",
    description:
      "Launched on Vercel with metadata, sitemaps and monitoring in place, then refined against real usage instead of assumptions.",
    details: ["Launch checklist", "Analytics setup (on request)", "Iteration"],
  },
];

export type Principle = { title: string; description: string };

export const principles: Principle[] = [
  {
    title: "Purpose before decoration",
    description:
      "Every section, animation and accent has to earn its place by helping someone understand or act. If it does not, it is removed.",
  },
  {
    title: "Performance is design",
    description:
      "A beautiful page that arrives late is a worse page. Speed is part of the aesthetic, not a separate phase.",
  },
  {
    title: "Accessible by default",
    description:
      "Semantic HTML, keyboard access and sufficient contrast are cheaper to build in than to retrofit — so they are built in.",
  },
  {
    title: "Built to be maintained",
    description:
      "Clear structure and typed boundaries so the site can change without a rewrite, and handover is not a risk.",
  },
];
