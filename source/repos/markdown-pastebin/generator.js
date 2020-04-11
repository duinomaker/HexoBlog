in_title_bar = document.getElementById("in-title");
in_bar = document.getElementById("in");
title_bar = document.getElementsByClassName("title")[0];
out_bar = document.getElementById("out");
splitter = document.getElementById("splitter");
permalink_bar = document.getElementById("permalink");
permalink_hint_bar = document.getElementById("permalink-hint");
render_button = document.getElementById("render");
generate_button = document.getElementById("generate");
last_input = ["", ""];

katex_config = {
    delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }
    ]
};

clipboard = new ClipboardJS("#permalink", {});
clipboard.on("success", function (e) {
    permalink_bar.innerHTML = "";
    permalink_hint_bar.innerHTML = "永久链接已复制至剪贴板";
});
clipboard.on("error", function (e) {
    e.clearSelection();
    permalink_hint_bar.innerHTML = "请手动复制永久链接";
});

function b64encode(str) {
    return CryptoJS.enc.Utf8.parse(str).toString(CryptoJS.enc.Base64);
}

function render() {
    if (in_title_bar.value.length) {
        splitter.style.display = "none";
        title_bar.innerHTML = marked(in_title_bar.value);
        renderMathInElement(title_bar, katex_config);
    } else {
        splitter.style.display = "";
        title_bar.innerHTML = "Markdown Pastebin";
    }
    out_bar.innerHTML = marked(in_bar.value);
    renderMathInElement(out_bar, katex_config);
}

function generate(token) {
    generate_button.setAttribute("disabled", "disabled");
    permalink_bar.innerHTML = "";
    if (!in_bar.value.length) {
        permalink_hint_bar.innerHTML = "正文不能为空";
        return;
    }
    if (in_title_bar.value === last_input[0] && in_bar.value === last_input[1]) {
        permalink_hint_bar.innerHTML = "你提交了一篇与之前完全一样的文章";
        return;
    }
    permalink_hint_bar.innerHTML = "正在生成永久链接...";
    opener = new XMLHttpRequest();
    opener.open("POST", "https://duinomaker.top/server/generate", true);
    opener.setRequestHeader("Content-Type", "application/json");
    opener.send(JSON.stringify({
        "title": b64encode(in_title_bar.value),
        "content": b64encode(in_bar.value),
        "g-recaptcha-response": token
    }));
    opener.onreadystatechange = function () {
        if (opener.readyState === 4) {
            if (opener.status === 201) {
                permalink_bar.innerHTML = "https://duinomaker.top/p/?" + opener.response;
                permalink_hint_bar.innerHTML = "永久链接已生成，点击链接复制";
                last_input[0] = in_title_bar.value
                last_input[1] = in_bar.value;
            } else if (opener.status === 403) {
                if (opener.responseText === "Malformed Data") {
                    permalink_hint_bar.innerHTML = "文本框内包含错误格式的内容，请修改后重试";
                } else {
                    permalink_hint_bar.innerHTML = "reCAPTCHA 验证失败或超时，请重试";
                }
            } else if (opener.status === 500) {
                permalink_hint_bar.innerHTML = "服务器处理数据时发生了错误，内容上传失败";
            } else {
                permalink_hint_bar.innerHTML = "发生了未知错误，内容上传失败，可能的原因是内容过长";
            }
        }
    };
}

render_button.removeAttribute("disabled");