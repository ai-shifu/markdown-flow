# How It Works

MarkdownFlow transforms source documents into personalized, interactive pages through a sophisticated processing pipeline. Understanding this workflow helps you write more effective MarkdownFlow documents.

## Writing for AI, Not Humans

!!! tip "Core Principle"
The content you write is not directly for readers — it's prompts for AI.

This paradigm shift is crucial for creating effective MarkdownFlow documents.

### A Simple Example

Consider these two approaches to the same content:

**Traditional (Writing for Humans):**

```markdown
Python is a high-level, interpreted programming language known for its simplicity and readability.
```

**MarkdownFlow (Writing for AI):**

```markdown
Explain Python to a {{level}} programmer who is interested in {{use_case}}, emphasizing aspects most relevant to their background.
```

The MarkdownFlow version doesn't tell readers about Python directly. Instead, it instructs the AI how to generate personalized explanations. A beginner interested in web development might receive:

> Python is like writing instructions in plain English—perfect for building your first website with frameworks like Django.

While an advanced programmer interested in data science might get:

> Python's extensive scientific computing ecosystem with NumPy and Pandas makes it the de facto standard for data analysis and machine learning.

This is the essence of MarkdownFlow: **write prompts that guide AI to create content**, rather than writing the content itself.

## Document Structure

A MarkdownFlow source document consists of two main parts:

### 1. Content Source

The main body of your document. All the content will be rendered by the MarkdownFlow agent.

### 2. Document Prompt

Instructions that guide how the content source should be rendered by the MarkdownFlow agent. Readers can not see anything in this section.

This section is optional but highly recommended for better results:

```markdown
Language: Adapt to {{browser_language}}
Tone: Professional but friendly
Style: Clear and concise
Personalization: Adjust complexity based on {{level}}
```

## Processing Workflow

Here's how MarkdownFlow transforms your source into the final output:

### Step 1: Parsing

The MarkdownFlow Agent receives the source document and:

1. **Identifies standard Markdown** - Headers, lists, links, etc.
2. **Extracts MarkdownFlow syntax** - Variables, interactions, preserved content
3. **Separates document prompt** - Processing instructions for the LLM

**Example:**

```markdown
Input: "Hello {{name}}, welcome!"
Parsed:

- Text: "Hello "
- Variable: "name"
- Text: ", welcome!"
```

### Step 2: Variable Resolution

The agent resolves variables from multiple sources:

- **User inputs** - Collected through interactive elements
- **System variables** - Pre-defined by the platform
- **Context variables** - From the current session

**Example:**

```markdown
Before: "Welcome {{user_name}} from {{country}}"
After: "Welcome Alice from Canada"
```

### Step 3: LLM Processing

The resolved content and document prompt are sent to the Large Language Model:

1. **Content interpretation** - Understanding the document's intent
2. **Personalization** - Adapting content to user context
3. **Generation** - Creating tailored content while respecting preserved sections

**Example:**

```markdown
Source: "Explain recursion for {{level}} programmers"
LLM Input: "Explain recursion for beginner programmers"
LLM Output: "Recursion is when a function calls itself. Think of it like Russian dolls..."
```

### Step 4: Interface Element Generation

Interactive elements are transformed into UI components:

```markdown
Source: ?[%{{choice}} Yes | No | Maybe]
Output: Three clickable buttons that store the selection
```

### Step 5: Rendering

The MarkdownFlow Renderer converts the processed content into the final page:

1. **Markdown rendering** - Standard Markdown to HTML conversion
2. **Component injection** - Interactive elements become UI widgets
3. **Style application** - Applying themes and formatting
4. **Event binding** - Connecting user interactions to variables

## A Complete Example

Let's trace a document through the entire pipeline:

**Source Document:**

```markdown
# Learning Path

What would you like to learn?
?[%{{topic}} Python | JavaScript | Go]

## Getting Started with {{topic}}

===Remember: Practice makes perfect!===

---

Document Prompt:
Create beginner-friendly content
Use simple language
Include practical examples
```

**Processing Steps:**

1. **Parse**: Identify heading, interaction, variable, preserved text
2. **Wait for input**: Display buttons, user selects "Python"
3. **Resolve**: Replace `{{topic}}` with "Python"
4. **LLM Process**: Generate personalized Python tutorial
5. **Preserve**: Keep "Remember: Practice makes perfect!" unchanged
6. **Render**: Create interactive HTML page

**Final Output:**

```html
<h1>Learning Path</h1>
<div class="interaction-complete">✓ Python selected</div>
<h2>Getting Started with Python</h2>
<p>
  Python is perfect for beginners! Let's start with a simple "Hello World"...
</p>
<p><strong>Remember: Practice makes perfect!</strong></p>
```

## Key Concepts

### Real-time Processing

MarkdownFlow processes content dynamically:

- Variables are resolved at runtime
- Content adapts to user choices instantly
- Each reader gets a unique experience

### Context Awareness

The system maintains context throughout the session:

- Previous selections influence later content
- Variables persist across sections
- User journey is tracked and utilized

### Intelligent Adaptation

The LLM doesn't just substitute variables—it:

- Adjusts tone and complexity
- Generates relevant examples
- Maintains narrative coherence
- Respects formatting requirements

## Platform Integration

Different platforms provide different capabilities:

### MarkdownFlow Playground

- Browser-based processing
- Access to `{{browser_language}}`
- Real-time preview

### AI-Shifu Platform

- Extended system variables
- User profiles: `{{sys_user_nickname}}`, `{{sys_user_background}}`
- Advanced personalization

### Custom Implementations

- Define your own system variables
- Integrate with databases
- Custom rendering pipelines

## Summary

MarkdownFlow's power comes from this sophisticated pipeline that:

1. **Preserves** all standard Markdown functionality
2. **Enhances** with dynamic, personalized content
3. **Adapts** to each reader's context
4. **Delivers** unique experiences from a single source

The beauty is that as an author, you don't need to manage this complexity—you just write MarkdownFlow, and the system handles the rest.
