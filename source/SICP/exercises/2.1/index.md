---
title: 2.1 Introduction to Data Abstraction
canonical_url: https://duinomaker.top/SICP/exercises/2.1/
widgets:
comment:
license: by-nc-sa
lang: en
---

---

## Exercise 2.1

    (define (make-rat n d)
      (if (negative? d)
          (cons (- n) (- d))
          (cons n d)))

## Exercise 2.2

    (define (make-segment p1 p2) (cons p1 p2))
    (define (make-point x y) (cons x y))
    (define (start-segment s) (car s))
    (define (end-segment s) (cdr s))
    (define (x-point p) (car p))
    (define (y-point p) (cdr p))
    
    (define (midpoint-segment s)
      (let ((p1 (start-segment s))
            (p2 (end-segment s)))
        (make-point (/ (+ (x-point p1) (x-point p2)) 2)
                    (/ (+ (y-point p1) (y-point p2)) 2))))

## Exercise 2.3

Denote a rectangle with its size (i.e. width and height), and, in consideration for further extensibility, with its origin point and rotation.

    (define (make-rect width height origin rotation)
      (cons (make-size width height)
            (cons origin rotation)))
    (define (make-size width height) (cons width height))
    (define (get-size rect) (car rect))
    (define (size-width size) (car size))
    (define (size-height size) (cdr size))
    (define (perimeter rect)
      (let ((size (get-size rect)))
        (* (+ (size-width size) (size-height size)) 2)))
    (define (area rect)
      (let ((size (get-size rect)))
        (* (size-width size) (size-height size))))

## Exercise 2.4

    (define (cdr z)
      (z (lambda (p q) q)))

## Exercise 2.5

    (define (factor-out n factor)
      (define (iter n cnt)
        (if (= (remainder n factor) 0)
            (iter (/ n factor) (+ cnt 1))
            cnt))
      (iter n 0))
    
    (define (cons a b)
      (* (expt 2 a) (expt 3 b)))
    (define (car n)
      (factor-out n 2))
    (define (cdr n)
      (factor-out n 3))

## Exercise 2.6

    (define one
      (lambda (f) (lambda (x) (f x))))
    (define two
      (lambda (f) (lambda (x) (f (f x)))))
    (define (plus m n)
      (lambda (f) (lambda (x) ((m f) ((n f) x)))))

## Exercise 2.7

    (define (lower-bound intv) (car intv))
    (define (upper-bound intv) (cdr intv))

## Exercise 2.8

    (define (sub-interval x y)
      (make-interval (- (lower-bound x) (upper-bound y))
                     (- (upper-bound x) (lower-bound y))))

## Exercise 2.9

For addition and abstraction of two intervals $I_1$ and $I_2$&hairsp;, the width of the result is a function of the widths of the input, namely

$$\begin{aligned}2\cdot width&=[H(I_1)+H(I_2)]-[L(I_1)+L(I_2)]\\\\&=[H(I_1)-L(I_1)]+[H(I_2)-L(I_2)]\\\\&=width_1+width_2\\,,\end{aligned}$$

where $H(I)$ stands for `(upper-bound I)`, $L(I)$ stands for `(lower-bound I)`, and $width_1,width_2$ stands for the width of the two intervals, respectively.

But the equation above doesn't hold for a multiplication or a division. Presume that the width of the result was a function of the widths of the inputs, then multiplying different intervals with the same widths should give the same answer. But

    [4, 14] * [2, 4] = [8, 56]   (width = 48);
    [5, 15] * [1, 3] = [5, 45]   (width = 40).

Thus, the presumption turns out to be wrong.

## Exercise 2.10

    (define (div-interval x y)
      (if (<= (* (lower-bound y) (upper-bound y)) 0)
          (error "zero-spanned division error")
          (mul-interval x
                        (make-interval (/ 1.0 (upper-bound y))
                                       (/ 1.0 (lower-bound y))))))

## Exercise 2.11

