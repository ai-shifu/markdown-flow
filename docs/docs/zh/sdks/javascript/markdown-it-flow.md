# markdown-it-flow

一个 markdown-it 插件，为任何基于 markdown-it 的应用程序添加 MarkdownFlow 语法支持。

## 安装

```bash
npm install markdown-it markdown-it-flow
# 或
yarn add markdown-it markdown-it-flow
# 或
pnpm add markdown-it markdown-it-flow
```

## 快速开始

```javascript
const MarkdownIt = require("markdown-it");
const markdownItFlow = require("markdown-it-flow");

const md = new MarkdownIt();
md.use(markdownItFlow);

const html = md.render(`
# Hello {{user_name}}!

Choose your theme:
?[%{{theme}}Light|Dark|Auto]
`);
```

## 配置

### 插件选项

```javascript
const options = {
  variableClass: "flow-variable", // 变量的 CSS 类名
  inputClass: "flow-input", // 输入框的 CSS 类名
  instructionClass: "flow-instruction", // AI 指令的 CSS 类名
  enableVariables: true, // 启用变量解析
  enableInputs: true, // 启用用户输入解析
  enableInstructions: true, // 启用 AI 指令解析
  variableRenderer: null, // 自定义变量渲染器
  inputRenderer: null, // 自定义输入框渲染器
  instructionRenderer: null, // 自定义指令渲染器
};

md.use(markdownItFlow, options);
```

## 使用示例

### 基础 HTML 生成

```javascript
const md = new MarkdownIt().use(markdownItFlow);

const markdown = `
Welcome {{user_name}}!

What's your experience level?
?[%{{level}}Beginner|Intermediate|Advanced]

Generate content appropriate for {{level}} level.
`;

const html = md.render(markdown);
// 输出：带有适当类名和数据属性的 HTML
```

### Vue.js 集成

```vue
<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script>
import MarkdownIt from "markdown-it";
import markdownItFlow from "markdown-it-flow";

export default {
  data() {
    return {
      markdown: "# Hello {{name}}!",
      variables: { name: "Vue User" },
    };
  },
  computed: {
    renderedMarkdown() {
      const md = new MarkdownIt().use(markdownItFlow);
      let html = md.render(this.markdown);

      // 替换变量
      Object.entries(this.variables).forEach(([key, value]) => {
        html = html.replace(
          new RegExp(
            `<span class="flow-variable" data-var="${key}">.*?</span>`,
            "g",
          ),
          `<span class="flow-variable">${value}</span>`,
        );
      });

      return html;
    },
  },
};
</script>
```

### Angular 集成

```typescript
import { Component } from "@angular/core";
import MarkdownIt from "markdown-it";
import markdownItFlow from "markdown-it-flow";

@Component({
  selector: "app-markdown",
  template: '<div [innerHTML]="renderedHtml"></div>',
})
export class MarkdownComponent {
  private md = new MarkdownIt().use(markdownItFlow);

  markdown = "# Welcome {{user}}!";
  variables = { user: "Angular Developer" };

  get renderedHtml(): string {
    let html = this.md.render(this.markdown);

    // 处理变量
    Object.entries(this.variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      html = html.replace(regex, value as string);
    });

    return html;
  }
}
```

### 原生 JavaScript

```html
<!doctype html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it-flow/dist/markdown-it-flow.min.js"></script>
  </head>
  <body>
    <div id="content"></div>

    <script>
      const md = window.markdownit().use(window.markdownItFlow);

      const markdown = `
# Interactive Document

Hello {{user_name}}!

?[%{{choice}}Option A|Option B|Option C]
    `;

      const html = md.render(markdown);
      document.getElementById("content").innerHTML = html;

      // 添加交互性
      document.querySelectorAll(".flow-input").forEach((input) => {
        input.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON") {
            console.log("Selected:", e.target.textContent);
          }
        });
      });
    </script>
  </body>
</html>
```

## 自定义渲染器

### 变量渲染器

```javascript
const options = {
  variableRenderer: (tokens, idx) => {
    const token = tokens[idx];
    const varName = token.content;

    return `<input
      type="text"
      placeholder="${varName}"
      data-variable="${varName}"
      class="variable-input"
    />`;
  },
};

md.use(markdownItFlow, options);
```

### 输入框渲染器

