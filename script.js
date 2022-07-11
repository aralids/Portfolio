let cellColors = [];
for (let i = 0; i < 17*15; i++) {
    cellColors.push("white-cell")
}
cellColors.splice(0, 1, "purple-cell")
console.log(cellColors[0]);

let cellGrid = document.getElementById('cell-grid');
for (let i = 0; i < 17; i++) {
    let div = document.createElement("div");
    div.setAttribute("id", `row-${i}`);
    cellGrid.appendChild(div);
}

for (let i = 0; i < 17; i++) {
    for (let j = 0; j < 15; j++) {
        let btn = document.createElement("button");
        let id = `cell-${i}-${j}`;
        btn.setAttribute("id", `cell-${i}-${j}`);
        btn.classList.add("cell", `row-${i}`, `coll-${j}`, cellColors[i*15+j], "dead");
        btn.setAttribute("onmouseover", `resurrect('${id}')`);
        document.getElementById(`row-${i}`).appendChild(btn);
    }
}

function changeLivingState(id) {
    let aliveState = document.getElementById(id).classList[4];
    console.log(id, aliveState);
    if (aliveState === "alive") {
        document.getElementById(id).classList.replace("alive", "dead");
    } else {
        document.getElementById(id).classList.replace("dead", "alive");
    }
}

function resurrect(id) {
    let aliveState = document.getElementById(id).classList[4];
    if (aliveState === "dead") {
        document.getElementById(id).classList.replace("dead", "alive");
    }
}

window.onkeydown = function() {updateCellGrid()};
document.getElementById("information").onscroll = function() {updateCellGrid()};
document.getElementById("main").onmousewheel = function() {console.log("YAY"); updateCellGrid()};

function updateCellGrid() {
    console.log("Here");
    var winScroll = document.getElementById("information").scrollTop || document.documentElement.scrollTop;
    console.log(winScroll);
    if (winScroll > 5) {
        cell = document.getElementById("cell-0-0");
        if (cell.classList[4] == "alive") {
            cell.classList.replace("alive", "dead");
            cell.classList.replace("purple-cell", "white-cell")
        }
    }
}