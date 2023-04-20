
export function outputUndefinedError() {
    document.getElementById("warning-box").innerHTML = "ERROR: undefined start/end point";
    document.getElementById("warning-box").classList.add("show");
    setTimeout(() => {
        document.getElementById("warning-box").classList.remove("show");
    }, 5000);
}
