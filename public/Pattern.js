// thanks to https://github.com/matthias-jaeger-net/p5-toolkit/blob/main/src/hatches/modules/bars.ts

class Pattern {
    constructor() {
    }

    // random_dots
    static create_dots(custom_width, custom_height) {
        const amount = 2;

        this.buffer = createGraphics(custom_width, custom_height);

        for (let i = 0; i < amount; i++) {
            let x = getRandomFromInterval(0, this.buffer.width);
            let y = getRandomFromInterval(0, this.buffer.height);
            this.buffer.strokeWeight(getRandomFromInterval(0.5, 2));
            this.buffer.stroke(getRandomFromInterval(100, 150));
            this.buffer.point(x, y);
        }

        return this.buffer;
    }

    static create_noise(custom_width, custom_height) {

        this.buffer = createGraphics(custom_width, custom_height);

        this.buffer.loadPixels()
        for (let x = 0; x < this.buffer.width; x++) {
            for (let y = 0; y < this.buffer.height; y++) {
                this.buffer.set(x, y, distortColor(color(150), 12));
            }
        }
        this.buffer.updatePixels();

        // background_buffer.strokeWeight(3);
        // background_buffer.stroke(10);
        // background_buffer.point(getRandomFromInterval(0, width), getRandomFromInterval(0, height));

        return this.buffer;
    }

    static create_noise_fog(
        custom_width,
        custom_height,
        colorObject1,
        colorObject2,
        inc,
        noiseDetailLod,
        noiseDetailFalloff,
        opacityValue,
    ) {

        noiseDetail(noiseDetailLod, noiseDetailFalloff);
        let buffer = createGraphics(custom_width, custom_height);

        let yoff = 0;
        buffer.loadPixels();
        for (let y = 0; y < buffer.height; y++) {
            let xoff = 0;
            for (let x = 0; x < buffer.width; x++) {
                let index = (x + y * buffer.width) * 4;

                // let r = noise(xoff, yoff) * 255;
                // buffer.pixels[index + 0] = r;
                // buffer.pixels[index + 1] = r;
                // buffer.pixels[index + 2] = r;
                // buffer.pixels[index + 3] = r;  // 255

                // CUSTOM COLOR
                // let gain = 50;
                // let r = noise(xoff, yoff);
                // buffer.pixels[index + 0] = colorObject.levels[0] + r * gain;
                // buffer.pixels[index + 1] = colorObject.levels[1] + r * gain;
                // buffer.pixels[index + 2] = colorObject.levels[2] + r * gain;
                // buffer.pixels[index + 3] = opacityValue;

                // mix colors
                let r = noise(xoff, yoff);
                let mixedColor = lerpColor(colorObject1, colorObject2, r)
                buffer.pixels[index + 0] = mixedColor.levels[0];
                buffer.pixels[index + 1] = mixedColor.levels[1];
                buffer.pixels[index + 2] = mixedColor.levels[2];
                buffer.pixels[index + 3] = opacityValue;


                // let r = noise(xoff, yoff) * getRandomFromInterval(0, 80);
                // let g = noise(xoff, yoff) * getRandomFromInterval(0, 80);
                // let b = noise(xoff, yoff) * getRandomFromInterval(0, 80);
                // buffer.pixels[index + 0] = colorObject.levels[0] + r;
                // buffer.pixels[index + 1] = colorObject.levels[1] + g;
                // buffer.pixels[index + 2] = colorObject.levels[2] + b;
                // buffer.pixels[index + 3] = opacityValue;

                xoff += inc;
            }
            yoff += inc;
        }
        buffer.updatePixels();

        return buffer;
    }


