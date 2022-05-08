// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
const SWITCH_LOGGING_LEVEL = "info";
// const SWITCH_LOGGING_LEVEL = "debug";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = CANVAS_WIDTH;

let VAG = 0;


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
// const COLOR_1_HEX = "#22577E";
// const COLOR_2_HEX = "#5584AC";
// const COLOR_3_HEX = "#95D1CC";
// const COLOR_4_HEX = "#FAFFAF";

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


// https://colorhunt.co/palette/ff5f00b2060000092ceeeeee
// const COLOR_1_HEX = "#FF5F00";
// const COLOR_2_HEX = "#B20600";
// const COLOR_3_HEX = "#00092C";

// https://colorhunt.co/palette/f1ddbf525e7578938a92ba92
// const COLOR_1_HEX = "#F1DDBF";
// const COLOR_2_HEX = "#525E75";
// const COLOR_3_HEX = "#92BA92";

// https://colorhunt.co/palette/bff4ed280f34b30753f6c667
// const COLOR_1_HEX = "#280F34";
// const COLOR_2_HEX = "#B30753";
// const COLOR_3_HEX = "#F6C667";

// https://calcolor.co/palette/942409461
// const COLOR_1_HEX = "#333333";
// const COLOR_2_HEX = "#aaaaaa";
// const COLOR_3_HEX = "#eeeeee";

// color custom
const COLOR_1_HEX = "#B30753";
const COLOR_2_HEX = "#F6C667";

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

  NOISESEED = hashFnv32a(fxhash);
  logging.debug("Noise seed: " + NOISESEED);
  noiseSeed(NOISESEED);

  color1 = color(COLOR_1_HEX);
  color2 = color(COLOR_2_HEX);

  color1b = brightenColorStatic(color1, -30);
  color2b = brightenColorStatic(color2, -30);

  lineColor1 = brightenColorStatic(color1, +60);
  lineColor1b = brightenColorStatic(color1b, +60);

  // color3 = color(COLOR_3_HEX);
  // color4 = color(COLOR_4_HEX);

  resize_canvas();

  // NOT NECESSARY | 
  // flowfield = new FlowField(600, 300);

  // NOT NECESSARY | RANDOM AREAS
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

  // paperData = {
  //   custom_width: width,
  //   custom_height: height,
  //   posX: - width / 2,
  //   posY: - height / 2,
  //   colorObject: color(255, 5),
  // }
  // paper = new Corroded(paperData);

  // NOT NECESSARY |   
  // dots = Pattern.create_dots(width, height);
  // normal_noise = Pattern.create_noise(100, 100);
  // lines = Pattern.create_lines(width, height);
  // bars = Pattern.create_bars(width, height);
  // noise_fog = Pattern.create_noise_fog(width, height, color1, color3, 0.009, 12, 0.5, 255);
  // grainy_gradient = Pattern.create_grainy_gradient(width, height);

  canvasData = {
    custom_width: width,
    custom_height: height,
    posX: -width / 2,
    posY: -height / 2,
    colorObject: color(230),
  }

  // ENDRESULT
  // canvas = new CanvasOverlay(canvasData);

  // splatter = new SplitterSplatter();

  // ENDRESULT
  // canvasAgent = new DumbAgent();

  agentPaintbrushData = {
    customWidth: width,
    customHeight: height,
    posXImage: 0,
    posYImage: 0,
    colorObject: color(color1),
    stepSize: 5,
    agentSize: 1,
    opacityLevel: 10,
    // opacityLevel2: 15,
    lineLength: 30,
    loopSize: 1000,
    numberAgents: 15,
  }

  // ENDRESULT
  // agentPaintbrush = new DumbAgent(agentPaintbrushData);

  // paintbrushareas = [];
  // CLASS aus spheres

  // loopNumberPaintbrush = 100;
  // loopNumberSpheres = 200;


  // example
  // exampleBackgroundSphere = new paintedSphere();

  backgroundSphereData = {
    custom_width: width,
    custom_height: height,
    posX: 0,
    posY: 0,
    colorObject: color(255),
    margin: -50 * SCALING_FACTOR,
    fillColorNoise: 50,
    fillColorOpacityMax: 10,
    noStroke: true,
    strokeWeight: 1,
    strokeColorNoise: 0,
    strokeOpacityMax: 250,
    numberQuantisizer: 4 * SCALING_FACTOR,
  }
  // ENDRESULT
  backgroundSphere = new paintedSphere(backgroundSphereData);


  // ENDRESULT
  let frontGridData = {
    minSize: 100,  // 50
    maxSize: 300,  // 300
    numberRects: 10,  // 30
    firstLevelColors: [color1],
    secondLevelColors: [color2],
    lineColor: lineColor1,
    padding: 50,
  }

  let backGridData = {
    minSize: 200,  // 100
    maxSize: 500,  // 500
    numberRects: 7,  // 10
    firstLevelColors: [color1b],
    secondLevelColors: [color2b],
    lineColor: lineColor1b,
    padding: 50,
  }

  // END RESULT
  // frontGrid = new IntersectGrid(frontGridData);
  // backGrid = new IntersectGrid(backGridData);


  // exampleGrid = new IntersectGrid();

  // binomial_points = [];

  // for (var i = 0; i < 500; i++) {
  //   x_input = getRandomFromInterval(1, 600)
  //   binomial_points.push(createVector(x_input, (betaPDF(x = 0.5, a = x_input, b = x_input) * 10)));
  // }
  // console.log(binomial_points);

  // paper = paper.get()
  // paper.mask(noise_fog);

  // EXAMPLE LINES
  // linesExample = new NewLines();

  // EXAMPLE PaintAreas
  // examplePaintBrushArea = new PaintBrushArea();
  // examplePaintBrushArea2 = new PaintBrushArea();

  testExamplePaintData = {
    custom_width: 300,
    custom_height: 370,
    posX: -100,
    posY: -100,
    colorObject: color1,
    orientation: "vertical",
    brushLength: 30,  // 20-40
    brushBreadth: 30,
    sizeStroke: 1,
    numberPaintLayers: 2,
    overlap: 20,
    brightnessNoise: 5,
    colorNoise: 5,
    opacityBoost: 0, // getRandomFromInterval(150, 255),
    brushLengthNoise: 0.2,
    numberFibresNoise: 0.2,  // brushBreadthNoise
    brushAngleNoise: PI / 20,
    fibreCurveTightness: 1,  // shape of curve, between 0 and 5; little effect
    fibreColorNoise: 2,
    fibreBrightnessNoise: 2,
    fibreStrokeSizeNoise: 2,  // new
    fibreStartLengthNoise: 15,  // start earlier or later
    fibreBreadthNoise: 1,  // noise of fibre along the y axis in the middle
    fibreRotationNoise: PI / 200,
    fibreOpacityNoiseBase: 150,
  }
  testPaint = new PaintBrushArea(testExamplePaintData);

  testLinesData = {
    posX: -100,
    posY: -100,
    custom_width: 300,
    custom_height: 370,
    colorObject: color(0),
    distance: 20,
    noise: 1,
    strokeSize: 2,
    curveTightness: 3,
  }
  testLines = new NewLines(testLinesData);

  testSphereData = {
    custom_width: 300,
    custom_height: 370,
    posX: -100,
    posY: -100,
    colorObject: color(30),
    margin: -10 * SCALING_FACTOR,
    fillColorNoise: 50,
    fillColorOpacityMax: 20,
    noStroke: true,
    strokeWeight: 1,
    strokeColorNoise: 0,
    strokeOpacityMax: 1,
    numberQuantisizer: 10 * SCALING_FACTOR,
  }
  testSphere = new paintedSphere(testSphereData);
}


