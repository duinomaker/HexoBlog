---
title: 线段树之懒惰标记
canonical_url: https://duinomaker.top/posts/segment-tree-lazytag/
date: 2020-03-15 20:28:39
categories: [Algorithm Contest, Segment Tree]
tags: [Segment Tree]
toc: true
license: by-sa
---

最近在学习线段树的有关知识，期间遇到的重要的知识点和不错的习题，我会总结并记录下来。本文将持续更新，并将作为该系列的索引置顶一段时间。当前的索引如下：

<span class="mono has-mr-8">[x]-</span><a href="/posts/segment-tree/" title="线段树之基本概念" target="_self">基本概念</a>
<span class="mono has-mr-8">[x]-</span><a href="/posts/segment-tree-lazytag/" title="线段树之懒惰标记" target="_self">懒惰标记</a>
<span class="mono has-mr-8">[ ]-</span>扫描线（学习中…）
<span class="mono has-mr-8">[ ]-</span>……

<!-- more -->

---

## 为什么引入懒惰标记？

懒惰标记的用处，就是更快地实现实现区间修改、区间查询。

考虑之前讲到的线段树。如果用线段树的单点修改，我们需要先改变叶子节点的值，然后不断地向上递归修改祖先节点直至到达根节点，时间复杂度最高可以到达 $O(n\log n)$ 的级别，这还只是单次操作，更别说有 $10^5$ 次指令的情况了。

## 该怎么实现？

其实就是用一个暂时不处理，等到需要用到的时候再进行处理的思想。

我们想，如果已经到达了属于答案区间范围内的节点，我们就直接对该节点进行一系列的操作，然后直接返回。这样，一定能保证本次区间更新的正确性。然而，区间更新不只一次，如果照刚刚那样更新而不进行任何后处理的话，那么该节点的子节点都未更新，势必会导致答案错误。于是，我们需要一种东西来记录下节点的更新信息，以便下次更新时处理。

所以引入一个名叫懒惰标记(lazytag) 的东西。之所以称其为 lazytag，是因为当我们引入懒惰标记后，我们不会去更新已经覆盖答案区间的子节点，只有在接下来的操作中我们才可能会用到该区间的子区间。所以这次操作就无需更新。区间更新的期望复杂度就降到了 $O(\log n)$ 的级别。

之前遇到的，只有单次修改、查询的情况，都是子区间向父区间传递信息，称之为 pushup。而这次将懒惰标记向下传递，不就是反过来，是父区间向子区间传递信息吗？我们将向下传递操作称为  pushdown。

线段树使用分治法，用递归进行实现。显然，子区间向父区间传递信息，应该在递归地操作子区间之后。而我们为了保证子区间的数据在操作其之前已被更新，就需要在递归操作之前，从父区间向子区间传递消息。

于是，以区间整体加上一个数的操作为例，就可以如此标记：

``` c++
/**
 *  ls[p]   p节点的左端点
 *  rs[p]   p节点的右端点
 *  sum[p]  p节点的区间和
 *  lazy[p] p节点的懒惰标记
 */

#define chl (p * 2 + 1)
#define chr (p * 2 + 2)

void pushdown(int p)
{
    // 子区间和 += (子区间的元素个数) * 父区间的懒标记
    sum[chl] += (rs[chl] - ls[chl]) * lazy[p];
    sum[chr] += (rs[chr] - ls[chr]) * lazy[p];
    // 父区间的懒标记传递给子区间
    lazy[chl] += lazy[p];
    lazy[chr] += lazy[p];
    // 清零父区间的懒惰标记
    lazy[p] = 0;
}

void modify(int x, int y, int val, int p = 0)
{
    if (x <= ls[p] && rs[p] <= y) {
        sum[p] += (rs[p] - ls[p]) * val;
        lazy[p] += val;
        return;
    }
    pushdown(p);
    int mid = (ls[p] + rs[p]) >> 1;
    if (rs[p] <= mid)
        return modify(x, y, val, chl);
    if (ls[p] >= mid)
        return modify(x, y, val, chr);
    modify(x, mid, val, chl);
    modify(mid, y, val, chr);
}
```

我认为懒惰标记的使用，最重要的就是如何 pushdown 了，下面的几道题目很能说明问题。

## 【习题】{% link 线段树 2 https://www.luogu.com.cn/problem/P3373 P3373 - 【模板】线段树 2 %}

提供一个序列，要求你维护三种操作：

1. 将某区间每一个数乘上 $x$
2. 将某区间每一个数加上 $x$
3. 求出某区间每一个数的和

### 题解

