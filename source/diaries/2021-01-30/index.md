---
title: '实践之前'
description: Diary - 实践之前
canonical_url: https://duinomaker.top/diaries/2021-01-30/
date: 2021-01-30 23:30:00
show_meta: true
widgets:
comment:
license: noshare
language: zh
---

<script async src="https://server.duinomaker.top/blog/assets/crypto-js.min.js" defer></script>
<script src="https://server.duinomaker.top/blog/assets/decrypt.js" defer></script>
<div class="field has-addons">
<p class="control has-icons-left">
    <input id="password" class="input" type="password" maxlength="16" placeholder="Type your AES key here" digest="e69982faa437333c597432486df77f9383ce26f02841f2b661eb01f0f73a4ea2">
    <span class="icon is-small is-left">
        <i id="input-bar-icon" class="fas fa-lock"></i>
    </span>
</p>
<p class="control">
    <button id="decrypt" class="button" onclick="decryptAll()" disabled>decrypt</button>
</p>
</div>

<span class="encrypted" iv="gOOzEWWhQ7aV993U">2d 9b c6 c4 a8 1a e9 4b 61 6e a2 77 63 ad a9 cb db f8 66 6c 14 1a b1 1e 62 cd c7 dd 55 27 4b 7a 6f 63 2f 00 02 38 11 e8 42 d3 19 68 62 4e f9 27</span>一篇文章，很有意思。说一个正在招实习生的技术团队，不着重考察实习生的知识储备，而更注重实习生的学习能力。其中一位有经验的面试官认为实习生可分为两类：“学习者”和“拼凑者”。真正有能力的是“学习者”，无论当前掌握的知识多少，进入新领域时都能够构建自己的知识脉络，而不是将临时搜集到的零碎知识拼凑起来，立刻产生一些成果。一般来说，“拼凑者”看上去什么都会一些，但做出来的东西效果差、没有整体性。这是因为他的知识脉络还不够清晰，无法从整体角度思考整个课题。

最近<span class="encrypted" iv="uNeERhfaY8hMunLx">88 bb 45 51 d6 f8 10 c9 48 6f 82 cd 8b fd 7d a0 4e 2f 8a a4 34 c7 6b f9 bf b8 f4 40 47 7c 00 f4 57 24 d6 3e 74 70 62 ba bb e0 79 13 a3 5e 02 c7</span>的课题是“多变量时间序列预测”，课题现在做了一些，我发现自己正在扮演“拼凑者”。我没有首先从整体的角度思考这个课题，而是用搜索引擎盲目地检索知识，并将搜集到的资料拼凑起来。例如看到有人说LSTM适合这个课题，我不先去了解LSTM的理论知识，而是直接找来了可用于实现LSTM的框架；发现两个变量之间有线性关系，我就去分析这种关系，而不去想这种分析究竟有没有意义。

“欲速则不达”这个道理，我现在明白了。明天开始，我将暂停编程实践，花几天时间系统地了解与课题相关的技术，并做好总结，以构建一个完整的知识脉络。