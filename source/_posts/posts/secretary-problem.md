---
title: Secretary Problem
description: A partial solution to secretary problem using combination and various summation strategies
canonical_url: https://duinomaker.top/posts/secretary-problem/
date: 2020-07-13 22:51:43
categories: [Mathematics]
tags: []
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

“Imagine there are eight roses in your garden; you inspect them one-by-one randomly. Take the first three roses you encounter as sample and go on. Once you encounter a rose more beautiful than any of the first three roses, you pick it up and stop. How likely is it that the one you picked up is the most beautiful one?”

<!-- more -->

At the first sight of the problem, I thought that I could solve it using the methods learned from the second chapter of *Concrete Mathematics*, and I did managed to. In this post, I will generalize the problem above into the case of $N$ roses and $K$ worth of sample size, then show you how to derive the probability in a closed form, using combination and summation strategies.

---

Let's say that these roses have “beauty index” from $1$ through $N$, respectively, without duplication, and that $a_n$ is the beautifulness of the $n$-th rose you encounter. In this setup, ‘$N$’ is the most beautiful rose; if we will successfully pick up the most beautiful rose, the roses must follow

$$\overbrace{a_1\\;a_2\\;\ldots\\;a_K}^{\text{$K$ terms}}\\;\overbrace{a_{K+1}\\;\ldots\\;a_j}^{\text{$(j-K)$ terms}}\\;N\\;\overbrace{a_{j+2}\\;\ldots\\;a_N}^{\text{$(N-j-1)$ terms}},\quad\text{for $K\leq j\lt N$,}$$

where you pick up the $(j+1)$-th rose you inspect, which is also the most beautiful rose. In order for this to happen, all terms from $a_{K+1}$ through $a_j$ must be less than $k=\max(a_1,a_2,\ldots,a_K)$. There are $k$ terms that are $\leq K$, and $K$ of them are $a_1$ through $a_K$. Thus, there could be zero terms, all the way up to $(k-K)$ terms lying between ‘$a_K$’ and ‘$N$’, and $j$ is at most $k$.

That means, if $k=\max(a_1,a_2,\ldots,a_K)$, the probability that you pick up the right rose is $\sum_{j=K}^k\frac{(N-j-1)!(k-K)^{\underline{j-K}}}{(N-K)!}$. (Note that $n^{\underline k}$ can denote the number of permutations of $k$ elements out of $n$ elements.)

(This refers to the notation of *falling factorial powers*, defined by the rule $n^{\underline k}=n(n-1)\cdots(n-k+1)$. More of its properties are described in *Concrete Mathematics* Chapter 2, partially available in <a href="/CM/notes/2/#2-6-Finite-and-Inifinite-Calculus">my notes</a>.)

Alright, we will readily be able to evaluate the probability if we know how often $\max(a_1,a_2,\ldots,a_K)$ equals to a specific $k$; let the probability be $Q(k)$. What we do is randomly choosing $K$ roses out of $N$ roses, and the largest of them is $k$. It means that one of the choices must be the rose $k$, and the rest $(K-1)$ choices are made within $(k-1)$ roses that are less beautiful than the rose $k$. It's now easy to see that

$$\begin{aligned}Q(k)&=\frac{\binom{k-1}{K-1}}{\binom NK}\\\\&=\frac K{N^{\underline K}}(k-1)^{\underline{K-1}},\quad\text{for $k\geq K$.}\end{aligned}$$

To sum up all what was said above, let $P_{N,K}$ be the ultimate probability we're pursuing. We have

$$\begin{aligned}P_{N,K}&=\sum_{k=K}^{N-1}Q(k)\sum_{j=K}^k\frac{(N-j-1)!(k-K)^{\underline{j-K}}}{(N-K)!}\\\\&=\sum_{k=K}^{N-1}\frac K{N^{\underline K}}(k-1)^{\underline{K-1}}\sum_{j=K}^k\frac{(N-j-1)!(k-K)^{\underline{j-K}}}{(N-K)!}\\\\&=\frac K{N^{\underline K}(N-K)!}\sum_{k=K}^{N-1}\sum_{j=K}^k(N-j-1)!(k-1)^{\underline{K-1}}(k-K)^{\underline{j-K}}\\\\&=\frac K{N!}\sum_{k=K}^{N-1}\sum_{j=K}^k(N-j-1)!(k-1)^{\underline{K-1}}(k-K)^{\underline{j-K}}\\\\&=\frac K{N!}\sum_{k=K}^{N-1}\sum_{j=K}^k(N-j-1)!(k-1)^{\underline{j-1}}\\\\&=\frac K{N!}\sum_{K\leq k\lt N}\sum_{K\leq j\leq k}(N-j-1)!(k-1)^{\underline{j-1}}\\\\&=\frac K{N!}\sum_{K\leq j\lt N}\sum_{j\leq k\lt N}(N-j-1)!(k-1)^{\underline{j-1}}\\\\&=\frac K{N!}\sum_{K\leq j\lt N}(N-j-1)!\sum_{j\leq k\lt N}(k-1)^{\underline{j-1}}\\\\&=\frac K{N!}\sum_{K\leq j\lt N}(N-j-1)!\frac{(N-1)^{\underline j}-(j-1)^{\underline j}}j\\\\&=\frac K{N!}\sum_{K\leq j\lt N}\frac{(N-j-1)!(N-1)^{\underline j}}j\\\\&=\frac K{N!}\sum_{K\leq j\lt N}\frac{(N-1)!}j\\\\&=\frac{K(N-1)!}{N!}(H_{N-1}-H_{K-1})\\\\&=\frac KN(H_{N-1}-H_{K-1}).\end{aligned}$$

Some steps above are critical:

From line 6 to line 7, I changed the order of summations, in order that $(N-j-1)!$ could be factored out.

From line 8 to line 9, I used the rule

$$\sum_{a\leq n\lt b}x^{\underline m}=\frac{b^{\underline{m+1}}-a^{\underline{m+1}}}{m+1},\quad\text{for $m\neq-1$.}$$

In line 9, $(j-1)^{\underline j}=0$, due to the definition of falling factorial powers.

Back to our initial problem, we have $N=8$ and $K=3$; thus

$$\begin{aligned}P_{8,3}&=\frac38(H_7-H_2)\\\\&=\frac38\left(\frac13+\frac14+\frac15+\frac16+\frac17\right)\\\\&=\frac{459}{1120}.\end{aligned}$$

## Remarks

So far, I have derived means of evaluating the probability given $N$ and $K$. Further derivations such as methods of optimizing the probability is still under investigation.