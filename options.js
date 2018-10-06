let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
        let button = document.createElement('button');
        button.className = 'color-button';
        button.style.backgroundColor = item;
        button.addEventListener('click', function() {
            chrome.storage.sync.set({ color: item }, function() {
                console.log('color is now ' + item);
            });
        });
        page.appendChild(button);
    }
}

constructOptions(kButtonColors);

let savedCss = {};
let selCssUrlPattern = document.getElementById('selCssUrlPattern');
let txtCssUrlPattern = document.getElementById('txtCssUrlPattern');
let btnUrlPatternAdd = document.getElementById('btnUrlPatternAdd');
let btnUrlPatternEdit = document.getElementById('btnUrlPatternEdit');
let btnUrlPatternDel = document.getElementById('btnUrlPatternDel');

let taCss = document.getElementById('css');

function fetchPatterns() {
    chrome.storage.sync.get('css', function(data) {
        try { savedCss = JSON.parse(data.css); }
        catch { savedCss = { '.*': 'body { }' } };

        populatePatterns();
    });
}

function populatePatterns() {
    while (selCssUrlPattern.firstChild) selCssUrlPattern.removeChild(selCssUrlPattern.firstChild);

    for (var key in savedCss) {
        selCssUrlPattern.appendChild(new Option(key, key));
    }
}

function saveCss() {
    chrome.storage.sync.set({ css: JSON.stringify(savedCss) }, function() {
    });
}

selCssUrlPattern.addEventListener('change', function() {
    txtCssUrlPattern.value = this.value;
    taCss.value = savedCss[this.value];
});

taCss.addEventListener('blur', function() {
    var pattern = selCssUrlPattern.value;
    savedCss[pattern] = this.value;

    saveCss();
});

btnUrlPatternAdd.addEventListener('click', function() {
    var pattern = txtCssUrlPattern.value;

    if (savedCss[pattern]) {
        txtCssUrlPattern.value = '';
        return;
    }

    savedCss[pattern] = '';
    selCssUrlPattern.appendChild(new Option(pattern, pattern));
    txtCssUrlPattern.value = '';

    saveCss();
});

btnUrlPatternEdit.addEventListener('click', function() {
    var newValue = txtCssUrlPattern.value;
    var oldValue = selCssUrlPattern.value;

    if (newValue === oldValue) return;

    var i = selCssUrlPattern.selectedIndex;

    selCssUrlPattern.options[i].text = newValue;
    selCssUrlPattern.options[i].value = newValue;

    savedCss[newValue] = savedCss[oldValue];
    savedCss[oldValue] = null;
    delete savedCss[oldValue];

    saveCss();
    fetchPatterns();
});

btnUrlPatternDel.addEventListener('click', function() {
    var pattern = selCssUrlPattern.value;

    var i = selCssUrlPattern.selectedIndex;
    selCssUrlPattern.removeChild(selCssUrlPattern.options[i]);

    delete savedCss[pattern];

    saveCss();
    fetchPatterns();
});

fetchPatterns();

//Text Replace
let btnSaveStrReplaced = document.getElementById('btnSaveStrReplace');
let ogText = document.getElementById('ogtext');
let rpText = document.getElementById('rptext');

chrome.storage.sync.get('originalString', function(data) {
    ogText.value = data.originalString;
});

chrome.storage.sync.get('replacementString', function(data) {
    rpText.value = data.replacementString;
});

btnSaveStrReplaced.addEventListener('click', function() {
    chrome.storage.sync.set({ originalString: ogText.value }, function() {
        console.log('ogText has been updated');
    });
    chrome.storage.sync.set({ replacementString: rpText.value }, function() {
        console.log('rpText has been updated');
    });
});
