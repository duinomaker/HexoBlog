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

今天<span class="encrypted" iv="petVAAHWEvfKB25A">b0 5e d9 78 c3 c7 65 c3 eb ae 22 50 78 9c 08 13 da c8 33 5b 38 e6 60 0b c4 a0 d6 2f 85 6c d2 fa</span>一篇文章，很有意思。说一个正在招实习生的技术团队，不着重考察实习生的知识储备，而更注重实习生的学习能力。其中一位有经验的面试官认为实习生可分为两类：“学习者”和“拼凑者”。真正有能力的是“学习者”，无论当前掌握的知识多少，进入新领域时都能够构建自己的知识脉络，而不是将临时搜集到的零碎知识拼凑起来，立刻产生一些成果。一般来说，“拼凑者”看上去什么都会一些，但做出来的东西效果差、没有整体性。这是因为他的知识脉络还不够清晰，无法从整体角度思考整个课题。

最近<span class="encrypted" iv="qlOxsD6fvXDs6wEQ">e6 c1 b5 40 3a 2b 03 98 81 52 0b 7a f8 57 ee 28 d6 ef be f7 8e 13 d3 c8 84 38 b1 d0 6a 09 90 0f e3 15 e8 89 4e 9d 36 61 0b ea 70 04 d3 9e 96 5e</span>的课题是“多变量时间序列预测”，课题现在做了一些，我发现自己正在扮演“拼凑者”。我没有首先从整体的角度思考这个课题，而是用搜索引擎盲目地检索知识，并将搜集到的资料拼凑起来。例如看到有人说LSTM适合这个课题，我不先去了解LSTM的理论知识，而是直接找来了可用于实现LSTM的框架；发现两个变量之间有线性关系，我就去分析这种关系，而不去想这种分析究竟有没有意义。

“欲速则不达”这个道理，我现在明白了。明天开始，我将暂停编程实践，花几天时间系统地了解与课题相关的技术，并做好总结，以构建一个完整的知识脉络。