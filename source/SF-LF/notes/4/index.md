---
title: Chapter 4 Polymorphism and Higher-Order Functions
description: Notes on Logical Foundations chapter 4 - Polymorphism and Higher-Order Functions
canonical_url: https://duinomaker.top/SF-LF/notes/4/
date: 2021-05-18 22:00:00
show_meta: true
widgets:
content_style: serif
---

---

The new ideas in this chapter are _polymorphism_ (abstracting functions over the types of the data they manipulate) and _higher-order functions_ (treating functions as data).

## Polymorphism

In order to create data-types that build on different types but are similar in structure, for example, another list structure for booleans instead of natural numbers, we can define a data-type with types as arguments.

Coq is able to do _type inference_ to deduce types that are not explicitly stated. But don’t rely too much on this mechanism, as explicit type annotations can serve as good documentation for your code.

The syntax of Coq is flexible enough that we can enable type inference with `Arguments` statements and disable it with a `@` prefix.

When using polymorphic pairs, note that the common symbol for the type of a pair `(x,y)` is `X×Y`, that is “the product type of `X` and `Y`.”

## Functions as Data

Coq treats functions as first-class citizens, that is, functions can be passed as arguments to other functions, returned as results, stored in data structures, etc.

Functions that manipulate other functions are called _higher-order functions_; some examples are filter, map, and fold.