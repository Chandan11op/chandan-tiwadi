# Chandan Tiwadi — Portfolio CMS & Production Architecture Setup Guide

Comprehensive setup, configuration, and deployment guide for the upgraded database-driven portfolio CMS powered by **MongoDB Atlas + Express.js + Cloudinary + Render + Cloudflare Pages**.

---

## 1. System Architecture Overview

```
┌─────────────────────────────────┐           ┌──────────────────────────────────┐
│   Cloudflare Pages (Frontend)   │           │    Render Node Service (Backend) │
│   https://chandan-tiwadi.pages.dev│ ────────> │    https://<service>.onrender.com│
│   • React 19 + Vite             │   CORS    │    • Express.js REST API         │
│   • Tailwind CSS + Framer Motion│           │    • JWT Auth & bcryptjs         │
│   • Skeleton Loading Shimmers   │           │    • Helmet & Express Rate Limit │
│   • Admin Portal CMS            │           │    • Health Probes (/api/health) │
└─────────────────────────────────┘           └──────────────┬───────────────────┘
                                                             │
                              ┌──────────────────────────────┴──────────────────────────────┐
                              ▼                                                             ▼
               ┌──────────────────────────────┐                              ┌──────────────────────────────┐
               │    MongoDB Atlas Cluster     │                              │     Cloudinary Media CDN     │
               │    • Profiles & Projects     │                              │     • Profile & Project Imgs │
               │    • Skills & Certificates   │                              │     • Certificate Scans/PDFs │
               │    • Education & Experience  │                              │     • Resumes/CV (PDFs)      │
               │    • Resumes & Admins        │                              │     • Streaming Uploads      │
               └──────────────────────────────┘                              └──────────────────────────────┘
```

---

## 2. MongoDB Atlas Configuration

### A. Create Cluster & Database User
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Create a free shared cluster (e.g. `Cluster0` or `portfoliodb`).
3. Under **Security -> Database Access**:
   - Click **Add New Database User**.
   - Authentication Method: **Password**.
   - Username: `chandan110906_db_user` (or your chosen username).
   - Generate or set a strong password. Store it safely.
   - Database User Privileges: **Read and write to any database** (or built-in `readWriteAnyDatabase`).
   - Click **Add User**.

### B. Configure Network Access (IP Whitelist)
1. Under **Security -> Network Access**:
   - Click **Add IP Address**.
   - For local development and Render cloud hosting, select **Allow Access from Anywhere** (`0.0.0.0/0`).
   - Click **Confirm**.

### C. Obtain Connection String
1. Under **Deployment -> Database**, click **Connect** on your cluster.
2. Select **Drivers** (Node.js).
3. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@portfoliodb.jymyixy.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your database user credentials.
5. Append the database name `/portfolio` before the `?` query parameter.

---

## 3. Cloudinary Media CDN Setup

Cloudinary handles images, certificate attachments, and PDF resumes using direct in-memory streaming:

