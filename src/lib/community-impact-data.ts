/**
 * Static photo definitions (S3 keys + copy). URLs are resolved on the server via
 * `portfolioObjectUrl` using `NEXT_PUBLIC_CLOUDFRONT_URL` (see `env.js`; legacy env names merge as
 * fallbacks).
 *
 * Asset keys must use web-safe formats (JPEG, WebP, or PNG). HEIC does not render in most
 * browsers; former HEIC shots use `.webp`—upload those exports beside the originals.
 */
export interface CommunityImpactPhotoDef {
  key: string;
  alt: string;
}

export interface CommunityImpactPhoto {
  src: string;
  alt: string;
}

export interface CommunityImpactSectionDef {
  id: string;
  title: string;
  description: string;
  photoDefs: CommunityImpactPhotoDef[];
}

const coachingPhotoDefs: CommunityImpactPhotoDef[] = [
  {
    key: "portfolio/community/coaching/bubba-signing-day.JPG",
    alt: "Signing day celebration — Bubba",
  },
  {
    key: "portfolio/community/coaching/darien-signing-day.webp",
    alt: "Signing day celebration — Darien",
  },
  {
    key: "portfolio/community/coaching/team-photo.JPG",
    alt: "Team photo with athletes",
  },
  {
    key: "portfolio/community/coaching/vhs-practice-photo.jpg",
    alt: "Practice on the field",
  },
  {
    key: "portfolio/community/coaching/Amani_jeff_DVC.png",
    alt:
      "Showing support to former athletes in their collegiate careers — Jeff and Amani at DVC",
  },
  {
    key: "portfolio/community/coaching/practice-back-turned.png",
    alt: "Practice — from behind on the field",
  },
];

const mentorshipPhotoDefs: CommunityImpactPhotoDef[] = [
  {
    key: "portfolio/community/mentorship/comm-1.JPG",
    alt:
      "Toy drive and mentorship day with children and teens from the Richmond Youth Program, which partners with the Rosie the Riveter Foundation",
  },
  {
    key: "portfolio/community/mentorship/comm-2.webp",
    alt:
      "Group photo with Richmond Youth Program; hosted two accomplished Bay Area guest artists who spoke with the kids about their creative paths and what it took to build successful careers",
  },
  {
    key: "portfolio/community/mentorship/comm-3.webp",
    alt:
      "Motivational talk for the Richmond Youth Program on succeeding as a student-athlete in high school and college, and how discipline, teamwork, and lessons from sports transfer to school, work, and life",
  },
];

const artPhotoDefs: CommunityImpactPhotoDef[] = [
  {
    key: "portfolio/community/art/art-image-1.jpg",
    alt:
      "Newspaper article for the unveiling of the Rocky Hill Mural where I gave a speech about the importance of inclusion and experience of completing the project",
  },
  {
    key: "portfolio/community/art/art-image-2.webp",
    alt:
      "Photo with Community Activist and Board Member who invited me to speak at the MLK day event",
  },
  {
    key: "portfolio/community/art/art-image-3.JPG",
    alt:
      "Giving presentation and speech on MLK Day at Vacaville Community Center about the experience for the Rocky Hill Art Piece, what it meant to be a part of, and the importance of inclusion and representation for minority children",
  },
];

export const COMMUNITY_IMPACT_SECTION_DEFS: CommunityImpactSectionDef[] = [
  {
    id: "coaching",
    title: "Coaching",
    description:
      "I coached with Vacaville High School football at my alma mater for the 2021–22 and 2022–23 seasons, helping athletes grow within the program. From 2021–2025 I also trained athletes independently and at Fitness Explosion, where I was the lead trainer for youth athletes—bringing the same habits, knowledge, and energy I learned through my own career and supporting young people in sport and beyond.",
    photoDefs: coachingPhotoDefs,
  },
  {
    id: "youth-center-mentorships",
    title: "Youth Center Mentorships",
    description:
      "The Richmond Youth Program, affiliated with the Rosie the Riveter Foundation, is the main focus of this work—toy drives, mentorship days, guest speakers, and talks that meet young people where they are. I also continue mentoring former athletes and youth from other programs, building on the same commitment to growth, opportunity, and community.",
    photoDefs: mentorshipPhotoDefs,
  },
  {
    id: "community-art-contributions",
    title: "Community Art Contributions",
    description:
      "Main contributions include the Rocky Hill mural: I worked alongside lead artist Leslie Molera and helped guide youth artists from vision to finished wall. I spoke at the unveiling and again on MLK Day in Vacaville, CA. I also helped plan additional park art across Vacaville, including work at Trower Park.",
    photoDefs: artPhotoDefs,
  },
];
