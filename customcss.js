let head = document.head || document.getElementsByTagName('head')[0]

chrome.storage.sync.get('css', function(data) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = data.css;
    } else {
        style.appendChild(document.createTextNode(data.css));
    }

    head.appendChild(style);
});
