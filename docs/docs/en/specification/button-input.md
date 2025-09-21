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

## Single Select vs Multi-Select

MarkdownFlow supports two selection modes:

**Single Select Mode (Traditional)**: Use single pipe `|` to separate options

```markdown
?[%{{language}} Python | JavaScript | Go]
```

**Multi-Select Mode (New)**: Use double pipe `||` to separate options

```markdown
?[%{{skills}} Python||JavaScript||Go||Rust]
```

**How MarkdownFlow decides the selection mode**:

- Look at the first separator inside the current button block
- `|` as the first separator → single-select (one choice, like radio buttons)
- `||` as the first separator → multi-select (many choices, like checkboxes)
- You can freely mix single-select and multi-select blocks in the same document because each block decides its own mode
- Single-select returns a single value, multi-select returns an array of values

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

Buttons are separated by pipe characters. You can have 0 to 10 buttons. The separator type determines the selection mode:

**Single-select buttons (using single pipe `|`):**

```markdown
?[%{{color}} Red | Green | Blue]
```

Clicking "Red" stores "Red" in `{{color}}`.

**Multi-select buttons (using double pipe `||`):**

```markdown
?[%{{skills}} Python||JavaScript||Go||Rust]
```

Users can select multiple options. Selected values are stored as an array in `{{skills}}`, such as `["Python", "JavaScript"]`.

**Buttons with IDs (ID becomes the value):**

```markdown
?[%{{size}} Small//S | Medium//M | Large//L]
```

- Display: "Small", "Medium", "Large"
- Values stored: "S", "M", "L"

Multi-select mode also supports IDs:

```markdown
?[%{{frameworks}} React//react||Vue//vue||Angular//angular]
```

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

Instructs the AI to collect multiple aspects of user information and provide comprehensive personalized responses.

### 8. Multi-Select for Event Planning

```markdown
Plan a neighborhood fun day by letting residents pick the activities they care about most.

?[%{{activities}} Crafts||Live Music||Food Trucks||Story Time||Petting Zoo||Outdoor Games]

Describe how the event team will set up the day based on the chosen activities {{activities}}.
```

Instructs the AI to collect several interests at once so the event plan highlights what matters to the community.

### 9. Multi-Select with Text Input

```markdown
Ask participants to share the kinds of refreshments they would enjoy during the session.

?[%{{snacks}} Fresh Fruit||Tea||Coffee||Pastries||...add another idea]

Summarize their selections {{snacks}} and confirm how you will accommodate them.
```

Instructs the AI to use multi-select mode with an optional text field so people can suggest something beyond the preset buttons.

### 10. Mixed Single and Multi-Select Comprehensive Form

```markdown
Gather background information to welcome someone to a learning circle.

Ask about their preferred support style (single-select):
?[%{{support_style}} Step-by-step guides//guide | Short video tips//video | Live check-ins//live | Self-paced articles//articles]

Let them choose topics they hope to explore (multi-select):
?[%{{topics}} Time Management||Career Change||Wellness||Creative Projects||Financial Planning]

Check when they have time to participate:
?[%{{availability}} Weekdays//weekdays | Weeknights//weeknights | Weekends//weekends | Flexible//flexible]

Explain how the learning circle will tailor resources to their support style {{support_style}}, chosen topics {{topics}}, and availability {{availability}}.
```

Instructs the AI to gather different kinds of input in one flow so the welcome message feels personal and practical.

## Single-Select vs Multi-Select Processing Principles

### Separator Recognition Rules

1. **Per-block detection**: Each button block checks the first separator that appears inside the same `?[ ... ]` block to decide the selection mode
2. **Fault tolerance inside a block**: After the first separator is read, MarkdownFlow sticks with that mode even if later separators differ
   - `A||B|C` → Multi-select mode (because `||` appears first in that block)
   - `A|B||C` → Single-select mode (because `|` appears first in that block)
3. **Mixing blocks is expected**: A document can include both single-select and multi-select blocks. Example 10 shows how different sections can gather different kinds of answers without conflict.

### Return Value Formats

- **Single-select**: Returns a single string value

  ```
  {{color}} = "Red"
  ```

- **Multi-select**: Returns an array of strings

  ```
  {{skills}} = ["Python", "JavaScript", "Go"]
  ```

### Usage Guidelines

- **Use single-select**: When users can only choose one option (e.g., difficulty level, account type)
- **Use multi-select**: When users can choose multiple options (e.g., skill lists, interests)
- **Maintain consistency**: Similar interactions in the same document should use the same separator type
- **Add text input**: Add `...` after multi-select options to provide additional custom options
