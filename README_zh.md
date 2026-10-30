# <img src="assets/logos/logo-color.svg" alt="MarkdownFlow Logo" height="28"> MarkdownFlow

> **一次创作，千人千面**

MarkdownFlow 通过 AI 扩展了标准 Markdown，用于创建个性化的交互式页面。您不再为读者编写静态内容，而是为 AI 智能体编写提示词，这些智能体将您的指令转化为个性化内容，适应每个用户的选择、偏好和上下文。

## ✨ MarkdownFlow 的特色

- **📝 与 Markdown 完全兼容** - 所有标准 Markdown 语法都不变
- **🤖 AI 驱动的个性化** - 为 AI 写提示词，而非为人类写内容
- **🎯 简单扩展** - 交互元素、确定内容和记忆
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
| [**markdown-flow-ui**](https://github.com/ai-shifu/markdown-flow-ui) | 用于渲染交互式 MarkdownFlow 文档的 React 组件库，包含内置 UI 元素。 | React/TypeScript | MIT |
| [**remark-flow**](https://github.com/ai-shifu/remark-flow) | 用于在 React 应用中解析和处理 MarkdownFlow 语法的 remark 插件。 | TypeScript | MIT |
| [**markdown-it-flow**](https://github.com/ai-shifu/markdown-it-flow) | 用于解析和渲染 MarkdownFlow 语法的 markdown-it 插件。（即将推出） | TypeScript | MIT |

### 后端实现

| 项目 | 描述 | 语言 | 许可证 |
|------|------|------|--------|
| [**markdown-flow-agent-py**](https://github.com/ai-shifu/markdown-flow-agent-py) | 用于将 MarkdownFlow 文档转换为个性化内容的 Python 库。 | Python | MIT |
| [**markdown-flow-agent-go**](https://github.com/ai-shifu/markdown-flow-agent-go) | 用于将 MarkdownFlow 文档转换为个性化内容的 Go 库。（即将推出） | Go | MIT |

### 核心文档

| 项目 | 描述 | 许可证 |
|------|------|--------|
| [**markdown-flow**](https://github.com/ai-shifu/markdown-flow) | 主仓库，包含首页、文档和交互式 Playground。 | CC |

## 📖 快速上手

MarkdownFlow 为标准 Markdown 添加了交互、确定内容和记忆：

### 1. 交互元素：`?[选项1 | 选项2]`

按钮和输入框用于收集用户选择。在同一文档内，后续提示词可以自然引用之前的回答。

```markdown
询问用户的经验水平：
?[初学者 | 中级 | 专家]

根据用户刚才选择的经验水平生成建议。

收集用户姓名：
?[...在此输入您的姓名]
```

### 2. 确定内容：`===content===`

在 AI 处理过程中保持确切含义的文本。

```markdown
介绍我们的企业价值观，确保保留确切的座右铭：
===创新通过简化===
```

### 3. 记忆：`{{问题}}`

记忆以问题和回答的形式保存信息。在交互开头添加问题以保存回答，再在后续提示词中引用同一个问题：

```markdown
询问用户的学习目标：
?[{{你想学习什么？}} Python | JavaScript | ...其他主题]

根据 {{你想学习什么？}} 的回答制定学习计划。
```

AI 将记住的回答作为上下文。保存位置和可访问这些回答的文档范围由宿主平台决定。详见[记忆规范](https://markdownflow.ai/docs/zh/specification/memory/)。

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
