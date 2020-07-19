---
title: DAG的拓扑顺序与深度优先搜索
canonical_url: https://duinomaker.top/posts/topological-order-and-depth-first-searching/
date: 2020-02-26 07:33:41
categories: [Algorithm Contest]
tags: [Graph Theory, Depth-first Searching, Dynamic Programming]
widgets:
plugins:
    katex: true
---

刷 AtCoder 动态规划专题时，卡在了{% link G题 https://atcoder.jp/contests/dp/tasks/dp_g/ AtCoder Educational DP Contest - G - Longest Path %}上面，大概是因为不熟悉拓扑顺序。

所以这篇文章将探讨有向无环图中的拓扑顺序与深度优先搜索算法。

<!-- more -->

---

# 定义

{% blockquote Wikipedia https://en.wikipedia.org/wiki/Topological_sorting/ Topological sorting %}
In computer science, a topological sort or topological ordering of a directed graph is a linear ordering of its vertices such that for every directed edge uv from vertex u to vertex v, u comes before v in the ordering. 
{% endblockquote %}

拓扑排序，是将一个有向无环图中所有顶点排成一个线性序列，使得图中任意一条边 $\langle u,v\rangle$ 都满足 $u$ 在线性序列中出现在 $v$ 之前。

# 算法

常见的实现算法有这两种，更常见的是第一种，它更符合直观理解。

## Kahn's algorithm

简单来说，首先创建一个列表用于存储排序后的顶点。找到一个没有出度的顶点，将其放入列表的最后，切断以该顶点为起点的所有边，再去找没有出度的点，并一直重复这些过程直至所有顶点都已加入列表（如果没有全部加入列表却找不出没有出度的顶点了，这张图一定是有环图）。

### 示例代码

``` c++ Kahn.cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int MAXN = 1e5 + 7;

int cnt[MAXN]; // cnt[v] means the number of edges end with v
vector<int> from[MAXN]; // to[v] stores ends of edges starting from 
int result[MAXN], idx;
bool vis[MAXN]; // wether a vertx is already in the result list

int main()
{
    int n, m; // n for vertices, m for edges

    scanf("%d%d", &n, &m);
    for (int i = 0; i != m; ++i) {
        int u, v; // an edge from u to v
        scanf("%d%d", &u, &v);
        from[u].push_back(v);
        ++cnt[v];
    }

    while (idx != n) {
        bool flag = true;
        for (int i = 1; i <= n; ++i) {
            if (!vis[i] && !cnt[i]) {
                flag = false;
                vis[i] = true;
                result[idx++] = i;
                for (int j : from[i])
                    --cnt[j];
            }
        }
        if (flag) // finding no vertex with no predecessor
            puts("Not a DAG (cyclic graph)."), exit(0);
    }

    // print vertices out in topological order
    printf("%d", result[0]);
    for (int i = 1; i != n; ++i)
        printf(" %d", result[i]);
    puts("");
}
```

## Depth-first search

另一种算法使用了深度优先搜索。随意抽取一个未被造访的点进行深度优先搜索，搜索到 “叶子顶点”（只有入度没有出度的顶点）后将其加入搜索结果。深度优先搜索的过程中如果重复遇到同一个顶点，则该图不是 DAG（有回环）。

这里的深度优先搜索的目的是探索叶子顶点，探索完成后才会将顶点标上已造访的标记。为了判断是否重复遇到同一个顶点，需要使用另一个 “临时标记”，沿途记录某个顶点是否已被造访，并在一次探索完成后删除。要注意与判断该顶点是否已被造访的 “永久标记” 进行区分。

### 示例代码

``` c++ Depth-first-search.cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int MAXN = 1e5 + 7;

vector<int> from[MAXN]; // to[v] stores ends of edges starting from v
int result[MAXN], idx;
bool perm[MAXN], temp[MAXN]; // permanent mark and temporary mark

void dfs(int u)
{
    if (temp[u])
        puts("Not a DAG (cyclic graph)."), exit(0);
    temp[u] = true;
    for (int v : from[u])
        if (!perm[v])
            dfs(v);
    temp[u] = false;
    perm[u] = true;
    // mind that recursion means deferred operations
    // that's why we have to do insertions from back to front
    result[--idx] = u;
}

int main()
{
    int n, m; // n for vertices, m for edges

    scanf("%d%d", &n, &m);
    idx = n;
    for (int i = 0; i != m; ++i) {
        int u, v; // an edge from u to v
        scanf("%d%d", &u, &v);
        from[u].push_back(v);
    }

    while (idx)
        for (int i = 1; i <= n; ++i)
            if (!perm[i])
                dfs(i);

    // print vertices out in topological order
    printf("%d", result[0]);
    for (int i = 1; i != n; ++i)
        printf(" %d", result[i]);
    puts("");
}
```

# 应用

这里就用 AtCoder 动态规划专题的 G 题来举例。

题目链接：{% link AtCoder Educational DP Contest - G - Longest Path https://atcoder.jp/contests/dp/tasks/dp_g/ AtCoder Educational DP Contest - G - Longest Path %}

## 题意

给出一张有向无环图，每条边的长度都是 $1$，求出图中最长路径的长度。

将前面的深度优先搜索算法改一改，除去 “临时标记”，并且在回溯过程中记下以某顶点为起点的最长路径长度&hairsp;$(dp_i)$&hairsp;。

为什么这与拓扑序有关？深度优先搜索的顺序其实就是拓扑序，先被访问的顶点不会再被访问。所以沿途记录下的最长路径长度，确定后便不再改变。基于先前的的计算结果，按照一定的顺序和规则不断更新，这也是使用动态规划的理由。

### 示例代码

``` c++ G.cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int MAXN = 1e5 + 7;

vector<int> from[MAXN];
int dp[MAXN];
int ans;

void dfs(int u)
{
    if (dp[u])
        return;
    for (int v : from[u]) {
        dfs(v);
        dp[u] = max(dp[u], 1 + dp[v]);
    }
    if (dp[u] > ans)
        ans = dp[u];
}

int main()
{
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 0; i != m; ++i) {
        int u, v;
        scanf("%d%d", &u, &v);
        from[u].push_back(v);
    }
    for (int i = 1; i <= n; ++i)
        if (!dp[i])
            dfs(i);
    printf("%d\n", ans);
}
```
