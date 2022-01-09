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
        clearInterval(status_text);
    } catch (error) {}
}