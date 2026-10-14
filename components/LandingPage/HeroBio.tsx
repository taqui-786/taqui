"use client";

import React from "react";
import { CustomBadge } from "../ui/custom-badge";
import { CombinedBadge } from "../ui/combined-badge";
import {
  Antigravity,
  Claude,
  Codex,
  DrizzleIcon,
  NextjsIcon,
  OpenaiIcon,
  PostgresqlIcon,
  PrismaIcon,
  PythonIcon,
  TypescriptIcon,
} from "../customIcons";

function HeroBio() {
  return (
    <div className="space-y-1 text-base leading-10 text-primary text-pretty md:text-lg [&_a]:align-middle [&_span]:align-middle [&_a]:whitespace-nowrap">
      <p>
        <b className="text-title font-semibold">
          Senior Software &amp; Applied AI Engineer
        </b>{" "}
        turning raw ideas into production-grade AI apps and autonomous agents shipping
        the full stack in{" "}
        <CustomBadge href="https://nextjs.org/" name="Next.js">
          <NextjsIcon size={14} />
        </CustomBadge>{" "}
        &amp;{" "}
        <CustomBadge href="https://www.typescriptlang.org/" name="TypeScript">
          <TypescriptIcon size={14} />
        </CustomBadge>
        , powering agentic workflows with{" "}
        <CustomBadge href="https://www.python.org/" name="Python">
          <PythonIcon size={14} />
        </CustomBadge>{" "}
        &amp;{" "}
        <CustomBadge href="https://platform.openai.com/docs/overview" name="LLMs">
          <OpenaiIcon size={14} />
        </CustomBadge>
        , scaling on{" "}
        <CustomBadge href="https://www.postgresql.org/" name="PostgreSQL">
          <PostgresqlIcon size={14} />
        </CustomBadge>{" "}
        (<CombinedBadge
          separator="/"
          items={[
            {
              name: "Prisma",
              href: "https://www.prisma.io/",
              icon: <PrismaIcon size={15} />,
            },
            {
              name: "Drizzle",
              href: "https://orm.drizzle.team/",
              icon: <DrizzleIcon size={15} />,
            },
          ]}
        />), and orchestrating &amp; cooking daily inside{" "}
        <CombinedBadge
          separator="·"
          items={[
            {
              name: "Codex",
              href: "https://openai.com/index/openai-codex/",
              icon: <Codex size={15} />,
            },
            {
              name: "Claude",
              href: "https://claude.ai/",
              icon: <Claude size={15} />,
            },
            {
              name: "Antigravity",
              href: "https://antigravity.google/",
              icon: <Antigravity size={15} />,
            },
          ]}
        />
        .
      </p>
    </div>
  );
}

export default HeroBio;



