
class IntersectRect {
    constructor(rect1, rect2) {
        this.rect1 = rect1;
        this.rect2 = rect2;
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

        this.posXNew;
        this.widthNew;
        this.posYNew;
        this.heightNew;

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
        fill(distortColor(color("purple"), 60));
        translate(this.posXNew, this.posYNew, OnTopLayer);
        box(this.widthNew, this.heightNew, 0);
        pop();
    }
}

class IntersectGrid {
    constructor() {
        this.MIN = 30;
        this.MAX = 200;
        this.numberRects = 30

        this.rects = []
        this.interactionRects = []

        for (let i = 0; i < this.numberRects; i++) {
            this.rects.push(
                {
                    width: getRandomFromInterval(this.MIN, this.MAX),
                    height: getRandomFromInterval(this.MIN, this.MAX),
                    depth: 0,
                    posX: getRandomFromInterval(- width / 2 + this.MAX, width / 2 - this.MAX),
                    posY: getRandomFromInterval(- width / 2 + this.MAX, width / 2 - this.MAX),
                    posZ: 0,  // not used I think
                }
            )
        }

        this.getIntersections();
    }

    getIntersections() {
        for (let i = 0; i < this.rects.length; i++) {
            for (let j = (0 + i + 1); j < this.rects.length; j++) {
                // if (i != j) {
                this.interactionRects.push(new IntersectRect(this.rects[i], this.rects[j]));
                // }
            }
        }

        this.update();
    }

    createPaintbrushAreas() {


        // PARAMS FOR BRUSHDATA
        if (i < loopNumberPaintbrush * 0.75) {  // last quarter is smaller
            brushData.custom_width = getRandomFromInterval(50, 500);
            brushData.custom_height = getRandomFromInterval(50, 500);
        } else {
            brushData.custom_width = getRandomFromInterval(50, 100);
            brushData.custom_height = getRandomFromInterval(50, 100);
        }
        brushData.posX = getRandomFromInterval(brushData.custom_width / 2 - width / 2, width / 2 - brushData.custom_width / 2);
        brushData.posY = getRandomFromInterval(brushData.custom_height / 2 - height / 2, height / 2 - brushData.custom_height / 2);
        brushData.colorObject = getRandomFromList([color1, color2, color3, color4]);
        brushData.brushLength = getRandomFromInterval(50, 70);
        brushData.sizeStroke = getRandomFromInterval(1.5, 2);
        brushData.numberFibres = getRandomFromInterval(15, 20);
        brushData.overlap = getRandomFromInterval(10, 60);
        brushData.brightnessNoise = getRandomFromInterval(15, 35);
        brushData.colorNoise = getRandomFromInterval(5, 10);
        brushData.opacityBoost = getRandomFromInterval(150, 255);
        // brushLengthNoise: 0.2,
        // numberFibresNoise: 0.2,
        brushData.angleNoise = getRandomFromInterval(PI / 60, PI / 20);  // 0, PI
        // fibreCurveTightness: 3,  // shape of curve, between 0 and 5; little effect
        // fibreColorNoise: 5,
        brushData.fibreBrightnessNoise = getRandomFromInterval(5, 30);
        brushData.fibreStrokeSizeNoise = 0.05;
        // fibreStartXNoise: 5,  // start earlier or later
        brushData.fibreYNoise = 1;  // noise of fibre along the y axis in the middle
        brushData.fibreRotationNoise = PI / 80;

        paintbrushareas.push(new PaintBrushArea(brushData));
    }

    update() {
        for (let i = 0; i < this.interactionRects.length; i++) {
            this.interactionRects[i].update();
        }
    }

    show() {

        for (let i = 0; i < this.rects.length; i++) {
            push();
            fill(distortColor(color("red"), 60));
            translate(this.rects[i].posX, this.rects[i].posY, this.rects[i].posZ);
            box(this.rects[i].width, this.rects[i].height, this.rects[i].depth);
            pop();
        }

        for (let i = 0; i < this.interactionRects.length; i++) {
            this.interactionRects[i].show();
        }

        // push();
        // fill("blue");
        // translate(this.rect2.posX, this.rect2.posY, this.rect2.posZ);
        // box(this.rect2.width, this.rect2.height, this.rect2.depth);
        // pop();
    }

}