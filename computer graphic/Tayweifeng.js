let rows = 10;
let cols = 16;
let cellWidth, cellHeight;
let scaleFactor = 1.48;
let cornerRadius = 0;
let rotationAngle;
let increasingRadius = true;
let rotatingAndDecreasing = false;
let phase = 1; 
let logo;
let logoX, logoY; 
let logoSpeedX = 3;
let logoSpeedY = 2;
let logoWidth = 100; 
let logoHeight = 100; 


function setup() {
  createCanvas(1280, 720); 
  cellWidth = width / cols; 
  cellHeight = height / rows; 
  noStroke();
  rotationAngle = PI / 1.33; 

  logo = loadImage('LOGO.jpg');
  logoX = width / 2;
  logoY = height / 2;
}

function draw() {
  background(125);
  switch (phase) {
    case 1:
 
      if (increasingRadius) {
        cornerRadius += 0.5; 
        if (cornerRadius >= 50) {
          increasingRadius = false; 
          rotatingAndDecreasing = true;
        }
      } else if (rotatingAndDecreasing) {
        cornerRadius -= 0.5; 
        rotationAngle -= (PI / 1.33 - PI / 1) / 100; 
        if (cornerRadius <= 0) {
          cornerRadius = 0; 
          rotationAngle = PI / 1; 
          phase = 2; 
          rotationAngle = PI / 2; 
          increasingRadius = true; 
          rotatingAndDecreasing = false;
        }
      }

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          if ((i + j) % 2 == 0) {
            fill(255); 
          } else {
            fill(0); 
          }
          push();
          translate((i + 0.8) * cellWidth, (rows - j - 0.75) * cellHeight); 
          rotate(rotationAngle); 
          rect(-cellWidth / 2 * scaleFactor, -cellHeight / 2 * scaleFactor, cellWidth * scaleFactor * 1.2, cellHeight * scaleFactor, cornerRadius); 
          pop(); 
        }
      }
      break;

    case 2:
      
      if (increasingRadius) {
        cornerRadius += 1;
        rotationAngle -= (PI / 2 - PI / 1.35) / 50; 
        if (cornerRadius >= 50) {
          increasingRadius = false; 
          rotatingAndDecreasing = true; 
        }
      } else if (rotatingAndDecreasing) {
        cornerRadius -= 0.5; 
        if (cornerRadius <= 0) {
          cornerRadius = 0;
          rotationAngle = PI / 1.35;
          rotatingAndDecreasing = false;
          phase = 1; 
          rotationAngle = PI / 1.33;
          increasingRadius = true; 
        }
      }

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          if ((i + j) % 2 == 0) {
            fill(255); // White color
          } else {
            fill(0); // Black color
          }
          push();
          translate((cols - i + 0.01) * cellWidth, (j + 0.05) * cellHeight); 
          rotate(rotationAngle);
          rect(-cellWidth / 2 * scaleFactor, -cellHeight / 2 * scaleFactor, cellWidth * scaleFactor * 1.2,  cellHeight * scaleFactor, cornerRadius);
          pop(); 
        }
      }
      break;
  }

  logoX += logoSpeedX;
  logoY += logoSpeedY;

  if (logoX <= 0 || logoX + logoWidth >= width) {
    logoSpeedX *= -1;
  }
  if (logoY <= 0 || logoY + logoHeight >= height) {
    logoSpeedY *= -1;
  }

  image(logo, logoX, logoY, logoWidth, logoHeight);
}
