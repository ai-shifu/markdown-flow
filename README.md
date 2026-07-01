# <img src="assets/logos/logo-color.svg" alt="MarkdownFlow Logo" height="28"> MarkdownFlow

> **Write Once, Deliver Personally**

MarkdownFlow extends standard Markdown with AI to create personalized, interactive pages. Instead of writing static content for readers, you write prompts for AI agents that transform your instructions into personalized content adapting to each user's choices, preferences, and context.

## ✨ What Makes MarkdownFlow Special

- **📝 Fully Compatible with Markdown** - All standard Markdown syntax works unchanged
- **🤖 AI-Powered Personalization** - Write prompts for AI, not content for humans
- **🎯 Simple Extensions** - Interactive elements, preserved content, and advanced variables
- **🌍 Multi-Language Support** - Built with international audiences in mind

## 🚀 Quick Links

| Resource | Description | Link |
|----------|-------------|------|
| **🌐 Official Website** | Project homepage and overview | [markdownflow.ai](https://markdownflow.ai) |
| **🎮 Playground** | Try MarkdownFlow interactively | [play.mdflow.run](https://play.mdflow.run) |
| **📚 Documentation** | Complete guides and references | [markdownflow.ai/docs](https://markdownflow.ai/docs) |

## 🔧 Open Source Projects

### Frontend Libraries

| Project | Description | Language | License |
|---------|-------------|----------|---------|
| [**markdown-flow-ui**](https://github.com/ai-shifu/markdown-flow-ui) | Complete UI components with built-in functionality. Ready-to-use React components for interactive markdown documents. | React/TypeScript | MIT |
| [**remark-flow**](https://github.com/ai-shifu/remark-flow) | React-markdown plugin for MarkdownFlow syntax. Extends react-markdown with variable processing and AI integration. | TypeScript | MIT |
| [**markdown-it-flow**](https://github.com/ai-shifu/markdown-it-flow) | Markdown-it plugin for MarkdownFlow syntax. Adds MarkdownFlow capabilities to any markdown-it powered application. | TypeScript | MIT |

### Backend Implementations

| Project | Description | Language | License |
|---------|-------------|----------|---------|
| [**markdown-flow-agent-py**](https://github.com/ai-shifu/markdown-flow-agent-py) | A Python library to transform MarkdownFlow documents into personalized content. | Python | MIT |
| [**markdown-flow-agent-go**](https://github.com/ai-shifu/markdown-flow-agent-go) | A Go library to transform MarkdownFlow documents into personalized content. (Coming soon) | Go | MIT |

### Core Documentation

| Project | Description | License |
|---------|-------------|---------|
| [**markdown-flow**](https://github.com/ai-shifu/markdown-flow) | Main documentation, website, and development platform. Interactive demo showcasing MarkdownFlow capabilities. | CC |

## 📖 Quick Start

MarkdownFlow adds two everyday extensions to standard Markdown, plus variables for advanced shared context:

### 1. Interactive Elements: `?[Option1 | Option2]`

Buttons and input fields that collect user choices. A single MarkdownFlow document usually does not need variables.

```markdown
Ask the user about their experience level:
?[Beginner | Intermediate | Expert]

Generate a recommendation based on the experience level the user just selected.

Collect the user's name:
?[...Enter your name here]
```

### 2. Preserved Content: `===content===`

Text that maintains its exact meaning during AI processing.

```markdown
Introduce our company values, preserving the exact motto:
===Innovation Through Simplicity===
```

### 3. Variables: `{{variable}}`

Advanced placeholders for shared context, especially when a value must be supplied by the platform or shared across different MarkdownFlow documents.

```markdown
Generate a welcoming message for {{user_name}} that mentions their
current account balance of {{balance}} in a friendly tone.
```

For interaction controls, add `%{{variable}}` only when the answer needs cross-document sharing:

```markdown
?[%{{shared_level}} Beginner | Intermediate | Expert]
```

## 🌟 Use Cases

- **📚 Education** - Personalized learning materials adapting to student levels
- **✍️ Content Creation** - Articles adjusting terminology based on reader expertise  
- **📰 News Media** - Stories expanding from different angles based on interests
- **🎮 Interactive Storytelling** - Narratives where choices influence plot direction

## 🎯 Getting Started

1. **[📖 Read Core Concepts](https://markdownflow.ai/docs/getting-started/concepts/)** - Understand fundamental principles
2. **[⚡ 5-Minute Quick Start](https://markdownflow.ai/docs/getting-started/quick-start/)** - Build your first interactive document
3. **[🎮 Try the Playground](https://play.mdflow.run)** - Practice with live examples
4. **[🚀 Integration Guide](https://markdownflow.ai/docs/getting-started/integration/)** - Add to your project

## 📄 License

This project is licensed under Creative Commons. Individual components have their own licenses (MIT for most libraries).

## 🏢 About

Created by **AI Shifu, LLC** • © 2025

---

**Core Principle**: Write prompts for AI, not content for humans
