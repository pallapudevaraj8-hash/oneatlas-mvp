# Loom presentation script (about 7 minutes)

Use this as **speaking notes**, not as a substitute for showing the actual working website. Only claim a feature works after testing it yourself.

## 0:00–0:45 — Introduction

"Hello. I am presenting my Full Stack Engineer internship demo task. I built a project called OneAtlas Demo. It is an AI model discovery and comparison website. Its goal is to help developers understand models from different companies in one place. I used Next.js, React, TypeScript, Tailwind CSS, PostgreSQL and Prisma."

Show: Home page, headline, main navigation.

## 0:45–1:45 — Model discovery and search

"The first main feature is model discovery. Here I can see the available models. I can search by name, filter by research lab, model type or capability, and sort by price, context window or release date. These are real database queries, not a hardcoded list in the frontend."

Show: Search `gemini`, choose one filter, clear filter, sort.

## 1:45–2:35 — Model detail page

"When I click a model, I can see its overview, context window, maximum output, supported modalities, capabilities and available provider records. I also show sample pricing and benchmark values. All scores and sample prices are demonstration data and should not be mistaken for live values."

Show: Open one model, scroll details and provider prices.

## 2:35–3:30 — Model comparison

"Next, I select multiple models for comparison. The compare screen shows context window, pricing, modalities, supported capabilities, provider information and demo benchmark scores side by side. It helps users review the differences quickly."

Show: Add a second or third model; scroll comparison table.

## 3:30–4:15 — Rankings and directories

"The rankings page reads benchmark categories stored in PostgreSQL. I can change from Intelligence to Coding or Reasoning. I can also explore AI companies and provider directories."

Show: Rankings filter, AI Labs page, Providers page.

## 4:15–5:35 — Architecture and code

"On the frontend I used Next.js pages and reusable React components. The search and comparison pages call API routes. The API validates requests and uses Prisma to query the PostgreSQL database. I separated the code into pages, components, database queries and schema files to keep it easy to understand and maintain."

Show in VS Code:

- `prisma/schema.prisma` — explain Lab → Model, Model ↔ Provider, Model → Benchmark.
- `app/api/models/route.ts` — model API endpoint.
- `lib/queries.ts` — search/filter database query.
- `app/models/page.tsx` — React page and API fetch.
- Browser `/api/health` — live backend check.

## 5:35–6:35 — Technical decisions and challenges

"I chose PostgreSQL because the application contains related data. I used Prisma for type-safe database access. I used API query validation and limited pagination sizes. I made the interface responsive for phones and laptops. I also separated demonstration data from the UI so it can later be replaced with verified sources. A challenge was making filters and comparisons work consistently across the frontend and backend."

Note: Change the challenge to what you actually experienced while setting up or testing it.

## 6:35–7:15 — Limitations and conclusion

"This is an MVP. It does not offer live AI inference, and the sample data is not automatically updated. In the future I would connect verified model data sources, add timestamps and measurements, caching, and proper admin access. The project source code is available on my GitHub and the website is deployed on Vercel. Thank you."

Only say "deployed" if you have actually published and tested it.

## Loom checklist

- Show the working deployed site URL in the browser.
- Turn on microphone.
- Record 5–10 minutes.
- Explain code in your own words, not just click around.
- Make Loom video viewable by link.
- Test the video URL in a private browsing window.
