# OneAtlas Demo — AI Model Discovery and Intelligence Platform

A complete code-based **Full Stack Engineer internship MVP** built with **Next.js App Router, React, TypeScript, TailwindCSS, PostgreSQL and Prisma ORM**.

> **Not a copy of oneatlas.dev and not affiliated with its owners.** This is an educational implementation of the assignment. Data is a **demonstration seed**, including invented benchmark scores and indicative/example prices. **No prices, benchmark scores, provider offerings, or model specifications should be treated as current or verified.**

## What this project does

| Required feature | Implementation |
|---|---|
| Model discovery | Search name/description/lab; filter by lab, type, capability; sort by date, context, price, name; database pagination |
| Model details | Individual dynamic pages with specs, modalities, lab info, provider pricing, and example benchmark indexes |
| Model comparison | Select 1–4 models, compare specs, pricing and benchmark scores side by side |
| Rankings | Five selectable benchmark indexes, sortable by index, filter by model type |
| AI labs directory | Search labs and browse each lab's models |
| Provider directory | Search providers and view availability counts |
| Product experience | Dark responsive interface, reusable cards, mobile navigation, error and loading states |
| Backend | Next.js Route Handlers, Zod input validation, Prisma queries, normalized PostgreSQL database |

## Setup in VS Code — Windows

### 1. Install prerequisites

