chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({
        url: "https://trackitnow.pythonanywhere.com/accounts/signup/",
        active: true
    });
});