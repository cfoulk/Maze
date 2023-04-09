
export const createPath = (grid, end) => {
    try {
        let path = [];
        let p = grid[end.y][end.x].parent;
        path.push({ row: p.row, col: p.col });
        while (p.parent.parent != null) {
            p = p.parent;
            path.push({ row: p.row, col: p.col });
        }
        return path;
    } catch (error) {
        console.log("walled in!");
        return [];
    }
}

