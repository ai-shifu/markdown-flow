const translations = {
    en: {
        title: 'MarkdownFlow - Write Once, Deliver Personally',
        lang: 'en',
        languageSwitcher: '🌐 中文',
        languageSwitcherUrl: '/zh/',
        navigation: {
            documentation: 'Documentation',
            github: 'GitHub',
            playground: '🎮 Try Playground'
        },
        hero: {
            title: 'Write Once, Deliver Personally',
            description: 'Know <a href="https://commonmark.org/help/" target="_blank" rel="noopener noreferrer">Markdown</a>? You\'re ready. Just write Markdown, and AI makes it personal, interactive, and beautiful for every reader.'
        },
        features: [
            {
                icon: '📚',
                title: 'Education',
                description: 'Generate personalized learning materials for students at different levels. A single curriculum outline automatically adjusts difficulty and teaching methods based on students\' foundation, interests, and learning progress.'
            },
            {
                icon: '✍️',
                title: 'Content Creation',
                description: 'Articles that automatically adjust technical terminology based on readers\' background knowledge. Provide detailed explanations for beginners while delivering key points directly to professionals.'
            },
            {
                icon: '📰',
                title: 'News Media',
                description: 'The same news story expands from different angles based on readers\' interests. Technology-focused readers see technical details, while business-oriented readers receive market analysis.'
            },
            {
                icon: '🎮',
                title: 'Interactive Storytelling',
                description: 'Create interactive narratives where every reader choice influences the plot direction, generating unique adventure experiences.'
            },
            {
                icon: '💼',
                title: 'Corporate Training',
                description: 'Automatically generate customized training materials and operation manuals based on employees\' departments, positions, and skill levels.'
            }
        ],
        examples: {
            title: 'Examples',
            items: [
                {
                    title: '📖 Interactive Story',
                    code: '# The Mysterious Forest Adventure\n\nYou are a brave explorer standing at the entrance to the legendary mysterious forest.\n\nYou see two paths before you:\n?[%{{path}}The sunny path on the left|The shadowy trail on the right]\n\n---\n\nGenerate different adventure stories based on the {{path}} choice:\n\n- If "The sunny path on the left" is chosen: Encounter friendly sprites and receive magical blessings\n- If "The shadowy trail on the right" is chosen: Discover ancient treasures that require solving puzzles'
                },
                {
                    title: '📰 Personalized News',
                    code: '# Today\'s Tech News: AI Breakthrough\n\nWhich aspect interests you most?\n?[%{{focus}}Technical Principles|Business Applications|Social Impact|Investment Opportunities]\n\n---\n\nExpand content based on the reader\'s selected {{focus}}:\n\n- Maintain objective and neutral journalistic standards\n- Include relevant expert opinions\n- Provide background information and context'
                },
                {
                    title: '💬 Personalized Consultation',
                    code: '# Career Development Consultation Instructions\n\nGenerate a professional greeting for {{client_name}} explaining you\'ll help with their career development in {{industry}}.\n\nAcknowledge their current role as {{current_position}} and their {{years_experience}} years of experience. Express that you\'ll provide personalized guidance to help them achieve their goals.\n\nAsk them to clarify their career objectives by presenting these options:\n\n?[%{{career_goal}}I want to advance in my current company|I want to change industries|I want to start my own business|I want better work-life balance]\n\n---\n\n# Generate Tailored Career Advice\n\nThe client chose: "{{career_goal}}"\n\nAcknowledge their goal positively, noting it\'s an excellent objective for someone with {{years_experience}} years of experience in {{industry}}.\n\nGenerate specific guidance based on their choice:\n\nIf {{career_goal}} is "I want to advance in my current company": Provide advice on internal networking, skill development aligned with company needs, and strategies for visibility and promotion within their current organization.\n\nIf {{career_goal}} is "I want to change industries": Discuss transferable skills, industry research strategies, networking approaches, and how to position their {{current_position}} experience for a new field.\n\nIf {{career_goal}} is "I want to start my own business": Cover business planning, financial preparation, market research, and how to leverage their {{years_experience}} years of experience as a foundation.\n\nIf {{career_goal}} is "I want better work-life balance": Explore boundary-setting strategies, time management, remote work options, and how to negotiate flexible arrangements.\n\nProvide 3-4 specific action steps tailored to their goal of "{{career_goal}}" and {{industry}} context.\n\nThen ask what they\'d like to focus on first with these options:\n\n?[%{{focus_area}}Create an action plan|Learn about networking strategies|Discuss skill development|Get industry insights]'
                },
                {
                    title: '📋 User Information Collection',
                    code: '# Health Assessment Information Gathering\n\nGenerate a welcoming introduction for a health assessment. Explain that you\'ll ask a few questions to create personalized recommendations.\n\nAsk the user about their primary health goal. Present these options:\n?[%{{health_goal}}Lose weight|Gain muscle|Improve cardiovascular health|Manage stress|Better sleep|General wellness]\n\n---\n\n# Activity Level Collection\n\nAcknowledge their choice of "{{health_goal}}" positively.\n\nAsk about their current activity level with these options:\n?[%{{activity_level}}Very active (exercise 5+ times/week)|Moderately active (exercise 2-4 times/week)|Lightly active (exercise 1-2 times/week)|Sedentary (little to no exercise)]\n\n---\n\n# Dietary Preference Collection\n\nReference their previous choices: they are "{{activity_level}}" and want to "{{health_goal}}".\n\nAsk about their dietary approach with these options:\n?[%{{diet_type}}No restrictions - I eat everything|Vegetarian|Vegan|Keto/Low-carb|Mediterranean|Intermittent fasting|Other special diet]\n\n---\n\n# Time Commitment Collection\n\nCreate a summary of their profile so far:\n- Goal: {{health_goal}}\n- Activity level: {{activity_level}}\n- Diet preference: {{diet_type}}\n\nAsk how much time they can commit to health activities daily:\n?[%{{time_commitment}}Less than 30 minutes|30-60 minutes|1-2 hours|More than 2 hours]\n\n---\n\n# Generate Personalized Plan\n\nCreate a comprehensive health plan based on their complete profile:\n- Goal: {{health_goal}}\n- Activity level: {{activity_level}}\n- Diet preference: {{diet_type}}\n- Time available: {{time_commitment}}\n\nThe plan should include:\n1. Specific strategies for achieving "{{health_goal}}" suitable for someone who is "{{activity_level}}"\n2. Meal planning recommendations that align with "{{diet_type}}" preferences\n3. Exercise routines that fit within "{{time_commitment}}" daily schedule\n4. Progress tracking methods appropriate for their goal\n\nMake all recommendations practical and achievable for their specific profile.'
                }
            ]
        },
        projects: {
            title: 'Open Source Projects',
            items: [
                {
                    name: 'markdown-flow-ui',
                    type: 'FRONTEND',
                    typeClass: 'frontend',
                    description: 'Complete UI components with built-in functionality. Ready-to-use React components for interactive markdown documents.'
                },
                {
                    name: 'remark-flow',
                    type: 'FRONTEND',
                    typeClass: 'frontend',
                    description: 'React-markdown plugin for MarkdownFlow syntax. Extends react-markdown with variable processing and AI integration.'
                },
                {
                    name: 'markdown-it-flow',
                    type: 'FRONTEND',
                    typeClass: 'frontend',
                    description: 'Markdown-it plugin for MarkdownFlow syntax. Adds MarkdownFlow capabilities to any markdown-it powered application.'
                },
                {
                    name: 'markdown-flow-agent-py',
                    type: 'BACKEND',
                    typeClass: 'backend',
                    description: 'Python backend implementation. FastAPI-based server with template processing and LLM integration capabilities.'
                },
                {
                    name: 'markdown-flow-agent-go',
                    type: 'BACKEND',
                    typeClass: 'backend',
                    description: 'Go backend implementation. High-performance server with concurrent processing and minimal resource usage.'
                },
                {
                    name: 'markdown-flow',
                    type: 'DEMO',
                    typeClass: 'demo',
                    description: 'Testing and development platform. Interactive demo showcasing MarkdownFlow capabilities with live examples.'
                }
            ]
        },
        footer: '© 2025 AI Shifu, LLC.'
    },
    zh: {
        title: 'MarkdownFlow - 一次创作，千人千面',
        lang: 'zh',
        languageSwitcher: '🌐 English',
        languageSwitcherUrl: '/',
        navigation: {
            documentation: '文档',
            github: 'GitHub',
            playground: '🎮 体验台'
        },
        hero: {
            title: '一次创作，千人千面',
            description: '会用 <a href="https://commonmark.org/help/" target="_blank" rel="noopener noreferrer">Markdown</a>？那你就准备好了。只需编写 Markdown，AI 就能为每位读者打造个性化、交互式和精美的内容。'
        },
        features: [
            {
                icon: '📚',
                title: '教育',
                description: '为不同程度的学生生成个性化学习材料。单一课程大纲会根据学生的基础、兴趣和学习进度自动调整难度和教学方法。'
            },
            {
                icon: '✍️',
                title: '内容创作',
                description: '根据读者的背景知识自动调整技术术语的文章。为初学者提供详细解释，同时直接为专业人士提供要点。'
            },
            {
                icon: '📰',
                title: '新闻媒体',
                description: '同一新闻报道根据读者兴趣从不同角度展开。技术关注者看到技术细节，商业导向的读者获得市场分析。'
            },
            {
                icon: '🎮',
                title: '交互式故事',
                description: '创建交互式叙事，每位读者的选择都会影响情节发展，生成独特的冒险体验。'
            },
            {
                icon: '💼',
                title: '企业培训',
                description: '根据员工的部门、职位和技能水平自动生成定制的培训材料和操作手册。'
            }
        ],
        examples: {
            title: '示例',
            items: [
                {
                    title: '📖 交互式故事',
                    code: '# 神秘森林冒险\n\n你是一位勇敢的探险者，站在传说中神秘森林的入口。\n\n你看到前方有两条路：\n?[%{{path}}左边阳光明媚的小径|右边阴暗的小道]\n\n---\n\n根据{{path}}选择生成不同的冒险故事：\n\n- 如果选择"左边阳光明媚的小径"：遇到友善的精灵并获得魔法祝福\n- 如果选择"右边阴暗的小道"：发现需要解谜的古代宝藏'
                },
                {
                    title: '📰 个性化新闻',
                    code: '# 今日科技新闻：AI 突破\n\n你最感兴趣哪个方面？\n?[%{{focus}}技术原理|商业应用|社会影响|投资机会]\n\n---\n\n根据读者选择的{{focus}}展开内容：\n\n- 保持客观中立的新闻标准\n- 包含相关专家观点\n- 提供背景信息和上下文'
                },
                {
                    title: '💬 个性化咨询',
                    code: '# 职业发展咨询指令\n\n为{{client_name}}生成专业的问候语，说明你将帮助他们在{{industry}}行业的职业发展。\n\n确认他们当前担任{{current_position}}职位，拥有{{years_experience}}年经验。表达你将提供个性化指导帮助他们实现目标。\n\n请他们通过以下选项明确职业目标：\n\n?[%{{career_goal}}我想在当前公司晋升|我想转换行业|我想创业|我想改善工作生活平衡]\n\n---\n\n# 生成量身定制的职业建议\n\n客户选择了："{{career_goal}}"\n\n积极确认他们的目标，指出这对于在{{industry}}行业拥有{{years_experience}}年经验的人来说是一个出色的目标。\n\n根据他们的选择生成具体指导：\n\n如果{{career_goal}}是"我想在当前公司晋升"：提供关于内部网络建设、技能发展与公司需求匹配以及在当前组织内提高知名度和晋升策略的建议。\n\n如果{{career_goal}}是"我想转换行业"：讨论可转移技能、行业研究策略、网络建设方法以及如何将{{current_position}}经验定位到新领域。\n\n如果{{career_goal}}是"我想创业"：涵盖商业规划、财务准备、市场研究以及如何利用{{years_experience}}年经验作为基础。\n\n如果{{career_goal}}是"我想改善工作生活平衡"：探讨边界设定策略、时间管理、远程工作选择以及如何协商灵活安排。\n\n提供3-4个针对"{{career_goal}}"目标和{{industry}}背景的具体行动步骤。\n\n然后询问他们希望首先关注什么，提供以下选项：\n\n?[%{{focus_area}}制定行动计划|了解网络建设策略|讨论技能发展|获得行业洞察]'
                },
                {
                    title: '📋 用户信息收集',
                    code: '# 健康评估信息收集\n\n为健康评估生成欢迎介绍。说明你将询问几个问题以创建个性化建议。\n\n询问用户的主要健康目标。提供以下选项：\n?[%{{health_goal}}减重|增肌|改善心血管健康|管理压力|改善睡眠|整体健康]\n\n---\n\n# 活动水平收集\n\n积极确认他们选择的"{{health_goal}}"。\n\n询问他们当前的活动水平，提供以下选项：\n?[%{{activity_level}}非常活跃（每周锻炼5次以上）|中等活跃（每周锻炼2-4次）|轻度活跃（每周锻炼1-2次）|久坐（很少或不锻炼）]\n\n---\n\n# 饮食偏好收集\n\n引用他们之前的选择：他们"{{activity_level}}"并希望"{{health_goal}}"。\n\n询问他们的饮食方式，提供以下选项：\n?[%{{diet_type}}无限制 - 什么都吃|素食主义|纯素食|生酮/低碳水|地中海饮食|间歇性禁食|其他特殊饮食]\n\n---\n\n# 时间投入收集\n\n创建他们到目前为止的档案摘要：\n- 目标：{{health_goal}}\n- 活动水平：{{activity_level}}\n- 饮食偏好：{{diet_type}}\n\n询问他们每天可以投入多少时间进行健康活动：\n?[%{{time_commitment}}少于30分钟|30-60分钟|1-2小时|超过2小时]\n\n---\n\n# 生成个性化计划\n\n基于他们的完整档案创建综合健康计划：\n- 目标：{{health_goal}}\n- 活动水平：{{activity_level}}\n- 饮食偏好：{{diet_type}}\n- 可用时间：{{time_commitment}}\n\n计划应包括：\n1. 适合"{{activity_level}}"的人实现"{{health_goal}}"的具体策略\n2. 符合"{{diet_type}}"偏好的膳食规划建议\n3. 适合"{{time_commitment}}"每日时间表的锻炼例程\n4. 适合他们目标的进度跟踪方法\n\n让所有建议对他们的特定档案都实用可行。'
                }
            ]
        },
        projects: {
            title: '开源项目',
            items: [
                {
                    name: 'markdown-flow-ui',
                    type: '前端',
                    typeClass: 'frontend',
                    description: '具有内置功能的完整 UI 组件。适用于交互式 Markdown 文档的即用型 React 组件。'
                },
                {
                    name: 'remark-flow',
                    type: '前端',
                    typeClass: 'frontend',
                    description: '用于 MarkdownFlow 语法的 React-markdown 插件。扩展 react-markdown 支持变量处理和 AI 集成。'
                },
                {
                    name: 'markdown-it-flow',
                    type: '前端',
                    typeClass: 'frontend',
                    description: '用于 MarkdownFlow 语法的 Markdown-it 插件。为任何基于 markdown-it 的应用程序添加 MarkdownFlow 功能。'
                },
                {
                    name: 'markdown-flow-agent-py',
                    type: '后端',
                    typeClass: 'backend',
                    description: 'Python 后端实现。基于 FastAPI 的服务器，具有模板处理和 LLM 集成功能。'
                },
                {
                    name: 'markdown-flow-agent-go',
                    type: '后端',
                    typeClass: 'backend',
                    description: 'Go 后端实现。高性能服务器，具有并发处理和最小资源使用。'
                },
                {
                    name: 'markdown-flow',
                    type: '演示',
                    typeClass: 'demo',
                    description: '测试和开发平台。展示 MarkdownFlow 功能的交互式演示，包含实时示例。'
                }
            ]
        },
        footer: '©2025 AI师傅公司。'
    }
};
