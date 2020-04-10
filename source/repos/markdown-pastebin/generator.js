in_bar = document.getElementById("in");
out_bar = document.getElementById("out");
permalink_bar = document.getElementById("permalink");
permalink_hint_bar = document.getElementById("permalink-hint");
render_button = document.getElementById("render");

clipboard = new ClipboardJS("#permalink", {});
clipboard.on("success", function (e) {
    console.log("copied");
    if (permalink_bar.innerHTML.length) {
        permalink_bar.innerHTML = "";
        permalink_hint_bar.innerHTML = "永久链接已复制至剪贴板";
    } else if (!in_bar.value.length) {
        permalink_hint_bar.innerHTML = "生成前请先输入内容";
    } else {
        permalink_hint_bar.innerHTML = "生成失败，请检查网络连接";
    }
});
clipboard.on("error", function (e) {
    e.clearSelection();
    permalink_hint_bar.innerHTML = "请手动复制永久链接";
});

function b64encode(str) {
    return CryptoJS.enc.Utf8.parse(str).toString(CryptoJS.enc.Base64);
}

function render() {
    out_bar.innerHTML = marked(in_bar.value);
    renderMathInElement(out_bar, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false }
        ]
    });
}

function generate(token) {
    permalink_bar.innerHTML = "";
    if (!in_bar.value.length) { return; }
    permalink_hint_bar.innerHTML = "正在生成永久链接...";
    console.log(token);
    opener = new XMLHttpRequest();
    opener.open("POST", "https://duinomaker.top/server/generate", false);
    opener.setRequestHeader("Content-Type", "application/json");
    opener.send(JSON.stringify({
        "content": b64encode(in_bar.value),
        "g-recaptcha-response": token
    }));
    if (opener.status == 201) {
        permalink_bar.innerHTML = "https://duinomaker.top/p/?" + opener.response;
    }
}

document.getElementById("render").removeAttribute("disabled");
document.getElementById("copy").removeAttribute("disabled");