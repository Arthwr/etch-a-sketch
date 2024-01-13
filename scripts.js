const container = document.querySelector("#container");
const CONTAINER_SIZE = 960;
let gridSize = 16;

// Element creation
function createGrid(gridSize) {
  removeAllChildNodes(container);

  // Calculate the size of each square based on the container width
  const squareSize = CONTAINER_SIZE / gridSize;

  for (let i = 0; i < gridSize; i++) {
    const gridRow = document.createElement("div");
    gridRow.classList.add("row");
    container.appendChild(gridRow);
    for (let j = 0; j < gridSize; j++) {
      const gridSquare = document.createElement("div");
      gridSquare.classList.add("square");
      gridSquare.style.width = `${squareSize}px`;
      gridSquare.style.height = `${squareSize}px`;
      gridRow.appendChild(gridSquare);
    }
  }
}

// Drawing
isMouseDown = false;
isRainbowModeOn = false;
isShadingModeOne = false;

const getRandomRGB = function () {
  const randomColorComponent = () => Math.floor(Math.random() * 256);
  const red = randomColorComponent();
  const green = randomColorComponent();
  const blue = randomColorComponent();
  return `rgb(${red}, ${green}, ${blue})`;
};

const getDarkerRGB = function (currentRed, currentGreen, currentBlue) {
  const darkenComponent = (component) => Math.max(0, component * 0.9);
  let darkerRed = darkenComponent(currentRed);
  let darkerGreen = darkenComponent(currentGreen);
  let darkerBlue = darkenComponent(currentBlue);

  return `rgb(${darkerRed}, ${darkerGreen}, ${darkerBlue})`;
};

function drawSquare(event) {
  if (event.target.className === "square" && isMouseDown) {
    if (isRainbowModeOn) {
      event.target.style.backgroundColor = getRandomRGB();
    } else if (isShadingModeOne) {
      const computedStyle = getComputedStyle(event.target);
      const colorString = computedStyle.backgroundColor;
      const [, red, green, blue] = colorString
        .match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
        .map(Number);
      event.target.style.backgroundColor = getDarkerRGB(red, green, blue);
      return;
    } else {
      event.target.style.backgroundColor = "black";
    }
  }
}
container.addEventListener("mousedown", (event) => {
  event.preventDefault();
  isMouseDown = true;
  drawSquare(event);
});
container.addEventListener("mouseup", () => (isMouseDown = false));
container.addEventListener("mouseover", drawSquare);

// UI
const sizeButton = document.querySelector("#sizeButton");
const rainbowButton = document.querySelector("#rainbowButton");
const shadingButton = document.querySelector("#shadingButton");

function changeSize() {
  const gridSizeInput = prompt("Change a grid size (not more than 100x100)");
  const gridSize = parseInt(gridSizeInput, 10);
  if (gridSize > 0 && gridSize <= 100 && !isNaN(gridSize)) {
    createGrid(gridSize);
  } else {
    alert("Please type in correct number between 1 and 100");
  }
}

sizeButton.addEventListener("click", changeSize);
rainbowButton.addEventListener("click", toggleRainbowMode);
shadingButton.addEventListener("click", toggleShadingMode);

// Helper functions
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function toggleRainbowMode() {
  rainbowButton.classList.toggle("active");
  isRainbowModeOn = !isRainbowModeOn;
  if (isShadingModeOne) {
    shadingButton.classList.remove("active");
    isShadingModeOne = false;
  }
}

function toggleShadingMode() {
  shadingButton.classList.toggle("active");
  isShadingModeOne = !isShadingModeOne;
  if (isRainbowModeOn) {
    rainbowButton.classList.remove("active");
    isRainbowModeOn = false;
  }
}

// Init
createGrid(gridSize);
