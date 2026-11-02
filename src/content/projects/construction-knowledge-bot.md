---
title: AU Construction Knowledge Bot
summary: Building-code Q&A that knows when to refuse.
year: "2026"
order: 2
role: Solo
period: 2026 –
lead: Ask a question about the Australian building code and get an answer with the clause it came from. If it isn't sure, it says so.
links:
  - label: GitHub
    href: https://github.com/HarryQin99/builder-knowledge-bot
---

The code runs to about 900 pages across two PDFs. Retrieval was the easy part. The hard part was getting it to refuse. In this domain a confident wrong answer can end up as a wall, so I built two gates in front of the model.

The first is a similarity check that runs before any model call. A question about cooking never reaches Claude and costs nothing. The second makes Claude reply through a JSON schema enforced on the server, with a `can_answer` field. It can't slip into friendly prose when it should be saying no.

Ingestion is idempotent too. Each chunk's ID is derived from its content, so a restart skips everything already stored and re-embeds nothing.

Java, PostgreSQL with pgvector, OpenAI embeddings, Claude.
