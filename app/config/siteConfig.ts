import type { Metadata } from "next";
import { getSeoKeywordPool } from "@/lib/seo/keyword-intelligence";

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
}

export type SitePath =
  | "/"
  | "/work"
  | "/projects"
  | "/blogs"
  | "/resume"
  | "/contact"
  | "/llm";

export const sitePaths: SitePath[] = [
  "/",
  "/work",
  "/projects",
  "/blogs",
  "/resume",
  "/contact",
  "/llm",
];

export const about = {
  name: "Md Taqui Imam",
  title: "Full Stack Developer",
  description:
    "Passionate software developer building modern web products with clean architecture, strong UX, and scalable engineering.",
  location: "Ramgarh Cantt, Jharkhand, India",
  email: "mdtaqui.jhar@gmail.com",
};

export const heroConfig = {
  name: about.name,
  title: about.title,
  tagline: about.description,
};

export const siteConfig = {
  name: heroConfig.name,
  title: `${heroConfig.name} - Portfolio`,
  description: about.description,
  url: process.env.NEXT_PUBLIC_URL || "https://taqui.in",
  ogImage: "/api/og",
  author: {
    name: about.name,
    twitter: "@md_taqui_imam",
    github: "taqui-786",
    linkedin: "taqui-imam",
    email: about.email,
  },
  socialLinks: {
    facebook: "https://www.facebook.com/shahina.khatun.1044",
    twitter: "https://twitter.com/md_taqui_imam",
    linkedin: "https://www.linkedin.com/in/taqui-imam",
    external: "https://tinyurl.com/MdTaquiImam",
    github: "https://github.com/taqui-786",
  },
  keywords: [
    "md taqui imam",
    "md taqui imam developer",
    "taqui imam",
    "taqui",
    "imam",
    "taqui in",
    "taqui.in",
    "software engineer",
    "software developer",
    "full stack developer",
    "web developer",
    "frontend engineer",
    "backend engineer",
    "developer portfolio",
    "next.js developer",
    "react developer",
    "typescript",
    "javascript",
  ],
};

export const pageMetadata: Record<SitePath, PageMeta> = {
  "/": {
    title: `${heroConfig.name} - Software Engineer & Full Stack Developer`,
    description:
      "Portfolio of Md Taqui Imam (Taqui), software engineer and full stack developer building modern products with Next.js, TypeScript, React, and scalable backend systems.",
    keywords: [
      "full stack developer portfolio",
      "software developer portfolio",
      "md taqui imam portfolio",
      "next.js portfolio",
      "react portfolio",
    ],
    ogImage: "/api/og",
    twitterCard: "summary_large_image",
  },
  "/work": {
    title: "Work Experience - Md Taqui Imam",
    description:
      "Professional work experience of Md Taqui Imam across frontend and full stack engineering roles in software product teams.",
    keywords: [
      "software engineer experience",
      "full stack developer experience",
      "frontend developer experience",
      "developer resume",
      "engineering career",
    ],
    ogImage: "/api/og",
    twitterCard: "summary_large_image",
  },
  "/projects": {
    title: "Projects - Md Taqui Imam",
    description:
      "Explore software projects built by Md Taqui Imam using Next.js, React, TypeScript, AI integrations, and modern backend tooling.",
    keywords: [
      "software projects",
      "next.js projects",
      "react projects",
      "typescript projects",
      "ai projects",
    ],
    ogImage: "/api/og",
    twitterCard: "summary_large_image",
  },
  "/blogs": {
    title: "Blogs - Md Taqui Imam",
    description:
      "Technical articles and tutorials by Md Taqui Imam on web development, JavaScript, React, Next.js, and software engineering.",
    keywords: [
      "developer blog",
      "web development blog",
      "javascript blog",
      "react tutorials",
      "next.js articles",
    ],
    ogImage: "/api/og",
    twitterCard: "summary_large_image",
  },
  "/resume": {
    title: "Resume - Md Taqui Imam",
    description:
      "Resume of Md Taqui Imam covering software engineering experience, technical skills, and product development accomplishments.",
    keywords: [
      "developer resume",
      "software engineer resume",
      "full stack resume",
      "technical skills",
      "engineering profile",
    ],
    ogImage: "/api/og",
    twitterCard: "summary_large_image",
  },
  "/contact": {
    title: "Contact - Md Taqui Imam",
    description:
      "Contact Md Taqui Imam for software engineering collaborations, freelance work, consulting, and product development projects.",
    keywords: [
      "contact developer",
      "hire software engineer",
      "freelance developer",
      "project collaboration",
      "software consulting",
    ],
    ogImage: "/api/og",
    twitterCard: "summary_large_image",
  },
  "/llm": {
    title: "LLM Context - Md Taqui Imam",
    description:
      "Structured profile and portfolio context for AI systems covering projects, skills, experience, and technical writing.",
    keywords: [
      "llm context",
      "developer profile data",
      "portfolio structured data",
      "ai readable portfolio",
      "machine readable resume",
    ],
    ogImage: "/api/og",
    twitterCard: "summary_large_image",
  },
};

export function getPageMetadata(pathname: string): PageMeta {
  if (pathname in pageMetadata) {
    return pageMetadata[pathname as SitePath];
  }
  return pageMetadata["/"];
}

function dedupeKeywords(keywords: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const keyword of keywords) {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    output.push(keyword.trim());
  }

  return output;
}

export async function generateMetadata(pathname: string): Promise<Metadata> {
  const pageMeta = getPageMetadata(pathname);
  const dynamicKeywords = await getSeoKeywordPool();
  const mergedKeywords = dedupeKeywords([
    ...(pageMeta.keywords ?? []),
    ...siteConfig.keywords,
    ...dynamicKeywords,
  ]).slice(0, 30);

  const isProduction = process.env.VERCEL_ENV === "production";
  const shouldIndex = isProduction || process.env.NODE_ENV !== "production";

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: mergedKeywords,
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || "summary_large_image",
      title: pageMeta.title,
      description: pageMeta.description,
      creator: siteConfig.author.twitter,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
  };
}

export function getPersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name,
    alternateName: ["Taqui", "Md Taqui", "Taqui Imam", "Md Taqui Imam"],
    jobTitle: about.title,
    description: about.description,
    email: `mailto:${about.email}`,
    url: siteConfig.url,
    sameAs: [
      siteConfig.socialLinks.github,
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.twitter,
    ],
    knowsAbout: [
      "Software Engineering",
      "Full Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Backend Development",
      "AI Application Development",
    ],
  };
}

export function getWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    alternateName: ["Taqui", "Taqui Portfolio", "Md Taqui Imam Portfolio"],
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: about.name,
    },
  };
}

export const myConfig = {
  name: about.name,
  title: about.title,
  description: about.description,
  location: about.location,
  email: about.email,
  socialLinks: siteConfig.socialLinks,
  seo: {
    ogImage: siteConfig.ogImage,
    url: siteConfig.url,
    twitterHandle: siteConfig.author.twitter,
    keywords: siteConfig.keywords,
    authors: [
      {
        name: siteConfig.author.name,
        url: `https://github.com/${siteConfig.author.github}`,
      },
    ],
  },
};
