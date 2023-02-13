let meetActionButtons;
let participantsList = new Set();
let attendanceData = new Map();
let meetDuration = 0;
let participantsButtonIndex = 1;
let startTime = new Date().toLocaleTimeString();

function track_attendance() {
    let currentParticipants = document.getElementsByClassName("KjWwNd");
    let currentParticipantsName = document.getElementsByClassName("zWGUib");

    if (currentParticipants.length > 0) {
        participantsList.clear();

        for (i = 0; i < currentParticipants.length; i++) {
            participantsList.add({
                identifier: currentParticipants[i].src,
                name: currentParticipantsName[i].innerHTML.toUpperCase()
            });
        }

        participantsList.forEach(function(key, participant) {
            if (attendanceData.has(participant.identifier)) {
                let data = attendanceData.get(participant.identifier);
                data.attendedDuration += 1;
                data.attendance.push(1);
                attendanceData.set(participant.identifier, data);
            } else {
                let joinTime = new Date().toLocaleTimeString();
                let attendance = [];
                for (j = 0; j < meetDuration; j++) { attendance.push(0); }
                attendance.push(1);
                let data = {
                    name: participant.name,
                    joinTime: joinTime,
                    attendedDuration: 1,
                    attendance: attendance
                };
                attendanceData.set(participant.identifier, data);
            }
        });

        attendanceData.forEach(function(data, identifier) {
            if (data.attendance.length != (meetDuration + 1)) {
                data.attendance.push(0);
            }
        });

        meetDuration += 1;

    } else {
        try {
            meetActionButtons[participantsButtonIndex].click();
        } catch (error) {
            stop();
        }
    }
}

function start() {
    tracking = setInterval(track_attendance, 1000);
}

let stop = STOP = function() {
    clearInterval(tracking);
    let meetCode = window.location.pathname.substring(1);
    let date = new Date();
    let dd = date.getDate();
    let mm = date.toLocaleString('default', { month: 'short' });
    let yyyy = date.getFullYear();

    let uuid = meetCode + dd + date.getMonth() + yyyy + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

    date = dd + '/' + mm + "/" + yyyy;

    var attendanceDetails = {
        meetCode: meetCode,
        date: date,
        startTime: startTime,
        stopTime: new Date().toLocaleTimeString(),
        participants: Object.fromEntries(attendanceData),
        meetDuration: meetDuration
    }

    attendanceReport = {}
    attendanceReport[uuid] = attendanceDetails

    chrome.storage.sync.set(attendanceReport, function() {
        // console.log('Attendance saved for');
    });

    window.open('https://trackitnow.pythonanywhere.com/mac/save/');
}

/*
---------------------------------------------------
Update ui of google meet to support extra features.
---------------------------------------------------
*/

// Status text
let statusText = document.createElement("button");
statusText.id = "status";
statusText.className = "Jyj1Td CkXZgc";
statusText.innerHTML = "&nbsp;🔴 Running Trackit";
statusText.style.color = "red";
statusText.style.fontWeight = "bold";
statusText.style.padding = "auto";
statusText.style.border = "none";
statusText.style.outline = "none";
statusText.style.background = "transparent";

const blinkSpeed = 500;
setInterval(function() { statusText.style.visibility = (statusText.style.visibility == 'hidden' ? '' : 'hidden'); }, blinkSpeed);

// Action window
var logoUrl = 'https://trackitnow.pythonanywhere.com/static/mac/images/mac-logo.png';

let actionButtonDiv = document.createElement('div');
actionButtonDiv.className = 'r6xAKc';
actionButtonDiv.innerHTML = '<button class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc" jscontroller="soHxf" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;mlnRJb:fLiPzd" jsname="A5il2e" data-disable-idom="true" aria-label="Notes" data-tooltip-enabled="true" data-tooltip-id="tt-c21" aria-pressed="false" data-panel-id="1" data-promo-anchor-id="GEUYHe"><div jsname="s3Eaab" class="VfPpkd-Bz112c-Jh9lGc"></div><img class="google-material-icons VfPpkd-kBDsod" aria-hidden="true" src="' + logoUrl + '"></button>';

/*
-------------------
start the extension
-------------------
*/

let engine = setInterval(startEngine, 1000);

function startEngine() {
    try {
        meetActionButtons = document.getElementsByClassName("VfPpkd-kBDsod NtU4hc");
        document.getElementsByClassName("Qp8KI")[0].appendChild(statusText);
        document.getElementsByClassName("SGP0hd kunNie")[0].appendChild(actionButtonDiv);
        start();
        clearInterval(engine);
    } catch (error) {}
};