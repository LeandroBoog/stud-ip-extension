
function getPdfUrl() {
    return document.querySelector("#preview_container > iframe").src
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getPdfUrl,
    },
        (frame) => {
            chrome.tabs.create({ url: frame[0].result });
        }
    );
});

chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: getPdfUrl,
            },
            (frame) => {
                chrome.tabs.create({ url: frame[0].result });
            }
        );
    })
});
