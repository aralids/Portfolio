/* FREQUENTLY UTILIZED VARIABLES */

let gridHeight = 21;
let gridWidth = 21;

let htmlLoginForm = document.getElementById("login-form");
let htmlFlipCard = document.getElementById("flip-card");
let htmlFlipCardInner = document.getElementById("flip-card-inner");
let htmlCellGridMain = document.getElementById("cell-grid-main");
let htmlCellGridProject1 = document.getElementById("cell-grid-project-1");
let htmlCellGridProject2 = document.getElementById("cell-grid-project-2");

livingStates = ["dead", "alive"];
cellGrids = ["cell-grid-main", "cell-grid-project-1", "cell-grid-project-2"];

let viewportHeight = window.innerHeight * (4 / 5);
let viewportHeightFraction = viewportHeight / 7;

let welcome = 0;
let aboutMe = viewportHeight;
let projects = viewportHeight * 2;
let contact = viewportHeight * 3;

var rect = htmlCellGridMain.getBoundingClientRect();
var myInterval;

let currentScrollSection = 0;
let cardFlipped = 0;

/* FREQUENTLY UTILIZED VARIABLES */

/* CLASSES */

function Grid(gridId) {
  this.gridId = gridId;
  this.scheme = [];
  this.initialize = function (schemeNext, livingState) {
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
        btn.classList.add(
          "cell",
          `${this.gridId}-row-${i}`,
          `${this.gridId}-col-${j}`,
          schemeNext[i * gridWidth + j],
          livingState,
        )
        btn.setAttribute("onmouseover", `resurrect("${id}")`);
        document.getElementById(`${this.gridId}-row-${i}`).appendChild(btn);
      }
    }
    this.scheme = schemeNext;
  }
  this.makeCurrent = function (schemeNext) {
    differences = calculateDistance(this.scheme, schemeNext);
    for (let i = 0; i < differences.length; i++) {
      let cell = document.getElementById(`${this.gridId}-cell-${Math.floor(differences[i][0] / gridWidth)}-${differences[i][0] % gridWidth}`);
      cell.classList.replace(cell.classList[3], differences[i][1]);
    }
    this.scheme = schemeNext;
  }
  this.makeInvisible = function () {
    let gridHTML = document.getElementById(this.gridId);
    gridHTML.style.display = "none";
  }
  this.makeVisible = function () {
    let gridHTML = document.getElementById(this.gridId);
    gridHTML.style.display = "initial";
  }
}

function GridImage(scheme) {
  this.scheme = scheme;
}

/* CLASSES */

/* GRID COLOR SCHEMES */

let cgmInitialSchemeNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5,
  0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 5, 6, 6, 5, 0, 0, 0, 0,
  0, 0, 0, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 6, 6, 5, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 5, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0,
  0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 5, 5, 0, 0, 0, 0, 0,
  0, 0, 0, 5, 0, 5, 5, 0, 5, 6, 6, 5, 0, 5, 0, 0, 5, 0, 0, 0, 0,
  0, 0, 0, 5, 0, 0, 5, 0, 5, 6, 6, 5, 0, 5, 5, 0, 5, 0, 0, 0, 0,
  0, 0, 0, 0, 5, 5, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0,
  0, 0, 0, 5, 5, 5, 5, 0, 0, 5, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 5, 6, 6, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 0, 0, 0, 0,
  0, 0, 0, 5, 6, 6, 5, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0,
  5, 5, 5, 5, 5, 5, 5, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

let cgmInitialScheme = stringifyScheme(cgmInitialSchemeNum);

let cgmQuestionMarkNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 7, 7, 8, 8, 8, 7, 7, 8, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 7, 7, 8, 0, 0, 7, 7, 8, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 7, 7, 8, 0, 0, 7, 7, 8, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 7, 7, 7, 8, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 8, 8, 8, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  ];

let cgmQuestionMark = stringifyScheme(cgmQuestionMarkNum);

let project1Num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 4, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0, 4, 0, 0, 0, 0,
  0, 0, 0, 4, 4, 4, 0, 0, 0, 2, 0, 2, 0, 0, 0, 4, 4, 4, 0, 0, 0,
  0, 0, 0, 0, 4, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0, 4, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

let project1 = stringifyScheme(project1Num);

