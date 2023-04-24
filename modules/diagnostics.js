import { start, end } from "../app.js";
import { currentAlgorithm, currentSetting } from "./controller.js";
import { visualInProgress } from "./animations/animateAlgos.js";
// messy solution
// could add: 
// number of visited nodes
// if end was found
// total weight of path
//
export const updateStatus = () => {
    document.getElementById("status").innerHTML =
        "Toggle Diagnostics" +
        "\nstart (x, y): (" + start.x + ", " + start.y +
        ")\nend (x, y): (" + end.x + ", " + end.y + ")" +
        "\nalgorithm: " + currentAlgorithm +
        "\nsetting: " + currentSetting +
        "\nvisualInProgress: " + visualInProgress;
}
