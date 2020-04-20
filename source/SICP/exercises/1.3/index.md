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

阻尼法所需的迭代步数更少。

## Exercise 1.37

    (define (cont-frac n d k)
      (define (frac-transform term k)
        (/ (n k) (+ (d k) term)))
      (define (rec i)
        (if (> i k)
            0.0
            (frac-transform (rec (+ i 1)) i)))
      (rec 1))
    
    (define (cont-frac-iter n d k)
      (define (frac-transform term k)
        (/ (n k) (+ (d k) term)))
      (define (iter result k)
        (if (= k 0)
            result
            (iter (frac-transform result k) (- k 1))))
      (iter 0.0 k))
    
    (cont-frac      (lambda (x) 1.0) (lambda (x) 1.0) 11)
    (cont-frac-iter (lambda (x) 1.0) (lambda (x) 1.0) 11)

为了达到 $4$ 位小数的精度，需要十几步计算。

## Exercise 1.38

    (define (approx-e k)
      (define (arr n)
        (let ((t (+ n 1)))
          (if (= (remainder t 3) 0)
              (* (/ t 3) 2.0)
              1.0)))
      (+ (cont-frac (lambda (x) 1.0) arr k) 2))
    
## Exercise 1.39

    (define (tan-cf x k)
      (let ((minus-x2 (- (* x x))))
        (define (n k) (if (= k 1) x minus-x2))
        (define (d k) (* (- (* k 2) 1) 1.0))
        (cont-frac n d k)))

## Exercise 1.40

    (define (cubic a b c)
      (lambda (x)
        (+ (* x x x) (* a x x) (* b x) c)))

## Exercise 1.41

  (define (double f)
    (lambda (x) (f (f x))))

  (((double (double double)) inc) 5)

输出了 $21$，因为 `inc` 外面嵌套了 $4$ 个 `double`，所以一共增加了 $2^4=16$ 次。

## Exercise 1.42

    (define (compose f g)
      (lambda (x) (f (g x))))

## Exercise 1.43

    (define (repeated f times)
      (lambda (x)
        (cond ((= times 0) x)
              ((even? times)
               ((double (repeated f (/ times 2))) x))
              (else
               ((compose f (repeated f (- times 1))) x)))))

## Exercise 1.44

    (define (n-fold f n dx)
      (define (smooth f)
        (lambda (x)
          (/ (+ (f (- x dx))
                (f x)
                (f (+ x dx)))
              3)))
      ((repeated smooth n) f))

## Exercise 1.45

    (define (log2-ceil n)
      (define (iter x ord)
        (if (< x n)
            (iter (* x 2) (+ ord 1))
            ord))
      (iter 1 0))
    
    (define (root-find n ord)
      (fixed-point-of-transform
        (lambda (x) (/ n (expt x (- ord 1))))
        (repeated average-damp
                  (log2-ceil ord))
        1.0))

计算 $n$ 次根号，需要将 `average-damp` 重复应用 $\lceil\log_2n\rceil$ 次。

## Exercise 1.46

    (define (iterative-improve good-enough? improve initial-guess)
      (define (iter guess)
        (let ((next (improve guess)))
          (if (good-enough? guess next)
              next
              (iter next))))
      (iter initial-guess))
    
    (define (good-enough? a b)
      (< (abs (- a b)) 0.00001))
    
    (define (sqrt n)
      (define (improve x)
        (/ (+ x (/ n x)) 2.0))
      (iterative-improve good-enough? improve 1.0))
    
    (define (fixed-point f guess)
      (iterative-improve good-enough? f guess))