# MarkdownFlow Libraries

The MarkdownFlow ecosystem provides a complete set of open-source libraries for building AI-powered interactive documents. Choose the components that fit your technology stack.

## Architecture Overview

```
┌─────────────────────────────────────┐
│         User Interface              │
│  (React/Vue/Vanilla JavaScript)     │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│     MarkdownFlow Frontend Libraries │
│   • markdown-flow-ui (React)        │
│   • remark-flow (React plugin)      │
│   • markdown-it-flow (Parser plugin)│
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│     MarkdownFlow Backend Agents     │
│   • Python Agent (FastAPI)          │
│   • Go Agent (High-performance)     │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         AI/LLM Provider             │
│    (OpenAI/Anthropic/Local)         │
└─────────────────────────────────────┘
```

## Frontend Libraries

### [markdown-flow-ui](frontend/markdown-flow-ui.md)
**Complete React UI Components**

Ready-to-use React components with built-in MarkdownFlow functionality.

```bash
npm install markdown-flow-ui
```

- 🎨 Pre-styled components
- 🔌 Plug-and-play integration
- 📱 Responsive design
- ♿ Accessibility built-in

### [remark-flow](frontend/remark-flow.md)
**React-Markdown Plugin**

Extends react-markdown with MarkdownFlow syntax support.

```bash
npm install remark-flow
```

- 🔧 Lightweight plugin
- 🎯 Works with existing react-markdown setup
- 🛠️ Customizable rendering
- 📦 Tree-shakeable

### [markdown-it-flow](frontend/markdown-it-flow.md)
**Markdown-it Plugin**

Adds MarkdownFlow capabilities to any markdown-it powered application.

```bash
npm install markdown-it-flow
```

- 🌍 Framework agnostic
- ⚡ Fast parsing
- 🔄 Compatible with Vue, Angular, vanilla JS
- 🎛️ Configurable options

## Backend Libraries

### [markdown-flow-agent-py](backend/agent-python.md)
**Python Backend Agent**

FastAPI-based server for processing MarkdownFlow templates with AI.

```bash
pip install markdown-flow-agent
```

- 🐍 Pythonic API
- ⚡ Async support with FastAPI
- 🔌 Multiple LLM providers
- 📊 Built-in analytics

### [markdown-flow-agent-go](backend/agent-go.md)
**Go Backend Agent**

High-performance Go implementation for enterprise applications.

```bash
go get github.com/ai-shifu/markdown-flow-agent-go
```

- 🚀 Extreme performance
- 💪 Low memory footprint
- 🔄 Concurrent processing
- 🏢 Enterprise-ready

## Quick Start Guides

### For React Applications

```jsx
import { MarkdownFlow } from 'markdown-flow-ui';

function App() {
  return (
    <MarkdownFlow
      template={markdownTemplate}
      apiEndpoint="https://your-backend.com/api"
      onVariableChange={(vars) => console.log(vars)}
    />
  );
}
```

### For Vue Applications

```javascript
import MarkdownIt from 'markdown-it';
import MarkdownFlowPlugin from 'markdown-it-flow';

const md = new MarkdownIt();
md.use(MarkdownFlowPlugin);

const rendered = md.render(markdownContent);
```

### For Python Backend

```python
from markdown_flow_agent import FlowAgent

agent = FlowAgent()

@app.post("/process")
async def process_template(template: str, variables: dict):
    result = await agent.process(template, variables)
    return result
```

### For Go Backend

```go
import "github.com/ai-shifu/markdown-flow-agent-go"

agent := markdownflow.NewAgent()
result, err := agent.Process(template, variables)
```

## Choosing the Right Libraries

### Frontend Decision Tree

1. **Using React?**
   - Want pre-built components? → `markdown-flow-ui`
   - Already using react-markdown? → `remark-flow`
   - Need maximum control? → `markdown-it-flow` + custom React wrapper

2. **Using Vue?**
   - → `markdown-it-flow` (Vue has excellent markdown-it integration)

3. **Using Angular or vanilla JS?**
   - → `markdown-it-flow`

### Backend Decision Tree

1. **Need maximum performance?**
   - → Go agent

2. **Want rich ecosystem and AI libraries?**
   - → Python agent

3. **Existing FastAPI application?**
   - → Python agent

4. **Microservices architecture?**
   - → Either (both support containerization)

## Integration Patterns

### Full-Stack React + Python

```
Frontend: markdown-flow-ui
    ↓
Backend: markdown-flow-agent-py
    ↓
AI: OpenAI/Anthropic API
```

### High-Performance Vue + Go

```
Frontend: Vue + markdown-it-flow
    ↓
Backend: markdown-flow-agent-go
    ↓
AI: Local LLM or API
```

### Microservices Architecture

```
Web App: React + remark-flow
    ↓
API Gateway
    ↓
Multiple Backend Agents (Python/Go)
    ↓
LLM Service
```

## Common Features

All libraries support:

- ✅ Full MarkdownFlow syntax
- ✅ Variable interpolation
- ✅ User input handling
- ✅ AI instruction processing
- ✅ Real-time updates
- ✅ Error handling
- ✅ TypeScript definitions (frontend)
- ✅ Comprehensive documentation

## Getting Help

- 📖 [Documentation](https://markdownflow.ai/docs)
- 💬 [GitHub Discussions](https://github.com/ai-shifu)
- 🐛 [Issue Tracker](https://github.com/ai-shifu/[library]/issues)
- 📧 [Email Support](mailto:support@markdownflow.ai)

## Contributing

All libraries are open source and welcome contributions:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

See individual library documentation for specific contribution guidelines.

## License

All MarkdownFlow libraries are open source under various licenses. Check individual repositories for specific license information.