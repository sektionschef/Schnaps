class Pattern {
    constructor() {

        // https://github.com/matthias-jaeger-net/p5-toolkit/blob/main/src/hatches/modules/bars.ts

    }

    // random_dots
    create_dots(custom_width, custom_height) {
        const amount = 30;

        this.buffer = createGraphics(custom_width, custom_height);

        for (let i = 0; i < amount; i++) {
            let x = getRandomFromInterval(0, this.buffer.width);
            let y = getRandomFromInterval(0, this.buffer.height);
            this.buffer.strokeWeight(getRandomFromInterval(1, 3));
            this.buffer.stroke(getRandomFromInterval(150, 250));
            this.buffer.point(x, y);
        }
    }

    create_noise(custom_width, custom_height) {

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
    }

    create_noise_fog(custom_width, custom_height) {

        let inc = 0.01;  // 0.01

        this.buffer = createGraphics(custom_width, custom_height);

        let yoff = 0;
        this.buffer.loadPixels();
        for (let y = 0; y < height; y++) {
            let xoff = 0;
            for (let x = 0; x < width; x++) {
                let index = (x + y * width) * 4;

                // let r = noise(xoff, yoff) * 255;
                // this.buffer.pixels[index + 0] = r;
                // this.buffer.pixels[index + 1] = r;
                // this.buffer.pixels[index + 2] = r;
                // this.buffer.pixels[index + 3] = 255;

                let r = noise(xoff, yoff) * 30;
                this.buffer.pixels[index + 0] = 50 + r;
                this.buffer.pixels[index + 1] = 90 + r;
                this.buffer.pixels[index + 2] = 0 + r;
                // this.buffer.pixels[index + 3] = 100 + r;
                this.buffer.pixels[index + 3] = 255;


                xoff += inc;
            }
            yoff += inc;
        }
        this.buffer.updatePixels();
    }


    create_canvas(custom_width, custom_height) {

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
    }

    // LINES
    create_lines(custom_width, custom_height) {
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
    }

    // CORRODED - bubbles that hide background
    create_corroded_area(custom_width, custom_height) {
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
    }

    // BARS
    create_bars(custom_width, custom_height) {
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
    }
}