    static create_canvas(custom_width, custom_height) {

        const colory = 190;
        const opacity = 80;
        // const colory = "#c9c9c9";
        const maxCell = 300;  // amount of cells per line
        const strokeWeight_ = 1;
        const c = brightenColor(color(colory, opacity), -20);
        const deviation = 0.3;

        this.buffer = createGraphics(custom_width, custom_height);

        const cell = maxCell;
        const scl = this.buffer.width / cell;

        for (let x = 0; x < this.buffer.width; x += scl) {
            for (let y = 0; y < this.buffer.height; y += scl) {
                this.buffer.strokeWeight(strokeWeight_);
                this.buffer.stroke(c);
                this.buffer.point(x + getRandomFromInterval(-deviation, deviation), y + getRandomFromInterval(-deviation, deviation));
            }
        }
        return this.buffer;
    }

    // LINES
    static create_lines(custom_width, custom_height) {
        const d = 4;  // 3
        const s = 3;  // 3
        // const c = BACKGROUND_COLOR;
        const c = color("#c9c9c9");  // RELATIVE to color
        const maxDist = 100;
        const dist = maxDist * d;

        this.buffer = createGraphics(custom_width, custom_height);

        const scl = (this.buffer.width / dist);
        for (let y = 0; y < this.buffer.height; y += scl) {
            this.buffer.strokeWeight(s);
            this.buffer.stroke(c);
            this.buffer.line(0, y, this.buffer.width, y);
        }
        return this.buffer;
    }

    // CORRODED - bubbles that hide background
    static create_corroded_area(custom_width, custom_height, colorObject) {
        // const background_color = 250;
        // const foreground_color = 255;
        const diff = 5;
        let foreground_color = colorObject;
        let background_color = color(
            colorObject.levels[0] - diff,
            colorObject.levels[1] - diff,
            colorObject.levels[2] - diff,
        );

        const d = 1  // 2 - 1 - 1.5 - 1.3 - 1.2
        const radius = 5;  // 3 - 3 - 3 - 3.5 - 3.5
        const maxCell = 260;
        const cell = maxCell * d;

        this.buffer = createGraphics(custom_width, custom_height);
        this.buffer.background(245);
        const scl = this.buffer.width / cell;

        this.buffer.background(background_color);
        for (let x = 0; x < this.buffer.width; x += scl) {
            for (let y = 0; y < this.buffer.height; y += scl) {
                const c = brightenColor(color(foreground_color), 5);
                const r = getRandomFromInterval(0, radius);
                // if (r > d) {
                this.buffer.stroke(c);
                this.buffer.strokeWeight(r * d);
                this.buffer.line(x + r, y - r, x, y);
                // }
            }
        }

        return this.buffer;
    }

    // BARS
    static create_bars(custom_width, custom_height) {
        const d = 1.3;
        const s = 3.5;

        const start_color = 122;
        this.buffer = createGraphics(custom_width, custom_height);
        // const c = BACKGROUND_COLOR;
        // const c = color("#c9c9c9");  // RELATIVE to color
        // const c = color("black");  // RELATIVE to color
        const c = brightenColor(color(start_color), 30);

        const maxDist = 100;
        const dist = maxDist * d;
        const scl = (this.buffer.width / dist);
        for (let x = 0; x < this.buffer.width; x += scl) {
            this.buffer.strokeWeight(s);
            this.buffer.stroke(c);
            this.buffer.line(x, 0, x, this.buffer.height);
        }
        return this.buffer;
    }

    // random artefacts as shapes. maxs of perlin noise colored.
    static create_splatter_splitter(
        custom_width,
        custom_height,
        inc = 0.05,
        noiseDetailLod = 16,
        noiseDetailFalloff = 0.9,
        opacityValue = 150,
        blackness = 145,  // amount of grey
        perlinThreshold = 0.90  // minimum to get drawn 
    ) {

        noiseDetail(noiseDetailLod, noiseDetailFalloff)
        let buffer = createGraphics(custom_width, custom_height);

        let yoff = 0;
        // buffer.fill(240);
        buffer.loadPixels();
        for (let y = 0; y < buffer.height; y++) {
            let xoff = 0;
            for (let x = 0; x < buffer.width; x++) {
                let index = (x + y * buffer.width) * 4;

                let perlinValue = noise(xoff, yoff)
                if (perlinValue >= perlinThreshold) {
                    buffer.pixels[index + 0] = perlinValue * blackness;
                    buffer.pixels[index + 1] = perlinValue * blackness;
                    buffer.pixels[index + 2] = perlinValue * blackness;
                    buffer.pixels[index + 3] = opacityValue;
                } else {
                    buffer.pixels[index + 0] = 0;
                    buffer.pixels[index + 1] = 0;
                    buffer.pixels[index + 2] = 0;
                    buffer.pixels[index + 3] = 0;
                }

                xoff += inc;
            }
            yoff += inc;
        }
        buffer.updatePixels();

        return buffer;
    }


