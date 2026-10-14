-- =========================================================================
-- Chandan Tiwadi Portfolio CMS - Supabase Database Schema & RLS Policies
-- =========================================================================

-- 1. Helper function to check if current authenticated user is authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT (auth.jwt() ->> 'email') = 'chandan110906@gmail.com';
$$;

-- 2. PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Chandan Tiwadi',
  initials TEXT NOT NULL DEFAULT 'CT',
  headline TEXT NOT NULL DEFAULT 'Full Stack Web Developer',
  tagline TEXT,
  bio TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  email TEXT NOT NULL DEFAULT 'chandan110906@gmail.com',
  phone TEXT,
  location TEXT DEFAULT 'Mumbai, India',
  avatar_url TEXT,
  resume_url TEXT,
  github_url TEXT DEFAULT 'https://github.com/Chandan11op',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/chandan-tiwadi/',
  instagram_url TEXT DEFAULT 'https://www.instagram.com/chandan_tiwadii/',
  twitter_url TEXT DEFAULT 'https://x.com/ChandanTiwadi11',
  portfolio_url TEXT DEFAULT 'https://first-basic-portfolio.vercel.app/',
  is_available BOOLEAN DEFAULT true,
  availability_text TEXT DEFAULT 'Currently Available',
  stats JSONB DEFAULT '[{"value": "3+", "label": "Projects Built"}, {"value": "1", "label": "Paid Client Project"}, {"value": "5+", "label": "Certifications"}, {"value": "Available", "label": "Currently Hiring"}]'::JSONB,
  hero_titles TEXT[] DEFAULT ARRAY['Full Stack Web Developer', 'React.js Developer', 'AI-Powered Builder', 'Freelancer']::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  project_type TEXT NOT NULL DEFAULT 'Current Working Project', -- 'Current Working Project', 'Personal Project', 'Client Project', 'Learning / Experiment'
  badge TEXT,
  period TEXT,
  short_description TEXT,
  full_description TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  category TEXT DEFAULT 'Full Stack',
  thumbnail_url TEXT,
  screenshots TEXT[] DEFAULT ARRAY[]::TEXT[],
  live_url TEXT,
  github_url TEXT,
  show_github_link BOOLEAN DEFAULT false, -- For client projects: defaults to false. For personal: can be true.
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  highlight_color TEXT DEFAULT 'default', -- 'gold', 'blue', 'electric-blue', 'default'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Frontend', -- 'Frontend', 'Backend', 'Databases', 'Tools & Platforms', 'AI Dev Tools', 'Core Concepts'
  proficiency TEXT,
  icon_name TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT,
  year TEXT,
  credential_id TEXT,
  verification_url TEXT,
  file_url TEXT,
  badge_icon TEXT DEFAULT 'award', -- 'js', 'python', 'ui', 'html', 'c', 'ai', 'award'
  is_published BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT DEFAULT 'Present',
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  period TEXT NOT NULL,
  details TEXT,
  relevant_courses TEXT[] DEFAULT ARRAY[]::TEXT[],
  image_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. RESUME / CV TABLE
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Chandan Tiwadi - Full Stack Developer CV',
  file_url TEXT NOT NULL,
  file_path TEXT,
  version TEXT DEFAULT '1.0',
  is_active BOOLEAN DEFAULT false,
  upload_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- 1. PROFILE RLS
CREATE POLICY "Public can view profile"
  ON public.profile FOR SELECT
  USING (true);

CREATE POLICY "Admin can modify profile"
  ON public.profile FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 2. PROJECTS RLS
-- Anonymous public can ONLY view published projects
CREATE POLICY "Public can view published projects only"
  ON public.projects FOR SELECT
  USING (is_published = true);

-- Admin can view all projects (drafts & published) and modify them
CREATE POLICY "Admin has full access to projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 3. SKILLS RLS
CREATE POLICY "Public can view skills"
  ON public.skills FOR SELECT
  USING (true);

CREATE POLICY "Admin has full access to skills"
  ON public.skills FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. CERTIFICATES RLS
-- Anonymous public can ONLY view published certificates
CREATE POLICY "Public can view published certificates only"
  ON public.certificates FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin has full access to certificates"
  ON public.certificates FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. EXPERIENCE & EDUCATION RLS
CREATE POLICY "Public can view experience"
  ON public.experience FOR SELECT
  USING (true);

CREATE POLICY "Admin has full access to experience"
  ON public.experience FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Public can view education"
  ON public.education FOR SELECT
  USING (true);

CREATE POLICY "Admin has full access to education"
  ON public.education FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 6. RESUMES RLS
-- Public can only view active published resumes
CREATE POLICY "Public can view active resume"
  ON public.resumes FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin has full access to resumes"
  ON public.resumes FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- =========================================================================
-- STORAGE BUCKETS SETUP & POLICIES
-- =========================================================================
-- Run this in Supabase SQL editor:
-- 1. Create buckets: 'portfolio-media' (public: true) and 'portfolio-docs' (public: true)
-- 
-- Storage RLS:
-- Public can read from portfolio-media and portfolio-docs
-- INSERT, UPDATE, DELETE restricted to admin:
--
-- CREATE POLICY "Admin can upload portfolio media"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id IN ('portfolio-media', 'portfolio-docs') AND public.is_admin());
--
-- CREATE POLICY "Admin can update portfolio media"
--   ON storage.objects FOR UPDATE
--   TO authenticated
--   USING (bucket_id IN ('portfolio-media', 'portfolio-docs') AND public.is_admin());
--
-- CREATE POLICY "Admin can delete portfolio media"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id IN ('portfolio-media', 'portfolio-docs') AND public.is_admin());
--
-- CREATE POLICY "Public can view portfolio media"
--   ON storage.objects FOR SELECT
--   TO public
--   USING (bucket_id IN ('portfolio-media', 'portfolio-docs'));
