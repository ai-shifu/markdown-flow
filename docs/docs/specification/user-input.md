# User Input Specification

## Syntax Definition

```bnf
user_input ::= '?[' marker variable options ']'
marker ::= '#' | '$'
variable ::= '{{' identifier '}}'
options ::= option ('|' option)*
option ::= [^|]*
identifier ::= [a-zA-Z_][a-zA-Z0-9_]*
```

## Formal Rules

### Rule 1: Structure

User input MUST follow this exact structure:

1. Opening delimiter: `?[`
2. Selection marker: `#` (single) or `$` (multiple)
3. Variable in standard format: `{{name}}`
4. One or more options separated by `|`
5. Closing delimiter: `]`

```markdown
?[%{{choice}}Yes|No] ✓ Valid single selection
?[%{{choices}}A|B|C] ✓ Valid multiple selection
?[{{choice}}Yes|No] ✗ Missing marker
?[#Yes|No] ✗ Missing variable
```

### Rule 2: Selection Markers

Two markers define selection behavior:

| Marker | Type     | Behavior             | UI Element    |
| ------ | -------- | -------------------- | ------------- |
| `#`    | Single   | One choice only      | Radio buttons |
| `$`    | Multiple | Zero or more choices | Checkboxes    |

```markdown
# Single selection (radio button behavior)

?[%{{color}}Red|Green|Blue]

# User can select: Red OR Green OR Blue

# Multiple selection (checkbox behavior)

?[%{{colors}}Red|Green|Blue]

# User can select: None, any, or all
```

### Rule 3: Variable Binding

The variable receives the selected value(s):

```markdown
# Single selection

?[%{{choice}}Yes|No]

# If "Yes" selected: choice = "Yes"

# Multiple selection

?[%{{choices}}A|B|C]

# If A and C selected: choices = ["A", "C"]

# If none selected: choices = []
```

### Rule 4: Option Format

Options are separated by pipe `|` character:

```markdown
# Basic options

?[%{{size}}Small|Medium|Large]

# Options with spaces

?[%{{meal}}Breakfast and Coffee|Lunch Special|Dinner Deluxe]

# Options with special characters

?[%{{plan}}Basic ($9)|Pro ($19)|Enterprise ($99)]

# Empty options are preserved

?[%{{answer}}Yes||No] → Three options: "Yes", "", "No"
```

### Rule 5: Block Element

User input is a BLOCK element and should appear on its own line:

```markdown
# Correct

This is a paragraph.

?[%{{choice}}Yes|No]

This is another paragraph.

# Incorrect (inline usage not supported)

Choose: ?[%{{choice}}Yes|No] now.
```

## Parsing Algorithm

```python
def parse_user_input(line):
    # Check if line matches user input pattern
    pattern = r'^\?\[([$#])\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}([^\]]+)\]$'
    match = re.match(pattern, line.strip())

    if not match:
        return None

    marker = match.group(1)
    variable = match.group(2)
    options_str = match.group(3)

    # Parse options
    options = parse_options(options_str)

    return {
        'type': 'user_input',
        'marker': marker,
        'selection_type': 'single' if marker == '#' else 'multiple',
        'variable': variable,
        'options': options
    }

def parse_options(options_str):
    # Split by pipe, preserving escaped pipes
    options = []
    current = ""
    i = 0

    while i < len(options_str):
        if i > 0 and options_str[i] == '|' and options_str[i-1] != '\\':
            options.append(current)
            current = ""
        else:
            if options_str[i] == '\\' and i+1 < len(options_str) and options_str[i+1] == '|':
                current += '|'
                i += 1
            else:
                current += options_str[i]
        i += 1

    if current or options_str.endswith('|'):
        options.append(current)

    return options
```

## Edge Cases

### Escaping Pipes in Options

Use backslash to include literal pipes:

```markdown
?[%{{choice}}Option A\|with pipe|Option B]
→ Two options: "Option A|with pipe", "Option B"
```

### Empty Options

Empty options are valid:

```markdown
?[%{{choice}}Yes||Maybe|No]
→ Four options: "Yes", "", "Maybe", "No"

?[%{{choice}}|Leading empty|Trailing empty|]
→ Four options: "", "Leading empty", "Trailing empty", ""
```

### Special Characters in Options

```markdown
# Options with markdown

?[%{{format}}**Bold**|*Italic*|`Code`]

# Options with HTML

?[%{{style}}<b>Bold</b>|<i>Italic</i>|<u>Underline</u>]

# Options with brackets

?[%{{math}}[0, 1]|{x: x > 0}|(a, b)]
```

### Long Options

```markdown
?[%{{choice}}
This is a very long option that contains a lot of text|
Another long option with detailed description|
Short
]
```

### Invalid Nesting

User inputs cannot be nested:

