---
title: Chapter 6 Logic in Coq
description: Notes on Logical Foundations chapter 6 - Logic in Coq
canonical_url: https://duinomaker.top/SF-LF/notes/6/
date: 2021-05-27 11:00:00
show_meta: true
widgets:
content_style: serif
---

---

All syntactically well-formed propositions in Coq have type `Prop` in Coq. Propositions are not necessarily provable.

Functions that return propositions are called *parameterized* propositions; they define *properties* of their arguments.

## Logical Connectives

For a *conjunction*, we use `split` to separate it and prove each of them if it appears in the goal, but use `destruct` if it appears in the hypothesis.

For a *disjunction*, we use `left` or `right` to prove only one branch if it appears in the goal, but use `destruct` to separate them into branches and prove the goal with each branch taken as the premise.

`¬` `P` is a representation of to `P` `→` `False`. Anything can follow from `False`; this rule is called *ex falso quodlibet*, or the principle of explosion. If the goal is controversial, we can use this rule by the `exfalso` tactic, turning the goal into `False`.

The “if and only if” connective is reflexive, symmetric, and transitive; it is an equivalence relation. This means we can use `reflexivity`, `symmetry`, and `rewrite` on “`↔`” connected propositions, like on equations.

To prove a statement containing an existential quantification, we find a value that *witnesses* the existential.

## Programming with Propositions

We can define propositions recursively, but this method is limited by Coq’s requirements for functions, for example, “obviously terminating.” We can also define propositions *inductively*.

## Applying Theorems to Arguments

Coq treats *proofs* as first-class objects. The type of a proof is the proposition which it is a proof of. We can apply theorems to statements like applying a function; they have the same inference mechanism.

## Coq vs. Set Theory

In Coq, we say that a property holds for a mathematical object, not that a mathematical object belongs to some set. This is because Coq’s logical core is the *Calculus of Inductive Constructions*, instead of set theory (e.g. Zermelo–Fraenkel Set Theory).

Coq’s equality operator is polymorphic, we can use it to claim that two *functions* are equal. It is common to consider two functions the same if we observe the same behavior from them:

    (∀ x, f x = g x) → f = g

This is the principle of *functional extensionality*, we can define it as an axiom in Coq. Sometimes adding an axiom to Coq can break *consistency*, that is, we may be able to prove every proposition.

Coq’s language is *computational*, every function it can express is computable and total. Coq doesn’t have an operation to do case analyses on propositions, since allowing such operation would allow non-computable functions.

Many *computable* properties are easier to express using propositions rather than booleans, since recursive function definitions in Coq are subject to significant restrictions.

If a boolean function gives `true` if and only if a proposition holds, we say that the boolean computation is *reflected* in the truth of the proposition. We could exploit boolean computation to prove propositions; this technique is known as *proof by reflection*.

Logics that do not assume the excluded middle are referred to as *constructive logics*. Every proof of existence in such logics are constructive.

Although constructive logic is useful, constructive proofs of many statements are complicated. What’s worse, some statements only have non-constructive proofs.