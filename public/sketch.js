// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
const SWITCH_LOGGING_LEVEL = "info";
// const SWITCH_LOGGING_LEVEL = "debug";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = CANVAS_WIDTH;


// LINES
const STROKE_SIZE_MIN = 0.1
const STROKE_SIZE_MAX = 1
const STROKE_SIZE = getRandomFromInterval(STROKE_SIZE_MIN, STROKE_SIZE_MAX);
const STROKE_DISTORT = getRandomFromInterval(0, 0.2);
const STROKE_NOISE = 5;
let distanceBetweenLines;

// PAINT
const BORDER_FRAME_MIN = 5;
const BORDER_FRAME_MAX = 35;
BORDER_FRAME = getRandomFromInterval(BORDER_FRAME_MIN, BORDER_FRAME_MAX);
const BRUSH_SIZE_MIN = 10;
const BRUSH_SIZE_MAX = 30;
const BRUSH_SIZE = getRandomFromInterval(BRUSH_SIZE_MIN, BRUSH_SIZE_MAX);
const BRUSH_TIGHTNESS_MIN = 0;
const BRUSH_TIGHTNESS_MAX = 5;
const BRUSH_TIGHTNESS = getRandomFromInterval(BRUSH_TIGHTNESS_MIN, BRUSH_TIGHTNESS_MAX);
const PRIMARY_STROKE_WEIGHT_MIN = 2;
const PRIMARY_STROKE_WEIGHT_MAX = 4;
const PRIMARY_STROKE_WEIGHT = getRandomFromInterval(PRIMARY_STROKE_WEIGHT_MIN, PRIMARY_STROKE_WEIGHT_MAX);

// palette = https://colorhunt.co/palette/97bfb4f5eedcdd4a484f091d
// const COLOR_1_HEX = "#97BFB4";
// const COLOR_2_HEX = "#F5EEDC";
// const COLOR_3_HEX = "#DD4A48";
// const COLOR_4_HEX = "#4F091D";

// https://colorhunt.co/palette/22577e5584ac95d1ccfaffaf
const COLOR_1_HEX = "#22577E";
const COLOR_2_HEX = "#5584AC";
const COLOR_3_HEX = "#95D1CC";
const COLOR_4_HEX = "#FAFFAF";

// https://colorhunt.co/palette/21325e3e497af1d00af0f0f0
// const COLOR_1_HEX = "#21325E";
// const COLOR_2_HEX = "#3E497A";
// const COLOR_3_HEX = "#F1D00A";  // yellow
// const COLOR_4_HEX = "#F0F0F0";

// https://colorhunt.co/palette/000957344cb7577bc1ebe645
// const COLOR_1_HEX = "#000957";
// const COLOR_2_HEX = "#344CB7";
// const COLOR_3_HEX = "#577BC1";
// const COLOR_4_HEX = "#EBE645"; // yellow



// variable stuff
let SCALING_FACTOR = 1;
let rescaling_width;
let rescaling_height;
let preview_called = false;

let fxhash_number;
let xoff = 0;


logging.info("FXHASH: " + fxhash);
// logging.info("Grid: " + GRID);
// logging.info("Paired boxes: " + PAIRING_COUNT);
// logging.info("Palette: " + chosenPalette.name);
// logging.info("Camera flight: " + chosenCameraFlight.name);
// logging.info("Paint frame: " + label_feature(BORDER_FRAME, BORDER_FRAME_MIN, BORDER_FRAME_MAX)); //+ Math.round(BORDER_FRAME));
// logging.info("Brush region: " + label_feature(BRUSH_SIZE, BRUSH_SIZE_MIN, BRUSH_SIZE_MAX)); //+ Math.round(BRUSH_SIZE));
// logging.info("Brush size: " + label_feature(PRIMARY_STROKE_WEIGHT, PRIMARY_STROKE_WEIGHT_MIN, PRIMARY_STROKE_WEIGHT_MAX)); //+ Math.round(PRIMARY_STROKE_WEIGHT));
// logging.info("Brush tightness: " + label_feature(BRUSH_TIGHTNESS, BRUSH_TIGHTNESS_MIN, BRUSH_TIGHTNESS_MAX));// + Math.round(BRUSH_TIGHTNESS));
// logging.info("Line Stroke weight: " + label_feature(STROKE_SIZE, STROKE_SIZE_MIN, STROKE_SIZE_MAX));// + Math.round((STROKE_SIZE + Number.EPSILON) * 100) / 100);

