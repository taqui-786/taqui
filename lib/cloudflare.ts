"use server";

import { unstable_cache } from "next/cache";

async function fetchPageViews(): Promise<number> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;

  if (!apiToken || !zoneId) {
    return 0;
  }

  try {
    const query = `
      query GetPageViews($zoneTag: string!) {
        viewer {
          zones(filter: { zoneTag: $zoneTag }) {
            httpRequestsAdaptiveGroups(
              filter: {
                datetime_geq: "2024-01-01T00:00:00Z"
              }
              limit: 1
            ) {
              sum {
                pageViews
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { zoneTag: zoneId },
      }),
      next: { revalidate: 180 },
    });

    if (!res.ok) {
      console.error("Failed to fetch Cloudflare analytics:", res.status);
      return 0;
    }

    const data = await res.json();
    const pageViews =
      data?.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups?.[0]?.sum
        ?.pageViews ?? 0;
    return pageViews;
  } catch (error) {
    console.error("Error fetching Cloudflare analytics:", error);
    return 0;
  }
}

export const getPageViews = unstable_cache(
  fetchPageViews,
  ["cloudflare-pageviews"],
  { revalidate: 180 }
);
