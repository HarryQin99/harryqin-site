import { test, expect, type Page } from "@playwright/test";

const bodyBg = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test("inner pages link home", async ({ page }) => {
  for (const path of ["/projects", "/projects/editxiaobian", "/nope"]) {
    await page.goto(path);
    await expect(page.getByRole("link", { name: "Harry Qin", exact: true })).toHaveAttribute("href", "/");
  }
});

test.describe("stays white when the system is dark", () => {
  test.use({ colorScheme: "dark" });
  test("white background", async ({ page }) => {
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(255, 255, 255)");
  });
});

test.describe("follows system light", () => {
  test.use({ colorScheme: "light" });
  test("light background", async ({ page }) => {
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(255, 255, 255)");
  });
});

test.describe("theme toggle", () => {
  test.use({ colorScheme: "dark" });

  test("defaults to white with a dark option", async ({ page }) => {
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(255, 255, 255)");
    await expect(page.locator("#theme-toggle")).toHaveAttribute("aria-label", "Switch to dark theme");
    await expect(page.locator("#theme-toggle svg:visible")).toHaveCount(1);
    await expect(page.locator("#theme-toggle")).toHaveText("");
  });

  test("switches to dark and remembers it", async ({ page }) => {
    await page.goto("/projects");
    await page.locator("#theme-toggle").click();
    expect(await bodyBg(page)).toBe("rgb(0, 0, 0)");
    await expect(page.locator("#theme-toggle")).toHaveAttribute("aria-label", "Switch to light theme");
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(0, 0, 0)");
  });

  test("still switches when storage throws", async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new Error("blocked");
      };
      Storage.prototype.setItem = () => {
        throw new Error("blocked");
      };
    });
    await page.goto("/");
    expect(await bodyBg(page)).toBe("rgb(255, 255, 255)");
    await page.locator("#theme-toggle").click();
    expect(await bodyBg(page)).toBe("rgb(0, 0, 0)");
  });
});
