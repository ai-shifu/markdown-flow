# 集成指南

了解如何将 MarkdownFlow 集成到您现有的应用程序中。选择最适合您架构和需求的集成方式。

## 开源项目

MarkdownFlow 的所有功能都通过我们的开源 SDK 和库提供。每个项目都维护着包含示例、教程和 API 参考的完整文档。

| 项目 | 描述 | 仓库 | 安装 |
|------|------|------|------|
| **[markdown-flow-ui](https://github.com/ai-shifu/markdown-flow-ui)** | 用于渲染交互式 MarkdownFlow 文档的 React 组件库，包含内置 UI 元素 | GitHub | `npm install markdown-flow-ui` |
| **[remark-flow](https://github.com/ai-shifu/remark-flow)** | 用于在 React 应用中解析和处理 MarkdownFlow 语法的 remark 插件 | GitHub | `npm install remark-flow` |
| **[markdown-it-flow](https://github.com/ai-shifu/markdown-it-flow)** | 用于解析和渲染 MarkdownFlow 语法的 markdown-it 插件（即将推出） | GitHub | `npm install markdown-it-flow` |
| **[markdown-flow-agent-py](https://github.com/ai-shifu/markdown-flow-agent-py)** | 用于将 MarkdownFlow 文档转换为个性化内容的 Python 库 | GitHub | `pip install markdown-flow-agent` |
| **[markdown-flow-agent-go](https://github.com/ai-shifu/markdown-flow-agent-go)** | 用于将 MarkdownFlow 文档转换为个性化内容的 Go 库（即将推出） | GitHub | `go get github.com/ai-shifu/markdown-flow-agent-go` |

## 集成方式

### 前端集成

- **React**: 使用 `markdown-flow-ui` 获得完整组件，或使用 `remark-flow` 集成 react-markdown
- **Vue.js/Vanilla**: 使用 `markdown-it-flow` 进行解析器集成
- **适用于**: 静态站点、简单个性化、客户端处理

### 后端集成  

- **Python**: 使用 `markdown-flow-agent-py` 构建 FastAPI/Django 应用
- **Go**: 使用 `markdown-flow-agent-go` 构建高性能服务
- **适用于**: 服务端渲染、API 服务、复杂的 AI 处理

### 全栈集成

- 结合前端组件和后端处理
- **适用于**: 生产应用程序、可扩展的个性化、用户数据集成

## 开始使用

1. **选择您的 SDK** - 根据您的技术栈从上表中选择
2. **访问 GitHub 仓库** - 查看您选择的项目
3. **遵循 README 和文档** - 每个仓库中都有详细的安装指南
4. **试用我们的[体验台](https://play.mdflow.run)** - 体验 MarkdownFlow 语法

完整的安装指南、代码示例、配置选项和故障排除，请参阅各个项目的 GitHub 仓库文档。

## 下一步？

- **🎮 [试用体验台](https://play.mdflow.run)** - 体验 MarkdownFlow 语法
- **📚 [SDK 文档](../sdks/index.md)** - 浏览所有可用的库
- **🚀 [快速上手](quick-start.md)** - 构建您的第一个交互式文档
