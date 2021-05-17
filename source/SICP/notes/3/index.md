---
title: Chapter 3 Modularity, Objects, and State
description: Notes on SICP chapter 3 - Modularity, Objects, and State
canonical_url: https://duinomaker.top/SICP/notes/3/
date: 2021-05-13 10:30:00
show_meta: true
widgets:
plugins:
    katex: true
content_style: serif
---

---

## 3.1 Assignment and Local State

Introducing assignment leads to difficult conceptual issues, such as the difficulty of defining sameness. But, viewing systems as collections of objects with local state is a powerful technique for maintaining a modular design, separating the internal logic of a sub-procedure from the enclosing procedure. A concrete example is the random number generator.

## 3.2 The Environment Model of Evaluation

Once we admit assignment into our programming language, the substitution model introduced is no longer adequate; and this is the motivation of introducing the environment model.

During the evaluation of procedures, new environments are created containing a frame that binds the parameter to the values of arguments; each environment has a pointer leading to the enclosing environment.

## 3.3 Modeling with Mutable Data

Scheme provides us with mutators of pairs, thus we could build powerful mutable list structure upon them.

A pair could serve as a “wrap” around an object, behaving similar to a head pointer of a linked list. For example, if we want a mutable list and use it like this…

    (define ml (make-mutable-list))
    (insert! 'new-value ml)

…we could make `make-mutable-list` returning a pair with a “dummy record” and `insert!` operating on the `cdr` of the mutable list…

    (define (make-mutable-list)
      (cons '*mutable-list* '()))
    (define (insert! value ml)
      (set-cdr! ml (cons value (cdr ml))))

…thus avoiding the need to return the mutated list itself when inserting a new value.

The presence of local state is critical in the implementation of the digital circuit simulator and the constraint system described in the book; both of the two examples store values in “wires” and use a _event-driven simulation_ technique, keeping a listener list in each wire and inform them on value changes.

…………