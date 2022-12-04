let mode = "viewing mode";

const canvas = document.getElementById("canvas");
const main = document.getElementById("main");
canvas.height = main.offsetHeight;
canvas.width = main.offsetWidth;
const ctx = canvas.getContext("2d");
let drawing = "#000 ";
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
        if (drawing.split().length !== 1) {
            sendAJAX(ctx.strokeStyle);
        }
        drawing = ctx.strokeStyle + " ";
    })
})

let drawingModeBtn = document.querySelector(".drawing-mode");
drawingModeBtn.addEventListener("click", () => {
    mode = "drawing mode";
    drawingMode();
})

let viewingModeBtn = document.querySelector(".viewing-mode");
viewingModeBtn.addEventListener("click", () => {
    if (mode === "drawing mode") {
        sendAJAX();
    }
    viewingMode();
})

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
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
    let svgPaths = document.querySelectorAll(".svg-path");
    for (svgPath of svgPaths) {
        svgPath.classList.replace("unhighlighted", "highlighted");
        svgPath.classList.replace("highlighted-modifiable", "highlighted");
    };
    $("#association-shower").css("visibility", "hidden");
    $("#X-button").css("visibility", "hidden");
    $("#save-button").css("visibility", "visible");
    let todayOfficial = new Date(); 
    let dateOfficial =  todayOfficial.getFullYear() + '-' + (todayOfficial.getMonth() + 1) + '-' + todayOfficial.getDate();
    date = $("#input-date").val() == 0 ? dateOfficial : $("#input-date").val();
    $(".svg-path").removeAttr("onmouseover");
    $(".svg-path").removeAttr("onmouseout");
    $(".svg-path").removeAttr("onclick");

    window.addEventListener("mousedown", (e) => draw = true)
    window.addEventListener("mouseup", (e) => draw = false)

    window.addEventListener("mousemove", (e) => {
        if (prevX == null || prevY == null || !draw) {
            prevX = e.clientX - 200
            prevY = e.clientY - 75
            return
        }

        let currentX = e.clientX - 200
        let currentY = e.clientY - 75

        drawing += `${prevX+125} ${prevY} ${currentX+125} ${currentY} `

        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()
    
        prevX = currentX
        prevY = currentY
    })
}

function viewingMode(specificDate="") {
    
    $("#save-button").css("visibility", "hidden");
    let paths = document.querySelectorAll("path");
    for (path of paths) {
        path.classList.replace("highlighted-unmodifiable", "highlighted");
        path.classList.replace("unhighlighted", "highlighted");
        path.setAttribute("onmouseover", "unhighlightAllButEntry(this)");
        path.setAttribute("onmouseout", "highlightAll()");
        path.setAttribute("onclick", "showAssociations(this)");
    }

    if (mode === "drawing mode") {
        $(document).ajaxStop(function() { location.reload(true); });
    }

    mode = "viewing mode";
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
        if (entryInstance === null) {
            unhighlightAll();
        } else {
            unhighlightAllButEntry(entryInstance, 1);
            for (path of entryInstances) {
                path.setAttribute("onmouseover", "showDate(this)");
                path.setAttribute("onmouseout", "hideDate(this)");
            }
        }
        let nonEntryInstances = document.querySelectorAll(`path:not([date="${specificDate}"])`);
        for (path of nonEntryInstances) {
            path.setAttribute("onmouseover", "highlightEntry(this)");
            path.setAttribute("onmouseout", "unhighlightAll()");
        }
    }
}

function showDate(entry) {
    let entryDate = $(entry).attr("date");;
    dateShower.firstChild.data = entryDate;
    document.onmousemove = handleMouseMove;
}

function hideDate(e) {
    document.onmousemove = () => (console.log("highlightAll"));
    $(dateShower).css("visibility", "hidden");
}

function highlightEntry(entry) {
    let entryDate = $(entry).attr("date");;
    dateShower.firstChild.data = entryDate;
    document.onmousemove = handleMouseMove;
    let list = document.querySelectorAll(`path[date="${entryDate}"]`);
    for (path of list) {
        path.classList.replace("unhighlighted", "highlighted");
    }
}

let dateShower = document.getElementById("date-shower");

function unhighlightAllButEntry(entry, unmodifiable=0) {
    let entryDate = $(entry).attr("date");
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
}

function highlightAll() {
    hideDate();
    let list = document.querySelectorAll(".unhighlighted");
    for (path of list) {
        path.classList.replace("unhighlighted", "highlighted");
    }
}

function unhighlightAll() {
    hideDate();
    let list = document.querySelectorAll(".highlighted");
    for (path of list) {
        path.classList.replace("highlighted", "unhighlighted");
    }
}

function countClicks() {
    date = document.getElementById("input-date").value;
    if (mode === "viewing mode") {
        viewingMode(date);
    }
    if (mode === "drawing mode") {
        sendAJAX();
        drawingMode();
    }
}

function showAssociations(entry) {
    let entryDate = $(entry).attr("date");
    viewingMode(entryDate);
    $("#input-date").val(entryDate);
    $("#association-shower").css("visibility", "visible");
    $("#association-top h3").html(entryDate);
}

function sendAJAX(nextColor="") {
    let username = document.getElementById("logo").getAttribute("username");
    $.ajax({
        method: 'POST',
        url: address,
        data: {line: drawing, day: date, username: username},
        datatype: "text",
        headers: {
            "X-CSRFToken": csrftoken,
        },
        success: function (response) {
            drawing = nextColor == 0 ? drawing : nextColor + " ";
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    })
}

let XBtn = document.getElementById("X-button");
XBtn.addEventListener("click", () => {
    $("#input-date").val("");
    viewingMode();
})

let saveBtn = document.getElementById("save-button");
saveBtn.addEventListener("click", () => {
    sendAJAX();
})

let associationXBtn = document.getElementById("association-X-button");
associationXBtn.addEventListener("click", () => {
    $("#input-date").val("");
    $("#association-shower").css("visibility", "hidden");
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
    
    $(dateShower).css("left", `calc(${event.pageX}px + 2px)`);
    $(dateShower).css("top", `calc(${event.pageY}px - 42px)`);
    $(dateShower).css("visibility", "visible");
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}