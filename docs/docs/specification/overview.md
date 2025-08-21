# Overview

## The Relationship Between MarkdownFlow and Markdown

MarkdownFlow is a natural extension of Markdown, not a replacement. Like GitHub Flavored Markdown (GFM) or CommonMark extensions that enhanced the original Markdown, MarkdownFlow adds new capabilities while maintaining complete compatibility.

### Complete Compatibility

**All your Markdown knowledge and habits remain valid:**

- All standard Markdown syntax stays unchanged
- All Markdown extensions (tables, task lists, footnotes, etc.) work normally
- Existing Markdown documents work in MarkdownFlow without modification
- Your favorite Markdown editors and toolchains continue to work

### Simple Example

Here's a standard Markdown document:

```markdown
# Welcome

This is a **standard** Markdown document.

- List item 1
- List item 2

> Quoted text

[Link](https://example.com)
```

This document behaves exactly the same in MarkdownFlow. You don't need to change anything.

### Progressive Enhancement

MarkdownFlow follows a "progressive enhancement" philosophy. You can:

1. **Start from zero**: Use any Markdown document directly as a MarkdownFlow document
2. **Add gradually**: Add MarkdownFlow features as needed
3. **Mix freely**: Combine standard Markdown and MarkdownFlow syntax in the same document

### Adding MarkdownFlow Features

When you need personalization or interactivity, simply add MarkdownFlow's extended syntax:

```markdown
# Welcome, {{user_name}}!

This is an **enhanced** MarkdownFlow document.

What's your experience level?
?[%{{level}} Beginner | Intermediate | Expert]

- List item 1
- List item 2
- Personalized content based on {{level}}

> ===Always keep a learning mindset===

[Link](https://example.com)
```

### Key Advantages

1. **Zero learning curve**: No need to learn a new markup language
2. **Backward compatible**: No migration needed for existing documents
3. **Tool friendly**: Continue using your favorite editors
4. **Gradual adoption**: Use new features only when needed

### MarkdownFlow Extensions

MarkdownFlow adds only three new syntax constructs:

| Feature           | Syntax                           | Purpose                     |
| ----------------- | -------------------------------- | --------------------------- |
| Variables         | `{{variable}}`                   | Dynamic content replacement |
| Interactions      | `?[%{{var}} Option1 \| Option2]` | User input collection       |
| Preserved Content | `===content===`                  | Precise output control      |

These extensions are **optional**. You can write pure Markdown, or mix these features as needed.

### Practical Examples

**Pure Markdown (completely valid MarkdownFlow):**

```markdown
# Python Getting Started Guide

Python is an easy-to-learn programming language.

## Installation

1. Download Python
2. Run the installer
3. Verify installation
```

**Enhanced MarkdownFlow version:**

```markdown
# Python Getting Started Guide

Python is an easy-to-learn programming language.

What operating system are you using?
?[%{{os}} Windows | macOS | Linux]

## Installation

For your {{os}} system, follow these steps:

1. Download Python for {{os}}
2. Run the installer
3. Verify installation: ===python --version===
```

### Summary

MarkdownFlow doesn't change how you write Markdown—it simply provides more possibilities when you need them. Just as you can write Markdown without using tables, you can write MarkdownFlow documents without using any MarkdownFlow features.

The choice is always yours.
