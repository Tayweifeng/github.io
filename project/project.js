let board;
let cols = 8;
let rows = 8;
let blockSize;
let boardOffsetX;
let boardOffsetY;
let pieces = [];
let selectedPiece = null;
let gameOver = false;
let score = 0;
let highestScore = 0;
let draggingPiece = false;
let crown;
let placeSound;
let losesound;
let good;
let nice;
let execellnet;
let cool;
let amazing;
let restart;
let backgroundImage; // Variable to store the background image
let start;
let backgroundMusic; // Variable to store the background music
let animations = []; // Array to store text animations
let clearingBlocks = []; // Array to store blocks being cleared
let startScreenTime = 0;
let startmusic;
let font;
// Menu buttons
let musicButton;
let soundButton;
let restartButton;
let musicOn = true;
let soundOn = true;
let menuVisible = true; 

let startScreen = true; 

function setup() {
  createCanvas(1280, 720);
  blockSize = min(width / (cols + 2), height / (rows + 4));
  boardOffsetX = (width - cols * blockSize) / 2;
  boardOffsetY = (height - rows * blockSize) / 2 - 50;
  board = createEmptyBoard();
  generatePieces();
  textSize(20);
  textAlign(CENTER, CENTER);
  
   musicButton = createButton('Music On');
   musicButton.position(30, 80);
   musicButton.size(120, 50);
   musicButton.style('background-color', '#FF8C00');
   musicButton.style("font-family", "Comic Sans MS");
   musicButton.style("font-size", "20px");
   musicButton.mousePressed(toggleMusic);

   soundButton = createButton('Sound Effect On');
   soundButton.position(30, 150);
   soundButton.size(120, 50);
   soundButton.style('background-color', '#C0C0C0');
   soundButton.style("font-family", "Comic Sans MS");
   soundButton.style("font-size", "17px");
   soundButton.mousePressed(toggleSound);
 
   restartButton = createButton('Restart Game');
   restartButton.position(30, 220);
   restartButton.size(120, 50);
   restartButton.style('background-color', '#EE82EE');
   restartButton.style("font-family", "Comic Sans MS");
   restartButton.style("font-size", "17px");
   restartButton.mousePressed(restartGame);

   menuButton = createButton('Show Menu');
   menuButton.position(30, 10);
   menuButton.size(120, 50);
   menuButton.style('background-color', '#00FFFF');
   menuButton.style("font-family", "Comic Sans MS");
   menuButton.style("font-size", "18px");
   menuButton.mousePressed(toggleMenuVisibility);

}

function draw() {
    if (startScreen) {
      drawStartScreen();
    } else {
      background(220);
      image(backgroundImage, 0, 0, width, height);
  
      drawBoard();
      drawPieces();
      drawScore();
      drawAnimations(); 
      drawClearingBlocks(); 
      menuButton.show();
  
      if (selectedPiece && draggingPiece) {
        drawPiece(selectedPiece.shape, mouseX - blockSize / 2, mouseY - blockSize / 2, blockSize / 2, selectedPiece.color);
        highlightValidPlacement(selectedPiece);
      }
  
      // Check if the game is over and all clearing animations are done
      if (gameOver && clearingBlocks.length === 0) {
        backgroundMusic.stop(); // Stop background music
        losesound.play(); // Play placing sound
        push();
        textStyle(BOLD);
        fill(0);
        textSize(45);
        text("Game Over!", width / 2, height / 2 - 80);
        pop();
        fill(0);
        textSize(30);
        text("Click to Restart", width / 2, height / 2 - 25);
        image(restart, width / 2 - 25, height / 2 + 12, 50, 50);
        noLoop();
      }
    }
  }

function drawStartScreen() {
    image(start,0,0,1280,720);
    fill(0);
    textSize(50);
    push();
    textStyle(BOLD);
    text("Welcome to the Game!", width / 2 , height / 2 - 310);
    pop();
    textSize(35);
    fill(153,76,0);
    push();
    textStyle(BOLD);
    text("Game Rules:", width / 2  - 190, height / 2 - 250);
    pop();
    textSize(30);
    fill(0);
    text("1. Start with an empty board (8*8)", width / 2 -65, height / 2 - 200);
    text("2. Receive three block pieces each round", width / 2 - 14, height / 2 - 165);
    text("3. Place all pieces on the board", width / 2 - 80, height / 2 - 130);
    text("4. Form lines (vertical or horizontal) to clear the blocks", width / 2 + 72, height / 2 - 95);
    textSize(35);
    fill(153,76,0);
    push();
    textStyle(BOLD);
    text("Goal: ", width / 2 + -245, height / 2 - 50);
    pop();
    textSize(30);
    fill(0);
    text("1. Achieve the highest score possible by clearing lines", width / 2 + 70 , height / 2 - 10);
    text("and place block by clearing lines and place block", width / 2 + 67, height / 2 + 25);
    textSize(50);
    fill(51,255,255);
    push();
    textStyle(BOLD);
    textFont('Georgia'); 
    startScreenTime += 0.05;
    let dynamicSize = 45 + sin(startScreenTime) * 5;
    textSize(dynamicSize);
    fill(51, 255, 255);
    textFont(font);
    text("Click any place to Start", width / 2 + 35, height / 2 + 120);
    pop();
    musicButton.hide();
    soundButton.hide();
    restartButton.hide();
    menuButton.hide();
  }

