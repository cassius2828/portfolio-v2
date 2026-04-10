import { portfolioObjectUrl } from "./portfolio-public-url";

/**
 * Asset keys must use web-safe formats (JPEG, WebP, or PNG). HEIC does not render in most
 * browsers; former HEIC shots are referenced below as `.webp`—upload those exports beside the originals.
 */
export interface CommunityImpactPhoto {
  /** Resolved HTTPS URL (CDN or S3). */
  src: string;
  /** Accessibility label; also shown as the hover caption. */
  alt: string;
}

function photos(
  items: { key: string; alt: string }[],
): CommunityImpactPhoto[] {
  return items.map(({ key, alt }) => ({
    src: portfolioObjectUrl(key),
    alt,
  }));
}

/** `s3://…/portfolio/community/coaching/` */
export const communityImpactCoachingPhotos = photos([
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
    key: "portfolio/community/coaching/Imani_jeff_DVC.png",
    alt:
      "Showing support to former athletes in their collegiate careers — Jeff and Amani at DVC",
  },
  {
    key: "portfolio/community/coaching/practice-back-turned.png",
    alt: "Practice — from behind on the field",
  },
]);

/** `s3://…/portfolio/community/mentorship/` */
export const communityImpactMentorshipPhotos = photos([
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
]);

/** `s3://…/portfolio/community/art/` */
export const communityImpactArtPhotos = photos([
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
]);
