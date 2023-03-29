import { Ball } from "./js/classes/ball.js";
import { Player } from "./js/classes/player.js";
import { Enemy } from "./js/classes/enemy.js";

let canvas, canvasContext;

const CTE = {
  //General:
  DEBUG: false,
  FPS: 60,

  // Canvas:
  CANVAS_WIDTH: 400,
  CANVAS_HEIGHT: 600,

  // Paddle:
  PADDLE_WIDTH: 120,
  PADDLE_HEIGHT: 20,

  //"AI":
  ENEMY_PRECISION: 0.4,

  //Palette:
  PRIMARY_COLOR: "#6E3EFA",
  SECONDARY_COLOR: "#DEDEDE",
  CONTRAST_COLOR: "#343434",

  // Fonts:
  DEBUG_FONTS: "20px Poppins, sans-serif",
};

const player = new Player(120, 20, "#6E3EFA");
const ball = new Ball(8, "#DEDEDE");
const enemy = new Enemy(120, 20, "#6E3EFA", 0.4);

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

function draw() {
  canvasContext.fillStyle = "#333";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

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

  let FPS = 60;
  setInterval(() => {
    move();
    draw();
    CTE.DEBUG && debug();
  }, 1000 / FPS);
};
