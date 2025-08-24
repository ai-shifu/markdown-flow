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
---
Language: Adapt to {{browser_language}}
Tone: Professional but friendly
Style: Clear and concise
---
```

Readers never see the document prompt — they only see the AI-generated results.

## How It Works

Here's how your MDFlow source becomes personalized content:

1. **Content Blocking** - Document is divided into logical blocks
2. **Variable Substitution** - `{{variables}}` are replaced with actual values
3. **AI Processing** - Each block is sent to AI with your instructions
4. **Interactive Elements** - System pauses to collect user input if needed
5. **Continue** - Process repeats until document is complete

**For detailed technical information:** [How It Works Specification](../specification/how-it-works.md)

## What's Next?

Now that you understand the core concepts, let's put them into practice:

**[Your First MarkdownFlow →](first-mdflow.md)**

Build your first interactive document and see these concepts in action.