let project2AltNum = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
  1, 1, 2, 2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0,
  1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 4, 4, 4, 4,
  1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 4, 4, 4, 0, 0,
  1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4,
  1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 0, 0,
  1, 1, 3, 1, 1, 1, 1, 0, 1, 2, 2, 2, 1, 4, 4, 4, 4, 4, 4, 4, 4,
  1, 1, 3, 3, 1, 1, 1, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 3, 3, 1, 1, 1, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0,
  1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 4, 0, 0, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 4, 4, 0, 0, 0, 1, 1, 1, 0, 0,
  1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 4, 4, 4, 0, 0, 0, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0,
  1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0,
]

let project2Alt = stringifyScheme(project2AltNum);

let cgmQrCodeNum = [9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9,
  9, 0, 0, 0, 0, 0, 9, 0, 9, 9, 0, 9, 9, 0, 9, 0, 0, 0, 0, 0, 9,
  9, 0, 9, 9, 9, 0, 9, 0, 0, 9, 9, 9, 0, 0, 9, 0, 9, 9, 9, 0, 9,
  9, 0, 9, 9, 9, 0, 9, 0, 0, 9, 0, 9, 9, 0, 9, 0, 9, 9, 9, 0, 9,
  9, 0, 9, 9, 9, 0, 9, 0, 9, 0, 0, 9, 9, 0, 9, 0, 9, 9, 9, 0, 9,
  9, 0, 0, 0, 0, 0, 9, 0, 9, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9,
  9, 9, 9, 9, 9, 9, 9, 0, 9, 0, 9, 0, 9, 0, 9, 9, 9, 9, 9, 9, 9,
  0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  9, 9, 9, 0, 0, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 9,
  0, 9, 0, 9, 0, 0, 0, 0, 9, 0, 9, 0, 0, 9, 0, 9, 9, 9, 0, 0, 9,
  0, 9, 9, 9, 9, 0, 9, 9, 9, 0, 9, 0, 0, 0, 9, 9, 9, 0, 9, 0, 9,
  0, 9, 0, 0, 9, 9, 0, 0, 9, 0, 9, 0, 0, 9, 9, 0, 0, 9, 0, 0, 0,
  9, 0, 9, 9, 9, 0, 9, 0, 9, 0, 9, 0, 9, 9, 0, 9, 9, 9, 0, 0, 9,
  0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 9, 0, 9, 9, 0, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 0, 0, 9, 0, 0, 9, 9, 9, 9, 0, 9,
  9, 0, 0, 0, 0, 0, 9, 0, 9, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 9, 9,
  9, 0, 9, 9, 9, 0, 9, 0, 0, 9, 0, 0, 9, 0, 0, 0, 9, 9, 0, 9, 9,
  9, 0, 9, 9, 9, 0, 9, 0, 0, 9, 9, 9, 0, 9, 9, 0, 9, 0, 0, 0, 0,
  9, 0, 9, 9, 9, 0, 9, 0, 9, 9, 0, 9, 9, 0, 0, 0, 0, 9, 9, 9, 9,
  9, 0, 0, 0, 0, 0, 9, 0, 9, 9, 0, 9, 0, 9, 0, 9, 9, 0, 0, 0, 0,
  9, 9, 9, 9, 9, 9, 9, 0, 9, 0, 0, 9, 9, 9, 0, 0, 9, 0, 9, 0, 9];

let cgmQrCode = stringifyScheme(cgmQrCodeNum);

/* -- GRID COLOR SCHEMES -- */

/* SETTING UP THE STAGE FOR updateCellGrid() */

cellGridMain = new Grid("cell-grid-main");
cellGridMain.initialize(cgmInitialScheme, "dead");
cellGridProject2 = new Grid("cell-grid-project-2");
cellGridProject2.initialize(project1, "alive");
cellGridProject2.makeInvisible();
cellGridProject1 = new Grid("cell-grid-project-1");
cellGridProject1.initialize(project2Alt, "alive");
cellGridProject1.makeInvisible();

window.onkeydown = function () {
  updateCellGrid();
}
document.getElementById("information").onscroll = function () {
  updateCellGrid();
}
document.getElementById("main").onmousewheel = function () {
  updateCellGrid();
}

