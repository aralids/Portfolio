let gridHeight = 21
let gridWidth = 21

livingStates = ['dead', 'alive']
cellGrids = ['cell-grid-main', 'cell-grid-project-1', 'cell-grid-project-2']

document.getElementById('cell-grid-project-1').addEventListener('click', function() {
  submit('temple')
});

function Grid(gridId) {
  this.gridId = gridId
  this.scheme = []
  this.initialize = function (schemeNext, livingState) {
    let gridHTML = document.getElementById(this.gridId)
    for (let i = 0; i < gridHeight; i++) {
      let div = document.createElement('div')
      div.setAttribute('id', `${this.gridId}-row-${i}`)
      gridHTML.appendChild(div)
    }
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        let btn = document.createElement('button')
        let id = `${this.gridId}-cell-${i}-${j}`
        btn.setAttribute('id', `${this.gridId}-cell-${i}-${j}`)
        btn.classList.add(
          'cell',
          `${this.gridId}-row-${i}`,
          `${this.gridId}-col-${j}`,
          schemeNext[i * gridWidth + j],
          livingState,
        )
        btn.setAttribute('onmouseover', `resurrect('${id}')`)
        document.getElementById(`${this.gridId}-row-${i}`).appendChild(btn)
      }
    }
    this.scheme = schemeNext
  }
  this.makeCurrent = function (schemeNext) {
    differences = calculateDistance(this.scheme, schemeNext)
    for (let i = 0; i < differences.length; i++) {
      let cell = document.getElementById(
        `${this.gridId}-cell-${Math.floor(differences[i][0] / gridWidth)}-${
          differences[i][0] % gridWidth
        }`,
      )
      cell.classList.replace(cell.classList[3], differences[i][1])
    }
    this.scheme = schemeNext
  }
  this.makeInvisible = function () {
    let gridHTML = document.getElementById(this.gridId)
    gridHTML.style.display = 'none'
  }
  this.makeVisible = function () {
    let gridHTML = document.getElementById(this.gridId)
    gridHTML.style.display = 'initial'
  }
}

function GridImage(scheme) {
  this.scheme = scheme
}

/* GRID COLOR SCHEMES */

let cgmInitialSchemeNum = []
for (let i = 0; i < gridHeight * gridWidth; i++) {
  cgmInitialSchemeNum.push(0)
}
cgmInitialSchemeNum.splice(0, 1, 1)
let cgmInitialScheme = stringifyScheme(cgmInitialSchemeNum)

let cgmQuestionMarkNum = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  2,
  2,
  2,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  2,
  1,
  1,
  1,
  2,
  2,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  2,
  1,
  0,
  0,
  2,
  2,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  2,
  1,
  0,
  0,
  2,
  2,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  2,
  2,
  2,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  2,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  2,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  2,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

let cgmQuestionMark = stringifyScheme(cgmQuestionMarkNum)

let cgmQrCodeNum = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  1,
  1,
  0,
  0,
  1,
  0,
  1,
  0,
  0,
  1,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  0,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
]

let cgmQrCode = stringifyScheme(cgmQrCodeNum)

let schemeCurrentExample = [
  'white-cell',
  'orange-cell',
  'purple-cell',
  'white-cell',
]

/* -- GRID COLOR SCHEMES -- */
cellGridMain = new Grid('cell-grid-main')
cellGridMain.initialize(cgmQrCode, 'dead')
cellGridProject2 = new Grid('cell-grid-project-2')
cellGridProject2.initialize(cgmQrCode, 'alive')
cellGridProject2.makeInvisible()
cellGridProject1 = new Grid('cell-grid-project-1')
cellGridProject1.initialize(cgmQrCode, 'alive')
cellGridProject1.makeInvisible()

let viewportHeight = window.innerHeight * (4 / 5)
let viewportHeightFraction = viewportHeight / 7

let welcome = 0
let aboutMe = viewportHeight
let projects = viewportHeight * 2
let contact = viewportHeight * 3

