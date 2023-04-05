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

let bfsCompleted = false;
let dfsCompleted = false;
let visualInProgress = false;

let canvas = document.getElementById("canvas");
const randomzieButton = document.querySelector(".randomzie-button");
const resetMapButton = document.querySelector(".reset-button");
const bfsButton = document.querySelector(".bfs-button");
const dfsButton = document.querySelector(".dfs-button");

let grid = [];
let visitedNodes = [];
let path = [];

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
    document.getElementById("status").innerHTML = "start (x, y): (" + start.x + ", " + start.y + ")\nend (x, y): (" + end.x + ", " + end.y + ")" + "\nbfs = " + bfsCompleted + "\ndfs = " + dfsCompleted;
}

const animateVisitedNodes = () => {
    visualInProgress = true;
    for (let i = 0; i <= visitedNodes.length; i++) {
        if (i == visitedNodes.length) {
            setTimeout(() => {
                animatePath();
                // console.log(path[j]);
                // // const { prow, pcol } = path[j];
                // let id = "node " + path[j].x + " " + path[j].y;
                // console.log(id);
                // document.getElementById(id).classList.add("path");
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const { row, col } = visitedNodes[i];
            if (row == start.y && col == start.x || row == end.y && col == end.x) {
                return;
            } else {
                let id = "node " + col + " " + row;
                document.getElementById(id).classList.add("visited");
            }
        }, 10 * i);
    }
}

const animatePath = () => {
    const pathInOrder = path.reverse();
    for (let i = 0; i <= pathInOrder.length; i++) {
        if (i == pathInOrder.length) {
            visualInProgress = false;
            return;
        }
        setTimeout(() => {
            const { row, col } = pathInOrder[i];
            let id = "node " + col + " " + row;
            document.getElementById(id).classList.add("path");
        }, 25 * i);
    }
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
    updateStatus();
    if (bfsCompleted) {
        bfs();
    }
    if (dfsCompleted) {
        dfs();
    }
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
            // end.x = undefined;
            // end.y = undefined;
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
        // start.x = x;
        // start.y = y;
        console.log("new start X: " + start.x + " Y: " + start.y);
        if (bfsCompleted) {
            bfs();
        }
        if (dfsCompleted) {
            dfs();
        }
    } else { //remove the set wall
        event.target.classList.remove("start");
        grid[y][x].setStart(false);
        end = { x: undefined, y: undefined };
        // start.x = undefined;
        // start.y = undefined;
        resetVisited();
        bfsCompleted = false;
        dfsCompleted = false
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
            // start.x = undefined;
            // start.y = undefined;
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
        // end.x = x;
        // end.y = y;
        console.log("new end X: " + end.x + " Y: " + end.y);
        if (bfsCompleted) {
            bfs();
        }
        if (dfsCompleted) {
            dfs();
        }
    } else {
        event.target.classList.remove("end");
        grid[y][x].setEnd(false);
        end = { x: undefined, y: undefined };
        // end.x = undefined;
        // end.y = undefined;
        resetVisited();
        bfsCompleted = false;
        dfsCompleted = false
        // if (bfsCompleted) {
        //     bfs();
        // }
        // if (dfsCompleted) {
        //     dfs();
        // }
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
    bfsCompleted = false;
    dfsCompleted = false;
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

createCanvas();
updateStatus();

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
}
const recreateVisual = () => {
    console.log("visited: " + visitedNodes.length + "\npath: " + path.length);
    for (let i = 0; i < visitedNodes.length; i++) {
        const { row, col } = visitedNodes[i];
        if (row == start.y && col == start.x || row == end.y && col == end.x) {
            continue;
        } else {
            let id = "node " + col + " " + row;
            console.log(id);
            document.getElementById(id).classList.add("visited");
        }
    }
    const pathInOrder = path.reverse();
    for (let j = 0; j < pathInOrder.length; j++) {
        const { row, col } = pathInOrder[j];
        let id = "node " + col + " " + row;
        document.getElementById(id).classList.add("path");
    }
}

const bfs = () => {
    resetVisited();
    if (start.x == undefined || end.x == undefined) {
        alert("undefined start/end point");
        return;
    }
    let queue = [];
    grid[start.y][start.x].setVisited(true);
    queue.push({ row: start.y, col: start.x });
    visitedNodes.push({ row: start.y, col: start.x });
    while (queue.length > 0) {
        let v = queue.shift();
        let edges = [
            { y: parseInt(v.row) - 1, x: parseInt(v.col) },
            { y: parseInt(v.row), x: parseInt(v.col) - 1 },
            { y: parseInt(v.row) + 1, x: parseInt(v.col) },
            { y: parseInt(v.row), x: parseInt(v.col) + 1 },
        ]

        if (v.row == end.y && v.col == end.x) {
            break;
        }
        for (let i = 0; i < edges.length; i++) {
            const { y: edgeY, x: edgeX } = edges[i];
            if (edgeY < 0 || edgeY > ROWS - 1) {
                continue;
            }
            if (edgeX < 0 || edgeX > COLS - 1) {
                continue;
            }
            if (grid[edgeY][edgeX].visited == false && grid[edgeY][edgeX].isWall == false) {
                grid[edgeY][edgeX].setVisited(true);
                grid[edgeY][edgeX].setParent(grid[v.row][v.col]);
                queue.push({ row: edgeY, col: edgeX });
                visitedNodes.push({ row: edgeY, col: edgeX });
            }
        }

    }
    createPath();
    if (bfsCompleted) {
        recreateVisual();
    } else {
        animateVisitedNodes();
    }
    bfsCompleted = true;
}

const dfs = () => {
    resetVisited();
    if (start.x == undefined || end.x == undefined) {
        alert("undefined start/end point");
        return;
    }
    let stack = [];
    stack.push({ row: start.y, col: start.x });
    visitedNodes.push({ row: start.y, col: start.x });
    while (stack.length > 0) {
        let v = stack.pop();
        let edges = [
            { y: parseInt(v.row), x: parseInt(v.col) - 1 },
            { y: parseInt(v.row) + 1, x: parseInt(v.col) },
            { y: parseInt(v.row), x: parseInt(v.col) + 1 },
            { y: parseInt(v.row) - 1, x: parseInt(v.col) },
        ]

        if (v.row == end.y && v.col == end.x) {
            break;
        }
        if (grid[v.row][v.col].visited == false) {
            grid[v.row][v.col].setVisited(true);
            visitedNodes.push({ row: v.row, col: v.col });
            for (let i = 0; i < edges.length; i++) {
                const { y: edgeY, x: edgeX } = edges[i];
                if (edgeY < 0 || edgeY > ROWS - 1) {
                    continue;
                }
                if (edgeX < 0 || edgeX > COLS - 1) {
                    continue;
                }
                if (grid[edgeY][edgeX].visited == false && grid[edgeY][edgeX].isWall == false) {
                    grid[edgeY][edgeX].setParent(grid[v.row][v.col]);
                    stack.push({ row: edgeY, col: edgeX });
                }
            }
        }

    }
    createPath();
    if (dfsCompleted) {
        recreateVisual();
    } else {
        animateVisitedNodes();
    }
    dfsCompleted = true;
}
randomzieButton.addEventListener("click", () => {
    createRandom();
});
resetMapButton.addEventListener("click", () => {
    resetMap();
});
bfsButton.addEventListener("click", () => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    } else {
        bfsCompleted = false;
        dfsCompleted = false;
        bfs();
        updateStatus();
    }
});
dfsButton.addEventListener("click", () => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    } else {
        bfsCompleted = false;
        dfsCompleted = false;
        dfs();
        updateStatus();
    }
});
