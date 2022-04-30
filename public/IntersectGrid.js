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
        var r2StartX = this.rect2.posX - this.rect2.width / 2;
        var r1Full = r1StartX + this.rect1.width;
        var r2Full = r2StartX + this.rect2.width;
        var r1StartY = this.rect1.posY - this.rect1.height / 2;
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
            } else if (r2Full > r1Full) {
                // x-axis | rect 2 overlaps from right
                this.widthNew = r1Full - r2StartX;
                this.posXNew = r1Full - this.widthNew / 2;
            } else {
                // x-axis | overlaps fully
                this.widthNew = this.rect2.width;
                this.posXNew = this.rect2.posX;
            }

            if (r2StartY < r1StartY) {
                // y-axis | rect2 above
                this.heightNew = Math.min(r2FullY, r1FullY) - r1StartY;
                this.posYNew = r1StartY + this.heightNew / 2;
            } else if (r2FullY > r1FullY) {
                this.heightNew = r1FullY - r2StartY;
                this.posYNew = r1FullY - this.heightNew / 2;
            } else {
                this.heightNew = this.rect2.height;
                this.posYNew = this.rect2.posY;
            }

        }
    }
}

// grid with rects and intersection rects
class IntersectGrid {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                minSize: 100,
                maxSize: 500,
                numberRects: 10,
                firstLevelColors: [color(100)],
                secondLevelColors: [color(30)],
                lineColor: color(230),
                padding: 50,
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

        for (let i = 0; i < this.numberRects; i++) {

            var width_ = getRandomFromInterval(this.minSize, this.maxSize);
            var height_ = getRandomFromInterval(this.minSize, this.maxSize);
            var posX_ = getRandomFromInterval(- (width / 2) + (width_ / 2) + this.padding, (width / 2) - (width_ / 2) - this.padding);
            var posY_ = getRandomFromInterval(- (height / 2) + (height_ / 2) + this.padding, (height / 2) - (height_ / 2) - this.padding);

            this.rects.push(
                {
                    width: width_,
                    height: height_,
                    depth: 0,
                    posX: posX_,
                    posY: posY_,
                    posZ: 0,  // not used I think
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

            if (fxrand() > 0.6) {
                this.rects[i].lines = new NewLines(data = {
                    posXImage: this.rects[i].posX,
                    posYImage: this.rects[i].posY,
                    custom_width: this.rects[i].width,
                    custom_height: this.rects[i].height,
                    colorObject: this.lineColor,
                    distance: 10,
                    noise: 1,
                    strokeSize: 1,
                    // curveTightness: 3,
                    curveTightness: 0,
                });
            }
        }

        // sort by size
        this.rects.sort(function (a, b) { return (b.width * b.height) - (a.width * a.height) });

        this.getIntersections();
        this.interactionRects.sort(function (a, b) { return (b.width * b.height) - (a.width * a.height) });
        this.update();
    }

    getIntersections() {
        for (let i = 0; i < this.rects.length; i++) {
            for (let j = (0 + i + 1); j < this.rects.length; j++) {
                // if (i != j) {
                this.interactionRects.push(new IntersectRect(this.rects[i], this.rects[j], getRandomFromList(this.secondLevelColors)));
                // }
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
            brushLength: getRandomFromInterval(20, 40),  // 20-40
            brushBreadth: 30,
            sizeStroke: 2,
            // numberFibres: 10,
            numberPaintLayers: 2,
            overlap: 20,
            brightnessNoise: 6,
            colorNoise: 6,
            opacityBoost: 0, // getRandomFromInterval(150, 255),
            brushLengthNoise: 0.2,
            numberFibresNoise: 0.2,
            angleNoise: PI / 30,
            fibreCurveTightness: 5,  // shape of curve, between 0 and 5; little effect
            fibreColorNoise: 2,
            fibreBrightnessNoise: 2,
            fibreStrokeSizeNoise: 1,
            fibreStartLengthNoise: 5,  // start earlier or later
            fibreBreadthNoise: 0.5,  // noise of fibre along the y axis in the middle
            fibreRotationNoise: PI / 200,
        }

        return new PaintBrushArea(brushData);
    }

    update() {
        for (let i = 0; i < this.interactionRects.length; i++) {
            this.interactionRects[i].update();
            if (this.interactionRects[i].widthNew) {  // if empty
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
            this.rects[i].paintedArea.show();
            // this.showPainted(this.rects[i].paintedArea);
            // this.showDebug(this.rects[i]);

            // own function?
            if (this.rects[i].lines !== undefined) {
                push();
                noFill();
                noStroke();
                translate((this.rects[i].lines.posXImage - this.rects[i].lines.buffer.width / 2) * SCALING_FACTOR, (this.rects[i].lines.posYImage - this.rects[i].lines.buffer.height / 2) * SCALING_FACTOR)
                image(this.rects[i].lines.buffer, 0, 0, this.rects[i].lines.buffer.width * SCALING_FACTOR, this.rects[i].lines.buffer.height * SCALING_FACTOR);
                pop();
            }
        }

        for (let i = 0; i < this.interactionRects.length; i++) {
            if (this.interactionRects[i].paintedArea !== undefined) {
                this.interactionRects[i].paintedArea.show();
                // this.showPainted(this.interactionRects[i].paintedArea);
            }
            // this.showDebug(this.interactionRects[i]);
        }

    }

    // old buffer way
    // showPainted(object) {
    //     push();
    //     let rendimage = object.show();
    //     translate(
    //         object.posX * SCALING_FACTOR - (rendimage.width / 2) * SCALING_FACTOR,
    //         object.posY * SCALING_FACTOR - (rendimage.height / 2) * SCALING_FACTOR
    //     );
    //     // if (fxrand() > 0.8) {
    //     //     rotate(PI / 2);
    //     // }
    //     image(rendimage, 0, 0, rendimage.width * SCALING_FACTOR, rendimage.height * SCALING_FACTOR)
    //     pop();
    // }

    showDebug(object) {

        push();
        stroke(0);
        // noStroke();
        fill(brightenColor(object.colorObject, 50));
        // noFill();

        if (typeof object.posXNew !== 'undefined') {
            translate(object.posXNew * SCALING_FACTOR, object.posYNew * SCALING_FACTOR, 0);
            box(object.widthNew * SCALING_FACTOR, object.heightNew * SCALING_FACTOR, 0);
        } else {
            translate(object.posX * SCALING_FACTOR, object.posY * SCALING_FACTOR, object.posZ * SCALING_FACTOR);
            box(object.width * SCALING_FACTOR, object.height * SCALING_FACTOR, object.depth * SCALING_FACTOR);
        }
        pop();



    }
}