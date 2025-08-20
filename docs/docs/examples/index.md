# Examples

Real-world examples demonstrating MarkdownFlow in action across different domains.

## Categories

### 📚 [Education](education.md)

Interactive learning experiences that adapt to each student's level and learning style.

### 📖 [Storytelling](storytelling.md)

Choose-your-own-adventure stories and interactive narratives.

### 📝 [Forms & Surveys](forms.md)

Smart forms that adapt based on user responses.

### 📘 [Documentation](documentation.md)

Technical documentation that adjusts to user expertise and needs.

### 💼 [Consultation](consultation.md)

AI-powered consultation systems for various professional services.

## Quick Examples

### Simple Personalization

```markdown
# Welcome {{user_name}}!

Thanks for visiting our site at {{current_time}}.
You've been a member for {{days_since_joined}} days.
```

### Interactive Tutorial

```markdown
# Learn {{topic}}

What's your experience level?
?[%{{level}}Beginner|Intermediate|Expert]

Generate a lesson plan for {{topic}} at {{level}} level:

- Start with concepts appropriate for {{level}}
- Include 3 practice exercises
- Provide resources for further learning
```

### Adaptive Content

```markdown
# Product Documentation

?[%{{user_type}}Developer|Designer|Manager]

Show documentation for {{user_type}}:

If {{user_type}} is "Developer":
Focus on API references, code examples, and integration guides.

If {{user_type}} is "Designer":
Emphasize UI components, design systems, and visual guidelines.

If {{user_type}} is "Manager":
Provide overview, ROI analysis, and team management features.
```

## Complete Templates

Each example includes:

- Full source code
- Variable definitions
- Expected behavior
- Implementation notes
- Live demo (where available)

## Contributing Examples

Have a great MarkdownFlow example? We'd love to include it!

1. Fork the repository
2. Add your example to the appropriate category
3. Include complete source code
4. Add implementation notes
5. Submit a pull request

## Running Examples

### Online Playground

Try examples at [markdownflow.streamlit.app](https://markdownflow.streamlit.app)

### Local Development

```bash
# Clone examples repository
git clone https://github.com/ai-shifu/markdown-flow-examples

# Install dependencies
npm install

# Run examples
npm start
```

### With Docker

```bash
docker run -p 3000:3000 markdownflow/examples
```

## Example Categories Explained

### Education

- Adaptive learning paths
- Interactive quizzes
- Personalized feedback
- Progress tracking

### Storytelling

- Branching narratives
- Character customization
- Dynamic plot generation
- Multiple endings

### Forms & Surveys

- Conditional questions
- Progressive disclosure
- Smart validation
- Data collection

### Documentation

- Role-based content
- Experience-level adaptation
- Context-aware help
- Interactive guides

### Consultation

- Expert systems
- Decision trees
- Personalized advice
- Recommendation engines
