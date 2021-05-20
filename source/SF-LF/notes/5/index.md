---
title: Chapter 5 More Basic Tactics
description: Notes on Logical Foundations chapter 5 - More Basic Tactics
canonical_url: https://duinomaker.top/SF-LF/notes/5/
date: 2021-05-20 22:00:00
show_meta: true
widgets:
content_style: serif
---

---

## The `apply` Tactic

The `apply` tactic uses implications to transform goals and hypotheses. When `apply`ing a lemma to the goal, Coq will match the goal against the conclusion of the lemma, try to instantiate unknown variables, and replace the goal with the premises of the lemma.

## The `apply with` Tactic

Sometimes `apply` cannot instantiate all unknown variables, we need to manually determine variables in the lemma by using `apply with`.

## The `injection` and `discriminate` Tactics

All constructors of a data-type are _injective_. We use `injection` to “undo” one application of the constructor.

Any two constructors of a data-type are _disjoint_, two terms beginning with different constructors cannot be equal. We use `discriminate` on hypotheses including such inequality and solve the goal.

## Using Tactics on Hypotheses

Most tactics in Coq work on the goal and leave the context unchanged. However, we could perform a tactic on a statement in the context, by using `<tactic> in <statement>` .

The informal proofs tend to use forward reasoning, while the idiomatic use of Coq favors backward reasoning.

## Varying the Induction Hypothesis

When using induction, we shall not make the proposition too specific: When proving a property involving induction on a variable, it is crucial to leave the others generic (e.g., variables that depend on the induction variable).

Use `generalize dependent` to put an argument back to goal.

## Unfolding Definitions

Coq does definition unfolding  automatically, but it is also conservative and we sometimes need to unfold the definitions manually using `unfold`.

## Using `destruct` on Compound Expressions

When using `destruct` on compound expression, we need to retain the equality by adding the `eqn: ` qualifier.