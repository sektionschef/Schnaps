class Fibre {
    constructor(data) {
        this.data = data;

        this.complete = false;

        this.posMiddle = getRandomFromInterval(-this.fibreBreadthNoise, this.fibreBreadthNoise);
        this.sizeStrokeFibre = this.sizeStroke + getRandomFromInterval(-this.fibreStrokeSizeNoise, this.fibreStrokeSizeNoise);  // size of fibre
        this.startX = this.brushPosX - this.fibreStartLengthNoise + noise(this.index / 100) * this.fibreStartLengthNoise;  // // where the fibre starts    
        this.startY = this.brushPosY - this.fibreStartLengthNoise + noise(this.index / 100) * this.fibreStartLengthNoise;  // // where the fibre starts
        this.stop = this.brushLength_ - this.fibreStartLengthNoise + noise(this.index / 100) * this.fibreStartLengthNoise;  // where the fibre stops
        // remove the noise before adding the noise of Perlin

        if (fxrand() < 0.75) {
            this.colorFibre = brightenColor(distortColor(color(this.colorBrush), this.fibreColorNoise), this.fibreBrightnessNoise)
        } else {
            this.colorFibre = brightenColor(distortColor(color(this.colorBrush), this.fibreColorNoise * 3), this.fibreBrightnessNoise * 3)
        }
        this.angleFibre = this.angle + getRandomFromInterval(-this.fibreRotationNoise, this.fibreRotationNoise);
    }

    show(i) {


        // push();
        // noFill();
        // beginShape();
        // curveVertex(84 + i * this.sizeStroke, 91 + i * this.sizeStroke, 0);
        // curveVertex(84 + i * this.sizeStroke, 91 + i * this.sizeStroke, 0);
        // curveVertex(68, 19, 0);
        // curveVertex(21, 17, 0);
        // curveVertex(32, 91, 0);
        // curveVertex(32, 91, 0);
        // endShape();
        // pop();

        // if (this.complete == false) {
        push();
        if (this.orientation == "horizontal") {
            translate(this.startX, this.brushPosY);
            // translate(this.startX * SCALING_FACTOR - (this.custom_width / 2) * SCALING_FACTOR, this.brushPosY * SCALING_FACTOR - (this.custom_height / 2) * SCALING_FACTOR);
            rotate(this.angleFibre);
        } else if (this.orientation == "vertical") {
            translate(this.brushPosX, this.startY)
            rotate(this.angleFibre / PI / 2);
        }
        curveTightness(this.fibreCurveTightness);
        stroke(this.colorFibre);
        strokeWeight(this.sizeStrokeFibre);
        noFill();

        // fill(50);
        // translate(this.posX * SCALING_FACTOR - this.custom_width / 2 * SCALING_FACTOR, this.posY * SCALING_FACTOR - this.custom_height / 2 * SCALING_FACTOR);
        // rect(0, 0, 30, 30);

        // strokeWeight(10)

        beginShape();
        if (this.orientation == "horizontal") {
            curveVertex(0, this.sizeStroke * i, 0);
            curveVertex(0, this.sizeStroke * i, 0);
        } else if (this.orientation == "vertical") {
            curveVertex(this.sizeStroke * i, 0, 0);
            curveVertex(this.sizeStroke * i, 0, 0);
        }
        // middle
        if (this.orientation == "horizontal") {
            curveVertex((this.stop - this.startX) / 2, this.posMiddle + this.sizeStroke * i, 0);
        } else if (this.orientation == "vertical") {
            curveVertex(this.posMiddle + this.sizeStroke * i, (this.stop - this.startY) / 2, 0);
        }
        // end
        if (this.orientation == "horizontal") {
            curveVertex((this.stop - this.startX), this.sizeStroke * i, 0);
            curveVertex((this.stop - this.startX), this.sizeStroke * i, 0);
        } else if (this.orientation == "vertical") {
            curveVertex(this.sizeStroke * i, (this.stop - this.startY), 0);
            curveVertex(this.sizeStroke * i, (this.stop - this.startY), 0);
        }
        endShape();

        pop();

        // this.complete = true;
        // }
    }
}

