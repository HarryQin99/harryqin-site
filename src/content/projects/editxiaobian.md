---
title: EditXiaobian
summary: AI scripts for creators doing brand deals. Founding engineer.
year: "2026"
order: 1
role: Founding Engineer
period: Jul – Oct 2026
lead: An AI writing tool for creators in China doing sponsored content. It turns a brand's brief into a script that still sounds like the creator.
links:
  - label: edixiaobian.com ↗
    href: https://edixiaobian.com/
cover: ../../assets/exb-workspace.jpg
coverAlt: "EditXiaobian workspace: project timeline, brand brief, and outline/script actions"
coverCaption: "The project workspace: schedule, brand brief, then outline and script."
---

When I joined, there wasn't a staging environment yet. By the time I left, real users were signing up, using the product, and paying for it. I owned most of the money path.

- **Billing.** Plans, pricing, and quotas that reset on each customer's own subscription date, plus upgrade quotes with proration.
- **Payments.** I took Alipay from sandbox to signing a production merchant account, and added WeChat Pay callbacks. Both are idempotent, so a retried notification never grants twice.
- **The unglamorous parts.** Token-usage tracking per function, trace logs, an admin console, a staging environment, and helping with the ICP filing.

Launch night: database CPU at 100%. We thought we'd built something people couldn't stop using. We had. It just wasn't people. It was a stuck cron job opening new database connections.

Built with TypeScript, React, Tencent CloudBase (Postgres + serverless functions), and DeepSeek / Qwen through the Vercel AI SDK.
