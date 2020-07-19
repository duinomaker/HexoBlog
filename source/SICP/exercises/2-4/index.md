---
title: 2.4 Multiple Representations for Abstract Data
description: Solutions to exercises in SICP section 2.4 - Multiple Representations for Abstract Data
canonical_url: https://duinomaker.top/SICP/exercises/2-4/
date: 2020-05-04 22:41:46
show_meta: true
widgets:
article:
    highlight:
        clipboard: false
content_style: serif
license: by-nc-sa
license_lang: en
---

---

## Exercise 2.73

DrRacket as my interpreter, I added a few lines in the front to “implement” `put` and `get`&hairsp;, based on the built-in hash table structure.

    #lang racket
    (define *the-table* (make-hash))
    (define (put key1 key2 value) (hash-set! *the-table* (list key1 key2) value))
    (define (get key1 key2) (hash-ref *the-table* (list key1 key2) #f))

a. That's because numbers and variables are not tagged data.

b.

    (define (install-linear-package)
      (define (make-sum exp1 exp2)
        (cond ((=number? exp1 0) exp2)
              ((=number? exp2 0) exp1)
              ((and (number? exp1) (number? exp2)) (+ exp1 exp2))
              (else (list '+ exp1 exp2))))
      (define (make-product exp1 exp2)
        (cond ((=number? exp1 1) exp2)
              ((=number? exp2 1) exp1)
              ((and (number? exp1) (number? exp2)) (* exp1 exp2))
              (else (list '* exp1 exp2))))
      (define (deriv-addition operands var)
        (let ((addend (car operands))
              (augend (cadr operands)))
          (make-sum (deriv addend var) (deriv augend var))))
      (define (deriv-multiplication operands var)
        (let ((multiplier (car operands))
              (multiplicand (cadr operands)))
          (make-sum
           (make-product multiplier (deriv multiplicand var))
           (make-product (deriv multiplier var) multiplicand))))
      (put 'make '+ make-sum)
      (put 'make '* make-product)
      (put 'deriv '+ deriv-addition)
      (put 'deriv '* deriv-multiplication)
      'done)
    
    (define (=number? exp num)
      (and (number? exp) (= exp num)))
    (define (variable? exp) (symbol? exp))
    (define (same-variable? var1 var2)
      (and (variable? var1)
           (variable? var2)
           (eq? var1 var2)))
    (define (operator exp) (car exp))
    (define (operands exp) (cdr exp))
    
    (define (deriv exp var)
      (cond ((number? exp) 0)
            ((variable? exp) (if (same-variable? exp var) 1 0))
            (else
             (let ((proc (get 'deriv (operator exp))))
               (if proc
                   (proc (operands exp) var)
                   (error "invalid operator -- DERIV" exp))))))
    
    (install-linear-package)

c.

    (define (install-exponentiation-package)
      (define make-sum (get 'make '+))
      (define make-product (get 'make '*))
      (define (make-exponentiation exp1 exp2)
        (cond ((and (not (=number? exp1 0)) (=number? exp2 0)) 1)
              ((=number? exp2 1) exp1)
              (else (list '** exp1 exp2))))
      (define (deriv-exponentiation operands var)
        (let ((base (car operands))
              (ex (cadr operands)))
          (make-product
           ex
           (make-exponentiation base (make-sum ex -1)))))
      (put 'make '** make-exponentiation)
      (put 'deriv '** deriv-exponentiation)
      'done)
    
    (install-exponentiation-package)

d. Arguments in every `put` call need to be reordered.

## Exercise 2.74

Every company should provide their file in tagged-data form. Headquarters should implement

    (define (division file) ...)
    (define (records file) ...)

to extract from the file its belonging division and the actual records it contains.

a.

    (define (get-record employee file)
      ((get 'employee-records->record (division file))
       employee (records file)))

b.

    (define (get-salary employee file)
      (let ((record (get-record employee file)))
        ((get 'record->salary (division file)) record)))

c.

    (define (find-employee-record employee files)
      (if (null? files)
          #f
          ((let ((record (get-record employee (car files))))
             (if record
                 record
                 (find-employee-record employee (cdr files)))))))

d. The new company should provide a package that includes `employee-records->record` and `record->salary` implementation.

## Exercise 2.75

    (define (make-from-mag-ang r a)
      (define (dispatch op)
        (cond ((eq? op 'real-part) (* r (cos a)))
              ((eq? op 'imag-part) (* r (sin a)))
              ((eq? op 'magnitude) r)
              ((eq? op 'angle) a)
              (else
               (error "invalid operation -- MAKE-FROM-MAG-ANG" op))))
      dispatch)

## Exercise 2.76

For generic operations with explicit dispatch, when you add a new type, you have to edit every existing operation; when you add a new operation, you have to create an operation that takes account of all types. This style is appropriate for a system in which new operations must often be added.

For message-passing, when you add a new type, you have to create a new “operation dispatcher” that does all operations; when you add a new operation, you have to edit every existing “operation dispatcher.” This style is appropriate for a system in which new types must often be added.

I placed data-directed style at last, because it actually eliminates the deficiencies above. In this style, operations are organized in a table. To add a new type, you can fill out a new column in the table, that is, create a package for that type, as what we've done in the book. To add a new operation, you can fill out a new row in the table, that is, create a package for that operation. Everything is additive no matter whether you're adding a new type or a new operation.