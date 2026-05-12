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
  `Before SyncSmart, I ran a freelance practice delivering client-facing applications from concept to deployment—handling full project lifecycles including DNS, hosting, SEO, and backend systems. I'm currently pursuing a BS in Computer Science (Software Engineering) at SNHU with a 3.93 GPA and multi-term Honor Roll recognition, building on a Software Engineering Immersive from General Assembly and a BA in Communication Management (Cum Laude) from Azusa Pacific University.`,
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
  /** Portrait URL (`https://…` from CDN upload, or legacy S3 key resolved via `recommendationImageSrc`) */
  img: string;
  text: string;
  linkedinUrl: string;
  /** On md+, card spans both columns (full-width row in the recommendations grid) */
  fullWidth?: boolean;
}

const RECOMMENDATION_PORTRAITS_CDN =
  "https://d2uth2nw0znbpc.cloudfront.net/portfolio/recommendations";

export const recommendations: Recommendation[] = [
  {
    name: "Spencer Darr",
    role: "Director, Business Operations and Product at SyncSmart",
    img: `${RECOMMENDATION_PORTRAITS_CDN}/spencer-darr.jpg`,
    text: "I hired Cassius at SyncSmart, drawn by his unique background leading to software engineering and confident, relatable personality. We brought him in hoping for a quick learner and adaptable talent. He far surpassed that. Within 60 days he was delivering client-facing apps, and within 90 he was leading UI development for our team.\n\nCassius has a keen eye for detail and a natural instinct for anticipating user needs, and he's just as fast to act on them. He sees the whole picture - building features while staying communicative, collaborative, and open to feedback.\n\nI see him as a high-impact individual contributor today with a clear pathway into leadership. I would not hesitate to recommend Cassius as a coworker, contributor and person.",
    linkedinUrl: "https://www.linkedin.com/in/spencerglendarr/",
    fullWidth: true,
  },
  {
    name: "Jamel Burgos",
    role: "Senior Support Engineer",
    img: `${RECOMMENDATION_PORTRAITS_CDN}/jamel-burgos.jpg`,
    text: "I had the pleasure of working with Cassius during our time at SyncSmart. His work is consistently top-notch, and he brings a high level of expertise to every project. Cassius is a dedicated professional who would be a fantastic asset to any team.",
    linkedinUrl: "https://www.linkedin.com/in/jamel-burgos-831ab7a",
  },
  {
    name: "Eric Popelka",
    role: "Platform Architect",
    img: `${RECOMMENDATION_PORTRAITS_CDN}/eric-popelka.jpg`,
    text: "Cassius is a standout React/Node/Next.js developer who brought real impact to our team. He’s not only technically sharp, but also an incredibly hard worker and an excellent communicator. Add to that a genuinely friendly and positive personality, and you’ve got someone any team would be lucky to have. Highly recommend!",
    linkedinUrl: "https://www.linkedin.com/in/eric-popelka-b6024145/",
  },
  {
    name: "Daniel Lynton",
    role: "CEO",
    img: "",
    text: "As a first-time professional, Cassius demonstrated a solid foundation in full stack development and a genuine eagerness to learn and grow. He was dependable, collaborative, and took feedback constructively. He was highly engaged and personally invested in project outcomes. Cassius worked effectively alongside engineers far more senior than him without slowing down the rest of the team.\n\nCassius' ability to translate business requirements and customer experience goals to tangible outcomes is a rare find. I could trust him with business context, I collaborated with him on product direction, and he followed through after our conversations with production-ready features.",
    linkedinUrl: "",
    fullWidth: true,
  },
];

// ============================================
// RESUME LINKS
// ============================================
export const resumeLinks = {
  s3: "https://5-06-sei.s3.us-west-1.amazonaws.com/portfolio/resume/Resume%20_Cassius%20Reynolds_04_13_2026.pdf",
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
  { href: "/#recommendations", label: "Recommendations" },
  { href: "/community-impact", label: "Community Impact" },
  { href: "/blogs", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
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
