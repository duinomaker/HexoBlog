---
title: 1.1 程序设计的基本元素
canonical_url: https://duinomaker.top/SICP/exercises/1.1/
widgets:
comment:
plugins:
article:
    highlight:
        clipboard: false
license: by-nc-sa
---

---

## Exercise 1.1

    10, 12, 8, 3, 6, a, b, 19, #f, 4, 16, 6, 16

## Exercise 1.2

    (/ (+ 5
          4
          (- 2
             (- 3
                (+ 6 (/ 4 5)))))
       (* 3
          (- 6 2)
          (- 2 7)))

## Exercise 1.3

    (define (square a) (* a a))
    (define (square-sum a b) (+ (square a) (square b)))
    (define (square-sum-of-two-larger-numbers a b c)
      (cond ((not (or (> a b) (> a c))) (square-sum b c))
            ((not (or (> b a) (> b c))) (square-sum a c))
            (else (square-sum a b))))

## Exercise 1.4

若 `b` 为正数，求出 `(+ a b)` 的值，否则求出 `(- a b)` 的值。

## Exercise 1.5

正则序求值：

    (test 0 (p))
    (if (= 0 0) 0 (p))
    0

应用序求值：

    (test 0 (p))
    (if (= 0 0) 0 (p))
    (if (= 0 0) 0 (p))
    (if (= 0 0) 0 (p))
    ...

应用序求值时，先要展开所有表达式。表达式 `(p)` 展开后仍是 `(p)`，所以应用序求值的方式无法对该式求值。

## Exercise 1.6

求不出表达式的值。`new-if` 不是特殊形式，意味着它是一个一般的过程，使用应用序求值。`sqrt-iter` 过程展开后永远包含另一个 `sqrt-iter` 过程，编译器会无休止地将展开重复下去。

## Exercise 1.7

例如 `(sqrt 0.00000001)` 应当算出 $0.0001$，实际得到的是 $0.031250$ 左右，但是符合 `good-enough?` 的条件；再比如 `(sqrt 20000000000000000)`，估值一直停留在 $141421356.237309$ 左右，足够精确却达不到 `good-enough?` 的条件。

将 `good-enough?` 的定义改为以下，可以改进程序：

    (define (good-enough? guess x)
      (< (abs (- (square guess) x))
         (* guess 0.001)))

## Exercise 1.8

    (define (cube x) (* x x x))
    (define (good-enuf? guess x)
      (< (abs (- (cube guess) x))
         (* guess 0.001)))
    (define (improve guess x)
      (/ (+ (/ x (* guess guess)) 
            (* guess 2)) 
          3))
    (define (cbrt-iter guess x)
      (if (good-enuf? guess x)
          guess
          (cbrt-iter (improve guess x)
                     x)))
    (define (cbrt x) (cbrt-iter 1.0 x))

