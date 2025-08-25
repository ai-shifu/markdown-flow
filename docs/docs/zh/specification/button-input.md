---
tags:
  - Interactive
  - Buttons
  - Input
  - User Interface
---

# 按钮和输入

## MarkdownFlow 中的交互元素

MarkdownFlow 提供了强大而简洁的语法来创建交互元素以收集用户输入。这些交互会暂停内容投放，等待用户响应，然后根据输入继续投放个性化内容。

## 基本语法

交互元素的完整语法是：

```text
?[%{{variable}} Button1//id1 | Button2//id2 | ButtonN//idN | ...input hint]
```

**每个组件都是可选的**，让您能够灵活创建所需的确切交互。

## 理解各个组件

让我们逐步分解语法：

### 框架：`?[` 和 `]`

每个交互元素都以 `?[` 开始，以 `]` 结束。这些括号是**必需的**，标记了交互元素的边界：

```markdown
?[...内容放在这里...]
```

### 变量：`%{{variable}}` vs `{{variable}}`

`%` 符号决定变量的行为方式：

**带 `%` - 写入模式（存储输入）：**

```markdown
?[%{{choice}} Yes | No]
```

当用户点击 "Yes" 时，值 "Yes" 被存储到 `{{choice}}` 中。

**不带 `%` - 读取模式（使用变量值）：**

```markdown
?[{{userName}}, click here to continue]
```

如果 `{{userName}}` 包含 "Alice"，按钮显示："Alice, click here to continue"

**不使用变量：**

```markdown
?[ Continue ]
```

这创建了一个简单的 "Continue" 按钮，只是恢复内容流而不存储任何值。

### 按钮：文本和 ID

按钮由管道符 `|` 分隔。您可以有 0 到 10 个按钮。

**简单按钮（文本成为值）：**

```markdown
?[%{{color}} Red | Green | Blue]
```

点击 "Red" 将 "Red" 存储到 `{{color}}` 中。

**带 ID 的按钮（ID 成为值）：**

```markdown
?[%{{size}} Small//S | Medium//M | Large//L]
```

- 显示："Small"，"Medium"，"Large"
- 存储的值："S"，"M"，"L"

当您想要用户友好的显示文本但需要特定值进行处理时，这很有用。

### 文本适应和 ID

**重要**：按钮文本和输入提示由 LLM 处理，可能会根据文档要求或用户偏好进行适应（翻译、重新表述等）。

**不带 ID - 适应的值：**

```markdown
?[%{{action}} Continue | Cancel]
```

- 英语用户看到："Continue"，"Cancel" → 存储 "Continue" 或 "Cancel"
- 中文用户看到："继续"，"取消" → 存储 "继续" 或 "取消"

**带 ID - 固定值：**

```markdown
?[%{{action}} Continue//continue | Cancel//cancel]
```

- 英语用户看到："Continue"，"Cancel" → 存储 "continue" 或 "cancel"
- 中文用户看到："继续"，"取消" → 存储 "continue" 或 "cancel"

**当您需要一致的值进行后端处理或条件逻辑时，使用 ID。**

### 输入框：`...input hint`

通过使用 `...` 后跟输入提示来添加文本输入框：

```markdown
?[%{{name}} ...Enter your name]
```

创建一个以 "Enter your name" 作为输入提示的输入框。

## 渐进式示例

### 1. 最简形式 - 仅继续

```markdown
Write an engaging story introduction for {{genre}} enthusiasts.

?[Continue]

Continue the story with an exciting development that hooks the reader.
```

指示 AI 暂停内容投放，让用户控制阅读节奏。

### 2. 基本选择

```markdown
Ask the user if they want to proceed with the {{task_type}}.

?[%{{answer}} Yes | No ]

Respond to their choice: {{answer}}. If yes, encourage them. If no, offer alternatives.
```

指示 AI 询问决策问题并根据用户选择做出适当回应。

### 3. 多个选项

```markdown
Present difficulty options for {{activity_type}} to the user.

?[%{{level}} Easy | Normal | Hard | Expert ]

Confirm their {{level}} choice and explain what this level entails for {{activity_type}}.
```

指示 AI 提供多个难度级别并提供适合级别的解释。

### 4. 不同值的按钮

```markdown
Present subscription options for {{service_name}} with clear value propositions.

?[%{{plan}} Free//free_tier | Pro ($9/mo)//pro_monthly | Enterprise ($99/mo)//enterprise ]

Confirm their plan selection and explain the benefits of the {{plan}} tier.
```

指示 AI 展示定价选项，使用用户友好的标签同时存储一致的后端标识符。

### 5. 仅文本输入

```markdown
Welcome the user to {{platform_name}} and ask for their name in a friendly way.

?[%{{username}}...Type your name here]

Greet {{username}} personally and explain the next steps for {{platform_name}}.
```

指示 AI 收集用户信息并提供个性化回应。

### 6. 组合按钮和输入

```markdown
Ask how the user prefers to be addressed in {{context}}.

?[%{{title}} Mr. | Ms. | Dr. | ...Other (please specify)]

Acknowledge their preference ({{title}}) and use it appropriately throughout {{context}}.
```

指示 AI 提供常见选项，同时允许自定义输入以进行个性化称呼。

### 7. 复杂交互表单

```markdown
Introduce the personalization process for {{course_topic}}.

Ask for the user's name in a welcoming way:
?[%{{name}}...Enter your name]

Ask about their experience level with {{course_topic}}:
?[%{{level}} Beginner//1 | Intermediate//2 | Advanced//3]

Inquire about their preferred learning approach:
?[%{{style}} Visual | Reading | Practice | All]

Confirm the personalization: address {{name}} by name, acknowledge their {{level}} level, and explain how you'll deliver {{style}} content for {{course_topic}}.
```
