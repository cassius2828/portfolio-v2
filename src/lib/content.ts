// ============================================
// PERSONAL INFORMATION
// ============================================
export const personalInfo = {
  name: "Cassius Reynolds",
  initials: "CR",
  title: "Full Stack Developer",
  tagline:
    "I build scalable web applications with modern technologies. Passionate about creating efficient, user-friendly solutions.",
  footerDescription:
    "Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js.",
};

// ============================================
// CONTACT INFORMATION
// ============================================
export const contactInfo = {
  phone: "(707) 724-1815",
  email: "cassius.reynolds.dev@gmail.com",
};

// ============================================
// SOCIAL LINKS
// ============================================
export const socialLinks = {
  github: {
    url: "https://github.com/cassius2828",
    label: "GitHub",
    username: "cassius2828",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/cassius-reynolds",
    label: "LinkedIn",
    displayName: "Cassius Reynolds",
  },
  credly: {
    url: "https://www.credly.com/users/cassius-reynolds",
    label: "Credly",
  },
};

// ============================================
// SKILLS & TECHNOLOGIES
// ============================================
export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Python",
  "Django",
  "Tailwind CSS",
  "AWS",
  "GraphQL",
  "REST APIs",
  "Git",
  "Docker",
];

// Primary skills mentioned in the about section
export const primarySkills =
  "React, Express, MongoDB, PostgreSQL, JavaScript, TypeScript";

// Secondary skills mentioned in the about section
export const secondarySkills =
  "Python, Django, Remix, Next.js, Shopify, Cypress, AWS, system design, GraphQL";

// ============================================
// EXPERIENCE HIGHLIGHTS
// ============================================
export const highlights = [
  { label: "1+ Years Experience", icon: "💻" },
  { label: "Freelance Experience", icon: "💼" },
  { label: "Cloud Knowledge", icon: "☁️" },
  { label: "GA Graduate 2024", icon: "🎓" },
];

export const stats = {
  projects: { value: "15+", label: "Projects" },
  certifications: { value: "5+", label: "Certifications" },
  yearsExperience: { value: "1+", label: "Years Experience" },
};

// ============================================
// BIO / ABOUT ME
// ============================================
export const bioParagraphs = [
  `I am a passionate software engineer with strong expertise in React, Express, MongoDB, PostgreSQL, JavaScript, TypeScript, and building RESTful APIs. Additionally, I have working knowledge of Python, Django, Remix, Next.js, Shopify, Cypress, AWS, system design, GraphQL, and more.`,
  `Since starting my coding journey in December 2022, I've graduated from General Assembly's Software Engineering Bootcamp (2024), earned cloud certifications, and completed numerous real-world freelance projects.`,
  `I bring team-oriented skills, honed through collaboration with mid- and senior-level engineers on various group projects, along with managerial experience from previous roles. I hold a BA in Communication Studies and plan to further my education with a BS in Computer Science.`,
  `I'm continuously refining my skills while contributing to ongoing freelance projects, and I'm driven to build efficient, scalable solutions.`,
];

// Coding journey start date
export const codingJourneyStart = "December 2022";

// ============================================
// RESUME LINKS
// ============================================
export const resumeLinks = {
  s3: "https://5-06-sei.s3.us-west-1.amazonaws.com/portfolio/resume/Cassius_Reynolds_-_Software_Engineer.pdf",
  googleDrive:
    "https://drive.google.com/file/d/1Q3qWKgDjpOQriR39708bYz8hhhPDNFno/view?usp=drive_link",
};

// ============================================
// NAVIGATION
// ============================================
export const navItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/blogs", label: "Blog" },
  { href: "/#contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

export const footerNavLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blog" },
  { href: "/resume", label: "Resume" },
];

// ============================================
// FORM OPTIONS
// ============================================
export const connectionOptions = [
  { value: "recruiter", label: "Recruiter" },
  { value: "freelance client", label: "Freelance Client" },
  { value: "collaborative developer", label: "Collaborative Developer" },
  { value: "other", label: "Other" },
] as const;

export type ConnectionType = (typeof connectionOptions)[number]["value"];