function preload() {
  font = loadFont('ANUDRG.ttf'); // Load the custom font
  placeSound = loadSound('place.wav');
  good = loadSound('good.mp3');
  nice = loadSound('nice.mp3');
  execellnet = loadSound('execellent.mp3');
  cool = loadSound('cool.mp3');
  amazing = loadSound('amazing.mp3');
  losesound = loadSound('lose.wav');
  backgroundImage = loadImage('background.jpg');
  backgroundMusic = loadSound('music.mp3');
  restart = loadImage('restart.png')
  start = loadImage('start.jpg');
  startmusic = loadSound('start.mp3');
}

function createEmptyBoard() {
  let board = [];
  for (let row = 0; row < rows; row++) {
    let line = [];
    for (let col = 0; col < cols; col++) {
      line.push(0);
    }
    board.push(line);
  }
  return board;
}

function drawBoard() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      stroke(0);
      fill(board[row][col] === 0 ? 255 : board[row][col]);
      rect(boardOffsetX + col * blockSize, boardOffsetY + row * blockSize, blockSize, blockSize);
    }
  }
}

function generatePieces() {
  pieces = [];
  for (let i = 0; i < 3; i++) {
    pieces.push(createRandomPiece());
  }
}

function drawPieces() {
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i] !== selectedPiece) {
      drawPiece(pieces[i].shape, width / 2 - 140 + i * 100, height - blockSize * 2, blockSize / 2, pieces[i].color);
    }
  }
}

function drawPiece(piece, x, y, size, color) {
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {
        stroke(0);
        fill(color);
        rect(x + j * size, y + i * size, size, size);
      }
    }
  }
}

function createRandomPiece() {
  const shapes = [
    [[1]],
    [[1, 1]],
    [[1], [1]],
    [[1],[1],[1]],
    [[1, 1], [1, 1]],
    [[1, 1, 1], [0, 1, 0]], // T-shape
    [[0, 1, 0], [1, 1, 1]], // Reverse T-shape
    [[1, 1, 0], [0, 1, 1]], // Z-shape
    [[0, 1, 1], [1, 1, 0]], // Reverse Z-shape
    [[1, 1, 1], [1, 0, 0]], // L-shape
    [[1, 1, 1], [0, 0, 1]]  // Reverse L-shape
  ];

  let shape = random(shapes);
  let pieceColor = color(random(255), random(255), random(255));
  return { shape, color: pieceColor };
}

function mousePressed() {
  if (startScreen) {
    startScreen = false;
    if (musicOn) {
      backgroundMusic.loop(); 
    }
    if (soundOn) {
      startmusic.play(); 
    }
    
  } else {
    if (gameOver) {
      restartGame();
    } else if (mouseY > height - blockSize * 2) {
      
      let pieceIndex = Math.floor((mouseX - (width / 2 - 140)) / 100);
      if (pieceIndex >= 0 && pieceIndex < pieces.length) {
        selectedPiece = pieces[pieceIndex];
        draggingPiece = true;
        
      }
    }
  }
}


function mouseReleased() {
  if (selectedPiece) {
    let gridX = Math.floor((mouseX - boardOffsetX) / blockSize);
    let gridY = Math.floor((mouseY - boardOffsetY) / blockSize);
    if (canPlacePiece(selectedPiece.shape, gridX, gridY)) {
      placePiece(selectedPiece.shape, gridX, gridY, selectedPiece.color);
      pieces.splice(pieces.indexOf(selectedPiece), 1);
      selectedPiece = null;
      draggingPiece = false;

      clearLines();

      // Check for game over after clearing lines
      if (pieces.length === 0) {
        generatePieces();
      }
      if (!canAnyPieceFit()) {
        gameOver = true;
      }
    } else {
      selectedPiece = null;
      draggingPiece = false;
    }
  }
}

