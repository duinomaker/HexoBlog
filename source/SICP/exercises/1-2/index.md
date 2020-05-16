---
title: 1.2 过程与它们所产生的计算
canonical_url: https://duinomaker.top/SICP/exercises/1-2/
widgets:
comment:
article:
    highlight:
        clipboard: false
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
$h(n)=2^{2^{2^{\cdot^{\cdot^\cdot}}}}(\text{共有}\\,n\\,\text{个}\\,2)$

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

$$\begin{aligned}\frac{\phi^n-\psi^n}{\sqrt5}=\frac{\phi^{n-1}-\psi^{n-1}}{\sqrt5}+\frac{\phi^{n-2}-\psi^{n-2}}{\sqrt5}\\\\\phi^n-\psi^n=\phi^n\left(\frac1\phi+\frac1{\phi^2}\right)-\psi^n\left(\frac1\psi+\frac1{\psi^2}\right)\end{aligned}$$

由 $\phi=\frac{1+\sqrt5}{2}$ 和 $\psi=\frac{1-\sqrt5}{2}$ 可知：

$$\frac1\phi+\frac1{\phi^2}=1,\\;\frac1\psi+\frac1{\psi^2}=1$$

代回上式，算式左右两边相等，所以假设成立。接下来将其拆开：

$$\begin{aligned}{\rm Fib}(n)=\frac{\phi^n-\psi^n}{\sqrt5}=\frac{\phi^n}{\sqrt5}-\frac{\psi^n}{\sqrt5}\\\\\frac{\phi^n}{\sqrt5}={\rm Fib}(n)+\frac{\psi^n}{\sqrt5}\end{aligned}$$

要证明 ${\rm Fib}(n)$ 是与 $\frac{\phi^n}{\sqrt5}$ 最接近的整数，只需证明 $\left|\frac{\psi^n}{\sqrt5}\right|<\frac1{2}$ 对于一切非负整数 $n$ 成立：

首先，归纳基础 $\left|\frac{\psi^0}{\sqrt5}\right|\approx0.447<\frac1{2}$ 成立。

假设 $\left|\frac{\psi^{n-1}}{\sqrt5}\right|<\frac1{2}$ 成立，而 $\left|\frac{\psi^n}{\sqrt5}\right|=\left|\frac{\psi^{n-1}}{\sqrt5}\right|\cdot|\psi|$&hairsp;。因为 $|\psi|<1$，所以 $\left|\frac{\psi^n}{\sqrt5}\right|<\left|\frac{\psi^{n-1}}{\sqrt5}\right|<\frac1{2}$&hairsp;。所以 $\left|\frac{\psi^n}{\sqrt5}\right|<\frac1{2}$ 对于一切非负整数 $n$ 成立。

所以 ${\rm Fib}(n)$ 是与 $\frac{\phi^n}{\sqrt5}$ 最接近的整数，证毕。

## Exercise 1.14

递归过程中只需要记录该节点之上的节点信息，所以需要的空间与调用树的最大深度成正比。

`(cc amount kinds)` 节点包含着种类数不变而零钱量减少某个常数的节点，其以下部分的最大深度显然与 `amount` 成正比，所以空间为 $\Theta(n)$&hairsp;。

考虑 `(cc n 0)` 的情况，由于是叶子节点，所需时间为 $\Theta(1)$&hairsp;；
再看 `(cc n 1)` 的情况，其下方有一条像链一样连接着的，从 `(cc (- n 1) 1)` 直至 `(cc 0 1)` 的 $n$ 个节点，而这些节点又额外地包含了一个形如 `(cc x 0)`&hairsp;、所需时间为 $\Theta(1)$ 的节点。所以这时的所需时间为 $\Theta(n)$&hairsp;；
接下来，`(cc n 2)`&hairsp;、`(cc n 3)` 等的情况，可以仿照 `(cc n 1)` 的情况来分析，`kinds` 每增加 $1$，所需时间就得 “乘上一个 $n$”。

综上所述，有 $k$ 种货币时，时间为 $\Theta(n^k)$&hairsp;。

## Exercise 1.15

a. `p` 被调用了 $5$ 次。
b. 空间增长为 $\Theta(\log n)$ 阶，时间增长也为 $\Theta(\log n)$ 阶。

## Exercide 1.16

    (define (fast-expt b n)
      (define (fast-expt-impl ans tmp m)
        (if (= m 0)
            ans
            (if (even? m)
                (fast-expt-impl ans (square tmp) (/ m 2))
                (fast-expt-impl (* ans tmp) tmp (- m 1)))))
      (fast-expt-impl 1 b n))

