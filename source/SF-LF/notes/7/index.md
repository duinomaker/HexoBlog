---
title: Chapter 7 Inductively Defined Propositions
description: Notes on Logical Foundations chapter 7 - Inductively Defined Propositions
canonical_url: https://duinomaker.top/SF-LF/notes/7/
date: 2021-06-06 13:00:00
show_meta: true
widgets:
plugins:
    katex: true
content_style: serif
---

---

## Inductively Defined Propositions

We can establish propositions inductively by writing *inference rules*. By applying these rules we could proceed a proof by breaking the proposition down into sub-cases. Since an inference rule may contain several premises, applying inference rules is like building up a tree structure.

Theorems and constructors of inductively defined propositions are *evidences*. The type of an evidence is the proposition it is a proof of.

When a function or a proposition is defined, its type may read like `ℕ` `→` `ℙ`. Here, `ℕ` is an *index* or *annotation*, meaning it accepts a natural number as the *parameter*.

## Using Evidence in Proofs

We can use `destruct` on an evidence to “invert” it to reason about all the different ways it could have been derived.

The `inversion` tactic behaves like `destruct`, and it automatically rejects sub-goals that are contradictory.

The `induction` tactic behaves like `destruct`, and in each case, it provides an inductive hypothesis for each generated object, saying that the property holds true for it.

## Inductive Relations

A proposition parameterized by a single object is said to define a *property* of that object.

A proposition parameterized by more than one parameters is thought of defining a *relation* between the parameters.

## Case Study: Regular Expressions

If we perform an induction over an evidence term that is not general enough, using the `induction` tactic on it would lose information. This is because `induction` doesn’t have the ability like `inversion` to reject contradictory goals automatically.

We can use the `remember` tactic to make an evidence more general, and do some discriminations manually.

## Case Study: Improving Reflection

We can define a relation between booleans and proposition like…

    Inductive reflect (P : Prop) : 𝔹 → ℙ :=
    | ReflectT (H : P) : reflect P true
    | ReflectF (H : ¬ P) : reflect P false.

…which says the a boolean is *reflected* in a proposition.

When doing case analysis on a boolean, applying this relation to the boolean amounts to stating its corresponding proposition holds or not holds.

## Additional Exercises

An intriguing exercise is `palindrome_converse`, which says `l` `=` `rev` `l` `→` `pal` `l`. The intuition is to perform induction on `l`. But the `induction` tactic would not suffice, since the remaining part of a palindrome taken the head away is clearly not again a palindrome, and we cannot prove `pal` for it.

We have to define our own induction principle, taking one element from the head and tail from a list simultaneously. The principle can be defined like…

    ∀ X (P : list X → ℙ),
        P [] → (∀ x, P [x]) →
        (∀ x1 x2 l, P l → P (x1 :: l ++ [x2])) →
        ∀ l, P l.

…which can be proved by showing…

    ∀ l (P : list X → ℙ) n,
        n = length l → P l.

…and…

    ∀ (P : ℕ → ℙ),
        P 0 → P 1 →
        (∀ n, P n → P (S (S n))) →
        ∀ n, P n.

This is like putting lists of the same length into the same “group”, and treat the groups like natural numbers. To show that a property holds for all lists, we only need to prove that it holds for all lists of any group.

If we denote a “group” of lists of length $n$ as $G_n$ and the property as $P$, the latter can be showed by proving that the property hold for all lists of length $0$ or $1$, and that

$$\forall i,(\forall l, l\in G_i\to P(l))\to\forall l, l\in G_{i+2}\to P(l).$$