```markdown
# Invalid - nesting not supported

?[%{{outer}}?[%{{inner}}A|B]|C]

# Invalid - variable within option

?[%{{choice}}Select {{nested}}|Other]
```

## Rendering Guidelines

### Single Selection (Radio Buttons)

```html
<!-- HTML Rendering -->
<div class="markdown-flow-input" data-variable="choice">
  <label> <input type="radio" name="choice" value="Yes" /> Yes </label>
  <label> <input type="radio" name="choice" value="No" /> No </label>
</div>
```

### Multiple Selection (Checkboxes)

```html
<!-- HTML Rendering -->
<div class="markdown-flow-input" data-variable="choices">
  <label> <input type="checkbox" name="choices" value="A" /> A </label>
  <label> <input type="checkbox" name="choices" value="B" /> B </label>
  <label> <input type="checkbox" name="choices" value="C" /> C </label>
</div>
```

### Button Style

```html
<!-- Alternative Button Rendering -->
<div class="markdown-flow-input" data-variable="choice">
  <button data-value="Yes">Yes</button>
  <button data-value="No">No</button>
</div>
```

### Dropdown Style

```html
<!-- Dropdown Rendering -->
<select name="choice" class="markdown-flow-input">
  <option value="">Choose...</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>
```

## State Management

### Initial State

```javascript
// Single selection
{
  choice: null; // or undefined
}

// Multiple selection
{
  choices: []; // empty array
}
```

### After Selection

```javascript
// Single selection
{
  choice: "Yes"; // selected value
}

// Multiple selection
{
  choices: ["A", "C"]; // array of selected values
}
```

### Validation

```javascript
// Required validation
if (marker === "#" && !variable_value) {
  throw new Error(`Selection required for ${variable_name}`);
}

// Multiple selection limits
if (marker === "$" && variable_value.length > max_selections) {
  throw new Error(`Too many selections for ${variable_name}`);
}
```

## Examples

### Basic Examples

```markdown
# Yes/No Question

Do you agree to the terms?
?[%{{agreement}}Yes|No]

# Multiple Choice

Select your interests:
?[%{{interests}}Sports|Music|Reading|Travel|Cooking]

# Experience Level

What's your experience?
?[%{{level}}Beginner|Intermediate|Advanced|Expert]
```

### Complex Examples

```markdown
# Pricing Plans

Choose your subscription:
?[%{{plan}}
Free - Basic features|
Pro ($9/mo) - Advanced features|
Team ($29/mo) - All features + collaboration
]

# Time Slots

Select available times:
?[%{{availability}}
Morning (9AM-12PM)|
Afternoon (12PM-5PM)|
Evening (5PM-9PM)|
Night (9PM-12AM)
]

# With Descriptions

Programming languages you know:
?[%{{languages}}
Python - Great for beginners and data science|
JavaScript - Essential for web development|
Java - Enterprise and Android development|
Go - Modern systems programming|
Rust - Memory-safe systems programming
]
```

### Form Pattern

```markdown
## Registration Form

### Account Type

?[%{{account_type}}Personal|Business|Enterprise]

### Features Needed

?[%{{features}}
Cloud Storage|
API Access|
Priority Support|
Custom Domain|
Team Management
]

### Billing Cycle

?[%{{billing}}Monthly|Annual (save 20%)]

### Agreement

?[%{{terms}}I agree to the terms and conditions|I do not agree]
```

## Accessibility

### ARIA Labels

```html
<div role="radiogroup" aria-labelledby="question-1">
  <p id="question-1">Choose your preference:</p>
  <label>
    <input type="radio" name="pref" value="A" aria-label="Option A" />
    Option A
  </label>
</div>
```

### Keyboard Navigation

- Tab: Move between input groups
- Arrow keys: Navigate within radio group
- Space: Select/deselect option
- Enter: Submit form (if applicable)

## Implementation Notes

### Event Handling

```javascript
// Listen for changes
element.addEventListener("change", (e) => {
  const variable = e.target.name;
  const value = e.target.value;

  if (e.target.type === "radio") {
    updateVariable(variable, value);
  } else if (e.target.type === "checkbox") {
    const values = Array.from(
      document.querySelectorAll(`input[name="${variable}"]:checked`),
    ).map((input) => input.value);
    updateVariable(variable, values);
  }
});
```

### Persistence

```javascript
// Save selections
localStorage.setItem(`mf_${variable}`, JSON.stringify(value));

// Restore selections
const saved = localStorage.getItem(`mf_${variable}`);
if (saved) {
  const value = JSON.parse(saved);
  restoreSelection(variable, value);
}
```

## Conformance Testing

A conformant implementation MUST:

1. Parse valid user input syntax
2. Distinguish single vs multiple selection
3. Extract variable name correctly
4. Parse all options including empty ones
5. Handle escaped pipes in options
6. Render appropriate UI elements
7. Update variables on selection
