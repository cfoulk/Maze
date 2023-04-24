import { ROWS, COLS, grid, visitedNodes } from "../../app.js";
import { visualInProgress } from "../animations/animateAlgos.js";
import { outputErrorVisualization } from "../error/visualizationError.js";
import { clearedNodes } from "./recursiveBacktrack.js";

export const resetMap = () => {
    if (visualInProgress) {
        outputErrorVisualization();
        return false;
    }
    // visitedNodes = [];
    while(visitedNodes.length > 0) {
        visitedNodes.pop();
    }
    while(clearedNodes.length > 0) {
        clearedNodes.pop();
    }
    // console.log(visitedNodes);
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j].isStart == false && grid[i][j].isEnd == false) {
                grid[i][j].setWall(false);
                grid[i][j].setVisited(false);
                grid[i][j].setMazeVisited(false);
                grid[i][j].mazeSides = 4;
                grid[i][j].setParent(null);
                let id = "node " + j + " " + i;
                document.getElementById(id).classList.remove("wall");
                document.getElementById(id).classList.remove("visited");
                document.getElementById(id).classList.remove("path");
            } else {
                let id = "node " + j + " " + i;
                // this needs more thought
                grid[i][j].setMazeVisited(false);
                grid[i][j].mazeSides = 4;
                grid[i][j].setVisited(false);
                grid[i][j].setParent(null);
                document.getElementById(id).classList.remove("visited");
                document.getElementById(id).classList.remove("found");
            }
        }
    }
    return true;
}

export const resetVisited = () => {
    if (visualInProgress) {
        outputErrorVisualization();
        return;
    }
    // visitedNodes = [];
    while(visitedNodes.length > 0) {
        visitedNodes.pop();
    }
    // console.log(visitedNodes);
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
