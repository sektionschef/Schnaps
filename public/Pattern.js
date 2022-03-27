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

    static create_noise_fog(custom_width, custom_height, inc, colorObject) {

        // noiseDetail(2, 0.65);
        noiseDetail(8, 0.5);
        // noiseDetail(12, 0.8);

        // let inc = 0.01;  // 0.01 - 0.04
        // let opacityValue = 255;
        let opacityValue = 0;

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

                // CUSTOM COLOR 52, 100, 235
                // let r = noise(xoff, yoff) * 30;
                // buffer.pixels[index + 0] = 52 + r;
                // buffer.pixels[index + 1] = 100 + r;
                // buffer.pixels[index + 2] = 235 + r;
                // buffer.pixels[index + 3] = opacityValue;

                // mix colors
                let r = noise(xoff, yoff) * getRandomFromInterval(0, 80);
                let g = noise(xoff, yoff) * getRandomFromInterval(0, 80);
                let b = noise(xoff, yoff) * getRandomFromInterval(0, 80);
                // let alpha = noise(xoff, yoff) * 255;
                buffer.pixels[index + 0] = colorObject.levels[0] + r;
                buffer.pixels[index + 1] = colorObject.levels[1] + g;
                buffer.pixels[index + 2] = colorObject.levels[2] + b;
                // buffer.pixels[index + 3] = opacityValue + alpha;
                buffer.pixels[index + 3] = 150;

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
        const maxCell = 400;  // amount of cells per line
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
    static create_corroded_area(custom_width, custom_height) {
        const background_color = 250;
        const foreground_color = 255;
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
        incMin,
        incMax,
        noiseDetailLod,
        noiseDetailFalloff,
        opacityValue,
        blackness,
        perlinThreshold
    ) {
        // let incMax = 0.5;
        // let incMin = 0.3
        // noiseDetail(8, 0.6);
        // let opacityValue = 50;
        // let blackness = 160;
        // let perlinThreshold = 0.90;  // minimum to get drawn

        let inc = getRandomFromInterval(incMin, incMax);
        noiseDetail(noiseDetailLod, noiseDetailFalloff)
        let buffer = createGraphics(custom_width, custom_height);

        let yoff = 0;
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