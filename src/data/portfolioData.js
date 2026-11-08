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
      "I am Chandan Tiwadi, a Third-Year B.Sc. Information Technology scholar at K.P.B. Hinduja College of Commerce in Mumbai, Maharashtra, and a dedicated Full Stack Web Developer. Specializing in modern JavaScript, React.js, Node.js, Express.js, and MongoDB, I architect responsive, high-performance web applications that bridge intuitive user interface design with reliable server-side engineering.",
      "My technical journey combines rigorous academic computer science foundations with real-world client delivery. I have successfully engineered and delivered a production trading platform for a paid commercial client, built high-concurrency real-time WebSocket communication applications, and developed AI-assisted web architectures. By combining modern frameworks with AI developer tooling like Claude, ChatGPT, and Antigravity IDE, I solve complex software challenges with speed, precision, and clean code standards."
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
      tech: ["JavaScript", "React.js", "Node.js", "Database Technologies", "REST APIs"],
      description: "Engineered and shipped a production-grade full-stack trading web application for a commercial client under a paid freelance contract. Built responsive financial dashboard views, real-time portfolio management flows, and robust backend API endpoints with comprehensive authentication. All proprietary business logic and client trade data are handled under strict confidentiality.",
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
      tech: ["React.js", "Node.js", "MySQL", "Tailwind CSS", "AI Integration"],
      description: "Architecting a modern, intelligent e-commerce platform featuring AI-driven product discovery, contextual recommendations, and dynamic shopping experiences. Incorporating relational schema design, secure token-based user sessions, and streamlined catalog indexing as a flagship Third-Year B.Sc. IT engineering initiative.",
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
      tech: ["React.js", "Node.js", "Socket.IO", "Supabase", "Tailwind CSS"],
      description: "Designed and implemented a real-time collaborative messaging application featuring instant bi-directional message synchronization via Socket.IO, persistent user auth, and reactive channel states. Engineered from concept to full deployment in two days utilizing advanced AI-augmented development workflows.",
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
      period: "2025 - 2026",
      tech: ["Vite", "React.js", "Tailwind CSS", "Framer Motion", "Cloudflare Pages"],
      description: "Engineered a high-performance, dark-themed personal portfolio showcasing software development work, academic milestones, and technical capabilities. Features custom volumetric smoke shaders, Framer Motion transitions, responsive layouts, pre-rendered semantic HTML, and JSON-LD structured data for optimal search discovery.",
      links: {
        live: "https://chandan-tiwadi.pages.dev/",
        github: "https://github.com/Chandan11op/chandan-tiwadi"
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
      badgeIcon: "Intermediate",
      image: "/Galley/certificates/JavaScriptLU.png"
    },
    {
      title: "Python for Beginners",
      issuer: "Simplilearn",
      year: "2024",
      badgeIcon: "Basic",
      image: "/Galley/certificates/python certificate.png"
    },
    {
      title: "Website UI/UX Designing using ChatGPT",
      issuer: "Simplilearn",
      year: "2024",
      badgeIcon: "Intermediate",
      image: "/Galley/certificates/website Designing certificate.png"
    },
    {
      title: "HTML Certification",
      issuer: "STP Computer Education",
      year: "2024",
      badgeIcon: "Basic",
      image: "/Galley/certificates/HTML&CSS.png"
    },
    {
      title: "C Programming Basics",
      issuer: "Simplilearn",
      year: "2024",
      badgeIcon: "Basic",
      image: "/Galley/certificates/chandan c certificate.png"
    },
    {
      title: "Artificial Intelligence & Machine Learning",
      issuer: "LetsUpgrade",
      year: "2024",
      badgeIcon: "Expert",
      image: "/Galley/certificates/Chandan  Tiwadi_AIML.png"
    },
    {
      title: "Certificate of Completion",
      issuer: "LetsUpgrade",
      year: "2024",
      badgeIcon: "Professional Certificate",
      image: "/Galley/certificates/Chandan Tiwadi  Certificate.png"
    }
  ]
};
