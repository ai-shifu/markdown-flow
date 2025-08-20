# MarkdownFlow Specification

Version 1.0.0

## Introduction

This document specifies the MarkdownFlow syntax and its parsing rules. MarkdownFlow is a superset of [CommonMark](https://commonmark.org/) that adds three constructs: variables, user inputs, and AI instructions.

## Notation

This specification uses similar notation to the CommonMark spec:

- `→` means "is parsed as"
- `[...]` denotes optional elements
- `|` denotes alternatives
- `*` means zero or more
- `+` means one or more

## Document Structure

A MarkdownFlow document consists of:

```bnf
document ::= block*
block ::= markdown_block | flow_block
flow_block ::= variable | user_input | ai_instruction
```

## Core Constructs

### 1. Variables

Variables are placeholders for dynamic content.

**Syntax:**

```bnf
variable ::= '{{' variable_name '}}'
variable_name ::= [a-zA-Z_][a-zA-Z0-9_]*
```

**Examples:**

```markdown
{{user_name}} → Valid
{{first_name}} → Valid
{{userAge}} → Valid (camelCase allowed)
{{user_age_years}} → Valid
{{123_invalid}} → Invalid (starts with number)
{{user-name}} → Invalid (contains hyphen)
```

### 2. User Input

User inputs collect choices from users.

**Syntax:**

```bnf
user_input ::= '?[' input_marker variable options ']'
input_marker ::= '#' | '$'
options ::= option ('|' option)*
option ::= text_without_pipe
```

**Marker Meanings:**

- `#` - Single selection (radio button behavior)
- `$` - Multi-selection (checkbox behavior)

**Examples:**

```markdown
?[%{{choice}}Yes|No] → Single choice
?[%{{choices}}Red|Blue|Green] → Multiple choices
?[%{{level}}Beginner|Intermediate|Pro] → Single choice with 3 options
```

### 3. AI Instructions

AI instructions are natural language directives for content generation.

**Syntax:**
AI instructions don't have strict syntax - they are written in natural language. However, they commonly use these patterns:

```bnf
conditional ::= 'If' variable 'is' value ':' instruction
generation ::= 'Generate' | 'Create' | 'Write' | 'Provide'
```

**Common Patterns:**

```markdown
Generate a welcome message for {{user_name}}.

If {{level}} is "beginner":
Provide simple explanations.

Create content based on {{topic}} for {{audience}}.
```

## Detailed Specifications

### Variables Specification

#### Parsing Rules

1. **Delimiter Recognition:**

   - Opening delimiter: `{{` (exactly two opening braces)
   - Closing delimiter: `}}` (exactly two closing braces)
   - No spaces allowed between braces

2. **Variable Name Rules:**

   - Must start with letter or underscore
   - Can contain letters, numbers, underscores
   - Case-sensitive (`userName` ≠ `username`)
   - No length limit (implementation-dependent)

3. **Context:**

   - Variables can appear in any context (inline or block)
   - Variables can appear within HTML attributes
   - Variables can appear within code spans/blocks

4. **Escaping:**
   - Use `\{\{` to display literal `{{`
   - Use `\}\}` to display literal `}}`

#### Examples and Edge Cases

```markdown
# Valid Variables

{{name}} → name
{{user_123}} → user_123
{{_private}} → \_private
{{firstName}} → firstName
{{CONSTANT}} → CONSTANT

# Invalid Variables

{{ name }} → Literal text (spaces not allowed)
{{{triple}}} → Literal text (wrong delimiter count)
{{user-name}} → Invalid (hyphen not allowed)
{{123user}} → Invalid (starts with number)

# Edge Cases

{{}} → Invalid (empty variable)
{{a}} → Valid (single character)
{{user_name}} {{email}} → Two separate variables

# In Different Contexts

<img src="{{image_url}}" alt="{{image_alt}}"> → Variables in HTML
`Code with {{variable}}` → Variable in code span
[Link]({{url}}) → Variable in markdown link
```

### User Input Specification

#### Parsing Rules

1. **Delimiter Structure:**

   - Opening: `?[`
   - Marker: `#` (single) or `$` (multiple)
   - Variable: Standard variable syntax
   - Options: Pipe-separated values
   - Closing: `]`

2. **Option Rules:**

   - Options separated by `|` (pipe)
   - Options can contain any text except pipe
   - Options are trimmed of leading/trailing whitespace
   - At least one option required
   - No limit on number of options

3. **Variable Binding:**
   - The variable receives the selected option value(s)
   - Single selection: string value
   - Multi-selection: array of strings

#### Examples and Edge Cases

```markdown
# Valid User Inputs

?[%{{choice}}Yes|No] → Two options
?[%{{color}}Red|Green|Blue|Yellow] → Four options
?[%{{languages}}Python|JavaScript|Go|Rust] → Multi-select
?[%{{option}}Option with spaces|Another one] → Options with spaces

# Invalid User Inputs

?[{{choice}}Yes|No] → Missing marker
?[#Yes|No] → Missing variable
?[%{{choice}}] → No options
?[%{{choice}}Single] → Only one option (valid but unusual)

# Edge Cases

?[%{{choice}}|Empty||Options|] → Empty options are preserved
?[%{{choice}}Option\|with\|pipes] → Escaped pipes in options
?[%{{complex}}Very long option text that spans many words|Short]

# Nested Structures (Not Supported)

?[%{{outer}}?[%{{inner}}A|B]|C] → Invalid nesting
```

### AI Instructions Specification

#### Parsing Guidelines

AI instructions are free-form natural language, but follow these conventions:

1. **Conditional Patterns:**

   ```markdown
   If {{variable}} is "value":
   [instruction]

   When {{variable}} equals "value":
   [instruction]

   Based on {{variable}}:

   - If "value1": [instruction1]
   - If "value2": [instruction2]
   ```

2. **Generation Patterns:**

   ```markdown
   Generate [what] for {{variable}}.
   Create [what] based on {{variable}}.
   Write [what] considering {{variable}}.
   Provide [what] appropriate for {{variable}}.
   ```

3. **Instruction Modifiers:**

   ```markdown
   # Tone modifiers

   Keep it [friendly/professional/casual].

   # Length modifiers

   Make it [brief/detailed/comprehensive].

   # Structure modifiers

   Include [bullet points/numbered list/paragraphs].
   ```

#### Best Practices

1. **Be Specific:**

   ```markdown
   # Good

   Generate a 3-paragraph introduction to {{topic}} for beginners,
   including a definition, why it matters, and a simple example.

   # Poor

   Write about {{topic}}.
   ```

2. **Handle All Cases:**

   ```markdown
   # Good

   If {{level}} is "beginner": [...]
   If {{level}} is "intermediate": [...]
   If {{level}} is "advanced": [...]
   Otherwise: [...]

   # Poor

   If {{level}} is "beginner": [...]

   # Missing other cases
   ```

3. **Use Clear Structure:**

   ```markdown
   # Good

   For user {{name}} with experience {{level}}:

   1. Generate a greeting
   2. Provide 3 relevant tips
   3. Suggest next steps

   # Poor

   Generate something for {{name}} based on {{level}}.
   ```

## Interaction with CommonMark

### Precedence

MarkdownFlow constructs have lower precedence than CommonMark constructs:

```markdown
`{{not_a_variable}}` → Code span (CommonMark wins)
**{{bold_and_variable}}** → Bold with variable inside
[{{link_text}}](url) → Link with variable text
```

### Block vs Inline

- Variables: Inline elements only
- User inputs: Block elements (own line)
- AI instructions: Block elements (paragraphs)

### HTML Interaction

MarkdownFlow elements work within HTML:

```html
<div class="{{class_name}}">
  <p>Hello {{user_name}}</p>
  ?[%{{choice}}Yes|No]
</div>
```

## Processing Model

### Phase 1: Parse

1. Parse as CommonMark
2. Identify MarkdownFlow constructs
3. Build syntax tree with MarkdownFlow nodes

### Phase 2: Process

1. Collect variable values
2. Render user inputs as UI elements
3. Process AI instructions with LLM

### Phase 3: Render

1. Replace variables with values
2. Display user input elements
3. Insert generated content

## Error Handling

### Undefined Variables

```markdown
Hello {{undefined_var}}!
→ Display as: "Hello {{undefined_var}}!" (literal)
→ Or display as: "Hello [undefined]!" (placeholder)
→ Or display as: "Hello !" (empty)
```

### Malformed Syntax

```markdown
{{incomplete → Treat as literal text
?[#missing_bracket → Treat as literal text
```

### Processing Errors

- LLM unavailable: Show fallback content
- Invalid options: Skip user input
- Circular references: Detect and break

## Version History

- **1.0.0** (2024): Initial specification
  - Variables with `{{...}}` syntax
  - User inputs with `?[...]` syntax
  - AI instructions as natural language

## Future Considerations

Potential future extensions:

- Computed variables: `{{user_age = current_year - birth_year}}`
- Conditional blocks: `@if(condition) ... @endif`
- Loops: `@foreach(item in items) ... @endfor`
- Functions: `{{uppercase(name)}}`
- Imports: `@import(template.md)`

## Conformance

A MarkdownFlow implementation is conformant if it:

1. Correctly parses all valid CommonMark
2. Recognizes variable syntax `{{...}}`
3. Recognizes user input syntax `?[...]`
4. Provides mechanism for AI instruction processing
5. Handles errors gracefully

## References

- [CommonMark Specification](https://spec.commonmark.org/)
- [MarkdownFlow Repository](https://github.com/ai-shifu/markdown-flow)
- [MarkdownFlow Playground](https://markdownflow.streamlit.app/)
