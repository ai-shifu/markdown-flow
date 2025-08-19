# Complete Example

Here's a comprehensive MarkdownFlow template that demonstrates all three core concepts working together.

## The Template

```markdown
# Welcome to Python Learning! 

What's your name? {{student_name}}

How much programming experience do you have?
?[#{{experience}}None at all|Some basics|Comfortable with another language]

What interests you most about Python?
?[${{interests}}Web Development|Data Science|Automation|Game Development|Machine Learning]

---

Generate a personalized welcome message for {{student_name}}.

Based on their experience level "{{experience}}":
- If "None at all": Start with encouragement and basic concepts
- If "Some basics": Acknowledge their foundation and preview next steps  
- If "Comfortable with another language": Compare Python to other languages

Consider their interests: {{interests}}
- Mention specific Python libraries related to their selections
- Suggest relevant first projects
- Recommend learning resources

Include 2-3 specific things they'll learn in their first lesson.
Make the tone friendly and encouraging.
```

## How This Works

### 1. Variable Collection
The template starts by collecting the student's name through the `{{student_name}}` variable.

### 2. Single Choice Input
```markdown
?[#{{experience}}None at all|Some basics|Comfortable with another language]
```
This creates radio buttons where the student must select exactly one option.

### 3. Multiple Choice Input
```markdown
?[${{interests}}Web Development|Data Science|Automation|Game Development|Machine Learning]
```
This creates checkboxes where the student can select multiple interests.

### 4. AI Processing
The instructions after the `---` separator tell the AI how to generate personalized content based on the collected information.

## Sample Output

When a user named "Alex" who has "Some basics" experience and is interested in "Web Development" and "Data Science" processes this template, they might see:

---

**Welcome to Python Learning, Alex!**

Great to have you here! I can see you've already got some programming basics under your belt – that's fantastic! This foundation will help you pick up Python quickly.

Based on your interests in Web Development and Data Science, you're in for an exciting journey! Python is perfect for both:

**For Web Development**, you'll love working with:
- **Django** or **Flask** for building powerful web applications
- **FastAPI** for creating modern REST APIs
- **Beautiful Soup** for web scraping projects

**For Data Science**, Python is the go-to language with:
- **Pandas** for data manipulation
- **NumPy** for numerical computing
- **Matplotlib** and **Seaborn** for data visualization

**In your first lesson, you'll learn:**
1. Python's clean, readable syntax and how it differs from other languages
2. Working with Python's powerful built-in data structures (lists, dictionaries)
3. Setting up your first web server with Flask in just 5 lines of code!

Since you have some basics, we'll move a bit faster through the fundamentals and get you building real projects sooner. Ready to start coding?

---

## Key Takeaways

1. **Variables** provide dynamic content insertion
2. **User inputs** create interactive experiences
3. **AI instructions** generate personalized responses
4. All three work together seamlessly

## Try It Yourself

1. Copy this template
2. Visit [MarkdownFlow Playground](https://markdownflow.streamlit.app)
3. Paste and modify the template
4. See how different inputs generate different outputs

## Next Steps

- [How It Works](how-it-works.md) - Understand the processing pipeline
- [Quick Start Guide](quickstart.md) - Build your first MarkdownFlow document
- [Installation](installation.md) - Set up MarkdownFlow in your project