window.onkeydown = function () {
  updateCellGrid()
}
document.getElementById('information').onscroll = function () {
  updateCellGrid()
}
document.getElementById('main').onmousewheel = function () {
  updateCellGrid()
}

var rect = document.getElementById('cell-grid-main').getBoundingClientRect()
resurrect('cell-grid-main-cell-4-4')
var myInterval
function startInterval(x) {
  if (myInterval) {
    clearInterval(myInterval)
  }
  myInterval = setInterval(function () {
    gameOfLife()
  }, x)
}
startInterval(1500)

let currentScrollSection = 0
let cardFlipped = 0
function updateCellGrid() {
  var winScroll =
    document.getElementById('information').scrollTop ||
    document.documentElement.scrollTop

  /* WELCOME */
  if (winScroll == welcome) {
    hideProjects()
    if (currentScrollSection === 0) {
    } else if (currentScrollSection !== 0) {
      cellGridMain.makeCurrent(cgmQrCode)
      for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
          let id = `cell-grid-main-cell-${i}-${j}`
          let cell = document.getElementById(id)
          cell.setAttribute('onmouseover', `resurrect('${id}')`)
        }
      }
      startInterval(1500)
    }
  }

  /* WELCOME */
  if (winScroll > welcome) {
    clearInterval(myInterval)
  }
  if (winScroll > welcome && winScroll < viewportHeightFraction) {
    if (currentScrollSection < 0.16) {
      for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
          let id = `cell-grid-main-cell-${i}-${j}`
          let cell = document.getElementById(id)
          cell.removeAttribute('onmouseover')
        }
      }
      changeRandomCells(4, 0, 'alive')
    } else if (currentScrollSection > 0.16) {
      changeRandomCells(2, 0, 'dead')
    }
    currentScrollSection = 0.16
  }
  if (
    winScroll >= viewportHeightFraction &&
    winScroll < viewportHeightFraction * 2
  ) {
    if (currentScrollSection < 0.32) {
      changeRandomCells(2, 0, 'alive')
    } else if (currentScrollSection > 0.32) {
      cellGridMain.makeCurrent(cgmQrCode)
      changeRandomCells(4, 0, 'dead')
    }
    currentScrollSection = 0.32
  }
  if (
    winScroll >= viewportHeightFraction * 2 &&
    winScroll < viewportHeightFraction * 3
  ) {
    changeRandomCells(1, 0, 'alive')
    if (currentScrollSection < 0.5) {
      cellGridMain.makeCurrent(cgmQuestionMark)
    } else if (currentScrollSection > 0.5) {
      cellGridMain.makeCurrent(cgmQrCode)
    }
    currentScrollSection = 0.5
  }
  if (
    winScroll >= viewportHeightFraction * 3 &&
    winScroll < viewportHeightFraction * 4
  ) {
    if (currentScrollSection < 0.66) {
      cellGridMain.makeCurrent(cgmQuestionMark)
      changeRandomCells(32, 0, 'dead')
    } else if (currentScrollSection > 0.66) {
      changeRandomCells(2, 0, 'alive')

      currentScrollSection = 0.66
    }
  }
  if (
    winScroll >= viewportHeightFraction * 4 &&
    winScroll < viewportHeightFraction * 5
  ) {
    if (currentScrollSection < 0.82) {
      changeRandomCells(4, 0, 'dead')
    } else if (currentScrollSection > 0.82) {
      changeRandomCells(4, 0, 'alive')
    }

    currentScrollSection = 0.82
  }
  if (
    winScroll >= viewportHeightFraction * 5 &&
    winScroll < viewportHeightFraction * 6
  ) {
    document.getElementById('flip-card-inner').style.transform = ''
    if (currentScrollSection < 0.92) {
      changeRandomCells(2, 0, 'dead')
    } else if (currentScrollSection > 0.92) {
      document.getElementById('flip-card').removeAttribute('onclick')
      changeRandomCells(32, 0, 'alive')
    }

    currentScrollSection = 0.92
  }

  /* ABOUT ME */

  if (
    winScroll >= viewportHeightFraction * 6 &&
    winScroll < aboutMe + viewportHeightFraction
  ) {
    hideProjects()
    cardFlipped = 0
    changeRandomCells(1, 0, 'dead')
    document.getElementById('flip-card').setAttribute('onclick', 'flipCard()')
    currentScrollSection = 1
  }

  /* ABOUT ME */

  if (
    winScroll >= aboutMe + viewportHeightFraction &&
    winScroll < aboutMe + viewportHeightFraction * 2
  ) {
    document.getElementById('flip-card-inner').style.transform = ''
    if (currentScrollSection < 1.32) {
      document.getElementById('flip-card').removeAttribute('onclick')
      changeRandomCells(6, 0, 'alive')
    } else if (currentScrollSection > 1.32) {
      changeRandomCells(2, 0, 'dead')
    }
    currentScrollSection = 1.32
  }

  if (
    winScroll >= aboutMe + viewportHeightFraction * 2 &&
    winScroll < aboutMe + viewportHeightFraction * 3
  ) {
    if (currentScrollSection < 1.48) {
      changeRandomCells(2, 0, 'alive')
    } else if (currentScrollSection > 1.48) {
      changeRandomCells(2, 0, 'dead')
      cellGridMain.makeCurrent(cgmQuestionMark)
    }
    currentScrollSection = 1.48
  }
  if (
    winScroll >= aboutMe + viewportHeightFraction * 3 &&
    winScroll < aboutMe + viewportHeightFraction * 4
  ) {
    changeRandomCells(1, 0, 'alive')
    if (currentScrollSection < 1.64) {
      cellGridMain.makeCurrent(cgmInitialScheme)
    } else if (currentScrollSection > 1.64) {
      cellGridMain.makeCurrent(cgmQuestionMark)
    }
    currentScrollSection = 1.64
  }
  if (
    winScroll >= aboutMe + viewportHeightFraction * 4 &&
    winScroll < aboutMe + viewportHeightFraction * 5
  ) {
    hideProjects()
    if (currentScrollSection < 1.8) {
      cellGridMain.makeCurrent(cgmInitialScheme)
      changeRandomCells(2, 0, 'dead')
    } else if (currentScrollSection > 1.8) {
      changeRandomCells(2, 0, 'alive')
    }
    currentScrollSection = 1.8
  }
  if (
    winScroll >= aboutMe + viewportHeightFraction * 5 &&
    winScroll < aboutMe + viewportHeightFraction * 6
  ) {
    hideProjects()
    document.getElementById('flip-card').removeAttribute('onclick')
    document.getElementById('flip-card').style.cursor = 'default'
    document.getElementById('cell-grid-project-1').removeAttribute('onclick')
    document.getElementById('cell-grid-project-1').style.cursor = 'default'
    document.getElementById('cell-grid-project-2').removeAttribute('onclick')
    document.getElementById('cell-grid-project-2').style.cursor = 'default'
    buttons = document.querySelectorAll('button')
    buttons.forEach((item) => {
      item.style.cursor = 'default'
    })

    if (currentScrollSection < 1.96) {
      changeRandomCells(2, 0, 'dead')
      cellGridProject1.makeVisible()
      cellGridProject2.makeVisible()
    } else if (currentScrollSection > 1.96) {
      changeRandomCells(0, 18, 'alive')
    }
    currentScrollSection = 1.96
  }

  /* PROJECTS */

  if (
    winScroll >= aboutMe + viewportHeightFraction * 6 &&
    winScroll < projects + viewportHeightFraction
  ) {
    changeRandomCells(1, 0, 'dead')

    document.getElementById('flip-card').style.left = 'calc(90% - 322px)'
    document.getElementById('cell-grid-project-1').style.left =
      'calc(66% - 322px)'
    document.getElementById('cell-grid-project-1').style.boxShadow =
      '0px 0px 20px 5px #A9A9A9'
    document.getElementById('cell-grid-project-2').style.left =
      'calc(78% - 322px)'
    document.getElementById('cell-grid-project-2').style.boxShadow =
      '0px 0px 20px 5px #A9A9A9'

    document
      .getElementById('flip-card')
      .setAttribute('onclick', "submit()")

    document
      .getElementById('cell-grid-project-1')
      .setAttribute('onclick', "submit()")
    document.getElementById('cell-grid-project-1').style.cursor = 'pointer'

    document
      .getElementById('cell-grid-project-2')
      .setAttribute('onclick', "submit()")
    document.getElementById('cell-grid-project-2').style.cursor = 'pointer'

    buttons = document.querySelectorAll('button')
    buttons.forEach((item) => {
      item.style.cursor = 'pointer'
    })

    currentScrollSection = 2
  }

  /* PROJECTS */

  if (
    winScroll >= projects + viewportHeightFraction &&
    winScroll < projects + viewportHeightFraction * 2
  ) {
    hideProjects()
    if (currentScrollSection < 2.16) {
      document.getElementById('flip-card').removeAttribute('onclick')
      document.getElementById('flip-card').style.cursor = 'default'
      document.getElementById('cell-grid-project-1').removeAttribute('onclick')
      document.getElementById('cell-grid-project-1').style.cursor = 'default'
      document.getElementById('cell-grid-project-2').removeAttribute('onclick')
      document.getElementById('cell-grid-project-2').style.cursor = 'default'
      buttons = document.querySelectorAll('button')
      buttons.forEach((item) => {
        item.style.cursor = 'default'
      })
      changeRandomCells(4, 0, 'alive')
    } else if (currentScrollSection > 2.16) {
      cellGridProject1.makeVisible()
      cellGridProject2.makeVisible()
      changeRandomCells(2, 0, 'dead')
    }
    currentScrollSection = 2.16
  }
  if (
    winScroll >= projects + viewportHeightFraction * 2 &&
    winScroll < projects + viewportHeightFraction * 3
  ) {
    if (currentScrollSection < 2.32) {
      hideProjects()
      changeRandomCells(2, 0, 'alive')
    } else if (currentScrollSection > 2.32) {
      cellGridMain.makeCurrent(cgmInitialScheme)
      changeRandomCells(4, 0, 'dead')
    }
    currentScrollSection = 2.32
  }
  if (
    winScroll >= projects + viewportHeightFraction * 3 &&
    winScroll < projects + viewportHeightFraction * 4
  ) {
    changeRandomCells(1, 0, 'alive')
    if (currentScrollSection < 2.48) {
      cellGridMain.makeCurrent(cgmQrCode)
    } else if (currentScrollSection > 2.48) {
      cellGridMain.makeCurrent(cgmInitialScheme)
    }
    currentScrollSection = 2.48
  }
  if (
    winScroll >= projects + viewportHeightFraction * 4 &&
    winScroll < projects + viewportHeightFraction * 5
  ) {
    if (currentScrollSection < 2.64) {
      cellGridMain.makeCurrent(cgmQrCode)
      changeRandomCells(4, 0, 'dead')
    } else if (currentScrollSection > 2.64) {
      changeRandomCells(2, 0, 'alive')
    }
    currentScrollSection = 2.64
  }
  if (
    winScroll >= projects + viewportHeightFraction * 5 &&
    winScroll < projects + viewportHeightFraction * 6
  ) {
    if (currentScrollSection < 2.8) {
      changeRandomCells(2, 0, 'dead')
    } else if (currentScrollSection > 2.8) {
      changeRandomCells(2, 0, 'alive')
    }
    currentScrollSection = 2.8
  }
  if (winScroll >= projects + viewportHeightFraction * 6) {
    hideProjects()
    changeRandomCells(1, 0, 'dead')
    currentScrollSection = 3
  }
}

