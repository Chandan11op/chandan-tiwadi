# Chandan Tiwadi Portfolio — Backend CMS & REST API

Production Express.js and MongoDB Atlas backend with Cloudinary media integration, JWT administrator authentication, role-based security, and Render deployment configuration.

---

## 🛠 Technology Stack

- **Runtime & Framework:** Node.js (ES Modules), Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens), bcryptjs password hashing, HttpOnly secure cookies + Authorization header Bearer token fallback
- **Media Management:** Cloudinary (in-memory streaming with Multer)
- **Security & Reliability:** Helmet headers, CORS origin allowlisting, Express-Rate-Limit, graceful shutdown handlers
- **Deployment Platform:** Render (Web Service)

---

## 📁 Directory Structure

```
server/
├── config/
│   ├── database.js          # MongoDB connection, auto-reconnect, connection state
│   └── cloudinary.js        # Cloudinary SDK credentials & configuration
├── controllers/
│   ├── authController.js        # Admin login, logout, me verification
│   ├── profileController.js     # Public bio & admin profile mutations
│   ├── projectController.js     # Projects CRUD & client confidentiality rules
│   ├── skillController.js       # Skills categorization & ordering
│   ├── certificateController.js # Certificate CRUD & asset handling
│   ├── educationController.js   # Degree & education records
│   ├── experienceController.js  # Work and freelance history
│   ├── resumeController.js      # Active resume control & PDF sync
│   ├── uploadController.js      # Memory-stream Cloudinary file uploads
│   └── statsController.js       # Dashboard overview aggregates
├── middleware/
│   ├── authMiddleware.js        # JWT verification (cookie / Bearer header)
│   ├── errorMiddleware.js       # Global error & 404 handlers
│   ├── rateLimitMiddleware.js   # Auth & API brute-force throttling
│   └── uploadMiddleware.js      # Multer memory storage & MIME validators
├── models/
│   ├── Admin.js             # Administrator credentials & bcrypt hashing
│   ├── Profile.js           # Portfolio identity, bio, stats, and links
│   ├── Project.js           # Portfolio projects with confidentiality rules
│   ├── Skill.js             # Technical skills by category
│   ├── Certificate.js       # Issued credentials & verification URLs
│   ├── Education.js         # Educational milestones & course listings
│   ├── Experience.js        # Professional freelance experience
│   └── Resume.js            # CV versions & active publication state
├── routes/
│   ├── authRoutes.js        # /api/auth
│   ├── profileRoutes.js     # /api/profile
│   ├── projectRoutes.js     # /api/projects
│   ├── skillRoutes.js       # /api/skills
│   ├── certificateRoutes.js # /api/certificates
│   ├── educationRoutes.js   # /api/education
│   ├── experienceRoutes.js  # /api/experience
│   ├── resumeRoutes.js      # /api/resume
│   ├── uploadRoutes.js      # /api/uploads
│   ├── healthRoutes.js      # /api/health (live, ready, summary)
│   └── statsRoutes.js       # /api/stats
├── scripts/
│   ├── createAdmin.js       # CLI to initialize or update admin password
│   └── migrateData.js       # Safe database population utility
├── utils/
│   ├── apiResponse.js       # Consistent JSON response envelope
│   └── cloudinaryHelpers.js # Streaming upload & asset deletion
├── .env.example             # Documented server environment variables
├── package.json             # Backend dependencies and scripts
└── server.js                # Server entry point & graceful shutdown
```

---

## 🚀 Local Quickstart

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment (`server/.env`)
Create `server/.env` based on `server/.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_long_random_jwt_secret_min_32_characters
JWT_EXPIRES_IN=7d
COOKIE_SECRET=your_long_random_cookie_secret
FRONTEND_URL=http://localhost:5173,https://chandan-tiwadi.pages.dev

# Cloudinary (Sign up free at cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Account
ADMIN_EMAIL=chandan110906@gmail.com
ADMIN_PASSWORD=YourSecurePassword123!
```

### 3. Initialize Admin & Seed Portfolio Data
```bash
# Create or update administrator account
npm run create-admin

# Migrate initial projects, certifications, education, and skills safely
npm run migrate
```

### 4. Start Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:5000`.

---

## 🩺 Health Check Endpoints

