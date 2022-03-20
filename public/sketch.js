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

  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL).parent('canvasHolder');

  fxhash_number = hashFnv32a(fxhash);
  logging.info("hash number: " + fxhash_number);
  noiseSeed(fxhash_number);

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


  // painted_area = new Paint(200, 400, -200, -200, "#babdff");
  // painted_area_2 = new Paint(300, 500, 0, -250, "#123456");

  // paper = Pattern.create_corroded_area(width, height);
  // dots = Pattern.create_dots(width, height);
  // normal_noise = Pattern.create_noise(100, 100);
  canvasOverlay = Pattern.create_canvas(width, height);
  // lines = Pattern.create_lines(width, height);
  // bars = Pattern.create_bars(width, height);

  // fog = Pattern.create_noise_fog(300, 300);

  // splatter = Pattern.create_splatter_splitter(width, height);

  background(100);

  resize_canvas();
}


function draw() {

  // orbitControl(1, 1, 0.1);
  ambientLight(255, 255, 255);
  ambientMaterial(255);

  // image(paper, - width / 2, - height / 2, paper.width, paper.height);
  // image(splatter, - width / 2, - height / 2, splatter.width, splatter.height);

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

  paint();

  // image(fog, - 300, - 200, fog.width, fog.height);
  image(canvasOverlay, - width / 2, - height / 2, canvasOverlay.width, canvasOverlay.height);


  // if (grid.boxes_completely_run == true && preview_called == false) {
  //   logging.debug("all work is done");
  //   fxpreview();
  //   preview_called = true;
  // }

}

function paint() {

  let startX = 40;
  let startY = 60;
  let sizeStroke = 5;
  let linesAmount = 30;

  strokeWeight(sizeStroke);
  stroke("red");
  noFill();

  for (var i = 0; i < linesAmount; i++) {

    curveTightness(5);
    beginShape();
    curveVertex(startX, startY + sizeStroke * i);
    curveVertex(startX, startY + sizeStroke * i);
    curveVertex(80, startY + sizeStroke * i);
    curveVertex(160, startY + sizeStroke * i);
    curveVertex(160, startY + sizeStroke * i);
    endShape();

    strokeWeight(sizeStroke);
    stroke("black");
    noFill();
    beginShape();
    curveVertex(startX, startY + sizeStroke);
    curveVertex(startX, startY + sizeStroke);
    curveVertex(80, 65);
    curveVertex(160, 65);
    curveVertex(160, 65);
    endShape();

    strokeWeight(sizeStroke);
    stroke("green");
    noFill();
    beginShape();
    curveVertex(startX, startY + sizeStroke * 2);
    curveVertex(startX, startY + sizeStroke * 2);
    curveVertex(80, 70);
    curveVertex(160, 70);
    curveVertex(160, 70);
    endShape();
  }
}