import { grid, addWall, addStart, addEnd, createRandom, resetMap, updateStatus } from '../app.js'
import { bfs } from './algorithms/breadthFirstSearch.js'
import { dfs } from './algorithms/depthFirstSearch.js'
import { visualInProgress } from "./animations/animateAlgos.js";

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
