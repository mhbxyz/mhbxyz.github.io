---
translationKey: openwatchparty-algorithmes-synchronisation
title: "OpenWatchParty: synchronize playback despite latency"
date: 2026-10-19
tags: ["Jellyfin", "JavaScript", "Rust", "Synchronization", "Video"]
author: "Manoah B."
draft: false
description: "Clocks, scheduled actions, drift correction, and HLS buffering: the technical choices behind OpenWatchParty playback synchronization."
---

In my [first OpenWatchParty article](/en/articles/openwatchparty-synchronized-watch-parties-for-jellyfin/), I introduced the Jellyfin plugin and its Rust session server. The harder question remained: how do you make the same scene play at the same time on several machines when their clocks, networks, and players behave differently?

## Establish a shared clock

The server cannot assume that two computers display the same time. The client therefore sends a timestamped ping. When the response arrives, it measures the round-trip time and estimates the offset between its clock and the server's. Several measurements are smoothed so that a latency spike does not cause a sudden jump.

When someone starts playback, the server can announce a **target time** on its own clock. Each client calculates the remaining delay and schedules the action. This delay also leaves room for video loading. The aim is for players to start together, rather than each starting as soon as its WebSocket message arrives.

## Correct a position that ages in transit

A message saying “position: 120 seconds” is already old when it arrives. The client estimates the time since it was sent and advances the expected position accordingly. It then compares that position with `video.currentTime`.

For a small difference, OpenWatchParty does nothing. A player naturally moves by a few milliseconds; correcting every variation would add more movement than precision. For a moderate difference, it temporarily adjusts `playbackRate` within fixed bounds. When the gap grows too large, it seeks to the expected position. This gradual correction avoids interrupting the image for every small drift while still allowing a clear catch-up.

## The particular case of HLS

With a transcoded HLS stream, the player downloads segments. During buffering, a `paused` state or a position moving backward may reflect loading, not a decision by the person watching. If the client reports such a false event to the server, everyone can receive an unwarranted pause.

The client therefore filters events during certain synchronization operations and while buffering. The server also ignores transient updates just after a command and discards small backward position jumps. When someone joins a session, a readiness mechanism gives the media time to load before shared playback starts.

## Keep synchronization observable

Synchronization is not a binary state. A guest may still lag while a segment loads or need a local adjustment. The interface can display the gap and offer a small movement within the buffered range, without changing the room position for everyone else.

These choices are detailed in the [algorithm documentation](https://github.com/mhbxyz/OpenWatchParty/blob/main/docs/technical/sync.md). They do not guarantee perfect precision on every network. They make behavior more predictable: a reference clock, proportional corrections, and protection against false player events.
