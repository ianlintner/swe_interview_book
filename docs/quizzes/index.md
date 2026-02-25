# Quizzes

> Test your knowledge with these self-assessment quizzes. Each section corresponds to the [Flash Cards](../flashcards/index.md).

!!! tip "How to Take the Quiz"
    Answer each question mentally or on paper, then expand the answer to check. Score yourself: **3** = knew it instantly, **2** = got it with some thought, **1** = needed to peek, **0** = didn't know.

---

## Quiz 1: Data Structures

??? question "1. What are the time complexities for insert, search, and delete in a hash map?"
    **Insert:** O(1) amortized | **Search:** O(1) amortized | **Delete:** O(1) amortized

    Worst case for all: O(n) due to hash collisions.

??? question "2. You need to process items in the order they arrive and also quickly find the minimum. What data structure(s) do you use?"
    **Queue** for FIFO processing + **Min-Heap** for quick minimum access.

    Or a **Monotonic Deque** if you need the minimum within a sliding window (LC 239).

??? question "3. What is the space complexity of a Trie storing N words of average length M?"
    **O(N × M)** in the worst case (no shared prefixes). In practice, shared prefixes reduce this significantly. Each node has up to 26 children pointers (for lowercase English).

??? question "4. You have a graph problem asking for 'connected components.' What data structure should you immediately consider?"
    **Union-Find (Disjoint Set)** — O(α(n)) per union/find operation. Alternatively, DFS/BFS with a visited set — O(V+E).

??? question "5. What data structure would you use for 'find the k-th largest element in a stream of numbers'?"
    **Min-Heap of size K.** Insert each number: if heap size < K, push. Otherwise, if number > heap top, pop and push. The top of the heap is always the k-th largest. Time O(n log k).

??? question "6. When should you use a Stack vs. a recursive function call?"
    They are equivalent! The call stack IS a stack. Use an **explicit stack** when:

    - Recursion depth might cause stack overflow
    - You need iterative DFS
    - You need more control over the traversal order

??? question "7. What is the difference between a Hash Set and a Hash Map?"
    **Hash Set:** Stores only keys. Used for membership testing and deduplication.
    **Hash Map:** Stores key-value pairs. Used for counting, indexing, and caching.

    Both have O(1) average operations.

??? question "8. For a problem involving 'next greater element,' what data structure pattern should you use?"
    **Monotonic Stack** (decreasing). For each element, pop all smaller elements from the stack (they found their next greater element), then push current element. Time O(n) — each element pushed and popped at most once.

---

## Quiz 2: Algorithms

??? question "1. Given a sorted array, which algorithm finds an element in O(log n)?"
    **Binary Search.** Key formula: `mid = left + (right - left) / 2` to avoid integer overflow.

    Three variations: standard (exact match), left-bound (first occurrence), right-bound (last occurrence).

??? question "2. What is the time complexity of BFS on a graph with V vertices and E edges?"
    **O(V + E).** Each vertex is visited once (O(V)), each edge is examined once (O(E)). Space O(V) for the visited set and queue.

??? question "3. You're given 'find all subsets of an array.' What algorithm do you use?"
    **Backtracking.** At each position, choose to include or exclude the element. Collect the path at every recursion level (not just at leaves). Time O(2^n), Space O(n) for the recursion stack.

    Alternative: iterate over bitmasks from 0 to 2^n - 1.

??? question "4. How do you convert a naive recursive solution with overlapping subproblems into DP?"
    1. **Top-down:** Add a memo dictionary/array. Before computing, check if result is cached. After computing, store the result.
    2. **Bottom-up:** Identify the base cases, define the transition, iterate from base cases to the answer.
    3. **Space optimization:** If you only need the previous row/value, reduce the DP table.

??? question "5. What algorithm finds the shortest path in a weighted graph with non-negative edges?"
    **Dijkstra's Algorithm.** Uses a min-heap. Time O(E log V). Cannot handle negative edge weights.

    For negative edges: **Bellman-Ford** O(V·E). For unweighted: plain **BFS** O(V+E).

