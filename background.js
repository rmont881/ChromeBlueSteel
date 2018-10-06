var defaultData = {
    color: '#3aa757',
    css: '{".*": "body { }"}',
    originalString: 'Cloud',
    replacementString: 'Butt'
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set(defaultData, function() {
        console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: '*' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
