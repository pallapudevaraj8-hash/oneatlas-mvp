# Test checklist before submission

Tick each box yourself after testing. Do not claim these tests were run automatically.

## Installation and database

- [ ] `npm install` finished without errors.
- [ ] Neon or other PostgreSQL database connection configured in `.env`.
- [ ] `npx prisma db push` created database tables.
- [ ] `npm run db:seed` inserted 19 sample models.
- [ ] `npm run typecheck` passed.
- [ ] `npm run build` passed.
- [ ] `/api/health` returns `status: ok`, `models: 19`.

## User experience

- [ ] Home loads with 19 models / 9 labs / 7 providers.
- [ ] Models search for `gemini` returns matching entries.
- [ ] Filtering by lab works.
- [ ] Filtering by model type works.
- [ ] Filtering by capability works.
- [ ] Sorting by context window and price works.
- [ ] Pagination previous/next works if more than 12 matches.
- [ ] Clicking a model opens its detail page.
- [ ] Comparison works with 2–4 selected models.
- [ ] Removing a model changes the comparison.
- [ ] Ranking category buttons update the leaderboard.
- [ ] Lab directory loads and its model count is correct.
- [ ] Provider directory loads and its model count is correct.
- [ ] Phone-size display has working mobile menu and readable layouts.
- [ ] No obvious errors appear in browser developer console.

## Publication

- [ ] GitHub repository contains source code, not `.env`.
- [ ] Vercel has a `DATABASE_URL` environment variable.
- [ ] Vercel deployment is marked Ready.
- [ ] Public live URL works in private/incognito browser.
- [ ] Public GitHub URL works in private/incognito browser.
- [ ] Loom video length is 5–10 minutes and link opens.
- [ ] Submitted all three URLs in the Google Form.

## Known honest limitations

- This is a demonstration catalog, not automatically synchronized live AI model data.
- Sample benchmark scores, sample prices and provider availability are not verified.
- Public pages are read-only; authenticated editing is intentionally out of MVP scope.
