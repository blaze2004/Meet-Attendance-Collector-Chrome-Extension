let studentslist = new Set();
let studentData = new Map();
let meet_duration = 0;
let StartTime = new Date().toLocaleTimeString();

function track_attendance() {
    let currently_present_students = document.getElementsByClassName("ZjFb7c");
    studentslist.clear();
    for (i = 0; i < currently_present_students.length; i++) {
        studentslist.add(currently_present_students[i].innerHTML.toUpperCase());
    }

    for (student of studentslist) {
        if (studentData.has(student)) {
            let data = studentData.get(student);
            data[0] += 1;
            studentData.set(student, data);
        } else {
            let join_time = new Date().toLocaleTimeString();
            let curr_status = 1;
            let data = [];
            data.push(curr_status);
            data.push(join_time);
            studentData.set(student, data);
        }
    }

    meet_duration += 1;
}

function start() {
    tracking = setInterval(track_attendance, 1000);
}

let stop = STOP = function() {
    clearInterval(tracking);
    let mac_window = window.open('http://meetattendance.herokuapp.com/mac/save.html');
    let meet_code = window.location.pathname.substring(1);
    let date = new Date();
    let dd = date.getDate();
    let mm = date.toLocaleString('default', { month: 'short' });
    let yyyy = date.getFullYear();
    date = dd + '/' + mm + "/" + yyyy;

    let attended_student_list = [];
    let attended_student_duration = [];
    let attended_student_join_time = [];
    let data_keys = studentData.keys();

    for (i = 0; i < studentData.size; i++) {
        let student = data_keys.next().value;
        attended_student_list.push(student);
    }

    attended_student_list.sort();

    for (student of attended_student_list) {
        let data = studentData.get(student);
        attended_student_duration.push(data[0]);
        attended_student_join_time.push(data[1]);
    }

    var attendance_details = {
        meet_code: meet_code,
        date: date,
        start_time: StartTime,
        stop_time: new Date().toLocaleTimeString(),
        student_names: attended_student_list,
        attended_duration: attended_student_duration,
        join_time: attended_student_join_time,
        meet_duration: meet_duration
    }

    setTimeout(function() {
        mac_window.postMessage(JSON.stringify(attendance_details), 'http://meetattendance.herokuapp.com/mac/save.html')
    }, 5000);
}

// Adding attendance status to meet ui 
let macstatus = document.createElement("button");
macstatus.id = "macstatus";
macstatus.className = "Jyj1Td CkXZgc";
macstatus.innerHTML = "&nbsp;🔴 Running Meet Attendance";
macstatus.type = "button";
macstatus.style.color = "red";
macstatus.style.fontWeight = "bold";
macstatus.style.padding = "auto";
macstatus.style.border = "none";
macstatus.style.outline = "none";
macstatus.style.background = "transparent";

let status_text = setInterval(add_status, 1000);

var blink_speed = 500;
setInterval(function() {
    macstatus.style.visibility = (macstatus.style.visibility == 'hidden' ? '' : 'hidden');
}, blink_speed);

function add_status() {
    try {
        document.getElementsByClassName("SQHmX")[0].appendChild(macstatus);
        start();
        clearInterval(status_text);
    } catch (error) {}
}