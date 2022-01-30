chrome.storage.sync.get(['latest_meet_attendance'], function(item) {
    if (item.latest_meet_attendance != null && item.latest_meet_attendance != undefined && item.latest_meet_attendance != 'undefined ') {
        localStorage.setItem('latest_meet_attendance', JSON.stringify(item.latest_meet_attendance));
        chrome.storage.sync.clear();
    }
});