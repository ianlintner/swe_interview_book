# Algorithm Glossary

> Complete reference of algorithms with implementations in 7 languages. Click any heading to get a direct link.

---

## Sorting Algorithms

### Merge Sort

**Description:** Stable divide-and-conquer sort. Splits array in half, recursively sorts each half, then merges.

**Complexity:** Time O(n log n), Space O(n)

=== "Python"

    ```python
    def merge_sort(arr: list[int]) -> list[int]:
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])
        return merge(left, right)

    def merge(a: list[int], b: list[int]) -> list[int]:
        result, i, j = [], 0, 0
        while i < len(a) and j < len(b):
            if a[i] <= b[j]:
                result.append(a[i]); i += 1
            else:
                result.append(b[j]); j += 1
        result.extend(a[i:])
        result.extend(b[j:])
        return result
    ```

=== "TypeScript"

    ```typescript
    function mergeSort(arr: number[]): number[] {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid));
        const right = mergeSort(arr.slice(mid));
        return mergeFn(left, right);
    }

    function mergeFn(a: number[], b: number[]): number[] {
        const result: number[] = [];
        let i = 0, j = 0;
        while (i < a.length && j < b.length) {
            if (a[i] <= b[j]) result.push(a[i++]);
            else result.push(b[j++]);
        }
        return result.concat(a.slice(i), b.slice(j));
    }
    ```

=== "Rust"

    ```rust
    pub fn merge_sort(arr: &mut [i32]) {
        let len = arr.len();
        if len <= 1 { return; }
        let mid = len / 2;
        merge_sort(&mut arr[..mid]);
        merge_sort(&mut arr[mid..]);
        let merged: Vec<i32> = {
            let (left, right) = arr.split_at(mid);
            let (mut i, mut j) = (0, 0);
            let mut res = Vec::with_capacity(len);
            while i < left.len() && j < right.len() {
                if left[i] <= right[j] { res.push(left[i]); i += 1; }
                else { res.push(right[j]); j += 1; }
            }
            res.extend_from_slice(&left[i..]);
            res.extend_from_slice(&right[j..]);
            res
        };
        arr.copy_from_slice(&merged);
    }
    ```

=== "Java"

    ```java
    class MergeSort {
        public static void mergeSort(int[] arr, int l, int r) {
            if (l >= r) return;
            int mid = l + (r - l) / 2;
            mergeSort(arr, l, mid);
            mergeSort(arr, mid + 1, r);
            merge(arr, l, mid, r);
        }
        private static void merge(int[] arr, int l, int m, int r) {
            int[] tmp = new int[r - l + 1];
            int i = l, j = m + 1, k = 0;
            while (i <= m && j <= r)
                tmp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
            while (i <= m) tmp[k++] = arr[i++];
            while (j <= r) tmp[k++] = arr[j++];
            System.arraycopy(tmp, 0, arr, l, tmp.length);
        }
    }
    ```

=== "C#"

    ```csharp
    public class MergeSort {
        public static void Sort(int[] arr, int l, int r) {
            if (l >= r) return;
            int mid = l + (r - l) / 2;
            Sort(arr, l, mid);
            Sort(arr, mid + 1, r);
            Merge(arr, l, mid, r);
        }
        private static void Merge(int[] arr, int l, int m, int r) {
            var tmp = new int[r - l + 1];
            int i = l, j = m + 1, k = 0;
            while (i <= m && j <= r)
                tmp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
            while (i <= m) tmp[k++] = arr[i++];
            while (j <= r) tmp[k++] = arr[j++];
            Array.Copy(tmp, 0, arr, l, tmp.Length);
        }
    }
    ```

=== "ASM"

    ```asm
    ; Merge Sort — conceptual x86-64
    ; 1. If length <= 1, return
    ; 2. Split array at midpoint
    ; 3. Recursively sort left half, right half
    ; 4. Merge two sorted halves using temp buffer
    ; Use rdi=array ptr, rsi=length; save/restore on stack for recursion
    ```

=== "Scala"

    ```scala
    object MergeSortImpl {
      def mergeSort(arr: List[Int]): List[Int] = {
        if (arr.length <= 1) return arr
        val (left, right) = arr.splitAt(arr.length / 2)
        merge(mergeSort(left), mergeSort(right))
      }
      private def merge(a: List[Int], b: List[Int]): List[Int] =
        (a, b) match {
          case (Nil, _) => b
          case (_, Nil) => a
          case (x :: xs, y :: ys) =>
            if (x <= y) x :: merge(xs, b) else y :: merge(a, ys)
        }
    }
    ```

**Related LeetCode Problems:**

