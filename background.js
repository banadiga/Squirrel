console.log("inside background.js");
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("received message: '" + request.message + "'");
        if (request.message == "getCurrentTabURL") {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, function (arrayOfTabs) {
                console.log("active tab result: ", arrayOfTabs);
                var tab = arrayOfTabs[0];
                sendResponse({ url: tab.url });
            });
            return true;
        }
    }
);
