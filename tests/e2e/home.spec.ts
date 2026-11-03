import { test, expect } from "@playwright/test";

test("name, title and links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Harry Qin");
  await expect(page.locator("h2")).toHaveText("Software Engineer");
  const links = page.locator("main li a");
  await expect(links).toHaveText(["Projects", "Résumé", "GitHub", "Email"]);
  await expect(links.nth(0)).toHaveAttribute("href", "/projects");
  await expect(links.nth(1)).toHaveAttribute("href", "/resume.pdf");
  await expect(links.nth(1)).toHaveAttribute("target", "_blank");
  await expect(links.nth(2)).toHaveAttribute("href", "https://github.com/HarryQin99");
  await expect(links.nth(3)).toHaveAttribute("href", "mailto:harryqinyf@outlook.com");
  await expect(page.locator("body")).not.toContainText("LinkedIn");
});

test("name on the left, links on the right", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const name = await page.locator("h1").boundingBox();
  const title = await page.locator("h2").boundingBox();
  const links = page.locator("main li a");
  const first = await links.first().boundingBox();
  const last = await links.last().boundingBox();
  expect(title!.x).toBeCloseTo(name!.x, 0);
  expect(first!.x).toBeGreaterThan(name!.x + name!.width);
  // Links sit in one row.
  expect(Math.abs(first!.y - last!.y)).toBeLessThan(2);
  await expect(page.locator("img")).toHaveCount(0);
  await expect(page.locator("#term")).toHaveCount(0);
});

test.describe("no horizontal scroll at 375px", () => {
  test.use({ viewport: { width: 375, height: 812 } });
  for (const path of ["/", "/projects", "/projects/editxiaobian", "/projects/construction-knowledge-bot", "/nope"]) {
    test(path, async ({ page }) => {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    });
  }
});
