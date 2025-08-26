---
tags:
  - Variables
  - Syntax
  - Core Features
---

# 变量

## 在 MarkdownFlow 中使用变量

变量是 MarkdownFlow 动态内容的基础。它们充当占位符，在处理过程中被实际值替换，从而实现个性化和上下文感知的文档。

## 基本语法

变量使用双大括号：

```markdown
{{variable_name}}
```

**简单示例：**

```markdown
Say hello to {{user_name}}! Tell the user the account balance is {{balance}}.
```

## 变量命名规则

变量名称**区分大小写**，必须遵循以下规则：

- **可以包含**：字母（包括中文、日文等 Unicode 字母）、数字和下划线
- **不能包含**：特殊字符、空格、标点符号或 `}` 字符
- **不能为空**：必须至少包含一个字符
- **大括号与名称之间不能有空格**：`{{ var }}` 不会被识别为变量

### 有效的变量名称

```markdown
{{name}} ✓ 简单字母
{{userName}} ✓ 驼峰命名法
{{user_name}} ✓ 下划线命名法
{{UserName}} ✓ 帕斯卡命名法
{{user123}} ✓ 包含数字
{{_private}} ✓ 以下划线开头
{{CONSTANT}} ✓ 全大写
{{a}} ✓ 单个字符
{{123user}} ✓ 以数字开头
{{用户名}} ✓ Unicode 字符（中文）
{{ユーザー}} ✓ Unicode 字符（日文）
{{пользователь}} ✓ Unicode 字符（俄文）
{{utilisateur}} ✓ Unicode 字符（法文）
```

### 无效的变量名称

```markdown
{{user}name}} ✗ 包含 } 字符
{{user name}} ✗ 名称内包含空格
{{user-name}} ✗ 包含连字符
{{user.name}} ✗ 包含点号
{{user@email}} ✗ 包含特殊字符
{{🚀rocket}} ✗ 包含表情符号
{{name[0]}} ✗ 包含方括号
{{user+id}} ✗ 包含加号
{{}} ✗ 空变量
{{   }} ✗ 只有空格
{{ name }} ✗ 大括号与名称之间有空格（不会被识别为变量）
{{ name}} ✗ 名称前有空格（不会被识别为变量）
{{name }} ✗ 名称后有空格（不会被识别为变量）
```

## 变量如何工作

### 1. 声明和赋值

变量从多个来源获取它们的值：

**用户输入：**

```markdown
Ask the user for their name politely.
?[%{{name}} ...Enter your name]

Generate a warm, personalized greeting for {{name}}.
```

**系统预定义变量：**

系统变量由平台预先赋值，可以直接使用而无需任何用户输入。不同平台提供不同的系统变量：

**[MarkdownFlow Playground](https://play.mdflow.run)：**

- `{{browser_language}}` - 用户的浏览器语言（例如 "en-US"、"zh-CN"）

**[AI-Shifu Platform](https://ai-shifu.com)：**

- `{{sys_user_nickname}}` - 用户的显示名称
- `{{sys_user_style}}` - 用户偏好的内容风格
- `{{sys_user_background}}` - 用户的背景信息
- `{{sys_user_language}}` - 用户的语言偏好

### 2. 变量替换

在 LLM 处理内容之前，MarkdownFlow 智能体会用实际值替换所有变量：

```markdown
之前："Generate a personalized greeting for {{user_name}} who is learning {{topic}} at {{level}} level."
之后："Generate a personalized greeting for Alice who is learning Python at beginner level."
```

然后 LLM 处理这个解析后的提示词，为读者生成实际内容。

### 3. 未赋值的变量

如果变量尚未赋值，它会被替换为 "UNKNOWN"：

```markdown
之前："Create content for {{user_type}} interested in {{topic}}."
之后："Create content for UNKNOWN interested in UNKNOWN."
```

**重要提示：** 在使用变量之前，请始终为变量赋值，通常通过用户输入或系统默认值来实现，以避免提示词中出现 "UNKNOWN"。当 LLM 在提示词中接收到 "UNKNOWN" 时，其输出可能是随机且不可预测的，无法满足您的期望。

## 不同上下文中的变量

变量在文档中的任何地方都可以工作：

### 在文本中

```markdown
Create a personalized welcome message for {{username}} that feels warm and familiar.
```

### 在标题中

```markdown
# Chapter {{chapter_number}}: {{chapter_title}}
```

### 在列表中

```markdown
Summarize the user's product selections in a clear list format:
- Their chosen color: {{selected_color}}
- Their selected size: {{selected_size}}  
- The quantity they want: {{quantity}}
```

### 在链接和图片中

```markdown
[Visit {{site_name}}]({{site_url}})
![{{image_description}}]({{image_path}})
```

### 在表格中

```markdown
Create a formatted table showing the user's account information:
| Property | Value                 |
| -------- | --------------------- |
| Name     | {{user_name}}         |
| Email    | {{user_email}}        |
| Plan     | {{subscription_plan}} |
```

### 在 HTML 中

```html
<div class="{{theme_class}}">
  <span id="user-{{user_id}}">{{display_name}}</span>
</div>
```
