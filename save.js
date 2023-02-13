chrome.storage.sync.get(null, function(item) {

    let attendanceData = new Array();

    for (let key in item) {
        if (item[key] != null && item[key] != undefined && item[key] != 'undefined ') {
            attendanceData.push(item[key]);
        }
    }

    localStorage.setItem("meet_attendance_data", JSON.stringify(attendanceData));
    chrome.storage.sync.clear();
});