---
title: 2020牛客寒假算法基础集训营5
canonical_url: https://duinomaker.top/posts/nowcoder-2020-winter-camp-5/
date: 2020-02-14 23:56:55
categories: [Algorithm Contest]
widgets:
plugins:
    katex: true
article:
    highlight:
        clipboard: true
language: zh
---

解题报告 ( <font color="#0db104">A</font><font color="#0db104">B</font><font color="#7a7a7a">C</font><font color="#0db104">D</font><font color="#0db104">E</font><font color="#7a7a7a">F</font><font color="#7a7a7a">G</font><font color="#0db104">H</font><font color="#0db104">I</font><font color="#0db104">J</font> )

<!-- more -->

比赛链接：{% link 2020牛客寒假算法基础集训营5 https://ac.nowcoder.com/acm/contest/3006/ 2020牛客寒假算法基础集训营5 %}

---

# A. 模板

## 题目描述

牛牛，牛可乐和牛能组成了一只队伍参加ACM系列赛事，他们起了一个优雅的队名叫~“牛牛战队”。

牛牛战队在没有比赛的时候，会把各种板子放在密码柜里，防止弄丢。这一个密码由整个队伍掌管。其中牛牛和牛能有两个密钥，各自有一个仅由大写字母构成的字符串。牛可乐则掌握着解密方法。一天，你用一瓶可乐贿赂牛可乐，得到了解密的办法：

牛可乐将试图通过以下操作用尽可能少的步骤把一个密钥转换为另一个：

- 将其中任意一个字母替换为另一个
- 把最后一个字母删除
- 在尾部添加一个字母 

得到的转化步数就是最后的密码。

一天，你和他们队员一起聚餐，你用可乐把他们灌倒了，从牛牛和牛能口中套出了两个密钥。你要趁他们醒之前拿到模板并复印一份再放回去。你能尽快的算出密码吗？

## 输入描述

输入数据共 $3$ 行，第一行包括两个整数 $n,m\\,(1\leq n,m\leq10^5)$ 表示两个密钥的长度

第二行包含一个长度为 $n$ 的字符串 $s_1$ 表示第一个密钥。

第三行包含一个长度为 $m$ 的字符串 $s_2$ 表示第二个密钥。

## 输出描述

在一行内输出一个整数，表示密码。

## 示例

### 输入

``` plain
4 3
WXYZ
WXY
```

### 输出

``` plain
1
```

## 题解

由于插入和删除操作只能在字符串末尾进行，这题简单了很多。

$$\text{转化步数}=\max\\{m,n\\}\\,-\\,\text{重合的字符个数}$$

### 参考代码

``` c++ A.cpp
#include <bits/stdc++.h>
#define rep(i, l, r) for (int i = l, i##_ = r; i < i##_; ++i)
using namespace std;

int main()
{
    int n, m, ans = 0;
    string a, b;
    cin >> n >> m >> a >> b;
    rep(i, 0, min(a.length(), b.length()))
        if (a[i] == b[i])
            ++ans;
    cout << max(m, n) - ans << endl;
}
```

# B. 牛牛战队的比赛地

## 题目描述

由于牛牛战队经常要外出比赛，因此在全国各地建立了很多训练基地，每一个基地都有一个坐标 $(x,y)$&hairsp;。
这周末，牛牛队又要出去比赛了，各个比赛的赛点都在 $x$ 轴上。牛牛战队为了方便比赛，想找一个到达训练基地最大距离最小的地方作为比赛地。
这个问题对于牛牛战队太简单了，它就交给了你，你来帮他算一下~

## 输入描述

输入数据第一行包含一个整数 $N\\, (1\leq N\leq100,000)$，表示牛牛战队训练基地的数量。

接下来 $N$ 行，每行包括 $2$ 个整数 $x,y\\, (-10,000\leq x,y\leq10,000)$，表示每一个训练基地的坐标。

## 输出描述

输出一个小数，表示选择的比赛地距离各训练基地最大距离的最小值。

如果你的答案是 $a$，标准答案是 $b$，当 $|a-b|\leq10^{-4}$ 时，你的答案将被判定为正确。

## 示例

### 输入

``` plain
3
0 0
2 0
0 2
```

### 输出

``` plain
2
```

### 说明

当在 $(0,0)$ 比赛时，到三个训练基地的最大距离是 $2$&hairsp;。可以证明这是最小值。

## 题解

这道题需要对半径使用二分法，判断一个半径是否合法，合法则缩小半径，不合法则扩大半径。

如何判断一个半径是否合法（即 “这个半径的圆是否有可能囊括所有点”）呢？

若一个半径合法，一定存在一个区间（或一点），使以区间上任一点为圆心的圆，都能囊括所有的点。我们只需记录下这个区间的左端点和右端点即可。判断时需遍历所有点，遍历时使用 $(x[i]-k,x[i]+k)$ 与原区间的交集更新区间（如图）。

{% iframe https://www.desmos.com/calculator/obemfwgcrp?embed 100% 150 %}

若最终区间存在，则半径合法，否则不合法。

### 参考代码

``` c++ B.cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int MAX_N = 1e5 + 7;

double xs[MAX_N], ys[MAX_N];
int n;

bool check(double rad)
{
    double l = -10010.0, r = 10010.0, rsqr = rad * rad;
    for (int i = 0; i != n; ++i) {
        if (abs(ys[i]) > rad)
            return false;
        double k = sqrt(rsqr - ys[i] * ys[i]);
        if ((l = max(l, xs[i] - k)) > (r = min(r, xs[i] + k)))
            return false;
    }
    return true;
}

int main()
{
    scanf("%d", &n);
    for (int i = 0; i != n; ++i)
        scanf("%lf%lf", &xs[i], &ys[i]);
    double l = 0, r = 10010.0, m;
    while (r - l > 1e-9) {
        m = (l + r) / 2.0;
        (check(m) ? r : l) = m;
    }
    printf("%.9f\n", m);
}
```

# C. C语言IDE

# D. 牛牛与牛妹的约会

## 题目描述

牛牛在辛苦的一天的比赛之后，要去找牛妹玩，其实牛妹那天也在比赛。他为了找到牛妹，要尽快的从自己的比赛地到她的比赛地。

还记得吗，比赛地都是只在 $x$ 轴上的，所以两个人的坐标都满足 $y=0$&hairsp;。牛牛除了可以以 $1$ 单位距离/单位时间的速度移动任意时间以外，还可以花费 $1$ 单位时间进行闪现。每次闪现时，如果当前他的坐标是 $x=k$，他将闪现到 $x=\sqrt[3]{k}$ 的位置。

请帮他算算，最短需要多少时间，他可以找到牛妹~

## 输入描述

输入数据包括多组用例，输入第一行包含一个数字 $T\\,(1\leq T\leq5\times10^5)$，表示数据组数。

接下来 $T$ 行，每行包括两个整数 $a,b\\,(|a|,|b|\leq10^6)$，表示牛牛所在的位置和牛妹所在的位置。

## 输出描述

输出共 $T$ 行，每行包括一个实数，表示牛牛所花费的最短时间。

如果你的答案是 $a$，标准答案是 $b$，当 $|a-b|\leq10^{-6}$ 时，你的答案将被判定为正确。

## 示例

### 输入

``` plain
2
3 -1
1 2
```

### 输出

``` plain
3.442249570
1.000000000
```

## 题解

为了使时间尽量短，一定是闪现在前，移动在后。不停闪现，直到闪现能够缩短的距离小于 $1$，之后用移动来补全剩下的距离。

### 参考代码

``` c++ D.cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int T, _a, _b;
    double ans, a, b, t;
    cin >> T;
    while (T--) {
        cin >> _a >> _b;
        a = _a, b = _b;
        ans = 0.0;
        while (true) {
            t = cbrt(a);
            if (1.0 + abs(t - b) < abs(a - b)) {
                ans += 1.0;
                a = t;
            } else {
                ans += abs(a - b);
                break;
            }
        }
        printf("%.9f\n", ans);
    }
}
```

# E. Enjoy the game

## 题目描述

牛牛战队的三个队员在训练之余会自己口胡了一些题当做平时的益智游戏。有一天牛可乐想出了一个小游戏给另外两名队员玩，游戏规则如下：

- 初始一共有 $n$ 张卡牌
- 先手第一步最少要拿 $1$ 张牌，最多要拿 $n−1$ 张牌。
- 接下来每一步，双方最少要拿 $1$ 张牌，最多拿等同于上一步对方拿的牌数的牌。
- 拿走最后一张牌的人将取得游戏的胜利。 

你作为旁观者，看着他们玩得很开心，想参与到这场游戏中来，赌一赌谁会能赢。

## 输入描述

输入数据包含一个整数 $n\\,(2\leq n\leq10^{18})$，表示初始卡牌张数。

## 输出描述

如果先手有必胜策略，输出 `Bob`，否则输出 `Alice`&hairsp;。

## 示例

### 输入

``` plain
2
```

### 输出

``` plain
Alice
```

### 说明

先手必须拿走一张牌，然后后手拿走了另一张牌，游戏结束。

## 题解

这题是我比较喜欢的一题，考察了你的思维方式。拿到这题的第一想法是在纸上模拟一下，找找规律，模拟的过程中，我发现：

若纸牌张数为奇数，是一定有必胜策略的，只要一开始只拿一张牌，两人轮流拿牌后一定是自己拿到最后一张牌。

若纸牌张数为偶数，那么为了不输，拿牌的一方一定是拿偶数张牌的，否则接下来对方会只拿一张牌，并在轮流拿牌后拿到最后一张牌。既然双方为了不输都会拿偶数张牌，我们就可以将牌两两合并，将相邻的两张牌看作一张，从而将问题转化为只有半数牌的情况。

找到了如上规律，我们就可以解决这个问题了。以 $12$ 张牌的情况举例，我们可以将其等同为 $6$ 张牌的情况，进而等同为 $3$ 张牌的情况。$3$ 为非 $1$ 的奇数，所以是有必胜策略的。事实上，只有当牌数为 $ 2^n (n\in\mathbf{N}^{*})$ 时，是没有必胜策略的。

### 参考代码

``` cpp E.cpp
#include <bits/stdc++.h>

int main()
{
    long long n;
    scanf("%lld", &n);
    puts((n & (-n)) == n ? "Alice" : "Bob");
}
```

# 未完待续……

<!--
# F. 碎碎念
# G. 街机争霸
# H. Hash
# I. I题是个签到题
# J. 牛牛战队的秀场 -->