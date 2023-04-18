import { grid, updateStatus, start, end } from '../app.js'
import { bfs } from './algorithms/breadthFirstSearch.js'
import { dfs } from './algorithms/depthFirstSearch.js'
import { visualInProgress } from "./animations/animateAlgos.js";
import { createRandom } from "./mazeCreation/randomMaze.js";
import { resetMap, resetVisited } from "./mazeCreation/resetMap.js";

export let currentSetting = "WALL";
export let currentAlgorithm = null;
export let bfsCompleted = false;
export let dfsCompleted = false;
export const wallsButton = document.querySelector("#walls-button");
export const startButton = document.querySelector("#start-button");
export const endButton = document.querySelector("#end-button");
export const randomzieButton = document.querySelector("#randomize-button");
export const resetMapButton = document.querySelector("#reset-button");
export const bfsButton = document.querySelector("#bfs-button");
export const dfsButton = document.querySelector("#dfs-button");
// work on namees
export const draggableDiagonostics = document.querySelector("#status");
export const diagnosticsBtn = document.querySelector("#diagnosticsButton");

export const navbarButton = document.querySelectorAll(".navbar-button");
export const dropdownContent = document.querySelectorAll(".dropdown-content");
let inDropdown = false;

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

for (const navBtn of navbarButton) {
    navBtn.addEventListener("mouseover", (event) => {
        event.target.classList.add("show");
    });
    navBtn.addEventListener("mouseleave", (event) => {
        setTimeout(() => {
            if (!inDropdown) {
                event.target.classList.remove("show");
            }
        }, 20);
    });
}

for (const drops of dropdownContent) {
    drops.addEventListener("mouseenter", () => {
        inDropdown = true;
    });
    drops.addEventListener("mouseleave", () => {
        drops.parentNode.querySelector(".navbar-button").classList.remove("show");
        inDropdown = false;
    });
}

wallsButton.addEventListener("click", (event) => {
    currentSetting = "WALL";
    startButton.classList.remove("selected");
    endButton.classList.remove("selected");
    event.target.classList.add("selected");
    updateStatus();
});

startButton.addEventListener("click", (event) => {
    currentSetting = "START";
    wallsButton.classList.remove("selected");
    endButton.classList.remove("selected");
    event.target.classList.add("selected");
    updateStatus();
});

endButton.addEventListener("click", (event) => {
    currentSetting = "END";
    wallsButton.classList.remove("selected");
    startButton.classList.remove("selected");
    event.target.classList.add("selected");
    updateStatus();
});

randomzieButton.addEventListener("click", () => {
    document.getElementById("createmaze-button").classList.remove("show");
    currentAlgorithm = null;
    resetCompleted();
    createRandom();
});

resetMapButton.addEventListener("click", () => {
    currentAlgorithm = null;
    resetCompleted();
    resetMap();
});

bfsButton.addEventListener("click", () => {
    dfsButton.classList.remove("selected");
    bfsButton.classList.add("selected");
    currentAlgorithm = "BFS"

    document.getElementById("algorithms-button").classList.remove("show");
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
    currentAlgorithm = "DFS"

    document.getElementById("algorithms-button").classList.remove("show");
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

diagnosticsBtn.addEventListener("click", () => {
    if (draggableDiagonostics.style.display == 'none') {
        draggableDiagonostics.style.display = 'block';
    } else {
        draggableDiagonostics.style.display = 'none';
    }
});

// draggableDiagonostics.addEventListener("touchstart", (event) => {
//     event.preventDefault();
//     let pos3 = event.clientX;
//     let pos4 = event.clientY;
//     document.ontouchend = closeDragElement;
//     document.ontouchmove = elementDrag;

//     function elementDrag(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // draggableDiagonostics.style.padding = "20px";
//         let pos1 = pos3 - e.clientX;
//         let pos2 = pos4 - e.clientY;
//         pos3 = e.clientX;
//         pos4 = e.clientY;

//         draggableDiagonostics.style.left = `${draggableDiagonostics.offsetLeft - pos1}px`;
//         draggableDiagonostics.style.top = `${draggableDiagonostics.offsetTop - pos2}px`;
//     }

//     function closeDragElement() {
//         document.ontouchend = null;
//         document.ontouchmove = null;
//     }
// });

draggableDiagonostics.addEventListener("mousedown", (event) => {
    event.preventDefault();
    let pos3 = event.clientX;
    let pos4 = event.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        let pos1 = pos3 - e.clientX;
        let pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        draggableDiagonostics.style.left = `${draggableDiagonostics.offsetLeft - pos1}px`;
        draggableDiagonostics.style.top = `${draggableDiagonostics.offsetTop - pos2}px`;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
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
            // grid[y][x].setEnd(false);
            grid[y][x]["isEnd"] = false; // this works!
            end.x = undefined;
            end.y = undefined;
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
        start.x = x;
        start.y = y;
        // grid[y][x].toString();
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
        start.x = undefined;
        start.y = undefined;
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
            start.x = undefined;
            start.y = undefined;
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
        end.x = x;
        end.y = y;
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
        end.x = undefined;
        end.y = undefined;
        resetVisited();
        resetCompleted();
    }
    updateStatus();
}

