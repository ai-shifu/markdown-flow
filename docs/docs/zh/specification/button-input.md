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

- MarkdownFlow 会查看当前按钮块内首先出现的分隔符
- 第一个是 `|` → 该按钮块是单选（类似 "单选按钮"）
- 第一个是 `||` → 该按钮块是多选（类似 "复选框"）
- 同一份文档里可以同时包含单选和多选块，因为每个块单独判断模式
- 单选返回单个值，多选返回值数组

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

### 8. 社区活动的多选

```markdown
邀请居民挑选最期待的社区日活动。

?[%{{activities}} 手工课堂||现场音乐||美食车||亲子故事时间||小动物互动||户外游戏]

根据选择的活动 {{activities}} 描述当天重点安排。
```

指示 AI 一次性收集多项兴趣，让活动策划贴近居民需求。

### 9. 带文本输入的多选

```markdown
征集参与者心仪的茶歇选择。

?[%{{snacks}} 新鲜水果||茶||咖啡||糕点||...补充其他想法]

总结他们的偏好 {{snacks}} 并确认准备方式。
```

指示 AI 既提供常见按钮又保留文本输入，让人们自由提出额外需求。

### 10. 单选与多选组合的欢迎表单

```markdown
收集信息以欢迎新成员加入学习小组。

询问他们喜欢的支持方式（单选）：
?[%{{support_style}} 步骤指导//guide | 短视频提示//video | 直播交流//live | 自主阅读材料//articles]

让他们勾选想要关注的主题（多选）：
?[%{{topics}} 时间管理||职业转换||身心健康||创意项目||理财规划]

了解他们的参与时间：
?[%{{availability}} 工作日//weekdays | 工作日晚间//weeknights | 周末//weekends | 时间灵活//flexible]

说明学习小组如何依据 {{support_style}}、{{topics}} 和 {{availability}} 制定个性化安排。
```

指示 AI 在一次流程中获取不同类型的信息，让欢迎内容温暖又实用。

## 单选与多选的处理原则

### 分隔符识别规则

1. **以块为单位判断**：每个 `?[ ... ]` 按钮块会读取自身内部首先出现的分隔符来决定选择模式
2. **块内容容错**：一旦模式确定，即便后面混入不同分隔符也不会改变
   - `A||B|C` → 多选模式（因为该块首先出现的是 `||`）
   - `A|B||C` → 单选模式（因为该块首先出现的是 `|`）
3. **允许混合块**：文档可以同时包含单选块和多选块，示例 10 展示了这种组合用法。

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