- [Node.js](https://nodejs.org/) (Node 22 recommended)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- A PostgreSQL database. The easiest hosted choice is [Neon](https://neon.tech/) (you can also use local PostgreSQL).

### 2. Open project and install

Unzip this project. Open its **`oneatlas-mvp`** folder in VS Code, then open **Terminal → New Terminal**.

```bash
npm install
```

### 3. Create database and configure environment

Create a project and database on Neon, then copy the PostgreSQL connection string. Run:

**Windows PowerShell**:

```powershell
Copy-Item .env.example .env
```

**macOS / Linux**:

```bash
cp .env.example .env
```

Open `.env` and replace `DATABASE_URL` with your own connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

For Neon, use the supplied connection URL including its exact database name and SSL options. Do **not** share it or commit `.env`.

### 4. Create schema and demo data

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

The seed intentionally resets the demo tables. Do not run it against a production database containing important data.

The seed creates 19 sample model entries, 9 research labs, 7 providers, provider-offering records, and benchmark indexes.

### 5. Start the website

```bash
npm run dev
```

Open **http://localhost:3000**. Use the navigation bar to test each page.

### 6. Verify the backend

Open the following URLs:

- http://localhost:3000/api/health (expect `status: ok`, model count 19)
- http://localhost:3000/api/models (list, pagination)
- http://localhost:3000/api/models?q=gemini&type=Multimodal (search and filtering)
- http://localhost:3000/api/models/deepseek-r1 (detail API)
- http://localhost:3000/api/compare?ids=gpt-4o,gemini-1-5-pro (multi-model comparison)
- http://localhost:3000/api/rankings?metric=Coding (demo ranking)
- http://localhost:3000/api/labs and http://localhost:3000/api/providers

### 7. Check types and create a production build

```bash
npm run typecheck
npm run build
```

If the database URL is missing/invalid, database-backed pages and APIs cannot load. Configure the database first.

## Deploy (Vercel + Neon)

1. Create a [GitHub](https://github.com/) repository (for example `oneatlas-mvp`).
2. In the unzipped project folder run:

   ```bash
   git init
   git add .
   git commit -m "Build OneAtlas full-stack internship MVP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/oneatlas-mvp.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub account. Your repository URL is **not real** until you create and push it.
3. Verify that `.env` is ignored by Git. It must never appear in your repository.
4. Go to [vercel.com](https://vercel.com/), choose **Add New → Project**, import your GitHub repository.
5. Add the `DATABASE_URL` environment variable to the Vercel project settings (Production, Preview, and Development as needed) using your actual Neon connection string.
6. Leave the framework preset as **Next.js**. Build command defaults to `npm run build`, which generates Prisma Client and builds Next.
7. Click **Deploy**, wait for deployment to finish, then open the generated `https://your-project.vercel.app` URL.
8. Visit `/api/health` on the deployed URL. If it says `ok` and 19 models, database access is working.
9. Test every page on your phone and a desktop browser before submitting.

**Database data before deployment:** You ran `prisma db push` and `db:seed` against the same Neon database pointed to by `DATABASE_URL`. The deployed site reads that data. There is no API key or live model inference required for this assignment.

## API routes

| Method & path | Purpose |
|---|---|
| `GET /api/models` | Paginated discovery; `q`, `lab`, `type`, `capability`, `sort`, `page`, `limit` |
| `GET /api/models/:slug` | Full model record |
| `GET /api/compare?ids=slug1,slug2` | Compare up to 4 models |
| `GET /api/rankings?metric=Intelligence&type=Text` | Sorted performance demo leaderboard |
| `GET /api/labs` | Lab directory with model counts |
| `GET /api/providers` | Provider directory with model counts |
| `GET /api/health` | Database connection smoke test |

All APIs are read-only, validate relevant inputs and return JSON; the schema and demonstration seed are maintained by Prisma.

## How it works (simple explanation)

```text
User opens the website
    ↓
Next.js pages show model cards and forms (React + Tailwind)
    ↓
Search/filter/compare triggers a Next.js API request
    ↓
API validates query and uses Prisma to query PostgreSQL
    ↓
PostgreSQL returns model, lab, provider, price and benchmark records
    ↓
API returns JSON → React renders updated information
```

Dynamic detail and home pages access Prisma on the server directly, rather than going through an unnecessary HTTP call to their own API.

**Database relationships:** One research lab has many models. One model can be served by many providers (using `ModelAvailability`, with provider-specific sample pricing). Each model has multiple benchmark category scores.

## Important engineering decisions

- **Real PostgreSQL database:** persistent data, no hardcoded model lists in frontend components.
- **Normalized schema:** removes duplicate lab and provider records; junction table holds provider-specific pricing.
- **Server-side filtering/pagination:** API does most work instead of shipping all data for every query.
- **Zod validation and bounded page size:** invalid API input gets a clear 400 response.
- **Reusable UI components:** consistent styles and easier maintenance.
- **Read-only public APIs:** sufficient for a discovery demo; avoids unsafe unauthenticated write operations.
- **Clear data disclaimer:** ranks/prices are demonstration numbers, not falsely presented as current real-world facts.

## Limitations & next improvements

- Catalog data is static until reseeded; there is **no automatic synchronization** with third-party platforms.
- Demo benchmark scores are **invented** and have no measurement methodology; a production app would require sourced/evaluated scores, timestamps and methodology.
- Price sorting loads matched records to compute the cheapest provider in application memory, suitable only for a small MVP. For large data, use database aggregation/indexing.
- Production-ready operations would benefit from authentication for admin edits, rate limiting, monitoring, E2E testing, and API caching.

## Files to read before the internship review

- `docs/COMPLETE_STEPS.md` — beginner-friendly instructions
- `docs/VIDEO_SCRIPT.md` — a 5–10-minute recording explanation
- `docs/TEST_CHECKLIST.md` — how to verify the work before submitting
- `prisma/schema.prisma` — database tables and relationships
- `prisma/seed.ts` — the editable illustrative model catalog

## Submission

Submit these three **real**, user-created items in the company Google Form:

1. Live deployed web URL (Vercel URL)
2. Public GitHub repository URL
3. Loom recording URL (5–10 minutes)

Submission link shown in assignment: https://forms.gle/oDQ6ucjpiFaZtCGL9

**You must publish and screen-record the project yourself**. The downloaded ZIP file is not a substitute for those three URLs. See `docs/VIDEO_SCRIPT.md`.
