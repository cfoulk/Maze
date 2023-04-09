import Node from "./modules/node.js"
import { start, end, addStuff, bfsCompleted, dfsCompleted } from "./modules/controller.js"
import { visualInProgress } from "./modules/animations/animateAlgos.js";

let ROWS = 30;
let COLS = 50;
let PIXEL = 20;

let mouseDown = false;

const board = document.getElementById("canvas"); // useless?

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
            squareNode.style.left = j * PIXEL + "px";
            squareNode.style.top = i * PIXEL + "px";
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

const resetMap = () => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    }
    visitedNodes = [];
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j].isStart == false && grid[i][j].isEnd == false) {
                grid[i][j].setWall(false);
                grid[i][j].setVisited(false);
                grid[i][j].setParent(null);
                let id = "node " + j + " " + i;
                document.getElementById(id).classList.remove("wall");
                document.getElementById(id).classList.remove("visited");
                document.getElementById(id).classList.remove("path");
            } else {
                let id = "node " + j + " " + i;
                grid[i][j].setVisited(false);
                grid[i][j].setParent(null);
                document.getElementById(id).classList.remove("visited");
                document.getElementById(id).classList.remove("found");
            }
        }
    }
}

const resetVisited = () => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    }
    visitedNodes = [];
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            grid[i][j].setVisited(false);
            grid[i][j].setParent(null);
            let id = "node " + j + " " + i;
            document.getElementById(id).classList.remove("path");
            document.getElementById(id).classList.remove("visited");
            document.getElementById(id).classList.remove("found");
        }
    }
}

createCanvas();
updateStatus();

export { grid, visitedNodes, ROWS, COLS, resetMap, resetVisited, updateStatus }; 
