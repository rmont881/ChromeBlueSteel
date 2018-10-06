let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
        let button = document.createElement('button');
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

//CSS Inject
let btnSaveCss = document.getElementById('btnSaveCss');
let taCss = document.getElementById('css');

chrome.storage.sync.get('css', function(data) {
    taCss.value = data.css;
});

btnSaveCss.addEventListener('click', function() {
    chrome.storage.sync.set({ css: taCss.value }, function() {
        console.log('css has been updated');
    });
});


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
