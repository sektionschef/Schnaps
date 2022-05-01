class NewLines {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                posX: 200,
                posY: 200,
                custom_width: 400,
                custom_height: 200,
                colorObject: color(0),
                distance: 30,
                noise: 1,
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

            this.nOfLines = Math.floor(this.custom_width / this.distance);
            this.distance_ = (this.custom_width - this.strokeSize * this.nOfLines) / this.nOfLines;
        } else {
            this.orientation = "horizontal";

            this.nOfLines = Math.floor(this.custom_height / this.distance);
            this.distance_ = (this.custom_height - this.strokeSize * this.nOfLines) / this.nOfLines;
        }
    }

    show() {
        push();

        translate((this.posX - this.custom_width / 2) * SCALING_FACTOR, (this.posY - this.custom_height / 2) * SCALING_FACTOR, 0);

        if (logging.getLevel() <= 1) {
            // DEBUG
            noStroke();
            fill("red");
            rect(0, 0, this.custom_width * SCALING_FACTOR, this.custom_height * SCALING_FACTOR, 0);
        }

        strokeWeight(this.strokeSize);
        stroke(this.colorObject);
        noFill();
        curveTightness(this.curveTightness);


        if (this.orientation == "horizontal") {
            this.limit = this.custom_width * SCALING_FACTOR;
            for (var i = 0; i < this.custom_height * SCALING_FACTOR; i += this.distance_ * SCALING_FACTOR) {

                if (i != 0) { // skip to draw first line
                    beginShape();
                    // first
                    curveVertex(0, i, 0);
                    curveVertex(0, i, 0);
                    // middle
                    curveVertex(this.limit / 4, i + getRandomFromInterval(- this.noise * SCALING_FACTOR, this.noise * SCALING_FACTOR), 0);
                    curveVertex(this.limit * 3 / 4, i + getRandomFromInterval(- this.noise * SCALING_FACTOR, this.noise * SCALING_FACTOR), 0);
                    // last
                    curveVertex(this.limit, i, 0);
                    curveVertex(this.limit, i, 0);
                    endShape();
                }
            }
        } else if (this.orientation == "vertical") {
            this.limit = this.custom_height * SCALING_FACTOR;
            for (var i = 0; i < (this.custom_width * SCALING_FACTOR); i += this.distance_ * SCALING_FACTOR) {
                if (i != 0) {  // skip to draw first line
                    beginShape();
                    // first
                    curveVertex(i, 0, 0);
                    curveVertex(i, 0, 0);
                    // middle
                    curveVertex((i + getRandomFromInterval(- this.noise * SCALING_FACTOR, this.noise * SCALING_FACTOR)), (this.limit) / 4, 0);
                    curveVertex((i + getRandomFromInterval(- this.noise * SCALING_FACTOR, this.noise * SCALING_FACTOR)), (this.limit) * 3 / 4, 0);
                    // last
                    curveVertex(i, this.limit, 0);
                    curveVertex(i, this.limit, 0);
                    endShape();
                }
            }
        }

        pop();
    }
}