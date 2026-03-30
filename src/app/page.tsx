import { api } from "~/trpc/server";
import { Hero } from "./_components/sections/Hero";
import { Projects } from "./_components/sections/Projects";
import { About } from "./_components/sections/About";
import { Recommendations } from "./_components/sections/Recommendations";
import { Contact } from "./_components/sections/Contact";
import { serializeProject } from "~/lib/serialize";

export default async function Home() {
  const [featuredProjects, regularProjects] = await Promise.all([
    api.project.getFeatured(),
    api.project.getRegular(),
  ]);

  return (
    <>
      <Hero featuredProjects={featuredProjects.map(serializeProject)} />
      <About />
      <Recommendations />
      <Projects projects={regularProjects.map(serializeProject)} />
      <Contact />
    </>
  );
}
