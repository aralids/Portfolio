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

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

// Saving drawing as image
let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    // what ever name you specify here
    // the image will be saved as that name
    a.download = "sketch.png"
    a.click()
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

    drawing = `${prevX-75} ${prevY} ${currentX-75} ${currentY} `
    console.log(drawing);


    $.ajax({
        method: 'POST',
        url: address,
        data: {line: drawing},
        datatype: "text",
        headers: {
            "X-CSRFToken": csrftoken,  // don't forget to include the 'getCookie' function
        },
        success: function (response) {
            console.log("success", drawing);
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

function highlightEntry(e) {
    let entryClass = e.classList[0];
    let list = document.querySelectorAll(`.${entryClass}`);
    for (path of list) {
        path.classList.add("highlighted");
    }
}

function unhighlightEntry(e) {
    let entryClass = e.classList[0];
    let list = document.querySelectorAll(`.${entryClass}`);
    for (path of list) {
        path.classList.remove("highlighted");
    }
}