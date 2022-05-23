class IntersectRect {
    constructor(rect1, rect2, colorObject) {
        this.rect1 = rect1;
        this.rect2 = rect2;

        this.posXNew;
        this.widthNew;
        this.posYNew;
        this.heightNew;

        this.rect1.colorObject;
        this.rect2.colorObject;

        // this.getColor();
        this.colorObject = colorObject;

    }

    // get another color from used in both rects
    getColor() {
        let allColors = new Set([color1, color2]);
        let usedColors = new Set([this.rect1.colorObject, this.rect2.colorObject]);

        this.colorIntersect = new Set([...allColors].filter(x => !usedColors.has(x)));
        this.colorObject = getRandomFromList([...this.colorIntersect]);
    }

    update() {
        // helper
        var r1StartX = this.rect1.posX - this.rect1.width / 2;
        // console.log("this.rect1.posX: " + this.rect1.posX);
        // console.log("this.rect1.width: " + this.rect1.width);
        // console.log("r1StartX: " + r1StartX);
        var r2StartX = this.rect2.posX - this.rect2.width / 2;
        // console.log("this.rect2.posX: " + this.rect2.posX);
        // console.log("this.rect2.width: " + this.rect2.width);
        // console.log("r2StartX: " + r2StartX);
        var r1Full = r1StartX + this.rect1.width;
        var r2Full = r2StartX + this.rect2.width;
        var r1StartY = this.rect1.posY - this.rect1.height / 2;
        // console.log("this.rect1.posY: " + this.rect1.posY);  // culprit
        // console.log("this.rect1.height: " + this.rect1.height);
        // console.log("r1StartY: " + r1StartY);
        var r2StartY = this.rect2.posY - this.rect2.height / 2;
        var r1FullY = r1StartY + this.rect1.height;
        var r2FullY = r2StartY + this.rect2.height;

        // no overlap
        if (
            (r2StartX > r1Full) ||
            (r2Full < r1StartX) ||
            (this.rect2.posY - this.rect2.height / 2 > this.rect1.posY - this.rect1.height / 2 + this.rect1.height) ||
            (this.rect2.posY - this.rect2.height / 2 + this.rect2.height < this.rect1.posY - this.rect1.height / 2)
        ) {
            // overlap
        } else {
            if (r2StartX < r1StartX) {
                // x-axis | rect 2 overlaps from left
                this.widthNew = Math.min(r2Full, r1Full) - r1StartX;
                this.posXNew = (r1StartX) + this.widthNew / 2;
                console.log("1. w" + this.widthNew);
            } else if (r2Full > r1Full) {
                // x-axis | rect 2 overlaps from right
                this.widthNew = r1Full - r2StartX;
                this.posXNew = r1Full - this.widthNew / 2;
                console.log("2. w" + this.widthNew);
            } else {
                // x-axis | overlaps fully
                this.widthNew = this.rect2.width;
                this.posXNew = this.rect2.posX;
                // console.log("3." + this.widthNew);
            }

            if (r2StartY < r1StartY) {
                // y-axis | rect2 above
                console.log("r2FullY " + r2FullY);
                console.log("r1FullY " + r1FullY);
                this.heightNew = Math.min(r2FullY, r1FullY) - r1StartY;
                this.posYNew = r1StartY + this.heightNew / 2;
                console.log("1. h" + this.heightNew);
            } else if (r2FullY > r1FullY) {
                this.heightNew = r1FullY - r2StartY;
                this.posYNew = r1FullY - this.heightNew / 2;
                console.log("2. h" + this.heightNew);
            } else {
                this.heightNew = this.rect2.height;
                this.posYNew = this.rect2.posY;
                // console.log("3." + this.heightNew);
            }

            if (this.widthNew < 50 || this.heightNew < 50) {
                logging.debug("intersection rect is too small to exist.")
                this.widthNew = undefined;
                this.heightNew = undefined;
                this.posXNew = undefined;
                this.posYNew = undefined;
            }

        }
    }
}

