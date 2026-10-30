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

For a single MarkdownFlow document, you can refer to the user's answer naturally in the following prompt. To save an answer as memory for later use, add a question at the beginning of the control. The platform determines the scope in which that memory is available.

## Complete Syntax

The everyday syntax for interactive elements is:

```text
?[Button1//id1 | Button2//id2 | ...input hint]
```

Or for options (multiple selection):

```text
?[Option1//id1 || Option2//id2 || ...input hint]
```

**Every component inside the brackets is optional**, giving you flexibility to create the interaction you need. The leading memory question `{{question}}` is optional.

## Core Components

### The Framework: `?[` and `]`

Every interactive element starts with `?[` and ends with `]`. These brackets are **mandatory** and mark the boundaries of the interactive element:

An optional leading `{{ question }}` is one complete token. Its question text follows the [memory question rules](memory.md); a `]` inside the question is literal text and does not close the control.

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

### Saving an Answer as Memory

To save an answer, place the question in `{{...}}` at the beginning of the interaction, before the buttons or input hint:

```markdown
Ask whether the user wants more detailed explanations.
?[{{Would you like detailed explanations?}} Yes | No]

Use {{Would you like detailed explanations?}} to decide how much detail to include.
```

When the user clicks "Yes", that answer can be saved under the question "Would you like detailed explanations?". Later prompts can refer to the same question. The platform determines which documents can use the saved memory.

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

Unlike buttons, which return a single value, options return a **comma-separated string** of selected values when an answer is saved as memory:

- Buttons: question "Which color do you prefer?", answer "Red"
- Options: question "Which programming languages do you use?", answer "Python, JavaScript, Go"

### Memory Questions and IDs

Memory questions and IDs work the same as with buttons:

- A leading `{{question}}` associates the selected answer with that question
- `//id` separates display text from the saved answer

## Input (Text Entry)

Input fields allow users to enter custom text. They use `...` followed by a hint.

### Basic Syntax

```markdown
?[...Enter text here]
```

### Saving Text as Memory

To save a text answer, put its question before the input hint:

```markdown
Ask how the user would like to be addressed.
?[{{How would you like to be addressed?}} ...Enter your name]
```

As with buttons, the platform determines where the memory is saved and where it can be reused.

## Combining Elements

You can combine buttons/options with input fields to provide both preset choices and custom entry.

### Input with Buttons

Example:

```markdown
Ask the user how they would like to be addressed.

?[Mr. | Ms. | Dr. | Prof. | ...Other (please specify)]

Use the user's chosen form of address in the next greeting.
```

### Input with Options

Example:

```markdown
Ask the user to select their skills or add new ones:

?[Python || JavaScript || Go || Rust || ...Add another skill]

Summarize the user's skillset based on the selected options and any custom entry.
```

## Tips and Best Practices

### Author-Provided Text, Translation, and IDs

Use the author's button and option labels and input hints by default. Translation depends on the host: AI-Shifu's native engine instructs the model to preserve authored controls, while the standalone [`markdown-flow-agent-py` SDK (Python package `markdown-flow` 0.4.16)](https://pypi.org/project/markdown-flow/0.4.16/) can translate their display text when `set_output_language(...)` or `set_prompt("output_language", ...)` is configured. Without an output-language setting, the SDK skips interaction translation. During translation, it preserves answer values, adding `//original_value` when needed.

The following examples show separately authored language versions. Use the same `//id` when their saved answers must stay consistent:

**Without IDs - Different Saved Answers:**

- English: "Continue" → stores "Continue"
- French: "Continuer" → stores "Continuer"

**With IDs - Consistent Saved Answers:**

- English: "Continue//continue" → stores "continue"
- French: "Continuer//continue" → stores "continue"

### Best Practices

1. **Use Buttons** when users can only choose one option (difficulty, account type)
2. **Use Options** when users can choose multiple items (skills, preferences)
3. **Use Input** when you need custom text (names, feedback, quantities)
4. **Use IDs** when you need consistent backend values across languages
5. **Add a memory question** when an answer should be saved for later use
6. **Combine elements** to provide both convenience and flexibility
