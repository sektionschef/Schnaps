// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
const SWITCH_LOGGING_LEVEL = "info";
// const SWITCH_LOGGING_LEVEL = "debug";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = CANVAS_WIDTH;


// variable stuff
let SCALING_FACTOR = 1;
let rescaling_width;
let rescaling_height;
let preview_called = false;

let fxhash_number;
let xoff = 0;


logging.info("FXHASH: " + fxhash);
// logging.info("Grid: " + GRID);

function preload() {
}

function setup() {

  pixelDensity(1);
  logging.setLevel(SWITCH_LOGGING_LEVEL);

  // let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL).parent('canvasHolder');
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);

  NOISESEED = hashFnv32a(fxhash);
  logging.debug("Noise seed: " + NOISESEED);
  noiseSeed(NOISESEED);

  colorPalette = new ColorPalette();

  color1 = colorPalette.primaryColor;
  color2 = colorPalette.secondaryColor;

  logging.debug(color1);
  logging.debug(color2);

  color1b = brightenColorStatic(color1, -40);
  color2b = brightenColorStatic(color2, -40);

  // lineColor1 = brightenColorStatic(color1, +60);
  // lineColor1b = brightenColorStatic(color1b, +60);
  // lineColor1 = color(20, 150);
  // lineColor1b = color(20, 150);
  lineColor1 = color(color2);
  lineColor1b = color(color2b);

  resize_canvas();

  FRONTNUMBERRECTS = 30 // 10-30
  BACKNUMBERRECTS = 20 // 7-10
  NUMBERPAINTLAYERS = 2;
  BRUSHLENGTHANDBREADTH = 30 // getRandomFromInterval(20, 40);
  BRUSHSTROKESIZE = 2 // getRandomFromInterval(1, 5);
  BRUSHBRIGHTNESSNOISE = 20 // getRandomFromInterval(5, 15);
  BRUSHCOLORNOISE = 20 // getRandomFromInterval(5, 15);  // mit 20 besser
  BRUSHANGLENOISE = PI / 40 // getRandomFromInterval(PI / 100, PI / 40);
  FIBRECURVETIGHTNESS = 2 // getRandomFromInterval(2, 5);
  FIBREBRIGHTNESSNOISE = 4 // getRandomFromInterval(4, 15);
  FIBRESTROKESIZENOISE = 2;
  FIBRESTARTLENGTHNOISE = 10 // getRandomFromInterval(10, 30);
  FIBREBREADTHNOISE = 0.2 // getRandomFromInterval(1, 5); cool 0.2
  FIBREROTATIONNOISE = PI / 100;
  FIBREOPACITYNOISEBASE = 150 // getRandomFromInterval(50, 200)

  canvasData = {
    custom_width: width,
    custom_height: height,
    posX: -width / 2,
    posY: -height / 2,
    colorObject: color(230),
  }

  agentPaintbrushData = {
    customWidth: width,
    customHeight: height,
    posXImage: 0,
    posYImage: 0,
    colorObject: color(color1),
    stepSize: 5 * SCALING_FACTOR,
    agentSize: 1 * SCALING_FACTOR,
    opacityLevel: 10,
    // opacityLevel2: 15,
    lineLength: 30 * SCALING_FACTOR,
    loopSize: 1000,
    numberAgents: 15,
  }


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

  let frontGridData = {
    minSize: 50,  // 50
    maxSize: 200,  // 300
    numberRects: FRONTNUMBERRECTS,
    firstLevelColors: [color1],
    secondLevelColors: [color2],
    lineColor: lineColor1,
    padding: 50,
  }

  let backGridData = {
    minSize: 100,  // 100
    maxSize: 300,  // 500
    numberRects: BACKNUMBERRECTS,
    firstLevelColors: [color2b],
    secondLevelColors: [color1b],
    lineColor: lineColor1b,
    padding: 50,
  }

  canvas = new CanvasOverlay(canvasData);
  canvasAgent = new DumbAgent();
  agentPaintbrush = new DumbAgent(agentPaintbrushData);
  backgroundSphere = new paintedSphere(backgroundSphereData);
  frontGrid = new IntersectGrid(frontGridData);
  backGrid = new IntersectGrid(backGridData);

}


function draw() {

  // orbitControl(1, 1, 0.1);
  ambientLight(255, 255, 255);
  ambientMaterial(255);

  // ENDRESULT
  background(200);
  backgroundSphere.show();
  backGrid.show();
  frontGrid.show();
  canvas.show();
  canvasAgent.show();
  agentPaintbrush.show();

  noLoop();

}

