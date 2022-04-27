class Fibre {
    constructor(buffer, colorObject, brushStartX, brushStartY, brushLength, brushStrokeSize, angle, index, data) {
        this.data = data
        this.fibreCurveTightness = data.fibreCurveTightness;  // shape of curve, between 0 and 5; little effect
        this.fibreColorNoise = data.fibreColorNoise;
        this.fibreBrightnessNoise = data.fibreBrightnessNoise;
        this.fibreStrokeSizeNoise = data.fibreStrokeSizeNoise;
        this.fibreStartLengthNoise = data.fibreStartXNoise;  // start earlier or later
        this.fibreBreadthNoise = data.fibreYNoise;  // noise of fibre along the y axis in the middle
        this.fibreRotationNoise = data.fibreRotationNoise;
        this.orientation = data.orientation;

        this.complete = false;
        this.baseColor = colorObject;
        this.brushStrokeSize = brushStrokeSize;  // default value
        this.startY = brushStartY;
        this.buffer = buffer;
        this.angle = angle;

        this.brushStartX = brushStartX;
        this.brushStartY = brushStartY;


        this.posMiddle = getRandomFromInterval(-this.fibreBreadthNoise, this.fibreBreadthNoise);
        this.sizeStroke = brushStrokeSize + getRandomFromInterval(-this.fibreStrokeSizeNoise, this.fibreStrokeSizeNoise);  // size of fibre
        // this.startX = brushStartX + getRandomFromInterval(-this.fibreStartLengthNoise, this.fibreStartLengthNoise);  // // where the fibre starts    
        this.startX = brushStartX - this.fibreStartLengthNoise + noise(index / 100) * this.fibreStartLengthNoise;  // // where the fibre starts    
        // this.startY = brushStartY + getRandomFromInterval(-this.fibreStartLengthNoise, this.fibreStartLengthNoise);  // // where the fibre starts
        this.startY = brushStartY - this.fibreStartLengthNoise + noise(index / 100) * this.fibreStartLengthNoise;  // // where the fibre starts
        // this.stop = brushLength + getRandomFromInterval(-this.fibreStartLengthNoise, this.fibreStartLengthNoise);  // where the fibre stops
        this.stop = brushLength - this.fibreStartLengthNoise + noise(index / 100) * this.fibreStartLengthNoise;  // where the fibre stops
        // remove the noise before adding the noise of Perlin

        if (fxrand() < 0.75) {
            this.colorFibre = brightenColor(distortColor(color(this.baseColor), this.fibreColorNoise), this.fibreBrightnessNoise)
        } else {
            this.colorFibre = brightenColor(distortColor(color(this.baseColor), this.fibreColorNoise * 3), this.fibreBrightnessNoise * 3)
        }
        this.angleFibre = this.angle + getRandomFromInterval(-this.fibreRotationNoise, this.fibreRotationNoise);
    }

    show(i) {

        if (this.complete == false) {
            this.buffer.push();
            if (this.orientation == "horizontal") {
                this.buffer.translate(this.startX, this.brushStartY)
                this.buffer.rotate(this.angleFibre);
            } else if (this.orientation == "vertical") {
                this.buffer.translate(this.brushStartX, this.startY)
                this.buffer.rotate(this.angleFibre / PI / 2);
            }
            this.buffer.curveTightness(this.fibreCurveTightness);
            this.buffer.stroke(this.colorFibre);
            this.buffer.strokeWeight(this.sizeStroke);
            this.buffer.noFill();

            this.buffer.beginShape();
            if (this.orientation == "horizontal") {
                this.buffer.curveVertex(0, this.brushStrokeSize * i);
                this.buffer.curveVertex(0, this.brushStrokeSize * i);
            } else if (this.orientation == "vertical") {
                this.buffer.curveVertex(this.brushStrokeSize * i, 0);
                this.buffer.curveVertex(this.brushStrokeSize * i, 0);
            }
            // middle
            if (this.orientation == "horizontal") {
                this.buffer.curveVertex((this.stop - this.startX) / 2, this.posMiddle + this.brushStrokeSize * i);
            } else if (this.orientation == "vertical") {
                this.buffer.curveVertex(this.posMiddle + this.brushStrokeSize * i, (this.stop - this.startY) / 2);
            }
            // end
            if (this.orientation == "horizontal") {
                this.buffer.curveVertex((this.stop - this.startX), this.brushStrokeSize * i);
                this.buffer.curveVertex((this.stop - this.startX), this.brushStrokeSize * i);
            } else if (this.orientation == "vertical") {
                this.buffer.curveVertex(this.brushStrokeSize * i, (this.stop - this.startY));
                this.buffer.curveVertex(this.brushStrokeSize * i, (this.stop - this.startY));
            }
            this.buffer.endShape();
            this.buffer.pop();

            // this.complete = true;
        }
    }
}