在洛谷中作为一道模板题，这道题实在是太虐心了。不过不得不承认，做完以后对线段树和懒惰标记的理解深入了许多。

看了这题讨论区的题解，很多人说什么先乘后加，我也是想了挺久才弄懂。

于是考虑这样一个区间 $0$，和它的两个子区间 $1$ 和 $2$，如图：

<img class="lazyload" src="/images/segment-tree-lazytag_1.jpg" width="100%" alt="">

接着，我们记区间 $i$ 的区间的元素个数为 $span_i$、区间和为 $sum_i$、修改前的初始区间和为 $sum^\prime_i$、区间延迟加法的懒标记为 $lazyadd_i$、区间延迟乘法的懒标记为 $lazymul_i$ 。于是有以下初始情况，初始情况下，$lazyadd_i=0,lazymul_i=1$：

$$sum^\prime_0 = sum^\prime_0\times\overbrace{1}^{lazymul_0} +\overbrace{0}^{lazyadd_0}\times span_0$$

考虑将 $0$ 区间，先整体加上 $3$，再整体乘以 $4$，于是有：

$$\begin{aligned}sum_0=&\\,(sum^\prime_0\times\overbrace{1}^{lazymul_0} +\overbrace{0}^{lazyadd_0}\times span_0 + 3\times span_0)\times 4\\\\=&\\,(sum^\prime_0\times\overbrace{1}^{lazymul_0} +\overbrace{3}^{lazyadd_0}\times span_0)\times 4\\\\=&\\,sum^\prime_0\times\overbrace{4}^{lazymul_0} +\overbrace{12}^{lazyadd_0}\times span_0\end{aligned}$$

上式中转换的两步，分别对应了递归更新区间 “懒惰加法” 和 “懒惰乘法” 的代码（`rs[p] - ls[p]` 即 $span_p$）：

``` c++
// 加法
sum[p] += val * (rs[p] - ls[p]);
lazyadd[p] += val;
// 乘法
sum[p] *= val;
lazyadd[p] *= val;
lazymul[p] *= val;
```

接下来考虑父区间将信息传递给子区间的 pushdown 操作。以子区间 $1$ 为例，将父区间加上 $3$ 和乘以 $4$ 的信息传入。假设该区间本身就有懒惰标记，其初始值分别为 $lazyadd^\prime_1$ 和 $lazymul^\prime_1$，于是有：

$$\begin{aligned}sum_1&=\\,(sum^\prime_1\times\overbrace{lazymul^\prime_1}^{lazymul_1}+\overbrace{lazyadd^\prime_1}^{lazyadd_1}\times span_1+3\times span_1)\times4\\\\&=\\,[sum^\prime_1\times\overbrace{lazymul^\prime_1}^{lazymul_1} +\overbrace{(lazyadd^\prime_1+3)}^{lazyadd_1}\times span_1]\times4\\\\&=\\, sum^\prime_1\times\overbrace{lazymul^\prime_1\times 4}^{lazymul_1}+\overbrace{(lazyadd^\prime_1\times 4+12)}^{lazyadd_1}\times span_1\\\\&=\\, sum^\prime_1\times\overbrace{lazymul^\prime_1\times lazymul_0}^{lazymul_1} +\overbrace{(lazyadd^\prime_1\times lazymul_0+lazyadd_0)}^{lazyadd_1}\times span_1\end{aligned}$$

上式最后一步的转换比较关键，这样就和父区间建立起了联系。这对应了父区间向下传递的代码：

``` c++
#define chl (p * 2 + 1)
#define chr (p * 2 + 2)

void pushdown(int p) {
    // 更新子区间的区间和与懒惰标记
    sum[chl] = sum[chl] * lazymul[p] + lazyadd[p] * (rs[chl] - ls[chl]);
    sum[chr] = sum[chr] * lazymul[p] + lazyadd[p] * (rs[chr] - ls[chr]);
    lazyadd[chl] = lazyadd[chl] * lazymul[p] + lazyadd[p];
    lazyadd[chr] = lazyadd[chr] * lazymul[p] + lazyadd[p];
    lazymul[chl] *= lazymul[p];
    lazymul[chr] *= lazymul[p];
    // 最后别忘了清零父区间的懒惰标记
    lazyadd[p] = 0;
    lazymul[p] = 1;
}
```

有了这些思路，代码自然就有了。

### 参考代码

