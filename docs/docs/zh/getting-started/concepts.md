# 核心概念

了解这些关键概念将帮助您创建有效的 MarkdownFlow 文档。

## 为 AI 写提示词，而非为人类写内容

!!! info "思维转变"
    最重要的概念：您的内容不是直接面向读者的——而是 AI 的提示词。

**传统 Markdown：**

```markdown
Python 是一种以简洁著称的高级编程语言。
它由 Guido van Rossum 于 1991 年创建。
```

**MarkdownFlow：**

```markdown
向一位对 {{use_case}} 感兴趣的 {{level}} 程序员解释 Python，
重点强调与他们背景最相关的方面。
```

MDFlow 版本为每个用户生成个性化解释，而传统 Markdown 向所有人显示相同内容。

## 文档结构

每个 MarkdownFlow 文档都有两个部分：

**内容提示词** - 您的主要文档内容，包含 AI 指令和 MarkdownFlow 语法。

**文档提示词** - 可选的全局设置，控制整个文档的处理方式：

```markdown
语言：适应 {{browser_language}}
语气：专业但友好
风格：清晰简洁
```

## 下一步？

现在您已经了解了核心概念，让我们将其付诸实践：

**[快速上手 →](quick-start.md)**

构建您的第一个交互式文档，看看这些概念如何运作。