- [Sort an Array (LC 912)](https://leetcode.com/problems/sort-an-array/){ target=_blank }
- [Sort List (LC 148)](https://leetcode.com/problems/sort-list/){ target=_blank }
- [Count of Smaller Numbers After Self (LC 315)](https://leetcode.com/problems/count-of-smaller-numbers-after-self/){ target=_blank }

---

### Quick Sort

**Description:** In-place divide-and-conquer sort using a pivot. Average O(n log n) but worst case O(n²).

**Complexity:** Time O(n log n) avg / O(n²) worst, Space O(log n) stack

=== "Python"

    ```python
    def quick_sort(arr: list[int], lo: int, hi: int) -> None:
        if lo >= hi:
            return
        pivot = arr[hi]
        i = lo
        for j in range(lo, hi):
            if arr[j] < pivot:
                arr[i], arr[j] = arr[j], arr[i]
                i += 1
        arr[i], arr[hi] = arr[hi], arr[i]
        quick_sort(arr, lo, i - 1)
        quick_sort(arr, i + 1, hi)
    ```

=== "TypeScript"

    ```typescript
    function quickSort(arr: number[], lo: number, hi: number): void {
        if (lo >= hi) return;
        const pivot = arr[hi];
        let i = lo;
        for (let j = lo; j < hi; j++) {
            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        [arr[i], arr[hi]] = [arr[hi], arr[i]];
        quickSort(arr, lo, i - 1);
        quickSort(arr, i + 1, hi);
    }
    ```

=== "Rust"

    ```rust
    pub fn quick_sort(arr: &mut [i32]) {
        if arr.len() <= 1 { return; }
        let pivot_idx = partition(arr);
        quick_sort(&mut arr[..pivot_idx]);
        quick_sort(&mut arr[pivot_idx + 1..]);
    }
    fn partition(arr: &mut [i32]) -> usize {
        let hi = arr.len() - 1;
        let pivot = arr[hi];
        let mut i = 0;
        for j in 0..hi {
            if arr[j] < pivot { arr.swap(i, j); i += 1; }
        }
        arr.swap(i, hi);
        i
    }
    ```

=== "Java"

    ```java
    class QuickSort {
        public static void sort(int[] arr, int lo, int hi) {
            if (lo >= hi) return;
            int pivot = arr[hi], i = lo;
            for (int j = lo; j < hi; j++)
                if (arr[j] < pivot) { int t = arr[i]; arr[i] = arr[j]; arr[j] = t; i++; }
            int t = arr[i]; arr[i] = arr[hi]; arr[hi] = t;
            sort(arr, lo, i - 1);
            sort(arr, i + 1, hi);
        }
    }
    ```

=== "C#"

    ```csharp
    public static void QuickSort(int[] arr, int lo, int hi) {
        if (lo >= hi) return;
        int pivot = arr[hi], i = lo;
        for (int j = lo; j < hi; j++)
            if (arr[j] < pivot) { (arr[i], arr[j]) = (arr[j], arr[i]); i++; }
        (arr[i], arr[hi]) = (arr[hi], arr[i]);
        QuickSort(arr, lo, i - 1);
        QuickSort(arr, i + 1, hi);
    }
    ```

=== "ASM"

    ```asm
    ; Quick Sort — conceptual x86-64
    ; Lomuto partition: pivot = arr[hi], sweep lo..hi-1
    ; Swap elements < pivot to front, place pivot at partition index
    ; Recurse on left and right partitions
    ```

=== "Scala"

    ```scala
    def quickSort(arr: Array[Int], lo: Int, hi: Int): Unit = {
      if (lo >= hi) return
      val pivot = arr(hi); var i = lo
      for (j <- lo until hi)
        if (arr(j) < pivot) { val t = arr(i); arr(i) = arr(j); arr(j) = t; i += 1 }
      val t = arr(i); arr(i) = arr(hi); arr(hi) = t
      quickSort(arr, lo, i - 1); quickSort(arr, i + 1, hi)
    }
    ```

**Related LeetCode Problems:**

- [Sort Colors (LC 75)](https://leetcode.com/problems/sort-colors/){ target=_blank }
- [Kth Largest Element in an Array (LC 215)](https://leetcode.com/problems/kth-largest-element-in-an-array/){ target=_blank }

---

### Counting Sort

**Description:** Non-comparison integer sort using a frequency array. Linear time when range k is small.

**Complexity:** Time O(n + k), Space O(k) where k is the value range

=== "Python"

    ```python
    def counting_sort(arr: list[int], max_val: int) -> list[int]:
        count = [0] * (max_val + 1)
        for x in arr:
            count[x] += 1
        result = []
        for val, freq in enumerate(count):
            result.extend([val] * freq)
        return result
    ```

=== "TypeScript"

    ```typescript
    function countingSort(arr: number[], maxVal: number): number[] {
        const count = new Array(maxVal + 1).fill(0);
        for (const x of arr) count[x]++;
        const result: number[] = [];
        for (let v = 0; v <= maxVal; v++)
            for (let i = 0; i < count[v]; i++) result.push(v);
        return result;
    }
    ```

=== "Rust"

    ```rust
    pub fn counting_sort(arr: &[usize], max_val: usize) -> Vec<usize> {
        let mut count = vec![0usize; max_val + 1];
        for &x in arr { count[x] += 1; }
        let mut result = Vec::with_capacity(arr.len());
        for (val, &freq) in count.iter().enumerate() {
            for _ in 0..freq { result.push(val); }
        }
        result
    }
    ```

=== "Java"

    ```java
    public static int[] countingSort(int[] arr, int maxVal) {
        int[] count = new int[maxVal + 1];
        for (int x : arr) count[x]++;
        int[] result = new int[arr.length];
        int idx = 0;
        for (int v = 0; v <= maxVal; v++)
            for (int i = 0; i < count[v]; i++) result[idx++] = v;
        return result;
    }
    ```

=== "C#"

    ```csharp
    public static int[] CountingSort(int[] arr, int maxVal) {
        var count = new int[maxVal + 1];
        foreach (int x in arr) count[x]++;
        var result = new int[arr.Length]; int idx = 0;
        for (int v = 0; v <= maxVal; v++)
            for (int i = 0; i < count[v]; i++) result[idx++] = v;
        return result;
    }
    ```

=== "ASM"

    ```asm
    ; Counting Sort — conceptual x86-64
    ; Allocate count array of size max_val+1, zero-fill
    ; First pass: increment count[arr[i]] for each element
    ; Second pass: write val repeated count[val] times to output
    ```

=== "Scala"

    ```scala
    def countingSort(arr: Array[Int], maxVal: Int): Array[Int] = {
      val count = new Array[Int](maxVal + 1)
      arr.foreach(x => count(x) += 1)
      count.zipWithIndex.flatMap { case (freq, v) => Array.fill(freq)(v) }
    }
    ```

**Related LeetCode Problems:**

- [Sort Colors (LC 75)](https://leetcode.com/problems/sort-colors/){ target=_blank }
- [Top K Frequent Elements (LC 347)](https://leetcode.com/problems/top-k-frequent-elements/){ target=_blank }

---

## Searching Algorithms

### Binary Search

**Description:** Search a sorted array by repeatedly halving the search space. Returns index of target or -1.

**Complexity:** Time O(log n), Space O(1)

=== "Python"

    ```python
    def binary_search(nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1
    ```

=== "TypeScript"

    ```typescript
    function binarySearch(nums: number[], target: number): number {
        let left = 0, right = nums.length - 1;
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            if (nums[mid] === target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    ```

=== "Rust"

    ```rust
    pub fn binary_search(nums: &[i32], target: i32) -> i32 {
        let (mut left, mut right) = (0i32, nums.len() as i32 - 1);
        while left <= right {
            let mid = left + (right - left) / 2;
            match nums[mid as usize].cmp(&target) {
                std::cmp::Ordering::Equal => return mid,
                std::cmp::Ordering::Less => left = mid + 1,
                std::cmp::Ordering::Greater => right = mid - 1,
            }
        }
        -1
    }
    ```

=== "Java"

    ```java
    public int binarySearch(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    ```

=== "C#"

    ```csharp
    public int BinarySearch(int[] nums, int target) {
        int left = 0, right = nums.Length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    ```

=== "ASM"

    ```asm
    ; Binary Search — x86-64
    ; rdi = *nums, esi = length, edx = target
    section .text
    global binary_search
    binary_search:
        xor     ecx, ecx            ; left = 0
        lea     r8d, [esi - 1]      ; right = len - 1
    .loop:
        cmp     ecx, r8d
        jg      .not_found
        lea     eax, [ecx + r8d]
        shr     eax, 1              ; mid
        mov     r9d, [rdi + rax*4]
        cmp     r9d, edx
        je      .found
        jl      .go_right
        lea     r8d, [rax - 1]
        jmp     .loop
    .go_right:
        lea     ecx, [rax + 1]
        jmp     .loop
    .found:
        ret                         ; eax = mid
    .not_found:
        mov     eax, -1
        ret
    ```

=== "Scala"

    ```scala
    def binarySearch(nums: Array[Int], target: Int): Int = {
      var left = 0; var right = nums.length - 1
      while (left <= right) {
        val mid = left + (right - left) / 2
        if (nums(mid) == target) return mid
        else if (nums(mid) < target) left = mid + 1
        else right = mid - 1
      }
      -1
    }
    ```

**Related LeetCode Problems:**

- [Binary Search (LC 704)](https://leetcode.com/problems/binary-search/){ target=_blank }
- [Search in Rotated Sorted Array (LC 33)](https://leetcode.com/problems/search-in-rotated-sorted-array/){ target=_blank }
- [Find Minimum in Rotated Sorted Array (LC 153)](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/){ target=_blank }
- [Search a 2D Matrix (LC 74)](https://leetcode.com/problems/search-a-2d-matrix/){ target=_blank }

---

### Binary Search — Left Bound

**Description:** Find the leftmost (first) position where target could be inserted or appears.

**Complexity:** Time O(log n), Space O(1)

=== "Python"

    ```python
    def bisect_left(nums: list[int], target: int) -> int:
        left, right = 0, len(nums)
        while left < right:
            mid = left + (right - left) // 2
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid
        return left
    ```

=== "TypeScript"

    ```typescript
    function bisectLeft(nums: number[], target: number): number {
        let left = 0, right = nums.length;
        while (left < right) {
            const mid = left + Math.floor((right - left) / 2);
            if (nums[mid] < target) left = mid + 1;
            else right = mid;
        }
        return left;
    }
    ```

=== "Rust"

    ```rust
    pub fn bisect_left(nums: &[i32], target: i32) -> usize {
        let (mut lo, mut hi) = (0, nums.len());
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if nums[mid] < target { lo = mid + 1; } else { hi = mid; }
        }
        lo
    }
    ```

=== "Java"

    ```java
    public int bisectLeft(int[] nums, int target) {
        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
    ```

=== "C#"

    ```csharp
    public int BisectLeft(int[] nums, int target) {
        int lo = 0, hi = nums.Length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
    ```

=== "ASM"

    ```asm
    ; Left-bound binary search — conceptual x86-64
    ; Same as standard but: when arr[mid] >= target, set right = mid
    ; Loop while left < right; return left
    ```

=== "Scala"

    ```scala
    def bisectLeft(nums: Array[Int], target: Int): Int = {
      var lo = 0; var hi = nums.length
      while (lo < hi) {
        val mid = lo + (hi - lo) / 2
        if (nums(mid) < target) lo = mid + 1 else hi = mid
      }
      lo
    }
    ```

**Related LeetCode Problems:**

- [First Bad Version (LC 278)](https://leetcode.com/problems/first-bad-version/){ target=_blank }
- [Find First and Last Position (LC 34)](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/){ target=_blank }

---

## Graph Algorithms

### Breadth-First Search (BFS)

**Description:** Explore nodes level by level using a queue. Finds shortest path in unweighted graphs.

**Complexity:** Time O(V + E), Space O(V)

=== "Python"

    ```python
    from collections import deque

    def bfs(graph: dict[int, list[int]], start: int) -> list[int]:
        visited = {start}
        queue = deque([start])
        order: list[int] = []
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in graph.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return order
    ```

=== "TypeScript"

    ```typescript
    function bfs(graph: Map<number, number[]>, start: number): number[] {
        const visited = new Set<number>([start]);
        const queue: number[] = [start];
        const order: number[] = [];
        while (queue.length > 0) {
            const node = queue.shift()!;
            order.push(node);
            for (const nb of graph.get(node) ?? []) {
                if (!visited.has(nb)) { visited.add(nb); queue.push(nb); }
            }
        }
        return order;
    }
    ```

=== "Rust"

    ```rust
    use std::collections::{HashMap, HashSet, VecDeque};
    pub fn bfs(graph: &HashMap<i32, Vec<i32>>, start: i32) -> Vec<i32> {
        let mut visited = HashSet::from([start]);
        let mut queue = VecDeque::from([start]);
        let mut order = Vec::new();
        while let Some(node) = queue.pop_front() {
            order.push(node);
            if let Some(nbs) = graph.get(&node) {
                for &nb in nbs {
                    if visited.insert(nb) { queue.push_back(nb); }
                }
            }
        }
        order
    }
    ```

=== "Java"

    ```java
    public List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>(Set.of(start));
        Queue<Integer> queue = new LinkedList<>(List.of(start));
        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);
            for (int nb : graph.getOrDefault(node, List.of()))
                if (visited.add(nb)) queue.offer(nb);
        }
        return order;
    }
    ```

=== "C#"

    ```csharp
    public List<int> Bfs(Dictionary<int, List<int>> graph, int start) {
        var visited = new HashSet<int> { start };
        var queue = new Queue<int>(); queue.Enqueue(start);
        var order = new List<int>();
        while (queue.Count > 0) {
            int node = queue.Dequeue(); order.Add(node);
            if (graph.TryGetValue(node, out var nbs))
                foreach (int nb in nbs)
                    if (visited.Add(nb)) queue.Enqueue(nb);
        }
        return order;
    }
    ```

=== "ASM"

    ```asm
    ; BFS — conceptual x86-64
    ; Use a circular buffer as queue, boolean array as visited set
    ; Dequeue node, process, enqueue unvisited neighbors
    ```

=== "Scala"

    ```scala
    import scala.collection.mutable
    def bfs(graph: Map[Int, List[Int]], start: Int): List[Int] = {
      val visited = mutable.Set(start)
      val queue = mutable.Queue(start)
      val order = mutable.ListBuffer.empty[Int]
      while (queue.nonEmpty) {
        val node = queue.dequeue(); order += node
        for (nb <- graph.getOrElse(node, Nil))
          if (visited.add(nb)) queue.enqueue(nb)
      }
      order.toList
    }
    ```

**Related LeetCode Problems:**

- [Number of Islands (LC 200)](https://leetcode.com/problems/number-of-islands/){ target=_blank }
- [Binary Tree Level Order Traversal (LC 102)](https://leetcode.com/problems/binary-tree-level-order-traversal/){ target=_blank }
- [Word Ladder (LC 127)](https://leetcode.com/problems/word-ladder/){ target=_blank }
- [Rotting Oranges (LC 994)](https://leetcode.com/problems/rotting-oranges/){ target=_blank }

---

### Depth-First Search (DFS)

**Description:** Explore as deep as possible before backtracking. Uses recursion or explicit stack.

**Complexity:** Time O(V + E), Space O(V)

=== "Python"

    ```python
    def dfs(graph: dict[int, list[int]], start: int) -> list[int]:
        visited: set[int] = set()
        order: list[int] = []
        def helper(node: int) -> None:
            visited.add(node)
            order.append(node)
            for nb in graph.get(node, []):
                if nb not in visited:
                    helper(nb)
        helper(start)
        return order
    ```

=== "TypeScript"

    ```typescript
    function dfs(graph: Map<number, number[]>, start: number): number[] {
        const visited = new Set<number>();
        const order: number[] = [];
        function helper(node: number): void {
            visited.add(node); order.push(node);
            for (const nb of graph.get(node) ?? [])
                if (!visited.has(nb)) helper(nb);
        }
        helper(start);
        return order;
    }
    ```

=== "Rust"

    ```rust
    use std::collections::{HashMap, HashSet};
    pub fn dfs(graph: &HashMap<i32, Vec<i32>>, start: i32) -> Vec<i32> {
        let mut visited = HashSet::new();
        let mut order = Vec::new();
        fn helper(n: i32, g: &HashMap<i32, Vec<i32>>, v: &mut HashSet<i32>, o: &mut Vec<i32>) {
            v.insert(n); o.push(n);
            if let Some(nbs) = g.get(&n) {
                for &nb in nbs { if !v.contains(&nb) { helper(nb, g, v, o); } }
            }
        }
        helper(start, graph, &mut visited, &mut order);
        order
    }
    ```

=== "Java"

    ```java
    public List<Integer> dfs(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        List<Integer> order = new ArrayList<>();
        dfsHelper(graph, start, visited, order);
        return order;
    }
    private void dfsHelper(Map<Integer, List<Integer>> graph, int node,
                           Set<Integer> visited, List<Integer> order) {
        visited.add(node); order.add(node);
        for (int nb : graph.getOrDefault(node, List.of()))
            if (!visited.contains(nb)) dfsHelper(graph, nb, visited, order);
    }
    ```

=== "C#"

    ```csharp
    public List<int> Dfs(Dictionary<int, List<int>> graph, int start) {
        var visited = new HashSet<int>();
        var order = new List<int>();
        void Helper(int node) {
            visited.Add(node); order.Add(node);
            if (graph.TryGetValue(node, out var nbs))
                foreach (int nb in nbs) if (!visited.Contains(nb)) Helper(nb);
        }
        Helper(start);
        return order;
    }
    ```

=== "ASM"

    ```asm
    ; DFS — conceptual x86-64
    ; Use call stack for recursion, boolean array for visited
    ; Visit node, mark visited, recurse on unvisited neighbors
    ```

=== "Scala"

    ```scala
    def dfs(graph: Map[Int, List[Int]], start: Int): List[Int] = {
      val visited = mutable.Set.empty[Int]
      val order = mutable.ListBuffer.empty[Int]
      def helper(node: Int): Unit = {
        visited += node; order += node
        for (nb <- graph.getOrElse(node, Nil))
          if (!visited.contains(nb)) helper(nb)
      }
      helper(start); order.toList
    }
    ```

**Related LeetCode Problems:**

- [Number of Islands (LC 200)](https://leetcode.com/problems/number-of-islands/){ target=_blank }
- [Clone Graph (LC 133)](https://leetcode.com/problems/clone-graph/){ target=_blank }
- [Pacific Atlantic Water Flow (LC 417)](https://leetcode.com/problems/pacific-atlantic-water-flow/){ target=_blank }
- [Course Schedule (LC 207)](https://leetcode.com/problems/course-schedule/){ target=_blank }

---

### Topological Sort (Kahn's Algorithm)

**Description:** Order nodes in a DAG so every edge goes from earlier to later. Uses in-degree counting with BFS.

**Complexity:** Time O(V + E), Space O(V)

=== "Python"

    ```python
    from collections import deque

    def topological_sort(num_nodes: int, edges: list[list[int]]) -> list[int]:
        graph: dict[int, list[int]] = {i: [] for i in range(num_nodes)}
        in_degree = [0] * num_nodes
        for u, v in edges:
            graph[u].append(v)
            in_degree[v] += 1
        queue = deque(i for i in range(num_nodes) if in_degree[i] == 0)
        order: list[int] = []
        while queue:
            node = queue.popleft()
            order.append(node)
            for nb in graph[node]:
                in_degree[nb] -= 1
                if in_degree[nb] == 0:
                    queue.append(nb)
        return order if len(order) == num_nodes else []
    ```

=== "TypeScript"

    ```typescript
    function topologicalSort(n: number, edges: number[][]): number[] {
        const graph: number[][] = Array.from({length: n}, () => []);
        const inDeg = new Array(n).fill(0);
        for (const [u, v] of edges) { graph[u].push(v); inDeg[v]++; }
        const queue: number[] = [];
        for (let i = 0; i < n; i++) if (inDeg[i] === 0) queue.push(i);
        const order: number[] = [];
        while (queue.length > 0) {
            const node = queue.shift()!; order.push(node);
            for (const nb of graph[node]) { inDeg[nb]--; if (inDeg[nb] === 0) queue.push(nb); }
        }
        return order.length === n ? order : [];
    }
    ```

=== "Rust"

    ```rust
    use std::collections::VecDeque;
    pub fn topological_sort(n: usize, edges: &[(usize, usize)]) -> Vec<usize> {
        let mut graph = vec![vec![]; n];
        let mut in_deg = vec![0usize; n];
        for &(u, v) in edges { graph[u].push(v); in_deg[v] += 1; }
        let mut queue: VecDeque<usize> = (0..n).filter(|&i| in_deg[i] == 0).collect();
        let mut order = Vec::new();
        while let Some(node) = queue.pop_front() {
            order.push(node);
            for &nb in &graph[node] { in_deg[nb] -= 1; if in_deg[nb] == 0 { queue.push_back(nb); } }
        }
        if order.len() == n { order } else { vec![] }
    }
    ```

=== "Java"

    ```java
    public int[] topologicalSort(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        int[] inDeg = new int[n];
        for (int[] e : edges) { graph.get(e[0]).add(e[1]); inDeg[e[1]]++; }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) if (inDeg[i] == 0) queue.offer(i);
        int[] order = new int[n]; int idx = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll(); order[idx++] = node;
            for (int nb : graph.get(node)) { inDeg[nb]--; if (inDeg[nb] == 0) queue.offer(nb); }
        }
        return idx == n ? order : new int[0];
    }
    ```

=== "C#"

    ```csharp
    public int[] TopologicalSort(int n, int[][] edges) {
        var graph = Enumerable.Range(0, n).Select(_ => new List<int>()).ToArray();
        var inDeg = new int[n];
        foreach (var e in edges) { graph[e[0]].Add(e[1]); inDeg[e[1]]++; }
        var queue = new Queue<int>();
        for (int i = 0; i < n; i++) if (inDeg[i] == 0) queue.Enqueue(i);
        var order = new List<int>();
        while (queue.Count > 0) {
            int node = queue.Dequeue(); order.Add(node);
            foreach (int nb in graph[node]) { inDeg[nb]--; if (inDeg[nb] == 0) queue.Enqueue(nb); }
        }
        return order.Count == n ? order.ToArray() : Array.Empty<int>();
    }
    ```

=== "ASM"

    ```asm
    ; Topological Sort (Kahn's) — conceptual x86-64
    ; Build adjacency list and in-degree array
    ; Enqueue all nodes with in-degree 0
    ; Process queue: dequeue, append to result, decrement neighbors' in-degree
    ```

=== "Scala"

    ```scala
    def topologicalSort(n: Int, edges: Array[(Int, Int)]): Array[Int] = {
      val graph = Array.fill(n)(mutable.ListBuffer.empty[Int])
      val inDeg = new Array[Int](n)
      for ((u, v) <- edges) { graph(u) += v; inDeg(v) += 1 }
      val queue = mutable.Queue.from((0 until n).filter(inDeg(_) == 0))
      val order = mutable.ArrayBuffer.empty[Int]
      while (queue.nonEmpty) {
        val node = queue.dequeue(); order += node
        for (nb <- graph(node)) { inDeg(nb) -= 1; if (inDeg(nb) == 0) queue.enqueue(nb) }
      }
      if (order.length == n) order.toArray else Array.empty
    }
    ```

**Related LeetCode Problems:**

- [Course Schedule (LC 207)](https://leetcode.com/problems/course-schedule/){ target=_blank }
- [Course Schedule II (LC 210)](https://leetcode.com/problems/course-schedule-ii/){ target=_blank }
- [Alien Dictionary (LC 269)](https://leetcode.com/problems/alien-dictionary/){ target=_blank }

---

### Dijkstra's Algorithm

**Description:** Shortest path in a weighted graph with non-negative edges. Uses a min-heap.

**Complexity:** Time O(E log V), Space O(V)

=== "Python"

    ```python
    import heapq

    def dijkstra(graph: dict[int, list[tuple[int, int]]], start: int) -> dict[int, int]:
        dist: dict[int, int] = {start: 0}
        heap = [(0, start)]
        while heap:
            d, u = heapq.heappop(heap)
            if d > dist.get(u, float('inf')):
                continue
            for v, w in graph.get(u, []):
                nd = d + w
                if nd < dist.get(v, float('inf')):
                    dist[v] = nd
                    heapq.heappush(heap, (nd, v))
        return dist
    ```

=== "TypeScript"

    ```typescript
    function dijkstra(graph: Map<number, [number, number][]>, start: number): Map<number, number> {
        const dist = new Map<number, number>([[start, 0]]);
        // Simple priority queue via sorted insert (use a real heap in production)
        const heap: [number, number][] = [[0, start]];
        while (heap.length > 0) {
            heap.sort((a, b) => a[0] - b[0]);
            const [d, u] = heap.shift()!;
            if (d > (dist.get(u) ?? Infinity)) continue;
            for (const [v, w] of graph.get(u) ?? []) {
                const nd = d + w;
                if (nd < (dist.get(v) ?? Infinity)) { dist.set(v, nd); heap.push([nd, v]); }
            }
        }
        return dist;
    }
    ```

=== "Rust"

    ```rust
    use std::cmp::Reverse;
    use std::collections::{BinaryHeap, HashMap};
    pub fn dijkstra(graph: &HashMap<i32, Vec<(i32, i32)>>, start: i32) -> HashMap<i32, i32> {
        let mut dist = HashMap::from([(start, 0)]);
        let mut heap = BinaryHeap::from([Reverse((0, start))]);
        while let Some(Reverse((d, u))) = heap.pop() {
            if d > *dist.get(&u).unwrap_or(&i32::MAX) { continue; }
            if let Some(nbs) = graph.get(&u) {
                for &(v, w) in nbs {
                    let nd = d + w;
                    if nd < *dist.get(&v).unwrap_or(&i32::MAX) {
                        dist.insert(v, nd);
                        heap.push(Reverse((nd, v)));
                    }
                }
            }
        }
        dist
    }
    ```

=== "Java"

    ```java
    public Map<Integer, Integer> dijkstra(Map<Integer, List<int[]>> graph, int start) {
        Map<Integer, Integer> dist = new HashMap<>(Map.of(start, 0));
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        heap.offer(new int[]{0, start});
        while (!heap.isEmpty()) {
            int[] top = heap.poll(); int d = top[0], u = top[1];
            if (d > dist.getOrDefault(u, Integer.MAX_VALUE)) continue;
            for (int[] edge : graph.getOrDefault(u, List.of())) {
                int v = edge[0], nd = d + edge[1];
                if (nd < dist.getOrDefault(v, Integer.MAX_VALUE)) {
                    dist.put(v, nd); heap.offer(new int[]{nd, v});
                }
            }
        }
        return dist;
    }
    ```

=== "C#"

    ```csharp
    public Dictionary<int, int> Dijkstra(Dictionary<int, List<(int v, int w)>> graph, int start) {
        var dist = new Dictionary<int, int> { [start] = 0 };
        var heap = new PriorityQueue<int, int>();
        heap.Enqueue(start, 0);
        while (heap.Count > 0) {
            heap.TryDequeue(out int u, out int d);
            if (d > (dist.GetValueOrDefault(u, int.MaxValue))) continue;
            if (graph.TryGetValue(u, out var nbs))
                foreach (var (v, w) in nbs) {
                    int nd = d + w;
                    if (nd < dist.GetValueOrDefault(v, int.MaxValue)) {
                        dist[v] = nd; heap.Enqueue(v, nd);
                    }
                }
        }
        return dist;
    }
    ```

=== "ASM"

    ```asm
    ; Dijkstra's — conceptual x86-64
    ; Maintain dist[] array, use a min-heap (manual or library)
    ; Pop min-dist node, relax edges, push updated distances
    ```

=== "Scala"

    ```scala
    import scala.collection.mutable
    def dijkstra(graph: Map[Int, List[(Int, Int)]], start: Int): Map[Int, Int] = {
      val dist = mutable.Map(start -> 0)
      val heap = mutable.PriorityQueue.empty[(Int, Int)](Ordering.by(-_._1))
      heap.enqueue((0, start))
      while (heap.nonEmpty) {
        val (d, u) = heap.dequeue()
        if (d <= dist.getOrElse(u, Int.MaxValue))
          for ((v, w) <- graph.getOrElse(u, Nil)) {
            val nd = d + w
            if (nd < dist.getOrElse(v, Int.MaxValue)) { dist(v) = nd; heap.enqueue((nd, v)) }
          }
      }
      dist.toMap
    }
    ```

**Related LeetCode Problems:**

- [Network Delay Time (LC 743)](https://leetcode.com/problems/network-delay-time/){ target=_blank }
- [Cheapest Flights Within K Stops (LC 787)](https://leetcode.com/problems/cheapest-flights-within-k-stops/){ target=_blank }
- [Swim in Rising Water (LC 778)](https://leetcode.com/problems/swim-in-rising-water/){ target=_blank }

---

### Union-Find (Disjoint Set)

**Description:** Track connected components with near-constant-time union and find operations. Uses path compression and union by rank.

**Complexity:** Time O(α(n)) per operation ≈ O(1), Space O(n)

=== "Python"

    ```python
    class UnionFind:
        def __init__(self, n: int):
            self.parent = list(range(n))
            self.rank = [0] * n

        def find(self, x: int) -> int:
            if self.parent[x] != x:
                self.parent[x] = self.find(self.parent[x])
            return self.parent[x]

        def union(self, a: int, b: int) -> bool:
            ra, rb = self.find(a), self.find(b)
            if ra == rb:
                return False
            if self.rank[ra] < self.rank[rb]:
                ra, rb = rb, ra
            self.parent[rb] = ra
            if self.rank[ra] == self.rank[rb]:
                self.rank[ra] += 1
            return True
    ```

=== "TypeScript"

    ```typescript
    class UnionFind {
        parent: number[];
        rank: number[];
        constructor(n: number) {
            this.parent = Array.from({length: n}, (_, i) => i);
            this.rank = new Array(n).fill(0);
        }
        find(x: number): number {
            if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
            return this.parent[x];
        }
        union(a: number, b: number): boolean {
            let ra = this.find(a), rb = this.find(b);
            if (ra === rb) return false;
            if (this.rank[ra] < this.rank[rb]) [ra, rb] = [rb, ra];
            this.parent[rb] = ra;
            if (this.rank[ra] === this.rank[rb]) this.rank[ra]++;
            return true;
        }
    }
    ```

=== "Rust"

    ```rust
    struct UnionFind { parent: Vec<usize>, rank: Vec<usize> }
    impl UnionFind {
        fn new(n: usize) -> Self { Self { parent: (0..n).collect(), rank: vec![0; n] } }
        fn find(&mut self, x: usize) -> usize {
            if self.parent[x] != x { self.parent[x] = self.find(self.parent[x]); }
            self.parent[x]
        }
        fn union(&mut self, a: usize, b: usize) -> bool {
            let (mut ra, mut rb) = (self.find(a), self.find(b));
            if ra == rb { return false; }
            if self.rank[ra] < self.rank[rb] { std::mem::swap(&mut ra, &mut rb); }
            self.parent[rb] = ra;
            if self.rank[ra] == self.rank[rb] { self.rank[ra] += 1; }
            true
        }
    }
    ```

=== "Java"

    ```java
    class UnionFind {
        int[] parent, rank;
        UnionFind(int n) { parent = new int[n]; rank = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i; }
        int find(int x) { if (parent[x] != x) parent[x] = find(parent[x]); return parent[x]; }
        boolean union(int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra == rb) return false;
            if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
            parent[rb] = ra;
            if (rank[ra] == rank[rb]) rank[ra]++;
            return true;
        }
    }
    ```

=== "C#"

    ```csharp
    public class UnionFind {
        int[] parent, rank;
        public UnionFind(int n) { parent = new int[n]; rank = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i; }
        public int Find(int x) { if (parent[x] != x) parent[x] = Find(parent[x]); return parent[x]; }
        public bool Union(int a, int b) {
            int ra = Find(a), rb = Find(b);
            if (ra == rb) return false;
            if (rank[ra] < rank[rb]) (ra, rb) = (rb, ra);
            parent[rb] = ra;
            if (rank[ra] == rank[rb]) rank[ra]++;
            return true;
        }
    }
    ```

=== "ASM"

    ```asm
    ; Union-Find — conceptual x86-64
    ; parent[] and rank[] arrays in .bss
    ; find: follow parent[x] with path compression (store root back)
    ; union: find roots, attach smaller-rank tree under larger
    ```

=== "Scala"

    ```scala
    class UnionFind(n: Int) {
      val parent: Array[Int] = (0 until n).toArray
      val rank: Array[Int] = new Array[Int](n)
      def find(x: Int): Int = {
        if (parent(x) != x) parent(x) = find(parent(x)); parent(x)
      }
      def union(a: Int, b: Int): Boolean = {
        var (ra, rb) = (find(a), find(b))
        if (ra == rb) return false
        if (rank(ra) < rank(rb)) { val t = ra; ra = rb; rb = t }
        parent(rb) = ra
        if (rank(ra) == rank(rb)) rank(ra) += 1
        true
      }
    }
    ```

**Related LeetCode Problems:**

- [Number of Connected Components (LC 323)](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/){ target=_blank }
- [Redundant Connection (LC 684)](https://leetcode.com/problems/redundant-connection/){ target=_blank }
- [Graph Valid Tree (LC 261)](https://leetcode.com/problems/graph-valid-tree/){ target=_blank }
- [Accounts Merge (LC 721)](https://leetcode.com/problems/accounts-merge/){ target=_blank }

---

## Tree Traversal

### Inorder Traversal

**Description:** Visit left subtree → root → right subtree. Produces sorted order for BSTs.

**Complexity:** Time O(n), Space O(h) where h is tree height

=== "Python"

    ```python
    def inorder(root) -> list[int]:
        if not root:
            return []
        return inorder(root.left) + [root.val] + inorder(root.right)
    ```

=== "TypeScript"

    ```typescript
    function inorder(root: TreeNode | null): number[] {
        if (!root) return [];
        return [...inorder(root.left), root.val, ...inorder(root.right)];
    }
    ```

=== "Rust"

    ```rust
    pub fn inorder(root: Option<&TreeNode>) -> Vec<i32> {
        match root {
            None => vec![],
            Some(n) => { let mut r = inorder(n.left.as_deref());
                r.push(n.val); r.extend(inorder(n.right.as_deref())); r }
        }
    }
    ```

=== "Java"

    ```java
    public List<Integer> inorder(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        res.addAll(inorder(root.left));
        res.add(root.val);
        res.addAll(inorder(root.right));
        return res;
    }
    ```

=== "C#"

    ```csharp
    public IList<int> Inorder(TreeNode root) {
        var res = new List<int>();
        if (root == null) return res;
        res.AddRange(Inorder(root.left));
        res.Add(root.val);
        res.AddRange(Inorder(root.right));
        return res;
    }
    ```

=== "ASM"

    ```asm
    ; Inorder — conceptual: recurse left, process node, recurse right
    ```

=== "Scala"

    ```scala
    def inorder(root: TreeNode): List[Int] =
      if (root == null) Nil
      else inorder(root.left) ::: root.value :: inorder(root.right)
    ```

**Related LeetCode Problems:**

- [Binary Tree Inorder Traversal (LC 94)](https://leetcode.com/problems/binary-tree-inorder-traversal/){ target=_blank }
- [Kth Smallest Element in a BST (LC 230)](https://leetcode.com/problems/kth-smallest-element-in-a-bst/){ target=_blank }
- [Validate Binary Search Tree (LC 98)](https://leetcode.com/problems/validate-binary-search-tree/){ target=_blank }

---

### Preorder Traversal

**Description:** Visit root → left subtree → right subtree. Useful for serialization and copying trees.

**Complexity:** Time O(n), Space O(h)

=== "Python"

    ```python
    def preorder(root) -> list[int]:
        if not root:
            return []
        return [root.val] + preorder(root.left) + preorder(root.right)
    ```

=== "TypeScript"

    ```typescript
    function preorder(root: TreeNode | null): number[] {
        if (!root) return [];
        return [root.val, ...preorder(root.left), ...preorder(root.right)];
    }
    ```

=== "Rust"

    ```rust
    pub fn preorder(root: Option<&TreeNode>) -> Vec<i32> {
        match root {
            None => vec![],
            Some(n) => { let mut r = vec![n.val];
                r.extend(preorder(n.left.as_deref()));
                r.extend(preorder(n.right.as_deref())); r }
        }
    }
    ```

=== "Java"

    ```java
    public List<Integer> preorder(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        res.add(root.val);
        res.addAll(preorder(root.left));
        res.addAll(preorder(root.right));
        return res;
    }
    ```

=== "C#"

    ```csharp
    public IList<int> Preorder(TreeNode root) {
        var res = new List<int>();
        if (root == null) return res;
        res.Add(root.val);
        res.AddRange(Preorder(root.left));
        res.AddRange(Preorder(root.right));
        return res;
    }
    ```

=== "ASM"

    ```asm
    ; Preorder — conceptual: process node, recurse left, recurse right
    ```

=== "Scala"

    ```scala
    def preorder(root: TreeNode): List[Int] =
      if (root == null) Nil
      else root.value :: preorder(root.left) ::: preorder(root.right)
    ```

**Related LeetCode Problems:**

- [Binary Tree Preorder Traversal (LC 144)](https://leetcode.com/problems/binary-tree-preorder-traversal/){ target=_blank }
- [Construct Binary Tree from Preorder and Inorder (LC 105)](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/){ target=_blank }

---

## Dynamic Programming Algorithms

### Kadane's Algorithm

**Description:** Find maximum subarray sum in a single pass. Track current sum, reset when it goes negative.

**Complexity:** Time O(n), Space O(1)

=== "Python"

    ```python
    def max_subarray(nums: list[int]) -> int:
        best = cur = nums[0]
        for x in nums[1:]:
            cur = max(x, cur + x)
            best = max(best, cur)
        return best
    ```

=== "TypeScript"

    ```typescript
    function maxSubArray(nums: number[]): number {
        let best = nums[0], cur = nums[0];
        for (let i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
    ```

=== "Rust"

    ```rust
    pub fn max_sub_array(nums: &[i32]) -> i32 {
        let (mut best, mut cur) = (nums[0], nums[0]);
        for &x in &nums[1..] {
            cur = x.max(cur + x);
            best = best.max(cur);
        }
        best
    }
    ```

=== "Java"

    ```java
    public int maxSubArray(int[] nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
    ```

=== "C#"

    ```csharp
    public int MaxSubArray(int[] nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.Length; i++) {
            cur = Math.Max(nums[i], cur + nums[i]);
            best = Math.Max(best, cur);
        }
        return best;
    }
    ```

=== "ASM"

    ```asm
    ; Kadane's — x86-64: track cur_sum and best in registers
    ; For each element: cur = max(arr[i], cur + arr[i]), best = max(best, cur)
    ```

=== "Scala"

    ```scala
    def maxSubArray(nums: Array[Int]): Int = {
      var best = nums(0); var cur = nums(0)
      for (i <- 1 until nums.length) {
        cur = math.max(nums(i), cur + nums(i))
        best = math.max(best, cur)
      }
      best
    }
    ```

**Related LeetCode Problems:**

- [Maximum Subarray (LC 53)](https://leetcode.com/problems/maximum-subarray/){ target=_blank }
- [Maximum Product Subarray (LC 152)](https://leetcode.com/problems/maximum-product-subarray/){ target=_blank }

---

### Longest Common Subsequence

**Description:** Find the length of the longest subsequence common to two strings using 2D DP.

**Complexity:** Time O(m × n), Space O(m × n) — can be optimized to O(min(m, n))

=== "Python"

    ```python
    def lcs(s1: str, s2: str) -> int:
        m, n = len(s1), len(s2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s1[i-1] == s2[j-1]:
                    dp[i][j] = dp[i-1][j-1] + 1
                else:
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
        return dp[m][n]
    ```

=== "TypeScript"

    ```typescript
    function lcs(s1: string, s2: string): number {
        const m = s1.length, n = s2.length;
        const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
        for (let i = 1; i <= m; i++)
            for (let j = 1; j <= n; j++)
                dp[i][j] = s1[i-1] === s2[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
        return dp[m][n];
    }
    ```

=== "Rust"

    ```rust
    pub fn lcs(s1: &str, s2: &str) -> usize {
        let (a, b): (Vec<char>, Vec<char>) = (s1.chars().collect(), s2.chars().collect());
        let (m, n) = (a.len(), b.len());
        let mut dp = vec![vec![0usize; n + 1]; m + 1];
        for i in 1..=m { for j in 1..=n {
            dp[i][j] = if a[i-1] == b[j-1] { dp[i-1][j-1] + 1 } else { dp[i-1][j].max(dp[i][j-1]) };
        }}
        dp[m][n]
    }
    ```

=== "Java"

    ```java
    public int lcs(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = s1.charAt(i-1) == s2.charAt(j-1) ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);
        return dp[m][n];
    }
    ```

=== "C#"

    ```csharp
    public int Lcs(string s1, string s2) {
        int m = s1.Length, n = s2.Length;
        var dp = new int[m+1, n+1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i,j] = s1[i-1] == s2[j-1] ? dp[i-1,j-1]+1 : Math.Max(dp[i-1,j], dp[i,j-1]);
        return dp[m,n];
    }
    ```

=== "ASM"

    ```asm
    ; LCS — conceptual x86-64
    ; Allocate (m+1)*(n+1) DP table, fill row by row
    ; If chars match: dp[i][j] = dp[i-1][j-1]+1, else max of left/above
    ```

=== "Scala"

    ```scala
    def lcs(s1: String, s2: String): Int = {
      val (m, n) = (s1.length, s2.length)
      val dp = Array.ofDim[Int](m + 1, n + 1)
      for (i <- 1 to m; j <- 1 to n)
        dp(i)(j) = if (s1(i-1) == s2(j-1)) dp(i-1)(j-1)+1 else dp(i-1)(j) max dp(i)(j-1)
      dp(m)(n)
    }
    ```

**Related LeetCode Problems:**

- [Longest Common Subsequence (LC 1143)](https://leetcode.com/problems/longest-common-subsequence/){ target=_blank }
- [Edit Distance (LC 72)](https://leetcode.com/problems/edit-distance/){ target=_blank }

---

## Technique Templates

### Monotonic Stack

**Description:** Maintain a stack of elements in increasing or decreasing order. Efficiently find next greater/smaller element.

**Complexity:** Time O(n), Space O(n)

=== "Python"

    ```python
    def next_greater(nums: list[int]) -> list[int]:
        result = [-1] * len(nums)
        stack: list[int] = []  # indices
        for i, val in enumerate(nums):
            while stack and nums[stack[-1]] < val:
                result[stack.pop()] = val
            stack.append(i)
        return result
    ```

=== "TypeScript"

    ```typescript
    function nextGreater(nums: number[]): number[] {
        const result = new Array(nums.length).fill(-1);
        const stack: number[] = [];
        for (let i = 0; i < nums.length; i++) {
            while (stack.length && nums[stack[stack.length-1]] < nums[i])
                result[stack.pop()!] = nums[i];
            stack.push(i);
        }
        return result;
    }
    ```

=== "Rust"

    ```rust
    pub fn next_greater(nums: &[i32]) -> Vec<i32> {
        let mut result = vec![-1; nums.len()];
        let mut stack: Vec<usize> = Vec::new();
        for (i, &val) in nums.iter().enumerate() {
            while stack.last().map_or(false, |&top| nums[top] < val) {
                result[stack.pop().unwrap()] = val;
            }
            stack.push(i);
        }
        result
    }
    ```

=== "Java"

    ```java
    public int[] nextGreater(int[] nums) {
        int[] result = new int[nums.length];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] < nums[i])
                result[stack.pop()] = nums[i];
            stack.push(i);
        }
        return result;
    }
    ```

=== "C#"

    ```csharp
    public int[] NextGreater(int[] nums) {
        var result = new int[nums.Length];
        Array.Fill(result, -1);
        var stack = new Stack<int>();
        for (int i = 0; i < nums.Length; i++) {
            while (stack.Count > 0 && nums[stack.Peek()] < nums[i])
                result[stack.Pop()] = nums[i];
            stack.Push(i);
        }
        return result;
    }
    ```

=== "ASM"

    ```asm
    ; Monotonic Stack — conceptual x86-64
    ; Use array as stack, track top index in register
    ; For each element: pop while stack top < current, record result
    ```

=== "Scala"

    ```scala
    def nextGreater(nums: Array[Int]): Array[Int] = {
      val result = Array.fill(nums.length)(-1)
      val stack = mutable.Stack.empty[Int]
      for (i <- nums.indices) {
        while (stack.nonEmpty && nums(stack.top) < nums(i))
          result(stack.pop()) = nums(i)
        stack.push(i)
      }
      result
    }
    ```

**Related LeetCode Problems:**

- [Daily Temperatures (LC 739)](https://leetcode.com/problems/daily-temperatures/){ target=_blank }
- [Next Greater Element I (LC 496)](https://leetcode.com/problems/next-greater-element-i/){ target=_blank }
- [Largest Rectangle in Histogram (LC 84)](https://leetcode.com/problems/largest-rectangle-in-histogram/){ target=_blank }
- [Trapping Rain Water (LC 42)](https://leetcode.com/problems/trapping-rain-water/){ target=_blank }

---

### Prefix Sum

**Description:** Precompute cumulative sums to answer range-sum queries in O(1).

**Complexity:** Time O(n) build + O(1) query, Space O(n)

=== "Python"

    ```python
    def prefix_sum(nums: list[int]) -> list[int]:
        prefix = [0] * (len(nums) + 1)
        for i, v in enumerate(nums):
            prefix[i + 1] = prefix[i] + v
        return prefix
    # Range sum [l, r] inclusive = prefix[r+1] - prefix[l]
    ```

=== "TypeScript"

    ```typescript
    function prefixSum(nums: number[]): number[] {
        const prefix = [0];
        for (const v of nums) prefix.push(prefix[prefix.length - 1] + v);
        return prefix;
    }
    ```

=== "Rust"

    ```rust
    pub fn prefix_sum(nums: &[i32]) -> Vec<i32> {
        let mut prefix = vec![0; nums.len() + 1];
        for (i, &v) in nums.iter().enumerate() { prefix[i + 1] = prefix[i] + v; }
        prefix
    }
    ```

=== "Java"

    ```java
    public int[] prefixSum(int[] nums) {
        int[] prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) prefix[i+1] = prefix[i] + nums[i];
        return prefix;
    }
    ```

=== "C#"

    ```csharp
    public int[] PrefixSum(int[] nums) {
        var prefix = new int[nums.Length + 1];
        for (int i = 0; i < nums.Length; i++) prefix[i+1] = prefix[i] + nums[i];
        return prefix;
    }
    ```

=== "ASM"

    ```asm
    ; Prefix Sum — x86-64: running total in register, store to output array
    ```

=== "Scala"

    ```scala
    def prefixSum(nums: Array[Int]): Array[Int] =
      nums.scanLeft(0)(_ + _)
    ```

**Related LeetCode Problems:**

- [Subarray Sum Equals K (LC 560)](https://leetcode.com/problems/subarray-sum-equals-k/){ target=_blank }
- [Product of Array Except Self (LC 238)](https://leetcode.com/problems/product-of-array-except-self/){ target=_blank }
- [Range Sum Query — Immutable (LC 303)](https://leetcode.com/problems/range-sum-query-immutable/){ target=_blank }

---

### Quick Select

**Description:** Find the k-th smallest/largest element in an unsorted array using partitioning. Average O(n).

**Complexity:** Time O(n) avg / O(n²) worst, Space O(1)

=== "Python"

    ```python
    import random
    def quick_select(nums: list[int], k: int) -> int:
        """Find k-th smallest (0-indexed)."""
        pivot = random.choice(nums)
        lo = [x for x in nums if x < pivot]
        eq = [x for x in nums if x == pivot]
        hi = [x for x in nums if x > pivot]
        if k < len(lo):
            return quick_select(lo, k)
        elif k < len(lo) + len(eq):
            return pivot
        else:
            return quick_select(hi, k - len(lo) - len(eq))
    ```

=== "TypeScript"

    ```typescript
    function quickSelect(nums: number[], k: number): number {
        const pivot = nums[Math.floor(Math.random() * nums.length)];
        const lo = nums.filter(x => x < pivot);
        const eq = nums.filter(x => x === pivot);
        const hi = nums.filter(x => x > pivot);
        if (k < lo.length) return quickSelect(lo, k);
        if (k < lo.length + eq.length) return pivot;
        return quickSelect(hi, k - lo.length - eq.length);
    }
    ```

=== "Rust"

    ```rust
    pub fn quick_select(nums: &mut [i32], k: usize) -> i32 {
        let pivot_idx = nums.len() / 2;
        let pivot = nums[pivot_idx];
        let lo: Vec<i32> = nums.iter().filter(|&&x| x < pivot).copied().collect();
        let eq: Vec<i32> = nums.iter().filter(|&&x| x == pivot).copied().collect();
        let mut hi: Vec<i32> = nums.iter().filter(|&&x| x > pivot).copied().collect();
        if k < lo.len() { return quick_select(&mut lo.clone(), k); }
        if k < lo.len() + eq.len() { return pivot; }
        quick_select(&mut hi, k - lo.len() - eq.len())
    }
    ```

=== "Java"

    ```java
    // In-place Lomuto partition variant
    public int quickSelect(int[] nums, int lo, int hi, int k) {
        if (lo == hi) return nums[lo];
        int pivot = nums[hi], i = lo;
        for (int j = lo; j < hi; j++)
            if (nums[j] <= pivot) { int t = nums[i]; nums[i] = nums[j]; nums[j] = t; i++; }
        int t = nums[i]; nums[i] = nums[hi]; nums[hi] = t;
        if (k == i) return nums[i];
        return k < i ? quickSelect(nums, lo, i - 1, k) : quickSelect(nums, i + 1, hi, k);
    }
    ```

=== "C#"

    ```csharp
    public int QuickSelect(int[] nums, int lo, int hi, int k) {
        if (lo == hi) return nums[lo];
        int pivot = nums[hi], i = lo;
        for (int j = lo; j < hi; j++)
            if (nums[j] <= pivot) { (nums[i], nums[j]) = (nums[j], nums[i]); i++; }
        (nums[i], nums[hi]) = (nums[hi], nums[i]);
        if (k == i) return nums[i];
        return k < i ? QuickSelect(nums, lo, i - 1, k) : QuickSelect(nums, i + 1, hi, k);
    }
    ```

=== "ASM"

    ```asm
    ; Quick Select — conceptual x86-64
    ; Partition array around pivot, recurse into the half containing k-th element
    ```

=== "Scala"

    ```scala
    def quickSelect(nums: Array[Int], k: Int): Int = {
      val pivot = nums(scala.util.Random.nextInt(nums.length))
      val (lo, eq, hi) = (nums.filter(_ < pivot), nums.filter(_ == pivot), nums.filter(_ > pivot))
      if (k < lo.length) quickSelect(lo, k)
      else if (k < lo.length + eq.length) pivot
      else quickSelect(hi, k - lo.length - eq.length)
    }
    ```

**Related LeetCode Problems:**

- [Kth Largest Element in an Array (LC 215)](https://leetcode.com/problems/kth-largest-element-in-an-array/){ target=_blank }
- [Top K Frequent Elements (LC 347)](https://leetcode.com/problems/top-k-frequent-elements/){ target=_blank }

---

### Bit Manipulation Basics

**Description:** Common bit tricks for counting, checking, and manipulating binary representations.

**Complexity:** Time O(1) per operation (or O(log n) for counting), Space O(1)

=== "Python"

    ```python
    # Count set bits
    def count_bits(n: int) -> int:
        count = 0
        while n:
            count += n & 1
            n >>= 1
        return count

    # Check power of 2
    def is_power_of_two(n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0

    # Single number (XOR all — duplicate pairs cancel)
    def single_number(nums: list[int]) -> int:
        result = 0
        for x in nums:
            result ^= x
        return result

    # Get / Set / Clear bit at position k
    def get_bit(n: int, k: int) -> int:   return (n >> k) & 1
    def set_bit(n: int, k: int) -> int:   return n | (1 << k)
    def clear_bit(n: int, k: int) -> int:  return n & ~(1 << k)
    ```

=== "TypeScript"

    ```typescript
    function countBits(n: number): number {
        let count = 0;
        while (n) { count += n & 1; n >>= 1; }
        return count;
    }
    function isPowerOfTwo(n: number): boolean { return n > 0 && (n & (n - 1)) === 0; }
    function singleNumber(nums: number[]): number { return nums.reduce((a, b) => a ^ b, 0); }
    ```

=== "Rust"

    ```rust
    pub fn count_bits(mut n: u32) -> u32 {
        let mut c = 0; while n > 0 { c += n & 1; n >>= 1; } c
    }
    pub fn is_power_of_two(n: i32) -> bool { n > 0 && (n & (n - 1)) == 0 }
    pub fn single_number(nums: &[i32]) -> i32 { nums.iter().fold(0, |a, &b| a ^ b) }
    ```

=== "Java"

    ```java
    public int countBits(int n) { int c = 0; while (n > 0) { c += n & 1; n >>= 1; } return c; }
    public boolean isPowerOfTwo(int n) { return n > 0 && (n & (n - 1)) == 0; }
    public int singleNumber(int[] nums) { int r = 0; for (int x : nums) r ^= x; return r; }
    ```

=== "C#"

    ```csharp
    public int CountBits(int n) { int c = 0; while (n > 0) { c += n & 1; n >>= 1; } return c; }
    public bool IsPowerOfTwo(int n) => n > 0 && (n & (n - 1)) == 0;
    public int SingleNumber(int[] nums) { int r = 0; foreach (int x in nums) r ^= x; return r; }
    ```

=== "ASM"

    ```asm
    ; Count bits: use popcnt instruction (x86) or loop with shr+and
    ; Power of 2: test n > 0, then and n, n-1 == 0
    ; XOR all: xor accumulator with each element
    ```

=== "Scala"

    ```scala
    def countBits(n: Int): Int = { var x = n; var c = 0; while (x > 0) { c += x & 1; x >>= 1 }; c }
    def isPowerOfTwo(n: Int): Boolean = n > 0 && (n & (n - 1)) == 0
    def singleNumber(nums: Array[Int]): Int = nums.reduce(_ ^ _)
    ```

**Related LeetCode Problems:**

- [Single Number (LC 136)](https://leetcode.com/problems/single-number/){ target=_blank }
- [Number of 1 Bits (LC 191)](https://leetcode.com/problems/number-of-1-bits/){ target=_blank }
- [Counting Bits (LC 338)](https://leetcode.com/problems/counting-bits/){ target=_blank }
- [Reverse Bits (LC 190)](https://leetcode.com/problems/reverse-bits/){ target=_blank }
- [Missing Number (LC 268)](https://leetcode.com/problems/missing-number/){ target=_blank }
- [Sum of Two Integers (LC 371)](https://leetcode.com/problems/sum-of-two-integers/){ target=_blank }
