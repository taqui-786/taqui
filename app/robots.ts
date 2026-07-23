import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/cron/", "/api/wakatime"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: ["/api/cron/", "/api/wakatime"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
