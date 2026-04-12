import { personalInfo, contactInfo, socialLinks } from "~/lib/content";

export function ResumeDocument() {
  return (
    <div id="resume-document" className="resume-page bg-white text-gray-900">
      {/* ─── Page 1 ─── */}
      <div className="resume-sheet">
        {/* Header */}
        <header className="border-b-2 border-gray-800 pb-3 text-center">
          <h1 className="mb-1 text-[26px] font-bold tracking-widest">
            {personalInfo.name.toUpperCase()}
          </h1>
          <p className="text-[11px] leading-relaxed">
            San Francisco, CA &bull; {contactInfo.phone} &bull;{" "}
            <a href={`mailto:${contactInfo.email}`} className="underline">
              {contactInfo.email}
            </a>
          </p>
          <div className="mt-1 flex items-center justify-center gap-4 text-[11px]">
            <a
              href={socialLinks.linkedin.url}
              className="inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              linkedin.com/in/cassius-reynolds
            </a>
            <a
              href={socialLinks.github.url}
              className="inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              github.com/cassius2828
            </a>
            <a
              href="https://cassiusreynolds.com"
              className="inline-flex items-center gap-1"
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              cassiusreynolds.com
            </a>
          </div>
        </header>

        {/* Professional Summary */}
        <Section title="Professional Summary">
          <p className="mb-1.5 text-[11px] leading-relaxed">
            Full-stack software engineer who thrives on building and scaling
            production systems from the ground up. Known for taking ownership of
            complex challenges, leading high-impact projects, and delivering
            reliable, scalable solutions across modern web architectures.
          </p>
          <ul className="ml-4 space-y-0.5 text-[11px]">
            <li className="list-disc">
              Experience leading both greenfield and existing production
              applications
            </li>
            <li className="list-disc">
              Strong focus on performance, scalability, and developer experience
            </li>
            <li className="list-disc">
              Background in multiple freelance and professional projects,
              delivering real-world solutions end-to-end
            </li>
          </ul>
        </Section>

        {/* Professional Experience */}
        <Section title="Professional Experience">
          {/* SyncSmart */}
          <div className="mb-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold">SyncSmart — Remote</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-[11px] italic">Full Stack Engineer</span>
              <span className="text-[11px]">Jul 2025 – Present</span>
            </div>
            <ul className="mt-0.5 ml-4 space-y-px text-[11px]">
              <li className="list-disc">
                Led development of multiple production applications, owning
                features from design through deployment
              </li>
              <li className="list-disc">
                Built and scaled integrations across CRM and ERP systems
                including HubSpot, NetSuite, PandaDoc, ConnectWise, and
                Microsoft Dynamics
              </li>
              <li className="list-disc">
                Designed and implemented authentication and billing systems
                using OAuth, Stripe, and Orb
              </li>
              <li className="list-disc">
                Improved developer experience and scalability through
                architecture decisions and reusable patterns
              </li>
              <li className="list-disc">
                Established CI/CD pipelines with GitHub Actions, reducing
                deployment issues and improving release reliability
              </li>
              <li className="list-disc">
                Partnered with product and cross-functional teams to deliver
                features faster and align technical solutions with business
                goals
              </li>
              <li className="list-disc">
                Integrated third-party systems including Slack, Jira, and Linear
                to enhance operational workflows
              </li>
              <li className="list-disc">
                Utilized TypeScript and Zod for strict validation, improving
                system reliability and reducing runtime errors
              </li>
            </ul>
          </div>

          <div className="mb-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] italic">
                Data Integration Platform Engineer
              </span>
              <span className="text-[11px]">Apr 2025 – Jul 2025</span>
            </div>
            <ul className="mt-0.5 ml-4 space-y-px text-[11px]">
              <li className="list-disc">
                Led migration of legacy systems to modern architectures,
                improving performance and maintainability
              </li>
              <li className="list-disc">
                Built and shipped production features using Next.js, React,
                tRPC, and NextAuth
              </li>
              <li className="list-disc">
                Contributed to new platform development, expanding product
                capabilities and customer offerings
              </li>
              <li className="list-disc">
                Collaborated with cross-functional teams to translate business
                requirements into scalable technical solutions
              </li>
            </ul>
          </div>

          {/* Freelance */}
          <div className="mb-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold">
                Freelance Software Developer
              </span>
              <span className="text-[11px]">Feb 2023 – Apr 2025</span>
            </div>
            <ul className="mt-0.5 ml-4 space-y-px text-[11px]">
              <li className="list-disc">
                Delivered multiple client-facing applications and integrations,
                managing full project lifecycles from concept to deployment
              </li>
              <li className="list-disc">
                Built custom websites and backend systems tailored to business
                needs
              </li>
              <li className="list-disc">
                Implemented solutions involving DNS, hosting, SEO, and
                third-party services
              </li>
              <li className="list-disc">
                Worked directly with clients to translate ideas into functional,
                production-ready applications
              </li>
            </ul>
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="mb-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold">
                Southern New Hampshire University
              </span>
              <span className="text-[11px]">Oct 2025 – Present</span>
            </div>
            <p className="text-[11px] italic">
              Bachelor of Science in Computer Science (Software Engineering)
            </p>
            <p className="text-[11px]">
              GPA: 3.85 &bull; Multi-term Honor Roll
            </p>
          </div>

          <div className="mb-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold">General Assembly</span>
              <span className="text-[11px]">May 2024 – Aug 2024</span>
            </div>
            <p className="text-[11px] italic">Software Engineering Immersive</p>
          </div>

          <div>
            <span className="text-[11px] font-bold">
              Azusa Pacific University
            </span>
            <p className="text-[11px] italic">
              Bachelor of Arts, Communication Management
            </p>
            <p className="text-[11px]">Graduated Cum Laude</p>
          </div>
        </Section>
      </div>

      {/* ─── Page 2 ─── */}
      <div className="resume-sheet resume-page-break">
        {/* Technical Skills */}
        <Section title="Technical Skills">
          <div className="grid grid-cols-3 gap-x-5 gap-y-1.5 text-[11px] leading-snug">
            <SkillGroup
              label="Programming Languages"
              items="JavaScript, TypeScript, Python, HTML, CSS, SQL"
            />
            <SkillGroup
              label="Frontend Technologies"
              items="React, Next.js, Tailwind CSS, HTML5, CSS3"
            />
            <SkillGroup
              label="Databases"
              items="PostgreSQL, MongoDB, Redis, SQL, NoSQL"
            />
            <SkillGroup
              label="Backend Technologies"
              items="Node.js, Express, tRPC, REST APIs, GraphQL"
            />
            <SkillGroup
              label="Cloud & DevOps"
              items="AWS, Google Cloud Platform, Docker, GitHub Actions, CI/CD"
            />
            <SkillGroup
              label="Authentication & Billing"
              items="OAuth, NextAuth, Stripe, Orb Billing"
            />
            <SkillGroup
              label="Development Tools"
              items="Git, GitHub, Postman, ESLint, Zod"
            />
            <SkillGroup
              label="Testing"
              items="Cypress (E2E), Playwright (E2E), Unit Testing"
            />
            <SkillGroup
              label="Other"
              items="AI-assisted development (Cursor), System Design, Agile/Scrum"
            />
            <div className="col-span-3">
              <SkillGroup
                label="System Integrations"
                items="HubSpot, NetSuite, PandaDoc, ConnectWise, Microsoft Dynamics, Slack, Jira, Linear"
              />
            </div>
          </div>
        </Section>

        {/* Project Highlights */}
        <Section title="Project Highlights">
          <ul className="ml-4 space-y-0.5 text-[11px]">
            <li className="list-disc">
              AI-powered mockup generator (in progress)
            </li>
            <li className="list-disc">
              Real-time integrations platform with multi-system data
              synchronization
            </li>
            <li className="list-disc">
              Full-stack applications with authentication, billing, and
              third-party API integrations
            </li>
          </ul>
        </Section>

        {/* Leadership & Community Involvement */}
        <Section title="Leadership & Community Involvement">
          <div className="mb-2">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold">
                Richmond Youth Center — Mentor &amp; Coach
              </span>
              <span className="text-[11px]">2024 – Present</span>
            </div>
            <ul className="mt-0.5 ml-4 space-y-px text-[11px] leading-snug">
              <li className="list-disc">
                Mentor and coach youth athletes (ages 12–21), providing guidance
                in athletics, personal development, and discipline
              </li>
              <li className="list-disc">
                Support skill development, leadership growth, and confidence
                building through structured training and mentorship
              </li>
              <li className="list-disc">
                Foster positive relationships and act as a role model within the
                local community
              </li>
            </ul>
          </div>

          <div className="mb-2">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold">
                Community Arts &amp; Cultural Events Volunteer
              </span>
              <span className="text-[11px]">2023</span>
            </div>
            <ul className="mt-0.5 ml-4 space-y-px text-[11px] leading-snug">
              <li className="list-disc">
                Participated in public speaking and community engagement for art
                installations and cultural events
              </li>
              <li className="list-disc">
                Contributed to MLK town meeting celebrations and public mural
                unveilings
              </li>
              <li className="list-disc">
                Supported community-driven initiatives focused on cultural
                awareness and artistic expression
              </li>
            </ul>
          </div>

          <div className="mb-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold">
                Azusa Pacific University Football Team
              </span>
              <span className="text-[11px]">2017 – 2021</span>
            </div>
            <p className="ml-4 text-[11px] leading-snug">
              Selected for leadership roles across multiple seasons,
              contributing to team culture and accountability
            </p>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold">
                Black Student Association — Board Member
              </span>
              <span className="text-[11px]">2018 – 2021</span>
            </div>
            <p className="ml-4 text-[11px] leading-snug">
              Organized events, facilitated discussions, and supported
              initiatives promoting community engagement and inclusion
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-3">
      <h2 className="mb-1.5 border-b border-gray-400 text-[12px] font-bold tracking-wide uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SkillGroup({ label, items }: { label: string; items: string }) {
  return (
    <div>
      <p className="font-bold">{label}:</p>
      <p className="font-normal">{items}</p>
    </div>
  );
}