function preload() {
  // font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
  pixelDensity(1);
  logging.setLevel(SWITCH_LOGGING_LEVEL);

  // let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL).parent('canvasHolder');
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);

  fxhash_number = hashFnv32a(fxhash);
  logging.info("hash number: " + fxhash_number);
  noiseSeed(fxhash_number);

  color1 = color(COLOR_1_HEX);
  color2 = color(COLOR_2_HEX);
  color3 = color(COLOR_3_HEX);
  color4 = color(COLOR_4_HEX);

  // slider = createSlider(10, 60, 30);
  // slider.position(10, 10);
  // slider.style('width', '300px');


  // flowfield = new FlowField(600, 300);

  // RANDOM AREAS
  // let minAreaSize = 100;
  // let maxAreaSize = 350;
  // let minPosX = - width / 2 - 50;
  // let minPosY = - height / 2 - 50;
  // let maxPosX = width / 2 + 50;
  // let maxPosY = height / 2 + 50;
  // // let colorArea = own color for each area
  // all_areas = []
  // for (let i = 0; i < 180; i++) {
  //   let random_color_code = getRandomFromList(["#123456", "#babdff", "#a0a3e8", "#9fa2ed", "#9799d1", "#fadc57"]);
  //   // let random_color_code = ("#babdff" + getRandomFromList(["f3", "cc", "99", "43"]))
  //   all_areas.push(
  //     new Paint(
  //       getRandomFromInterval(minAreaSize, maxAreaSize),
  //       getRandomFromInterval(minAreaSize, maxAreaSize),
  //       getRandomFromInterval(minPosX, maxPosX),
  //       getRandomFromInterval(minPosY, maxPosY),
  //       random_color_code
  //     ));
  // }


  // painted_area = new Paint(200, 400, -500, -500, color1);
  // painted_area_2 = new Paint(300, 500, -300, -550, color4);

  // paper = Pattern.create_corroded_area(width, height, color(240));
  // dots = Pattern.create_dots(width, height);
  // normal_noise = Pattern.create_noise(100, 100);
  canvasOverlay = Pattern.create_canvas(width, height);
  // lines = Pattern.create_lines(width, height);
  // bars = Pattern.create_bars(width, height);

  // noise_fog = Pattern.create_noise_fog(width, height, color1, color3, 0.009, 12, 0.5, 255);

  splatter = Pattern.create_splatter_splitter(width, height);

  // grainy_gradient = Pattern.create_grainy_gradient(width, height);

  // agent = new DumbAgent(width, height, color(0));

  sphereData = {
    custom_width: 400,
    custom_height: 200,
    posX: 0,
    posY: 0,
    colorObject: color3,
    margin: 70,
    colorObjectSpread: 10,
    fillColorOpacityMax: 150,
    strokeColorBoost: 50,
    strokeOpacityMax: 40
  }

  sphereBackgroundData = {
    custom_width: width,
    custom_height: height,
    posX: -width / 2,
    posY: -height / 2,
    colorObject: color(210),
    margin: 10,
    colorObjectSpread: 20,
    fillColorOpacityMax: 30,
    strokeColorBoost: 50,
    strokeOpacityMax: 40
  }


  brushData = {
    custom_width: 300,
    custom_height: 100,
    posX: -500,
    posY: 0,
    colorObject: color("#DD4A48"),
    brushLength: 60,
    sizeStroke: 2,
    numberFibres: 15,
    overlap: 30,  // adding to desired size
    brightnessNoise: 20,
    colorNoise: 5,
    opacityBoost: 0,
    brushLengthNoise: 0.2,
    numberFibresNoise: 0.2,
    angleNoise: PI / 30,
    fibreCurveTightness: 3,  // shape of curve, between 0 and 5; little effect
    fibreColorNoise: 5,
    fibreBrightnessNoise: 10,
    fibreStrokeSizeNoise: 0.2,
    fibreStartXNoise: 5,  // start earlier or later
    fibreYNoise: 1,  // noise of fibre along the y axis in the middle
    fibreRotationNoise: PI / 80,
  }


  paintbrushareas = [];
  // CLASS aus spheres
  paintedSpheres = [];

  loopNumberPaintbrush = 100;
  loopNumberSpheres = 200;
  // PAINTBRUSH befor rects
  // for (var i = 0; i < loopNumberPaintbrush; i++) {
  //   // PARAMS FOR BRUSHDATA
  //   if (i < loopNumberPaintbrush * 0.75) {  // last quarter is smaller
  //     brushData.custom_width = getRandomFromInterval(50, 500);
  //     brushData.custom_height = getRandomFromInterval(50, 500);
  //   } else {
  //     brushData.custom_width = getRandomFromInterval(50, 100);
  //     brushData.custom_height = getRandomFromInterval(50, 100);
  //   }
  //   brushData.posX = getRandomFromInterval(brushData.custom_width / 2 - width / 2, width / 2 - brushData.custom_width / 2);
  //   brushData.posY = getRandomFromInterval(brushData.custom_height / 2 - height / 2, height / 2 - brushData.custom_height / 2);
  //   brushData.colorObject = getRandomFromList([color1, color2, color3, color4]);
  //   brushData.brushLength = getRandomFromInterval(50, 70);
  //   brushData.sizeStroke = getRandomFromInterval(1.5, 2);
  //   brushData.numberFibres = getRandomFromInterval(15, 20);
  //   brushData.overlap = getRandomFromInterval(10, 60);
  //   brushData.brightnessNoise = getRandomFromInterval(15, 35);
  //   brushData.colorNoise = getRandomFromInterval(5, 10);
  //   brushData.opacityBoost = getRandomFromInterval(150, 255);
  //   // brushLengthNoise: 0.2,
  //   // numberFibresNoise: 0.2,
  //   brushData.angleNoise = getRandomFromInterval(PI / 60, PI / 20);  // 0, PI
  //   // fibreCurveTightness: 3,  // shape of curve, between 0 and 5; little effect
  //   // fibreColorNoise: 5,
  //   brushData.fibreBrightnessNoise = getRandomFromInterval(5, 30);
  //   brushData.fibreStrokeSizeNoise = 0.05;
  //   // fibreStartXNoise: 5,  // start earlier or later
  //   brushData.fibreYNoise = 1;  // noise of fibre along the y axis in the middle
  //   brushData.fibreRotationNoise = PI / 80;

  //   paintbrushareas.push(new PaintBrushArea(brushData));

  //   // console.log(paintbrushareas[i]);
  // }

  for (var i = 0; i < loopNumberSpheres; i++) {  // PARAMS FOR SPHERE
    sphereData.custom_width = getRandomFromInterval(100, 300);
    sphereData.custom_height = getRandomFromInterval(100, 300);
    sphereData.posX = getRandomFromInterval(-sphereData.custom_width / 2 - width / 2, width / 2 + sphereData.custom_width / 2);
    sphereData.posY = getRandomFromInterval(-sphereData.custom_height / 2 - height / 2, height / 2 + sphereData.custom_height / 2);;
    sphereData.colorObject = getRandomFromList([color1, color2, color4]);;
    sphereData.margin = 50;
    sphereData.colorObjectSpread = 10;
    sphereData.fillColorOpacityMax = 70;
    sphereData.strokeColorBoost = 50;
    sphereData.strokeOpacityMax = 40;

    // paintedSpheres.push(new paintedSphere(sphereData));
  }

  backgroundSphere = new paintedSphere(sphereBackgroundData);

  // paper = paper.get()
  // paper.mask(noise_fog);

  resize_canvas();

  // binomial_points = [];

  // for (var i = 0; i < 5000; i++) {
  //   x_input = getRandomFromInterval(1, 600)
  //   binomial_points.push(createVector(x_input, (betaPDF(x = 0.5, a = x_input, b = x_input) * 10)));
  // }
  // console.log(binomial_points);

}


