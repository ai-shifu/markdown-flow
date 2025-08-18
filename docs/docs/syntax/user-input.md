# User Input

User input elements make MarkdownFlow documents interactive, allowing users to make choices and provide information that shapes the content they receive.

## Basic Syntax

The user input syntax consists of three parts:

```markdown
?[${{variable_name}}Option 1|Option 2|Option 3]
```

- `?` - Indicates an interactive element
- `[${{variable_name}}...]` - Defines the variable and options
- `|` - Separates multiple options

## Single Choice Input

The most common input type is single-choice selection:

```markdown
?[${{preference}}Beginner|Intermediate|Advanced]
```

This creates a selection interface where users choose one option, and the choice is stored in `{{preference}}`.

## Input Types

### 1. Binary Choice

For yes/no or true/false decisions:

```markdown
?[${{continue}}Yes|No]

?[${{agree}}I agree|I disagree]

?[${{subscribe}}Subscribe to newsletter|No thanks]
```

### 2. Multiple Options

Offer several choices:

```markdown
?[${{language}}English|Spanish|French|German|Chinese]

?[${{topic}}Web Development|Data Science|Machine Learning|Cloud Computing]
```

### 3. Range Selection

For levels or scales:

```markdown
?[${{difficulty}}Very Easy|Easy|Medium|Hard|Very Hard]

?[${{satisfaction}}1 - Very Unsatisfied|2|3|4|5 - Very Satisfied]
```

### 4. Action Selection

For choosing next steps:

```markdown
?[${{next_action}}Continue to next lesson|Review this section|Take a break|Ask for help]
```

## Using Collected Input

Once input is collected, use the variable in subsequent content:

```markdown
What's your experience level?
?[${{level}}Beginner|Intermediate|Expert]

---

You selected: {{level}}

Generate appropriate content for someone at {{level}} level:
- Include relevant examples
- Adjust complexity accordingly
- Provide suitable challenges
```

## Conditional Content Based on Input

Combine user input with AI instructions:

```markdown
What would you like to learn?
?[${{topic}}Python Basics|Web APIs|Data Analysis]

---

The user wants to learn about "{{topic}}".

If {{topic}} is "Python Basics":
  Start with variables, data types, and control structures.
  
If {{topic}} is "Web APIs":
  Cover HTTP methods, REST principles, and authentication.
  
If {{topic}} is "Data Analysis":
  Focus on pandas, data visualization, and statistical methods.
```

## Multiple Input Points

Create branching narratives with multiple inputs:

```markdown
## Choose Your Path

What's your role?
?[${{role}}Developer|Designer|Manager]

---

As a {{role}}, what's your main goal?

If {{role}} is "Developer":
  ?[${{dev_goal}}Learn new framework|Improve code quality|Build faster apps]

If {{role}} is "Designer":
  ?[${{design_goal}}Master new tools|Improve UX|Create design systems]

If {{role}} is "Manager":
  ?[${{mgmt_goal}}Team productivity|Project planning|Stakeholder communication]
```

## Input Validation Patterns

### Required Selection

Make it clear when input is mandatory:

```markdown
**Please select your preferred learning style:** (Required)
?[${{learning_style}}Visual|Auditory|Reading/Writing|Kinesthetic]

Continue only after {{learning_style}} is selected.
```

### Progressive Disclosure

Reveal options based on previous choices:

```markdown
Select your industry:
?[${{industry}}Technology|Healthcare|Education|Finance|Other]

If {{industry}} is "Technology":
  What's your specialization?
  ?[${{tech_spec}}Frontend|Backend|Full-stack|DevOps|Mobile]

If {{industry}} is "Healthcare":
  What's your role?
  ?[${{health_role}}Doctor|Nurse|Administrator|Researcher]
```

## Formatting Options

### With Descriptions

Add context to help users choose:

