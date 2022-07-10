let cellGrid = document.getElementById('cell-grid');
let cellGridWidth = cellGrid.clientWidth;
let cellGridHeight = cellGrid.clientHeight;
let cellNumberWidth = Math.floor(cellGridWidth/20);
let cellNumberHeight = Math.floor(cellGridHeight/20);

for (let i = 0; i < cellNumberHeight; i++) {
    let div = document.createElement("div");
    div.setAttribute("id", `row-${i}`);
    cellGrid.appendChild(div);
}

for (let i = 0; i < cellNumberHeight; i++) {
    for (let j = 0; j < cellNumberWidth; j++) {
        let btn = document.createElement("button");
        let id = `cell-${i}-${j}`;
        btn.setAttribute("id", `cell-${i}-${j}`);
        btn.classList.add("cell", `row-${i}`, `coll-${j}`, "white-cell", "dead");
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
