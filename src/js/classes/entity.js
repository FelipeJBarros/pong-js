class Entity {
    #position = { x: 0, y: 0 };
    #speed = { x: 0, y: 0};
    #size = { width: 0, height: 0 };
    #color = '#DEDEDE';

    constructor(width, height, color) {
        this.#size.width = width;
        this.#size.height = height;
        this.#color = color;
    }

    // Position getter and setter
    getPositionX() {
        return this.#position.x;
    }

    setPositionX(posX) {
        this.#position.x = posX;
    }

    getPositionY() {
        return this.#position.y;
    }

    setPositionY(posY) {
        this.#position.y = posY;
    }

    // Speed getter and setter
    getSpeedX() {
        return this.#speed.x;
    }

    setSpeedX(spdX) {
        this.#speed.x = spdX;
    }

    getSpeedY() {
        return this.#speed.y;
    }

    setSpeedY(spdY) {
        this.#speed.y = spdY;
    }

    // Size getter and setter
    getWidth() {
        return this.#size.width;
    }

    setWidth(width) {
        this.#size.width = width;
    }
    
    getHeight() {
        return this.#size.height;
    }

    setHeight(height) {
        this.#size.height = height;
    }

    // Color getter and setter
    getColor() {
        return this.#color;
    }
    
    setColor(color) {
        this.#color = color;
    }
}

export default { Entity }