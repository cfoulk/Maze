import { start, end, visitedNodes, ROWS, COLS, resetVisited, createPath }  from '../../app.js'
import { animateVisitedNodes, recreateVisual } from '../animations/animateAlgos.js'

export const bfs = (completed, grid) => {
    resetVisited();
    if (start.x == undefined || end.x == undefined) {
        alert("undefined start/end point");
        return;
    }
    let queue = [];
    grid[start.y][start.x].setVisited(true);
    queue.push({ row: start.y, col: start.x });
    visitedNodes.push({ row: start.y, col: start.x });
    while (queue.length > 0) {
        let v = queue.shift();
        let edges = [
            { y: parseInt(v.row) - 1, x: parseInt(v.col) },
            { y: parseInt(v.row), x: parseInt(v.col) - 1 },
            { y: parseInt(v.row) + 1, x: parseInt(v.col) },
            { y: parseInt(v.row), x: parseInt(v.col) + 1 },
        ]

        if (v.row == end.y && v.col == end.x) {
            break;
        }
        for (let i = 0; i < edges.length; i++) {
            const { y: edgeY, x: edgeX } = edges[i];
            if (edgeY < 0 || edgeY > ROWS - 1) {
                continue;
            }
            if (edgeX < 0 || edgeX > COLS - 1) {
                continue;
            }
            if (grid[edgeY][edgeX].visited == false && grid[edgeY][edgeX].isWall == false) {
                grid[edgeY][edgeX].setVisited(true);
                grid[edgeY][edgeX].setParent(grid[v.row][v.col]);
                queue.push({ row: edgeY, col: edgeX });
                visitedNodes.push({ row: edgeY, col: edgeX });
            }
        }

    }
    let path = createPath();
    if (completed) {
        recreateVisual(visitedNodes, path);
    } else {
        animateVisitedNodes(visitedNodes, path);
    }
    return grid;
}