    static create_grainy_gradient(custom_width, custom_height) {
        this.numberRows = 5;
        this.numberParticlesPerStepMax = 350;
        this.numberParticlesPerStepMin = 10;
        this.colorValueStart = 0;
        this.colorValueStop = 100;
        this.GrainSize = 1;

        this.numberParticlesCurrent = this.numberParticlesPerStepMax;
        this.numberParticlesPerStep = floor((this.numberParticlesPerStepMax - this.numberParticlesPerStepMin) / (this.numberRows - 1))
        this.colorValueCurrent = this.colorValueStart;
        this.colorStep = floor((this.colorValueStop - this.colorValueStart) / (this.numberRows - 1))

        this.buffer = createGraphics(custom_width, custom_height);

        this.rowStepSize = floor(this.buffer.height / this.numberRows);

        for (var i = 0; i < this.numberRows; i++) {
            for (var v = 0; v < this.numberParticlesCurrent; v++) {

                var posX = getRandomFromInterval(0, this.buffer.width);
                var posY = getRandomFromInterval(this.rowStepSize * i, this.rowStepSize * (i + 1))

                push();
                this.buffer.stroke(this.colorValueCurrent);
                this.buffer.strokeWeight(this.GrainSize);
                this.buffer.point(posX, posY);
                pop();
            }
            this.colorValueCurrent += this.colorStep;
            this.numberParticlesCurrent -= this.numberParticlesPerStep;
        }


        return this.buffer;

    }
}

//inspired by Robert Ryman, https://openprocessing.org/sketch/1110176/ 
class paintedSphere {

