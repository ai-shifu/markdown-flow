# <img src="assets/logos/logo-color.svg" alt="MarkdownFlow Logo" height="28"> MarkdownFlow

> **一次创作，千人千面**

MarkdownFlow 通过 AI 智能技术扩展了标准 Markdown，用于创建个性化的交互式页面。您不再为读者编写静态内容，而是为 AI 智能体编写提示词，这些智能体将您的指令转化为个性化内容，适应每个用户的选择、偏好和上下文。

## ✨ MarkdownFlow 的特色

- **📝 与 Markdown 完全兼容** - 所有标准 Markdown 语法都不变
- **🤖 AI 驱动的个性化** - 为 AI 写提示词，而非为人类写内容
- **🎯 三个简单扩展** - 变量、交互元素和确定内容
- **🌍 多语言支持** - 为国际用户群体而构建

## 🚀 快速链接

| 资源 | 描述 | 链接 |
|------|------|------|
| **🌐 官方网站** | 项目主页和概览 | [markdownflow.ai](https://markdownflow.ai) |
| **🎮 体验台** | 交互式体验 MarkdownFlow | [play.mdflow.run](https://play.mdflow.run) |
| **📚 文档** | 完整指南和参考 | [markdownflow.ai/docs](https://markdownflow.ai/docs) |

## 🔧 开源项目

### 前端库

| 项目 | 描述 | 语言 | 许可证 |
|------|------|------|--------|
| [**markdown-flow-ui**](https://github.com/ai-shifu/markdown-flow-ui) | 具有内置功能的完整 UI 组件。为交互式 markdown 文档提供即用的 React 组件。 | React/TypeScript | MIT |
| [**remark-flow**](https://github.com/ai-shifu/remark-flow) | MarkdownFlow 语法的 React-markdown 插件。通过变量处理和 AI 集成扩展 react-markdown。 | TypeScript | MIT |
| [**markdown-it-flow**](https://github.com/ai-shifu/markdown-it-flow) | MarkdownFlow 语法的 Markdown-it 插件。为任何基于 markdown-it 的应用程序添加 MarkdownFlow 功能。 | TypeScript | MIT |

### 后端实现

| 项目 | 描述 | 语言 | 许可证 |
|------|------|------|--------|
| [**markdown-flow-agent-py**](https://github.com/ai-shifu/markdown-flow-agent-py) | Python 后端实现。基于 FastAPI 的服务器，具有模板处理和大语言模型集成功能。 | Python | MIT |
| [**markdown-flow-agent-go**](https://github.com/ai-shifu/markdown-flow-agent-go) | Go 后端实现。高性能服务器，具有并发处理和最小资源使用。 | Go | MIT |

### 核心文档

| 项目 | 描述 | 许可证 |
|------|------|--------|
| [**markdown-flow**](https://github.com/ai-shifu/markdown-flow) | 主要文档、网站和开发平台。展示 MarkdownFlow 功能的交互式演示。 | CC |

## 📖 快速上手

MarkdownFlow 为标准 Markdown 添加了三个简单扩展：

### 1. 变量：`{{variable}}`

动态内容占位符，会被实际值替换。

```markdown
为 {{user_name}} 生成一条欢迎消息，以友好的语气提及他们当前的
账户余额 {{balance}}。
```

### 2. 交互元素：`?[%{{variable}} 选项1 | 选项2]`

收集用户选择的按钮和输入框。

```markdown
询问用户的经验水平：
?[%{{level}} 初学者 | 中级 | 专家]

收集用户姓名：
?[%{{name}}...在此输入您的姓名]
```

### 3. 确定内容：`===content===`

在 AI 处理过程中保持确切含义的文本。

```markdown
介绍我们的企业价值观，确保保留确切的座右铭：
===创新通过简化===
```

## 🌟 使用场景

- **📚 教育** - 根据学生水平调整的个性化学习材料
- **✍️ 内容创作** - 根据读者背景知识调整技术术语的文章
- **📰 新闻媒体** - 根据读者兴趣从不同角度展开的新闻报道
- **🎮 交互式叙事** - 选择影响情节方向的互动叙事体验

## 🎯 开始使用

1. **[📖 核心概念](https://markdownflow.ai/docs/zh/getting-started/concepts/)** - 了解基本原则
2. **[⚡ 5分钟快速上手](https://markdownflow.ai/docs/zh/getting-started/quick-start/)** - 构建您的第一个交互式文档
3. **[🎮 体验台](https://play.mdflow.run)** - 通过实际示例练习
4. **[🚀 集成指南](https://markdownflow.ai/docs/zh/getting-started/integration/)** - 添加到您的项目

## 📄 许可证

本项目采用知识共享许可证。各个组件有自己的许可证（大多数库为 MIT）。

## 🏢 关于

由 **AI Shifu, LLC** 创建 • © 2025

---

**核心理念**: 为 AI 写提示词，而非为人类写内容