resurrect("cell-grid-main-cell-3-4");
resurrect("cell-grid-main-cell-4-4");
resurrect("cell-grid-main-cell-5-4");
resurrect("cell-grid-main-cell-12-12");
resurrect("cell-grid-main-cell-12-13");
resurrect("cell-grid-main-cell-12-14");
resurrect("cell-grid-main-cell-4-14");
resurrect("cell-grid-main-cell-5-15");
resurrect("cell-grid-main-cell-5-16");
resurrect("cell-grid-main-cell-6-16");
resurrect("cell-grid-main-cell-7-16");
resurrect("cell-grid-main-cell-20-1");
resurrect("cell-grid-main-cell-0-1");
resurrect("cell-grid-main-cell-0-0");
resurrect("cell-grid-main-cell-20-2");
resurrect("cell-grid-main-cell-1-1");
resurrect("cell-grid-main-cell-15-7");
resurrect("cell-grid-main-cell-16-6");
resurrect("cell-grid-main-cell-15-6");
resurrect("cell-grid-main-cell-14-7");
resurrect("cell-grid-main-cell-16-6");
resurrect("cell-grid-main-cell-15-6");
resurrect("cell-grid-main-cell-10-16");
resurrect("cell-grid-main-cell-9-15");
resurrect("cell-grid-main-cell-9-16");
resurrect("cell-grid-main-cell-8-14");
function startInterval(x) {
  if (myInterval) {
    clearInterval(myInterval);
  }
  myInterval = setInterval(function () {
    gameOfLife();
  }, x)
}
startInterval(1500);

/* SETTING UP THE STAGE FOR updateCellGrid() */

/* FUNCTIONS */

