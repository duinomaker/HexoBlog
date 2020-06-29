---
title: Chapter 2 Sums
canonical_url: https://duinomaker.top/CM/exercises/2/
widgets:
comment:
article:
    highlight:
        clipboard: false
plugins:
    katex: false
    mathjax: true
content_style: tex-math
license: by-nc-sa
license_lang: en
---

---

## <a href="https://cdn.jsdelivr.net/gh/duinomaker/HexoBlog@latest/source/images/CM/warmups_2.jpg" class="has-link-grey" style="text-decoration: underline;">Warmups</a>

## Basics

### 2.11

$$\begin{aligned}\sum_{0\leq k\lt n}(a_{k+1}-a_k)b_k&=\sum_{0\leq k\lt n}(a_{k+1}b_{k+1}-a_kb_k-a_{k+1}(b_{k+1}-b_k))\\\\&=\sum_{0\leq k\lt n}(a_{k+1}b_{k+1}-a_kb_k)-\sum_{0\leq k\lt n}a_{k+1}(b_{k+1}-b_k)\\\\&=a_nb_n-a_0b_0-\sum_{0\leq k\lt n}a_{k+1}(b_{k+1}-b_k),\quad\text{for $n\geq0$.}\end{aligned}$$

### 2.12

If $x=p(k)$ then $x+c=k+((-1)^k+1)c$. Observe that $((-1)^k+1)c$ is even, $x+c$ must have the same parity as $k$. This gives $(-1)^k=(-1)^{x+c}$ and $k=x-(-1)^{x+c}c$. Conversely, this value of $k$ yields $x=p(k)$.

### 2.13

The sum is equivalent to the recurrence

$$\begin{aligned}R_0&=\alpha;\\\\R_n&=R_{n-1}+(-1)^n(\beta+\gamma n+\delta n^2),\quad\text{for $n>0$,}\end{aligned}$$

whose solution would be the general form

$$R(n)=A(n)\alpha+B(n)\beta+C(n)\gamma+D(n)\delta.$$

Setting $R_n=1$ yields $A(n)=1$.
Setting $R_n=(-1)^n$ yields $A(n)+2B(n)=(-1)^n$.
Setting $R_n=(-1)^nn$ yields $-B(n)+2C(n)=(-1)^nn$.
Setting $R_n=(-1)^nn^2$ yields $-C(n)+2D(n)=(-1)^nn^2$.

Therefore, $D(n)=(-1)^n(n^2+n)/2$.

For this sum, we have $\delta=1$; hence $\sum_{k=0}^n(-1)^kk^2=(-1)^n(n^2+n)/2$.

### 2.14

$$\begin{aligned}\sum_{k=1}^nk2^k&=\sum_{1\leq j\leq k\leq n}2^k\\\\&=\sum_{1\leq j\leq n}\sum_{j\leq k\leq n}2^k\\\\&=\sum_{1\leq j\leq n}(2^{n+1}-2^j)\\\\&=n2^{n+1}-(2^{n+1}-2)\\\\&=(n-1)2^{n+1}-2.\end{aligned}$$

### 2.15

$$\begin{aligned}\sum_{k=1}^nk^3-\sum_{k=1}^nk^2&=2\sum_{1\leq j\leq k\leq n}jk\\\\\sum_{k=1}^nk^3-\sum_{k=1}^nk^2&=\left(\sum_{1\leq k\leq n}k\right)^2+\sum_{1\leq k\leq n}k^2\\\\\sum_{k=1}^nk^3&=\left(\sum_{1\leq k\leq n}k\right)^2+3\sum_{1\leq k\leq n}k^2\\\\\sum_{k=1}^nk^3&=\frac12(n(n+1)+n(n+1)(2n+1))\\\\\sum_{k=1}^nk^3&=n(n+1)^2.\end{aligned}$$

### 2.16

If no denominator is zero,

$$\begin{aligned}x^{\underline{m}}/(x-n)^{\underline{m}}&=x^{\underline{n}}/(x-m)^{\underline{n}}\\\\x^{\underline{m}}(x-m)^{\underline{n}}&=x^{\underline{n}}(x-n)^{\underline{m}},\end{aligned}$$

which is applicable to the law of exponents.

### 2.17

$$\begin{aligned}x^{\overline{m}}&=x(x+1)\cdots(x+m-1)\\\\&=(-1)^m(-x)(-x-1)\cdots(-x-m+1)\\\\&=(-1)^m(-x)^{\underline{m}}.\end{aligned}$$

$$\begin{aligned}x^{\overline{m}}&=x(x+1)\cdots(x+m-1)\\\\&=(x+m-1)\cdots(x+1)x\\\\&=(x+m-1)^{\underline{m}}.\end{aligned}$$

$$\begin{aligned}x^{\overline{m}}&=x(x+1)\cdots(x+m-1)\\\\&=1/(x-1)^{\underline{-m}}.\end{aligned}$$

The second line is similar.

### 2.18

If $\sum_{k\in K}a_k$ is absolutely convergent, so are $\sum_{k\in K}(\Re a_k)^+$, $\sum_{k\in K}(\Re a_k)^-$, $\sum_{k\in K}(\Im a_k)^+$ and $\sum_{k\in K}(\Im a_k)^-$.

For all finite subset $F\subseteq K$, there must be a bounding constant $B$ such that

$$\sum_{k\in F}|a_k|\leq\sum_{k\in F}((\Re a_k)^++(\Re a_k)^-+(\Im a_k)^++(\Im a_k)^-)\leq B.$$

Conversely, with the fact that $(\Re z)^+,(\Re z)^-,(\Im z)^+,(\Im z)^-\leq|z|$, we know that $\sum_{k\in K}(\Re a_k)^+$, $\sum_{k\in K}(\Re a_k)^-$, $\sum_{k\in K}(\Im a_k)^+$ and $\sum_{k\in K}(\Im a_k)^-$ are each absolutely convergent, so is $\sum_{k\in K}a_k$.

## Homework exercises

### 2.19

$$T_n=\frac1{s_na_n}\left(s_1b_1T_0+\sum_{k=1}^ns_kc_k\right),$$

where $a_n=2$, $b_n=n$, $c_n=3\cdot n!$ and $s_n=2^{n-1}/n!$.

$$\begin{aligned}T_n&=\frac{n!}{2^n}\left(5+\sum_{k=1}^n3\cdot2^{n-1}\right)\\\\&=3\cdot n!+\frac{n!}{2^{n-1}}.\end{aligned}$$

### 2.20

