# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MarkdownFlow is a Markdown format extension that enables AI-powered, personalized, and interactive documents. The tagline is "Write Once, Deliver Personally" (一次创作，千人千面). Documents written in MarkdownFlow can be processed by MarkdownFlow Agents to create well-formatted, personalized pages tailored to each reader.

## Repository Structure

This is the main documentation and landing page repository for the MarkdownFlow ecosystem. It contains:

- `index.html` - Homepage with project overview and examples
- `docs/` - MkDocs-based documentation site
- `.github/workflows/` - GitHub Actions for automated deployment

The actual MarkdownFlow implementations are in separate repositories under the ai-shifu organization:

- Frontend: markdown-flow-ui, remark-flow, markdown-it-flow
- Backend: markdown-flow-agent-py, markdown-flow-agent-go

## Common Commands

### Documentation Development

```bash
# Install MkDocs dependencies
pip install mkdocs-material pymdown-extensions

# Run MkDocs locally
cd docs
mkdocs serve

# Build documentation
mkdocs build --site-dir site --clean
```

### Pre-commit Hooks

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run manually on all files
pre-commit run --all-files
```

### Deployment

The site automatically deploys to GitHub Pages when pushing to main branch via `.github/workflows/deploy-gh-pages.yml`. The workflow:

1. Copies `index.html` and `logo.png` to `_site/`
2. Builds MkDocs documentation to `_site/docs/`
3. Deploys to GitHub Pages

## MarkdownFlow Core Principle

**IMPORTANT**: MarkdownFlow documents are written **for AI agents, not for human readers**. This is the fundamental paradigm that must be understood and applied throughout all documentation and examples.

- Content in MarkdownFlow documents serves as **instructions/prompts for AI** to generate personalized content
- Examples should demonstrate **AI instructions**, not direct user-facing content
- Traditional approach: "Welcome, John!" (content for humans)
- MarkdownFlow approach: "Generate a welcoming message for {{user_name}}" (instruction for AI)

## MarkdownFlow Syntax

The core MarkdownFlow syntax extensions:

1. **Variables**: `{{variable_name}}` - Dynamic content placeholders
2. **User Input**: `?[%{{variable}}Option1|Option2]` - Interactive buttons that store user choices
3. **Preserved Content**: `===content===` - Content that should not be interpreted by AI

## Documentation Guidelines

When updating documentation:

- Main documentation entry point is `docs/docs/index.md`
- Use formal, official tone for documentation
- **ALL examples must follow MarkdownFlow core principle**: Show AI instructions, not user content
- Examples should demonstrate practical use cases with proper "writing for AI" approach
- Navigation structure is defined in `docs/mkdocs.yml`
- Ensure consistency with the paradigm: "You write prompts for AI, not content for humans"

## Linting and Formatting

The repository uses:

- **markdownlint** for Markdown linting (config: `.markdownlint.yaml`)
- **prettier** for Markdown formatting
- **pre-commit** hooks that run automatically on commit

Key linting rules:

- Use ATX-style headings (`#`)
- Use dashes for unordered lists (`-`)
- Use fenced code blocks
- Line length limit is disabled (MD013: false)

## Important Files

- `.github/workflows/deploy-gh-pages.yml` - GitHub Pages deployment configuration
- `docs/mkdocs.yml` - MkDocs configuration and navigation structure
- `.pre-commit-config.yaml` - Pre-commit hooks configuration
- `.markdownlint.yaml` - Markdown linting rules

## Translation Glossary (Chinese)

This glossary provides standardized Chinese translations for MarkdownFlow terminology. It should be used as reference for all Chinese localization work to ensure consistency.

### Core Brand Terms

| English | Chinese | Notes |
|---------|---------|-------|
| MarkdownFlow | MarkdownFlow | Keep English brand name |
| MDFlow | MDFlow | Keep English abbreviation |
| MDF | MDF | Keep English abbreviation |

### Core Concepts

| English | Chinese | Notes |
|---------|---------|-------|
| Write Once, Deliver Personally | 一次创作，千人千面 | Project tagline |
| Write prompts for AI, not content for humans | 为 AI 写提示词，而非为人类写内容 | Core principle |
| AI-powered personalized documents | AI 驱动的个性化文档 | |
| Instructions for AI | AI 指令 | |

### Syntax Elements

| English | Chinese | Notes |
|---------|---------|-------|
| Variables | 变量 | `{{variable}}` |
| Interactive Elements | 交互元素 | |
| Button| 按钮| `?[%{{var}}Option]` |
| Input | 输入框| `?[%{{var}}...input hint]` |
| Preserved Content | 确定内容 | `===content===` |
| Preserved Output | 确定输出| Same as above |

### Document Structure

| English | Chinese | Notes |
|---------|---------|-------|
| Content Prompt | 内容提示词 | Document body |
| Document Prompt | 文档提示词 | Global settings |
| Template | 模板 | |
| Block | 块 | |
| Content Block | 内容块 | |
| Interaction Block | 交互块 | |

### Technical Components

| English | Chinese | Notes |
|---------|---------|-------|
| MarkdownFlow Agent | MarkdownFlow 智能体 | Processing engine |
| Frontend | 前端 | |
| Backend | 后端 | |
| SDK | SDK | Keep English |
| Playground | 体验台 | Interactive testing platform |
| Parser | 解析器 | |
| Renderer | 渲染器 | |

### Operations

| English | Chinese | Notes |
|---------|---------|-------|
| Parse | 解析 | |
| Render | 渲染 | |
| Generate | 生成 | |
| Process | 处理 | |
| Execute | 执行 | |
| Analyze | 分析 | |
| Build | 构建 | |
| Deploy | 部署 | |

### Documentation Sections

| English | Chinese | Notes |
|---------|---------|-------|
| Getting Started | 快速开始 | |
| Introduction | 简介 | |
| Core Concepts | 核心概念 | |
| Quick Start | 快速上手 | |
| Integration | 集成 | |
| Next Steps | 下一步 | |
| Specification | 规范说明 | |
| Overview | 概览 | |
| How It Works | 工作原理 | |

## Content Consistency Rules

### Homepage Content Management

**CRITICAL**: The homepage has two content sources that MUST be kept in sync:

1. **Static HTML** (`home/index.html` and `home/zh/index.html`) - For SEO and initial page load
2. **Dynamic JavaScript** (`home/translations.js`) - The actual content users see

**The single source of truth is `home/translations.js`**. When updating homepage content:

1. ALWAYS update `home/translations.js` first (both English and Chinese sections)
2. Then update `home/index.html` to match the English version from translations.js
3. Update `home/zh/index.html` to match the Chinese version from translations.js
4. Update README files to use the same descriptions from translations.js
5. Never update only one file - they must always be synchronized

This prevents inconsistencies where:

- Search engines index different content than what users see
- Static HTML shows outdated information before JavaScript loads
- Different descriptions appear in various project locations

### Areas Requiring Synchronization

- Hero section (title and description)
- Features section (icons, titles, descriptions)  
- Playground section (CTA text and subtext)
- Projects section (all project descriptions)
- Footer text
