window.currentUser = localStorage.getItem("lastLoggedUser") || "";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // the 2D rendering context // webgl for 3d API

if (!canvas || !ctx) {
  console.error("Canvas or 2D context not found. Make sure <canvas id='gameCanvas'></canvas> is present.");
}

let username = "";
let score = 0;
let level = 1;
let lives = 3;

const ballRadius = 8; // radius of ball
let x, y, dx, dy, paddleX;
// x, y are the current position of the ball.
// dx, dy are the speed and direction (velocity) of the ball.

const paddleHeight = 10;
const paddleWidth = 150;
// pressing arrow keys to move the paddle.

let rightPressed = false;
let leftPressed = false;

// Bricks Setup
let bricks = [];
const brickRowCount = 4;
const brickColumnCount = 6;
const brickWidth = 120;
const brickHeight = 20;
const brickPadding = 15;
const brickOffsetTop = 50;
const brickOffsetLeft = 50;

function startGame() {
  if (!window.currentUser) {
    alert("No user logged in! Please login first.");
    return;
  }
  username = window.currentUser;

  // Hide login and welcome
  document.getElementById("authForm").style.display = "none";
  document.getElementById("userInput").style.display = "none";

  // Show game canvas
  document.getElementById("gameWrapper").style.display = "block";
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
    for (let r = 0; r < brickRowCount + level - 1; r++) {
      // more rows in higher levels
      bricks[c][r] = { x: 0, y: 0, status: 1 }; // Create a brick object
      // status: 1 means brick is visible and not broken yet
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    leftPressed = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    rightPressed = false;
  } else if ( e.key === "Left" || e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    leftPressed = false;
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear entire canvas to redraw fresh frame

  drawBricks(); // Draw all active bricks
  drawBall(); // Draw the ball (function not shown here)
  drawPaddle(); // Draw the paddle (function not shown here)
  drawScore(); // Display the current score (function not shown here)
  drawLevel(); // Display current level (function not shown here)
  drawLives(); // Display remaining lives (function not shown here)

  collisionDetection(); // Check if ball hits bricks and handle collisions (function not shown)

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; // bounce the ball in opposite direction
  }
  if (y + dy < ballRadius) {
    dy = -dy; // bounce from up to down
  } else if (y + dy > canvas.height - ballRadius) {
    // if ball goes down
    if (x > paddleX && x < paddleX + paddleWidth) {
      // touches the paddle
      dy = -dy;
    } else {
      // touches the bottom edge
      lives--;
      if (lives === 0) {
        saveScore(username, score, level);
        alert("GAME OVER! Your score: " + score);
        // Redirect to profile page instead of reloading
        window.location.href = "profile.html";
      }
      else  {
        resetGame();
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    // move right side
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    // move left side
    paddleX -= 7;
  }

  // updates ball position at every frame
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      if (bricks[c][r].status === 1) {
        // Calculate brick position
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        // Draw the brick
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#050113b7"; // brick color
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // draws circle, radius, angles
  ctx.fillStyle = "#ecedf3ff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath(); //Starts a new drawing path.
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#f2f8f8c9";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Level: " + level, canvas.width - 88, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Lives: " + lives, canvas.width / 2 - 30, 20);
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      let brick = bricks[c][r];
      if (brick.status === 1) {
        if (
          x > brick.x &&
          x < brick.x + brickWidth &&
          y > brick.y &&
          y < brick.y + brickHeight
        ) {
          dy = -dy;
          brick.status = 0;
          score++;

          saveScore(username, score, level);// Save score in local storage immediately

          if (isLevelCleared()) {
            level++;
            saveScore(username, score, level);
            resetGame();
          }
        }
      }
    }
  }
}

// function saveScore(username, score, level) {
//   let users = JSON.parse(localStorage.getItem("brickBreakerUsers")) || {};

//   if (users[username]) {
//     if (!users[username].highscore || score > users[username].highscore) {
//       users[username].highscore = score;
//     }
//     users[username].level = level;
//   }

//   localStorage.setItem("brickBreakerUsers", JSON.stringify(users));
// }

function saveScore(username, score, level) {
  let users = JSON.parse(localStorage.getItem("brickBreakerUsers")) || {};

  if (!users[username]) {
    users[username] = { highscore: score, level: level };
  } else { // if user exixts
    if (!users[username].highscore || score > users[username].highscore) {
      users[username].highscore = score;
    }

    if (!users[username].level || level > users[username].level) {
      users[username].level = level;
    }
  }

  localStorage.setItem("brickBreakerUsers", JSON.stringify(users));
}


function isLevelCleared() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      if (bricks[c][r].status === 1) return false;
    }
  }
  return true;
}