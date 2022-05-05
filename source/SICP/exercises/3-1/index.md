---
title: 3.1 Assignment and Local State
description: Solutions to exercises in SICP section 3.1 - Assignment and Local State
canonical_url: https://duinomaker.top/SICP/exercises/3-1/
date: 2021-04-30 19:30:00
show_meta: true
widgets:
content_style: serif
---

---

## Exercise 3.1

    (define (make-accumulator value)
      (lambda (num)
        (begin (set! value (+ value num))
               value)))

## Exercise 3.2

    (define (make-monitored f)
      (let ((counter 0))
        (lambda (arg)
          (if (eq? arg 'how-many-calls?)
              counter
              (begin (set! counter (inc counter))
                     (f arg))))))

## Exercise 3.3

    (define (make-account balance password)
      (lambda (given-password method)
        (if (eq? given-password password)
            (lambda (amount)
              (cond ((eq? method 'deposit)
                     (begin (set! balance (+ balance amount))
                            balance))
                    ((eq? method 'withdraw)
                     (if (< balance amount)
                         "Insufficient funds"
                         (begin (set! balance (- balance amount))
                                balance)))))
            (lambda (amount) "Incorrect password"))))

## Exercise 3.4

    (define (make-account balance password)
      (let ((incorrect-times 0))
        (lambda (given-password method)
          (if (eq? given-password password)
              (lambda (amount)
                (cond ((eq? method 'deposit)
                      (begin (set! balance (+ balance amount))
                              balance))
                      ((eq? method 'withdraw)
                      (if (< balance amount)
                          "Insufficient funds"
                          (begin (set! balance (- balance amount))
                                  balance)))))
              (begin (set! incorrect-times (inc incorrect-times))
                     (if (>= incorrect-times 7) (call-the-cops))
                     (lambda (amount) "Incorrect password"))))))

## Exercise 3.5

    (define (random-in-range low high)
      (+ (random (- high low)) low))
    
    (define (estimate-integral pred x1 x2 y1 y2 trials)
      (define (experiment)
        (pred (random-in-range x1 x2)
              (random-in-range y1 y2)))
      (let ((ratio (monte-carlo trials experiment)))
        (* ratio (- x2 x1) (- y2 y1))))
    
    (define (in-unit-circle? x y)
      (< (+ (* x x) (* y y)) 1.0))
    
    (define (estimate-pi)
      (estimate-integral in-unit-circle?
                         -1.0 1.0 -1.0 1.0
                         1000000)

## Exercise 3.6

    (define (rand action)
      (let ((x rand-init))
        (define (rand-generate)
          (set! x (rand-update x))
          x)
        (define (rand-reset new-random-init)
          (set! x new-rand-init))
        (cond ((eq? action 'generate)
               (rand-generate))
              ((eq? action 'reset)
               rand-reset))))))

## Exercise 3.7

Making no modifications to my solution to <a href="#Exercise-3-3">Exercise 3.3</a>, I wrote `make-joint` as a “wrap” around the original account, and if `joint-password` is correct, it will provide the original password.

    (define (make-joint account password joint-password)
      (lambda (given-password method)
        (if (eq? given-password joint-password)
            (account password method)
            (account given-password method))))

## Exercise 3.8

    (define (f-obj)
      (let ((last-x 0))
        (lambda (x)
          (let ((result last-x))
          (set! last-x x)
          result))))
    
    (define f (f-obj))