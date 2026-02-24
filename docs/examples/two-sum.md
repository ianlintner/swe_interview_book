# Two Sum

> [LeetCode 1 — Two Sum](https://leetcode.com/problems/two-sum/){ target=_blank } · Difficulty: **Easy**
> · [NeetCode Video](https://neetcode.io/problems/two-integer-sum){ target=_blank }

## Problem

Given an array of integers `nums` and an integer `target`, return **indices of the two numbers** such that they add up to `target`. Each input has **exactly one solution**, and you may not use the same element twice.

**Example:**
```
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]   (because nums[0] + nums[1] == 9)
```

---

## Framework Walk-Through

### Step 1 — Understand

| Aspect | Detail |
|--------|--------|
| Input | `int[]` of length 2..10⁴, values -10⁹..10⁹ |
| Output | two indices `[i, j]` |
| Constraint | exactly one solution; can't reuse same index |
| Edge cases | negative numbers, two-element array |

### Step 2 — Entities & State

| Entity | Type | Purpose |
|--------|------|---------|
| `nums` | array | input (read-only) |
| `target` | int | goal sum |
| `seen` | hash map int→int | value → index of seen values |
| `complement` | int | `target - current` |

### Step 3 — Data Structure

**Hash Map** — O(1) average lookup to check if complement was already seen.

### Step 4 — Algorithms

| Approach | Time | Space |
|----------|------|-------|
| Brute-force (nested loops) | O(n²) | O(1) |
| **Hash map single pass** | **O(n)** | **O(n)** |
| Sort + two pointers | O(n log n) | O(n) |

Best choice: **Hash map single pass** — O(n) time, O(n) space, preserves indices.

### Step 5 — Pseudocode

```
1. Create empty map: seen = {}
2. For i, v in enumerate(nums):
     complement = target - v
     if complement in seen:
         return [seen[complement], i]
     seen[v] = i
```

### Step 6 — Implement

=== "Python"

    ```python
    def two_sum(nums: list[int], target: int) -> list[int]:
        seen: dict[int, int] = {}
        for i, v in enumerate(nums):
            complement = target - v
            if complement in seen:
                return [seen[complement], i]
            seen[v] = i
        return []
    ```

=== "TypeScript"

    ```typescript
    function twoSum(nums: number[], target: number): number[] {
        const seen = new Map<number, number>();
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (seen.has(complement)) {
                return [seen.get(complement)!, i];
            }
            seen.set(nums[i], i);
        }
        return [];
    }
    ```

=== "Rust"

    ```rust
    use std::collections::HashMap;

    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut seen: HashMap<i32, i32> = HashMap::new();
        for (i, &v) in nums.iter().enumerate() {
            let complement = target - v;
            if let Some(&j) = seen.get(&complement) {
                return vec![j, i as i32];
            }
            seen.insert(v, i as i32);
        }
        vec![]
    }
    ```

=== "Java"

    ```java
    import java.util.HashMap;
    import java.util.Map;

    class Solution {
        public int[] twoSum(int[] nums, int target) {
            Map<Integer, Integer> seen = new HashMap<>();
            for (int i = 0; i < nums.length; i++) {
                int complement = target - nums[i];
                if (seen.containsKey(complement)) {
                    return new int[] { seen.get(complement), i };
                }
                seen.put(nums[i], i);
            }
            return new int[] {};
        }
    }
    ```

=== "C#"

    ```csharp
    using System.Collections.Generic;

    public class Solution {
        public int[] TwoSum(int[] nums, int target) {
            var seen = new Dictionary<int, int>();
            for (int i = 0; i < nums.Length; i++) {
                int complement = target - nums[i];
                if (seen.TryGetValue(complement, out int j)) {
                    return new int[] { j, i };
                }
                seen[nums[i]] = i;
            }
            return System.Array.Empty<int>();
        }
    }
    ```

=== "ASM"

    ```asm
    ; x86-64 Linux — two_sum concept (simplified)
    ; In practice, use a higher-level language for hash-map problems.
    ; This demonstrates the brute-force O(n²) approach.
    section .text
    global two_sum
    ; rdi = *nums, rsi = length, rdx = target
    ; Returns: rax = packed (i << 32 | j)
    two_sum:
        xor     rcx, rcx            ; i = 0
    .outer:
        cmp     rcx, rsi
        jge     .not_found
        mov     r8d, [rdi + rcx*4]  ; nums[i]
        lea     r9, [rcx + 1]       ; j = i + 1
    .inner:
        cmp     r9, rsi
        jge     .next_i
        mov     r10d, [rdi + r9*4]  ; nums[j]
        add     r10d, r8d
        cmp     r10d, edx
        je      .found
        inc     r9
        jmp     .inner
    .next_i:
        inc     rcx
        jmp     .outer
    .found:
        shl     rcx, 32
        or      rcx, r9
        mov     rax, rcx
        ret
    .not_found:
        mov     rax, -1
        ret
    ```

=== "Scala"

    ```scala
    import scala.collection.mutable

    object Solution {
      def twoSum(nums: Array[Int], target: Int): Array[Int] = {
        val seen = mutable.HashMap.empty[Int, Int]
        for (i <- nums.indices) {
          val complement = target - nums(i)
          seen.get(complement) match {
            case Some(j) => return Array(j, i)
            case None    => seen(nums(i)) = i
          }
        }
        Array.empty
      }
    }
    ```

### Step 7 — Test & Verify

| Input | Target | Expected | Result |
|-------|--------|----------|--------|
| `[2,7,11,15]` | `9` | `[0,1]` | ✅ |
| `[3,2,4]` | `6` | `[1,2]` | ✅ |
| `[3,3]` | `6` | `[0,1]` | ✅ |

**Complexity:** Time O(n), Space O(n)

---

[:octicons-arrow-right-24: Next Example: Valid Parentheses](valid-parentheses.md)
