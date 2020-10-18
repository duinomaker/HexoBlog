---
title: 初等数论习题
canonical_url: https://duinomaker.top/posts/elementary-number-theory-exercises/
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

<p style="text-align: right;">最后更新于 2020年10月18日</p>

<!-- more -->

### 目录

1.&nbsp;<a href="#section-01">“如果 $a,b$ 和 $c$ 为整数, 且 $c\mid ab$, 则 $c\mid(a,c)(b,c)$”</a>
2.&nbsp;<a href="#section-02">多元线性同余方程解的个数</a>

---

<h2 id="section-01">“如果 $a,b$ 和 $c$ 为整数, 且 $c\mid ab$, 则 $c\mid(a,c)(b,c)$”</h2>

对于课后习题中的这个命题, 参考书<span class="serif"><sup>[<a href="#cite-1">1</a>]</sup></span>中所给的证明过程有误, 用到了 “若 $p^\alpha\mid c$, $p^\beta\mid c$, 则 $p^{\max(\alpha,\beta)}\mid c$” 这样的错误结论. 接下来我将给出一种正确的证明过程.

**定义.** 设 $p$ 为素数, $n$ 为正整数. 如果 $p^a\mid n$ 但是 $p^{a+1}\nmid n$, 我们称 $p^a$ *恰整除(exactly divides)* $n$, 记为 $p\\,\\|\\,n$. 由此定义, 还可以给出恰整除的另一种表示法: $p^a$ 恰整除 $n$ 当且仅当 $n=p^aQ$, 其中 $Q$ 是不能被 $p$ 整除的整数.

**引理 1.** 设 $p$ 为素数, $a,b$ 为整数. 如果 $p^a\\,\\|\\,m$, $p^b\\,\\|\\,n$, 则 $p^{a+b}\\,\\|\\,mn$.
**证明.** 由恰整除的定义知, $m=p^aQ$, $n=p^bR$, 其中 $Q,R$ 为不能被 $p$ 整除的整数. 而 $mn=p^{a+b}QR$, 其中 $p\nmid QR$. 再次利用恰整除的定义得 $p^{a+b}\\,\\|\\,mn$. <span class="qed"></span>

**引理 2.** 设 $p$ 为素数, $a,b,m,n$ 为整数. 如果 $p^a\\,\\|\\,m$, $p^b\\,\\|\\,n$, 则 $p^{\min(a,b)}\\,\\|\\,(m,n)$.
**证明.** 设 $p_1,p_2,\ldots,p_n$ 是出现在 $m$ 和 $n$ 的素幂因子分解中的素数. 则 $m,n$ 可表示为 $m=p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_r^{\alpha_r}$ 和 $n=p_1^{\beta_1}p_2^{\beta_2}\cdots p_r^{\beta_r}$. 不失一般性地以素因子 $p_1$ 为例, 由恰整除的定义得 $p_1^{\alpha_1}\\,\\|\\,m$ 和 $p_1^{\beta_1}\\,\\|\\,n$. 再由 $(m,n)=p_1^{\min(\alpha_1,\beta_1)}$&#8203;$p_2^{\min(\alpha_2,\beta_2)}\cdots p_r^{\min(\alpha_r,\beta_r)}$ 观察到 $p_1^{\min(\alpha_1,\beta_1)}\\,\\|\\,(m,n)$. <span class="qed"></span>

**引理 3.** 若 $r,s,t$ 为非负整数, 且 $r\leq s+t$, 则 $r\leq\min(r,s)+\min(r,t)$.
**证明.** 分为以下四种情况讨论: 1) 若 $r\leq s$ 且 $r\leq t$, 则有 $r\leq 2r$ 成立. 2) 若 $r\gt s$ 且 $r\leq t$, 则有 $r\leq s+r$ 成立. 3) 若 $r\leq s$ 且 $r\gt t$, 则有 $r\leq r+t$ 成立. 4) 若 $r\gt s$ 且 $r\gt t$, 则有 $r\leq s+t$ 成立. <span class="qed"></span>

有了以上定义和引理, 我们可以开始证明原命题.

**定理.** 如果 $a,b$ 和 $c$ 为整数, 且 $c\mid ab$, 则 $c\mid(a,c)(b,c)$.
**证明.** 设 $p^r\\,\\|\\,c$, $p^s\\,\\|\\,a$ 和 $p^t\\,\\|\\,b$. 由 $p^r\\,\\|\\,c$ 和 $c\mid ab$ 得 $p^r\mid ab$. 由 $p^s\\,\\|\\,a$, $p^t\\,\\|\\,b$ 和引理 1 得 $p^{s+t}\\,\\|\\,ab$. 故 $r\leq s+t$. 由引理 2 得 $p^{\min(r,s)}\\,\\|\\,(a,c)$ 和 $p^{\min(r,t)}\\,\\|\\,(b,c)$. 再由引理 1 得 $p^{\min(r,s)+\min(r,t)}\\,\\|\\,(a,c)(b,c)$. 由引理 3 得 $r\leq\min(r,s)+\min(r,t)$, 故 $p^r\mid(a,c)(b,c)$.

