let ROWS = 30;
let COLS = 50;
let PIXEL = 20;
let currentSetting = "WALL";
let canvas = document.getElementById("canvas");
const wallsButton = document.querySelector(".walls-button");
const startButton = document.querySelector(".start-button");
const endButton = document.querySelector(".end-button");

class Node {
  constructor(row, col, isStart, isEnd, isWall) {
    this.row = row;
    this.col = col;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = isWall;
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
      pix.setAttribute("id", "node-" + i + "-" + j);
      pix.classList.add("cell");
      pix.style.position = "absolute";
      pix.style.left = j * PIXEL + "px";
      pix.style.top = i * PIXEL + "px";
      pix.style.width = PIXEL + "px";
      pix.style.height = PIXEL + "px";
      canvas.appendChild(pix);
      //console.log(new Node(i, j, false, false, false));
      currRow.push(new Node(i, j, false, false, false));
    }
    //console.log(currRow.toString());
    grid.push[currRow];
  }
}

createCanvas();
//console.log(grid.toString);

const nodeSelector = [...document.querySelectorAll(".cell")];
for (const nodes of nodeSelector) {
  nodes.addEventListener("mousedown", (event) => {
    console.log("lol " + event.target.id);

    if (currentSetting == "WALL") {
      if (event.target.classList != "cell wall") {
        event.target.classList.add("wall");
      } else {
        event.target.classList.remove("wall");
      }
    }
    if (currentSetting == "START") {
      if (event.target.classList != "cell start") {
        event.target.classList.add("start");
      } else {
        event.target.classList.remove("start");
      }
    }
    if (currentSetting == "END") {
      if (event.target.classList != "cell end") {
        event.target.classList.add("end");
      } else {
        event.target.classList.remove("end");
      }
    }
  });
}
