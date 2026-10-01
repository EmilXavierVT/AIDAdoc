+++
title = "Lesson 03: RAG II"
date = 2026-08-24
draft = false
tags = ["lesson", "rag", "api", "automation"]
+++

## Focus

Further work with RAG, retrieval quality, prompt design, and automation around a document-based solution.

## What We Worked On

- explored options with ChatGPT and Claude
- worked on structuring sources
- looked at API access to a published chatbot
- discussed updating knowledge through automation

## Key Concepts

The central theme was that a RAG solution is not finished just because it can answer. Retrieval quality, source structure, and the way prompts are phrased directly affect the quality of the answers.

There was also a focus on operation and maintenance: if the knowledge base changes, the system should be updated without manual shortcuts. GitHub Actions fits well here as an automation layer.

## Practical Notes

Dify's documentation shows that a published app can also be accessed through an API. A simple request can look like this:

```bash
curl https://api.dify.ai/v1/info \
  -H "Authorization: Bearer $DIFY_API_KEY"
```

An important API principle is that requests are tied to a user identity through a `user` field so interactions can be tracked and handled correctly.

## Key Takeaways

- retrieval quality is an independent part of the architecture
- prompting and source data should be improved together, not separately
- automation matters if a chatbot needs to stay aligned with new content

## Reflection

The second RAG lesson made me think more about maintenance. A prototype can work once, but a useful system needs a way to keep its knowledge current. The API and automation angle connected well with my own coding work because it pushed me to think about the whole flow around a feature: data in, processing, API access, and reliable updates over time.

## References

- [Dify API Documentation: Get Started](https://docs.dify.ai/en/api-reference/guides/get-started)
- [GitHub Actions](https://docs.github.com/en/actions)

## Video

- [Master Dify AI Chatbot in 1 Hour](https://www.youtube.com/watch?v=dHJictxN2ZU)