function updateCellGrid() {
  var winScroll = document.getElementById("information").scrollTop || document.documentElement.scrollTop
  /* WELCOME */
  if (winScroll == welcome) {
    hideProjects();
    if (currentScrollSection === 0) {
    } else if (currentScrollSection !== 0) {
      cellGridMain.makeCurrent(cgmInitialScheme);
      for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
          let id = `cell-grid-main-cell-${i}-${j}`;
          let cell = document.getElementById(id);
          cell.setAttribute("onmouseover", `resurrect("${id}")`);
        }
      }
      startInterval(1500)
    }
  }
  /* WELCOME */
  if (winScroll > welcome) {
    clearInterval(myInterval);
  }
  if (winScroll > welcome && winScroll < viewportHeightFraction) {
    if (currentScrollSection < 0.16) {
      for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
          let id = `cell-grid-main-cell-${i}-${j}`
          let cell = document.getElementById(id);
          cell.removeAttribute("onmouseover");
        }
      }
      changeRandomCells(4, 0, "alive");
    } else if (currentScrollSection > 0.16) {
      changeRandomCells(2, 0, "dead");
    }
    currentScrollSection = 0.16;
  }
  if (
    winScroll >= viewportHeightFraction &&
    winScroll < viewportHeightFraction * 2
  ) {
    if (currentScrollSection < 0.32) {
      changeRandomCells(2, 0, "alive");
    } else if (currentScrollSection > 0.32) {
      cellGridMain.makeCurrent(cgmQrCode);
      changeRandomCells(4, 0, "dead");
    }
    currentScrollSection = 0.32;
  }
  if (
    winScroll >= viewportHeightFraction * 2 &&
    winScroll < viewportHeightFraction * 3
  ) {
    changeRandomCells(1, 0, "alive")
    if (currentScrollSection < 0.5) {
      cellGridMain.makeCurrent(cgmQuestionMark);
    } else if (currentScrollSection > 0.5) {
      cellGridMain.makeCurrent(cgmQrCode);
    }
    currentScrollSection = 0.5;
  }
  if (
    winScroll >= viewportHeightFraction * 3 &&
    winScroll < viewportHeightFraction * 4
  ) {
    if (currentScrollSection < 0.66) {
      cellGridMain.makeCurrent(cgmQuestionMark);
      changeRandomCells(32, 0, "dead");
    } else if (currentScrollSection > 0.66) {
      changeRandomCells(2, 0, "alive");

      currentScrollSection = 0.66;
    }
  }
  if (
    winScroll >= viewportHeightFraction * 4 &&
    winScroll < viewportHeightFraction * 5
  ) {
    if (currentScrollSection < 0.82) {
      changeRandomCells(4, 0, "dead");
    } else if (currentScrollSection > 0.82) {
      changeRandomCells(4, 0, "alive");
    }

    currentScrollSection = 0.82;
  }
  if (
    winScroll >= viewportHeightFraction * 5 &&
    winScroll < viewportHeightFraction * 6
  ) {
    htmlFlipCardInner.style.transform = ""
    if (currentScrollSection < 0.92) {
      changeRandomCells(2, 0, "dead");
    } else if (currentScrollSection > 0.92) {
      htmlFlipCard.removeAttribute("onclick");
      changeRandomCells(32, 0, "alive");
    }

    currentScrollSection = 0.92;
  }

  /* ABOUT ME */

  if (
    winScroll >= viewportHeightFraction * 6 &&
    winScroll < aboutMe + viewportHeightFraction
  ) {
    hideProjects();
    cardFlipped = 0;
    changeRandomCells(1, 0, "dead");
    htmlFlipCard.setAttribute("onclick", "flipCard()");
    currentScrollSection = 1;
  }

  /* ABOUT ME */

  if (
    winScroll >= aboutMe + viewportHeightFraction &&
    winScroll < aboutMe + viewportHeightFraction * 2
  ) {
    htmlFlipCardInner.style.transform = ""
    if (currentScrollSection < 1.32) {
      htmlFlipCard.removeAttribute("onclick");
      changeRandomCells(6, 0, "alive");
    } else if (currentScrollSection > 1.32) {
      htmlCellGridMain.removeAttribute("onclick");
      changeRandomCells(2, 0, "dead");
    }
    currentScrollSection = 1.32;
  }

  if (
    winScroll >= aboutMe + viewportHeightFraction * 2 &&
    winScroll < aboutMe + viewportHeightFraction * 3
  ) {
    if (currentScrollSection < 1.48) {
      changeRandomCells(2, 0, "alive");
    } else if (currentScrollSection > 1.48) {
      changeRandomCells(2, 0, "dead");
      cellGridMain.makeCurrent(cgmQuestionMark);
    }
    currentScrollSection = 1.48;
  }
  if (
    winScroll >= aboutMe + viewportHeightFraction * 3 &&
    winScroll < aboutMe + viewportHeightFraction * 4
  ) {
    changeRandomCells(1, 0, "alive")
    if (currentScrollSection < 1.64) {
      cellGridMain.makeCurrent(cgmInitialScheme);
    } else if (currentScrollSection > 1.64) {
      cellGridMain.makeCurrent(cgmQuestionMark);
    }
    currentScrollSection = 1.64;
  }
  if (
    winScroll >= aboutMe + viewportHeightFraction * 4 &&
    winScroll < aboutMe + viewportHeightFraction * 5
  ) {
    hideProjects()
    if (currentScrollSection < 1.8) {
      cellGridMain.makeCurrent(cgmInitialScheme);
      changeRandomCells(2, 0, "dead");
    } else if (currentScrollSection > 1.8) {
      changeRandomCells(2, 0, "alive");
    }
    currentScrollSection = 1.8;
  }
  if (
    winScroll >= aboutMe + viewportHeightFraction * 5 &&
    winScroll < aboutMe + viewportHeightFraction * 6
  ) {
    hideProjects()
    htmlCellGridMain.removeAttribute("onclick")
    htmlCellGridProject1.removeAttribute("onclick")
    htmlCellGridProject2.removeAttribute("onclick")

    htmlFlipCard.removeAttribute("onclick");
    htmlFlipCard.style.cursor = "default";
    htmlCellGridProject1.removeAttribute("onclick");
    htmlCellGridProject1.style.cursor = "default";
    htmlCellGridProject2.removeAttribute("onclick");
    htmlCellGridProject2.style.cursor = "default";
    buttons = document.querySelectorAll("button");
    buttons.forEach((item) => { item.style.cursor = "default"; });

    if (currentScrollSection < 1.96) {
      changeRandomCells(2, 0, "dead");
      cellGridProject1.makeVisible();
      cellGridProject2.makeVisible();
    } else if (currentScrollSection > 1.96) {
      changeRandomCells(0, 18, "alive");
    }
    currentScrollSection = 1.96;
  }

  /* PROJECTS */

  if (
    winScroll >= aboutMe + viewportHeightFraction * 6 &&
    winScroll < projects + viewportHeightFraction
  ) {
    changeRandomCells(1, 0, "dead");

    htmlFlipCard.style.left = "calc(95% - 322px)";
    htmlCellGridProject1.style.left = "calc(75% - 322px)";
    htmlCellGridProject1.style.boxShadow = "0px 0px 20px 5px #A9A9A9";
    htmlCellGridProject2.style.left = "calc(85% - 322px)";
    htmlCellGridProject2.style.boxShadow = "0px 0px 20px 5px #A9A9A9";

    htmlCellGridProject1.style.cursor = "pointer";
    htmlCellGridProject2.style.cursor = "pointer";

    buttons = document.querySelectorAll("button");
    buttons.forEach((item) => { item.style.cursor = "pointer"; })

    htmlCellGridProject1.setAttribute("onclick", "submit('temple')");
    htmlCellGridProject2.setAttribute("onclick", "submit('gastroobscura')");
    htmlCellGridMain.setAttribute("onclick", "submit('vitamins')");
    document.getElementById("project-1").setAttribute("onclick", "submit('temple')");
    document.getElementById("project-2").setAttribute("onclick", "submit('gastroobscura')");
    document.getElementById("project-3").setAttribute("onclick", "submit('vitamins')");
    
    currentScrollSection = 2;
  }

  /* PROJECTS */

  if (
    winScroll >= projects + viewportHeightFraction &&
    winScroll < projects + viewportHeightFraction * 2
  ) {
    hideProjects();
    htmlCellGridMain.removeAttribute("onclick");
    htmlCellGridProject1.removeAttribute("onclick");
    htmlCellGridProject2.removeAttribute("onclick");
    if (currentScrollSection < 2.16) {
      htmlFlipCard.removeAttribute("onclick");
      htmlFlipCard.style.cursor = "default";
      htmlCellGridProject1.removeAttribute("onclick");
      htmlCellGridProject1.style.cursor = "default";
      htmlCellGridProject2.removeAttribute("onclick");
      htmlCellGridProject2.style.cursor = "default";
      buttons = document.querySelectorAll("button");
      buttons.forEach((item) => {
        item.style.cursor = "default";
      })
      changeRandomCells(4, 0, "alive");
    } else if (currentScrollSection > 2.16) {
      cellGridProject1.makeVisible();
      cellGridProject2.makeVisible();
      changeRandomCells(2, 0, "dead");
    }
    currentScrollSection = 2.16;
  }
  if (
    winScroll >= projects + viewportHeightFraction * 2 &&
    winScroll < projects + viewportHeightFraction * 3
  ) {
    if (currentScrollSection < 2.32) {
      hideProjects();
      changeRandomCells(2, 0, "alive");
    } else if (currentScrollSection > 2.32) {
      cellGridMain.makeCurrent(cgmInitialScheme);
      changeRandomCells(4, 0, "dead");
    }
    currentScrollSection = 2.32;
  }
  if (
    winScroll >= projects + viewportHeightFraction * 3 &&
    winScroll < projects + viewportHeightFraction * 4
  ) {
    changeRandomCells(1, 0, "alive");
    if (currentScrollSection < 2.48) {
      cellGridMain.makeCurrent(cgmQrCode);
    } else if (currentScrollSection > 2.48) {
      cellGridMain.makeCurrent(cgmInitialScheme);
    }
    currentScrollSection = 2.48;
  }
  if (
    winScroll >= projects + viewportHeightFraction * 4 &&
    winScroll < projects + viewportHeightFraction * 5
  ) {
    if (currentScrollSection < 2.64) {
      cellGridMain.makeCurrent(cgmQrCode);
      changeRandomCells(4, 0, "dead");
    } else if (currentScrollSection > 2.64) {
      changeRandomCells(2, 0, "alive");
    }
    currentScrollSection = 2.64;
  }
  if (
    winScroll >= projects + viewportHeightFraction * 5 &&
    winScroll < projects + viewportHeightFraction * 6
  ) {
    if (currentScrollSection < 2.8) {
      changeRandomCells(2, 0, "dead");
    } else if (currentScrollSection > 2.8) {
      changeRandomCells(2, 0, "alive");
    }
    currentScrollSection = 2.8
  }
  if (winScroll >= projects + viewportHeightFraction * 6) {
    hideProjects();
    changeRandomCells(1, 0, "dead");
    currentScrollSection = 3;
  }
}

