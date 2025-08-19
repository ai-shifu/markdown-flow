# What is MarkdownFlow?

**MarkdownFlow is the HTML of the AI Era** — a document format that humans, code, and AI can all read and write.

## Quick Navigation

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">

<div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">

### 📖 [Specification](specification/index.md)
Formal syntax and rules
- Variable syntax
- User input format
- AI instructions

</div>

<div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">

### 🛠️ [SDKs](sdks/index.md)
Libraries for every stack
- React, Vue, JavaScript
- Python backend
- Go backend

</div>

<div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">

### 💡 [Examples](examples/index.md)
Real-world use cases
- Interactive education
- Smart documentation
- Dynamic forms

</div>

<div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">

### 🌐 [Ecosystem](ecosystem/index.md)
Community & integrations
- Official tools
- Community projects
- Commercial products

</div>

</div>

## One-Line Definition

MarkdownFlow extends Markdown with variables, user inputs, and AI instructions to create dynamic, personalized documents.

## The Problem It Solves

Traditional documents are static. The same content for everyone. But in the AI era, we need documents that:
- Adapt to each reader
- Respond to user choices
- Generate personalized content
- Maintain human readability

MarkdownFlow solves this by adding just three simple concepts to standard Markdown.

## Core Concepts

### 1. Variables `{{name}}`
Replace static text with dynamic content:

```markdown
Hello {{user_name}}, welcome to {{course_name}}!
```

### 2. User Input `?[...]`
Collect choices from users:

```markdown
What's your experience level?
?[#{{level}}Beginner|Intermediate|Advanced]
```

### 3. AI Instructions
Write natural language instructions for AI:

```markdown
Generate a learning plan for {{user_name}} who is at {{level}} level.
Make it encouraging and specific to their goals.
```

## A Complete Example

Here's a simple MarkdownFlow template that demonstrates all three concepts:

```markdown
# Welcome to Python Learning! 

What's your name? {{student_name}}

How much programming experience do you have?
?[#{{experience}}None at all|Some basics|Comfortable with another language]

---

Generate a personalized welcome message for {{student_name}}.

Based on their experience level "{{experience}}":
- If "None at all": Start with encouragement and basic concepts
- If "Some basics": Acknowledge their foundation and preview next steps  
- If "Comfortable with another language": Compare Python to other languages

Include 2-3 specific things they'll learn in their first lesson.
```

## How It Works

1. **Write** - Authors create templates using MarkdownFlow syntax
2. **Process** - AI interprets instructions and fills in variables
3. **Interact** - Users make choices that shape the content
4. **Deliver** - Each user gets personalized, relevant content

## Who Uses MarkdownFlow?

### Content Creators
Write once, deliver personalized content to thousands. No coding required.

### Developers
Build interactive applications with markdown as the interface.

### Educators
Create adaptive learning materials that meet students where they are.

### AI Engineers
Define AI behavior using natural language instead of complex prompts.

## Why MarkdownFlow?

### It's Just Markdown
- 100% compatible with standard Markdown
- Works with existing tools and editors
- No proprietary format lock-in

### It's Human-Friendly
- Read and write without special tools
- Natural language instructions
- Clear, simple syntax

### It's Powerful
- Full Turing-complete with AI
- Infinite personalization possibilities
- Works with any LLM provider

## Quick Start

### 1. Try It Online
**[Open the Playground](https://markdownflow.streamlit.app)** - No installation needed

### 2. Learn the Syntax
Master the three core concepts:
- **[Variables](specification/variables.md)** - Dynamic content with `{{variables}}`
- **[User Input](specification/user-input.md)** - Interactive elements with `?[...]`
- **[AI Instructions](specification/ai-instructions.md)** - Natural language directives

### 3. Install an SDK
Choose your technology stack:
- **Frontend**: [React](sdks/javascript/markdown-flow-ui.md), [Vue](sdks/javascript/markdown-it-flow.md), [Vanilla JS](sdks/javascript/markdown-it-flow.md)
- **Backend**: [Python](sdks/python.md), [Go](sdks/go.md)

## Popular Use Cases

- **📚 Adaptive Learning** - Educational content that adjusts to student level
- **📝 Smart Documentation** - Docs that show role-specific information  
- **💬 Conversational AI** - Dynamic chatbot responses
- **📋 Intelligent Forms** - Forms with conditional logic
- **📖 Interactive Stories** - Choose-your-own-adventure narratives

## Resources

### Documentation
- **[Specification](specification/index.md)** - Complete syntax reference
- **[Examples](examples/index.md)** - Real-world templates
- **[SDKs](sdks/index.md)** - Integration libraries

### Community
- **[Discord](https://discord.gg/markdown-flow)** - Chat with users and contributors
- **[GitHub](https://github.com/ai-shifu/markdown-flow)** - Source code and issues
- **[Ecosystem](ecosystem/index.md)** - Extensions and integrations

---

*MarkdownFlow is open source and available under the MIT License.*