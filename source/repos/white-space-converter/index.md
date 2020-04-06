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

该项目由<a rel="license" href="https://opensource.org/licenses/mit-license.php" title="The MIT License" target="_blank">MIT许可证</a>授权，许可证原文如下：

``` plain LICENSE >folded https://duinomaker.top/repos/white-space-converter/LICENSE /repos/white-space-converter/LICENSE
MIT License

Copyright (c) 2020 duinomaker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```