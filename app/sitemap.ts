import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...projects.map((p) => `/work/${p.slug}/`)].map((path) => ({ url: `${site.url}${path}` }));
}
