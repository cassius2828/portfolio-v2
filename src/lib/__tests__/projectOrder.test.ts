import { withLineupLegendsFirst } from "../projectOrder";

describe("withLineupLegendsFirst", () => {
  it("should move Lineup Legends to the front when it is not first", () => {
    const projects = [
      { title: "Portfolio" },
      { title: "Google Books" },
      { title: "Lineup Legends" },
    ];
    const result = withLineupLegendsFirst(projects);
    expect(result[0]!.title).toBe("Lineup Legends");
    expect(result).toHaveLength(3);
  });

  it("should preserve order when Lineup Legends is already first", () => {
    const projects = [
      { title: "Lineup Legends" },
      { title: "Portfolio" },
      { title: "Google Books" },
    ];
    const result = withLineupLegendsFirst(projects);
    expect(result).toEqual(projects);
  });

  it("should return the same array when Lineup Legends is not present", () => {
    const projects = [{ title: "Portfolio" }, { title: "Google Books" }];
    const result = withLineupLegendsFirst(projects);
    expect(result).toEqual(projects);
  });

  it("should handle an empty array", () => {
    const result = withLineupLegendsFirst([]);
    expect(result).toEqual([]);
  });

  it("should not mutate the original array", () => {
    const projects = [{ title: "Portfolio" }, { title: "Lineup Legends" }];
    const original = [...projects];
    withLineupLegendsFirst(projects);
    expect(projects).toEqual(original);
  });

  it("should keep relative order of other projects", () => {
    const projects = [
      { title: "A" },
      { title: "B" },
      { title: "Lineup Legends" },
      { title: "C" },
    ];
    const result = withLineupLegendsFirst(projects);
    expect(result.map((p) => p.title)).toEqual([
      "Lineup Legends",
      "A",
      "B",
      "C",
    ]);
  });
});
