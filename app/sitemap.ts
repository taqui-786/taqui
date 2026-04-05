import type { MetadataRoute } from "next";
import { siteConfig, sitePaths, type SitePath } from "@/app/config/siteConfig";

const routePriority: Record<SitePath, number> = {
  "/": 1,
  "/work": 0.9,
  "/projects": 0.9,
  "/blogs": 0.8,
  "/resume": 0.8,
  "/contact": 0.8,
  "/llm": 0.6,
};

const routeFrequency: Record<
  SitePath,
  MetadataRoute.Sitemap[number]["changeFrequency"]
> = {
  "/": "weekly",
  "/work": "monthly",
  "/projects": "weekly",
  "/blogs": "weekly",
  "/resume": "monthly",
  "/contact": "monthly",
  "/llm": "weekly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitePaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: routeFrequency[path],
    priority: routePriority[path],
  }));
}
