# Try It Now

Ready to experience MarkdownFlow in action? Here are three ways to start building and testing MDFlow documents.

## Option 1: Online Playground (Recommended)

The fastest way to try MDFlow — no installation required!

### 🌐 [MarkdownFlow Playground](https://play.mdflow.run)

**What you can do:**

- Write and test MDFlow templates instantly
- See real-time preview of generated content
- Experiment with variables, buttons, and AI instructions
- Share your creations with others

**Perfect for:**

- Learning the basics
- Prototyping ideas
- Sharing examples with teammates

### Getting Started in the Playground

1. **Visit** [play.mdflow.run](https://play.mdflow.run)
2. **Try the built-in examples** or start with a blank template
3. **Write your first MDFlow** using the editor
4. **Test interactivity** by clicking buttons and filling inputs
5. **See personalized output** generated in real-time

## Option 2: Quick Local Setup

Want to integrate MDFlow into your existing project? Choose your preferred SDK:

### React/Next.js

```bash
npm install markdown-flow-ui
```

```jsx
import { MarkdownFlow } from "markdown-flow-ui";

export default function App() {
  const template = `
# Hello {{name}}!

What's your favorite programming language?
?[%{{lang}}JavaScript|Python|Go|Rust]

Generate a personalized greeting for {{name}} who loves {{lang}}.
Include a fun fact about {{lang}} and why it's a great choice!
  `;

  return (
    <div>
      <h1>My First MDFlow App</h1>
      <MarkdownFlow template={template} />
    </div>
  );
}
```

### Python

```bash
pip install markdown-flow-agent
```

```python
from markdown_flow_agent import FlowAgent

template = """
# Welcome {{name}}!

What's your experience level?
?[%{{level}}Beginner|Intermediate|Advanced]

Create a personalized learning plan for {{name}} at {{level}} level.
Focus on practical next steps they can take immediately.
"""

agent = FlowAgent()
result = await agent.process(template)
print(result)
```

### Vue.js

```bash
npm install markdown-it-flow
```

```vue
<template>
  <div>
    <h1>MDFlow with Vue</h1>
    <div v-html="renderedContent"></div>
  </div>
</template>

<script>
import MarkdownItFlow from 'markdown-it-flow';

export default {
  data() {
    return {
      template: `
# Hi {{user}}!

Choose your adventure:
?[%{{path}}Explore the forest|Climb the mountain|Sail the seas]

Generate an exciting story beginning based on {{user}}'s choice to {{path}}.
Make it adventurous and engaging!
      `
    };
  },
  computed: {
    renderedContent() {
      const mdf = new MarkdownItFlow();
      return mdf.render(this.template);
    }
  }
};
</script>
```

**For detailed setup instructions:** [Installation Guide](installation.md)

**For all SDK options:** [SDKs Documentation](../sdks/index.md)

## Practice Exercises

### Exercise 1: Personal Introduction

Create a template that generates personalized introductions.

**Your task:**

```markdown
# Meet {{name}}

What's your role?
?[%{{role}}Student|Teacher|Developer|Designer|Entrepreneur]

What's your main interest?
?[%{{interest}}Technology|Arts|Business|Science|Sports]

---

Generate a compelling personal introduction for {{name}}.
- Mention their role as {{role}}
- Connect their interests in {{interest}} to their professional life
- Keep it warm and engaging
- End with an interesting question to start conversations
```

### Exercise 2: Learning Path Creator

Build a template that creates customized learning paths.

**Your task:**

```markdown
# Your Learning Journey

What do you want to learn?
?[%{{subject}}Web Development|Data Science|Design|Marketing|Photography]

How much time do you have per week?
?[%{{time}}2-5 hours|5-10 hours|10+ hours]

What's your preferred style?
?[%{{style}}Videos|Books|Hands-on projects|Online courses]

---

Create a 30-day learning plan for {{subject}} with these parameters:
- Time available: {{time}} per week
- Learning style: {{style}}
- Include specific milestones for weeks 1, 2, 3, and 4
- Suggest 3 resources that match their {{style}} preference
```

### Exercise 3: Content Personalization

Practice adapting the same information for different audiences.

**Your task:**

```markdown
# Understanding AI

Who are you?
?[%{{audience}}Business Executive|Technical Professional|Student|General Public]

What's your main concern about AI?
?[%{{concern}}Job displacement|Privacy|Ethics|Technical complexity]

---

Explain artificial intelligence to {{audience}}, addressing their {{concern}}.

Adaptation guidelines:
- For executives: focus on business impact and ROI
- For technical professionals: include implementation details
- For students: emphasize learning opportunities
- For general public: use everyday analogies

Address their specific {{concern}} with factual, balanced information.
```

## Advanced Techniques to Try

### 1. Preserved Content

Practice using `===` for exact content preservation:

```markdown
Remember the golden rule of programming:
===Write code as if the person maintaining it is a violent psychopath who knows where you live===

Explain why this humorous quote actually contains serious wisdom
about code maintainability, especially for {{role}} working in {{industry}}.
```

### 2. Complex Interactions

Create multi-step user journeys:

```markdown
# Course Recommendation Engine

Step 1: Basic Info
?[%{{name}}...Your name]
?[%{{level}}Beginner|Intermediate|Advanced]

Step 2: Goals  
?[%{{goal}}Career change|Skill upgrade|Personal interest|Academic requirement]

Step 3: Preferences
?[%{{format}}Self-paced|Structured|Mentorship|Group learning]

---

Hi {{name}}! Based on your {{level}} level, {{goal}} goal, and {{format}} preference,
here are my personalized course recommendations...

[Continue with detailed recommendations]
```

### 3. Conditional Logic

Use if/then patterns for branching content:

```markdown
What's your current situation?
?[%{{situation}}Starting new job|Changing careers|Growing current role|Exploring options]

Generate advice specific to {{situation}}:

- If starting new job: focus on onboarding and relationship building
- If changing careers: emphasize transferable skills and networking
- If growing current role: suggest leadership development and skill expansion
- If exploring options: provide career assessment and discovery exercises
```

## Testing Tips

### 1. Try Different User Paths

Test your templates with various input combinations:

- Beginner + Career change
- Expert + Personal interest  
- Intermediate + Academic requirement

### 2. Check Edge Cases

- What happens with unusual names?
- How does it handle very short or very long inputs?
- Does it work with different languages/characters?

### 3. Validate Output Quality

- Is the generated content relevant and helpful?
- Does it maintain consistency across different user paths?
- Are the AI instructions clear and specific enough?

## Common Issues & Solutions

### Problem: Generic Output

**Symptom:** AI generates similar content regardless of user input

**Solution:** Make your instructions more specific

```markdown
# Too generic
Generate content for {{user_type}}.

# More specific
Generate content for {{user_type}}:
- If student: include study tips and deadlines
- If professional: focus on practical applications
- If hobbyist: keep it fun and experimental
```

### Problem: Variables Show as "UNKNOWN"

**Symptom:** Variables aren't being replaced properly

**Solution:** Ensure variables are collected before use

```markdown
# Wrong order - using before collecting
Welcome {{name}}!
?[%{{name}}...Enter name]

# Correct order - collecting before using
?[%{{name}}...Enter name]
Welcome {{name}}!
```

### Problem: AI Ignores Instructions

**Symptom:** Generated content doesn't follow your guidelines

**Solution:** Be more explicit and use examples

```markdown
# Vague
Write something interesting about {{topic}}.

# Explicit with examples
Write exactly 3 paragraphs about {{topic}}:
1. Definition and core concept
2. Real-world example from {{industry}}
3. Actionable next step for {{user_type}}
```

## What's Next?

Once you're comfortable with the basics:

1. **[Installation Guide](installation.md)** - Set up your development environment
2. **[Advanced Examples](../examples/index.md)** - See professional templates
3. **[Complete Specification](../specification/overview.md)** - Learn every syntax detail
4. **[Next Steps](next-steps.md)** - Plan your learning journey

**Ready to build something amazing?** Start experimenting in the **[Playground](https://play.mdflow.run)** now!
