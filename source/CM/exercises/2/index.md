---
title: Chapter 2 Sums
description: Solutions to exercises in Concrete Mathematics chapter 2 - Sums
canonical_url: https://duinomaker.top/CM/exercises/2/
date: 2020-07-01 09:26:46
show_meta: true
widgets:
plugins:
    mathjax: true
content_style: tex-math
---

---

## <a href="https://cdn.jsdelivr.net/gh/duinomaker/HexoBlog@08759d2/source/images/CM/warmups_2.png" class="has-link-grey" style="text-decoration: underline;">Warmups</a>

## Basics

### 2.11

$$\begin{aligned}\sum_{0\leq k\lt n}(a_{k+1}-a_k)b_k&=\sum_{0\leq k\lt n}\big(a_{k+1}b_{k+1}-a_kb_k-a_{k+1}(b_{k+1}-b_k)\big)\\\\&=\sum_{0\leq k\lt n}(a_{k+1}b_{k+1}-a_kb_k)-\sum_{0\leq k\lt n}a_{k+1}(b_{k+1}-b_k)\\\\&=a_nb_n-a_0b_0-\sum_{0\leq k\lt n}a_{k+1}(b_{k+1}-b_k),\quad\text{for $n\geq0$.}\end{aligned}$$

### 2.12

If $x=p(k)$ then $x+c=k+\big((-1)^k+1\big)c$. Observe that $\big((-1)^k+1\big)c$ is even, $x+c$ must have the same parity as $k$. This gives $(-1)^k=(-1)^{x+c}$ and $k=x-(-1)^{x+c}c$. Conversely, this value of $k$ yields $x=p(k)$.

### 2.13

The sum is a special case of the general recurrence

$$\begin{aligned}R_0&=\alpha;\\\\R_n&=R_{n-1}+(-1)^n(\beta+\gamma n+\delta n^2),\quad\text{for $n>0$,}\end{aligned}$$

whose solution would be

$$R(n)=A(n)\alpha+B(n)\beta+C(n)\gamma+D(n)\delta.$$

Setting $R_n=1$ yields $A(n)=1$.
Setting $R_n=(-1)^n$ yields $A(n)+2B(n)=(-1)^n$.
Setting $R_n=(-1)^nn$ yields $-B(n)+2C(n)=(-1)^nn$.
Setting $R_n=(-1)^nn^2$ yields $-C(n)+2D(n)=(-1)^nn^2$.

Therefore, $D(n)=(-1)^n(n^2+n)/2$.

For this sum, we have $\delta=1$; hence

$$\sum_{k=0}^n(-1)^kk^2=(-1)^n(n^2+n)/2.$$

### 2.14

$$\begin{aligned}\sum_{k=1}^nk2^k&=\sum_{1\leq j\leq k\leq n}2^k\\\\&=\sum_{1\leq j\leq n}\sum_{j\leq k\leq n}2^k\\\\&=\sum_{1\leq j\leq n}(2^{n+1}-2^j)\\\\&=n2^{n+1}-(2^{n+1}-2)\\\\&=(n-1)2^{n+1}-2.\end{aligned}$$

### 2.15

$$\begin{aligned}\sum_{k=1}^nk^3+\sum_{k=1}^nk^2&=2\sum_{1\leq j\leq k\leq n}jk\\\\\sum_{k=1}^nk^3+\sum_{k=1}^nk^2&=\left(\sum_{1\leq k\leq n}k\right)^2+\sum_{1\leq k\leq n}k^2\\\\\sum_{k=1}^nk^3&=\left(\sum_{1\leq k\leq n}k\right)^2\\\\\sum_{k=1}^nk^3&=n^2(n+1)^2/4.\end{aligned}$$

### 2.16

If no denominator is zero,

$$\begin{aligned}x^{\underline m}/(x-n)^{\underline m}&=x^{\underline n}/(x-m)^{\underline n}\\\\x^{\underline m}(x-m)^{\underline n}&=x^{\underline n}(x-n)^{\underline m},\end{aligned}$$

the latter is applicable to the law of exponents.

### 2.17

$$\begin{aligned}x^{\overline m}&=x(x+1)\cdots(x+m-1)\\\\&=(-1)^m(-x)(-x-1)\cdots(-x-m+1)\\\\&=(-1)^m(-x)^{\underline m}.\end{aligned}$$

$$\begin{aligned}x^{\overline m}&=x(x+1)\cdots(x+m-1)\\\\&=(x+m-1)\cdots(x+1)x\\\\&=(x+m-1)^{\underline m}.\end{aligned}$$

$$\begin{aligned}x^{\overline m}&=x(x+1)\cdots(x+m-1)\\\\&=1/(x-1)^{\underline{-m}}.\end{aligned}$$

The second line is similar.

### 2.18

