# Complete Examples

These examples demonstrate how to combine variables, user input, and AI instructions to create powerful interactive documents.

## Example 1: Personalized Learning Path

```markdown
# Welcome to Python Mastery, {{user_name}}! 🐍

Let's create your personalized learning journey.

## Quick Assessment

How would you describe your programming experience?
?[%{{experience}}Complete beginner|Some coding experience|Experienced in another language]

What's your main goal with Python?
?[%{{goal}}Web development|Data science|Automation|General programming]

How much time can you dedicate daily?
?[%{{time}}15-30 minutes|30-60 minutes|1-2 hours|More than 2 hours]

---

## Your Personalized Learning Path

Based on your profile:

- Experience Level: {{experience}}
- Learning Goal: {{goal}}
- Daily Commitment: {{time}}

Generate a customized 4-week learning plan for {{user_name}}:

### Week 1-2: Foundation

If {{experience}} is "Complete beginner":
Start with Python basics: variables, data types, control flow.
Daily lessons should be {{time}} long with lots of practice.

If {{experience}} is "Some coding experience":
Quick review of basics, then dive into Python-specific features.
Focus on Pythonic ways of solving problems.

If {{experience}} is "Experienced in another language":
Fast-track through syntax, focus on Python idioms and advanced features.
Compare Python with their previous language for faster learning.

### Week 3-4: Specialization

Based on {{goal}}, provide specialized content:

If {{goal}} is "Web development":
Introduction to Flask/Django, HTTP basics, building a simple web app.

If {{goal}} is "Data science":
NumPy, Pandas basics, data visualization with Matplotlib.

If {{goal}} is "Automation":
File handling, web scraping, task automation scripts.

If {{goal}} is "General programming":
Object-oriented programming, modules, and best practices.

### Daily Schedule

Create a {{time}} daily routine including:

- Warm-up exercise (5-10% of time)
- New concept learning (40% of time)
- Hands-on practice (40% of time)
- Review and reflection (10% of time)

### Your First Challenge

Generate an appropriate first coding challenge based on {{experience}} level
that can be completed in about 20 minutes.
```

## Example 2: Interactive Story Adventure

```markdown
# The Mysterious Library 📚

## Character Creation

Enter your character's name: {{character_name}}

Choose your background:
?[%{{background}}Scholar - Expert in ancient languages|Explorer - Skilled in navigation|Detective - Master of deduction]

Select your special item:
?[%{{item}}Enchanted compass|Cryptic journal|Glowing amulet]

---

## Chapter 1: The Discovery

Generate an engaging opening for {{character_name}}, a {{background}},
who discovers a hidden library while exploring an old mansion.
Include how their {{item}} reacts to this discovery.

The ancient door creaks open, revealing countless shelves of forgotten books...

What do you do first?
?[%{{first_action}}Examine the nearest bookshelf|Investigate the strange glowing pedestal|Search for another exit|Study your {{item}} for clues]

---

## The Plot Thickens

Based on {{first_action}}, generate consequences:

If {{first_action}} is "Examine the nearest bookshelf":
{{character_name}} discovers a book written in an unknown language.
As a {{background}}, describe how they approach deciphering it.
The {{item}} begins to pulse with energy...

If {{first_action}} is "Investigate the strange glowing pedestal":
The pedestal holds an ancient artifact that resonates with the {{item}}.
Use {{character_name}}'s {{background}} skills to understand its purpose.
A hidden mechanism activates...

If {{first_action}} is "Search for another exit":
While searching, {{character_name}} triggers a secret passage.
Their {{background}} training helps them navigate safely.
The {{item}} provides unexpected guidance...

If {{first_action}} is "Study your {{item}} for clues":
The {{item}} reveals hidden inscriptions only visible in this library.
{{character_name}}'s expertise as a {{background}} proves invaluable.
A mysterious message appears...

What happens next?
?[%{{next_choice}}Follow the new clue|Investigate further|Seek help|Document findings]

---

## Dynamic Story Continuation

Continue the adventure based on all previous choices:

- Character: {{character_name}}
- Background: {{background}}
- Special Item: {{item}}
- First Action: {{first_action}}
- Current Choice: {{next_choice}}

Weave these elements into an exciting narrative that:

1. Builds on previous decisions
2. Introduces new mysteries
3. Utilizes the character's unique abilities
4. Creates meaningful consequences for choices
```

## Example 3: Technical Documentation Assistant

