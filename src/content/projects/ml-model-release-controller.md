---
title: ml-model-release-controller
summary: Ship a new ML model version the way you'd ship a service.
year: "2026"
order: 3
role: Solo
period: 2026 –
lead: A safe-release system for ML models. Every new version has to pass offline evaluation, shadow traffic, human approval and a canary before it takes full traffic. If a gate fails, traffic goes back to the current model.
---

A model can pass offline evaluation and still break in production. To prove the gates work, I made three bad versions with the same offline metrics as the good one. One receives amounts in cents, one adds 250 ms to every request, and one returns HTTP 500 on 15% of requests. Only live traffic catches them.

- **Release workflow.** A durable Temporal workflow in Java, with Python activities pulling candidate models and metrics from MLflow. A failed gate or a crash mid-release resumes or rolls back cleanly instead of leaving traffic half-shifted.
- **Traffic router.** A Java router that mirrors shadow traffic and splits canary traffic in weighted steps, driven by the gate decisions.
- **Rollback after release.** The old model stays warm for a 10-minute bake period, and a rollback workflow can send traffic back to it without going through the gates.
- **Release policy.** Every threshold is configurable per model or per release. The policy is fixed when a release starts, so editing a file never changes a release in flight.
- **Release page.** Shows each candidate's stage, gate results and approval status.

It runs locally, on a transaction classifier trained on generated data.

Built with Java, Temporal, Python, MLflow.
