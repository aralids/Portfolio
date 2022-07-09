let cellGrid = document.getElementById('cell-grid');
let cellGridWidth = cellGrid.clientWidth;
let cellGridHeight = cellGrid.clientHeight;
let cellNumberWidth = Math.floor(cellGridWidth/50);
let cellNumberHeight = Math.floor(cellGridHeight/50);

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
        btn.classList.add("cell", `row-${i}`, `coll-${j}`, "purple-cell", "dead");
        btn.setAttribute("onmouseover", `changeLivingState('${id}')`);
        document.getElementById(`row-${i}`).appendChild(btn);
        /* btn.addEventListener("mouseover", changeLivingState(id)); */
    }
}

function changeLivingState(id) {
    console.log(id)
    let aliveState = document.getElementById(id).classList[4];
    if (aliveState === "alive") {
        document.getElementById(id).classList.replace("alive", "dead");
    } else {
        document.getElementById(id).classList.replace("dead", "alive");
    }
}