1. Sign up for a free account at [Cloudinary](https://cloudinary.com/).
2. On your Cloudinary **Dashboard**, locate your credentials:
   - **Cloud Name** (`CLOUDINARY_CLOUD_NAME`)
   - **API Key** (`CLOUDINARY_API_KEY`)
   - **API Secret** (`CLOUDINARY_API_SECRET`)
3. Media is structured automatically into:
   - `portfolio/profile`
   - `portfolio/projects`
   - `portfolio/certificates`
   - `portfolio/resumes`
   - `portfolio/general`
4. Replacing or deleting an item in the admin portal purges the previous asset from Cloudinary to prevent orphaned storage.

---

## 4. Backend Setup & Local Running

### A. Environment Configuration (`server/.env`)
Create `server/.env` (never commit this file):
```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@portfoliodb.jymyixy.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT & Session Security
JWT_SECRET=generate_a_random_jwt_secret_min_32_characters
JWT_EXPIRES_IN=7d
COOKIE_SECRET=generate_a_random_cookie_secret_string

# Allowed Frontend Origins (Comma-separated)
FRONTEND_URL=http://localhost:5173,http://localhost:3000,https://chandan-tiwadi.pages.dev

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Account
ADMIN_EMAIL=chandan110906@gmail.com
ADMIN_PASSWORD=YourAdminPassword123!
```

### B. Run Migration & Admin Creation
```bash
# 1. Install server dependencies
cd server
npm install

# 2. Initialize or reset administrator account
npm run create-admin

# 3. Seed portfolio records into MongoDB Atlas safely (non-destructive)
npm run migrate

# 4. Start backend server
npm run dev
```

---

## 5. Frontend Setup & Local Running

### A. Configure Root `.env`
In the root directory, create or update `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_ADMIN_EMAIL=chandan110906@gmail.com
```

### B. Start Frontend
In the root directory:
```bash
npm run dev
```
Open `http://localhost:5173`. Both the public portfolio and `/admin-portal` are now dynamically linked to your local Express + MongoDB backend!

---

## 6. Render Backend Production Deployment

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub repository `https://github.com/Chandan11op/chandan-tiwadi`.
3. Fill in service settings:
   - **Name:** `chandan-tiwadi-api`
   - **Root Directory:** `server` *(CRITICAL: Must be set to `server`)*
   - **Environment:** `Node`
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add the following **Environment Variables** in Render:
   | Key | Value |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `MONGODB_URI` | `mongodb+srv://...` |
   | `JWT_SECRET` | *Your 32+ character secret* |
   | `JWT_EXPIRES_IN` | `7d` |
   | `COOKIE_SECRET` | *Your cookie secret* |
   | `FRONTEND_URL` | `https://chandan-tiwadi.pages.dev` |
   | `CLOUDINARY_CLOUD_NAME` | *Your Cloudinary cloud name* |
   | `CLOUDINARY_API_KEY` | *Your Cloudinary API key* |
   | `CLOUDINARY_API_SECRET` | *Your Cloudinary API secret* |
   | `ADMIN_EMAIL` | `chandan110906@gmail.com` |
   | `ADMIN_PASSWORD` | *Your admin password* |
5. **Health Check Configuration:**
   - Under **Advanced Settings**, set **Health Check Path** to:
     ```
     /api/health/ready
     ```
6. Click **Deploy Web Service**.
7. Note down your production Render URL (e.g. `https://chandan-tiwadi-api.onrender.com`).

> [!NOTE]
> On Render's free tier, the web service enters sleep mode after 15 minutes of inactivity. When a request arrives, it wakes up within 30-50 seconds. The frontend features graceful offline fallbacks and responsive skeleton shimmers so visitors never see a broken page.

---

## 7. Cloudflare Pages Frontend Configuration

1. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** -> Select `chandan-tiwadi`.
2. Go to **Settings -> Environment Variables**.
3. Set:
   ```env
   VITE_API_BASE_URL=https://chandan-tiwadi-api.onrender.com
   VITE_ADMIN_EMAIL=chandan110906@gmail.com
   ```
4. Trigger a deployment by pushing to `main` or clicking **Create deployment**.
5. Test live:
   - Visit `https://chandan-tiwadi.pages.dev/` -> content loads dynamically from MongoDB Atlas.
   - Visit `https://chandan-tiwadi.pages.dev/admin-portal` -> log in with your admin credentials.

---

## 8. Verification & QA Checklist

- [x] **Backend Health Check**: `/api/health/ready` returns `200 ok` and `database: connected`.
- [x] **JWT Authentication**: Protected routes return `401 Unauthorized` without a valid token.
- [x] **Client Project Confidentiality**: Client projects hide GitHub links unless explicitly published.
- [x] **Active Resume Download**: Download button dynamically points to published CV from database.
- [x] **Skeleton Shimmers**: Professional skeletons render during data fetching matching card layouts.
- [x] **Offline Fallback**: Bundled data displays gracefully if backend is offline.
- [x] **Security**: Zero database credentials or JWT secrets committed to Git repository.
