function gridImage(name, scheme) {
    this.name = name;
    this.scheme = scheme;
    this.makeCurrent = function() {
        if (cellSchemeCurrent.length === 0) {
            let cellGrid = document.getElementById("cell-grid");
            let card1 = document.getElementById("card1");
            let card2 = document.getElementById("card2");
            for (let i = 0; i < 17; i++) {
                /* For cellGrid: */
                let div = document.createElement("div");
                div.setAttribute("id", `row-${i}`);
                cellGrid.appendChild(div);

                /* For card1: */
                let div1 = document.createElement("div");
                div1.setAttribute("id", `card1-row-${i}`);
                card1.appendChild(div1);

                /* For card2: */
                let div2 = document.createElement("div");
                div2.setAttribute("id", `card2-row-${i}`);
                card2.appendChild(div2);
            }
            for (let i = 0; i < 17; i++) {
                for (let j = 0; j < 15; j++) {
                    /* For cellGrid: */
                    let btn = document.createElement("button");
                    let id = `cell-${i}-${j}`;
                    btn.setAttribute("id", `cell-${i}-${j}`);
                    btn.classList.add("cell", `row-${i}`, `col-${j}`, this.scheme[i*15+j], "dead");
                    btn.setAttribute("onmouseover", `resurrect('${id}')`);
                    document.getElementById(`row-${i}`).appendChild(btn);

                    /* For card1: */
                    let btn1 = document.createElement("button");
                    let id1 = `card1-cell-${i}-${j}`;
                    btn1.setAttribute("id", `card1-cell-${i}-${j}`);
                    btn1.classList.add("cell", `card1-row-${i}`, `card1-col-${j}`, this.scheme[i*15+j], "alive");
                    btn1.setAttribute("onmouseover", `resurrect('${id1}')`);
                    document.getElementById(`card1-row-${i}`).appendChild(btn1);

                    /* For card2: */
                    let btn2 = document.createElement("button");
                    let id2 = `card2-cell-${i}-${j}`;
                    btn2.setAttribute("id", `card2-cell-${i}-${j}`);
                    btn2.classList.add("cell", `card2-row-${i}`, `card2-col-${j}`, this.scheme[i*15+j], "alive");
                    btn2.setAttribute("onmouseover", `resurrect('${id2}')`);
                    document.getElementById(`card2-row-${i}`).appendChild(btn2);
                }
            }
            return this.scheme;
        } else {
            differences = calculateDistance(cellSchemeCurrent, this.scheme);
            for (let i = 0; i < differences.length; i++) {
                let cell = document.getElementById(`cell-${Math.floor(differences[i][0] / 15)}-${differences[i][0] % 15}`);
                cell.classList.replace(cell.classList[3], differences[i][1])
            }
            return this.scheme;
        }
    };  
}

/* GRID COLOR SCHEMES */

let cellSchemeInitial = [];
for (let i = 0; i < 17*15; i++) {
    cellSchemeInitial.push("white-cell")
}
cellSchemeInitial.splice(0, 1, "purple-cell")

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


gridInitial = new gridImage("cellSchemeInitial", cellSchemeInitial);
grid1 = new gridImage("cellScheme1", cellScheme1);

window.onkeydown = function() {updateCellGrid()};
document.getElementById("information").onscroll = function() {updateCellGrid()};
document.getElementById("main").onmousewheel = function() {console.log("YAY"); updateCellGrid()};

let cellSchemeCurrent = [];
cellSchemeCurrent = gridInitial.makeCurrent();

var rect = document.getElementById("cell-grid").getBoundingClientRect();

function updateCellGrid() {
    console.log("Here");
    var winScroll = document.getElementById("information").scrollTop || document.documentElement.scrollTop;
    console.log(winScroll);
    if (winScroll > 0 && winScroll < 537) {
        cellSchemeCurrent = gridInitial.makeCurrent();
    }
    if (winScroll > 537 && winScroll < 1075) {
        document.getElementById("cell-grid").style.left = rect.left + "px";
        document.getElementById("card1").style.left = rect.left + "px";
        document.getElementById("card1").style.boxShadow = "none";
        document.getElementById("card2").style.left = rect.left + "px";
        document.getElementById("card2").style.boxShadow = "none";
        cellSchemeCurrent = grid1.makeCurrent();
    }
    if (winScroll > 1075) {
        document.getElementById("cell-grid").style.left = "calc(97% - 370px)";
        document.getElementById("card1").style.left = "calc(57% - 370px)";
        document.getElementById("card1").style.boxShadow = "0px 0px 20px 5px #A9A9A9";
        document.getElementById("card2").style.left = "calc(77% - 370px)";
        document.getElementById("card2").style.boxShadow = "0px 0px 20px 5px #A9A9A9";
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