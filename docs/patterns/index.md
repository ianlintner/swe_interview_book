# Pattern Reference

Recognizing which **algorithmic pattern** a problem belongs to is the most valuable interview skill. This section provides templates and identification tips for the most common patterns.

---

## Pattern Selection Flowchart

```mermaid
flowchart TD
    P["What does the problem ask?"] --> Q1{"Contiguous subarray / substring?"}
    Q1 -->|Yes| SW["→ Sliding Window"]
    Q1 -->|No| Q2{"Sorted input or search space?"}
    Q2 -->|Yes| Q2a{"Two ends converge?"}
    Q2a -->|Yes| TP["→ Two Pointers"]
    Q2a -->|No| BS["→ Binary Search"]
    Q2 -->|No| Q3{"Tree or graph traversal?"}
    Q3 -->|Yes| Q3a{"Level by level?"}
    Q3a -->|Yes| BFS["→ BFS"]
    Q3a -->|No| DFS["→ DFS"]
    Q3 -->|No| Q4{"Optimal value over subproblems?"}
    Q4 -->|Yes| DP["→ Dynamic Programming"]
    Q4 -->|No| Q5{"Generate all combinations?"}
    Q5 -->|Yes| BT["→ Backtracking"]
    Q5 -->|No| OTHER["→ Brute Force / Greedy / Simulation"]
```

---

## Patterns at a Glance

| Pattern | When to Use | Time | Key Data Structure | Page |
|---------|-------------|------|--------------------|------|
| [Sliding Window](sliding-window.md) | Contiguous subarray of size k or variable | O(n) | Array + Hash Map | [→](sliding-window.md) |
| [Two Pointers](two-pointers.md) | Sorted arrays, pair finding | O(n) | Sorted Array | [→](two-pointers.md) |
| [BFS & DFS](bfs-dfs.md) | Trees, graphs, shortest path | O(V+E) | Queue / Stack | [→](bfs-dfs.md) |
| [Dynamic Programming](dynamic-programming.md) | Overlapping subproblems | varies | Array / Hash Map | [→](dynamic-programming.md) |
| [Binary Search](binary-search.md) | Monotonic search space | O(log n) | Sorted Array | [→](binary-search.md) |

---

## External Resources

- [NeetCode Roadmap](https://neetcode.io/roadmap){ target=_blank } — visual pattern map
- [LeetCode Patterns](https://seanprashad.com/leetcode-patterns/){ target=_blank } — problems by pattern
- [14 Patterns to Ace Any Coding Interview](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed){ target=_blank }
