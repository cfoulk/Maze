import Node from "./modules/node.js"
import { start, end, addStuff, bfsCompleted, dfsCompleted } from "./modules/buttons.js"
import { visualInProgress } from "./modules/animations/animateAlgos.js";

let ROWS = 30;
let COLS = 50;
let PIXEL = 20;

let mouseDown = false;

let canvas = document.getElementById("canvas"); // useless?

let grid = [];
let visitedNodes = [];

const createCanvas = () => {
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
            pix.style.height = PIXEL + "px";
            pix.style.width = PIXEL + "px";
            pix.style.left = j * PIXEL + "px";
            pix.style.top = i * PIXEL + "px";
            if (j == start.x && i == start.y) {
                pix.classList.add("start");
                currRow[j].setStart(true);
            }
            if (j == end.x && i == end.y) {
                pix.classList.add("end");
                currRow[j].setEnd(true);
            }
            canvas.appendChild(pix);
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

const createRandom = () => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    }
    resetMap();
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j].isStart == false && grid[i][j].isEnd == false) {
                if (Math.floor(Math.random() * 100) > 70) {
                    grid[i][j].setWall(true);
                    let id = "node " + j + " " + i;
                    document.getElementById(id).classList.add("wall");
                }
            }
        }
    }
}

const resetMap = () => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    }
    visitedNodes = [];
    // path = [];
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
    // path = [];
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

const createPath = () => {
    try {
        let path = [];
        let p = grid[end.y][end.x].parent;
        path.push({ row: p.row, col: p.col });
        while (p.parent.parent != null) {
            p = p.parent;
            path.push({ row: p.row, col: p.col });
        }
        return path;
    } catch (error) {
        console.log("walled in!");
        return [];
    }
}

createCanvas();
updateStatus();

export { grid, visitedNodes, ROWS, COLS, resetMap, resetVisited, createRandom, updateStatus, createPath }; 
