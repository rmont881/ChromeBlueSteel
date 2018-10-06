let savedCss = {};
let head = document.head || document.getElementsByTagName('head')[0];

function checkDomain() {
    var host = window.location.hostname;
    console.log(host, savedCss);

    for (var key in savedCss) {
        var re = new RegExp(key);
        if (re.test(host)) {
            applyCss(savedCss[key]);
        }
    }
}

function applyCss(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

chrome.storage.sync.get('css', function(data) {
    savedCss = JSON.parse(data.css);

    checkDomain();
});
