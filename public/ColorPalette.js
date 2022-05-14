class ColorPalette {
    constructor() {

        this.primaryColorHue = Math.round(getRandomFromInterval(0, 360));
        this.primaryColorSaturation = 85 // Math.round(getRandomFromInterval(90, 91));
        this.primaryColorBrightness = 85 // Math.round(getRandomFromInterval(90, 91));

        this.secondaryColorHue = this.primaryColorHue - (360 / 2) + 1;
        if (this.secondaryColorHue < 0) {
            this.secondaryColorHue += 360;
        }

        colorMode(HSB);
        this.primaryColor = color(this.primaryColorHue, this.primaryColorSaturation, this.primaryColorBrightness);
        this.secondaryColor = color(this.secondaryColorHue, this.primaryColorSaturation, this.primaryColorBrightness);
        colorMode(RGB);
    }

    showDebug() {

        logging.debug("primary color:")
        logging.debug(this.primaryColor);
        logging.debug("secondary color:")
        logging.debug(this.secondaryColor);

        push();
        translate(-200, 0);
        fill(this.primaryColor);
        noStroke();
        rect(0, 0, 200, 200);
        pop();

        push();
        translate(0, 0);
        fill(this.secondaryColor);
        noStroke();
        rect(0, 0, 200, 200);
        pop();
    }
}