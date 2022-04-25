// class Line {
//     constructor(canvas, orientation, x, y, limit_x, limit_y) {
//         this.canvas = canvas;
//         this.orientation = orientation;
//         this.x = x;
//         this.y = y;
//         this.limit_x = limit_x;
//         this.limit_y = limit_y;
//         this.history = [];
//         this.colorObject = color(100);
//         this.colorNoise = 10;
//         this.strokeSize = 10;
//         this.strokeSizeDistort = 0.5;
//         this.line_color = distortColor(color(this.colorObject), this.colorNoise);

//         this.run_complete = false;
//         this.stroke_size_dynamic = this.strokeSize;
//         this.stroke_speed = getRandomFromInterval(0.8, 1);
//     }

//     draw() {

//         if (this.run_complete == false) {

//             if (this.orientation == "x") {
//                 if (this.x <= this.limit_x) {
//                     this.x += this.stroke_speed;
//                     this.y = this.y + getRandomFromInterval(-1 * this.strokeSizeDistort, this.strokeSizeDistort);
//                 } else {
//                     this.run_complete = true;
//                 }
//             } else if (this.orientation == "y") {
//                 if (this.y <= this.limit_y) {
//                     this.y += this.stroke_speed;
//                     this.x = this.x + getRandomFromInterval(-1 * this.strokeSizeDistort, this.strokeSizeDistort);
//                 } else {
//                     this.run_complete = true;
//                 }
//             } else if (this.orientation == "xy") {
//                 if (this.x <= this.limit_x && this.y <= this.limit_y) {
//                     this.x += this.stroke_speed;
//                     this.y += this.stroke_speed;
//                     this.x = this.x + getRandomFromInterval(-1 * this.strokeSizeDistort, this.strokeSizeDistort);
//                     this.y = this.y + getRandomFromInterval(-1 * this.strokeSizeDistort, this.strokeSizeDistort);
//                 } else {
//                     this.run_complete = true;
//                 }
//             } else if (this.orientation == "yx") {
//                 if (this.x <= this.limit_x && this.y >= this.limit_y) {
//                     this.x += this.stroke_speed;
//                     this.y -= this.stroke_speed;
//                     this.x = this.x + getRandomFromInterval(-1 * this.strokeSizeDistort, this.strokeSizeDistort);
//                     this.y = this.y + getRandomFromInterval(-1 * this.strokeSizeDistort, this.strokeSizeDistort);
//                 } else {
//                     this.run_complete = true;
//                 }
//             }

//             if (frameCount % 5 == 0) {
//                 this.stroke_size_dynamic += this.stroke_size_dynamic * getRandomFromInterval(-0.05, 0.05);
//             }

//             // brush
//             this.canvas.push();
//             this.canvas.noStroke();
//             this.canvas.fill(this.line_color);
//             if (frameCount % getRandomFromInterval(1, 2) == 0) {
//             } else {
//                 this.canvas.circle(this.x, this.y, this.stroke_size_dynamic);
//             }
//             this.canvas.pop()
//         }
//     }
// }

// class Lines {
//     constructor(canvas, distance_between_lines) {
//         this.canvas = canvas;
//         this.x_start = 0;
//         this.y_start = 0;
//         this.x_stop = this.canvas.width;
//         this.y_stop = this.canvas.height;
//         this.distance_between_lines = distance_between_lines;

//         this.bodies = [];
//         this.all_lines_complete = false;

//         let chosen_axis = getRandomFromList(["x", "y", "xy", "yx", "blank"])
//         logging.debug(chosen_axis + " axis randomly chosen.");

//         if (chosen_axis == "x") {
//             this.count_lines = (this.y_stop - this.y_start) / this.distance_between_lines;

//             for (let i = 0; i < this.count_lines; i++) {
//                 this.bodies.push(new Line(
//                     this.canvas,
//                     chosen_axis,
//                     (this.x_start),
//                     (this.y_start + this.distance_between_lines * i),
//                     (this.x_stop),
//                     this.y_stop));
//             }
//         } else if (chosen_axis == "y") {
//             this.count_lines = (this.x_stop - this.x_start) / this.distance_between_lines;

//             for (let i = 0; i < this.count_lines; i++) {
//                 this.bodies.push(new Line(
//                     this.canvas,
//                     chosen_axis,
//                     (this.x_start + this.distance_between_lines * i),
//                     this.y_start,
//                     this.x_stop,
//                     this.y_stop));
//             }
//         } else if (chosen_axis == "xy") {
//             this.count_lines = (this.x_stop - this.x_start) / this.distance_between_lines;

//             for (let i = 0; i < this.count_lines; i++) {
//                 this.bodies.push(new Line(
//                     this.canvas,
//                     chosen_axis,
//                     (this.x_start + this.distance_between_lines * i),
//                     this.y_start,
//                     this.x_stop,
//                     this.y_stop));
//             }
//             this.count_lines = (this.y_stop - this.y_start) / this.distance_between_lines;
//             // skip first one
//             for (let i = 1; i < this.count_lines; i++) {
//                 this.bodies.push(new Line(
//                     this.canvas,
//                     chosen_axis,
//                     (this.x_start),
//                     (this.y_start + this.distance_between_lines * i),
//                     this.x_stop,
//                     this.y_stop));
//             }
//         } else if (chosen_axis == "yx") {
//             this.count_lines = (this.x_stop - this.x_start) / this.distance_between_lines;

//             for (let i = 0; i < this.count_lines; i++) {
//                 this.bodies.push(new Line(
//                     this.canvas,
//                     chosen_axis,
//                     this.x_start + this.distance_between_lines * i,
//                     (this.y_stop),
//                     this.x_stop,
//                     (this.y_start)
//                 )
//                 );
//             }
//             this.count_lines = (this.y_stop - this.y_start) / this.distance_between_lines;

//             for (let i = 1; i < this.count_lines; i++) {
//                 this.bodies.push(new Line(
//                     this.canvas,
//                     chosen_axis,
//                     this.x_start,
//                     (this.y_stop - this.distance_between_lines * i),
//                     this.x_stop,
//                     this.y_start
//                 )
//                 );
//             }
//         } else if (chosen_axis == "blank") {
//         }
//     }

//     draw_lines() {
//         for (let line of this.bodies) {
//             line.draw();
//         }
//         this.check_all_complete();
//     }

//     check_all_complete() {
//         // skip if already complete
//         if (this.all_lines_complete == false) {
//             this.all_lines_complete = true;
//             for (var line of this.bodies) {
//                 if (line.run_complete == false) {
//                     this.all_lines_complete = false;
//                 }
//             }
//         }
//     }
// }


class NewLines {
    constructor(data) {
        if (typeof data === 'undefined') {
            data = {
                posXImage: 200,
                posYImage: 200,
                custom_width: 400,
                custom_height: 200,
                orientation: "vertical",
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