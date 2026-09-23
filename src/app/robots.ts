import type { MetadataRoute } from "next";

import { SITIO } from "@/lib/analytics";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/tarjeta/vcard" },
    sitemap: `${SITIO}/sitemap.xml`,
  };
}
