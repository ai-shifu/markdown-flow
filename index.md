---
layout: home
---

# 🚀 MarkdownFlow: Human Writing, AI Interpretation

A powerful development library that transforms markdown-formatted instructions into interactive, AI-powered documents. Creators write markdown to guide AI behavior, while AI interprets these instructions to generate personalized content for end users.

<div class="features">
  <div class="feature">
    <div class="feature-icon">📝</div>
    <h3>Markdown as Instructions</h3>
    <p>Creators write markdown instructions with AI directives and interactive elements.</p>
  </div>
  <div class="feature">
    <div class="feature-icon">🤖</div>
    <h3>AI Content Generation</h3>
    <p>AI interprets instructions to generate personalized content based on user context and variables.</p>
  </div>
  <div class="feature">
    <div class="feature-icon">🔌</div>
    <h3>Complete Ecosystem</h3>
    <p>Frontend components for React and Vue, backend agents for Python and Go.</p>
  </div>
</div>

## 📝 MarkdownFlow Examples

<div class="example-showcase">
  <div class="example-item">
    <h4>📚 Interactive Learning Course</h4>
    <div class="markdown-example">
<pre><code># Python Programming Course Instructions

Generate a warm welcome message for {{student_name}} who is starting to learn Python programming.

Explain that this course covers variables, data types, and basic programming concepts. 
Adapt the explanation complexity to {{student_level}} level (beginner/intermediate/advanced).

Create 2-3 code examples showing variables and data types appropriate for {{student_level}}.

---

# Practice Exercise Generation

Create a coding exercise about Python variables that matches {{student_level}} difficulty. Include:
- Clear problem statement
- Expected output
- Helpful hints if needed

After presenting the exercise, ask the student to choose from these options:
?[${{exercise_choice}}I completed it|I need help|Skip this exercise]</code></pre>
    </div>
  </div>

  <div class="example-item">
    <h4>📖 Interactive Story Adventure</h4>
    <div class="markdown-example">
<pre><code># Interactive Fantasy Story Generation

Create a welcoming introduction for {{player_name}} explaining this is an adventure story where their choices matter.

Establish that they are a {{character_class}} exploring an ancient forest. Generate vivid descriptions of the forest atmosphere with trees whispering secrets and mysterious lights flickering in the distance.

Build suspense and mystery. Make the player feel the wonder and intrigue of this magical place.

Present a choice point: as they walk deeper into the forest, they come to a fork in the path. Offer these options:

?[${{path_choice}}Follow the glowing lights|Investigate the old oak tree|Set up camp and wait]</code></pre>
    </div>
  </div>

  <div class="example-item">
    <h4>💬 Personalized Consultation</h4>
    <div class="markdown-example">
<pre><code># Career Development Consultation Instructions

Generate a professional greeting for {{client_name}} explaining you'll help with their career development in {{industry}}.

Acknowledge their current role as {{current_position}} and their {{years_experience}} years of experience. Express that you'll provide personalized guidance to help them achieve their goals.

Ask them to clarify their career objectives by presenting these options:

?[${{career_goal}}I want to advance in my current company|I want to change industries|I want to start my own business|I want better work-life balance]</code></pre>
    </div>
  </div>

  <div class="example-item">
    <h4>📋 User Information Collection</h4>
    <div class="markdown-example">
<pre><code># Health Assessment Information Gathering

Generate a welcoming introduction for a health assessment. Explain that you'll ask a few questions to create personalized recommendations.

Ask the user about their primary health goal. Present these options:
?[${{health_goal}}Lose weight|Gain muscle|Improve cardiovascular health|Manage stress|Better sleep|General wellness]

---

# Activity Level Collection

Acknowledge their choice of "{{health_goal}}" positively.

Ask about their current activity level with these options:
?[${{activity_level}}Very active (exercise 5+ times/week)|Moderately active (exercise 2-4 times/week)|Lightly active (exercise 1-2 times/week)|Sedentary (little to no exercise)]</code></pre>
    </div>
  </div>
</div>

## 📦 Open Source Projects

<div class="projects-grid">
  <a href="https://github.com/ai-shifu/markdown-flow-ui" class="project-card">
    <div class="project-header">
      <div class="project-name">markdown-flow-ui</div>
      <div class="project-type frontend">Frontend</div>
    </div>
    <div class="project-description">
      Complete UI components with built-in functionality. Ready-to-use React components for interactive markdown documents.
    </div>
  </a>
  
  <a href="https://github.com/ai-shifu/remark-flow" class="project-card">
    <div class="project-header">
      <div class="project-name">remark-flow</div>
      <div class="project-type frontend">Frontend</div>
    </div>
    <div class="project-description">
      React-markdown plugin for MarkdownFlow syntax. Extends react-markdown with variable processing and AI integration.
    </div>
  </a>
  
  <a href="https://github.com/ai-shifu/markdown-it-flow" class="project-card">
    <div class="project-header">
      <div class="project-name">markdown-it-flow</div>
      <div class="project-type frontend">Frontend</div>
    </div>
    <div class="project-description">
      Markdown-it plugin for MarkdownFlow syntax. Adds MarkdownFlow capabilities to any markdown-it powered application.
    </div>
  </a>
  
  <a href="https://github.com/ai-shifu/markdown-flow-agent-py" class="project-card">
    <div class="project-header">
      <div class="project-name">markdown-flow-agent-py</div>
      <div class="project-type backend">Backend</div>
    </div>
    <div class="project-description">
      Python backend implementation. FastAPI-based server with template processing and LLM integration capabilities.
    </div>
  </a>
  
  <a href="https://github.com/ai-shifu/markdown-flow-agent-go" class="project-card">
    <div class="project-header">
      <div class="project-name">markdown-flow-agent-go</div>
      <div class="project-type backend">Backend</div>
    </div>
    <div class="project-description">
      Go backend implementation. High-performance server with concurrent processing and minimal resource usage.
    </div>
  </a>
  
  <a href="https://github.com/ai-shifu/markdown-flow" class="project-card">
    <div class="project-header">
      <div class="project-name">markdown-flow</div>
      <div class="project-type demo">Demo</div>
    </div>
    <div class="project-description">
      Testing and development platform. Interactive demo showcasing MarkdownFlow capabilities with live examples.
    </div>
  </a>
</div>

## 🚀 Quick Start

<div class="quick-start">
<h3>For Frontend (React)</h3>

```bash
npm install markdown-flow-ui remark-flow
```

```javascript
import { MarkdownFlow } from 'markdown-flow-ui';
import remarkFlow from 'remark-flow';

// Use in your React component
<MarkdownFlow 
  content={markdownContent}
  plugins={[remarkFlow]}
  variables={userVariables}
/>
```

<h3>For Backend (Python)</h3>

```bash
pip install markdown-flow-agent
```

```python
from markdown_flow_agent import FlowAgent

agent = FlowAgent()
result = await agent.process(
    template=markdown_template,
    variables=user_variables
)
```
</div>

## 📖 Documentation

For detailed documentation, guides, and API references, visit our [documentation site](/docs/).

## 🤝 Contributing

We welcome contributions! All projects are open source under the [ai-shifu](https://github.com/ai-shifu) organization.

- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star our repositories
- 📢 Share MarkdownFlow with others