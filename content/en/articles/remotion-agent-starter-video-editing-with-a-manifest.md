---
translationKey: remotion-agent-starter-manifeste
title: "Remotion Agent Starter: describe a video edit with a manifest"
date: 2026-08-07
tags: ["AI Agents", "Remotion", "Video", "Automation"]
author: "Manoah B."
draft: false
description: "A JSON manifest for the edit, a Zod schema for its boundaries, and React for rendering the frames."
---

## An edit you can review

When an edit is just a series of clicks in an interface, it is hard to tell what changed between two versions. It is harder still to ask an agent to adjust one scene without touching everything else. With [Remotion Agent Starter](https://github.com/mhbxyz/remotion-agent-starter), I wanted to put routine editorial decisions in a JSON manifest that can be read, checked, and versioned.

The manifest describes scenes, durations, media, and transitions. React and Remotion handle rendering. The separation is simple: data says **what** to edit; components decide **how** each frame looks.

## Frames as the unit of time

A title scene can request `120` frames in a composition running at `30` frames per second: it lasts four seconds. If an `18`-frame transition joins two `120`-frame scenes, the total is `120 + 120 - 18`, or `222` frames. The transition overlaps the scenes; it is not appended at the end.

This calculation is less ambiguous than a series of approximate durations in seconds. It also makes a code review meaningful: we can see exactly whether a scene was shortened or a transition extended.

The project currently supports title, quote, and media scenes, along with fade and slide transitions. Three compositions cover landscape, portrait, and square formats. This is an intentionally small vocabulary, useful for recurring edits without pretending to describe every possible effect.

## Validate before rendering

The Zod schema checks the manifest at runtime: types, media references, and duplicate scene IDs. Original media stays separate from files served to Remotion; an ingestion step prepares assets for rendering. Commands return structured results, so a tool or agent can tell what succeeded and what failed.

That boundary matters more than the word “agent.” An agent can propose a manifest change, but the change goes through the same validation as a human edit. When the manifest cannot express a visual behavior, we change a React component explicitly.

## What the project does today

The repository provides tools for preparation, validation, and rendering. Its two current inputs need to be kept distinct: the example JSON manifest is used by the command-line workflow, while Remotion Studio loads props from `src/example-project.ts`. Opening Studio does not automatically load the JSON file.

This is a useful limit to know before automating an entire workflow. The [architecture document](https://github.com/mhbxyz/remotion-agent-starter/blob/main/docs/architecture.md) describes the separation precisely. My aim is an edit whose ordinary choices can be inspected, while exceptional visuals remain real code.
