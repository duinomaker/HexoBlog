---
title: 稀疏表及其应用
canonical_url: https://duinomaker.top/posts/sparse-table/
date: 2020-03-25 23:49:12
categories: [Algorithm Contest]
tags: [Sparse Table]
toc: true
license: by-sa
---

本文介绍了稀疏表的基本用法，以及如何在相关习题中应用它。

<!-- more -->

本文的简介部分主要参照了 {% link ${\rm OI\,WiKi}$ https://oi-wiki.org/ %} 的{% link 这篇文章 https://oi-wiki.org/ds/sparse-table/ ST 表 - OI Wiki %}。${\rm OI\\,WiKi}$ 整合了各类有关编程竞赛的实用知识，感谢贡献者们！

---

## 为什么使用稀疏表？

稀疏表是用于解决 “可重复贡献问题” 的数据结构，什么是 “可重复贡献问题”？

若一个运算 ${\rm op}$ 满足 $x\\,{\rm op}\\,x=x$，则其对应的区间查询就是 “可重复贡献问题”。例如，最大值有 $\max(x,x)=x$，所以 RMQ 是这类问题；最大公约数有 $\gcd(x,x)=x$，区间最大公约数也是这类问题。区间和就不具备这个性质，如果求区间和所采用的区间有重叠，重叠部分就会被计算两次，这是我们不希望看到的。

另外，除了 RMQ、区间最大公约数以外，区间按位与、区间按位或等问题，都能够用稀疏表高效解决。这些问题都有着某种相似之处，例如区间按位与，就是每一位都取最小值；区间按位或，就是每一位都取最大值。

类似的解决这类问题的工具还有线段树。虽然稀疏表不支持修改操作，但是其查询时间被降至常数，在处理有大量询问的问题时十分有效。

&#8203;|初始化|区间查询|单节点修改
:-:|:-:|:-:|:-:
线段树|$O(n)$|$O(\log n)$|$O(\log n)$
稀疏表|$O(n\log n)$|$O(1)$|不可

## 如何使用稀疏表？

稀疏表使用 $O(n\log n)$ 的时间，预处理出一张二维的表格 $f(i,j)$ 。接下来以区间最大值为例，$f(i,j)$ 的含义为 “区间 $[i,i+2^j)$ 上的最大值”。

假设原数列为 $a$，显然有 $f(i,0)=a_i$ 。之后使用状态转移方程 $f(i,j)=\max\lbrace f(i,j-1),f(i+2^{j-1},j-1)\rbrace$ 填充完整张表格即可完成预处理。

若要查询区间 $[l,r)$ 上的最大值，返回 $\max\lbrace f(l,s),f(r-2^s,s)\rbrace$ 即可，其中 $s=\lfloor\log_2(r-l)\rfloor$ 。

## 【习题】{% link Balanced Lineup https://www.luogu.com.cn/problem/P2880 P2880 - [USACO07JAN]Balanced Lineup G %}

给出一个序列，每次询问要求回答出某个区间中最大值和最小值之差。

### 题解

模板题，需要维护两张稀疏表，一张用于查询区间最大值，另一张用于查询区间最小值。查询后相减得到答案。

### 参考代码

``` c++ P2880.cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 50001;
const int lg2maxn = 16;

int f[maxn][lg2maxn][2], lg2[maxn];

int main()
{
    int n, q, l, r;
    scanf("%d%d", &n, &q);
    for (int i = 2; i <= n; ++i)
        lg2[i] = lg2[i >> 1] + 1;
    for (int i = 0; i != n; ++i)
        scanf("%d", &f[i][0][0]), f[i][0][1] = f[i][0][0];
    for (int j = 1; j <= lg2[n]; ++j)
        for (int i = n - (1 << j); i != -1; --i)
            f[i][j][0] = min(f[i][j - 1][0], f[i + (1 << (j - 1))][j - 1][0]);
    for (int j = 1; j <= lg2[n]; ++j)
        for (int i = n - (1 << j); i != -1; --i)
            f[i][j][1] = max(f[i][j - 1][1], f[i + (1 << (j - 1))][j - 1][1]);
    while (q--) {
        scanf("%d%d", &l, &r), --l;
        int s = lg2[r - l];
        printf("%d\n", max(f[l][s][1], f[r - (1 << s)][s][1]) - min(f[l][s][0], f[r - (1 << s)][s][0]));
    }
}
```

## 【习题】{% link 降雨量 https://loj.ac/problem/2279 LOJ2279 - 「SCOI2007」降雨量 %}

“$X$ 年是自 $Y$ 年以来降雨量最多的”，它的含义是 $X$ 年的降雨量不超过 $Y$ 年，且对于任意 $Y\lt Z\lt X$，$Z$ 年的降雨量严格小于 $X$ 年。给出两个年份，判断 “$X$ 年是自 $Y$ 年以来降雨量最多的” 这句话是否正确。由于有些年份的降雨量未知，有的说法是可能正确也可以不正确的。

### 题解

这题中稀疏表的地位很明确——只是个小工具，用于查询 $X$ 和 $Y$ 年之间的最大降雨量。这题的重头戏在于有些年份的降雨量是未知的，所以回答可能是 “无法判断”。

代码中的关键点、我曾经忘记考虑的点，都补上了注释，便于查看。

### 参考代码

``` c++ LOJ2279.cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 50001;
const int lg2maxn = 16;

int n, q;
int key[maxn], val[maxn], f[maxn][lg2maxn], lg2[maxn];

int intvmax(int x, int y)
{
    if (x >= y)
        return -1;
    int s = lg2[y - x];
    return max(f[x][s], f[y - (1 << s)][s]);
}

int judge(int x, int y)
{
    int ix = lower_bound(key, key + n, x) - key,
        iy = lower_bound(key, key + n, y) - key;
    if (key[ix] == x) { // x年的降雨量有记录
        int q = intvmax(ix + 1, iy);
        if (key[iy] == y) { // y年的降雨量有记录
            if (val[iy] > val[ix])
                return -1; // y年的降雨量多于x年，则至少得 “自(x-1)年以来……” 才正确
            if (val[iy] > q) {
                if (iy - ix == y - x) // 之间所有年份的降雨量都已知
                    return 1;
                return 0;
            }
            return -1;
        }
        if (val[ix] > q) // x年的降雨量至少要比中间多才可能正确
            return 0;
        return -1;
    }
    if (key[iy] == y) {
        if (iy <= ix) // 之间所有年份的降雨量都未知
            return 0;
        int q = intvmax(ix, iy);
        if (val[iy] > q)
            return 0;
        return -1;
    }
    return 0;
}

int main()
{
    scanf("%d", &n);
    for (int i = 2; i <= n; ++i)
        lg2[i] = lg2[i >> 1] + 1;
    for (int i = 0; i != n; ++i)
        scanf("%d%d", &key[i], &val[i]), f[i][0] = val[i];
    for (int j = 1; j <= lg2[n]; ++j)
        for (int i = n - (1 << j); i != -1; --i)
            f[i][j] = max(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);
    scanf("%d", &q);
    int x, y;
    while (q--) {
        scanf("%d%d", &x, &y);
        int flag = judge(x, y);
        if (flag == 1)
            puts("true");
        else if (flag == 0)
            puts("maybe");
        else
            puts("false");
    }
}
```