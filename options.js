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
