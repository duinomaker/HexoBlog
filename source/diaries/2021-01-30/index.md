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
    <input id="password" class="input" type="password" maxlength="16" placeholder="Type your AES key here" digest="3c1158cf9bc8fa902b2c52be49cda472db2d1c4a867e94cbb89b3ad6bfc52f43">
    <span class="icon is-small is-left">
        <i id="input-bar-icon" class="fas fa-lock"></i>
    </span>
</p>
<p class="control">
    <button id="decrypt" class="button" onclick="decryptAll()" disabled>decrypt</button>
</p>
</div>

今天<span class="encrypted" iv="MPXqHHGKp0a2G+7q">4f 9b 0b 85 02 55 ac 9b 06 38 a4 10 0b a8 c8 35 e1 18 49 09 06 38 3c dd 0c 06 da 05 61 e0 18 f7</span>一篇文章，很有意思。说一个正在招实习生的技术团队，不着重考察实习生的知识储备，而更注重实习生的学习能力。其中一位有经验的面试官认为实习生可分为两类：“学习者”和“拼凑者”。真正有能力的是“学习者”，无论当前掌握的知识多少，进入新领域时都能够构建自己的知识脉络，而不是将临时搜集到的零碎知识拼凑起来，立刻产生一些成果。一般来说，“拼凑者”看上去什么都会一些，但做出来的东西效果差、没有整体性。这是因为他的知识脉络还不够清晰，无法从整体角度思考整个课题。

最近<span class="encrypted" iv="KcckRuC+40QJ32Mr">14 cc 02 96 37 86 4e 6e d7 64 e3 bd f2 d3 a5 58 32 c5 05 e1 56 33 6a 62 58 90 6c dc 8b de 09 3b a5 36 8b d1 30 f3 a4 a1 71 59 cd 22 2c 4b 10 17</span>的课题是“多变量时间序列预测”，课题现在做了一些，我发现自己正在扮演“拼凑者”。我没有首先从整体的角度思考这个课题，而是用搜索引擎盲目地检索知识，并将搜集到的资料拼凑起来。例如看到有人说LSTM适合这个课题，我不先去了解LSTM的理论知识，而是直接找来了可用于实现LSTM的框架；发现两个变量之间有线性关系，我就去分析这种关系，而不去想这种分析究竟有没有意义。

“欲速则不达”这个道理，我现在明白了。明天开始，我将暂停编程实践，花几天时间系统地了解与课题相关的技术，并做好总结，以构建一个完整的知识脉络。