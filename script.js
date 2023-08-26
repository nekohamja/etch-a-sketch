// PREMADE VALUES
const GRID_S = 32;
const GRID_M = 64;
const GRID_L = 96;
const BOX_S = "box-small";
const BOX_M = "box-medium";
const BOX_L = "box-large";

const DEFAULT_BOX_SIZE = BOX_S;
const DEFAULT_COLOR = "#2A2A2A";
const DEFAULT_MODE = "color";

let selectedSize = DEFAULT_BOX_SIZE;
let selectedColor = DEFAULT_COLOR;
let selectedMode = DEFAULT_MODE;

// HTML DOM SELECTORS
const container = document.querySelector(".container.gridbox");
const slider = document.querySelector(".slider");
const pickerButton = document.querySelector(".button.picker");
const resetButton = document.querySelector(".gg-undo");
const eraserButton = document.querySelector(".gg-erase");
const colorButton = document.querySelector(".button.color");
const rainbowButton = document.querySelector(".button.rainbow");

// EVENT HANDLERS
slider.oninput = () => createGrid();
pickerButton.oninput = (e) => setSelectedColor(e.target.value);
colorButton.onclick = () => setSelectedMode("color");
rainbowButton.onclick = () => setSelectedMode("rainbow");
eraserButton.onclick = () => setSelectedMode("eraser");
resetButton.onclick = () => createGrid();

// paint event trigger
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

createGrid();

function setSelectedColor(newColor) {
  selectedColor = newColor;
}

function setSelectedMode(newMode) {
  modeIndicator(newMode);
  selectedMode = newMode;
}

function createGrid() {
  const deleteBox = document.querySelectorAll(".grid");
  for (let i = 0; i < deleteBox.length; i++) deleteBox[i].remove();
  container.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${slider.value}, 1fr)`;
  for (let i = 1; i <= slider.value * slider.value; i++) {
    const gridBox = document.createElement("div");
    gridBox.classList.add("grid");
    if (slider.value == GRID_M) selectedSize = gridBox.classList.add(BOX_M);
    else if (slider.value == GRID_L) gridBox.classList.add(BOX_L);
    else selectedSize = gridBox.classList.add(BOX_S);
    gridBox.style.height = selectedSize;
    gridBox.style.width = selectedSize;
    gridBox.addEventListener("mouseover", draw);
    gridBox.addEventListener("mousedown", draw);
    container.appendChild(gridBox);
  }
}

function draw(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (selectedMode == "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (selectedMode === "color") {
    e.target.style.backgroundColor = selectedColor;
  } else if (selectedMode === "eraser") {
    e.target.style.backgroundColor = "#dad8d8";
  }
}

function modeIndicator(newMode) {
  if (selectedMode === "color") {
    colorButton.classList.remove("active");
    rainbowButton.classList.remove("active");
    indicator.style.color = "aliceblue";
  } else if (selectedMode === "rainbow") {
    rainbowButton.classList.remove("active");
    eraserButton.classList.remove("active");
    indicator.style.color = "aliceblue";
  } else if (selectedMode === "eraser") {
    eraserButton.classList.remove("active");
    indicator.style.color = "aliceblue";
  }
  if (newMode === "color") {
    colorButton.classList.add("active");
  } else if (newMode === "rainbow") {
    rainbowButton.classList.add("active");
  } else if (newMode === "eraser") {
    eraserButton.classList.add("active");
    indicator.style.color = "#bdbdbd";
  }
}

// eraser select indicator
const eraserIcon = document.querySelector("i.gg-erase");
const indicator = document.createElement("p");
indicator.classList.add("indicator");
indicator.textContent = "...";
indicator.style.color = "aliceblue";
indicator.style.fontSize = "24px";
eraserIcon.appendChild(indicator);
