import { Entity } from './entity.js';

class Ball extends Entity {
    #radius;

    constructor(radius, color) {
        super(2 * radius, 2 * radius, color);
        this.#radius = radius;
    }

    colideWith(entity) {
        let colideVert =
            this.getPositionY() + this.getSpeedY() >= entity.getPositionY();
        
        let colideHor =
            this.getPositionX() + this.getSpeedX() >= entity.getPositionX() &&
            this.getPositionX() + this.getSpeedX() <= entity.getPositionX() + entity.getWidth();
        
        if (colideVert && colideHor) return true;
        return false;
      }

    init(posX, posY, spdX, spdY) {
        this.setPositionX(posX);
        this.setPositionY(posY);
        this.setSpeedX(spdX);
        this.setSpeedY(spdY);
    }

    render(context) {
        context.fillStyle = this.getColor();
        context.beginPath();
        context.arc(
            this.getPositionX(),
            this.getPositionY(),
            this.getRadius(),
            0, Math.PI * 2, true
        )
        context.fill();
    }

    update() {
        this.setPositionX(this.getPositionX() + this.getSpeedX());
        this.setPositionY(this.getPositionY() + this.getSpeedY());
        
        if (this.getPositionX() >= 400 || this.getPositionX() <= 0) {
            this.setSpeedX(this.getSpeedX() * -1);
        }

        if (this.getPositionY() >= 600 || this.getPositionY() <= 0) {
            this.setSpeedY(this.getSpeedY() * -1);
        }
    }

    getRadius() {
        return this.#radius;
    }
}

export { Ball };