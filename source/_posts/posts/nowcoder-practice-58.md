---
title: 牛客练习赛58
canonical_url: https://duinomaker.top/posts/nowcoder-practice-58/
date: 2020-03-02 11:11:11
categories: [Algorithm Contest]
tags: [Brute Force, Depth-first Searching, Dynamic Programming, Offline Query]
widgets:
---

解题报告 ( <font color="#0db104">A</font><font color="#0db104">B</font><font color="#0db104">C</font><font color="#0db104">D</font><font color="#0db104">E</font><font color="#7a7a7a">F</font> )

这两天为了把{% link E题 https://ac.nowcoder.com/acm/contest/4090/E/ 牛客练习赛58 - E - 最大GCD %}搞懂，还接触了一些线段树、离线处理的相关知识。虽然这里没有用到线段树，不过它在解决区间问题时是个重要的数据结构，这几天会相应地更新一些探究线段树的文章。

<!-- more -->

比赛链接：{% link 牛客练习赛58 https://ac.nowcoder.com/acm/contest/4090/ 牛客练习赛58 %}

---

这次练习赛 AB 两题都是签到题，不必多说。

# C. 矩阵消除游戏

## 题目描述

牛妹在玩一个名为矩阵消除的游戏，矩阵的大小是 $m$ 行 $n$ 列，第 $i$ 行第 $j$ 列的单元格的权值为 $a_{i,j}$​ ，牛妹可以进行 $k$ 个回合的游戏，在每个回合，牛妹可以选择一行或者选择一列，然后将这一行或者这一列的所有单元格中的权值变为 $0$，同时牛妹的分数会加上这一行或者这一列中的所有单元格的权值的和。

求出得分的最大值。

## 输入描述

第一行三个整数 $m,n,k$
接下来 $m$ 行每行 $n$ 个整数表示矩阵中各个单元格的权值。

$1\leq m,n\leq15$
$1\leq a_{i,j}\leq10^6$
$1\leq k\leq m\times n$

## 输出描述

输出一个整数表示牛妹能获得的最大分数。

## 示例

### 输入

``` plain
3 3 2
101 1 102
1 202 1
100 8 100
```

### 输出

``` plain
414
```

## 题解

这题尝试了不少策略，都是贪心策略，不过都是错的。还没有想到什么更好的办法，那就暴力搜索吧……

一共取 $k$ 行 / 列，那么就先试着取 $0$ 行 $k$ 列，再试着取 $1$ 行 $k-1$ 列…… 逐次枚举。

### 参考代码

``` c++ C.cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int maxn = 1e6 + 7;

int m, n, k;
int mat[20][20];
int ans;

int cols_max(int num)
{
    int sum[20] {}, res = 0;
    for (int i = 0; i != n; ++i)
        for (int j = 0; j != m; ++j)
            sum[i] += mat[j][i];
    sort(sum, sum + n, greater<int>());
    for (int i = 0; i != num; ++i)
        res += sum[i];
    return res;
}

void dfs(int row, int num = 1, int sum = 0)
{
    if (num == k + 1)
        return;
    int rec[20], rsum = 0, tmp;
    for (int i = 0; i != n; ++i) {
        rec[i] = mat[row][i];
        rsum += rec[i];
        mat[row][i] = 0;
    }
    if ((tmp = sum + rsum + cols_max(k - num)) > ans)
        ans = tmp;
    for (int i = row + 1; i != m; ++i)
        dfs(i, num + 1, sum + rsum);
    for (int i = 0; i != n; ++i)
        mat[row][i] = rec[i];
}

int main()
{
    scanf("%d%d%d", &m, &n, &k);
    int sum = 0;
    for (int i = 0; i != m; ++i)
        for (int j = 0; j != n; ++j) {
            scanf("%d", &mat[i][j]);
            sum += mat[i][j];
        }
    if (k >= min(m, n))
        printf("%d\n", sum), exit(0);
    ans = cols_max(k);
    for (int i = 0; i != m; ++i)
        dfs(i);
    printf("%d\n", ans);
}
```

# D. 迷宫

## 题目描述

有一个 $m\times n$ 的迷宫，迷宫中每个格子用 $0$ 或 $1$ 表示，$0$ 表示该格子可以通过，$1$ 表示该格子是个障碍物，牛妹站在格子 $(1,1)$，出口在格子 $(m,n)$，牛妹想要走出迷宫，但牛妹只会按以下策略走：

牛妹当前所在的格子称为当前格子

1. 如果当前格子右边没有障碍物，牛妹就向右走，否则转到2
2. 如果当前格子下方没有障碍物，牛妹就向下走，否则转到3
3. 如果当前格子左边没有障碍物，牛妹就向左走，否则转到4
4. 如果当前格子上方没有障碍物，牛妹就向上走，否则转到5
5. 牛妹站在原地不动

由于牛妹按这样的策略可能会无法走到出口，牛妹的好朋友牛牛决定在牛妹离开格子 $(1,1)$ 前把迷宫中的一些非障碍格子变成障碍，帮助牛妹走出迷宫，但是牛牛比较懒，他想要最小化变成障碍的非障碍格子的数量。

## 输入描述

第一行两个整数 $m,n$ 表示迷宫的大小
接下来 $m$ 行每行一个长度为 $n$ 的 $01$ 串表示迷宫的格局

$1\leq n,m\leq1000$

## 输出描述

输出一个整数表示牛牛最少需要转换成障碍格子的非障碍格子的数量，如果无法帮助牛妹走出迷宫，输出 `-1`&hairsp;。

## 示例

### 输入

``` plain
4 4
0000
0110
0110
0000
```

### 输出

``` plain
0
```

## 题解

这题给出的五条行走策略，有点吓唬人，实际上可以缩减为这两条：

1. 若右边没有障碍物，向右走一格，否则转到2
2. 若下边没有障碍物，向下走一格

这两条都不符合的话，则无法到达终点。如果在某个位置可以向左走一格，下一步一定又得回到右边，从而左右来回移动，无法到达终点。

有了这两条，即只能向右或者向下走，这个问题就可以用记忆化搜索，或者动态规划来解决了。使用一个表格&hairsp;$(dp)$来记录结果。其中 $dp[i][j]$ 的含义是 “从 $(1,1)$ 位置走到 $(i,j)$ 位置总共放置的障碍物的最少个数”。那么，$(i,j)$ 取终点位置时，表中的便是这题的结果。

$$dp[i][j]=\begin{cases}0&,i=1,j=1\\\\dp[i][j-1]&,i=1,j>1\\\\dp[i-1][j]&,i>1,j=1\\\\\min\\{dp[i][j-1],dp[i-1][j]+1\\}&,(i-1,j+1)\text{处没有障碍物}\\\\\min\\{dp[i][j-1],dp[i-1][j]\\}&,\text{否则}\end{cases}$$

仅当右边和下边都没有障碍物，却坚持要向下走时，需要在右边加一个障碍物。这就是上式第四条的含义。

我写了两个版本的代码，最终发现，动态规划比记忆化搜索快了近十倍。

统计数组访问（存 / 取）次数后大概分析了一下，这大概是因为动态规划只需要记忆化搜索一半不到的访问量，加之没有函数递归调用的开销。

### 参考代码 (Memory Searching)

``` c++ D_MS.cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int maxn = 1007;

int m, n;
char mat[maxn][maxn];
int dp[maxn][maxn], vis[maxn][maxn];

int dfs(int x, int y)
{
    if (vis[x][y])
        return dp[x][y];
    vis[x][y] = 1;
    if (y != n - 1 && mat[x][y + 1] == '0')
        dp[x][y] = min(dp[x][y], dfs(x, y + 1));
    if (x != m - 1 && mat[x + 1][y] == '0') {
        if (y != n - 1 && mat[x][y + 1] == '0')
            dp[x][y] = min(dp[x][y], dfs(x + 1, y) + 1);
        else
            dp[x][y] = min(dp[x][y], dfs(x + 1, y));
    }
    return dp[x][y];
}

int main()
{
    scanf("%d%d", &m, &n);
    memset(dp, 0x3f, sizeof(dp));
    dp[m - 1][n - 1] = 0;
    for (int i = 0; i != m; ++i)
        scanf("%s", mat[i]);
    if (dfs(0, 0) == 0x3f3f3f3f)
        puts("-1"), exit(0);
    printf("%d\n", dp[0][0]);
}
```

### 参考代码 (Dynamic Programming)

``` c++ D_DP.cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int maxn = 1007;

int m, n;
char mat[maxn][maxn];
int dp[maxn][maxn];

int main()
{
    scanf("%d%d", &m, &n);
    for (int i = 1; i <= m; ++i)
        scanf("%s", mat[i] + 1);
    memset(dp, 0x3f, sizeof(dp));
    dp[1][1] = 0, mat[1][1] = '1';
    for (int i = 1; i <= m; ++i)
        for (int j = 1; j <= n; ++j) {
            if (mat[i][j] == '1')
                continue;
            dp[i][j] = min(dp[i][j - 1],
                dp[i - 1][j] + (mat[i - 1][j + 1] == '0' ? 1 : 0));
        }
    if (dp[m][n] == 0x3f3f3f3f)
        puts("-1"), exit(0);
    printf("%d\n", dp[m][n]);
}
```

# E. 最大GCD

## 题目描述

给出长度为 $n$ 的序列，序列中有 $n$ 个元素 $a_1,a_2,\ldots a_n$​，你需要进行 $q$ 次查询，每次查询形如以下格式：
       $l\\;r\\;x$：你需要选择两个整数 $s,t$ 满足 $l\leq s\leq t\leq r$，使得 $\gcd(a[s],a[s+1],\ldots,a[t−1],a[t],x)$ 最大化。

## 输入描述

第一行两个整数 $n,q$
第二行 $n$ 个整数 $a_1,a_2,\ldots a_n$​
接下来 $q$ 行每行三个整数表示一个查询

$1\leq l\leq r\leq n,q,x,a_i​\leq10^5$

## 输出描述

对于每个查询输出一个整数表示 $\gcd(a[s],a[s+1],\ldots,a[t−1],a[t],x)$ 的最大值。

## 示例

### 输入

``` plain
4 2
2 4 3 6
1 3 6
1 4 10
```

### 输出

``` plain
3
2
```

## 题解

看到这题，我懵圈了好久。查询时 “使得 $\gcd(a[s],a[s+1],\ldots,a[t−1],a[t],x)$ 最大化” 的这个步骤怎么解决？

实际上是出题人在吓唬人，由于 $\gcd$ 的特殊性质，选取的数越多只会让结果越小。所以查询的实际步骤是 “在 $\\{a[l],a[l+1],\ldots,a[r]\\}$ 里取一个数 $a_i$，使得 $\gcd(a_i,x)$ 最大化”。

首先想到的是最朴素的做法：

1. 对于每一次查询，都将 $[l,r]$ 区间里的每一个数与 $x$ 求最大公约数，途中记录下最大的一个。

但是这样做的时间复杂度大致是 $O(nq\log(x))$，最坏情况下能达到 $10^{10}$ 数量级，不可行。

涉及到最大公因数的问题，如果朴素的算法不能解决，那么从因子的角度去考虑无疑是一个有益的尝试：

1. 首先将所有数的所有因子预存起来
2. 对于每一次查询，从大到小枚举 $x$ 的因子，对 $[l,r]$ 区间里的每一个数，判断其是否有这个因子。如果枚举过程中出现了共有的因子，这个因子就是要查询的最大值。

可以给所有数建一个 `vector<int>`，存储其所有的因子。因子的大小是有序的，这样对于 $x$ 的每个因子，使用二分查找就能在 $O(\log n)$ 的时间复杂度下判断一个数是否有这个因子。

这样做的时间复杂度大致是 $O(nq\log(F)),F$ 为某个数的因子个数。由于 $[1,10^5]$ 范围内每个数的因子最多也就 $128$ 个，二分查找因子的速度很快。虽然速度比一开始快了一些，最坏情况下还是达到了 $10^{10}$ 数量级，仍然不可行。

所以接下来，要引进**离线处理**的方法，什么是离线处理？离线处理即不考虑对查询进行立即答复，而是将问题集中起来，最后统一答复。等到所有问题都聚集起来的时候，我们对其分析，往往可以发现各个查询之间有某些关联，利用这些关联得以更有效地解决问题。

具体到这一题，我们采用离线处理的方法，将查询全部读入后，按照区间右端点的顺序排序 (为什么是按右端点的顺序排序？往下看)。

之前，查询每个因子，都要重新枚举一次区间里的每一个数，这样效率明显太低。于是可以创建一个数组 $rec$，其中 $rec_i$ 的值表示因子 $i$ 出现的最右位置。每次查询前，需要将 $rec$ 数组更新到右端点 (具体见下方的 `update` 函数)。之后，对于 $x$ 的某个因子 $i$，只需判断其出现的最后位置是否在查询的左端点之后，即 $rec_i\geq l$ 是否成立，就可以得知其是否在 $[l,r]$ 区间里出现过。

所以，按照右端点排序的理由就明确了，这样排序的话，可以确保 $rec$ 数组中存储的最右位置不超过当前查询的右端点。

这样做，需要更新的次数是所有查询右端点的最大值 (最大是 $n$&hairsp;)，每次查询需要 $F$ 次访问 $rec$ 数组 ($F$ 为某个 $x$ 的因子个数)。所以最坏情况下的时间复杂度是 $O(nF+qF)$，大约是 $10^6$ 数量级，符合要求。

### 参考代码

``` c++ E.cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int maxn = 1e5 + 7;

struct query {
    int l, r, x, idx;
} Q[maxn];

int n, q;
int a[maxn], rec[maxn], ans[maxn];
vector<int> fact[maxn];

void init()
{
    memset(rec, -1, sizeof(rec));
    for (int i = 1; i < maxn; ++i)
        for (int j = i; j < maxn; j += i)
            fact[j].push_back(i);
}

void update(int x, int pos)
{
    for (int& val : fact[x])
        rec[val] = pos;
}

int main()
{
    init();
    scanf("%d%d", &n, &q);
    for (int i = 0; i != n; ++i)
        scanf("%d", &a[i]);
    for (int i = 0; i != q; ++i)
        scanf("%d%d%d", &Q[i].l, &Q[i].r, &Q[i].x), Q[i].idx = i;
    sort(Q, Q + q, [](const query& a, const query& b) -> bool {
        return a.r < b.r;
    });
    int pos = 0;
    for (int i = 0; i != q; ++i) {
        int l = Q[i].l - 1, r = Q[i].r - 1, &x = Q[i].x, &idx = Q[i].idx;
        while (pos <= r)
            update(a[pos], pos), ++pos;
        for (auto it = fact[x].rbegin(), it_ = fact[x].rend(); it != it_; ++it)
            if (rec[*it] >= l) {
                ans[idx] = *it;
                break;
            }
    }
    for (int i = 0; i != q; ++i)
        printf("%d\n", ans[i]);
}
```

# F. XOR TREE