# Complete process — explained in simple English

## What your email is asking for

It is an **internship test**. Your company wants to see whether you can build a working AI model comparison website. You only need to choose **one job role**. This project uses the **Full Stack Engineer** role, which means doing frontend, backend, and database.

**This is not a Word report assignment.** You must submit a live website, GitHub code and an explanation video. The website does not need to run real AI models: it needs to help people discover and compare models.

## Understand each technology

- **Next.js:** main website framework.
- **React:** makes reusable website sections (components).
- **TypeScript:** JavaScript with type checking.
- **Tailwind CSS:** styles your website for laptop and phone.
- **Node.js:** runs the Next.js backend.
- **PostgreSQL:** saves model information into real database tables.
- **Prisma ORM:** lets TypeScript read data from PostgreSQL.
- **API:** lets pages ask the server for data such as model lists or rankings.
- **GitHub:** online place to keep and share source code.
- **Vercel:** hosting website that gives you a public live URL.
- **Neon:** hosting service for your PostgreSQL database.
- **Loom:** records your screen while you explain how your project works.

## Tasks in the correct order

### Task 1 — Download and open project

Download `oneatlas-mvp.zip` from ChatGPT. Extract it. Open the extracted `oneatlas-mvp` folder in VS Code.

### Task 2 — Install software

Install **Node.js**, **Git** and **VS Code** if not already installed. Check with:

```bash
node -v
npm -v
git --version
```

### Task 3 — Install packages

In the VS Code terminal inside the folder, run:

```bash
npm install
```

### Task 4 — Set up your database

Create a free or paid Neon PostgreSQL database at https://neon.tech. Copy its connection string. Rename `.env.example` to `.env`; open `.env` and paste the string after `DATABASE_URL=`. Keep quotation marks. Never share this connection string.

### Task 5 — Create database tables and fill sample data

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

You now have real database tables, 19 model entries, 9 labs, and 7 providers. Prices and scores are illustrative, not real values.

### Task 6 — Start website

```bash
npm run dev
```

Open http://localhost:3000 in your browser. Try all six features:

1. Home page: overview and demo metrics.
2. Models: search GPT, choose a lab, filter by type, and sort by price.
3. Model details: open a model and see its specifications.
4. Compare: select 2–4 models and compare in a table.
5. Rankings: switch between Coding and Reasoning and filter types.
6. AI labs / Providers: browse organizations and their records.

### Task 7 — Check your code

Try:

```bash
npm run typecheck
npm run build
```

If a command fails, read the terminal error carefully before going to the next step.

### Task 8 — Upload code to GitHub

Create a repository under your own GitHub account. In your VS Code terminal:

```bash
git init
git add .
git commit -m "OneAtlas AI discovery internship project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/oneatlas-mvp.git
git push -u origin main
```

Replace `YOUR_USERNAME`. If Git asks you to log in, complete the login in your browser. Check that `.env` is NOT uploaded to GitHub.

### Task 9 — Publish to Vercel

Sign in to https://vercel.com with your GitHub account. Import your new repository. Under Environment Variables, add `DATABASE_URL` with the same Neon database connection string. Deploy it. Open the website URL Vercel provides. Open `/api/health` on that website and check it says `status: ok` and `models: 19`.

### Task 10 — Record Loom video

Go to https://www.loom.com/ and record your screen and voice. Speak in your own words using the script in `docs/VIDEO_SCRIPT.md`. Explain how search, comparison and rankings work, then show the source code, the Prisma database schema and the API endpoint. Aim for **5 to 10 minutes**.

### Task 11 — Final submission

Open the company Google Form: https://forms.gle/oDQ6ucjpiFaZtCGL9

Paste your **real working Vercel URL**, **your GitHub repository URL**, and **your Loom video URL**. Only submit after you have tested that all three links are accessible to someone else.

## If your teacher or interviewer asks questions

**Q: What is your project?** My project is OneAtlas, a website that helps developers discover and compare AI models.

**Q: Which role did you choose?** I completed the Full Stack Engineer role.

**Q: How does search work?** React sends a search term to the model API. The API checks the input and uses Prisma to search PostgreSQL. The result appears as model cards.

**Q: Why use PostgreSQL?** I need to store models, AI labs, providers and prices in related tables, so the website can retrieve consistent information.

**Q: What is Prisma?** Prisma connects my TypeScript code to PostgreSQL without writing SQL for every query.

**Q: How does comparison work?** The user selects up to four models. The comparison API fetches those models and React shows the details side by side.

**Q: Are the model scores real?** No. This is an MVP with demonstration benchmark data. Production data would need verified sources and a refresh process.

**Q: What was the biggest challenge?** Designing database relationships and connecting the frontend filters to API queries. (Only say this if it matches your real experience.)

## Remember

You can use an AI coding assistant, but the company expects you to understand, test, and own the project. Read every major file and practice demonstrating the features yourself.
