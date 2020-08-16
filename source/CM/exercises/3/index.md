---
title: Chapter 3 Integer Functions
description: Solutions to exercises in Concrete Mathematics chapter 3 - Integer Functions
canonical_url: https://duinomaker.top/CM/exercises/3/
date: 2020-07-18 00:19:49
show_meta: true
widgets:
plugins:
    mathjax: true
content_style: tex-math
---

---

## <a href="https://cdn.jsdelivr.net/gh/duinomaker/HexoBlog@b46c6cb/source/images/CM/warmups_3.jpg" class="has-link-grey" style="text-decoration: underline;">Warmups</a>

## Basics

### 3.10

The given expression equals to $\left\lceil x-\frac12\right\rceil+\big[(2x+1)/4\text{ is integer}\big]$. This is the nearest integer to $x$, if $\\{x\\}\neq\frac12$; otherwise it is the nearest even integer to $x$.

### 3.11

If $n$ is an integer in the interval, $\alpha\lt n\lt\beta$$\iff$$\lfloor\alpha\rfloor\lt n\lt\lceil\beta\rceil$. The number of such $n$'s is $(\beta-\alpha-1)$, which could be negative if $\alpha,\beta$ are integers and $\alpha=\beta$.

### 3.12

$$\begin{aligned}\left\lceil\frac nm\right\rceil&=\left\lfloor\frac{n+m-1}m\right\rfloor\\\\\left\lfloor\frac nm\right\rfloor+\left\lceil\frac{n\\,{\rm mod}\\,m}m\right\rceil&=\left\lfloor\frac nm\right\rfloor+\left\lfloor\frac{(m-1)+n\\,{\rm mod}\\,m}m\right\rfloor.\end{aligned}$$

Both sides are equal to $\left\lfloor\frac nm\right\rfloor+[n\\,{\rm mod}\\,m>0]$.

### 3.13

Use the definition of $N(\alpha,n)$, by $(3.14)$. We also have a useful property that $\lceil x\rceil-\lfloor x\rfloor=1$, if $x$ is irrational. Then

$$\begin{aligned}N(\alpha,n)+N(\beta,n)&=\left\lceil\frac{n+1}\alpha\right\rceil-1+\left\lceil\frac{n+1}\beta\right\rceil-1\\\\&=\left\lfloor\frac{n+1}\alpha\right\rfloor+\left\lfloor\frac{n+1}\beta\right\rfloor\\\\&=\frac{n+1}\alpha-\left\\{\frac{n+1}\alpha\right\\}+\frac{n+1}\beta-\left\\{\frac{n+1}\beta\right\\}\\\\&=n+1-\left\\{\frac{n+1}\alpha\right\\}-\left\\{\frac{n+1}\beta\right\\}.\end{aligned}$$

Since $\alpha,\beta$ are irrational, the last two terms are both non-zero; and they must add up to one. Finally

$$N(\alpha,n)+N(\beta,n)=n.$$

### 3.14

$$\begin{aligned}(x\\,{\rm mod}\\,ny)\\,{\rm mod}\\,y&=x-ny\left\lfloor\frac x{ny}\right\rfloor-y\left\lfloor\frac{x-ny\left\lfloor\frac x{ny}\right\rfloor}y\right\rfloor\\\\&=x-y\Bigg\lfloor\frac xy-n\left\lfloor\frac x{ny}\right\rfloor+n\left\lfloor\frac x{ny}\right\rfloor\Bigg\rfloor\\\\&=x-y\left\lfloor\frac xy\right\rfloor=x\\,{\rm mod}\\,y.\end{aligned}$$

### 3.15

$$\lceil mx\rceil=\lceil x\rceil+\left\lceil x-\frac1m\right\rceil+\cdots+\left\lceil x-\frac{m-1}m\right\rceil.$$

### 3.16

According to the explanation on Page 93, and $\gcd(n,3)=1$ if integer $n$ is not an integer multiple of $3$, the sequence of numbers

$$0\\,{\rm mod}\\,3,\\;n\\,{\rm mod}\\,3,\\;2n\\,{\rm mod}\\,3$$

must hit $1,2,3$ exactly once, respectively. So we have

$$\begin{aligned}n\\,{\rm mod}\\,3=0&\implies a+b+c=0;\\\\n\\,{\rm mod}\\,3=1&\implies a+b\omega+c\omega^2=1;\\\\n\\,{\rm mod}\\,3=2&\implies a+b\omega^2+c\omega=2.\end{aligned}$$

This gives

$$\begin{aligned}a&=1,\\\\b&=\frac12\left(-1+\frac i{\sqrt3}\right)=\frac13(\omega-1),\\\\c&=\frac12\left(-1-\frac i{\sqrt3}\right)=\frac{-1}3(\omega+2).\end{aligned}$$

