---
title: Chapter 2 Sums
canonical_url: https://duinomaker.top/CM/notes/2/
widgets:
comment:
article:
    highlight:
        clipboard: false
license: by-nc-sa
license_lang: en
---
<style>.has-math { font-family: KaTeX_Main, "Times New Roman", serif; }</style>
---

## 2.1 Notation

The summation of an explicit sequence denoted as a succession of additions like $a_1+a_2+\cdots+a_n$ can be written explicitly in the delimited form $\sum_{k=1}^na_k$&hairsp;, which is called Sigma-notation.

The quantity after $\sum$ is called the ***summand***; the index variable is said to be ***bound*** to the $\sum$ sign.

Sometimes it's tempting to write for example

$$\sum_{k=2}^{n-1}k(k-1)(n-k)\quad\text{instead of}\quad\sum_{k=0}^nk(k-1)(n-k)$$

to omit zero terms. But this kind of “simplification” makes the summation harder to understand. Zero terms are not harmful; it's always advantageous to keep upper and lower bounds as simple as possible.

---

## 2.2 Sums and Recurrences

To evaluate sums, we found a neat relation between sums and recurrences. The sum

$$S_n=\sum_{k=0}^na_k$$

is equivalent to the recurrence

$$\begin{aligned}S_0&=a_0\\,;\\\\S_n&=S_{n-1}+a_n\\,,\quad\text{for $n>0$}\\,.\end{aligned}$$

Therefore we can evaluate sums in closed form by using methods to solve recurrences in closed form, such as the repertoire method mentioned in Chapter 1.

By generalizing the Tower of Hanoi case, we have a technique that can reduce any recurrence of the form

$$a_nT_n=b_nT_{n-1}+c_n$$

to a sum, by multiplying both sides by a ***summation factor***, $s_n$&hairsp;, which is cleverly chosen to make $s_nb_n=s_{n-1}a_{n-1}$&hairsp;:

$$s_na_nT_n=s_{n-1}a_{n-1}T_{n-1}+s_nc_n\\,.$$

Hence ($s_0a_0=s_1b_1$)

$$T_n=\frac1{s_na_n}\left(s_1b_1T_0+\sum_{k=1}^ns_kc_k\right)\\,,$$

where $s_n=s_{n-1}\frac{a_{n-1}}{b_n}$ can be unfolded as

$$s_n=\frac{a_{n-1}a_{n-2}\cdots a_1}{b_nb_{n-1}\cdots b_2}\\,,$$

or any convenient constant multiple of this value. For example the Tower of Hanoi recurrence has $a_n=1$ and $b_n=2$&hairsp;; this method says that $s_n=2^{-n}$ is a good choice.

After solving the recurrence arises in the study of “quick-sort” algorithm, we encountered a frequently used quantity

$$H_n=1+\frac12+\cdots+\frac1n=\sum_{k=1}^n\frac1k\\,.$$

The letter $H$ stands for “harmonic”; $H_n$ is a ***harmonic number***.

---

## 2.3 Manipulation of Sums

$\cdots\cdots$