import { grid, createRandom, resetMap, updateStatus } from '../app.js'
import { bfs } from './algorithms/breadthFirstSearch.js'
import { dfs } from './algorithms/depthFirstSearch.js'
import { visualInProgress } from "./animations/animateAlgos.js";

export let start = {
    x: 10,
    y: 15
}
export let end = {
    x: 40,
    y: 15
}
export let currentSetting = "WALL";
export let bfsCompleted = false;
export let dfsCompleted = false;
export const wallsButton = document.querySelector(".walls-button");
export const startButton = document.querySelector(".start-button");
export const endButton = document.querySelector(".end-button");
export const randomzieButton = document.querySelector(".randomzie-button");
export const resetMapButton = document.querySelector(".reset-button");
export const bfsButton = document.querySelector(".bfs-button");
export const dfsButton = document.querySelector(".dfs-button");

export const addStuff = (event) => {
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

export const resetCompleted = () => {
    bfsCompleted = false;
    dfsCompleted = false;
    bfsButton.classList.remove("selected");
    dfsButton.classList.remove("selected");
    updateStatus();
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

randomzieButton.addEventListener("click", () => {
    resetCompleted();
    createRandom();
});

resetMapButton.addEventListener("click", () => {
    resetCompleted();
    resetMap();
});

bfsButton.addEventListener("click", () => {
    dfsButton.classList.remove("selected");
    bfsButton.classList.add("selected");
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    } else {
        bfsCompleted = true;
        dfsCompleted = false;
        bfs(false, grid);
        updateStatus();
    }
});

dfsButton.addEventListener("click", () => {
    bfsButton.classList.remove("selected");
    dfsButton.classList.add("selected");
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    } else {
        dfsCompleted = true;
        bfsCompleted = false;
        dfs(false, grid);
        updateStatus();
    }
});

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
        // grid[y][x].toString();
    } else {
        event.target.classList.remove("wall");
        grid[y][x].setWall(false);
        // grid[y][x].toString();
    }
    // this is soooooooooooooooo ineffiecient but i dont know a better solution!
    updateStatus();
    if (bfsCompleted) {
        bfs(true, grid);
    }
    if (dfsCompleted) {
        dfs(true, grid);
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
        }
        if (start.x != undefined && start.y != undefined) {
            // console.log("old start X: " + start.x + " Y: " + start.y);
            let id = "node " + start.x + " " + start.y;
            document.getElementById(id).classList.remove("start");
            grid[start.y][start.x].setStart(false);
        }
        event.target.classList.remove("wall");
        event.target.classList.add("start");
        grid[y][x].setStart(true);
        grid[y][x].setWall(false);
        start = { x: x, y: y };
        // console.log("new start X: " + start.x + " Y: " + start.y);
        if (bfsCompleted) {
            bfs(true, grid);
        }
        if (dfsCompleted) {
            dfs(true, grid);
        }
    } else { //remove the set wall
        event.target.classList.remove("start");
        grid[y][x].setStart(false);
        start = { x: undefined, y: undefined };
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
            // console.log("old end X: " + end.x + " Y: " + end.y);
            let id = "node " + end.x + " " + end.y;
            document.getElementById(id).classList.remove("end");
            grid[end.y][end.x].setEnd(false);
        }
        event.target.classList.remove("wall");
        event.target.classList.add("end");
        grid[y][x].setEnd(true);
        grid[y][x].setWall(false);
        end = { x: x, y: y };
        // console.log("new end X: " + end.x + " Y: " + end.y);
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

