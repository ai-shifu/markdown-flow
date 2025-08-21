# Variables

## Using Variables in MarkdownFlow

Variables are the foundation of dynamic content in MarkdownFlow. They act as placeholders that get replaced with actual values during processing, enabling personalized and context-aware documents.

## Basic Syntax

Variables use double curly braces:

```markdown
{{variable_name}}
```

**Simple example:**

```markdown
Say hello to {{user_name}}! Tell the user the account balance is {{balance}}.
```

## Variable Naming Rules

**to aichy: 这样宽松的规则，会不会导致一些潜在的问题？比如说安全性问题？**

Variable names are **case-sensitive** and can use any character combination except `}` and spaces:

- **Can contain**: Any characters including letters, numbers, special characters, emojis, non-ASCII characters
- **Cannot contain**: The `}` character (as it marks the end of the variable)
- **Cannot be**: Empty (must have at least one character)
- **No spaces between braces and name**: `{{ var }}` is NOT recognized as a variable

### Valid Variable Names

```markdown
{{name}} ✓ Simple
{{userName}} ✓ camelCase
{{user_name}} ✓ snake_case
{{UserName}} ✓ PascalCase
{{user123}} ✓ With numbers
{{_private}} ✓ Starting with underscore
{{CONSTANT}} ✓ All caps
{{a}} ✓ Single character
{{123user}} ✓ Starts with number
{{user-name}} ✓ Contains hyphen
{{user.name}} ✓ Contains dot
{{用户}} ✓ Non-ASCII characters
{{user@email}} ✓ With special characters
{{🚀rocket}} ✓ With emoji
{{name[0]}} ✓ Array-like notation
```

### Invalid Variable Names

```markdown
{{user}name}} ✗ Contains } character
{{user name}} ✗ Contains space inside name
{{}} ✗ Empty variable
{{   }} ✗ Only spaces
{{ name }} ✗ Spaces between braces and name (not recognized as variable)
{{ name}} ✗ Space before name (not recognized as variable)
{{name }} ✗ Space after name (not recognized as variable)
```

## How Variables Work

### 1. Declaration and Assignment

Variables get their values from multiple sources:

**User Input:**

```markdown
What's your name?
?[%{{name}} ...Enter your name]

Hello, {{name}}!
```

**System Variables:**

```markdown
Your browser language is {{browser_language}}.
Current year is {{year}}.
```

### 2. Variable Replacement

Before the LLM processes the content, the MarkdownFlow Agent replaces all variables with their values:

```markdown
Before: "Welcome {{user}}, you selected {{choice}}!"
After: "Welcome Alice, you selected Python!"
```

### 3. Empty Variables

If a variable has no value, it's replaced with an empty string:

```markdown
Before: "Hello {{undefined_var}}!"
After: "Hello !"
```

**Important:** Always assign values to variables before using them, typically through user input or system defaults.

## Variables in Different Contexts

Variables work everywhere in your document:

### In Text

```markdown
Welcome back, {{username}}!
```

### In Headers

```markdown
# Chapter {{chapter_number}}: {{chapter_title}}
```

### In Lists

```markdown
Your selections:

- Color: {{selected_color}}
- Size: {{selected_size}}
- Quantity: {{quantity}}
```

### In Links and Images

```markdown
[Visit {{site_name}}]({{site_url}})
![{{image_description}}]({{image_path}})
```

### In Tables

```markdown
| Property | Value                 |
| -------- | --------------------- |
| Name     | {{user_name}}         |
| Email    | {{user_email}}        |
| Plan     | {{subscription_plan}} |
```

### In HTML

```markdown
<div class="{{theme_class}}">
  <span id="user-{{user_id}}">{{display_name}}</span>
</div>
```

## System Predefined Variables

Different platforms provide different system variables:

### MarkdownFlow Playground

```markdown
{{browser_language}} # User's browser language (e.g., "en-US", "zh-CN")
```

**Example:**

```markdown
{{#if browser_language == "zh-CN"}}
欢迎！
{{else}}
Welcome!
{{/if}}
```

### AI-Shifu Platform

