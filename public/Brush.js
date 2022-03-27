class Fibre {
    constructor(buffer, colorObject, brushStartX, brushStartY, brushStopX, brushStrokeSize, angle) {
        this.curveTightness = 3;  // shape of curve, between 0 and 5; little effect
        this.colorNoise = 10;
        this.brightnessNoise = 20;
        this.strokeSizeNoise = 0.2;
        this.startXNoise = 5;  // start earlier or later
        this.yNoise = 2;
        this.rotationNoise = PI / 50;

        this.baseColor = colorObject;
        this.brushStrokeSize = brushStrokeSize;  // default value
        this.startY = brushStartY;
        this.buffer = buffer;
        this.angle = angle;

        this.posMiddleY = getRandomFromInterval(-this.yNoise, this.yNoise);
        this.sizeStroke = brushStrokeSize + getRandomFromInterval(-this.strokeSizeNoise, this.strokeSizeNoise);  // size of fibre
        this.startX = brushStartX + getRandomFromInterval(-this.startXNoise, this.startXNoise);  // // where the fibre starts
        this.stopX = brushStopX + getRandomFromInterval(-this.startXNoise, this.startXNoise);  // where the fibre stops
        this.colorFibre = brightenColor(distortColor(color(this.baseColor), this.colorNoise), this.brightnessNoise)
        this.angleFibre = this.angle + getRandomFromInterval(-this.rotationNoise, this.rotationNoise);
    }

    show(i) {

        this.buffer.push();
        this.buffer.translate(this.startX, this.startY)
        this.buffer.rotate(this.angleFibre);
        this.buffer.noFill();
        this.buffer.curveTightness(this.curveTightness);
        this.buffer.stroke(this.colorFibre);
        this.buffer.strokeWeight(this.sizeStroke);

        this.buffer.beginShape();
        this.buffer.curveVertex(0, this.brushStrokeSize * i);
        this.buffer.curveVertex(0, this.brushStrokeSize * i);
        // middle
        this.buffer.curveVertex((this.stopX - this.startX) / 2, this.posMiddleY + this.brushStrokeSize * i);
        // end
        this.buffer.curveVertex((this.stopX - this.startX), this.brushStrokeSize * i);
        this.buffer.curveVertex((this.stopX - this.startX), this.brushStrokeSize * i);
        this.buffer.endShape();
        this.buffer.pop();
    }
}

class Brush {
    constructor(buffer, colorObject, posX, posY, widthX, sizeStroke, numberFibres) {
        this.angleNoise = PI / 30;

        this.brushStartX = posX;
        this.brushStopX = posX + widthX;
        this.brushStartY = posY;
        this.sizeStroke = sizeStroke;
        this.buffer = buffer;
        this.numberFibres = numberFibres;

        this.fibres = []
        this.angle = getRandomFromInterval(-this.angleNoise, this.angleNoise)

        for (var i = 0; i < this.numberFibres; i++) {
            this.fibres.push(new Fibre(
                this.buffer,
                colorObject,
                this.brushStartX,
                this.brushStartY,
                this.brushStopX,
                this.sizeStroke,
                this.angle
            ));
        }

    }

    show() {
        for (var i = 0; i < this.fibres.length; i++) {
            this.fibres[i].show(i);
        }
    }
}

class PaintBrushArea {
    // has an overlap with some brushstrokes additional to the specified width and height

    constructor(custom_width, custom_height, colorObject) {
        this.NumberBrushStrokes = 150;
        this.brushLength = 50;  // default
        this.sizeStroke = 1.5;
        this.numberFibres = 15;  // default
        this.overlap = 30;  // adding to desired size

        this.brightnessNoise = 30;
        this.colorNoise = 5;
        this.brushLengthNoise = 0.2;
        this.numberFibresNoise = 0.2;

        this.colorObject = colorObject;  // default color

        this.buffer = createGraphics(custom_width + this.overlap, custom_height + this.overlap);
        this.brushStrokes = [];

        for (var i = 0; i < this.NumberBrushStrokes; i++) {
            var colorBrush = brightenColor(distortColor(color(this.colorObject), this.colorNoise), this.brightnessNoise)
            var brushLength_ = this.brushLength + getRandomFromInterval(-this.brushLength * this.brushLengthNoise, this.brushLength * this.brushLengthNoise);
            var numberFibres_ = this.numberFibres + getRandomFromInterval(-this.numberFibres * this.numberFibresNoise, this.numberFibres * this.numberFibresNoise);

            // positioning
            if (fxrand() > 0.95) {
                var posX = getRandomFromInterval(0, this.buffer.width - brushLength_);
                var posY = getRandomFromInterval(0, this.buffer.height - numberFibres_ * this.sizeStroke);
            } else {
                var posX = getRandomFromInterval(this.overlap, this.buffer.width - this.overlap - brushLength_);
                var posY = getRandomFromInterval(this.overlap, this.buffer.height - this.overlap - numberFibres_ * this.sizeStroke);
            }

            this.brushStrokes.push(new Brush(this.buffer, colorBrush, posX, posY, brushLength_, this.sizeStroke, numberFibres_));
        }
    }

    show() {
        for (var brushtroke of this.brushStrokes) {
            brushtroke.show();
        }

        return this.buffer;
    }
}