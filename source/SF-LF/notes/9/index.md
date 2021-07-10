---
title: Chapter 9 The Curry–Howard Correspondence
description: Notes on Logical Foundations chapter 9 - The Curry–Howard Correspondence
canonical_url: https://duinomaker.top/SF-LF/notes/9/
date: 2021-07-10 17:50:00
show_meta: true
widgets:
content_style: serif
---

---

The *Curry–Howard correspondence* proposes that proof systems and the models of computation are the same kind of mathematical objects. More intuitively, this means that proofs can be run, or that *proof are programs*.

## Proof Scripts

Proof scripts are instructions we use to tell Coq how to gradually construct *proof objects* whose type is the proposition to be proved. During the construction of proof objects, Coq leave unproved parts with “holes” (`?Goal`, `?Goal0` and so on), and knows what type of evidence is needed to fill a hole.

We can also construct proof objects by hand, without writing proof scripts.

## Quantifiers, Implications, Functions

Informally, the Curry–Howard correspondence can be seen as an analogy that states that the return type of a function is analogous to a logical theorem, subject to the evidences that passed to the function as arguments; and that the program to compute that function is analogous to a proof of that theorem.

Constructor of an inductively defined proposition are just a functions that transform evidences!

A *dependent type* is a type whose definition depends on a value. In Coq, both implication (`→`) and quantification (`∀`) correspond to functions on evidence, and `→` is just a shorthand for type definitions with no dependency (`P` `→` `Q` is the same as `∀` `(_:P),` `Q`).

## Programming with Tactics

Proof scripts can be used to define functions.

## Logical Connectives as Inductive Types

Logical connectives like conjunctions, disjunctions, existential quantifications are inductively defined.

A conjunction is constructed from a pair of propositions, and proofs of both of them.

A disjunction is constructed from a pair of propositions, and a proof of either of them.

An existential quantification is constructed from

- a function that generates from an object a property of it,
- an object, and
- a proof of the generated property;

more formally, the type of its constructor is

    ∀ (A : Type) (P : A → ℙ) (x : A), P x → ∃ y, P y.

## Equality

When `reflexivity` is used, Coq applies to terms some simple computation rules. Two terms are treated as “the same” when they are *convertible* under these rules.

In Coq, equality and *Leibniz equality* implies each other.

## The Coq Trusted Computing Base

Coq’s credibility comes from its *type-checking* mechanism. We trust Coq because it

- uses correct computation rules to transform expressions,
- makes sure that `match` expressions are exhaustive, and
- makes sure that recursive functions terminate.