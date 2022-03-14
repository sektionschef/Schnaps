function getRandomFromInterval(min, max) {
    return fxrand() * (max - min) + min;
}

function getRandomFromList(items) {
    return items[Math.floor(fxrand() * items.length)];
}

function distortColor(colorObject, max_diff) {
    if (typeof max_diff == "undefined") {
        max_diff = 10;
    }
    let red = (colorObject.levels[0] + getRandomFromInterval(-max_diff, max_diff));
    let green = (colorObject.levels[1] + getRandomFromInterval(-max_diff, max_diff));
    let blue = (colorObject.levels[2] + getRandomFromInterval(-max_diff, max_diff));
    let opacity = colorObject.levels[3];

    // not larger than 255 and not smaller than 0
    red = Math.min(Math.max(parseInt(red), 0), 255);
    green = Math.min(Math.max(parseInt(green), 0), 255);
    blue = Math.min(Math.max(parseInt(blue), 0), 255);

    return color(red, green, blue, opacity);
}

function brightenColor(colorObject, diff) {
    let diff_constant = getRandomFromInterval(-diff, diff)
    let red = (colorObject.levels[0] + diff_constant);
    let green = (colorObject.levels[1] + diff_constant);
    let blue = (colorObject.levels[2] + diff_constant);
    let opacity = colorObject.levels[3];

    // not larger than 255 and not smaller than 0
    red = Math.min(Math.max(parseInt(red), 0), 255);
    green = Math.min(Math.max(parseInt(green), 0), 255);
    blue = Math.min(Math.max(parseInt(blue), 0), 255);

    return color(red, green, blue, opacity);
}

// each time window.innerWidth changes
function windowResized() {
    logging.debug("Window is resized.");
    resize_canvas();
}

// calculate the scaling params - choose the limiting factor either height or width
function resize_canvas() {
    rescaling_width = windowWidth / CANVAS_WIDTH
    rescaling_height = windowHeight / CANVAS_HEIGHT

    if (rescaling_width < rescaling_height) {
        logging.debug("Width is smaller than height. Width dominates")
        SCALING_FACTOR = rescaling_width
    } else {
        logging.debug("width is larger than height. Height dominates.")
        SCALING_FACTOR = rescaling_height
    }

    // Override for full scale
    // SCALING_FACTOR = 1;

    resizeCanvas(CANVAS_WIDTH * SCALING_FACTOR, CANVAS_HEIGHT * SCALING_FACTOR);
    reset_camera();
}

function reset_camera() {
    camera(...cameraDefault);
}

function keyTyped() {
    if (key === 's') {
        noLoop();
        saveCanvas(canvas, 'snapshot', 'png');
        loop();
    } else if (key === "r") {
        reset_camera()
    } else if (key === "c") {
        camera(0, 0, height * 1.5 / SCALING_FACTOR, 0, 0, 0, 0, 1, 0);
    }
}


function label_feature(value, min, max) {
    let label;
    let third = (max - min) / 3

    if (value < (min + third)) {
        label = "low"
    } else if (value < min + third * 2) {
        label = "medium"
    } else {
        label = "high"
    }
    return label
}
