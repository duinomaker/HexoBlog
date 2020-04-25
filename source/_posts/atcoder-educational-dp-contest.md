---
title: AtCoder动态规划专题
canonical_url: https://duinomaker.top/posts/atcoder-educational-dp-contest/
date: 2020-05-15 23:14:59
categories: [Algorithm Contest]
tags: [Dynamic Programming]
widgets:
---

比赛链接：{% link AtCoder Educational DP Contest https://atcoder.jp/contests/dp %}

<!-- more -->

---

## A - {% link Frog 1 https://atcoder.jp/contests/dp/tasks/dp_a AtCoder Educational DP Contest - A - Frog 1 %}

### 题意

有 $n$ 块不同高度的石柱，第 $i$ 块的高度为 $h_i\\,$。一只青蛙要从第 $1$ 块跳到第 $n$ 块，每次从第 $i$ 块跳到第 $i+1$ 块，代价是两块石柱高度差的绝对值。求最小代价和。

### 题解

$dp[i]$ 表示从第 $1$ 块直到第 $i$ 块的最小代价。大致的状态转移方程：
$$dp[i]=\min\lbrace dp[i-1]+|h_i-h_{i-1}|,dp[i-2]+|h_i-h_{i-2}|\rbrace$$

### 参考代码

``` c++ A.cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e5;

int a[maxn], dp[maxn];

int main()
{
    int n;
    scanf("%d", &n);
    for (int i = 0; i != n; ++i)
        scanf("%d", &a[i]);
    dp[1] = abs(a[0] - a[1]);
    for (int i = 2; i != n; ++i)
        dp[i] = min(
            dp[i - 1] + abs(a[i] - a[i - 1]),
            dp[i - 2] + abs(a[i] - a[i - 2]));
    printf("%d\n", dp[n - 1]);
}
```
## B - {% link Frog 2 https://atcoder.jp/contests/dp/tasks/dp_b AtCoder Educational DP Contest - B - Frog 2 %}

### 题意

和前一题一样，不过可以从第 $i$ 块跳到 $i+1,i+2,\ldots,i+k$ 块。

### 题解

$dp[i]$ 表示从第 $1$ 块直到第 $i$ 块的最小代价。大致的状态转移方程：
$$dp[i]=\min\lbrace dp[i-1]+|h_i-h_{i-1}|,dp[i-2]+|h_i-h_{i-2}|,\ldots,dp[i-k]+|h_i-h_{i-k}|\rbrace$$

### 参考代码

``` c++ B.cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e5;

int a[maxn], dp[maxn];

int main()
{
    int n, k;
    scanf("%d%d", &n, &k);
    for (int i = 0; i != n; ++i)
        scanf("%d", &a[i]);
    memset(dp, 0x3f, sizeof(dp));
    dp[0] = 0;
    for (int i = 1; i != n; ++i)
        for (int j = i - 1, j_ = max(0, i - k); j >= j_; --j)
            dp[i] = min(dp[i], dp[j] + abs(a[i] - a[j]));
    printf("%d\n", dp[n - 1]);
}
```
## C - {% link Vacation https://atcoder.jp/contests/dp/tasks/dp_c AtCoder Educational DP Contest - C - Vacation %}

### 题意

假期有 $n$ 天，每天可以做三件事中的一件，做每件事都能获得一定量的 “愉悦值” $a_j\\,$。

不能连续两天做同一件事情，求 “愉悦值” 的最大值。

### 题解

$dp[i][j]$ 表示在第 $i$ 天做第 $j$ 件事的最大愉悦值。状态转移方程：
$$dp[i][j]=a_j+\max\lbrace dp[i-1][k_1],dp[i-1][k_2]\rbrace,\text{其中 }k_1,k_2\text{ 为与 }j\text{ 不同的两件事}$$

### 参考代码

``` c++ C.cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e5 + 1;

int a[maxn][3], dp[maxn][3];

int main()
{
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i)
        scanf("%d%d%d", &a[i][0], &a[i][1], &a[i][2]);
    for (int i = 1; i <= n; ++i) {
        dp[i][0] = a[i][0] + max(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = a[i][1] + max(dp[i - 1][0], dp[i - 1][2]);
        dp[i][2] = a[i][2] + max(dp[i - 1][0], dp[i - 1][1]);
    }
    printf("%d\n", max({ dp[n][0], dp[n][1], dp[n][2] }));
}
```
## D - {% link Knapsack 1 https://atcoder.jp/contests/dp/tasks/dp_d AtCoder Educational DP Contest - D - Knapsack 1 %}

### 题意

有 $n$ 件物品，第 $i$ 件体积为 $w_i$，价值为 $v_i\\,$。

给你一个容量为 $W$ 的背包，问能容纳下的物品的最大价值和。

### 题解

经典的 01背包问题，用 $dp[i][j]$ 表示背包容量为 $j$ 且只考虑前 $i$ 种物品时的最大价值和。大致的状态转移方程为：
$$dp[i][j]=\max\lbrace dp[i-1][j],dp[i][j-w_i]+v_i\rbrace$$

### 参考代码

``` c++ D.cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 101;
const int maxw = 1e5 + 1;

ll w[maxn], v[maxn], dp[maxn][maxw];

int main()
{
    ll n, W;
    scanf("%lld%lld", &n, &W);
    for (int i = 1; i <= n; ++i)
        scanf("%lld%lld", &w[i], &v[i]);
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= W; ++j)
            if (j < w[i])
                dp[i][j] = dp[i - 1][j];
            else
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i]);
    printf("%lld\n", dp[n][W]);
}
```
## E - {% link Knapsack 2 https://atcoder.jp/contests/dp/tasks/dp_e AtCoder Educational DP Contest - E - Knapsack 2 %}

### 题意

有 $n$ 件物品，第 $i$ 件体积为 $w_i$，价值为 $v_i\\,$。

给你一个容量为 $W$ 的背包，问能容纳下的物品的最大价值和。但是限制如下：

$1\leq N\leq100$
$1\leq W\leq10^9$
$1\leq w_i\leq W$
$1\leq v_i\leq10^3$

### 题解

01 背包问题的变种。由于 $v_i$ 较小，可以用 $dp[i][j]$ 表示总价值为 $j$ 且只考虑前 $i$ 种物品时的背包剩余容量。首先用 $-1$ 填充 $dp$ 表格，再令 $dp[0][0]=W\\,$。关键的状态转移方程为：
$$dp[i][j]=\max\lbrace dp[i-1][j],dp[i-1][j-v_i]-w_i\rbrace$$

之后，$dp[n]$ 中最右的非 $-1$ 数的索引就是答案。

### 参考代码

``` c++ E.cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 101;
const int maxv = 1e5 + 1;

int dp[maxn][maxv];

int main()
{
    int n, w, v, ans = 0;
    memset(dp, -1, sizeof(dp));
    scanf("%d%d", &n, &dp[0][0]);
    for (int i = 1; i <= n; ++i) {
        scanf("%d%d", &w, &v);
        for (int j = 0; j != maxv; ++j)
            if (j < v)
                dp[i][j] = dp[i - 1][j];
            else {
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - v] - w);
                if (dp[i][j] != -1 && j > ans)
                    ans = j;
            }
    }
    printf("%d\n", ans);
}
```
## F - {% link LCS https://atcoder.jp/contests/dp/tasks/dp_f AtCoder Educational DP Contest - F - LCS %}

### 题意

给定两个字符串 $s$ 和 $t$，求出它们的一个最长公共子序列。

### 题解

用 $dp[i][j]$ 表示 $s$ 的前 $i$ 个字符构成的子串与 $t$ 的前 $j$ 个字符构成的子串的最长公共子序列长度，并用其找出最长公共子序列。

### 参考代码

``` c++ F.cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 3001;

char s[maxn], t[maxn], ans[maxn];
int dp[maxn][maxn];

int main()
{
    scanf("%s%s", s + 1, t + 1);
    int m = strlen(s + 1), n = strlen(t + 1);
    for (int i = 1; i <= m; ++i)
        for (int j = 1; j <= n; ++j)
            if (s[i] == t[j])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = max(dp[i][j - 1], dp[i - 1][j]);
    int i = m, j = n, p = dp[m][n];
    ans[p] = '\0';
    while (p) {
        if (j && dp[i][j] == dp[i][j - 1])
            --j;
        else if (i && dp[i][j] == dp[i - 1][j])
            --i;
        else if (dp[i][j] != dp[i - 1][j - 1])
            ans[--p] = s[i], --i, --j;
    }
    puts(ans);
}
```
## G - {% link Longest Path https://atcoder.jp/contests/dp/tasks/dp_g AtCoder Educational DP Contest - G - Longest Path %}

### 题意

给出一个有向无环图，求出其中的最长路径长度。

### 题解

用 $dp[i]$ 表示从顶点 $i$ 出发的最长路径长度。

假设从顶点 $u$ 出发有 $n$ 条边，第 $i$ 条边的终点为 $v_i$，则有状态转移方程：
$$dp[u]=1+\max_{i=1}^n dp[v_i]$$

可以使用邻接表来存储所有边，一个顶点对应许多终点。用三个数组存储：$hd_u$ 表示从顶点 $u$ 出发的首条边的终点的索引；$nx_i$ 表示从同一起点出发的下一条边的终点的索引；$e_i$ 表示索引为 $i$ 的顶点的序号。

这部分有点绕，邻接表的初始化在代码第 $23$ 行，使用在代码第 $12$ 行。

### 参考代码

``` c++ G.cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 2e5 + 1;
const int maxm = 1e5 + 1;

int hd[maxn], nx[maxm], e[maxm];
int dp[maxn];

int dfs(int x)
{
    if (!dp[x])
        for (int i = hd[x]; i; i = nx[i])
            dp[x] = max(dp[x], dfs(e[i]) + 1);
    return dp[x];
}

int main()
{
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 1, x, y; i <= m; ++i) {
        scanf("%d%d", &x, &y);
        nx[i] = hd[x], hd[x] = i, e[i] = y;
    }
    int ans = 0;
    for (int i = 1; i <= n; ++i)
        ans = max(ans, dfs(i));
    printf("%d\n", ans);
}
```
## H - {% link Grid 1 https://atcoder.jp/contests/dp/tasks/dp_h AtCoder Educational DP Contest - H - Grid 1 %}

### 题意

给出一个 $h\times w$ 的表格，其中部分格子不能走。问从 $(1,1)$ 走到 $(h,w)$，且每次只能向右或者向下走，一共有多少条路径可以走。

### 题解

用 $dp[i][j]$ 表示从 $(1,1)$ 走到 $(i,j)$ 的所有路径数。

### 参考代码

``` c++ H.cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1001;
const int mod = 1e9 + 7;

char mat[maxn][maxn];
int dp[maxn][maxn];

int main()
{
    int h, w;
    scanf("%d%d", &h, &w);
    for (int i = 1; i <= h; ++i)
        scanf("%s", mat[i] + 1);
    dp[0][1] = 1;
    for (int i = 1; i <= h; ++i)
        for (int j = 1; j <= w; ++j)
            if (mat[i][j] == '.')
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % mod;
    printf("%d\n", dp[h][w]);
}
```
## I - {% link Coins https://atcoder.jp/contests/dp/tasks/dp_i AtCoder Educational DP Contest - I - Coins %}

### 题意

一共有 $n$ 枚硬币，第 $i$ 枚硬币投掷后正面朝上的概率为 $p_i\\,$。全部投掷后，求出正面朝上的硬币数多于反面朝上的硬币数的概率。

### 题解

用 $dp[i][j]$ 表示投掷了 $j$ 枚硬币后，其中 $i$ 枚正面朝上的概率。则有状态转移方程：
$$dp[i][j]=dp[i][j-1]\times p_j+dp[i-1][j-1]\times(1-p_j)$$

### 参考代码

``` c++ I.cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 3000;

double p[maxn], np[maxn];
double dp[maxn][maxn];

int main()
{
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i)
        scanf("%lf", &p[i]), np[i] = 1.0 - p[i];
    dp[1][0] = 1.0;
    double ans = 0.0;
    for (int i = 1, i_ = (n >> 1) + 1; i <= i_; ++i)
        for (int j = 1; j <= n; ++j) {
            dp[i][j] = dp[i][j - 1] * p[j] + dp[i - 1][j - 1] * np[j];
            if (j == n)
                ans += dp[i][j];
        }
    printf("%.9f\n", ans);
}
```
## J - {% link Sushi https://atcoder.jp/contests/dp/tasks/dp_j AtCoder Educational DP Contest - J - Sushi %}

### 题意

共有 $n$ 盘寿司，每盘里有 $0$ 到 $3$ 个寿司。你每次随机选择一个盘子，若盘子里有寿司，就吃掉一个。

问你吃掉所有寿司需要选择盘子的期望次数。

### 题解

用 $dp[x][y][z]$ 表示 $x$ 个盘子里有一个寿司，$y$ 个盘子里有两个寿司，$z$ 个盘子里有三个寿司时，需要选择盘子的期望次数。

一共有 $n$ 个盘子，其中有 $x+y+z$ 个盘子里至少有一个寿司。那么选择到一个有寿司的盘子的期望次数为 $\frac{n}{x+y+z}\\,$。选到之后，有 $\frac{x}{x+y+z}$ 的概率选到有一个寿司的盘子、$\frac{y}{x+y+z}$ 的概率选到有两个寿司的盘子、$\frac{z}{x+y+z}$ 的概率选到有三个寿司的盘子。于是就有：
$$\begin{aligned}dp[x][y][z]&=&dp[x-1][y][z]\times\frac{x}{x+y+z}\\\\&+&dp[x+1][y-1][z]\times\frac{y}{x+y+z}\\\\&+&dp[x][y+1][z-1]\times\frac{z}{x+y+z}\\\\&+&\frac{n}{x+y+z}\end{aligned}$$

### 参考代码

``` c++ J.cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 301;

double n, dp[maxn][maxn][maxn];
bool vis[maxn][maxn][maxn];

double dfs(int x, int y, int z)
{
    if (x == -1 || y == -1 || z == -1)
        return 0.0;
    if (vis[x][y][z])
        return dp[x][y][z];
    vis[x][y][z] = 1;
    double denom = x + y + z;
    return dp[x][y][z] = (dfs(x - 1, y, z) * x
                        + dfs(x + 1, y - 1, z) * y
                        + dfs(x, y + 1, z - 1) * z
                        + n) / denom;
}

int main()
{
    int t, tmp[3] { 0, 0, 0 };
    scanf("%d", &t), n = t;
    for (int i = t; i--;)
        scanf("%d", &t), ++tmp[t - 1];
    vis[0][0][0] = 1;
    printf("%.9f\n", dfs(tmp[0], tmp[1], tmp[2]));
}
```

## K - {% link Stones https://atcoder.jp/contests/dp/tasks/dp_k AtCoder Educational DP Contest - K - Stones %}

### 题意

你和朋友玩一个游戏：共有 $n$ 枚石子，给你们一个集合 $A=\lbrace a_1,a_2,\ldots,a_n\rbrace$，你们交替着选择 $A$ 中的一个数字，并从石子堆中恰好取走那么多个石子。如果一方不再能够取走石子，他就输了。

假设双方都使用最优策略取石子，问是先手赢还是后手赢。

### 题解

用 $dp[i]$ 表示剩余 $i$ 枚石子时的赢家，先手赢为 $1$，后手赢为 $-1\\,$。

使用记忆化搜索来解决。搜索时以 “先手视角” 遍历所有能取到的情况，如果有可能赢——即自己取了一定数量的石子后，仍然会赢——那么就能赢，因为双方都使用最优策略。

代码第 $14$ 行 `dfs(rem - a[i]) == -1` 中判断先手是否会赢是与 $-1$ 相比较。这是因为这里是以后手的视角来看的，后手的后手会赢，也就是先手会赢。

### 参考代码

``` c++ K.cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e5 + 1;

int n, k;
int a[maxn], dp[maxn];

int dfs(int rem)
{
    if (dp[rem])
        return dp[rem];
    bool flag = false;
    for (int i = 0; !flag && i != n; ++i)
        if (a[i] <= rem && dfs(rem - a[i]) == -1)
            flag = true;
    return dp[rem] = (flag ? 1 : -1);
}

int main()
{
    scanf("%d%d", &n, &k);
    for (int i = 0; i != n; ++i)
        scanf("%d", &a[i]);
    puts(dfs(k) == 1 ? "First" : "Second");
}
```

## L - {% link Deque https://atcoder.jp/contests/dp/tasks/dp_l AtCoder Educational DP Contest - L - Deque %}

### 题意

### 题解

### 参考代码

``` c++ L.cpp
```