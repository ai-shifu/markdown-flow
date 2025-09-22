---
tags:
  - Interactive
  - Buttons
  - Options
  - Input
  - User Interface
---

# Interaction

## Introduction

MarkdownFlow provides a powerful yet simple syntax for creating interactive elements that collect user input. These interactions pause content delivery, wait for user response, and then continue with personalized content based on the input.

## Complete Syntax

The complete syntax for interactive elements is:

```text
?[%{{variable}} Button1//id1 | Button2//id2 | ...input hint]
```

Or for options (multiple selection):

```text
?[%{{variable}} Option1//id1 || Option2//id2 || ...input hint]
```

**Every component is optional**, giving you flexibility to create exactly the interaction you need.

## Core Components

### The Framework: `?[` and `]`

Every interactive element starts with `?[` and ends with `]`. These brackets are **mandatory** and mark the boundaries of the interactive element:

```markdown
?[...content goes here...]
```

## Buttons (Single Selection)

Buttons allow users to make a single choice from multiple options. They use a single vertical bar (`|`) as the separator between options.

### Basic Syntax

```markdown
?[%{{variable}} Button1 | Button2 | Button3]
```

### Variable Storage with `%{{variable}}`

The `%` symbol determines how variables behave:

**With `%` - Write Mode (Store Input):**

```markdown
?[%{{choice}} Yes | No]
```

When the user clicks "Yes", the value "Yes" is stored into `{{choice}}`.

**Without `%` - Read Mode (Use Variable Value):**

```markdown
?[{{userName}}, click here to continue]
```

If `{{userName}}` contains "Alice", the button displays: "Alice, click here to continue"

**Without a variable:**

```markdown
?[ Continue ]
```

This creates a simple "Continue" button that just resumes content flow without storing any value.

### Button IDs with `//id`

You can assign IDs to buttons to separate display text from stored values:

```markdown
?[%{{size}} Small//S | Medium//M | Large//L]
```

- Display: "Small", "Medium", "Large"
- Values stored: "S", "M", "L"

This is useful when you need:

- Consistent backend values regardless of language
- Shorter values for processing
- User-friendly display with technical values

## Options (Multiple Selection)

Options allow users to select multiple items. They use double vertical bars (`||`) as separators between options.

### Basic Syntax

```markdown
?[%{{variable}} Option1 || Option2 || Option3]
```

### Return Value Format

Unlike buttons which return a single string, options return a **comma-separated string** of selected values:

- Buttons: `{{color}} = "Red"`
- Options: `{{skills}} = "Python, JavaScript, Go"`

### Variable and ID Usage

Variables and IDs work the same as with buttons:

- `%{{variable}}` stores the selections
- `//id` separates display from value
- Without `%`, uses variable value for display

## Input (Text Entry)

Input fields allow users to enter custom text. They use `...` followed by a hint.

### Basic Syntax

```markdown
?[%{{variable}}...Enter text here]
```

### Variable Usage

Variables work the same as described above - use `%{{variable}}` to store the input.

## Combining Elements

You can combine buttons/options with input fields to provide both preset choices and custom entry.

### Input with Buttons

Example:

```markdown
How should we address you?

?[%{{title}} Mr. | Ms. | Dr. | Prof. | ...Other (please specify)]

We'll address you as: {{title}}
```

### Input with Options

Example:

```markdown
Select your skills or add new ones:

?[%{{skills}} Python || JavaScript || Go || Rust || ...Add another skill]

Your skillset includes: {{skills}}
```

## Tips and Best Practices

### Text Adaptation and IDs

The LLM may adapt button/option text and input hints based on context (translation, rephrasing). Use IDs when you need consistent values:

**Without IDs - Adapted Values:**

- English: "Continue" → stores "Continue"
- Chinese: "继续" → stores "继续"

**With IDs - Fixed Values:**

- English: "Continue//continue" → stores "continue"
- Chinese: "继续//continue" → stores "continue"

### Best Practices

1. **Use Buttons** when users can only choose one option (difficulty, account type)
2. **Use Options** when users can choose multiple items (skills, preferences)
3. **Use Input** when you need custom text (names, feedback, quantities)
4. **Use IDs** when you need consistent backend values across languages
5. **Combine elements** to provide both convenience and flexibility
