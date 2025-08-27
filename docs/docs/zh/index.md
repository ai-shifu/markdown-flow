---
tags:
  - 快速开始
  - 简介
  - 概览
---

# 快速开始

## 什么是 MarkdownFlow？

MarkdownFlow（也称为 MDFlow 或 markdown-flow）通过 AI 智能技术扩展了标准 Markdown，用于创建个性化的交互式文档。标语：**“一次创作，千人千面”**。

您不再为读者编写静态内容，而是为 AI 智能体编写提示词。这些智能体将您的指令转化为个性化内容，能够适应每个用户的选择、偏好和上下文。

## 与 Markdown 完全兼容

**MarkdownFlow 不是 Markdown 的替代品——它是自然的扩展：**

- ✅ 所有标准 Markdown 语法都不变
- ✅ 所有 Markdown 扩展（表格、任务列表、脚注）都正常工作
- ✅ 现有 Markdown 文档无需修改即可在 MDFlow 中使用
- ✅ 您喜爱的 Markdown 编辑器和工具链继续工作

您可以从任何现有的 Markdown 文档开始，并根据需要逐步添加 MDFlow 功能。

## 三个简单扩展

MarkdownFlow 为标准 Markdown 添加了三个新的语法元素：

!!! tip "记住核心原则"
    下面的所有示例都显示了**AI 指令**，而非直接的用户内容。您为 AI 写提示词来生成个性化内容。

### 1. 变量：`{{variable}}`

动态内容占位符，会被实际值替换。

```markdown
为 {{user_name}} 生成一条欢迎消息，以友好的语气提及他们当前的
账户余额 {{balance}}。
```

**了解更多：** [变量规范](specification/variables.md)

### 2. 交互元素：`?[%{{variable}} 选项1 | 选项2]`

按钮和输入框，收集用户选择并将其存储在变量中。

```markdown
询问用户的经验水平并存储响应。
?[%{{level}} 初学者 | 中级 | 专家]

以友好的方式收集用户姓名。
?[%{{name}}...在此输入您的姓名]
```

**了解更多：** [按钮和输入规范](specification/button-input.md)

### 3. 确定内容：`===content===`

在 AI 处理过程中保持确切含义和风格的文本。

```markdown
介绍我们的企业价值观，确保保留确切的座右铭：
===创新通过简化===

提供安装说明，保留确切的命令：
===npm install markdown-flow===
```

**了解更多：** [确定输出规范](specification/preserved-output.md)

## 工作原理（简化版）

**MarkdownFlow 智能体**通过以下方式处理您的文档：

1. 读取您的 MDFlow 文档（AI 指令）
2. 通过变量整合读者的个性化信息
3. 使用这些组合指令调用大语言模型
4. 生成每个读者独有的个性化内容

**完整技术工作流程请参见：** [规范说明](specification/how-it-works.md)

## 下一步？

准备深入了解？请按照以下学习路径：

1. **[核心概念](getting-started/concepts.md)** - 了解基本原则
2. **[快速上手](getting-started/quick-start.md)** - 构建您的第一个交互式文档
3. **[立即试用](https://play.mdflow.run)** - 通过实际示例练习
4. **[下一步](getting-started/next-steps.md)** - 探索高级功能并获得帮助

或者直接跳转到我们的 **[5分钟快速上手](getting-started/quick-start.md)**！
