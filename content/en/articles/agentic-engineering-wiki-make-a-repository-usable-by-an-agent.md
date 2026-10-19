---
translationKey: agentic-engineering-wiki-harness
title: "Make a repository usable by a development agent"
date: 2026-09-03
tags: ["AI agents", "Development", "Tooling", "Reproducibility"]
author: "Manoah B."
draft: false
description: "Repository instructions, verifiable commands, and explicit permissions make an agent's work reproducible."
---

## The repository should explain how to work

An agent can read code, but that does not tell it which command runs the tests, which migrations are sensitive, or what counts as finished work. A human joining the project asks the same questions. In [Agentic Engineering Wiki](https://github.com/mhbxyz/agentic-engineering-wiki), I collected a way to make those answers visible in the repository.

The starting point is modest: a short `AGENTS.md` and stable project commands. The first states the constraints; the second makes them verifiable. Adding integrations before these basics mainly creates more ways to make a mistake.

## Write a useful contract

A good `AGENTS.md` answers four questions: what must remain true, which commands are authoritative, which actions need approval, and what evidence proves the task is done. It must describe the actual project. Copying an example that names a nonexistent test or directory creates false confidence.

For commands, a `justfile`, `Makefile`, or another task runner gives humans and agents the same interface:

```text
just setup
just check
just test tests/unit/test_orders.py
just verify
```

The runner may call `uv`, npm, or a container. Those details stay in the repository, in one place. A verification command should be safe to rerun without silently changing files; formatting that writes and checking that reads are separate operations.

## An instruction is not a permission

Writing “do not touch secrets” in an instruction file helps explain the project. It does not technically block access. Tool permissions, credentials with limited scope, and protected branches must enforce important restrictions. Likewise, semantic search can help locate a concept, but `rg` is better for finding every exact occurrence of a name.

The wiki also covers subagents, reusable skills, and MCP servers. I see them as answers to specific needs, not a list to install in full. The [starter kit](https://github.com/mhbxyz/agentic-engineering-wiki/tree/main/starter-kit) offers a baseline for Python and backend projects, to be adapted to each repository's commands and risks.

## Measure finished work

The result to aim for is not shorter terminal output. It is a correct task, with executed commands, visible failures, and reviewed changes. If an agent has to guess the instructions each time it works on a project, a better model solves only part of the problem. A repository with a clear interface becomes easier for everyone to maintain.