??? question "6. Explain why Kadane's Algorithm works for Maximum Subarray."
    At each position, decide: extend the current subarray or start a new one. `cur = max(nums[i], cur + nums[i])`. If `cur + nums[i] < nums[i]`, the previous subarray had negative total contribution, so start fresh. Track `best = max(best, cur)` throughout. O(n) time, O(1) space.

??? question "7. What is the difference between Greedy and Dynamic Programming?"
    **Greedy:** Make the locally optimal choice at each step, hoping it leads to the global optimum. Only works when the greedy choice property holds (hard to prove).

    **DP:** Consider ALL choices, use optimal substructure to build the answer. Always finds the optimal solution but may be slower. If greedy works, it's usually faster and simpler.

??? question "8. How does Union-Find detect a cycle in an undirected graph?"
    For each edge (u, v): if `find(u) == find(v)`, they're already connected → adding this edge creates a cycle. Otherwise, `union(u, v)`. Time O(E·α(V)) ≈ O(E).

---

## Quiz 3: Theory & Problem Solving

??? question "1. Given n = 10^5, what Big-O complexity should your solution target?"
    **O(n log n) or O(n).** At 10^5, O(n²) = 10^10 operations, which is too slow (typically > 1 second). O(n log n) ≈ 1.7 × 10^6, which is fast enough.

??? question "2. How do you rotate a matrix 90° clockwise in-place?"
    1. **Transpose** the matrix: swap `matrix[i][j]` with `matrix[j][i]`
    2. **Reverse each row**

    Time O(n²), Space O(1). No extra matrix needed.

??? question "3. A problem says 'find two numbers that add up to target' in an unsorted array. What approach gives O(n) time?"
    **Hash Map.** For each number, compute `complement = target - number`. Check if complement exists in the map. If yes, return both indices. If no, store `number → index` in the map. One-pass, O(n) time, O(n) space.

??? question "4. How many subsets does a set of n elements have? How many permutations?"
    **Subsets:** 2^n (each element is either included or not).
    **Permutations:** n! (each position has decreasing choices).
    **Combinations of k from n:** C(n,k) = n! / (k!(n-k)!).

??? question "5. What is the Pigeonhole Principle and name a LeetCode problem that uses it?"
    If n+1 items go into n bins, at least one bin has ≥ 2 items.

    **LC 287 — Find the Duplicate Number:** n+1 numbers in range [1,n]. At least one must be duplicated. Solvable with Floyd's Cycle Detection in O(n) time, O(1) space.

??? question "6. How do you prove a greedy algorithm is correct?"
    Two properties must hold:
    1. **Greedy choice property:** A locally optimal choice is part of some globally optimal solution.
    2. **Optimal substructure:** An optimal solution contains optimal solutions to subproblems.

    Common proof techniques: exchange argument (show swapping a non-greedy choice doesn't improve the solution) or induction.

??? question "7. What is amortized O(1) and give an example?"
    The average cost per operation is O(1) over a sequence of operations, even if some individual operations cost more.

    **Example:** `ArrayList.add()` / `Vec::push()`. Usually O(1), but occasionally O(n) when the internal array needs to double in size. Over n insertions, total work is O(n), so amortized O(1) per insert.

??? question "8. Given a problem asking 'minimum number of operations to transform X into Y,' what technique should you consider?"
    **BFS** (if unweighted — each operation has cost 1) or **DP** (if operations have variable costs).

    Examples: Word Ladder (BFS), Edit Distance (DP), Coin Change (DP).

---

## Scoring Guide

| Score | Level | Action |
|-------|-------|--------|
| 22-24 | 🏆 Expert | Ready for interviews — focus on speed |
| 18-21 | ✅ Solid | Review weak areas, practice timed problems |
| 12-17 | 🟡 Getting There | Re-study the [Flash Cards](../flashcards/index.md), do more practice |
| 0-11 | 🔴 Needs Work | Start with the [Problem Solving Framework](../guide/index.md) |

---

[:octicons-arrow-right-24: Review Flash Cards](../flashcards/index.md) · [:octicons-arrow-right-24: Problem Index](../glossary/problems.md)
