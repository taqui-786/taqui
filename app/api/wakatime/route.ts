import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "WakaTime API key not configured" },
      { status: 500 }
    );
  }

  // Build today's date range in YYYY-MM-DD format
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  // Also include yesterday to get a broader view
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const url = `https://wakatime.com/api/v1/users/current/summaries?start=${yesterdayStr}&end=${todayStr}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
      },
      next: { revalidate: 300 }, // Cache on server for 5 minutes
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch WakaTime data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch WakaTime data" },
      { status: 500 }
    );
  }
}
