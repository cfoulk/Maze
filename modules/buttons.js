
export let currentSetting = "WALL";
export const wallsButton = document.querySelector(".walls-button");
export const startButton = document.querySelector(".start-button");
export const endButton = document.querySelector(".end-button");

wallsButton.addEventListener("click", (event) => {
  currentSetting = "WALL";
  startButton.classList.remove("selected");
  endButton.classList.remove("selected");
  event.target.classList.add("selected");
});
startButton.addEventListener("click", (event) => {
  currentSetting = "START";
  wallsButton.classList.remove("selected");
  endButton.classList.remove("selected");
  event.target.classList.add("selected");
});
endButton.addEventListener("click", (event) => {
  currentSetting = "END";
  wallsButton.classList.remove("selected");
  startButton.classList.remove("selected");
  event.target.classList.add("selected");
});

