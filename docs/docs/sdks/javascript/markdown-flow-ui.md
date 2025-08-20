# markdown-flow-ui

Complete React UI components for MarkdownFlow with built-in functionality and beautiful styling.

## Installation

```bash
npm install markdown-flow-ui
# or
yarn add markdown-flow-ui
# or
pnpm add markdown-flow-ui
```

## Quick Start

```jsx
import { MarkdownFlow } from "markdown-flow-ui";
import "markdown-flow-ui/dist/styles.css";

function App() {
  const template = `
# Welcome {{user_name}}!

What would you like to learn today?
?[%{{choice}}React|Vue|Angular]
  `;

  return (
    <MarkdownFlow
      template={template}
      variables={{ user_name: "Alice" }}
      onVariableChange={(vars) => console.log("Variables:", vars)}
      apiEndpoint="https://your-api.com/process"
    />
  );
}
```

## Components

### `<MarkdownFlow />`

The main component that renders MarkdownFlow templates.

#### Props

| Prop               | Type                          | Default  | Description                            |
| ------------------ | ----------------------------- | -------- | -------------------------------------- |
| `template`         | `string`                      | Required | MarkdownFlow template string           |
| `variables`        | `object`                      | `{}`     | Initial variables                      |
| `apiEndpoint`      | `string`                      | -        | Backend API endpoint for AI processing |
| `onVariableChange` | `function`                    | -        | Callback when variables change         |
| `onUserInput`      | `function`                    | -        | Callback when user makes a selection   |
| `theme`            | `'light' \| 'dark' \| 'auto'` | `'auto'` | Color theme                            |
| `className`        | `string`                      | -        | Additional CSS classes                 |
| `style`            | `object`                      | -        | Inline styles                          |

#### Example with All Props

```jsx
<MarkdownFlow
  template={markdownTemplate}
  variables={{
    user_name: "Bob",
    skill_level: "intermediate",
  }}
  apiEndpoint="https://api.example.com/markdownflow"
  onVariableChange={(variables) => {
    console.log("Updated variables:", variables);
  }}
  onUserInput={(inputData) => {
    console.log("User selected:", inputData);
  }}
  theme="dark"
  className="my-custom-class"
  style={{ maxWidth: "800px", margin: "0 auto" }}
/>
```

### `<MarkdownFlowProvider />`

Context provider for managing MarkdownFlow state across components.

```jsx
import { MarkdownFlowProvider, useMarkdownFlow } from "markdown-flow-ui";

function App() {
  return (
    <MarkdownFlowProvider>
      <YourComponents />
    </MarkdownFlowProvider>
  );
}

function YourComponent() {
  const { variables, setVariable, processTemplate } = useMarkdownFlow();

  // Use the context methods
}
```

### `<UserInput />`

Standalone component for rendering user input elements.

```jsx
import { UserInput } from "markdown-flow-ui";

<UserInput
  variable="choice"
  options={["Option 1", "Option 2", "Option 3"]}
  onSelect={(value) => console.log("Selected:", value)}
  style="buttons" // or 'dropdown', 'radio'
/>;
```

## Hooks

### `useMarkdownFlow()`

Access MarkdownFlow context and state.

```jsx
const {
  variables,
  setVariable,
  template,
  setTemplate,
  processTemplate,
  isProcessing,
  error,
} = useMarkdownFlow();
```

### `useVariable(name, defaultValue)`

Manage a single variable.

```jsx
const [value, setValue] = useVariable("user_name", "Guest");
```

### `useAIProcess()`

Handle AI processing.

```jsx
const { process, isLoading, result, error } = useAIProcess({
  endpoint: "https://api.example.com/process",
});

// Usage
await process(template, variables);
```

## Styling

### Default Themes

Import the default stylesheet:

```jsx
import "markdown-flow-ui/dist/styles.css";
```

### Custom Themes

Override CSS variables for custom theming:

```css
:root {
  --mf-primary-color: #0066cc;
  --mf-background: #ffffff;
  --mf-text-color: #333333;
  --mf-border-color: #e0e0e0;
  --mf-input-background: #f5f5f5;
  --mf-input-hover: #eeeeee;
  --mf-input-selected: #0066cc;
  --mf-code-background: #2d3748;
  --mf-code-color: #e2e8f0;
}

[data-theme="dark"] {
  --mf-background: #1a1a1a;
  --mf-text-color: #ffffff;
  /* ... other dark theme variables */
}
```

### Component-Specific Styling

```jsx
<MarkdownFlow
  classNames={{
    container: "custom-container",
    content: "custom-content",
    userInput: "custom-input",
    variable: "custom-variable",
  }}
/>
```

## Advanced Usage

### Server-Side Rendering (SSR)

```jsx
// pages/index.js (Next.js example)
import dynamic from "next/dynamic";

const MarkdownFlow = dynamic(
  () => import("markdown-flow-ui").then((mod) => mod.MarkdownFlow),
  { ssr: false },
);

export default function Page() {
  return <MarkdownFlow template={template} />;
}
```

### Custom Renderers

Override default rendering for specific elements:

```jsx
<MarkdownFlow
  template={template}
  renderers={{
    variable: ({ name, value }) => (
      <span className="custom-variable">{value || name}</span>
    ),
    userInput: ({ variable, options, onSelect }) => (
      <CustomSelect options={options} onChange={(value) => onSelect(value)} />
    ),
    code: ({ language, value }) => (
      <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
    ),
  }}
/>
```