class Brush {
    constructor(data) {
        this.data = data;
        this.fibres = []
        this.complete = false;

        // this.buffer = buffer;
        this.angle = getRandomFromInterval(-this.angleNoise, this.angleNoise);

        if (this.orientation == "horizontal") {
            this.brushStop = this.brushPosX + this.brushLength
            for (var i = 0; i < this.numberFibres; i++) {

                this.index = i
                this.fibres.push(new Fibre(this.data));
            }
        } else if (this.orientation == "vertical") {
            this.brushStop = this.brushPosY + this.brushLength
            for (var i = 0; i < this.numberFibres; i++) {

                this.index = i
                this.fibres.push(new Fibre(this.data));
            }
        }

    }

    show() {
        // if (this.complete == false) {

        for (var i = 0; i < this.fibres.length; i++) {
            this.fibres[i].show(i);
        }

        // this.complete = true;
        // }
    }
}

class PaintBrushArea {
    // has an overlap with some brushstrokes additional to the specified width and height

    constructor(data) {

        if (typeof data === 'undefined') {
            data = {
                custom_width: 200,
                custom_height: 400,
                posX: -100,
                posY: -100,
                colorObject: color1,
                orientation: "horizontal",
                brushLength: 30,  // 20-40
                brushBreadth: 30,
                sizeStroke: 2,
                numberPaintLayers: 2,
                overlap: 20,
                brightnessNoise: 5,
                colorNoise: 5,
                opacityBoost: 0, // getRandomFromInterval(150, 255),
                brushLengthNoise: 0.2,
                numberFibresNoise: 0.2,  // brushBreadthNoise
                angleNoise: PI / 5,
                fibreCurveTightness: 5,  // shape of curve, between 0 and 5; little effect
                fibreColorNoise: 2,
                fibreBrightnessNoise: 2,
                fibreStrokeSizeNoise: 1,
                fibreStartLengthNoise: 5,  // start earlier or later
                fibreBreadthNoise: 0.5,  // noise of fibre along the y axis in the middle
                fibreRotationNoise: PI / 200,
            }
        }

        this.custom_width = data.custom_width;
        this.custom_height = data.custom_height;
        this.posX = data.posX;
        this.posY = data.posY;
        this.colorObject = data.colorObject;
        this.orientation = data.orientation;
        this.brushLength = data.brushLength;
        this.brushBreadth = data.brushBreadth;
        this.sizeStroke = data.sizeStroke;
        this.numberPaintLayers = data.numberPaintLayers;
        this.overlap = data.overlap;
        this.brightnessNoise = data.brightnessNoise;
        this.colorNoise = data.colorNoise;
        this.opacityBoost = data.opacityBoost;
        this.brushLengthNoise = data.brushLengthNoise;
        this.numberFibresNoise = data.numberFibresNoise;
        this.angleNoise = data.angleNoise;
        this.fibreCurveTightness = data.fibreCurveTightness;
        this.fibreColorNoise = data.fibreColorNoise;
        this.fibreBrightnessNoise = data.fibreBrightnessNoise;
        this.fibreStrokeSizeNoise = data.fibreStrokeSizeNoise;
        this.fibreStartLengthNoise = data.fibreStartLengthNoise;
        this.fibreBreadthNoise = data.fibreBreadthNoise
        this.fibreRotationNoise = data.fibreRotationNoise

        // this.data = data;
        this.colorObject = color(data.colorObject);  // default color

        // use existing layer or create new
        // if (typeof buffer == "undefined") {
        //     this.buffer = createGraphics(this.custom_width + this.overlap * 2, this.custom_height + this.overlap * 2);
        // } else {
        //     this.buffer = buffer;
        // }

        this.numberFibres = this.brushBreadth / this.sizeStroke
        this.brushStrokes = [];

        for (let loopLayer = 0; loopLayer < this.numberPaintLayers; loopLayer += 1) {

            // BACKGROUND layer
            let greyRun = false;
            if ((loopLayer == 0) && (this.numberPaintLayers > 1) && (fxrand() > 0)) {
                var backgroundColor = color(100);
                // greyRun = true;
            }

            if (this.orientation == "horizontal") {
                for (let x = this.overlap; x < this.custom_width - 2 * this.overlap; x += this.brushLength) {
                    for (let y = this.overlap; y < this.custom_height - 2 * this.overlap; y += this.brushBreadth) {

                        // DEBUG Rect for grid
                        // push();
                        // noFill();
                        // translate(x, y, 0)
                        // box(this.brushBreadth, this.brushLength, 0);
                        // pop();

                        this.colorBrush = brightenColor(distortColor(color(this.colorObject), this.colorNoise), this.brightnessNoise);
                        this.brushLength_ = this.brushLength + getRandomFromInterval(-this.brushLength * this.brushLengthNoise, this.brushLength * this.brushLengthNoise);
                        this.numberFibres_ = this.numberFibres + getRandomFromInterval(-this.numberFibres * this.numberFibresNoise, this.numberFibres * this.numberFibresNoise);

                        // egg hier nur einmal die new Brush
                        // positioning random strokes in overlap
                        if ((loopLayer > 0) && (fxrand() > 0.85)) {
                            this.brushPosX = getRandomFromInterval(this.overlap / 2, this.custom_width - this.brushLength_ - this.overlap / 2);
                            this.brushPosY = getRandomFromInterval(this.overlap / 2, this.custom_height - this.numberFibres_ * this.sizeStroke - this.overlap / 2);
                            this.brushStrokes.push(new Brush(this.data));
                        }

                        this.brushPosX = x;
                        this.brushPosY = y;

                        if (greyRun == true) {
                            this.brushStrokes.push(new Brush(this.data));
                        } else {
                            this.brushStrokes.push(new Brush(this.data));
                        }
                    }
                }
            } else if (this.orientation == "vertical") {
                for (let y = this.overlap; y < this.custom_height - 2 * this.overlap; y += this.brushLength) {
                    for (let x = this.overlap; x < this.custom_width - 2 * this.overlap; x += this.brushBreadth) {

                        // DEBUG Rect for grid
                        push();
                        noFill();
                        rect(x, y, this.brushBreadth, this.brushLength);
                        pop();

                        this.colorBrush = brightenColor(distortColor(color(this.colorObject), this.colorNoise), this.brightnessNoise);
                        this.brushLength_ = this.brushLength + getRandomFromInterval(-this.brushLength * this.brushLengthNoise, this.brushLength * this.brushLengthNoise);
                        this.numberFibres_ = this.numberFibres + getRandomFromInterval(-this.numberFibres * this.numberFibresNoise, this.numberFibres * this.numberFibresNoise);

                        // positioning random strokes in overlap
                        // NEEDS UPDATE
                        if ((loopLayer > 0) && (fxrand() > 0.85)) {
                            this.brushPosX = getRandomFromInterval(this.overlap / 2, this.custom_width - this.numberFibres_ * this.sizeStroke - this.overlap / 2);
                            this.brushPosY = getRandomFromInterval(this.overlap / 2, this.custom_height - this.brushLength_ - this.overlap / 2);
                            this.brushStrokes.push(new Brush(this.data));
                        }

                        this.brushPosX = x;
                        this.brushPosY = y;

                        if (greyRun == true) {
                            // egg - here backgroundColor statt colorbrush
                            this.brushStrokes.push(new Brush(this.data));
                        } else {
                            this.brushStrokes.push(new Brush(this.data));
                        }
                    }
                }
            }
        }

        // console.log(this.brushStrokes);
    }

    show() {

        // DEBUG
        // push();
        // fill(100, 100);
        // translate(this.posX, this.posY);
        // // translate(this.posX * SCALING_FACTOR - this.custom_width / 2 * SCALING_FACTOR, this.posY * SCALING_FACTOR - this.custom_height / 2 * SCALING_FACTOR);
        // rect(0, 0, this.custom_width * SCALING_FACTOR, this.custom_height * SCALING_FACTOR);
        // pop();

        for (var brushStroke of this.brushStrokes) {
            brushStroke.show();
        }

        // return this.buffer;
    }
}


