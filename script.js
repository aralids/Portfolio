let gridHeight = 21;
let gridWidth = 21;

livingStates = ["dead", "alive"];
cellGrids = ["cell-grid-main", "cell-grid-project-1", "cell-grid-project-2"];

function Grid(gridId) {
    this.gridId = gridId;
    this.scheme = [];
    this.makeCurrent = function(schemeNext, livingState) {
        if (this.scheme.length === 0) {
            let gridHTML = document.getElementById(this.gridId);
            for (let i = 0; i < gridHeight; i++) {
                let div = document.createElement("div");
                div.setAttribute("id", `${this.gridId}-row-${i}`);
                gridHTML.appendChild(div);
            }
            for (let i = 0; i < gridHeight; i++) {
                for (let j = 0; j < gridWidth; j++) {
                    let btn = document.createElement("button");
                    let id = `${this.gridId}-cell-${i}-${j}`;
                    btn.setAttribute("id", `${this.gridId}-cell-${i}-${j}`);
                    btn.classList.add("cell", `${this.gridId}-row-${i}`, `${this.gridId}-col-${j}`, schemeNext[i*gridWidth+j], livingState);
                    btn.setAttribute("onmouseover", `resurrect('${id}')`);
                    document.getElementById(`${this.gridId}-row-${i}`).appendChild(btn);
                }
            }
            this.scheme = schemeNext;

        } else {
            differences = calculateDistance(this.scheme, schemeNext);
            for (let i = 0; i < differences.length; i++) {
                let cell = document.getElementById(`${this.gridId}-cell-${Math.floor(differences[i][0] / gridWidth)}-${differences[i][0] % gridWidth}`);
                cell.classList.replace(cell.classList[3], differences[i][1]);
            }
            for (let i = 0; i < gridHeight*gridWidth; i++) {
                let cell = document.getElementById(`${this.gridId}-cell-${Math.floor(i / gridWidth)}-${i % gridWidth}`);
                cell.classList.replace(cell.classList[4], livingState);
            }
            this.scheme = schemeNext;
        }
    };
}

function GridImage(scheme) {
    this.scheme = scheme; 
}

/* GRID COLOR SCHEMES */

let cgmInitialSchemeNum = [];
for (let i = 0; i < gridHeight*gridWidth; i++) {
    cgmInitialSchemeNum.push(0)
}
cgmInitialSchemeNum.splice(0, 1, 1);
let cgmInitialScheme = stringifyScheme(cgmInitialSchemeNum);

let cgmQuestionMarkNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
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

let cgmQuestionMark = stringifyScheme(cgmQuestionMarkNum);

