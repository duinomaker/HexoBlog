---
title: “十字翻转棋问题” 的解法
canonical_url: https://duinomaker.top/posts/the-cross-flip-game/
date: 2020-02-11 22:34:37
categories: [Algorithm Contest]
tags: [Linear Algebra]
widgets:
plugins:
    katex: true
article:
    highlight:
        clipboard: true
language: zh
---

十字翻转棋问题有更巧妙的解法吗？线性代数带给我们不少启发。

<!-- more -->

---

## 题目描述

“传火” 这个游戏，需要点燃 $16$ 个火堆。
每个火堆可以处于以下两种状态之一：点燃或熄灭。 
这 $16$ 个火堆可以表示为一个 $4\times4$ 的方阵，可以对任何一个位置上的火堆进行 “切换”。
例如，对 $[i,j]$ 位置的火堆进行切换，会使得第 $i$ 行和第 $j$ 列上的所有火堆的状态也随着改变。
要求最终所有的火堆都被点亮。

### 输入格式

输入一共包含 $4$ 行，每行包含 $4$ 个火堆的初始状态。
符号 “`+`” 表示火堆处于熄灭状态，而符号 “`-`” 表示火堆处于燃烧状态。
输入数据保证至少一个火堆的初始状态是熄灭的。

### 输出格式

第一行输出一个整数 $N$，表示所需的最少切换次数。
接下来 $N$ 行描述切换顺序，每行输入两个整数，代表被切换状态的火堆的行号和列号，数字之间用空格隔开。
切换动作按照整体从上到下、同行从左到右的顺序输出。

### 样例

输入样例

``` plain
+++-
+--+
+--+
-+++
```

输出样例

``` plain
2
1 1
4 4
```

## 思路与题解

最直接的思路当然是递归枚举所有可能的切换方式了。先枚举只切换一次的 $16$ 种情况，再枚举切换两次的 $15\times15$ 种情况，以此类推。

由此看来，这样做效率十分低下。假设最少切换次数是 $12$，运算量也可以达到 $10^9$ 数量级，根本无法应对需要更多切换次数的情况。

所以我们引入如下方法，首先给这 $16$ 个火堆编号：

$$\begin{array}{|c|c|c|c|}\hline1&2&3&4\\\\\hline5&6&7&8\\\\\hline9&10&11&12\\\\\hline13&14&15&16\\\\\hline\end{array}$$

用 $b_i$ 表示第 $i$ 个火堆的状态，$b_i$ 取值 $1$ 为熄灭状态，取值 $0$ 为燃烧状态。样例中，$b$ 就可以如此表示为如下的 “状态向量”：

$$b=(1,1,1,0,1,0,0,1,1,0,0,1,0,1,1,1)^{\rm T}$$

接下来定义向量 $x$，用 $x_i$ 表示是否需要对第 $i$ 个火堆进行切换，是为 $1$，不是为 $0$&hairsp;。我们发现，火堆状态的切换可以用**异或运算**来表示；又由于火堆最终都将处于熄灭状态，我们可以对第一个火堆列出方程，并化简：

$$b_1\oplus x_1\oplus x_2\oplus x_3\oplus x_4\oplus x_5\oplus x_9\oplus x_{13} = 0$$

$$x_1\oplus x_2\oplus x_3\oplus x_4\oplus x_5\oplus x_9\oplus x_{13} = b_1$$

类似地，可以对第 $2,3,\ldots,16$ 个火堆列出方程，并组成方程组：

$$\begin{cases}x_1\oplus x_2\oplus x_3\oplus x_4\oplus x_5\oplus x_9\oplus x_{13}&=&b_1\\\\x_1\oplus x_2\oplus x_3\oplus x_4\oplus x_6\oplus x_{10}\oplus x_{14}&=&b_2\\\\\qquad\qquad\cdots\\\\x_4\oplus x_8\oplus x_{12}\oplus x_{13}\oplus x_{14}\oplus x_{15}\oplus x_{16}&=&b_{16}\end{cases}$$

于是，求解哪些火堆需要切换的问题则转化为了求解方程组的问题。

到了这一步，你的线性代数知识是否已被唤起？这里不再是线性方程组，而将线性方程中的加法换为异或，变为了 “异或方程组”，同样可以化为矩阵形式：

$$Ax=b\quad\Leftrightarrow\quad\left[\begin{array}{c}\textcolor{red}{1}\\,\textcolor{red}{1}\\,\textcolor{red}{1}\\,\textcolor{red}{1}\\,\textcolor{red}{1}\\,0\\,0\\,0\\,\textcolor{red}{1}\\,0\\,0\\,0\\,\textcolor{red}{1}\\,0\\,0\\,0\\\\\textcolor{red}{1}\\,\textcolor{red}{1}\\,\textcolor{red}{1}\\,\textcolor{red}{1}\\,0\\,\textcolor{red}{1}\\,0\\,0\\,0\\,\textcolor{red}{1}\\,0\\,0\\,0\\,\textcolor{red}{1}\\,0\\,0\\\\\cdots\\;\text{another 13 lines}\\;\cdots\\\\0\\,0\\,0\\,\textcolor{red}{1}\\,0\\,0\\,0\\,\textcolor{red}{1}\\,0\\,0\\,0\\,\textcolor{red}{1}\\,\textcolor{red}{1}\\,\textcolor{red}{1}\\,\textcolor{red}{1}\\,\textcolor{red}{1}\end{array}\right]x=b$$

利用高斯消元法，对增广矩阵 $[A|b]$ 进行初等行变换（只包括行之间的异或运算），直到矩阵 $A$ 化为单位矩阵；而变换后的状态向量 $b$ 便成了我们需要求解的 $x$ 向量。

最后根据向量 $x$，按顺序输出即可。

如此，$4\times4$ 的 “传火” 问题，甚至是 $m\times n$ 的十字翻转棋问题，便能在 $O((mn)^2)$ 的时间复杂度下解决了。

## 参考代码

``` c++ solution.cpp
#include <array>
#include <bitset>
#include <cstdio>
using namespace std;

void solve(bitset<16>& x)
{
    // generate matrix A
    array<bitset<16>, 16> A;
    for (int i = 0; i != 4; ++i)
        for (int j = 0; j != 4; ++j)
            for (int k = 0; k != 4; ++k) {
                A[i * 4 + j].set(i * 4 + k);
                A[i * 4 + j].set(k * 4 + j);
            }
    for (int i = 0; i != 15; ++i) {
        // if A[i][i] is not a pivot
        // swap row i with the first row which has a pivot
        if (!A[i][i])
            for (int j = i + 1; j != 16; ++j)
                if (A[j][i]) {
                    swap(A[j], A[i]);
                    bool tmp = x[j];
                    x[j] = x[i];
                    x[i] = tmp;
                    break;
                }
        // eliminate
        for (int j = i + 1; j != 16; ++j)
            if (A[j][i]) {
                A[j] ^= A[i];
                x[j] = x[j] ^ x[i];
            }
    }
    // eliminate
    for (int i = 15; i != 0; --i)
        for (int j = i - 1; j >= 0; --j)
            if (A[j][i]) {
                A[j] ^= A[i];
                x[j] = x[j] ^ x[i];
            }
}

int main()
{
    bitset<16> x;
    for (int i = 0; i != 4; ++i) {
        for (int j = 0; j != 4; ++j)
            if (getchar() == '+')
                x.set(i * 4 + j);
        getchar();
    }
    solve(x);
    printf("%ld\n", x.count());
    for (int i = 0; i != 16; ++i)
        if (x[i])
            printf("%d %d\n", (i / 4) + 1, (i % 4) + 1);
}
```
