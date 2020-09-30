---
title: 数论习题
canonical_url: https://duinomaker.top/posts/number-theory-1/
date: 2020-09-30 23:58:28
categories: [Mathematics]
tags: [Number Theory]
widgets:
plugins:
    katex: true
content_style: katex-math
language: zh
---

最近学校在教“信息安全数学基础”这门课程, 目前讲到了数论的基础知识. 我选择了 Kenneth H. Rosen 著作的《初等数论及其应用》作为辅助教材, 阅读过程中理解了许多有趣的结论, 证明和习题.

<!-- more -->

---

接下来我将给出 “如果 $a,b$ 和 $c$ 为整数, 且 $c\mid ab$, 则 $c\mid(a,c)(b,c)$” 这一命题的证明, 因为书中所给的证明过程有误, 用到了 “若 $p^\alpha\mid c$, $p^\beta\mid c$, 则 $p^{\max(\alpha,\beta)}|c$” 这样的错误结论.

**定义.** 设 $p$ 为素数, $n$ 为正整数. 如果 $p^a\mid n$ 但是 $p^{a+1}\nmid n$, 我们称 $p^a$ *恰整除(exactly divides)* $n$, 记为 $p\\,\\|\\,n$. 由此定义, 还可以给出恰整除的另一种表示法: $p^a$ 恰整除 $n$ 当且仅当 $n=p^aQ$, 其中 $Q$ 是不能被 $p$ 整除的整数.

**引理 1.** 如果 $p^a\\,\\|\\,m$, $p^b\\,\\|\\,n$, 则 $p^{a+b}\\,\\|\\,mn$.
**证明.** 由恰整除的定义知, $m=p^aQ$, $n=p^bR$, 其中 $Q,R$ 为不能被 $p$ 整除的整数. 而 $mn=p^{a+b}QR$, 其中 $p\nmid QR$. 再次利用恰整除的定义得 $p^{a+b}\\,\\|\\,mn$.

**引理 2.** 如果 $p^a\\,\\|\\,m$, $p^b\\,\\|\\,n$, 则 $p^{\min(a,b)}\\,\\|\\,(m,n)$, 其中 $(m,n)$ 指 $m$ 与 $n$ 的最大公约数.
**证明.** 设 $p_1,p_2,\ldots,p_n$ 是出现在 $m$ 和 $n$ 的素幂因子分解中的素数. 则 $m,n$ 可表示为 $m=p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_r^{\alpha_r}$ 和 $n=p_1^{\beta_1}p_2^{\beta_2}\cdots p_r^{\beta_r}$. 不失一般性地以素因子 $p_1$ 为例, 由恰整除的定义得 $p_1^{\alpha_1}\\,\\|\\,m$ 和 $p_1^{\beta_1}\\,\\|\\,n$. 再由 $(m,n)=p_1^{\min(\alpha_1,\beta_1)}p_2^{\min(\alpha_2,\beta_2)}\cdots p_r^{\min(\alpha_r,\beta_r)}$ 观察到 $p_1^{\min(\alpha_1,\beta_1)}\\,\\|\\,(m,n)$.

**引理 3.** 若 $r,s,t$ 为非负整数, 且 $r\leq s+t$, 则 $r\leq\min(r,s)+\min(r,t)$.
**证明.** 分为以下四种情况讨论: 1) 若 $r\leq s$ 且 $r\leq t$, 则有 $r\leq 2r$ 成立. 2) 若 $r\gt s$ 且 $r\leq t$, 则有 $r\leq r+t$ 成立. 3) 若 $r\leq s$ 且 $r\gt t$, 则有 $r\leq s+r$ 成立. 4) 若 $r\gt s$ 且 $r\gt t$, 则有 $r\leq s+t$ 成立.

**定理.** 如果 $a,b$ 和 $c$ 为整数, 且 $c\mid ab$, 则 $c\mid(a,c)(b,c)$.
**证明.** 设 $p^r\\,\\|\\,c$, $p^s\\,\\|\\,a$ 和 $p^t\\,\\|\\,b$. 由 $p^r\\,\\|\\,c$ 和 $c\mid ab$ 得 $p^r\mid ab$. 由 $p^s\\,\\|\\,a$, $p^t\\,\\|\\,b$ 和引理 1得 $p^{s+t}\\,\\|\\,ab$. 故 $r\leq s+t$. 由引理 2得 $p^{\min(r,s)}\\,\\|\\,(a,c)$ 和 $p^{\min(r,t)}\\,\\|\\,(b,c)$. 再由引理 1得 $p^{\min(r,s)+\min(r,t)}\\,\\|\\,(a,c)(b,c)$. 由引理 3得 $r\leq\min(r,s)+\min(r,t)$, 故 $p^r\mid(a,c)(b,c)$.
&emsp;&emsp;如果 $c=p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_n^{\alpha_n}$ 是 $c$ 的素幂因子分解, 那么 $p_j^{\alpha_j}\mid(a,c)(b,c),\\;j=1,2,\ldots,n$. 我们想证明 $p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_i^{\alpha_i}\mid(a,c)(b,c)$ 成立. 利用数学归纳法, 归纳基础是 $p_1^{\alpha_1}\mid(a,c)(b,c)$, 且假设对于 $i=k-1$, 有 $p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_{k-1}^{\alpha_{k-1}}\mid(a,c)(b,c)$ 成立. 已知 $p_k^{\alpha_k}\mid(a,c)(b,c)$, 则由 $(p_k^{\alpha_k},p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_{k-1}^{\alpha_{k-1}})=1$, 可得出 $p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_k^{\alpha_k}\\,\\|\\,(a,c)(b,c)$, 即 $i=k$ 时命题成立. 从而 $i=n$ 时有 $p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_n^{\alpha_n}=c\mid(a,c)(b,c)$ 成立.

如上述证明过程有误, 或者有表述含糊的地方, 请不吝在评论区指出. 如对上述命题有更好的证明方法, 欢迎分享.