function canPlacePiece(piece, x, y) {
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {
        let newX = x + j;
        let newY = y + i;
        if (newX < 0 || newX >= cols || newY < 0 || newY >= rows || board[newY][newX] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}

function placePiece(piece, x, y, color) {
  let blocksPlaced = 0;

  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {
        board[y + i][x + j] = color;
        blocksPlaced++;
      }
    }
  }
  score += blocksPlaced;
  if (soundOn) {
    placeSound.play();
  }

if (score > highestScore) {
  highestScore = score;
}
}
function clearLines() {
  let linesCleared = 0;

  // Clear full rows
  for (let row = 0; row < rows; row++) {
    if (board[row].every(cell => cell !== 0)) {
      for (let col = 0; col < cols; col++) {
        clearingBlocks.push({ x: col, y: row, color: color(board[row][col]), alpha: 255 });
        board[row][col] = 0;
      }
      linesCleared++;
    }
  }

  // Clear full columns
  for (let col = 0; col < cols; col++) {
    if (board.every(row => row[col] !== 0)) {
      for (let row = 0; row < rows; row++) {
        clearingBlocks.push({ x: col, y: row, color: color(board[row][col]), alpha: 255 });
        board[row][col] = 0;
      }
      linesCleared++;
    }
  }

  // Calculate score based on lines cleared
  let message = "";
  if (linesCleared === 1) {
    score += 10;
    message = "+10";
    if (soundOn) {
    cool.play();
    }
  } else if (linesCleared === 2) {
    score += 30;
    message = "+30";
    if (soundOn) {
    good.play();
    }
  } else if (linesCleared === 3) {
    score += 50;
    message = "+50";
    if (soundOn) {
    nice.play();
    }
  } else if (linesCleared === 4) {
    score += 70;
    message = "+70!";
    if (soundOn) {
    execellnet.play();
    }
  } else if (linesCleared >= 5) {
    score += 100;
    message = "100!";
    if (soundOn) {
    amazing.play();
    }
  }

  if (message !== "") {
    animations.push({ text: message, x: width / 2, y: height / 2, alpha: 255 });
  }

  if (score > highestScore) {
    highestScore = score;
  }
}

function canAnyPieceFit() {
  for (let piece of pieces) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (canPlacePiece(piece.shape, col, row)) {
          return true;
        }
      }
    }
  }
  return false;
}

function drawScore() {
  push();
  fill(255);
  textSize(32);
  textStyle(BOLD);
  textFont('Times New Roman'); 
  text("Score: " + score, (width / 2) - 220, height - 675);
  textSize(35);
  text("Highest Score: "+highestScore, (width / 2) + 200, height - 675);
  pop();
}

function highlightValidPlacement(piece) {
  let gridX = Math.floor((mouseX - boardOffsetX) / blockSize);
  let gridY = Math.floor((mouseY - boardOffsetY) / blockSize);
  if (canPlacePiece(piece.shape, gridX, gridY)) {
    noStroke();
    fill(0, 255, 0, 100);
    for (let i = 0; i < piece.shape.length; i++) {
      for (let j = 0; j < piece.shape[i].length; j++) {
        if (piece.shape[i][j] === 1) {
          rect(boardOffsetX + (gridX + j) * blockSize, boardOffsetY + (gridY + i) * blockSize, blockSize, blockSize);
        }
      }
    }
  }
}

function drawAnimations() {
  for (let i = animations.length - 1; i >= 0; i--) {
    let anim = animations[i];
    fill(random(255), random(255), random(255), anim.alpha);
    textSize(60);
    text(anim.text, anim.x, anim.y-20);
    anim.y -= 1;
    anim.alpha -= 5;
    if (anim.alpha <= 0) {
      animations.splice(i, 1);
    }
  }
}

function drawClearingBlocks() {
  for (let i = clearingBlocks.length - 1; i >= 0; i--) {
    let block = clearingBlocks[i];
    fill(block.color.levels[0], block.color.levels[1], block.color.levels[2], block.alpha);
    noStroke();
    rect(boardOffsetX + block.x * blockSize, boardOffsetY + block.y * blockSize, blockSize, blockSize);
    block.alpha -= 10;
    if (block.alpha <= 0) {
      clearingBlocks.splice(i, 1);
    }
  }
}
// Menu button functions
function toggleMusic() {
  if (musicOn) {
    musicButton.html('Music Off');
    backgroundMusic.stop();
  } else {
    musicButton.html('Music On');
    backgroundMusic.loop();
  }
  musicOn = !musicOn;
}

function toggleSound() {
  soundOn = !soundOn;
  if (soundOn) {
    soundButton.html('Sound Effect On');
  } else {
    soundButton.html('Sound Effect Off');
  }
}

function toggleMenuVisibility() {
  menuVisible = !menuVisible;
  if (menuVisible) {
    menuButton.html('Hide Menu');
    musicButton.hide();
    soundButton.hide();
    restartButton.hide();
  } else {
    menuButton.html('Show Menu');
    musicButton.show();
    soundButton.show();
    restartButton.show();
  }
}

function restartGame() {
  board = createEmptyBoard();
  generatePieces();
  selectedPiece = null;
  gameOver = false;
  score = 0;
  animations = [];
  clearingBlocks = [];
  if (musicOn && !backgroundMusic.isPlaying()) {
    backgroundMusic.loop();
  }
  loop();
}
