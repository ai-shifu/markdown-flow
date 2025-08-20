# Relationship with Markdown

## MarkdownFlow is a Superset of Markdown

MarkdownFlow is to Markdown what TypeScript is to JavaScript — it adds new capabilities while remaining 100% compatible with the original.

```text
┌─────────────────────────────────────┐
│          MarkdownFlow               │
│  ┌─────────────────────────────┐   │
│  │     Standard Markdown       │   │
│  │  - Headers                  │   │
│  │  - Lists                    │   │
│  │  - Links                    │   │
│  │  - Images                   │   │
│  │  - Code blocks              │   │
│  │  - Tables                   │   │
│  │  - etc.                     │   │
│  └─────────────────────────────┘   │
│                                     │
│  + Variables {{...}}                │
│  + User Input ?[$...]               │
│  + AI Instructions                  │
└─────────────────────────────────────┘
```

## Complete Compatibility

### Every Markdown Document is Valid MarkdownFlow

This standard Markdown:

```markdown
# My Document

This is a paragraph with **bold** and _italic_ text.

- Item 1
- Item 2
- Item 3

[Link to website](https://example.com)
```

Is also valid MarkdownFlow. It will render exactly the same.

### Progressive Enhancement

You can gradually add MarkdownFlow features to existing Markdown:

```markdown
# My Document

This is a paragraph with **bold** and _italic_ text.

<!-- Add a variable -->

Hello {{user_name}}!

- Item 1
- Item 2
- Item 3

<!-- Add user input -->

?[%{{choice}}Continue|Stop]

[Link to website](https://example.com)
```

## What MarkdownFlow Adds

### 1. Variables

Standard Markdown has no concept of variables. MarkdownFlow adds:

```markdown
<!-- Markdown: Static text -->

Welcome to our documentation!

<!-- MarkdownFlow: Dynamic text -->

Welcome {{user_name}} to our documentation!
```

### 2. Interactivity

Standard Markdown is read-only. MarkdownFlow adds user input:

```markdown
<!-- Markdown: Just text -->

Choose your path: Beginner or Advanced

<!-- MarkdownFlow: Interactive choice -->

?[%{{path}}Beginner|Advanced]
```

### 3. Intelligence

Standard Markdown is literal. MarkdownFlow adds AI interpretation:

```markdown
<!-- Markdown: Static content -->

Here's information about Python.

<!-- MarkdownFlow: AI-generated content -->

Generate an explanation of Python appropriate for someone
with {{experience_level}} programming experience.
```

## Compatibility Table

| Feature                 | Markdown | MarkdownFlow |
| ----------------------- | -------- | ------------ |
| Headers                 | ✅       | ✅           |
| Lists                   | ✅       | ✅           |
| Links                   | ✅       | ✅           |
| Images                  | ✅       | ✅           |
| Code blocks             | ✅       | ✅           |
| Tables                  | ✅       | ✅           |
| Block quotes            | ✅       | ✅           |
| Horizontal rules        | ✅       | ✅           |
| **Variables**           | ❌       | ✅           |
| **User input**          | ❌       | ✅           |
| **AI instructions**     | ❌       | ✅           |
| **Conditional content** | ❌       | ✅           |
| **Dynamic generation**  | ❌       | ✅           |

## Working with Existing Tools

### Markdown Editors

MarkdownFlow works in any Markdown editor:

- VS Code
- Obsidian
- Typora
- Notable
- Any text editor

The MarkdownFlow syntax is designed to be readable even without processing.

### Markdown Processors

When processed by standard Markdown processors:

- Variables appear as literal text: `{{user_name}}`
- User inputs appear as text: `?[%{{choice}}Yes|No]`
- AI instructions appear as regular paragraphs

When processed by MarkdownFlow processors:

- Variables are replaced with values
- User inputs become interactive elements
- AI instructions generate dynamic content

### Version Control

MarkdownFlow templates are plain text files:

- Git-friendly
- Diff-able
- Merge-able
- Review-able

## Migration Path

### From Static to Dynamic

Starting with standard Markdown:

```markdown
# Tutorial

Welcome to this Python tutorial.

In this tutorial, you will learn:

- Variables
- Functions
- Classes
```

Enhance with MarkdownFlow:

```markdown
# Tutorial

Welcome {{student_name}} to this Python tutorial!

Based on your experience level, in this tutorial you will learn:

?[%{{level}}Beginner|Intermediate|Advanced]

Generate a curriculum appropriate for {{level}} level:

- Include 5-7 topics
- Order from simple to complex
- Add estimated time for each topic
```

### Gradual Adoption

You don't need to convert everything at once:

1. **Phase 1**: Add variables for personalization
2. **Phase 2**: Add user inputs for interactivity
3. **Phase 3**: Add AI instructions for dynamic content
4. **Phase 4**: Combine all features for full power

## Standards Compliance

MarkdownFlow follows these principles:

### 1. CommonMark Compatibility

The base Markdown syntax follows [CommonMark specification](https://commonmark.org/).

### 2. Non-Breaking Extensions

MarkdownFlow extensions don't break standard Markdown parsing.

### 3. Graceful Degradation

Documents remain readable when MarkdownFlow features aren't processed.

### 4. Semantic Clarity

The syntax clearly indicates its purpose:

- `{{...}}` suggests substitution
- `?[...]` suggests a question/input
- Natural language is self-explanatory

## Next Steps

- [5-Minute Quickstart](quickstart.md) - Try MarkdownFlow now
- [Syntax Specification](../specification/index.md) - Detailed syntax rules
- [Installation](installation.md) - Add to your project
