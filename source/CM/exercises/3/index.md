---
title: Chapter 3 Integer Functions
description: Solutions to exercises in Concrete Mathematics chapter 3 - Integer Functions
canonical_url: https://duinomaker.top/CM/exercises/3/
date: 2020-07-16 01:02:03
show_meta: true
widgets:
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

## <a href="https://cdn.jsdelivr.net/gh/duinomaker/HexoBlog@cf02697/source/images/CM/warmups_3.jpg" class="has-link-grey" style="text-decoration: underline;">Warmups</a>

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

$$\begin{aligned}(x\\,{\rm mod}\\,ny)\\,{\rm mod}\\,y&=x-ny\left\lfloor\frac x{ny}\right\rfloor-y\left\lfloor\frac{x-ny\left\lfloor\frac x{ny}\right\rfloor}y\right\rfloor\\\\&=x-y\left\lfloor\frac xy-n\left\lfloor\frac x{ny}\right\rfloor+n\left\lfloor\frac x{ny}\right\rfloor\right\rfloor\\\\&=x-y\left\lfloor\frac xy\right\rfloor=x\\,{\rm mod}\\,y.\end{aligned}$$

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

$\cdots\cdots$