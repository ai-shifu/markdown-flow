# Installation Guide

Choose the installation method that matches your tech stack.

## Quick Install

### For React Projects

```bash
npm install markdown-flow-ui
# or
yarn add markdown-flow-ui
# or
pnpm add markdown-flow-ui
```

### For Python Projects

```bash
pip install markdown-flow-agent
# or
poetry add markdown-flow-agent
```

### For Go Projects

```bash
go get github.com/ai-shifu/markdown-flow-agent-go
```

### For Vue/Vanilla JS

```bash
npm install markdown-it markdown-it-flow
```

## Detailed Setup

### React with markdown-flow-ui

1. **Install the package:**
```bash
npm install markdown-flow-ui
```

2. **Import styles:**
```jsx
import 'markdown-flow-ui/dist/styles.css';
```

3. **Use the component:**
```jsx
import { MarkdownFlow } from 'markdown-flow-ui';

function App() {
  const template = `
    # Hello {{user_name}}!
    ?[#{{choice}}Continue|Cancel]
  `;

  return (
    <MarkdownFlow 
      template={template}
      variables={{ user_name: 'World' }}
      apiEndpoint="https://your-api.com/process"
    />
  );
}
```

### React with react-markdown

1. **Install packages:**
```bash
npm install react-markdown remark-flow
```

2. **Set up the component:**
```jsx
import ReactMarkdown from 'react-markdown';
import remarkFlow from 'remark-flow';

function App() {
  return (
    <ReactMarkdown remarkPlugins={[remarkFlow]}>
      {markdownContent}
    </ReactMarkdown>
  );
}
```

### Python Backend

1. **Install the package:**
```bash
pip install markdown-flow-agent
```

2. **Create a FastAPI server:**
```python
from fastapi import FastAPI
from markdown_flow_agent import FlowAgent

app = FastAPI()
agent = FlowAgent()

@app.post("/process")
async def process_template(template: str, variables: dict):
    result = await agent.process(template, variables)
    return result
```

3. **Run the server:**
```bash
uvicorn main:app --reload
```

### Go Backend

1. **Install the package:**
```bash
go get github.com/ai-shifu/markdown-flow-agent-go
```

2. **Create a server:**
```go
package main

import (
    "log"
    "net/http"
    mf "github.com/ai-shifu/markdown-flow-agent-go"
)

func main() {
    agent := mf.NewAgent(mf.Config{
        LLMProvider: "openai",
        APIKey:      "your-api-key",
    })
    
    handler := mf.NewHTTPHandler(agent)
    log.Fatal(http.ListenAndServe(":8080", handler))
}
```

### Vue.js

1. **Install packages:**
```bash
npm install markdown-it markdown-it-flow
```

2. **Create a component:**
```vue
<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import markdownItFlow from 'markdown-it-flow';

export default {
  data() {
    return {
      markdown: '# Hello {{name}}!',
      variables: { name: 'Vue User' }
    };
  },
  computed: {
    renderedMarkdown() {
      const md = new MarkdownIt().use(markdownItFlow);
      return md.render(this.markdown);
    }
  }
};
</script>
```

### Vanilla JavaScript

1. **Using CDN:**
```html
<script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/markdown-it-flow/dist/markdown-it-flow.min.js"></script>
```

2. **Or install via npm:**
```bash
npm install markdown-it markdown-it-flow
```

3. **Use in your code:**
```javascript
const md = window.markdownit().use(window.markdownItFlow);
const html = md.render(markdownContent);
document.getElementById('content').innerHTML = html;
```

## Environment Setup

### API Keys

Most installations require an LLM API key. Set it as an environment variable:

```bash
# OpenAI
export OPENAI_API_KEY=sk-...

# Anthropic Claude
export ANTHROPIC_API_KEY=sk-ant-...

# Or in .env file
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

### Python Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # On Unix/macOS
venv\Scripts\activate     # On Windows

# Install MarkdownFlow
pip install markdown-flow-agent
```

### Node.js Version

MarkdownFlow requires Node.js 14 or higher:

```bash
# Check your version
node --version

# Install via nvm if needed
nvm install 18
nvm use 18
```

## Docker Setup

### Frontend Container

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Python Backend Container

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:8000
  
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
```

## Verify Installation

### Check Package Version

**JavaScript:**
```bash
npm list markdown-flow-ui
```

**Python:**
```bash
pip show markdown-flow-agent
```

**Go:**
```bash
go list -m github.com/ai-shifu/markdown-flow-agent-go
```

### Test Basic Functionality

**JavaScript:**
```javascript
import { parseVariables } from 'markdown-flow-ui/utils';

const vars = parseVariables('Hello {{name}}!');
console.log(vars); // ['name']
```

**Python:**
```python
from markdown_flow_agent import FlowAgent

agent = FlowAgent()
variables = agent.extract_variables('Hello {{name}}!')
print(variables)  # ['name']
```

## Troubleshooting

### Common Issues

**Module not found:**
- Ensure package is installed: `npm install` or `pip install`
- Check import paths are correct
- Restart your development server

**API key errors:**
- Verify environment variables are set
- Check API key is valid and has credits
- Ensure backend can access the keys

**CORS errors:**
- Configure backend to allow frontend origin
- Use proxy in development
- Check API endpoint URLs

**Version conflicts:**
- Update to latest versions
- Clear node_modules and reinstall
- Check peer dependency requirements

### Getting Help

- 📖 [Documentation](https://ai-shifu.github.io/markdown-flow/docs/)
- 💬 [GitHub Discussions](https://github.com/ai-shifu/markdown-flow/discussions)
- 🐛 [Issue Tracker](https://github.com/ai-shifu/markdown-flow/issues)
- 📧 [Email Support](mailto:support@markdownflow.ai)

## Next Steps

- [Quickstart Tutorial](quickstart.md) - Build your first MarkdownFlow document
- [SDK Documentation](../sdks/index.md) - Detailed SDK guides
- [Examples](../examples/index.md) - See real-world implementations