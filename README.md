# [Taqui (Final Portfolio)](https://github.com/taqui-786/portfolio_v3)

![Portfolio Banner](/public/showcase_banner.png)

Check out the code for my tech stack here: [Tech Stack Config](/app/config/techstackConfig.ts)

## Libraries I Used

Here is a list of the main libraries I used to build this project and why I picked them:

*   **Next.js 16**: I used this because it is the best framework for building fast and modern websites.
*   **React 19**: This is the main tool I used to build all the components you see on the screen.
*   **TypeScript**: I used this to stop me from making silly mistakes in my code.
*   **Tailwind CSS**: This let me style the website really fast and make it look professional.
*   **Framer Motion**: I added this to make cool animations so the site feels fun and alive.
*   **Lenis**: This makes the scrolling feel buttery smooth and premium, which I really like.
*   **Next View Transitions**: I used this so the page changes look seamless and not clunky.
*   **React Hook Form**: This made building the contact form way easier than doing it from scratch.
*   **Zod**: I used this to double-check that the info people type in forms is correct.
*   **React Hot Toast**: This shows those nice little pop-up messages when you submit a form.
*   **Hugeicons**: I chose these icons because they are very clean and look sharp.
*   **Nodemailer**: This allows the website to actually send emails to my inbox.

## SEO Automation

This project now includes a dynamic SEO keyword system with Vercel Cron:

- Cron endpoint: `/api/cron/seo-keywords`
- Schedule source: `vercel.json`
- Cache invalidation: `revalidateTag("seo-keyword-trends-v1")`
- Keyword sources:
  - DEV tags API (`https://dev.to/api/tags`)
  - Hacker News official API (`https://hacker-news.firebaseio.com/v0`)

### Environment Variables

Add this in Vercel Project Settings and your local `.env`:

- `CRON_SECRET`: shared secret used to secure cron calls (`Authorization: Bearer <CRON_SECRET>`)
- `NEXT_PUBLIC_URL`: canonical production URL (for sitemap/canonical metadata)
  - For this project, set it to `https://taqui.in`

### Manual Refresh (Local)

With `pnpm dev` running:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/seo-keywords
```
