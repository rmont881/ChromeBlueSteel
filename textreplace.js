var elements = document.getElementsByTagName('*');

var originalString = "";
var replacementString = "";


chrome.storage.sync.get('originalString', function(data) {
    originalString = data.originalString;
    chrome.storage.sync.get('replacementString', function(data) {
        replacementString = data.replacementString;
        if((originalString || !(0 === originalString.length)) && (replacementString || !(0 === replacementString.length))) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
            
                for (var j = 0; j < element.childNodes.length; j++) {
                    var node = element.childNodes[j];
            
                    if (node.nodeType === 3) {
                        var text = node.nodeValue;
                        var replacedText = text.replace(new RegExp(originalString, 'gi'), replacementString);
            
                        if (replacedText !== text) {
                            element.replaceChild(document.createTextNode(replacedText), node);
                        }
                    }
                }
            }
        }
    });
});