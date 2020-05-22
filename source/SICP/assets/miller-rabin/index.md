---
title: Miller-Rabin 素性测试
canonical_url: https://duinomaker.top/SICP/assets/miller-rabin/
widgets:
comment:
has_serif: true
content_style: tex-math
license: by-nc-sa
---

---

为了探究一奇数 $n>1$ 是否为素数，将其用 $e$ 和 $k$ 来表示，使得 $n-1=2^ek$，其中 $k$ 为奇数。

根据 <span class="serif">Keith Conrad <sup>[<a href="#cite-1">1</a>]</sup></span> 的推导，多项式 $x^{n-1}-1=x^{2^ek}-1$ 可以被分解，直到指数不是 $2$ 的倍数：

$$\begin{aligned}x^{n-1}-1&=x^{2^ek}-1\\\\&=(x^{2^{e-1}k}-1)(x^{2^{e-1}k}+1)\\\\&=(x^{2^{e-2}k}-1)(x^{2^{e-2}k}+1)(x^{2^{e-1}k}+1)\\\\&\\;\\;\vdots\\\\&=(x^k-1)(x^k+1)(x^{2k}+1)(x^{4k}+1)\cdots(x^{2^{e-1}k}+1)\end{aligned}$$

若 $n$ 为素数，且 $1\leq a\leq n-1$，那么根据费马小定理，可知 $a^{n-1}-1\equiv0\\;({\rm mod}\\;n)$，再根据上式的分解过程，可以得出

$$(a^k-1)(a^k+1)(a^{2k}+1)(a^{4k}+1)\cdots(a^{2^{e-1}k}+1)\equiv0\\;({\rm mod}\\;n)$$

所以上式中的某一项必须等于 $0\\;({\rm mod}\\;n)$，也就是

$$a^k\equiv1\\;({\rm mod}\\;n)\\;\text{or}\\;a^{2^ik}\equiv-1\\;({\rm mod}\\;n)\\;\text{for some}\\;i\in\lbrace0,\ldots,n-1\rbrace$$

像 $\text{Fermat test}$&hairsp;、$\text{Miller-}\\!\text{Rabin test}$ 等基于概率的素性测试算法，目的是找出能够证明 $n$ 是合数的证据。若找不到这样的证据，那么 $n$ 很可能是素数。用这类方法找出的素数称为伪素数&hairsp;(*$\textit{pseudo prime}$*)&hairsp;。

对于一个奇数 $n>1$，在 $\lbrace1,\ldots,n-1\rbrace$ 中取一整数 $a$，如果某个 $a$ 使上式不成立，也就是

$$a^k\not\equiv1\\;({\rm mod}\\;n)\\;\text{and}\\;a^{2^ik}\not\equiv-1\\;({\rm mod}\\;n)\\;\text{for all}\\;i\in\lbrace0,\ldots,n-1\rbrace\quad(*)$$

那么称这个 $a$ 为一个 *$\textit{Miller-\\!Rabin witness}$*&hairsp;，在素性测试中，术语 *$\textit{“witness”}$* 意为某个能够证明 $n$ 为合数的数。

可以证明 <sup class="serif">[<a href="#cite-1">1</a>]</sup>，若一奇数是合数，那么 $\lbrace2,\ldots,n-2\rbrace$ 中超过 $75\\%$ 的数都是 *$\textit{Miller-\\!Rabin witness}$*&hairsp;。所以经过 $k$ 轮的随机检测，*$\textit{Miller-\\!Rabin}$* 判断某个数是素数时，它有概率至少为 $(1-4^{-k})$ 的把握。

在 <a href="/SICP/exercises/1-2/#Exercise-1-28">练习 1.28</a> 中实现了该素性测试，其中用 非平凡平方根&hairsp;(*$\textit{nontrivial square root}$*) 的概念巧妙地找出了 *$\textit{Miller-\\!Rabin witness}$*，关键点是修改后的 `expmod` 过程，在本来执行 `square` 的地方加入了检测非平凡平方根的过程。

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

<h2 class="serif" style="text-align: center;">References</h2>

<p id="cite-1" class="serif">[1] Keith Conrad, “The Miller–Rabin Test,” <a href="https://kconrad.math.uconn.edu/blurbs/ugradnumthy/millerrabin.pdf" target="_blank">https://kconrad.math.uconn.edu/blurbs/ugradnumthy/millerrabin.pdf</a>.</p>