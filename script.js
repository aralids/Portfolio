let gridHeight = 21;
let gridWidth = 21;

function gridImage(name, scheme, gridId, initialLivingState) {
    this.name = name;
    this.scheme = scheme;
    this.gridId = gridId;
    this.initialLivingState = initialLivingState;
    this.makeCurrent = function(gridSchemeCurrent) {
        if (gridSchemeCurrent.length === 0) {
            let grid = document.getElementById(this.gridId);
            for (let i = 0; i < gridHeight; i++) {
                let div = document.createElement("div");
                div.setAttribute("id", `${this.gridId}-row-${i}`);
                grid.appendChild(div);
            }
            for (let i = 0; i < gridHeight; i++) {
                for (let j = 0; j < gridWidth; j++) {
                    let btn = document.createElement("button");
                    let id = `${this.gridId}-cell-${i}-${j}`;
                    btn.setAttribute("id", `${this.gridId}-cell-${i}-${j}`);
                    btn.classList.add("cell", `${this.gridId}-row-${i}`, `${this.gridId}-col-${j}`, this.scheme[i*gridWidth+j], this.initialLivingState);
                    btn.setAttribute("onmouseover", `resurrect('${id}')`);
                    document.getElementById(`${this.gridId}-row-${i}`).appendChild(btn);
                }
            }
            console.log(this.gridId, gridSchemeCurrent.length);
            return this.scheme;
        } else {
            differences = calculateDistance(gridSchemeCurrent, this.scheme);
            for (let i = 0; i < differences.length; i++) {
                let cell = document.getElementById(`${this.gridId}-cell-${Math.floor(differences[i][0] / gridWidth)}-${differences[i][0] % gridWidth}`);
                cell.classList.replace(cell.classList[3], differences[i][1])
            }
            return this.scheme;
        }
    };  
}

/* GRID COLOR SCHEMES */

let cellSchemeInitial = [];
for (let i = 0; i < gridHeight*gridWidth; i++) {
    cellSchemeInitial.push("white-cell")
}
cellSchemeInitial.splice(0, 1, "purple-cell")

let cellScheme1 = ["white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell",
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell",
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "orange-cell", "orange-cell", "orange-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "purple-cell", "purple-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "purple-cell", "purple-cell", "white-cell", "orange-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "purple-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "purple-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "orange-cell", "orange-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "purple-cell", "purple-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell",
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
"white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", "white-cell", 
];

function calculateDistance(cellSchemeCurrent, cellSchemeNext) {
    let differences = [];
    for (let i = 0; i < gridHeight*gridWidth; i++) {
        if (cellSchemeCurrent[i] !== cellSchemeNext[i]) {
            differences.push([i, cellSchemeNext[i]]);
        } 
    }
    return differences;
}



/* -- GRID COLOR SCHEMES -- */

let cellSchemeCurrent = [];
let cellSchemeCard1 = [];
let cellSchemeCard2 = [];

gridCard1 = new gridImage("cellCard1", cellScheme1, "card1", "alive");
gridCard2 = new gridImage("cellCard2", cellScheme1, "card2", "alive");
gridInitial = new gridImage("cellSchemeInitial", cellSchemeInitial, "cell-grid", "dead");
grid1 = new gridImage("cellScheme1", cellScheme1, "cell-grid", "dead");

console.log(cellSchemeCurrent);
console.log(cellSchemeCard1);
console.log(cellSchemeCard2);
cellSchemeCurrent = gridInitial.makeCurrent(cellSchemeCurrent);
cellSchemeCard1 = gridCard1.makeCurrent(cellSchemeCard1);
cellSchemeCard2 = gridCard2.makeCurrent(cellSchemeCard2);
console.log(cellSchemeCurrent);
console.log(cellSchemeCard1);
console.log(cellSchemeCard2);

window.onkeydown = function() {updateCellGrid()};
document.getElementById("information").onscroll = function() {updateCellGrid()};
document.getElementById("main").onmousewheel = function() {console.log("YAY"); updateCellGrid()};

var rect = document.getElementById("cell-grid").getBoundingClientRect();

function updateCellGrid() {
    console.log("Here");
    var winScroll = document.getElementById("information").scrollTop || document.documentElement.scrollTop;
    console.log(winScroll);
    if (winScroll > 0 && winScroll < (537-200)) {
        cellSchemeCurrent = gridInitial.makeCurrent(cellSchemeCurrent);
    }
    if (winScroll > (537-200) && winScroll < (1075-200)) {
        document.getElementById("cell-grid").style.left = rect.left + "px";
        document.getElementById("card1").style.left = rect.left + "px";
        document.getElementById("card1").style.boxShadow = "none";
        document.getElementById("card2").style.left = rect.left + "px";
        document.getElementById("card2").style.boxShadow = "none";
        cellSchemeCurrent = grid1.makeCurrent(cellSchemeCurrent);
    }
    if (winScroll > (1075-200) && winScroll < (1612-200)) {
        document.getElementById("cell-grid").style.left = "calc(97% - 490px)";
        document.getElementById("card1").style.left = "calc(77% - 490px)";
        document.getElementById("card1").style.boxShadow = "0px 0px 20px 5px #A9A9A9";
        document.getElementById("card2").style.left = "calc(87% - 490px)";
        document.getElementById("card2").style.boxShadow = "0px 0px 20px 5px #A9A9A9";
    }
    if (winScroll > (1612-200)) {
        document.getElementById("cell-grid").style.left = rect.left + "px";
        document.getElementById("card1").style.left = rect.left + "px";
        document.getElementById("card1").style.boxShadow = "none";
        document.getElementById("card2").style.left = rect.left + "px";
        document.getElementById("card2").style.boxShadow = "none";
    }
    console.log(calculateDistance(cellSchemeInitial, cellScheme1));
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