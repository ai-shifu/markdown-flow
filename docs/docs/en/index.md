---
tags:
  - Getting Started
  - Introduction
  - Overview
---

# Getting Started

## What is MarkdownFlow?

MarkdownFlow (also known as MDFlow and markdown-flow) extends standard Markdown with AI-powered intelligence to create personalized, interactive documents. The tagline: **"Write Once, Deliver Personally"**.

Instead of writing static content for readers, you write prompts for AI agents. These agents transform your instructions into personalized content that adapts to each user's choices, preferences, and context.

## Complete Compatibility with Markdown

**MarkdownFlow is not a replacement for Markdown — it's a natural extension:**

- ✅ All standard Markdown syntax works unchanged
- ✅ All Markdown extensions (tables, task lists, footnotes) work normally  
- ✅ Existing Markdown documents work in MDFlow without modification
- ✅ Your favorite Markdown editors and toolchains continue to work

You can start with any existing Markdown document and gradually add MDFlow features as needed.

## Three Simple Extensions

MarkdownFlow adds three new syntax elements to standard Markdown:

!!! tip "Remember the Core Principle"
    All examples below show **AI instructions**, not direct user content. You write prompts for AI to generate personalized content.

### 1. Variables: `{{variable}}`

Dynamic content placeholders that get replaced with actual values.

```markdown
Generate a welcoming message for {{user_name}} that mentions their
current account balance of {{balance}} in a friendly tone.
```

**Learn more:** [Variables Specification](specification/variables.md)

### 2. Interactive Elements: `?[%{{variable}} Option1 | Option2]`

Buttons and input fields that collect user choices and store them in variables.

```markdown
Ask the user about their experience level and store the response.
?[%{{level}} Beginner | Intermediate | Expert]

Collect the user's name in a friendly way.
?[%{{name}}...Enter your name here]
```

**Learn more:** [Buttons & Input Specification](specification/button-input.md)

### 3. Preserved Content: `===content===`

Text that maintains its exact meaning and style during AI processing.

```markdown
Introduce our company values, making sure to preserve the exact motto:
===Innovation Through Simplicity===

Provide installation instructions, preserving the exact command:
===npm install markdown-flow===
```

**Learn more:** [Preserved Output Specification](specification/preserved-output.md)

## How It Works (Simple Version)

A **MarkdownFlow Agent** processes your document by:

1. Reading your MDFlow document (AI instructions)
2. Incorporating reader's personalized information through variables
3. Calling a Large Language Model with these combined instructions
4. Generating personalized content unique to each reader

**For the complete technical workflow:** [See Specification](specification/how-it-works.md)

## What's Next?

Ready to dive in? Follow this learning path:

1. **[Core Concepts](getting-started/concepts.md)** - Understand the fundamental principles
2. **[Quick Start](getting-started/quick-start.md)** - Build your first interactive document  
3. **[Try It Now](https://play.mdflow.run)** - Practice with live examples
4. **[Next Steps](getting-started/next-steps.md)** - Explore advanced features and get help

Or jump straight to the action with our **[5-minute Quick Start](getting-started/quick-start.md)**!
