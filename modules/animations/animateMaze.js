import { updateStatus } from "../diagnostics.js";
import { setVisualProgress } from "./animateAlgos.js";


export const animateMazeCreation = (nodes) => {
    setVisualProgress();
    for (let i = 0; i < nodes.length; i++) {
        setTimeout(() => {
            let { row, col } = nodes[i];
            let id = "node " + col + " " + row;
            document.getElementById(id).classList.remove("wall");
            document.getElementById(id).classList.add("head");
            let prev = id;
            head(prev);
        }, 15 * i);
    }
    setTimeout(() => {
        setVisualProgress();
        updateStatus();
        return;
    }, 15 * nodes.length);
}

function head(prev) {
    setTimeout(() => {
        document.getElementById(prev).classList.remove("head");
    }, 50 );
}
