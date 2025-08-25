---
tags:
  - Interactive
  - Buttons
  - Input
  - User Interface
---

# Buttons and Input

## Interactive Elements in MarkdownFlow

MarkdownFlow provides a powerful yet simple syntax for creating interactive elements that collect user input. These interactions pause content delivery, wait for user response, and then continue with personalized content based on the input.

## Basic Syntax

The complete syntax for interactive elements is:

```text
?[%{{variable}} Button1//id1 | Button2//id2 | ButtonN//idN | ...input hint]
```

**Every component is optional**, giving you flexibility to create exactly the interaction you need.

## Understanding Each Component

Let's break down the syntax step by step:

### The Framework: `?[` and `]`

Every interactive element starts with `?[` and ends with `]`. These brackets are **mandatory** and mark the boundaries of the interactive element:

```markdown
?[...content goes here...]
```

### Variables: `%{{variable}}` vs `{{variable}}`

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

### Buttons: Text and IDs

Buttons are separated by the pipe character `|`. You can have 0 to 10 buttons.

**Simple buttons (text becomes the value):**

```markdown
?[%{{color}} Red | Green | Blue]
```

Clicking "Red" stores "Red" in `{{color}}`.

**Buttons with IDs (ID becomes the value):**

```markdown
?[%{{size}} Small//S | Medium//M | Large//L]
```

- Display: "Small", "Medium", "Large"
- Values stored: "S", "M", "L"

This is useful when you want user-friendly display text but need specific values for processing.

### Text Adaptation and IDs

**Important**: Button text and input hints are processed by the LLM, which may adapt them (translate, rephrase, etc.) based on document requirements or user preferences.

**Without IDs - Adapted Values:**

```markdown
?[%{{action}} Continue | Cancel]
```

- English user sees: "Continue", "Cancel" → stores "Continue" or "Cancel"
- Chinese user sees: "继续", "取消" → stores "继续" or "取消"

**With IDs - Fixed Values:**

```markdown
?[%{{action}} Continue//continue | Cancel//cancel]
```

- English user sees: "Continue", "Cancel" → stores "continue" or "cancel"
- Chinese user sees: "继续", "取消" → stores "continue" or "cancel"

**Use IDs when you need consistent values for backend processing or conditional logic.**

### Input Field: `...input hint`

Add a text input field by using `...` followed by input hint:

```markdown
?[%{{name}} ...Enter your name]
```

Creates an input field with "Enter your name" as the input hint.

## Progressive Examples

### 1. Simplest Form - Just Continue

```markdown
Write an engaging story introduction for {{genre}} enthusiasts.

?[Continue]

Continue the story with an exciting development that hooks the reader.
```

Instructs the AI to pause content delivery, allowing users to control reading pace.

### 2. Basic Choice

```markdown
Ask the user if they want to proceed with the {{task_type}}.

?[%{{answer}} Yes | No ]

Respond to their choice: {{answer}}. If yes, encourage them. If no, offer alternatives.
```

Instructs the AI to ask a decision question and respond appropriately based on the user's choice.

### 3. Multiple Options

```markdown
Present difficulty options for {{activity_type}} to the user.

?[%{{level}} Easy | Normal | Hard | Expert ]

Confirm their {{level}} choice and explain what this level entails for {{activity_type}}.
```

Instructs the AI to offer multiple difficulty levels and provide level-appropriate explanations.

### 4. Buttons with Different Values

```markdown
Present subscription options for {{service_name}} with clear value propositions.

?[%{{plan}} Free//free_tier | Pro ($9/mo)//pro_monthly | Enterprise ($99/mo)//enterprise ]

Confirm their plan selection and explain the benefits of the {{plan}} tier.
```

Instructs the AI to present pricing options with user-friendly labels while storing consistent backend identifiers.

### 5. Text Input Only

```markdown
Welcome the user to {{platform_name}} and ask for their name in a friendly way.

?[%{{username}}...Type your name here]

Greet {{username}} personally and explain the next steps for {{platform_name}}.
```

Instructs the AI to collect user information and provide personalized responses.

### 6. Combining Buttons and Input

```markdown
Ask how the user prefers to be addressed in {{context}}.

?[%{{title}} Mr. | Ms. | Dr. | ...Other (please specify)]

Acknowledge their preference ({{title}}) and use it appropriately throughout {{context}}.
```

Instructs the AI to offer common options while allowing custom input for personalized addressing.

### 7. Complex Interactive Form

```markdown
Introduce the personalization process for {{course_topic}}.

Ask for the user's name in a welcoming way:
?[%{{name}}...Enter your name]

Ask about their experience level with {{course_topic}}:
?[%{{level}} Beginner//1 | Intermediate//2 | Advanced//3]

Inquire about their preferred learning approach:
?[%{{style}} Visual | Reading | Practice | All]

Confirm the personalization: address {{name}} by name, acknowledge their {{level}} level, and explain how you'll deliver {{style}} content for {{course_topic}}.
```