``` c++ P3373.cpp
#include <bits/stdc++.h>
#define chl (p * 2 + 1)
#define chr (p * 2 + 2)
using namespace std;
using ll = long long;
constexpr int maxn = 1e5;
constexpr int maxt = 1 << 18;

ll a[maxn], mod;
int n, m;

struct segtree {
    ll ls[maxt], rs[maxt];
    ll sum[maxt], lazyadd[maxt], lazymul[maxt];

    void build(int l, int r, int p = 0)
    {
        ls[p] = l, rs[p] = r, lazyadd[p] = 0, lazymul[p] = 1;
        if (r - l == 1) {
            sum[p] = a[l] % mod;
            return;
        }
        int mid = (l + r) >> 1;
        build(l, mid, chl);
        build(mid, r, chr);
        sum[p] = (sum[chl] + sum[chr]) % mod;
    }

    void pushdown(int p)
    {
        sum[chl] = (sum[chl] * lazymul[p] + lazyadd[p] * (rs[chl] - ls[chl])) % mod;
        sum[chr] = (sum[chr] * lazymul[p] + lazyadd[p] * (rs[chr] - ls[chr])) % mod;
        lazyadd[chl] = (lazyadd[chl] * lazymul[p] + lazyadd[p]) % mod;
        lazyadd[chr] = (lazyadd[chr] * lazymul[p] + lazyadd[p]) % mod;
        lazymul[chl] = (lazymul[chl] * lazymul[p]) % mod;
        lazymul[chr] = (lazymul[chr] * lazymul[p]) % mod;
        lazyadd[p] = 0, lazymul[p] = 1;
    }

    void add(int x, int y, ll val, int p = 0)
    {
        if (x <= ls[p] && rs[p] <= y) {
            sum[p] = (sum[p] + val * (rs[p] - ls[p])) % mod;
            lazyadd[p] = (lazyadd[p] + val) % mod;
            return;
        }
        pushdown(p);
        int mid = (ls[p] + rs[p]) >> 1;
        if (x < mid)
            add(x, y, val, chl);
        if (y > mid)
            add(x, y, val, chr);
        sum[p] = (sum[chl] + sum[chr]) % mod;
    }

    void mul(int x, int y, ll val, int p = 0)
    {
        if (x <= ls[p] && rs[p] <= y) {
            sum[p] = (sum[p] * val) % mod;
            lazyadd[p] = (lazyadd[p] * val) % mod;
            lazymul[p] = (lazymul[p] * val) % mod;
            return;
        }
        pushdown(p);
        int mid = (ls[p] + rs[p]) >> 1;
        if (x < mid)
            mul(x, y, val, chl);
        if (y > mid)
            mul(x, y, val, chr);
        sum[p] = (sum[chl] + sum[chr]) % mod;
    }

    ll query(int x, int y, int p = 0)
    {
        if (ls[p] == x && rs[p] == y)
            return sum[p];
        pushdown(p);
        int mid = (ls[p] + rs[p]) >> 1;
        if (y <= mid)
            return query(x, y, chl);
        if (x >= mid)
            return query(x, y, chr);
        return (query(x, mid, chl) + query(mid, y, chr)) % mod;
    }
} seg;

int main()
{
    scanf("%d%d%lld", &n, &m, &mod);
    for (int i = 0; i != n; ++i)
        scanf("%lld", &a[i]);
    seg.build(0, n);
    int op, x, y;
    ll k;
    while (m--) {
        scanf("%d%d%d", &op, &x, &y), --x;
        if (op == 3)
            printf("%lld\n", seg.query(x, y));
        else {
            scanf("%lld", &k);
            if (op == 1)
                seg.mul(x, y, k);
            else
                seg.add(x, y, k);
        }
    }
}
```

## 【习题】{% link 市场 https://loj.ac/problem/6029 LOJ6029 - 「雅礼集训 2017 Day1」市场 %}

提供一个序列，要求你维护四种操作：

1. 区间整体加上 $x$
2. 区间的每一个数除以 $x$，并向下取整
3. 查询区间最小值
4. 查询区间和

### 题解

这题让我深刻地体会到了，自己是个大常数选手。同一段代码别人用 $2500{\rm ms}$，我的要用 $3300{\rm ms}$ 。代码常数的差别，不是一两处修改就能赶上来的，有些习惯让大常数的代码无处不在... 说了一些废话。

这四种操作，我认为第二种是最重要的，其它都只是摆设罢了。

除以一个数容易想，维护两个懒惰标记，一个对应加法、一个对应除法就行了。可对于整除来说，这方法完全行不通。于是想到，很接近的数，比如 $9$ 和 $10$，在除以 $5$ 并向下取整后将变为 $1$ 和 $2$ 。相当于给两个数都减去了 $8$ 。于是，区间整除就变成了区间减法。

