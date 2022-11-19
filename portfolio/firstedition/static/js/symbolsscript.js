let mode = "viewing mode";
let date = "2022-11-18";

const canvas = document.getElementById("canvas");
const main = document.getElementById("main");
canvas.height = main.offsetHeight;
canvas.width = main.offsetWidth;
const ctx = canvas.getContext("2d");
let drawing = "";

let prevX = null
let prevY = null

ctx.lineWidth = 5

let draw = false
let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let drawingModeBtn = document.querySelector(".drawing-mode")
drawingModeBtn.addEventListener("click", () => {
    mode = "drawing mode";
    console.log("mode1: ", mode);
    drawingMode();
})

let viewingModeBtn = document.querySelector(".viewing-mode")
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
    console.log("mode: ", mode);
    let list = document.querySelectorAll(".svg-path");
    for (path of list) {
        path.removeAttribute("onmouseover");
        path.removeAttribute("onmouseout");
    }
    window.addEventListener("mousedown", (e) => draw = true)
    window.addEventListener("mouseup", (e) => draw = false)
    let address = $("#canvas").attr("data-url");

    window.addEventListener("mousemove", (e) => {
        if(prevX == null || prevY == null || !draw){
            prevX = e.clientX
            prevY = e.clientY - 75
            return
        }

        let currentX = e.clientX
        let currentY = e.clientY - 75

        drawing += `${prevX-75} ${prevY} ${currentX-75} ${currentY} `


        $.ajax({
            method: 'POST',
            url: address,
            data: {line: drawing},
            datatype: "text",
            headers: {
                "X-CSRFToken": csrftoken,  // don't forget to include the 'getCookie' function
            },
            success: function (response) {
                console.log("success", response);
                drawing = response;
            },
            error: function (response) {
                console.log("ERROR", response);
            }
        })

        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()
    
        prevX = currentX
        prevY = currentY
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
        location.reload();
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
        unhighlightAllButEntry(entryInstance, 1);
        console.log("SSss: ", specificDate, entryInstance);
        for (path of entryInstances) {
            path.removeAttribute("onmouseover");
            path.removeAttribute("onmouseout");
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
    let list = document.querySelectorAll(`path[date="${entryDate}"]`);
    for (path of list) {
        path.classList.replace("unhighlighted", "highlighted");
    }
}

function unhighlightAllButEntry(e, unmodifiable=0) {
    let entryDate = e.getAttribute("date");
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
    let today = new Date(); 
    let date =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(e.getAttribute("date"), date);
}

function highlightAll() {
    let list = document.querySelectorAll(".unhighlighted");
    for (path of list) {
        path.classList.replace("unhighlighted", "highlighted");
    }
}

function unhighlightAll() {
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
}