function draw() {

  // orbitControl(1, 1, 0.1);
  ambientLight(255, 255, 255);
  ambientMaterial(255);

  // let val = slider.value();
  // brushData.brushLength = slider.value();

  // background(color2);
  background(130);

  // image(paper);
  // shape = createGraphics(width, height);
  // shape.ellipse(200, 200, 200, 200);
  // paper = paper.get(); // convert to image
  // paper.mask

  // image(paper, - width / 2, - height / 2, paper.width * SCALING_FACTOR, paper.height * SCALING_FACTOR);

  image(backgroundSphere.buffer, - width / 2, - height / 2, backgroundSphere.buffer.width, backgroundSphere.buffer.height);
  image(splatter, - width / 2, - height / 2, splatter.width, splatter.height);

  // CANVAS
  image(canvasOverlay, - width / 2, - height / 2, canvasOverlay.width * SCALING_FACTOR, canvasOverlay.height * SCALING_FACTOR);

  // maska
  // brush.buffer = brush.buffer.get();
  // brush.buffer.mask(fog.buffer);

  // painted_area.show();
  // painted_area_2.show();
  // image(painted_area.buffer, painted_area.posX, painted_area.posY, painted_area.buffer.width, painted_area.buffer.height);
  // image(painted_area_2.buffer, painted_area_2.posX, painted_area_2.posY, painted_area_2.buffer.width, painted_area_2.buffer.height);

  // RANDOM AREAS
  // for (let area of all_areas) {
  //   area.show();
  //   image(area.buffer, area.posX, area.posY, area.buffer.width, area.buffer.height);
  // }

  // PERLIN Noise
  // image(flowfield.update_noise(), -300, 0);

  // PERLIN NOISE
  // image(noise_fog, - width / 2, - height / 2, noise_fog.width, noise_fog.height);

  // image(backup, - width / 2, - height / 2, backup.width * SCALING_FACTOR, backup.height * SCALING_FACTOR);
  // image(backdown, - width / 2, - height / 2 + backup.height + backmiddle.height, backdown.width * SCALING_FACTOR, backdown.height * SCALING_FACTOR);

  for (var i = 0; i < loopNumberSpheres; i++) {
    // image(paintedSpheres[i].buffer, paintedSpheres[i].posX, paintedSpheres[i].posY, paintedSpheres[i].buffer.width * SCALING_FACTOR, paintedSpheres[i].buffer.height * SCALING_FACTOR);
  }

  // PAINTBRUSH BEFORE Rects
  // for (var i = 0; i < loopNumberPaintbrush; i++) {
  //   push();
  //   translate(paintbrushareas[i].posX, paintbrushareas[i].posY);
  //   if (fxrand() > 0.8) {
  //     rotate(PI / 2);
  //   }
  //   image(paintbrushareas[i].show(), 0, 0, paintbrushareas[i].width * SCALING_FACTOR, paintbrushareas[i].height * SCALING_FACTOR)
  //   pop();
  // }

  // image(sphere, - sphere.width / 2, - sphere.height / 2, sphere.width * SCALING_FACTOR, sphere.height * SCALING_FACTOR);

  // image(backmiddle, - width / 2, - height / 2 + backup.height, backmiddle.width * SCALING_FACTOR, backmiddle.height * SCALING_FACTOR);

  // image(agent.buffer, - width / 2, - height / 2, agent.buffer.width * SCALING_FACTOR, agent.buffer.height * SCALING_FACTOR);

  // image(grainy_gradient, - width / 2, - height / 2, grainy_gradient.width, grainy_gradient.height);


  // BINOMIAL FUNCTION
  // for (var i = 0; i < binomial_points.length; i++) {
  //   push();
  //   strokeWeight(2);
  //   point(binomial_points[i].x, binomial_points[i].y);
  //   pop();
  // }




  // if (grid.boxes_completely_run == true && preview_called == false) {
  //   logging.debug("all work is done");
  //   fxpreview();
  //   preview_called = true;
  // }


  rect1 = {
    width: 200,
    height: 100,
    depth: 0,
    posX: 0,
    posY: 0,
    posZ: 0,
  }

  rect2 = {
    width: 100,
    height: 200,
    depth: 0,
    posX: mouseX - width / 2,
    posY: mouseY - height / 2,
    posZ: 0,
  }

  push();
  fill("red");
  translate(rect1.posX, rect1.posY, rect1.posZ);
  box(rect1.width, rect1.height, rect1.depth);
  pop();

  push();
  fill("blue");
  translate(rect2.posX, rect2.posY, rect2.posZ);
  box(rect2.width, rect2.height, rect2.depth);
  pop();

  if (
    (rect2.posX - rect2.width / 2 > rect1.posX - rect1.width / 2 + rect1.width) ||
    (rect2.posX - rect2.width / 2 + rect2.width < rect1.posX - rect1.width / 2) ||
    (rect2.posY - rect2.height / 2 > rect1.posY - rect1.height / 2 + rect1.height) ||
    (rect2.posY - rect2.height / 2 + rect2.height < rect1.posY - rect1.height / 2)
  ) {
    // console.log("no overlap");
  } else {
    console.log("overlap");
  }


  // noLoop();

}


// https://github.com/royhzq/betajs
function betaPDF(x, a, b) {
  // Beta probability density function impementation
  // using logarithms, no factorials involved.
  // Overcomes the problem with large integers
  return Math.exp(lnBetaPDF(x, a, b))
}
function lnBetaPDF(x, a, b) {
  // Log of the Beta Probability Density Function
  return ((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x)) - lnBetaFunc(a, b)
}
function lnBetaFunc(a, b) {
  // Log Beta Function
  // ln(Beta(x,y))
  foo = 0.0;

  for (i = 0; i < a - 2; i++) {
    foo += Math.log(a - 1 - i);
  }
  for (i = 0; i < b - 2; i++) {
    foo += Math.log(b - 1 - i);
  }
  for (i = 0; i < a + b - 2; i++) {
    foo -= Math.log(a + b - 1 - i);
  }
  return foo
}