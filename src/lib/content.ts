// ============================================
// PERSONAL INFORMATION
// ============================================
export const personalInfo = {
  name: "Cassius Reynolds",
  initials: "CR",
  title: "Full Stack Engineer",
  tagline:
    "Full Stack Engineer who builds and scales production systems from the ground up. I lead teams, own projects end-to-end, and deliver reliable, high-impact solutions across modern web architectures.",
  footerDescription:
    "Full Stack Engineer specializing in React, Next.js, TypeScript, and cloud infrastructure.",
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
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  // Backend
  "Node.js",
  "Express",
  "tRPC",
  "Python",
  // Databases & Caching
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "SQL",
  "NoSQL",
  // Cloud & Infrastructure
  "AWS",
  "GCP",
  "Vercel",
  "Heroku",
  "Docker",
  // APIs & Architecture
  "REST APIs",
  "GraphQL",
  "System Design",
  // Auth & Billing
  "OAuth",
  "NextAuth",
  "Stripe",
  // DevOps & Tools
  "Git",
  "GitHub Actions",
  "CI/CD",
  "Zod",
  "ESLint",
  "Postman",
  // Testing
  "Cypress",
  "Playwright",
  // Methodologies
  "Scrum",
  "Agile",
];

// Primary skills mentioned in the about section
export const primarySkills =
  "React, Next.js, TypeScript, Node.js, tRPC, and AWS";

export const secondarySkills =
  "PostgreSQL, MongoDB, Redis, Docker, Stripe, GitHub Actions, and system design";

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
  `Full Stack Engineer at SyncSmart, where I lead development of multiple production applications and own features end-to-end—from architecture and system design through deployment. Promoted from Data Integration Platform Engineer within three months, I now drive frontend strategy, build and scale integrations across CRM and ERP platforms (HubSpot, NetSuite, PandaDoc, ConnectWise, Microsoft Dynamics), and architect authentication and billing systems with OAuth, Stripe, and Orb.`,
  `I build with React, Next.js, TypeScript, Node.js, tRPC, and PostgreSQL/MongoDB, backed by AWS, Redis, Docker, and CI/CD pipelines via GitHub Actions. My work spans complex frontend systems, type-safe API design with Zod validation, performance optimization through caching strategies, and third-party integrations including Slack, Jira, and Linear. I hold AWS Cloud Practitioner, AWS AI Practitioner, and Professional Scrum Master I certifications.`,
  `Before SyncSmart, I ran a freelance practice delivering client-facing applications from concept to deployment—handling full project lifecycles including DNS, hosting, SEO, and backend systems. I'm currently pursuing a BS in Computer Science (Software Engineering) at SNHU with a 3.85 GPA and multi-term Honor Roll recognition, building on a Software Engineering Immersive from General Assembly and a BA in Communication Management (Cum Laude) from Azusa Pacific University.`,
  `Outside of engineering, I mentor and coach youth athletes at Rosie the Riveter Trust — Richmond, bringing the same discipline and leadership that defined 13 years of competitive football—serving as team captain or on the leadership council every season. I'm active in community organizing, contribute to open-source projects, and believe in mastering engineering fundamentals to complement AI-assisted development, not replace it.`,
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
    name: "Jamel Burgos",
    role: "Binary Magician",
    img: "https://media.licdn.com/dms/image/v2/C4E03AQEFxqlGYRx9Jw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1599843818434?e=1777507200&v=beta&t=EtBVELyGzfUkgGCzRBZJREFsZqSYGJTtu8HI8f8rUds",
    text: "I had the pleasure of working with Cassius during our time at SyncSmart. His work is consistently top-notch, and he brings a high level of expertise to every project. Cassius is a dedicated professional who would be a fantastic asset to any team.",
    linkedinUrl: "https://www.linkedin.com/in/jamel-burgos-831ab7a",
  },
  {
    name: "Eric Popelka",
    role: "Platform Architect",
    img: "https://media.licdn.com/dms/image/v2/D5603AQHQAUKsZNNCrw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1685231406979?e=1776297600&v=beta&t=3ICWHu6JQ3KEW1ImRz-t9ryEaeA1BA6O8Pd-CwlvBfk",
    text: "Cassius is a standout React/Node/Next.js developer who brought real impact to our team. He’s not only technically sharp, but also an incredibly hard worker and an excellent communicator. Add to that a genuinely friendly and positive personality, and you’ve got someone any team would be lucky to have. Highly recommend!",
    linkedinUrl: "https://www.linkedin.com/in/eric-popelka-b6024145/",
  },
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
  { href: "/clients", label: "Clients" },
  { href: "/community-impact", label: "Community Impact" },
  { href: "/blogs", label: "Blog" },
  { href: "/#contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

export const footerNavLinks = [
  { href: "/", label: "Home" },
  { href: "/community-impact", label: "Community Impact" },
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

/** Display label for the contact form role (e.g. `recruiter` → "Recruiter"). */
export function getConnectionLabel(value: ConnectionType): string {
  const opt = connectionOptions.find((o) => o.value === value);
  return opt?.label ?? value;
}
