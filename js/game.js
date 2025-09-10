const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let username = "";
let score = 0;
let level = 1;
let lives = 3;


const ballRadius = 8; // radius of ball
let x, y, dx, dy, paddleX; 
// x, y are the current position of the ball. 
// dx, dy are the speed and direction (velocity) of the ball.

const paddleHeight = 10;
const paddleWidth = 75;
// pressing arrow keys to move the paddle.

let rightPressed = false;
let leftPressed = false;

// Bricks Setup
let bricks = [];
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

function startGame() {
  username = document.getElementById("username").value.trim();
  if (username === "") {
    alert("Please enter your name!");
    return;
  }

  document.getElementById("userInput").style.display = "none";
  canvas.style.display = "block";

  resetGame();
  draw();
}

function resetGame() {
  x = canvas.width / 2; // Sets the initial position of the ball (center bottom).
  y = canvas.height - 30;
  dx = 2 + level; // speed increases with level
  dy = -2 - level;
  paddleX = (canvas.width - paddleWidth) / 2;
  initBricks();
}

function initBricks() {
  bricks = []; // Clear the bricks array first
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount + level - 1; r++) { // more rows in higher levels
      bricks[c][r] = { x: 0, y: 0, status: 1 };// Create a brick object
      // status: 1 means brick is visible and not broken yet
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);// Clear entire canvas to redraw fresh frame

  drawBricks(); // Draw all active bricks
  
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      if (bricks[c][r].status === 1) {
        // Calculate brick position
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        // Draw the brick
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#f1c40f";// brick color
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}