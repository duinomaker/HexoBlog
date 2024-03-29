---
title: 'README'
description: Diary - README
canonical_url: https://duinomaker.top/journals/README/
widgets:
comment:
license: noshare
language: zh
---

更进一步地利用我的独立博客，我干脆连日记也一起放在上面，用于写下一些不成熟的想法和批判自己，理论上算是公开了。

这是个很矛盾的想法，其实我是写给自己看的——毕竟实际看到这个页面的人很少。但我又想在名义上沾上一些 “公开”，于是就这样做了。另外，如果你看到了这些页面，<strong class="rigid">不要告诉我</strong>，不确定是个十分奇妙的感受。让其处于 被其他人看到了 和 没有被其他人看到 相互交织的一种状态，就像薛定谔的猫一样。

某些时候，一些特定的内容涉及隐私（或者只是写得太差）。这些内容我不想揭露给对我完全陌生的人，但必须得写下来，于是就有了加密机制。

密码是带给我信念的，那位嗜书的人物的姓名。例如，如果姓名是 “雾雨魔理沙”，那么密码就是 “KirisameMarisa”（虽然不是），不包含引号，姓、名的首字母大写且之间没有空格。

下方是加密内容的一个例子，我使用了 AES (CBC 模式 + PKCS7 填充)：

<script async src="/assets/crypto-js.min.js" defer></script>
<script src="/assets/decrypt.js" defer></script>
<div class="field has-addons">
<p class="control has-icons-left">
    <input id="password" class="input" type="password" maxlength="16" placeholder="Type her name here" digest="7a9b646798cc6ecdc8b22f5b3202fdcdbf9124869a1697ab391fd22d39e826e3">
    <span class="icon is-small is-left">
        <i id="input-bar-icon" class="fas fa-lock"></i>
    </span>
</p>
<p class="control">
    <button id="decrypt" class="button" onclick="decryptAll()" disabled>decrypt</button>
</p>
</div>

<span class="encrypted" iv="HKclIa4yrUy/MnPs">a1 5a ac 5a a0 cf 5b 66 5c b6 6e 50 11 95 4f c9 90 c3 1a 96 3e 2f f7 d4 e6 ac dc c8 7e 92 68 32 db 46 1c b8 f0 6f 10 b8 db da ca d8 31 8f 68 01</span>

密码错误的话，会提示再试一次。好奇的你可能会对密码输入框 “Inspect Element”，接着会发现一段长长的 SHA256 Digest，之后开始怀疑我是否严谨。说明一下吧，我喜欢烹饪，可是加盐时从来不考虑口味（雾

密码正确的话，这些绿色的字节就会变为：

“这是一段加了密的文字。”

## 目录

<!-- <span class="mono">2021-01-30&nbsp;</span><a href="/journals/2021-01-30/">实践之前</a>
<span class="mono">2020-12-19&nbsp;</span><a href="/journals/2020-12-19/">近期小结</a>
<span class="mono">2020-11-08&nbsp;</span><a href="/journals/2020-11-08/">Domestic Life is Harmful</a>
<span class="mono">2020-11-07&nbsp;</span><a href="/journals/2020-11-07/">The Reason I Regard a Smile as an Emblem of Evil</a>
<span class="mono">2020-11-03&nbsp;</span><a href="/journals/2020-11-03/">Initial Commit</a> -->
<span class="mono">2022-06-08&nbsp;</span><a href="/journals/2022-06-08/">无从感受</a>
<span class="mono">2022-05-05&nbsp;</span><a href="/journals/2022-05-05/">欺骗的忏悔</a>
<span class="mono">2022-04-26&nbsp;</span><a href="/journals/2022-04-26/">会议记录</a>
<span class="mono">2022-04-16&nbsp;</span><a href="/journals/2022-04-16/">重新发明名词</a>
<span class="mono">2022-04-09&nbsp;</span><a href="/journals/2022-04-09/">便利贴</a>