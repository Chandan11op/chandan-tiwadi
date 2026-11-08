import dotenv from 'dotenv';
import { connectDB, closeDB } from '../config/database.js';
import { Profile } from '../models/Profile.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Certificate } from '../models/Certificate.js';
import { Education } from '../models/Education.js';
import { Experience } from '../models/Experience.js';
import { Resume } from '../models/Resume.js';

dotenv.config();

const initialProfileData = {
  name: "Chandan Tiwadi",
  initials: "CT",
  headline: "Full Stack Web Developer",
  tagline: "Building real-world web apps with modern tech & AI tools.",
  bio: [
    "I'm Chandan Tiwadi, a Third-Year B.Sc. IT student at K.P.B. Hinduja College, Mumbai, and a passionate Full Stack Web Developer. I build real-world web applications using React.js, Node.js, and modern databases — and I leverage AI tools like Claude, ChatGPT, and Antigravity IDE to develop faster and smarter.",
    "I've delivered a paid freelance project, built a real-time chat app in just 2 days, and I'm currently developing an AI-enhanced e-commerce platform as my major project. I'm a quick learner who's always eager to pick up new technologies and build things that actually work."
  ],
  email: "chandan110906@gmail.com",
  phone: "+91 8879753917",
  location: "Mumbai, India",
  github_url: "https://github.com/Chandan11op",
  linkedin_url: "https://www.linkedin.com/in/chandan-tiwadi/",
  instagram_url: "https://www.instagram.com/chandan_tiwadii/",
  twitter_url: "https://x.com/ChandanTiwadi11",
  portfolio_url: "https://first-basic-portfolio.vercel.app/",
  is_available: true,
  availability_text: "Currently Available",
  stats: [
    { value: "4+", label: "Projects Built" },
    { value: "1", label: "Paid Client Project" },
    { value: "7+", label: "Certifications" },
    { value: "Available", label: "Currently Hiring" }
  ],
  hero_titles: [
    "Full Stack Web Developer",
    "React.js Developer",
    "AI-Powered Builder",
    "Freelancer"
  ]
};

