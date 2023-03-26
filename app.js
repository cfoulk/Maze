import  Node  from "./modules/node.js"
import { currentSetting } from "./modules/buttons.js"

let ROWS = 30;
let COLS = 50;
let PIXEL = 20;
let canvas = document.getElementById("canvas");
let startX = 10;
let startY = 15;
let endX = 40;
let endY = 15;

let grid = [];
function createCanvas() {
  for (let i = 0; i < ROWS; i++) {
    const currRow = [];
    for (let j = 0; j < COLS; j++) {
      let pix = document.createElement("div");
      currRow.push(new Node(j, i, false, false, false));
      pix.setAttribute("id", "node " + j + " " + i);
      pix.setAttribute("data-x", j);
      pix.setAttribute("data-y", i);
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
    grid[y][x].setWall(true);
    grid[y][x].setStart(false);
    grid[y][x].setEnd(false);
    console.log(grid[y][x]);
  } else {
    event.target.classList.remove("wall");
    grid[y][x].setWall(false);
    console.log(grid[y][x]);
  }
}

function addStart(x, y, event) {
  if (event.target.classList != "cell start") {
    let id = "node " + startX + " " + startY;
    console.log(id);
    document.getElementById(id).classList.remove("start");
    grid[startY][startX].setStart(false);
    event.target.classList.remove("wall");
    event.target.classList.remove("end");
    event.target.classList.add("start");
    console.log(grid[startY][startX]);
    grid[y][x].setStart(true);
    grid[y][x].setWall(false);
    grid[y][x].setEnd(false);
    startX = x;
    startY = y;
    console.log(grid[startY][startX]);
  } else {
    event.target.classList.remove("start");
    grid[y][x].setStart(false);
    console.log(grid[y][x]);
  }
}

function addEnd(x, y, event) {
  if (event.target.classList != "cell end") {
    let id = "node " + endX + " " + endY;
    console.log(id);

    document.getElementById(id).classList.remove("end");
    grid[endY][endX].setEnd(false);
    event.target.classList.remove("wall");
    event.target.classList.remove("start");
    event.target.classList.add("end");
    console.log(grid[endY][endX]);
    grid[y][x].setEnd(true);
    grid[y][x].setWall(false);
    grid[y][x].setStart(false);
    endX = x;
    endY = y;
    console.log(grid[endY][endX]);
  } else {
    event.target.classList.remove("end");
    grid[y][x].setEnd(false);
    console.log(grid[y][x]);
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

function BFS(startX, startY) {}
