let ROWS = 30;
let COLS = 50;
let PIXEL = 20;

class Node {
  constructor(row, col, isStart, isEnd, isWall) {
    this.row = row;
    this.col = col;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = isWall;
  }
}

let canvas = document.getElementById("canvas");

function setWall(e) {
  e.preventDefault();
  console.log("lol");
}

let grid = [];
function createCanvas() {
  for (let i = 0; i < ROWS; i++) {
    const currRow = [];
    for (let j = 0; j < COLS; j++) {
      let pix = document.createElement("div");
      pix.setAttribute("id", "node-" + i + "-" + j);
      pix.classList.add("cell");
      pix.style.position = "absolute";
      pix.style.border = "1px solid red";
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
  nodes.addEventListener("click", (event) => {
    console.log("lol " + event.target.id);
    event.target.classList.add("wall");
  });
}