function changeLivingState(id) {
  let aliveState = document.getElementById(id).classList[4];
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

function kill(id) {
  let aliveState = document.getElementById(id).classList[4];
  if (aliveState === "alive") {
    document.getElementById(id).classList.replace("alive", "dead");
  }
}

function stringifyScheme(schemeNum) {
  let stringifiedScheme = []
  for (let i = 0; i < schemeNum.length; i++) {
    if (schemeNum[i] === 0) {
      stringifiedScheme.push("negative-space-color");
    } else if (schemeNum[i] === 1) {
      stringifiedScheme.push("projects-first-color");
    } else if (schemeNum[i] === 2) {
      stringifiedScheme.push("projects-second-color");
    } else if (schemeNum[i] === 3) {
      stringifiedScheme.push("projects-third-color");
    } else if (schemeNum[i] === 4) {
      stringifiedScheme.push("projects-fourth-color");
    } else if (schemeNum[i] === 5) {
      stringifiedScheme.push("welcome-first-color");
    } else if (schemeNum[i] === 6) {
      stringifiedScheme.push("welcome-second-color");
    } else if (schemeNum[i] === 7) {
      stringifiedScheme.push("about-me-first-color");
    } else if (schemeNum[i] === 8) {
      stringifiedScheme.push("about-me-second-color");
    } else if (schemeNum[i] === 9) {
      stringifiedScheme.push("contact-first-color");
    }
  }
  return stringifiedScheme;
}

function getCurrent() {
  let scheme = []
  let livingStates = []
  for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
      let id = `cell-grid-main-cell-${i}-${j}`;
      let cell = document.getElementById(id);
      scheme.push(cell.classList[3]);
      livingStates.push(cell.classList[4]);
    }
  }
  return scheme, livingStates
}

