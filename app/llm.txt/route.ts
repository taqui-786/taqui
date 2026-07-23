import { about, siteConfig } from "@/app/config/siteConfig";
import { allProjects } from "@/app/config/projectConfig";
import { experienceConfig } from "@/app/config/experienceConfig";
import { blogConfig } from "@/app/config/blogConfig";
import { techStack } from "@/app/config/techstack";
import { NextResponse } from "next/server";

export async function GET() {
  const sections: string[] = [];

  sections.push(`# ${about.name} - Full Stack Developer & Software Engineer`);
  sections.push(`URL: ${siteConfig.url}`);
  sections.push(`Email: ${about.email}`);
  sections.push(`Location: ${about.location}`);
  sections.push(`GitHub: ${siteConfig.socialLinks.github}`);
  sections.push(`LinkedIn: ${siteConfig.socialLinks.linkedin}`);
  sections.push(`Twitter: ${siteConfig.socialLinks.twitter}`);
  sections.push("");

  sections.push("## ABOUT");
  sections.push(about.description);
  sections.push("");

  sections.push("## CORE SKILLS");
  const techCategories = {
    languages: ["javascript", "typescript"],
    frameworks: ["reactjs", "nextjs", "nodejs", "nestjs", "express"],
    databases: ["postgres", "mysql", "mongodb", "redis", "supabase"],
    orm: ["prisma", "drizzle"],
    styling: ["tailwindcss", "shadcnui"],
    tools: ["git", "docker", "postman", "figma", "nginx", "githubactions"],
    other: ["oauth", "tanstackquery", "reactredux", "reactrouter", "openai"],
  };

  for (const [category, keys] of Object.entries(techCategories)) {
    const skills = keys
      .filter((key) => techStack[key as keyof typeof techStack])
      .map((key) => techStack[key as keyof typeof techStack].name)
      .join(", ");
    if (skills) {
      sections.push(`${category.charAt(0).toUpperCase() + category.slice(1)}: ${skills}`);
    }
  }
  sections.push("");

  sections.push("## FEATURED PROJECTS");
  allProjects
    .filter((p) => p.featured)
    .forEach((p) => {
      sections.push(`- ${p.name}: ${p.description}`);
      sections.push(`  Live: ${p.live} | GitHub: ${p.href}`);
      sections.push(`  Tech: ${p.technologies.map((t) => t.name).join(", ")}`);
    });
  sections.push("");

  sections.push("## ALL PROJECTS");
  allProjects.forEach((p) => {
    sections.push(`- ${p.name}: ${p.description} (${p.live})`);
  });
  sections.push("");

  sections.push("## RECENT ARTICLES");
  blogConfig.slice(0, 10).forEach((b) => {
    sections.push(`- ${b.title} (${b.date}): ${b.link}`);
  });
  sections.push("");

  sections.push("## WORK EXPERIENCE");
  experienceConfig.forEach((exp) => {
    sections.push(`- ${exp.position} at ${exp.company} (${exp.duration})`);
    exp.description.forEach((d) => sections.push(`  * ${d}`));
  });

  return new NextResponse(sections.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
