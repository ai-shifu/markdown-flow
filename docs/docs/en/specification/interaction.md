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

For a single MarkdownFlow document, interaction controls do **not** need variables. Write the control, then refer to the user's answer naturally in the following prompt. Use variables only when an interaction answer must be shared across different MarkdownFlow documents.

## Complete Syntax

The everyday syntax for interactive elements is:

```text
?[Button1//id1 | Button2//id2 | ...input hint]
```

Or for options (multiple selection):

```text
?[Option1//id1 || Option2//id2 || ...input hint]
```

**Every component is optional**, giving you flexibility to create exactly the interaction you need. The variable prefix `{{variable}}` is an advanced optional component, not a requirement.

## Core Components

### The Framework: `?[` and `]`

Every interactive element starts with `?[` and ends with `]`. These brackets are **mandatory** and mark the boundaries of the interactive element:

An optional leading `{{ name }}` is one complete token. Its name follows the [variable naming rules](variables.md); a `]` inside that name is literal key content and does not close the control.

```markdown
?[...content goes here...]
```

## Buttons (Single Selection)

Buttons allow users to make a single choice from multiple options. They use a single vertical bar (`|`) as the separator between options.

### Basic Syntax

```markdown
?[Button1 | Button2 | Button3]
```

The following prompt can refer to the user's answer directly:

```markdown
Ask the user which learning path they want.
?[Concepts | Examples | Integration]

Recommend the next section based on the learning path the user just selected.
```

### Named Variable Storage with `{{variable}}` (Advanced)

To store an answer for cross-document sharing, place `{{variable}}` at the beginning of the interaction, before the buttons or input hint:

```markdown
?[{{shared_choice}} Yes | No]
```

When the user clicks "Yes", the value "Yes" is stored into `{{shared_choice}}` and can be used by other MarkdownFlow documents that receive the same shared variable context.

### Button IDs with `//id`

You can assign IDs to buttons to separate display text from stable values:

```markdown
?[Small//S | Medium//M | Large//L]
```

- Display: "Small", "Medium", "Large"
- Stable values: "S", "M", "L"

This is useful when you need:

- Consistent backend values regardless of language
- Shorter values for processing
- User-friendly display with technical values

## Options (Multiple Selection)

Options allow users to select multiple items. They use double vertical bars (`||`) as separators between options.

### Basic Syntax

```markdown
?[Option1 || Option2 || Option3]
```

### Return Value Format

Unlike buttons which return a single value, options return a **comma-separated string** of selected values when a named variable is used:

- Buttons: `{{shared_color}} = "Red"`
- Options: `{{shared_skills}} = "Python, JavaScript, Go"`

### Variable and ID Usage

Variables and IDs work the same as with buttons:

- A leading `{{variable}}` stores selections in that named variable
- `//id` separates display from value

## Input (Text Entry)

Input fields allow users to enter custom text. They use `...` followed by a hint.

### Basic Syntax

```markdown
?[...Enter text here]
```

### Variable Usage

Variables work the same as described above. Use `{{variable}}` only when the input must be shared beyond the current MarkdownFlow document:

```markdown
?[{{shared_name}}...Enter your name]
```

## Combining Elements

You can combine buttons/options with input fields to provide both preset choices and custom entry.

### Input with Buttons

Example:

```markdown
How should we address you?

?[Mr. | Ms. | Dr. | Prof. | ...Other (please specify)]

Use the user's chosen form of address in the next greeting.
```

### Input with Options

Example:

```markdown
Select your skills or add new ones:

?[Python || JavaScript || Go || Rust || ...Add another skill]

Summarize the user's skillset based on the selected options and any custom entry.
```

## Tips and Best Practices

### Text Adaptation and IDs

The LLM may adapt button/option text and input hints based on context (translation, rephrasing). Use IDs when you need consistent values:

**Without IDs - Adapted Values:**

- English: "Continue" → stores "Continue"
- French: "Continuer" → stores "Continuer"

**With IDs - Fixed Values:**

- English: "Continue//continue" → stores "continue"
- French: "Continuer//continue" → stores "continue"

### Best Practices

1. **Use Buttons** when users can only choose one option (difficulty, account type)
2. **Use Options** when users can choose multiple items (skills, preferences)
3. **Use Input** when you need custom text (names, feedback, quantities)
4. **Use IDs** when you need consistent backend values across languages
5. **Use Variables** only when an answer must be shared across MarkdownFlow documents
6. **Combine elements** to provide both convenience and flexibility
