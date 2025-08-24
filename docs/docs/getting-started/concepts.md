# Core Concepts

Understanding these key concepts will help you create effective MarkdownFlow documents.

## Writing for AI, Not Humans

!!! info "Paradigm Shift"
    The most important concept: your content is not directly for readers — it's prompts for AI.

**Traditional Markdown:**

```markdown
Python is a high-level programming language known for its simplicity.
It was created by Guido van Rossum in 1991.
```

**MarkdownFlow:**

```markdown
Explain Python to a {{level}} programmer interested in {{use_case}},
emphasizing aspects most relevant to their background.
```

The MDFlow version generates personalized explanations for each user, while traditional Markdown shows the same content to everyone.

## Document Structure

Every MarkdownFlow document has two parts:

**Content Prompt** - Your main document content with AI instructions and MarkdownFlow syntax.

**Document Prompt** - Optional global settings that control how the entire document is processed:

```markdown
Language: Adapt to {{browser_language}}
Tone: Professional but friendly
Style: Clear and concise
```

## What's Next?

Now that you understand the core concepts, let's put them into practice:

**[Quick Start →](quick-start.md)**

Build your first interactive document and see these concepts in action.
