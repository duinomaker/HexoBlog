---
title: 2.3 Symbolic Data
canonical_url: https://duinomaker.top/SICP/exercises/2-3/
widgets:
comment:
article:
    highlight:
        clipboard: false
license: by-nc-sa
license_lang: en
---

---

## Exercise 2.53

    (list 'a 'b 'c) -> (a b c)
    (list (list 'george)) -> ((george))
    (cdr '((x1 x2) (y1 y2))) -> ((y1 y2))
    (cadr '((x1 x2) (y1 y2))) -> (y1 y2)
    (pair? (car '(a short list))) -> #f
    (memq 'red '((red shoes) (blue socks))) -> #f
    (memq 'red '(red shoes blue socks)) -> (red shoes blue socks)

## Exercise 2.54

    (define (equal? a b)
      (cond ((and (pair? a) (pair? b))
             (and (equal? (car a) (car b))
                  (equal? (cdr a) (cdr b))))
            ((not (or (pair? a) (pair? b)))
             (eq? a b))
            (else #f)))

## Exercise 2.55

`''abracadabra` is an abbreviation of `(list 'quote 'abracadabra)`&hairsp;; its first element is `'quote`&hairsp;.

## Exercise 2.56

    (define (exponentiation? e)
      (and (pair? e) (eq? (car e) '**)))
    (define (base e)
      (cadr e))
    (define (exponent e)
      (caddr e))
    (define (make-exponentiation base exponent)
      (cond ((=number? exponent 0) 1)
            ((=number? exponent 1) base)
            ((and (number? base) (number? exponent))
             (expt base exponent))
            (else (list '** base exponent))))

    (define (deriv exp var)
      (cond ((number? exp) 0)
            ((variable? exp)
             (if (same-variable? exp var) 1 0))
            ((sum? exp)
             (make-sum (deriv (addend exp) var)
                       (deriv (augend exp) var)))
            ((product? exp)
             (make-sum (make-product (multiplier exp)
                                     (deriv (multiplicand exp) var))
                       (make-product (deriv (multiplier exp) var)
                                     (multiplicand exp))))
            ((exponentiation? exp)
             (make-product (exponent exp)
                           (make-product (make-exponentiation (base exp)
                                                              (make-sum (exponent exp) -1))
                                         (deriv (base exp) var))))
            (else (error "unknown expression type -- DERIV" exp))))

## Exercise 2.57

    (define (augend e)
      (let ((rem (cddr e)))
        (if (null? (cdr rem))
            (car rem)
            (cons '+ rem))))

    (define (multiplicand e)
      (let ((rem (cddr e)))
        (if (null? (cdr rem))
            (car rem)
            (cons '* rem))))

## Exercise 2.58

a.

    (define (sum? e)
      (and (pair? e) (eq? (cadr e) '+)))
    (define (addend e)
      (car e))
    (define (augend e)
      (caddr e))
    (define (make-sum a1 a2)
      (cond ((=number? a1 0) a2)
            ((=number? a2 0) a1)
            ((and (number? a1) (number? a2)) (+ a1 a2))
            ((equal? a1 a2) (make-product a1 2))
            (else (list a1 '+ a2))))
    
    (define (product? e)
      (and (pair? e) (eq? (cadr e) '*)))
    (define (multiplier e)
      (car e))
    (define (multiplicand e)
      (caddr e))
    (define (make-product m1 m2)
      (cond ((or (=number? m1 0) (=number? m2 0)) 0)
            ((=number? m1 1) m2)
            ((=number? m2 1) m1)
            ((and (number? m1) (number? m2)) (* m1 m2))
            (else (list m1 '* m2))))

b. A simple solution works under the assumption that the expression contains only additions and multiplications. An expression is a sum if it contains any `'+` in its topmost “layer” , otherwise, a product.

    (define (sum? e)
      (and (pair? e)
           (not (null? (cdr e)))
           (or (eq? (cadr e) '+)
               (sum? (cddr e)))))
    (define (addend e)
      (if (eq? (cadr e) '+)
          (car e)
          (cons (car e)
                (cons (cadr e)
                      (let ((rem (addend (cddr e))))
                        (if (pair? rem)
                            rem
                            (list rem)))))))
    (define (augend e)
      (let ((rem (cddr e)))
        (if (eq? (cadr e) '+)
            (if (null? (cdr rem)) (car rem) rem)
            (augend rem))))
    (define (make-sum a1 a2)
      (cond ((=number? a1 0) a2)
            ((=number? a2 0) a1)
            ((and (number? a1) (number? a2)) (+ a1 a2))
            (else (append (if (pair? a1) a1 (list a1))
                          (if (pair? a2) (cons '+ a2) (list '+ a2))))))
    
    (define (product? e)
      (not (sum? e)))
    (define (multiplier e)
      (car e))
    (define (multiplicand e)
      (let ((rem (cddr e)))
        (if (null? (cdr rem)) (car rem) rem)))
    (define (make-product m1 m2)
      (cond ((or (=number? m1 0) (=number? m2 0)) 0)
            ((=number? m1 1) m2)
            ((=number? m2 1) m1)
            ((and (number? m1) (number? m2)) (* m1 m2))
            (else (list m1 '* m2))))

## Exercise 2.59

    (define (union-set set1 set2)
      (cond ((null? set1) set2)
            ((element-of-set? (car set1) set2)
             (union-set (cdr set1) set2))
            (else
              (adjoin-set (car set1)
                          (union-set (cdr set1) set2)))))

## Exercise 2.60

`adjoin-set` was changed to allow duplicates.

`adjoin-set` is sufficiently more efficient, it has a time complexity of $\Theta(1)$ rather than $\Theta(n)$&hairsp;.

The set allowing duplicates is suitable for situations that require frequent adjoin operations.

    (define (element-of-set? x set)
      (if (null? set)
          #f
          (or (equal? x (car set))
              (element-of-set? x (cdr set)))))
    
    (define (adjoin-set x set)
      (cons x set))
    
    (define (intersection-set set1 set2)
      (cond ((null? set1) '())
            ((element-of-set? (car set1) set2)
             (cons (car set1)
                   (intersection-set (cdr set1) set2)))
            (else (intersection-set (cdr set1) set2))))
    
    (define (union-set set1 set2)
      (cond ((null? set1) set2)
            ((element-of-set? (car set1) set2)
             (union-set (cdr set1) set2))
            (else
              (adjoin-set (car set1)
                          (union-set (cdr set1) set2)))))

## Exercise 2.61

Both version have the time complexity of $\Theta(n)$&hairsp;, but the ordered version has to examine on the average half of the set instead of the entire set.

    (define (adjoin-set x set)
      (cond ((null? set) (list x))
            ((= x (car set)) set)
            ((< x (car set)) (cons x set))
            (else (cons (car set) (adjoin-set x (cdr set))))))

## Exercise 2.62

    (define (union-set set1 set2)
      (cond ((null? set1) set2)
            ((null? set2) set1)
            ((= (car set1) (car set2))
             (cons (car set1) (union-set (cdr set1) (cdr set2))))
            ((< (car set1) (car set2))
             (cons (car set1) (union-set (cdr set1) set2)))
            (else
             (cons (car set2) (union-set set1 (cdr set2))))))

## Exercise 2.63

a. Trees in Figure 2.16 can be represented as

    (define tree1 '(7 (3 (1 () ()) (5 () ())) (9 () (11 () ()))))
    (define tree2 '(3 (1 () ()) (7 (5 () ()) (9 () (11 () ())))))
    (define tree3 '(5 (3 (1 () ()) ()) (9 (7 () ()) (11 () ()))))

Both procedures evaluate to the same list `(1 3 5 7 9 11)`&hairsp;.

b. `tree->list2` grows slower.

For `tree->list1`&hairsp;,

$$T(n)=2\cdot T(n/2)+\Theta(n)\\,,$$

where $\Theta(n)$ means that `append` takes linear time to combime two lists; and the recurrence has the solution $T(n)\sim\Theta(n\log n)$&hairsp;.

For `tree->list2`&hairsp;,

$$T(n)=2\cdot T(n/2)+\Theta(1)\\,,$$

since it uses a single `cons` to combine the results; and the recurrence has the solution $T(n)\sim\Theta(n)$&hairsp;.

{% blockquote %}
Actually, I looked up the solutions to the recurrences, since I'm not able to solve such equations at present. I will come back to explain them once I finished reading related topics in *Concrete Mathematics*.
{% endblockquote %}

## Exercise 2.64

a. The generated tree looks like

       5
     /   \
    1     9
     \   / \
      3 7  11

The `partial-tree` procedure split the list into three parts and combine them into a tree. For example, the list `(1 3 5 7 9 11)` would be split into parts:

1. list `(1 3)` of the length `left-size`&hairsp;, which is used to generate the `left-tree`&hairsp;;
2. `5` as `this-entry`&hairsp;, the entry of the generated tree;
3. list `(7 9 11)` of the length `right-size`&hairsp;, which is used to generate the `right-tree`&hairsp;.

Then the parts would be combined like `(this-entry left-tree right-tree)`&hairsp;.

b. Suppose we're going to convert a list of length $n$ into a tree.

The `list->tree` procedure depends on `(partial-tree <list> n)`&hairsp;, which generates two partial-tree of the lengths of about half of $n$&hairsp;, and combine them into a tree. The combining step uses `list` which requires a constant time. Then we have the recurrence

$$T(n)=2\cdot T(n/2)+\Theta(1)\\,,$$

which has the solution $T(n)\sim\Theta(n)$&hairsp;.

## Exercise 2.65

Implemented using previously defined procedures. `union-set-as-list` is the original `union-set`&hairsp;; `intersection-set-as-list` is the original `intersection-set`&hairsp;.

    (define (union-set set1 set2)
      (let ((list1 (tree->list set1))
            (list2 (tree->list set2)))
        (list->tree (union-set-as-list list1 list2))))
    
    (define (intersection-set set1 set2)
      (let ((list1 (tree->list set1))
            (list2 (tree->list set2)))
        (list->tree (intersection-set-as-list list1 list2))))

## Exercise 2.66

    (define (lookup given-key set-of-records)
      (cond ((null? set-of-records) #f)
            ((equal? given-key (key (entry set-of-records))) (entry set-of-records))
            ((< given-key (key (entry set-of-records)))
             (lookup x (left-branch set-of-records)))
            ((> given-key (key (entry set-of-records)))
             (lookup x (right-branch set-of-records)))))

## Exercise 2.67

The result is `(A D A B B C A)`&hairsp;.

## Exercise 2.68

    (define (encode-symbol symbol tree)
      (if (leaf? tree)
          '()
          (cond ((element-of-set? symbol (symbols (left-branch tree)))
                 (cons 0 (encode-symbol symbol (left-branch tree))))
                ((element-of-set? symbol (symbols (right-branch tree)))
                 (cons 1 (encode-symbol symbol (right-branch tree))))
                (else (error "bad symbol: ENCODE-SYMBOL" symbol)))))

At first, I wrote a procedure with a helper procedure `encode-1` instead of `encode-symbol` (because I carelessly skipped reading the latter part of the requirements), which is analogous to the `decode` sample code in the book. This version is faster than a procedure making use of `append`&hairsp;, since `append` takes linear time to combine the results instead of constant time.

    (define (encode message tree)
      (define (symbol->next-bit symbol tree)
        (cond ((element-of-set? symbol (symbols (left-branch tree))) 0)
              ((element-of-set? symbol (symbols (right-branch tree))) 1)
              (else (error "bad symbol: CHOOSE-BRANCH" symbol))))
      (define (encode-1 symbols current-branch)
        (if (null? symbols)
            '()
            (let ((next-bit
                   (symbol->next-bit (car symbols) current-branch)))
              (let ((next-branch
                     (choose-branch next-bit current-branch)))
                (cons next-bit
                      (if (leaf? next-branch)
                          (encode-1 (cdr symbols) tree)
                          (encode-1 symbols next-branch)))))))
      (encode-1 message tree))

## Exercise 2.69

    (define (successive-merge set)
      (if (null? (cdr set))
          (car set)
          (successive-merge
           (adjoin-set (make-code-tree (car set) (cadr set))
                       (cddr set)))))

## Exercise 2.70

$84$ bits are needed using Huffman encoding method; $108$ bits are needed using fixed-length code.

## Exercise 2.71

Such a tree looks like

        /\
       /\ 2^(n-1)
      /\ 2^(n-2)
     /\ ...
    1  2

The most frequent symbol requires one bit to represent; and the least frequent symbols require $n-1$ bits to represent.

## Exercise 2.72

Encoding the most frequent symbol, we have to search through the entire symbol list once, which takes linear time. Thus

$$T(n)\sim\Theta(n)\\,.$$

Encoding a least frequent symbol, we have to search through a list containing $n$ symbols, then a list containing $n-1$ symbols, then a list containing $n-2$ symbols, till we reach the bottom of the tree. Thus

$$T(n)\sim\Theta(n^2)\\,.$$