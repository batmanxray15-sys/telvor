import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteHeader } from "@/components/site/header";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

/**
 * Fonts are self-hosted (SIL OFL 1.1 — see src/app/fonts) so the build never
 * depends on a network request to a font CDN, and there is no layout shift
 * from a late-loading remote stylesheet.
 */
const geistSans = localFont({
  src: "./fonts/geist-sans-variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const sora = localFont({
  src: "./fonts/sora-latin-variable.woff2",
  variable: "--font-sora",
  weight: "100 800",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const defaultTitle = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    // No phone number has been published, so do not turn numbers into call links.
    telephone: false,
    address: false,
    email: false,
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: siteUrl,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: site.themeColor,
  colorScheme: "dark",
};

/**
 * Structured data is only emitted once a real canonical URL is configured.
 * Publishing `http://localhost:3000` as an organisation URL would be wrong.
 */
const structuredData = process.env.NEXT_PUBLIC_SITE_URL
  ? {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
      slogan: site.tagline,
      description: site.description,
    }
  : null;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${sora.variable}`}>
      <body className="flex min-h-dvh flex-col bg-obsidian">
        <a
          href="#main"
          className="sr-only rounded-full bg-electric px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to main content
        </a>

        <ScrollProgress />

        <SiteHeader />

        {children}

        {/* Without JavaScript the reveal wrappers must render in their final state. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal] *{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>

        {structuredData && (
          <script
            type="application/ld+json"
            // Content is generated from constants above; no user input is interpolated.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
      </body>
    </html>
  );
}
