# What is MarkdownFlow?

**MarkdownFlow is the HTML of the AI Era** — a document format that humans, code, and AI can all read and write.

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

## Next Steps

Ready to start? Continue to:
- [Relationship with Markdown](relationship.md) - How MarkdownFlow extends Markdown
- [5-Minute Quickstart](quickstart.md) - Learn by doing
- [Installation Guide](installation.md) - Set up MarkdownFlow in your project