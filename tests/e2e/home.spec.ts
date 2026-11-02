import { test, expect } from "@playwright/test";

const LEAD =
  "I'm a backend engineer in Melbourne. Most of my work has been in systems where money moves: disputes at Cash App, financial services at Bukalapak, and billing at a startup I helped build.";

test("intro copy", async ({ page }) => {
  await page.goto("/");
  const main = page.locator("main");
  await expect(main.locator("h1")).toHaveText("Harry Qin");
  await expect(main).toContainText(LEAD);
  await expect(main).toContainText("Reach me on GitHub or by email.");
  await expect(main.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute(
    "href",
    "https://github.com/HarryQin99",
  );
  await expect(main.getByRole("link", { name: "email", exact: true })).toHaveAttribute(
    "href",
    "mailto:harryqinyf@outlook.com",
  );
  await expect(page.locator("body")).not.toContainText("LinkedIn");
  await expect(page.locator("body")).not.toContainText("Flinders");
});

test("photo", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('main img[alt*="coffee"]')).toHaveCount(1);
  await expect(page.locator("main figcaption")).toHaveCount(0);
});

test("project list on home", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main h2")).toHaveText("Projects");
  const titles = page.locator("main ul.list > li a");
  await expect(titles).toHaveText(["EditXiaobian", "AU Construction Knowledge Bot"]);
});

test("terminal plays to the end", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#term .y")).toHaveText("charged once, granted once", { timeout: 15_000 });
});

test.describe("terminal is static under reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("full content immediately", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#term .y")).toBeVisible({ timeout: 500 });
    await expect(page.locator("#term")).toContainText("seen(order_8812)?");
  });
});

test.describe("no horizontal scroll at 375px", () => {
  test.use({ viewport: { width: 375, height: 812 } });
  for (const path of ["/", "/projects", "/projects/editxiaobian", "/projects/construction-knowledge-bot", "/about"]) {
    test(path, async ({ page }) => {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    });
  }
});
