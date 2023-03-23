import { Ball } from "./js/classes/ball.js";
import { Player } from "./js/classes/player.js";

let canvas, canvasContext;

const player = new Player(120, 20, "#6E3EFA");
const ball = new Ball(8, '#DEDEDE');

function move() {
    if(ball.colideWith(player)) {
		ball.setSpeedY(ball.getSpeedY() * -1)
		if (player.getDirection() > 0) {
			ball.setSpeedX(Math.abs(ball.getSpeedX()))
		} else if(player.getDirection() < 0) {
			ball.setSpeedX(Math.abs(ball.getSpeedX())*-1)
		}
    } 
    ball.update();
}

function draw() {
	canvasContext.fillStyle = "#333";
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	ball.render(canvasContext);
	player.render(canvasContext);
}

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	
	player.init(canvas.width / 2 - 75, canvas.height - 50, 20, 0, canvas);
	ball.init(canvas.width / 2, canvas.height / 2, 10, 10);
	
	let FPS = 30;
	setInterval(() => {
	  move();
	  draw();
	}, 1000 / FPS);
};
