import { siteConfig, about } from "@/app/config/siteConfig";
import { blogConfig } from "@/app/config/blogConfig";
import { allProjects } from "@/app/config/projectConfig";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const blogItems = blogConfig.map((blog) => {
    return `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${blog.link}</link>
      <guid isPermaLink="false">${blog.link}</guid>
      <description><![CDATA[Technical article by ${about.name} covering ${blog.tags.join(", ")}.]]></description>
      <pubDate>${new Date(blog.date).toUTCString() !== "Invalid Date" ? new Date(blog.date).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`;
  });

  const projectItems = allProjects.slice(0, 10).map((project) => {
    return `
    <item>
      <title><![CDATA[Project: ${project.name}]]></title>
      <link>${project.live || project.href}</link>
      <guid isPermaLink="false">${baseUrl}/projects#${project.id}</guid>
      <description><![CDATA[${project.description} Built with ${project.technologies.map((t) => t.name).join(", ")}.]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`;
  });

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.name} - Software & Tech Feed]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[Articles, software projects, and developer insights by ${about.name} (${about.title}).]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${blogItems.join("")}
    ${projectItems.join("")}
  </channel>
</rss>`;

  return new NextResponse(rssXml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
