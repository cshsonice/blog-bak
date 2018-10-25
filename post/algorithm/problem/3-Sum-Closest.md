---
title: 3Sum Closest
date: 2018-10-09 22:40:00
tags: [算法, ACM]
categories: algorithm
description: leetcode ACM algorithm 
---
# 3Sum Closest

> from [leetcode problem 16][1]

## 题目

> Given an array ***nums*** of n integers and an integer ***target***, find three integers in ***nums*** such that the sum is closest to ***target***. Return the sum of the three integers. You may assume that each input would have exactly one solution.
>
> **Example:**
> ```text
> Given array nums = [-1, 2, 1, -4], and target = 1.  
> The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
> ```
> &nbsp;  

## 解析

### 思路分析

这道题和 [3 Sum][2] 十分相似，相当于它的加强版。可以二者相互对照着分析。  
[3 Sum][2] 这道题要求在序列中找到三个数使其和 ***sum*** 等于0，而这里则要求在序列中找到三个数使其和 ***sum*** 尽可能接近指定值 ***target*** 。

#### 暴力法

暴力的遍历以及输出是较为直观的方法，在对性能要求不高的时候（比如自己写个功能性函数的时候）是最为开心的写法了。毕竟程序员还是要对自己好一点。太费脑子伤头发。  

对于已知序列 ***nums*** ,首先建立三重循环 i, j, k ，然后保存一个结果变量r，初始值设为 ***nums*** 前三个元素与 ***target*** 的差。循环的最内层比较 ```nums[i] + nums[j] +nums[k]``` 与 ***target*** 的差，记为r2。然后比较 r 与 r2 ，记录更优解。
大致就这么回事。循环结束后返回最优解即可。

补充：在 [3 Sum][2] 中要求返回所有最优解以及去重，这里可以通过在最后对结果遍历去重或者直接选择 [**集合**][3] 的方法 (查看[c++关于集合的用法][4])。

这样一来时间复杂度是 O(n^3)。

#### 优化解

直接暴力显然太粗鲁，程序员守则第一要义就是优雅（不存在的）。那么自然要想想怎么优化。

声明一下，这个解法不是我想出来的，是我看到 [3 Sum][2] 的解法后类比出来的。不过这两道题目的确很像。

首先对原序列进行排序，然后遍历排序后的序列（i）。

初始一个结果变量r，等于 ```abs(target - (nums[0] + nums[1] +nums[2]))``` 。(abs是c++的标准库函数，返回输入参数的绝对值)

对 i 之后的序列初始化两个元素lo，hi。值分别是 i+1, nums.size()-1。 临时的 r2 等于 ```abs(target - (nums[i] + nums[lo] + nums[hi]))``` 。
比较r与r2的大小。更新r。

比较 target-nums[i] 与 nums[lo] + nums[hi] 。由于早已排序，此时可直接通过调整 lo 与 hi 的位置来使之不断趋近结果。

这样一来最后同样达到遍历的效果但是时间复杂度已经只有 O(n^2)了。

（排序部分不是重点这里不提，一般最优都是 O(nlgn) ）

### 实现代码 (c++)

```c++
int threeSumClosest(vector<int>& nums, int target) {
    sort(nums.begin(), nums.end());
    int nums_size = nums.size();

    int r = nums[0] + nums[1] + nums[2];

    for(int i=0;i<nums_size;++i){
        int lo=i+1;
        int hi=nums_size-1;
        int sum = target-nums[i];
        while(lo<hi){
            if(nums[lo]+nums[hi] == sum) return target;

            int d = abs(sum-nums[lo]-nums[hi]);
            if (d<abs(target-r))
                r = nums[i] + nums[lo] + nums[hi];

            if(nums[lo]+nums[hi] > sum) --hi;
            else if(nums[lo]+nums[hi] < sum) ++lo;
        }

    }
    return r;
}
```

[1]: https://leetcode.com/problems/3sum-closest/description/
[2]: https://leetcode.com/problems/3sum/description/
[3]: https://zh.wikipedia.org/wiki/%E9%9B%86%E5%90%88_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)
[4]: https://zh.cppreference.com/w/cpp/container/set