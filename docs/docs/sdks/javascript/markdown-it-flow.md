# markdown-it-flow

A markdown-it plugin that adds MarkdownFlow syntax support to any markdown-it powered application.

## Installation

```bash
npm install markdown-it markdown-it-flow
# or
yarn add markdown-it markdown-it-flow
# or
pnpm add markdown-it markdown-it-flow
```

## Quick Start

```javascript
const MarkdownIt = require("markdown-it");
const markdownItFlow = require("markdown-it-flow");

const md = new MarkdownIt();
md.use(markdownItFlow);

const html = md.render(`
# Hello {{user_name}}!

Choose your theme:
?[%{{theme}}Light|Dark|Auto]
`);
```

## Configuration

### Plugin Options

```javascript
const options = {
  variableClass: "flow-variable", // CSS class for variables
  inputClass: "flow-input", // CSS class for inputs
  instructionClass: "flow-instruction", // CSS class for AI instructions
  enableVariables: true, // Enable variable parsing
  enableInputs: true, // Enable user input parsing
  enableInstructions: true, // Enable AI instruction parsing
  variableRenderer: null, // Custom variable renderer
  inputRenderer: null, // Custom input renderer
  instructionRenderer: null, // Custom instruction renderer
};

md.use(markdownItFlow, options);
```

## Usage Examples

### Basic HTML Generation

```javascript
const md = new MarkdownIt().use(markdownItFlow);

const markdown = `
Welcome {{user_name}}!

What's your experience level?
?[%{{level}}Beginner|Intermediate|Advanced]

Generate content appropriate for {{level}} level.
`;

const html = md.render(markdown);
// Output: HTML with proper classes and data attributes
```

### Vue.js Integration

```vue
<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script>
import MarkdownIt from "markdown-it";
import markdownItFlow from "markdown-it-flow";

export default {
  data() {
    return {
      markdown: "# Hello {{name}}!",
      variables: { name: "Vue User" },
    };
  },
  computed: {
    renderedMarkdown() {
      const md = new MarkdownIt().use(markdownItFlow);
      let html = md.render(this.markdown);

      // Replace variables
      Object.entries(this.variables).forEach(([key, value]) => {
        html = html.replace(
          new RegExp(
            `<span class="flow-variable" data-var="${key}">.*?</span>`,
            "g",
          ),
          `<span class="flow-variable">${value}</span>`,
        );
      });

      return html;
    },
  },
};
</script>
```

### Angular Integration

```typescript
import { Component } from "@angular/core";
import MarkdownIt from "markdown-it";
import markdownItFlow from "markdown-it-flow";

@Component({
  selector: "app-markdown",
  template: '<div [innerHTML]="renderedHtml"></div>',
})
export class MarkdownComponent {
  private md = new MarkdownIt().use(markdownItFlow);

  markdown = "# Welcome {{user}}!";
  variables = { user: "Angular Developer" };

  get renderedHtml(): string {
    let html = this.md.render(this.markdown);

    // Process variables
    Object.entries(this.variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      html = html.replace(regex, value as string);
    });

    return html;
  }
}
```

### Vanilla JavaScript

```html
<!doctype html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it-flow/dist/markdown-it-flow.min.js"></script>
  </head>
  <body>
    <div id="content"></div>

    <script>
      const md = window.markdownit().use(window.markdownItFlow);

      const markdown = `
# Interactive Document

Hello {{user_name}}!

?[%{{choice}}Option A|Option B|Option C]
    `;

      const html = md.render(markdown);
      document.getElementById("content").innerHTML = html;

      // Add interactivity
      document.querySelectorAll(".flow-input").forEach((input) => {
        input.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON") {
            console.log("Selected:", e.target.textContent);
          }
        });
      });
    </script>
  </body>
</html>
```

## Custom Renderers

### Variable Renderer

```javascript
const options = {
  variableRenderer: (tokens, idx) => {
    const token = tokens[idx];
    const varName = token.content;

    return `<input
      type="text"
      placeholder="${varName}"
      data-variable="${varName}"
      class="variable-input"
    />`;
  },
};

md.use(markdownItFlow, options);
```

### Input Renderer

