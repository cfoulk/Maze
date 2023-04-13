import { visualInProgress } from "../animations/animateAlgos.js";
import { grid, ROWS, COLS } from "../../app.js";
import { resetMap } from "./resetMap.js";

export const createRandom = () => {
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
