import { Entity } from './entity.js';

class Player extends Entity {
    constructor(width, height, color) {
        super(width, height, color);
    }

    #setKeyboardListener() {
        document.onkeydown = event => this.update(event.key);
    }

    init(posX, posY, spdX, spdY) {
        this.#setKeyboardListener();
        this.setPositionX(posX);
        this.setPositionY(posY);
        this.setSpeedX(spdX);
        this.setSpeedY(spdY);
    }

    render(context) {
      context.fillStyle = this.getColor();
      context.fillRect(
        this.getPositionX(),
        this.getPositionY(),
        this.getWidth(),
        this.getHeight()
      );
    }

    update(key) {
      switch(key) {
          case 'ArrowRight':
              let playerPosition = this.getPositionX() + this.getWidth(); 
              if (playerPosition + this.getSpeedX() > 400) {
                  this.setPositionX(400 - this.getWidth());
              } else {
                  this.setPositionX(this.getPositionX() + this.getSpeedX());
              }
              break;
          case 'ArrowLeft':
              if (this.getPositionX() - this.getSpeedX() >= 0) {
                  this.setPositionX(this.getPositionX() - this.getSpeedX());
              } else {
                  this.setPositionX(0);
              }
              break;
          default:
              return;
      }
    }
}

export { Player }