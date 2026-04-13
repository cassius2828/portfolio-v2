import { test, expect } from "@playwright/test";

test.describe("public pages", () => {
  test("homepage loads with heading and nav", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("body")).not.toHaveText(/application error/i);
  });

  test("community impact page loads with section headings", async ({
    page,
  }) => {
    await page.goto("/community-impact");
    await expect(
      page.getByRole("heading", { name: /community/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /coaching/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /rosie the riveter trust/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /community art contributions/i }),
    ).toBeVisible();
  });

  test("resume page loads", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByRole("heading", { name: /resume/i })).toBeVisible();
  });

  test("clients page loads", async ({ page }) => {
    await page.goto("/clients");
    await expect(page.locator("body")).not.toHaveText(/application error/i);
    await expect(page.getByRole("heading").first()).toBeVisible();
  });

  test("blogs page loads", async ({ page }) => {
    await page.goto("/blogs");
    await expect(page.locator("body")).not.toHaveText(/application error/i);
  });
});
