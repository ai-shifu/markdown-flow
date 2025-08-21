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

## MarkdownFlow Syntax

The core MarkdownFlow syntax extensions:

1. **Variables**: `{{variable_name}}` - Dynamic content placeholders
2. **User Input**: `?[%{{variable}}Option1|Option2]` - Interactive buttons that store user choices
3. **Preserved Content**: `===content===` - Content that should not be interpreted by AI

## Documentation Guidelines

When updating documentation:

- Main documentation entry point is `docs/docs/index.md`
- Use formal, official tone for documentation
- Examples should demonstrate practical use cases
- Navigation structure is defined in `docs/mkdocs.yml`

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
