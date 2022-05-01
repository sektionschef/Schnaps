class NewLines {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                posX: 200,
                posY: 200,
                custom_width: 400,
                custom_height: 200,
                colorObject: color(100),
                distance: 30,
                noise: 4,
                strokeSize: 2,
                curveTightness: 3,
            }
        }

        this.posX = data.posX;
        this.posY = data.posY;
        this.custom_width = data.custom_width;
        this.custom_height = data.custom_height;
        this.colorObject = data.colorObject;
        this.distance = data.distance;
        this.noise = data.noise;
        this.strokeSize = data.strokeSize;
        this.curveTightness = data.curveTightness;

        if (this.custom_width > this.custom_height) {
            this.orientation = "vertical";

            this.nOfLines = Math.floor(this.custom_width / this.distance * SCALING_FACTOR);
            this.distance_ = (this.custom_width - this.strokeSize * this.nOfLines) / this.nOfLines * SCALING_FACTOR;
        } else {
            this.orientation = "horizontal";

            this.nOfLines = Math.floor(this.custom_height / this.distance * SCALING_FACTOR);
            this.distance_ = (this.custom_height - this.strokeSize * this.nOfLines) / this.nOfLines * SCALING_FACTOR;
        }
    }

    show() {
        push();

        strokeWeight(this.strokeSize);
        stroke(this.colorObject);
        noFill();
        curveTightness(this.curveTightness);

        translate((this.posX - width / 2) * SCALING_FACTOR, (this.posY - height / 2) * SCALING_FACTOR, 0);

        if (logging.getLevel() <= 1) {
            // DEBUG
            rect(0, 0, this.custom_width * SCALING_FACTOR, this.custom_height * SCALING_FACTOR);
        }

        console.log(this.orientation);

        if (this.orientation == "horizontal") {
            this.limit = this.custom_width * SCALING_FACTOR;
            for (var i = 0; i < this.custom_height * SCALING_FACTOR; i += this.distance_) {
                beginShape();
                // first
                curveVertex(0, i);
                curveVertex(0, i);
                // middle
                curveVertex((this.limit) / 4, (i + getRandomFromInterval(- this.noise * SCALING_FACTOR, this.noise * SCALING_FACTOR)));
                curveVertex((this.limit) * 3 / 4, (i + getRandomFromInterval(- this.noise * SCALING_FACTOR, this.noise * SCALING_FACTOR)));
                // last
                curveVertex(this.limit, i);
                curveVertex(this.limit, i);
                endShape();
            }
        } else if (this.orientation == "vertical") {
            this.limit = this.custom_height * SCALING_FACTOR;
            for (var i = 0; i < (this.custom_width * SCALING_FACTOR); i += this.distance_) {
                beginShape();
                // first
                curveVertex(i, 0);
                curveVertex(i, 0);
                // middle
                curveVertex((i + getRandomFromInterval(- this.noise * SCALING_FACTOR, this.noise * SCALING_FACTOR)), (this.limit) / 4);
                curveVertex((i + getRandomFromInterval(- this.noise * SCALING_FACTOR, this.noise * SCALING_FACTOR)), (this.limit) * 3 / 4);
                // last
                curveVertex(i, this.limit);
                curveVertex(i, this.limit);
                endShape();
            }
        }

        pop();
    }
}