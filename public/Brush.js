class Brush {
    constructor() {

        this.startX = 40;
        this.startY = 60;
        this.sizeStroke = 5;
        this.linesAmount = 30;
        this.curveTightness = 5;
        this.baseColor = "#ed4f3e";
        this.colorNoise = 30;

    }

    show() {
        noFill();
        curveTightness(this.curveTightness);

        for (var i = 0; i < this.linesAmount; i++) {

            stroke(distortColor(color(this.baseColor), this.colorNoise));
            strokeWeight(this.sizeStroke);
            beginShape();
            curveVertex(this.startX, this.startY + this.sizeStroke * i);
            curveVertex(this.startX, this.startY + this.sizeStroke * i);
            curveVertex(80, this.startY + this.sizeStroke * i);
            curveVertex(160, this.startY + this.sizeStroke * i);
            curveVertex(160, this.startY + this.sizeStroke * i);
            endShape();
        }
    }
}
