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
      gridSquare.style.setProperty("--grid-size", gridSize);
      gridRow.appendChild(gridSquare);
    }
  }
}

// Drawing
isMouseDown = false;

function drawSquare(event) {
  if (event.target.className === "square" && isMouseDown) {
    event.target.style.backgroundColor = "black";
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

// Helper functions
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Init
createGrid(gridSize);
