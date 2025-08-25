---
tags:
  - SDK
  - Integration
  - Development
---

# SDK 文档

MarkdownFlow 为主要编程语言和框架提供 SDK。选择适合您技术栈的 SDK。

## 快速对比

| SDK                                                | 语言       | 使用场景                 | 包管理                                              |
| -------------------------------------------------- | ---------- | ------------------------ | --------------------------------------------------- |
| [markdown-flow-ui](javascript/markdown-flow-ui.md) | React      | 完整 UI 组件             | `npm install markdown-flow-ui`                      |
| [remark-flow](javascript/remark-flow.md)           | React      | Markdown 插件            | `npm install remark-flow`                           |
| [markdown-it-flow](javascript/markdown-it-flow.md) | JavaScript | 解析器插件               | `npm install markdown-it-flow`                      |
| [Python Agent](python.md)                          | Python     | 后端处理                 | `pip install markdown-flow-agent`                   |
| [Go Agent](go.md)                                  | Go         | 高性能后端               | `go get github.com/ai-shifu/markdown-flow-agent-go` |

## 前端 SDK

### React

- **[markdown-flow-ui](javascript/markdown-flow-ui.md)** - 完整的 React 组件，包含样式
- **[remark-flow](javascript/remark-flow.md)** - react-markdown 插件

### Vue.js

- **[markdown-it-flow](javascript/markdown-it-flow.md)** - 与 Vue 的 markdown-it 集成配合使用

### 原生 JavaScript

- **[markdown-it-flow](javascript/markdown-it-flow.md)** - 纯 JavaScript 实现

## 后端 SDK

### Python

- **[markdown-flow-agent](python.md)** - 基于 FastAPI 的后端，集成 AI 功能

### Go

- **[markdown-flow-agent-go](go.md)** - 高性能 Go 实现

## 选择 SDK

### Web 应用

**需要完整解决方案？**
→ 使用 `markdown-flow-ui` (React)

**已在使用 react-markdown？**
→ 添加 `remark-flow` 插件

**使用 Vue 或原生 JS？**
→ 使用 `markdown-it-flow`

### 后端服务

**需要快速开发？**
→ Python Agent 搭配 FastAPI

**需要最高性能？**
→ Go Agent

**现有微服务架构？**
→ 两者皆可，都支持 REST API

## 常见集成模式

### 全栈 React + Python

```text
React App (markdown-flow-ui)
    ↓ HTTP/WebSocket
Python Backend (markdown-flow-agent)
    ↓ API calls
LLM Provider (OpenAI/Anthropic)
```

### Vue + Go 高性能方案

```text
Vue App (markdown-it-flow)
    ↓ HTTP/WebSocket
Go Backend (markdown-flow-agent-go)
    ↓ API calls
LLM Provider
```

### 微服务架构

```text
Frontend (Any SDK)
    ↓
API Gateway
    ↓
Multiple Backends (Python/Go)
    ↓
LLM Service
```

## 快速上手示例

### React

```jsx
import { MarkdownFlow } from "markdown-flow-ui";

<MarkdownFlow template={template} />;
```

### Python

```python
from markdown_flow_agent import FlowAgent

agent = FlowAgent()
result = await agent.process(template, variables)
```

### Go

```go
agent := mf.NewAgent(config)
result, err := agent.Process(template, variables)
```

## 功能矩阵

| 功能          | UI  | remark | markdown-it | Python | Go  |
| ------------- | --- | ------ | ----------- | ------ | --- |
| 变量          | ✅  | ✅     | ✅          | ✅     | ✅  |
| 用户输入      | ✅  | ✅     | ✅          | ✅     | ✅  |
| AI 处理       | ✅  | ⚠️     | ⚠️          | ✅     | ✅  |
| 样式支持      | ✅  | ❌     | ❌          | N/A    | N/A |
| TypeScript    | ✅  | ✅     | ✅          | N/A    | N/A |
| 流式处理      | ✅  | ❌     | ❌          | ✅     | ✅  |
| 缓存          | ✅  | ❌     | ❌          | ✅     | ✅  |

图例：✅ 完全支持 | ⚠️ 需要后端 | ❌ 不支持 | N/A 不适用

## 获取帮助

- 📖 浏览各个 SDK 文档获取详细 API 参考
- 💬 [GitHub Discussions](https://github.com/ai-shifu/markdown-flow/discussions)
- 🐛 在各 SDK 仓库中报告问题
- 📧 [联系支持](mailto:support@markdownflow.ai)
