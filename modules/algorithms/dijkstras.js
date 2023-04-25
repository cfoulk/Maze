import { start, end, ROWS, COLS } from "../../app.js";
import { resetVisitedWeighted } from "../mazeCreation/resetMap.js";
import { outputUndefinedError } from "../error/undefinedError.js";
import { resetCompleted } from "../controller.js";
import { createPath } from "./path.js";
import { animateWeightedVisitedNodes, recreateWeightedVisual } from '../animations/animateAlgos.js'

export const dijkstrastrasAlg = (completed, grid) => {
    resetVisitedWeighted();
    if (start.x == undefined || end.x == undefined) {
        outputUndefinedError();
        resetCompleted();
        return;
    }

    let bufferSet = new Set();
    let visitedNodes = [];

    grid[start.y][start.x].setDistance(0);
    bufferSet.add({ dist: parseInt(grid[start.y][start.x].distance), row: parseInt(grid[start.y][start.x].row), col: parseInt(grid[start.y][start.x].col) });

    while (bufferSet.size > 0) {

        const temp = bufferSet.values().next().value;
        bufferSet.delete(temp);

        const { row, col } = temp;

        let edges = [
            { y: parseInt(row) - 1, x: parseInt(col) },
            { y: parseInt(row), x: parseInt(col) - 1 },
            { y: parseInt(row) + 1, x: parseInt(col) },
            { y: parseInt(row), x: parseInt(col) + 1 },
        ]

        for (let i = 0; i < edges.length; i++) {

            const { y, x } = edges[i];

            if (y < 0 || y > ROWS - 1) {
                continue;
            }
            if (x < 0 || x > COLS - 1) {
                continue;
            }

            if (grid[y][x].distance > (grid[row][col].distance + grid[y][x].weight) && grid[y][x].isWall == false) {

                if (grid[y][x].distance !== Infinity) {
                    bufferSet.delete({ dist: grid[y][x].distance, row: grid[y][x].row, col: grid[y][x].col });
                }

                grid[y][x].setDistance(grid[row][col].distance + grid[y][x].weight);
                grid[y][x].setParent(grid[row][col]);
                bufferSet.add({ dist: grid[y][x].distance, row: grid[y][x].row, col: grid[y][x].col });
                visitedNodes.push({ row: parseInt(y), col: parseInt(x) });
            }
        }

    }
    let path = createPath(grid, end);
    if (completed) {
        recreateWeightedVisual(grid, visitedNodes, path);
    } else {
        animateWeightedVisitedNodes(grid, visitedNodes, path);
    }
    return grid;

}
