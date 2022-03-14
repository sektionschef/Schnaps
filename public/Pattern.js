class Pattern {
    constructor(custom_width, custom_height) {

        // https://github.com/matthias-jaeger-net/p5-toolkit/blob/main/src/hatches/modules/bars.ts


        this.buffer = createGraphics(custom_width, custom_height);

        // NOISE
        // background_color = "black";
        // background_noise = 12;
        // this.buffer.loadPixels()
        // for (let x = 0; x < this.buffer.width; x++) {
        //     for (let y = 0; y < this.buffer.height; y++) {
        //         this.buffer.set(x, y, distortColor(color(background_color), background_noise));
        //     }
        // }
        // this.buffer.updatePixels();

        // background_buffer.strokeWeight(3);
        // background_buffer.stroke(10);
        // background_buffer.point(getRandomFromInterval(0, width), getRandomFromInterval(0, height));

        // Dots
        // random_dots
        const ammount = 300;
        for (let i = 0; i < ammount; i++) {
            let x = getRandomFromInterval(0, this.buffer.width);
            let y = getRandomFromInterval(0, this.buffer.height);
            this.buffer.strokeWeight(getRandomFromInterval(1, 3));
            this.buffer.stroke(getRandomFromInterval(150, 250));
            this.buffer.point(x, y);
        }


        // CANVAS
        // const d = 4;  // 3 - 4
        // const s = 3;  // 3 - 3
        // const c = brightenColor(color(BACKGROUND_COLOR), -20);
        // // const c = color("#c9c9c9");  // RELATIVE to color
        // const maxCell = 100;
        // const cell = maxCell * d;
        // const scl = this.buffer.width / cell;
        // for (let x = 0; x < this.buffer.width; x += scl) {
        //     for (let y = 0; y < this.buffer.height; y += scl) {
        //         this.buffer.strokeWeight(s);
        //         this.buffer.stroke(c);
        //         this.buffer.point(x, y);
        //     }
        // }

        // LINES
        // const d = 4;  // 3
        // const s = 3;  // 3
        // // const c = BACKGROUND_COLOR;
        // const c = color("#c9c9c9");  // RELATIVE to color
        // const maxDist = 100;
        // const dist = maxDist * d;
        // const scl = (this.buffer.width / dist);
        // for (let y = 0; y < this.buffer.height; y += scl) {
        //     this.buffer.strokeWeight(s);
        //     this.buffer.stroke(c);
        //     this.buffer.line(0, y, this.buffer.width, y);
        // }

        // CORRODED - bubbles that hide background
        // const d = 1.2  // 2 - 1 - 1.5 - 1.3
        // const s = 3.5;  // 3 - 3 - 3 - 3.5
        // const c = brightenColor(color(BACKGROUND_COLOR), 10);
        // const maxCell = 300;
        // const cell = maxCell * d;
        // const scl = this.buffer.width / cell;
        // this.buffer.background(BACKGROUND_COLOR);
        // for (let x = 0; x < this.buffer.width; x += scl) {
        //     for (let y = 0; y < this.buffer.height; y += scl) {
        //         const r = random(s);  // FXRAND
        //         if (r > d) {
        //             this.buffer.stroke(c);
        //             this.buffer.strokeWeight(r * d);
        //             this.buffer.line(x + r, y - r, x, y);
        //         }
        //     }
        // }

        // BARS
        // const d = 1.3;
        // const s = 3.5;
        // // const c = BACKGROUND_COLOR;
        // // const c = color("#c9c9c9");  // RELATIVE to color
        // // const c = color("black");  // RELATIVE to color
        // const c = brightenColor(color(BACKGROUND_COLOR), 30);

        // const maxDist = 100;
        // const dist = maxDist * d;
        // const scl = (this.buffer.width / dist);
        // for (let x = 0; x < this.buffer.width; x += scl) {
        //     this.buffer.strokeWeight(s);
        //     this.buffer.stroke(c);
        //     this.buffer.line(x, 0, x, this.buffer.height);
        // }
    }
}