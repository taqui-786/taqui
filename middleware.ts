import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "taqui.in";

export function middleware(request: NextRequest) {
  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.next();
  }

  const host = request.headers.get("host")?.toLowerCase();
  if (!host) return NextResponse.next();

  if (host === CANONICAL_HOST) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https";
  url.host = CANONICAL_HOST;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
