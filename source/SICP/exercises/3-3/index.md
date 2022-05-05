---
title: 3.3 Modeling with Mutable Data
description: Solutions to exercises in SICP section 3.3 - Modeling with Mutable Data
canonical_url: https://duinomaker.top/SICP/exercises/3-3/
date: 2021-05-13 09:30:00
show_meta: true
widgets:
plugins:
    katex: true
content_style: serif
---

---

## Exercise 3.12

    (a b)
    (a b c d)

## Exercise 3.13

The programs will be caught in an infinite recursion.

## Exercise 3.14

    v
    (a)

    w
    (d c b a)

## Exercise 3.16

    p1->p2->p3
    (count-pairs p1)
    3

    p1->p2=>p3
    (count-pairs p1)
    4

    p1=>p2=>p3
    (count-pairs p1)
    7

in which `a->b` means `(define a (cons 'non-pair b))` and `a=>b` means `(define a (cons b b))`.

## Exercise 3.17

Maintain a local list of encountered pairs; only count a pair if it hasn’t been encountered.

    (define (count-pairs x)
      (let ((encountered-pairs '()))
        (define (encountered? p remaining-pairs)
          (if (null? remaining-pairs)
              false
              (if (eq? p (car remaining-pairs))
                  true
                  (encountered? p (cdr remaining-pairs)))))
        (define (count-unencountered-pairs y)
          (if (not (pair? y))
              0
              (+ (count-unencountered-pairs (car y))
                 (count-unencountered-pairs (cdr y))
                 (if (encountered? y encountered-pairs)
                     0
                     (begin (set! encountered-pairs
                                  (cons y encountered-pairs))
                            1)))))
        (count-unencountered-pairs x)))

## Exercises 3.18–3.19

I came up with this solution during a post-shower daze time, when creativity peaks (x. The idea is to have two sentinels running through the linked list at different speeds, for example, one takes one `cdr` at a time while the other takes two `cdr`’s. If one sentinel reaches the end, the linked list cannot have a loop; otherwise a sentinel chases the other inside a loop and will eventually “catch” the other. The program is given below.

    (define (has-loop? l)
      (define (scdr l)
        (if (pair? l)
            (cdr l)
            '()))
      (define (iter s1 s2)
        (cond ((or (null? s1) (null? s2)) false)
              ((eq? s1 s2) true)
              (else (iter (scdr s1) (scdr (scdr s2))))))
      (iter l (scdr l)))

## Exercise 3.21

    (define (print-queue queue)
      (display (front-ptr queue)))

## Exercise 3.22

    (define (make-queue)
      (let ((front-ptr '())
            (rear-ptr '()))
        (define (empty?)
          (null? front-ptr))
        (define (insert! item)
          (if (empty?)
            (let ((new-pair (list item)))
              (set! front-ptr new-pair)
              (set! rear-ptr new-pair))
            (let ((new-pair (list item)))
              (set-cdr! rear-ptr new-pair)
              (set! rear-ptr new-pair))))
        (define (get)
          (if (empty?)
              (error "ERROR")
              (car front-ptr)))
        (define (delete!)
          (let ((result (get)))
            (begin (set! front-ptr
                         (cdr front-ptr)))))
        (define (dispatch m)
          (cond ((eq? m 'empty?) empty?)
                ((eq? m 'insert!) insert!)
                ((eq? m 'delete!) delete!)
                ((eq? m 'get) get)))
        dispatch))

## Exercise 3.23

In order to delete the rear element of a deque and to be able to move the rear pointer backwards, I created a bi-directed structure `node` which, in contrast to ordinary list structure, also keep a record of its preceding node.

    (define (node prev item next)
      (cons item (cons prev next)))
    
    (define (prev-node node)
      (cadr node))
    
    (define (next-node node)
      (cddr node))
    
    (define (make-deque)
      (cons '() '()))
    
    (define (deque-empty? dq)
      (null? (car dq)))
    
    (define (deque-front dq)
      (if (deque-empty? dq)
          (error "ERROR - Accessing a member of an empty deque")
          (caar dq)))
    
    (define (deque-rear dq)
      (if (deque-empty? dq)
          (error "ERROR - Accessing a member of an empty deque")
          (cadr dq)))
    
    (define (deque-delete-front! dq)
      (if (deque-empty? dq)
          (error "ERROR - Deleting a member of an empty deque")
          (set-car! dq
                    (next-node (car dq)))))
    
    (define (deque-delete-rear! dq)
      (if (deque-empty? dq)
          (error "ERROR - Deleting a member of an empty deque")
          (set-cdr! dq
                    (prev-node (cdr dq)))))
    
    (define (deque-insert-front! dq item)
      (if (deque-empty? dq)
          (let ((new-node (node '() item '())))
            (set-car! dq new-node)
            (set-cdr! dq new-node))
          (let ((original-node (car dq)))
            (set-car! dq
                      (node '() item original-node))
            (set-cdr! (cdar dq)
                      original-node))))
    
    (define (deque-insert-rear! dq item)
      (if (deque-empty? dq)
          (let ((new-node (node '() item '())))
            (set-car! dq new-node)
            (set-cdr! dq new-node))
          (let ((original-node (cdr dq)))
            (set-cdr! dq
                      (node original-node item '()))
            (set-car! (cddr dq)
                      original-node))))

## Exercise 3.24

    (define (same-key? k1 k2)
      (cond ((and (number? k1) (number? k2))
             (< (abs (- k1 k2)) 0.00001))
            ((and (symbol? k1) (symbol? k2))
             (equal? k1 k2))
            (else false)))

## Exercise 3.25

To simplify the problem, I made the assumption that the users only index the table with key sequences of the same length.

    (define (make-table)
      (let ((local-table (list '*table*)))
        (define (lookup keys)
          (define (iter keys table)
            (if (null? keys)
                table
                (let ((subtable (assoc (car keys) table)))
                  (if subtable
                      (iter (cdr keys) (cdr subtable))
                      false))))
          (iter keys (cdr local-table)))
        (define (insert! keys value)
          (define (new-record keys value)
            (if (null? keys)
                value
                (list (cons (car keys)
                            (new-record (cdr keys) value)))))
          (define (iter keys table)
            (let ((subtable (assoc (car keys) table)))
              (if subtable
                  (if (null? (cdr keys))
                      (set-cdr! subtable
                                (cons (cons (car keys) value)
                                      (cdr subtable)))
                      (iter (cdr keys) (cdr subtable)))
                  (set-cdr! table
                            (cons (car (new-record keys value))
                                  (cdr table))))))
          (if (null? (cdr local-table))
              (set-cdr! local-table
                        (new-record keys value))
              (iter keys (cdr local-table))))
        (define (dispatch m)
          (cond ((eq? m 'lookup-proc) lookup)
                ((eq? m 'insert-proc!) insert!)
                (else (error "Unknown operation -- TABLE" m))))
        dispatch))

A simple example of using the table:

    (define t (make-table))
    ((t 'insert-proc!) '(1 3 5 7) 'odd)
    ((t 'insert-proc!) '(2 4 6 8) 'even)

    ((t 'lookup-proc) '(1 3 5 7))
    odd

    ((t 'lookup-proc) '(4 3 2 1))
    #f

## Exercise 3.26

Replace the lists of indices with binary trees of indices and `assoc` with binary trees’ `lookup`. In addition, create a procedure for comparing key sequences, like this one below.

    (define (key-less-than k1 k2)
      (cond ((null? k1) true)
            ((< (car k1) (car k2)) true)
            (else (key-less-than (cdr k1) (cdr k2)))))

## Exercise 3.27

Each `memo-fib` first calculates the first branch, then the second branch. When `(memo-fib n)` is called, it will calculate `(memo-fib n-1)`, then `(memo-fib n-2)`… until with `(memo-fib 1)`; after which, all `memo-fib` starts to calculate the second branch, that is, `(memo-fib 0)` until `(memo-fib n-2)`; each of them uses values that are already memorized and takes a constant number of steps; since there are $n$ `memo-fib` calls, `(memo-fib n)` runs in a number of steps proportional to $n$.

`(define memo-fib (memorize fib))` won’t work. In the call of `(memo-fib n)`, it calls the non-memorized version `fib`, which takes exponential time to evaluate.

## Exercise 3.28

    (define (or-gate a1 a2 output)
      (define (or-action-procedure)
        (let ((new-value
               (logical-or (get-signal a1) (get-signal a2))))
          (after-delay or-gate-delay
                       (lambda ()
                         (set-signal! output new-value)))))
      (add-action! a1 or-action-procedure)
      (add-action! a2 or-action-procedure)
      'ok)

## Exercise 3.29

    (define (or-gate a1 a2 output)
      (let ((s1 (make-wire))
            (s2 (make-wire))
            (s3 (make-wire)))
        (inverter a1 s1)
        (inverter a2 s2)
        (and-gate s1 s2 s3)
        (inverter s3 output)
        'ok))

## Exercise 3.30

    (define (ripple-carry-adder a b c-out sum)
      (let ((c-in (make-wire)))
        (if (null? a)
            (set-signal! c-out 0)
            (begin
             (ripple-carry-adder (cdr a) (cdr b) c-in (cdr sum))
             (full-adder (car a) (car b) c-in (car sum) c))))
      'ok)

> TODO

## Exercise 3.31

If the procedures are not immediately run, all wires will have $0$ as their `signal-value`, which would fail on the encounter of an inverter, which have different signal values on both ends. Take the half-adder in <a href="#fig-1">figure 1</a> as an example, when `A` changes from $0$ to $1$ while `B` keeps $0$ unchanged, the and-gate before `S` would produce $0$ rather than the expected result $1$, due to a failure of the inverter.

<figure class="image" id="fig-1">
<img src="https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/ch3-Z-G-25.gif" class="image illustration" alt="Fig 1: A half-adder circuit." />
</figure>

## Exercise 3.32

If the result of a logical gate depends on its inputs, it cannot produce the correct value before its inputs are correctly produced.

## Exercise 3.33

    (define (averager a b c)
      (define (process-new-value)
        (cond ((and (has-value? a) (has-value? b))
               (set-value! c
                           (/ (+ (get-value a) (get-value b)) 2)
                           me))
              ((and (has-value? a) (has-value? c))
               (set-value! b
                           (- (* (get-value c) 2) (get-value a))
                           me))
              ((and (has-value? b) (has-value? c))
               (set-value! a
                           (- (* (get-value c) 2) (get-value b))
                           me))))
      (define (process-forget-value)
        (forget-value! a me)
        (forget-value! b me)
        (forget-value! c me)
        (process-new-value))
      (define (me request)
        (cond ((eq? request 'I-have-a-value)
               (process-new-value))
              ((eq? request 'I-lost-my-value)
               (process-forget-value))
              (else
               (error "Unknown request -- AVERAGER" request))))
      (connect a me)
      (connect b me)
      (connect c me)
      me)

## Exercise 3.34

The multiplier requires values of two connectors to infer the value of the thrid connector. When connector `b` is set, the multiplier cannot infer the value of `a` from `b`.

## Exercise 3.35

Assume that if the connector `a` has a value, it is always non-negative.

    (define (squarer a b)
      (define (process-new-value)
        (if (has-value? b)
            (if (< (get-value b) 0)
                (error "square less than 0 -- SQUARER" (get-value b))
                (set-value! a (sqrt b) me))
            (if (has-value? a)
                (set-value! b (square a) me))))
      (define (process-forget-value)
        (forget-value! a me)
        (forget-value! b me))
      (define (me request)
        (cond ((eq? request 'I-have-a-value)
               (process-new-value))
              ((eq? request 'I-lost-my-value)
               (process-forget-value))
              (else
               (error "Unknown request -- SQUARER" request))))
      (connect a me)
      (connect b me)
      me)

## Exercise 3.37

    (define (c- x y)
      (let ((z (make-connector)))
        (adder x z y)
        z))
    
    (define (c* x y)
      (let ((z (make-connector)))
        (multiplier x y z)
        z))
    
    (define (c/ x y)
      (let ((z (make-connector)))
        (multiplier x z y)
        z))
    
    (define (cv value)
      (let ((z (make-connector)))
        (constant value z)
        z))