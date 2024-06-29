let rows = 10; // Number of rows
let cols = 16; // Number of columns
let cellWidth; // Width of each cell
let cellHeight; // Height of each cell
let scaleFactor = 1.45; // Scale factor to increase the size of the shapes
let cornerRadius; // Radius of the rounded corners
let angle = 1.35; // Initial rotation angle
let angleIncrement = 0.01; // Angle increment for animation

function setup() {
  createCanvas(1280, 720); // Create a 1280x720 pixel canvas
  background(125); // Set the background color to light gray
  cellWidth = width / cols; // Width of each cell
  cellHeight = height / rows; // Height of each cell
  cornerRadius = cellWidth / 4; // Initial radius of the rounded corners
  noStroke();
}

function draw() {
  background(125); // Clear the background

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if ((i + j) % 2 == 0) {
        fill(255); // White color
      } else {
        fill(0); // Black color
      }

      push(); // Save the current transformation matrix
      translate((i + 0.8) * cellWidth, (rows - j - 0.85) * cellHeight); // Translate to the center of the cell

      // Apply rotation
      rotate(angle);

      // Decrease the radius as the angle increases
      let scaledRadius = map(angle, 1.35, 2, cornerRadius, 0);

      // Draw the rotated rectangle with increased size and rounded corners
      rect(-cellWidth / 2 * scaleFactor, -cellHeight / 2 * scaleFactor, cellWidth * scaleFactor * 1.2, cellHeight * scaleFactor, scaledRadius);

      pop(); // Restore the transformation matrix
    }
  }

  // Increment the angle for animation
  angle += angleIncrement;
  
  // Reset angle when it exceeds 2
  if (angle > 2) {
    angle = 1.35;
  }
}
