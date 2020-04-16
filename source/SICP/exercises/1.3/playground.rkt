#lang sicp

(define (sigma a b term next)
  (if (> a b)
      0
      (+ (term a) (sigma (next a) b term next))))
(define (pi-sum a b)
  (sigma a
         b
         (lambda (a) (/ 1.0 (* a (+ a 2))))
         (lambda (a) (+ a 4))))
(* 8 (pi-sum 1 100000000))