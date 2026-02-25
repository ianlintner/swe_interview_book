# Flash Cards

> Study cards for algorithms, data structures, and theory concepts. Use the collapsible answers to test yourself.

!!! tip "How to Use"
    Read the **question**, think of the answer, then click to reveal. Track your progress with the checklist at the bottom of each section.

---

## Data Structure Flash Cards

??? question "What is the time complexity of inserting into a hash map?"
    **O(1) amortized average.** Worst case O(n) due to hash collisions and rehashing. Uses a hash function to map keys to bucket indices.

??? question "When would you use a stack vs. a queue?"
    **Stack (LIFO):** Bracket matching, DFS, undo operations, expression evaluation, monotonic stack patterns.

    **Queue (FIFO):** BFS, level-order traversal, scheduling, sliding window problems.

??? question "What is the difference between a min-heap and a max-heap?"
    Both are complete binary trees. A **min-heap** has the smallest element at the root (parent ≤ children). A **max-heap** has the largest at the root (parent ≥ children). Both support O(log n) insert and O(1) peek.

??? question "What operations does a Trie support and what are their complexities?"
    **Insert:** O(m) — walk/create nodes for each character.
    **Search:** O(m) — walk nodes, check `is_end`.
    **Prefix search:** O(m) — walk nodes, return true if path exists.
    Where m = length of the word/prefix.

??? question "What is a Union-Find (Disjoint Set) and when do you use it?"
    A data structure that tracks which elements belong to the same group (connected component). Supports **find** (which group?) and **union** (merge two groups) in near-O(1) time with path compression and union by rank. Used for: connected components, cycle detection in undirected graphs, Kruskal's MST.

??? question "What is the time complexity of operations on a balanced BST?"
    **Search, Insert, Delete:** all O(log n). Maintains sorted order. Common implementations: AVL tree, Red-Black tree, or language built-ins like Java's `TreeMap`, C++ `std::map`.

??? question "When should you use an adjacency list vs. adjacency matrix?"
    **Adjacency list:** Sparse graphs (E << V²). Space O(V+E). Better for traversal.
    **Adjacency matrix:** Dense graphs. Space O(V²). O(1) edge lookup. Better for checking if specific edge exists.

??? question "What is a monotonic stack and when do you use it?"
    A stack where elements are maintained in sorted (increasing or decreasing) order. Used for **next greater element**, **next smaller element**, **largest rectangle in histogram**, and **trapping rain water** problems. Time O(n) because each element is pushed and popped at most once.

---

## Algorithm Flash Cards

??? question "Describe the two-pointer technique and when to use it."
    Use two pointers that move toward each other or in the same direction. **Converging pointers:** sorted arrays, pair sum problems. **Fast/slow pointers:** linked list cycle detection, finding middle. **Same direction:** sliding window variant. Time typically O(n).

??? question "How does binary search work? What are the three templates?"
    Repeatedly halve the search space. O(log n).

    1. **Standard:** `left <= right`, return mid when found
    2. **Left bound:** `left < right`, `right = mid` (finds first occurrence)
    3. **Right bound:** `left < right`, `left = mid + 1` (finds last occurrence)

    Key: `mid = left + (right - left) / 2` to avoid overflow.

??? question "Explain Kadane's Algorithm for Maximum Subarray."
    Track `cur_sum` and `best_sum`. For each element: `cur_sum = max(element, cur_sum + element)`. Update `best_sum = max(best_sum, cur_sum)`. Intuition: reset the running sum when it goes negative. Time O(n), Space O(1).

??? question "What is topological sort and when is it used?"
    Orders nodes in a DAG so every edge goes from earlier to later. **Kahn's algorithm:** use BFS with in-degree counting. Start with nodes that have in-degree 0. Used for: dependency resolution, course scheduling, build systems. Time O(V+E).

??? question "Explain the difference between top-down and bottom-up DP."
    **Top-down (memoization):** Recursive + cache. Start from the original problem, break down into subproblems, cache results. Natural to write but has recursion overhead.

    **Bottom-up (tabulation):** Iterative. Fill table from base cases up. No recursion overhead, easier to optimize space. Generally preferred in interviews.

??? question "What is the time complexity of Dijkstra's algorithm?"
    **O(E log V)** with a binary heap. Finds shortest paths from a single source in a weighted graph with non-negative edges. Cannot handle negative weights (use Bellman-Ford for that, O(V·E)).

??? question "How does backtracking work? What are the three key steps?"
    1. **Choose:** Pick a candidate
    2. **Explore:** Recurse with the candidate added
    3. **Undo:** Remove the candidate (backtrack)

    Prune branches that violate constraints to avoid unnecessary work. Used for: subsets, permutations, combinations, N-Queens, Sudoku.

