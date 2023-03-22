import Entity from './entity';

class Ball extends Entity {
    constructor(width, height, color) {
        super(width, height, color);
    }

    render(context) {
        context.fillStyle = this.getColor();
        context.fillRect(
            this.getPositionX(),
            this.getPositionY(),
            this.getWidth(),
            this.getHeight(),
        );
    }

    update() {
        this.setPositionX(this.getPositionX() + this.getSpeedX());
        this.setPositionY(this.getPositionY() + this.getSpeedY());
        
        if (this.getPositionX() > 400 || this.getPositionY() <= 0) {
            this.setSpeedX(this.getSpeedX() * -1);
        }

        if (this.getPositionY() >= 600 || this.getPositionY() <= 0) {
            this.setSpeedY(this.getSpeedY() * -1);
        }
    }
}

export default Ball;