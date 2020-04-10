in_bar = document.getElementById("in");
out_bar = document.getElementById("out");
permalink_bar = document.getElementById("permalink");
permalink_hint_bar = document.getElementById("permalink-hint");
render_button = document.getElementById("render");

clipboard = new ClipboardJS("#permalink", {});
clipboard.on("success", function (e) {
    permalink_bar.innerHTML = "";
    permalink_hint_bar.innerHTML = "永久链接已复制至剪贴板";
    setTimeout(function () { permalink_hint_bar.innerHTML = ""; }, 5000);
});
clipboard.on("error", function (e) {
    e.clearSelection();
    permalink_hint_bar.innerHTML = " 请手动复制永久链接";
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
    opener = new XMLHttpRequest();
    opener.open("POST", "https://duinomaker.top/server/generate", true);
    opener.setRequestHeader("Content-Type", "application/json");
    opener.send(JSON.stringify({
        "content": b64encode(in_bar.value),
        "g-recaptcha-response": token
    }));
    opener.onreadystatechange = function () {
        if (opener.readyState == 4) {
            if (opener.status == 201) {
                permalink_hint_bar.innerHTML = " 永久链接已生成，点击链接复制";
                permalink_bar.innerHTML = "https://duinomaker.top/p/?" + opener.response;
            } else if (opener.status == 403) {
                if (opener.responseText == "Malformed Data") {
                    permalink_hint_bar.innerHTML = "文本框内包含错误格式的内容，请修改后重试";
                } else {
                    permalink_hint_bar.innerHTML = "reCAPTCHA验证失败或超时，请重试";
                }
            } else if (opener.status == 500) {
                permalink_hint_bar.innerHTML = "服务器内部发生了错误，内容上传失败";
            } else {
                permalink_hint_bar.innerHTML = "发生了未知错误，内容上传失败";
            }
        }
    };
}

document.getElementById("render").removeAttribute("disabled");
document.getElementById("copy").removeAttribute("disabled");