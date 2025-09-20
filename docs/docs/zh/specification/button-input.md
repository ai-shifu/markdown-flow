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

## 单选与多选

MarkdownFlow 支持两种选择模式：

**单选模式（传统）**：使用单竖线 `|` 分隔选项

```markdown
?[%{{language}} Python | JavaScript | Go]
```

**多选模式（新增）**：使用双竖线 `||` 分隔选项

```markdown
?[%{{skills}} Python||JavaScript||Go||Rust]
```

**选择模式的确定规则**：

- 文档中第一个出现的分隔符类型决定整个交互的模式
- `A||B|C` 会被识别为多选模式（因为 `||` 先出现）
- `A|B||C` 会被识别为单选模式（因为 `|` 先出现）
- 单选返回单个值，多选返回值的数组

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

按钮由管道符分隔。您可以有 0 到 10 个按钮。根据分隔符类型决定选择模式：

**单选按钮（使用单竖线 `|`）：**

```markdown
?[%{{color}} Red | Green | Blue]
```

点击 "Red" 将 "Red" 存储到 `{{color}}` 中。

**多选按钮（使用双竖线 `||`）：**

```markdown
?[%{{skills}} Python||JavaScript||Go||Rust]
```

用户可以选择多个选项，选中的值以数组形式存储到 `{{skills}}` 中，如 `["Python", "JavaScript"]`。

**带 ID 的按钮（ID 成为值）：**

```markdown
?[%{{size}} Small//S | Medium//M | Large//L]
```

- 显示："Small"，"Medium"，"Large"
- 存储的值："S"，"M"，"L"

多选模式同样支持 ID：

```markdown
?[%{{frameworks}} React//react||Vue//vue||Angular//angular]
```

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
介绍 {{course_topic}} 的个性化过程。

以欢迎的方式询问用户的姓名：
?[%{{name}}...Enter your name]

询问他们对 {{course_topic}} 的经验水平：
?[%{{level}} Beginner//1 | Intermediate//2 | Advanced//3]

询问他们偏好的学习方式：
?[%{{style}} Visual | Reading | Practice | All]

确认个性化设置：按姓名称呼 {{name}}，认可他们的 {{level}} 水平，并解释如何为 {{course_topic}} 提供 {{style}} 内容。
```

指示 AI 收集多个方面的用户信息并提供全面的个性化回应。

### 8. 多选技能选择

```markdown
询问用户掌握的编程语言以制定个性化学习计划。

?[%{{skills}} Python||JavaScript||Go||Rust||Java||C++]

根据他们选择的技能组合 {{skills}} 推荐合适的学习路径和项目。
```

指示 AI 收集用户的多项技能信息，并基于技能组合提供个性化建议。

### 9. 带文本输入的多选

```markdown
了解开发者使用的前端框架经验以提供针对性指导。

?[%{{frameworks}} React||Vue||Angular||Svelte||...请指定其他]

基于用户熟悉的框架 {{frameworks}} 提供最佳实践和迁移建议。
```

指示 AI 使用多选模式收集框架信息，同时提供文本输入备选方案。

### 10. 混合单选与多选的综合表单

```markdown
收集用户的开发背景信息以定制培训内容。

询问主要编程角色（单选）：
?[%{{role}} Frontend//fe | Backend//be | Fullstack//fs | DevOps//ops]

选择感兴趣的技术领域（多选）：
?[%{{interests}} Web开发||移动开发||数据科学||人工智能||云计算||区块链]

询问首选的学习时间安排：
?[%{{schedule}} Weekday//weekday | Weekend//weekend | Evening//evening | Flexible//flexible]

基于用户的角色 {{role}}、兴趣领域 {{interests}} 和时间安排 {{schedule}} 制定个性化的学习计划。
```

指示 AI 组合使用单选和多选来收集不同类型的用户信息，并据此提供综合性建议。

## 单选与多选的处理原则

### 分隔符识别规则

1. **第一个分隔符决定模式**：文档中第一个出现的分隔符类型决定整个交互的选择模式
2. **容错处理**：混合使用分隔符时，以先出现者为准
   - `A||B|C` → 多选模式（因为 `||` 先出现）
   - `A|B||C` → 单选模式（因为 `|` 先出现）

### 返回值格式

- **单选**：返回单个字符串值

  ```
  {{color}} = "Red"
  ```

- **多选**：返回字符串数组

  ```
  {{skills}} = ["Python", "JavaScript", "Go"]
  ```

### 使用建议

- **使用单选**：当用户只能选择一个选项时（如难度级别、账户类型）
- **使用多选**：当用户可以选择多个选项时（如技能列表、兴趣爱好）
- **保持一致性**：同一文档中的相似交互应使用相同的分隔符类型
- **添加文本输入**：在多选后添加 `...` 提供额外的自定义选项
