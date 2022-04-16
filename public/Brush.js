class Fibre {
    constructor(buffer, colorObject, brushStartX, brushStartY, brushStopX, brushStrokeSize, angle, data) {
        this.data = data
        this.fibreCurveTightness = data.fibreCurveTightness;  // shape of curve, between 0 and 5; little effect
        this.fibreColorNoise = data.fibreColorNoise;
        this.fibreBrightnessNoise = data.fibreBrightnessNoise;
        this.fibreStrokeSizeNoise = data.fibreStrokeSizeNoise;
        this.fibreStartXNoise = data.fibreStartXNoise;  // start earlier or later
        this.fibreYNoise = data.fibreYNoise;  // noise of fibre along the y axis in the middle
        this.fibreRotationNoise = data.fibreRotationNoise;

        this.complete = false;
        this.baseColor = colorObject;
        this.brushStrokeSize = brushStrokeSize;  // default value
        this.startY = brushStartY;
        this.buffer = buffer;
        this.angle = angle;

        this.posMiddleY = getRandomFromInterval(-this.fibreYNoise, this.fibreYNoise);
        this.sizeStroke = brushStrokeSize + getRandomFromInterval(-this.fibreStrokeSizeNoise, this.fibreStrokeSizeNoise);  // size of fibre
        this.startX = brushStartX + getRandomFromInterval(-this.fibreStartXNoise, this.fibreStartXNoise);  // // where the fibre starts
        this.stopX = brushStopX + getRandomFromInterval(-this.fibreStartXNoise, this.fibreStartXNoise);  // where the fibre stops
        this.colorFibre = brightenColor(distortColor(color(this.baseColor), this.fibreColorNoise), this.fibreBrightnessNoise)
        this.angleFibre = this.angle + getRandomFromInterval(-this.fibreRotationNoise, this.fibreRotationNoise);
    }

    show(i) {

        if (this.complete == false) {
            this.buffer.push();
            this.buffer.translate(this.startX, this.startY)
            this.buffer.rotate(this.angleFibre);
            this.buffer.noFill();
            this.buffer.curveTightness(this.fibreCurveTightness);
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

            // this.complete = true;
        }
    }
}

class Brush {
    constructor(buffer, colorObject, posX, posY, widthX, sizeStroke, numberFibres, angleNoise, data) {
        this.data = data
        this.angleNoise = angleNoise;

        this.brushStartX = posX;
        this.brushStopX = posX + widthX;
        this.brushStartY = posY;
        this.sizeStroke = sizeStroke;
        this.buffer = buffer;
        this.numberFibres = numberFibres;

        this.fibres = []
        this.angle = getRandomFromInterval(-this.angleNoise, this.angleNoise)
        this.complete = false;

        for (var i = 0; i < this.numberFibres; i++) {
            this.fibres.push(new Fibre(
                this.buffer,
                colorObject,
                this.brushStartX,
                this.brushStartY,
                this.brushStopX,
                this.sizeStroke,
                this.angle,
                this.data
            ));
        }

    }

    show() {
        if (this.complete == false) {

            for (var i = 0; i < this.fibres.length; i++) {
                this.fibres[i].show(i);
            }

            this.complete = true;
        }
    }
}

class PaintBrushArea {
    // has an overlap with some brushstrokes additional to the specified width and height

    constructor(data) {
        this.data = data;
        this.posX = data.posX;
        this.posY = data.posY;
        this.brushLength = data.brushLength;  // default
        this.sizeStroke = data.sizeStroke;
        this.numberFibres = data.numberFibres;  // default
        this.numberBrushes = data.numberBrushes;
        this.overlap = data.overlap;

        this.brightnessNoise = data.brightnessNoise;
        this.colorNoise = data.colorNoise;
        this.opacityBoost = data.opacityBoost;
        this.brushLengthNoise = data.brushLengthNoise;
        this.numberFibresNoise = data.numberFibresNoise;
        this.angleNoise = data.angleNoise;

        this.colorObject = color(data.colorObject);  // default color

        this.buffer = createGraphics(data.custom_width + this.overlap * 2, data.custom_height + this.overlap * 2);
        this.area = data.custom_width * data.custom_height;  // without overlap
        this.NumberBrushStrokes = floor(this.area / (this.numberFibres * this.brushLength * this.sizeStroke)) * this.numberBrushes;

        this.brushStrokes = [];

        for (var i = 0; i < this.NumberBrushStrokes; i++) {
            var colorBrush = lessenColor(brightenColor(distortColor(color(this.colorObject), this.colorNoise), this.brightnessNoise), this.opacityBoost);
            var brushLength_ = this.brushLength + getRandomFromInterval(-this.brushLength * this.brushLengthNoise, this.brushLength * this.brushLengthNoise);
            var numberFibres_ = this.numberFibres + getRandomFromInterval(-this.numberFibres * this.numberFibresNoise, this.numberFibres * this.numberFibresNoise);

            // positioning
            if (fxrand() > 1) {
                // var posX = getRandomFromInterval(0, this.buffer.width - brushLength_);
                // var posY = getRandomFromInterval(0, this.buffer.height - numberFibres_ * this.sizeStroke);
                var posX = getRandomFromInterval(0, this.buffer.width);
                var posY = getRandomFromInterval(0, this.buffer.height);
            } else {
                var posX = getRandomFromInterval(this.overlap, this.buffer.width - this.overlap - brushLength_);
                var posY = getRandomFromInterval(this.overlap, this.buffer.height - this.overlap - numberFibres_ * this.sizeStroke);
                // var posX = getRandomFromInterval(this.overlap, this.buffer.width - this.overlap);
                // var posY = getRandomFromInterval(this.overlap, this.buffer.height - this.overlap);
            }

            this.brushStrokes.push(new Brush(this.buffer, colorBrush, posX, posY, brushLength_, this.sizeStroke, numberFibres_, this.angleNoise, this.data));
        }
    }

    show() {

        // debug
        this.buffer.push();
        this.buffer.fill(100);
        this.buffer.rect(0, 0, this.buffer.width, this.buffer.height);
        this.buffer.pop();

        for (var brushtroke of this.brushStrokes) {
            brushtroke.show();
        }

        return this.buffer;
    }
}

