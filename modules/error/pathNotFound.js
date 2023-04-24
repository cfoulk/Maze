
export function outputPathNotFound() {
    document.getElementById("warning-box").innerHTML = "ERROR: no path could be determined";
    document.getElementById("warning-box").classList.add("show");
    setTimeout(() => {
        document.getElementById("warning-box").classList.remove("show");
    }, 5000);
}
