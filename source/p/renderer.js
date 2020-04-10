out_bar = document.getElementsById("out");

function b64decode(str) {
    return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
}

function render(content) {
    out_bar.innerHTML = marked(content);
}

function handler(id) {
    url = "https://duinomaker.top/server/fetch?id=" + id;
    opener = new XMLHttpRequest();
    opener.open("GET", url, true);
    opener.send(null);
    opener.onreadystatechange = function () {
        if (opener.readyState == 4) {
            if (opener.status == 200) {
                render(b64decode(opener.response));
                renderMathInElement(out_bar, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "\\[", right: "\\]", display: true },
                        { left: "$", right: "$", display: false },
                        { left: "\\(", right: "\\)", display: false }
                    ]
                });
            } else if (opener.status == 403) {
                render("编号无效，请检查是否正确地复制了网址");
            } else if (opener.status == 500) {
                if (opener.responseText == "Malformed Data") {
                    render("服务器提供了错误格式的内容");
                } else {
                    render("服务器内部发生了错误");
                }
            } else {
                render("发生了未知错误");
            }
        }
    };
}

matched = window.location.toString().match(/\?([a-zA-Z]+)/);
if (matched !== null && matched[1].length == 8) {
    try {
        content = handler(matched[1]);
    }
    catch {
        render("发生了未知错误");
    }
} else {
    render("编号格式有误，请检查是否正确地复制了网址");
}