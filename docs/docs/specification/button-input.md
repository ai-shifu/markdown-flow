# Buttons and Input

## Interactive Elements in MarkdownFlow

MarkdownFlow provides a powerful yet simple syntax for creating interactive elements that collect user input. These interactions pause content delivery, wait for user response, and then continue with personalized content based on the input.

## Basic Syntax

The complete syntax for interactive elements is:

```text
?[%{{variable}} Button1//id1 | Button2//id2 | ... | ...placeholder]
```

**Every component is optional**, giving you flexibility to create exactly the interaction you need.

## Understanding Each Component

Let's break down the syntax step by step:

### The Opening Marker: `?[%`

- `?[` - Indicates the start of an interactive element
- `%` - Optional marker for future extension (currently always use `%`)

### Variable Storage: `{{variable}}`

The variable where user input will be stored:

```markdown
?[%{{choice}} Yes | No]
```

When the user clicks "Yes", the value "Yes" is stored in `{{choice}}`.

**Without a variable:**

```markdown
?[% Continue]
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

### Input Field: `...placeholder`

Add a text input field by using `...` followed by placeholder text:

```markdown
?[%{{name}} ...Enter your name]
```

Creates an input field with "Enter your name" as the placeholder.

## Progressive Examples

### 1. Simplest Form - Just Continue

```markdown
The story begins here...

?[% Continue]

And the adventure continues...
```

A single button that lets users control reading pace.

### 2. Basic Choice

```markdown
Do you want to proceed?

?[%{{answer}} Yes | No]

You selected: {{answer}}
```

Two buttons storing the selection.

### 3. Multiple Options

```markdown
Choose your difficulty level:

?[%{{level}} Easy | Normal | Hard | Expert]

Great! You've selected {{level}} mode.
```

Four buttons for different difficulty levels.

### 4. Buttons with Different Values

```markdown
Select your subscription plan:

?[%{{plan}} Free//free_tier | Pro ($9/mo)//pro_monthly | Enterprise//enterprise]

Your plan code: {{plan}}
```

User-friendly labels with backend-friendly values.

### 5. Text Input Only

```markdown
Welcome! What's your name?

?[%{{username}} ...Type your name here]

Hello, {{username}}!
```

Just an input field, no buttons.

### 6. Combining Buttons and Input

```markdown
How would you like to be addressed?

?[%{{title}} Mr. | Ms. | Dr. | ...Other (please specify)]

Thank you, {{title}}!
```

Users can click a button OR type custom input.

### 7. Complex Interactive Form

```markdown
Let's personalize your experience:

What's your name?
?[%{{name}} ...Enter your name]

What's your experience level?
?[%{{level}} Beginner//1 | Intermediate//2 | Advanced//3]

Preferred learning style?
?[%{{style}} Visual | Reading | Practice | All]

Perfect, {{name}}! We'll prepare {{style}} content at level {{level}} for you.
```

## Important Behaviors

### Display Text Adaptation

Button text may be adapted by the LLM based on document requirements:

```markdown
?[%{{continue}} Continue]

---

Document Prompt: Translate to user's language
```

The button might display:

- "Continue" (English)
- "继续" (Chinese)
- "Continuer" (French)

But the value stored in `{{continue}}` remains "Continue".

### No Value Storage

When no variable is specified:

```markdown
Ready for the next section?

?[% Yes, let's go!]

Here's the next part...
```

The interaction just controls flow, no value is stored.

### Empty Options

While unusual, empty options are valid:

```markdown
?[%{{choice}} Option A | | Option C]
```

This creates three buttons: "Option A", an empty button, and "Option C".

## Best Practices

### 1. Clear Labels

```markdown
Good: ?[%{{experience}} Less than 1 year | 1-3 years | More than 3 years]
Poor: ?[%{{experience}} 1 | 2 | 3]
```

### 2. Consistent IDs

```markdown
Good: ?[%{{size}} Small//sm | Medium//md | Large//lg]
Poor: ?[%{{size}} Small//1 | Medium//medium | Large//L]
```

### 3. Meaningful Variables

```markdown
Good: ?[%{{preferredLanguage}} Python | JavaScript | Go]
Poor: ?[%{{var1}} Python | JavaScript | Go]
```

### 4. Appropriate Input Types

Use buttons for limited choices:

```markdown
?[%{{rating}} 1 | 2 | 3 | 4 | 5]
```

Use input fields for open-ended responses:

```markdown
?[%{{feedback}} ...Share your thoughts]
```

### 5. Progressive Disclosure

```markdown
Are you new to programming?
?[%{{isNew}} Yes | No]

{{#if isNew}}
Let's start with the basics...
{{else}}
What languages do you know?
?[%{{languages}} Python | JavaScript | Both | ...Other]
{{/if}}
```

## Common Patterns

### Yes/No Questions

```markdown
?[%{{consent}} I agree | I disagree]
```

### Scale/Rating

```markdown
?[%{{satisfaction}} Very Unsatisfied//1 | Unsatisfied//2 | Neutral//3 | Satisfied//4 | Very Satisfied//5]
```

### Navigation

```markdown
?[%{{section}} Previous | Home | Next]
```

### Form Fields

```markdown
Email: ?[%{{email}} ...your@email.com]
Age: ?[%{{age}} Under 18 | 18-24 | 25-34 | 35-44 | 45-54 | 55+]
```

## Summary

The button and input syntax in MarkdownFlow is designed to be:

- **Flexible** - Every component is optional
- **Intuitive** - Natural to read and write
- **Powerful** - Supports various interaction patterns
- **Adaptive** - Display text can change while maintaining consistent values

Start simple with basic buttons, then add variables, IDs, and input fields as your needs grow. The system handles all the complexity of rendering and state management—you just focus on designing the interaction.
