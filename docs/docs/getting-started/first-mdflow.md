# Your First MarkdownFlow

Learn to write instructions for AI that create personalized content. In 5 minutes, you'll build a smart personal introduction that adapts to each visitor.

**🌐 [Try it live in the Playground](https://play.mdflow.run)** - Copy each example and test it!

**What we'll build:** We'll start with simple **Content Prompts** - these are instructions that test whether the AI understands your intent and has the relevant knowledge and capabilities. Then we'll gradually make them more sophisticated and personalized.

## Step 1: Basic AI Instruction (1 minute)

Instead of writing fixed content, write instructions for AI:

```markdown
Generate a personal introduction for Alex Chen.

Include these facts:
- Works in technology
- 5 years of experience
- Builds apps and websites
- Enjoys hiking and photography
- Always learning new technologies

Keep it professional and friendly.
```

**🚀 Try this in the Playground now!** You'll see AI generate a complete introduction.

But there's a problem - everyone gets the same generic result.

## Step 2: Add Personalization (1 minute)

Let's make it adapt to different visitors:

```markdown
Ask the visitor who they are. Client, recruiter, colleague, friend, or potential date?

?[%{{visitor_type}}Potential Client|Recruiter|Colleague|Friend|Potential Date]

Generate Alex Chen's introduction tailored for {{visitor_type}}.

Include these facts:
- Works in technology  
- 5 years of experience
- Builds apps and websites
- Enjoys hiking and photography
- Always learning new technologies

Adapt the tone and emphasis for {{visitor_type}}.
```

**🚀 Test this in the Playground!** Try different visitor types - see how the same facts create completely different introductions.

## Step 3: Add Detailed Instructions (2 minutes)

Make your instructions more specific to get better, more consistent results:

```markdown
Ask the visitor who they are. Client, recruiter, colleague, friend, or potential date?

?[%{{visitor_type}}Potential Client|Recruiter|Colleague|Friend|Potential Date]

Generate Alex Chen's introduction tailored for {{visitor_type}}:

- For potential clients: emphasize reliability, successful projects, and problem-solving skills
- For recruiters: highlight technical skills, career achievements, and professional growth  
- For colleagues: focus on collaboration, shared interests, and teamwork
- For friends: share personal interests, hobbies, and what makes life fun
- For potential dates: showcase personality, lifestyle, and what makes relationships enjoyable

Include these specific facts:
- 5 years in technology
- Builds apps and websites
- Enjoys hiking and photography
- Always learning new technologies
```

**🚀 Test in the Playground!** Compare this with Step 2 - notice how more detailed instructions create more focused, relevant introductions.

**Important:** The more specific facts you provide, the less AI will "hallucinate" (make up information). Always give AI real details to work with.

## Step 4: Prevent AI Hallucination (1 minute)

AI sometimes invents information when it doesn't have enough details. Let's fix this:

```markdown
Ask the visitor who they are. Client, recruiter, colleague, friend, or potential date?

?[%{{visitor_type}}Potential Client|Recruiter|Colleague|Friend|Potential Date]

Generate Alex Chen's introduction tailored for {{visitor_type}}:

- For potential clients: emphasize reliability, successful projects, and problem-solving skills
- For recruiters: highlight technical skills, career achievements, and professional growth  
- For colleagues: focus on collaboration, shared interests, and teamwork
- For friends: share personal interests, hobbies, and what makes life fun
- For potential dates: showcase personality, lifestyle, and what makes relationships enjoyable

Use ONLY these verified facts about Alex:
- Age: 28
- Location: San Francisco
- Job: Senior Software Engineer at TechCorp
- Experience: 5 years in web development
- Skills: React, Node.js, Python
- Projects: Led team that built e-commerce platform used by 50K+ users
- Hobbies: Weekend hiking in Marin County, landscape photography
- Education: CS degree from UC Berkeley
- Personal: Loves trying new coffee shops, has a rescue dog named Luna

Do NOT invent additional details. Keep it authentic and engaging.
```

**🚀 Try this in the Playground!** Notice how providing specific, detailed facts prevents AI from making up information while still creating personalized content.

## Step 5: Add Document Prompt (1 minute)

So far we've been writing **Content Prompts**. If you tested in the Playground, you might notice the AI sometimes uses inconsistent tone, writes from wrong perspective, uses inappropriate formatting, or doesn't quite match the intended audience feel.

**Document Prompt** solves these problems by setting the AI's role and global behavior:

**Document Prompt**:

```markdown
You are a professional personal branding expert representing Alex Chen. Create compelling, authentic introductions on his behalf that highlight his strengths while maintaining his genuine personality. Ensure each introduction feels natural when Alex is introducing himself to {{visitor_type}}.
```

**Content Prompt** (what we've been building):

```markdown
Ask the visitor who they are. Client, recruiter, colleague, friend, or potential date?

?[%{{visitor_type}}Potential Client|Recruiter|Colleague|Friend|Potential Date]

Generate Alex Chen's introduction tailored for {{visitor_type}}:

- For potential clients: emphasize reliability, successful projects, and problem-solving skills
- For recruiters: highlight technical skills, career achievements, and professional growth  
- For colleagues: focus on collaboration, shared interests, and teamwork
- For friends: share personal interests, hobbies, and what makes life fun
- For potential dates: showcase personality, lifestyle, and what makes relationships enjoyable

Use ONLY these verified facts about Alex:
- Age: 28
- Location: San Francisco
- Job: Senior Software Engineer at TechCorp
- Experience: 5 years in web development
- Skills: React, Node.js, Python
- Projects: Led team that built e-commerce platform used by 50K+ users
- Hobbies: Weekend hiking in Marin County, landscape photography
- Education: CS degree from UC Berkeley
- Personal: Loves trying new coffee shops, has a rescue dog named Luna

Do NOT invent additional details. Keep it authentic and engaging.
```

**🚀 Try the complete template in the Playground!**

**Key insight:** Document Prompt sets the overall expertise and tone, while Content Prompt handles the specific personalization. Together they create professional, accurate, and personalized content.

## What's Next?

You've got the fundamentals! Now choose your path:

🚀 **[Start Building →](https://play.mdflow.run)** - Jump into the Playground and create your own templates  
🛠️ **[Installation Guide](installation.md)** - Add MarkdownFlow to your projects  
🎯 **[More Examples](../examples/index.md)** - See advanced templates and use cases  
📚 **[Complete Specification](../specification/overview.md)** - Master every feature  

**Ready to create personalized experiences?** Start experimenting in the **[Playground](https://play.mdflow.run)** now!
