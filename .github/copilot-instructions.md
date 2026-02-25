# GitHub Copilot Instructions — SWE Interview Coding Guide

## Project Overview

This is a **MkDocs Material** static site that serves as a comprehensive SWE coding interview guide.  
Source files live in `docs/`, configuration is in `mkdocs.yml`, and the site is deployed to GitHub Pages via `.github/workflows/deploy.yml`.

## Repository Structure

```
docs/
  index.md              # Home page with icon grid cards
  guide/                # 7-step problem-solving framework (step1–step7, quick-reference, levels)
  examples/             # Worked LeetCode examples (two-sum, valid-parentheses, …)
  patterns/             # 10 algorithm pattern templates (sliding-window, two-pointers, …)
  glossary/             # Algorithms, data-structures, problems index
  flashcards/           # Collapsible self-test flash cards
  quizzes/              # Scored quizzes
  assets/               # Custom JS (tabsync.js) and other static assets
mkdocs.yml              # Site configuration (theme, extensions, nav)
requirements.txt        # Python deps: mkdocs, mkdocs-material, pymdown-extensions
```

## Key Conventions

- **Icons**: Use Material for MkDocs icon shortcodes (`:material-*:`, `:octicons-*:`, `:fontawesome-*:`).  These are rendered via the `pymdownx.emoji` extension — do **not** remove it from `mkdocs.yml`.
- **Code tabs**: Every code example must include tabs for all 7 languages: `Python`, `TypeScript`, `Rust`, `Java`, `C#`, `ASM`, `Scala`.  Use `=== "Language"` syntax under `pymdownx.tabbed`.
- **Admonitions**: Use `!!! tip`, `!!! note`, `!!! warning`, etc. from the `admonition` extension.
- **Diagrams**: Mermaid diagrams are supported via the `pymdownx.superfences` custom fence.
- **Content cards**: The home page uses `<div class="grid cards" markdown>` pattern for feature grids.

## Build & Validate

```bash
pip install -r requirements.txt
mkdocs build --strict   # must pass with zero warnings
mkdocs serve            # local preview at http://127.0.0.1:8000
```

## Style Guidelines

- Keep language consistent with the rest of the guide (concise, technical, interview-focused).
- Do not add new top-level nav sections without updating `mkdocs.yml`.
- All internal links should be relative (e.g., `../guide/index.md`).
