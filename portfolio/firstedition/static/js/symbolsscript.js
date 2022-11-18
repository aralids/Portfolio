let mode = "viewing mode";

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
    mode = "viewing mode";
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

function viewingMode() {
    console.log("mode: ", mode);
    let list = document.querySelectorAll(".svg-path");
    for (path of list) {
        path.setAttribute("onmouseover", "highlightEntry(this)");
        path.setAttribute("onmouseout", "unhighlightEntry(this)");
    }
}

function highlightEntry(e) {
    let entryClass = e.getAttribute("date");
    let list = document.querySelectorAll(`path:not([date="${entryClass}"])`);
    for (path of list) {
        path.classList.add("unhighlighted");
    }
    let today = new Date(); 
    let date =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(e.getAttribute("date"), date);
}

function unhighlightEntry(e) {
    let entryClass = e.classList[0];
    let list = document.querySelectorAll(`.${entryClass}`);
    for (path of list) {
        path.classList.remove("unhighlighted");
    }
}