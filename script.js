let cellSchemeInitial = [];
for (let i = 0; i < 17*15; i++) {
    cellSchemeInitial.push("white-cell")
}
cellSchemeInitial.splice(0, 1, "purple-cell")
console.log(cellSchemeInitial[0]);

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
        btn.classList.add("cell", `row-${i}`, `coll-${j}`, cellSchemeInitial[i*15+j], "dead");
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

/* GRID COLOR SCHEMES */

let cellScheme1 = ["white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "orange-cell", "orange-cell", "orange-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "purple-cell", "purple-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "purple-cell", "purple-cell", "white-cell", "orange-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "purple-cell", "purple-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "purple-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "purple-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
];

function calculateDistance(cellSchemeCurrent, cellSchemeNext) {
    let differences = [];
    for (let i = 0; i < 17*15; i++) {
        if (cellSchemeCurrent[i] !== cellSchemeNext[i]) {
            differences.push([i, cellSchemeNext[i]]);
        } 
    }
    return differences;
}

/* -- GRID COLOR SCHEMES -- */

let cellSchemeCurrent = cellSchemeInitial;
window.onkeydown = function() {updateCellGrid(cellScheme1)};
document.getElementById("information").onscroll = function() {updateCellGrid(cellScheme1)};
document.getElementById("main").onmousewheel = function() {console.log("YAY"); updateCellGrid(cellScheme1)};

function updateCellGrid(cellSchemeNext) {
    console.log("Here");
    var winScroll = document.getElementById("information").scrollTop || document.documentElement.scrollTop;
    console.log(winScroll);
    if (winScroll > 5) {
        differences = calculateDistance(cellSchemeCurrent, cellSchemeNext);
        for (let i = 0; i < differences.length; i++) {
            let cell = document.getElementById(`cell-${Math.floor(differences[i][0] / 15)}-${differences[i][0] % 15}`);
            cell.classList.replace(cell.classList[3], differences[i][1])
        }
    }
    console.log(calculateDistance(cellSchemeInitial, cellScheme1));
}