function changeLivingState(id) {
  let aliveState = document.getElementById(id).classList[4]
  if (aliveState === 'alive') {
    document.getElementById(id).classList.replace('alive', 'dead')
  } else {
    document.getElementById(id).classList.replace('dead', 'alive')
  }
}

function resurrect(id) {
  let aliveState = document.getElementById(id).classList[4]
  if (aliveState === 'dead') {
    document.getElementById(id).classList.replace('dead', 'alive')
  }
}

function kill(id) {
  let aliveState = document.getElementById(id).classList[4]
  if (aliveState === 'alive') {
    document.getElementById(id).classList.replace('alive', 'dead')
  }
}

function stringifyScheme(schemeNum) {
  let stringifiedScheme = []
  for (let i = 0; i < schemeNum.length; i++) {
    if (schemeNum[i] === 0) {
      stringifiedScheme.push('light-color-cell')
    } else if (schemeNum[i] === 1) {
      stringifiedScheme.push('main-color-cell')
    } else if (schemeNum[i] === 2) {
      stringifiedScheme.push('dark-color-cell')
    }
  }
  return stringifiedScheme
}

function getCurrent() {
  let scheme = []
  let livingStates = []
  for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
      let id = `cell-grid-main-cell-${i}-${j}`
      let cell = document.getElementById(id)
      scheme.push(cell.classList[3])
      livingStates.push(cell.classList[4])
    }
  }
  return scheme, livingStates
}

