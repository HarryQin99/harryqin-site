import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:4399";

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL },
  webServer: {
    // Astro auto-backgrounds `preview` when it detects an agent session; keep it in the foreground for Playwright.
    command: "pnpm build && env -u CLAUDECODE -u CLAUDE_CODE_ENTRYPOINT pnpm preview --port 4399",
    url: baseURL,
    reuseExistingServer: false,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
