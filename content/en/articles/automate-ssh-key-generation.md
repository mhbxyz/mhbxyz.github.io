---
title: "Automate SSH Key Generation with ssh-keybuild"
date: 2025-04-19
tags: ["automatisation", "shell", "ssh"]
author: "Manoah BERNIER"
draft: false
---

## Introduction
Manually juggling SSH keys across different projects and hosts is both tedious and error‑prone. I built **ssh-keybuild** to provide a lightweight, reliable, all-in-one solution to:

- Quickly generate **ed25519** or **rsa** keys
- Auto‑add the key to your SSH agent
- Copy the public key to your clipboard
- Update `~/.ssh/config` without duplicates

In this post, we’ll explore the script’s main features and how to get up and running in minutes.

## Where to Find the Script
The complete code is available on GitHub:
[ssh-keybuild.sh](https://github.com/mhbxyz/useful-shell-scripts/blob/main/ssh-keybuild.sh)

## Quick Install
Simply clone the script into your PATH:
~~~shell
git clone https://github.com/mhbxyz/useful-shell-scripts.git ~/.local/bin/useful-shell-scripts
ln -s ~/.local/bin/useful-shell-scripts/ssh-keybuild.sh ~/.local/bin/ssh-keybuild
chmod +x ~/.local/bin/ssh-keybuild
~~~

## Usage & Options
~~~shell
ssh-keybuild -e email@example.com \
             [-n key_name] \
             [-t ed25519|rsa] \
             [-m "My comment"] \
             [-p true|false] \
             [-c true|false] \
             [-h hostname.com] \
             [-a alias]
~~~
- **-e** (required): email for the key comment
- **-n**: filename for the key (default `id_key`)
- **-t**: key type (default `ed25519`, or `rsa`)
- **-m**: optional comment
- **-p**: add to ssh-agent (`false` by default)
- **-c**: copy to clipboard (`true` by default)
- **-h**: host to insert into `~/.ssh/config`
- **-a**: alias for the host (defaults to host)

## Advanced Features
1. **Adaptive Keygen**
   Detects key type and issues the appropriate `ssh-keygen` command.
2. **Secure by Default**
   Creates `~/.ssh` with `700` permissions and sets `config` to `600`.
3. **Idempotent Config Updates**
   Checks for existing `Host` entries to prevent duplication.

## Real‑World Example
~~~shell
ssh-keybuild -e me@example.com -t rsa -m "Work key" -p true -h github.com
~~~

In under 30 seconds, you’ll have a 4096‑bit RSA key, added to your agent, copied to clipboard, and your SSH config updated.

## Conclusion
**ssh-keybuild** saves you priceless time and eliminates manual errors. If you manage multiple keys and hosts like I do, you’ll wonder how you ever lived without it!
