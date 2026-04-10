import { COMMUNITY_IMPACT_SECTION_DEFS } from "../community-impact-data";

describe("COMMUNITY_IMPACT_SECTION_DEFS", () => {
  it("should have exactly 3 sections", () => {
    expect(COMMUNITY_IMPACT_SECTION_DEFS).toHaveLength(3);
  });

  it("should have coaching, mentorships, and art sections", () => {
    const ids = COMMUNITY_IMPACT_SECTION_DEFS.map((s) => s.id);
    expect(ids).toContain("coaching");
    expect(ids).toContain("youth-center-mentorships");
    expect(ids).toContain("community-art-contributions");
  });

  it("every section should have a non-empty title and description", () => {
    COMMUNITY_IMPACT_SECTION_DEFS.forEach((section) => {
      expect(section.title.length).toBeGreaterThan(0);
      expect(section.description.length).toBeGreaterThan(0);
    });
  });

  it("every photo def should have a non-empty key and alt", () => {
    COMMUNITY_IMPACT_SECTION_DEFS.forEach((section) => {
      section.photoDefs.forEach((photo) => {
        expect(photo.key.length).toBeGreaterThan(0);
        expect(photo.alt.length).toBeGreaterThan(0);
      });
    });
  });

  it("no photo key should use .heic extension", () => {
    COMMUNITY_IMPACT_SECTION_DEFS.forEach((section) => {
      section.photoDefs.forEach((photo) => {
        expect(photo.key.toLowerCase()).not.toMatch(/\.heic$/);
      });
    });
  });

  it("all photo keys should start with portfolio/community/", () => {
    COMMUNITY_IMPACT_SECTION_DEFS.forEach((section) => {
      section.photoDefs.forEach((photo) => {
        expect(photo.key).toMatch(/^portfolio\/community\//);
      });
    });
  });
});
