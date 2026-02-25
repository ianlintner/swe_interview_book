# Bit Manipulation

## When to Use

- Problem involves **binary representations**, **XOR**, **powers of 2**
- Need to perform operations **without arithmetic** (add without +)
- Keywords: "single number", "missing number", "power of 2", "count bits", "XOR"

---

## Key Bit Operations

| Operation | Expression | Example |
|-----------|-----------|---------|
| Check if bit k is set | `(n >> k) & 1` | `5 (101)`, k=2 → 1 |
| Set bit k | `n \| (1 << k)` | `5 \| (1<<1)` → 7 (111) |
| Clear bit k | `n & ~(1 << k)` | `7 & ~(1<<1)` → 5 (101) |
| Toggle bit k | `n ^ (1 << k)` | `5 ^ (1<<0)` → 4 (100) |
| Check power of 2 | `n > 0 && (n & (n-1)) == 0` | 8 (1000) → true |
| Lowest set bit | `n & (-n)` | 12 (1100) → 4 (100) |
| Clear lowest set bit | `n & (n-1)` | 12 (1100) → 8 (1000) |
| XOR self-cancel | `a ^ a = 0` | Used in Single Number |

---

## Template: Common Patterns

=== "Python"

    ```python
    # Single Number — XOR all elements
    def single_number(nums: list[int]) -> int:
        result = 0
        for x in nums:
            result ^= x
        return result

    # Count set bits (Hamming Weight)
    def count_bits(n: int) -> int:
        count = 0
        while n:
            n &= n - 1  # clear lowest set bit
            count += 1
        return count

    # Missing number in [0, n]
    def missing_number(nums: list[int]) -> int:
        xor = len(nums)
        for i, v in enumerate(nums):
            xor ^= i ^ v
        return xor
    ```

=== "TypeScript"

    ```typescript
    function singleNumber(nums: number[]): number {
        return nums.reduce((a, b) => a ^ b, 0);
    }
    function countBits(n: number): number {
        let count = 0;
        while (n) { n &= n - 1; count++; }
        return count;
    }
    function missingNumber(nums: number[]): number {
        let xor = nums.length;
        for (let i = 0; i < nums.length; i++) xor ^= i ^ nums[i];
        return xor;
    }
    ```

=== "Rust"

    ```rust
    pub fn single_number(nums: &[i32]) -> i32 { nums.iter().fold(0, |a, &b| a ^ b) }
    pub fn count_bits(mut n: u32) -> u32 {
        let mut c = 0; while n > 0 { n &= n - 1; c += 1; } c
    }
    pub fn missing_number(nums: &[i32]) -> i32 {
        let mut xor = nums.len() as i32;
        for (i, &v) in nums.iter().enumerate() { xor ^= i as i32 ^ v; }
        xor
    }
    ```

=== "Java"

    ```java
    public int singleNumber(int[] nums) {
        int r = 0; for (int x : nums) r ^= x; return r;
    }
    public int countBits(int n) {
        int c = 0; while (n > 0) { n &= n - 1; c++; } return c;
    }
    public int missingNumber(int[] nums) {
        int xor = nums.length;
        for (int i = 0; i < nums.length; i++) xor ^= i ^ nums[i];
        return xor;
    }
    ```

=== "C#"

    ```csharp
    public int SingleNumber(int[] nums) {
        int r = 0; foreach (int x in nums) r ^= x; return r;
    }
    public int CountBits(int n) {
        int c = 0; while (n > 0) { n &= n - 1; c++; } return c;
    }
    public int MissingNumber(int[] nums) {
        int xor = nums.Length;
        for (int i = 0; i < nums.Length; i++) xor ^= i ^ nums[i];
        return xor;
    }
    ```

=== "ASM"

    ```asm
    ; Bit manipulation — x86-64 has native instructions:
    ; popcnt eax, edi     ; count set bits
    ; bsf eax, edi        ; bit scan forward (lowest set bit)
    ; xor eax, edi        ; XOR
    ; and eax, edi        ; AND
    ; not eax             ; bitwise NOT
    ```

=== "Scala"

    ```scala
    def singleNumber(nums: Array[Int]): Int = nums.reduce(_ ^ _)
    def countBits(n: Int): Int = {
      var x = n; var c = 0; while (x > 0) { x &= x - 1; c += 1 }; c
    }
    def missingNumber(nums: Array[Int]): Int = {
      var xor = nums.length
      for (i <- nums.indices) xor ^= i ^ nums(i)
      xor
    }
    ```

---

## Practice Problems

| Problem | Difficulty | Link |
|---------|-----------|------|
| Single Number | Easy | [LeetCode 136](https://leetcode.com/problems/single-number/){ target=_blank } |
| Number of 1 Bits | Easy | [LeetCode 191](https://leetcode.com/problems/number-of-1-bits/){ target=_blank } |
| Counting Bits | Easy | [LeetCode 338](https://leetcode.com/problems/counting-bits/){ target=_blank } |
| Reverse Bits | Easy | [LeetCode 190](https://leetcode.com/problems/reverse-bits/){ target=_blank } |
| Missing Number | Easy | [LeetCode 268](https://leetcode.com/problems/missing-number/){ target=_blank } |
| Sum of Two Integers | Medium | [LeetCode 371](https://leetcode.com/problems/sum-of-two-integers/){ target=_blank } |
| Reverse Integer | Medium | [LeetCode 7](https://leetcode.com/problems/reverse-integer/){ target=_blank } |

---

[:octicons-arrow-left-24: Previous: Intervals](intervals.md) · [:octicons-arrow-right-24: Back to Pattern Reference](index.md)