function calculateDistance(schemeCurrent, schemeNext) {
  let differences = [];
  for (let i = 0; i < gridHeight * gridWidth; i++) {
    if (schemeCurrent[i] !== schemeNext[i]) {
      differences.push([i, schemeNext[i]]);
    }
  }
  return differences;
}

function calculateAlive() {
  let scheme, livingStatesArray = getCurrent();
  let array = livingStatesArray
    .map((item, index) => (item == "alive" ? index : -1))
    .filter((item) => item > -1)
    .map((item) => [Math.floor(item / gridWidth), item % gridWidth]);
  return array.length;
}

function changeRandomCells(fraction = 0, numCells = 0, currentLivingState) {
  let scheme,
    livingStatesArray = getCurrent();
  let array = livingStatesArray
    .map((item, index) => (item == currentLivingState ? index : -1))
    .filter((item) => item > -1)
    .map((item) => [Math.floor(item / gridWidth), item % gridWidth]);
  let n;
  if (fraction !== 0) {
    n = Math.floor(array.length / fraction);
  } else {
    n = numCells;
  }
  for (let i = 0; i < n; i++) {
    let randomItemId = Math.floor(Math.random() * array.length);
    let randomItem = array[randomItemId];
    let randomCellId = `cell-grid-main-cell-${randomItem[0]}-${randomItem[1]}`;
    array.splice(randomItemId, 1);
    changeLivingState(randomCellId);
  }
}

function previous(arrLength, i) {
  return i === 0 ? arrLength - 1 : i - 1;
}

function next(arrLength, i) {
  return i === arrLength - 1 ? 0 : i + 1;
}

function gameOfLife() {
  let newlyDead = [];
  let newlyAlive = [];
  for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
      let id = `cell-grid-main-cell-${i}-${j}`;
      let idLeft = `cell-grid-main-cell-${i}-${previous(gridWidth, j)}`;
      let idRight = `cell-grid-main-cell-${i}-${next(gridWidth, j)}`;
      let idTop = `cell-grid-main-cell-${previous(gridHeight, i)}-${j}`;
      let idBottom = `cell-grid-main-cell-${next(gridHeight, i)}-${j}`;
      let idTopLeft = `cell-grid-main-cell-${previous(gridHeight, i,)}-${previous(gridWidth, j)}`;
      let idTopRight = `cell-grid-main-cell-${previous(gridHeight, i)}-${next(gridWidth, j)}`;
      let idBottomLeft = `cell-grid-main-cell-${next(gridHeight, i)}-${previous(gridWidth, j)}`;
      let idBottomRight = `cell-grid-main-cell-${next(gridHeight, i)}-${next(gridWidth, j)}`;

      let cell = document.getElementById(id);
      let cellLeft = document.getElementById(idLeft);
      let cellRight = document.getElementById(idRight);
      let cellTop = document.getElementById(idTop);
      let cellBottom = document.getElementById(idBottom);
      let cellTopLeft = document.getElementById(idTopLeft);
      let cellTopRight = document.getElementById(idTopRight);
      let cellBottomLeft = document.getElementById(idBottomLeft);
      let cellBottomRight = document.getElementById(idBottomRight);

      let neighbours = [cellTopLeft, cellTop, cellTopRight,
        cellLeft, cellRight,
        cellBottomLeft, cellBottom, cellBottomRight]
      let aliveNeighbours = neighbours
        .map((item) => item.classList[4])
        .map((item) => (item === "alive" ? 1 : 0))
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      if (aliveNeighbours > 0) {};
      if (cell.classList[4] === "alive") {
        if (aliveNeighbours < 2 || aliveNeighbours > 3) {
          newlyDead.push(id);
        }
      } else {
        if (aliveNeighbours === 3) {
          newlyAlive.push(id);
        }
      }
    }
  }
  for (let i of newlyAlive) {
    resurrect(i);
  }
  for (let i of newlyDead) {
    kill(i);
  }
}

