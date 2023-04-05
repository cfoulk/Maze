import { createRandom, resetMap, updateStatus, bfs, dfs, visualInProgress } from '../app.js'

export let currentSetting = "WALL";
export const wallsButton = document.querySelector(".walls-button");
export const startButton = document.querySelector(".start-button");
export const endButton = document.querySelector(".end-button");
export const randomzieButton = document.querySelector(".randomzie-button");
export const resetMapButton = document.querySelector(".reset-button");
export const bfsButton = document.querySelector(".bfs-button");
export const dfsButton = document.querySelector(".dfs-button");

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
        bfs(false);
        updateStatus();
    }
});

dfsButton.addEventListener("click", () => {
    if (visualInProgress) {
        alert("visualization in progress");
        return;
    } else {
        dfs(false);
        updateStatus();
    }
});
