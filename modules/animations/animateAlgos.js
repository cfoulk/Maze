import { start, end } from '../../app.js'
import { updateStatus } from "../diagnostics.js";
import { outputPathNotFound } from '../error/pathNotFound.js';

export let visualInProgress = false;

export function setVisualProgress() {
    if (visualInProgress) {
        visualInProgress = false;
    } else {
        visualInProgress = true;
    }
}

export const animateVisitedNodes = (visitedNodes, path) => {
    visualInProgress = true;
    for (let i = 0; i <= visitedNodes.length; i++) {
        if (i == visitedNodes.length) {
            setTimeout(() => {
                animatePath(path);
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

export const animateWeightedVisitedNodes = (grid, visitedNodes, path) => {
    visualInProgress = true;
    for (let i = 0; i <= visitedNodes.length; i++) {
        if (i == visitedNodes.length) {
            setTimeout(() => {
                animateWeightedPath(grid, path);
            }, 5 * i);
            return;
        }
        setTimeout(() => {
            const { dist, row, col } = visitedNodes[i];
            let id = "node " + col + " " + row;
            if (row == start.y && col == start.x || row == end.y && col == end.x) {
                return;
            } else if (document.getElementById(id).classList == "cell visited") {
                animateVisitedCell(id);
                document.getElementById(id).innerHTML = dist;
            } else {
                document.getElementById(id).classList.add("visited");
                document.getElementById(id).innerHTML = dist;
            }
        }, 5 * i);
    }
}

function animateVisitedCell(id) {
  var cell = document.getElementById(id);
  cell.classList.remove("visited");
  void cell.offsetWidth; // force a reflow to reset the animation
  cell.classList.add("visited");
}

export const animatePath = (path) => {
    if (path.length > 0) {
        const pathInOrder = path.reverse();
        for (let i = 0; i <= pathInOrder.length - 1; i++) {
            setTimeout(() => {
                const { row, col } = pathInOrder[i];
                let id = "node " + col + " " + row;
                document.getElementById(id).classList.add("path");
            }, 25 * i);
        }
    } else {
        outputPathNotFound();
        visualInProgress = false;
        updateStatus();
        return;
    }
    setTimeout(() => {
        visualInProgress = false;
        updateStatus();
        return;
    }, 25 * path.length);
}

export const animateWeightedPath = (grid, path) => {
    if (path.length > 0) {
        const pathInOrder = path.reverse();
        for (let i = 0; i <= pathInOrder.length - 1; i++) {
            setTimeout(() => {
                const { row, col } = pathInOrder[i];
                let id = "node " + col + " " + row;
                document.getElementById(id).classList.add("path");
            }, 25 * i);
        }
    } else {
        outputPathNotFound();
        visualInProgress = false;
        updateStatus();
        return;
    }
    setTimeout(() => {
        let id = "node " + end.x + " " + end.y;
        // console.log(id);
        document.getElementById(id).innerHTML = grid[end.y][end.x].distance;
        visualInProgress = false;
        updateStatus();
        return;
    }, 25 * path.length);
}


export const recreateVisual = (visitedNodes, path) => {
    for (let i = 0; i < visitedNodes.length; i++) {
        const { row, col } = visitedNodes[i];
        if (row == start.y && col == start.x || row == end.y && col == end.x) {
            continue;
        } else {
            let id = "node " + col + " " + row;
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

export const recreateWeightedVisual = (grid, visitedNodes, path) => {
    for (let i = 0; i < visitedNodes.length; i++) {
        const { row, col } = visitedNodes[i];
        if (row == start.y && col == start.x || row == end.y && col == end.x) {
            continue;
        } else {
            let id = "node " + col + " " + row;
            document.getElementById(id).classList.add("visited");
            document.getElementById(id).innerHTML = grid[row][col].distance;
        }
    }
    const pathInOrder = path.reverse();
    for (let j = 0; j < pathInOrder.length; j++) {
        const { row, col } = pathInOrder[j];
        let id = "node " + col + " " + row;
        document.getElementById(id).classList.add("path");
    }

    let id = "node " + end.x + " " + end.y;
    document.getElementById(id).innerHTML = grid[end.y][end.x].distance;
}
