# Chandan Tiwadi — Portfolio CMS & Admin Portal Setup Guide

## 1. Overview
The Chandan Tiwadi portfolio now features a dual-interface architecture:
1. **Public Portfolio (`/`)**: High-performance, animated developer brand showcase that queries live published content from Supabase with graceful fallback to bundled offline data.
2. **Private Admin Portal (`/admin-portal`)**: Unlinked, password-protected administrative dashboard enforcing real server-side JWT authentication and server-side Row Level Security (RLS).

---

## 2. Supabase Cloud Setup

### A. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create or open your project.
2. Under **Project Settings -> API**, copy:
   - **Project URL**
   - **anon / public key**

### B. Execute Database Schema and Seed Data
1. In the Supabase Dashboard, open the **SQL Editor**.
2. Run the SQL script from `supabase/schema.sql`. This:
   - Defines the `is_admin()` server-side security definer function allowlisting `chandan110906@gmail.com`.
   - Creates the tables: `profile`, `projects`, `skills`, `certificates`, `experience`, `education`, and `resumes`.
   - Activates strict Row Level Security (RLS) policies ensuring anonymous visitors can **ONLY** read published records.
3. Run the SQL script from `supabase/seed.sql` to populate initial baseline data matching your portfolio.

### C. Create Storage Buckets
1. In Supabase Dashboard, navigate to **Storage**.
2. Create two public buckets:
   - `portfolio-media`: for thumbnails, project images, certificate scans, and avatars.
   - `portfolio-docs`: for CV/resume PDF files.
3. Apply storage policies allowing authenticated administrator insert/update/delete, and public read.

### D. Create Administrator User
1. In Supabase Dashboard, go to **Authentication -> Users**.
2. Click **Add User -> Create User**.
3. Set email to: `chandan110906@gmail.com`
4. Set your private password.
5. Confirm email (toggle email confirmed if available).

---

## 3. Environment Variables Configuration

Create a local `.env` file in the project root (never commit `.env` to Git):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_EMAIL=chandan110906@gmail.com
```

### Cloudflare Pages Production Configuration
In the Cloudflare Dashboard:
1. Navigate to **Workers & Pages** -> Select `chandan-tiwadi`.
2. Go to **Settings -> Environment Variables**.
3. Add the exact same environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_EMAIL`
4. Re-deploy the site.

---

## 4. GitHub Multi-Account Strategy & Cleanup Checklist

To keep personal and client repositories organized:
- **`Chandan11op`**: Portfolio-worthy personal applications, open-source utilities and production showcases.
- **`chandantiwadi-learning`**: Experiments, tutorial work, practice sandboxes.
- **Client Repositories**: Strictly private or hosted under client organizational accounts.

### Manual GitHub Cleanup Checklist
Before making any repository public or linking to it:
- [ ] **Client Authorization**: Ensure explicit written client approval before showcasing or linking client work.
- [ ] **No Client Secrets**: Run `git log` and inspect history for `.env`, API keys, database passwords, private endpoints, or JWT tokens.
- [ ] **Collaborator Audit**: Remove non-essential personal or temporary collaborator accounts.
- [ ] **Dependency & Build Test**: Check that GitHub Actions / CI builds cleanly without private submodules.
- [ ] **Clean Git History**: If any sensitive commits exist, scrub them with `git filter-repo` or BFG Repo-Cleaner before transferring.

---

## 5. Security Architecture Highlights
- **Server-Side Validation**: The frontend never trusts localStorage for authorization. Every admin mutation executes through Supabase authenticated sessions verified by PostgreSQL RLS.
- **Client Project Safeguards**: Client projects enforce `show_github_link = false` by default and protect client confidentiality.
- **Unlinked Admin Route**: `/admin-portal` is completely omitted from the public navigation and sitemap.
- **Zero Secrets in Bundles**: Only public anonymous keys and public URLs are passed to Vite. Service role keys and database passwords are never placed in frontend code.
