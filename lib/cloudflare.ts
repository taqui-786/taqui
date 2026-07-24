"use server";

export async function getPageViews(): Promise<number> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const accountId =
    process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CLOUDFLARE_ZONE_ID;
  const siteTag = process.env.CLOUDFLARE_SITE_TAG;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const initialViews = parseInt(
    process.env.CLOUDFLARE_INITIAL_VIEWS || "0",
    10
  );

  if (!apiToken) {
    console.error(
      "Cloudflare Analytics Error: CLOUDFLARE_API_TOKEN is missing."
    );
    return initialViews;
  }

  // 1. Try querying Web Analytics (RUM) dataset: rumPageloadEventsAdaptiveGroups
  if (accountId) {
    const dayWindows = [90, 60, 30, 14, 7, 1];
    for (const days of dayWindows) {
      try {
        const d = new Date();
        d.setDate(d.getDate() - days);
        const datetimeStart = d.toISOString();

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
              datetimeStart,
            },
          }),
          cache: "no-store",
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
              return initialViews + totalCount;
            }
          }
        }
      } catch (e) {
        console.error(`Error fetching Cloudflare RUM pageviews (${days}d):`, e);
      }
    }
  }

  // 2. Fallback: Try Zone HTTP Requests dataset (if proxy DNS is enabled)
  if (zoneId) {
    try {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      const datetimeStart = d.toISOString();

      const httpQuery = `
        query GetHttpPageViews($zoneTag: string!, $datetimeStart: string!) {
          viewer {
            zones(filter: { zoneTag: $zoneTag }) {
              httpRequestsAdaptiveGroups(
                filter: { datetime_geq: $datetimeStart }
                limit: 1
              ) {
                sum {
                  visits
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
          variables: { zoneTag: zoneId, datetimeStart },
        }),
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        const visits =
          data?.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups?.[0]?.sum
            ?.visits ?? 0;
        if (visits > 0) {
          return initialViews + visits;
        }
      }
    } catch (e) {
      console.error("Error fetching Cloudflare HTTP pageviews:", e);
    }
  }

  return initialViews;
}
