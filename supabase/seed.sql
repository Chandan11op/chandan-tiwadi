-- =========================================================================
-- Initial Seed Data: Chandan Tiwadi Portfolio
-- =========================================================================

-- 1. Insert Profile
INSERT INTO public.profile (
  name, initials, headline, tagline, bio, email, phone, location,
  github_url, linkedin_url, instagram_url, twitter_url, portfolio_url,
  is_available, availability_text, hero_titles
) VALUES (
  'Chandan Tiwadi',
  'CT',
  'Full Stack Web Developer',
  'Building real-world web apps with modern tech & AI tools.',
  ARRAY[
    'I''m Chandan Tiwadi, a Third-Year B.Sc. IT student at K.P.B. Hinduja College, Mumbai, and a passionate Full Stack Web Developer. I build real-world web applications using React.js, Node.js, and modern databases — and I leverage AI tools like Claude, ChatGPT, and Antigravity IDE to develop faster and smarter.',
    'I''ve delivered a paid freelance project, built a real-time chat app in just 2 days, and I''m currently developing an AI-enhanced e-commerce platform as my major project. I''m a quick learner who''s always eager to pick up new technologies and build things that actually work.'
  ],
  'chandan110906@gmail.com',
  '+91 8879753917',
  'Mumbai, India',
  'https://github.com/Chandan11op',
  'https://www.linkedin.com/in/chandan-tiwadi/',
  'https://www.instagram.com/chandan_tiwadii/',
  'https://x.com/ChandanTiwadi11',
  'https://first-basic-portfolio.vercel.app/',
  true,
  'Currently Available',
  ARRAY['Full Stack Web Developer', 'React.js Developer', 'AI-Powered Builder', 'Freelancer']
) ON CONFLICT DO NOTHING;

-- 2. Insert Projects
INSERT INTO public.projects (
  slug, title, project_type, badge, period, full_description, technologies,
  category, live_url, github_url, show_github_link, is_featured, is_published,
  display_order, highlight_color
) VALUES
(
  'smart-sip',
  'Smart SIP',
  'Client Project',
  '💼 Paid Client Project',
  'Jan 2025 – March 2025',
  'Developed and delivered a production-ready full-stack trading platform for a real client as a paid freelance engagement. Handled trade workflows, user interactions, and client-specific requirements. Project details are confidential.',
  ARRAY['JavaScript', 'React.js', 'Node.js', 'Database Technologies'],
  'Full Stack',
  'https://trade-web-clone.vercel.app/',
  'https://github.com/Chandan11op/Trade-Web',
  false, -- Client projects default to hiding repository link!
  true,
  true,
  1,
  'gold'
),
(
  'dripforge',
  'DripForge',
  'Personal Project',
  '🚀 3rd Year Major Project — In Progress',
  '2025 - Present',
  'Currently building an intelligent e-commerce platform with AI-powered features including smart product recommendations, scalable authentication, and modern shopping UX. This is my flagship major academic project.',
  ARRAY['React.js', 'Node.js', 'MySQL', 'AI Integration'],
  'AI / E-Commerce',
  NULL,
  'https://github.com/Chandan11op',
  true,
  true,
  true,
  2,
  'blue'
),
(
  'quickchat',
  'QuickChat',
  'Learning / Experiment',
  '⚡ 2nd Year Mini Project',
  '2024',
  'Built a real-time messaging app inspired by WhatsApp using Socket.IO for instant communication and Supabase for backend. Completed in just 2 days using AI-powered development tools.',
  ARRAY['React.js', 'Node.js', 'Socket.IO', 'Supabase'],
  'Real-Time App',
  NULL,
  'https://github.com/Chandan11op/QuickChat',
  true,
  false,
  true,
  3,
  'electric-blue'
),
(
  'portfolio',
  'Portfolio Website',
  'Personal Project',
  '🌐 Personal Project',
  '2025',
  'Designed and developed this very portfolio website you''re viewing right now — built with React and Tailwind CSS for a premium developer brand experience.',
  ARRAY['Vite', 'React.js', 'Tailwind CSS', 'Framer Motion'],
  'Frontend',
  'https://first-basic-portfolio.vercel.app/',
  'https://github.com/Chandan11op/portfolio',
  true,
  false,
  true,
  4,
  'default'
) ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Skills
INSERT INTO public.skills (name, category, display_order) VALUES
('HTML5', 'Frontend', 1),
('CSS3', 'Frontend', 2),
('JavaScript (ES6+)', 'Frontend', 3),
('React.js', 'Frontend', 4),
('Vite', 'Frontend', 5),
('Tailwind CSS', 'Frontend', 6),
('Responsive Web Design', 'Frontend', 7),
('Node.js', 'Backend', 8),
('Express.js', 'Backend', 9),
('REST APIs', 'Backend', 10),
('MySQL', 'Databases', 11),
('MongoDB', 'Databases', 12),
('Supabase', 'Databases', 13),
('Git', 'Tools & Platforms', 14),
('GitHub', 'Tools & Platforms', 15),
('VS Code', 'Tools & Platforms', 16),
('Postman', 'Tools & Platforms', 17),
('Vercel', 'Tools & Platforms', 18),
('ChatGPT', 'AI Dev Tools', 19),
('Gemini', 'AI Dev Tools', 20),
('Claude', 'AI Dev Tools', 21),
('Cursor', 'AI Dev Tools', 22),
('Antigravity IDE', 'AI Dev Tools', 23),
('Data Structures', 'Core Concepts', 24),
('Computer Networks', 'Core Concepts', 25),
('Software Engineering', 'Core Concepts', 26),
('DBMS', 'Core Concepts', 27),
('Auth & Authorization', 'Core Concepts', 28),
('Real-Time Communication', 'Core Concepts', 29);