const initialProjects = [
  {
    slug: "smart-sip",
    title: "Smart SIP",
    badge: "💼 Paid Client Project",
    project_type: "Client Project",
    period: "Jan 2025 – March 2025",
    technologies: ["JavaScript", "React.js", "Node.js", "Database Technologies"],
    category: "Full Stack",
    short_description: "Developed and delivered a production-ready full-stack trading platform for a real client as a paid freelance engagement.",
    full_description: "Developed and delivered a production-ready full-stack trading platform for a real client as a paid freelance engagement. Handled trade workflows, user interactions, and client-specific requirements. Project details are confidential.",
    live_url: "https://trade-web-clone.vercel.app/",
    github_url: "https://github.com/Chandan11op/Trade-Web",
    show_github_link: false, // Strict confidentiality rule: client project defaults to false
    is_featured: true,
    is_published: true,
    display_order: 1,
    highlight_color: "gold"
  },
  {
    slug: "dripforge",
    title: "DripForge",
    badge: "🚀 3rd Year Major Project — In Progress",
    project_type: "Personal Project",
    period: "2025 - Present",
    technologies: ["React.js", "Node.js", "MySQL", "AI Integration"],
    category: "AI / E-Commerce",
    short_description: "Intelligent e-commerce platform with smart AI product recommendations and modern shopping UX.",
    full_description: "Currently building an intelligent e-commerce platform with AI-powered features including smart product recommendations, scalable authentication, and modern shopping UX. This is my flagship major academic project.",
    live_url: "",
    github_url: "https://github.com/Chandan11op",
    show_github_link: true,
    is_featured: true,
    is_published: true,
    display_order: 2,
    highlight_color: "blue"
  },
  {
    slug: "quickchat",
    title: "QuickChat",
    badge: "⚡ 2nd Year Mini Project",
    project_type: "Learning / Experiment",
    period: "2024",
    technologies: ["React.js", "Node.js", "Socket.IO", "Supabase"],
    category: "Real-Time App",
    short_description: "Real-time messaging app inspired by WhatsApp using Socket.IO for instant communication.",
    full_description: "Built a real-time messaging app inspired by WhatsApp using Socket.IO for instant communication and Supabase for backend. Completed in just 2 days using AI-powered development tools.",
    live_url: "",
    github_url: "https://github.com/Chandan11op/QuickChat",
    show_github_link: true,
    is_featured: false,
    is_published: true,
    display_order: 3,
    highlight_color: "electric-blue"
  },
  {
    slug: "portfolio",
    title: "Portfolio Website",
    badge: "🌐 Personal Project",
    project_type: "Personal Project",
    period: "2025",
    technologies: ["Vite", "React.js", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    short_description: "Designed and developed this very portfolio website built with React and Tailwind CSS.",
    full_description: "Designed and developed this very portfolio website you're viewing right now — built with React and Tailwind CSS for a premium developer brand experience.",
    live_url: "https://first-basic-portfolio.vercel.app/",
    github_url: "https://github.com/Chandan11op/portfolio",
    show_github_link: true,
    is_featured: false,
    is_published: true,
    display_order: 4,
    highlight_color: "default"
  }
];

const initialSkills = [
  { name: "HTML5", category: "Frontend", display_order: 1 },
  { name: "CSS3", category: "Frontend", display_order: 2 },
  { name: "JavaScript (ES6+)", category: "Frontend", display_order: 3 },
  { name: "React.js", category: "Frontend", display_order: 4 },
  { name: "Vite", category: "Frontend", display_order: 5 },
  { name: "Tailwind CSS", category: "Frontend", display_order: 6 },
  { name: "Responsive Web Design", category: "Frontend", display_order: 7 },
  { name: "Node.js", category: "Backend", display_order: 8 },
  { name: "Express.js", category: "Backend", display_order: 9 },
  { name: "REST APIs", category: "Backend", display_order: 10 },
  { name: "MySQL", category: "Databases", display_order: 11 },
  { name: "MongoDB", category: "Databases", display_order: 12 },
  { name: "Supabase", category: "Databases", display_order: 13 },
  { name: "Git", category: "Tools & Platforms", display_order: 14 },
  { name: "GitHub", category: "Tools & Platforms", display_order: 15 },
  { name: "VS Code", category: "Tools & Platforms", display_order: 16 },
  { name: "Postman", category: "Tools & Platforms", display_order: 17 },
  { name: "Vercel", category: "Tools & Platforms", display_order: 18 },
  { name: "ChatGPT", category: "AI Dev Tools", display_order: 19 },
  { name: "Gemini", category: "AI Dev Tools", display_order: 20 },
  { name: "Claude", category: "AI Dev Tools", display_order: 21 },
  { name: "Cursor", category: "AI Dev Tools", display_order: 22 },
  { name: "Antigravity IDE", category: "AI Dev Tools", display_order: 23 },
  { name: "Data Structures", category: "Core Concepts", display_order: 24 },
  { name: "Computer Networks", category: "Core Concepts", display_order: 25 },
  { name: "Software Engineering", category: "Core Concepts", display_order: 26 },
  { name: "DBMS", category: "Core Concepts", display_order: 27 },
  { name: "Auth & Authorization", category: "Core Concepts", display_order: 28 },
  { name: "Real-Time Communication", category: "Core Concepts", display_order: 29 }
];

const initialEducation = [
  {
    institution: "K.P.B. Hinduja College of Commerce, Mumbai",
    degree: "B.Sc. Information Technology",
    period: "2024 – Present | Third Year",
    details: "SGPA: S1: 8.36 | S2: 8.68 | S3: 7.64 | S4: 7.36",
    relevant_courses: ["Web Development", "Software Engineering", "Computer Networks", "Data Structures", "Java", "DBMS", "IoT"],
    image_url: "/Galley/Education/kpb-hinduja-college-of-commerce-mumbai-361976.webp",
    display_order: 1
  },
  {
    institution: "Durgadevi Saraf Junior College, Mumbai",
    degree: "HSC (12th)",
    period: "2022 – 2024",
    details: "Percentage: 79.17%",
    relevant_courses: [],
    image_url: "/Galley/Education/durgadevi-saraf-junior-college.avif",
    display_order: 2
  },
  {
    institution: "St. Agnes English High School, Mumbai",
    degree: "SSC (10th)",
    period: "2012 – 2022",
    details: "Percentage: 75.75%",
    relevant_courses: [],
    image_url: "/Galley/Education/St_Agnes_English_High_School.jpg",
    display_order: 3
  }
];

const initialCertificates = [
  {
    title: "JavaScript Bootcamp",
    issuer: "LetsUpgrade",
    year: "2025",
    badge_icon: "Intermediate",
    file_url: "/Galley/certificates/JavaScriptLU.png",
    is_published: true,
    display_order: 1
  },
  {
    title: "Python for Beginners",
    issuer: "Simplilearn",
    year: "2024",
    badge_icon: "Basic",
    file_url: "/Galley/certificates/python certificate.png",
    is_published: true,
    display_order: 2
  },
  {
    title: "Website UI/UX Designing using ChatGPT",
    issuer: "Simplilearn",
    year: "2024",
    badge_icon: "Intermediate",
    file_url: "/Galley/certificates/website Designing certificate.png",
    is_published: true,
    display_order: 3
  },
  {
    title: "HTML Certification",
    issuer: "STP Computer Education",
    year: "2024",
    badge_icon: "Basic",
    file_url: "/Galley/certificates/HTML&CSS.png",
    is_published: true,
    display_order: 4
  },
  {
    title: "C Programming Basics",
    issuer: "Simplilearn",
    year: "2024",
    badge_icon: "Basic",
    file_url: "/Galley/certificates/chandan c certificate.png",
    is_published: true,
    display_order: 5
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    issuer: "LetsUpgrade",
    year: "2024",
    badge_icon: "Expert",
    file_url: "/Galley/certificates/Chandan  Tiwadi_AIML.png",
    is_published: true,
    display_order: 6
  },
  {
    title: "Certificate of Completion",
    issuer: "LetsUpgrade",
    year: "2024",
    badge_icon: "Professional Certificate",
    file_url: "/Galley/certificates/Chandan Tiwadi  Certificate.png",
    is_published: true,
    display_order: 7
  }
];

const initialExperience = [
  {
    role: "Freelance Full Stack Web Developer",
    organization: "Self-Employed / Client Engagements",
    location: "Remote / Mumbai",
    start_date: "Jan 2025",
    end_date: "Present",
    description: "Developing responsive and performant full-stack web applications, integrating AI workflows, and building customized trading platforms and web tools for real-world clients.",
    display_order: 1
  }
];

export const runMigration = async () => {
  try {
    console.log('🔄 Connecting to MongoDB Atlas for safe data migration...');
    await connectDB();

    console.log('\n--- 1. Migrating Profile ---');
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      await Profile.create(initialProfileData);
      console.log('✅ Profile document created.');
    } else {
      console.log('ℹ️ Profile already exists. Preserving existing record.');
    }

    console.log('\n--- 2. Migrating Projects ---');
    let projectsAdded = 0;
    let projectsSkipped = 0;
    for (const proj of initialProjects) {
      const existing = await Project.findOne({ slug: proj.slug });
      if (!existing) {
        await Project.create(proj);
        projectsAdded++;
      } else {
        projectsSkipped++;
      }
    }
    console.log(`✅ Projects: ${projectsAdded} added, ${projectsSkipped} already present.`);

    console.log('\n--- 3. Migrating Skills ---');
    let skillsAdded = 0;
    let skillsSkipped = 0;
    for (const skill of initialSkills) {
      const existing = await Skill.findOne({ name: skill.name, category: skill.category });
      if (!existing) {
        await Skill.create(skill);
        skillsAdded++;
      } else {
        skillsSkipped++;
      }
    }
    console.log(`✅ Skills: ${skillsAdded} added, ${skillsSkipped} already present.`);

    console.log('\n--- 4. Migrating Education ---');
    let eduAdded = 0;
    let eduSkipped = 0;
    for (const edu of initialEducation) {
      const existing = await Education.findOne({ institution: edu.institution, degree: edu.degree });
      if (!existing) {
        await Education.create(edu);
        eduAdded++;
      } else {
        eduSkipped++;
      }
    }
    console.log(`✅ Education: ${eduAdded} added, ${eduSkipped} already present.`);

    console.log('\n--- 5. Migrating Certificates ---');
    let certAdded = 0;
    let certSkipped = 0;
    for (const cert of initialCertificates) {
      const existing = await Certificate.findOne({ title: cert.title, issuer: cert.issuer });
      if (!existing) {
        await Certificate.create(cert);
        certAdded++;
      } else {
        certSkipped++;
      }
    }
    console.log(`✅ Certificates: ${certAdded} added, ${certSkipped} already present.`);

    console.log('\n--- 6. Migrating Experience ---');
    let expAdded = 0;
    let expSkipped = 0;
    for (const exp of initialExperience) {
      const existing = await Experience.findOne({ role: exp.role, organization: exp.organization });
      if (!existing) {
        await Experience.create(exp);
        expAdded++;
      } else {
        expSkipped++;
      }
    }
    console.log(`✅ Experience: ${expAdded} added, ${expSkipped} already present.`);

    console.log('\n--- 7. Migrating Default Resume ---');
    const existingResume = await Resume.findOne();
    if (!existingResume) {
      await Resume.create({
        title: "Chandan Tiwadi - Full Stack Developer CV",
        file_url: "/assets/Chandan Tiwadi.pdf",
        version: "1.0",
        is_active: true,
        upload_date: new Date()
      });
      console.log('✅ Default active resume created.');
    } else {
      console.log('ℹ️ Resume records already exist. Preserving current resume.');
    }

    console.log('\n🎉 Safe Migration Complete! All portfolio data is populated in MongoDB Atlas.');
    await closeDB();
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    await closeDB();
    process.exit(1);
  }
};

runMigration();

