let canvas = document.getElementById("canvas");

let ROWS = 50;
let COLS = 50;
let PIXEL = 10;

function createCanvas() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let pix = document.createElement("div");
      pix.style.position = "absolute";
      pix.style.border = "1px solid red";
      pix.style.left = j * PIXEL + "px";
      pix.style.top = i * PIXEL + "px";
      pix.style.width = PIXEL + "px";
      pix.style.height = PIXEL + "px";
      canvas.appendChild(pix);
    }
  }
}

createCanvas();
