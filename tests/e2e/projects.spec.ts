import { test, expect } from "@playwright/test";

test("projects index order", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByText("Side projects and a startup. Work projects are on my résumé.")).toBeVisible();
  const items = page.locator("ul.list > li");
  await expect(items).toHaveCount(3);
  await expect(items.nth(0).getByRole("link")).toHaveText("EditXiaobian");
  await expect(items.nth(0)).toContainText("AI scripts for creators doing brand deals. Founding engineer.");
  await expect(items.nth(0)).toContainText("2026");
  await expect(items.nth(1).getByRole("link")).toHaveText("AU Construction Knowledge Bot");
  await expect(items.nth(1)).toContainText("Building-code Q&A that knows when to refuse.");
  await expect(items.nth(1)).toContainText("2026");
  await expect(items.nth(2).getByRole("link")).toHaveText("ml-model-release-controller");
  await expect(items.nth(2)).toContainText("Ship a new ML model version the way you'd ship a service.");
  await expect(items.nth(2)).toContainText("2026");
});

test("editxiaobian page", async ({ page }) => {
  await page.goto("/projects/editxiaobian");
  await expect(page.locator("h1")).toHaveText("EditXiaobian");
  await expect(page.locator(".meta")).toContainText("Founding Engineer · Jul – Oct 2026");
  const site = page.getByRole("link", { name: "edixiaobian.com ↗" });
  await expect(site).toHaveAttribute("href", "https://edixiaobian.com/");
  await expect(site).toHaveAttribute("target", "_blank");
  await expect(page.locator("figure img")).toHaveAttribute("alt", /EditXiaobian workspace/);
  await expect(page.locator("figcaption")).toHaveText(
    "The workspace home: recent projects, upcoming deadlines, and shortcuts.",
  );
  const body = page.locator("main");
  await expect(body).toContainText("I owned most of the money path.");
  await expect(body).toContainText(
    "Admin console. An internal admin page that shows key product metrics and lets the team handle customer operations.",
  );
  await expect(body).toContainText("Observability. Metrics, alerts, trace logs, and token-usage tracking per function.");
  await expect(body).toContainText("The unglamorous parts. A staging environment, and helping with the ICP filing.");
  await expect(body).toContainText("It was a stuck cron job opening new database connections.");
  await expect(body).not.toContainText("AI revision");
  await expect(body).not.toContainText("ledger");
});

test("kb page", async ({ page }) => {
  await page.goto("/projects/construction-knowledge-bot");
  await expect(page.locator("h1")).toHaveText("AU Construction Knowledge Bot");
  await expect(page.locator(".meta")).toContainText("Solo · 2026 –");
  await expect(page.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute(
    "href",
    "https://github.com/HarryQin99/builder-knowledge-bot",
  );
  await expect(page.locator("main code", { hasText: "can_answer" })).toHaveCount(1);
  await expect(page.locator("main img")).toHaveCount(0);
});

test("ml release controller page", async ({ page }) => {
  await page.goto("/projects/ml-model-release-controller");
  await expect(page.locator("h1")).toHaveText("ml-model-release-controller");
  await expect(page.locator(".meta")).toHaveText("Solo · 2026 –");
  await expect(page.locator(".meta a")).toHaveCount(0);
  await expect(page.locator("main img")).toHaveCount(0);
  const body = page.locator("main");
  await expect(body).toContainText("offline evaluation, shadow traffic, human approval and a canary");
  await expect(body).toContainText("Only live traffic catches them.");
  await expect(body).toContainText("Release workflow. A durable Temporal workflow in Java");
  await expect(body).toContainText("Traffic router.");
  await expect(body).toContainText("Rollback after release.");
  await expect(body).toContainText("Release policy.");
  await expect(body).toContainText("Release page.");
  await expect(body).toContainText("trained on generated data");
  await expect(body).toContainText("Java, Temporal, Python, MLflow.");
});

test("prev/next", async ({ page }) => {
  await page.goto("/projects/editxiaobian");
  await expect(page.getByRole("link", { name: "← Projects" })).toHaveAttribute("href", "/projects");
  await expect(page.getByRole("link", { name: "AU Construction Knowledge Bot →" })).toHaveAttribute(
    "href",
    "/projects/construction-knowledge-bot",
  );
  await page.goto("/projects/construction-knowledge-bot");
  await expect(page.getByRole("link", { name: "← EditXiaobian" })).toHaveAttribute("href", "/projects/editxiaobian");
  await expect(page.getByRole("link", { name: "ml-model-release-controller →" })).toHaveAttribute(
    "href",
    "/projects/ml-model-release-controller",
  );
  await page.goto("/projects/ml-model-release-controller");
  await expect(page.getByRole("link", { name: "← AU Construction Knowledge Bot" })).toHaveAttribute(
    "href",
    "/projects/construction-knowledge-bot",
  );
  await expect(page.getByRole("link", { name: "Projects →" })).toHaveAttribute("href", "/projects");
});

test("about page removed", async ({ page }) => {
  const res = await page.goto("/about");
  expect(res?.status()).toBe(404);
});

test("unknown route shows 404", async ({ page }) => {
  const res = await page.goto("/nope");
  expect(res?.status()).toBe(404);
  await expect(page.locator("main").getByRole("link", { name: "Back home" })).toHaveAttribute("href", "/");
});
