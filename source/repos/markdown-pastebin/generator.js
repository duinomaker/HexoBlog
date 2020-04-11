in_title_bar = document.getElementById("in-title");
in_bar = document.getElementById("in");
title_bar = document.getElementsByClassName("title")[0];
out_bar = document.getElementById("out");
permalink_bar = document.getElementById("permalink");
permalink_hint_bar = document.getElementById("permalink-hint");
render_button = document.getElementById("render");
generate_button = document.getElementById("generate");
last_input = "";

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
        title_bar.innerHTML = marked(in_title_bar.value);
        renderMathInElement(title_bar, katex_config);
    } else {
        title_bar.innerHTML = "Markdown Pastebin";
    }
    out_bar.innerHTML = marked(in_bar.value);
    renderMathInElement(out_bar, katex_config);
}

function get_input() {
    if (in_title_bar.value.length) {
        return "<h1 class=\"title is-size-3 is-size-4-mobile has-text-weight-normal\">"
            + in_title_bar.value + "</h1>\n" + in_bar.value;
    }
    return in_bar.value;
}

function generate(token) {
    generate_button.setAttribute("disabled", "disabled");
    permalink_bar.innerHTML = "";
    if (!in_bar.value.length) {
        permalink_hint_bar.innerHTML = "请先输入内容";
        return;
    }
    if (get_input() === last_input) {
        permalink_hint_bar.innerHTML = "你提交了一篇与之前完全一样的文章";
        return;
    }
    permalink_hint_bar.innerHTML = "正在生成永久链接...";
    opener = new XMLHttpRequest();
    opener.open("POST", "https://duinomaker.top/server/generate", true);
    opener.setRequestHeader("Content-Type", "application/json");
    opener.send(JSON.stringify({
        "content": b64encode(get_input()),
        "g-recaptcha-response": token
    }));
    opener.onreadystatechange = function () {
        if (opener.readyState === 4) {
            if (opener.status === 201) {
                permalink_hint_bar.innerHTML = "永久链接已生成，点击链接复制";
                permalink_bar.innerHTML = "https://duinomaker.top/p/?" + opener.response;
                last_input = get_input();
            } else if (opener.status === 403) {
                if (opener.responseText === "Malformed Data") {
                    permalink_hint_bar.innerHTML = "文本框内包含错误格式的内容，请修改后重试";
                } else {
                    permalink_hint_bar.innerHTML = "reCAPTCHA 验证失败或超时，请重试";
                }
            } else if (opener.status === 500) {
                permalink_hint_bar.innerHTML = "服务器处理数据时发生了错误，内容上传失败";
            } else {
                permalink_hint_bar.innerHTML = "发生了未知错误，内容上传失败";
            }
        }
    };
}

render_button.removeAttribute("disabled");