The answer is WAY longer than the original version. Ben is very mean.

    (define (mul-interval x y)
      (let ((a (lower-bound x))
            (b (upper-bound x))
            (c (lower-bound y))
            (d (upper-bound y)))
        (if (< a 0)
            (if (< b 0)
                (if (< c 0)
                    (if (< d 0)
                        (make-interval (* b d) (* a c))
                        (make-interval (* a d) (* a c)))
                    (make-interval (* a d) (* b c)))
                (if (< c 0)
                    (if (< d 0)
                        (make-interval (* b c) (* a c))
                        (make-interval (min (* b c) (* a d))
                                       (max (* a c) (* b d))))
                    (make-interval (* a d) (* b d))))
            (if (< c 0)
                (if (< d 0)
                    (make-interval (* b c) (* a d))
                    (make-interval (* b c) (* b d)))
                (make-interval (* a c) (* b d))))))

## Exercise 2.12

    (define (make-center-percent c p)
      (make-center-width c (* c p 0.01)))
    
    (define (percent intv)
      (* (/ (width intv) (center intv)) 100.0))

## Exercise 2.13

The actual percentage tolerance is

$$\frac{w_1w_2(p_1+p_2)}{center}\\,,\quad\begin{aligned}&\text{where $w$ denotes width, $p$ denotes percentage tolerance}\\\\&\text{and $center$ denotes the center of the product interval.}\end{aligned}$$

Since the tolerance is small enough to ignore the discrepancy between $center$ and $w_1w_2$&hairsp;, the percentage tolerance is $p_1+p_2$ approximately. Thus, we have

    (define (prod-percent-approx a b)
      (+ (percent a) (percent b)))

## Exercises 2.14 ~ 2.16

All three problems point to the difficulty to introduce *“identity”* to interval arithmetic.

Suppose we have two numbers $A$ and $B$&hairsp;, which settles within intervals $I_A=[L_A,H_A]$ and $I_B=[L_B,H_B]$&hairsp;, respectively (assuming that all numbers are positive). Then we'll have

$$\frac{I_A}{I_B}=\left[\frac{L_A}{H_B},\frac{H_A}{L_B}\right]$$

under the definition of interval division. But when we try to divide an interval by itself, we'll get

$$\frac{I_A}{I_A}=\left[\frac{L_A}{H_A},\frac{H_A}{L_A}\right]$$

which is for most of the time not equal to $[1,1]$ which we might have expected.

The above example illustrates that, the re-appearance of an interval in an expression may well introduce uncertainty to the evaluation. This is because, we never know whether two intervals are related to the same number. In other words, intervals don't have *“identity”*&hairsp;.

Intervals don't have identity, but real numbers do. I have devised an approach to eliminate these uncertainties. That is, settle the numbers into their corresponding intervals *randomly* before evaluating the expression. After repeating the “settle-evaluate” loop for say $100,000$ times, we'll get a decent approximation to the actual interval.

My approach is inspired by the Monte-Carlo methods, which rely on repeated random sampling to obtain numerical results. The approach may be time-consuming since the evaluation has to be carried out a great many times before the approximation becomes precise enough. But it will always give the right answer.

Sample code written in Python is given below.

``` python random-sampling.py
import random

infty = float('inf')

class Interval(object):
    def __init__(self, lower, upper):
        self.lower = lower
        self.upper = upper

    def settle(self):
        return random.random() * (self.upper - self.lower) + self.lower

    @staticmethod
    def from_center_percent(center, percent):
        width = center * percent * 0.01
        return Interval(center - width, center + width)

    def __str__(self):
        return 'Interval(%.3f, %.3f)' % (self.lower, self.upper)


def evaluate(func, intervals, precision=100000):
    lower, upper = infty, -infty
    for _ in range(precision):
        val = func(*(i.settle() for i in intervals))
        if val < lower:
            lower = val
        if val > upper:
            upper = val
    return Interval(lower, upper)


if __name__ == '__main__':
    # These two functions accept two arguments,
    # which are values settled for each loop
    # within their corresponding interval.
    def func_1(a, b):
        return (a * b) / (a + b)

    def func_2(a, b):
        return 1.0 / (1.0 / a + 1.0 / b)

    I = Interval.from_center_percent
    intervals = [I(100, 5), I(10, 5)]

    print(evaluate(func_1, intervals))
    print(evaluate(func_2, intervals))
```

We know `par2` is the procedure which has its parameters appear only once in its body. So it have no issues with identity.

And in the random sampling approach, both `func_1` and `func_2` evaluate to the same answer, which is equal to the one produced by `par2`&hairsp;.