import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetadataInput = {
  /** Page title without the brand suffix, or the full title when `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Route path beginning with "/" — used for the canonical URL and Open Graph url. */
  path: string;
  /** Use the title verbatim (no "| TELVOR" template suffix). */
  absoluteTitle?: boolean;
};

/**
 * Builds consistent per-page metadata. The root layout supplies `metadataBase`
 * and the title template, so pages only declare what is genuinely theirs.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
