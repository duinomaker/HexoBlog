---
title: 'Markdown Pastebin'
canonical_url: https://duinomaker.top/repos/markdown-pastebin/
widgets:
comment:
article:
    highlight:
        clipboard: false
---
<style>
.katex { font-size: initial !important; }
.grecaptcha-badge { z-index: 1; }
</style>
<hr id="splitter" />

<div id="out"><br /></div>

---

<script>
permalink_hint_bar = document.getElementById("permalink-hint");
generate_button = document.getElementById("generate");
counter = 0;
function onSubmit(token) {
    generate(token);
    counter = 0;
}

function onClick() {
    if (++counter > 3) {
        permalink_hint_bar.innerHTML = "您的操作过于频繁，请仔细考虑后再做决定哦～";
    }
}
</script>

<input id="in-title" class="input" type="text" placeholder="标题" />
<textarea id="in" class="textarea" rows="8" placeholder="正文"></textarea>
<div class="level"><div class="level-item"><a id="permalink" data-clipboard-target="#permalink"></a></div><div class="level-item"><p id="permalink-hint"></p></div></div><div class="level"><div class="level-item"><div class="field has-addons" style="margin-bottom: -1em;"><p class="control"><button id="render" class="button" onclick="render();" disabled="disabled">render</button></p><p class="control"><button id="generate" class="g-recaptcha button" onclick="onClick();" data-sitekey="6LdbiegUAAAAAEzvi3nQoBl2viN_2dV2uBsT9iDy" data-callback="onSubmit" disabled="disabled">generate permalink</button></p></div></div></div>

<script src="https://cdn.jsdelivr.net/npm/marked@latest/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/crypto-js@latest/crypto-js.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/clipboard@latest/dist/clipboard.min.js"></script>
<script src="https://recaptcha.net/recaptcha/api.js"></script>
<script src="generator.js"></script>

---

该页面中的内容由<a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" title="Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License" target="_blank">CC BY-NC-SA 4.0</a>进行许可；
该项目的源代码由<a rel="license" href="https://opensource.org/licenses/mit-license.php" title="The MIT License" target="_blank">MIT许可证</a>进行许可。

``` plain project-hierarchy >folded
/
├── p
│   ├── index.html
│   ├── LICENSE
│   └── renderer.js
└── repos
    └── markdown-pastebin
        ├── generator.js
        ├── index.html
        └── LICENSE
```