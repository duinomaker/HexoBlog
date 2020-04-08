---
title: 1.2 过程与它们所产生的计算
canonical_url: https://duinomaker.top/SICP/exercises/1.2/
widgets:
comment:
license: by-nc-sa
---

---

## Exercise 1.9

情形一，递归计算

    (+ 4 5)
    (inc (+ (dec 4) 5))
    (inc (inc (+ (dec 3) 5)))
    (inc (inc (inc (+ (dec 2) 5))))
    (inc (inc (inc (inc (+ (dec 1) 5)))))
    (inc (inc (inc (inc (+ 0 5)))))
    (inc (inc (inc (inc 5))))
    (inc (inc (inc 6)))
    (inc (inc 7))
    (inc 8)
    9

情形二，迭代计算

    (+ 4 5)
    (+ 3 6)
    (+ 2 7)
    (+ 1 8)
    (+ 0 9)
    9

## Exercise 1.10

    1024, 65536, 65536

$f(n)=2n$
$g(n)=2^n$
$h(n)=2^{2^{2^{\cdot^{\cdot^\cdot}}}}$（共有 $n$ 个 $2$）

## Exercise 1.11

递归计算

    (define (f n)
      (if (< n 3)
           n
           (+ (f (- n 1))
              (f (- n 2))
              (f (- n 3)))))

迭代计算

    (define (f-iter n)
      (define (f-impl n a b c)
        (if (= n 0) 
            a
            (f-impl (- n 1) b c (+ a b c))))
      (f-impl n 0 1 2))

## Exercise 1.12

    (define (pascal row col)
      (if (or (= col 0) (= row col))
          1
          (+ (pascal (- row 1) (- col 1))
             (pascal (- row 1) col))))

## Exercise 1.13

首先，从 Fibonacci 的定义开始：

$${\rm Fib}(n)={\rm Fib}(n-1)+{\rm Fib}(n-2)$$

若假设成立，则将 ${\rm Fib}(n)=\frac{\phi^n-\psi^n}{\sqrt5}$ 代入式中，得出：

$$\begin{eqnarray}\frac{(\phi^n-\psi^n)}{\sqrt5}=\frac{(\phi^{n-1}-\psi^{n-1})}{\sqrt5}+\frac{(\phi^{n-2}-\psi^{n-2})}{\sqrt5}\\\\\phi^n-\psi^n=\phi^n\left(\frac1\phi+\frac1{\phi^2}\right)-\psi^n\left(\frac1\psi+\frac1{\psi^2}\right)\end{eqnarray}$$

由 $\phi=\frac{1+\sqrt5}{2}$ 和 $\psi=\frac{1-\sqrt5}{2}$ 可知：

$$\frac1\phi+\frac1{\phi^2}=1,\\;\frac1\psi+\frac1{\psi^2}=1$$

代回上式，算式左右两边相等，所以假设成立。接下来将其拆开：

$$\begin{eqnarray}{\rm Fib}(n)=\frac{\phi^n-\psi^n}{\sqrt5}=\frac{\phi^n}{\sqrt5}-\frac{\psi^n}{\sqrt5}\\\\\frac{\phi^n}{\sqrt5}={\rm Fib}(n)+\frac{\psi^n}{\sqrt5}\end{eqnarray}$$

要证明 ${\rm Fib}(n)$ 是与 $\frac{\phi^n}{\sqrt5}$ 最接近的整数，只需证明 $\left|\frac{\psi^n}{\sqrt5}\right|<\frac1{2}$ 对于一切非负整数 $n$ 成立：

首先，归纳基础 $\left|\frac{\psi^0}{\sqrt5}\right|\approx0.447<\frac1{2}$ 成立。

假设 $\left|\frac{\psi^{n-1}}{\sqrt5}\right|<\frac1{2}$ 成立，而 $\left|\frac{\psi^n}{\sqrt5}\right|=\left|\frac{\psi^{n-1}}{\sqrt5}\right|\cdot|\psi|$。因为 $|\psi|<1$，所以 $\left|\frac{\psi^n}{\sqrt5}\right|<\left|\frac{\psi^{n-1}}{\sqrt5}\right|<\frac1{2}$。所以 $\left|\frac{\psi^n}{\sqrt5}\right|<\frac1{2}$ 对于一切非负整数 $n$ 成立。

所以 ${\rm Fib}(n)$ 是与 $\frac{\phi^n}{\sqrt5}$ 最接近的整数，证毕。

## Exercise 1.14

递归过程中只需要记录该节点上方的部分，所以需要的空间与调用树的最大深度成正比。

`(cc amount kinds)` 节点包含着种类数不变而零钱量减少某个常数的节点，其以下部分的最大深度显然与 `amount` 成正比，所以空间为 $\Theta(n)$。

考虑 `(cc n 0)` 的情况，由于是叶子节点，所需时间为 $\Theta(1)$；
再看 `(cc n 1)` 的情况，其下方有一条像链一样连接着的，从 `(cc (- n 1) 1)` 直至 `(cc 0 1)` 的 $n$ 个节点，而这些节点又额外地包含了一个形如 `(cc x 0)` 、所需时间为 $\Theta(1)$ 的节点。所以这时的所需时间为 $\Theta(n)$；
接下来，`(cc n 2)`、`(cc n 3)` 等的情况，可以仿照 `(cc n 1)` 的情况来分析，`kinds` 每增加 `1`，所需时间就得 “乘上一个 $n$”。

总上所述，有 $k$ 种货币时，时间为 $\Theta(n^k)$。

## Exercise 1.15

a. `p` 被调用了 $5$ 次。
b. 空间增长为 $\Theta(\log n)$ 阶，时间增长为 $\Theta(\log n)$ 阶。