function calculateDistance(schemeCurrent, schemeNext) {
  let differences = []
  for (let i = 0; i < gridHeight * gridWidth; i++) {
    if (schemeCurrent[i] !== schemeNext[i]) {
      differences.push([i, schemeNext[i]])
    }
  }
  return differences
}

function calculateAlive() {
  let scheme,
    livingStatesArray = getCurrent()
  let array = livingStatesArray
    .map((item, index) => (item == 'alive' ? index : -1))
    .filter((item) => item > -1)
    .map((item) => [Math.floor(item / gridWidth), item % gridWidth])
  return array.length
}

function changeRandomCells(fraction = 0, numCells = 0, currentLivingState) {
  let scheme,
    livingStatesArray = getCurrent()
  let array = livingStatesArray
    .map((item, index) => (item == currentLivingState ? index : -1))
    .filter((item) => item > -1)
    .map((item) => [Math.floor(item / gridWidth), item % gridWidth])
  let n
  if (fraction !== 0) {
    n = Math.floor(array.length / fraction)
  } else {
    n = numCells
  }
  console.log('array: ', array)
  console.log('array length: ', array.length)
  console.log('fraction: ', fraction)
  console.log('array length / fraction: ', Math.floor(array.length / fraction))
  console.log(n)
  for (let i = 0; i < n; i++) {
    let randomItemId = Math.floor(Math.random() * array.length)
    let randomItem = array[randomItemId]
    let randomCellId = `cell-grid-main-cell-${randomItem[0]}-${randomItem[1]}`
    array.splice(randomItemId, 1)
    changeLivingState(randomCellId)
  }
}

