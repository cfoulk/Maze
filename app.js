let ROWS = 30;
let COLS = 50;
let PIXEL = 20;
let currentSetting = "WALL";
let canvas = document.getElementById("canvas");
const wallsButton = document.querySelector(".walls-button");
const startButton = document.querySelector(".start-button");
const endButton = document.querySelector(".end-button");

let startX = 10;
let startY = 15;
let endX = 40;
let endY = 15;

class Node {
  constructor(row, col, isStart, isEnd, isWall) {
    this.row = row;
    this.col = col;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = isWall;
  }

  setWall(b) {
    this.isWall = b;
  }

  setStart(b) {
    this.isStart = b;
  }

  setEnd(b) {
    this.isEnd = b;
  }
}

wallsButton.addEventListener("click", (event) => {
  currentSetting = "WALL";
  startButton.classList.remove("selected");
  endButton.classList.remove("selected");
  event.target.classList.add("selected");
});
startButton.addEventListener("click", (event) => {
  currentSetting = "START";
  wallsButton.classList.remove("selected");
  endButton.classList.remove("selected");
  event.target.classList.add("selected");
});
endButton.addEventListener("click", (event) => {
  currentSetting = "END";
  wallsButton.classList.remove("selected");
  startButton.classList.remove("selected");
  event.target.classList.add("selected");
});

let grid = [];
function createCanvas() {
  for (let i = 0; i < ROWS; i++) {
    const currRow = [];
    for (let j = 0; j < COLS; j++) {
      let pix = document.createElement("div");
      currRow.push(new Node(j, i, false, false, false));
      pix.setAttribute("id", "node " + i + " " + j);
      pix.setAttribute("data-x", i);
      pix.setAttribute("data-y", j);
      pix.classList.add("cell");
      pix.style.position = "absolute";
      pix.style.left = j * PIXEL + "px";
      pix.style.top = i * PIXEL + "px";
      pix.style.width = PIXEL + "px";
      pix.style.height = PIXEL + "px";
      if (j == startX && i == startY) {
        pix.classList.add("start");
        currRow[j].setStart(true);
      }
      if (j == endX && i == endY) {
        pix.classList.add("end");
        currRow[j].setEnd(true);
      }
      canvas.appendChild(pix);
      //console.log(new Node(i, j, false, false, false));
    }
    //console.log(grid[i].toString());
    grid.push(currRow);
  }
}

function addWall(x, y, event) {
  if (event.target.classList != "cell wall") {
    event.target.classList.remove("start");
    event.target.classList.remove("end");
    event.target.classList.add("wall");
    grid[x][y].setWall(true);
    grid[x][y].setStart(false);
    grid[x][y].setEnd(false);
    console.log(grid[x][y]);
  } else {
    event.target.classList.remove("wall");
    grid[x][y].setWall(false);
    console.log(grid[x][y]);
  }
}
function addStart(x, y, event) {
  if (event.target.classList != "cell start") {
    let id = "node " + startX + " " + startY;
    document.getElementById(id).classList.remove("start");
    grid[startX][startY].setStart(false);
    event.target.classList.remove("wall");
    event.target.classList.remove("end");
    event.target.classList.add("start");
    console.log(grid[startX][startY]);
    grid[x][y].setStart(true);
    grid[x][y].setWall(false);
    grid[x][y].setEnd(false);
    startX = x;
    startY = y;
    console.log(grid[startX][startY]);
  } else {
    event.target.classList.remove("start");
    grid[x][y].setStart(false);
    console.log(grid[x][y]);
  }
}
function addEnd(x, y, event) {
  if (event.target.classList != "cell end") {
    event.target.classList.remove("wall");
    event.target.classList.remove("start");
    event.target.classList.add("end");
    grid[endX][endY].setEnd(false);
    let oldEnd = document.getElementById("node" + x + " " + y);
    //event.target.classList.remove("end");
    grid[x][y].setEnd(true);
    grid[x][y].setWall(false);
    grid[x][y].setStart(false);
    console.log(grid[x][y]);
  } else {
    event.target.classList.remove("end");
    grid[x][y].setEnd(false);
    console.log(grid[x][y]);
  }
}

createCanvas();
//console.log(grid.toString);

const nodeSelector = [...document.querySelectorAll(".cell")];
for (const nodes of nodeSelector) {
  nodes.addEventListener("mousedown", (event) => {
    console.log("id: " + event.target.id);
    console.log("x: " + event.target.dataset.x);
    console.log("y: " + event.target.dataset.y);

    if (currentSetting == "WALL") {
      addWall(event.target.dataset.x, event.target.dataset.y, event);
    }
    if (currentSetting == "START") {
      addStart(event.target.dataset.x, event.target.dataset.y, event);
    }
    if (currentSetting == "END") {
      addEnd(event.target.dataset.x, event.target.dataset.y, event);
    }
  });
}
