---
title: 2.2  Hierarchical Data and the Closure Property
canonical_url: https://duinomaker.top/SICP/exercises/2.2/
widgets:
comment:
article:
    highlight:
        clipboard: false
license: by-nc-sa
license_lang: en
---

---

## Exercise 2.17

    (define (last-pair lst)
      (if (null? (cdr lst))
          lst
          (last-pair (cdr lst))))

## Exercise 2.18

    (define (reverse lst)
      (define (iter lst result)
        (if (null? lst)
            result
            (iter (cdr lst) (cons (car lst) result))))
      (iter lst nil))

## Exercise 2.19

    (define (no-more? coins)
      (null? coins))
    (define (first-denomination coins)
      (car coins))
    (define (except-first-denomination coins)
      (cdr coins))

The order of denominations doesn't affect the result. Because both procedures compute all possible combinations.

## Exercise 2.20

    (define (same-parity f . r)
      (define (equiv? a b)
        (or (and a b)
            (and (not a) (not b))))
      (let ((p (even? f)))
        (define (choose r)
          (cond ((null? r) nil)
                ((equiv? p (even? (car r)))
                 (cons (car r) (choose (cdr r))))
                (else
                 (choose (cdr r)))))
        (cons f (choose r))))

## Exercise 2.21

    (define (square-list items)
      (if (null? items)
          nil
          (cons (* (car items) (car items))
                (square-list (cdr items)))))
    (define (square-list items)
      (map (lambda (x) (* x x)) items))

## Exercise 2.22

The first one will generate a reversed result because the first element of `items` is attached to the front of `answer` every iteration;

The latter one doesn't work because it will finally produce a structure like `(((((() . 1) . 2) . 3) . 4) . 5)`&hairsp;, which is not even a list.

## Exercise 2.23

    (define (for-each proc items)
      (define (iter items)
        (cond ((not (null? items))
               (proc (car items))
               (iter (cdr items)))))
      (iter items))

## Exercise 2.24

The interpreter prints `(1 (2 (3 4)))`&hairsp;.

## Exercise 2.25

    (car (cdr (car (cdr (cdr lst)))))
    (car (car lst))
    (car (cdr (car (cdr (car (cdr (car (cdr (car (cdr (car (cdr lst))))))))))))

## Exercise 2.26

    (1 2 3 4 5 6)
    ((1 2 3) 4 5 6)
    ((1 2 3) (4 5 6))

## Exercise 2.27

    (define (deep-reverse tree)
      (define (iter tree result)
        (cond ((null? tree) result)
              ((pair? tree)
               (iter (cdr tree)
                     (cons (deep-reverse (car tree))
                           result)))
              (else tree)))
      (iter tree nil))

## Exercise 2.28

I made use of the `append` procedure defined previously.
    
    (define (fringe tree)
      (cond ((null? tree) nil)
            ((pair? tree)
             (append (fringe (car tree))
                     (fringe (cdr tree))))
            (else (list tree))))

## Exercise 2.29

a.

    (define (left-branch mobile)
      (car mobile))
    (define (right-branch mobile)
      (car (cdr mobile)))
    (define (branch-length mobile)
      (car mobile))
    (define (branch-structure mobile)
      (car (cdr mobile)))

b.

    (define (total-weight object)
      (if (number? object)
          object
          (+ (total-weight (branch-structure (left-branch object)))
             (total-weight (branch-structure (right-branch object))))))

c.

    (define (torque branch)
      (* (branch-length branch)
         (total-weight (branch-structure branch))))
    
    (define (balanced? object)
      (or (number? object)
          (and (= (torque (left-branch object))
                  (torque (right-branch object)))
               (balanced? (branch-structure (left-branch object)))
               (balanced? (branch-structure (right-branch object))))))

d.

    (define (left-branch mobile)
      (car mobile))
    (define (right-branch mobile)
      (cdr mobile))
    (define (branch-length mobile)
      (car mobile))
    (define (branch-structure mobile)
      (cdr mobile))

Only four procedures have to be changed. That's the convenience abstraction barriers bring to us.

## Exercise 2.30

    (define (square-tree tree)
      (cond ((null? tree) nil)
            ((pair? tree)
             (cons (square-tree (car tree))
                   (square-tree (cdr tree))))
            (else (* tree tree))))

## Exercise 2.31

    (define (tree-map proc tree)
      (cond ((null? tree) nil)
            ((pair? tree)
             (cons (tree-map proc (car tree))
                   (tree-map proc (cdr tree))))
            (else (proc tree))))