-- 4. Insert Education
INSERT INTO public.education (institution, degree, period, details, relevant_courses, image_url, display_order) VALUES
(
  'K.P.B. Hinduja College of Commerce, Mumbai',
  'B.Sc. Information Technology',
  '2024 – Present | Third Year',
  'SGPA: S1: 8.36 | S2: 8.68 | S3: 7.64 | S4: 7.36',
  ARRAY['Web Development', 'Software Engineering', 'Computer Networks', 'Data Structures', 'Java', 'DBMS', 'IoT'],
  '/Galley/Education/kpb-hinduja-college-of-commerce-mumbai-361976.webp',
  1
),
(
  'Durgadevi Saraf Junior College, Mumbai',
  'HSC (12th)',
  '2022 – 2024',
  'Percentage: 79.17%',
  ARRAY[]::TEXT[],
  '/Galley/Education/durgadevi-saraf-junior-college.avif',
  2
),
(
  'St. Agnes English High School, Mumbai',
  'SSC (10th)',
  '2012 – 2022',
  'Percentage: 75.75%',
  ARRAY[]::TEXT[],
  '/Galley/Education/St_Agnes_English_High_School.jpg',
  3
);

-- 5. Insert Certifications
INSERT INTO public.certificates (title, issuer, year, badge_icon, file_url, is_published, display_order) VALUES
('JavaScript Bootcamp', 'LetsUpgrade', '2025', 'js', '/Galley/certificates/JavaScriptLU.png', true, 1),
('Python for Beginners', 'Simplilearn', '2024', 'python', '/Galley/certificates/python certificate.png', true, 2),
('Website UI/UX Designing using ChatGPT', 'Simplilearn', '2024', 'ui', '/Galley/certificates/website Designing certificate.png', true, 3),
('HTML Certification', 'STP Computer Education', '2024', 'html', '/Galley/certificates/HTML&CSS.png', true, 4),
('C Programming Basics', 'Simplilearn', '2024', 'c', '/Galley/certificates/chandan c certificate.png', true, 5),
('Artificial Intelligence & Machine Learning', 'LetsUpgrade', '2024', 'ai', '/Galley/certificates/Chandan  Tiwadi_AIML.png', true, 6),
('Certificate of Completion', 'LetsUpgrade', '2024', 'award', '/Galley/certificates/Chandan Tiwadi  Certificate.png', true, 7);
