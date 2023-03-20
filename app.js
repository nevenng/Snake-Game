const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

class snakeBod {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
let speed = 7;
const speeder = document.getElementById("speed");
if ( speeder ) {
  speeder.addEventListener('change', function(){
  speed = speeder.value;
});
}

let tileCount = 20;
let tileSize = canvas.width / tileCount-2;

let headSnakeX = 10;
let headSnakeY = 10;
const snakeBody = [];
let tailLength = 1;

let appleX = 5;
let appleY = 5;

//speed of snake
let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//refreshes game
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkApple();
  drawApple();
  drawSnake();

  drawScore();

  //speeds up when score gets higher
  if (score > 4) {
    speed + 5;
  }
  if (score > 10) {
    speed + 5;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

//checks for wall collisions
    if (headSnakeX < 0) {
    gameOver = true;
  } else if (headSnakeX === tileCount) {
    gameOver = true;
  } else if (headSnakeY < 0) {
    gameOver = true;
  } else if (headSnakeY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    if (part.x === headSnakeX && part.y === headSnakeY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    document.getElementById("restart").style.visibility = "visible";
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Game Over! Tail Length : " + tailLength, canvas.width / 5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//draws the snake onto canvas
function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeBody.push(new snakeBod(headSnakeX, headSnakeY));
  while (snakeBody.length > tailLength) {
    snakeBody.shift();
  }

  ctx.fillStyle = "yellow";
  ctx.fillRect(headSnakeX * tileCount, headSnakeY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headSnakeX += xVelocity;
  headSnakeY += yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

//checks for collision with snake head
function checkApple() {
  if (appleX === headSnakeX && appleY == headSnakeY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
    
    if (event.keyCode == 37) {
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    //moves one tile left
    inputsXVelocity = -1;
  }

    if (event.keyCode == 38) {
    //checks so you cant go in the opposite direction
    if (inputsYVelocity == 1) return;
    //moves one tile up
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  if (event.keyCode == 39) {
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    //moves one tile right
    inputsXVelocity = 1;
  }

  if (event.keyCode == 40) {
    if (inputsYVelocity == -1) return;
    //moves one tile down
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }  
}

const restart = document.getElementById("restart");
restart.addEventListener("click", function(){
   tailLength = 1;
   headSnakeX = 10;
   headSnakeY = 10;
   appleX = 5;
   appleY = 5;
   drawGame();

});

const start = document.getElementById("start-button");
start.addEventListener("click", function(){
    drawGame();
});



