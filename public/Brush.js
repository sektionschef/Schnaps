class Fibre {
    constructor() {
        this.startX = 40;
        this.startY = 60;
        this.sizeStroke = 5;
        this.curveTightness = 5;
        this.baseColor = "#ed4f3e";
        this.colorNoise = 30;

        this.colorFibre = distortColor(color(this.baseColor), this.colorNoise)
    }

    show(i) {

        noFill();
        curveTightness(this.curveTightness);
        stroke(this.colorFibre);
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

class Brush {
    constructor() {

        this.fibresAmount = 30;

        this.fibres = []

        for (var i = 0; i < this.fibresAmount; i++) {
            this.fibres.push(new Fibre());
        }

    }

    show() {
        for (var i = 0; i < this.fibres.length; i++) {
            this.fibres[i].show(i);
        }
    }
}
