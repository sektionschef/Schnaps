class DumbAgent {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                posXImage: 0,
                posYImage: 0,
                customWidth: width,
                customHeight: height,
                colorObject: color(100, 100, 100),
                stepSize: 10 * SCALING_FACTOR,  // 10 is hero
                agentSize: 1 * SCALING_FACTOR,
                opacityLevel: 10,
                // opacityLevel2: 20,
                lineLength: 15 * SCALING_FACTOR,
                loopSize: 10000,
                numberAgents: 5,
            }
        }
        this.posXImage = data.posXImage;
        this.posYImage = data.posYImage;
        this.customWidth = data.customWidth;
        this.customHeight = data.customHeight;
        this.colorObject = data.colorObject;
        this.stepSize = data.stepSize;
        this.agentSize = data.agentSize;
        this.opacityLevel = data.opacityLevel;
        // this.opacityLevel2 = data.opacityLevel2;
        this.lineLength = data.lineLength;
        this.loopSize = data.loopSize;
        this.numberAgents = data.numberAgents;

        this.color = color(
            this.colorObject.levels[0],
            this.colorObject.levels[1],
            this.colorObject.levels[2],
            this.opacityLevel
        );
        // this.buffer = createGraphics(this.customWidth, this.customHeight);

        this.posX = getRandomFromInterval(0, this.customWidth);
        this.posY = getRandomFromInterval(0, this.customHeight);
        this.complete = false;
    }

    show() {

        for (var v = 0; v < this.numberAgents; v++) {
            for (var i = 0; i < this.loopSize; i++) {

                // let colory = color(getRandomFromInterval(100, 150), this.opacityLevel);

                let angle = getRandomFromInterval(PI / 2, PI);
                // let angle = getRandomFromList([PI / 2, PI / 4, PI]);

                let directive = getRandomFromList([
                    "up",
                    "up-right",
                    "right",
                    "right-down",
                    "down",
                    "down-left",
                    "left",
                    "left-up"
                ]);

                if (directive == "up") {
                    this.posY -= this.stepSize;
                } else if (directive == "up-right") {
                    this.posX += this.stepSize;
                    this.posY -= this.stepSize;
                } else if (directive == "right") {
                    this.posX += this.stepSize;
                } else if (directive == "right-down") {
                    this.posX += this.stepSize;
                    this.posY += this.stepSize;
                } else if (directive == "down") {
                    this.posY += this.stepSize;
                } else if (directive == "down-left") {
                    this.posX -= this.stepSize;
                    this.posY += this.stepSize;
                } else if (directive == "left") {
                    this.posX -= this.stepSize;
                } else if (directive == "left-up") {
                    this.posX -= this.stepSize;
                    this.posY -= this.stepSize;
                }

                if (this.posX > this.customWidth | this.posX < 0) {
                    this.posX = getRandomFromInterval(0, this.customWidth)
                }
                if (this.posY > this.customHeight | this.posY < 0) {
                    this.posY = getRandomFromInterval(0, this.customHeight)
                }

                buffer.push();

                // buffer.translate(this.posX - width / 2, this.posY - height / 2);
                buffer.translate(this.posX, this.posY);
                buffer.strokeWeight(this.agentSize);
                buffer.stroke(this.color);
                // stroke(colory);
                // rotate(i % PI);
                buffer.rotate(angle);
                buffer.line(0, 0, this.lineLength, this.lineLength);

                // optional
                // stroke(color(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.opacityLevel2));
                // stroke(colory);
                buffer.stroke(this.color);
                buffer.point(0, 0);
                buffer.point(this.lineLength, this.lineLength);

                buffer.pop();
            }
        }
    }

}