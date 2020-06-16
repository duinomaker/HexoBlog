---
title: Chapter 2 Building Abstractions with Data
canonical_url: https://duinomaker.top/SICP/notes/2/
widgets:
comment:
article:
    highlight:
        clipboard: false
content_style: serif
license: by-nc-sa
license_lang: en
---

---

## 2.1 Introduction to Data Abstraction

<div class="foreword">

Similar to procedural abstraction, data abstraction is a methodology that enables us to isolate how a compound data object is used from the details of how it is constructed from more primitive data objects.
</div>

---

***Selectors*** and ***constructors*** are sets of procedures used as the interface between the construction of data and the use of data, through which programs are as if operating on “abstract data”.

A ***pair*** is a compound structure, whose behavior could be specified as

    (car (cons a b)) -> a
    (cdr (cons a b)) -> b

<!-- Procedural representations of data will play a central role in our programming repertoire. This style of programming is often called ***message passing***, and in Chapter 3 it will be used as a basic tool to address the issues of modeling and simulation. -->

***Abstraction barriers*** isolate different “levels” of the system. Identify for each of type of data object a set of operations, and use only those operations in manipulating data objects.

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

Sequences serve as a conventional interface that permits us to combine processing modules (e.g. maps, filters, and accumulations).

***Trees*** are sequences whose elements are sequences. They can be dealt naturally with recursions.

<!-- The use of ***conventional interfaces*** is a powerful design principle for working with tree structures. In this way, lists are operated on as if they were “signals,” and the program concentrate on the “signals” that flow from one stage in the process to the next. -->

The approach of ***stratified design*** helps make programs robust, that is, it makes it likely that small changes in a specification will require correspondingly small changes in the program.

## 2.3 Symbolic Data

<div class="foreword">

To extend the representational capability of our language, we introduce the ability to ***quote*** a data object, that is, to work with arbitrary symbols as data.
</div>

---

***Prefix code*** is a way of coding such that no complete code of any symbol is the prefix of the code for another symbol. One particular scheme uses Huffman encoding tree.

## 2.4 Multiple Representations for Abstract Data

<div class="foreword">

This section introduces a new kind of data-abstraction barriers that isolate different representations of data from each other.
</div>

---

***Generic procedures*** are procedures that can operate on data that has multiple representations. We'll need the help of ***type tags*** that specify how the data are to be processed.

As systems evolve over time, we need conventions to incorporate new modules into systems ***additively***, that is, without having to re-implement the modules.

Two styles of organizing system with generic operations are introduced, they are:

***Data-directed*** style. In this style, we handle generic operations by dealing explicitly with operation-and-type tables.

***Message-passing*** style. In this style, we create data objects as dispatching procedures. Such a procedure takes as argument the name of an operation to be performed.

## 2.5 Systems with Generic Operations

$\cdots\cdots$