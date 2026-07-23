import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/config/siteConfig";
import { allProjects } from "@/app/config/projectConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  // Collect all project banner images for image search indexing
  const projectImages = allProjects
    .filter((p) => p.banner)
    .map((p) => `${baseUrl}${p.banner.startsWith("/") ? "" : "/"}${p.banner}`);

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        `${baseUrl}/taqui.png`,
        `${baseUrl}/taqui_full_img.png`,
        ...projectImages.slice(0, 5),
      ],
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: projectImages,
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/taqui.png`],
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [`${baseUrl}/taqui.png`],
    },
    {
      url: `${baseUrl}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/llm`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
