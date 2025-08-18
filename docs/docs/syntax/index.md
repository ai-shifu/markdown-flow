# MarkdownFlow Documentation

Welcome to the official MarkdownFlow documentation! MarkdownFlow is **the HTML of the AI Era** - a document format that humans, code, and AI can all read and write.

## What is MarkdownFlow?

MarkdownFlow extends standard Markdown with powerful features for creating dynamic, AI-powered documents. It enables creators to write instructions that AI can interpret and transform into personalized content.

## Core Concepts

MarkdownFlow introduces three key syntax elements:

1. **Variables** - Dynamic content placeholders
2. **User Input** - Interactive elements for collecting information
3. **AI Instructions** - Natural language directives for AI behavior

## Why MarkdownFlow?

Traditional markdown creates static documents. MarkdownFlow transforms markdown into a programming language for AI, where:

- **Humans** write instructions in natural language
- **AI** interprets these instructions to generate content
- **Users** receive personalized, context-aware experiences

## Syntax Elements

### 1. Variable Interpolation

Use double curly braces to insert dynamic content:

```markdown
Hello {{user_name}}, welcome to {{course_name}}!
```

[Learn more about variables →](variables.md)

### 2. User Input Collection

Collect user choices with interactive elements:

```markdown
?[${{choice}}Option 1|Option 2|Option 3]
```

[Learn more about user input →](user-input.md)

### 3. AI Instructions

Write natural language instructions for AI:

```markdown
Generate a personalized learning plan for {{student_name}} 
based on their {{skill_level}} level in {{subject}}.
```

[Learn more about AI instructions →](ai-instructions.md)

## How It Works

1. **Write** - Create templates using MarkdownFlow syntax
2. **Process** - AI interprets the instructions and variables
3. **Generate** - Personalized content is created for each user
4. **Interact** - Users make choices that influence the content

## Quick Example

Here's a simple MarkdownFlow template:

```markdown
# Welcome {{user_name}}!

Generate a friendly greeting for {{user_name}} who is interested in {{topic}}.

What would you like to learn about {{topic}} today?

?[${{learning_choice}}Basic concepts|Advanced techniques|Practical examples]

---

Based on the choice "{{learning_choice}}", provide appropriate content:

If {{learning_choice}} is "Basic concepts": 
  Explain fundamental principles in simple terms.

If {{learning_choice}} is "Advanced techniques":
  Dive into complex implementations and best practices.

If {{learning_choice}} is "Practical examples":
  Show real-world applications with code samples.
```

## Best Practices

1. **Clear Instructions** - Write unambiguous directives for AI
2. **Meaningful Variables** - Use descriptive variable names
3. **Logical Flow** - Structure content with clear conditions
4. **User Focus** - Design interactions that enhance user experience

## Quick Navigation

### Learn MarkdownFlow Syntax
- [Variables](variables.md) - Master dynamic content with `{{variables}}`
- [User Input](user-input.md) - Create interactive experiences with `?[$...]`
- [AI Instructions](ai-instructions.md) - Write effective AI directives
- [Examples](examples.md) - See complete templates in action

### Use MarkdownFlow Libraries
- [Library Overview](../libraries/index.md) - Choose the right components
- **Frontend**: [React UI](../libraries/frontend/markdown-flow-ui.md) | [remark plugin](../libraries/frontend/remark-flow.md) | [markdown-it plugin](../libraries/frontend/markdown-it-flow.md)
- **Backend**: [Python Agent](../libraries/backend/agent-python.md) | [Go Agent](../libraries/backend/agent-go.md)

## Getting Started

### For Creators
Start with the [syntax guide](variables.md) to learn how to write MarkdownFlow templates that combine human-readable content with AI instructions.

### For Developers
Check out our [libraries](../libraries/index.md) to integrate MarkdownFlow into your applications. We have components for React, Vue, Python, Go, and more.

## Community & Support

- 🎮 [Try the Playground](https://markdownflow.streamlit.app/) - Experiment with MarkdownFlow
- 💬 [GitHub Discussions](https://github.com/ai-shifu) - Join the community
- 🐛 [Report Issues](https://github.com/ai-shifu/markdown-flow/issues) - Help us improve
- 📧 [Contact Us](mailto:support@markdownflow.ai) - Get in touch