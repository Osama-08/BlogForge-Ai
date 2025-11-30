# Deployment Guide for BlogForge AI

This guide will walk you through deploying your BlogForge AI application to [Vercel](https://vercel.com/), the recommended platform for Next.js.

## Prerequisites

1.  **GitHub Account**: Ensure your project is pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com/signup) using your GitHub account.
3.  **Cloud Database**: You need a PostgreSQL database accessible from the internet. Localhost databases won't work.
    *   **Recommended**: [Neon](https://neon.tech/) (Serverless Postgres), [Supabase](https://supabase.com/), or [Railway](https://railway.app/).

## Step 1: Set up a Cloud Database

Since Vercel is serverless, you need a cloud-hosted database.

1.  Create an account on **Neon** (or your preferred provider).
2.  Create a new project/database.
3.  Copy the **Connection String** (Postgres URL). It usually looks like:
    `postgres://user:password@ep-something.region.neon.tech/dbname?sslmode=require`

## Step 2: Deploy to Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `blogforge-ai` repository from GitHub.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be detected automatically).
    *   **Root Directory**: `./` (default).
    *   **Build Command**: `next build` (default).
    *   **Output Directory**: `.next` (default).
    *   **Install Command**: `npm install` (default).

5.  **Environment Variables**:
    Expand the "Environment Variables" section. You need to add all variables from your local `.env` file, but updated for production.

    | Variable | Description |
    | :--- | :--- |
    | `DATABASE_URL` | The connection string from **Step 1** (Cloud DB). |
    | `NEXTAUTH_SECRET` | Generate a random string (e.g., `openssl rand -base64 32`). |
    | `NEXTAUTH_URL` | Your Vercel domain (e.g., `https://your-project.vercel.app`). *Note: Vercel often handles this automatically, but setting it is safe.* |
    | `GOOGLE_CLIENT_ID` | From Google Cloud Console (add your Vercel domain to authorized origins/redirects). |
    | `GOOGLE_CLIENT_SECRET` | From Google Cloud Console. |
    | `GITHUB_ID` | From GitHub Developer Settings (update callback URL to Vercel domain). |
    | `GITHUB_SECRET` | From GitHub Developer Settings. |
    | `OPENAI_API_KEY` | Your OpenAI API Key. |
    | `GOOGLE_API_KEY` | Your Gemini API Key. |
    | `UPLOADTHING_SECRET` | From UploadThing dashboard. |
    | `UPLOADTHING_APP_ID` | From UploadThing dashboard. |

6.  Click **"Deploy"**.

## Step 3: Post-Deployment Setup

### 1. Initialize the Database
Vercel builds your app, but it doesn't automatically push your Prisma schema to the new cloud database. You need to do this manually from your local machine or via a Vercel build command override (advanced).

**Easiest Method (From Local Machine):**
1.  Update your local `.env` file temporarily to use the **Production Cloud Database URL** (or pass it inline).
2.  Run:
    ```bash
    npx prisma db push
    ```
    *This creates the tables in your cloud database.*
3.  (Optional) If you have a seed script:
    ```bash
    npx prisma db seed
    ```
4.  **Important**: Revert your local `.env` to your local database URL afterwards!

### 2. Update OAuth Callbacks
*   **Google**: Go to Google Cloud Console -> Credentials. Add `https://your-project.vercel.app` to "Authorized JavaScript origins" and `https://your-project.vercel.app/api/auth/callback/google` to "Authorized redirect URIs".
*   **GitHub**: Go to GitHub App settings. Update "Homepage URL" to `https://your-project.vercel.app` and "Authorization callback URL" to `https://your-project.vercel.app/api/auth/callback/github`.

### 3. Verify
Visit your Vercel URL. You should be able to log in, create posts, and use AI features.

## Troubleshooting

*   **Database Connection Errors**: Ensure your database provider allows connections from anywhere (0.0.0.0/0) or Vercel's IP ranges. Neon/Supabase usually allow this by default.
*   **Build Failures**: Check the "Build Logs" in Vercel. Common issues are type errors (run `npm run build` locally to debug) or missing environment variables.
*   **Dependency Conflicts**: We have added an `.npmrc` file to handle React 19 dependency conflicts automatically. You shouldn't need to change any settings.
*   **Image Uploads**: Ensure UploadThing keys are correct.
