chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({
        url: "https://meetattendance.herokuapp.com/accounts/google/login/",
        active: true
    });
});