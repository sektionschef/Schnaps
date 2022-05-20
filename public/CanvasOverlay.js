class CanvasOverlay {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                custom_width: exportPaper.width,
                custom_height: exportPaper.height,
                posX: 0,
                posY: 0,
                colorObject: color(100),
                opacity: 100,
            }
        }

        this.custom_width = data.custom_width;
        this.custom_height = data.custom_height;
        this.posX = data.posX;
        this.posY = data.posY;
        this.colorObject = data.colorObject;
        this.opacity = data.opacity;

        var maxCell = 300;  // amount of cells per line
        this.strokeWeight_ = 0.5;
        // this.colorUsed = brightenColor(color(this.colorObject, this.opacity), -20);
        this.colorUsed = color(red(this.colorObject), green(this.colorObject), blue(this.colorObject), this.opacity);
        this.deviation = 0.3;

        this.cell = maxCell;
        this.scl = this.custom_width / this.cell;
    }

    show() {
        buffer.push();
        buffer.translate(this.posX, this.posY);
        buffer.strokeWeight(this.strokeWeight_);
        buffer.stroke(this.colorUsed);
        for (let x = 0; x < this.custom_width; x += this.scl) {
            for (let y = 0; y < this.custom_height; y += this.scl) {
                // buffer.strokeWeight(this.strokeWeight_);
                // buffer.stroke(this.colorUsed);
                buffer.point(x + getRandomFromInterval(-this.deviation, this.deviation), y + getRandomFromInterval(-this.deviation, this.deviation));
            }
        }
        buffer.pop();
    }
}