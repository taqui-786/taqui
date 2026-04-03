import SocialLinks from "@/components/ui/SocialLinks";
import HeroImageSection from "@/components/LandingPage/HeroImageSection";
import HeroBio from "@/components/LandingPage/HeroBio";
import HeroName from "@/components/ui/HeroName";
import HeroActionButton from "@/components/ui/HeroActionButton";
import { HeroContributionGraph } from "@/components/uilayouts/contribution-graph";
import ProjectsSection from "@/components/LandingPage/ProjectsSection";
import ExperienceSection from "@/components/LandingPage/ExperienceSection";
import TechStackSection from "@/components/LandingPage/TechStackSection";
import BlogSection from "@/components/LandingPage/BlogSection";
import QuoteSection from "@/components/LandingPage/QuoteSection";
import { HugeiconsIcon } from "@hugeicons/react";
import { VisualStudioCodeIcon } from "@hugeicons/core-free-icons";
export default function Page() {
  return (
    <div className="container mx-auto max-w-full md:max-w-3xl px-4 h-auto md:py-12 py-4">
      {/* Hero section part */}
      <HeroImageSection />
      <div className="relative space-y-8 md:px-4 animate-fade-in-blur">
        {/* <HeroName /> */}
        {/* Short Bio */}
        <HeroBio />
        {/* Action Buttons */}
        <HeroActionButton />
        {/* Social Icons */}
        <SocialLinks />

        {/* Contribution Graph */}
        <HeroContributionGraph />
           {/* Tech stack Section */}
        <TechStackSection />
        {/* Projects section */}
        <ProjectsSection />
        {/* Experience section */}
        <ExperienceSection />
     
        {/* Blog section */}
        <BlogSection />
        {/* Quote */}
        <QuoteSection />
      </div>
    </div>
  );
}
