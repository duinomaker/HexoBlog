---
title: Chapter 3 Working with Structured Data
description: Notes on Logical Foundations chapter 3 - Working with Structured Data
canonical_url: https://duinomaker.top/SF-LF/notes/3/
date: 2021-05-17 11:00:00
show_meta: true
widgets:
plugins:
    katex: true
content_style: serif
---

---

## Pairs of Numbers

In an `Inductive` type definition, each constructor can take zero or more arguments. When applied to pattern matching, each constructor could be destructed back into parts.

## Lists of Numbers

Generalizing the definition of pairs, we notice that a list of numbers is either an empty list or a pair of a number and another list, much like a natural number is either zero or the successor of another natural number.

 We could tell Coq how to parenthesize expressions involving multiple uses of binary operators using `Notation`. For example, this statement…

    Notation "[ x ; .. ; y ]" := (cons x .. (cons y nil) ..).

…gives an expression like `1` `::` `2` `::` `3` `::` `nil` a clear meaning.

## Reasoning About Lists

To prove a proposition $P(l)$ that holds for all lists $l$, we could reason as follows:

- First, show $P(l)$ is true if $l$ is `nil`.
- Then show that $P(l)$ is true when $l$ is a pair of some number $n$ and some smaller list $l’$, assuming $P(l’)$ is true.

This strategy works because larger lists can always be broken down into smaller ones, eventually reaching `nil`.

We could use `Search` command to search for theorems, using wildcards like `(_` `+` `_` `=` `_` `+` `_)`, or using `(?x` `+` `?y` `=` `?y` `+` `?x)` if we want a more precise search.

## Options

Sometimes, an operation is not valid, such as taking the first element out of an empty list; in such cases, we could create a new data-type “wrapping around” the original type `T`, with two constructors `Some` `T` and `None`, together with a function for unwrapping.

Coq doesn’t have a built-in boolean type, any inductive type defined with exactly two constructors are considered a boolean; the guard is considered true if it evaluates to the first constructor and false if it evaluates to the second.

## Partial Maps

Partial maps are constructed similar to lists, with an “empty” constructor and the other constructor taking an id, a value, and the rest of the partial map (also a partial map). Updating a partial map can be achieved by simply adding a record to the front; the new record shadows the original one.