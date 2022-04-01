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
const COLOR_1_HEX = "#97BFB4";
const COLOR_2_HEX = "#F5EEDC";
const COLOR_3_HEX = "#DD4A48";
const COLOR_4_HEX = "#4F091D";

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

  color1 = color(COLOR_1_HEX);
  color2 = color(COLOR_2_HEX);
  color3 = color(COLOR_3_HEX);
  color4 = color(COLOR_4_HEX);

  slider = createSlider(0.01, 0.2, 0.05);
  slider.position(10, 10);
  slider.style('width', '300px');


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


  // painted_area = new Paint(200, 400, -200, -200, color1);
  // painted_area_2 = new Paint(300, 500, 0, -250, color4);

  // paper = Pattern.create_corroded_area(width, height, color1);
  // dots = Pattern.create_dots(width, height);
  // normal_noise = Pattern.create_noise(100, 100);
  canvasOverlay = Pattern.create_canvas(width, height);
  // lines = Pattern.create_lines(width, height);
  // bars = Pattern.create_bars(width, height);

  sphere = Pattern.painted_sphere(
    width - 200,
    height - 400,
    color3,
    70,  // margin
    10,  // colorObjectSpread
    30,  // fillColorOpacityMax
    50,  // strokeColorBoost
    40  // strokeOpacityMax
  );

  backup = Pattern.painted_sphere(
    width,
    200,
    color4,
    70,  // margin
    10,  // colorObjectSpread
    30,  // fillColorOpacityMax
    50,  // strokeColorBoost
    40  // strokeOpacityMax
  );

  backmiddle = Pattern.painted_sphere(
    width,
    200,
    color1,
    70,  // margin
    10,  // colorObjectSpread
    30,  // fillColorOpacityMax
    50,  // strokeColorBoost
    40  // strokeOpacityMax
  );

  backdown = Pattern.painted_sphere(
    width,
    height - backup.height - backmiddle.height,
    color4,
    70,  // margin
    10,  // colorObjectSpread
    30,  // fillColorOpacityMax
    50,  // strokeColorBoost
    40  // strokeOpacityMax
  );

  // noise_fog = Pattern.create_noise_fog(width, height, color1, color3, 0.009, 12, 0.5, 255);

  // splatter = Pattern.create_splatter_splitter(width, height);

  // grainy_gradient = Pattern.create_grainy_gradient(width, height);

  agent = new DumbAgent(width, height, color2);

  paintbrusharea = new PaintBrushArea(900, 400, color3);
  paintbrusharea2 = new PaintBrushArea(900, 200, color4);
  paintbrusharea3 = new PaintBrushArea(900, 100, color1);
  paintbrusharea4 = new PaintBrushArea(900, 200, color2);

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

  let val = slider.value();

  background(color2);

  // image(paper);
  // shape = createGraphics(width, height);
  // shape.ellipse(200, 200, 200, 200);
  // paper = paper.get(); // convert to image
  // paper.mask

  // image(paper, - width / 2, - height / 2, paper.width * SCALING_FACTOR, paper.height * SCALING_FACTOR);
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

  // PERLIN Noise
  // image(flowfield.update_noise(), -300, 0);

  // PERLIN NOISE
  // image(noise_fog, - width / 2, - height / 2, noise_fog.width, noise_fog.height);

  image(backup, - width / 2, - height / 2, backup.width * SCALING_FACTOR, backup.height * SCALING_FACTOR);
  image(backdown, - width / 2, - height / 2 + backup.height + backmiddle.height, backdown.width * SCALING_FACTOR, backdown.height * SCALING_FACTOR);

  image(paintbrusharea.show(), -500, 0, paintbrusharea.width * SCALING_FACTOR, paintbrusharea.height * SCALING_FACTOR)
  image(paintbrusharea2.show(), -500, -50, paintbrusharea2.width * SCALING_FACTOR, paintbrusharea2.height * SCALING_FACTOR)
  image(paintbrusharea3.show(), -500, -200, paintbrusharea3.width * SCALING_FACTOR, paintbrusharea3.height * SCALING_FACTOR)
  image(paintbrusharea4.show(), -500, -400, paintbrusharea4.width * SCALING_FACTOR, paintbrusharea4.height * SCALING_FACTOR)

  image(sphere, - sphere.width / 2, - sphere.height / 2, sphere.width * SCALING_FACTOR, sphere.height * SCALING_FACTOR);

  image(backmiddle, - width / 2, - height / 2 + backup.height, backmiddle.width * SCALING_FACTOR, backmiddle.height * SCALING_FACTOR);


  image(agent.buffer, - width / 2, - height / 2, agent.buffer.width * SCALING_FACTOR, agent.buffer.height * SCALING_FACTOR);

  // image(grainy_gradient, - width / 2, - height / 2, grainy_gradient.width, grainy_gradient.height);


  // BINOMIAL FUNCTION
  // for (var i = 0; i < binomial_points.length; i++) {
  //   push();
  //   strokeWeight(2);
  //   point(binomial_points[i].x, binomial_points[i].y);
  //   pop();
  // }


  // CANVAS
  image(canvasOverlay, - width / 2, - height / 2, canvasOverlay.width * SCALING_FACTOR, canvasOverlay.height * SCALING_FACTOR);


  // if (grid.boxes_completely_run == true && preview_called == false) {
  //   logging.debug("all work is done");
  //   fxpreview();
  //   preview_called = true;
  // }



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