## Exercise 1.17

    (define (double x) (+ x x))
    (define (halve x) (/ x 2))
    
    (define (mul a b)
      (if (= b 0)
          0
          (if (even? b)
              (mul (double a) (halve b))
              (+ a (mul a (- b 1))))))

## Exercise 1.18

    (define (double x) (+ x x))
    (define (halve x) (/ x 2))

    (define (mul a b)
      (define (mul-impl ans tmp m)
        (if (= m 0)
            ans
            (if (even? m)
                (mul-impl ans (double tmp) (halve m))
                (mul-impl (+ ans tmp) tmp (- m 1)))))
      (mul-impl 0 a b))

## Exercise 1.19

    (define (fib n)
      (fib-iter 1 0 0 1 n))
    (define (fib-iter a b p q count)
      (cond ((= count 0) b)
            ((even? count)
             (fib-iter a
                       b
                       (+ (* p p) (* q q))
                       (+ (* q q) (* p q 2))
                       (/ count 2)))
            (else
             (fib-iter (+ (* b q) (* a q) (* a p))
                       (+ (* b p) (* a q))
                       p
                       q
                       (- count 1)))))

## Exercise 1.20

应用序求值

    (gcd 206 40)
    (gcd 40 (remainder 206 40))
    (gcd 6 (remainder 40 6))
    (gcd 4 (remainder 6 4))
    (gcd 2 (remainder 4 2))
    (gcd 2 0)
    2

`remainder` 一共被调用了 $4$ 次。

正则序求值

    (gcd 206 40)
    (if (= 40 0) ...)
    (gcd 40 (remainder 206 40))
    (if (= (remainder 206 40) 0) ...)
    (if (= 6 0) ...)
    (gcd (remainder 206 40) (remainder 40 (remainder 206 40)))
    (if (= (remainder 40 (remainder 206 40)) 0) ...)
    (if (= 4 0) ...)
    (gcd (remainder 40 (remainder 206 40)) (remainder (remainder 206 40) (remainder 40 (remainder 206 40))))
    (if (= (remainder (remainder 206 40) (remainder 40 (remainder 206 40))) 0) ...)
    (if (= 2 0) ...)
    (gcd (remainder (remainder 206 40) (remainder 40 (remainder 206 40))) (remainder (remainder 40 (remainder 206 40)) (remainder (remainder 206 40) (remainder 40 (remainder 206 40)))))
    (if (= (remainder (remainder 40 (remainder 206 40)) (remainder (remainder 206 40) (remainder 40 (remainder 206 40)))) 0) ...)
    (if (= 0 0) ...)
    (remainder (remainder 206 40) (remainder 40 (remainder 206 40)))
    2

`remainder` 一共被调用了 $18$ 次：$14$ 次用在条件判断中，$4$ 次用在最后的计算中。

正则序求值最后用于计算的调用次数，等于应用序求值的总调用次数。接下来只需要分析用于条件判断的调用次数。

将第 $n$ 条 `if` 表达式的条件部分中 `remainder` 的出现次数记作 $f(n)$，可以发现

$$\begin{aligned}f(0)&=0,\\;f(1)=1\\\\f(n)&=f(n-1)+f(n-2)+1\end{aligned}$$

稍加推导，可以发现

$$\begin{aligned}f(n)-f(n-1)&={\rm Fib}(n)\\\\f(n)&=\sum_{i=0}^n{\rm Fib}(i)\\\\f(n)&={\rm Fib}(n+2)-1\end{aligned}$$

设 `remainder` 在应用序求值中的总调用次数为 $n$，在正则序求值中的总调用次数为 ${\rm R}(n)$，可以得出

$$\begin{aligned}{\rm R}(n)&=n+\sum_{i=0}^nf(i)\\\\{\rm R}(n)&={\rm Fib}(n+4)-3\end{aligned}$$

本题中 ${\rm R}(4)=18$，由此可以看出正则序求值可能造成大量的冗余计算。

## Exercise 1.21

    199, 1999, 7

## Exercise 1.22

