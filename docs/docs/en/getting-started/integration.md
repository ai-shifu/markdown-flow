# Integration Guide

Learn how to integrate MarkdownFlow into your existing applications. Choose the integration approach that best fits your architecture and requirements.

## Open Source Projects

All MarkdownFlow functionality is available through our open source SDKs and libraries. Each project maintains its own comprehensive documentation with examples, tutorials, and API references.

| Project | Description | Repository | Installation |
|---------|-------------|------------|--------------|
| **[markdown-flow-ui](https://github.com/ai-shifu/markdown-flow-ui)** | A React component library to render interactive MarkdownFlow documents with built-in UI elements | GitHub | `npm install markdown-flow-ui` |
| **[remark-flow](https://github.com/ai-shifu/remark-flow)** | A remark plugin to parse and process MarkdownFlow syntax in React applications | GitHub | `npm install remark-flow` |
| **[markdown-it-flow](https://github.com/ai-shifu/markdown-it-flow)** | A markdown-it plugin to parse and render MarkdownFlow syntax (Coming soon) | GitHub | Coming soon |
| **[markdown-flow-agent-py](https://github.com/ai-shifu/markdown-flow-agent-py)** | A Python library to transform MarkdownFlow documents into personalized content | GitHub | `pip install markdown-flow-agent` |
| **[markdown-flow-agent-go](https://github.com/ai-shifu/markdown-flow-agent-go)** | A Go library to transform MarkdownFlow documents into personalized content (Coming soon) | GitHub | `go get github.com/ai-shifu/markdown-flow-agent-go` |

## Integration Approaches

### Frontend Integration

- **React**: Use `markdown-flow-ui` for complete components or `remark-flow` for react-markdown integration
- **Vue.js/Vanilla**: Planned support via `markdown-it-flow` parser integration (coming soon)
- **Best for**: Static sites, simple personalization, client-side processing

### Backend Integration  

- **Python**: Use `markdown-flow-agent-py` for FastAPI/Django applications
- **Go**: Use `markdown-flow-agent-go` for high-performance services
- **Best for**: Server-side rendering, API services, complex AI processing

### Full-Stack Integration

- Combine frontend components with backend processing
- **Best for**: Production applications, scalable personalization, user data integration

## Getting Started

1. **Choose your SDK** from the table above based on your technology stack
2. **Visit the GitHub repository** for your chosen project
3. **Follow the README and documentation** in each repository for detailed setup instructions
4. **Try our [Playground](https://play.mdflow.run)** to experiment with MarkdownFlow syntax

For complete setup guides, code examples, configuration options, and troubleshooting, see each project's GitHub repository documentation.

## What's Next?

- **🎮 [Try the Playground](https://play.mdflow.run)** - Experiment with MarkdownFlow syntax
- **📚 [SDK Documentation](../sdks/index.md)** - Browse all available libraries
- **🚀 [Quick Start](quick-start.md)** - Build your first interactive document
