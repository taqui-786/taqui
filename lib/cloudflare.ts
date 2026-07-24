"use server";

import { unstable_cache } from "next/cache";

async function fetchPageViews(): Promise<number> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const accountId =
    process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CLOUDFLARE_ZONE_ID;
  const siteTag = process.env.CLOUDFLARE_SITE_TAG;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;

  if (!apiToken) {
    console.error("Cloudflare Analytics Error: CLOUDFLARE_API_TOKEN is missing.");
    return 0;
  }

  // 1. Try querying Web Analytics (RUM) dataset: rumPageloadEventsAdaptiveGroups
  if (accountId) {
    try {
      const rumQuery = `
        query GetRumPageViews($accountTag: string!, $datetimeStart: string!) {
          viewer {
            accounts(filter: { accountTag: $accountTag }) {
              rumPageloadEventsAdaptiveGroups(
                filter: { datetime_geq: $datetimeStart }
                limit: 100
              ) {
                count
                dimensions {
                  siteTag
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
          query: rumQuery,
          variables: {
            accountTag: accountId,
            datetimeStart: "2024-01-01T00:00:00Z",
          },
        }),
        next: { revalidate: 180 },
      });

      if (res.ok) {
        const data = await res.json();
        const rumGroups =
          data?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups;

        if (Array.isArray(rumGroups) && rumGroups.length > 0) {
          let totalCount = 0;
          for (const item of rumGroups) {
            if (siteTag) {
              if (item.dimensions?.siteTag === siteTag) {
                totalCount += item.count || 0;
              }
            } else {
              totalCount += item.count || 0;
            }
          }
          if (totalCount > 0) {
            return totalCount;
          }
        }
      }
    } catch (e) {
      console.error("Error fetching Cloudflare RUM pageviews:", e);
    }
  }

  // 2. Fallback: Try Zone HTTP Requests dataset (if proxy DNS is enabled)
  if (zoneId) {
    try {
      const httpQuery = `
        query GetHttpPageViews($zoneTag: string!) {
          viewer {
            zones(filter: { zoneTag: $zoneTag }) {
              httpRequestsAdaptiveGroups(
                filter: { datetime_geq: "2024-01-01T00:00:00Z" }
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
          query: httpQuery,
          variables: { zoneTag: zoneId },
        }),
        next: { revalidate: 180 },
      });

      if (res.ok) {
        const data = await res.json();
        const pageViews =
          data?.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups?.[0]?.sum
            ?.pageViews ?? 0;
        if (pageViews > 0) {
          return pageViews;
        }
      }
    } catch (e) {
      console.error("Error fetching Cloudflare HTTP pageviews:", e);
    }
  }

  return 0;
}

export const getPageViews = unstable_cache(
  fetchPageViews,
  ["cloudflare-pageviews"],
  { revalidate: 180 }
);
