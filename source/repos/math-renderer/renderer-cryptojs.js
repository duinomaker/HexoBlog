in_bar = document.getElementById("in");
out_bar = document.getElementById("out");
permalink_bar = document.getElementById("permalink");
permalink_hint_bar = document.getElementById("permalink-hint");
clipboard = new ClipboardJS("#copy", {});
clipboard.on('success', function (e) {
    permalink_bar.innerHTML = "";
    permalink_hint_bar.innerHTML = "永久连接已复制至剪贴板";
});
clipboard.on('error', function (e) {
    e.clearSelection();
    permalink_bar.setAttribute("href", permalink_bar.innerHTML);
    permalink_hint_bar.innerHTML = "复制失败，请手动复制上方的永久连接";
});
function b64encode(str) {
    return CryptoJS.enc.Utf8.parse(str).toString(CryptoJS.enc.Base64);
}
function b64decode(str) {
    return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
}
function render() {
    out_bar.innerHTML = in_bar.value;
    renderMathInElement(out_bar, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false }
        ]
    });
}
function copyPermalink() {
    permalink_bar.innerHTML = "https://duinomaker.top/repos/math-renderer/?" + b64encode(in_bar.value);
}
document.addEventListener("DOMContentLoaded", function () {
    matched = window.location.toString().match(/\?([a-zA-Z0-9/=]+)/);
    if (matched !== null) {
        in_bar.value = b64decode(matched[1]);
        render();
    }
    document.getElementById("render").removeAttribute("disabled");
    document.getElementById("copy").removeAttribute("disabled");
});