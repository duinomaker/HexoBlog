---
title: Chapter 22 Elementary Graph Algorithms
description: Notes on Introduction to Algorithms chapter 22 - Elementary Graph Algorithms
canonical_url: https://duinomaker.top/CLRS/notes/22/
date: 2020-11-29 22:26:46
show_meta: true
widgets:
plugins:
    katex: true
content_style: tex-math
---

---

## 1 Representations of graphs

We have two standard ways to represent a graph $G=(V,E)$: as a collection of adjacency lists or as an adjacency matrix.
The adjacency-list representation provides us a compact way to represent sparse graphs, which has $|E|\ll|V|^2$. The adjacency-matrix representation provides us the ability to tell quickly if there’s edge connecting two given edges.

---

## 2 Breadth-first search

A breadth-first search on a graph computes the length of the shortest path between a source vertex and any other vertices. We define this length as the shortest-path distance from a vertex to another. And this distance stays constant no matter what vertex we choose as the source vertex.
By running BFS on a graph, we can also construct a breadth-first tree by recording the predecessor of each vertex explored. But, the structure of constructed trees can vary depending on our choice of source vertex.

