import Node from "./modules/node.js"
import { addStuff, bfsCompleted, dfsCompleted } from "./modules/controller.js"
import { visualInProgress } from "./modules/animations/animateAlgos.js";

const COLS = 50; // 50
const ROWS = 30; // 30

let width = (1/COLS) * 100;
let height = (1/ROWS) * 100;
let start = {
    x: Math.floor(COLS * 0.2), //10,15
    y: ROWS * 0.5
}
let end = {
    x: Math.floor(COLS * 0.8), //40, 15
    y: ROWS * 0.5
}

let mouseDown = false;

const board = document.getElementById("canvas"); 

let grid = [];
let visitedNodes = [];

const createCanvas = () => {
    for (let i = 0; i < ROWS; i++) {
        const currRow = [];
        for (let j = 0; j < COLS; j++) {
            let squareNode = document.createElement("div");
            currRow.push(new Node(j, i, false, false, false));
            squareNode.setAttribute("id", "node " + j + " " + i);
            squareNode.setAttribute("data-x", j);
            squareNode.setAttribute("data-y", i);
            squareNode.classList.add("cell");
            squareNode.style.width = width.toFixed(2) + '%';
            squareNode.style.height = height.toFixed(2)  + '%';
            squareNode.style.left = j  * width.toFixed(2)  + '%';
            squareNode.style.top = i * height.toFixed(2)  + '%';
            if (j == start.x && i == start.y) {
                squareNode.classList.add("start");
                currRow[j].setStart(true);
            }
            if (j == end.x && i == end.y) {
                squareNode.classList.add("end");
                currRow[j].setEnd(true);
            }
            board.appendChild(squareNode);
        }
        grid.push(currRow);
    }
    const nodeSelector = [...document.querySelectorAll(".cell")];
    for (const nodes of nodeSelector) {
        nodes.addEventListener("mousedown", (event) => {
            event.preventDefault();
            mouseDown = true;
            addStuff(event);
        });
        nodes.addEventListener("mouseenter", (event) => {
            if (mouseDown) {
                event.preventDefault();
                addStuff(event);
            }
        });
        nodes.addEventListener("mouseup", () => {
            mouseDown = false;
        });
    }
}

// messy solution
const updateStatus = () => {
    document.getElementById("status").innerHTML = "start (x, y): (" + start.x + ", " + start.y + ")\nend (x, y): (" + end.x + ", " + end.y + ")" + "\nbfs = " + bfsCompleted + "\ndfs = " + dfsCompleted + "\nvisualInProgress = " + visualInProgress;
}


createCanvas();
updateStatus();

export { grid, visitedNodes, start, end, ROWS, COLS, updateStatus }; 
