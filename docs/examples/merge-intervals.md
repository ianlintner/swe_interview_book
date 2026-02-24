# Merge Intervals

> [LeetCode 56 — Merge Intervals](https://leetcode.com/problems/merge-intervals/){ target=_blank } · Difficulty: **Medium**
> · [NeetCode Video](https://neetcode.io/problems/merge-intervals){ target=_blank }

## Problem

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return a list of non-overlapping intervals that cover all the ranges.

**Example:**
```
Input:  [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
```

---

## Framework Walk-Through

### Step 1 — Understand

| Aspect | Detail |
|--------|--------|
| Input | list of `[start, end]` pairs; 1..10⁴ intervals |
| Output | merged non-overlapping intervals |
| Key insight | Sort by start, then sweep and merge overlapping |
| Edge cases | single interval, all overlapping, no overlapping |

### Step 2 — Entities & State

- **Intervals** — list of `[start, end]`
- **Current merged interval** — expands as overlapping intervals are found
- **Result list** — collects final merged intervals

### Step 3 — Data Structure

**Sorted Array** — sort once, then linear sweep.

### Step 4 — Algorithm

| Approach | Time | Space |
|----------|------|-------|
| Brute force (compare all pairs) | O(n²) | O(n) |
| **Sort + linear sweep** | **O(n log n)** | **O(n)** |

### Step 5 — Pseudocode

```
1. Sort intervals by start value
2. result = [intervals[0]]
3. For each interval in intervals[1:]:
     if interval.start <= result[-1].end:
         result[-1].end = max(result[-1].end, interval.end)
     else:
         result.append(interval)
4. Return result
```

### Step 6 — Implement

=== "Python"

    ```python
    def merge(intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda x: x[0])
        merged: list[list[int]] = [intervals[0]]
        for start, end in intervals[1:]:
            if start <= merged[-1][1]:
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])
        return merged
    ```

=== "TypeScript"

    ```typescript
    function merge(intervals: number[][]): number[][] {
        intervals.sort((a, b) => a[0] - b[0]);
        const merged: number[][] = [intervals[0]];
        for (let i = 1; i < intervals.length; i++) {
            const last = merged[merged.length - 1];
            if (intervals[i][0] <= last[1]) {
                last[1] = Math.max(last[1], intervals[i][1]);
            } else {
                merged.push(intervals[i]);
            }
        }
        return merged;
    }
    ```

=== "Rust"

    ```rust
    pub fn merge(mut intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        intervals.sort_by_key(|iv| iv[0]);
        let mut merged: Vec<Vec<i32>> = vec![intervals[0].clone()];
        for iv in intervals.iter().skip(1) {
            let last = merged.last_mut().unwrap();
            if iv[0] <= last[1] {
                last[1] = last[1].max(iv[1]);
            } else {
                merged.push(iv.clone());
            }
        }
        merged
    }
    ```

=== "Java"

    ```java
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.List;

    class Solution {
        public int[][] merge(int[][] intervals) {
            Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
            List<int[]> merged = new ArrayList<>();
            merged.add(intervals[0]);
            for (int i = 1; i < intervals.length; i++) {
                int[] last = merged.get(merged.size() - 1);
                if (intervals[i][0] <= last[1]) {
                    last[1] = Math.max(last[1], intervals[i][1]);
                } else {
                    merged.add(intervals[i]);
                }
            }
            return merged.toArray(new int[0][]);
        }
    }
    ```

=== "C#"

    ```csharp
    using System;
    using System.Collections.Generic;

    public class Solution {
        public int[][] Merge(int[][] intervals) {
            Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
            var merged = new List<int[]> { intervals[0] };
            for (int i = 1; i < intervals.Length; i++) {
                var last = merged[^1];
                if (intervals[i][0] <= last[1]) {
                    last[1] = Math.Max(last[1], intervals[i][1]);
                } else {
                    merged.Add(intervals[i]);
                }
            }
            return merged.ToArray();
        }
    }
    ```

=== "ASM"

    ```asm
    ; x86-64 — merge intervals is impractical in pure ASM for interviews.
    ; The key insight is: SORT by start, then linear sweep.
    ; Pseudocode in ASM terms:
    ;   1. Call qsort on interval array (comparator on first element)
    ;   2. Walk sorted array, merge overlapping by comparing start/end
    ; See higher-level implementations for the full algorithm.
    ```

=== "Scala"

    ```scala
    object Solution {
      def merge(intervals: Array[Array[Int]]): Array[Array[Int]] = {
        val sorted = intervals.sortBy(_(0))
        val merged = scala.collection.mutable.ArrayBuffer(sorted(0))
        for (iv <- sorted.tail) {
          val last = merged.last
          if (iv(0) <= last(1)) {
            last(1) = last(1).max(iv(1))
          } else {
            merged += iv
          }
        }
        merged.toArray
      }
    }
    ```

### Step 7 — Test

| Input | Expected | Result |
|-------|----------|--------|
| `[[1,3],[2,6],[8,10],[15,18]]` | `[[1,6],[8,10],[15,18]]` | ✅ |
| `[[1,4],[4,5]]` | `[[1,5]]` | ✅ |
| `[[1,4],[0,4]]` | `[[0,4]]` | ✅ |
| `[[1,4]]` | `[[1,4]]` | ✅ |

**Complexity:** Time O(n log n), Space O(n)

---

[:octicons-arrow-left-24: Previous: Valid Parentheses](valid-parentheses.md) · [:octicons-arrow-right-24: Next: Binary Tree Level Order](binary-tree-level-order.md)
