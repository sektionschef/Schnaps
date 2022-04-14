
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
        fill("purple");
        translate(this.posXNew, this.posYNew, OnTopLayer);
        box(this.widthNew, this.heightNew, 0);
        pop();
    }
}

class IntersectGrid {
    constructor() {
        this.MIN = 30;
        this.MAX = 250

        this.rects = []
        this.interactionRects = []

        for (let i = 0; i < 10; i++) {
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

    update() {
        for (let i = 0; i < this.interactionRects.length; i++) {
            this.interactionRects[i].update();
        }
    }

    show() {

        for (let i = 0; i < this.rects.length; i++) {
            push();
            fill("red");
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