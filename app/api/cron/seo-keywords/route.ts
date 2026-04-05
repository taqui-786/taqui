import { getSeoKeywordPool, SEO_KEYWORD_CACHE_TAG } from "@/lib/seo/keyword-intelligence";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  return authHeader === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(SEO_KEYWORD_CACHE_TAG, "max");
  const refreshedKeywords = await getSeoKeywordPool(40);

  return NextResponse.json({
    ok: true,
    refreshedAt: new Date().toISOString(),
    cacheTag: SEO_KEYWORD_CACHE_TAG,
    keywordsCount: refreshedKeywords.length,
    topKeywords: refreshedKeywords.slice(0, 20),
  });
}
