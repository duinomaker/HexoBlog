---
title: Chapter 8 Total and Partial Maps
description: Notes on Logical Foundations chapter 8 - Total and Partial Maps
canonical_url: https://duinomaker.top/SF-LF/notes/8/
date: 2021-07-05 00:00:00
show_meta: true
widgets:
content_style: serif
---

---

## The `sumbool` Type

Objects of the type `sumbool` written like `{A}` `+` `{B}`, is either a proof of `A` or a proof of `B`. They can be thought of “evidence-carrying booleans.”

If we are able prove `∀` `(a` `b` `:` `T),` `{a` `=` `b}` `+` `{a` `≠` `b}`, we say that equality is *decidable* between objects of type `T`.

## Notations in Coq

In Coq, we can use `Notation` to modify the behavior of the parser, to provide abbreviations of terms. The notation (the string after `Notation`) consists of tokens separated by spaces. Tokens which are identifiers (such as “A”, “x0”) are the *parameters* of the notation. Each of them must occur at least once in the abbreviated term. The other elements of the string (such as “/”) are the *symbols*. In some cases, for example in `"'IF'` `c1` `'then'` `c2` `'else'` `c3"`, groups of characters must be quoted to be treated as symbols.

To avoid ambiguities in expressions like `A` `∧` `B` `∨` `A` `∨` `C`, we use *syntax modifiers*. We can fix this example by specifying precedence and associativity like `(at` `level` `..,` `right` `associativity)`.

Sometimes we need to parse expressions like `x` `!->` `v` `;` `m` and to parse subexpressions (`x` `!->` `v` and `v` `;` `m`) differently from when they are used separately. In this case, we must sometimes specify `at` `next` `level` like in…

    Notation "x !-> v ; m" := (t_update m x v)
                              (at level 100, v at next level, right associativity).

…but currently I have no idea of what’s happening. Coq uses Camlp5 as its parser, which is an LL(1) parser. I’ll try to explain this after figuring out how LL(1) parsers work.

## Total Maps and Partial Maps

We can use functions rather than lists of key-value pairs to build maps. This will give us a more extensional view of maps.

Since partial maps are just total maps (with `None` as the default value), basic lemmas about total maps can easily be lift to fit partial maps.