class Fibre {
    constructor(brushStartX, brushStartY, brushStopX) {
        this.startXNoise = 5;
        this.startY = brushStartY;

        this.sizeStroke = 1.5;
        this.curveTightness = 5;
        this.baseColor = "#ed4f3e";
        this.colorNoise = 20;
        this.brightnessNoise = 50;

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
        curveVertex(this.startX, this.startY + this.sizeStroke * i);
        curveVertex(this.startX, this.startY + this.sizeStroke * i);
        // curveVertex(80, this.startY + this.sizeStroke * i);
        curveVertex(this.stopX, this.startY + this.sizeStroke * i);
        curveVertex(this.stopX, this.startY + this.sizeStroke * i);
        endShape();
    }
}

class Brush {
    constructor() {
        this.brushStartX = 40;
        this.brushStartY = 60;
        this.brushStopX = 160;
        // this.brushStartY = 60;

        this.fibresAmount = 30;
        this.fibres = []

        for (var i = 0; i < this.fibresAmount; i++) {
            this.fibres.push(new Fibre(this.brushStartX, this.brushStartY, this.brushStopX));
        }

    }

    show() {
        for (var i = 0; i < this.fibres.length; i++) {
            this.fibres[i].show(i);
        }
    }
}
