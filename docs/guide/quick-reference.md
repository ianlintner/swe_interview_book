# Quick Reference

> Condensed cheat sheets for each step of the framework — designed for at-a-glance lookup.

---

## Step 1 Quick Ref: Understand

### Constraint → Big-O Target

| Input Size (*n*) | Target Complexity | Typical Approach |
|-------------------|-------------------|------------------|
| *n* ≤ 10 | O(n!) / O(2ⁿ) | Brute force, backtracking |
| *n* ≤ 20 | O(2ⁿ) | Bitmask DP, backtracking |
| *n* ≤ 500 | O(n³) | Triple nested loops, Floyd-Warshall |
| *n* ≤ 10⁴ | O(n²) | Nested loops, DP tables |
| *n* ≤ 10⁶ | O(n log n) | Sorting, divide & conquer |
| *n* ≤ 10⁸ | O(n) | Linear scan, hash map, two pointers |
| *n* > 10⁸ | O(log n) / O(1) | Binary search, math |

### Input / Output Checklist

- [ ] What is the **type** of input? (array, string, tree, graph)
- [ ] What is the **size** range? (drives Big-O target)
- [ ] Can values be **negative, zero, duplicated, or very large**?
- [ ] What exactly do I **return**? (value, index, boolean, list)
- [ ] Is the output **sorted** or in a specific order?
- [ ] Can I **modify** the input in-place?

### Edge Case Checklist

| Category | Cases to Consider |
|----------|-------------------|
| **Empty** | `[]`, `""`, `null`, empty tree |
| **Single** | One element, one character, one node |
| **Duplicates** | All same values, all same characters |
| **Boundaries** | `INT_MIN`, `INT_MAX`, `0`, negative values |
| **Large** | Maximum *n*, very long strings |
| **Special** | Already sorted, reverse sorted, palindrome |

---

## Step 2 Quick Ref: Entities & State

### Entity Identification Tips

!!! tip "Ask These Questions"
    - **What are the nouns** in the problem? → candidate entities
    - **What changes** as you process? → state
    - **What do you compare or track?** → auxiliary state

### Common State Types

| State Type | Example | Typical DS |
|------------|---------|------------|
| **Counter** | Character frequency | Hash Map |
| **Tracker** | Current min/max, running sum | Variable |
| **Accumulator** | Result list, merged intervals | Array / List |
| **Visited set** | Seen nodes in graph | Hash Set |
| **Pointer(s)** | Window boundaries, left/right | Integer(s) |
| **Mapping** | Value → index, parent → children | Hash Map |
| **Stack frame** | DFS path, matching pairs | Stack |
| **DP table** | Subproblem results | Array / Matrix |

---

## Step 3 Quick Ref: Data Structures

### DS Operations Complexity

| Data Structure | Access | Search | Insert | Delete | Space | Key Trait |
|----------------|--------|--------|--------|--------|-------|-----------|
| **Array** | O(1) | O(n) | O(n) | O(n) | O(n) | Index-based access |
| **Linked List** | O(n) | O(n) | O(1)* | O(1)* | O(n) | Fast insert/delete at known position |
| **Hash Map** | — | O(1)† | O(1)† | O(1)† | O(n) | Key-value lookup |
| **Hash Set** | — | O(1)† | O(1)† | O(1)† | O(n) | Membership / dedup |
| **Stack** | O(1) top | O(n) | O(1) | O(1) | O(n) | LIFO |
| **Queue** | O(1) front | O(n) | O(1) | O(1) | O(n) | FIFO |
| **Deque** | O(1) ends | O(n) | O(1) | O(1) | O(n) | Both ends |
| **Heap** | O(1) top | O(n) | O(log n) | O(log n) | O(n) | Fast min/max |
| **BST (balanced)** | — | O(log n) | O(log n) | O(log n) | O(n) | Ordered operations |
| **Trie** | — | O(m) | O(m) | O(m) | O(Σm) | Prefix matching |
| **Graph (adj list)** | — | O(V+E) | O(1) | O(E) | O(V+E) | Relationships |
| **Disjoint Set** | — | O(α(n))‡ | O(α(n))‡ | — | O(n) | Union-find / components |

