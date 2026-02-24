# SWE Interview Coding Guide

A comprehensive, step-by-step framework for solving coding interview problems — built as a navigable [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) site with multi-language code examples.

## Features

- **7-Step Problem Solving Framework** — from understanding the problem to testing and optimization
- **Code examples in 7 languages** — Python, TypeScript, Rust, Java, C#, x86-64 ASM, Scala
- **Global language tab switching** — change one tab and all code blocks switch
- **Mermaid flowcharts** — visual decision trees for data structures, algorithms, and patterns
- **Pattern reference** — sliding window, two pointers, BFS/DFS, DP, binary search
- **LeetCode & NeetCode links** — practice problems for every pattern
- **Dark/light mode** — toggle with one click

## Live Site

Deployed via GitHub Actions to GitHub Pages at:
**[https://ianlintner.github.io/swe_interview_book/](https://ianlintner.github.io/swe_interview_book/)**

## Local Development

```bash
pip install -r requirements.txt
mkdocs serve
```

## Build

```bash
mkdocs build --strict
```

## Deployment

The site is automatically built and deployed to GitHub Pages on every push to `main` via the GitHub Actions workflow in `.github/workflows/deploy.yml`.

## Project Structure

```
├── docs/
│   ├── index.md                    # Home page
│   ├── guide/                      # 7-step framework
│   │   ├── step1-understand.md
│   │   ├── step2-entities.md
│   │   ├── step3-data-structures.md
│   │   ├── step4-algorithms.md
│   │   ├── step5-approach.md
│   │   ├── step6-implement.md
│   │   └── step7-test-optimize.md
│   ├── examples/                   # Worked LeetCode problems
│   │   ├── two-sum.md
│   │   ├── valid-parentheses.md
│   │   ├── merge-intervals.md
│   │   ├── binary-tree-level-order.md
│   │   └── climbing-stairs.md
│   ├── patterns/                   # Algorithmic pattern templates
│   │   ├── sliding-window.md
│   │   ├── two-pointers.md
│   │   ├── bfs-dfs.md
│   │   ├── dynamic-programming.md
│   │   └── binary-search.md
│   └── assets/javascripts/
│       └── tabsync.js              # Global language tab sync
├── mkdocs.yml                      # Site configuration
├── requirements.txt                # Python dependencies
└── .github/workflows/deploy.yml    # CI/CD pipeline
```
