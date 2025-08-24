# Getting Started

## What is MarkdownFlow?

MarkdownFlow (also known as **MDFlow** or **MDF**) extends standard Markdown to create personalized, interactive documents. The tagline: **"Write Once, Deliver Personally"**.

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

**Learn more:** [Variables Specification](../specification/variables.md)

### 2. Interactive Elements: `?[%{{variable}}Option1|Option2]`

Buttons and input fields that collect user choices and store them in variables.

```markdown
Ask the user about their experience level and store the response.
?[%{{level}}Beginner|Intermediate|Expert]

Collect the user's name in a friendly way.
?[%{{name}}...Enter your name here]
```

**Learn more:** [Buttons & Input Specification](../specification/button-input.md)

### 3. Preserved Content: `===content===`

Text that maintains its exact meaning and style during AI processing.

```markdown
Introduce our company values, making sure to preserve the exact motto:
===Innovation Through Simplicity===

Provide installation instructions, preserving the exact command:
===npm install markdown-flow===
```

**Learn more:** [Preserved Output Specification](../specification/preserved-output.md)

## How It Works

The key insight: **you write prompts for AI, not content for humans.**

**Traditional Markdown:**

```markdown
Python is a high-level programming language known for its simplicity.
```

**MarkdownFlow:**

```markdown
Explain Python to a {{level}} programmer interested in {{use_case}},
emphasizing aspects most relevant to their background.
```

The MDFlow version generates personalized explanations based on each user's level and interests.

## Quick Preview

Here's a simple interactive learning example:

```markdown
# Learn Python Programming

What's your programming background?
?[%{{experience}}Complete beginner|Some experience|Professional developer]

What interests you most about Python?
?[%{{interest}}Web development|Data analysis|Automation|AI/ML]

---

Generate a personalized Python introduction for someone with {{experience}}
who is interested in {{interest}}. Include:

1. A motivating opening that connects to their {{interest}}
2. Three key Python advantages for {{interest}}
3. A simple "Hello World" example with explanation
4. Next learning steps tailored to {{experience}} level

Keep it encouraging and practical.
```

This template creates different learning experiences for different users, all from a single source document.

## What's Next?

Ready to dive in? Follow this learning path:

1. **[Core Concepts](concepts.md)** - Understand the fundamental principles
2. **[Your First MarkdownFlow](first-mdflow.md)** - Build your first interactive document  
3. **[Try It Now](playground.md)** - Practice with live examples
4. **[Next Steps](next-steps.md)** - Explore advanced features and get help

Or jump straight to the action with our **[5-minute quickstart](first-mdflow.md)**!
