---
title: 1.3 用高阶函数做抽象
canonical_url: https://duinomaker.top/SICP/exercises/1.3/
widgets:
comment:
article:
    highlight:
        clipboard: false
license: by-nc-sa
---

---

## Exercise 1.29

为了避免 `h` 被重复求值多次，我在最外层定义了一个 `h-equals`，也就是将已经求出的值绑定给了 `h`&hairsp;。这就有点像赋值操作了，而函数式编程范式一个重要的特点却是 “无状态性”。是不是偏离了原本的意图呢？有些费解。

    (define (simpson f a b n)
      (define (h-equals h)
        (define (term k)
          (define (coef k)
            (cond ((or (= k 0) (= k n)) 1)
                  ((even? k) 2)
                  (else 4)))
          (* (coef k) (f (+ a (* k h)))))
        (define (next k) (+ k 1))
        (* (sum term 0 next n) (/ h 3)))
      (h-equals (/ (- b a) n)))

## Exercise 1.30

    (define (sum term a next b)
      (define (iter a result)
        (if (> a b)
            result
            (iter (next a) (+ result (term a)))))
      (iter a 0))

## Exercise 1.31

这里为了方便，`pi-approx` 将两项合并为一项来计算了，大概不算犯规吧。
    
    (define (square x) (* x x))
    
    (define (product term a next b)
      (define (iter a result)
        (if (> a b)
            result
            (iter (next a) (* result (term a)))))
      (iter a 1))
    
    (define (factorial n)
      (define (self x) x)
      (define (next x) (+ x 1))
      (product self 1 next n))
    
    (define (pi-approx n)
      (define (term x)
        (* (/ (* (+ 2 (* x 2)) (+ 4 (* x 2))) 
              (square (+ 3 (* x 2))))
           1.0))
      (define (next x) (+ x 1))
      (* (product term 0 next n) 4))

## Exercise 1.32

    (define (accumulate combiner null-value term a next b)
      (if (> a b)
          null-value
          (combiner (term a)
                    (accumulate combiner null-value term (next a) next b))))
    
    (define (accumulate-iter combiner null-value term a next b)
      (define (iter a result)
        (if (> a b)
            result
            (iter (next a) (combiner (term a) result))))
      (iter a null-value))

## Exercise 1.33

    (define (filtered-accumulate filter combiner null-value term a next b)
      (define (iter a result)
        (if (> a b)
            result
            (if (filter a)
                (iter (next a) (combiner (term a) result))
                (iter (next a) result))))
      (iter a null-value))
    
    (define (coprime? a b)
      (= (gcd a b) 1))
    
    (define (sum-primes a b)
      (define (next x) (+ x 1))
      (filtered-accumulate prime? + 0 square a next b))
    
    (define (sum-coprimes n)
      (define (coprime-with-n? x) (coprime? n x))
      (define (next x) (+ x 1))
      (define (self x) x)
      (filtered-accumulate coprime-with-n? + 0 self 1 next (- n 1)))

## Exercise 1.34

演变过程是这样的：

    (f f)
    (f 2)
    (2 2)

对 `(2 2)` 求值就会出错，本来应该放置过程的位置是 `2`，而它不是一个过程。

## Exercise 1.35

    (define golden-ratio
      (fixed-point (lambda (x) (+ 1.0 (/ 1.0 x))) 1.0))

正确地逼近了黄金分割比例的值。

## Exercise 1.36

阻尼法所需的迭代步数更少。
    
    (define (root-x-pow-x start-point)
      (fixed-point (lambda (x) (/ (log 1000) (log x))) start-point 0))
    
    (define (root-x-pow-x-with-damp start-point)
      (define (damp-func x)
        (/ (+ x (/ (log 1000) (log x))) 2.0))
      (fixed-point damp-func start-point 0))
    
    (root-x-pow-x 3.0)
    (root-x-pow-x 10.0)
    (root-x-pow-x-with-damp 3.0)
    (root-x-pow-x-with-damp 10.0)

## Exercise 1.37

