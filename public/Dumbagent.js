class DumbAgent {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                posXImage: 0,
                posYImage: 0,
                customWidth: exportPaper.width,
                customHeight: exportPaper.height,
                colorObject: color(100, 100, 100),
                stepSize: 10,  // 10 is hero
                agentSize: 1,
                opacityLine: 10,
                opacityPoint: 150,
                lineLength: 15,
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
        this.opacityLine = data.opacityLine;
        this.opacityPoint = data.opacityPoint;
        this.lineLength = data.lineLength;
        this.loopSize = data.loopSize;
        this.numberAgents = data.numberAgents;

        this.colorLine = color(red(this.colorObject), green(this.colorObject), blue(this.colorObject), this.opacityLine);
        this.colorPoint = color(red(this.colorObject), green(this.colorObject), blue(this.colorObject), this.opacityPoint);

        // this.colorLine.setAlpha(this.opacityLine);
        // this.colorPoint.setAlpha(this.opacityPoint);

        this.posX = getRandomFromInterval(0, this.customWidth);
        this.posY = getRandomFromInterval(0, this.customHeight);
        this.complete = false;
    }

    show() {

        for (var v = 0; v < this.numberAgents; v++) {
            for (var i = 0; i < this.loopSize; i++) {

                // let angle = getRandomFromInterval(PI / 2, PI);
                // let angle = getRandomFromList([PI / 2, PI / 4, PI]);
                let angle = i % PI;

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

                buffer.translate(this.posX, this.posY);
                buffer.strokeWeight(this.agentSize);
                buffer.stroke(this.colorLine);
                buffer.rotate(angle);
                buffer.line(0, 0, this.lineLength, this.lineLength);

                buffer.stroke(this.colorPoint);
                buffer.point(0, 0);
                buffer.point(this.lineLength, this.lineLength);

                buffer.pop();
            }
        }
    }

}