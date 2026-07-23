import Script from "next/script";

export default function CloudflareAnalytics() {
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;

  if (!token) {
    return null;
  }

  return (
    <Script
      id="cloudflare-analytics"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
      strategy="afterInteractive"
      defer
    />
  );
}
