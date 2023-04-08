import Node from "./modules/node.js"
import { addStuff, resetCompleted, bfsCompleted, dfsCompleted } from "./modules/buttons.js"
import { bfs } from './modules/algorithms/breadthFirstSearch.js'
import { dfs } from './modules/algorithms/depthFirstSearch.js'
import { visualInProgress } from "./modules/animations/animateAlgos.js";

let ROWS = 30;
let COLS = 50;
let PIXEL = 20;
let start = {
    x: 10,
    y: 15
}
let end = {
    x: 40,
    y: 15
}

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
            pix.style.left = j * PIXEL + "px";
            pix.style.top = i * PIXEL + "px";
            pix.style.width = PIXEL + "px";
            pix.style.height = PIXEL + "px";
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
    document.getElementById("status").innerHTML = "start (x, y): (" + start.x + ", " + start.y + ")\nend (x, y): (" + end.x + ", " + end.y + ")" + "\nbfs = " + bfsCompleted + "\ndfs = " + dfsCompleted;
}

const addWall = (x, y, event) => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    }
    if (event.target.classList == "cell start") {
        event.target.classList.remove("start");
        grid[y][x].setStart(false);
        start = { x: undefined, y: undefined };
    } else if (event.target.classList == "cell end") {
        event.target.classList.remove("end");
        grid[y][x].setEnd(false);
        end = { x: undefined, y: undefined };
    }
    if (event.target.classList != "cell wall") {
        event.target.classList.add("wall");
        grid[y][x].setWall(true);
        grid[y][x].toString();
    } else {
        event.target.classList.remove("wall");
        grid[y][x].setWall(false);
        grid[y][x].toString();
    }
    // this is soooooooooooooooo ineffiecient but i dont know a better solution!
    // updateStatus();
    // if (bfsCompleted) {
    //     bfs(true, grid);
    // }
    // if (dfsCompleted) {
    //     dfs(true);
    // }
}

const addStart = (x, y, event) => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    }
    if (event.target.classList != "cell start") {
        if (event.target.classList == "cell end") {
            event.target.classList.remove("end");
            grid[y][x].setEnd(false);
            end = { x: undefined, y: undefined };
        }
        if (start.x != undefined && start.y != undefined) {
            console.log("old start X: " + start.x + " Y: " + start.y);
            let id = "node " + start.x + " " + start.y;
            document.getElementById(id).classList.remove("start");
            grid[start.y][start.x].setStart(false);
        }
        event.target.classList.remove("wall");
        event.target.classList.add("start");
        grid[y][x].setStart(true);
        grid[y][x].setWall(false);
        start = { x: x, y: y };
        console.log("new start X: " + start.x + " Y: " + start.y);
        if (bfsCompleted) {
            bfs(true, grid);
        }
        if (dfsCompleted) {
            dfs(true, grid);
        }
    } else { //remove the set wall
        event.target.classList.remove("start");
        grid[y][x].setStart(false);
        end = { x: undefined, y: undefined };
        resetVisited();
        resetCompleted();
    }
    updateStatus();
}

const addEnd = (x, y, event) => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    }
    if (event.target.classList != "cell end") {
        if (event.target.classList == "cell start") {
            event.target.classList.remove("start");
            grid[y][x].setStart(false);
            start = { x: undefined, y: undefined };
        }
        if (end.x != undefined && end.y != undefined) {
            console.log("old end X: " + end.x + " Y: " + end.y);
            let id = "node " + end.x + " " + end.y;
            document.getElementById(id).classList.remove("end");
            grid[end.y][end.x].setEnd(false);
        }
        event.target.classList.remove("wall");
        event.target.classList.add("end");
        grid[y][x].setEnd(true);
        grid[y][x].setWall(false);
        end = { x: x, y: y };
        console.log("new end X: " + end.x + " Y: " + end.y);
        if (bfsCompleted) {
            bfs(true, grid);
        }
        if (dfsCompleted) {
            dfs(true, grid);
        }
    } else {
        event.target.classList.remove("end");
        grid[y][x].setEnd(false);
        end = { x: undefined, y: undefined };
        resetVisited();
        resetCompleted();
    }
    updateStatus();
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
    path = [];
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
    path = [];
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
        let p = grid[end.y][end.x].parent;
        path.push({ row: p.row, col: p.col });
        while (p.parent.parent != null) {
            p = p.parent;
            path.push({ row: p.row, col: p.col });
        }
    } catch (error) {
        console.log("walled in!");
    }
    return path;
}

createCanvas();
updateStatus();

export { grid, start, end, visitedNodes, ROWS, COLS, addWall, addStart, addEnd, resetMap, resetVisited, createRandom, updateStatus, createPath }; 