function previous(arrLength, i) {
  return i === 0 ? arrLength - 1 : i - 1
}

function next(arrLength, i) {
  return i === arrLength - 1 ? 0 : i + 1
}

function gameOfLife() {
  let newlyDead = []
  let newlyAlive = []
  for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
      let id = `cell-grid-main-cell-${i}-${j}`
      let idLeft = `cell-grid-main-cell-${i}-${previous(gridWidth, j)}`
      let idRight = `cell-grid-main-cell-${i}-${next(gridWidth, j)}`
      let idTop = `cell-grid-main-cell-${previous(gridHeight, i)}-${j}`
      let idBottom = `cell-grid-main-cell-${next(gridHeight, i)}-${j}`
      let idTopLeft = `cell-grid-main-cell-${previous(
        gridHeight,
        i,
      )}-${previous(gridWidth, j)}`
      let idTopRight = `cell-grid-main-cell-${previous(gridHeight, i)}-${next(
        gridWidth,
        j,
      )}`
      let idBottomLeft = `cell-grid-main-cell-${next(gridHeight, i)}-${previous(
        gridWidth,
        j,
      )}`
      let idBottomRight = `cell-grid-main-cell-${next(gridHeight, i)}-${next(
        gridWidth,
        j,
      )}`

      let cell = document.getElementById(id)
      let cellLeft = document.getElementById(idLeft)
      let cellRight = document.getElementById(idRight)
      let cellTop = document.getElementById(idTop)
      let cellBottom = document.getElementById(idBottom)
      let cellTopLeft = document.getElementById(idTopLeft)
      let cellTopRight = document.getElementById(idTopRight)
      let cellBottomLeft = document.getElementById(idBottomLeft)
      let cellBottomRight = document.getElementById(idBottomRight)

      let neighbours = [
        cellTopLeft,
        cellTop,
        cellTopRight,
        cellLeft,
        cellRight,
        cellBottomLeft,
        cellBottom,
        cellBottomRight,
      ]
      let aliveNeighbours = neighbours
        .map((item) => item.classList[4])
        .map((item) => (item === 'alive' ? 1 : 0))
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0,
        )
      if (aliveNeighbours > 0) {
        console.log(id)
      }
      if (cell.classList[4] === 'alive') {
        if (aliveNeighbours < 2 || aliveNeighbours > 3) {
          newlyDead.push(id)
        }
      } else {
        if (aliveNeighbours === 3) {
          newlyAlive.push(id)
        }
      }
    }
  }
  for (let i of newlyAlive) {
    resurrect(i)
  }
  for (let i of newlyDead) {
    kill(i)
  }
  console.log('11:11')
}

