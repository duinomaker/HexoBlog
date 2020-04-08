---
title: 'White-space Converter'
canonical_url: https://duinomaker.top/repos/white-space-converter/
widgets:
comment:
article:
    highlight:
        clipboard: false
---

<div class="field has-addons">
<p class="control"><input id="cipher" class="input" type="text" placeholder="Paste text or cipher here"></p>
<p class="control"><button id="decode" class="button" onclick="decode()" disabled>decode</button></p>
<p class="control"><button id="encode" class="button" onclick="encode()" data-clipboard-target="#out" disabled>encode</button></p>
</div>

---

<p id="out" class="mono"><br /></p>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/clipboard@latest/dist/clipboard.min.js"></script>
<script src="converter.js"></script>

---

该页面由<a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" title="Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License" target="_blank">CC BY-NC-SA 4.0</a>进行许可；该项目的源代码由<a rel="license" href="https://opensource.org/licenses/mit-license.php" title="The MIT License" target="_blank">MIT许可证</a>进行许可。

``` plain tree-view >folded
white-space-converter
├── converter-deprecated.js
├── converter.js
├── index.html
└── LICENSE
```