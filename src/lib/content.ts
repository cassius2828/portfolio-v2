// ============================================
// PERSONAL INFORMATION
// ============================================
export const personalInfo = {
  name: "Cassius Reynolds",
  initials: "CR",
  title: "Frontend Engineer | Full Stack Developer",
  tagline:
    "Full-time engineer leading teams, driving system design decisions, and building scalable web applications. I combine technical expertise with strong leadership to deliver impactful solutions.",
  footerDescription:
    "Frontend Engineer specializing in React, Next.js, TypeScript, and cloud infrastructure.",
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
  // Frontend
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  // Backend
  "Node.js",
  "Express",
  "Python",
  // Databases
  "MongoDB",
  "PostgreSQL",
  "NoSQL",
  "SQL",
  // Cloud & Infrastructure
  "AWS",
  "GCP",
  "Vercel",
  "Heroku",
  // APIs & Architecture
  "REST APIs",
  "GraphQL",
  "System Design",
  // DevOps & Tools
  "Git",
  "CI/CD",
  "Docker",
  // Methodologies
  "Scrum",
  "Agile",
];

// Primary skills mentioned in the about section
export const primarySkills =
  "React, Next.js, TypeScript, Node.js, and cloud infrastructure";

// Secondary skills mentioned in the about section
export const secondarySkills =
  "Python, PostgreSQL, MongoDB, GraphQL, system design, and CI/CD pipelines";

// ============================================
// EXPERIENCE HIGHLIGHTS
// ============================================
export const highlights = [
  { label: "Full-Time Engineer", icon: "💼" },
  { label: "Team Lead", icon: "👥" },
  { label: "AWS & Scrum Certified", icon: "🏆" },
  { label: "CS Degree In Progress", icon: "🎓" },
];

export const stats = {
  projects: { value: "20+", label: "Projects" },
  certifications: { value: "AWS + Scrum", label: "Certified" },
  yearsExperience: { value: "2+", label: "Years Experience" },
};

// ============================================
// BIO / ABOUT ME
// ============================================
export const bioParagraphs = [
  `I'm a Frontend Engineer at a data integration company where I lead a team of developers and own multiple projects. Hired as a Junior Data Integration Platform Engineer in April 2025, I was promoted within 3 months to lead frontend development, contribute to system design decisions, and drive developer experience improvements across the organization.`,
  `My technical contributions include upgrading codebases to Next.js 16 and React 19, implementing major feature improvements from each upgrade, configuring authentication systems, and gaining hands-on experience with cloud infrastructure. I work cross-functionally with other engineering teams and bring dependable problem-solving skills to project planning and iterations.`,
  `I hold a BA in Communication Management and am currently pursuing a BS in Computer Science with a concentration in software engineering. My journey into tech began with freelance work in 2023, followed by General Assembly's Software Engineering Bootcamp in 2024, where I built a strong foundation before transitioning to full-time engineering.`,
  `Beyond code, I bring 13 years of football leadership experience—serving as team captain or on leadership council every year. I'm active in my community through the Black Student Association, youth mentoring, and community organizing. I contribute to open source projects and believe in understanding engineering fundamentals to complement AI tools, not replace them.`,
];

// Coding journey start date
export const codingJourneyStart = "2023";

// ============================================
// RECOMMENDATIONS
// ============================================
export interface Recommendation {
  name: string;
  role: string;
  img: string;
  text: string;
  linkedinUrl: string;
}

export const recommendations: Recommendation[] = [
  {
    name: "Eric Popelka",
    role: "Platform Architect",
    img: "https://media.licdn.com/dms/image/v2/D5603AQHQAUKsZNNCrw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1685231406979?e=1770854400&v=beta&t=Ly8jSfmq7SDeREoGRDpiH0ZoVnd8wZpNUhqoX_iHP4o",
    text: "Cassius is a standout React/Node/Next.js developer who brought real impact to our team. He’s not only technically sharp, but also an incredibly hard worker and an excellent communicator. Add to that a genuinely friendly and positive personality, and you’ve got someone any team would be lucky to have. Highly recommend!F",
    linkedinUrl: "https://www.linkedin.com/in/eric-popelka-b6024145/",
  }
  // Add your recommendations here
  // Example:
  // {
  //   name: "John Doe",
  //   role: "Senior Engineer at Company",
  //   text: "Cassius is an exceptional engineer who...",
  //   linkedinUrl: "https://linkedin.com/in/johndoe/details/recommendations",
  // },
];

// ============================================
// RESUME LINKS
// ============================================
export const resumeLinks = {
  s3: "https://5-06-sei.s3.us-west-1.amazonaws.com/portfolio/resume/Cassius_Reynolds_-_Software_Engineer.pdf",
  publicPortfolioUrl: "/images/Cassius_Reynolds_portfolio_2026.pdf",
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