If $\sum_{k\in K}a_k$ is absolutely convergent, so are $\sum_{k\in K}(\Re a_k)^+$, $\sum_{k\in K}(\Re a_k)^-$, $\sum_{k\in K}(\Im a_k)^+$ and $\sum_{k\in K}(\Im a_k)^-$.

For all finite subset $F\subsetneq K$, there must be a bounding constant $B$ such that

$$\sum_{k\in F}|a_k|\leq\sum_{k\in F}\big((\Re a_k)^++(\Re a_k)^-+(\Im a_k)^++(\Im a_k)^-\big)\leq B.$$

Conversely, with the fact that $(\Re z)^+,(\Re z)^-,(\Im z)^+,(\Im z)^-\leq|z|$, we know that $\sum_{k\in K}(\Re a_k)^+$, $\sum_{k\in K}(\Re a_k)^-$, $\sum_{k\in K}(\Im a_k)^+$ and $\sum_{k\in K}(\Im a_k)^-$ are each absolutely convergent, so is $\sum_{k\in K}a_k$.

## Homework exercises

### 2.19

Multiply both sides by $2^{n-1}/n!$, we get

$$\begin{aligned}\frac{2^n}{n!}T_n&=\frac{2^{n-1}}{(n-1)!}T_{n-1}+3\cdot2^{n-1}\\\\T_n&=\frac{n!}{2^n}\left(T_0+\sum_{k=1}^n3\cdot2^{n-1}\right)\\\\T_n&=3\cdot n!+\frac{n!}{2^{n-1}}.\end{aligned}$$

### 2.20

$$\begin{aligned}\sum_{k=0}^nkH_k&=\sum_{k=0}^n\big((k+1)H_{k+1}-(n+1)H_{n+1}\big)\\\\\sum_{k=0}^nkH_k&=\sum_{k=0}^nkH_{k+1}+\sum_{k=0}^nH_{k+1}-(n+1)H_{n+1}\\\\(n+1)H_{n+1}&=\sum_{k=0}^n\frac k{k+1}+\sum_{k=0}^nH_{k+1}\\\\(n+1)H_{n+1}&=\sum_{k=0}^n(H_k+1)\\\\(n+1)(H_n-1)&=\sum_{k=0}^nH_k.\end{aligned}$$

### 2.21

$$\begin{aligned}\sum_{k=0}^n(-1)^{n-k}&=\sum_{k=0}^n(-1)^{n-k-1}+(-1)^n+1\\\\2\sum_{k=0}^n(-1)^{n-k}&=(-1)^n+1\\\\S_n&=\begin{cases}1,&\text{$n$ is even;}\\\\0,&\text{$n$ is odd.}\end{cases}\end{aligned}$$

$$\begin{aligned}\sum_{k=0}^n(-1)^{n-k}k&=\sum_{k=0}^n-(-1)^{n-k}(k+1)+n+1\\\\2\sum_{k=0}^n(-1)^{n-k}k&=-\sum_{k=0}^n(-1)^{n-k}+n+1\\\\2T_n&=-S_n+n+1\\\\T_n&=\begin{cases}n/2,&\text{$n$ is even;}\\\\(n+1)/2,&\text{$n$ is odd.}\end{cases}\end{aligned}$$

If we did the first step for $T_n$ differently, we could find out that $\sum_{k=0}^n(-1)^{n-k}(2k+1)=n+1$, which would be useful later.

$$\begin{aligned}\sum_{k=0}^n(-1)^{n-k}k^2&=\sum_{k=0}^n-(-1)^{n-k}(k^2+2k+1)+n^2+2n+1\\\\2\sum_{k=0}^n(-1)^{n-k}k^2&=-\sum_{k=0}^n(-1)^{n-k}(2k+1)+n^2+2n+1\\\\2\sum_{k=0}^n(-1)^{n-k}k^2&=n^2+n\\\\U_n&=n(n+1)/2.\end{aligned}$$

### 2.22

$$\begin{aligned}&\sum_{1\leq j\lt k\leq n}(a_jb_k-a_kb_j)(A_jB_k-A_kB_j)\\\\&\quad=\sum_{1\leq j\lt k\leq n}(a_jb_kA_jB_k+a_kb_jA_kB_j)-\sum_{1\leq j\lt k\leq n}(a_jb_kA_kB_j+a_kb_jA_jB_k)\\\\&\quad=\sum_{1\leq j,k\leq n}a_jb_kA_jB_k-\sum_{1\leq k\leq n}a_kb_kA_kB_k-\sum_{1\leq j,k\leq n}a_jb_kA_kB_j+\sum_{1\leq k\leq n}a_kb_kA_kB_k\\\\&\quad=\sum_{1\leq j,k\leq n}a_jb_kA_jB_k-\sum_{1\leq j,k\leq n}a_jb_kA_kB_j\\\\&\quad=\left(\sum_{k=1}^na_kA_k\right)\left(\sum_{k=1}^nb_kB_k\right)-\left(\sum_{k=1}^na_kB_k\right)\left(\sum_{k=1}^nb_kA_k\right).\end{aligned}$$

