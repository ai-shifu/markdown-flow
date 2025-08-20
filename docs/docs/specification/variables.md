# Variables Specification

## Syntax Definition

```bnf
variable ::= '{{' ws* variable_name ws* '}}'
variable_name ::= identifier
identifier ::= [a-zA-Z_][a-zA-Z0-9_]*
ws ::= [ \t\n\r]
```

## Formal Rules

### Rule 1: Delimiter Matching

Variables MUST use exactly two opening braces `{{` and two closing braces `}}`.

```markdown
{{valid}} ✓ Correct
{invalid} ✗ Single braces
{{{invalid}}} ✗ Triple braces
```

### Rule 2: Variable Names

Variable names MUST:

- Start with a letter (a-z, A-Z) or underscore (\_)
- Contain only letters, numbers, and underscores
- Be case-sensitive

```markdown
{{userName}} ✓ Valid camelCase
{{user_name}} ✓ Valid snake_case
{{UserName}} ✓ Valid PascalCase
{{_private}} ✓ Valid with underscore prefix
{{user123}} ✓ Valid with numbers

{{123user}} ✗ Invalid - starts with number
{{user-name}} ✗ Invalid - contains hyphen
{{user.name}} ✗ Invalid - contains period
{{user name}} ✗ Invalid - contains space
```

### Rule 3: Whitespace Handling

Whitespace inside delimiters is NOT significant:

```markdown
{{name}} → variable: "name"
{{ name }} → variable: "name"
{{  name  }} → variable: "name"
{{
  name
}} → variable: "name"
```

### Rule 4: Context Independence

Variables can appear in any context:

```markdown
# In text

Hello {{name}}!

# In headers

## Chapter {{chapter_number}}: {{chapter_title}}

# In lists

- Item {{item_1}}
- Item {{item_2}}

# In links

[Click here]({{url}})
[{{link_text}}](https://example.com)

# In images

![{{alt_text}}]({{image_url}})

# In code spans

The variable `{{varName}}` is used here

# In HTML

<div class="{{className}}" id="{{elementId}}">
  {{content}}
</div>
```

### Rule 5: Escaping

To display literal braces, use backslash escaping:

```markdown
\{\{literal\}\} → {{literal}} (displayed as text)
\\{{variable}} → \[value] (backslash then variable)
```

## Parsing Algorithm

```python
def parse_variables(text):
    variables = []
    i = 0
    while i < len(text):
        # Look for opening delimiter
        if text[i:i+2] == '{{':
            # Skip if escaped
            if i > 0 and text[i-1] == '\\':
                i += 2
                continue

            # Find closing delimiter
            j = i + 2
            brace_count = 0
            while j < len(text):
                if text[j:j+2] == '}}':
                    if brace_count == 0:
                        # Extract variable name
                        var_name = text[i+2:j].strip()
                        if is_valid_identifier(var_name):
                            variables.append({
                                'name': var_name,
                                'start': i,
                                'end': j+2
                            })
                        i = j + 2
                        break
                j += 1
            else:
                i += 1
        else:
            i += 1
    return variables

def is_valid_identifier(name):
    import re
    return bool(re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', name))
```

## Edge Cases

### Empty Variables

```markdown
{{}} → Invalid (empty variable name)
{{ }} → Invalid (whitespace is not a valid name)
```

### Nested Braces

```markdown
{{user_{{type}}}} → Invalid (nesting not supported)
{{user_{type}}} → Invalid (single braces inside)
```

### Adjacent Variables

```markdown
{{first}}{{last}} → Two separate variables
{{first}} {{last}} → Two variables with space
{{first}}-{{last}} → Two variables with hyphen
```

### Variables in Code Blocks

Variables in fenced code blocks are NOT processed:

````markdown
```python
# This is literal text, not a variable
print("{{not_a_variable}}")
```
````

But inline code respects variables:

```markdown
The code `print({{variable}})` uses a variable
```

### Unicode in Variable Names

Currently, variable names are restricted to ASCII characters:

```markdown
{{user_name}} ✓ Valid
{{用户名}} ✗ Invalid (non-ASCII)
{{naïve}} ✗ Invalid (non-ASCII)
```

## Replacement Rules

### Rule 1: Value Types

Variables can be replaced with:

- Strings
- Numbers (converted to strings)
- Booleans (converted to "true"/"false")
- null/undefined (handled per implementation)

### Rule 2: Missing Variables

When a variable has no value:

```markdown
Hello {{undefined}}!

Option 1: Keep literal → "Hello {{undefined}}!"
Option 2: Empty string → "Hello !"
Option 3: Placeholder → "Hello [undefined]!"
Option 4: Error → Throw exception
```

Implementation should document chosen behavior.

### Rule 3: HTML Escaping

In HTML context, values should be escaped:

```markdown
{{user_input}}

If user_input = "<script>alert('xss')</script>"
Should render as: "&lt;script&gt;alert('xss')&lt;/script&gt;"
```

## Examples

### Basic Usage

```markdown
# Input

Dear {{recipient_name}},

Your order #{{order_number}} has been {{order_status}}.

Best regards,
{{sender_name}}

# With values

recipient_name = "Alice"
order_number = "12345"
order_status = "shipped"
sender_name = "Bob"

# Output

Dear Alice,

Your order #12345 has been shipped.

Best regards,
Bob
```

### Complex Document

```markdown
# {{company_name}} Annual Report {{year}}

## Financial Summary

Revenue: ${{revenue}}
Profit: ${{profit}}
Growth: {{growth_percentage}}%

## Message from {{ceo_title}}

Dear {{shareholder_type}} Shareholders,

This year, {{company_name}} achieved {{performance_summary}}.

{{ceo_signature}}
{{ceo_name}}
{{ceo_title}}
```

### Template Patterns

Common variable naming patterns:

```markdown
# User data

{{user_name}}, {{user_email}}, {{user_id}}

# Dates and times

{{current_date}}, {{timestamp}}, {{year}}

# Content

{{title}}, {{description}}, {{content}}

# Metadata

{{version}}, {{author}}, {{status}}

# Computed values

{{total_price}}, {{item_count}}, {{percentage}}
```

## Implementation Notes

### Performance Considerations

- Pre-compile variable locations for repeated processing
- Cache parsed variable positions
- Use efficient string replacement algorithms

### Security Considerations

- Always escape variables in HTML context
- Validate variable values before replacement
- Limit variable name length to prevent DoS
- Sanitize user-provided variable values

### Internationalization

- Variable names should remain in ASCII
- Variable values can contain any Unicode
- Consider RTL languages in replacement

## Conformance Testing

A conformant implementation MUST:

1. Parse all valid variable syntax correctly
2. Reject invalid variable names
3. Handle escaping properly
4. Preserve non-variable text exactly
5. Support variables in all contexts

Test suite available at: [github.com/ai-shifu/markdown-flow-tests](https://github.com/ai-shifu/markdown-flow)
