# How MarkdownFlow Works

Understanding the MarkdownFlow processing pipeline helps you create more effective dynamic documents.

## Processing Pipeline

```
Template → Parser → Processor → AI Engine → Output
```

### 1. Template Creation
Authors write MarkdownFlow templates using standard Markdown with three extensions:
- Variables `{{name}}`
- User inputs `?[...]`
- AI instructions (natural language)

### 2. Parsing Phase
The parser:
- Identifies variables and their positions
- Extracts user input definitions
- Separates AI instructions from visible content
- Validates syntax

### 3. Processing Phase
The processor:
- Collects variable values from context
- Renders user input UI elements
- Waits for user interactions
- Assembles the complete context

### 4. AI Engine
When AI instructions are present:
- Combines template, variables, and user choices
- Sends context to the LLM
- Receives generated content
- Integrates response into final document

### 5. Output Generation
The final document:
- Has all variables replaced
- Shows personalized content
- Maintains Markdown formatting
- Can be rendered as HTML, PDF, etc.

## Execution Flow

### Simple Variable Replacement

```markdown
Input:  Hello {{name}}, today is {{date}}!
Context: {name: "Alice", date: "2024-01-15"}
Output: Hello Alice, today is 2024-01-15!
```

No AI involved - just direct substitution.

### User Input Collection

```markdown
Template:
?[#{{choice}}Yes|No]

Renders as:
○ Yes
○ No

User selects: Yes
Variable set: {choice: "Yes"}
```

Interactive elements collect user data.

### AI-Powered Generation

```markdown
Template:
Generate a greeting for {{name}} who likes {{hobby}}.

Context: {name: "Bob", hobby: "photography"}

AI Prompt:
"Generate a greeting for Bob who likes photography."

Output:
"Hey Bob! Hope you're capturing some amazing moments 
with your camera today! The light this morning would 
be perfect for some outdoor photography."
```

## Processing Modes

### 1. Static Mode
- Only variable replacement
- No AI calls needed
- Instant processing
- Zero cost

```markdown
Your account {{account_id}} expires on {{expiry_date}}.
```

### 2. Interactive Mode
- User inputs required
- Collects choices before processing
- May trigger conditional content

```markdown
Select your plan:
?[#{{plan}}Basic|Pro|Enterprise]

You selected the {{plan}} plan.
```

### 3. Generative Mode
- AI processes instructions
- Creates dynamic content
- Personalized responses

```markdown
Write a {{tone}} product description for {{product}}.
Consider the target audience: {{audience}}.
```

### 4. Hybrid Mode
Combines all three:

```markdown
Hi {{user_name}}!

What would you like to learn?
?[#{{topic}}Python|JavaScript|SQL]

<!-- AI: Create a beginner-friendly introduction to {{topic}} -->
```

## Implementation Architecture

### Frontend Components

```javascript
// Parse template
const template = parseMarkdownFlow(source);

// Extract variables
const variables = template.getVariables();
// → ["user_name", "topic"]

// Render inputs
const inputs = template.getUserInputs();
// → [{type: "single", variable: "topic", options: [...]}]

// Process with context
const output = await template.process(context);
```

### Backend Processing

```python
# Python Agent Example
agent = FlowAgent(llm_provider="openai")

# Process template with variables
result = await agent.process(
    template=template_content,
    variables={"name": "Alice", "level": "beginner"}
)

# Stream processing for long content
async for chunk in agent.stream_process(template, variables):
    print(chunk.content, end="")
```

## Variable Scoping

### Global Variables
Available throughout the document:

```markdown
Welcome {{user_name}}!
...
Thank you for reading, {{user_name}}!
```

### Local Context
Variables can be overridden in AI instructions:

```markdown
{{tone}} = "formal"

Generate a {{tone}} introduction.

Now make it casual:
{{tone}} = "casual"
Generate a {{tone}} introduction.
```

## Conditional Logic

While MarkdownFlow doesn't have explicit if/else syntax, AI instructions handle conditions:

```markdown
Based on {{level}}:
- If "beginner": Cover basics only
- If "intermediate": Include advanced topics
- If "expert": Focus on optimization
```

## Performance Considerations

### Caching
- Variable substitutions are cached
- AI responses can be cached by input hash
- User selections are stored in session

### Optimization Tips
1. **Minimize AI calls** - Use static content where possible
2. **Batch processing** - Process multiple templates together
3. **Stream responses** - For better UX with long content
4. **Preprocess templates** - Validate and parse once

## Security

### Variable Sanitization
All variables are escaped by default:

```markdown
Input: {{user_input}}
Value: <script>alert('xss')</script>
Output: &lt;script&gt;alert('xss')&lt;/script&gt;
```

### AI Instruction Isolation
AI instructions are never shown to end users:

```markdown
<!-- This is visible in source -->

Generate content here (this is sent to AI)

<!-- Output appears here, instructions are removed -->
```

## Error Handling

### Missing Variables
```markdown
Template: Hello {{name}}!
Context: {} (empty)
Output: Hello {{name}}! (or error, depending on config)
```

### Invalid Syntax
```markdown
?[{{choice}}Yes|No]  ← Missing marker
Error: Invalid user input syntax
```

### AI Failures
```markdown
Fallback content is shown when AI is unavailable.
Configure retry logic and timeouts in SDK.
```

## Next Steps

Now that you understand how MarkdownFlow works:

- [Quick Start Guide](quickstart.md) - Build your first document
- [Installation](installation.md) - Set up in your project
- [Browse Examples](/examples/) - See real-world usage