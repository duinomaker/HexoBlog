---
title: Chapter 2 Building Abstractions with Data
canonical_url: https://duinomaker.top/SICP/notes/2/
widgets:
comment:
article:
    highlight:
        clipboard: false
license: by-nc-sa
license_lang: en
---

---

## 2.1 Introduction to Data Abstraction

<div class="foreword">

Similar to procedural abstraction, data abstraction is a methodology that enables us to isolate how a compound data object is used from the details of how it is constructed from more primitive data objects.
</div>

---

***Selectors*** and ***constructors*** is a set of procedures used as the interface between the construction of data and the use of data, through which programs are as if operating on “abstract data”.

A ***pair*** is a compound structure that enables us to implement the concrete level of our data abstraction. The behavior of a pair could be specified as

    (car (cons a b)) -> a
    (cdr (cons a b)) -> b

<!-- Procedural representations of data will play a central role in our programming repertoire. This style of programming is often called ***message passing***, and in Chapter 3 it will be used as a basic tool to address the issues of modeling and simulation. -->

***Abstraction barriers*** isolate different “levels” of the system. It requires us to identify for each of type of data object a set of operations in terms of which all manipulations of data objects of that type will be expressed, and then to use only those operations in manipulating the data.

## 2.2 Hierarchical Data and the Closure Property

<div class="foreword has-mb-5">

The ability to create pairs whose elements are pairs is the essence of list structure which benefits from the <strong><em>closure property</em></strong> of <code>cons</code>&hairsp;.

Closure is the key to power in any means of combination because it permits us to create <strong><em>hierarchical</em></strong> structures — structures made up of parts, which themselves are made up of parts, and so on.
</div>

{% blockquote %}
The use of the word “closure” here comes from abstract algebra, where a set of elements is said to be closed under an operation if applying the operation to elements in the set produces an element that is again an element of the set.
{% endblockquote %}

---

A ***sequence*** is an ordered collection of data objects. There are many ways to represent sequences. In our language, a sequence produced by `(list <a1> <a2> ... <an>)` is equivalent to `(cons <a1> (cons <a2> (cons ... (cons <an> nil) ...)))`&hairsp;. Such a sequence is called a ***list***.

***Trees*** are sequences whose elements are sequences. Trees could easily be dealt with recursions, with which we can reduce operations on trees to operations on their branches, and so on, until we reach the leaves of the tree.

The use of ***conventional interfaces*** is a powerful design principle for working with tree structures. In this way, lists are operated on as if they were “signals”, and the program concentrate on the “signals” that flow from one stage in the process to the next.

Sequences serve as a conventional interface that permits us to combine processing modules (e.g. maps, filters, and accumulations).

The approach of ***stratified design*** helps make programs robust, that is, it makes it likely that small changes in a specification will require correspondingly small changes in the program.

## 2.3 Symbolic Data

<div class="foreword">

To extend the representational capability of our language, we introduce the ability to ***quote*** a data object, that is, to work with arbitrary symbols as data.
</div>

---

To distinguish symbols in variable-length codes, we can design the code in such a way that no complete code of any symbol is the prefix of the code for another symbol. Such a code is called ***prefix code***. One particular scheme for doing this uses Huffman encoding tree.

## 2.4 Multiple Representations for Abstract Data

$\cdots\cdots$