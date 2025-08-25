# 概览

MarkdownFlow 是 Markdown 的自然扩展，不是替代品。就像 GitHub Flavored Markdown (GFM) 或 CommonMark 扩展增强了原始 Markdown 一样，MarkdownFlow 在保持完全兼容性的同时添加了新功能。

## 与 Markdown 完全兼容

**您的所有 Markdown 知识和习惯仍然有效：**

- 所有标准 Markdown 语法保持不变
- 所有 Markdown 扩展（表格、任务列表、脚注等）正常工作
- 现有 Markdown 文档无需修改即可在 MarkdownFlow 中使用
- 您喜爱的 Markdown 编辑器和工具链继续工作

## 简单示例

这是一个标准 Markdown 文档：

```markdown
# 欢迎

这是一个**标准**的 Markdown 文档。

- 列表项 1
- 列表项 2

> 引用文本

[链接](https://example.com)
```

这个文档在 MarkdownFlow 中的行为完全相同。您不需要更改任何内容。

因此，您可以：

1. **从零开始**：直接将任何 Markdown 文档用作 MarkdownFlow 文档
2. **逐步添加**：根据需要添加 MarkdownFlow 功能
3. **自由混合**：在同一文档中结合标准 Markdown 和 MarkdownFlow 语法

## 添加 MarkdownFlow 功能

当您需要个性化或交互性时，只需添加 MarkdownFlow 的扩展语法：

```markdown
向 {{user_name}} 问好！

询问用户关于 Markdown 的**经验水平**，提供三个选项：初学者、中级、专家。

?[%{{level}} 初学者 | 中级 | 专家]

用户的经验水平是 {{level}}。

根据水平推荐进一步学习的资源：

- 如果是初学者："Markdown 入门"
- 如果是中级："精通 Markdown"
- 如果是专家：不用再学了，直接做就行
```

名为 John 的用户可能会从 MarkdownFlow 智能体得到这样的输出：

> 你好，John！
>
> 在我们深入之前，我想了解一下你对 Markdown 的经验，以便更好地定制我的帮助。你如何**描述你在 Markdown 方面的技能水平**？
>
> - 😊 **初学者**（刚开始或很少使用）
> - 🚀 **中级**（对标题、列表和链接等基础知识感到舒适）
> - 🧙 **专家**（了解高级语法如表格、脚注或 HTML 集成）
>
> 让我知道，我会相应地调整！😊

然后，出现三个按钮，用户选择"专家"。输出继续：

> 既然你处于**专家**级别，最好的方法确实是**"直接做就行"**——在实际项目中应用你的技能，为开源文档做贡献，甚至为他人创建高级 Markdown 指南。
>
> 如果你仍想突破界限，考虑：
>
> - 探索**扩展 Markdown 风格**（CommonMark、GitHub Flavored Markdown、Pandoc Markdown）。
> - 使用**脚本/工具**自动化 Markdown 工作流程（Pandoc、VS Code 扩展或自定义解析器）。
> - 编写**文档即代码**（将 Markdown 与静态站点生成器如 MkDocs 或 Jekyll 结合）。
>   但说实话？你已经掌握了。去构建一些很棒的东西吧。🚀

上面的示例使用了 MarkdownFlow 的[变量](variables.md)和[按钮](button-input.md)功能。

如果您想知道魔法是如何发生的，请查看[工作原理](how-it-works.md)部分。
