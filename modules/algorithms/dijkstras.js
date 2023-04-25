import { start, end, ROWS, COLS } from "../../app.js";
import { resetVisited } from "../mazeCreation/resetMap.js";
import { outputUndefinedError } from "../error/undefinedError.js";
import { resetCompleted } from "../controller.js";
import { createPath } from "./path.js";
import { animateWeightedVisitedNodes, recreateWeightedVisual } from '../animations/animateAlgos.js'

export const dijkstrastrasAlg = (completed, grid) => {
    resetVisited();
    if (start.x == undefined || end.x == undefined) {
        outputUndefinedError();
        resetCompleted();
        return;
    }

    let set = new Set();
    let visitedNodes = [];

    grid[start.y][start.x].setDistance(0);
    set.add({ dist: parseInt(grid[start.y][start.x].distance), row: parseInt(grid[start.y][start.x].row), col: parseInt(grid[start.y][start.x].col) });

    while (set.size > 0) {
        // console.log("lol1");
        const temp = set.values().next().value;
        set.delete(temp);

        const { row, col } = temp;

        let edges = [
            { y: parseInt(row) - 1, x: parseInt(col) },
            { y: parseInt(row), x: parseInt(col) - 1 },
            { y: parseInt(row) + 1, x: parseInt(col) },
            { y: parseInt(row), x: parseInt(col) + 1 },
        ]

        // console.log("askldfjaslik;fjasfd");
        for (let i = 0; i < edges.length; i++) {

            const { y, x } = edges[i];

            if (y < 0 || y > ROWS - 1) {
                continue;
            }
            if (x < 0 || x > COLS - 1) {
                continue;
            }
            // console.log(x + " " + y);
            // console.log(grid[y][x].distance);
            // console.log(col + " " + row);
            // console.log(grid[row][col].distance);
            // console.log("dddddddd");
            if (grid[y][x].distance > (grid[row][col].distance + grid[y][x].weight) && grid[y][x].isWall == false) {

                // console.log("555");
                if (grid[y][x].distance !== Infinity) {
                    set.delete({ dist: grid[y][x].distance, row: grid[y][x].row, col: grid[y][x].col });
                }

                // console.log("lol2");
                grid[y][x].setDistance(grid[row][col].distance + grid[y][x].weight);
                grid[y][x].setParent(grid[row][col]);
                set.add({ dist: grid[y][x].distance, row: grid[y][x].row, col: grid[y][x].col });
                visitedNodes.push({ row: parseInt(y), col: parseInt(x) });
                // let id = "node " + x + " " + y;
                // document.getElementById(id).innerHTML = grid[y][x].distance;
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
