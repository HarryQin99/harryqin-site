import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

test("README describes this site, not the Astro starter", () => {
  const readme = readFileSync(new URL("../../README.md", import.meta.url), "utf8");
  expect(readme).toContain("Harry Qin");
  expect(readme).not.toContain("astronaut");
});
