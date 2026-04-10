import {
  navItems,
  footerNavLinks,
  connectionOptions,
  resumeLinks,
  personalInfo,
} from "../content";

describe("navItems", () => {
  it("should include expected page routes", () => {
    const hrefs = navItems.map((item) => item.href);
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/clients");
    expect(hrefs).toContain("/community-impact");
    expect(hrefs).toContain("/blogs");
    expect(hrefs).toContain("/resume");
  });

  it("should have a label for every item", () => {
    navItems.forEach((item) => {
      expect(item.label.length).toBeGreaterThan(0);
    });
  });
});

describe("footerNavLinks", () => {
  it("should include Home and Resume", () => {
    const hrefs = footerNavLinks.map((link) => link.href);
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/resume");
  });
});

describe("connectionOptions", () => {
  it("should have 4 options", () => {
    expect(connectionOptions).toHaveLength(4);
  });

  it("should include recruiter, freelance client, collaborative developer, other", () => {
    const values = connectionOptions.map((opt) => opt.value);
    expect(values).toContain("recruiter");
    expect(values).toContain("freelance client");
    expect(values).toContain("collaborative developer");
    expect(values).toContain("other");
  });
});

describe("resumeLinks", () => {
  it("should have s3, publicPortfolioUrl, and googleDrive keys", () => {
    expect(resumeLinks).toHaveProperty("s3");
    expect(resumeLinks).toHaveProperty("publicPortfolioUrl");
    expect(resumeLinks).toHaveProperty("googleDrive");
  });

  it("s3 link should point to amazonaws.com", () => {
    expect(resumeLinks.s3).toMatch(/amazonaws\.com/);
  });
});

describe("personalInfo", () => {
  it("should have name and initials", () => {
    expect(personalInfo.name).toBe("Cassius Reynolds");
    expect(personalInfo.initials).toBe("CR");
  });
});
