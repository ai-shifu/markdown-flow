# Your First MarkdownFlow

Let's build your first MDFlow document in 5 minutes. We'll create an interactive welcome message that adapts to each user.

## Step 1: Start with Regular Markdown (30 seconds)

Create a file called `welcome.md`:

```markdown
# Welcome to Our Platform!

Thank you for joining us.

## What You Can Do Here

- Learn new skills
- Connect with others
- Build projects
```

This is valid MarkdownFlow (and valid Markdown). It works but it's static — everyone sees the same thing.

## Step 2: Add Variables (1 minute)

Let's personalize it with variables:

```markdown
# Welcome to Our Platform, {{user_name}}!

Thank you for joining us, {{user_name}}.

## What You Can Do Here

Based on your interests in {{interests}}, you can:

- Learn new skills in {{interests}}
- Connect with other {{interests}} enthusiasts
- Build {{interests}} projects
```

Now the document adapts to each user. Variables are replaced with actual values when processed.

**Learn more about variables:** [Variables Specification](../specification/variables.md)

## Step 3: Add User Input (1 minute)

Make it interactive by collecting user choices:

```markdown
# Welcome to Our Platform, {{user_name}}!

Thank you for joining us. Let's personalize your experience.

What brings you here today?
?[%{{goal}}Learn something new|Work on projects|Meet people|Just browsing]

What's your experience level?
?[%{{level}}Complete beginner|Some experience|Expert]
```

Users can now make selections that affect the content they see.

**Learn more about interactive elements:** [Buttons & Input Specification](../specification/button-input.md)

## Step 4: Add AI Instructions (1.5 minutes)

Now the magic — let AI generate personalized content:

```markdown
# Welcome to Our Platform, {{user_name}}!

Thank you for joining us. Let's personalize your experience.

What brings you here today?
?[%{{goal}}Learn something new|Work on projects|Meet people|Just browsing]

What's your experience level?
?[%{{level}}Complete beginner|Some experience|Expert]

---

Generate a personalized welcome message for {{user_name}} who wants to "{{goal}}"
and has "{{level}}" experience.

Include:

1. An encouraging message specific to their goal
2. Three specific suggestions for getting started
3. One pro tip based on their experience level

Keep it friendly and conversational.
```

This is the core of MarkdownFlow: **you write instructions for AI, not content for humans.**

## Step 5: See It In Action (1 minute)

Here's what happens when this template is processed:

### Input Values

- `user_name`: "Alice"
- `goal`: "Learn something new"
- `level`: "Some experience"

### Generated Output

> # Welcome to Our Platform, Alice
>
> Thank you for joining us. Let's personalize your experience.
>
> **Your Goal:** Learn something new  
> **Your Level:** Some experience
>
> Hey Alice! It's great to have someone with your experience here who's eager to learn. Since you already have some background, you're perfectly positioned to dive into more advanced topics while still having the foundation to understand them.
>
> **Here are three great ways to get started:**
>
> 1. **Explore our intermediate courses** - Skip the basics you already know and jump into topics that will challenge you
> 2. **Join a study group** - Connect with others at your level who are also expanding their knowledge
> 3. **Start a learning project** - Apply what you learn immediately to solidify new concepts
>
> **Pro tip:** Since you have some experience, try the "learn by teaching" approach — explain new concepts in our forums. It's the fastest way to master something!

The same template would generate completely different content for a beginner interested in building projects!

## Complete Example: Learning Path Generator

Here's a more sophisticated example that demonstrates the full power of MDFlow:

```markdown
# Welcome to MarkdownFlow Learning Platform!

## Quick Setup

What should we call you?
?[%{{user_name}}...Enter your name]

What are you most interested in learning?
?[%{{interest}}Web Development|Data Science|Mobile Apps|AI/Machine Learning|Other]

How much time can you dedicate daily?
?[%{{time}}15-30 minutes|30-60 minutes|1-2 hours|More than 2 hours]

What's your preferred learning style?
?[%{{style}}Video tutorials|Written guides|Interactive exercises|Projects]

---

## Your Personalized Learning Path

Hi {{user_name}}! Based on your interests in {{interest}} and {{time}} daily availability,
here's your customized learning path.

Generate a detailed 4-week learning plan for {{user_name}}:

- Topic: {{interest}}
- Daily time: {{time}}
- Learning style: {{style}}

Structure the plan with:

1. Week 1: Foundations (what to learn first)
2. Week 2: Core concepts (building on basics)
3. Week 3: Practical application (hands-on work)
4. Week 4: Real project (consolidate learning)

For each week, provide:

- Daily learning objectives
- Specific resources matching their {{style}} preference
- Time estimates that fit within {{time}}
- One checkpoint to verify understanding

Make the plan encouraging and achievable.
```

This single template can generate thousands of different learning paths based on user inputs!

## Try It Yourself

### Option 1: Online Playground

Visit the **[MarkdownFlow Playground](https://play.mdflow.run)** to try these examples live without any installation.

### Option 2: Use an SDK

**React/Next.js:**

```jsx
import { MarkdownFlow } from "markdown-flow-ui";

function App() {
  return <MarkdownFlow template={yourTemplate} />;
}
```

**Python:**

```python
from markdown_flow_agent import FlowAgent

agent = FlowAgent()
result = await agent.process(template, variables)
```

**For more SDK options:** [SDKs Documentation](../sdks/index.md)

## What You've Learned

In 5 minutes, you've learned the three core MDFlow features:

✅ **Variables (`{{variable}}`)** - Make content dynamic and personalized  
✅ **Interactive Elements (`?[%{{var}}Option1|Option2]`)** - Collect user input  
✅ **AI Instructions** - Write prompts that generate personalized content  

### Key Insights

1. **Start with Markdown** - Your existing knowledge still applies
2. **Think in prompts** - Write instructions for AI, not content for readers
3. **Collect then adapt** - Use interactive elements to gather context, then personalize content
4. **One source, many experiences** - A single template serves unlimited user scenarios

## Common Patterns

As you build more MDFlow documents, you'll use these patterns frequently:

### Conditional Content

```markdown
Generate different advice based on {{user_type}}:
- If student: focus on learning fundamentals
- If professional: emphasize practical applications
- If hobbyist: keep it fun and experimental
```

### Progressive Disclosure

```markdown
Want to learn more about {{topic}}?
?[%{{deep_dive}}Yes, tell me more|No, I'm good]

If "Yes": provide detailed explanation with examples
If "No": summarize key points only
```

### Contextual Examples

```markdown
Explain {{concept}} using examples from {{user_industry}} industry
to make it relevant to {{user_name}}'s daily work.
```

## What's Next?

Ready to dive deeper? Choose your next step:

- **[Try It Now](playground.md)** - Practice with live examples and playground
- **[Installation Guide](installation.md)** - Set up MDFlow in your development environment
- **[Core Concepts](concepts.md)** - Understand the deeper principles
- **[Examples](../examples/index.md)** - See real-world use cases and templates

Or jump straight into building with the **[Playground →](playground.md)**!
