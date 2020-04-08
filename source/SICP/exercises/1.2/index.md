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
          (+ (pascal (- row 1) col)
             (pascal (- row 1) (- col 1)))))

## Exercise 1.13

首先，从 Fibonacci 的定义开始：

$${\rm Fib}(n)={\rm Fib}(n-1)+{\rm Fib}(n-2)$$

若假设成立，则将 ${\rm Fib}(n)=\frac{\phi^n-\psi^n}{\sqrt5}$ 代入式中，得出：

$$\begin{eqnarray}\frac{(\phi^n-\psi^n)}{\sqrt5}=\frac{(\phi^{n-1}-\psi^{n-1})}{\sqrt5}+\frac{(\phi^{n-2}-\psi^{n-2})}{\sqrt5}\\\\\phi^n-\psi^n=\phi^n\left(\frac1\phi+\frac1{\phi^2}\right)-\psi^n\left(\frac1\psi+\frac1{\psi^2}\right)\end{eqnarray}$$

由 $\phi=\frac{1+\sqrt5}{2}$ 和 $\psi=\frac{1-\sqrt5}{2}$ 可知：

$$\frac1\phi+\frac1{\phi^2}=1,\\;\frac1\psi+\frac1{\psi^2}=1$$

代回上式，算式左右两边相等，所以假设成立。接下来将其拆开：

$${\rm Fib}(n)=\frac{(\phi^n-\psi^n)}{\sqrt5}=\frac{\phi^n}{\sqrt5}-\frac{\psi^n}{\sqrt5}$$

要证明 ${\rm Fib}(n)$ 是与 $\frac{\phi^n}{\sqrt5}$ 最接近的整数，需要证明 $\left|\frac{\psi^n}{\sqrt5}\right|<\frac1{2}$ 对于一切非负整数 $n$ 成立：

首先，归纳基础 $\left|\frac{\psi^0}{\sqrt5}\right|\approx0.447<\frac1{2}$ 成立。

假设 $\left|\frac{\psi^{n-1}}{\sqrt5}\right|<\frac1{2}$ 成立，而 $\left|\frac{\psi^n}{\sqrt5}\right|=\left|\frac{\psi^{n-1}}{\sqrt5}\right|\cdot|\psi|$。因为 $|\psi|<1$，所以 $\left|\frac{\psi^n}{\sqrt5}\right|<\left|\frac{\psi^{n-1}}{\sqrt5}\right|<\frac1{2}$。所以 $\left|\frac{\psi^n}{\sqrt5}\right|<\frac1{2}$ 对于一切非负整数 $n$ 成立。

所以 ${\rm Fib}(n)$ 是与 $\frac{\phi^n}{\sqrt5}$ 最接近的整数，证毕。