let cgmQrCodeNum = [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
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

let cgmQrCode = stringifyScheme(cgmQrCodeNum);



/* -- GRID COLOR SCHEMES -- */
/*
let cellSchemeCurrent = [];
let cellSchemeCard1 = [];
let cellSchemeCard2 = [];


gridInitial = new gridImage(cellSchemeInitial, "cell-grid-main");
grid1 = new gridImage(cellScheme1, "cell-grid-main");
gridCard1 = new gridImage(cellScheme1, "cell-grid-project-1");
gridCard2 = new gridImage(cellScheme1, "cell-grid-project-2");
qrCodeGrid = new gridImage(qrCode, "cell-grid-main")

cellSchemeCurrent = gridInitial.makeCurrent(cellSchemeCurrent, "dead");
cellSchemeCard1 = gridCard1.makeCurrent(cellSchemeCard1, "alive");
cellSchemeCard2 = gridCard2.makeCurrent(cellSchemeCard2, "alive");
*/

cellGridMain = new Grid("cell-grid-main");
cellGridMain.makeCurrent(cgmInitialScheme, "dead");
cellGridProject2 = new Grid("cell-grid-project-2");
cellGridProject2.makeCurrent(cgmQrCode, "alive");
cellGridProject1 = new Grid("cell-grid-project-1");
cellGridProject1.makeCurrent(cgmQrCode, "alive");


let viewportHeight = window.innerHeight;
window.onkeydown = function() {updateCellGrid()};
document.getElementById("information").onscroll = function() {updateCellGrid()};
document.getElementById("main").onmousewheel = function() {console.log("YAY"); updateCellGrid()};

var rect = document.getElementById("cell-grid-main").getBoundingClientRect();

function updateCellGrid() {
    var winScroll = document.getElementById("information").scrollTop || document.documentElement.scrollTop;
    console.log(winScroll);
    if (winScroll >= 0 && winScroll < viewportHeight*(4/5) - 5) {
        cellGridMain.makeCurrent(cgmInitialScheme, "dead");
        
    }
    if (winScroll > viewportHeight*(4/5) - 5 && winScroll < 2*(viewportHeight*(4/5)) - 5) {
        document.getElementById("cell-grid-main").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-1").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-1").style.boxShadow = "none";
        document.getElementById("cell-grid-project-2").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-2").style.boxShadow = "none";
        cellGridMain.makeCurrent(cgmQuestionMark, "dead");

    }
    if (winScroll > 2*(viewportHeight*(4/5) - 5) && winScroll < 3*(viewportHeight*(4/5)) - 5) {
        document.getElementById("cell-grid-main").style.left = "calc(97% - 490px)";
        cellGridMain.makeCurrent(cgmQuestionMark, "alive");

        document.getElementById("cell-grid-project-1").style.left = "calc(77% - 490px)";
        document.getElementById("cell-grid-project-1").style.boxShadow = "0px 0px 20px 5px #A9A9A9";
        document.getElementById("cell-grid-project-2").style.left = "calc(87% - 490px)";
        document.getElementById("cell-grid-project-2").style.boxShadow = "0px 0px 20px 5px #A9A9A9";
    }
    if (winScroll > 3*(viewportHeight*(4/5)) - 5) {
        document.getElementById("cell-grid-main").style.left = rect.left + "px";
        cellGridMain.makeCurrent(cgmQrCode, "alive");

        document.getElementById("cell-grid-project-1").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-1").style.boxShadow = "none";
        document.getElementById("cell-grid-project-2").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-2").style.boxShadow = "none";
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



function mapScrollToImage(gridId="cell-grid-main", schemeNext, livingStateNext) {
    let otherLivingState;
    if (livingStateNext === "alive") {
        otherLivingState = "dead";
    } else {
        otherLivingState = "alive";
    }
    let sameColorSameState = [];
    let sameColorDifferentState = [];
    let differentColorSameState = [];
    let differentColorDifferentState = [];
    
    for (let i = 0; i < gridHeight*gridWidth; i ++) {
        let cellId = `${gridId}-cell-${Math.floor(i / gridWidth)}-${i % gridWidth}`;
        let cell = document.getElementById(cellId);
        if (cell.classList[4] === livingStateNext) {
            if (cell.classList[3] === schemeNext[i]) {
                sameColorSameState.push(cellId);
            } else {
                differentColorSameState.push(cellId);
            }
        } else {
            if (cell.classList[3] === schemeNext[i]) {
                sameColorDifferentState.push(cellId);
            } else {
                differentColorDifferentState.push(cellId);
            }
        }
    }

    let mapping = [];
    
    for (let i = 0; i < sameColorSameState.length / 2; i++) {
        let changeBackAt = Math.random() * 100;
        let changeAt = Math.random() * changeBackAt;

        let randomCellIndex = Math.floor(Math.random() * sameColorSameState.length);
        let randomCellId = sameColorSameState[randomCellIndex];
        let numberPattern = /\d+/g;
        let numberMatchArray = randomCellId.match(numberPattern);
        console.log("BEBI", numberMatchArray);
        let cellI = Number(numberMatchArray[0]) * Number(numberMatchArray[1])
        mapping.push([changeAt, [cellI, otherLivingState]]);
        mapping.push([changeBackAt, [cellI, livingStateNext]]);
    }

    for (let i = 0; i < sameColorDifferentState.length; i++) {
        let changeBackAt = Math.random() * 100;

        let randomCellIndex = Math.floor(Math.random() * sameColorDifferentState.length);
        let randomCellId = sameColorDifferentState[randomCellIndex];
        let numberPattern = /\d+/g;
        let numberMatchArray = randomCellId.match(numberPattern);
        let cellI = Number(numberMatchArray[0]) * Number(numberMatchArray[1])
        mapping.push([changeBackAt, [cellI, livingStateNext]]);
        sameColorDifferentState.splice(randomCellIndex, 1);
    }

    if (livingStateNext === "alive") {
        for (let i = 0; i < differentColorSameState.length; i++) {
            let changeBackAt = Math.random() * 100;
            let changeColorAt = Math.random() * changeBackAt;
            let changeAt = Math.random() * changeColorAt;

            let randomCellIndex = Math.floor(Math.random() * differentColorSameState.length);
            let randomCellId = differentColorSameState[randomCellIndex];
            let numberPattern = /\d+/g;
            let numberMatchArray = randomCellId.match(numberPattern);
            let cellI = Number(numberMatchArray[0]) * Number(numberMatchArray[1])
            mapping.push([changeAt, [cellI, otherLivingState]]);
            mapping.push([changeColorAt, [cellI, schemeNext[cellI]]]);
            mapping.push([changeBackAt, [cellI, livingStateNext]]);
            differentColorSameState.splice(randomCellIndex, 1);
        }

        for (let i = 0; i < differentColorDifferentState.length; i++) {
            let changeColorAt = Math.random() * 100;
            let changeAt = Math.random() * changeColorAt;
    
            let randomCellIndex = Math.floor(Math.random() * differentColorDifferentState.length);
            let randomCellId = differentColorDifferentState[randomCellIndex];
            let numberPattern = /\d+/g;
            let numberMatchArray = randomCellId.match(numberPattern);
            let cellI = Number(numberMatchArray[0]) * Number(numberMatchArray[1])
            mapping.push([changeAt, [cellI, livingStateNext]]);
            mapping.push([changeColorAt, [cellI, schemeNext[cellI]]]);
            differentColorDifferentState.splice(randomCellIndex, 1);
        }
    } else {
        for (let i = 0; i < differentColorSameState.length; i++) {
            let changeColorAt = Math.random() * changeBackAt;

            let randomCellIndex = Math.floor(Math.random() * differentColorSameState.length);
            let randomCellId = differentColorSameState[randomCellIndex];
            let numberPattern = /\d+/g;
            let numberMatchArray = randomCellId.match(numberPattern);
            let cellI = Number(numberMatchArray[0]) * Number(numberMatchArray[1])
            mapping.push([changeColorAt, [cellI, schemeNext[cellI]]]);
            differentColorSameState.splice(randomCellIndex, 1);
        }

        for (let i = 0; i < differentColorDifferentState.length; i++) {
            let changeAt = Math.random() * 100;
            let changeColorAt = Math.random() * changeAt;
    
            let randomCellIndex = Math.floor(Math.random() * differentColorDifferentState.length);
            let randomCellId = differentColorDifferentState[randomCellIndex];
            let numberPattern = /\d+/g;
            let numberMatchArray = randomCellId.match(numberPattern);
            let cellI = Number(numberMatchArray[0]) * Number(numberMatchArray[1])
            mapping.push([changeColorAt, [cellI, schemeNext[cellI]]]);
            mapping.push([changeAt, [cellI, livingStateNext]]);
            differentColorDifferentState.splice(randomCellIndex, 1);
        }
    }

    console.log(sameColorSameState.length, sameColorDifferentState.length, differentColorSameState.length, differentColorDifferentState.length, mapping);
}

function stringifyScheme(schemeNum) {
    let stringifiedScheme = [];
    for (let i = 0; i < schemeNum.length; i++) {
        if (schemeNum[i] === 0) {
            stringifiedScheme.push("white-cell");
        }
        else if (schemeNum[i] === 1) {
            stringifiedScheme.push("purple-cell");
        }
        else if (schemeNum[i] === 2) {
            stringifiedScheme.push("orange-cell");
        }
    }
    return stringifiedScheme;
}

function calculateDistance(schemeCurrent, schemeNext) {
    let differences = [];
    for (let i = 0; i < gridHeight*gridWidth; i++) {
        if (schemeCurrent[i] !== schemeNext[i]) {
            differences.push([i, schemeNext[i]]);
        } 
    }
    return differences;
}