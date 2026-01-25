// import { PrismaClient } from "../generated/prisma";

// const db = new PrismaClient();

// // Sample featured projects from the old portfolio
// const featuredProjects = [
//   {
//     title: "LibrisList",
//     description:
//       "A book tracking and reading list management application that helps users organize their reading goals and track progress.",
//     githubLink: "https://github.com/cassius2828/libralist",
//     prodLink: "",
//     videoLink: "",
//     featured: true,
//     priorityLevel: 10,
//     technologies: [
//       { name: "React" },
//       { name: "Node.js" },
//       { name: "MongoDB" },
//       { name: "Express" },
//     ],
//   },
//   {
//     title: "Curate Sphere",
//     description:
//       "A content curation platform that allows users to discover, organize, and share curated collections of content.",
//     githubLink: "https://github.com/cassius2828/curate-sphere",
//     prodLink: "",
//     videoLink: "",
//     featured: true,
//     priorityLevel: 9,
//     technologies: [
//       { name: "React" },
//       { name: "TypeScript" },
//       { name: "PostgreSQL" },
//       { name: "Tailwind CSS" },
//     ],
//   },
//   {
//     title: "Sommelier Circle",
//     description:
//       "A wine discovery and social platform for wine enthusiasts to share reviews, recommendations, and connect with other wine lovers.",
//     githubLink: "https://github.com/cassius2828/sommelier-circle",
//     prodLink: "",
//     videoLink: "",
//     featured: true,
//     priorityLevel: 8,
//     technologies: [
//       { name: "React" },
//       { name: "Django" },
//       { name: "Python" },
//       { name: "PostgreSQL" },
//     ],
//   },
// ];

// const regularProjects = [
//   {
//     title: "Lineup Legends",
//     description:
//       "A fantasy sports lineup management application for creating and optimizing team lineups.",
//     githubLink: "https://github.com/cassius2828/lineup-legends",
//     prodLink: "",
//     videoLink: "",
//     featured: false,
//     priorityLevel: 7,
//     technologies: [
//       { name: "Express" },
//       { name: "EJS" },
//       { name: "MongoDB" },
//       { name: "SCSS" },
//     ],
//   },
//   {
//     title: "Portfolio Website",
//     description:
//       "Personal portfolio website showcasing projects, skills, and experience as a Full Stack Developer.",
//     githubLink: "https://github.com/cassius2828/portfolio",
//     prodLink: "",
//     videoLink: "",
//     featured: false,
//     priorityLevel: 6,
//     technologies: [
//       { name: "Next.js" },
//       { name: "TypeScript" },
//       { name: "tRPC" },
//       { name: "Tailwind CSS" },
//     ],
//   },
// ];

// async function main() {
//   console.log("🌱 Starting seed...");

//   // Clear existing data
//   await db.project.deleteMany();
//   console.log("✅ Cleared existing projects");

//   // Seed projects
//   const allProjects = [...featuredProjects, ...regularProjects];
//   for (const project of allProjects) {
//     await db.project.create({
//       data: project,
//     });
//     console.log(`✅ Created project: ${project.title}`);
//   }

//   console.log("🌱 Seed completed!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await db.$disconnect();
//   });

