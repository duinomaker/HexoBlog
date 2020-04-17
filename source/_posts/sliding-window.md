---
title: “滑动窗口” 的优先队列解法
canonical_url: https://duinomaker.top/posts/sliding-window/
date: 2020-03-10 22:43:52
categories: [Algorithm Contest]
widgets:
tags: [Segment Tree, Monotonic Queue]
---

题目链接：{% link POJ2823 - Sliding Window http://poj.org/problem?id=2823 %}

按顺序输出一个序列中每个固定大小的区间里的最值。这题可以用线段树解决，但不如用单调队列效率高。

<!-- more -->

---

## 题目描述

给你一个长度为 $n\leq10^6$ 的 序列。有一个大小为 $k$ 的窗口正从序列的最左边滑向最右边，你只能看到窗口中的 $k$ 个数。每过单位时间，窗口就向右平移一个单位。这里举一个序列为 `[1 3 -1 -3 5 3 6 7]`，$k=3$ 的例子。

窗口位置|最小值|最大值
:-:|-:|-:
<span class="mono">**[$1$&nbsp;&nbsp;$3$&nbsp;&nbsp;$-1$]**&nbsp;$-3$&nbsp;&nbsp;$5$&nbsp;&nbsp;$3$&nbsp;&nbsp;$6$&nbsp;&nbsp;$7$&nbsp;</span>|$-1$|$3$
<span class="mono">&nbsp;$1$&nbsp;**[$3$&nbsp;&nbsp;$-1$&nbsp;&nbsp;$-3$]**&nbsp;$5$&nbsp;&nbsp;$3$&nbsp;&nbsp;$6$&nbsp;&nbsp;$7$&nbsp;</span>|$-3$|$3$
<span class="mono">&nbsp;$1$&nbsp;&nbsp;$3$&nbsp;**[$-1$&nbsp;&nbsp;$-3$&nbsp;&nbsp;$5$]**&nbsp;$3$&nbsp;&nbsp;$6$&nbsp;&nbsp;$7$&nbsp;</span>|$-3$|$5$
<span class="mono">&nbsp;$1$&nbsp;&nbsp;$3$&nbsp;&nbsp;$-1$&nbsp;**[$-3$&nbsp;&nbsp;$5$&nbsp;&nbsp;$3$]**&nbsp;$6$&nbsp;&nbsp;$7$&nbsp;</span>|$-3$|$5$
<span class="mono">&nbsp;$1$&nbsp;&nbsp;$3$&nbsp;&nbsp;$-1$&nbsp;&nbsp;$-3$&nbsp;**[$5$&nbsp;&nbsp;$3$&nbsp;&nbsp;$6$]**&nbsp;$7$&nbsp;</span>|$3$|$6$
<span class="mono">&nbsp;$1$&nbsp;&nbsp;$3$&nbsp;&nbsp;$-1$&nbsp;&nbsp;$-3$&nbsp;&nbsp;$5$&nbsp;**[$3$&nbsp;&nbsp;$6$&nbsp;&nbsp;$7$]**</span>|$3$|$7$

你需要找出每一个位置时，窗口中的最大数和最小数，并按顺序输出。

## 题解

这道题，图省事的话，套个线段树的板子就好~~（没看出来哪里省事了）~~。建两棵线段树，一棵用于查询区间最小值，另一棵用于查询区间最大值。

分析一下线段树的效率，建树时间为 $O(n)$，单次查询时间为 $O(\log n)$ ；又一共有 $2(n-k+1)$ 次查询，所以总体时间复杂度大约为 $O(n\log n)$<span class="fix-ml">。</span>这对于所给数据来说很可能会超时，所以考虑使用单调队列来解决。

单调队列具有队列内所有元素单调递增或者单调递减的性质，所以队列中的最小（最大）值一定出现在队首。

为了维护单调队列，在插入元素 $a_i$ 时需要进行以下操作（以队首为最大值举例）：

1. 判断队首元素是否超出窗口范围，若是，将其弹出队列；
2. 将队尾所有小于 $a_i$ 的元素全部弹出队列；
3. 将 $a_i$ 从队尾入队。

解决这道题，先将前 $k$ 个元素按规则入队，之后每插入一个元素前都输出队首，便得到了题目要求的结果。

需要注意，为了判断队首元素是否在窗口范围内，需要保存元素在序列中的位置（代码中的 $pos$ 数组）。

最后，记得这个，创建并维护一个单调队列并不一定真的得用标准库的 `deque<int>`，并且用其 `push_back` 等方法进行操作~~（大常数选手飘过）~~。我试过，大概有一个 $2$ 的常数在它前面，在解决这题时效率甚至不及线段树解法。

完全可以用一个数组模拟双向队列，用 $l$ 和 $r$ 记录队列在数组中的范围。这样，例如弹出队尾元素的操作，仅仅用 `--r` 就可以完成了。只要确保数组开得足够大，并且操作过程中 $l$ 不会小于 $0$ 即可。

### 参考代码 (Monotonic Queue)

``` c++ MQ.cpp
#include <cstdio>
#define maxn 1000007

int val[maxn], pos[maxn], a[maxn];
int n, k;

inline bool greater(int a, int b) { return a > b; }
inline bool less(int a, int b) { return a < b; }

void solve(bool (*func)(int, int))
{
    int l = 0, r = 0;
    for (int i = 0; i != k; ++i) {
        while (l != r && func(a[i], val[r - 1]))
            --r;
        val[r] = a[i], pos[r++] = i;
    }
    for (int i = k; i != n; ++i) {
        printf("%d ", val[l]);
        if (l != r && pos[l] + k <= i)
            ++l;
        while (l != r && func(a[i], val[r - 1]))
            --r;
        val[r] = a[i], pos[r++] = i;
    }
    printf("%d\n", val[l]);
}

int main()
{
    scanf("%d%d", &n, &k);
    for (int i = 0; i != n; ++i)
        scanf("%d", &a[i]);
    solve(less);
    solve(greater);
}
```

### 参考代码 (Segment Tree)

线段树版本的代码过于丑陋了，所以把它放在了后面。

``` c++ ST.cpp
#include <algorithm>
#include <cstdio>
#define maxn 1000007
#define chl (p * 2 + 1)
#define chr (p * 2 + 2)

int a[maxn];
int m_max[maxn * 4], m_min[maxn * 4];

void build(int l, int r, int p = 0)
{
    if (r - l == 1) {
        m_max[p] = m_min[p] = a[l];
        return;
    }
    int mid = (l + r) / 2;
    build(l, mid, chl);
    build(mid, r, chr);
    m_max[p] = std::max(m_max[chl], m_max[chr]);
    m_min[p] = std::min(m_min[chl], m_min[chr]);
}

int query_min(int x, int y, int l, int r, int p = 0)
{
    if (l == x && r == y)
        return m_min[p];
    int mid = (l + r) / 2;
    if (y <= mid)
        return query_min(x, y, l, mid, chl);
    if (x >= mid)
        return query_min(x, y, mid, r, chr);
    return std::min(query_min(x, mid, l, mid, chl), query_min(mid, y, mid, r, chr));
}

int query_max(int x, int y, int l, int r, int p = 0)
{
    if (l == x && r == y)
        return m_max[p];
    int mid = (l + r) / 2;
    if (y <= mid)
        return query_max(x, y, l, mid, chl);
    if (x >= mid)
        return query_max(x, y, mid, r, chr);
    return std::max(query_max(x, mid, l, mid, chl), query_max(mid, y, mid, r, chr));
}

int main()
{
    int n, k;
    scanf("%d%d", &n, &k);
    for (int i = 0; i != n; ++i)
        scanf("%d", &a[i]);
    build(0, n);
    for (int i = 0; i + k <= n; ++i)
        printf("%d ", query_min(i, i + k, 0, n));
    puts("");
    for (int i = 0; i + k <= n; ++i)
        printf("%d ", query_max(i, i + k, 0, n));
    puts("");
}
```