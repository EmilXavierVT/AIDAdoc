+++
title = "Lesson 09: Spec-Driven Development"
date = 2026-09-14
draft = false
tags = ["lesson", "spec-driven-development", "naur", "code-agents"]
+++

## Focus

Specifications as guiding artifacts in development with coding agents, linked with Peter Naur's theory of programming as theory building.

## What We Worked On

- read about specification-driven development
- worked with specs, acceptance criteria, and workflows
- connected the topic to development with coding agents
- reflected on Peter Naur's ideas about theory, documentation, and maintenance

## Key Concepts

Spec-driven development was presented as an approach where requirements, design, and tasks are formed explicitly before they are translated into code. This is especially relevant in agentic workflows, where ambiguity easily turns into errors, rework, and unclear deliverables.

Peter Naur contributed a different but important perspective: a program is not only source code and documentation. The real supporting structure is the theory and understanding that the developers build around the system. If that theory disappears, maintenance becomes much harder, even if the documents still look fine.

## Practical Notes

The materials compared different spec forms, such as requirements, design, task lists, and BDD-like acceptance criteria. They also pointed to agentic workflows such as:

- `requirements -> design -> tasks`
- `constitution -> specify -> plan -> tasks`

The recurring argument was that clear specs reduce the risk of the agent heading in the wrong direction.

## Key Takeaways

- specs are not bureaucracy, but coordination tools
- clear acceptance criteria are especially important when working with coding agents
- Naur reminds us that documents alone do not carry the system understanding

## Reflection

Spec-driven development connected directly with how I want to work with agents. When the specification is vague, the agent may still produce code, but it becomes harder to judge whether the code is right. Naur's theory-building idea also made sense in relation to Supavisor: the important knowledge is not only in the repository, but in the understanding of why routes, roles, assignments, and project states are modeled the way they are.

## Project Connection

The Supavisor codebase is a good example of why specs matter: backend entities, route security, DTOs, and frontend screens need a shared model before agents or developers can safely extend the system.

- [Supavisor backend and project code](https://github.com/EmilXavierVT/Supavisor)
- [Supavisor frontend remake](https://github.com/DannyShayH/Supavisor-frontend-remake)

## References

- [Spec Driven Development and Naur - slide deck (PDF)](https://aida.kursusmaterialer.dk/09-spec-driven-dev/session-7-specs.pdf)
- [Spec-driven development](https://en.wikipedia.org/wiki/Spec-driven_development)
- [Exploring Gen AI: Spec-driven development tools](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [Programming as Theory Building (PDF)](https://aida.kursusmaterialer.dk/09-spec-driven-dev/naur-theory-building.pdf)
- [Programming as Theory Building (markdown)](https://aida.kursusmaterialer.dk/09-spec-driven-dev/naur-theory-building/)
- [Peter Naur](https://en.wikipedia.org/wiki/Peter_Naur)
- [Why AI Coding Agents Still Need Clear Specs](https://www.the-main-thread.com/p/spec-trap-agent-work)

## Video

- [What is spec-driven development?](https://www.youtube.com/watch?v=YV4Ii6bJ0OQ)
