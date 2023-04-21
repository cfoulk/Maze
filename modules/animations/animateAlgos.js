import { start, end } from '../../app.js'
import { updateStatus } from "../diagnostics.js";

export let visualInProgress = false;

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
        console.log("no path!");
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
