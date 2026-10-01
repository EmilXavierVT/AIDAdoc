+++
title = "Lesson 12: Sikkerhedsaspekter"
date = 2026-09-25
draft = false
tags = ["lesson", "security", "secrets", "credentials"]
+++

## Focus

Secure handling of keys, credentials, and development environments when working with coding agents and AI integrations.

## What We Worked

- worked with security in the development process
- examined risks around secrets in AI-assisted workflows
- reflected on technical choices in the project work

## Key Concepts

The central message was that `.env` files are practical, but not a security model in themselves. When a coding agent can read files, run commands, inspect logs, and pass context onward, the threat surface expands significantly.

The material highlighted several leakage paths: debug output, printed environment variables, accidental commits, packages with malicious scripts, and logs containing credentials.

That made the principle of least privilege important, and the development environment should be treated much more cautiously if AI tools have broad access.

## Practical Notes

The recommendations included:

- commit only `.env.example`
- use restricted test keys with short lifetimes
- keep production secrets away from machines with AI access
- use mocks where possible
- let CI handle flows that require real secrets

There was also a contrast between narrow tool calls such as `searchPublicDocs(query)` and broad calls such as `readFile(path)`.

## Key Takeaways

- AI-assisted development requires a sharper view of secrets than traditional local development
- convenience and security are not the same thing
- access to files, logs, and shell commands must be deliberately constrained

## Reflection

Security was one of the most practical lessons for my current workflow. Supavisor uses backend configuration, API access, authentication, and external service concepts, so careless handling of secrets would be a real risk. The lesson also changed how I think about AI coding tools: giving an assistant access to a repository is useful, but it means I need stricter habits around `.env` files, logs, test keys, and what I include in prompts.

## Project Connection

The security lesson is directly relevant to the Supavisor backend because authentication, configuration, external APIs, and environment variables all require careful handling.

- [Supavisor backend and project code](https://github.com/EmilXavierVT/Supavisor)

## References

- [Is it secret? Is it safe? (PDF)](https://aida.kursusmaterialer.dk/12-sikkerhedsaspekter/is-it-secret-is-it-safe.pdf)

## Video

- [Keeping Secrets - How to Protect API keys in your App](https://www.youtube.com/watch?v=mnLOPWmaqSE)