### 2.23a

$$\begin{aligned}\sum_{k=1}^n\frac{2k+1}{k(k+1)}&=\sum_{k=1}^n(2k+1)\left(\frac1{k}-\frac1{k+1}\right)\\\\&=\sum_{k=1}^n\frac1k+\sum_{k=1}^n\frac1{k+1}\\\\&=2H_n-\frac n{n+1}.\end{aligned}$$

### 2.23b

Let $u=2k+1$, then $\Delta v=(k-1)^{\underline{-2}}$, $\Delta u=2$ and $v=-(k-1)^{\underline{-1}}$.

$$\begin{aligned}\sum_{k=1}^n\frac{2k+1}{k(k+1)}&=-\frac{2k+1}k\Bigg|_1^{n+1}+\sum _{1\leq k\lt n+1}2k^{\underline{-1}}\\\\&=2H_n-\frac n{n+1}.\end{aligned}$$

### 2.24

Sum by parts to evaluate the general form $\sum_{0\leq k\lt n}H_kk^{\underline m}$, let $u=H_k$, then $\Delta v=k^{\underline m}$, $\Delta u=k^{\underline{-1}}$ and $v=k^{\underline{m+1}}/(m+1)$.

$$\begin{aligned}\sum_{0\leq k\lt n}H_kk^{\underline m}&=H_k\frac{k^{\underline{m+1}}}{m+1}\Bigg|_0^n-\sum _{0\leq k\lt n}\frac{k^{\underline m}}{(m+1)^2}\\\\&=\frac{0^{\underline{m+1}}}{(m+1)^2}+\left(\frac{H_n}{m+1}-\frac1{(m+1)^2}\right).\end{aligned}$$

In this case, we have $m=-2$, so the sum is $1-(H_n+1)/(n+1)$.

### 2.25

$$\begin{aligned}&\prod_{k\in K}a_k^c=\left(\prod_{k\in K}a_k\right)^c;&&\text{(distributive law)}\\\\&\prod_{k\in K}a_kb_k=\left(\prod_{k\in K}a_k\right)\left(\prod_{k\in K}b_k\right);&&\text{(associative law)}\\\\&\prod_{k\in K}a_k=\prod_{p(k)\in K}a_{p(k)};&&\text{(commutative law)}\\\\&\prod_{k\in K}a_k=\prod_ka_k^{[k\in K]};&&\text{(Iverson's convention)}\\\\&\prod_{\substack{j\in J\\\\k\in K}}a_{j,k}=\prod_{j\in J}\prod_{k\in K}a_{j,k};&&\text{(interchanging the order)}\\\\&\prod_{\substack{j\in J\\\\k\in K}}a_j^{b_k}=\left(\prod_{j\in J}a_j\right)^{\sum_{k\in K}b_k}.&&\text{(general distributive law)}\end{aligned}$$

### 2.26

$$\begin{aligned}\left(\prod_{1\leq j\leq k\leq n}a_ja_k\right)^2&=\left(\prod_{1\leq j,k\leq n}a_ja_k\right)\left(\prod_{1\leq j=k\leq n}a_ja_k\right)\\\\\left(\prod_{1\leq j\leq k\leq n}a_ja_k\right)^2&=\left(\prod_{1\leq k\leq n}a_k\right)^n\left(\prod_{1\leq k\leq n}a_k\right)^n\left(\prod_{1\leq k\leq n}a_k^2\right)\\\\\prod_{1\leq j\leq k\leq n}a_ja_k&=\left(\prod_{1\leq k\leq n}a_k\right)^{n+1}.\end{aligned}$$

### 2.27

$$\begin{aligned}\Delta(c^{\underline x})&=c^{\underline{x+1}}-c^{\underline x}\\\\&=(c-1)c^{\underline x}-xc^{\underline x}.\end{aligned}$$

$$\begin{aligned}\sum_{k=1}^n\frac{(-2)^{\underline k}}k&=\sum_{1\leq k\lt n+1}(k+1)(-2)^{\underline{k-2}}\\\\&=\sum_{1\leq k\lt n+1}(k-2)(-2)^{\underline{k-2}}-(-3)(-2)^{\underline{k-2}}\\\\&=-(-2)^{\underline{k-2}}\Big|_{1}^{n+1}\\\\&=(-1)^nn!-1.\end{aligned}$$

### 2.28

From the second line to the third line, the interchange of summation is not justifiable. That's because the terms in

$$\sum_{k\geq1}\sum_{j\geq1}\left(\frac{k}j[j=k+1]-\frac{j}k[j=k-1]\right)$$

do not converge absolutely.