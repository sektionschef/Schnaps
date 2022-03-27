class Fibre {
    constructor(buffer, colorObject, brushStartX, brushStartY, brushStopX, brushStrokeSize) {
        this.startXNoise = 5;

        this.curveTightness = 3;
        // this.baseColor = "#ed4f3e";
        this.baseColor = colorObject;
        this.colorNoise = 10;
        this.brightnessNoise = 10;
        this.strokeSizeNoise = 0.2;
        this.yNoise = 2;

        this.brushStrokeSize = brushStrokeSize;  // default value
        this.startY = brushStartY;
        this.buffer = buffer;

        this.posMiddleY = this.startY + getRandomFromInterval(-this.yNoise, this.yNoise);
        this.sizeStroke = brushStrokeSize + getRandomFromInterval(-this.strokeSizeNoise, this.strokeSizeNoise);
        this.startX = brushStartX + getRandomFromInterval(-this.startXNoise, this.startXNoise);
        this.stopX = brushStopX + getRandomFromInterval(-this.startXNoise, this.startXNoise);
        this.colorFibre = brightenColor(distortColor(color(this.baseColor), this.colorNoise), this.brightnessNoise)
    }

    show(i) {

        this.buffer.push();
        this.buffer.noFill();
        this.buffer.curveTightness(this.curveTightness);
        this.buffer.stroke(this.colorFibre);
        this.buffer.strokeWeight(this.sizeStroke);

        this.buffer.beginShape();
        this.buffer.curveVertex(this.startX, this.startY + this.brushStrokeSize * i);
        this.buffer.curveVertex(this.startX, this.startY + this.brushStrokeSize * i);
        // middle
        this.buffer.curveVertex(this.startX + (this.stopX - this.startX) / 2, this.posMiddleY + this.brushStrokeSize * i);
        // end
        this.buffer.curveVertex(this.stopX, this.startY + this.brushStrokeSize * i);
        this.buffer.curveVertex(this.stopX, this.startY + this.brushStrokeSize * i);
        this.buffer.endShape();
        this.buffer.pop();
    }
}

class Brush {
    constructor(buffer, colorObject, posX, posY, width, sizeStroke, numberFibres) {
        this.brushStartX = posX;
        this.brushStopX = posX + width;
        this.brushStartY = posY;

        this.sizeStroke = sizeStroke;
        this.buffer = buffer;

        this.numberFibres = numberFibres;
        this.fibres = []

        for (var i = 0; i < this.numberFibres; i++) {
            this.fibres.push(new Fibre(
                this.buffer,
                colorObject,
                this.brushStartX,
                this.brushStartY,
                this.brushStopX,
                this.sizeStroke
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
    // different color per brush
    // overlap 
    // noch mehr random, wie bei length

    constructor(custom_width, custom_height, colorObject) {
        this.colorObject = colorObject;
        this.NumberBrushStrokes = 150;  //area and some rest
        this.brushLength = 50;  // default
        this.sizeStroke = 1.5;
        this.numberFibres = 15;  // default
        this.overlap = 20;  // adding to desired size

        this.brightnessNoise = 30;
        this.colorNoise = 10;
        this.brushLengthNoise = 0.2;
        this.numberFibresNoise = 0.2;

        this.buffer = createGraphics(custom_width + this.overlap, custom_height + this.overlap);

        this.brushStrokes = [];

        for (var i = 0; i < this.NumberBrushStrokes; i++) {
            var colorBrush = brightenColor(distortColor(color(this.colorObject), this.colorNoise), this.brightnessNoise)
            var brushLength_ = this.brushLength + getRandomFromInterval(-this.brushLength * this.brushLengthNoise, this.brushLength * this.brushLengthNoise);
            var numberFibres_ = this.numberFibres + getRandomFromInterval(-this.numberFibres * this.numberFibresNoise, this.numberFibres * this.numberFibresNoise);

            if (fxrand() > 0.95) {
                var posX = getRandomFromInterval(0, this.buffer.width + this.overlap - brushLength_);
                var posY = getRandomFromInterval(0, this.buffer.height + this.overlap - numberFibres_ * this.sizeStroke);
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