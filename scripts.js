const container = document.querySelector("#container");
const gridSize = 16;

// Element creation
for (let i = 0; i < gridSize; i++) {
  const gridRow = document.createElement("div");
  gridRow.classList.add("row");
  container.appendChild(gridRow);
  for (let j = 0; j < gridSize; j++) {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("square");
    gridRow.appendChild(gridSquare);
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