### AI Processing Integration

```jsx
function App() {
  const [variables, setVariables] = useState({});

  const handleProcess = async (template, vars) => {
    const response = await fetch("https://api.example.com/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template, variables: vars }),
    });

    const result = await response.json();
    return result.content;
  };

  return (
    <MarkdownFlow
      template={template}
      variables={variables}
      onVariableChange={setVariables}
      processFunction={handleProcess}
    />
  );
}
```

### Real-time Collaboration

```jsx
import { MarkdownFlow } from "markdown-flow-ui";
import { useWebSocket } from "your-websocket-lib";

function CollaborativeDoc() {
  const { variables, sendUpdate } = useWebSocket("wss://collab.example.com");

  return (
    <MarkdownFlow
      template={template}
      variables={variables}
      onVariableChange={(vars) => {
        sendUpdate({ type: "variables", data: vars });
      }}
    />
  );
}
```

## API Reference

### MarkdownFlow Class Methods

```javascript
import { MarkdownFlowProcessor } from "markdown-flow-ui";

const processor = new MarkdownFlowProcessor();

// Parse template
const parsed = processor.parse(template);

// Process with variables
const result = processor.process(template, variables);

// Validate template
const errors = processor.validate(template);
```

### Utility Functions

```javascript
import {
  parseVariables,
  parseUserInputs,
  interpolateVariables,
  validateTemplate,
} from "markdown-flow-ui/utils";

// Extract variables from template
const variables = parseVariables(template);
// Returns: ['user_name', 'skill_level', ...]

// Extract user inputs
const inputs = parseUserInputs(template);
// Returns: [{ variable: 'choice', options: [...] }, ...]

// Replace variables with values
const content = interpolateVariables(template, { user_name: "Alice" });

// Validate template syntax
const { valid, errors } = validateTemplate(template);
```

## TypeScript Support

Full TypeScript support with type definitions included:

```typescript
import { MarkdownFlow, MarkdownFlowProps, Variable } from "markdown-flow-ui";

const props: MarkdownFlowProps = {
  template: "# Hello {{name}}",
  variables: { name: "World" },
  onVariableChange: (vars: Record<string, Variable>) => {
    console.log(vars);
  },
};
```

## Examples

### Interactive Tutorial

```jsx
const tutorialTemplate = `
# Programming Tutorial

Welcome {{student_name}}!

Choose your path:
?[%{{path}}Frontend Development|Backend Development|Full Stack]

Based on your choice of {{path}}, we'll customize your learning experience.
`;

function Tutorial() {
  const [studentName, setStudentName] = useState("");

  return (
    <div>
      <input
        placeholder="Enter your name"
        onChange={(e) => setStudentName(e.target.value)}
      />
      <MarkdownFlow
        template={tutorialTemplate}
        variables={{ student_name: studentName }}
      />
    </div>
  );
}
```

### Dynamic Form

```jsx
const formTemplate = `
## User Registration

?[%{{account_type}}Personal|Business|Enterprise]

{{#if account_type === 'Business'}}
  Company Name: {{company_name}}
  ?[%{{employees}}1-10|11-50|51-200|200+]
{{/if}}

?[%{{newsletter}}Subscribe to newsletter|No thanks]
`;

function DynamicForm() {
  return (
    <MarkdownFlow
      template={formTemplate}
      onSubmit={(data) => {
        console.log("Form data:", data);
      }}
    />
  );
}
```

## Performance Optimization

### Memoization

```jsx
import { memo } from "react";
import { MarkdownFlow } from "markdown-flow-ui";

const MemoizedMarkdownFlow = memo(MarkdownFlow);

// Use when template doesn't change frequently
<MemoizedMarkdownFlow template={staticTemplate} />;
```

### Lazy Loading

```jsx
import { lazy, Suspense } from "react";

const MarkdownFlow = lazy(() => import("markdown-flow-ui"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarkdownFlow template={template} />
    </Suspense>
  );
}
```

## Testing

```jsx
import { render, fireEvent } from "@testing-library/react";
import { MarkdownFlow } from "markdown-flow-ui";

test("renders template and handles input", () => {
  const { getByText } = render(
    <MarkdownFlow
      template="Hello {{name}}! ?[%{{choice}}Yes|No]"
      variables={{ name: "Test" }}
    />,
  );

  expect(getByText("Hello Test!")).toBeInTheDocument();

  const yesButton = getByText("Yes");
  fireEvent.click(yesButton);
  // Assert behavior
});
```

## Troubleshooting

### Common Issues

1. **Styles not loading**: Make sure to import the CSS file
2. **SSR errors**: Use dynamic imports for Next.js
3. **Variables not updating**: Check that variable names match exactly
4. **API calls failing**: Verify CORS settings on your backend

### Debug Mode

```jsx
<MarkdownFlow
  template={template}
  debug={true} // Shows parsing and processing information
/>
```

## Links

- [GitHub Repository](https://github.com/ai-shifu/markdown-flow-ui)
- [NPM Package](https://www.npmjs.com/package/markdown-flow-ui)
- [Live Demo](https://markdownflow.streamlit.app)
- [Issue Tracker](https://github.com/ai-shifu/markdown-flow-ui/issues)
