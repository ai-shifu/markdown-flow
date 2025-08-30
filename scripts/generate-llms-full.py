#!/usr/bin/env python3
"""
Generate llms-full.txt by combining all English documentation files.
This script is run automatically by GitHub Actions on push to main branch.

The script automatically discovers and processes all markdown files in the
documentation directory, adapting to changes in structure without modification.
"""

import re
from pathlib import Path
from typing import List, Dict, Set, Tuple


def read_file(filepath: Path) -> str:
    """Read a markdown file and return its content."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Warning: Could not read {filepath}: {e}")
        return ""


def process_markdown(content: str, filepath: Path) -> str:
    """Process markdown content to prepare it for llms-full.txt."""
    # Remove YAML frontmatter
    content = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)

    # Add source file reference
    relative_path = filepath.relative_to(Path.cwd())
    header = f"<!-- Source: {relative_path} -->"

    return f"{header}\n{content.strip()}"


def get_title_from_content(filepath: Path) -> str:
    """Extract title from markdown file content."""
    content = read_file(filepath)

    # Try to get title from YAML frontmatter
    frontmatter_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if frontmatter_match:
        yaml_content = frontmatter_match.group(1)
        title_match = re.search(r'^title:\s*(.+)$', yaml_content, re.MULTILINE)
        if title_match:
            return title_match.group(1).strip('"\'')

    # Try to get title from first H1 heading
    h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    if h1_match:
        return h1_match.group(1).strip()

    # Fall back to filename
    return filepath.stem.replace('-', ' ').title()


def order_files_logically(files: List[Path]) -> List[Path]:
    """
    Order files in a logical reading sequence.
    Common patterns: index/overview first, then alphabetical or by complexity.
    """
    # Define priority order for common file names
    priority_names = [
        'index.md',
        'overview.md',
        'introduction.md',
        'concepts.md',
        'getting-started.md',
        'quick-start.md',
        'installation.md',
        'setup.md',
        'tutorial.md',
        'integration.md',
        'configuration.md',
        'usage.md',
        'examples.md',
        'advanced.md',
        'next-steps.md',
        'faq.md',
        'troubleshooting.md',
        'reference.md',
        'api.md',
        'changelog.md'
    ]

    def sort_key(filepath: Path):
        name = filepath.name.lower()
        # Check if file matches any priority pattern
        for i, priority in enumerate(priority_names):
            if name == priority or name.startswith(priority.replace('.md', '')):
                return (0, i, filepath.name)
        # Otherwise, sort alphabetically
        return (1, 0, filepath.name)

    return sorted(files, key=sort_key)


def discover_documentation_structure() -> Dict[str, List[Path]]:
    """
    Automatically discover documentation structure.
    Returns an ordered dictionary with section names as keys and file lists as values.
    """
    base_path = Path.cwd()
    docs_en_path = base_path / "docs" / "docs" / "en"

    if not docs_en_path.exists():
        print(f"Warning: Documentation path {docs_en_path} does not exist")
        return {}

    # Use list to maintain order
    sections: List[Tuple[str, List[Path]]] = []
    processed_files: Set[Path] = set()

    # 1. Add README first if it exists
    readme = base_path / "README.md"
    if readme.exists():
        sections.append(("Project Overview", [readme]))
        processed_files.add(readme)

    # 2. Add the main index file if it exists
    index_file = docs_en_path / "index.md"
    if index_file.exists():
        sections.append(("Getting Started", [index_file]))
        processed_files.add(index_file)

    # 3. Process all subdirectories in the docs/en path
    subdirs = sorted([d for d in docs_en_path.iterdir()
                     if d.is_dir() and not d.name.startswith('.')])

    for subdir in subdirs:
        # Get all markdown files in this directory
        md_files = [f for f in subdir.glob(
            "*.md") if not f.name.startswith('.')]

        # Skip certain metadata files
        skip_files = {'tags.md', 'search.md', '404.md', '_index.md'}
        md_files = [f for f in md_files if f.name not in skip_files]

        if md_files:
            # Create section name from directory name
            section_name = subdir.name.replace('-', ' ').title()

            # Special case mappings for better names
            name_mappings = {
                'Getting Started': 'Getting Started Guides',
                'Sdks': 'SDKs and Libraries',
                'Api': 'API Documentation',
                'Docs': 'Documentation',
                'Spec': 'Specification',
            }
            section_name = name_mappings.get(section_name, section_name)

            # Order files logically
            ordered_files = order_files_logically(md_files)
            sections.append((section_name, ordered_files))
            processed_files.update(ordered_files)

            # Also check for subdirectories (like javascript under sdks)
            for subsub in sorted(subdir.iterdir()):
                if subsub.is_dir() and not subsub.name.startswith('.'):
                    sub_md_files = [f for f in subsub.glob("*.md")
                                    if not f.name.startswith('.') and f.name not in skip_files]
                    if sub_md_files:
                        subsection_name = f"{section_name} - {subsub.name.replace('-', ' ').title()}"
                        ordered_sub_files = order_files_logically(sub_md_files)
                        sections.append((subsection_name, ordered_sub_files))
                        processed_files.update(ordered_sub_files)

    # 4. Add any remaining markdown files in the root docs directory
    root_files = [f for f in docs_en_path.glob("*.md")
                  if f not in processed_files and not f.name.startswith('.')]

    # Skip certain files
    skip_files = {'tags.md', 'search.md', '404.md'}
    root_files = [f for f in root_files if f.name not in skip_files]

    if root_files:
        sections.append(("Additional Documentation",
                        order_files_logically(root_files)))

    # Convert to dictionary maintaining order
    result: Dict[str, List[Path]] = {}
    for section_name, files in sections:
        result[section_name] = files

    return result


def generate_toc(structure: Dict[str, List[Path]]) -> str:
    """Generate a table of contents for the document."""
    toc_lines = ["# MarkdownFlow - Complete Documentation", ""]
    toc_lines.append("## Table of Contents")
    toc_lines.append("")

    for section_name, files in structure.items():
        # Add section to TOC
        anchor = section_name.lower().replace(" ", "-").replace("---", "-")
        toc_lines.append(f"- [{section_name}](#{anchor})")

        # Add individual files under the section
        for filepath in files:
            file_title = get_title_from_content(filepath)
            file_anchor = f"{anchor}-{filepath.stem}"
            toc_lines.append(f"  - [{file_title}](#{file_anchor})")

    toc_lines.append("")
    return "\n".join(toc_lines)


def generate_llms_full():
    """Main function to generate llms-full.txt."""
    print("="*60)
    print("Generating llms-full.txt")
    print("="*60)
    print("\n📂 Automatically discovering documentation structure...")

    # Discover documentation structure
    structure = discover_documentation_structure()

    if not structure:
        print("❌ Error: No documentation files found!")
        return

    print(f"\n✅ Discovered {len(structure)} documentation sections:")
    for section_name, files in structure.items():
        print(f"   • {section_name}: {len(files)} files")

    # Generate table of contents
    print("\n📝 Generating table of contents...")
    toc = generate_toc(structure)

    # Process all documents
    print("\n📚 Processing documentation files...")
    all_content = [toc]
    file_count = 0

    for section_name, files in structure.items():
        # Add section header
        all_content.append(f"\n---\n\n## {section_name}\n")

        for filepath in files:
            print(f"   • Processing: {filepath.relative_to(Path.cwd())}")

            content = read_file(filepath)
            if content:
                processed = process_markdown(content, filepath)

                # Add subsection header for each file
                file_title = get_title_from_content(filepath)
                all_content.append(f"\n### {file_title}\n")
                all_content.append(processed)
                file_count += 1

    # Combine all content
    full_document = "\n".join(all_content)

    # Add footer
    full_document += "\n\n---\n\n"
    full_document += "This document was automatically generated from the MarkdownFlow documentation.\n"
    full_document += "For the latest version, visit: https://markdownflow.ai\n"

    # Write to file
    output_path = Path.cwd() / "home" / "llms-full.txt"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_document)

    # Print statistics
    file_size = len(full_document)

    print(f"\n{'='*60}")
    print(f"✨ Success! Generated llms-full.txt")
    print(f"{'='*60}")
    print(f"📊 Statistics:")
    print(f"   • Processed files: {file_count}")
    print(f"   • Documentation sections: {len(structure)}")
    print(
        f"   • Output size: {file_size:,} characters ({file_size/1024:.1f} KB)")
    print(f"   • Output location: {output_path.relative_to(Path.cwd())}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    generate_llms_full()
