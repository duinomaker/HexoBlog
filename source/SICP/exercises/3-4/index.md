---
title: "3.4 Concurrency: Time Is of the Essence"
description: "Solutions to exercises in SICP section 3.4 - Concurrency: Time Is of the Essence"
canonical_url: https://duinomaker.top/SICP/exercises/3-4/
date: 2021-05-17 18:30:00
show_meta: true
widgets:
plugins:
    katex: true
content_style: serif
---

---

## Exercise 3.38

> TODO

## Exercise 3.39

$101$, $121$, and $100$.

## Exercise 3.40

$1,000$, $10,000$, $100,000$, and $1,000,000$ are possible.

After serialization, only $1,000,000$ is possible.

## Exercise 3.41

No, the read of `balance` happens in the middle of two `set!`’s before serialization, and the same is true after serialization; nothing changes after adding this restriction.

## Exercise 3.42

Yes, it is safe to change, and the concurrency restrictions are not changed.

## Exercise 3.43

> TODO

## Exercise 3.44

> TODO

## Exercise 3.45

> TODO