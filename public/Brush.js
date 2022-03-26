class Fibre {
    constructor(buffer, brushStartX, brushStartY, brushStopX, brushStrokeSize) {
        this.startXNoise = 5;

        this.curveTightness = 3;
        // this.baseColor = "#ed4f3e";
        this.baseColor = color2;
        this.colorNoise = 20;
        this.brightnessNoise = 30;
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
    constructor(buffer, posX, posY, width, sizeStroke, numberFibres) {
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
    constructor(custom_width, custom_height) {
        this.NumberBrushStrokes = 150;
        this.brushLength = 50;
        this.sizeStroke = 1.5;
        this.numberFibres = 30;

        this.overlap = 20;


        this.buffer = createGraphics(custom_width, custom_height);

        this.brushStrokes = [];

        for (var i = 0; i < this.NumberBrushStrokes; i++) {
            var posX = getRandomFromInterval(-this.overlap, this.buffer.width + this.overlap);
            var posY = getRandomFromInterval(-this.overlap, this.buffer.height + this.overlap);
            this.brushStrokes.push(new Brush(this.buffer, posX, posY, this.brushLength, this.sizeStroke, this.numberFibres));
        }
    }

    show() {
        for (var brushtroke of this.brushStrokes) {
            brushtroke.show();
        }

        return this.buffer;
    }
}