---
title: 'README'
canonical_url: https://duinomaker.top/diaries/README/
widgets:
comment:
plugins:
article:
    highlight:
        clipboard: false
license: noshare
---

更进一步地利用我的独立博客，我干脆连日记也一起放在上面，用于写下一些不成熟的想法和批判自己，理论上算是公开了。

这是个很矛盾的想法，其实我是写给自己看的——毕竟实际看到这个页面的人很少。但我又想在名义上沾上一些 “公开”，于是就这样做了。另外，如果你看到了这些页面，<strong class="rigid">不要告诉我</strong>，不确定是个十分奇妙的感受。让其处于 被其他人看到了 和 没有被其他人看到 相互交织的一种状态，就像薛定谔的猫一样。

某些时候，一些特定的内容涉及隐私。这些内容我不想揭露，但必须得写下来，于是就有了加密机制。下方是加密内容的一个例子，我使用了 AES (CBC 模式 + PKCS7 填充)：

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/duinomaker/HexoBlog@8ff73fa/assets/crypto-js.min.js" defer></script>
<script type="text/javascript" src="/js/decrypt.js" defer></script>
<div class="field has-addons">
<p class="control has-icons-left">
    <input id="password" class="input" type="password" maxlength="16" placeholder="Type your AES key here" digest="81c20ce8ef4b4f89f892054c327a16a994ffff00835dc507084444b82f448c86">
    <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
    </span>
</p>
<p class="control">
    <button id="decrypt" class="button" onclick="decryptAll()" disabled>decrypt</button>
</p>
</div>

<span class="encrypted" iv="vuRPn2KnsXRKxy+i">35 c5 64 3d a4 bd e2 aa 59 21 dc 19 8f b6 39 ee 83 4e 81 b2 4d de 85 b6 2c 90 75 05 c0 88 44 82 77 60 6b 88 ea b4 b1 fc b3 d1 9b 37 45 e6 bb 7d</span>

密码错误的话，会提示再试一次。好奇的你可能会对密码输入框 “Inspect Element”，接着会发现一段长长的 SHA256 Digest，之后开始怀疑我是否严谨。说明一下吧，我喜欢烹饪，可是加盐时从来不考虑口味（雾

密码正确的话，这些绿色的字节就会变为：

“这是一段加密文字。”

## 目录（目前只有破事水）

<span class="mono">2020-06-07&nbsp;</span><a href="/diaries/2020-06-07/">Reasoning Bases</a>

<!-- <span class="mono">2020-05-28</span>&nbsp;<a href="/diaries/anxiety/">/diaries/anxiety/</a>
<span class="mono">2020-03-21</span>&nbsp;<a href="/diaries/waste-of-time/">/diaries/waste-of-time/</a>
<span class="mono">2020-03-18</span>&nbsp;<a href="/diaries/tik-tok/">/diaries/tik-tok/</a> -->