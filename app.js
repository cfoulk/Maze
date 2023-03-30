import Node from "./modules/node.js"
import { currentSetting } from "./modules/buttons.js"

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

let canvas = document.getElementById("canvas");
const randomzieButton = document.querySelector(".randomzie-button");
const resetMapButton = document.querySelector(".reset-button");

let grid = [];

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
}

// messy solution
const updateStatus = () => {
    document.getElementById("status").innerHTML = "start (x, y): (" + start.x + ", " + start.y + ")\nend (x, y): (" + end.x + ", " + end.y + ")";
}

const addWall = (x, y, event) => {
    if (event.target.classList == "cell start") {
        event.target.classList.remove("start");
        grid[y][x].setStart(false);
        start.x = undefined;
        start.y = undefined;
    } else if (event.target.classList == "cell end") {
        event.target.classList.remove("end");
        grid[y][x].setEnd(false);
        end.x = undefined;
        end.y = undefined;
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
    updateStatus();
}

const addStart = (x, y, event) => {
    if (event.target.classList != "cell start") {
        if (event.target.classList == "cell end") {
            event.target.classList.remove("end");
            grid[y][x].setEnd(false);
            end.x = undefined;
            end.y = undefined;
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
        start.x = x;
        start.y = y;
        console.log("new start X: " + start.x + " Y: " + start.y);
    } else { //remove the set wall
        event.target.classList.remove("start");
        grid[y][x].setStart(false);
        start.x = undefined;
        start.y = undefined;
    }
    updateStatus();
}

const addEnd = (x, y, event) => {
    if (event.target.classList != "cell end") {
        if (event.target.classList == "cell start") {
            event.target.classList.remove("start");
            grid[y][x].setStart(false);
            start.x = undefined;
            start.y = undefined;
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
        end.x = x;
        end.y = y;
        console.log("new end X: " + end.x + " Y: " + end.y);
    } else {
        event.target.classList.remove("end");
        grid[y][x].setEnd(false);
        end.x = undefined;
        end.y = undefined;
    }
    updateStatus();
}

const createRandom = () => {
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
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j].isStart == false && grid[i][j].isEnd == false) {
                grid[i][j].setWall(false);
                let id = "node " + j + " " + i;
                document.getElementById(id).classList.remove("wall");
            }
       }
    }
}

createCanvas();
updateStatus();

// grid[15][10].toString();
// grid[15][40].toString();
// grid[15][16].toString();
let mouseDown = false;
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

const addStuff = (event) => {
    if (currentSetting == "WALL") {
        addWall(event.target.dataset.x, event.target.dataset.y, event);
    }
    if (currentSetting == "START") {
        addStart(event.target.dataset.x, event.target.dataset.y, event);
    }
    if (currentSetting == "END") {
        addEnd(event.target.dataset.x, event.target.dataset.y, event);
    }
}

randomzieButton.addEventListener("click", () => {
    createRandom();
});
resetMapButton.addEventListener("click", () => {
    resetMap();
});