class Brush {
    constructor(buffer, colorObject, posX, posY, brushLength, sizeStroke, numberFibres, angleNoise, data) {
        this.data = data
        this.orientation = data.orientation;
        this.fibres = []
        this.angle = getRandomFromInterval(-angleNoise, angleNoise)
        this.complete = false;

        if (this.orientation == "horizontal") {
            for (var i = 0; i < numberFibres; i++) {
                this.fibres.push(new Fibre(
                    buffer,
                    colorObject,
                    posX,
                    posY,
                    posX + brushLength,
                    sizeStroke,
                    this.angle,
                    i,
                    this.data
                ));
            }
        } else if (this.orientation == "vertical") {
            for (var i = 0; i < numberFibres; i++) {
                this.fibres.push(new Fibre(
                    buffer,
                    colorObject,
                    posX,
                    posY,
                    posY + brushLength,
                    sizeStroke,
                    this.angle,
                    i,
                    this.data
                ));
            }
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

    constructor(data, buffer) {

        if (typeof data === 'undefined') {
            brushData = {
                custom_width: 300,
                custom_height: 100,
                posX: -500,
                posY: 0,
                colorObject: color("#DD4A48"),
                orientation: "horizontal",
                brushLength: 60,
                brushBreadth: 40,
                sizeStroke: 2,
                // numberFibres: 15,
                numberPaintLayers: 2,
                overlap: 30,  // adding to desired size
                brightnessNoise: 20,
                colorNoise: 5,
                opacityBoost: 0,
                brushLengthNoise: 0.2,
                numberFibresNoise: 0.2,
                angleNoise: PI / 30,
                fibreCurveTightness: 3,  // shape of curve, between 0 and 5; little effect
                fibreColorNoise: 5,
                fibreBrightnessNoise: 10,
                fibreStrokeSizeNoise: 0.2,
                fibreStartXNoise: 5,  // start earlier or later
                fibreYNoise: 1,  // noise of fibre along the y axis in the middle
                fibreRotationNoise: PI / 80,
            }
        }

        this.data = data;
        this.posX = data.posX;
        this.posY = data.posY;
        this.brushLength = data.brushLength;  // default
        this.brushBreadth = data.brushBreadth;
        this.sizeStroke = data.sizeStroke;
        this.numberFibres = data.numberFibres;  // default
        this.overlap = data.overlap;
        this.orientation = data.orientation;

        this.brightnessNoise = data.brightnessNoise;
        this.colorNoise = data.colorNoise;
        this.opacityBoost = data.opacityBoost;
        this.brushLengthNoise = data.brushLengthNoise;
        this.numberFibresNoise = data.numberFibresNoise;
        this.angleNoise = data.angleNoise;
        this.numberPaintLayers = data.numberPaintLayers;

        this.colorObject = color(data.colorObject);  // default color

        // use existing layer or create new
        if (typeof this.buffer == "undefined") {
            this.buffer = createGraphics(data.custom_width + this.overlap * 2, data.custom_height + this.overlap * 2);
        } else {
            this.buffer = buffer;
        }
        this.area = data.custom_width * data.custom_height;  // without overlap
        // this.brushBreadth = this.numberFibres * this.sizeStroke + data.fibreYNoise * 2
        this.numberFibres = this.brushBreadth / this.sizeStroke

        this.brushStrokes = [];

        for (let loopLayer = 0; loopLayer < this.numberPaintLayers; loopLayer += 1) {

            // BACKGROUND layer
            let greyRun = false;
            if ((loopLayer == 0) && (this.numberPaintLayers > 1) && (fxrand() > 0.75)) {
                var backgroundColor = color(getRandomFromInterval(50, 100));
                // greyRun = true;
            }

            if (this.orientation == "horizontal") {
                for (let x = this.overlap; x < this.buffer.width - 2 * this.overlap; x += this.brushLength) {
                    for (let y = this.overlap; y < this.buffer.height - 2 * this.overlap; y += this.brushBreadth) {

                        // DEBUG Rect for grid
                        // this.buffer.noFill();
                        // this.buffer.rect(x, y, this.brushLength, this.brushBreadth);

                        // var colorBrush = lessenColor(brightenColor(distortColor(color(this.colorObject), this.colorNoise), this.brightnessNoise), this.opacityBoost);
                        var colorBrush = brightenColor(distortColor(color(this.colorObject), this.colorNoise), this.brightnessNoise);
                        var brushLength_ = this.brushLength + getRandomFromInterval(-this.brushLength * this.brushLengthNoise, this.brushLength * this.brushLengthNoise);
                        var numberFibres_ = this.numberFibres + getRandomFromInterval(-this.numberFibres * this.numberFibresNoise, this.numberFibres * this.numberFibresNoise);

                        // positioning random strokes in overlap
                        if ((loopLayer > 0) && (fxrand() > 0.85)) {
                            var posX = getRandomFromInterval(this.overlap / 2, this.buffer.width - brushLength_ - this.overlap / 2);
                            var posY = getRandomFromInterval(this.overlap / 2, this.buffer.height - numberFibres_ * this.sizeStroke - this.overlap / 2);
                            this.brushStrokes.push(new Brush(this.buffer, colorBrush, posX, posY, brushLength_, this.sizeStroke, numberFibres_, this.angleNoise, this.data));
                        }

                        var posX = x;
                        var posY = y;

                        if (greyRun == true) {
                            this.brushStrokes.push(new Brush(this.buffer, backgroundColor, posX, posY, brushLength_, this.sizeStroke, numberFibres_, this.angleNoise, this.data));
                        } else {
                            this.brushStrokes.push(new Brush(this.buffer, colorBrush, posX, posY, brushLength_, this.sizeStroke, numberFibres_, this.angleNoise, this.data));
                        }
                    }
                }
            } else if (this.orientation == "vertical") {
                for (let y = this.overlap; y < this.buffer.height - 2 * this.overlap; y += this.brushLength) {
                    for (let x = this.overlap; x < this.buffer.width - 2 * this.overlap; x += this.brushBreadth) {

                        // DEBUG Rect for grid
                        // this.buffer.noFill();
                        // this.buffer.rect(x, y, this.brushBreadth, this.brushLength);

                        var colorBrush = brightenColor(distortColor(color(this.colorObject), this.colorNoise), this.brightnessNoise);
                        var brushLength_ = this.brushLength + getRandomFromInterval(-this.brushLength * this.brushLengthNoise, this.brushLength * this.brushLengthNoise);
                        var numberFibres_ = this.numberFibres + getRandomFromInterval(-this.numberFibres * this.numberFibresNoise, this.numberFibres * this.numberFibresNoise);

                        // positioning random strokes in overlap
                        // NEEDS UPDATE
                        if ((loopLayer > 0) && (fxrand() > 0.85)) {
                            var posX = getRandomFromInterval(this.overlap / 2, this.buffer.width - numberFibres_ * this.sizeStroke - this.overlap / 2);
                            var posY = getRandomFromInterval(this.overlap / 2, this.buffer.height - brushLength_ - this.overlap / 2);
                            this.brushStrokes.push(new Brush(this.buffer, colorBrush, posX, posY, brushLength_, this.sizeStroke, numberFibres_, this.angleNoise, this.data));
                        }

                        var posX = x;
                        var posY = y;

                        if (greyRun == true) {
                            this.brushStrokes.push(new Brush(this.buffer, backgroundColor, posX, posY, brushLength_, this.sizeStroke, numberFibres_, this.angleNoise, this.data));
                        } else {
                            this.brushStrokes.push(new Brush(this.buffer, colorBrush, posX, posY, brushLength_, this.sizeStroke, numberFibres_, this.angleNoise, this.data));
                        }
                    }
                }
            }
        }
    }

    show() {

        // debug
        // this.buffer.push();
        // this.buffer.fill(100);
        // this.buffer.rect(0, 0, this.buffer.width, this.buffer.height);
        // this.buffer.pop();

        for (var brushtroke of this.brushStrokes) {
            brushtroke.show();
        }

        return this.buffer;
    }
}

