import { start, end } from "../../app.js";

const dijkstrastrasAlg = () => {
    let set = new Set();
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
           set.add({ row: i, col: j }); 
        }

        grid[start.y][start.x].setDistance = 0;


        while(set.size() > 0) {
        }
    }
}