// grid with rects and intersection rects
class IntersectGrid {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                minSize: 400,  // 100 resize
                maxSize: 2000, // 500 resize
                numberRects: 5,
                firstLevelColors: [color(100)],
                secondLevelColors: [color(30)],
                lineColor: color(230),
                padding: 200,  // frame to the edge of the canvas
            }
        }
        this.minSize = data.minSize;
        this.maxSize = data.maxSize;
        this.numberRects = data.numberRects;
        this.firstLevelColors = data.firstLevelColors;
        this.secondLevelColors = data.secondLevelColors;
        this.lineColor = data.lineColor;
        this.padding = data.padding;


        // for debug
        this.rects = [];
        this.interactionRects = [];

        // console.log(this.numberRects);
        for (let i = 0; i < this.numberRects; i++) {

            var width_ = Math.round(getRandomFromInterval(this.minSize, this.maxSize));
            var height_ = Math.round(getRandomFromInterval(this.minSize, this.maxSize));

            var posX_ = Math.round(getRandomFromInterval(this.padding + width_ / 2, exportPaper.width - this.padding - width_ / 2));
            var posY_ = Math.round(getRandomFromInterval(this.padding + height_ / 2, exportPaper.height - this.padding - height_ / 2));

            this.rects.push(
                {
                    width: width_,
                    height: height_,
                    posX: posX_,
                    posY: posY_,
                    colorObject: getRandomFromList(this.firstLevelColors),
                }
            )

            this.rects[i].paintedArea = this.createPaintbrushAreas(
                this.rects[i].posX,
                this.rects[i].posY,
                this.rects[i].width,
                this.rects[i].height,
                this.rects[i].colorObject
            )

            // console.log(fxrand());
            if (fxrand() > 0.6) {
                this.rects[i].lines = new NewLines(data = {
                    posX: this.rects[i].posX,
                    posY: this.rects[i].posY,
                    custom_width: this.rects[i].width,
                    custom_height: this.rects[i].height,
                    colorObject: this.lineColor,
                    distance: 40,
                    noise: 4,
                    strokeSize: 4,
                    curveTightness: 1,
                    opacityLevel: 150,
                });
            }
        }
        // console.log(fxrand());
        // sort by size
        this.rects.sort(function (a, b) { return (b.width * b.height) - (a.width * a.height) });

        this.getIntersections();
        this.interactionRects.sort(function (a, b) { return (b.width * b.height) - (a.width * a.height) });
        this.update();
    }

    getIntersections() {
        for (let i = 0; i < this.rects.length; i++) {
            for (let j = (0 + i + 1); j < this.rects.length; j++) {
                this.interactionRects.push(new IntersectRect(this.rects[i], this.rects[j], getRandomFromList(this.secondLevelColors)));
            }
        }
    }

    createPaintbrushAreas(posX, posY, rectWidth, rectHeight, colorObject) {

        let brushData = {
            custom_width: rectWidth,
            custom_height: rectHeight,
            posX: posX,
            posY: posY,
            colorObject: brightenColor(distortColor(colorObject, 6), 6),
            orientation: getRandomFromList(["horizontal", "vertical"]),
            brushLength: BRUSHLENGTHANDBREADTH,
            brushBreadth: BRUSHLENGTHANDBREADTH,
            sizeStroke: BRUSHSTROKESIZE,
            numberPaintLayers: NUMBERPAINTLAYERS,
            overlap: 80,
            brightnessNoise: BRUSHBRIGHTNESSNOISE,
            colorNoise: BRUSHCOLORNOISE,
            opacityBoost: 0, // getRandomFromInterval(150, 255),
            brushLengthNoise: 0.2,  // FEATURES
            brushBreadthNoise: 0.2,  // FEATURES
            brushAngleNoise: BRUSHANGLENOISE,
            // fibreCurveTightness: FIBRECURVETIGHTNESS,  // shape of curve, between 0 and 5; little effect
            fibreColorNoise: 2,
            fibreBrightnessNoise: FIBREBRIGHTNESSNOISE,
            fibreStrokeSizeNoise: FIBRESTROKESIZENOISE,
            fibreStartLengthNoise: FIBRESTARTLENGTHNOISE,  // start earlier or later
            fibreBreadthNoise: FIBREBREADTHNOISE,  // noise of fibre along the y axis in the middle
            fibreRotationNoise: FIBREROTATIONNOISE,
            fibreOpacityNoiseBase: FIBREOPACITYNOISEBASE,
        }

        return new PaintBrushArea(brushData);
    }

    update() {
        for (let i = 0; i < this.interactionRects.length; i++) {
            this.interactionRects[i].update();
            if (this.interactionRects[i].widthNew !== undefined) {  // if not empty

                this.interactionRects[i].paintedArea = this.createPaintbrushAreas(
                    this.interactionRects[i].posXNew,
                    this.interactionRects[i].posYNew,
                    this.interactionRects[i].widthNew,
                    this.interactionRects[i].heightNew,
                    this.interactionRects[i].colorObject
                )
            }
        }
    }

    show() {

        for (let i = 0; i < this.rects.length; i++) {


            if (logging.getLevel() <= 1) {
                this.showDebug(this.rects[i], color(0, 255, 0, 100));
            }

            // this.rects[i].paintedArea.show();

            if (this.rects[i].lines !== undefined) {
                // this.rects[i].lines.show();
            }
        }

        for (let i = 0; i < this.interactionRects.length; i++) {
            if (this.interactionRects[i].paintedArea !== undefined) {
                // this.interactionRects[i].paintedArea.show();
            }
            if (logging.getLevel() <= 1) {
                this.showDebug(this.interactionRects[i], color(255, 0, 0, 100));
            }
        }

    }

    showDebug(object, colorObject) {

        buffer.push();
        // buffer.stroke(0);
        buffer.noStroke();
        // buffer.fill(brightenColor(object.colorObject, 50));
        buffer.fill(colorObject);
        buffer.rectMode(CENTER);

        if (typeof object.posXNew !== 'undefined') {
            buffer.translate(object.posXNew / exportRatio, object.posYNew / exportRatio);
            buffer.rect(0, 0, object.widthNew / exportRatio, object.heightNew / exportRatio);
            buffer.stroke(15);
            buffer.point(0, 0)
        } else if (typeof object.posX !== 'undefined') {
            buffer.translate(object.posX / exportRatio, object.posY / exportRatio);
            buffer.rect(0, 0, object.width / exportRatio, object.height / exportRatio);
            buffer.stroke(5);
            buffer.point(0, 0)
        }
        buffer.pop();
    }
}