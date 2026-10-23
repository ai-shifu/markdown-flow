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

Variable names are **text keys**, not programming-language identifiers or expressions. References `{{name}}` and assignments `%{{name}}` use the same rules:

1. Read from `{{` through the **first literal `}}`**. Do not recursively parse `{{` inside that marker.
2. Trim whitespace from both ends of its body. The result must be nonempty.
3. Preserve the remaining text exactly, including internal spaces, repeated spaces, punctuation, Unicode, emoji, brackets, quotes and backslashes. Names are case-sensitive; do not normalize Unicode or punctuation.
4. The normalized name must not contain control characters (U+0000–U+001F or U+007F–U+009F), U+2028, U+2029, or the reserved closing sequence `}}`.

Quotes do not introduce a quoted-name syntax, and backslashes do not introduce escapes inside a name. `{{"name"}}` reads the key `"name"`, including its quotes; `{{path\}}` reads the key ending in a backslash. `{{name[0]}}` and `{{user.name}}` read literal keys rather than evaluating indexing or property access.

Trimming uses this explicit cross-language whitespace set: U+0009–U+000D, U+001C–U+0020, U+0085, U+00A0, U+1680, U+2000–U+200A, U+2028–U+2029, U+202F, U+205F and U+3000. U+FEFF is retained as key content. Trim before checking for forbidden control characters; never collapse interior whitespace.

### Examples

| Marker | Exact key |
| --- | --- |
| `{{user_name}}` | `user_name` |
| `{{ name }}` | `name` |
| `{{user name}}` | `user name` |
| `{{user  name}}` | `user  name` (two internal spaces) |
| `{{What is your gender?}}` | `What is your gender?` |
| `{{🚀 rocket}}` | `🚀 rocket` |
| `{{a{b}c}}` | `a{b}c` |
| `{{ a} }}` | `a}` |
| `{{outer{{inner}}` | `outer{{inner` (no nesting) |

`{{}}` and `{{   }}` are invalid because the normalized name is empty. Interior line breaks and control characters are invalid. A key containing literal `}}` cannot be expressed: `{{a}}b}}` reads key `a` followed by text `b}}`. This syntax defines no escaping or alternate quoting for that sequence.

When generating markers, pad the key with one space on each side: `{{ key }}` or `%{{ key }}`. This also preserves a name ending in a single `}` without introducing escapes. Invalid or empty markers remain literal text; scanning their bodies must not discover nested variables.

### Named Interactions

Read every variable marker as **one atomic token** before interpreting interaction boundaries or operators. Inside a marker, `]` does not close the interaction, `|` does not split options, `//` does not introduce an option value, and `...` does not introduce an input field. Only a leading assignment marker, after optional whitespace padding, names the current interaction's answer. A marker within an option does not assign that answer.

The same protection applies outside controls: `{{ key ?[A|B] }}` is one variable marker, not an interaction. An unclosed marker consumes the remaining text as literal source; do not discover controls inside it.

```markdown
Ask which learning path and level the user prefers.
?[%{{ Which [path] | level//hint...? }} Concepts//concepts | Examples//examples]

Use {{ Which [path] | level//hint...? }} when adapting the next document.
```

Both markers use the exact key `Which [path] | level//hint...?`. Only the operators after the assignment marker describe the buttons.

### Markdown Literal Boundaries

Keep Markdown code spans, complete inline math spans and inline-link resources (destination and title), complete URI/email angle autolinks, fenced and indented code blocks, complete HTML tags, and raw `script`, `style`, `pre` and `textarea` blocks within their existing boundaries. A marker-like example inside one of those literal contexts must not continue beyond that context and hide later variables or controls. Code and math delimiters pair within their native paragraph or heading context. They cannot pair across a blank paragraph or a native block boundary, including fenced blocks and ATX or Setext headings. Raw HTML blocks include the whole line containing their closing tag. For compatibility, document variable extraction still collects complete markers supported in literal examples, including inline code, HTML tags and fenced-code info strings; hosts retain their existing code-block exclusions. Read those spans independently. Escaping an opening brace with Markdown's backslash escape prevents it from starting a marker.

Keep native Markdown boundaries for fences inside list or quote containers and for reference-link definitions. Ordinary HTML blocks such as `<div>` end at the next blank line; the four raw HTML block types above instead end after their closing-tag line. HTML comments, processing instructions, declarations and CDATA blocks likewise include their entire terminating line. Raw HTML blocks and recognized block tags follow native block-start rules even when their opening tag is incomplete. A confirmed container end also bounds an HTML block. LF, CRLF and CR are physical line endings, without rewriting the marker's original text or source offsets.

For example, ``Show `{{` then ?[%{{ q }} A|B]`` declares `q` and contains one interaction. ``Show `%{{ q }}` then ?[A|B]`` still declares `q`, while the code example remains literal when rendered. In surrounding text, a recognized marker takes priority over Markdown-looking characters inside its own body, including backticks, HTML and line breaks used as edge padding. An unfinished marker in that text owns its remaining tail.

### Compatibility

Existing letter/number/underscore names keep their keys. `{{name}}`, `{{ name}}` and `{{ name }}` are equivalent. Existing punctuation, quote and backslash keys are not decoded or renamed. Stored memory is not migrated.

The new rule also recognizes names that older implementations treated as literal or rejected, such as `{{user name}}`. Authors upgrading a parser should check examples containing variable-like text. Earlier SDKs may have collected or replaced a Markdown-escaped opener incorrectly; document processing now keeps that opener literal. Historical malformed markers and names containing interior control characters are outside the valid syntax.

The grammar sets no fixed name length. Hosts may enforce separate storage or request limits after normalization; they must not silently truncate a key. Earlier SDK releases may not support the expanded rule, so implementations adopting it should pass the shared cases.

The [shared conformance cases](../../assets/variable-name-cases.json) specify normalization, extraction, interaction and document-context examples for implementations.

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
