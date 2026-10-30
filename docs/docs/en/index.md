---
tags:
  - Getting Started
  - Introduction
  - Overview
---

# Getting Started

## What is MarkdownFlow?

MarkdownFlow (also known as MDFlow or markdown-flow) extends standard Markdown with AI to create personalized, interactive pages. Its tagline is **"Write Once, Deliver Personally"**.

Instead of writing static content for readers, you write prompts for AI agents. These agents transform your instructions into personalized content that adapts to each user's choices, preferences, and context.

## Complete Compatibility with Markdown

**MarkdownFlow is not a replacement for Markdown — it's a natural extension:**

- ✅ All standard Markdown syntax works unchanged
- ✅ All Markdown extensions (tables, task lists, footnotes) work normally  
- ✅ Existing Markdown documents work in MDFlow without modification
- ✅ Your favorite Markdown editors and toolchains continue to work

You can start with any existing Markdown document and gradually add MDFlow features as needed.

## Everyday Syntax First

MarkdownFlow adds interactive elements, preserved output, and memory to standard Markdown:

!!! tip "Remember the Core Principle"
    All examples below show **AI instructions**, not direct user content. You write prompts for AI to generate personalized content.

### 1. Interactive Elements

Buttons and input fields collect user choices. In a single MarkdownFlow document, you can refer to the user's response naturally in the following prompt.

```markdown
Ask the user about their experience level.
?[Beginner | Intermediate | Expert]

Generate a learning recommendation based on the experience level the user just selected.

Ask the user about their habits. Can be single or multiple choice.
?[Movies || Sports || Reading || Traveling]

Collect the user's name in a friendly way.
?[...Enter your name here]
```

**Learn more:** [Interaction Specification](specification/interaction.md)

### 2. Preserved Content

Text that maintains its exact meaning and style during AI processing.

```markdown
Introduce our company values, making sure to preserve the exact motto:
===Amplifying humanity's eternal values===

Provide installation instructions, preserving the exact command:
===npm install markdown-flow===
```

**Learn more:** [Preserved Output Specification](specification/preserved.md)

### 3. Memory

Memory records questions and their answers so the AI can use relevant context later. Put a question at the beginning of an interaction to save its answer, then refer to the same question in a later prompt:

```markdown
Ask the user about their experience level.
?[{{What is your experience level?}} Beginner | Intermediate | Expert]

Adapt the next explanation to {{What is your experience level?}}.
```

The platform determines where memory is saved and which documents can use it. In AI-Shifu, course memory can be reused across lessons in the same course.

**Learn more:** [Memory Specification](specification/memory.md)

## How It Works (Simple Version)

A **MarkdownFlow Agent** processes your document by:

1. Reading your MDFlow document (AI instructions)
2. Incorporating reader responses from interaction controls
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