Another solution uses `map`&hairsp;:
    
    (define (tree-map proc tree)
      (map (lambda (subtree)
                  (cond ((null? subtree) nil)
                        ((pair? subtree)
                         (tree-map proc subtree))
                        (else (proc subtree))))
                tree))

## Exercise 2.32

    (define (subset s)
      (if (null? s)
          (list nil)
          (let ((rest (subset (cdr s))))
            (append rest
                    (map (lambda (lst)
                           (cons (car s) lst))
                         rest)))))

Initially I wrongly wrote `nil` instead of `(list nil)`&hairsp;, which always generates an empty list.

It works, because the set of all subsets is a union of:

- The set of all subsets excluding the first number;
- The set of all subsets excluding the first number that has the first number re-inserted into each subset.

## Exercise 2.33

    (define (map proc seq)
      (accumulate (lambda (x y)
                    (cons (proc x) y))
                  nil
                  seq))
    (define (append seq1 seq2)
      (accumulate cons seq2 seq1))
    (define (length seq)
      (accumulate (lambda (x y) (+ y 1)) 0 seq))

## Exercise 2.34

    (define (horner-eval x coefficient-sequence)
      (accumulate (lambda (this-coeff higher-terms)
                    (+ (* higher-terms x) this-coeff))
                  0
                  coefficient-sequence))

## Exercise 2.35

    (define (count-leaves tree)
      (accumulate
        (lambda (x y)
          (+ (cond ((null? x) 0)
                   ((pair? x)
                    (count-leaves x))
                   (else 1))
             y))
        0
        tree))

## Exercise 2.36

    (define (accumulate-n op init seqs)
      (if (null? (car seqs))
          nil
          (cons (accumulate op init (map car seqs))
                (accumulate-n op init (map cdr seqs)))))

Another version uses a separately defined `transpose` procedure:

    (define (transpose seqs)
      (if (null? (car seqs))
          nil
          (cons (map car seqs)
                (transpose (map cdr seqs)))))
    (define (accumulate-n op init seqs)
      (map (lambda (x)
             (accumulate op init x))
           (transpose seqs)))

## Exercise 2.37

    (define (matrix-*-vector m v)
      (map (lambda (x) (dot-product x v)) m))
    (define (transpose mat)
      (if (null? (car mat))
          nil
          (cons (map car mat)
                (transpose (map cdr mat)))))
    (define (matrix-*-matrix m n)
      (let ((cols (transpose n)))
        (map (lambda (x) (matrix-*-vector cols x))
             m)))

## Exercise 2.38

    3/2
    1/6
    (1 (2 (3 ())))
    (((() 1) 2) 3)

`op` should have commutativity and associativity simultaneously:

Commutativity alone is not enough, such as $x\\;{\rm op}\\;y=x^2+y^2$&hairsp;;

Associativity alone is not enough, such as matrix multiplications.

## Exercise 2.39

    (define (reverse seq)
      (fold-right (lambda (x y) (append y (list x)))
                  nil
                  seq))
    (define (reverse seq)
      (fold-left (lambda (x y) (cons y x))
                 nil
                 seq))

## Exercise 2.40

    (define (unique-pairs n)
      (flatmap (lambda (i)
                 (map (lambda (j) (list i j))
                      (enumerate-interval 1 (- i 1))))
               (enumerate-interval 1 n)))
    (define (prime-sum-pairs n)
      (map make-pair-sum
           (filter prime-sum?
                   (unique-pairs n))))

## Exercise 2.41

    (define (make-triples n s)
      (define (eligible? triple)
        (and (< (cadr triple) (caddr triple))
             (<= (caddr triple) n)))
      (filter eligible?
              (flatmap
               (lambda (i)
                 (map (lambda (j)
                        (list j i (- s i j)))
                 (enumerate-interval 1 (- i 1))))
              (enumerate-interval 2 n))))

