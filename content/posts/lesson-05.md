+++
title = "Lesson 05: LLM API Integration"
date = 2026-08-31
draft = false
tags = ["lesson", "llm-api", "json", "backend"]
+++

## Focus

Integrating a language model into an application with a backend, prompts, a rubric, and structured output.

## What We Worked On

- designed an application that evaluates an assignment against a rubric
- worked with a system prompt and a user prompt
- planned structured output as JSON
- discussed backend responsibility, error handling, and security

## Key Concepts

An important point was that the client should not talk directly to the model provider. The architecture should instead go through its own backend:

`client -> backend -> LLM API -> backend -> response`

The rubric was central. It had to be derived from the course material and describe criteria, levels, and possible weighting. The prompt then had to combine the rubric, the submission, and the task in a form that would let the model return valid and usable JSON.

## Practical Notes

A recommended prompt pattern was:

```text
Rubric:
...

Student submission:
...

Task:
Assess the submission using the rubric.
Return valid JSON.
```

An example of the output format was:

```json
{
  "overallAssessment": "...",
  "criteria": [
    { "name": "...", "score": 1, "comment": "..." }
  ],
  "suggestions": ["..."]
}
```

## Key Takeaways

- structured output must be designed deliberately, not assumed
- rubric and prompt design are tightly connected
- error handling, timeouts, rate limits, and validation are part of the integration from the start

## References

- [Today's task](https://aida.kursusmaterialer.dk/05-llm-api/opgave/)
- [Tjekliste](https://aida.kursusmaterialer.dk/toolbox/llm-integration/tjekliste/)
- [Integration og automatisering](https://aida.kursusmaterialer.dk/toolbox/llm-integration/integration/)
- [Ordliste](https://aida.kursusmaterialer.dk/toolbox/ordliste/)
- [Design a rubric](https://www.tudelft.nl/en/teaching/support/instructional-support/assessment/design-a-rubric)

## Video

- [How to use LLM APIs in Python (OpenAI & Google Gemini) | AI Engineering](https://www.youtube.com/watch?v=MJo3voV7dMQ)
