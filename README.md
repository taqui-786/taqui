# [Taqui (Final Portfolio)](https://github.com/taqui-786/portfolio_v3)

![Portfolio Banner](/public/showcase_banner.png)

Check out the code for my tech stack here: [Tech Stack Config](/app/config/techstackConfig.ts)

## Libraries & Services Used

Here is a list of the main libraries and services I used to build this project:

*   **Next.js 16**: Framework for building fast and modern web applications.
*   **React 19**: Frontend UI library for building component interfaces.
*   **TypeScript**: Static type-checking for code quality and reliability.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **Cloudflare Web Analytics**: Privacy-first, free visitor analytics and live page view tracking via Cloudflare GraphQL API.
*   **Framer Motion**: Motion library for smooth interactive animations.
*   **Lenis**: Smooth scrolling engine.
*   **Next View Transitions**: Smooth page transition effects.
*   **React Hook Form**: Form state management and validation handling.
*   **Zod**: Schema validation for client-side forms and API requests.
*   **React Hot Toast**: Toast notifications interface.
*   **Hugeicons**: Clean vector icon suite.
*   **Nodemailer**: Email sending service integration.

## SEO Automation

This project includes a dynamic SEO keyword system with Vercel Cron:

- Cron endpoint: `/api/cron/seo-keywords`
- Schedule source: `vercel.json`
- Cache invalidation: `revalidateTag("seo-keyword-trends-v1")`
- Keyword sources:
  - DEV tags API (`https://dev.to/api/tags`)
  - Hacker News official API (`https://hacker-news.firebaseio.com/v0`)

### Environment Variables

Add these variables in your Vercel Project Settings and local `.env`:

- `NEXT_PUBLIC_URL`: Canonical production URL (`https://taqui.in`)
- `CRON_SECRET`: Shared secret used to secure cron calls (`Authorization: Bearer <CRON_SECRET>`)
- `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`: Cloudflare Web Analytics beacon token for tracking
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token (`Account Analytics: Read` scope) for querying page views
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID for GraphQL queries
- `CLOUDFLARE_ZONE_ID`: Cloudflare Zone ID (optional fallback for domain proxy stats)
- `CLOUDFLARE_SITE_TAG`: Cloudflare Web Analytics Site Tag (optional filter)

### Manual Refresh (Local)

With `pnpm dev` running:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/seo-keywords
```
