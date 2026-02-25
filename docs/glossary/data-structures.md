# Data Structure Glossary

> Complete reference of data structures with implementations in 7 languages. Click any heading to get a direct link.

---

## Complexity Overview

| Data Structure | Access | Search | Insert | Delete | Space | Best For |
|----------------|--------|--------|--------|--------|-------|----------|
| [Array](#array) | O(1) | O(n) | O(n) | O(n) | O(n) | Index-based access |
| [Linked List](#linked-list) | O(n) | O(n) | O(1)* | O(1)* | O(n) | Frequent insert/delete |
| [Hash Map](#hash-map) | — | O(1)† | O(1)† | O(1)† | O(n) | Key-value lookup |
| [Hash Set](#hash-set) | — | O(1)† | O(1)† | O(1)† | O(n) | Membership / dedup |
| [Stack](#stack) | O(1) top | O(n) | O(1) | O(1) | O(n) | LIFO, matching, undo |
| [Queue](#queue) | O(1) front | O(n) | O(1) | O(1) | O(n) | FIFO, BFS, scheduling |
| [Heap / Priority Queue](#heap-priority-queue) | O(1) top | O(n) | O(log n) | O(log n) | O(n) | Min/max, Top-K |
| Balanced BST | — | O(log n) | O(log n) | O(log n) | O(n) | Ordered data |
| [Trie](#trie) | — | O(m) | O(m) | O(m) | O(Σm) | Prefix search |
| [Graph](#graph-adjacency-list) | — | O(V+E) | O(1) | O(E) | O(V+E) | Relationships |
| [Disjoint Set (Union-Find)](#disjoint-set-union-find) | — | O(α(n)) | O(α(n)) | — | O(n) | Connected components |

\* At known position &nbsp; † Amortized average

---

## Array

**Description:** Contiguous block of memory with O(1) random access by index. Foundation of most algorithms.

**When to Use:** Index-based access, iteration, simple collections, when size is known or grows slowly.

=== "Python"

    ```python
    # Dynamic array (list)
    arr = [1, 2, 3, 4, 5]
    arr.append(6)          # O(1) amortized
    arr.pop()              # O(1) remove last
    arr.insert(2, 99)      # O(n) insert at index
    val = arr[0]           # O(1) access
    arr.sort()             # O(n log n)
    ```

=== "TypeScript"

    ```typescript
    const arr: number[] = [1, 2, 3, 4, 5];
    arr.push(6);              // O(1) amortized
    arr.pop();                // O(1) remove last
    arr.splice(2, 0, 99);    // O(n) insert at index
    const val = arr[0];       // O(1) access
    arr.sort((a, b) => a - b); // O(n log n)
    ```

=== "Rust"

    ```rust
    let mut arr = vec![1, 2, 3, 4, 5];
    arr.push(6);              // O(1) amortized
    arr.pop();                // O(1) remove last
    arr.insert(2, 99);        // O(n) insert at index
    let val = arr[0];         // O(1) access
    arr.sort();               // O(n log n)
    ```

=== "Java"

    ```java
    List<Integer> arr = new ArrayList<>(List.of(1, 2, 3, 4, 5));
    arr.add(6);               // O(1) amortized
    arr.remove(arr.size()-1);  // O(1) remove last
    arr.add(2, 99);           // O(n) insert at index
    int val = arr.get(0);      // O(1) access
    Collections.sort(arr);     // O(n log n)
    ```

=== "C#"

    ```csharp
    var arr = new List<int> { 1, 2, 3, 4, 5 };
    arr.Add(6);               // O(1) amortized
    arr.RemoveAt(arr.Count-1); // O(1) remove last
    arr.Insert(2, 99);        // O(n) insert at index
    int val = arr[0];          // O(1) access
    arr.Sort();                // O(n log n)
    ```

=== "ASM"

    ```asm
    ; Array in x86-64: contiguous memory, base pointer + index * element_size
    ; Access: mov eax, [rdi + rcx*4]  ; arr[i] for int array
    ; Insert/delete requires shifting elements via rep movsb/d
    ```

=== "Scala"

    ```scala
    val arr = scala.collection.mutable.ArrayBuffer(1, 2, 3, 4, 5)
    arr += 6                // O(1) amortized
    arr.remove(arr.length - 1) // O(1) remove last
    arr.insert(2, 99)       // O(n) insert at index
    val v = arr(0)          // O(1) access
    arr.sortInPlace()       // O(n log n)
    ```

**Related LeetCode Problems:**

- [Two Sum (LC 1)](https://leetcode.com/problems/two-sum/){ target=_blank }
- [Product of Array Except Self (LC 238)](https://leetcode.com/problems/product-of-array-except-self/){ target=_blank }
- [Contains Duplicate (LC 217)](https://leetcode.com/problems/contains-duplicate/){ target=_blank }

---

## Linked List

**Description:** Nodes connected by pointers. O(1) insert/delete at known positions, O(n) access.

**When to Use:** Frequent insertion/deletion, implementing stacks/queues, when you don't need random access.

=== "Python"

    ```python
    class ListNode:
        def __init__(self, val: int = 0, next: 'ListNode | None' = None):
            self.val = val
            self.next = next

    def reverse_list(head: ListNode | None) -> ListNode | None:
        prev, curr = None, head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev
    ```

=== "TypeScript"

    ```typescript
    class ListNode {
        val: number; next: ListNode | null;
        constructor(val = 0, next: ListNode | null = null) {
            this.val = val; this.next = next;
        }
    }
    function reverseList(head: ListNode | null): ListNode | null {
        let prev: ListNode | null = null, curr = head;
        while (curr) {
            const nxt = curr.next; curr.next = prev; prev = curr; curr = nxt;
        }
        return prev;
    }
    ```

=== "Rust"

    ```rust
    #[derive(Debug)]
    pub struct ListNode { pub val: i32, pub next: Option<Box<ListNode>> }
    impl ListNode { pub fn new(val: i32) -> Self { ListNode { val, next: None } } }

    pub fn reverse_list(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut prev = None;
        while let Some(mut node) = head {
            head = node.next.take();
            node.next = prev;
            prev = Some(node);
        }
        prev
    }
    ```

=== "Java"

    ```java
    class ListNode { int val; ListNode next;
        ListNode(int val) { this.val = val; } }

    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nxt = curr.next; curr.next = prev; prev = curr; curr = nxt;
        }
        return prev;
    }
    ```

=== "C#"

    ```csharp
    public class ListNode { public int val; public ListNode next;
        public ListNode(int val = 0) { this.val = val; } }

    public ListNode ReverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            var nxt = curr.next; curr.next = prev; prev = curr; curr = nxt;
        }
        return prev;
    }
    ```

=== "ASM"

    ```asm
    ; Linked List node: [value (4 bytes)][next pointer (8 bytes)]
    ; Traverse: load next pointer, follow chain until null
    ; Reverse: swap next pointers while walking the list
    ```

=== "Scala"

    ```scala
    class ListNode(var value: Int = 0, var next: ListNode = null)

    def reverseList(head: ListNode): ListNode = {
      var prev: ListNode = null; var curr = head
      while (curr != null) {
        val nxt = curr.next; curr.next = prev; prev = curr; curr = nxt
      }
      prev
    }
    ```

**Related LeetCode Problems:**

- [Reverse Linked List (LC 206)](https://leetcode.com/problems/reverse-linked-list/){ target=_blank }
- [Merge Two Sorted Lists (LC 21)](https://leetcode.com/problems/merge-two-sorted-lists/){ target=_blank }
- [Linked List Cycle (LC 141)](https://leetcode.com/problems/linked-list-cycle/){ target=_blank }
- [Remove Nth Node From End (LC 19)](https://leetcode.com/problems/remove-nth-node-from-end-of-list/){ target=_blank }
- [Reorder List (LC 143)](https://leetcode.com/problems/reorder-list/){ target=_blank }
- [LRU Cache (LC 146)](https://leetcode.com/problems/lru-cache/){ target=_blank }

---

## Hash Map

**Description:** Key-value store with O(1) average lookup via hashing.

**When to Use:** Frequency counting, two-sum style lookups, caching, grouping by key.

=== "Python"

    ```python
    # Frequency count
    from collections import Counter
    counts: dict[str, int] = {}
    for ch in "hello":
        counts[ch] = counts.get(ch, 0) + 1
    # Or: counts = Counter("hello")

    # Two-sum pattern
    seen: dict[int, int] = {}
    for i, v in enumerate(nums):
        comp = target - v
        if comp in seen:
            return [seen[comp], i]
        seen[v] = i
    ```

=== "TypeScript"

    ```typescript
    const counts = new Map<string, number>();
    for (const ch of "hello")
        counts.set(ch, (counts.get(ch) ?? 0) + 1);

    const seen = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (seen.has(comp)) return [seen.get(comp)!, i];
        seen.set(nums[i], i);
    }
    ```

=== "Rust"

    ```rust
    use std::collections::HashMap;
    let mut counts = HashMap::new();
    for ch in "hello".chars() {
        *counts.entry(ch).or_insert(0) += 1;
    }
    ```

=== "Java"

    ```java
    Map<Character, Integer> counts = new HashMap<>();
    for (char ch : "hello".toCharArray())
        counts.merge(ch, 1, Integer::sum);
    ```

=== "C#"

    ```csharp
    var counts = new Dictionary<char, int>();
    foreach (char ch in "hello")
        counts[ch] = counts.GetValueOrDefault(ch) + 1;
    ```

=== "ASM"

    ```asm
    ; Hash Map — typically implemented via open addressing or chaining
    ; Hash key → bucket index, store key-value pairs
    ; Not practical to implement from scratch in ASM for interviews
    ```

=== "Scala"

    ```scala
    val counts = mutable.HashMap.empty[Char, Int]
    for (ch <- "hello") counts(ch) = counts.getOrElse(ch, 0) + 1
    ```

**Related LeetCode Problems:**

- [Two Sum (LC 1)](https://leetcode.com/problems/two-sum/){ target=_blank }
- [Group Anagrams (LC 49)](https://leetcode.com/problems/group-anagrams/){ target=_blank }
- [Top K Frequent Elements (LC 347)](https://leetcode.com/problems/top-k-frequent-elements/){ target=_blank }
- [Valid Anagram (LC 242)](https://leetcode.com/problems/valid-anagram/){ target=_blank }
- [Longest Consecutive Sequence (LC 128)](https://leetcode.com/problems/longest-consecutive-sequence/){ target=_blank }

---

## Hash Set

**Description:** Collection of unique elements with O(1) average membership check.

**When to Use:** Deduplication, membership testing, cycle detection, visited tracking.

=== "Python"

    ```python
    seen: set[int] = set()
    for x in nums:
        if x in seen:
            return True  # duplicate found
        seen.add(x)
    ```

=== "TypeScript"

    ```typescript
    const seen = new Set<number>();
    for (const x of nums) {
        if (seen.has(x)) return true;
        seen.add(x);
    }
    ```

=== "Rust"

    ```rust
    use std::collections::HashSet;
    let mut seen = HashSet::new();
    for &x in nums { if !seen.insert(x) { return true; } }
    ```

=== "Java"

    ```java
    Set<Integer> seen = new HashSet<>();
    for (int x : nums) if (!seen.add(x)) return true;
    ```

=== "C#"

    ```csharp
    var seen = new HashSet<int>();
    foreach (int x in nums) if (!seen.Add(x)) return true;
    ```

=== "ASM"

    ```asm
    ; Hash Set — same as hash map but only stores keys (no values)
    ```

=== "Scala"

    ```scala
    val seen = mutable.Set.empty[Int]
    for (x <- nums) if (!seen.add(x)) return true
    ```

**Related LeetCode Problems:**

- [Contains Duplicate (LC 217)](https://leetcode.com/problems/contains-duplicate/){ target=_blank }
- [Longest Consecutive Sequence (LC 128)](https://leetcode.com/problems/longest-consecutive-sequence/){ target=_blank }
- [Happy Number (LC 202)](https://leetcode.com/problems/happy-number/){ target=_blank }

---

## Stack

**Description:** LIFO (Last-In-First-Out) container. Push/pop from the top in O(1).

**When to Use:** Bracket matching, DFS, undo operations, expression evaluation, monotonic stack patterns.

=== "Python"

    ```python
    stack: list[int] = []
    stack.append(1)    # push
    stack.append(2)
    top = stack[-1]    # peek → 2
    val = stack.pop()  # pop → 2
    empty = len(stack) == 0
    ```

=== "TypeScript"

    ```typescript
    const stack: number[] = [];
    stack.push(1); stack.push(2);
    const top = stack[stack.length - 1]; // peek
    const val = stack.pop();             // pop
    ```

=== "Rust"

    ```rust
    let mut stack: Vec<i32> = Vec::new();
    stack.push(1); stack.push(2);
    let top = stack.last(); // peek
    let val = stack.pop();  // pop
    ```

=== "Java"

    ```java
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(1); stack.push(2);
    int top = stack.peek(); // peek
    int val = stack.pop();  // pop
    ```

=== "C#"

    ```csharp
    var stack = new Stack<int>();
    stack.Push(1); stack.Push(2);
    int top = stack.Peek();
    int val = stack.Pop();
    ```

=== "ASM"

    ```asm
    ; Stack — use the hardware stack (push/pop) or a software stack with an array + top pointer
    ; push: mov [rsp], val; sub rsp, 8
    ; pop:  add rsp, 8; mov val, [rsp]
    ```

=== "Scala"

    ```scala
    val stack = mutable.Stack.empty[Int]
    stack.push(1); stack.push(2)
    val top = stack.top  // peek
    val v = stack.pop()  // pop
    ```

**Related LeetCode Problems:**

- [Valid Parentheses (LC 20)](https://leetcode.com/problems/valid-parentheses/){ target=_blank }
- [Min Stack (LC 155)](https://leetcode.com/problems/min-stack/){ target=_blank }
- [Evaluate Reverse Polish Notation (LC 150)](https://leetcode.com/problems/evaluate-reverse-polish-notation/){ target=_blank }
- [Daily Temperatures (LC 739)](https://leetcode.com/problems/daily-temperatures/){ target=_blank }

---

## Queue

**Description:** FIFO (First-In-First-Out) container. Enqueue at back, dequeue from front in O(1).

**When to Use:** BFS, level-order traversal, scheduling, sliding window max.

=== "Python"

    ```python
    from collections import deque
    queue: deque[int] = deque()
    queue.append(1)     # enqueue
    queue.append(2)
    front = queue[0]    # peek
    val = queue.popleft() # dequeue → 1
    ```

=== "TypeScript"

    ```typescript
    // Note: shift() is O(n). For true O(1), use a linked list or circular buffer.
    const queue: number[] = [];
    queue.push(1); queue.push(2);
    const front = queue[0];
    const val = queue.shift(); // dequeue
    ```

=== "Rust"

    ```rust
    use std::collections::VecDeque;
    let mut queue = VecDeque::new();
    queue.push_back(1); queue.push_back(2);
    let front = queue.front(); // peek
    let val = queue.pop_front(); // dequeue
    ```

=== "Java"

    ```java
    Queue<Integer> queue = new LinkedList<>();
    queue.offer(1); queue.offer(2);
    int front = queue.peek();
    int val = queue.poll(); // dequeue
    ```

=== "C#"

    ```csharp
    var queue = new Queue<int>();
    queue.Enqueue(1); queue.Enqueue(2);
    int front = queue.Peek();
    int val = queue.Dequeue();
    ```

=== "ASM"

    ```asm
    ; Queue — circular buffer with head and tail pointers
    ; Enqueue: store at tail, advance tail (mod capacity)
    ; Dequeue: read from head, advance head (mod capacity)
    ```

=== "Scala"

    ```scala
    val queue = mutable.Queue.empty[Int]
    queue.enqueue(1); queue.enqueue(2)
    val front = queue.head  // peek
    val v = queue.dequeue() // dequeue
    ```

**Related LeetCode Problems:**

- [Binary Tree Level Order Traversal (LC 102)](https://leetcode.com/problems/binary-tree-level-order-traversal/){ target=_blank }
- [Number of Islands (LC 200)](https://leetcode.com/problems/number-of-islands/){ target=_blank }
- [Implement Queue using Stacks (LC 232)](https://leetcode.com/problems/implement-queue-using-stacks/){ target=_blank }

---

## Heap / Priority Queue

**Description:** Binary heap providing O(1) access to min (or max) element, O(log n) insert and remove.

**When to Use:** Top-K problems, median finding, scheduling, Dijkstra's algorithm.

=== "Python"

    ```python
    import heapq

    # Min-heap
    heap: list[int] = []
    heapq.heappush(heap, 3)
    heapq.heappush(heap, 1)
    heapq.heappush(heap, 2)
    smallest = heapq.heappop(heap)  # → 1

    # Max-heap: negate values
    max_heap: list[int] = []
    heapq.heappush(max_heap, -3)
    largest = -heapq.heappop(max_heap)  # → 3

    # Build heap from list
    arr = [5, 3, 1, 4, 2]
    heapq.heapify(arr)  # O(n)
    ```

=== "TypeScript"

    ```typescript
    // JavaScript has no built-in heap. Use a sorted array or implement:
    class MinHeap {
        private data: number[] = [];
        push(val: number): void {
            this.data.push(val);
            let i = this.data.length - 1;
            while (i > 0) {
                const parent = Math.floor((i - 1) / 2);
                if (this.data[parent] <= this.data[i]) break;
                [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
                i = parent;
            }
        }
        pop(): number {
            const top = this.data[0];
            const last = this.data.pop()!;
            if (this.data.length > 0) { this.data[0] = last; this.siftDown(0); }
            return top;
        }
        private siftDown(i: number): void {
            const n = this.data.length;
            while (2 * i + 1 < n) {
                let j = 2 * i + 1;
                if (j + 1 < n && this.data[j + 1] < this.data[j]) j++;
                if (this.data[i] <= this.data[j]) break;
                [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
                i = j;
            }
        }
        peek(): number { return this.data[0]; }
        get size(): number { return this.data.length; }
    }
    ```

=== "Rust"

    ```rust
    use std::collections::BinaryHeap;
    use std::cmp::Reverse;

    // Max-heap (default)
    let mut max_heap = BinaryHeap::new();
    max_heap.push(3); max_heap.push(1);
    let largest = max_heap.pop(); // Some(3)

    // Min-heap via Reverse
    let mut min_heap = BinaryHeap::new();
    min_heap.push(Reverse(3)); min_heap.push(Reverse(1));
    let smallest = min_heap.pop(); // Some(Reverse(1))
    ```

=== "Java"

    ```java
    // Min-heap (default)
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    minHeap.offer(3); minHeap.offer(1);
    int smallest = minHeap.poll(); // 1

    // Max-heap
    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
    maxHeap.offer(3); maxHeap.offer(1);
    int largest = maxHeap.poll(); // 3
    ```

=== "C#"

    ```csharp
    // .NET 6+ PriorityQueue (min-heap by default)
    var minHeap = new PriorityQueue<int, int>();
    minHeap.Enqueue(3, 3); minHeap.Enqueue(1, 1);
    int smallest = minHeap.Dequeue(); // 1
    ```

=== "ASM"

    ```asm
    ; Heap — array-based binary heap
    ; Parent of i: (i-1)/2, Children: 2i+1, 2i+2
    ; Push: add at end, sift up (swap with parent while smaller)
    ; Pop: swap root with last, remove last, sift down
    ```

=== "Scala"

    ```scala
    // Min-heap
    val minHeap = mutable.PriorityQueue.empty[Int](Ordering[Int].reverse)
    minHeap.enqueue(3); minHeap.enqueue(1)
    val smallest = minHeap.dequeue() // 1
    ```

**Related LeetCode Problems:**

- [Kth Largest Element in an Array (LC 215)](https://leetcode.com/problems/kth-largest-element-in-an-array/){ target=_blank }
- [Top K Frequent Elements (LC 347)](https://leetcode.com/problems/top-k-frequent-elements/){ target=_blank }
- [Find Median from Data Stream (LC 295)](https://leetcode.com/problems/find-median-from-data-stream/){ target=_blank }
- [Merge K Sorted Lists (LC 23)](https://leetcode.com/problems/merge-k-sorted-lists/){ target=_blank }
- [Task Scheduler (LC 621)](https://leetcode.com/problems/task-scheduler/){ target=_blank }

---

## Trie

**Description:** Tree-like structure for storing strings, where each node represents a character. Enables O(m) prefix search where m is the word length.

**When to Use:** Autocomplete, prefix matching, word search, dictionary operations.

=== "Python"

    ```python
    class TrieNode:
        def __init__(self):
            self.children: dict[str, 'TrieNode'] = {}
            self.is_end = False

    class Trie:
        def __init__(self):
            self.root = TrieNode()

        def insert(self, word: str) -> None:
            node = self.root
            for ch in word:
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
            node.is_end = True

        def search(self, word: str) -> bool:
            node = self._find(word)
            return node is not None and node.is_end

        def starts_with(self, prefix: str) -> bool:
            return self._find(prefix) is not None

        def _find(self, prefix: str) -> TrieNode | None:
            node = self.root
            for ch in prefix:
                if ch not in node.children:
                    return None
                node = node.children[ch]
            return node
    ```

=== "TypeScript"

    ```typescript
    class TrieNode {
        children = new Map<string, TrieNode>();
        isEnd = false;
    }
    class Trie {
        root = new TrieNode();
        insert(word: string): void {
            let node = this.root;
            for (const ch of word) {
                if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
                node = node.children.get(ch)!;
            }
            node.isEnd = true;
        }
        search(word: string): boolean {
            const node = this.find(word);
            return node !== null && node.isEnd;
        }
        startsWith(prefix: string): boolean { return this.find(prefix) !== null; }
        private find(prefix: string): TrieNode | null {
            let node: TrieNode | undefined = this.root;
            for (const ch of prefix) {
                node = node.children.get(ch);
                if (!node) return null;
            }
            return node;
        }
    }
    ```

=== "Rust"

    ```rust
    use std::collections::HashMap;
    #[derive(Default)]
    struct TrieNode { children: HashMap<char, TrieNode>, is_end: bool }
    struct Trie { root: TrieNode }
    impl Trie {
        fn new() -> Self { Self { root: TrieNode::default() } }
        fn insert(&mut self, word: &str) {
            let mut node = &mut self.root;
            for ch in word.chars() { node = node.children.entry(ch).or_default(); }
            node.is_end = true;
        }
        fn search(&self, word: &str) -> bool {
            self.find(word).map_or(false, |n| n.is_end)
        }
        fn starts_with(&self, prefix: &str) -> bool { self.find(prefix).is_some() }
        fn find(&self, prefix: &str) -> Option<&TrieNode> {
            let mut node = &self.root;
            for ch in prefix.chars() { node = node.children.get(&ch)?; }
            Some(node)
        }
    }
    ```

=== "Java"

    ```java
    class Trie {
        private TrieNode root = new TrieNode();
        static class TrieNode { TrieNode[] children = new TrieNode[26]; boolean isEnd; }
        public void insert(String word) {
            TrieNode node = root;
            for (char ch : word.toCharArray()) {
                int i = ch - 'a';
                if (node.children[i] == null) node.children[i] = new TrieNode();
                node = node.children[i];
            }
            node.isEnd = true;
        }
        public boolean search(String word) {
            TrieNode n = find(word); return n != null && n.isEnd;
        }
        public boolean startsWith(String prefix) { return find(prefix) != null; }
        private TrieNode find(String prefix) {
            TrieNode node = root;
            for (char ch : prefix.toCharArray()) {
                node = node.children[ch - 'a'];
                if (node == null) return null;
            }
            return node;
        }
    }
    ```

=== "C#"

    ```csharp
    public class Trie {
        class TrieNode { public TrieNode[] Children = new TrieNode[26]; public bool IsEnd; }
        TrieNode root = new();
        public void Insert(string word) {
            var node = root;
            foreach (char ch in word) {
                int i = ch - 'a';
                node.Children[i] ??= new TrieNode();
                node = node.Children[i];
            }
            node.IsEnd = true;
        }
        public bool Search(string word) { var n = Find(word); return n is { IsEnd: true }; }
        public bool StartsWith(string prefix) => Find(prefix) != null;
        TrieNode? Find(string prefix) {
            var node = root;
            foreach (char ch in prefix) {
                node = node.Children[ch - 'a'];
                if (node == null) return null;
            }
            return node;
        }
    }
    ```

=== "ASM"

    ```asm
    ; Trie — each node has 26 child pointers (for lowercase a-z) + is_end flag
    ; Insert: walk tree creating nodes as needed; Search: walk tree checking existence
    ```

=== "Scala"

    ```scala
    class TrieNode {
      val children = new Array[TrieNode](26)
      var isEnd = false
    }
    class Trie {
      val root = new TrieNode()
      def insert(word: String): Unit = {
        var node = root
        for (ch <- word) {
          val i = ch - 'a'
          if (node.children(i) == null) node.children(i) = new TrieNode()
          node = node.children(i)
        }
        node.isEnd = true
      }
      def search(word: String): Boolean = find(word).exists(_.isEnd)
      def startsWith(prefix: String): Boolean = find(prefix).isDefined
      private def find(prefix: String): Option[TrieNode] = {
        var node = root
        for (ch <- prefix) { node = node.children(ch - 'a'); if (node == null) return None }
        Some(node)
      }
    }
    ```

**Related LeetCode Problems:**

- [Implement Trie (LC 208)](https://leetcode.com/problems/implement-trie-prefix-tree/){ target=_blank }
- [Design Add and Search Words (LC 211)](https://leetcode.com/problems/design-add-and-search-words-data-structure/){ target=_blank }
- [Word Search II (LC 212)](https://leetcode.com/problems/word-search-ii/){ target=_blank }

---

## Graph (Adjacency List)

**Description:** Collection of vertices connected by edges. Adjacency list stores neighbors for each vertex.

**When to Use:** Modeling relationships, paths, cycles, connectivity, network problems.

=== "Python"

    ```python
    # Build adjacency list
    from collections import defaultdict
    graph: dict[int, list[int]] = defaultdict(list)

    edges = [(0, 1), (0, 2), (1, 3), (2, 3)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)  # undirected

    # Adjacency matrix alternative
    n = 4
    matrix = [[0] * n for _ in range(n)]
    for u, v in edges:
        matrix[u][v] = matrix[v][u] = 1
    ```

=== "TypeScript"

    ```typescript
    const graph = new Map<number, number[]>();
    const edges = [[0,1],[0,2],[1,3],[2,3]];
    for (const [u, v] of edges) {
        if (!graph.has(u)) graph.set(u, []);
        if (!graph.has(v)) graph.set(v, []);
        graph.get(u)!.push(v);
        graph.get(v)!.push(u);
    }
    ```

=== "Rust"

    ```rust
    use std::collections::HashMap;
    let mut graph: HashMap<i32, Vec<i32>> = HashMap::new();
    let edges = [(0,1),(0,2),(1,3),(2,3)];
    for &(u, v) in &edges {
        graph.entry(u).or_default().push(v);
        graph.entry(v).or_default().push(u);
    }
    ```

=== "Java"

    ```java
    Map<Integer, List<Integer>> graph = new HashMap<>();
    int[][] edges = {{0,1},{0,2},{1,3},{2,3}};
    for (int[] e : edges) {
        graph.computeIfAbsent(e[0], k -> new ArrayList<>()).add(e[1]);
        graph.computeIfAbsent(e[1], k -> new ArrayList<>()).add(e[0]);
    }
    ```

=== "C#"

    ```csharp
    var graph = new Dictionary<int, List<int>>();
    int[][] edges = { new[]{0,1}, new[]{0,2}, new[]{1,3}, new[]{2,3} };
    foreach (var e in edges) {
        if (!graph.ContainsKey(e[0])) graph[e[0]] = new List<int>();
        if (!graph.ContainsKey(e[1])) graph[e[1]] = new List<int>();
        graph[e[0]].Add(e[1]); graph[e[1]].Add(e[0]);
    }
    ```

=== "ASM"

    ```asm
    ; Graph — adjacency list: array of linked lists or arrays per vertex
    ; Or adjacency matrix: 2D array, matrix[u][v] = 1 if edge exists
    ```

=== "Scala"

    ```scala
    val graph = mutable.Map.empty[Int, mutable.ListBuffer[Int]]
    val edges = List((0,1),(0,2),(1,3),(2,3))
    for ((u, v) <- edges) {
      graph.getOrElseUpdate(u, mutable.ListBuffer.empty) += v
      graph.getOrElseUpdate(v, mutable.ListBuffer.empty) += u
    }
    ```

**Related LeetCode Problems:**

- [Number of Islands (LC 200)](https://leetcode.com/problems/number-of-islands/){ target=_blank }
- [Clone Graph (LC 133)](https://leetcode.com/problems/clone-graph/){ target=_blank }
- [Course Schedule (LC 207)](https://leetcode.com/problems/course-schedule/){ target=_blank }
- [Pacific Atlantic Water Flow (LC 417)](https://leetcode.com/problems/pacific-atlantic-water-flow/){ target=_blank }

---

## Disjoint Set (Union-Find)

**Description:** Track connected components with near-constant-time union and find. Uses path compression and union by rank.

**Complexity:** Time O(α(n)) per operation ≈ O(1), Space O(n)

See the full implementation in the [Algorithm Glossary → Union-Find](algorithms.md#union-find-disjoint-set).

**Related LeetCode Problems:**

- [Number of Connected Components (LC 323)](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/){ target=_blank }
- [Redundant Connection (LC 684)](https://leetcode.com/problems/redundant-connection/){ target=_blank }
- [Graph Valid Tree (LC 261)](https://leetcode.com/problems/graph-valid-tree/){ target=_blank }
- [Accounts Merge (LC 721)](https://leetcode.com/problems/accounts-merge/){ target=_blank }
