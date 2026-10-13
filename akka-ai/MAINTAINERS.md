# akka.ai maintainer notes

These notes were part of `llms.txt` and are kept here so neither the page at akka.ai nor an
assistant reading `akka.ai/llms.txt` sees them. `build.py` does not read this file, and it is
not uploaded to HubSpot. The publish steps are in
`tools/auditors/hubspot-ready/PUBLISHING.md` under "akka.ai".

## What llms.txt is

This is the content that ships at `akka.ai/` (with `akka.ai/llms.txt` as
an alias for AIs that look there by convention). It is addressed to an AI
coding assistant. Everything in this file is instructions the AI reads
and then follows on the user's behalf.

## Release channel

The marketplace install commands pin to `stable` (see
`akka/ai-marketplace/RELEASING.md`). Internal validation
happens on `main` (or via `akka specify init --channel edge`) before
`stable` moves.

## Agent Plugins 1.0 and Agent Client Protocol

**Agent Plugins 1.0** is an August 2026 industry bundle spec backed by
Vercel with Amazon, Cursor, GitHub, Microsoft, OpenAI, and Google. The
`akka/ai-marketplace` repo root is itself a valid AP 1.0 package
(`plugin.json` + `mcp.json`), so any AP 1.0 client can discover Akka's
skills and MCP toolset from the same source. Commands are out of scope
in spec v1, so AP 1.0 clients today reach the same skills the Codex
target ships (`skills/<name>/SKILL.md`) but not the `/akka:*` slash
commands. Anthropic is not on AP 1.0, so Claude Code and Claude Tag read
the Claude Code plugin manifest that ships in the same repo. The
dual-manifest posture is durable until Anthropic joins.

**Agent Client Protocol (ACP)** is a separate open protocol used by
Cline, JetBrains Junie, and Zed. Junie and Zed reach Akka today via
Path A′; Cline falls through to Path B until Akka publishes an ACP
adapter.