```markdown
{{sys_user_nickname}} # User's display name
{{sys_user_background}} # User's profile information
{{sys_user_preference}} # User's content preferences
```

**Example:**

```markdown
Hi {{sys_user_nickname}}!

Based on your background in {{sys_user_background}},
here's content tailored to your interests...
```

### Custom Implementations

You can define your own system variables:

```markdown
{{company_name}} # Your organization
{{current_date}} # Today's date
{{user_role}} # User's permission level
{{session_id}} # Unique session identifier
```

## Practical Examples

### 1. Personalized Greeting

```markdown
# Welcome, {{first_name}}!

Good {{time_of_day}}, {{first_name}} {{last_name}}.

You last visited on {{last_visit_date}}.
You have {{unread_count}} new messages.
```

### 2. Dynamic Configuration

```markdown
## {{app_name}} Configuration

Server: {{server_url}}
Port: {{server_port}}
Environment: {{environment}}
Debug Mode: {{debug_enabled}}
```

### 3. Conditional Content

```markdown
Your subscription: {{plan_type}}

{{#if plan_type == "free"}}
Upgrade to Pro for advanced features!
{{else}}
Thank you for being a {{plan_type}} subscriber!
{{/if}}
```

### 4. Form Data Collection

```markdown
## Registration Form

Name: ?[%{{full_name}} ...Enter your full name]
Email: ?[%{{email}} ...your@email.com]
Country: ?[%{{country}} USA | UK | Canada | ...Other]

## Confirmation

Thank you, {{full_name}}!
We'll send confirmation to {{email}}.
Your country selection: {{country}}
```

### 5. Multi-language Support

```markdown
{{#if browser_language starts with "es"}}
Hola, {{user_name}}!
{{#elif browser_language starts with "fr"}}
Bonjour, {{user_name}}!
{{#elif browser_language starts with "zh"}}
你好，{{user_name}}！
{{else}}
Hello, {{user_name}}!
{{/if}}
```

## Best Practices

### 1. Use Descriptive Names

```markdown
Good: {{user_email}}, {{selected_product}}, {{total_price}}
Poor: {{e}}, {{prod}}, {{p}}
```

### 2. Follow Naming Conventions

Choose one style and stick to it:

```markdown
camelCase: {{userName}}, {{orderStatus}}, {{isActive}}
snake_case: {{user_name}}, {{order_status}}, {{is_active}}
```

### 3. Initialize Before Use

Always ensure variables have values:

```markdown
What's your name?
?[%{{name}} ...Your name]

<!-- Now safe to use {{name}} -->

Welcome, {{name}}!
```

### 4. Group Related Variables

```markdown
User Info:

- {{user_name}}
- {{user_email}}
- {{user_role}}

Order Details:

- {{order_id}}
- {{order_date}}
- {{order_total}}
```

### 5. Document System Variables

If creating a template for others:

```markdown
<!-- Available System Variables:
{{company_name}} - Organization name
{{current_year}} - Current year (YYYY)
{{user_locale}} - User's locale (e.g., en-US)
-->
```

## Advanced Usage

### Variable Chains

Variables resolved in sequence:

```markdown
?[%{{first_name}} ...First name]
?[%{{last_name}} ...Last name]

Your full name is {{first_name}} {{last_name}}.
```

### Variables in Prompts

Variables work in document prompts:

```markdown
---
Tone: Adjust for {{user_level}} level
Language: Translate to {{browser_language}}
Style: Use {{writing_style}} style
---
```

### Debugging Variables

To check variable values during development:

```markdown
<!-- Debug Info -->

Variable values:

- name: {{name}}
- choice: {{choice}}
- undefined: {{undefined_var}}
```

## Summary

Variables in MarkdownFlow:

- Use `{{variable_name}}` syntax
- Are case-sensitive
- Get replaced before LLM processing
- Work everywhere in your document
- Can be user-defined or system-provided

Start with simple variable substitution, then explore advanced patterns as your documents become more sophisticated. The key is ensuring variables are assigned values before use, typically through user interactions or system defaults.
