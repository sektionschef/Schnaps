
//inspired by Robert Ryman, https://openprocessing.org/sketch/1110176/ 
class paintedSphere {

    constructor(data) {

        if (typeof data === 'undefined') {
            data = {
                custom_width: width,
                custom_height: height,
                posX: -width / 2,
                posY: -height / 2,
                colorObject: color(200),
                margin: 50 * SCALING_FACTOR,
                fillColorNoise: 20,
                fillColorOpacityMax: 100,
                noStroke: true,
                strokeWeight: 10,
                strokeColorNoise: 20,
                strokeOpacityMax: 50,
                numberQuantisizer: 4,
            }
        }


        this.custom_width = data.custom_width;
        this.custom_height = data.custom_height;
        this.posX = data.posX;
        this.posY = data.posY;
        this.colorObject = data.colorObject;
        this.margin = data.margin;
        this.fillColorNoise = data.fillColorNoise;
        this.fillColorOpacityMax = data.fillColorOpacityMax;
        this.noStroke = data.noStroke;
        this.strokeWeight = data.strokeWeight;
        this.strokeColorNoise = data.strokeColorNoise;
        this.strokeOpacityMax = data.strokeOpacityMax;
        this.numberQuantisizer = data.numberQuantisizer;

        // this.strokColorWhitenessMin = 
        this.colorObjectRed = this.colorObject.levels[0];
        this.colorObjectGreen = this.colorObject.levels[1];
        this.colorObjectBlue = this.colorObject.levels[2];

        this.area = this.custom_width * this.custom_height;
        this.shapeNumber = this.area / 1000 * this.numberQuantisizer;  // relative to size

        this.elements = []

        for (var i = 0; i < this.shapeNumber; i++) {
            // easier with hsb?
            let fillColorRed = getRandomFromInterval(this.colorObjectRed - this.fillColorNoise, this.colorObjectRed + this.fillColorNoise);
            let fillColorGreen = getRandomFromInterval(this.colorObjectGreen - this.fillColorNoise, this.colorObjectGreen + this.fillColorNoise);
            let fillColorBlue = getRandomFromInterval(this.colorObjectBlue - this.fillColorNoise, this.colorObjectBlue + this.fillColorNoise);
            // let fillColorOpacity = getRandomFromInterval(this.fillColorOpacityMax / 2, this.fillColorOpacityMax);
            let fillColorOpacity = this.fillColorOpacityMax;
            // let strokeColorOpacity = getRandomFromInterval(this.strokeOpacityMax / 2, this.strokeOpacityMax);
            let strokeColorOpacity = this.strokeOpacityMax;
            let widthShape = getRandomFromInterval((this.custom_width - this.margin * 2) * 0.05, (this.custom_width - this.margin * 2) * 0.05);
            let heightShape = getRandomFromInterval((this.custom_height - this.margin * 2) * 0.05, (this.custom_height - this.margin * 2) * 0.05);

            this.elements.push({
                // strokeColor: color(this.colorObjectRed + this.strokeColorNoise, this.colorObjectGreen + this.strokeColorNoise, this.colorObjectBlue + this.strokeColorNoise, strokeColorOpacity),
                strokeColor: color(fillColorRed, fillColorGreen, fillColorBlue, strokeColorOpacity),
                fillColor: color(fillColorRed, fillColorGreen, fillColorBlue, fillColorOpacity),
                widthShape: widthShape,
                heightShape: heightShape,
                strokeSize: this.strokeWeight,
                posXEl: getRandomFromInterval(this.margin, this.custom_width - this.margin),
                posYEl: getRandomFromInterval(this.margin, this.custom_height - this.margin),
                posXRe: getRandomFromInterval(this.margin, this.custom_width - this.margin - widthShape),
                posYRe: getRandomFromInterval(this.margin, this.custom_height - this.margin - heightShape),
            })
        }
    }

    show() {

        if (logging.getLevel() <= 1) {
            buffer.push();
            buffer.noFill();
            buffer.strokeWeight(2);
            buffer.stroke("black");
            // buffer.translate(this.posX - width / 2, this.posY - height / 2);
            buffer.translate((this.posX), (this.posY));
            buffer.rect(0, 0, this.custom_width, this.custom_height);
            buffer.pop();
        }

        for (var element of this.elements) {
            buffer.push();
            buffer.translate((this.posX), (this.posY));
            if (this.noStroke == true) {
                buffer.noStroke();
            } else {
                buffer.stroke(element.strokeColor);
                buffer.strokeWeight(element.strokeSize);
            }
            buffer.fill(element.fillColor);

            buffer.ellipseMode(CENTER);
            buffer.ellipse(element.posXEl, element.posYEl, element.widthShape, element.heightShape);
            buffer.rectMode(CENTER);
            buffer.rect(element.posXRe, element.posYRe, element.widthShape, element.heightShape);
            buffer.pop();
            // return
        }
    }

}
