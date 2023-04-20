let checkedOutput = false;

export function outputErrorVisualization() {
    if (!checkedOutput) {
        checkedOutput = true;
        document.getElementById("warning-box").innerHTML = "ERROR: visualization in progress, cannot alter map.";
        document.getElementById("warning-box").classList.add("show");
        setTimeout(() => {
            document.getElementById("warning-box").classList.remove("show");
        }, 5000);
    }
    checkedOutput = false;
}
