import { test, expect } from "@playwright/test";

test("resume served", async ({ request }) => {
  const res = await request.get("/resume.pdf");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("pdf");
});

test("meta tags", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Harry Qin");
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await page.goto("/projects/editxiaobian");
  await expect(page).toHaveTitle("EditXiaobian · Harry Qin");
});

test("favicon", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/favicon.svg");
});