function flipCard() {
  cellGridProject1.makeInvisible();
  cellGridProject2.makeInvisible();
  if (cardFlipped === 0) {
    htmlFlipCardInner.style.transform = "rotateY(180deg)";
    cardFlipped = 1;
  } else {
    htmlFlipCardInner.style.transform = "";
    cardFlipped = 0;
  }
}

function hideProjects() {
  htmlFlipCard.style.left = rect.left + "px";
  htmlCellGridProject1.style.left = rect.left + "px";
  htmlCellGridProject1.style.boxShadow = "none";
  htmlCellGridProject2.style.left = rect.left + "px";
  htmlCellGridProject2.style.boxShadow = "none";
}

function onSubmitAction(event) {

  event.preventDefault();
  let theme = document.getElementById("username").value != false ? document.getElementById("username").value : "admin";
  if (document.getElementById("submit-button").value === "Submit") {
    let address = $("#logo").attr("verification-url");
    const csrftoken = getCookie("csrftoken");
    $.ajax({
      method: "POST",
      url: address,
      data: {username: document.getElementById("username").value, password: document.getElementById("password").value},
      datatype: "text",
      headers: {
          "X-CSRFToken": csrftoken,
      },
      success: function (response) {
          $("#logo_alternative").attr("src", `/static/img/${response}`);
          document.getElementById("logo_admin").style.opacity = "0";
          document.getElementById("logo_alternative").style.opacity = "1";
          changeColorPalette(theme);
          htmlLoginForm.style.visibility = "hidden";
          htmlLoginForm.style.opacity = "0";
          htmlLoginForm.style.maxHeight = "0";
          document.getElementById("submit-button").setAttribute("value", "Log out");
          document.getElementById("probably").innerHTML = "you are definitely here because you received my application - welcome!";
          document.getElementById("do").innerHTML = "On the right, behold an implementation of <a id='conway' href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='_blank'>Conway's Game of Life</a> - a simulation of living cells interacting with each other. <u>Move your mouse over the grid</u> to bring dead cells back to life (and reveal the image beneath)!";
          document.getElementById("name").setAttribute("placeholder", `name, company: Anna Mustermann, ${theme.toUpperCase()}`);
          document.getElementById("email").setAttribute("placeholder", `email address: anna.mustermann@${theme}.de`);
          document.getElementById("subject").setAttribute("placeholder", `subject: Your Application at ${theme.toUpperCase()}`);

          if (theme === "bekalabs") {
            $("span").hover(function() { $(this).css("color", "#00aeff"); }, function() { $(this).css("color", ""); });
            $("u").hover(function() { $(this).css("color", "#00aeff"); }, function() { $(this).css("color", ""); });
            $("a").hover(function() { $(this).css("color", "#00aeff"); }, function() { $(this).css("color", ""); });
            $("p").hover(function() { $(this).css("color", "#00aeff"); }, function() { $(this).css("color", ""); });
            $("h2").hover(function() { $(this).css("color", "#00aeff"); }, function() { $(this).css("color", ""); });
            $("h1").hover(function() { $(this).css("color", "#00aeff"); }, function() { $(this).css("color", ""); });
          }
      },
      error: function (response) {
          console.log("ERROR", response);
      }
    });
  }

  else if (document.getElementById("submit-button").value === "Log out") {
    document.getElementById("logo_admin").style.opacity = "1";
    document.getElementById("logo_alternative").style.opacity = "0";
    changeColorPalette("admin");
    
    htmlLoginForm.style.opacity = "1";
    htmlLoginForm.style.visibility = "visible";
    htmlLoginForm.style.maxHeight = "50px";
    document.getElementById("submit-button").setAttribute("value", "Submit");
    document.getElementById("probably").innerHTML = "you are probably here because you received my application - welcome!";
    document.getElementById("do").innerHTML = "Use the username & password from my CV to log in for a personalized experience - or just keep scrolling.";
    
    document.getElementById("name").setAttribute("placeholder", "name, company: John Smith, Company Inc.");
    document.getElementById("email").setAttribute("placeholder", "email address: john.smith@gmail.com");
    document.getElementById("subject").setAttribute("placeholder", "subject: Your Application at Company Inc.");

    document.getElementById("username").value = "admin";
  }
}

