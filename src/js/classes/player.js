import { Entity } from "./entity.js";

class Player extends Entity {
  constructor(width, height, color) {
    super(width, height, color);
  }

  #setMouseListener(canvas) {
    canvas.addEventListener("mousemove", (event) => {
      let rect = canvas.getBoundingClientRect();
      let root = document.documentElement;

      this.update(event.clientX - rect.left - root.scrollLeft);
    });
  }

  getDistanceFromCenter(position) {
    return position - (this.getPositionX() + this.getWidth() / 2);
  }

  init(posX, posY, spdX, spdY, canvas) {
    this.#setMouseListener(canvas);
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

  update(mousePositionX) {
    if (mousePositionX === undefined) return;

    if (mousePositionX >= 400 - this.getWidth() / 2) {
      this.setPositionX(400 - this.getWidth());
    } else if (mousePositionX <= this.getWidth() / 2) {
      this.setPositionX(0);
    } else {
      this.setPositionX(mousePositionX - this.getWidth() / 2);
    }
  }
}

export { Player };