\* With reference to node &nbsp; † Amortized average &nbsp; ‡ Near-constant (inverse Ackermann)

### When-to-Use Decision Table

| I need to … | Use |
|-------------|-----|
| Look up by key in O(1) | **Hash Map** |
| Check membership in O(1) | **Hash Set** |
| Maintain sorted order + fast insert | **BST / TreeMap** |
| Get min or max repeatedly | **Heap** |
| Process in FIFO order | **Queue / Deque** |
| Match/nest/undo (LIFO) | **Stack** |
| Access by index in O(1) | **Array** |
| Search by prefix | **Trie** |
| Model connections / relationships | **Graph** |
| Track connected components / union-find | **Disjoint Set** |
| Frequent insert/delete at arbitrary position | **Linked List** |

---

## Step 4 Quick Ref: Algorithms

### Pattern Recognition — Keywords → Pattern

| If you see … | Think … | Complexity |
|--------------|---------|------------|
| "Subarray of size k", "contiguous" | **Sliding Window** | O(n) |
| "Sorted array", "two values that …" | **Two Pointers** | O(n) |
| "Find position in sorted", "min that satisfies" | **Binary Search** | O(log n) |
| "All combinations", "all permutations" | **Backtracking** | O(2ⁿ) / O(n!) |
| "Shortest path (unweighted)" | **BFS** | O(V+E) |
| "Connected components", "cycle detection" | **DFS / Union-Find** | O(V+E) |
| "Overlapping subproblems", "min/max cost" | **Dynamic Programming** | O(n²) or O(n·k) |
| "Top K", "Kth largest" | **Heap** | O(n log k) |
| "Merge sorted lists", "divide array" | **Divide & Conquer** | O(n log n) |
| "Intervals", "merge ranges" | **Sort + Sweep** | O(n log n) |
| "Prefix search", "autocomplete" | **Trie** | O(m) |
| "Shortest path (weighted)" | **Dijkstra / Bellman-Ford** | O(E log V) |
| "Topological order", "prerequisites" | **Topological Sort** | O(V+E) |

### Algorithm Complexity Comparison

| Algorithm | Time (avg) | Time (worst) | Space | Stable? |
|-----------|-----------|--------------|-------|---------|
| **Merge Sort** | O(n log n) | O(n log n) | O(n) | Yes |
| **Quick Sort** | O(n log n) | O(n²) | O(log n) | No |
| **Heap Sort** | O(n log n) | O(n log n) | O(1) | No |
| **Binary Search** | O(log n) | O(log n) | O(1) | — |
| **BFS** | O(V+E) | O(V+E) | O(V) | — |
| **DFS** | O(V+E) | O(V+E) | O(V) | — |
| **Dijkstra** | O(E log V) | O(E log V) | O(V) | — |
| **Bellman-Ford** | O(V·E) | O(V·E) | O(V) | — |
| **Kadane's** | O(n) | O(n) | O(1) | — |
| **KMP** | O(n+m) | O(n+m) | O(m) | — |

### Recursion Checklist

- [ ] **Base case** — What stops the recursion?
- [ ] **Recursive case** — How do I reduce the problem?
- [ ] **Return value** — What does each call return?
- [ ] **State** — What changes between calls?
- [ ] **Memoization** — Are there overlapping subproblems?
- [ ] **Stack depth** — Can it overflow? Convert to iterative?

---

## Step 5 Quick Ref: Planning

### Pseudocode Template

```text
function solve(input):
    // 1. Handle edge cases
    if input is empty → return base result

    // 2. Initialize state / data structures
    result = ...
    ds = ...

    // 3. Core logic (loop / recurse)
    for each element in input:
        process element
        update state

    // 4. Return result
    return result
```

### Approach Comparison Template

!!! tip "Compare Before You Code"
    Fill in this table to pick your approach.

| Criteria | Approach A | Approach B |
|----------|-----------|-----------|
| **Time complexity** | | |
| **Space complexity** | | |
| **Handles edge cases?** | | |
| **Easy to implement?** | | |
| **Easy to explain?** | | |
| **Verdict** | | |

---

## Step 6 Quick Ref: Implementation

