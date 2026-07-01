---
tags:
  - Variables
  - Syntax
  - Core Features
---

# Variables

## Using Variables in MarkdownFlow

Variables are an advanced way to name shared context in MarkdownFlow. They act as placeholders that get replaced with actual values during processing.

For most single-document MarkdownFlow experiences, you do **not** need variables in interaction controls. Write `?[Option A | Option B]` or `?[...input hint]`, then refer to the user's answer naturally in the following prompt. Use variables when a value must come from the platform or be shared across different MarkdownFlow documents.

## Basic Syntax

Variables use double curly braces:

```markdown
{{variable_name}}
```

**Simple shared-context example:**

```markdown
Say hello to {{user_name}}! Tell the user the account balance is {{balance}}.
```

## Variable Naming Rules

Variable names are **case-sensitive** and must follow these rules:

- **Can contain**: Letters (including Unicode letters like Chinese, Japanese, etc.), numbers, and underscores
- **Cannot contain**: Special characters, spaces, punctuation marks, or the `}` character
- **Cannot be**: Empty (must have at least one character)
- **No spaces between braces and name**: `{{ var }}` is NOT recognized as a variable

### Valid Variable Names

```markdown
{{name}} ✓ Simple letters
{{userName}} ✓ camelCase
{{user_name}} ✓ snake_case
{{UserName}} ✓ PascalCase
{{user123}} ✓ With numbers
{{_private}} ✓ Starting with underscore
{{CONSTANT}} ✓ All caps
{{a}} ✓ Single character
{{123user}} ✓ Starts with number
{{用户名}} ✓ Unicode characters (Chinese)
{{ユーザー}} ✓ Unicode characters (Japanese)
{{пользователь}} ✓ Unicode characters (Russian)
{{utilisateur}} ✓ Unicode characters (French)
```

### Invalid Variable Names

```markdown
{{user}name}} ✗ Contains } character
{{user name}} ✗ Contains space inside name
{{user-name}} ✗ Contains hyphen
{{user.name}} ✗ Contains dot
{{user@email}} ✗ Contains special characters
{{🚀rocket}} ✗ Contains emoji
{{name[0]}} ✗ Contains brackets
{{user+id}} ✗ Contains plus sign
{{}} ✗ Empty variable
{{   }} ✗ Only spaces
{{ name }} ✗ Spaces between braces and name (not recognized as variable)
{{ name}} ✗ Space before name (not recognized as variable)
{{name }} ✗ Space after name (not recognized as variable)
```

## How Variables Work

### 1. Sources

Variables get their values from multiple sources:

**Named interaction input for cross-document sharing:**

```markdown
Ask the user for a profile name that should be available to later MarkdownFlow documents.
?[%{{shared_profile_name}} ...Enter your name]

In a different MarkdownFlow document, generate a warm greeting for {{shared_profile_name}}.
```

Do not add `%{{variable}}` to ordinary single-document interactions. The named variable form is for shared state.

**System Predefined Variables:**

System variables are pre-assigned by the platform and can be used directly without any user input. Different platforms provide different system variables:

**[MarkdownFlow Playground](https://play.mdflow.run):**

- `{{browser_language}}` - User's browser language (e.g., "en-US", "zh-CN")

**[AI-Shifu Platform](https://ai-shifu.com):**

- `{{sys_user_nickname}}` - User's display name
- `{{sys_user_style}}` - User's preferred content style
- `{{sys_user_background}}` - User's background information
- `{{sys_user_language}}` - User's language preference

### 2. Variable Replacement

Before the LLM processes the content, the MarkdownFlow Agent replaces all variables with their values:

```markdown
Before: "Generate a personalized greeting for {{user_name}} who is learning {{topic}} at {{level}} level."
After: "Generate a personalized greeting for Alice who is learning Python at beginner level."
```

The LLM then processes this resolved prompt to generate the actual content for the reader.

### 3. Unassigned Variables

If a variable has not been assigned a value, it's replaced with "UNKNOWN":

```markdown
Before: "Create content for {{user_type}} interested in {{topic}}."
After: "Create content for UNKNOWN interested in UNKNOWN."
```

**Important:** Always assign values to variables before using them, typically through shared interaction state or system defaults, to avoid "UNKNOWN" appearing in your prompts. When the LLM receives "UNKNOWN" in prompts, its output may be random and unpredictable, failing to meet your expectations.

## Variables in Different Contexts

When you use shared variables, they can appear anywhere in your document:

### In Text

```markdown
Create a personalized welcome message for {{username}} that feels warm and familiar.
```

### In Headers

```markdown
# Chapter {{chapter_number}}: {{chapter_title}}
```

### In Lists

```markdown
Summarize the user's product selections in a clear list format:
- Their chosen color: {{selected_color}}
- Their selected size: {{selected_size}}  
- The quantity they want: {{quantity}}
```

### In Links and Images

```markdown
[Visit {{site_name}}]({{site_url}})
![{{image_description}}]({{image_path}})
```

### In Tables

```markdown
Create a formatted table showing the user's account information:
| Property | Value                 |
| -------- | --------------------- |
| Name     | {{user_name}}         |
| Email    | {{user_email}}        |
| Plan     | {{subscription_plan}} |
```

### In HTML

```html
<div class="{{theme_class}}">
  <span id="user-{{user_id}}">{{display_name}}</span>
</div>
```