Hence, $n\\,{\rm mod}\\,3=1+\frac13\big((\omega-1)\omega^n-(\omega+2)\omega^{2n}\big)$.

### 3.17

$$\begin{aligned}\sum_{0\leq k\lt m}\left\lfloor x+\frac km\right\rfloor&=\sum_{j,k\geq0}\left[1\leq j\leq x+\frac km\right][k\lt m]\\\\&=\sum_{j,k\geq0}\big[1\leq j\leq\lceil x\rceil\big]\big[m(j-x)\leq k\lt m\big]\\\\&=\sum_k\Big[m\big(\lceil x\rceil-x\big)\leq k\lt m\Big]+\sum_{j,k}\big[1\leq j\lt\lceil x\rceil\big][0\leq k\lt m]\\\\&=\lceil m\rceil-\Big\lceil m\big(\lceil x\rceil-x\big)\Big\rceil+m\big(\lceil x\rceil-1\big)\\\\&=-\lceil-mx\rceil=\lfloor mx\rfloor.\end{aligned}$$

## Homework exercises

### 3.19

$$\begin{aligned}&\big\lfloor\log_b\lfloor x\rfloor\big\rfloor=m\\\\&\iff m\leq\log_b\lfloor x\rfloor\lt m+1\\\\&\iff b^m\leq\lfloor x\rfloor\lt b^{m+1};\\\\\\\\&\lfloor\log_bx\rfloor=m\\\\&\iff m\leq\log_bx\lt m+1\\\\&\iff b^m\leq x\lt b^{m+1}.\end{aligned}$$

If and only if $b^m,b^{m+1}$ are integers, we have $b^m\leq\lfloor x\rfloor\lt b^{m+1}$$\iff$$b^m\leq x\lt b^{m+1}$. Since $m\geq0$, this happens only when $b$ is an integer.

### 3.20

$$\begin{aligned}\sum_kkx[\alpha\leq kx\leq\beta]&=x\sum_kk\left[\frac\alpha x\leq k\leq\frac\beta x\right]\\\\&=\frac12x\big(\left\lfloor\beta/x\right\rfloor+\left\lceil\alpha/x\right\rceil\big)\big(\left\lfloor\beta/x\right\rfloor-\left\lceil\alpha/x\right\rceil+1\big).\end{aligned}$$

### 3.21

(Note: ‘$\lg x$’ is binary logarithm, and ‘$\log x$’ is common logarithm.)

$$\begin{aligned}&\sum_{k,m}\big[10^k\leq2^m\lt2\cdot10^k\big][0\leq m\leq M]\\\\&\quad=\sum_{k,m}\big[\lg10^k\leq m\lt\lg2\cdot10^k\big][0\leq m\leq M]\\\\&\quad=\sum_{k,m}\Big[\left\lceil\lg10^k\right\rceil\leq m\lt\left\lceil\lg10^k\right\rceil+1\Big][0\leq m\leq M]\\\\&\quad=\sum_{k,m}\big[m=\lceil k\lg10\rceil\big][-1\lt m\leq M]\\\\&\quad=\sum_k[-\log2\lt k\leq M\log2]\\\\&\quad=1+\lfloor M\log2\rfloor.\end{aligned}$$

### 3.22

An integer $n$ can always be decomposed into $2^{k-1}q$, where $k,q$ are integers and $q$ is odd. Hence, only the $k$-th term in $S_{n-1}$ is one less than $S_n$. In other words, we have the recurrence

$$\begin{aligned}S_0&=0;\\\\S_n&=S_{n-1}+1,\quad\text{for $n\geq1$.}\end{aligned}$$

This implies $S_n=n$.

Likewise, only the $k$-th term in $T_{n-1}$ is $2^kq=2n$ less than $T_n$. We have the recurrence

$$\begin{aligned}T_0&=0;\\\\T_n&=T_{n-1}+2n,\quad\text{for $n\geq1$.}\end{aligned}$$

This implies $T_n=n(n+1)$.

### 3.23

The $n$-th element of the sequence equals to $m$, which gives

$$\begin{aligned}&\frac{m(m-1)}2\lt n\leq\frac{m(m+1)}2\\\\&\iff m^2-m\lt 2n\leq m^2+m\\\\&\iff m^2-m+\frac14\leq 2n\lt m^2+m+\frac14\\\\&\iff m-\frac12\leq\sqrt{2n}\lt m+\frac12\\\\&\iff m=\left\lfloor\sqrt{2n}+\frac12\right\rfloor.\end{aligned}$$

### 3.24

The number of times a non-negative integer occurs in ${\rm Spec}\big(\alpha/(\alpha+1)\big)$ is exactly one more than the number of times it occurs in ${\rm Spec}(\alpha)$. That's because

$$\begin{aligned}&N\big(\alpha/(\alpha+1),n\big)-N(\alpha,n)\\\\&\quad=\left\lceil(\alpha+1)\frac{n+1}\alpha\right\rceil-1-\left\lceil\frac{n+1}\alpha\right\rceil+1\\\\&\quad=n+1.\end{aligned}$$

