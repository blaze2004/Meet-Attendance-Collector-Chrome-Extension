chrome.storage.sync.get(['latest_meet_attendance'], function(item) {
    localStorage.setItem('latest_meet_attendance', JSON.stringify(item.latest_meet_attendance));
});