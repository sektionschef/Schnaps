class NewLines {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                posXImage: 200,
                posYImage: 200,
                custom_width: 400,
                custom_height: 200,
                colorObject: color(100),
                distance: 30,
                noise: 4,
                strokeSize: 2,
                curveTightness: 3,
            }
        }

        this.posXImage = data.posXImage;
        this.posYImage = data.posYImage;
        this.buffer = createGraphics(data.custom_width, data.custom_height);
        this.colorObject = data.colorObject;
        this.distance = data.distance;
        this.noise = data.noise;
        this.strokeSize = data.strokeSize;
        this.curveTightness = data.curveTightness;

        this.buffer.push();
        this.buffer.noFill();
        this.buffer.rect(0, 0, this.buffer.width, this.buffer.height);
        this.buffer.pop();

        this.buffer.strokeWeight(this.strokeSize);
        this.buffer.stroke(this.colorObject);
        this.buffer.noFill();
        this.buffer.curveTightness(this.curveTightness);

        if (this.buffer.width > this.buffer.height) {
            this.orientation = "vertical";
        } else {
            this.orientation = "horizontal";
        }

        if (this.orientation == "horizontal") {
            this.limit = this.buffer.width;
            for (var i = 0; i < this.buffer.height; i = i + this.distance) {
                this.buffer.beginShape();
                // first
                this.buffer.curveVertex(0, i);
                this.buffer.curveVertex(0, i);
                // middle
                this.buffer.curveVertex((this.limit) / 4, (i + getRandomFromInterval(- this.noise, this.noise)));
                this.buffer.curveVertex((this.limit) * 3 / 4, (i + getRandomFromInterval(- this.noise, this.noise)));
                // last
                this.buffer.curveVertex(this.limit, i);
                this.buffer.curveVertex(this.limit, i);
                this.buffer.endShape();
            }
        } else if (this.orientation == "vertical") {
            this.limit = this.buffer.height;
            for (var i = 0; i < this.buffer.width; i = i + this.distance) {
                this.buffer.beginShape();
                // first
                this.buffer.curveVertex(i, 0);
                this.buffer.curveVertex(i, 0);
                // middle
                this.buffer.curveVertex((i + getRandomFromInterval(- this.noise, this.noise)), (this.limit) / 4);
                this.buffer.curveVertex((i + getRandomFromInterval(- this.noise, this.noise)), (this.limit) * 3 / 4);
                // last
                this.buffer.curveVertex(i, this.limit);
                this.buffer.curveVertex(i, this.limit);
                this.buffer.endShape();
            }
        }
    }
}