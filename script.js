let gridHeight = 21;
let gridWidth = 21;

livingStates = ["dead", "alive"];
cellGrids = ["cell-grid-main", "cell-grid-project-1", "cell-grid-project-2"];

function Grid(gridId) {
    this.gridId = gridId;
    this.scheme = [];
    this.initialize = function(schemeNext, livingState) {
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
    }
    this.makeCurrent = function(schemeNext) {
        differences = calculateDistance(this.scheme, schemeNext);
            for (let i = 0; i < differences.length; i++) {
                let cell = document.getElementById(`${this.gridId}-cell-${Math.floor(differences[i][0] / gridWidth)}-${differences[i][0] % gridWidth}`);
                cell.classList.replace(cell.classList[3], differences[i][1]);
            }
            this.scheme = schemeNext;
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

let schemeCurrentExample = ["white-cell", "orange-cell", "purple-cell", "white-cell"]


/* -- GRID COLOR SCHEMES -- */
cellGridMain = new Grid("cell-grid-main");
cellGridMain.initialize(cgmInitialScheme, "dead");
cellGridProject2 = new Grid("cell-grid-project-2");
cellGridProject2.initialize(cgmQrCode, "alive");
cellGridProject1 = new Grid("cell-grid-project-1");
cellGridProject1.initialize(cgmQrCode, "alive");


let viewportHeight = window.innerHeight * (4 / 5);


let welcome = 0;
let aboutMe = viewportHeight;
let projects = viewportHeight * 2;
let contact = viewportHeight * 3;


window.onkeydown = function() {updateCellGrid()};
document.getElementById("information").onscroll = function() {updateCellGrid()};
document.getElementById("main").onmousewheel = function() {console.log("YAY"); updateCellGrid()};

var rect = document.getElementById("cell-grid-main").getBoundingClientRect();


let currentScrollSection = 0;
function updateCellGrid() {
    var winScroll = document.getElementById("information").scrollTop || document.documentElement.scrollTop;
    console.log(winScroll);

    if (winScroll == welcome) {
        if (currentScrollSection !== 0) { 
            cellGridMain.makeCurrent(cgmInitialScheme);
        };
        console.log("Here1", winScroll, viewportHeight*(4/5));
        console.log("0 to ", viewportHeight*(4/5));
        currentScrollSection = 0;

    
    }
    if (winScroll > welcome && winScroll < aboutMe / 4) {
        if (currentScrollSection == 0) { 
            let scheme, livingStatesArray = getCurrent();
            let aliveArray = livingStatesArray.map((item, index) => item == "alive" ? index : -1)
                                             .filter(item => item > -1)
                                             .map(item => [Math.floor(item / gridWidth), item % gridWidth]);
            console.log("aliveArray NUM", Math.floor(aliveArray.length / 2));
            let n = Math.floor(aliveArray.length / 2);
            for (let i = 0; i < n; i++) {
                console.log("how many?", n);
                let randomItemId = Math.floor(Math.random()*aliveArray.length);
                let randomItem = aliveArray[randomItemId];
                let randomCellId = `cell-grid-main-cell-${randomItem[0]}-${randomItem[1]}`
                aliveArray.splice(randomItemId, 1);
                changeLivingState(randomCellId);
            }
        };
        
        currentScrollSection = 0.25;
    }
    if (winScroll >= aboutMe / 4 && winScroll < aboutMe / 2) {

        if (currentScrollSection == 0.25) { 
            let scheme, livingStatesArray = getCurrent();
            let aliveArray = livingStatesArray.map((item, index) => item == "alive" ? index : -1)
                                             .filter(item => item > -1)
                                             .map(item => [Math.floor(item / gridWidth), item % gridWidth]);
            console.log("aliveArray", aliveArray);
            let n = Math.floor(aliveArray.length);
            for (let i = 0; i < n; i++) {
                console.log("how many?", n);
                let randomItemId = Math.floor(Math.random()*aliveArray.length);
                let randomItem = aliveArray[randomItemId];
                let randomCellId = `cell-grid-main-cell-${randomItem[0]}-${randomItem[1]}`
                aliveArray.splice(randomItemId, 1);
                changeLivingState(randomCellId);
            }
        };
        
        currentScrollSection = 0.5;
    }

    if (winScroll >= aboutMe / 2 && winScroll < aboutMe * (3 / 4)) {

        if (currentScrollSection !== 0.75) { 
            cellGridMain.makeCurrent(cgmQuestionMark);
        };

        if (currentScrollSection == 0.5) { 
            let scheme, livingStatesArray = getCurrent();
            let deadArray = livingStatesArray.map((item, index) => item == "dead" ? index : -1)
                                             .filter(item => item > -1)
                                             .map(item => [Math.floor(item / gridWidth), item % gridWidth]);
            console.log("deadArray", deadArray);
            let n = Math.floor(deadArray.length / 2);
            for (let i = 0; i < n; i++) {
                console.log("how many?", n);
                let randomItemId = Math.floor(Math.random()*deadArray.length);
                let randomItem = deadArray[randomItemId];
                let randomCellId = `cell-grid-main-cell-${randomItem[0]}-${randomItem[1]}`
                deadArray.splice(randomItemId, 1);
                changeLivingState(randomCellId);
            }
        };
        
        currentScrollSection = 0.75;
    }
    if (winScroll > aboutMe * (3 / 4) && winScroll < aboutMe) {

        if (currentScrollSection == 0.75) { 
            let scheme, livingStatesArray = getCurrent();
            let numDead = livingStatesArray.filter(item => item == "dead").length;
            let deadArray = livingStatesArray.map((item, index) => item == "dead" ? index : -1)
                                             .filter(item => item > -1)
                                             .map(item => [Math.floor(item / gridWidth), item % gridWidth]);
            console.log("deadArray", deadArray);
            let n = Math.floor(deadArray.length);
            for (let i = 0; i < n; i++) {
                console.log("how many?", n);
                let randomItemId = Math.floor(Math.random()*deadArray.length);
                let randomItem = deadArray[randomItemId];
                let randomCellId = `cell-grid-main-cell-${randomItem[0]}-${randomItem[1]}`
                deadArray.splice(randomItemId, 1);
                changeLivingState(randomCellId);
            }
        };
        
    }
    if (winScroll >= aboutMe && winScroll < projects) {
        document.getElementById("cell-grid-main").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-1").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-1").style.boxShadow = "none";
        document.getElementById("cell-grid-project-2").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-2").style.boxShadow = "none";

        console.log("Here2", winScroll);
        console.log(aboutMe, " to ", projects);
        currentScrollSection = 1;

    }
    if (winScroll >= projects && winScroll < contact - 100) {
        document.getElementById("cell-grid-main").style.left = "calc(97% - 490px)";
        if (currentScrollSection !== 2) { 
            cellGridMain.makeCurrent(cgmQuestionMark);
        };

        document.getElementById("cell-grid-project-1").style.left = "calc(77% - 490px)";
        document.getElementById("cell-grid-project-1").style.boxShadow = "0px 0px 20px 5px #A9A9A9";
        document.getElementById("cell-grid-project-2").style.left = "calc(87% - 490px)";
        document.getElementById("cell-grid-project-2").style.boxShadow = "0px 0px 20px 5px #A9A9A9";

        console.log("Here3", winScroll);
        console.log(projects, " to ", contact);
        currentScrollSection = 2;
    }
    if (winScroll >= contact - 100) {
        document.getElementById("cell-grid-main").style.left = rect.left + "px";
        if (currentScrollSection !== 3) { 
            cellGridMain.makeCurrent(cgmQrCode);
        };

        document.getElementById("cell-grid-project-1").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-1").style.boxShadow = "none";
        document.getElementById("cell-grid-project-2").style.left = rect.left + "px";
        document.getElementById("cell-grid-project-2").style.boxShadow = "none";

        console.log("Here4", winScroll);
        console.log(contact);
        console.log(contact, " to end");
        currentScrollSection = 3;
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

function getCurrent() {
    let scheme = [];
    let livingStates = [];
    for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
            let id = `cell-grid-main-cell-${i}-${j}`;
            let cell = document.getElementById(id);
            scheme.push(cell.classList[3]);
            livingStates.push(cell.classList[4]);
        }
    }
    console.log("livingStates", livingStates);
    return scheme, livingStates;
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

function animateScroll() {

}