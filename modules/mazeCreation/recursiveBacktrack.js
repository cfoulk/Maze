import { visualInProgress } from "../animations/animateAlgos.js";
import { animateMazeCreation } from "../animations/animateMaze.js";
import { grid, ROWS, COLS, start } from "../../app.js";
import { resetMap } from "./resetMap.js";
import { resetCompleted } from '../controller.js';
import { outputErrorVisualization } from "../error/visualizationError.js";
import { outputUndefinedError } from '../error/undefinedError.js';
import { blankWalls } from "./randomMaze.js";

export let clearedNodes = [];

export const createBacktrackMaze = () => {
    if (visualInProgress) {
        outputErrorVisualization();
        return false;
    }
    resetMap();
    blankWalls();
    if (start.x == undefined) {
        outputUndefinedError();
        resetCompleted();
        return;
    }
    createPassage(grid[start.y][start.x]);
    animateMazeCreation(clearedNodes);
    return true;
}

function createPassage(v) {
    let edges = [
        { dir: "west", y: parseInt(v.row), x: parseInt(v.col) - 1 },
        { dir: "south", y: parseInt(v.row) + 1, x: parseInt(v.col) },
        { dir: "east", y: parseInt(v.row), x: parseInt(v.col) + 1 },
        { dir: "north", y: parseInt(v.row) - 1, x: parseInt(v.col) },
    ]

    clearedNodes.push({ row: parseInt(v.row), col: parseInt(v.col) });
    edges.sort(() => Math.random() - 0.5);

    for (let i = 0; i < edges.length; i++) {

        const { y: edgeY, x: edgeX } = edges[i];
        if (edgeY < 0 || edgeY > ROWS - 1) {
            continue;
        }
        if (edgeX < 0 || edgeX > COLS - 1) {
            continue;
        }
        grid[edgeY][edgeX].setMazeSides();
    }

    for (let i = 0; i < edges.length; i++) {

        const { dir: newDir, y: newY, x: newX } = edges[i];
        if (newY < 0 || newY > ROWS - 1) {
            continue;
        }
        if (newX < 0 || newX > COLS - 1) {
            continue;
        }
        if ("north" == newDir) {
            visitWall(newY, newX);
        } else if ("east" == newDir) {
            visitWall(newY, newX);
        } else if ("south" == newDir) {
            visitWall(newY, newX);
        } else if ("west" == newDir) {
            visitWall(newY, newX);
        }
    }
}

function visitWall(row, col) {
    if (grid[row][col].mazeVisited == false && grid[row][col].mazeSides > 2) {
        grid[row][col].setWall(false);
        grid[row][col].setMazeVisited(true);
        createPassage(grid[row][col]);
    }
}