```javascript
const options = {
  inputRenderer: (tokens, idx) => {
    const token = tokens[idx];
    const { variable, options } = token.meta;

    // 渲染为单选按钮
    let html = `<div class="input-group" data-variable="${variable}">`;
    options.forEach((option, i) => {
      html += `
        <label>
          <input type="radio" name="${variable}" value="${option}" />
          ${option}
        </label>
      `;
    });
    html += "</div>";

    return html;
  },
};
```

### 指令渲染器

```javascript
const options = {
  instructionRenderer: (tokens, idx) => {
    const token = tokens[idx];
    const instruction = token.content;

    return `
      <div class="ai-instruction" data-instruction="${escape(instruction)}">
        <i class="ai-icon"></i>
        <span>AI 将处理：${instruction}</span>
      </div>
    `;
  },
};
```

## 高级特性

### Token 处理

```javascript
// 解析后访问和修改 token
const md = new MarkdownIt().use(markdownItFlow);

const tokens = md.parse(markdown);

// 找到所有变量 token
const variableTokens = tokens.filter((token) => token.type === "flow_variable");

// 找到所有输入 token
const inputTokens = tokens.filter((token) => token.type === "flow_input");

// 使用修改后的 token 进行渲染
const html = md.renderer.render(tokens, md.options);
```

### 状态管理

```javascript
class MarkdownFlowDocument {
  constructor() {
    this.md = new MarkdownIt().use(markdownItFlow);
    this.variables = {};
    this.template = "";
  }

  setTemplate(markdown) {
    this.template = markdown;
    this.extractVariables();
  }

  extractVariables() {
    const tokens = this.md.parse(this.template);
    tokens.forEach((token) => {
      if (token.type === "flow_variable") {
        this.variables[token.content] = null;
      }
    });
  }

  setVariable(name, value) {
    this.variables[name] = value;
  }

  render() {
    let html = this.md.render(this.template);

    // 用值替换变量
    Object.entries(this.variables).forEach(([key, value]) => {
      if (value !== null) {
        const pattern = new RegExp(
          `<span class="flow-variable" data-var="${key}">.*?</span>`,
          "g",
        );
        html = html.replace(
          pattern,
          `<span class="flow-variable">${value}</span>`,
        );
      }
    });

    return html;
  }
}
```

### 事件处理

```javascript
function attachFlowEventHandlers(container) {
  // 处理变量输入
  container.querySelectorAll("[data-variable]").forEach((element) => {
    element.addEventListener("change", (e) => {
      const variable = e.target.dataset.variable;
      const value = e.target.value;
      console.log(`Variable ${variable} = ${value}`);
      // 在这里更新你的状态管理
    });
  });

  // 处理用户选择
  container.querySelectorAll(".flow-input button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const variable = e.target.parentElement.dataset.variable;
      const value = e.target.textContent;
      console.log(`Selected ${variable} = ${value}`);
      // 处理选择
    });
  });
}

// 使用方法
const html = md.render(markdown);
document.getElementById("content").innerHTML = html;
attachFlowEventHandlers(document.getElementById("content"));
```

## 样式

### 默认 CSS

```css
/* 变量 */
.flow-variable {
  color: #0066cc;
  font-weight: bold;
  padding: 2px 4px;
  background: #e8f4f8;
  border-radius: 3px;
}

/* 用户输入 */
.flow-input {
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.flow-input button {
  margin: 0.25rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.flow-input button:hover {
  background: #f0f0f0;
}

.flow-input button.selected {
  background: #0066cc;
  color: white;
}

/* AI 指令 */
.flow-instruction {
  border-left: 4px solid #4caf50;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #666;
}
```

## TypeScript 支持

```typescript
import MarkdownIt from "markdown-it";
import markdownItFlow, { MarkdownItFlowOptions } from "markdown-it-flow";

const options: MarkdownItFlowOptions = {
  variableClass: "custom-variable",
  enableVariables: true,
  variableRenderer: (tokens, idx) => {
    return `<span class="var">${tokens[idx].content}</span>`;
  },
};

const md: MarkdownIt = new MarkdownIt();
md.use(markdownItFlow, options);

const html: string = md.render(markdown);
```

## API 参考

### 插件方法

