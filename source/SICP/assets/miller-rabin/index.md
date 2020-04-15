---
title: Miller-Rabin 素性测试
canonical_url: https://duinomaker.top/SICP/assets/miller-rabin/
widgets:
comment:
license: by-nc-sa
---

---

为了探究一奇数 $n>1$ 的素性，将其用 $e$ 和 $k$ 来表示，使得 $n-1=2^ek$，其中 $k$ 为奇数。

若 $n$ 为质数，那么根据费马小定理，对于一切 $1\leq a\leq n-1$，都有 $a^{n-1}\equiv1\\;\\;({\rm mod}\\;n)$，也就是 $a^{n-1}-1\equiv0\\;\\;({\rm mod}\\;n)$，其中

$$\begin{aligned}a^{n-1}-1&=a^{2^ek}-1\\\\&=(a^{2^{e-1}k}-1)(a^{2^{e-1}k}+1)\\\\&=(a^{2^{e-2}k}-1)(a^{2^{e-2}k}+1)(a^{2^{e-1}k}+1)\\\\&\\;\\;\vdots\\\\&=(a^k-1)(a^k+1)(a^{2k}+1)(a^{4k}+1)\cdots(a^{2^{e-1}k}+1)\end{aligned}$$

所以，若 $n$ 为质数，则对于一切 $a$，都有

$$\begin{aligned}a^k&\equiv1&({\rm mod}\\;n)&\quad\text{或}\\\\a^{2^ik}&\equiv-1&({\rm mod}\\;n)&\quad(\text{对于一些}\\;0\leq i\leq e-1)\end{aligned}$$

上式中的等价关系，对于任何质数 $n$ 都成立。

但对于一个非质数的奇数 $n>1$ 来说，存在 $1\leq a\leq n-1$，使上式不成立，于是就有了素性测试。

满足以下条件的 $a$ 被称作一个 $Miller\text{-}\\!Rabin\\;witness$，它能够证明 $n$ 不是质数：

$$\begin{aligned}a^k&\not\equiv1&({\rm mod}\\;n)&\quad\text{且}\\\\a^{2^ik}&\not\equiv-1&({\rm mod}\\;n)&\quad(\text{对于一切}\\;0\leq i\leq e-1)\end{aligned}\qquad(*)$$

可以证明，若一个数不是质数，那么 $[1,n-1]$ 中超过 $75\\%$ 的数都是 $Miller\text{-}\\!Rabin\\;witness$ 。所以经过 $k$ 轮的随机检测，$Miller\text{-}\\!Rabin$ 测试判断某个数是质数时，它有概率至少为 $(1-4^{-k})$ 的把握。

在 <a href="/SICP/exercises/1.2/#Exercise-1-28">练习 1.28</a> 中实现了该素性测试，其中用 $nontrivial\\;square\\;root$ 的概念巧妙地找出了 $Miller\text{-}\\!Rabin\\;witness$，关键点是修改后的 `expmod` 过程，在本来执行 `square` 的地方加入了检测非平凡平方根的过程。

我也用 C++ 实现了一遍，当然不再是递归版的，思考方式变化极大，不过更加直接地体现了 $(*)$ 式。

``` c++ Miller-Rabin.cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll expmod(ll base, ll ex, ll mod)
{
    ll ans = 1, x = base;
    while (ex) {
        if (ex & 1)
            ans = (ans * x) % mod;
        x = (x * x) % mod;
        ex >>= 1;
    }
    return ans;
}

bool miller_rabin(ll n, int rounds)
{
    ll k = n - 1, e = 0;
    while (!(k & 1))
        k >>= 1, ++e;
    while (rounds--) {
        ll a = (rand() % (n - 1)) + 1, b = expmod(a, k, n);
        if (b == 1 || b == n - 1)
            continue;
        bool composite = true;
        for (int i = 1; composite && i < e; ++i)
            if ((b = (b * b) % n) == n - 1)
                composite = false;
        if (composite)
            return false;
    }
    return true;
}
```