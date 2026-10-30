# Preserved Output

## Intelligent Content Preservation in MarkdownFlow

Sometimes you need certain content to maintain its exact meaning, style, and emphasis. MarkdownFlow's preserved output feature ensures specific text preserves its essence during AI processing, giving you precise control over critical content.

**What "Preserved" Means:**

- **Without translation instructions in document prompt**: Content appears exactly as written
- **With translation instructions in document prompt**: Content is translated while maintaining original style, tone, and emphasis
- **All cases**: Meaning and formatting fidelity are maintained

## Basic Syntax

There are two forms:

- Inline or single-line: wrap content with `===...===`
- Multi-line block: fence with a line containing `!===` (start and end)

```markdown
# Inline
Explain the command ===npm install markdown-flow=== exactly as written.

# Single-line
===This text will appear exactly as written===

# Multi-line block
!===
Line A that must be preserved
Line B that must be preserved
!===
```

## Why Use Preserved Output?

Preserved output is essential when you need:

- **Exact quotes** - Maintaining original wording, attribution, and tone
- **Fixed phrases** - Brand slogans, legal text, technical terms with precise meaning
- **Special formatting** - ASCII art, code snippets, formatted text
- **Consistent messaging** - Key phrases that must convey the same emphasis when translated (if document prompt requests translation)

## How Preservation Works with Document Prompts

MarkdownFlow's preservation behavior depends on **document prompt instructions**:

### Without Language Instructions

```markdown
===Welcome to our platform!===

---
Document Prompt:
Style: Professional
Tone: Friendly
```

**Output:** "Welcome to our platform!" (exactly as written, no translation)

### With Language Instructions

```markdown
===Welcome to our platform!===

---
Document Prompt:
Style: Professional
Tone: Friendly
Language: Translate according to {{Which language do you prefer?}}
```

**Outputs:**

- English user: "Welcome to our platform!"
- French user: "Bienvenue sur notre plateforme !" (translated while preserving enthusiastic tone)
- Spanish user: "¡Bienvenido a nuestra plataforma!"

### Key Point

**Translation only happens when explicitly requested in the document prompt.** This example uses the saved answer to `{{Which language do you prefer?}}` to guide language adaptation. Ask the reader first if that answer is unavailable.

## Three Usage Patterns

### 1. Inline Preservation

For preserving words or short phrases within a sentence:

```markdown
Using {{How familiar are you with command-line tools?}}, explain that the command ===npm install=== must be typed exactly as shown.

Introduce AI Shifu and mention that our motto is ===Amplifying humanity’s eternal values===.
```

Instructs the AI to explain the command while preserving the exact command text, and introduce the company while preserving the exact motto.

### 2. Single Line Preservation

For preserving entire lines:

```markdown
Provide step-by-step instructions for {{What task would you like to complete?}}:

1. Use {{Which operating system do you use?}} to explain how to open a terminal
2. ===Type: git commit -m "Initial commit"===
3. Tell them to press Enter and what to expect
```

Instructs the AI to create personalized instructions while preserving the exact command text.

### 3. Multi-line Preservation

For preserving blocks of text:

```markdown
Share an inspirational quote:

!===
"The only way to do great work is to love what you do.
If you haven't found it yet, keep looking.
Don't settle."
- Steve Jobs
!===

Explain how this quote relates to {{What interests you?}} and why it inspires many entrepreneurs.
```

Instructs the AI to contextualize the quote for the user's interests while preserving the exact quote text and attribution.

### Why different markers for multi-line?

Using a bare `===` line as a fence can conflict with Markdown's Setext-style headings, where a line of `===` under text denotes an H1. To avoid parsing and linting ambiguities, multi-line preserved blocks use `!===` as the fence, and inline/single-line forms use `===...===`.
