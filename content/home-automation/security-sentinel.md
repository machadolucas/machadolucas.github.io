---
title: "Security Sentinel"
summary: "Edge-powered monitoring system that fuses camera events with environmental sensors."
date: 2025-02-14
tags:
  - Edge AI
  - MQTT
  - Rust
fileName: "Security Sentinel.md"
---

Security Sentinel keeps homes protected by correlating video analytics with door, window, and motion sensors for smarter alerts.

### Highlights

- Runs lightweight ML models on the edge so alerts arrive even when the internet is down.
- Publishes normalized MQTT topics so third-party dashboards can subscribe without custom adapters.
- Uses probabilistic scoring to filter out false positives from pets or HVAC cycles.

### My role

Implemented the video inference pipeline, wrote the event correlation engine, and deployed the monitoring stack on containerized edge devices.