    constructor(data) {
        this.custom_width = data.custom_width;
        this.custom_height = data.custom_height;
        this.posX = data.posX;
        this.posY = data.posY;
        this.colorObject = data.colorObject;
        this.margin = data.margin;
        this.colorObjectSpread = data.colorObjectSpread;
        this.fillColorOpacityMax = data.fillColorOpacityMax;
        this.strokeColorBoost = data.strokeColorBoost;
        this.strokeOpacityMax = data.strokeOpacityMax;

        // this.strokColorWhitenessMin = 
        this.colorObjectRed = this.colorObject.levels[0];
        this.colorObjectGreen = this.colorObject.levels[1];
        this.colorObjectBlue = this.colorObject.levels[2];

        this.area = this.custom_width * this.custom_height;
        this.shapeNumber = this.area / 1000 * 7;  // relative to size

        this.buffer = createGraphics(this.custom_width, this.custom_height);

        // debug
        // this.buffer.rect(0, 0, this.buffer.width, this.buffer.height);
        for (var i = 0; i < this.shapeNumber; i++) {
            // blue value remains in example
            // let fillColorRed = getRandomFromInterval(200, 235);
            // let fillColorGreen = getRandomFromInterval(200, 235);
            // let fillColorBlue = getRandomFromInterval(255, 255);
            // let fillColorOpacity = getRandomFromInterval(0, 40);

            let fillColorRed = getRandomFromInterval(this.colorObjectRed - this.colorObjectSpread, this.colorObjectRed + this.colorObjectSpread);
            let fillColorGreen = getRandomFromInterval(this.colorObjectGreen - this.colorObjectSpread, this.colorObjectGreen + this.colorObjectSpread);
            let fillColorBlue = getRandomFromInterval(this.colorObjectBlue - this.colorObjectSpread, this.colorObjectBlue + this.colorObjectSpread);
            let fillColorOpacity = getRandomFromInterval(0, this.fillColorOpacityMax);

            let strokeSize = getRandomFromInterval(0, 50);
            let strokeColorOpacity = getRandomFromInterval(0, this.strokeOpacityMax);

            // let strokeColor = color(strokColorWhiteness, strokColorWhiteness, strokColorWhiteness, strokeColorOpacity);
            let strokeColor = color(this.colorObjectRed + this.strokeColorBoost, this.colorObjectGreen + this.strokeColorBoost, this.colorObjectBlue + this.strokeColorBoost, strokeColorOpacity);
            let fillColor = color(fillColorRed, fillColorGreen, fillColorBlue, fillColorOpacity);

            this.buffer.push();
            this.buffer.stroke(strokeColor);
            this.buffer.strokeWeight(strokeSize);
            // ATTENTION - no Stroke
            // this.buffer.noStroke();
            this.buffer.fill(fillColor);

            let widthShape = getRandomFromInterval((this.custom_width - this.margin * 2) * 0.1, (this.custom_width - this.margin * 2) * 0.5);
            let heightShape = getRandomFromInterval((this.custom_height - this.margin * 2) * 0.1, (this.custom_height - this.margin * 2) * 0.5);

            this.buffer.ellipse(getRandomFromInterval(this.margin, this.buffer.width - this.margin), getRandomFromInterval(this.margin, this.buffer.height - this.margin), widthShape, heightShape);
            this.buffer.rect(getRandomFromInterval(this.margin, this.buffer.width - this.margin - widthShape), getRandomFromInterval(this.margin, this.buffer.height - this.margin - heightShape), widthShape, heightShape);
            this.buffer.pop();
        }

        // return this.buffer;
    }
}



class DumbAgent {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                posXImage: 0,
                posYImage: 0,
                customWidth: width,
                customHeight: height,
                colorObject: color(100, 100, 100),
                stepSize: 10,  // 10 is hero
                agentSize: 1,
                opacityLevel: 20,
                opacityLevel2: 20,
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
        this.opacityLevel = data.opacityLevel;
        this.opacityLevel2 = data.opacityLevel2;
        this.lineLength = data.lineLength;
        this.loopSize = data.loopSize;
        this.numberAgents = data.numberAgents;

        this.color = color(this.colorObject.levels[0], this.colorObject.levels[1], this.colorObject.levels[2], this.opacityLevel);
        this.buffer = createGraphics(this.customWidth, this.customHeight);

        this.posX = getRandomFromInterval(0, this.buffer.width);
        this.posY = getRandomFromInterval(0, this.buffer.height);
        this.complete = false;

        this.show();
    }

    show() {

        for (var v = 0; v < this.numberAgents; v++) {
            for (var i = 0; i < this.loopSize; i++) {
                // let colory = color(getRandomFromInterval(100, 150), this.opacityLevel);
                let angle = getRandomFromInterval(PI / 2, PI);

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

                if (this.posX > this.buffer.width | this.posX < 0) {
                    this.posX = getRandomFromInterval(0, this.buffer.width)
                }
                if (this.posY > this.buffer.height | this.posY < 0) {
                    this.posY = getRandomFromInterval(0, this.buffer.height)
                }

                this.buffer.push();

                this.buffer.translate(this.posX, this.posY);
                this.buffer.strokeWeight(this.agentSize);
                this.buffer.stroke(this.color);
                // this.buffer.stroke(colory);
                // this.buffer.rotate(i % PI);
                this.buffer.rotate(angle);
                this.buffer.line(0, 0, this.lineLength, this.lineLength);

                // optional
                // this.buffer.stroke(color(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.opacityLevel2));
                // this.buffer.stroke(colory);
                this.buffer.stroke(this.color);
                this.buffer.point(0, 0);
                this.buffer.point(this.lineLength, this.lineLength);

                this.buffer.pop();
            }
        }
    }

}