// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
// const SWITCH_LOGGING_LEVEL = "info";
const SWITCH_LOGGING_LEVEL = "debug";

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

  fxhash_number = hashFnv32a(fxhash);
  logging.info("hash number: " + fxhash_number);
  noiseSeed(fxhash_number);

  color1 = color(COLOR_1_HEX);
  color2 = color(COLOR_2_HEX);

  color1b = brightenColorStatic(color1, -30);
  color2b = brightenColorStatic(color2, -30);

  lineColor1 = brightenColorStatic(color1, +60);
  lineColor1b = brightenColorStatic(color1b, +60);

  // color3 = color(COLOR_3_HEX);
  // color4 = color(COLOR_4_HEX);

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

  // NOT NECESSARY |   
  // paper = Pattern.create_corroded_area(width, height, color(240));
  // dots = Pattern.create_dots(width, height);
  // normal_noise = Pattern.create_noise(100, 100);
  // lines = Pattern.create_lines(width, height);
  // bars = Pattern.create_bars(width, height);
  // noise_fog = Pattern.create_noise_fog(width, height, color1, color3, 0.009, 12, 0.5, 255);
  // grainy_gradient = Pattern.create_grainy_gradient(width, height);

  // ENDRESULT
  // canvasOverlay = Pattern.create_canvas(width, height);

  // ENDRESULT
  // splatter = Pattern.create_splatter_splitter(width, height);

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

  sphereData = {
    custom_width: 400,
    custom_height: 200,
    posX: 0,
    posY: 0,
    colorObject: color2,
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


  paintbrushareas = [];
  // CLASS aus spheres
  paintedSpheres = [];

  loopNumberPaintbrush = 100;
  loopNumberSpheres = 200;

  for (var i = 0; i < loopNumberSpheres; i++) {  // PARAMS FOR SPHERE
    sphereData.custom_width = getRandomFromInterval(100, 300);
    sphereData.custom_height = getRandomFromInterval(100, 300);
    sphereData.posX = getRandomFromInterval(-sphereData.custom_width / 2 - width / 2, width / 2 + sphereData.custom_width / 2);
    sphereData.posY = getRandomFromInterval(-sphereData.custom_height / 2 - height / 2, height / 2 + sphereData.custom_height / 2);;
    sphereData.colorObject = getRandomFromList([color1, color2]);;
    sphereData.margin = 50;
    sphereData.colorObjectSpread = 10;
    sphereData.fillColorOpacityMax = 70;
    sphereData.strokeColorBoost = 50;
    sphereData.strokeOpacityMax = 40;

    // paintedSpheres.push(new paintedSphere(sphereData));
  }

  // ENDRESULT
  // backgroundSphere = new paintedSphere(sphereBackgroundData);

  // paper = paper.get()
  // paper.mask(noise_fog);

  // ENDRESULT
  let frontGridData = {
    minSize: 100,  // 50
    maxSize: 300,  // 300
    numberRects: 15,  // 30
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

  // frontGrid = new IntersectGrid(frontGridData);
  // backGrid = new IntersectGrid(backGridData);

  exampleGrid = new IntersectGrid();

  // binomial_points = [];

  // for (var i = 0; i < 500; i++) {
  //   x_input = getRandomFromInterval(1, 600)
  //   binomial_points.push(createVector(x_input, (betaPDF(x = 0.5, a = x_input, b = x_input) * 10)));
  // }
  // console.log(binomial_points);

  // EXAMPLE PaintAreas
  // ExamplePaintBrushArea = new PaintBrushArea();

  // EXAMPLE LINES
  // linesExample = new NewLines();

  resize_canvas();
}


function draw() {

  // orbitControl(1, 1, 0.1);
  ambientLight(255, 255, 255);
  ambientMaterial(255);

  // ENDRESULT
  background(240, 100);

  // image(paper);
  // shape = createGraphics(width, height);
  // shape.ellipse(200, 200, 200, 200);
  // paper = paper.get(); // convert to image
  // paper.mask

  // image(paper, - width / 2, - height / 2, paper.width * SCALING_FACTOR, paper.height * SCALING_FACTOR);

  // ENDRESULT
  // image(backgroundSphere.buffer, - width / 2, - height / 2, backgroundSphere.buffer.width * SCALING_FACTOR, backgroundSphere.buffer.height * SCALING_FACTOR);
  // ENDRESULT
  // image(splatter, - width / 2, - height / 2, splatter.width * SCALING_FACTOR, splatter.height * SCALING_FACTOR);

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

  // for (var i = 0; i < loopNumberSpheres; i++) {
  // image(paintedSpheres[i].buffer, paintedSpheres[i].posX, paintedSpheres[i].posY, paintedSpheres[i].buffer.width * SCALING_FACTOR, paintedSpheres[i].buffer.height * SCALING_FACTOR);
  // }

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

  // ENDRESULT
  // CANVAS
  // image(canvasOverlay, - width / 2, - height / 2, canvasOverlay.width * SCALING_FACTOR, canvasOverlay.height * SCALING_FACTOR);

  // ENDRESULT
  // backGrid.show();
  // frontGrid.show();

  exampleGrid.show();

  // ENDRESULT
  // image(canvasAgent.buffer, - width / 2, - height / 2, canvasAgent.buffer.width * SCALING_FACTOR, canvasAgent.buffer.height * SCALING_FACTOR);


  // PERLIN Noise
  // image(flowfield.update_noise(), -300, 0);

  // EXAMPLE PaintAreas
  // push();
  // translate(
  //   ExamplePaintBrushArea.posX * SCALING_FACTOR - (ExamplePaintBrushAreaImage.width / 2) * SCALING_FACTOR,
  //   ExamplePaintBrushArea.posY * SCALING_FACTOR - (ExamplePaintBrushAreaImage.height / 2) * SCALING_FACTOR
  // );
  // image(ExamplePaintBrushAreaImage, 0, 0, ExamplePaintBrushAreaImage.width * SCALING_FACTOR, ExamplePaintBrushAreaImage.height * SCALING_FACTOR)
  // pop();

  // linesExample.show()

  // ENDRESULT
  // image(agentPaintbrush.buffer, (agentPaintbrush.posXImage - width / 2) * SCALING_FACTOR, (agentPaintbrush.posYImage - height / 2) * SCALING_FACTOR, agentPaintbrush.buffer.width * SCALING_FACTOR, agentPaintbrush.buffer.height * SCALING_FACTOR);


  // ExamplePaintBrushArea.show();
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