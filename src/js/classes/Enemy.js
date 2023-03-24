import { Entity } from "./entity.js";

class Enemy extends Entity {
    #precision;
    constructor(width, height, color, precision) {
        super(width, height, color);
        this.#precision = precision;
    }

    #getRandomWithin(min, max) {
        return Math.random() * (max - min) + min;
    }

    init(posX, posY, spdX, spdY) {
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

    update(ballPosition) {
        if (this.#getRandomWithin(0, 1) >= this.getPrecision()) return;

        if (ballPosition > this.getPositionX() + this.getWidth()/2) {
            this.setPositionX(this.getPositionX() + this.getSpeedX());
            if(this.getPositionX() >= 400 - this.getWidth()) {
                this.setPositionX(400 - this.getWidth())
            }
        } else if(ballPosition < this.getPositionX() + this.getWidth()/2) {
            this.setPositionX(this.getPositionX() - this.getSpeedX());
            if (this.getPositionX() <= 0) {
                this.setPositionX(0);
            }
        }
    }

    getPrecision() {
        return this.#precision;
    }

    setPrecision(precision) {
        this.#precision = precision;
    }
}

export { Enemy }