```markdown
# API Documentation Generator

## Project Setup

What are you building?
?[%{{api_type}}REST API|GraphQL API|WebSocket API|gRPC Service]

Primary programming language:
?[%{{language}}JavaScript/Node.js|Python|Java|Go|Ruby]

Authentication method:
?[%{{auth}}JWT|OAuth 2.0|API Key|Basic Auth|None (Public)]

---

## Generated Documentation

Create comprehensive API documentation for a {{api_type}} built with {{language}}
using {{auth}} authentication.

### Overview

Generate a professional API overview including:

- Purpose and main features
- Base URL structure
- Authentication requirements for {{auth}}
- Rate limiting information
- Response format (JSON/XML)

### Authentication Guide

Provide detailed {{auth}} implementation:

If {{auth}} is "JWT":
Explain token generation, refresh token flow, and header format.
Include {{language}}-specific code examples for token validation.

If {{auth}} is "OAuth 2.0":
Detail the OAuth flow, scopes, and redirect URIs.
Show {{language}} implementation of authorization code flow.

If {{auth}} is "API Key":
Describe key generation, storage best practices, and usage.
Provide {{language}} examples for API key validation.

### Endpoint Reference

Generate 5 example endpoints appropriate for a {{api_type}}:

For each endpoint, include:

1. HTTP method and path
2. Description
3. Request parameters
4. Request body (if applicable)
5. Response format
6. Error codes
7. {{language}} code example

### Error Handling

Create a comprehensive error handling guide:

- Standard error format
- Common error codes and meanings
- {{language}}-specific error handling patterns
- Retry strategies for clients

### Code Examples

Would you like to generate client examples?
?[%{{client_examples}}Yes, generate client code|No, skip client examples]

If {{client_examples}} is "Yes, generate client code":
Which platforms?
?[%{{platforms}}JavaScript/Browser|Python|cURL|All of the above]

Generate complete, working examples for {{platforms}}.

### Testing Guide

Include testing recommendations:

- Tools suitable for testing {{api_type}} in {{language}}
- Sample test cases
- Mock data examples
- Performance testing guidelines
```

## Example 4: Health & Fitness Coach

```markdown
# Your Personal Fitness Journey 💪

## Initial Assessment

Welcome! Let's understand your fitness profile.

### Basic Information

Your age group:
?[%{{age_group}}18-25|26-35|36-45|46-55|56+]

Current activity level:
?[%{{activity}}Sedentary|Lightly active|Moderately active|Very active|Athlete]

### Goals

Primary fitness goal:
?[%{{goal}}Lose weight|Build muscle|Improve endurance|General health|Sports performance]

Timeline for your goal:
?[%{{timeline}}1 month|3 months|6 months|1 year|No specific timeline]

### Constraints

Any limitations to consider?
?[%{{limitations}}None|Time constraints|Physical limitations|Equipment access|Budget constraints]

---

## Your Personalized Fitness Plan

Creating a plan for someone who is {{age_group}} years old,
currently {{activity}}, aiming to {{goal}} within {{timeline}}.

### Phase 1: Foundation (Weeks 1-4)

Based on {{activity}} level and {{age_group}}:

If {{activity}} is "Sedentary":
Start with low-impact activities, 15-20 minutes daily.
Focus on building consistency before intensity.
Include: walking, stretching, basic bodyweight exercises.

If {{activity}} is "Lightly active" or "Moderately active":
Build on existing foundation with structured workouts.
3-4 sessions per week, 30-45 minutes each.
Mix cardio and strength training.

If {{activity}} is "Very active" or "Athlete":
Advanced programming with periodization.
5-6 sessions per week, 45-60 minutes.
Sport-specific training for {{goal}}.

### Nutrition Guidelines

Generate nutrition advice for {{goal}}:

If {{goal}} is "Lose weight":
Calculate caloric deficit, macro split for fat loss.
Meal timing strategies, healthy snack options.
Hydration importance, supplement considerations.

If {{goal}} is "Build muscle":
Protein requirements for {{age_group}} age group.
Caloric surplus calculation, pre/post workout nutrition.
Meal prep ideas for muscle gain.

### Addressing Limitations

Adapt the plan for {{limitations}}:

If {{limitations}} includes "Time constraints":
High-intensity interval training (HIIT) options.
15-minute effective workouts.
Weekend warrior strategies.

If {{limitations}} includes "Physical limitations":
Low-impact alternatives.
Modification suggestions.
When to consult healthcare providers.

### Progress Tracking

How would you prefer to track progress?
?[%{{tracking}}Daily check-ins|Weekly summaries|Monthly assessments|Minimal tracking]

Based on {{tracking}} preference:

- Suggest appropriate metrics to monitor
- Provide tracking templates
- Set milestone celebrations

### Week 1 Action Plan

Generate a specific 7-day starter plan including:

- Daily workout schedule adapted to {{activity}} level
- Meal suggestions aligned with {{goal}}
- One daily habit to build
- Motivation tip based on {{timeline}} commitment
```

