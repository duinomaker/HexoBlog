---
title: 'Math Renderer'
canonical_url: https://duinomaker.top/repos/math-renderer/
widgets:
comment:
article:
    highlight:
        clipboard: false
---

<style>.katex { font-size: initial !important; }</style>

---

<p id="out"><br /></p>

---

<textarea id="in" class="textarea"></textarea>

<a id="permalink"></a>
<p id="permalink-hint"></p>
<div class="field has-addons" style="margin-bottom: -1rem;"><p class="control"><button id="render" class="button" onclick="render();" disabled="disabled">render</button></p><p class="control"><button id="copy" class="button" onclick="copyPermalink();" data-clipboard-target="#permalink" disabled="disabled">copy permalink</button></p></div>

<script src="https://cdn.jsdelivr.net/npm/clipboard@latest/dist/clipboard.min.js"></script>
<script src="renderer-b64.js"></script>

---

该页面中的内容由<a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" title="Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License" target="_blank">CC BY-NC-SA 4.0</a>进行许可；
该项目的源代码由<a rel="license" href="https://opensource.org/licenses/mit-license.php" title="The MIT License" target="_blank">MIT许可证</a>进行许可。

``` plain project-hierarchy >folded
math-renderer
├── index.html
├── renderer-b64.js
└── LICENSE
```