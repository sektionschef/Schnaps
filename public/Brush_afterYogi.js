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
        this.angleNoise = data.angleNoise;
        this.fibreCurveTightness = data.fibreCurveTightness;
        this.fibreColorNoise = data.fibreColorNoise;
        this.fibreBrightnessNoise = data.fibreBrightnessNoise;
        this.fibreStrokeSizeNoise = data.fibreStrokeSizeNoise;
        this.fibreStartLengthNoise = data.fibreStartLengthNoise;
        this.fibreBreadthNoise = data.fibreBreadthNoise
        this.fibreRotationNoise = data.fibreRotationNoise

        this.numberFibres = this.brushBreadth / this.sizeStroke
    }

    create() {
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

                        this.brushStrokes.push(this.createBrush(x, y, loopLayer));

                        // if (greyRun == true) {
                        //     // this.brushStrokes.push(new Brush(this.data));
                        //     this.brushStrokes.push(this.createBrush());
                        // } else {
                        //     // this.brushStrokes.push(new Brush(this.data));
                        //     this.brushStrokes.push(this.createBrush());
                        // }
                    }
                }
            } else if (this.orientation == "vertical") {
                for (let y = this.overlap; y < this.custom_height - 2 * this.overlap; y += this.brushLength) {
                    for (let x = this.overlap; x < this.custom_width - 2 * this.overlap; x += this.brushBreadth) {

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
}

class Brush {
    constructor(area, x, y, loopLayer) {
        let brush = {}
        // brush.complete = false;

        brush.brushPosX = x;
        brush.brushPosY = y;
        brush.colorBrush = brightenColor(distortColor(color(this.colorObject), this.colorNoise), this.brightnessNoise);
        brush.brushLength_ = this.brushLength + getRandomFromInterval(-this.brushLength * this.brushLengthNoise, this.brushLength * this.brushLengthNoise);
        brush.numberFibres_ = this.numberFibres + getRandomFromInterval(-this.numberFibres * this.numberFibresNoise, this.numberFibres * this.numberFibresNoise);
        brush.angle = getRandomFromInterval(-this.angleNoise, this.angleNoise);

        // hier this. oder brush.??
        if ((loopLayer > 0) && (fxrand() > 0.85)) {
            if (this.orientation == "horizontal") {
                brush.brushPosX = getRandomFromInterval(this.overlap / 2, this.custom_width - brush.brushLength_ - this.overlap / 2);
                brush.brushPosY = getRandomFromInterval(this.overlap / 2, this.custom_height - brush.numberFibres_ * this.sizeStroke - this.overlap / 2);

                brush.brushStop = brush.brushPosX + brush.brushLength_
            }
        }
        if ((loopLayer > 0) && (fxrand() > 0.85)) {
            if (this.orientation == "vertical") {
                brush.brushPosX = getRandomFromInterval(this.overlap / 2, this.custom_width - brush.numberFibres_ * this.sizeStroke - this.overlap / 2);
                brush.brushPosY = getRandomFromInterval(this.overlap / 2, this.custom_height - brush.brushLength_ - this.overlap / 2);

                brush.brushStop = brush.brushPosY + brush.brushLength_
            }
        }

        brush.fibres = []
        for (var i = 0; i < this.numberFibres; i++) {
            brush.fibres.push(this.createFibre(i, brush));
        }

    }

}

class Fibre {
    constructor(i, brush) {

        let fibre = {};
        fibre.i = i;

        // this.complete = false;
        fibre.posMiddle = getRandomFromInterval(-this.fibreBreadthNoise, this.fibreBreadthNoise);
        fibre.sizeStrokeFibre = this.sizeStroke + getRandomFromInterval(-this.fibreStrokeSizeNoise, this.fibreStrokeSizeNoise);  // size of fibre
        fibre.startX = brush.brushPosX - this.fibreStartLengthNoise + noise(fibre.i / 100) * this.fibreStartLengthNoise;  // // where the fibre starts    
        fibre.startY = brush.brushPosY - this.fibreStartLengthNoise + noise(fibre.i / 100) * this.fibreStartLengthNoise;  // // where the fibre starts
        fibre.stop = brush.brushLength_ - this.fibreStartLengthNoise + noise(fibre.i / 100) * this.fibreStartLengthNoise;  // where the fibre stops
        // remove the noise before adding the noise of Perlin

        if (fxrand() < 0.75) {
            fibre.colorFibre = brightenColor(distortColor(color(brush.colorBrush), this.fibreColorNoise), this.fibreBrightnessNoise)
        } else {
            fibre.colorFibre = brightenColor(distortColor(color(brush.colorBrush), this.fibreColorNoise * 3), this.fibreBrightnessNoise * 3)
        }
        fibre.angleFibre = this.angle + getRandomFromInterval(-this.fibreRotationNoise, this.fibreRotationNoise);

        return fibre
    }

}





// show() {

//     // DEBUG
//     // push();
//     // fill(100, 100);
//     // translate(this.posX, this.posY);
//     // // translate(this.posX * SCALING_FACTOR - this.custom_width / 2 * SCALING_FACTOR, this.posY * SCALING_FACTOR - this.custom_height / 2 * SCALING_FACTOR);
//     // rect(0, 0, this.custom_width * SCALING_FACTOR, this.custom_height * SCALING_FACTOR);
//     // pop();

//     // for (var brushStroke of this.brushStrokes) {

//     //         // if (this.complete == false) {

//     //         for (var i = 0; i < this.fibres.length; i++) {
//     //             this.fibres[i].show(i);
//     //         }

//     //         // this.complete = true;
//     //         // }
//     // }



//     for (var brush of this.brushStrokes) {
//         for (var fibre of brush.fibres) {
//             console.log(fibre);

//             // console.log("bam");
//             // fill(50);
//             // // translate(this.posX * SCALING_FACTOR - this.custom_width / 2 * SCALING_FACTOR, this.posY * SCALING_FACTOR - this.custom_height / 2 * SCALING_FACTOR);
//             // rect(0, 0, 30, 30);

//             push();
//             if (this.orientation == "horizontal") {
//                 // translate(fibre.startX, brush.brushPosY);
//                 // translate(this.startX * SCALING_FACTOR - (this.custom_width / 2) * SCALING_FACTOR, this.brushPosY * SCALING_FACTOR - (this.custom_height / 2) * SCALING_FACTOR);
//                 // rotate(fibre.angleFibre);
//             } else if (this.orientation == "vertical") {
//                 // translate(brush.brushPosX, fibre.startY)
//                 // rotate(fibre.angleFibre / PI / 2);
//             }
//             curveTightness(this.fibreCurveTightness);
//             stroke(fibre.colorFibre);
//             strokeWeight(fibre.sizeStrokeFibre);
//             noFill();

//             point(0, this.sizeStroke * fibre.i);

//             // default sizestroke oder ein anderer?? brush oder fibre??
//             // beginShape();
//             // if (this.orientation == "horizontal") {
//             //     curveVertex(0, this.sizeStroke * fibre.i, 0);
//             //     curveVertex(0, this.sizeStroke * fibre.i, 0);
//             // } else if (this.orientation == "vertical") {
//             //     curveVertex(this.sizeStroke * fibre.i, 0, 0);
//             //     curveVertex(this.sizeStroke * fibre.i, 0, 0);
//             // }
//             // // middle
//             // if (this.orientation == "horizontal") {
//             //     curveVertex((fibre.stop - fibre.startX) / 2, fibre.posMiddle + this.sizeStroke * fibre.i, 0);
//             // } else if (this.orientation == "vertical") {
//             //     curveVertex(fibre.posMiddle + this.sizeStroke * fibre.i, (fibre.stop - fibre.startY) / 2, 0);
//             // }
//             // // end
//             // if (this.orientation == "horizontal") {
//             //     curveVertex((fibre.stop - fibre.startX), this.sizeStroke * fibre.i, 0);
//             //     curveVertex((fibre.stop - fibre.startX), this.sizeStroke * fibre.i, 0);
//             // } else if (this.orientation == "vertical") {
//             //     curveVertex(this.sizeStroke * fibre.i, (fibre.stop - fibre.startY), 0);
//             //     curveVertex(this.sizeStroke * fibre.i, (fibre.stop - fibre.startY), 0);
//             // }
//             // endShape();

//             pop();
//         }

//     }


// }

// }


