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

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js" defer></script>
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

<span class="encrypted" iv="EGJYa7/V1/cwuV5h">d6 80 0f 1f 6e f9 25 13 1a 80 e2 16 9f 86 51 62 95 6d 8c a0 25 42 df 18 da 8d ca de a6 a1 85 96 4d 88 75 3f 8d d1 0a 5c 8b 8a c9 bd ad 3a 1c 29</span>

密码错误的话，会提示再试一次。好奇的你可能会对密码输入框 “Inspect Element”，接着会发现一段长长的 SHA256 Digest，之后开始怀疑我是否严谨。说明一下吧，我喜欢烹饪，可是加盐时从来不考虑口味（雾

密码正确的话，这些绿色的字节就会变为：

“这是一段加密文字。”

## 目录

<span class="mono">2020-03-21</span>&nbsp;<a href="/diaries/waste-of-time/">/diaries/waste-of-time/</a>
<span class="mono">2020-03-18</span>&nbsp;<a href="/diaries/tik-tok/">/diaries/tik-tok/</a>