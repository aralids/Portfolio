let mode = "viewing mode";

const canvas = document.getElementById("canvas");
const main = document.getElementById("main");
canvas.height = main.offsetHeight;
canvas.width = main.offsetWidth;
const ctx = canvas.getContext("2d");
let drawing = "";
let date = "";
let address = $("#canvas").attr("data-url");

let prevX = null;
let prevY = null;

ctx.lineWidth = 5

let draw = false
let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let drawingModeBtn = document.querySelector(".drawing-mode");
drawingModeBtn.addEventListener("click", () => {
    mode = "drawing mode";
    console.log("mode1: ", mode);
    drawingMode();
})

let viewingModeBtn = document.querySelector(".viewing-mode");
viewingModeBtn.addEventListener("click", () => {
    console.log("mode1: ", mode);
    viewingMode();
})

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function drawingMode() {
    XBtn.style.visibility = "hidden";
    let todayOfficial = new Date(); 
    let dateOfficial =  todayOfficial.getFullYear() + '-' + (todayOfficial.getMonth() + 1) + '-' + todayOfficial.getDate();
    date = document.getElementById("input-date").value == 0 ? dateOfficial : document.getElementById("input-date").value;
    console.log("mode: ", mode);
    let list = document.querySelectorAll(".svg-path");
    for (path of list) {
        path.removeAttribute("onmouseover");
        path.removeAttribute("onmouseout");
    }
    window.addEventListener("mousedown", (e) => draw = true)
    window.addEventListener("mouseup", (e) => draw = false)

    window.addEventListener("mousemove", (e) => {
        if(prevX == null || prevY == null || !draw){
            prevX = e.clientX
            prevY = e.clientY - 75
            return
        }

        let currentX = e.clientX
        let currentY = e.clientY - 75

        drawing += `${prevX-75} ${prevY} ${currentX-75} ${currentY} `

        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()
    
        prevX = currentX
        prevY = currentY
        
        console.log(drawing)
    })


}

function viewingMode(specificDate="") {
    
    let paths = document.querySelectorAll("path");
    for (path of paths) {
        path.classList.replace("highlighted-unmodifiable", "highlighted");
        path.classList.replace("unhighlighted", "highlighted");
        path.setAttribute("onmouseover", "unhighlightAllButEntry(this)");
        path.setAttribute("onmouseout", "highlightAll()");
    }

    if (mode === "drawing mode") {
        $.when(sendAJAX()).done(location.reload());
    }

    mode = "viewing mode";

    console.log("mode: ", mode);
    if (specificDate === "") {  
        let list = document.querySelectorAll(".svg-path");
        for (path of list) {
            path.setAttribute("onmouseover", "unhighlightAllButEntry(this)");
            path.setAttribute("onmouseout", "highlightAll()");
        }
    }
    else {

        let entryInstance = document.querySelector(`path[date="${specificDate}"]`);
        let entryInstances = document.querySelectorAll(`path[date="${specificDate}"]`);
        console.log("entryInstance", entryInstance)
        if (entryInstance === null) {
            unhighlightAll();
        } else {
            unhighlightAllButEntry(entryInstance, 1);
            console.log("SSss: ", specificDate, entryInstance);
            for (path of entryInstances) {
                path.removeAttribute("onmouseover");
                path.removeAttribute("onmouseout");
            }
        }
        let nonEntryInstances = document.querySelectorAll(`path:not([date="${specificDate}"])`);
        console.log("--UNHIGHLIGHT", nonEntryInstances)
        for (path of nonEntryInstances) {
            console.log("UNHIGHLIGHT")
            path.setAttribute("onmouseover", "highlightEntry(this)");
            path.setAttribute("onmouseout", "unhighlightAll()");
        }
    }
}

function highlightEntry(e) {
    let entryDate = e.getAttribute("date");
    dateShower.firstChild.data = entryDate;
    document.onmousemove = handleMouseMove;
    let list = document.querySelectorAll(`path[date="${entryDate}"]`);
    for (path of list) {
        path.classList.replace("unhighlighted", "highlighted");
    }
}

let dateShower = document.getElementById("date-shower");

function unhighlightAllButEntry(e, unmodifiable=0) {
    let entryDate = e.getAttribute("date");
    dateShower.firstChild.data = entryDate;
    document.onmousemove = handleMouseMove;
    let list = document.querySelectorAll(`path:not([date="${entryDate}"])`);
    for (path of list) {
        path.classList.replace("highlighted", "unhighlighted");
    }
    if (unmodifiable) {
        let list2 = document.querySelectorAll(`path[date="${entryDate}"]`);
        for (path of list2) {
            path.classList.replace("highlighted", "highlighted-unmodifiable");
        }
    }
    let todaynow = new Date(); 
    let datenow =  todaynow.getFullYear() + '-' + (todaynow.getMonth() + 1) + '-' + todaynow.getDate();
    console.log(e.getAttribute("date"), datenow);
}

function highlightAll() {
    document.onmousemove = () => (console.log("highlightAll"));
    dateShower.style.visibility = "hidden";
    let list = document.querySelectorAll(".unhighlighted");
    for (path of list) {
        path.classList.replace("unhighlighted", "highlighted");
    }
}

function unhighlightAll() {
    document.onmousemove = () => (console.log("highlightAll"));
    dateShower.style.visibility = "hidden";
    let list = document.querySelectorAll(".highlighted");
    for (path of list) {
        path.classList.replace("highlighted", "unhighlighted");
    }
}

function countClicks() {
    date = document.getElementById("input-date").value;
    console.log(date);
    if (mode === "viewing mode") {
        viewingMode(date);
    }
    if (mode === "drawing mode") {
        sendAJAX();
        drawingMode();
    }
}

function showAssociations(entry) {
    let entryDate = entry.getAttribute("date");
    viewingMode(entryDate);
    document.getElementById("input-date").value = entryDate;
    document.getElementById("association-shower").style.visibility = "visible";
    $("#association-top h3").html(entryDate);
}

function sendAJAX() {
    $.ajax({
        method: 'POST',
        url: address,
        data: {line: drawing, day: date},
        datatype: "text",
        headers: {
            "X-CSRFToken": csrftoken,  // don't forget to include the 'getCookie' function
        },
        success: function (response) {
            console.log("success", response);
            drawing = "";
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    })
}

let XBtn = document.getElementById("X-button");
XBtn.addEventListener("click", () => {
    console.log("Clicked X");
    document.getElementById("input-date").value = "";
    viewingMode();
})

let associationXBtn = document.getElementById("association-X-button");
associationXBtn.addEventListener("click", () => {
    console.log("Association-X clicked!")
    document.getElementById("input-date").value = "";
    document.getElementById("association-shower").style.visibility = "hidden";
    viewingMode();
})

let cursorX = 0;
let cursorY = 0;
function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    console.log(event.pageX, event.pageY, event)
    
    dateShower.style.left = `calc(${event.pageX}px + 2px)`;
    dateShower.style.top = `calc(${event.pageY}px - 42px)`;
    dateShower.style.visibility = "visible";
}