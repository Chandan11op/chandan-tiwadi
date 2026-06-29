export const portfolioData = {
  emailConfig: {
    // Fill these details to switch from FormSubmit to EmailJS (enables highly professional HTML autoresponder emails)
    // To set this up, sign up on emailjs.com, configure a service & 2 templates, and paste the IDs below.
    serviceId: "",              // e.g. "service_xxxx"
    templateIdNotify: "",       // e.g. "template_xxxx" (notifies you of a new message)
    templateIdAutoresponder: "", // e.g. "template_yyyy" (sends responsive, professional email to client)
    publicKey: ""               // e.g. "user_xxxx" or your Public Key
  },
  personalInfo: {
    name: "Chandan Tiwadi",
    initials: "CT",
    location: "Mumbai, India",
    tagline: "Building real-world web apps with modern tech & AI tools.",
    bio: [
      "I'm Chandan Tiwadi, a Third-Year B.Sc. IT student at K.P.B. Hinduja College, Mumbai, and a passionate Full Stack Web Developer. I build real-world web applications using React.js, Node.js, and modern databases — and I leverage AI tools like Claude, ChatGPT, and Antigravity IDE to develop faster and smarter.",
      "I've delivered a paid freelance project, built a real-time chat app in just 2 days, and I'm currently developing an AI-enhanced e-commerce platform as my major project. I'm a quick learner who's always eager to pick up new technologies and build things that actually work."
    ],
    email: "chandan110906@gmail.com",
    phone: "+91 8879753917",
    github: "https://github.com/Chandan11op",
    linkedin: "https://www.linkedin.com/in/chandan-tiwadi/",
    instagram: "https://www.instagram.com/chandan_tiwadii/",
    twitter: "https://x.com/ChandanTiwadi11",
    portfolioUrl: "https://first-basic-portfolio.vercel.app/",
    resumeUrl: "#", // Placeholder or self-generated link
    stats: [
      { value: "3+", label: "Projects Built" },
      { value: "1", label: "Paid Client Project" },
      { value: "5+", label: "Certifications" },
      { value: "Available", label: "Currently Hiring" }
    ]
  },
  heroTitles: [
    "Full Stack Web Developer",
    "React.js Developer",
    "AI-Powered Builder",
    "Freelancer"
  ],
  skills: [
    {
      category: "Frontend",
      items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Vite", "Tailwind CSS", "Responsive Web Design"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "REST APIs"]
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB", "Supabase"]
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "VS Code", "Postman", "Vercel"]
    },
    {
      category: "AI Dev Tools",
      items: ["ChatGPT", "Gemini", "Claude", "Cursor", "Antigravity IDE"]
    },
    {
      category: "Core Concepts",
      items: ["Data Structures", "Computer Networks", "Software Engineering", "DBMS", "Auth & Authorization", "Real-Time Communication"]
    }
  ],
  projects: [
    {
      id: "smart-sip",
      title: "Smart SIP",
      badge: "💼 Paid Client Project",
      type: "Full Stack Trading Web Application",
      period: "Jan 2025 – March 2025",
      tech: ["JavaScript", "React.js", "Node.js", "Database Technologies"],
      description: "Developed and delivered a production-ready full-stack trading platform for a real client as a paid freelance engagement. Handled trade workflows, user interactions, and client-specific requirements. Project details are confidential.",
      links: {
        live: "https://trade-web-clone.vercel.app/",
        github: "https://github.com/Chandan11op/Trade-Web"
      },
      highlightColor: "gold" // Custom visual cues
    },
    {
      id: "dripforge",
      title: "DripForge",
      badge: "🚀 3rd Year Major Project — In Progress",
      type: "AI-Enhanced E-Commerce Platform",
      period: "2025 - Present",
      tech: ["React.js", "Node.js", "MySQL", "AI Integration"],
      description: "Currently building an intelligent e-commerce platform with AI-powered features including smart product recommendations, scalable authentication, and modern shopping UX. This is my flagship major academic project.",
      links: {
        github: "https://github.com/Chandan11op"
      },
      highlightColor: "blue"
    },
    {
      id: "quickchat",
      title: "QuickChat",
      badge: "⚡ 2nd Year Mini Project",
      type: "Real-Time Chat Application",
      period: "2024",
      tech: ["React.js", "Node.js", "Socket.IO", "Supabase"],
      description: "Built a real-time messaging app inspired by WhatsApp using Socket.IO for instant communication and Supabase for backend. Completed in just 2 days using AI-powered development tools.",
      links: {
        github: "https://github.com/Chandan11op/QuickChat"
      },
      highlightColor: "electric-blue"
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      badge: "🌐 Personal Project",
      type: "Personal Portfolio Website",
      period: "2025",
      tech: ["Vite", "React.js", "Tailwind CSS", "Framer Motion"],
      description: "Designed and developed this very portfolio website you're viewing right now — built with React and Tailwind CSS for a premium developer brand experience.",
      links: {
        live: "https://first-basic-portfolio.vercel.app/",
        github: "https://github.com/Chandan11op/portfolio"
      },
      highlightColor: "default"
    }
  ],
  education: [
    {
      institution: "K.P.B. Hinduja College of Commerce, Mumbai",
      degree: "B.Sc. Information Technology",
      period: "2024 – Present | Third Year",
      details: "SGPA: S1: 8.36 | S2: 8.68 | S3: 7.64 | S4: 7.36",
      relevantCourses: ["Web Development", "Software Engineering", "Computer Networks", "Data Structures", "Java", "DBMS", "IoT"],
      image: "/Galley/Education/kpb-hinduja-college-of-commerce-mumbai-361976.webp"
    },
    {
      institution: "Durgadevi Saraf Junior College, Mumbai",
      degree: "HSC (12th)",
      period: "2022 – 2024",
      details: "Percentage: 79.17%",
      image: "/Galley/Education/durgadevi-saraf-junior-college.avif"
    },
    {
      institution: "St. Agnes English High School, Mumbai",
      degree: "SSC (10th)",
      period: "2012 – 2022",
      details: "Percentage: 75.75%",
      image: "/Galley/Education/St_Agnes_English_High_School.jpg"
    }
  ],
  certifications: [
    {
      title: "JavaScript Bootcamp",
      issuer: "LetsUpgrade",
      year: "2025",
      badgeIcon: "js",
      image: "/Galley/certificates/JavaScriptLU.png"
    },
    {
      title: "Python for Beginners",
      issuer: "Simplilearn",
      year: "2024",
      badgeIcon: "python",
      image: "/Galley/certificates/python certificate.png"
    },
    {
      title: "Website UI/UX Designing using ChatGPT",
      issuer: "Simplilearn",
      year: "2024",
      badgeIcon: "ui",
      image: "/Galley/certificates/website Designing certificate.png"
    },
    {
      title: "HTML Certification",
      issuer: "STP Computer Education",
      year: "2024",
      badgeIcon: "html",
      image: "/Galley/certificates/HTML&CSS.png"
    },
    {
      title: "C Programming Basics",
      issuer: "Simplilearn",
      year: "2024",
      badgeIcon: "c",
      image: "/Galley/certificates/chandan c certificate.png"
    },
    {
      title: "Artificial Intelligence & Machine Learning",
      issuer: "LetsUpgrade",
      year: "2024",
      badgeIcon: "ai",
      image: "/Galley/certificates/Chandan  Tiwadi_AIML.png"
    },
    {
      title: "Certificate of Completion",
      issuer: "LetsUpgrade",
      year: "2024",
      badgeIcon: "award",
      image: "/Galley/certificates/Chandan Tiwadi  Certificate.png"
    }
  ]
};
