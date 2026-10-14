"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "@/lib/utils";

export interface CombinedBadgeItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel?: string;
}

export interface CombinedBadgeProps {
  items: CombinedBadgeItem[];
  separator?: React.ReactNode;
  className?: string;
  delayDuration?: number;
  transparent?: boolean;
}

export function CombinedBadge({
  items,
  separator,
  className,
  delayDuration = 100,
  transparent = true,
}: CombinedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center align-middle no-underline select-none whitespace-nowrap",
        transparent
          ? "bg-transparent border-0 p-0 shadow-none gap-1 mx-0.5 text-primary"
          : "bg-muted border border-dashed dark:border-white/30 border-black/20 py-0.5 px-2 rounded-[6px] skill-inner-shadow text-primary gap-1.5 transition-colors hover:border-black/40 dark:hover:border-white/50",
        className
      )}
    >
      <TooltipProvider delayDuration={delayDuration}>
        {items.map((item, index) => (
          <React.Fragment key={`${item.name}-${index}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel || item.name}
                  className="inline-flex items-center justify-center shrink-0 transition-all duration-150 hover:scale-120 hover:opacity-100 opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs cursor-pointer text-primary"
                >
                  {item.icon}
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={6}
                className="bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded-md shadow-md font-medium"
              >
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
            {index < items.length - 1 && separator && (
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center text-xs text-muted-foreground/45 select-none font-light leading-none px-0.5 pointer-events-none"
              >
                {separator}
              </span>
            )}
          </React.Fragment>
        ))}
      </TooltipProvider>
    </span>
  );
}

export default CombinedBadge;
