import type { MetadataRoute } from "next";
import { primaryNav, siteUrl } from "@/lib/site";

/**
 * Only routes that exist are listed. Add new pages here as they are created —
 * a sitemap entry for a missing page is a broken link in search results.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...primaryNav.map((item) => item.href)];

  return routes.map((route) => ({
    url: route === "/" ? siteUrl : `${siteUrl}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));
}