```javascript
// 主要插件函数
md.use(markdownItFlow, options);

// 访问插件状态
const flowState = md.flow;

// 获取解析的变量
const variables = flowState.getVariables();

// 获取解析的输入
const inputs = flowState.getInputs();

// 获取解析的指令
const instructions = flowState.getInstructions();
```

### Token 类型

```javascript
// 变量 token
{
  type: 'flow_variable',
  tag: 'span',
  content: 'variable_name',
  meta: {
    original: '{{variable_name}}'
  }
}

// 输入 token
{
  type: 'flow_input',
  tag: 'div',
  content: '',
  meta: {
    variable: 'choice',
    options: ['Option 1', 'Option 2', 'Option 3']
  }
}

// 指令 token
{
  type: 'flow_instruction',
  tag: 'div',
  content: 'AI instruction text',
  meta: {
    type: 'generate' // 或 'transform'、'conditional'
  }
}
```

### 实用函数

```javascript
import { utils } from "markdown-it-flow";

// 从文本中解析变量
const variables = utils.parseVariables(text);

// 从文本中解析用户输入
const inputs = utils.parseInputs(text);

// 验证 MarkdownFlow 语法
const isValid = utils.validateSyntax(text);

// 插值变量
const result = utils.interpolate(template, variables);
```

## 测试

```javascript
import MarkdownIt from "markdown-it";
import markdownItFlow from "markdown-it-flow";

describe("markdown-it-flow", () => {
  let md;

  beforeEach(() => {
    md = new MarkdownIt().use(markdownItFlow);
  });

  test("解析变量", () => {
    const html = md.render("Hello {{name}}!");
    expect(html).toContain('class="flow-variable"');
    expect(html).toContain('data-var="name"');
  });

  test("解析用户输入", () => {
    const html = md.render("?[%{{choice}}Yes|No]");
    expect(html).toContain('class="flow-input"');
    expect(html).toContain('data-variable="choice"');
  });

  test("自定义渲染器", () => {
    md = new MarkdownIt().use(markdownItFlow, {
      variableRenderer: () => "<custom-var></custom-var>",
    });

    const html = md.render("{{test}}");
    expect(html).toContain("<custom-var></custom-var>");
  });
});
```

## 性能

### 缓存

```javascript
class CachedMarkdownRenderer {
  constructor() {
    this.md = new MarkdownIt().use(markdownItFlow);
    this.cache = new Map();
  }

  render(markdown, variables = {}) {
    const cacheKey = `${markdown}:${JSON.stringify(variables)}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let html = this.md.render(markdown);

    // 应用变量
    Object.entries(variables).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
    });

    this.cache.set(cacheKey, html);
    return html;
  }

  clearCache() {
    this.cache.clear();
  }
}
```

### 流式处理

```javascript
// 按块处理大型文档
function* renderInChunks(markdown, chunkSize = 1000) {
  const lines = markdown.split("\n");
  const md = new MarkdownIt().use(markdownItFlow);

  for (let i = 0; i < lines.length; i += chunkSize) {
    const chunk = lines.slice(i, i + chunkSize).join("\n");
    yield md.render(chunk);
  }
}

// 使用方法
for (const htmlChunk of renderInChunks(largeMarkdown)) {
  // 处理每个块
  document.getElementById("content").innerHTML += htmlChunk;
}
```

## 迁移

### 从标准 markdown-it

```javascript
// 之前
const md = new MarkdownIt();
const html = md.render(markdown);

// 之后
const md = new MarkdownIt().use(markdownItFlow);
const html = md.render(markdown);
// 现在支持 MarkdownFlow 语法
```

### 与其他插件一起使用

```javascript
import MarkdownIt from "markdown-it";
import markdownItFlow from "markdown-it-flow";
import markdownItEmoji from "markdown-it-emoji";
import markdownItAnchor from "markdown-it-anchor";

const md = new MarkdownIt()
  .use(markdownItEmoji)
  .use(markdownItAnchor)
  .use(markdownItFlow); // 添加 MarkdownFlow 支持

// 所有插件一起工作
const html = md.render(markdown);
```

## 链接

- [GitHub Repository](https://github.com/ai-shifu/markdown-it-flow)
- [NPM Package](https://www.npmjs.com/package/markdown-it-flow)
- [markdown-it Documentation](https://github.com/markdown-it/markdown-it)
- [Issue Tracker](https://github.com/ai-shifu/markdown-it-flow/issues)