function flipCard() {
  cellGridProject1.makeInvisible()
  cellGridProject2.makeInvisible()
  if (cardFlipped === 0) {
    document.getElementById('flip-card-inner').style.transform =
      'rotateY(180deg)'
    cardFlipped = 1
  } else {
    document.getElementById('flip-card-inner').style.transform = ''
    cardFlipped = 0
  }
}

function hideProjects() {
  document.getElementById('flip-card').style.left = rect.left + 'px'
  document.getElementById('cell-grid-project-1').style.left = rect.left + 'px'
  document.getElementById('cell-grid-project-1').style.boxShadow = 'none'
  document.getElementById('cell-grid-project-2').style.left = rect.left + 'px'
  document.getElementById('cell-grid-project-2').style.boxShadow = 'none'
}

function onSubmitAction(event) {
  event.preventDefault()
  console.log('Here SUBMIT')
  if (document.getElementById('submit-button').value === 'Submit' && document.getElementById('username').value === 'alnatura') {
    console.log('alnatura')
    document.getElementById('logo_alnatura2').style.opacity = '1'
    document.getElementById('logo_classic').style.opacity = '0'
    changeColorPalette('alnatura')
    document.getElementById('login-form').style.visibility = 'hidden'
    document.getElementById('login-form').style.opacity = '0'
    document.getElementById('login-form').style.maxHeight = '0'
    document.getElementById('submit-button').setAttribute('value', 'Log out')
  } else if (document.getElementById('submit-button').value === 'Log out') {
    document.getElementById('logo_classic').style.opacity = '1'
    document.getElementById('logo_alnatura2').style.opacity = '0'
    changeColorPalette('classic')
    
    document.getElementById('login-form').style.opacity = '1'
    document.getElementById('login-form').style.visibility = 'visible'
    document.getElementById('login-form').style.maxHeight = '50px'
    document.getElementById('submit-button').setAttribute('value', 'Submit')
  }
}

function changeColorPalette(theme) {
  document.documentElement.className = theme
}

function submit(project) {
  if (project === 'temple') {
    document.getElementById('login-form').setAttribute('action', 'temple')
    console.log("temple")
  } else if (project === 'gastroobscura') {
    document.getElementById('login-form').setAttribute('action', 'gastroobscura/')
  } else if (project === 'vitamins') {
    document.getElementById('login-form').setAttribute('action', 'vitamins/')
  }
  
  console.log("1")
  document.getElementById('hidden-button').click()
}
