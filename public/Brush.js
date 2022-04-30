class Fibre {
    constructor(brush, i) {

        this.i = i;

        // this.complete = false;
        this.posMiddle = getRandomFromInterval(-brush.area.fibreBreadthNoise, brush.area.fibreBreadthNoise);
        this.sizeStrokeFibre = brush.area.sizeStroke + getRandomFromInterval(-brush.area.fibreStrokeSizeNoise, brush.area.fibreStrokeSizeNoise);  // size of fibre
        this.startX = brush.brushPosX - brush.area.fibreStartLengthNoise + noise(this.i / 100) * brush.area.fibreStartLengthNoise;  // // where the fibre starts    
        this.startY = brush.brushPosY - brush.area.fibreStartLengthNoise + noise(this.i / 100) * brush.area.fibreStartLengthNoise;  // // where the fibre starts
        this.stop = brush.brushPosX + brush.brushLength_ - brush.area.fibreStartLengthNoise + noise(this.i / 100) * brush.area.fibreStartLengthNoise;  // where the fibre stops
        // remove the noise before adding the noise of Perlin

        if (fxrand() < 0.75) {
            this.colorFibre = brightenColor(distortColor(color(brush.colorBrush), brush.area.fibreColorNoise), brush.area.fibreBrightnessNoise)
        } else {
            this.colorFibre = brightenColor(distortColor(color(brush.colorBrush), brush.area.fibreColorNoise * 3), brush.area.fibreBrightnessNoise * 3)
        }
        this.angleFibre = brush.angle + getRandomFromInterval(-brush.area.fibreRotationNoise, brush.area.fibreRotationNoise);
    }

}

class Brush {
    constructor(area, x, y, loopLayer) {
        // brush.complete = false;

        this.area = area
        this.brushPosX = x;
        this.brushPosY = y;
        this.colorBrush = brightenColor(distortColor(color(this.area.colorObject), this.area.colorNoise), this.area.brightnessNoise);
        this.brushLength_ = this.area.brushLength + getRandomFromInterval(-this.area.brushLength * this.area.brushLengthNoise, this.area.brushLength * this.area.brushLengthNoise);
        this.numberFibres_ = this.area.numberFibres + getRandomFromInterval(-this.area.numberFibres * this.area.numberFibresNoise, this.area.numberFibres * this.area.numberFibresNoise);
        this.angle = getRandomFromInterval(-this.area.brushAngleNoise, this.area.brushAngleNoise);

        this.fibres = []

        if ((loopLayer > 0) && (fxrand() > 0.85)) {
            if (this.area.orientation == "horizontal") {
                this.brushPosX = getRandomFromInterval(this.area.overlap / 2, this.area.custom_width - this.brushLength_ - this.area.overlap / 2);
                this.brushPosY = getRandomFromInterval(this.area.overlap / 2, this.area.custom_height - this.numberFibres_ * this.area.sizeStroke - this.area.overlap / 2);

                this.brushStop = this.brushPosX + this.brushLength_
            }
        }
        if ((loopLayer > 0) && (fxrand() > 0.85)) {
            if (this.area.orientation == "vertical") {
                this.brushPosX = getRandomFromInterval(this.area.overlap / 2, this.area.custom_width - this.numberFibres_ * this.area.sizeStroke - this.area.overlap / 2);
                this.brushPosY = getRandomFromInterval(this.area.overlap / 2, this.area.custom_height - this.brushLength_ - this.area.overlap / 2);

                this.brushStop = this.brushPosY + this.brushLength_
            }
        }

        for (var i = 0; i < this.numberFibres_; i++) {
            this.fibres.push(new Fibre(this, i));
        }
    }

}

// painted area has an overlap with some brushstrokes additional to the specified width and height
class PaintBrushArea {
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
                brushAngleNoise: PI / 20,
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
        this.colorObject = color(data.colorObject);
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
        this.brushAngleNoise = data.brushAngleNoise;
        this.fibreCurveTightness = data.fibreCurveTightness;
        this.fibreColorNoise = data.fibreColorNoise;
        this.fibreBrightnessNoise = data.fibreBrightnessNoise;
        this.fibreStrokeSizeNoise = data.fibreStrokeSizeNoise;
        this.fibreStartLengthNoise = data.fibreStartLengthNoise;
        this.fibreBreadthNoise = data.fibreBreadthNoise
        this.fibreRotationNoise = data.fibreRotationNoise

