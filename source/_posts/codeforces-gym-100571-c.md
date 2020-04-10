---
title: 区间最小公倍数
canonical_url: https://duinomaker.top/posts/codeforces-gym-100571-c/
date: 2020-03-27 18:14:59
categories: [Algorithm Contest]
tags: [Offline Query, Sparse Table]
toc: true
---

题目链接：{% link Codeforces Hello 2015 (Div.2) - LCM Query https://codeforces.com/gym/100571/problem/C %}

求出某个序列所有长度为 $x$ 的连续子序列的最小公倍数中的最小值。考虑到有大量询问、无需进行修改，故采用 稀疏表 + 离线处理 的方法。

<!-- more -->

---

## 题目描述

出题人喜欢最小公倍数$({\rm lcm})$，他提供了一个数列 $a_1,a_2,\ldots,a_n$，并给出了一些 $x$，希望你对每个 $x$ 都求出以下式子的值：

$$\min_{i=1}^{n-x+1}{\rm lcm}(a_i,a_{i+1},\ldots,a_{i+x-1})$$

简单来说求出这个数列所有长度为 $x$ 的连续子序列的最小公倍数中的最小值~~（简单来说？~~

数列 ${a_i}$ 的长度为 $n$，一个 $x$ 就是一次询问，共有 $m$ 次询问，并有以下限制：

$1\leq n\leq2\times10^4$
$1\leq m\leq10^6$
$1\leq a_i\leq60$
$1\leq x\leq n$

## 题解

对于一个数 $x$，可以将其分解质因数：$x=p_1^{b_1}\times p_2^{b_2}\times\ldots\times p_k^{b_k}$，其中 $p_i$ 指第 $i$ 个素数。于是 $x$ 就可以表示为一个数列 $b$ 。用这种表示方法，可以很方便地表示最小公倍数。假设有两个数 $x=p_1^{b_1}\times p_2^{b_2}\times\ldots\times p_k^{b_k}$ 和 $y=p_1^{c_1}\times p_2^{c_2}\times\ldots\times p_k^{c_k}$，那么就有：

$${\rm lcm}(x,y)=p_1^{\max(b_1,c_1)}\times p_2^{\max(b_2,c_2)}\times\ldots\times p_k^{\max(b_k,c_k)}$$

由于题目要求让结果对 $10^9 + 7$ 取模，算出的结果不能直接比较大小。所以利用对数的性质，取对数后再比较对数的大小：

$$\begin{aligned}\log(x)&=b_1\log(p_1)+b_2\log(p_2)+\ldots+b_k\log(p_k)\\\\\log(y)&=c_1\log(p_1)+c_2\log(p_2)+\ldots+c_k\log(p_k)\\\\\log(x)&\lt\log(y)\to x\lt y\end{aligned}$$

最后是查询，对于每一个 $x$ 都重新遍历一遍数列是肯定会 TLE 的，所以要先将每一个区间长度的结果处理出来。大概过程是这样的：创建两个 “指针” $l$ 和 $r$ 。一开始，$l$ 和 $r$ 都指向第一个元素，之后让 $r$ 不断向后移动，直至指向第一个 ${\rm lcm}$ 值$ {\rm lcm}(a_l,a_{l+1},\ldots,a_r)$ 与之前的 ${\rm lcm}$ 值不同的元素，并用之前的 ${\rm lcm}$ 值更新 $ans_{r-l}$ 的值。再向右移动 $r$ 并如此更新，直至数列尾后元素。之后 $l$ 和 $r$ 同时指向第二个元素，重复上述操作，再同时指向第三个元素…… 直至同时指向数列的尾部元素。

以数列 $12,3,6,25,5,7$ 举例：

1. $l=0,r=3$，用 ${\rm lcm}(12,3,6)=12$ 更新 $ans_3$
2. $l=0,r=5$，用 ${\rm lcm}(12,3,6,25,5)=300$ 更新 $ans_5$
3. $l=0,r=6$，用 ${\rm lcm}(12,3,6,25,5,7)=2100$ 更新 $ans_6$
4. $l=1,r=3$，用 ${\rm lcm}(3,6)=6$ 更新 $ans_2$
5. ……

这部分比较难搞懂，代码中已经用 $64$ 道反斜杠划出了重点(x

## 参考代码

``` c++ lcm-query.cpp
#include <bits/stdc++.h>
using namespace std;
typedef vector<int> vi;
typedef long long ll;
const int maxn = 2e4 + 1;
const int lg2maxn = 15;
const ll mod = 1e9 + 7;

int lg2[maxn], pw2[lg2maxn], ansi[maxn];
vi rmq[maxn][lg2maxn], ans[maxn], p;
vector<double> lnp;

void init()
{
    for (int i = 2; i != maxn; ++i)
        lg2[i] = lg2[i >> 1] + 1;
    for (int i = 0; i != lg2maxn; ++i)
        pw2[i] = 1 << i;
    for (int i = 2; i <= 60; ++i) {
        bool prime = true;
        for (int j = 2; prime && j * j <= i; ++j)
            if (!(i % j))
                prime = false;
        if (prime)
            p.push_back(i), lnp.push_back(log((double)i));
    }
    fill(ans, ans + maxn, vi(p.size(), 7));
}

vi lcm(const vi& a, const vi& b)
{
    vi res(p.size());
    for (int i = 0, i_ = p.size(); i != i_; ++i)
        res[i] = max(a[i], b[i]);
    return res;
}

vi intvlcm(int l, int r)
{
    int s = lg2[r - l];
    return lcm(rmq[l][s], rmq[r - pw2[s]][s]);
}

vi itov(int x)
{
    vi res(p.size(), 0);
    for (int i = 0, i_ = p.size(); i != i_; ++i)
        while (!(x % p[i]))
            ++res[i], x /= p[i];
    return res;
}

int vtoi(const vi& x)
{
    ll res = 1ll;
    for (int i = 0, i_ = p.size(); i != i_; ++i)
        for (int j = x[i]; j--;)
            res = (res * p[i]) % mod;
    return res;
}

bool cmp(const vi& a, const vi& b)
{
    double x = 0.0, y = 0.0;
    for (int i = 0, i_ = p.size(); i != i_; ++i)
        x += lnp[i] * a[i], y += lnp[i] * b[i];
    return x < y;
}

int main()
{
    init();
    int n, q;
    scanf("%d%d", &n, &q);
    for (int i = 0, t; i != n; ++i)
        scanf("%d", &t), rmq[i][0] = itov(t);
    for (int j = 1; j <= lg2[n]; ++j)
        for (int i = n - pw2[j]; i != -1; --i)
            rmq[i][j] = lcm(rmq[i][j - 1], rmq[i + pw2[j - 1]][j - 1]);
    ////////////////////////////////
    for (int l = 0; l != n; ++l) {
        vi cur = rmq[l][0];
        for (int r = l; r != n;) {
            cur = lcm(cur, rmq[r][0]);
            for (int k = lg2[n - r]; k != -1; --k)
                if (r + pw2[k] <= n && lcm(cur, rmq[r][k]) == cur)
                    r += pw2[k];
            ans[r - l] = min(ans[r - l], cur, cmp);
        }
    }
    ////////////////////////////////
    for (int x; q--;) {
        scanf("%d", &x);
        printf("%d\n", ansi[x] ? ansi[x] : (ansi[x] = vtoi(ans[x])));
    }
}
```