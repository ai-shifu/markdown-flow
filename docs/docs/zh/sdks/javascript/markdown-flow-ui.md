# markdown-flow-ui

完整的 MarkdownFlow React UI 组件，内置功能和美观样式。

## 安装

```bash
npm install markdown-flow-ui
# 或
yarn add markdown-flow-ui
# 或
pnpm add markdown-flow-ui
```

## 快速开始

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

## 组件

### `<MarkdownFlow />`

渲染 MarkdownFlow 模板的主组件。

#### 属性

| 属性               | 类型                          | 默认值    | 说明                       |
| ------------------ | ----------------------------- | -------- | -------------------------- |
| `template`         | `string`                      | 必需     | MarkdownFlow 模板字符串     |
| `variables`        | `object`                      | `{}`     | 初始变量                   |
| `apiEndpoint`      | `string`                      | -        | AI 处理的后端 API 端点      |
| `onVariableChange` | `function`                    | -        | 变量更改时的回调            |
| `onUserInput`      | `function`                    | -        | 用户做出选择时的回调        |
| `theme`            | `'light' \| 'dark' \| 'auto'` | `'auto'` | 颜色主题                   |
| `className`        | `string`                      | -        | 额外的 CSS 类              |
| `style`            | `object`                      | -        | 内联样式                   |

#### 所有属性示例

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

用于跨组件管理 MarkdownFlow 状态的上下文提供者。

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

  // 使用上下文方法
}
```

### `<UserInput />`

用于渲染用户输入元素的独立组件。

```jsx
import { UserInput } from "markdown-flow-ui";

<UserInput
  variable="choice"
  options={["Option 1", "Option 2", "Option 3"]}
  onSelect={(value) => console.log("Selected:", value)}
  style="buttons" // 或 'dropdown', 'radio'
/>;
```

## Hooks

### `useMarkdownFlow()`

访问 MarkdownFlow 上下文和状态。

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

管理单个变量。

```jsx
const [value, setValue] = useVariable("user_name", "Guest");
```

### `useAIProcess()`

处理 AI 处理。

```jsx
const { process, isLoading, result, error } = useAIProcess({
  endpoint: "https://api.example.com/process",
});

// 用法
await process(template, variables);
```

## 样式

### 默认主题

导入默认样式表：

```jsx
import "markdown-flow-ui/dist/styles.css";
```

### 自定义主题

覆盖 CSS 变量以实现自定义主题：

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
  /* ... 其他深色主题变量 */
}
```

### 组件特定样式

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

## 高级用法

### 服务端渲染 (SSR)

```jsx
// pages/index.js (Next.js 示例)
import dynamic from "next/dynamic";

const MarkdownFlow = dynamic(
  () => import("markdown-flow-ui").then((mod) => mod.MarkdownFlow),
  { ssr: false },
);

export default function Page() {
  return <MarkdownFlow template={template} />;
}
```

### 自定义渲染器

覆盖特定元素的默认渲染：

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

### AI 处理集成

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

### 实时协作

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

## API 参考

### MarkdownFlow 类方法

```javascript
import { MarkdownFlowProcessor } from "markdown-flow-ui";

const processor = new MarkdownFlowProcessor();

// 解析模板
const parsed = processor.parse(template);

// 使用变量处理
const result = processor.process(template, variables);

// 验证模板
const errors = processor.validate(template);
```

### 工具函数

```javascript
import {
  parseVariables,
  parseUserInputs,
  interpolateVariables,
  validateTemplate,
} from "markdown-flow-ui/utils";

// 从模板中提取变量
const variables = parseVariables(template);
// 返回: ['user_name', 'skill_level', ...]

// 提取用户输入
const inputs = parseUserInputs(template);
// 返回: [{ variable: 'choice', options: [...] }, ...]

// 用值替换变量
const content = interpolateVariables(template, { user_name: "Alice" });

// 验证模板语法
const { valid, errors } = validateTemplate(template);
```

## TypeScript 支持

提供完整的 TypeScript 支持，包含类型定义：

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

## 示例

### 交互式教程

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

### 动态表单

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

## 性能优化

### 记忆化

```jsx
import { memo } from "react";
import { MarkdownFlow } from "markdown-flow-ui";

const MemoizedMarkdownFlow = memo(MarkdownFlow);

// 当模板不经常更改时使用
<MemoizedMarkdownFlow template={staticTemplate} />;
```

### 懒加载

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

## 测试

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
  // 断言行为
});
```

## 故障排除

### 常见问题

1. **样式未加载**: 确保导入了 CSS 文件
2. **SSR 错误**: 在 Next.js 中使用动态导入
3. **变量未更新**: 检查变量名是否完全匹配
4. **API 调用失败**: 验证后端的 CORS 设置

### 调试模式

```jsx
<MarkdownFlow
  template={template}
  debug={true} // 显示解析和处理信息
/>
```

## 链接

- [GitHub 仓库](https://github.com/ai-shifu/markdown-flow-ui)
- [NPM 包](https://www.npmjs.com/package/markdown-flow-ui)
- [在线演示](https://markdownflow.streamlit.app)
- [问题追踪](https://github.com/ai-shifu/markdown-flow-ui/issues)
