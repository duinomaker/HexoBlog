function decryptAll() {
    const input_bar = document.getElementById('password')
    var key_text = (input_bar.value + '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u0009\u000a\u000b\u000c\u000d\u000e\u000f').substring(0, 16)
    var digest = CryptoJS.SHA256('Are you kidding me?' + new Array(129).join(key_text + document.title) + 'Yeah, but I\'m actually serious.').toString()
    if (digest != input_bar.getAttribute('digest')) {
        input_bar.classList.add('is-danger')
        input_bar.value = ''
        input_bar.setAttribute('placeholder', 'Try again')
        return;
    }
    var key = CryptoJS.enc.Utf8.parse(key_text)
    var blocks = document.getElementsByClassName('encrypted')
    var len = blocks.length
    for (let i = 0; i < len; ++i) {
        let iv = CryptoJS.enc.Utf8.parse(blocks[0].getAttribute('iv'))
        let ciphertext = CryptoJS.enc.Hex.parse(blocks[0].innerHTML.replace(/\s/g, '')).toString(CryptoJS.enc.Base64)
        let decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        blocks[0].innerHTML = decrypted.toString(CryptoJS.enc.Utf8)
        blocks[0].setAttribute('class', 'decrypted')
    }
    document.getElementById('decrypt').setAttribute('disabled', '')
    input_bar.setAttribute('disabled', '')
    input_bar.classList.remove('is-danger')
    input_bar.setAttribute('placeholder', 'Unlocked')
    input_bar.value = ''
    document.getElementsByClassName('fa-lock')[0].classList.replace('fa-lock', 'fa-unlock')
}

document.getElementById('decrypt').removeAttribute('disabled')