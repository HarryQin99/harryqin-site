import { test, expect, type Page } from "@playwright/test";

const bodyBg = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test("inner pages link home", async ({ page }) => {
  for (const path of ["/projects", "/projects/editxiaobian", "/nope"]) {
    await page.goto(path);
    await expect(page.getByRole("link", { name: "Harry Qin", exact: true })).toHaveAttribute("href", "/");
  }
});

test("no theme toggle", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("button")).toHaveCount(0);
});

test.describe("follows system dark", () => {
  test.use({ colorScheme: "dark" });
  test("dark background", async ({ page }) => {
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(0, 0, 0)");
  });
});

test.describe("follows system light", () => {
  test.use({ colorScheme: "light" });
  test("light background", async ({ page }) => {
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(255, 255, 255)");
  });
});
