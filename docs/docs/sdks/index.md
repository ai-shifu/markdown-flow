# SDK Documentation

MarkdownFlow provides SDKs for major programming languages and frameworks. Choose the SDK that fits your technology stack.

## Quick Comparison

| SDK | Language | Use Case | Package |
|-----|----------|----------|---------|
| [markdown-flow-ui](javascript/markdown-flow-ui.md) | React | Full UI components | `npm install markdown-flow-ui` |
| [remark-flow](javascript/remark-flow.md) | React | Markdown plugin | `npm install remark-flow` |
| [markdown-it-flow](javascript/markdown-it-flow.md) | JavaScript | Parser plugin | `npm install markdown-it-flow` |
| [Python Agent](python.md) | Python | Backend processing | `pip install markdown-flow-agent` |
| [Go Agent](go.md) | Go | High-performance backend | `go get github.com/ai-shifu/markdown-flow-agent-go` |

## Frontend SDKs

### React
- **[markdown-flow-ui](javascript/markdown-flow-ui.md)** - Complete React components with styling
- **[remark-flow](javascript/remark-flow.md)** - Plugin for react-markdown

### Vue.js
- **[markdown-it-flow](javascript/markdown-it-flow.md)** - Works with Vue's markdown-it integration

### Vanilla JavaScript
- **[markdown-it-flow](javascript/markdown-it-flow.md)** - Pure JavaScript implementation

## Backend SDKs

### Python
- **[markdown-flow-agent](python.md)** - FastAPI-based backend with AI integration

### Go
- **[markdown-flow-agent-go](go.md)** - High-performance Go implementation

## Choosing an SDK

### For Web Applications

**Need a complete solution?**
→ Use `markdown-flow-ui` (React)

**Already using react-markdown?**
→ Add `remark-flow` plugin

**Using Vue or vanilla JS?**
→ Use `markdown-it-flow`

### For Backend Services

**Need rapid development?**
→ Python Agent with FastAPI

**Need maximum performance?**
→ Go Agent

**Existing microservices?**
→ Either, both support REST APIs

## Common Integration Patterns

### Full-Stack React + Python

```
React App (markdown-flow-ui)
    ↓ HTTP/WebSocket
Python Backend (markdown-flow-agent)
    ↓ API calls
LLM Provider (OpenAI/Anthropic)
```

### Vue + Go High-Performance

```
Vue App (markdown-it-flow)
    ↓ HTTP/WebSocket
Go Backend (markdown-flow-agent-go)
    ↓ API calls
LLM Provider
```

### Microservices Architecture

```
Frontend (Any SDK)
    ↓
API Gateway
    ↓
Multiple Backends (Python/Go)
    ↓
LLM Service
```

## Quick Start Examples

### React
```jsx
import { MarkdownFlow } from 'markdown-flow-ui';

<MarkdownFlow template={template} />
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

## Feature Matrix

| Feature | UI | remark | markdown-it | Python | Go |
|---------|-----|--------|-------------|---------|-----|
| Variables | ✅ | ✅ | ✅ | ✅ | ✅ |
| User Input | ✅ | ✅ | ✅ | ✅ | ✅ |
| AI Processing | ✅ | ⚠️ | ⚠️ | ✅ | ✅ |
| Styling | ✅ | ❌ | ❌ | N/A | N/A |
| TypeScript | ✅ | ✅ | ✅ | N/A | N/A |
| Streaming | ✅ | ❌ | ❌ | ✅ | ✅ |
| Caching | ✅ | ❌ | ❌ | ✅ | ✅ |

Legend: ✅ Full support | ⚠️ Requires backend | ❌ Not supported | N/A Not applicable

## Getting Help

- 📖 Browse individual SDK docs for detailed API references
- 💬 [GitHub Discussions](https://github.com/ai-shifu/markdown-flow/discussions)
- 🐛 Report issues on each SDK's repository
- 📧 [Contact support](mailto:support@markdownflow.ai)