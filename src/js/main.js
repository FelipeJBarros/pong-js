// TODO: Melhoria ~ Muitos números mágicos

let canvas, canvasContext;

class Ball {
  position;
  speed;
  size = 15;

  constructor(posX, posY, generalSpeed) {
    this.position = { x: posX, y: posY };
    this.speed = {x: generalSpeed, y: generalSpeed };
  }

  render(context) {
    context.fillStyle = "#DEDEDE";
    context.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
    
  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    
    if( this.position.x >= 400 || this.position.x <= 0) {
        this.speed.x *= -1;
    }
      
    if( this.position.y >= 600 || this.position.y <= 0) {
        this.speed.y *= -1;
    }
  }
  
  colideWith(entity) {
    if(
        (this.position.y + this.speed.y >= entity.getPositionY()) &&
        this.position.x + this.speed.x >= entity.getPositionX() &&
        this.position.x + this.speed.x <= entity.getPositionX() + 150
    ) {
        return true;
    }
    return false;
  }
    
  setPositionX(posX) {
    this.position.x = posX;    
  }
    
  setPositionY(posY) {
    this.position.y = posY;    
  }
  
  getSpeedY() {
    return this.speed.y;
  }
  
  setSpeedY(spd) {
    this.speed.y = spd;
  }
}

class Player {
  position;
  speed;

  constructor(posX, posY, generalSpeed) {
    this.position = { x: posX, y: posY };
    this.speed = generalSpeed;
  }

  init() {
    document.onkeydown = event => this.update(event.key);
  }

  render(context) {
    context.fillStyle = "rgb(110,62,250)";
    context.fillRect(this.position.x, this.position.y, 150, 20);
  }

  update(key) {
    switch(key) {
        case 'ArrowRight':
            if (this.position.x + 150 + this.speed > 400) {
                this.position.x = 400 - 150;
            } else {
                this.position.x += this.speed;
            }
            break;
        case 'ArrowLeft':
            if (this.position.x - this.speed >= 0) {
                this.position.x -= this.speed;
            } else {
                this.position.x = 0;
            }
            break;
        default:
            return;
    }
  }
  
  getPositionX() {
    return this.position.x;
  }
  
  setPositionX(posX) {
    this.position.x = posX;
  }

  getPositionY() {
    return this.position.y;  
  }
  
  setPositionY(posY) {
    this.position.y = posY;
  }
}

const player = new Player(0, 0, 15);
const ball = new Ball(0, 0, 8);

function move() {
    ball.update();
    player.update();
}

function draw() {
  canvasContext.fillStyle = "#333";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  if(ball.colideWith(player)) {
    ball.setSpeedY(ball.getSpeedY() * -1)
  }  
  
  ball.render(canvasContext);
  player.render(canvasContext);
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  
  player.init();

  ball.setPositionX(canvas.width / 2);
  ball.setPositionY(canvas.height / 2);
  player.setPositionX(canvas.width / 2 - 75);
  player.setPositionY(canvas.height - 50);
    
  let FPS = 30;
  setInterval(() => {
    move();
    draw();
  }, 1000 / FPS);
};
