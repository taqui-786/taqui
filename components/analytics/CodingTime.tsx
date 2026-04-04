"use client";

import { VisualStudioCodeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { CustomBadge } from "@/components/ui/custom-badge";
import { TypescriptIcon, JavascriptIcon, CssIcon, FileTypeReactjsIcon, VscodeIcon } from "@/components/customIcons";

interface WakaTimeGrandTotal {
  digital: string;
  hours: number;
  minutes: number;
  text: string;
  total_seconds: number;
}

interface WakaTimeEditor {
  name: string;
  text: string;
  total_seconds: number;
}

interface WakaTimeLanguage {
  name: string;
  text: string;
  total_seconds: number;
  percent: number;
}

interface WakaTimeProject {
  name: string;
  text: string;
  total_seconds: number;
  percent: number;
}

interface WakaTimeRange {
  date: string;
  end: string;
  start: string;
  text: string;
}

interface WakaTimeDayData {
  editors: WakaTimeEditor[];
  languages: WakaTimeLanguage[];
  projects: WakaTimeProject[];
  grand_total: WakaTimeGrandTotal;
  range: WakaTimeRange;
}

interface WakaTimeResponse {
  cumulative_total: {
    text: string;
    seconds: number;
  };
  data: WakaTimeDayData[];
}

async function fetchWakaTimeData(): Promise<WakaTimeResponse> {
  const res = await fetch("/api/wakatime");
  if (!res.ok) throw new Error("Failed to fetch WakaTime data");
  return res.json();
}

function getTimeAgo(endTimeStr: string): string | null {
  const endTime = new Date(endTimeStr);
  const now = new Date();
  const diffMs = now.getTime() - endTime.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 5) return null;
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function getEditorName(data: WakaTimeResponse): string {
  for (let i = data.data.length - 1; i >= 0; i--) {
    if (data.data[i].editors?.length > 0) return data.data[i].editors[0].name;
  }
  return "VS Code";
}

function getTopLanguage(data: WakaTimeResponse): string | null {
  for (let i = data.data.length - 1; i >= 0; i--) {
    if (data.data[i].languages?.length > 0) return data.data[i].languages[0].name;
  }
  return null;
}

function getTopProject(data: WakaTimeResponse): string | null {
  for (let i = data.data.length - 1; i >= 0; i--) {
    if (data.data[i].projects?.length > 0) return data.data[i].projects[0].name;
  }
  return null;
}

function getLatestEndTime(data: WakaTimeResponse): string | null {
  for (let i = data.data.length - 1; i >= 0; i--) {
    if (data.data[i].grand_total.total_seconds > 0) return data.data[i].range.end;
  }
  return null;
}

function getIconForLanguage(langName: string) {
  const name = langName.toLowerCase();
  if (name.includes("typescript") || name.includes("tsx")) return <TypescriptIcon size={16} />;
  if (name.includes("javascript")) return <JavascriptIcon size={16} />;
  if (name.includes("css")) return <CssIcon size={16} />;
  if (name.includes("react")) return <FileTypeReactjsIcon size={16} />;
  return null;
}

export default function CodingTime() {
  const { data, isLoading, isError } = useQuery<WakaTimeResponse>({
    queryKey: ["wakatime-summary"],
    queryFn: fetchWakaTimeData,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  // Loading skeleton — full width to match
  if (isLoading) {
    return (
      <div className="w-full rounded-lg  p-4">
        <div className="flex items-center gap-3">
          <div className="size-9 animate-pulse rounded-md bg-muted-foreground/15" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-48 animate-pulse rounded bg-muted-foreground/15" />
            <div className="h-3 w-32 animate-pulse rounded bg-muted-foreground/15" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full rounded-lg border border-border/50 bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <HugeiconsIcon icon={VisualStudioCodeIcon} className="size-5 text-primary" />
          <span>Coding activity unavailable</span>
        </div>
      </div>
    );
  }

  const latestEndTime = getLatestEndTime(data);
  const editorName = getEditorName(data);
  const totalText = data.cumulative_total?.text ?? "0 secs";
  const topLanguage = getTopLanguage(data);
  const timeAgo = latestEndTime ? getTimeAgo(latestEndTime) : "a while ago";
  const isLive = timeAgo === null;

  return (
    <div className="w-full rounded-lg px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <VscodeIcon
            size="32"
            />
        
          </div>
          <div className="flex flex-col min-w-0">
            <span className="flex items-center gap-1.5 text-sm text-title font-medium">
              {isLive ? (
                <span className="truncate flex items-center gap-1.5">
                  Currently coding in{" "}
                  <span className="font-semibold">{editorName}</span>
                      <span className="relative flex size-2 mr-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
                </span>
              ) : (
                <>
                  <span className="truncate">
                    Last active in{" "}
                    <span className="font-semibold">{editorName}</span>
                  </span>
                  <span className="size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                  <span className="shrink-0 text-muted-foreground">{timeAgo}</span>
                </>
              )}
            </span>
            <span className="text-xs text-muted-foreground">
              <span className="font-medium">{totalText}</span> coded today
            </span>
          </div>
        </div>

        {/* Right: Stats pills */}
        {topLanguage && (
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <CustomBadge href="#" name={topLanguage}>
              {getIconForLanguage(topLanguage)}
            </CustomBadge>
          </div>
        )}
      </div>
    </div>
  );
}