## Example 5: Code Review Assistant

```markdown
# Intelligent Code Review 🔍

## Setup

What language is your code in?
?[%{{language}}JavaScript|Python|Java|Go|TypeScript|Other]

What type of code is this?
?[%{{code_type}}Frontend|Backend API|Database queries|Algorithm|Full-stack|Utility/Helper]

What's your main concern?
?[%{{concern}}Performance|Security|Readability|Best practices|Bug fixing|All aspects]

---

## Code Analysis

Please paste your code here:
{{user_code}}

---

## Review Results

Analyzing {{language}} {{code_type}} code with focus on {{concern}}:

### Priority Issues

Based on {{concern}}, check for:

If {{concern}} is "Performance":

- Algorithm complexity analysis
- Database query optimization
- Memory usage patterns
- Caching opportunities
- {{language}}-specific performance tips

If {{concern}} is "Security":

- Input validation issues
- SQL injection risks
- XSS vulnerabilities
- Authentication/authorization flaws
- {{language}}-specific security best practices

If {{concern}} is "Readability":

- Variable naming conventions
- Function complexity (cyclomatic complexity)
- Comment quality and coverage
- Code organization
- {{language}} idioms and conventions

### Detailed Review

Generate comprehensive review covering:

1. **Critical Issues** (Must Fix)

   - Security vulnerabilities
   - Bugs that could cause crashes
   - Data integrity risks

2. **Important Issues** (Should Fix)

   - Performance bottlenecks
   - Code maintainability problems
   - Missing error handling

3. **Suggestions** (Consider Improving)
   - Style improvements
   - Refactoring opportunities
   - Modern {{language}} features to adopt

### Refactored Version

Would you like to see a refactored version?
?[%{{refactor}}Yes, show me improved code|No, just highlight issues]

If {{refactor}} is "Yes, show me improved code":
Provide refactored code that:

- Addresses the {{concern}} priorities
- Follows {{language}} best practices
- Includes explanatory comments
- Maintains backward compatibility

### Learning Resources

Based on issues found, recommend:

- Specific {{language}} documentation sections
- Best practice guides for {{code_type}}
- Tools for automated checking
- Related design patterns
```

## Best Practices for Complete Templates

### 1. Progressive Complexity

Start simple and build complexity based on user responses:

```markdown
## Getting Started

What's your experience level?
?[%{{level}}Beginner|Advanced]

If {{level}} is "Beginner":
[Simple content and options]

If {{level}} is "Advanced":
[Complex content and more options]
```

### 2. Maintain Context

Reference previous choices throughout:

```markdown
Earlier you mentioned {{previous_choice}}.
Building on that, let's explore...
```

### 3. Provide Value at Each Step

Each interaction should deliver immediate value:

```markdown
You selected {{option}}.
Here's what that means for you: [immediate insight]
Let's dive deeper: [continued interaction]
```

### 4. Clear Navigation

Help users understand where they are:

```markdown
## Step {{current_step}} of {{total_steps}}: {{step_title}}

Previous: {{previous_step}}
Next: {{next_step}}
```

### 5. Graceful Fallbacks

Handle edge cases:

```markdown
If the user's input "{{input}}" doesn't match expected patterns:
Ask for clarification
Provide examples
Offer default option
```

## Testing Your Templates

Before deploying, test:

1. **All Paths**: Try every combination of choices
2. **Edge Cases**: Unusual inputs or combinations
3. **Variable States**: Missing or empty variables
4. **User Experience**: Is the flow logical and engaging?
5. **AI Interpretation**: Are instructions clear and unambiguous?

## Next Steps

- Return to [Syntax Overview](index.md)
- Explore [Variables](variables.md) in depth
- Master [User Input](user-input.md) patterns
- Perfect [AI Instructions](ai-instructions.md)
