import { Ball } from "./js/classes/ball.js";
import { Player } from "./js/classes/player.js";
import { Enemy } from "./js/classes/enemy.js";

let canvas, canvasContext;
let points = {
  player: 0,
  enemy: 0,
};

const CTE = {
  //General:
  DEBUG: false,
  FPS: 60,
  SPACING: 10,

  // Canvas:
  CANVAS_WIDTH: 400,
  CANVAS_HEIGHT: 600,

  // Paddle:
  PADDLE_WIDTH: 120,
  PADDLE_HEIGHT: 20,

  //"AI":
  ENEMY_PRECISION: 0.4,

  //Palette:
  PRIMARY_COLOR: "#DEDEDE",
  CONTRAST_COLOR: "#343434",

  // Fonts:
  DEBUG_FONTS: "20px Poppins, sans-serif",
};

const player = new Player(120, 20, CTE.PRIMARY_COLOR);
const ball = new Ball(8, "#DEDEDE");
const enemy = new Enemy(120, 20, CTE.PRIMARY_COLOR, 0.4);

function move() {
  if (ball.colideWith(player)) {
    let distFromCenter = player.getDistanceFromCenter(ball.getPositionX());
    let paddleSliceSize = player.getWidth() / 6;
    let escapeSpeed =
      distFromCenter >= 0
        ? Math.ceil(distFromCenter / paddleSliceSize)
        : Math.floor(distFromCenter / paddleSliceSize);

    ball.setSpeedY(ball.getSpeedY() * -1);
    ball.setSpeedX((7 + Math.abs(escapeSpeed)) * Math.sign(escapeSpeed));
  }

  if (ball.colideWith(enemy)) {
    ball.setSpeedY(ball.getSpeedY() * -1);
  }

  ball.update();
  enemy.update(ball.getPositionX());
}

// --- GAME AUXILIAR FUNCTIONS -------------------------------- //
function drawClassicPongField() {
  canvasContext.fillStyle = CTE.CONTRAST_COLOR;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.beginPath();
  canvasContext.setLineDash([CTE.CANVAS_WIDTH / 20]);
  canvasContext.moveTo(10, CTE.CANVAS_HEIGHT / 2 + 5);
  canvasContext.lineTo(CTE.CANVAS_WIDTH, CTE.CANVAS_HEIGHT / 2 + 5);

  canvasContext.strokeStyle = CTE.PRIMARY_COLOR;
  canvasContext.lineWidth = 10;

  canvasContext.stroke();
}

function drawPoints() {
  canvasContext.fillStyle = CTE.PRIMARY_COLOR;
  canvasContext.font = "bold 80px Courier New";

  canvasContext.fillText("1", 10, 70);
  canvasContext.fillText("1", CTE.CANVAS_WIDTH - 55, CTE.CANVAS_HEIGHT - 20);
}

// --- GAME MAIN FUNCTIONS ------------------------------------ //

function draw() {
  drawClassicPongField();
  drawPoints();

  ball.render(canvasContext);
  player.render(canvasContext);
  enemy.render(canvasContext);
}

function debug() {
  canvasContext.fillStyle = "#DEDEDE";
  canvasContext.font = "20px Poppins, sans-serif";
  canvasContext.fillText(`BallSpdX: ${ball.getSpeedX()}`, 10, 20);
  canvasContext.fillText(`BallSpdY: ${ball.getSpeedY()}`, 10, 40);
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  player.init(canvas.width / 2 - 75, canvas.height - 50, 20, 0, canvas);
  enemy.init(canvas.width / 2 - enemy.getWidth() / 2, 50, 20, 0);
  ball.init(canvas.width / 2, canvas.height / 2, 7, 7);

  setInterval(() => {
    move();
    draw();
    CTE.DEBUG && debug();
  }, 1000 / CTE.FPS);
};
