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
  logging.setLevel(SWITCH_LOGGING_LEVEL);

  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL).parent('canvasHolder');

  brush = new Pattern();

  painted_area = new Paint(200, 400, 155);
  painted_area_2 = new Paint(300, 500, 155);

  // brush.create_dots(50, 50);
  // brush.create_noise(100, 100);
  brush.create_canvas(width, height);
  // brush.create_lines(width, height);
  // brush.create_corroded_area(width, height);
  // brush.create_bars(width, height);

  background(100);

  resize_canvas();
}


function draw() {

  orbitControl(1, 1, 0.1);
  ambientLight(255, 255, 255);
  ambientMaterial(255);


  painted_area.show();
  painted_area_2.show();
  image(painted_area_2.buffer, - painted_area_2.buffer.width / 2 + 200, - painted_area_2.buffer.height / 2, painted_area_2.buffer.width, painted_area_2.buffer.height);
  image(painted_area.buffer, - painted_area.buffer.width / 2, - painted_area.buffer.height / 2, painted_area.buffer.width, painted_area.buffer.height);

  // image(brush.buffer, 50, 50, brush.buffer.width, brush.buffer.height);
  // image(brush.buffer, mouseX - width / 2, mouseY - height / 2, brush.buffer.width, brush.buffer.height);
  image(brush.buffer, - width / 2, - height / 2, brush.buffer.width, brush.buffer.height);

  // if (grid.boxes_completely_run == true && preview_called == false) {
  //   logging.debug("all work is done");
  //   fxpreview();
  //   preview_called = true;
  // }

}

