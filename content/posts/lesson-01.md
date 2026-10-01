+++
title = "Lesson 01: Intro"
date = 2026-08-17
draft = false
tags = ["lesson", "intro", "llm", "portfolio"]
+++

## Focus

Introduction to AI-driven applications, LLMs as part of modern software architecture, and setting up a portfolio site.

## What We Worked On

- set up a portfolio site with Hugo
- worked with Blowfish as the theme
- prepared deployment with GitHub and GitHub Pages
- wrote a short reflection on expectations for AI in software development

## Key Concepts

LLMs were presented as building blocks in modern applications rather than as standalone products. The main idea was that the portfolio should document cases, reflections, and technical choices throughout the semester.

There was also a focus on static sites and markdown-based content as a simple way to publish technical documentation.

## Practical Notes

The installation flow pointed to Hugo, Node.js, and a Blowfish-based theme setup:

```bash
brew install node
brew install hugo
npm i -g blowfish-tools
blowfish-tools new portfolio
```

Indholdet organiseres i Hugo under `content/`, og deployment-sporet peger mod GitHub Actions og GitHub Pages.

## Key Takeaways

- a portfolio is not just a deliverable, but also technical documentation over time
- markdown and static sites provide a simple and robust publishing model
- LLMs should be understood as part of an architecture, not just as a chat interface

## Reflection

At the start of the course I mostly saw the portfolio as a required place to collect notes, but this lesson changed it into something more useful: a running record of how my understanding develops. Setting up Hugo and GitHub Pages also made the technical side of documentation feel more concrete. I learned that the site itself is part of the work, because it forces me to explain what I build and why the choices matter.

## References

- [Introduction to the course and its structure (PDF)](https://aida.kursusmaterialer.dk/01-intro/session-1.pdf)
- [Hugo](https://gohugo.io/)
- [Blowfish](https://blowfish.page/)
- [Host on GitHub Pages](https://gohugo.io/host-and-deploy/host-on-github-pages/)

## Video

- [What is an LLM? (Large Language Model)](https://www.youtube.com/watch?v=LPZh9BOjkQs)