## Exercise 2.42

    (define empty-board nil)
    (define (adjoin-position new-row k rest-of-queens)
      (append rest-of-queens (list (list new-row k))))
    (define (safe? k positions)
      (define (row-of pos) (car pos))
      (define (col-of pos) (cadr pos))
      (let ((new-queen
             (car (filter (lambda (pos) (= (col-of pos) k))
                   positions)))
            (rest-of-queens
             (filter (lambda (pos) (not (= (col-of pos) k)))
              positions)))
        (define (examine unexamined-queens)
          (cond ((null? unexamined-queens) #t)
                ((let ((x1 (row-of (car unexamined-queens)))
                       (y1 (col-of (car unexamined-queens)))
                       (x2 (row-of new-queen))
                       (y2 (col-of new-queen)))
                   (or (= (+ x1 y1) (+ x2 y2))
                       (= (+ x1 y2) (+ x2 y1))
                       (= x1 x2)
                       (= y1 y2))) #f)
                (else (examine (cdr unexamined-queens)))))
        (examine rest-of-queens)))
    
    (define (queens board-size)
      (define (queen-cols k)
        (if (= k 0)
            (list empty-board)
            (filter
             (lambda (positions) (safe? k positions))
             (flatmap
              (lambda (rest-of-queens)
                (map (lambda (new-row)
                       (adjoin-position
                        new-row k rest-of-queens))
                     (enumerate-interval 1 board-size)))
              (queen-cols (- k 1))))))
      (queen-cols board-size))

<span id="two-queens-safe">I also wrote a more abstract version that defines</span>

    (define (two-queens-safe? q1 q2)
      (let ((x1 (row-of q1))
            (y1 (col-of q1))
            (x2 (row-of q2))
            (y2 (col-of q2)))
        (not (or (= (+ x1 y1) (+ x2 y2))
                 (= (+ x1 y2) (+ x2 y1))
                 (= x1 x2)
                 (= y1 y2)))))

to check whether two queens are safe with respect to each other. And uses

    (accumulate (lambda (another-queen result)
                  (and (two-queens-safe? new-queen another-queen)
                       result))
                #t
                rest-of-queens)

to replace the original `examine` procedure. I gave it up thinking that it would sacrifice readability of my program. But this level of abstraction provides a fundamental basis for analyzing the algorithms in <a href="#Exercise-2-43">Exercise 2.43</a>.

## Exercise 2.43

Exchanging the order of the mapping causes `(queen-cols (- k 1))` to be invoked for every element in `(enumerate-interval 1 board-size)`&hairsp;.

Let's say that $A_{k,n}$ is the number of all ways to place queens in the first $k$ columns of an $n\times n$ board. For the $8\times8$ case, we have

$$\begin{array}{r|ccccccccc}k&0&1&2&3&4&5&6&7&8\\\\A_{k,8}&1&8&42&140&344&568&550&312&92\end{array}$$

If we stipulate that `two-queens-safe?` (defined in <a href="#two-queens-safe">Exercise 2.42</a>) is the primitive operation, since it takes a constant time to determine whether two queens are safe with respect to each other. Let's say $B_{k,n}$ is the number of times `two-queens-safe?` to be invoked when calling `(queen-cols k)` of the original algorithm on an $n\times n$ board. We have the recurrence

$$B_{k,n}=\begin{cases}0\\,,&\text{if $k=0$}\\,;\\\\n(k-1)A_{k-1,n}+B_{k-1,n}\\,,&\text{if $k>0$}\\,.\end{cases}$$

In the recurrence above, multiply $A_{k-1,n}$ by $n(k-1)$ means we have to attach $n$ possible new queens to each of ways to place previous queens, and filter each of them; when filtering, the new queen has to be examined with the other $k-1$ queens.

In the original algorithm, $B_{8,8}=81696$&hairsp;.

Exchanging the order of mapping causes `(queen-cols (- k 1))` to be invoked $n$ times instead of once, the recurrence is simply

$$B^\prime_{k,n}=\begin{cases}0\\,,&\text{if $k=0$}\\,;\\\\n(k-1)A_{k-1,n}+nB^\prime_{k-1,n}\\,,&\text{if $k>0$}\\,.\end{cases}$$

In Louis' algorithm, $B^\prime_{8,8}=59878720$&hairsp;. So the required time is about $733T$&hairsp;.

## Exercise 2.44

    (define (up-split painter n)
      (if (= n 0)
          painter
          (let ((smaller (up-split painter (- n 1))))
            (below painter
                   (beside smaller smaller)))))

## Exercise 2.45

    (define (split proc1 proc2)
      (define (impl painter n)
        (if (= n 0)
            painter
            (let ((smaller (impl painter (- n 1))))
              (proc1 painter
                     (proc2 smaller smaller)))))
      impl)

## Exercise 2.46

    (define (make-vect xcor ycor) (list xcor ycor))
    (define (xcor-vect vect) (car vect))
    (define (ycor-vect vect) (cadr vect))
    (define (add-vect vect1 vect2)
      (make-vect (+ (xcor-vect vect1) (xcor-vect vect2))
                 (+ (ycor-vect vect1) (ycor-vect vect2))))
    (define (sub-vect vect1 vect2)
      (make-vect (- (xcor-vect vect1) (xcor-vect vect2))
                 (- (ycor-vect vect1) (ycor-vect vect2))))
    (define (scale-vect factor vect)
      (make-vect (* (xcor-vect vect) factor)
                 (* (ycor-vect vect) factor)))

## Exercise 2.47

    (define (make-frame origin edge1 edge2)
      (list origin edge1 edge2))
    (define (origin-frame frame) (car frame))
    (define (edge1-frame frame) (cadr frame))
    (define (edge2-frame frame) (caddr frame))

or

    (define (make-frame origin edge1 edge2)
      (cons origin (cons edge1 edge2)))
    (define (origin-frame frame) (car frame))
    (define (edge1-frame frame) (cadr frame))
    (define (edge2-frame frame) (cddr frame))

## Exercise 2.48

    (define (make-segment start end) (cons start end))
    (define (start-segment segment) (car segment))
    (define (end-segment segment) (cdr segment))

## Exercise 2.49

a.

    (define outline
      (segments->painter
       (list (make-segment (make-vect 0.0 0.0) (make-vect 0.0 1.0))
             (make-segment (make-vect 0.0 1.0) (make-vect 1.0 1.0))
             (make-segment (make-vect 1.0 1.0) (make-vect 1.0 0.0))
             (make-segment (make-vect 1.0 0.0) (make-vect 0.0 0.0)))))

b.

    (define cross
      (segments->painter
       (list (make-segment (make-vect 0.0 0.0) (make-vect 1.0 1.0))
             (make-segment (make-vect 0.0 1.0) (make-vect 1.0 0.0)))))

c.

    (define diamond
      (segments->painter
       (list (make-segment (make-vect 0.5 0.0) (make-vect 1.0 0.5))
             (make-segment (make-vect 1.0 0.5) (make-vect 0.5 1.0))
             (make-segment (make-vect 0.5 1.0) (make-vect 0.0 0.5))
             (make-segment (make-vect 0.0 0.5) (make-vect 0.5 0.0)))))

d. Too many line segments to draw, I'm skipping this.

## Exercise 2.50

    (define (flip-horiz painter)
      (transform-painter painter
                         (make-vect 0.0 1.0)
                         (make-vect 1.0 1.0)
                         (make-vect 0.0 0.0)))
    (define (rotate180 painter)
      (transform-painter painter
                         (make-vect 1.0 1.0)
                         (make-vect 0.0 1.0)
                         (make-vect 1.0 0.0)))
    (define (rotate270 painter)
      (transform-painter painter
                         (make-vect 0.0 1.0)
                         (make-vect 0.0 0.0)
                         (make-vect 1.0 1.0)))

## Exercise 2.51

    (define (below painter1 painter2)
      (let ((split-point (make-vect 0.0 0.5)))
        (let ((paint-bottom
               (transform-painter painter1
                                  (make-vect 0.0 0.0)
                                  (make-vect 1.0 0.0)
                                  split-point))
             (paint-top
               (transform-painter painter2
                                  split-point
                                  (make-vect 1.0 0.5)
                                  (make-vect 0.0 1.0))))
            (lambda (frame)
              (paint-bottom frame)
              (paint-top frame)))))
    
or
    
    (define (below painter1 painter2)
      (rotate270 (beside (rotate90 painter2)
                         (rotate90 painter1))))
    
## Exercise 2.52

a.

    (define (add-segments segment-list painter)
      (lambda (frame)
        ((segments->painter segment-list) frame)
        (painter frame)))
    (define smiley-wave
      (add-segments (list <smiley segments>) wave))

b.

    (define (corner-split painter n)
      (if (= n 0)
          painter
          (let ((up-smaller (up-split painter (- n 1))))
            (below (right-split painter n)
                   (beside up-smaller
                           (corner-split painter (- n 1)))))))

c. Made Mr. Rogers look outward.

    (define (compose . procs)
      (lambda (x)
        (define (impl procs)
          (if (null? procs)
              x
              ((car procs) (impl (cdr procs)))))
        (impl procs)))
    (define (square-limit painter n)
      (define (corner-split-n painter)
        (corner-split painter n))
      ((square-of-four (compose flip-horiz corner-split-n flip-horiz)
                       (compose corner-split-n flip-horiz)
                       (compose flip-horiz flip-vert corner-split-n flip-horiz)
                       (compose flip-vert corner-split-n flip-horiz))
       painter))