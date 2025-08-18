# AI Instructions

AI instructions are natural language directives that tell AI how to generate, transform, or personalize content. They're the bridge between human intent and AI capabilities.

## Basic Concept

AI instructions are written in plain language, making MarkdownFlow accessible to non-programmers:

```markdown
Generate a warm welcome message for {{user_name}} that includes 
encouragement for starting their learning journey in {{subject}}.
```

## Writing Effective Instructions

### 1. Be Specific

```markdown
Good:
Create a 3-paragraph introduction to Python programming for beginners, 
covering what Python is, why it's popular, and what you can build with it.

Poor:
Write about Python.
```

### 2. Provide Context

```markdown
Good:
For a {{age}}-year-old student interested in {{hobby}}, 
explain how programming relates to their interests.

Poor:
Explain programming.
```

### 3. Set Clear Expectations

```markdown
Good:
List exactly 5 benefits of learning {{skill}}, 
each with a brief example relevant to {{industry}}.

Poor:
Talk about benefits of {{skill}}.
```

## Conditional Instructions

Use if-then patterns for dynamic content:

```markdown
The user's experience level is {{level}}.

If {{level}} is "beginner":
  Use simple language, avoid jargon, and provide many examples.
  Start with the absolute basics and build up slowly.

If {{level}} is "intermediate":
  Assume basic knowledge, introduce advanced concepts gradually.
  Include best practices and common pitfalls to avoid.

If {{level}} is "expert":
  Focus on optimization, edge cases, and advanced techniques.
  Reference industry standards and recent developments.
```

## Content Generation Patterns

### 1. Explanations

```markdown
Explain {{concept}} in a way that a {{audience}} would understand.
Use analogies related to {{familiar_topic}} to make it clearer.
Include a practical example showing how {{concept}} is used.
```

### 2. Examples

```markdown
Provide 3 different examples of {{technique}}:
1. A simple example for beginners
2. A real-world application
3. An advanced use case

Each example should include code and explanation.
```

### 3. Comparisons

```markdown
Compare {{option_a}} and {{option_b}} for someone who needs to {{use_case}}.
Include:
- Key differences
- Pros and cons of each
- Recommendation based on {{user_requirements}}
```

### 4. Step-by-Step Guides

```markdown
Create a step-by-step guide for {{task}}:
- Assume the user has {{prerequisite_knowledge}}
- Break it into 5-7 clear steps
- Include what to expect at each step
- Add troubleshooting tips for common issues
```

## Tone and Style Instructions

### Professional Tone

```markdown
Write a professional email template for {{purpose}}.
Maintain formal but friendly tone.
Keep it concise and to the point.
```

### Conversational Tone

```markdown
Explain {{topic}} like you're chatting with a friend over coffee.
Use casual language, personal anecdotes, and humor where appropriate.
```

### Educational Tone

```markdown
Teach {{concept}} using the following approach:
1. Start with why it matters
2. Explain the core concept
3. Show practical applications
4. Provide exercises for practice
```

## Personalization Instructions

### Based on User Profile

```markdown
Knowing that {{user_name}} is a {{profession}} with {{years_exp}} years 
of experience, customize the explanation of {{topic}} to relate to 
their background and likely use cases.
```

### Based on Goals

```markdown
The user wants to {{user_goal}}.

Generate a personalized action plan that:
- Addresses their specific goal
- Considers their available time: {{time_commitment}}
- Matches their learning style: {{learning_preference}}
```

### Based on Progress

```markdown
The user has completed {{completed_modules}} out of {{total_modules}} modules.

If progress is less than 30%:
  Provide encouragement and highlight early wins.

If progress is between 30-70%:
  Maintain momentum with challenging but achievable goals.

If progress is over 70%:
  Prepare them for completion and next steps.
```

## Complex Instructions

### Multi-Part Content

```markdown
For the topic {{topic}}, create:

## Introduction
Write a brief overview that captures interest.

## Main Content
Based on {{content_depth}} level:
- If "surface": Cover key points only
- If "detailed": Include comprehensive information
- If "expert": Add technical details and edge cases

## Summary
Bullet points of key takeaways.

## Next Steps
Suggest 3 relevant follow-up topics based on {{user_interests}}.
```