??? question "What is the sliding window technique?"
    Maintain a window defined by `left` and `right` pointers. Expand `right` to explore, shrink `left` to satisfy constraints. Used for: contiguous subarray/substring problems (max sum, min length, longest without repeating). Time O(n).

---

## Theory & Knowledge Gap Flash Cards

??? question "What is the Master Theorem for recurrence relations?"
    For `T(n) = aT(n/b) + O(n^d)`:

    - If `d < log_b(a)`: T(n) = O(n^{log_b(a)})
    - If `d = log_b(a)`: T(n) = O(n^d log n)
    - If `d > log_b(a)`: T(n) = O(n^d)

    Example: Merge sort T(n) = 2T(n/2) + O(n) → a=2, b=2, d=1 → d = log₂2 → O(n log n).

??? question "How do you rotate a matrix 90° clockwise in-place?"
    Two steps:
    1. **Transpose:** swap `matrix[i][j]` with `matrix[j][i]`
    2. **Reverse each row**

    For counter-clockwise: transpose then reverse each column (or reverse rows then transpose).

??? question "Explain the Pigeonhole Principle and give a coding example."
    If n+1 items are placed into n containers, at least one container has ≥ 2 items.

    **Example:** Finding duplicate in array of n+1 integers in range [1, n] (LC 287). There must be at least one duplicate. Can solve with Floyd's cycle detection (fast/slow pointers on the "linked list" formed by the array values).

??? question "What is amortized analysis?"
    Average cost per operation over a sequence of operations, even if individual operations are expensive. Example: dynamic array `append` is O(1) amortized even though occasional resizing is O(n), because resizing doubles capacity and each element is copied at most O(log n) times total.

??? question "How does Floyd's Cycle Detection (Tortoise and Hare) work?"
    Use two pointers: **slow** moves 1 step, **fast** moves 2 steps. If there's a cycle, they will meet. To find the cycle start: reset one pointer to head, move both at speed 1 — they meet at cycle start. Used in: linked list cycle (LC 141, 142), finding duplicate number (LC 287).

??? question "What is the difference between combinations, permutations, and subsets?"
    - **Permutations** of n items: n! (order matters)
    - **Combinations** of k from n: C(n,k) = n! / (k!(n-k)!) (order doesn't matter)
    - **Subsets** of n items: 2^n (all possible selections)

    For coding: permutations use a visited set, combinations use a start index, subsets collect at every recursion level.

??? question "What is a prefix sum array and how is it used?"
    `prefix[i] = sum(arr[0..i-1])`. Allows O(1) range sum queries: `sum(l, r) = prefix[r+1] - prefix[l]`. Build in O(n). Used for: subarray sum problems, running averages, 2D prefix sums for matrix queries.

??? question "Explain XOR properties useful in coding interviews."
    - `a ^ a = 0` (self-cancel)
    - `a ^ 0 = a` (identity)
    - Commutative and associative

    **Applications:** Find single number among pairs (XOR all). Find two missing/duplicate numbers (XOR + bit partitioning). Swap without temp: `a ^= b; b ^= a; a ^= b`.

??? question "What is the two-egg problem / binary search on answer?"
    When the answer space is monotonic, binary search on the answer value itself. Example: "minimum capacity to ship packages in D days" — binary search on capacity, check feasibility with a greedy scan. This pattern applies to many "minimize the maximum" or "maximize the minimum" problems.

??? question "How do you detect a cycle in a directed graph?"
    Use DFS with three states: **unvisited**, **in-progress** (on current DFS path), **completed**. A cycle exists if you encounter an in-progress node during DFS. Alternatively, if topological sort doesn't include all nodes, a cycle exists.

---

## Progress Tracker

### Data Structures
- [ ] Hash Map / Hash Set
- [ ] Stack & Queue
- [ ] Heap / Priority Queue
- [ ] Trie
- [ ] Union-Find
- [ ] BST / TreeMap
- [ ] Graph representations
- [ ] Monotonic Stack

### Algorithms
- [ ] Two Pointers
- [ ] Binary Search (all 3 templates)
- [ ] Kadane's Algorithm
- [ ] Topological Sort
- [ ] DP (top-down vs bottom-up)
- [ ] Dijkstra's
- [ ] Backtracking
- [ ] Sliding Window

### Theory
- [ ] Master Theorem
- [ ] Matrix rotation
- [ ] Pigeonhole Principle
- [ ] Amortized analysis
- [ ] Floyd's Cycle Detection
- [ ] Combinatorics (P, C, subsets)
- [ ] Prefix sums
- [ ] XOR properties
- [ ] Binary search on answer
- [ ] Cycle detection in graphs
