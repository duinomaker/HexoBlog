---
title: Chapter 1 Functional Programming in Coq
description: Notes on Logical Foundations chapter 1 - Functional Programming in Coq
canonical_url: https://duinomaker.top/SF-LF/notes/1/
date: 2021-05-12 22:00:00
show_meta: true
widgets:
plugins:
    katex: true
content_style: serif
---

---

## Data and Functions

Coq’s set of built-in features is extremely small, we could define new data-types from scratch ourselves.

Every expression in Coq has a type, describing what sort of thing it computes.

Coq allows us to create data-types by explicitly enumerating a finite set of elements, called _constructors_. Constructor expressions are formed by applying to a constructor zero or more other constructor expressions.

To test the correctness of a function, we check that it works on some examples. We could (1) use `Compute` to evaluate an expression, (2) use `Example` with the expected result given, then prove by tactics, (3) extract the function to another language like Haskell.

Use `Fixpoint` when having to use the data-type definition itself in its constructors.

Use `Notation` to introduce our own notations; we could make several annotations to control how these notations are treated by Coq's parser, for example associativity and scope.

## Proof by Simplification

Although `reflexivity` does more simplifications than `simpl`, we sometimes need `simpl` to read and understand the new goal it creates, so as to not leaving the goal in a messy state.

Use `intros` tactic to introduce a quantifier in the goals to context of current assumptions. If the quantifier is $\forall n:\mathbb{N}$, `intros n` is like saying “Suppose $n$ is some number...”

## Proof by Rewriting

The `intros` tactic also allows us to introduce the hypothesis to current assumptions. If the hypothesis is an equality, we could replace one side of the equality with another.

When writing long proofs, its desirable to use `Admitted` to temporarily accept a subsidiary lemma; then we can go back and fill in the proofs.

## Proof by Case Analysis

The `destruct` tactic can be used with any inductively defined data-type; this tactic would separate the original goal into several subgoals, amounting to the number of constructors of the data-type. Using this tactic, we could annotate variable names using _intro pattern_, separating lists of names by `|` and give name to subgoal equations using `eqn:<equation name>`.

The *bullets* mark the parts of the proof correspond to subgoals, preventing proofs for different subgoals from getting mixed up.