        this.numberFibres = this.brushBreadth / this.sizeStroke

        this.brushStrokes = [];
        this.createBrushes();

    }

    createBrushes() {
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

                        this.brushStrokes.push(new Brush(this, x, y, loopLayer));

                        if (greyRun == true) {
                            // this.brushStrokes.push(new Brush(this.data));
                            // this.brushStrokes.push(this.createBrushes());
                        } else {
                            // this.brushStrokes.push(new Brush(this.data));
                            // this.brushStrokes.push(this.createBrushes());
                        }
                    }
                }
            } else if (this.orientation == "vertical") {
                for (let y = this.overlap; y < this.custom_height - 2 * this.overlap; y += this.brushLength) {
                    for (let x = this.overlap; x < this.custom_width - 2 * this.overlap; x += this.brushBreadth) {

                        this.brushStrokes.push(new Brush(this, x, y, loopLayer));

                        if (greyRun == true) {
                            // egg - here backgroundColor statt colorbrush
                            // this.brushStrokes.push(new Brush(this.data));
                            // this.brushStrokes.push(this.createBrush());
                        } else {
                            // this.brushStrokes.push(new Brush(this.data));
                            // this.brushStrokes.push(this.createBrush());
                        }
                    }
                }
            }
        }
    }

    show() {

        // translate(this.posX, this.posY);

        // DEBUG
        // push();
        // fill(100, 100);
        // translate(this.posX, this.posY);
        // // translate(this.posX * SCALING_FACTOR - this.custom_width / 2 * SCALING_FACTOR, this.posY * SCALING_FACTOR - this.custom_height / 2 * SCALING_FACTOR);
        // rect(0, 0, this.custom_width, this.custom_height);
        // // rect(0, 0, this.custom_width * SCALING_FACTOR, this.custom_height * SCALING_FACTOR);
        // pop();

        for (var brushStroke of this.brushStrokes) {

            // debug grid
            // push();
            // strokeWeight(2);
            // noFill();
            // translate(brushStroke.brushPosX, brushStroke.brushPosY)
            // rect(0, 0, this.brushLength, this.brushBreadth);
            // pop();

            for (var fibre of brushStroke.fibres) {
                // console.log(fibre);

                push();
                if (this.orientation == "horizontal") {
                    // translate(fibre.startX, brushStroke.brushPosY);
                    translate(this.posX + fibre.startX, this.posY + brushStroke.brushPosY);
                    // translate(this.startX * SCALING_FACTOR - (this.custom_width / 2) * SCALING_FACTOR, this.brushPosY * SCALING_FACTOR - (this.custom_height / 2) * SCALING_FACTOR);
                    rotate(fibre.angleFibre);
                } else if (this.orientation == "vertical") {
                    translate(brushStroke.brushPosX, fibre.startY)
                    rotate(fibre.angleFibre / PI / 2);
                }
                curveTightness(this.fibreCurveTightness);
                stroke(fibre.colorFibre);
                strokeWeight(fibre.sizeStrokeFibre);
                noFill();

                // default sizestroke oder ein anderer?? brush oder fibre??
                beginShape();
                if (this.orientation == "horizontal") {
                    curveVertex(0, this.sizeStroke * fibre.i, 0);
                    curveVertex(0, this.sizeStroke * fibre.i, 0);
                } else if (this.orientation == "vertical") {
                    curveVertex(this.sizeStroke * fibre.i, 0, 0);
                    curveVertex(this.sizeStroke * fibre.i, 0, 0);
                }
                // middle
                if (this.orientation == "horizontal") {
                    curveVertex((fibre.stop - fibre.startX) / 2, fibre.posMiddle + this.sizeStroke * fibre.i, 0);
                } else if (this.orientation == "vertical") {
                    curveVertex(fibre.posMiddle + this.sizeStroke * fibre.i, (fibre.stop - fibre.startY) / 2, 0);
                }
                // end
                if (this.orientation == "horizontal") {
                    curveVertex((fibre.stop - fibre.startX), this.sizeStroke * fibre.i, 0);
                    curveVertex((fibre.stop - fibre.startX), this.sizeStroke * fibre.i, 0);
                } else if (this.orientation == "vertical") {
                    curveVertex(this.sizeStroke * fibre.i, (fibre.stop - fibre.startY), 0);
                    curveVertex(this.sizeStroke * fibre.i, (fibre.stop - fibre.startY), 0);
                }
                endShape();

                pop();
            }
        }


    }
}