判断整个区间的数是否具备将整除转为区间减法的条件，需要记录下区间的最大值和最小值。一般来说只有最大值等于最小值，也就是区间数字都相同时符合条件。但比如说刚才 $9$ 和 $10$ 的例子，比较大的数能够被除数整除，则最小值可以比最大值小 $1$ 。

### 参考代码

``` c++ LOJ6029.cpp
#include <bits/stdc++.h>
#define chl (p * 2 + 1)
#define chr (p * 2 + 2)
using namespace std;
typedef long long ll;
const int maxn = 1e5;
const int maxt = 1 << 18;

ll floor(ll a, ll b)
{
    if ((a < 0) ^ (b < 0) && a % b)
        return a / b - 1;
    return a / b;
}

ll a[maxn];

struct segtree {
    int ls[maxt], rs[maxt];
    ll mn[maxt], mx[maxt], sum[maxt], lazy[maxt];

    void pushup(int p)
    {
        sum[p] = sum[chl] + sum[chr];
        mx[p] = max(mx[chl], mx[chr]);
        mn[p] = min(mn[chl], mn[chr]);
    }

    void pushdown(int p)
    {
        if (lazy[p]) {
            sum[chl] += lazy[p] * (rs[chl] - ls[chl]);
            sum[chr] += lazy[p] * (rs[chr] - ls[chr]);
            mn[chl] += lazy[p];
            mn[chr] += lazy[p];
            mx[chl] += lazy[p];
            mx[chr] += lazy[p];
            lazy[chl] += lazy[p];
            lazy[chr] += lazy[p];
            lazy[p] = 0;
        }
    }

    void build(int l, int r, int p = 0)
    {
        ls[p] = l, rs[p] = r, lazy[p] = 0;
        if (r - l == 1) {
            sum[p] = mn[p] = mx[p] = a[l];
            return;
        }
        int mid = (l + r) >> 1;
        build(l, mid, chl);
        build(mid, r, chr);
        pushup(p);
    }

    void intv_add(int x, int y, ll val, int p = 0)
    {
        if (x <= ls[p] && rs[p] <= y) {
            sum[p] += val * (rs[p] - ls[p]);
            lazy[p] += val;
            mn[p] += val;
            mx[p] += val;
            return;
        }
        pushdown(p);
        int mid = (ls[p] + rs[p]) >> 1;
        if (x < mid)
            intv_add(x, y, val, chl);
        if (y > mid)
            intv_add(x, y, val, chr);
        pushup(p);
    }

    void intv_div(int x, int y, ll val, int p = 0)
    {
        if (x <= ls[p] && rs[p] <= y) {
            if (mn[p] == mx[p] || (mx[p] - mn[p] == 1 && !(mx[p] % val))) {
                val = floor(mn[p], val) - mn[p];
                sum[p] += val * (rs[p] - ls[p]);
                lazy[p] += val;
                mn[p] += val;
                mx[p] += val;
                return;
            }
        }
        pushdown(p);
        int mid = (ls[p] + rs[p]) >> 1;
        if (x < mid)
            intv_div(x, y, val, chl);
        if (y > mid)
            intv_div(x, y, val, chr);
        pushup(p);
    }

    ll query_min(int x, int y, int p = 0)
    {
        if (ls[p] == x && rs[p] == y)
            return mn[p];
        pushdown(p);
        int mid = (ls[p] + rs[p]) >> 1;
        if (y <= mid)
            return query_min(x, y, chl);
        if (x >= mid)
            return query_min(x, y, chr);
        return min(query_min(x, mid, chl), query_min(mid, y, chr));
    }

    ll query_sum(int x, int y, int p = 0)
    {
        if (ls[p] == x && rs[p] == y)
            return sum[p];
        pushdown(p);
        int mid = (ls[p] + rs[p]) >> 1;
        if (y <= mid)
            return query_sum(x, y, chl);
        if (x >= mid)
            return query_sum(x, y, chr);
        return query_sum(x, mid, chl) + query_sum(mid, y, chr);
    }
} seg;

int main()
{
    int n, q;
    scanf("%d%d", &n, &q);
    for (int i = 0; i != n; ++i)
        scanf("%lld", &a[i]);
    seg.build(0, n);
    int op, x, y;
    ll k;
    while (q--) {
        scanf("%d%d%d", &op, &x, &y), ++y;
        if (op == 1) {
            scanf("%lld", &k);
            seg.intv_add(x, y, k);
        } else if (op == 2) {
            scanf("%lld", &k);
            seg.intv_div(x, y, k);
        } else if (op == 3) {
            printf("%lld\n", seg.query_min(x, y));
        } else {
            printf("%lld\n", seg.query_sum(x, y));
        }
    }
}
```