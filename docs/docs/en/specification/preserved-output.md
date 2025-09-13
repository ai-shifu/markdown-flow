# Preserved Output

## Intelligent Content Preservation in MarkdownFlow

Sometimes you need certain content to maintain its exact meaning, style, and emphasis. MarkdownFlow's preserved output feature ensures specific text preserves its essence during AI processing, giving you precise control over critical content.

**What "Preserved" Means:**

- **Without language instructions**: Content appears exactly as written
- **With language instructions in document prompt**: Content is translated while maintaining original style, tone, and emphasis
- **All cases**: Meaning and formatting fidelity are maintained

## Basic Syntax

There are two forms:

- Inline or single-line: wrap content with `===...===`
- Multi-line block: fence with a line containing `!===` (start and end)

```markdown
# Inline or single-line
Explain the command ===npm install markdown-flow=== exactly as written.

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
Language: Translate to {{browser_language}}
```

**Outputs:**

- English user: "Welcome to our platform!"
- Chinese user: "欢迎来到我们的平台！" (translated while preserving enthusiastic tone)
- Spanish user: "¡Bienvenido a nuestra plataforma!"

### Key Point

**Translation only happens when explicitly requested in the document prompt.** The `{{browser_language}}` variable enables user-specific language adaptation, but only when the document author chooses to use it.

## Three Usage Patterns

### 1. Inline Preservation

For preserving words or short phrases within a sentence:

```markdown
Explain to {{user_type}} that the command ===npm install=== must be typed exactly as shown.

Introduce {{company_name}} and mention that our motto is ===Innovation Through Simplicity===.
```

Instructs the AI to explain the command while preserving the exact command text, and introduce the company while preserving the exact motto.

### 2. Single Line Preservation

For preserving entire lines:

```markdown
Provide step-by-step instructions for {{task_name}}:

1. Explain how to open terminal for {{user_os}}
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

Explain how this quote relates to {{user_interest}} and why it inspires many entrepreneurs.
```

Instructs the AI to contextualize the quote for the user's interests while preserving the exact quote text and attribution.

### Why different markers for multi-line?

Using a bare `===` line as a fence can conflict with Markdown's Setext-style headings, where a line of `===` under text denotes an H1. To avoid parsing and linting ambiguities, multi-line preserved blocks use `!===` as the fence, and inline/single-line forms use `===...===`.