```javascript
const options = {
  inputRenderer: (tokens, idx) => {
    const token = tokens[idx];
    const { variable, options } = token.meta;

    // Render as radio buttons
    let html = `<div class="input-group" data-variable="${variable}">`;
    options.forEach((option, i) => {
      html += `
        <label>
          <input type="radio" name="${variable}" value="${option}" />
          ${option}
        </label>
      `;
    });
    html += "</div>";

    return html;
  },
};
```

### Instruction Renderer

```javascript
const options = {
  instructionRenderer: (tokens, idx) => {
    const token = tokens[idx];
    const instruction = token.content;

    return `
      <div class="ai-instruction" data-instruction="${escape(instruction)}">
        <i class="ai-icon"></i>
        <span>AI will process: ${instruction}</span>
      </div>
    `;
  },
};
```

## Advanced Features

### Token Processing

```javascript
// Access and modify tokens after parsing
const md = new MarkdownIt().use(markdownItFlow);

const tokens = md.parse(markdown);

// Find all variable tokens
const variableTokens = tokens.filter((token) => token.type === "flow_variable");

// Find all input tokens
const inputTokens = tokens.filter((token) => token.type === "flow_input");

// Render with modified tokens
const html = md.renderer.render(tokens, md.options);
```

### State Management

```javascript
class MarkdownFlowDocument {
  constructor() {
    this.md = new MarkdownIt().use(markdownItFlow);
    this.variables = {};
    this.template = "";
  }

  setTemplate(markdown) {
    this.template = markdown;
    this.extractVariables();
  }

  extractVariables() {
    const tokens = this.md.parse(this.template);
    tokens.forEach((token) => {
      if (token.type === "flow_variable") {
        this.variables[token.content] = null;
      }
    });
  }

  setVariable(name, value) {
    this.variables[name] = value;
  }

  render() {
    let html = this.md.render(this.template);

    // Replace variables with values
    Object.entries(this.variables).forEach(([key, value]) => {
      if (value !== null) {
        const pattern = new RegExp(
          `<span class="flow-variable" data-var="${key}">.*?</span>`,
          "g",
        );
        html = html.replace(
          pattern,
          `<span class="flow-variable">${value}</span>`,
        );
      }
    });

    return html;
  }
}
```

### Event Handling

```javascript
function attachFlowEventHandlers(container) {
  // Handle variable inputs
  container.querySelectorAll("[data-variable]").forEach((element) => {
    element.addEventListener("change", (e) => {
      const variable = e.target.dataset.variable;
      const value = e.target.value;
      console.log(`Variable ${variable} = ${value}`);
      // Update your state management here
    });
  });

  // Handle user selections
  container.querySelectorAll(".flow-input button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const variable = e.target.parentElement.dataset.variable;
      const value = e.target.textContent;
      console.log(`Selected ${variable} = ${value}`);
      // Process selection
    });
  });
}

// Usage
const html = md.render(markdown);
document.getElementById("content").innerHTML = html;
attachFlowEventHandlers(document.getElementById("content"));
```

## Styling

### Default CSS

```css
/* Variables */
.flow-variable {
  color: #0066cc;
  font-weight: bold;
  padding: 2px 4px;
  background: #e8f4f8;
  border-radius: 3px;
}

/* User Inputs */
.flow-input {
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.flow-input button {
  margin: 0.25rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.flow-input button:hover {
  background: #f0f0f0;
}

.flow-input button.selected {
  background: #0066cc;
  color: white;
}

/* AI Instructions */
.flow-instruction {
  border-left: 4px solid #4caf50;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #666;
}
```

## TypeScript Support

```typescript
import MarkdownIt from "markdown-it";
import markdownItFlow, { MarkdownItFlowOptions } from "markdown-it-flow";

const options: MarkdownItFlowOptions = {
  variableClass: "custom-variable",
  enableVariables: true,
  variableRenderer: (tokens, idx) => {
    return `<span class="var">${tokens[idx].content}</span>`;
  },
};

const md: MarkdownIt = new MarkdownIt();
md.use(markdownItFlow, options);

const html: string = md.render(markdown);
```

## API Reference

### Plugin Methods

