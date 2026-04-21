import { NextResponse } from "next/server";

const WAKATIME_BASE = "https://wakatime.com/api/v1";

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "WakaTime API key not configured" },
      { status: 500 }
    );
  }

  const authHeader = `Basic ${Buffer.from(apiKey).toString("base64")}`;

  // Only fetch today so cumulative_total reflects today's coding time only
  const todayStr = new Date().toISOString().split("T")[0];
  const summariesUrl = `${WAKATIME_BASE}/users/current/summaries?start=${todayStr}&end=${todayStr}`;
  // Fetch user profile to get real last_heartbeat_at (actual last activity timestamp)
  const userUrl = `${WAKATIME_BASE}/users/current`;

  try {
    const [summariesRes, userRes] = await Promise.all([
      fetch(summariesUrl, {
        headers: { Authorization: authHeader },
        cache: "no-store", // always fetch fresh data from WakaTime
      }),
      fetch(userUrl, {
        headers: { Authorization: authHeader },
        cache: "no-store", // always fetch fresh data from WakaTime
      }),
    ]);

    if (!summariesRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch WakaTime summaries" },
        { status: summariesRes.status }
      );
    }

    const summariesData = await summariesRes.json();

    // Attach last_heartbeat_at from user profile when available
    let lastHeartbeatAt: string | null = null;
    if (userRes.ok) {
      const userData = await userRes.json();
      lastHeartbeatAt = userData?.data?.last_heartbeat_at ?? null;
    }

    return NextResponse.json(
      { ...summariesData, last_heartbeat_at: lastHeartbeatAt },
      {
        headers: {
          // Tell browsers, CDNs, and proxies never to cache this response
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch WakaTime data" },
      { status: 500 }
    );
  }
}
