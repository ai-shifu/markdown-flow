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
        playground: {
            cta: '🎮 Try It Now',
            subtext: 'Free • No signup • Share your creations instantly'
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
        playground: {
            cta: '🎮 立即体验',
            subtext: '完全免费 • 无需注册 • 即刻分享你的创作'
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
        footer: '©2025 AI师傅公司'
    }
};
