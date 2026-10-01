+++
title = "Lesson 13: MCP"
date = 2026-09-28
draft = false
tags = ["lesson", "mcp", "java", "tools"]
+++

## Focus

Model Context Protocol as a standard for connecting AI assistants with tools, resources, and prompts.

## What We Worked On

- introduced MCP as a protocol
- worked with the client-server model in MCP
- looked at a Java-based MCP server example
- connected local tools with assistants such as Codex and Claude CLI

## Key Concepts

MCP was presented as a standard for model-to-tool communication. The point is that an assistant can discover and call structured capabilities in a consistent way, while traditional REST endpoints are still well suited to app-to-app communication.

A central choice in the material was transport. `stdio` was recommended as a beginner-friendly path for local servers, while streamable HTTP is relevant for remote access and shared deployments.

## Practical Notes

The tutorial track built a Java server with tools such as `add_numbers` and `current_time`. It worked with classes such as `McpServer`, `Tool`, `CallToolResult`, `TextContent`, and `StdioServerTransportProvider`.

The registration examples for CLI tools were:

```bash
codex mcp add demo-server -- java -jar /ABS/PATH/target/mcp-demo-1.0-SNAPSHOT.jar
claude mcp add demo-server --command java --arg -jar --arg /FULL/PATH/TO/target/mcp-demo-1.0-SNAPSHOT.jar
```

## Key Takeaways

- MCP provides a more standardized way to connect models to tools
- local `stdio` servers are a good starting point for understanding the protocol
- structured tool calls make it easier to build reliable assisted workflows

## Reflection

MCP helped me understand a more structured way to connect AI assistants to real tools. Compared with a normal chat prompt, an MCP tool has a clearer contract and can be tested as part of a workflow. That connects back to the whole semester: if AI is going to support real development or project work, the integration needs boundaries, permissions, and predictable behavior rather than informal copy-paste interactions.

## Project Connection

MCP gives a useful direction for future tooling around the project, where assistants could interact with structured project or scheduling tools through controlled interfaces.

- [Supavisor backend and project code](https://github.com/EmilXavierVT/Supavisor)
- [Supavisor frontend remake](https://github.com/DannyShayH/Supavisor-frontend-remake)

## References

- [MCP Introduction](https://aida.kursusmaterialer.dk/toolbox/mcp/mcp/)
- [MCP Tutorial](https://aida.kursusmaterialer.dk/toolbox/mcp/mcp-tutorial/)
- [Official MCP Docs](https://modelcontextprotocol.io/docs/)
- [Java SDK Docs](https://java.sdk.modelcontextprotocol.io/latest/)

## Video

- [Building Agents with Model Context Protocol - Full Workshop](https://www.youtube.com/watch?v=kQmXtrmQ5Zg)
