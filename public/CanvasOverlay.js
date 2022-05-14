class CanvasOverlay {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                custom_width: width,
                custom_height: height,
                posX: -width / 2,
                posY: -height / 2,
                colorObject: color(100),
            }
        }

        this.custom_width = data.custom_width;
        this.custom_height = data.custom_height;
        this.posX = data.posX;
        this.posY = data.posY;
        this.colorObject = data.colorObject;

        this.opacity = 80;
        var maxCell = 300 * SCALING_FACTOR;  // amount of cells per line
        this.strokeWeight_ = 1 * SCALING_FACTOR;
        // this.colorUsed = brightenColor(color(this.colorObject, this.opacity), -20);
        this.colorUsed = this.colorObject;
        this.deviation = 0.3 * SCALING_FACTOR;

        this.cell = maxCell;
        this.scl = this.custom_width / this.cell;
    }

    show() {
        push();
        translate(this.posX, this.posY);
        strokeWeight(this.strokeWeight_);
        stroke(this.colorUsed);
        for (let x = 0; x < this.custom_width; x += this.scl) {
            for (let y = 0; y < this.custom_height; y += this.scl) {
                strokeWeight(this.strokeWeight_);
                stroke(this.colorUsed);
                point(x + getRandomFromInterval(-this.deviation, this.deviation), y + getRandomFromInterval(-this.deviation, this.deviation));
            }
        }
        pop();
    }
}