不得不吐槽书中的程序，实在不好用，所以自己重写了一个，正好后面几题也用得到：

    (define (report-time start-time) 
      (display (- (runtime) start-time))
      (newline))
    (define (conditional-time-report pred-proc p1)
      (define (timer start-time)
        (cond ((pred-proc p1) (report-time start-time) #t)
              (else #f)))
      (timer (runtime)))
    (define (search-for-primes num cnt)
      (if (> cnt 0)
          (if (conditional-time-report prime? num)
              (search-for-primes (+ num 2) (- cnt 1))
              (search-for-primes (+ num 2) cnt))))
    (search-for-primes <an odd number to start with> <how many prime numbers before stop>)

$n$ 每增加 $4$ 倍，运行时间大约增加 $2$ 倍，这可以粗略地验证该算法的增长阶为 $\Theta(\sqrt n)$&hairsp;。

## Exercise 1.23

时间大约是原来的一半多一些：一半因为要测试的数减少了约一半，多一些是因为一个额外的 `if` 语句。

## Exercise 1.24

增长得比预期更快。这是因为，基本操作的所需时间，会随着数字规模的增大而增加的。而这时，我们得出增长阶为 $\Theta(\log n)$ 的假设——基本操作需要常数时间——失效了。

## Exercise 1.25

对是对，但这样做会产生巨大的中间数，从而需要大量时间来处理大数。

## Exercise 1.26

用两次递归调用代替了原来的平方，现在的 `expmod` 呈现树形递归，计算树形递归的所需时间根据树高指数增长。这里树高为 $\log(n)$，那么增长阶为 $\Theta(e^{\log n})=\Theta(n)$&hairsp;。

## Exercise 1.27

    (define (full-fermat-test n)
      (define (test-it a)
        (= (expmod a n n) a))
      (define (test-impl m)
        (cond ((= m n) #t)
              ((test-it m) (test-impl (+ m 1)))
              (else #f)))
      (test-impl 1))
    (full-fermat-test 561)
    (full-fermat-test 1105)
    (full-fermat-test 1729)
    ...
    (prime? 561)
    (prime? 1105)
    (prime? 1729)
    ...

用 `prime?` 确定它们都不是素数，但 “骗过” 了所有费马测试。

## Exercise 1.28

这题有些难度，用到了一个结论：若存在 $1\lt a\lt n-1$，使得 $a^2\equiv 1\\;({\rm mod}\\;n)$ 成立，则 $n$ 不是素数。

证明这个结论，需要证明若 $n$ 是素数，则 $x_1=1,x_2=n-1$ 是 $x^2\equiv1\\;({\rm mod}\\;n)$ 仅有的两个解：

$$\begin{aligned}\begin{aligned}x^2&\equiv1\\;({\rm mod}\\;n)\\\\x^2-1&\equiv0\\;({\rm mod}\\;n)\\\\(x-1)(x+1)&\equiv0\\;({\rm mod}\\;n)\end{aligned}\\\\\begin{aligned}&\therefore n\mid(x-1)\\;\text{或}\\;n\mid(x+1)\\\\&\because n\\;\text{是素数}\\;\therefore(x-1)\\;\text{或}\\;(x+1)\\;\text{是}\\;n\\;\text{的倍数}\\\\&\therefore x_1=1,x_2=n-1\end{aligned}\end{aligned}$$

若 $1\lt a\lt n-1$ 是其解，则称 $a$ 为 $n$ 的 非平凡平方根$(nontrivial\\;square\\;root)$&hairsp;。若 $n$ 有非平凡平方根，则其不是素数。

这题用到了另一个技巧，修改了 `expmod` 过程，使其在找到非平凡平方根后返回 $0$&hairsp;。这样一来，一旦过程中出现非平凡平方根，整个 `expmod` 的值将是 $0$，便于之后的判断。为了理解这一点，我整理了<a href="/SICP/assets/miller-rabin/">${\rm Miller\text{-}Rabin}$素性测试的原理及实现</a>。

    (define (square x) (* x x))

    (define (miller-rabin-expmod base ex n)
      (define (squaremod-with-check x)
        (define (check squaremod-x)
          (if (and (= squaremod-x 1)
                   (not (= x 1))
                   (not (= x (- n 1))))
              0
              squaremod-x))
        (check (remainder (* x x) n)))
      (cond ((= ex 0) 1)
            ((even? ex)
             (squaremod-with-check (miller-rabin-expmod base (/ ex 2) n)))
            (else
             (remainder (* base (miller-rabin-expmod base (- ex 1) n)) n))))
    
    (define (miller-rabin-test n rounds)
      (define (test-it a)
        (define (test-impl expmod-a)
          (= expmod-a 1))
        (test-impl (miller-rabin-expmod a (- n 1) n)))
      (cond ((= rounds 0) #t)
            ((test-it (+ 1 (random (- n 1))))
             (miller-rabin-test n (- rounds 1)))
            (else #f)))