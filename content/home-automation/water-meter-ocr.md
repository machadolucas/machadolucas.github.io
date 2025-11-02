---
title: "Water Meter OCR"
summary: "Some scripts I have created for managing my home network"
date: 2025-11-02
tags:
  - ESP32
  - Water meter
  - OCR
fileName: "Water Meter OCR.md"
---

# **Reading a Mechanical Water Meter with an ESP32 + Mac**

<p align="center">
  <img src="https://github.com/machadolucas/watermeter_ocr/raw/main/overlay_example.jpg" alt="Water meter overlay example" width="520">
</p>

I built a small system that reads a traditional water meter (five odometer digits + four red-pointer dials) using an **ESP32-S3 AI-on-the-Edge Cam** for image capture and my **Mac Mini** for the heavy lifting. The ESP32 (PoE) snaps a lit photo every few seconds; a Python service on the Mac handles alignment (so small camera shifts don’t break things), per-digit OCR with rolling-digit logic, dial detection, and publishes everything to **Home Assistant** over MQTT: total m³, m³/min, **L/min**, plus a live debug overlay image.

Why offload to the Mac? It’s faster and more reliable for OCR, while keeping the ESP32 simple.

The original project which runs image recognition directly on the ESP32 device takes a few minutes for each image capture, while by using a Mac I can perform recognition every 10-seconds interval or faster without noticiable load (as even the NPU is used with Apple Vision). This allows me for almost instant water flow detection.

The project includes an installer, reference-image alignment, guards against negative flow or big jumps, and a clean overlay to help tweak ROIs. It’s open source here: **[github.com/machadolucas/watermeter_ocr](https://github.com/machadolucas/watermeter_ocr)**.