function draw() {

  // orbitControl(1, 1, 0.1);
  ambientLight(255, 255, 255);
  ambientMaterial(255);

  // ENDRESULT


  // MASKING example
  // image(paper);
  // shape = createGraphics(width, height);
  // shape.ellipse(200, 200, 200, 200);
  // paper = paper.get(); // convert to image
  // paper.mask


  // ENDRESULT
  background(200);
  backgroundSphere.show();


  // paper.show();  // out
  // splatter.show();  // out

  // ENDRESULT
  // backGrid.show();
  // frontGrid.show();

  // canvas.show();

  // maska
  // brush.buffer = brush.buffer.get();
  // brush.buffer.mask(fog.buffer);

  // RANDOM AREAS
  // for (let area of all_areas) {
  //   area.show();
  //   image(area.buffer, area.posX, area.posY, area.buffer.width, area.buffer.height);
  // }


  // PERLIN NOISE
  // image(noise_fog, - width / 2, - height / 2, noise_fog.width, noise_fog.height);

  // image(backup, - width / 2, - height / 2, backup.width * SCALING_FACTOR, backup.height * SCALING_FACTOR);
  // image(backdown, - width / 2, - height / 2 + backup.height + backmiddle.height, backdown.width * SCALING_FACTOR, backdown.height * SCALING_FACTOR);

  // image(sphere, - sphere.width / 2, - sphere.height / 2, sphere.width * SCALING_FACTOR, sphere.height * SCALING_FACTOR);

  // image(backmiddle, - width / 2, - height / 2 + backup.height, backmiddle.width * SCALING_FACTOR, backmiddle.height * SCALING_FACTOR);
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



  // exampleGrid.show();

  // ENDRESULT
  // image(canvasAgent.buffer, - width / 2, - height / 2, canvasAgent.buffer.width * SCALING_FACTOR, canvasAgent.buffer.height * SCALING_FACTOR);


  // PERLIN Noise
  // image(flowfield.update_noise(), -300, 0);



  // Example
  // exampleBackgroundSphere.show();

  // EXAMPLE PaintAreas
  // examplePaintBrushArea.show();
  // examplePaintBrushArea2.show();

  // linesExample.show()

  // ENDRESULT
  // image(agentPaintbrush.buffer, (agentPaintbrush.posXImage - width / 2) * SCALING_FACTOR, (agentPaintbrush.posYImage - height / 2) * SCALING_FACTOR, agentPaintbrush.buffer.width * SCALING_FACTOR, agentPaintbrush.buffer.height * SCALING_FACTOR);

  // example for background layer of paintbrush
  testSphere.show();

  testPaint.show();

  // testLines.show();

  noLoop();

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