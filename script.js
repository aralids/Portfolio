let gridHeight = 21;
let gridWidth = 21;

function gridImage(name, scheme, gridId) {
    this.name = name;
    this.scheme = scheme;
    this.gridId = gridId;
    this.makeCurrent = function(gridSchemeCurrent, livingState) {
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
                    btn.classList.add("cell", `${this.gridId}-row-${i}`, `${this.gridId}-col-${j}`, this.scheme[i*gridWidth+j], livingState);
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
                cell.classList.replace(cell.classList[3], differences[i][1]);
            }
            for (let i = 0; i < this.scheme.length; i++) {
                let cell = document.getElementById(`${this.gridId}-cell-${Math.floor(i / gridWidth)}-${i % gridWidth}`);
                cell.classList.replace(cell.classList[4], livingState);
            }
            return this.scheme;
        }
    };  
}

/* GRID COLOR SCHEMES */

let cellSchemeInitialInt = [];
for (let i = 0; i < gridHeight*gridWidth; i++) {
    cellSchemeInitialInt.push(0)
}
cellSchemeInitialInt.splice(0, 1, 1)
let cellSchemeInitial = stringifyScheme(cellSchemeInitialInt);

let cellScheme1Int = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
];

let cellScheme1 = stringifyScheme(cellScheme1Int);

let qrCodeInt = [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1,
1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1,
1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,
0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1,
0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1,
0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0,
1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1,
0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1,
1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1,
1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1,
1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0,
1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0,
1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1];

let qrCode = stringifyScheme(qrCodeInt);
console.log("S", qrCode);

function stringifyScheme(schemeInt) {
    let stringifiedScheme = [];
    for (let i = 0; i < schemeInt.length; i++) {
        if (schemeInt[i] === 0) {
            stringifiedScheme.push("white-cell");
        }
        else if (schemeInt[i] === 1) {
            stringifiedScheme.push("purple-cell");
        }
        else if (schemeInt[i] === 2) {
            stringifiedScheme.push("orange-cell");
        }
    }
    return stringifiedScheme;
}

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


gridInitial = new gridImage("cellSchemeInitial", cellSchemeInitial, "cell-grid");
grid1 = new gridImage("cellScheme1", cellScheme1, "cell-grid");
gridCard1 = new gridImage("cellCard1", cellScheme1, "card1");
gridCard2 = new gridImage("cellCard2", cellScheme1, "card2");
qrCodeGrid = new gridImage("qrCode", qrCode, "cell-grid")

cellSchemeCurrent = gridInitial.makeCurrent(cellSchemeCurrent, "dead");
cellSchemeCard1 = gridCard1.makeCurrent(cellSchemeCard1, "alive");
cellSchemeCard2 = gridCard2.makeCurrent(cellSchemeCard2, "alive");


let viewportHeight = window.innerHeight;
window.onkeydown = function() {updateCellGrid()};
document.getElementById("information").onscroll = function() {updateCellGrid()};
document.getElementById("main").onmousewheel = function() {console.log("YAY"); updateCellGrid()};

var rect = document.getElementById("cell-grid").getBoundingClientRect();

function updateCellGrid() {
    console.log("Here");
    var winScroll = document.getElementById("information").scrollTop || document.documentElement.scrollTop;
    console.log(winScroll);
    if (winScroll >= 0 && winScroll < viewportHeight*(4/5) - 5) {
        cellSchemeCurrent = gridInitial.makeCurrent(cellSchemeCurrent, "dead");

        console.log("WELCOME", 0)
    }
    if (winScroll > viewportHeight*(4/5) - 5 && winScroll < 2*(viewportHeight*(4/5)) - 5) {
        document.getElementById("cell-grid").style.left = rect.left + "px";
        document.getElementById("card1").style.left = rect.left + "px";
        document.getElementById("card1").style.boxShadow = "none";
        document.getElementById("card2").style.left = rect.left + "px";
        document.getElementById("card2").style.boxShadow = "none";
        cellSchemeCurrent = grid1.makeCurrent(cellSchemeCurrent, "alive");

        console.log("ABOUT-ME", viewportHeight*(4/5))
    }
    if (winScroll > 2*(viewportHeight*(4/5) - 5) && winScroll < 3*(viewportHeight*(4/5)) - 5) {
        document.getElementById("cell-grid").style.left = "calc(97% - 490px)";
        document.getElementById("card1").style.left = "calc(77% - 490px)";
        document.getElementById("card1").style.boxShadow = "0px 0px 20px 5px #A9A9A9";
        document.getElementById("card2").style.left = "calc(87% - 490px)";
        document.getElementById("card2").style.boxShadow = "0px 0px 20px 5px #A9A9A9";

        console.log("PROJECTS", 2*(viewportHeight*(4/5)))
    }
    if (winScroll > 3*(viewportHeight*(4/5)) - 5) {
        document.getElementById("cell-grid").style.left = rect.left + "px";
        cellSchemeCurrent = qrCodeGrid.makeCurrent(cellSchemeCurrent, "alive");

        document.getElementById("card1").style.left = rect.left + "px";
        document.getElementById("card1").style.boxShadow = "none";
        document.getElementById("card2").style.left = rect.left + "px";
        document.getElementById("card2").style.boxShadow = "none";

        console.log("CONTACT", 3*(viewportHeight*(4/5)));
    }
}

function changeLivingState(id) {
    let aliveState = document.getElementById(id).classList[4];
    console.log(id, aliveState);
    if (aliveState === "alive") {
        document.getElementById(id).classList.replace("alive", "dead");
    } else {
        document.getElementById(id).classList.replace("dead");
    }
}

function resurrect(id) {
    let aliveState = document.getElementById(id).classList[4];
    if (aliveState === "dead") {
        document.getElementById(id).classList.replace("dead");
    }
}