import { Ball } from "./js/classes/ball.js";
import { Player } from "./js/classes/player.js";
import { Enemy } from "./js/classes/enemy.js";

let canvas, canvasContext;

const player = new Player(120, 20, "#6E3EFA");
const ball = new Ball(8, "#DEDEDE");
const enemy = new Enemy(120, 20, "#6E3EFA", 0.4);

function move() {
  if (ball.colideWith(player)) {
    let distFromCenter =
      Math.ceil(
        (ball.getPositionX() -
          (player.getPositionX() + player.getWidth() / 2)) /
          20
      ) * 0.8;

    ball.setSpeedY(ball.getSpeedY() * -1);
    ball.setSpeedX(distFromCenter * 10);
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

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  player.init(canvas.width / 2 - 75, canvas.height - 50, 20, 0, canvas);
  enemy.init(canvas.width / 2 - enemy.getWidth() / 2, 50, 20, 0);
  ball.init(canvas.width / 2, canvas.height / 2, 10, 10);

  let FPS = 60;
  setInterval(() => {
    move();
    draw();
  }, 1000 / FPS);
};
