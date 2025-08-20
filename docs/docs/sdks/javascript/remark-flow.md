# remark-flow

A remark plugin that adds MarkdownFlow syntax support to react-markdown.

## Installation

```bash
npm install remark-flow react-markdown
# or
yarn add remark-flow react-markdown
# or
pnpm add remark-flow react-markdown
```

## Quick Start

```jsx
import ReactMarkdown from "react-markdown";
import remarkFlow from "remark-flow";

function App() {
  const markdown = `
# Hello {{user_name}}!

Choose your preference:
?[%{{theme}}Light|Dark|Auto]
  `;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkFlow]}
      components={{
        variable: ({ name, value }) => <span>{value || `{{${name}}}`}</span>,
        userInput: ({ variable, options, onSelect }) => (
          <select onChange={(e) => onSelect(e.target.value)}>
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
```

## Configuration

### Plugin Options

```jsx
import remarkFlow from "remark-flow";

const options = {
  variablePrefix: "{{", // Variable start delimiter
  variableSuffix: "}}", // Variable end delimiter
  inputPrefix: "?[%{{", // User input start
  inputSuffix: "}}", // User input end
  enableAIInstructions: true, // Parse AI instruction blocks
  strict: false, // Strict parsing mode
};

<ReactMarkdown remarkPlugins={[[remarkFlow, options]]}>
  {markdown}
</ReactMarkdown>;
```

## Component Customization

### Variable Component

```jsx
const components = {
  variable: ({ name, value, context }) => {
    // name: variable name (e.g., "user_name")
    // value: current value if available
    // context: additional context data

    return (
      <span className="variable" title={name}>
        {value || <em>{name}</em>}
      </span>
    );
  },
};
```

### User Input Component

```jsx
const components = {
  userInput: ({ variable, options, onSelect, selected }) => {
    return (
      <div className="user-input">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={selected === option ? "selected" : ""}
          >
            {option}
          </button>
        ))}
      </div>
    );
  },
};
```

### AI Instruction Component

```jsx
const components = {
  aiInstruction: ({ content, variables, type }) => {
    // content: The instruction text
    // variables: Variables referenced in the instruction
    // type: Instruction type (generate, transform, etc.)

    return (
      <div className="ai-instruction">
        <strong>AI:</strong> {content}
      </div>
    );
  },
};
```

## State Management

### With React State

```jsx
function InteractiveDoc() {
  const [variables, setVariables] = useState({
    user_name: "Guest",
    theme: "light",
  });

  const handleVariableChange = (name, value) => {
    setVariables((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkFlow]}
      components={{
        variable: ({ name }) => <span>{variables[name] || `{{${name}}}`}</span>,
        userInput: ({ variable, options }) => (
          <select
            onChange={(e) => handleVariableChange(variable, e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
```

### With Context API

```jsx
const MarkdownContext = createContext();

function MarkdownProvider({ children }) {
  const [variables, setVariables] = useState({});

  return (
    <MarkdownContext.Provider value={{ variables, setVariables }}>
      {children}
    </MarkdownContext.Provider>
  );
}

function VariableRenderer({ name }) {
  const { variables } = useContext(MarkdownContext);
  return <span>{variables[name] || `{{${name}}}`}</span>;
}
```

### With Redux

```jsx
import { useSelector, useDispatch } from "react-redux";

function MarkdownWithRedux({ content }) {
  const variables = useSelector((state) => state.markdown.variables);
  const dispatch = useDispatch();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkFlow]}
      components={{
        variable: ({ name }) => <span>{variables[name]}</span>,
        userInput: ({ variable, options }) => (
          <select
            onChange={(e) =>
              dispatch({
                type: "SET_VARIABLE",
                name: variable,
                value: e.target.value,
              })
            }
          >
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

## Advanced Features

### Custom Node Types

```jsx
import remarkFlow from "remark-flow";

const customPlugin = [
  remarkFlow,
  {
    customNodes: {
      timer: {
        pattern: /!T\[([^\]]+)\]/,
        component: "timer",
      },
      progress: {
        pattern: /%P\[([0-9]+)\]/,
        component: "progress",
      },
    },
  },
];

