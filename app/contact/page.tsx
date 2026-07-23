import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import {
  generateMetadata as genMeta,
  getBreadcrumbStructuredData,
} from "@/app/config/siteConfig";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return genMeta("/contact");
}

function page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [getBreadcrumbStructuredData("/contact", "Contact")],
  };

  return (
    <div className="container mx-auto max-w-full md:max-w-3xl px-4 h-auto py-16 animate-fade-in-blur">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="flex flex-col gap-4 items-center justify-center border-b pb-8">
        <h1 className="md:text-5xl text-4xl text-title font-bold text-center font-instrument-serif tracking-wider italic">
          Contact Me
        </h1>
        <p className="md:text-lg text-base text-muted-foreground tracking-wider text-center">
          Get in touch with me. I will get back to you as soon as possible.
        </p>
      </div>
      <div className="mt-8">
        <ContactForm />
        <div className="w-full p-4 bg-muted rounded-lg flex items-center mt-8">
          <HugeiconsIcon
            icon={Calendar03Icon}
            size={48}
            className="shrink-0 text-title"
          />
          <div className="flex-1 pl-4 text-title">
            <h2 className="text-xl font-bold">Let’s Build Something Great</h2>
            <p className="text-sm text-muted-foreground">
              Got an idea or project in mind? Let’s talk.
            </p>
          </div>
          <a href="https://cal.com/taqui/15min" target="_blank" className="p-[2px] group border w-fit border-dashed dark:border-white/30 border-black/20  rounded-[10px]">
            <Button className="rounded-[10px]" size={'sm'}>Book a Call</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default page;
