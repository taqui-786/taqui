import React from "react";
import { CustomBadge } from "../ui/custom-badge";
import {
  AwsIcon,
  FramermotionIcon,
  NextjsIcon,
  PostgresqlIcon,
  PrismaIcon,
  SocketioIcon,
  TypescriptIcon,
  VercelIcon,
} from "../customIcons";

function HeroBio() {
  return (
    <div className="text-base md:text-lg text-primary leading-10 ">i build
      {" "}<b className="text-title ">Full Stack apps</b> with{" "}
      <CustomBadge href="https://nextjs.org/" name="Next.js">
        <NextjsIcon size={14} />
      </CustomBadge>{" "}
      and{" "}
      <CustomBadge href="https://www.typescriptlang.org/" name="TypeScript">
        <TypescriptIcon size={14} />
      </CustomBadge>
      , using{" "}
      <CustomBadge href="https://www.prisma.io/" name="Prisma">
        <PrismaIcon size={14} />
      </CustomBadge>
      ,{" "}
      <CustomBadge href="https://www.postgresql.org/" name="PostgreSQL">
        <PostgresqlIcon size={14} />
      </CustomBadge>
      , and{" "}
      <CustomBadge href="https://socket.io/" name="Socket.IO">
        <SocketioIcon size={14} />
      </CustomBadge>
      , with animations via{" "}
      <CustomBadge href="https://www.framer.com/motion/" name="Framer Motion">
        <FramermotionIcon size={14} />
      </CustomBadge>
      {" "} or{" "}
      <CustomBadge href="https://gsap.com/" name="GSAP" />
      , deployed on{" "}
      <CustomBadge href="https://vercel.com/" name="Vercel">
        <VercelIcon size={14} />
      </CustomBadge>{" "}
      and{" "}
      <CustomBadge href="https://aws.amazon.com/" name="AWS">
        <AwsIcon size={14} />
      </CustomBadge>
      .
    </div>
  );
}

export default HeroBio;