### Language-Specific Gotchas

| Gotcha | Python | Java | C++ | JavaScript |
|--------|--------|------|-----|------------|
| **Integer overflow** | ✅ auto big-int | ❌ wrap at 2³¹ | ❌ undefined behavior | ❌ loses precision beyond ±(2⁵³−1) |
| **Sort stability** | ✅ stable | ✅ stable (TimSort) | ❌ `sort` not guaranteed | ✅ stable (modern engines) |
| **Default dict** | `defaultdict` | `getOrDefault` | `map[]` auto-inserts | `map.get() ?? 0` |
| **String mutability** | ❌ immutable | ❌ immutable | ✅ mutable | ❌ immutable |
| **Pass by** | object-reference | reference (objects) | value (use `&`) | reference (objects) |
| **Null / None check** | `is None` | `== null` | `nullptr` | `== null` (catches both) |

### Naming Conventions

| Variable | Good Name | Avoid |
|----------|-----------|-------|
| Loop index | `i`, `j`, `k` | `x`, `a` |
| Hash map | `counts`, `index_map` | `d`, `m` |
| Two pointers | `left`, `right` | `l`, `r` (ambiguous) |
| Result | `result`, `ans` | `res`, `ret` |
| Current node | `node`, `curr` | `n` (conflicts with size) |
| Stack | `stack` | `s` |

### Common Helper Patterns

```text
# Swap two values
a, b = b, a

# Clamp to range
val = max(lo, min(hi, val))

# Ceiling division
ceil_div = (a + b - 1) // b

# Check power of 2
is_pow2 = n > 0 and (n & (n - 1)) == 0

# Get digits of a number
while n > 0:
    digit = n % 10
    n //= 10
```

---

## Step 7 Quick Ref: Testing

### Bug Checklist

- [ ] **Off-by-one** — Loop bounds, index calculations, `<` vs `<=`
- [ ] **Empty input** — Does the code handle `[]`, `""`, `null`?
- [ ] **Single element** — Does the logic still hold?
- [ ] **Integer overflow** — Multiplication, large sums, `INT_MAX + 1`
- [ ] **Wrong return type** — Returning index vs value, list vs single item
- [ ] **Uninitialized state** — Default values for counters, result variables
- [ ] **Hash collisions** — Relying on unique hashes for correctness
- [ ] **Mutation during iteration** — Modifying a collection while looping over it

### Big-O Cheat Sheet

!!! info "Time Complexities — Slowest to Fastest"
    O(n!) → O(2ⁿ) → O(n³) → O(n²) → O(n log n) → O(n) → O(√n) → O(log n) → O(1)

| Complexity | 10 | 100 | 1,000 | 10⁶ |
|------------|------|------|-------|------|
| **O(1)** | 1 | 1 | 1 | 1 |
| **O(log n)** | 3 | 7 | 10 | 20 |
| **O(n)** | 10 | 100 | 1,000 | 10⁶ |
| **O(n log n)** | 33 | 664 | 10,000 | 2×10⁷ |
| **O(n²)** | 100 | 10⁴ | 10⁶ | 10¹² ❌ |
| **O(2ⁿ)** | 1,024 | 10³⁰ ❌ | ❌ | ❌ |

!!! info "Space Complexity Quick Guide"
    | Extra Space | Meaning |
    |-------------|---------|
    | O(1) | Fixed number of variables |
    | O(n) | One extra array / hash map |
    | O(n²) | 2D matrix (e.g., DP table) |
    | O(V+E) | Graph adjacency list |
    | O(2ⁿ) | All subsets stored |

### Optimization Strategies

| Current | Goal | Strategy |
|---------|------|----------|
| O(n²) | O(n log n) | Sort first, then binary search / two pointers |
| O(n²) | O(n) | Hash map for O(1) lookup |
| O(2ⁿ) | O(n·2ⁿ) or O(n²) | Memoization / DP |
| O(n log n) | O(n) | Monotonic stack, sliding window |
| High space | O(1) space | Two pointers, in-place swap, bit manipulation |
| Recursive | Iterative | Explicit stack, tail-call conversion |
| Repeated work | Cache | Prefix sums, memoization, precomputation |
