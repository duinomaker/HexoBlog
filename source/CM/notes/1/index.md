---
title: 第一章 递归问题
canonical_url: https://duinomaker.top/CM/notes/1/
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
---

---

这一章通过汉诺塔、线段分割平面、约瑟夫问题这三个问题引入了**递归问题**的概念。它们都用到递归的思想，即一定规模的问题的解取决于同一个问题更小规模的解。

为了解决这类问题，一般需要这些步骤：

1. 给问题中需要求解的量命名；
2. 探究小规模的问题，并尝试得到它们的解；
3. 找到所求量的数学表达式，并证明；
4. 如果可以，找到解的封闭形式，并证明。

在汉诺塔中，首先将需要求解的，将 $n$ 个盘转移到另一根柱的最少一定次数命名为 $T_n$，显然有 $T_0=0$ 成立。

接下来，观察到需要先移动 $n-1$ 个盘，再移动最底下的盘，最后再移动 $n-1$ 个盘。据此可以得到，移动 $2T_{n-1}+1$ 次就**足够**了，即 $T_n\leq2T_{n-1}+1$&hairsp;；为了得到等号，还需证明移动 $2T_{n-1}+1$ 次是**必须**的，即 $T_n\geq2T_{n-1}+1$，证明过程这里略过。

顺带一提，在线段分割平面问题中也是先找到上限&hairsp;$(L_n\leq L_{n-1}+n)$，再证明能够取到等号，有些像充分必要性的证明。

总之，这样一来，就得出了

$$\begin{aligned}T_0&=0\\,;\\\\T_n&=2T_{n-1}+1\\,,\quad\text{for}\\;n>0\\,.\end{aligned}$$

这样的式子叫做**递归式**&hairsp;(*recurrence*)，由**边界值**和**递归关系**组成。为了方便有时只写出递归关系，尽管完整的式子是包含边界值的。

**数学归纳法**是一个用于证明某个关于整数 $n$ 的关系式的正确性的一般方法。首先是证明该关系式对某个 $n_0$ 成立，作为**归纳基础**&hairsp;(*basis*)&hairsp;；接着，在假定该关系式对于 $n_0$ 到 $n-1$ 的一切整数都成立的基础上，证明该关系式对于整数 $n$ 也成立，这称为**归纳推理**&hairsp;(*induction*)&hairsp;。

**封闭形式**的式子中，只包含 “经典的” 运算，加减乘除、乘方、阶乘等。例如 $1+2+\cdots+n$ 不是封闭形式，因为它用 “$\cdots$” 作弊；而 $n(n+1)/2$&hairsp;、$2^n-1$ 等都是封闭形式。

在推广约瑟夫问题时，我们需要求解

$$\begin{aligned}f(1)&=\alpha\\,;\\\\f(2n)&=2f(n)+\beta\\,,\quad\text{for}\\;n\geq1\\,;\\\\f(2n+1)&=2f(n)+\gamma\\,,\quad\text{for}\\;n\geq1\\,.\end{aligned}$$

可以将上式的解表示为 $f(n)=A(n)\alpha+B(n)\beta+C(n)\gamma\\,.\quad(*)$

于是我们引入**成套方法**&hairsp;(*repertoire method*)，它的本质是求解线性方程组。首先求出某些特殊情况的解，等攒够了特殊情况（有多少个未知函数就需要多少个特殊情况），再代入原式求解。

还是刚才的例子，选取这些特殊情况，分别是

$$\begin{aligned}(\alpha,\beta,\gamma)\to(1,0,0)&\implies A(n)=2^m\\,;\\\\f(n)=1&\implies(\alpha,\beta,\gamma)\to(1,-1,-1)\\,;\\\\f(n)=n&\implies(\alpha,\beta,\gamma)\to(1,0,1)\\,.\end{aligned}$$

代入 $(*)$ 式可得到

$$\begin{aligned}A(n)&=2^m\\,,\quad\text{where}\\;n=2^m+l\\;\text{and}\\;0\leq l<2^m\\,;\\\\A(n)-B(n)-C(n)&=1\\,;\\\\A(n)+C(n)&=n\\,.\end{aligned}$$

求出 $A(n)$&hairsp;、$B(n)$&hairsp;、$C(n)$ 后代入 $(*)$ 式，即可得解。