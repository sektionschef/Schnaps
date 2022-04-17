
class IntersectRect {
    constructor(rect1, rect2) {
        this.rect1 = rect1;
        this.rect2 = rect2;

        this.posXNew;
        this.widthNew;
        this.posYNew;
        this.heightNew;

        this.rect1.colorObject;
        this.rect2.colorObject;

        let allColors = new Set([color1, color2, color3]);
        // console.log(allColors);
        let usedColors = new Set([this.rect1.colorObject, this.rect2.colorObject]);
        // console.log(usedColors);

        this.colorIntersect = new Set([...allColors].filter(x => !usedColors.has(x)));
        this.colorObject = [...this.colorIntersect][0];

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

    show() {
        var OnTopLayer = 0;

        push();
        // noStroke();
        stroke(0);
        // fill(lessenColor(distortColor(color1, 30), 250));
        noFill();
        translate(this.posXNew * SCALING_FACTOR, this.posYNew * SCALING_FACTOR, OnTopLayer);
        box(this.widthNew * SCALING_FACTOR, this.heightNew * SCALING_FACTOR, 0);
        pop();
    }
}

// grid with rects and intersection rects
class IntersectGrid {
    constructor() {
        this.MIN = 100;
        this.MAX = 500;
        this.numberRects = 5;

        // for debug
        this.rects = [];
        this.interactionRects = [];

        for (let i = 0; i < this.numberRects; i++) {
            this.rects.push(
                {
                    width: getRandomFromInterval(this.MIN, this.MAX),
                    height: getRandomFromInterval(this.MIN, this.MAX),
                    depth: 0,
                    posX: getRandomFromInterval(- width / 2, width / 2),
                    posY: getRandomFromInterval(- width / 2, width / 2),
                    posZ: 0,  // not used I think
                    colorObject: getRandomFromList([color1, color2, color3]),
                }
            )
            this.rects[i].paintedArea = this.createPaintbrushAreas(
                this.rects[i].posX,
                this.rects[i].posY,
                this.rects[i].width,
                this.rects[i].height,
                this.rects[i].colorObject
            )
        }

        // sort by size
        this.rects.sort(function (a, b) { return (b.width * b.height) - (a.width * a.height) });

        this.getIntersections();
        this.update();
    }

    getIntersections() {
        for (let i = 0; i < this.rects.length; i++) {
            for (let j = (0 + i + 1); j < this.rects.length; j++) {
                // if (i != j) {
                this.interactionRects.push(new IntersectRect(this.rects[i], this.rects[j]));
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
            // colorObject: brightenColor(distortColor(getRandomFromList([color1, color2, color3]), 10), 10),
            colorObject: brightenColor(distortColor(colorObject, 10), 10),
            brushLength: getRandomFromInterval(30, 60),
            sizeStroke: getRandomFromInterval(1.5, 3),
            numberFibres: getRandomFromList([10, 20, 30]),
            numberBrushes: getRandomFromList([4, 8]),
            overlap: 20,
            brightnessNoise: 20,
            colorNoise: 5,
            opacityBoost: 0, // getRandomFromInterval(150, 255),
            brushLengthNoise: 0.2,
            numberFibresNoise: 0.2,
            angleNoise: PI / 30,
            fibreCurveTightness: 3,  // shape of curve, between 0 and 5; little effect
            fibreColorNoise: 5,
            fibreBrightnessNoise: 3,
            fibreStrokeSizeNoise: 0.1,
            fibreStartXNoise: 5,  // start earlier or later
            fibreYNoise: 2,  // noise of fibre along the y axis in the middle
            fibreRotationNoise: PI / 100,
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
                );
            }
        }
    }

    show() {

        for (let i = 0; i < this.rects.length; i++) {
            this.showPainted(this.rects[i].paintedArea);

            // DEBUG
            // push();
            // stroke(0);
            // // noStroke();
            // // fill(distortColor(color("red"), 60));
            // noFill();
            // translate(this.rects[i].posX * SCALING_FACTOR, this.rects[i].posY * SCALING_FACTOR, this.rects[i].posZ * SCALING_FACTOR);
            // box(this.rects[i].width * SCALING_FACTOR, this.rects[i].height * SCALING_FACTOR, this.rects[i].depth * SCALING_FACTOR);
            // pop();

        }

        for (let i = 0; i < this.interactionRects.length; i++) {
            if (this.interactionRects[i].paintedArea !== undefined) {
                this.showPainted(this.interactionRects[i].paintedArea);
            }

            // DEBUG
            // this.interactionRects[i].show();
        }

    }

    showPainted(object) {
        push();
        let rendimage = object.show();
        translate(
            object.posX * SCALING_FACTOR - (rendimage.width / 2) * SCALING_FACTOR,
            object.posY * SCALING_FACTOR - (rendimage.height / 2) * SCALING_FACTOR
        );
        // if (fxrand() > 0.8) {
        //     rotate(PI / 2);
        // }
        image(rendimage, 0, 0, rendimage.width * SCALING_FACTOR, rendimage.height * SCALING_FACTOR)
        pop();
    }
}