```markdown
?[${{plan}}
  Free - Basic features for individuals|
  Pro ($9/mo) - Advanced features for professionals|
  Team ($29/mo) - Collaboration tools for teams
]
```

### With Icons

Make options more visual:

```markdown
?[${{mood}}
  😊 Happy|
  😐 Neutral|
  😔 Sad|
  😡 Frustrated
]
```

### With Examples

Clarify options with examples:

```markdown
?[${{format}}
  JSON (e.g., {"key": "value"})|
  XML (e.g., <tag>value</tag>)|
  CSV (e.g., col1,col2,col3)
]
```

## Best Practices

### 1. Clear Option Labels

```markdown
Good:
?[${{experience}}Less than 1 year|1-3 years|3-5 years|More than 5 years]

Poor:
?[${{exp}}Low|Medium|High]
```

### 2. Logical Order

Arrange options in a meaningful sequence:

```markdown
?[${{frequency}}Daily|Weekly|Monthly|Yearly|Never]

?[${{size}}Small|Medium|Large|Extra Large]
```

### 3. Balanced Options

Avoid bias in option presentation:

```markdown
Good:
?[${{feedback}}Very satisfied|Satisfied|Neutral|Dissatisfied|Very dissatisfied]

Poor:
?[${{feedback}}Amazing!|Good|OK|Not great]
```

### 4. Reasonable Option Count

Keep choices manageable (3-7 options typically):

```markdown
Good:
?[${{color}}Red|Blue|Green|Yellow|Purple]

Poor:
?[${{color}}Red|Orange|Yellow|Green|Blue|Indigo|Violet|Pink|Brown|Black|White|Gray|...]
```

## Advanced Patterns

### Workflow Navigation

Guide users through multi-step processes:

```markdown
## Step 1: Choose Your Goal
?[${{goal}}Learn basics|Build project|Solve problem]

## Step 2: Select Difficulty
Based on "{{goal}}", choose your comfort level:
?[${{difficulty}}Guided tutorial|Some guidance|Independent work]

## Step 3: Time Commitment
How much time do you have?
?[${{time}}15 minutes|30 minutes|1 hour|Unlimited]

Generate a {{time}} {{difficulty}} session for "{{goal}}".
```

### Dynamic Forms

Create form-like experiences:

```markdown
## Project Setup

Project type:
?[${{project_type}}Web App|Mobile App|API|Library]

Primary language:
?[${{language}}JavaScript|Python|Java|Go]

Database needed?
?[${{needs_db}}Yes|No]

If {{needs_db}} is "Yes":
  Database type:
  ?[${{db_type}}PostgreSQL|MySQL|MongoDB|Redis]
```

### Feedback Collection

Gather user opinions:

```markdown
## How was this lesson?

Content quality:
?[${{content_rating}}Excellent|Good|Fair|Poor]

Pace:
?[${{pace_rating}}Too fast|Just right|Too slow]

Would you recommend this?
?[${{recommend}}Definitely|Probably|Maybe|No]
```

## Integration with Variables

Combine input with existing variables:

```markdown
Hi {{user_name}}, what would you like to do today?
?[${{today_goal}}
  Continue {{last_lesson}}|
  Start something new|
  Review past lessons|
  Take assessment
]
```

## Error Handling

Provide fallbacks for edge cases:

```markdown
Select your choice:
?[${{choice}}Option A|Option B|I'm not sure]

If {{choice}} is "I'm not sure":
  No problem! Let me explain the options in more detail...
```

## Accessibility Considerations

Make inputs accessible:

```markdown
**Question:** What's your preferred contact method?
**Note:** You can change this later in settings.

?[${{contact_method}}
  Email - Receive updates in your inbox|
  SMS - Get text notifications|
  In-app - See messages when you log in|
  None - No notifications
]
```

## Next Steps

- [AI Instructions](ai-instructions.md) - Process user input with AI
- [Variables](variables.md) - Store and use input values
- [Examples](examples.md) - See complete interactive templates