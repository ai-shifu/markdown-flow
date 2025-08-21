# MarkdownFlow

## Write Once, Deliver Personally

MarkdownFlow extends standard Markdown with three simple additions: variables ({{variable}}), interactive buttons (?[%{{var}}Option1|Option2]), and preserved content (===text===). These extensions enable AI agents to transform your documents into personalized, interactive experiences where content adapts to each reader's choices and context.

**No programming knowledge required. Easy to learn and use. If you can type, you can create.**

## Use Cases

### Education

Generate personalized learning materials for students at different levels. A single curriculum outline automatically adjusts difficulty and teaching methods based on students' foundation, interests, and learning progress.

### Content Creation

Articles that automatically adjust technical terminology based on readers' background knowledge. Provide detailed explanations for beginners while delivering key points directly to professionals.

### News Media

The same news story expands from different angles based on readers' interests. Technology-focused readers see technical details, while business-oriented readers receive market analysis.

### Interactive Storytelling

Create interactive narratives where every reader choice influences the plot direction, generating unique adventure experiences.

### Corporate Training

Automatically generate customized training materials and operation manuals based on employees' departments, positions, and skill levels.

## Getting Started

### Step 1: Inherit Everything from Markdown, But Everything Is a Prompt

MarkdownFlow is fully compatible with standard Markdown, but **everything in the document serves as prompts**. When writing, always remember that you are instructing AI on how to teach, tell stories, deliver news, and more.

**Example:**

```markdown
# Introduction to Python Programming

Please introduce Python programming language in an engaging and accessible manner.

Python is a programming language that is as natural as speaking.

Let's begin with printing "Hello World":

- Explain what printing means in programming
- Use everyday analogies to illustrate concepts
- Encourage readers to try it themselves
```

The AI will generate engaging educational content based on these prompts.

### Step 2: Collect User Choices with Interactive Buttons

Use the syntax `?[%{{variable}}Option1|Option2]` to create buttons. User selections are stored in `{{variable}}`, allowing subsequent prompts to generate different content based on the stored value.

**Example:**

```markdown
# Learning Python

Which area of Python would you like to explore?
?[%{{direction}}Web Development|Data Analysis|Artificial Intelligence|Automation Scripts]

---

Generate a learning path based on the user's selected {{direction}}:

If "Web Development" is selected:

- Introduce Django and Flask frameworks
- Recommend HTML/CSS fundamentals
- Provide a simple website project example

If "Data Analysis" is selected:

- Introduce Pandas and NumPy
- Explain data visualization tools
- Present real dataset analysis cases

[And so on...]
```

### Step 3: Preserve Specific Content from AI Interpretation

For content that should remain unchanged by AI interpretation—such as quotations, axioms, or code examples—enclose it with `===`.

**Example:**

```markdown
Let us remember the core principles of The Zen of Python:

===
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
===

Please explain the significance of these principles for programming while preserving the original text.
```

## Additional Examples

### Interactive Story

```markdown
# The Mysterious Forest Adventure

You are a brave explorer standing at the entrance to the legendary mysterious forest.

You see two paths before you:
?[%{{path}}The sunny path on the left|The shadowy trail on the right]

---

Generate different adventure stories based on the {{path}} choice:

- If "The sunny path on the left" is chosen: Encounter friendly sprites and receive magical blessings
- If "The shadowy trail on the right" is chosen: Discover ancient treasures that require solving puzzles
```

### Personalized News

```markdown
# Today's Tech News: AI Breakthrough

Which aspect interests you most?
?[%{{focus}}Technical Principles|Business Applications|Social Impact|Investment Opportunities]

---

Expand content based on the reader's selected {{focus}}:

- Maintain objective and neutral journalistic standards
- Include relevant expert opinions
- Provide background information and context
```

## Future Roadmap

### Multimodal Output Support

Generate richly illustrated content. Enable AI not only to narrate but also to create diagrams, charts, and visualizations, making your creations more vivid and engaging.

### Evolution into Universal Agent Expression Language

Effortlessly customize your own Agents. Define complex AI behaviors using natural language. Building intelligent applications has never been simpler.

---

Ready to begin? Visit the [Quick Start Guide](getting-started/quickstart.md) to experience the power of MarkdownFlow today!
