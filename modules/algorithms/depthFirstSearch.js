import { visitedNodes, ROWS, COLS, resetVisited }  from '../../app.js'
import { animateVisitedNodes, recreateVisual } from '../animations/animateAlgos.js'
import { start, end, resetCompleted } from '../controller.js';
import { createPath } from "./path.js";

export const dfs = (completed, grid) => {
    resetVisited();
    if (start.x == undefined || end.x == undefined) {
        alert("undefined start/end point");
        resetCompleted(); // this could be better, just need to think
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
    let path = createPath(grid, end);
    if (completed) {
        recreateVisual(visitedNodes, path);
    } else {
        animateVisitedNodes(visitedNodes, path);
    }
    return grid;
}
