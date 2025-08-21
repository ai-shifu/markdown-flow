# Preserved Output

## Controlling Exact Output in MarkdownFlow

Sometimes you need certain content to appear exactly as written, without AI interpretation or modification. MarkdownFlow's preserved output feature ensures specific text remains unchanged during processing, giving you precise control over critical content.

## Basic Syntax

Use three equal signs `===` to mark preserved content:

```markdown
===This text will appear exactly as written===
```

## Why Use Preserved Output?

Preserved output is essential when you need:

- **Exact quotes** - Maintaining original wording and attribution
- **Fixed phrases** - Brand slogans, legal text, technical terms
- **Special formatting** - ASCII art, code snippets, formatted text
- **Original language** - Keeping certain words in their source language

## Three Usage Patterns

### 1. Inline Preservation

For preserving words or short phrases within a sentence:

```markdown
The command ===npm install=== must be typed exactly as shown.

Our motto is ===Innovation Through Simplicity===.
```

**Output:**

```text
The command npm install must be typed exactly as shown.
Our motto is Innovation Through Simplicity.
```

### 2. Single Line Preservation

For preserving entire lines:

```markdown
Follow these steps:

1. Open terminal
2. ===Type: git commit -m "Initial commit"===
3. Press Enter
```

**Output:**

```text
Follow these steps:
1. Open terminal
2. Type: git commit -m "Initial commit"
3. Press Enter
```

### 3. Multi-line Preservation

For preserving blocks of text:

```markdown
Here's the famous quote:

===
"The only way to do great work is to love what you do.
If you haven't found it yet, keep looking.
Don't settle."

- # Steve Jobs

This quote inspires many entrepreneurs.
```

**Output:**

```text
Here's the famous quote:

"The only way to do great work is to love what you do.
If you haven't found it yet, keep looking.
Don't settle."
- Steve Jobs

This quote inspires many entrepreneurs.
```

## Language Translation Behavior

A unique feature: preserved content can be translated while maintaining the original style and tone.

### With Translation Instructions

```markdown
===Welcome to our platform!===

---

Document Prompt: Translate all content to {{browser_language}}
```

**Results by language:**

- English: "Welcome to our platform!"
- Chinese: "欢迎来到我们的平台！"
- Spanish: "¡Bienvenido a nuestra plataforma!"
- French: "Bienvenue sur notre plateforme!"

The translation maintains the enthusiastic tone while adapting to the target language.

### Without Translation Instructions

If no language directive exists, preserved content remains in its original language:

```markdown
The French say ===C'est la vie=== when accepting life's ups and downs.
```

Remains as: "The French say C'est la vie when accepting life's ups and downs."

## Practical Examples

### 1. Technical Documentation

```markdown
## Installation Guide

To install our package, run:

===pip install markdownflow===

Or if you prefer npm:

===npm install @markdownflow/core===

These commands must be typed exactly as shown.
```

### 2. Legal Text

```markdown
## Terms of Service

By using this service, you agree to:

===
THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT.
===

Please read carefully before proceeding.
```

### 3. Brand Guidelines

```markdown
## Company Branding

Our tagline is ===Write Once, Deliver Personally===

This phrase should always appear exactly as written,
maintaining capitalization and punctuation.

In Chinese markets, use: ===一次创作，千人千面===
```

### 4. Code Examples

```markdown
## Python Example

Here's a simple function:

===
def greet(name):
return f"Hello, {name}!"
===

This function takes a name parameter and returns a greeting.
```

### 5. Poetry and Literature

```markdown
## Classic Poetry

Robert Frost's famous lines:

===
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.
===

These words have inspired generations.
```

### 6. Mixed Content

```markdown
## Product Description

Our ===TurboBoost 3000™=== processor delivers:

- Speed: {{speed_ghz}} GHz
- Cores: {{core_count}}
- Cache: {{cache_mb}} MB

===Note: TurboBoost 3000™ is a registered trademark.===

Performance varies based on {{user_config}}.
```

## Interaction with Variables

Variables inside preserved blocks are **not** replaced:

```markdown
===Welcome {{user_name}}!===
```

Output: "Welcome {{user_name}}!" (literal text)

To use variables with preserved content, place them outside:

```markdown
{{user_name}}, ===welcome to our exclusive club!===
```

Output: "Alice, welcome to our exclusive club!"

## Nesting and Edge Cases

### Cannot Nest Preserved Blocks

```markdown
===outer ===inner=== outer=== ✗ Invalid
```

The parser will treat the first `===` as the closing delimiter.

### Escaping

To display literal `===`:

```markdown
Use \=== three equal signs \=== to preserve content.
```

### Empty Preserved Blocks

```markdown
====== # Valid but outputs nothing
```

### With Markdown Formatting

Markdown inside preserved blocks is still processed:

```markdown
===This is **bold** and this is _italic_===
```

Output: "This is **bold** and this is _italic_"

## Best Practices

### 1. Use for Critical Accuracy

```markdown
Good: ===The chemical formula is H₂SO₄===
Poor: The chemical formula is H₂SO₄ # Might be modified
```

### 2. Preserve Quotations

```markdown
As Einstein said: ==="Imagination is more important than knowledge."===
```

### 3. Maintain Technical Precision

```markdown
Run exactly: ===docker run -p 8080:80 nginx:latest===
```

### 4. Protect Brand Elements

```markdown
Our promise: ===100% Satisfaction Guaranteed™===
```

### 5. Keep Original Language When Needed

```markdown
The Japanese concept of ===生き甲斐 (ikigai)=== means "reason for being."
```

## Common Use Cases

### Command Line Instructions

```markdown
Execute: ===sudo apt-get update && sudo apt-get upgrade===
```

### API Endpoints

```markdown
Send POST request to: ===https://api.example.com/v1/users===
```

### Error Messages

```markdown
If you see: ===Error 404: Page Not Found===, check the URL.
```

### Mathematical Formulas

```markdown
The equation: ===E = mc²=== revolutionized physics.
```

### File Paths

```markdown
Save to: ===/usr/local/bin/markdownflow===
```

## Document Prompt Interaction

Preserved content respects document-level instructions while maintaining fidelity:

```markdown
===Always remember: Practice makes perfect!===

---

Document Prompt:
Style: Casual and friendly
Tone: Encouraging
Language: Adapt to {{browser_language}}
```

The preserved text will:

- Be translated if language is specified
- Maintain its exact meaning and emphasis
- Keep the encouraging tone of the original

## Summary

Preserved output in MarkdownFlow:

- Uses `===text===` syntax
- Maintains exact content fidelity
- Supports inline, single-line, and multi-line usage
- Can be translated while preserving style
- Perfect for quotes, commands, and critical text

Use preserved output whenever you need absolute control over how specific content appears, ensuring important information reaches readers exactly as intended.
