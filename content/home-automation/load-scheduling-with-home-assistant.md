---
title: "Scheduling flexible loads with Home Assistant"
summary: "Two custom integrations I built to run the hot-water heater, floor heating and dishwasher when electricity is cheapest — one works out how much they need, the other decides when."
date: 2026-06-17
tags:
  - Home Assistant
  - Energy
  - Nord Pool
  - Python
fileName: "Load scheduling with Home Assistant.md"
---

# **Running the house when electricity is cheapest**

I live in Finland, where electricity is billed at the **Nord Pool** spot price — and increasingly in 15-minute slots rather than by the hour. On a windy night a kilowatt-hour can cost a fraction of what it does during the morning peak. Meanwhile, a surprising amount of what runs in my house doesn't actually care *when* it runs: the hot-water tank just has to be hot before the first shower, the electric floor heating has to reach temperature by morning, the dishwasher has to be finished by breakfast. They care about the deadline, not the clock.

So the idea writes itself — shift those loads into the cheap hours. Doing it *well*, though, turned out to be fiddly.

My first attempts were the usual pile of YAML and Jinja automations: find the cheapest hours, switch things on, switch them off. It worked until it didn't. Cheap windows that cross midnight, loads that can be paused and resumed versus ones that need an uninterrupted block, a price that updates four times an hour, daylight-saving days with 23 or 25 hours, and eventually solar on top — every special case meant another fragile template. I got tired of debugging Jinja near midnight.

So I stopped patching automations and split the problem into two clean questions, each as its own Home Assistant integration: **how much** does a load need to run today, and **when** should that run happen?

## **Load Scheduler — deciding _when_**

[ha-load-scheduler](https://github.com/machadolucas/ha-load-scheduler) is the part that owns the calendar. You point it at a price-forecast sensor (the buy price, and optionally a sell price and a solar-production forecast), then describe each load:

- a **mode** — *non-sequential* picks the N cheapest slots and suits anything that can pause and resume, like a water heater or floor heating; *sequential* reserves one or more uninterrupted blocks for loads that can't be chopped up, like a dishwasher cycle;
- a **target** — either a runtime in minutes or an amount of energy in kWh;
- a **window and deadline** — "done by 07:00", say;
- and **failsafes** for when the price or forecast goes missing.

It then exposes a tidy set of entities per load — a binary sensor for whether it's running, a sensor with the upcoming schedule, a writable target `number`, an enable switch, and a boost button — plus one shared **calendar** entity, which is my favourite part: I can see the next few days of runs laid out like appointments.

Two design choices I appreciate every day. First, the scheduling engine is plain, testable Python with no Home Assistant dependency, so it has a real test suite behind it instead of living and dying inside automation traces. Second, it's deliberately polite about control: it only ever switches a load **on** for a good reason (cheap price, solar, or a safety floor) and only switches **off** the runs it started itself. That "coexist" behaviour means my normal thermostats and manual switches keep working — the scheduler doesn't fight them. It also gets daylight-saving right, which sounds boring until the one night a year it isn't.

## **Load Need Predictor — deciding _how much_**

The scheduler needs a target, and for most loads that's easy — floor heating and the dishwasher get fixed numbers. The hot-water tank is the awkward one: how many minutes of reheating does it actually need *today*? Heat too little and someone gets a cold shower; heat too much and I've paid to warm water nobody used.

I spent a while staring at a few months of data expecting temperature and season to matter. They barely do. The thing that actually moves daily hot-water demand is **how many people are home using water** — and that's mostly random from one day to the next. So instead of a clever model, [ha-load-need-predictor](https://github.com/machadolucas/ha-load-need-predictor) goes deliberately simple: a baseline energy estimate, scaled by occupancy (residents plus guests, weighted by how long they're around), converted into minutes using the heater's rated power, then clamped to a sensible range so it never asks for nothing or for the entire night.

The nice part is that it corrects itself. Every evening it reads how much energy the heater actually delivered, nudges a calibration factor, and after a couple of weeks it refits its own baseline parameters from my real numbers rather than my initial guesses. It surfaces all of this as sensors — predicted runtime and energy, last delivered, prediction error, a rolling mean-absolute-error, and how many days it has learned from — so I can watch it get less wrong over time.

It also does one thing the price feed can't. Nord Pool only publishes prices through tomorrow, so the predictor fits a small regression on wind and temperature to *estimate* the day-after prices. It's far from precise, but it's enough to tell whether tonight is "good enough" or worth holding out for.

## **How the two fit together**

The handoff between them is just one number. The predictor writes its minutes into the scheduler's target `number` for the heater; the scheduler treats that as the goal and books it into the cheapest slots before the deadline. By default the predictor runs in the afternoon, but I'd rather it react the moment tomorrow's prices land, so a tiny automation re-triggers it then:

```yaml
automation:
  - alias: "Re-predict when tomorrow's prices publish"
    triggers:
      - trigger: state
        entity_id: binary_sensor.nordpool_tomorrow_prices_availability
        to: "on"
    actions:
      - action: button.press
        target:
          entity_id: button.water_heater_predict_now
```

## **Living with it**

Day to day I mostly don't think about it, which is the whole point. The water heater's target is predicted and automatic; the floor heating and dishwasher run on fixed targets inside their windows; the shared calendar tells me what's scheduled when I'm curious; and when I want hot water *now*, regardless of price, there's a boost button. The fragile pile of automations is gone.

Both integrations are open source and install through HACS. **Load Scheduler** ([github.com/machadolucas/ha-load-scheduler](https://github.com/machadolucas/ha-load-scheduler)) is in beta and backed by a solid test suite; **Load Need Predictor** ([github.com/machadolucas/ha-load-need-predictor](https://github.com/machadolucas/ha-load-need-predictor)) is still alpha and gets better as it learns. If you're on a spot-price tariff and tired of hand-written energy automations, they might save you the same late-night Jinja sessions they saved me.