### Adaptive Content

```markdown
Analyze the user's response: "{{user_response}}"

Based on their response:
- Identify their level of understanding
- Detect any misconceptions
- Note areas of interest

Generate a follow-up that:
- Addresses any misunderstandings
- Builds on what they got right
- Explores their areas of interest deeper
```

## Formatting Instructions

### Structure Requirements

```markdown
Format the explanation of {{topic}} as follows:
- Start with a definition (1-2 sentences)
- Include a real-world analogy
- Provide 3 bullet points of key features
- End with a practical example
```

### Visual Organization

```markdown
Organize the information about {{subject}} using:
- Headers for main sections
- Bullet points for lists
- Bold text for key terms
- Code blocks for examples
- Tables for comparisons
```

## Data Processing Instructions

### Calculations

```markdown
Based on the user's input:
- Monthly income: {{income}}
- Monthly expenses: {{expenses}}
- Savings goal: {{goal}}

Calculate and explain:
1. Monthly savings potential
2. Time to reach goal
3. Suggestions for increasing savings
```

### Transformations

```markdown
Take the user's rough notes: "{{notes}}"

Transform them into:
- A structured outline
- Key points highlighted
- Action items identified
- Questions for further exploration
```

## Quality Control

### Accuracy

```markdown
When explaining {{technical_topic}}:
- Ensure technical accuracy
- Use current best practices (as of 2024)
- Include version information where relevant
- Note any assumptions made
```

### Completeness

```markdown
Cover all aspects of {{topic}}:
□ Definition and purpose
□ How it works
□ Benefits and limitations
□ Common use cases
□ Best practices
□ Common mistakes to avoid
```

## Interactive Instructions

### Response to Choices

```markdown
The user chose: "{{choice}}"

Acknowledge their choice positively.
Explain why this is a good option for their situation.
Provide specific next steps for implementing {{choice}}.
```

### Progressive Disclosure

```markdown
Start with a simple explanation of {{concept}}.

Then ask: "Would you like more detail?"

If they want more detail:
  Provide technical information, implementation details,
  and advanced considerations.
```

## Best Practices

### 1. Test Your Instructions

Always consider:
- Will the AI understand what you want?
- Are there edge cases to handle?
- Is the instruction too vague or too restrictive?

### 2. Iterate and Refine

Start simple and add complexity:

```markdown
Version 1: Explain {{topic}}

Version 2: Explain {{topic}} for {{audience}}

Version 3: Explain {{topic}} for {{audience}} who wants to {{goal}},
           including practical examples from {{industry}}
```

### 3. Provide Fallbacks

```markdown
Try to generate content about {{user_topic}}.

If {{user_topic}} is unclear or too broad:
  Ask for clarification about what specific aspect interests them.
```

### 4. Maintain Consistency

```markdown
Throughout this document:
- Use the same terminology for {{concept}}
- Maintain a {{tone}} tone
- Keep examples related to {{theme}}
```

## Common Patterns

### Tutorial Pattern

```markdown
Create a tutorial for {{skill}}:

1. **What You'll Learn**: Clear learning objectives
2. **Prerequisites**: What users need to know
3. **Step-by-Step Instructions**: Detailed walkthrough
4. **Practice Exercise**: Hands-on application
5. **Common Issues**: Troubleshooting guide
6. **Next Steps**: Where to go from here
```

### Problem-Solution Pattern

```markdown
The user is facing: {{problem}}

1. Acknowledge the challenge
2. Explain why this problem occurs
3. Provide 3 potential solutions
4. Recommend the best solution for their context: {{context}}
5. Give implementation steps
```

### Decision Support Pattern

```markdown
Help the user decide between {{option_a}} and {{option_b}}:

- Understand their priorities: {{priorities}}
- Compare options against these priorities
- Provide a clear recommendation
- Explain the reasoning
- Note any trade-offs
```

## Next Steps

- [Variables](variables.md) - Use dynamic content in instructions
- [User Input](user-input.md) - Collect information for personalization
- [Examples](examples.md) - See complete templates with AI instructions