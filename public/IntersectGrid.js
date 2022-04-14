
class IntersectGrid {
    constructor() {
        this.rect1 = {
            width: 100,
            height: 200,
            depth: 0,
            posX: 0,
            posY: 0,
            posZ: 0,
        }

        this.rect2 = {
            width: 200,
            height: 100,
            depth: 0,
            posX: mouseX - width / 2,
            posY: mouseY - height / 2,
            posZ: 0,
        }

        // helper
        var r1Start = this.rect1.posX - this.rect1.width / 2;
        var r2Start = this.rect2.posX - this.rect2.width / 2;
        var r1Full = r1Start + this.rect1.width;
        var r2Full = r2Start + this.rect2.width;
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
            (r2Start > r1Full) ||
            (r2Full < r1Start) ||
            (this.rect2.posY - this.rect2.height / 2 > this.rect1.posY - this.rect1.height / 2 + this.rect1.height) ||
            (this.rect2.posY - this.rect2.height / 2 + this.rect2.height < this.rect1.posY - this.rect1.height / 2)
        ) {
            // overlap
        } else {
            if (r2Start < r1Start) {
                // x-axis | rect 2 overlaps from left
                this.widthNew = Math.min(r2Full, r1Full) - r1Start;
                this.posXNew = (r1Start) + this.widthNew / 2;
            } else if (r2Full > r1Full) {
                // x-axis | rect 2 overlaps from right
                this.widthNew = r1Full - r2Start;
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
        fill("red");
        translate(this.rect1.posX, this.rect1.posY, this.rect1.posZ);
        box(this.rect1.width, this.rect1.height, this.rect1.depth);
        pop();

        push();
        fill("blue");
        translate(this.rect2.posX, this.rect2.posY, this.rect2.posZ);
        box(this.rect2.width, this.rect2.height, this.rect2.depth);
        pop();

        push();
        fill("purple");
        translate(this.posXNew, this.posYNew, OnTopLayer);
        box(this.widthNew, this.heightNew, 0);
        pop();
    }
}