+++
title = "Lesson 06: LLM API Implementation"
date = 2026-09-04
draft = false
tags = ["lesson", "llm-api", "implementation", "testing"]
+++

## Focus

Implementation of the rubric-based LLM application and the translation from prompt design to working code.

## What We Worked On

- continued the rubric task
- implemented backend logic
- called the model API from code
- parsed and returned usable output
- tested the solution on examples

## Key Concepts

The main emphasis here was implementation. The goal was not a perfect grading engine, but a coherent first version where the rubric, prompts, API calls, and output actually work together.

The material emphasized that the output must not be trusted blindly. JSON should be validated, and the solution should be able to handle network failures, timeouts, provider errors, and invalid response formats.

## Practical Notes

For larger pipelines, fields such as `external id`, `content_hash`, `model`, `prompt_version`, and `processed_at` were highlighted so processing can be traced and rerun in a controlled way.

A simple status model for longer-running jobs was:

- `queued`
- `running`
- `completed`
- `failed`

## Key Takeaways

- the hard part is the connection between academic evaluation and technical implementation
- validation of model output is necessary
- even a simple first version should document its technical choices clearly

## References

- [Today's task](https://aida.kursusmaterialer.dk/05-llm-api/opgave/)
- [Tjekliste](https://aida.kursusmaterialer.dk/toolbox/llm-integration/tjekliste/)
- [Integration og automatisering](https://aida.kursusmaterialer.dk/toolbox/llm-integration/integration/)
- [Ordliste](https://aida.kursusmaterialer.dk/toolbox/ordliste/)

## Video

- [How To Build an API with Python (LLM Integration, FastAPI, Ollama & More)](https://www.youtube.com/watch?v=cy6EAp4iNN4)