```javascript
// Main plugin function
md.use(markdownItFlow, options);

// Access plugin state
const flowState = md.flow;

// Get parsed variables
const variables = flowState.getVariables();

// Get parsed inputs
const inputs = flowState.getInputs();

// Get parsed instructions
const instructions = flowState.getInstructions();
```

### Token Types

```javascript
// Variable token
{
  type: 'flow_variable',
  tag: 'span',
  content: 'variable_name',
  meta: {
    original: '{{variable_name}}'
  }
}

// Input token
{
  type: 'flow_input',
  tag: 'div',
  content: '',
  meta: {
    variable: 'choice',
    options: ['Option 1', 'Option 2', 'Option 3']
  }
}

// Instruction token
{
  type: 'flow_instruction',
  tag: 'div',
  content: 'AI instruction text',
  meta: {
    type: 'generate' // or 'transform', 'conditional'
  }
}
```

### Utility Functions

```javascript
import { utils } from "markdown-it-flow";

// Parse variables from text
const variables = utils.parseVariables(text);

// Parse user inputs from text
const inputs = utils.parseInputs(text);

// Validate MarkdownFlow syntax
const isValid = utils.validateSyntax(text);

// Interpolate variables
const result = utils.interpolate(template, variables);
```

## Testing

```javascript
import MarkdownIt from "markdown-it";
import markdownItFlow from "markdown-it-flow";

describe("markdown-it-flow", () => {
  let md;

  beforeEach(() => {
    md = new MarkdownIt().use(markdownItFlow);
  });

  test("parses variables", () => {
    const html = md.render("Hello {{name}}!");
    expect(html).toContain('class="flow-variable"');
    expect(html).toContain('data-var="name"');
  });

  test("parses user inputs", () => {
    const html = md.render("?[%{{choice}}Yes|No]");
    expect(html).toContain('class="flow-input"');
    expect(html).toContain('data-variable="choice"');
  });

  test("custom renderer", () => {
    md = new MarkdownIt().use(markdownItFlow, {
      variableRenderer: () => "<custom-var></custom-var>",
    });

    const html = md.render("{{test}}");
    expect(html).toContain("<custom-var></custom-var>");
  });
});
```

## Performance

### Caching

```javascript
class CachedMarkdownRenderer {
  constructor() {
    this.md = new MarkdownIt().use(markdownItFlow);
    this.cache = new Map();
  }

  render(markdown, variables = {}) {
    const cacheKey = `${markdown}:${JSON.stringify(variables)}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let html = this.md.render(markdown);

    // Apply variables
    Object.entries(variables).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
    });

    this.cache.set(cacheKey, html);
    return html;
  }

  clearCache() {
    this.cache.clear();
  }
}
```

### Streaming

```javascript
// Process large documents in chunks
function* renderInChunks(markdown, chunkSize = 1000) {
  const lines = markdown.split("\n");
  const md = new MarkdownIt().use(markdownItFlow);

  for (let i = 0; i < lines.length; i += chunkSize) {
    const chunk = lines.slice(i, i + chunkSize).join("\n");
    yield md.render(chunk);
  }
}

// Usage
for (const htmlChunk of renderInChunks(largeMarkdown)) {
  // Process each chunk
  document.getElementById("content").innerHTML += htmlChunk;
}
```

## Migration

### From Standard markdown-it

```javascript
// Before
const md = new MarkdownIt();
const html = md.render(markdown);

// After
const md = new MarkdownIt().use(markdownItFlow);
const html = md.render(markdown);
// Now supports MarkdownFlow syntax
```

### With Other Plugins

```javascript
import MarkdownIt from "markdown-it";
import markdownItFlow from "markdown-it-flow";
import markdownItEmoji from "markdown-it-emoji";
import markdownItAnchor from "markdown-it-anchor";

const md = new MarkdownIt()
  .use(markdownItEmoji)
  .use(markdownItAnchor)
  .use(markdownItFlow); // Add MarkdownFlow support

// All plugins work together
const html = md.render(markdown);
```

## Links

- [GitHub Repository](https://github.com/ai-shifu/markdown-it-flow)
- [NPM Package](https://www.npmjs.com/package/markdown-it-flow)
- [markdown-it Documentation](https://github.com/markdown-it/markdown-it)
- [Issue Tracker](https://github.com/ai-shifu/markdown-it-flow/issues)
