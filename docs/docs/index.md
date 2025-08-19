# Welcome to MarkdownFlow Documentation

> **The HTML of the AI Era** - A document format that humans, code, and AI can all read and write.

## Quick Navigation

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">

<div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">

### 🚀 [Getting Started](getting-started/index.md)
New to MarkdownFlow? Start here!
- What is MarkdownFlow
- 5-minute quickstart
- Installation guides

</div>

<div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">

### 📖 [Specification](specification/index.md)
Formal syntax and rules
- Variable syntax
- User input format
- AI instructions

</div>

<div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">

### 🛠️ [SDKs](sdks/index.md)
Libraries for every stack
- React, Vue, JavaScript
- Python backend
- Go backend

</div>

<div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">

### 💡 [Examples](examples/index.md)
Real-world use cases
- Interactive education
- Smart documentation
- Dynamic forms

</div>

<div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">

### 🌐 [Ecosystem](ecosystem/index.md)
Community & integrations
- Official tools
- Community projects
- Commercial products

</div>

</div>

## What is MarkdownFlow?

MarkdownFlow is a superset of Markdown that adds three powerful features:

### 1. Variables `{{name}}`
Replace placeholders with dynamic content:
```markdown
Hello {{user_name}}, welcome to {{app_name}}!
```

### 2. User Input `?[#{{choice}}Yes|No]`
Create interactive elements:
```markdown
What's your experience level?
?[#{{level}}Beginner|Intermediate|Advanced]
```

### 3. AI Instructions
Embed instructions for AI processing:
```markdown
<!-- AI: Generate a summary appropriate for {{level}} readers -->
```

## Why MarkdownFlow?

### For Developers
- **Simple**: Extends familiar Markdown syntax
- **Flexible**: Works with any tech stack
- **Powerful**: Full programmatic control

### For Content Creators
- **Readable**: Looks like regular Markdown
- **Dynamic**: Content adapts to context
- **Interactive**: Engage users with choices

### For AI Applications
- **Structured**: Clear syntax for parsing
- **Contextual**: Variables provide context
- **Instructable**: Direct AI behavior

## Quick Example

```markdown
# Learning {{topic}}

?[#{{experience}}I'm new to programming|I know some basics|I'm experienced]

<!-- AI: Create a {{topic}} tutorial for someone who says "{{experience}}" -->

## Your Personalized Lesson

Based on your experience, here's what we'll cover:
- Concepts suited for your level
- Practical exercises
- Relevant examples
```

## Popular Use Cases

- **📚 Adaptive Learning** - Educational content that adjusts to student level
- **📝 Smart Documentation** - Docs that show role-specific information  
- **💬 Conversational AI** - Dynamic chatbot responses
- **📋 Intelligent Forms** - Forms with conditional logic
- **📖 Interactive Stories** - Choose-your-own-adventure narratives

## Getting Help

- 💬 [Discord Community](https://discord.gg/markdown-flow) - Chat with users and contributors
- 🐛 [GitHub Issues](https://github.com/ai-shifu/markdown-flow/issues) - Report bugs and request features
- 📧 [Email Support](mailto:support@markdownflow.ai) - For commercial inquiries

## Start Building

Ready to create dynamic, interactive content?

1. **[Try the Playground](https://markdownflow.streamlit.app)** - Experiment online
2. **[Read the Quick Start](getting-started/quickstart.md)** - Learn in 5 minutes
3. **[Install an SDK](sdks/index.md)** - Start coding

---

*MarkdownFlow is open source and available under the MIT License.*