| Endpoint | Method | Purpose | Response Code |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | General health overview, uptime, DB status | `200` (or `503` if DB down) |
| `/api/health/live` | `GET` | Node.js process liveness probe | `200` |
| `/api/health/ready` | `GET` | **Render Health Check**: Validates DB readiness | `200` (Ready) / `503` (Not Ready) |

---

## 📡 API Endpoints Reference

### Public Endpoints (No Authentication Required)
- `GET /api/profile` — Retrieves published biography, contact info, and availability.
- `GET /api/projects` — Retrieves only published projects, enforcing client confidentiality rules.
- `GET /api/projects/slug/:slug` — Project details by slug.
- `GET /api/skills` — Retrieves skills grouped by category.
- `GET /api/certificates` — Retrieves published certifications with badge icons and image links.
- `GET /api/education` — Retrieves academic institutions and qualifications.
- `GET /api/experience` — Retrieves published freelance and professional engagements.
- `GET /api/resume/active` — Retrieves metadata for the currently active published CV.

### Administrator Endpoints (Requires Valid JWT / Cookie)
- `POST /api/auth/login` — Administrator login with rate-limiting.
- `POST /api/auth/logout` — Clears authentication cookie.
- `GET /api/auth/me` — Returns current authenticated admin profile.
- `GET /api/stats` — High-level dashboard aggregate counts.
- `PUT /api/profile` — Update portfolio personal details and bio.
- `GET /api/projects/all` — View all projects (including unpublished drafts).
- `POST /api/projects` — Create project.
- `PUT /api/projects/:id` — Update project.
- `DELETE /api/projects/:id` — Delete project and remove thumbnail from Cloudinary.
- `GET /api/skills/all` — View flat skills list.
- `POST /api/skills` — Add skill.
- `PUT /api/skills/:id` — Update skill.
- `DELETE /api/skills/:id` — Delete individual skill.
- `DELETE /api/skills/category/:categoryName` — Delete entire skill category.
- `GET /api/certificates/all` — View all certificates.
- `POST /api/certificates` — Create certificate record.
- `PUT /api/certificates/:id` — Update certificate details / file.
- `DELETE /api/certificates/:id` — Delete certificate and purge media.
- `GET /api/resume/all` — View all uploaded CV versions.
- `POST /api/resume` — Add resume record.
- `PUT /api/resume/:id/active` — Set targeted resume as the active public version.
- `DELETE /api/resume/:id` — Delete CV record.
- `POST /api/uploads/image` — Upload image to Cloudinary folder (`portfolio/certificates`, `portfolio/projects`, `portfolio/profile`).
- `POST /api/uploads/document` — Upload PDF to Cloudinary folder (`portfolio/resumes`).
- `DELETE /api/uploads/:public_id` — Delete asset from Cloudinary.

---

## ☁️ Production Deployment on Render

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Select your repository: `https://github.com/Chandan11op/chandan-tiwadi`.
4. Configure service settings:
   - **Name:** `chandan-tiwadi-api` (or preferred name)
   - **Region:** Singapore / Frankfurt / Oregon (closest to your audience)
   - **Root Directory:** `server` *(Important! Set this to `server`)*
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Configure Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (or leave default, Render sets `PORT` automatically)
   - `MONGODB_URI`: `mongodb+srv://<username>:<password>@portfoliodb.jymyixy.mongodb.net/portfolio?retryWrites=true&w=majority`
   - `JWT_SECRET`: Random 32+ character string
   - `COOKIE_SECRET`: Random 32+ character string
   - `FRONTEND_URL`: `https://chandan-tiwadi.pages.dev`
   - `CLOUDINARY_CLOUD_NAME`: your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: your Cloudinary API secret
   - `ADMIN_EMAIL`: `chandan110906@gmail.com`
   - `ADMIN_PASSWORD`: Your chosen admin password
6. **Health Check Path:**
   - Under **Advanced**, set **Health Check Path** to `/api/health/ready`.
7. Click **Create Web Service**.
8. Once deployed, note down your Render URL (e.g. `https://chandan-tiwadi-api.onrender.com`).
9. In Render Shell, you can run `node scripts/createAdmin.js` or `node scripts/migrateData.js` if needed.

