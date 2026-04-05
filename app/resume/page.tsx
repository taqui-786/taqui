import ResumeClient from "@/components/resume/ResumeClient";
import { generateMetadata as genMeta } from "@/app/config/siteConfig";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return genMeta("/resume");
}

export default function ResumePage() {
  return <ResumeClient />;
}