function changeColorPalette(theme) {
  document.documentElement.className = theme;
}

function submit(project) {
  if (project === "temple") {
    htmlLoginForm.setAttribute("action", "temple/");
  } else if (project === "gastroobscura") {
    htmlLoginForm.setAttribute("action", "gastroobscura/");
  } else if (project === "vitamins") {
    htmlLoginForm.setAttribute("action", "vitamins/");
  }
  document.getElementById("hidden-button").click();
}

function submitted() {
  console.log("Submitted")
  document.getElementById("contact-submit-button").setAttribute("value", "Successfully submitted! Thank you!");
  document.getElementById("contact-submit-button").cursor = "auto";
}

addEventListener("resize", (event) => {
  let theme = document.getElementById("username").value != false ? document.getElementById("username").value : "admin";
  if (window.screen.availWidth < 700 || window.screen.availHeight < 450) {
    let logos = document.querySelectorAll(".logo-alternative");
    for (logo of logos) {
      logo.style.display = "none";
    }
    document.getElementById("logo_alternative").style.position = "unset";
    document.getElementById("logo_alternative").style.width = "unset";
    document.getElementById("logo_alternative").style.display = "block";
    document.getElementById("logo_alternative").style.height = "100%";
    document.getElementById("mobile-greeting").innerText = `Hello ${theme}!`;
    
  } else {
    
    rect = htmlCellGridMain.getBoundingClientRect();
    htmlFlipCard.style.left = "calc(95% - 322px)";
    htmlCellGridProject1.style.left = "calc(95% - 322px)";
    htmlCellGridProject2.style.left = "calc(95% - 322px)";
    viewportHeight = window.innerHeight * (4 / 5);
    viewportHeightFraction = viewportHeight / 7;

    welcome = 0;
    aboutMe = viewportHeight;
    projects = viewportHeight * 2;
    contact = viewportHeight * 3;

    console.log("resize! width: ", window.screen.availWidth);
    let logos = document.querySelectorAll(".logo-alternative");
    for (logo of logos) {
      logo.style.display = "block";
    }
    document.getElementById("logo_alternative").style.position = "absolute";
    document.getElementById("logo_alternative").style.width = "70px";
  }
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + "=")) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function setHover(elementName1, elementName2) {
  if (!elementName1.includes("grid")) {
    $(`#${elementName1}`).hover(function() {
      $(`#${elementName2}`).css("transform", "scale(1.1)");
      $(`#${elementName1}`).children(".project-description").css("visibility", "visible");
      $(`#${elementName1}`).children(".project-description").css("opacity", "1");
      $(`#${elementName1}`).children(".project-description").css("max-height", "1000px");
      $(`#${elementName1}`).children(".project-description").css("padding-top", "30px");
    }, function() {
      $(`#${elementName2}`).css("transform", "scale(1)");
      $(`#${elementName1}`).children(".project-description").css("visibility", "hidden");
      $(`#${elementName1}`).children(".project-description").css("opacity", "0");
      $(`#${elementName1}`).children(".project-description").css("max-height", "0");
      $(`#${elementName1}`).children(".project-description").css("padding-top", "unset");
    });
  } else {
      $(`#${elementName1}`).hover(function() {
        $(`#${elementName2}`).children(".project-description").css("visibility", "visible");
        $(`#${elementName2}`).children(".project-description").css("opacity", "1");
        $(`#${elementName2}`).children(".project-description").css("max-height", "1000px");
        $(`#${elementName2}`).children(".project-description").css("padding-top", "30px");
    }, function() {
        $(`#${elementName2}`).children(".project-description").css("visibility", "hidden");
        $(`#${elementName2}`).children(".project-description").css("opacity", "0");
        $(`#${elementName2}`).children(".project-description").css("max-height", "0");
        $(`#${elementName2}`).children(".project-description").css("padding-top", "unset");
    });
  }
}

/* FUNCTIONS */

setHover("cell-grid-project-1", "project-1");
setHover("cell-grid-project-2", "project-2");
setHover("cell-grid-main", "project-3");
setHover("project-1", "cell-grid-project-1");
setHover("project-2", "cell-grid-project-2");
setHover("project-3", "cell-grid-main");