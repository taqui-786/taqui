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
    <div className="text-base md:text-lg text-muted-foreground leading-10 ">
      <b className="text-title">Full Stack Developer</b> building fast apps
      with{" "}
      <CustomBadge href="https://nextjs.org/" name="Next.js">
        <NextjsIcon size={18} />
      </CustomBadge>{" "}
      and{" "}
      <CustomBadge href="https://www.typescriptlang.org/" name="TypeScript">
        <TypescriptIcon size={18} />
      </CustomBadge>
      , using{" "}
      <CustomBadge href="https://www.prisma.io/" name="Prisma">
        <PrismaIcon size={18} />
      </CustomBadge>
      ,{" "}
      <CustomBadge href="https://www.postgresql.org/" name="PostgreSQL">
        <PostgresqlIcon size={18} />
      </CustomBadge>
      , and{" "}
      <CustomBadge href="https://socket.io/" name="Socket.IO">
        <SocketioIcon size={18} />
      </CustomBadge>
      , with animations via{" "}
      <CustomBadge href="https://www.framer.com/motion/" name="Framer Motion">
        <FramermotionIcon size={18} />
      </CustomBadge>
      {" "} or{" "}
      <CustomBadge href="https://gsap.com/" name="GSAP" />
      , deployed on{" "}
      <CustomBadge href="https://vercel.com/" name="Vercel">
        <VercelIcon size={18} />
      </CustomBadge>{" "}
      and{" "}
      <CustomBadge href="https://aws.amazon.com/" name="AWS">
        <AwsIcon size={18} />
      </CustomBadge>
      .
    </div>
  );
}

export default HeroBio;
