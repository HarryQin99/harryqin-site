import { test, expect, type Page } from "@playwright/test";

const bodyBg = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test("header nav links", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header");
  const links = [
    ["Harry Qin", "/"],
    ["Projects", "/projects"],
    ["About", "/about"],
    ["Résumé", "/resume.pdf"],
  ] as const;
  for (const [name, href] of links) {
    await expect(header.getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
  }
  await expect(header.getByRole("link", { name: "Résumé" })).toHaveAttribute("target", "_blank");
});

test.describe("first visit follows system dark", () => {
  test.use({ colorScheme: "dark" });
  test("dark background and light toggle label", async ({ page }) => {
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(0, 0, 0)");
    await expect(page.locator("#theme-toggle")).toHaveText("light");
  });
});

test.describe("first visit follows system light", () => {
  test.use({ colorScheme: "light" });
  test("light background and dark toggle label", async ({ page }) => {
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(255, 255, 255)");
    await expect(page.locator("#theme-toggle")).toHaveText("dark");
  });
});

test.describe("toggle persists across reload", () => {
  test.use({ colorScheme: "dark" });
  test("click to light, reload keeps light", async ({ page }) => {
    await page.goto("/");
    await page.locator("#theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await bodyBg(page)).toBe("rgb(255, 255, 255)");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("#theme-toggle")).toHaveText("dark");
  });
});

test.describe("theme survives storage that throws", () => {
  test.use({ colorScheme: "dark" });
  test("system theme loads and toggle still flips", async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new Error("blocked");
      };
      Storage.prototype.setItem = () => {
        throw new Error("blocked");
      };
    });
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(0, 0, 0)");
    await page.locator("#theme-toggle").click();
    expect(await bodyBg(page)).toBe("rgb(255, 255, 255)");
  });
});

test("no-JS follows system dark", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/");
  expect(await bodyBg(page)).toBe("rgb(0, 0, 0)");
  await context.close();
});
