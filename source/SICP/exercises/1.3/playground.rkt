#lang sicp

(define (sum term a next b)
  (if (> a b)
      0
      (+ (term a) (sum term (next a) next b))))

(define (sum-iter term a next b)
  (define (iter a result)
    (if (> a b)
        result
        (iter (next a) (+ result (term a)))))
  (iter a 0))

(define (euler f a b dx)
  (define (inc x) (+ x dx))
  (define (term x) (* x dx))
  (* (sum f (+ a (/ dx 2)) inc b) dx))

(define (euler-iter f a b dx)
  (define (inc x) (+ x dx))
  (define (iter x result)
    (if (> x b)
        result
        (iter (inc x) (+ result (f x)))))
  (* (iter (+ a (/ dx 2)) 0.0) dx))

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

; (define (cube x) (* x x x))
; (euler cube 0.0 1.0 0.01)
; (euler-iter cube 0.0 1.0 0.01)
; (simpson cube 0.0 1.0 100)

; (define (square x) (* x x))

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
    (* (/ (* (+ 2 (* x 2)) (+ 4 (* x 2))) (square (+ 3 (* x 2)))) 1.0))
  (define (next x) (+ x 1))
  (* (product term 0 next n) 4))

; (pi-approx 5000)

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

(define (product-accumulate term a next b)
  (accumulate-iter * 1 term a next b))

(define (pi-approx-accumulate n)
  (define (term x)
    (* (/ (* (+ 2 (* x 2)) (+ 4 (* x 2))) (square (+ 3 (* x 2)))) 1.0))
  (define (next x) (+ x 1))
  (* (product-accumulate term 0 next n) 4))

; (pi-approx-accumulate 5000)

(define (filtered-accumulate predicate combiner null-value term a next b)
  (define (iter a result)
    (if (> a b)
        result
        (if (predicate a)
            (iter (next a) (combiner (term a) result))
            (iter (next a) result))))
  (iter a null-value))

(define (square x) (* x x))
(define (divides? a b) (= (remainder b a) 0))
(define (prime? n)
  (define (iter test-divisor)
    (cond ((> (square test-divisor) n) #t)
          ((divides? test-divisor n) #f)
          (else (iter (+ test-divisor 2)))))
  (cond ((= n 1) #f)
        ((= n 2) #t)
        ((even? n) #f)
        (else (iter 3))))

(define (gcd a b)
  (if (= b 0)
      a
      (gcd b (remainder a b))))
(define (coprime? a b)
  (= (gcd a b) 1))

(define (sum-primes a b)
  (define (next x) (+ x 1))
  (filtered-accumulate prime? + 0 square a next b))

(define (sum-coprime n)
  (define (coprime-with-n? x) (coprime? n x))
  (define (next x) (+ x 1))
  (define (self x) x)
  (filtered-accumulate coprime-with-n? + 0 self 1 next (- n 1)))

; (sum-coprime 12)

(define (average a b) (/ (+ a b) 2.0))
(define (close-enough? a b)
    (< (abs (- a b)) 0.000001))
(define (half-interval-method f neg-point pos-point)
  (let ((midpoint (average neg-point pos-point)))
    (if (close-enough? neg-point pos-point)
        midpoint
        (let ((test-value (f midpoint)))
          (cond ((positive? test-value)
                 (half-interval-method f neg-point midpoint))
                ((negative? test-value)
                 (half-interval-method f midpoint pos-point))
                (else midpoint))))))

; (half-interval-method (lambda (x) (- 2 (square x))) 0 2)

(define (fixed-point f guess times)
  (let ((next (f guess)))
    (cond ((close-enough? guess next)
           (display times) (newline)
           next)
          (else (fixed-point f next (+ times 1))))))
; (define (cbrt n)
;   (fixed-point (lambda (x) (/ n (square x))) 1.0))
; (define golden-ratio
;   (fixed-point (lambda (x) (+ 1.0 (/ 1.0 x))) 1.0))
(define (root-x-pow-x start-point)
  (fixed-point (lambda (x) (/ (log 1000) (log x))) start-point 0))
(root-x-pow-x 2.0)
(root-x-pow-x 10.0)

(define (root-x-pow-x-with-damping start-point damp)
  (define (damp-func x)
    (/ (+ (* (- damp 1) x)
          (/ (log 1000) (log x)))
       damp))
  (fixed-point damp-func start-point 0))
(root-x-pow-x-with-damping 3.0 1.6)
(root-x-pow-x-with-damping 100.0 1.6)