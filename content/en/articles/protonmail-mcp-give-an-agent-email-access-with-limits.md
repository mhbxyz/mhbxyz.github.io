---
translationKey: protonmail-mcp-securite
title: "protonmail-mcp: give an agent email access without a blank check"
date: 2026-10-13
tags: ["Python", "MCP", "Proton Mail", "Security"]
author: "Manoah B."
draft: false
description: "Read access by default, explicitly enabled capabilities, and confirmation for changes: the protonmail-mcp security model."
---

## An email is untrusted input

Asking an agent to summarize your messages is useful. But other people wrote those messages. A sender can place instructions in one, telling the agent to send data elsewhere, delete a message, or ignore the original request. Giving the agent unrestricted mailbox access can turn a reading task into a risk of unintended action.

I built [protonmail-mcp](https://github.com/mhbxyz/protonmail-mcp) around this boundary. The server connects an MCP client to Proton Mail through Proton Bridge, which exposes IMAP and SMTP locally. It offers specific tools to the agent instead of allowing arbitrary IMAP or SMTP commands.

## Start with reading

The default mode is `read`. It can list folders, search and read messages, follow a thread, or produce a digest. IMAP folders are opened read-only; reading through these tools does not even change a message's `\Seen` flag.

Other capabilities are enabled explicitly: drafts, organization, sending, then deletion. Tools for a disabled capability are not registered with the MCP client. The rules live on the server, in configuration and policy, rather than in a sentence asking the model to behave.

## An action in two steps

For a mutation, the server separates preparation from execution. `prepare_*` previews the exact change and issues a short-lived, single-use token tied to its payload. `commit_*` checks the token before acting. If the payload changes between the two steps, the confirmation no longer applies.

Sending adds limits: allowed recipients, quotas, message size, and checks against automated reply loops. Permanent deletion needs an additional confirmation and handles one message in Trash at a time. An agent reading hostile instructions in an email cannot grant itself these capabilities in the server policy.

## Where trust still matters

This model narrows possible actions; it does not make email content trustworthy. The choice of MCP client, model, and data passed to that model still matters. The optional local search index stores message text in plaintext SQLite, so users must decide whether that copy fits their use case.

I prefer to describe those limits openly. The repository's [security policy](https://github.com/mhbxyz/protonmail-mcp/blob/main/SECURITY.md) lays out the threat model, confirmation flow, and deliberately excluded actions. The useful question is not just “can the agent read my mail?” but “what could it do if a message tried to give it orders?”
