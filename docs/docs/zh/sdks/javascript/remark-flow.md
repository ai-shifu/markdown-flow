# remark-flow

一个 remark 插件，为 react-markdown 添加 MarkdownFlow 语法支持。

## 安装

```bash
npm install remark-flow react-markdown
# 或者
yarn add remark-flow react-markdown
# 或者
pnpm add remark-flow react-markdown
```

## 快速开始

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

## 配置

### 插件选项

```jsx
import remarkFlow from "remark-flow";

const options = {
  variablePrefix: "{{", // 变量起始分隔符
  variableSuffix: "}}", // 变量结束分隔符
  inputPrefix: "?[%{{", // 用户输入起始标记
  inputSuffix: "}}", // 用户输入结束标记
  enableAIInstructions: true, // 解析 AI 指令块
  strict: false, // 严格解析模式
};

<ReactMarkdown remarkPlugins={[[remarkFlow, options]]}>
  {markdown}
</ReactMarkdown>;
```

## 组件自定义

### 变量组件

```jsx
const components = {
  variable: ({ name, value, context }) => {
    // name: 变量名称（例如 "user_name"）
    // value: 当前值（如果可用）
    // context: 附加上下文数据

    return (
      <span className="variable" title={name}>
        {value || <em>{name}</em>}
      </span>
    );
  },
};
```

### 用户输入组件

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

### AI 指令组件

```jsx
const components = {
  aiInstruction: ({ content, variables, type }) => {
    // content: 指令文本
    // variables: 指令中引用的变量
    // type: 指令类型（生成、转换等）

    return (
      <div className="ai-instruction">
        <strong>AI:</strong> {content}
      </div>
    );
  },
};
```

## 状态管理

### 使用 React State

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

### 使用 Context API

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

### 使用 Redux

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

## 高级功能

### 自定义节点类型

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

### 条件渲染

```jsx
function ConditionalContent({ markdown }) {
  const [variables, setVariables] = useState({});

  const processConditionals = (content) => {
    // 处理 markdown 中的条件语句
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

### AI 处理集成

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
      {processing && <div>正在使用 AI 处理...</div>}
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
              <option>请选择...</option>
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

## 样式

### CSS 类

插件为元素添加语义化类名：

```css
/* 变量 */
.markdown-flow-variable {
  color: #0066cc;
  font-weight: bold;
}

/* 用户输入 */
.markdown-flow-input {
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

/* AI 指令 */
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

## TypeScript 支持

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

## 测试

```jsx
import { render, screen } from "@testing-library/react";
import ReactMarkdown from "react-markdown";
import remarkFlow from "remark-flow";

describe("MarkdownFlow 渲染", () => {
  test("渲染变量", () => {
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

  test("渲染用户输入", () => {
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

## 性能

### 记忆化

```jsx
import { memo, useMemo } from "react";

const MemoizedMarkdown = memo(({ content, variables }) => {
  const processedContent = useMemo(() => {
    // 使用变量处理内容
    return interpolateVariables(content, variables);
  }, [content, variables]);

  return (
    <ReactMarkdown remarkPlugins={[remarkFlow]}>
      {processedContent}
    </ReactMarkdown>
  );
});
```

### 懒加载

```jsx
import { lazy, Suspense } from "react";

const LazyMarkdown = lazy(() =>
  import("react-markdown").then((module) => ({
    default: module.default,
  })),
);

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <LazyMarkdown remarkPlugins={[remarkFlow]}>{content}</LazyMarkdown>
    </Suspense>
  );
}
```

## 迁移指南

### 从标准 Markdown

```jsx
// 之前
<ReactMarkdown>{markdown}</ReactMarkdown>;

// 之后
import remarkFlow from "remark-flow";

<ReactMarkdown remarkPlugins={[remarkFlow]} components={flowComponents}>
  {markdown}
</ReactMarkdown>;
```

### 从其他插件

```jsx
// 使用多个插件
import remarkGfm from "remark-gfm";
import remarkFlow from "remark-flow";

<ReactMarkdown
  remarkPlugins={[
    remarkGfm,
    remarkFlow,
    // 其他插件...
  ]}
>
  {markdown}
</ReactMarkdown>;
```

## API 参考

### 插件导出

```javascript
import remarkFlow, {
  parseVariables,
  parseUserInputs,
  createFlowProcessor,
  defaultOptions,
} from "remark-flow";

// 从 markdown 解析变量
const vars = parseVariables(markdown);

// 解析用户输入
const inputs = parseUserInputs(markdown);

// 创建自定义处理器
const processor = createFlowProcessor(options);
```

### 工具函数

```javascript
import { utils } from "remark-flow";

// 插值变量
const result = utils.interpolate(template, variables);

// 验证语法
const isValid = utils.validate(markdown);

// 提取元数据
const meta = utils.extractMetadata(markdown);
```

## 链接

- [GitHub 仓库](https://github.com/ai-shifu/remark-flow)
- [NPM 包](https://www.npmjs.com/package/remark-flow)
- [react-markdown 文档](https://github.com/remarkjs/react-markdown)
- [问题跟踪](https://github.com/ai-shifu/remark-flow/issues)