### 3.25

If we could find an $m$ such that $K_m\leq m$, we could violate the stated inequality. But the existence of such an $m=n^\prime+1$ requires

$$K_{\lfloor n^\prime/2\rfloor}\leq\lfloor n^\prime/2\rfloor\quad\text{or}\quad K_{\lfloor n^\prime/3\rfloor}\leq\lfloor n^\prime/3\rfloor.$$

This goes down further and further, implying that $K_0\leq0$, which contradicts $K_0=1$. Hence, there's no such an $m$, and the inequality that $K_n>n$ stands.

### 3.26

$D_n^{(q)}$ is an auxiliary Josephus number that satisfies the recurrence

$$\begin{aligned}D_0^{(q)}&=1;\\\\D_n^{(q)}&=\left\lceil\frac q{q-1}D_{n-1}^{(q)}\right\rceil,\quad\text{for $n\geq0$.}\end{aligned}$$

Show that the auxiliary Josephus numbers satisfy

$$\left(\frac q{q-1}\right)^n\leq D_n^{(q)}\leq q\left(\frac q{q-1}\right)^n,\quad\text{for $n\geq0$.}$$

The left part is easy to prove. First, the basis $1\leq D_0^{(q)}$ stands when $n=0$; then

$$\begin{aligned}&\left(\frac q{q-1}\right)^{n-1}\leq D_{n-1}^{(q)}\\\\&\iff\left(\frac q{q-1}\right)^n\leq\frac q{q-1}D_{n-1}^{(q)}\\\\&\implies\left(\frac q{q-1}\right)^n\leq\left\lceil\frac q{q-1}D_{n-1}^{(q)}\right\rceil\\\\&\iff\left(\frac q{q-1}\right)^n\leq D_n^{(q)}.\end{aligned}$$

But the right part is a little tricky. Let's try to prove it directly, we would have

$$\begin{aligned}&D_{n-1}^{(q)}\leq q\left(\frac q{q-1}\right)^n\\\\&\iff\frac q{q-1}D_{n-1}^{(q)}\leq q\left(\frac q{q-1}\right)^{n+1}\end{aligned}$$

but no more, because there's no “space” left on the right-hand side for us to add a pair of ceiling on the left-hand side.

To proceed, we would have to subtract something from the right-hand side at the beginning. For example, we could subtract $q-1$ from the right-hand side and then prove the stronger hypothesis:

$$D_n^{(q)}\leq q\left(\frac q{q-1}\right)^n-q+1=(q-1)\left(\left(\frac q{q-1}\right)^{n+1}-1\right),\quad\text{for $n\geq0$.}$$

First, the basis $D_0^{(q)}\leq1$ stands when $n=0$; then

$$\begin{aligned}&D_{n-1}^{(q)}\leq(q-1)\left(\left(\frac q{q-1}\right)^n-1\right)\\\\&\iff\frac q{q-1}D_{n-1}^{(q)}\leq(q-1)\left(\left(\frac q{q-1}\right)^{n+1}-1\right)-1\\\\&\implies\left\lceil\frac q{q-1}D_{n-1}^{(q)}\right\rceil\lt(q-1)\left(\left(\frac q{q-1}\right)^{n+1}-1\right)\\\\&\iff D_n^{(q)}\lt(q-1)\left(\left(\frac q{q-1}\right)^{n+1}-1\right).\end{aligned}$$

Since the hypothesis is stronger than original, in other words, $(q-1)\left(\left(\frac q{q-1}\right)^{n+1}-1\right)\lt q\left(\frac q{q-1}\right)^n$, we have $D_n^{(q)}\leq q\left(\frac q{q-1}\right)^n$.

### 3.27

Any positive integer could be decomposed into $2^mb+a$, where integer $m\geq1$, positive integer $b$ is odd, and $a$ is $0$ or $1$. If $D_n^{(3)}=2^mb-a$, we can deduce that

$$\begin{aligned}&D_n^{(3)}=2^mb-a\\\\&\iff D_{n+m}^{(3)}=3^mb-a\\\\&\iff D_{n+m}^{(3)}=(3^mb-1)+(1-a)\\\\&\iff D_{n+m}^{(3)}=2^{m^\prime}b^\prime+(1-a).\end{aligned}$$

Then, we have a new version of the three original variables. Since $m^\prime\geq1$, we could push $D_n^{(3)}$ further and further with larger $n$’s. While we're proceeding with $D_n^{(3)}$, $a$ alters between $1$ and $0$ every iteration; since $2^mb$ is even, this causes $D_n^{(3)}$ to change between odd and even every iteration. Thus, infinitely many of the numbers $D_n^{(3)}$ are even, and that infinitely many are odd.

$\cdots\cdots$