通过上述推理, 如果 $c=p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_n^{\alpha_n}$ 是 $c$ 的素幂因子分解, 那么 $p_j^{\alpha_j}\mid(a,c)(b,c),\\;j=1,2,\ldots,n$. 我们想证明 $p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_i^{\alpha_i}\mid(a,c)(b,c)$ 成立. 利用数学归纳法, 当 $i=1$ 时, 有归纳基础 $p_1^{\alpha_1}\mid(a,c)(b,c)$ 成立. 假设对于 $i=k-1$, 有 $p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_{k-1}^{\alpha_{k-1}}\mid(a,c)(b,c)$ 成立. 已知 $p_k^{\alpha_k}\mid(a,c)(b,c)$, 则由 $(p_k^{\alpha_k},p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_{k-1}^{\alpha_{k-1}})=1$, 可得出 $p_k^{\alpha_k}\cdot p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_{k-1}^{\alpha_{k-1}}=$ $p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_k^{\alpha_k}\mid(a,c)(b,c)$, 即 $i=k$ 时命题成立. 从而 $i=n$ 时有 $p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_n^{\alpha_n}=c\mid(a,c)(b,c)$ 成立. <span class="qed"></span>

---

<h2 id="section-02">多元线性同余方程解的个数</h2>

**定理.** 设 $a,b,c$ 和 $m$ 是整数, $m>0$ 且 $d=(a,b,m)$. 那么二元线性同余方程 $ax+by\equiv c\pmod m$ 在 $d\mid c$ 时恰有 $dm$ 个不同余的解, 其他情形无解.
**证明.** 若 $ax+by\equiv c\pmod m$, 那么存在整数 $k$, 使得 $ax+by-mk=c$. 因为 $d$ 是 $a,b,m$ 的公因数, 故 $d\mid ax+by-mk$, 进而 $d\mid c$. 所以若 $d\nmid c$, 那么该同余式无解.

现在假设同余式有解, 即 $d\mid c$. 令 $a=da^\prime$, $b=db^\prime$, $c=dc^\prime$, $e=de^\prime$. 那么 $(a^\prime,b^\prime,m^\prime)=1$, 我们可以将同余式除以 $m^\prime$, 得到

$$a^\prime x+b^\prime y\equiv c^\prime\pmod{m^\prime}\qquad\text{或者}\qquad a^\prime x\equiv c^\prime-b^\prime y\pmod{m^\prime}\tag{$*$}$$

该同余式有解, 当且仅当 $g=(a^\prime,m^\prime)\mid c^\prime-b^\prime y$, 这相当于同余式 $b^\prime y\equiv c^\prime\pmod g$ 有解. 这必然成立, 因为 $(b^\prime,g)=(b^\prime,a^\prime,m^\prime)=1$, 表示该同余式恰有一个解, 我们将其记作 $y_0$. 注意到, 数列 $y_0,y_0+g,y_0+2g,$&thinsp;$\ldots,y_0+(m^\prime/g-1)g$ 中的元素关于 $g$ 都同余, 但是关于 $m^\prime$ 都不同余, 也就是说这 $m^\prime/g$ 个数中的的每一个都会在 $(\*)$ 式中得到模 $m^\prime$ 不同余的 $c^\prime-b^\prime y$. 而这每个不同余的 $c^\prime-b^\prime y$ 都可以得出 $(\*)$ 式的 $g$ 个不同余的解. 所以 $(\*)$ 式共有 $(m^\prime/g)g=m^\prime$ 个不同余的解.

现在假设 $(x_1,y_1)$ 是原同余式的一组解. 类似地, 注意到数列 $x_1,x_1+m^\prime,x_1+2m^\prime$&thinsp;$\ldots,x_1+(d-1)m^\prime$ 中的 $d$ 个数关于 $m^\prime$ 都同余, 关于 $m$ 都不同余; 数列 $y_1,y_1+m^\prime,x_y+2m^\prime$&thinsp;$\ldots,y_1+(d-1)m^\prime$ 中的 $d$ 个数关于 $m^\prime$ 都同余, 关于 $m$ 都不同余. 所以对于 $(\*)$ 式中的每一个解, 都能在原同余式中生成 $d^2$ 个解. 由于 $(\*)$ 式共有 $m^\prime$ 个解, 我们得出原同余式共有 $d^2m^\prime=dm$ 个解. <span class="qed"></span>

如上述各命题的证明过程有误, 或者有表述含糊的地方, 请不吝在评论区指出. 如有更好的证明方法, 欢迎分享.

<h2 class="serif" style="text-align:center;">References</h2>

<p id="cite-1" class="serif">[1] Kenneth H. Rosen, <em>Instructor's Solutions Manual for Elementary Number Theory and Its Applications, 6th ed</em>, p. 57, 3.5.40, 2011, <a href="https://epdf.pub/instructors-solutions-manual-for-elementary-number-theory-and-its-applications-6.html" target="_blank">https://epdf.pub/instructors-solutions-manual-for-elementary-number-theory-and-its-applications-6.html</a>.</p>
