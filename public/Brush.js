class Fibre {
    constructor(brushStartX, brushStartY, brushStopX, brushStrokeSize) {
        this.startXNoise = 5;
        this.startY = brushStartY;
        this.brushStrokeSize = brushStrokeSize;  // default value

        this.curveTightness = 3;
        // this.baseColor = "#ed4f3e";
        this.baseColor = color2;
        this.colorNoise = 20;
        this.brightnessNoise = 30;
        this.strokeSizeNoise = 0.2;
        this.yNoise = 2;

        this.posMiddleY = this.startY + getRandomFromInterval(-this.yNoise, this.yNoise);
        this.sizeStroke = brushStrokeSize + getRandomFromInterval(-this.strokeSizeNoise, this.strokeSizeNoise);
        this.startX = brushStartX + getRandomFromInterval(-this.startXNoise, this.startXNoise);
        this.stopX = brushStopX + getRandomFromInterval(-this.startXNoise, this.startXNoise);
        this.colorFibre = brightenColor(distortColor(color(this.baseColor), this.colorNoise), this.brightnessNoise)
    }

    show(i) {

        noFill();
        curveTightness(this.curveTightness);
        stroke(this.colorFibre);
        strokeWeight(this.sizeStroke);

        beginShape();
        curveVertex(this.startX, this.startY + this.brushStrokeSize * i);
        curveVertex(this.startX, this.startY + this.brushStrokeSize * i);
        // middle
        curveVertex(this.startX + (this.stopX - this.startX) / 2, this.posMiddleY + this.brushStrokeSize * i);
        // end
        curveVertex(this.stopX, this.startY + this.brushStrokeSize * i);
        curveVertex(this.stopX, this.startY + this.brushStrokeSize * i);
        endShape();
    }
}

class Brush {
    constructor() {
        this.brushStartX = 40;
        this.brushStartY = 60;
        this.brushStopX = 160;
        // this.brushStartY = 60;

        this.sizeStroke = 1.5;

        this.fibresAmount = 30;
        this.fibres = []

        for (var i = 0; i < this.fibresAmount; i++) {
            this.fibres.push(new Fibre(
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
