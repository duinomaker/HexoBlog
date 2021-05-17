---
title: Chapter 2 Proof by Induction
description: Notes on Logical Foundations chapter 2 - Proof by Induction
canonical_url: https://duinomaker.top/SF-LF/notes/2/
date: 2021-05-13 22:00:00
show_meta: true
widgets:
plugins:
    katex: true
content_style: serif
---

---

## Proof by Induction

The `destruct` tactic could push the proof one step further, but this won’t work for arbitrary large datatypes like natural numbers; instead, we could use _induction_.

In Coq, we use induction beginning with a goal of proving the proposition $P(n)$ for all $n$ and break it down into separate subgoals, each having its own inductive hypothesis.

## Proofs Within Proofs

Sometimes a proof requires trivial facts that are too small to separate as lemmas. We could use `assert` tactic to list and prove these facts. This tactic also helps in complex rewriting, for example, when `plus_comm` applies to contents in both parentheses, we could specify which part to rewrite:

    Theorem plus_rearrange : ∀ n m p q : ℕ,
      (n + m) + (p + q) = (m + n) + (p + q).
    Proof.
      intros n m p q.
      assert (H: n + m = m + n).
      { rewrite → plus_comm. reflexivity. }
      rewrite → H. reflexivity. Qed.

## Formal vs. Informal Proof

A proof of a mathematical proposition $P$ is a written or spoken text that convinces someone that $P$ is true.

Coq is like a “reader” of such text(proof), and the proof guides the program to check if $P$ could be derived from certain rules. Such proofs are _formal_ proofs.

Formal proofs are explicit in some way, such as what tactics are used, but less explicit in other ways, such as the “proof state” at given point in proof.