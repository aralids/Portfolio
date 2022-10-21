const canvas = document.getElementById("canvas");
const main = document.getElementById("main");
canvas.height = main.offsetHeight;
canvas.width = main.offsetWidth;
const ctx = canvas.getContext("2d");
let drawing = [];

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

    drawing.push([ctx.strokeStyle, ctx.lineWidth, prevX, prevY, currentX, currentY]);

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    console.log('drawing: ', drawing);
   
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