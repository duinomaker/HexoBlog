---
title: 'README'
description: Diary - README
canonical_url: https://duinomaker.top/diaries/README/
widgets:
comment:
license: noshare
language: zh
---

更进一步地利用我的独立博客，我干脆连日记也一起放在上面，用于写下一些不成熟的想法和批判自己，理论上算是公开了。

这是个很矛盾的想法，其实我是写给自己看的——毕竟实际看到这个页面的人很少。但我又想在名义上沾上一些 “公开”，于是就这样做了。另外，如果你看到了这些页面，<strong class="rigid">不要告诉我</strong>，不确定是个十分奇妙的感受。让其处于 被其他人看到了 和 没有被其他人看到 相互交织的一种状态，就像薛定谔的猫一样。

某些时候，一些特定的内容涉及隐私。这些内容我不想揭露，但必须得写下来，于是就有了加密机制。下方是加密内容的一个例子，我使用了 AES (CBC 模式 + PKCS7 填充)：

<script async src="https://server.duinomaker.top/blog/assets/crypto-js.min.js" defer></script>
<script src="https://server.duinomaker.top/blog/assets/decrypt.js" defer></script>
<div class="field has-addons">
<p class="control has-icons-left">
    <input id="password" class="input" type="password" maxlength="16" placeholder="Type your AES key here" digest="7cd7927ef22ffc44e9f0c46c47719b233adfa26299aba68fd924d9e7f48482a6">
    <span class="icon is-small is-left">
        <i id="input-bar-icon" class="fas fa-lock"></i>
    </span>
</p>
<p class="control">
    <button id="decrypt" class="button" onclick="decryptAll()" disabled>decrypt</button>
</p>
</div>

<span class="encrypted" iv="P5J1RtxG/sRZi87v">06 bc 18 13 84 85 87 01 f9 33 75 ad 76 ac c2 e2 8d 59 84 4d 86 14 02 7c 50 da b4 79 f6 22 5f d8 64 f6 54 f4 06 81 ec 30 31 e7 c4 3c cf 68 96 79</span>

密码错误的话，会提示再试一次。好奇的你可能会对密码输入框 “Inspect Element”，接着会发现一段长长的 SHA256 Digest，之后开始怀疑我是否严谨。说明一下吧，我喜欢烹饪，可是加盐时从来不考虑口味（雾

密码正确的话，这些绿色的字节就会变为：

“这是一段加密文字。”

## 目录

<span class="mono">2021-01-30&nbsp;</span><a href="/diaries/2021-01-30/">实践之前</a>
<span class="mono">2020-12-19&nbsp;</span><a href="/diaries/2020-12-19/">近期小结</a>
<span class="mono">2020-11-08&nbsp;</span><a href="/diaries/2020-11-08/">Domestic Life is Harmful</a>
<span class="mono">2020-11-07&nbsp;</span><a href="/diaries/2020-11-07/">The Reason I Regard a Smile as an Emblem of Evil</a>
<span class="mono">2020-11-03&nbsp;</span><a href="/diaries/2020-11-03/">Initial Commit</a>