const components = {
  timer: ({ duration }) => <Timer seconds={duration} />,
  progress: ({ value }) => <ProgressBar percent={value} />,
};
```

### Conditional Rendering

```jsx
function ConditionalContent({ markdown }) {
  const [variables, setVariables] = useState({});

  const processConditionals = (content) => {
    // Process if statements in markdown
    return content.replace(
      /If {{(\w+)}} is "([^"]+)":\s*([^]*?)(?=If |$)/g,
      (match, varName, value, body) => {
        if (variables[varName] === value) {
          return body;
        }
        return "";
      },
    );
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkFlow]} components={components}>
      {processConditionals(markdown)}
    </ReactMarkdown>
  );
}
```

### AI Processing Integration

```jsx
function AIProcessedMarkdown({ template }) {
  const [content, setContent] = useState(template);
  const [variables, setVariables] = useState({});
  const [processing, setProcessing] = useState(false);

  const processWithAI = async () => {
    setProcessing(true);

    const response = await fetch("/api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template, variables }),
    });

    const result = await response.json();
    setContent(result.processedContent);
    setProcessing(false);
  };

  useEffect(() => {
    if (Object.keys(variables).length > 0) {
      processWithAI();
    }
  }, [variables]);

  return (
    <div>
      {processing && <div>Processing with AI...</div>}
      <ReactMarkdown
        remarkPlugins={[remarkFlow]}
        components={{
          userInput: ({ variable, options }) => (
            <select
              onChange={(e) =>
                setVariables((prev) => ({
                  ...prev,
                  [variable]: e.target.value,
                }))
              }
            >
              <option>Select...</option>
              {options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

## Styling

### CSS Classes

The plugin adds semantic classes to elements:

```css
/* Variables */
.markdown-flow-variable {
  color: #0066cc;
  font-weight: bold;
}

/* User inputs */
.markdown-flow-input {
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

/* AI instructions */
.markdown-flow-instruction {
  border-left: 4px solid #4caf50;
  padding-left: 1rem;
  margin: 1rem 0;
}
```

### Styled Components

```jsx
import styled from "styled-components";

const StyledVariable = styled.span`
  color: ${(props) => (props.hasValue ? "#333" : "#999")};
  background: ${(props) => (props.hasValue ? "#e8f4f8" : "#f5f5f5")};
  padding: 2px 6px;
  border-radius: 3px;
`;

const components = {
  variable: ({ name, value }) => (
    <StyledVariable hasValue={!!value}>{value || name}</StyledVariable>
  ),
};
```

## TypeScript Support

```typescript
import ReactMarkdown from 'react-markdown';
import remarkFlow, { RemarkFlowOptions, FlowComponents } from 'remark-flow';

const options: RemarkFlowOptions = {
  variablePrefix: '{{',
  variableSuffix: '}}',
  strict: true
};

const components: FlowComponents = {
  variable: ({ name, value }: { name: string; value?: string }) => (
    <span>{value || name}</span>
  ),
  userInput: ({ variable, options, onSelect }) => (
    <select onChange={(e) => onSelect(e.target.value)}>
      {options.map(opt => <option key={opt}>{opt}</option>)}
    </select>
  )
};

function App() {
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkFlow, options]]}
      components={components}
    >
      {markdown}
    </ReactMarkdown>
  );
}
```

## Testing

```jsx
import { render, screen } from "@testing-library/react";
import ReactMarkdown from "react-markdown";
import remarkFlow from "remark-flow";

describe("MarkdownFlow Rendering", () => {
  test("renders variables", () => {
    const markdown = "Hello {{name}}!";

    render(
      <ReactMarkdown
        remarkPlugins={[remarkFlow]}
        components={{
          variable: ({ name }) => (
            <span data-testid={`var-${name}`}>{name}</span>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>,
    );

    expect(screen.getByTestId("var-name")).toBeInTheDocument();
  });

  test("renders user inputs", () => {
    const markdown = "?[%{{choice}}Yes|No]";

    render(
      <ReactMarkdown
        remarkPlugins={[remarkFlow]}
        components={{
          userInput: ({ options }) => (
            <div data-testid="input">
              {options.map((opt) => (
                <button key={opt}>{opt}</button>
              ))}
            </div>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>,
    );

    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });
});
```

## Performance

### Memoization

```jsx
import { memo, useMemo } from "react";

const MemoizedMarkdown = memo(({ content, variables }) => {
  const processedContent = useMemo(() => {
    // Process content with variables
    return interpolateVariables(content, variables);
  }, [content, variables]);

  return (
    <ReactMarkdown remarkPlugins={[remarkFlow]}>
      {processedContent}
    </ReactMarkdown>
  );
});
```

### Lazy Loading

```jsx
import { lazy, Suspense } from "react";

const LazyMarkdown = lazy(() =>
  import("react-markdown").then((module) => ({
    default: module.default,
  })),
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyMarkdown remarkPlugins={[remarkFlow]}>{content}</LazyMarkdown>
    </Suspense>
  );
}
```

## Migration Guide

### From Standard Markdown

```jsx
// Before
<ReactMarkdown>{markdown}</ReactMarkdown>;

// After
import remarkFlow from "remark-flow";

<ReactMarkdown remarkPlugins={[remarkFlow]} components={flowComponents}>
  {markdown}
</ReactMarkdown>;
```

### From Other Plugins

```jsx
// With multiple plugins
import remarkGfm from "remark-gfm";
import remarkFlow from "remark-flow";

<ReactMarkdown
  remarkPlugins={[
    remarkGfm,
    remarkFlow,
    // Other plugins...
  ]}
>
  {markdown}
</ReactMarkdown>;
```

## API Reference

### Plugin Exports

```javascript
import remarkFlow, {
  parseVariables,
  parseUserInputs,
  createFlowProcessor,
  defaultOptions,
} from "remark-flow";

// Parse variables from markdown
const vars = parseVariables(markdown);

// Parse user inputs
const inputs = parseUserInputs(markdown);

// Create custom processor
const processor = createFlowProcessor(options);
```

### Utilities

```javascript
import { utils } from "remark-flow";

// Interpolate variables
const result = utils.interpolate(template, variables);

// Validate syntax
const isValid = utils.validate(markdown);

// Extract metadata
const meta = utils.extractMetadata(markdown);
```

## Links

- [GitHub Repository](https://github.com/ai-shifu/remark-flow)
- [NPM Package](https://www.npmjs.com/package/remark-flow)
- [react-markdown Documentation](https://github.com/remarkjs/react-markdown)
- [Issue Tracker](https://github.com/ai-shifu/remark-flow/issues)
