---
title: Chapter 22 Elementary Graph Algorithms
description: Solutions to exercises in Introduction to Algorithms chapter 22 - Elementary Graph Algorithms
canonical_url: https://duinomaker.top/CLRS/exercises/22/
date: 2020-11-29 22:26:46
show_meta: true
widgets:
plugins:
    katex: true
content_style: tex-math
---

---

## 1 Representations of graphs
### 22.1-1

$O(V+E)$, $O(V+E)$.

### 22.1-2

    1 - 2, 3
    2 - 1, 4, 5
    3 - 1, 6, 7
    4 - 2
    5 - 2
    6 - 3
    7 - 3

### 22.1-3

    let Adj'[1..|G.V|] be a new adjacency list of transposed G
    for each vertex u ∈ G.V
        for each vertex v ∈ G.Adj[u]
            INSERT(Adj'[v], u)

### 22.1-4

If we have a graph represented in adjacency-list form, transpose it, and the adjacency-list for each vertex is ordered. Transpose the transposed graph again, we’ll get the original graph but with adjacency-list for each vertex sorted. Merge the adjacency-lists of both “ordered” graphs at every vertex into new adjacency-lists, then the graph represented by these adjacency-lists is the desired undirected graph.

    TO_UNDIRECTED(G)
        let G^T = TRANSPOSED(G)
        let G = TRANSPOSED(G^T)
        let G_new be a new undirected equivalent graph to G
        G_new.Adj = a new adjacency list of length |G.V|
        for each vertex u in G.V
            G_new.Adj[u] = MERGE(G.Adj[u], G^T.Adj[u], u)
        return G_new
    
    MERGE(List_1, List_2, ex)
        merge ordered lists List_1 and List_2 (with element ex excluded)
        into a single list and return it

### 22.1-5

For adjacency-list representation:

    SQUARE(G)
        let G^2 be a new graph
        G^2.Adj = a new adjacency list of length |G.V|
        let E be a new hash set of edges of of G^2
        for each vertex u ∈ G.V
            for each vertex v ∈ G.V[u]
                for each vertex w ∈ G.V[v]
                    INSERT(E, edge (u, w))
        for each edge e in E
            INSERT(G^2.Adj[e.from], e.to)
        return G^2

For adjacency-matrix representation, square the matrix and replace all non-zero elements with one.
The running time for both algorithms is $O(V^3)$.

### 22.1-6

Denote the value of the $i$-th row and $j$-th column as $a_{i,j}$. Then a graph contains a universal sink if it has a column filled with $1$’s.
Start from $a_{1,1}$. If current entry $a_{i,j}$ is $0$, we let $j=j+1$ (move to the next column), otherwise $a_{i,j}$ is $1$, we let $i=i+1$ (move to the next row). Do that repeatedly until one if $i$ and $j$ reaches $|G.V|$. If the final value of $i$ is $|G.V|$, check if vertex $j$ is a universal sink, otherwise $j$ equals $|G.V|$ and the graph has no universal sink.
The running time is $O(V)$.

### 22.1-7

> TODO

### 22.1-8

The expected time is $O(1)$, the same as a hash table lookup. The disadvantage of using hash-tables is they take up more space than list.
We can use binary search trees to store lists of adjacent vertices; they takes up the same amount of spaces as lists, but the time complexity for both inserting a new vertex and for lookups is $O(\log V)$ instead of $O(1)$.

---

## 2 Breadth-first search
### 22.2-1

    vertex  |  1    2    3    4    5    6
    d       |  ∞    3    0    2    1    1
    π       |  NIL  4    NIL  5    3    3

### 22.2-3

The book introduced gray to distinguish between enqueued and dequeued vertices. In fact, black and gray vertices have the same property, so it suffices to use just two colors, black and white.

### 22.2-4

The running time for iterating all edges is $O(V^2)$, and $\Theta(V)$ queue operations are required. Therefore, the total running time is $O(V^2)$.

### 22.2-5

Theorem 22.5 tells that upon termination of BFS on a graph $G$, we have $v.d=\delta(s,d)$ for any $s\in G.V$. This is an underlying property of the graph, no matter how we represent the graph.

### 22.2-6

For example, for the graph $G$

    a->b<-c

the set of edges $E_\pi$ cannot be obtained by running a BFS on it.

### 22.2-7

    COLOR(G)
        for each vertex u ∈ G.V
            u.color = NONE
        for each vertex s ∈ G.V
            if s.color == NONE
                COLOR_FROM_SOURCE(G, s)
    
    COLOR_FROM_SOURCE(G, s)
        s.color = WHITE
        Q = ∅
        ENQUEUE(Q, s)
        while Q != ∅
            u = DEQUEUE(Q)
            for each vertex v ∈ G.Adj[u]
                if v.color == NONE
                    v.color = OPPOSITE_COLOR(u.color)
                    ENQUEUE(Q, v)
                else if v.color == u.color
                    print "unable to designate"
    
    OPPOSITE_COLOR(color)
        return white if color is black and vice versa

Represent wrestlers as vertices and the existence of a rivalry with an undirected edge between two vertices. Thus, producing a graph $G=(V,E)$. After running the procedure `COLOR` on $G$, we will have the “color” of each wrestler as his property if it’s possible to designate, otherwise we will have “unable to designate” displayed on the screen.

### 22.2-9

> TODO
