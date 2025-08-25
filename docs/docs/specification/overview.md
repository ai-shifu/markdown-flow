# Overview

MarkdownFlow is a natural extension of Markdown, not a replacement. Like GitHub Flavored Markdown (GFM) or CommonMark extensions that enhanced the original Markdown, MarkdownFlow adds new capabilities while maintaining complete compatibility.

## Complete Compatibility With Markdown

**All your Markdown knowledge and habits remain valid:**

- All standard Markdown syntax stays unchanged
- All Markdown extensions (tables, task lists, footnotes, etc.) work normally
- Existing Markdown documents work in MarkdownFlow without modification
- Your favorite Markdown editors and toolchains continue to work

## Simple Example

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

Therefore, you can:

1. **Start from zero**: Use any Markdown document directly as a MarkdownFlow document
2. **Add gradually**: Add MarkdownFlow features as needed
3. **Mix freely**: Combine standard Markdown and MarkdownFlow syntax in the same document

## Adding MarkdownFlow Features

When you need personalization or interactivity, simply add MarkdownFlow's extended syntax:

```markdown
Say hello to {{user_name}}!

Ask about user's **experience level** on Markdown with three options: beginner, intermediate, and expert.

?[%{{level}} Beginner | Intermediate | Expert]

The user's experience level is {{level}}.

Based on the level, recommend resources for further learning:

- If beginner: "Markdown for Dummies"
- If intermediate: "Mastering Markdown"
- If expert: don't learn any more, just do it
```

A user named John may get output from MarkdownFlow agent like this:

> Hello, John!
>
> Before we dive in, I’d like to gauge your experience with Markdown to tailor my help better. How would you **describe your skill level** with Markdown?
>
> - 😊 **Beginner** (just starting or rarely use it)
> - 🚀 **Intermediate** (comfortable with basics like headers, lists, and links)
> - 🧙 **Expert** (know advanced syntax like tables, footnotes, or HTML integration)
>
> Let me know, and I’ll adapt accordingly! 😊

Then, three buttons appear, and the user selects "Expert". Output continues:

> Since you're at the **Expert** level, the best approach is indeed to **"just do it"**—apply your skills in real-world projects, contribute to open-source documentation, or even create advanced Markdown guides for others.
>
> If you still want to push boundaries, consider:
>
> - Exploring **extended Markdown flavors** (CommonMark, GitHub Flavored Markdown, Pandoc Markdown).
> - Automating Markdown workflows with **scripts/tool**s\*\* (Pandoc, VS Code extensions, or custom parsers).
> - Writing **documentation-as-code** (combining Markdown with static site generators like MkDocs or Jekyll).
>   But honestly? You’ve got this. Go build something cool. 🚀

The above example uses MarkdownFlow's [Variable](variables.md) and [Button](button-input.md) features.

If you want to know how the magic happens, check out the [How It Works](how-it-works.md) section.
