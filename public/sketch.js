// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
const SWITCH_LOGGING_LEVEL = "info";
// const SWITCH_LOGGING_LEVEL = "debug";



let scaleRatio = 1;
let exportRatio = 5;
let buffer;
let canvas;
let exportPaper = {
  width: 4000,
  height: 4000
}




// DEP
const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = CANVAS_WIDTH;
let SCALING_FACTOR = 1;
// let rescaling_width;
// let rescaling_height;
// let preview_called = false;

let fxhash_number;
let xoff = 0;


logging.info("FXHASH: " + fxhash);
// logging.info("Grid: " + GRID);

function preload() {
}

function setup() {
  logging.setLevel(SWITCH_LOGGING_LEVEL);

  let rescaling_width = exportPaper.width / exportRatio;
  let rescaling_height = exportPaper.height / exportRatio;

  // let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL).parent('canvasHolder');
  // createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);

  buffer = createGraphics(rescaling_width, rescaling_height);
  canvas = createCanvas(rescaling_width, rescaling_height, WEBGL);

  // Adjust according to screens pixel density.
  // pixelDensity(1);
  logging.debug("Pixel density: " + pixelDensity())
  exportRatio /= pixelDensity();

  NOISESEED = hashFnv32a(fxhash);
  logging.debug("Noise seed: " + NOISESEED);
  noiseSeed(NOISESEED);

  colorPalette = new ColorPalette();

  color1 = colorPalette.primaryColor;
  color2 = colorPalette.secondaryColor;

  logging.debug(color1);
  logging.debug(color2);


  // resize_canvas();

  FRONTNUMBERRECTS = 30 // 30
  BACKNUMBERRECTS = 20 // 20
  GRIDBRIGHTNESSDIFF = -10;
  NUMBERPAINTLAYERS = 2;  // 2-3??
  BRUSHLENGTHANDBREADTH = 30 // getRandomFromInterval(20, 40);
  BRUSHSTROKESIZE = 1 // getRandomFromInterval(1, );
  BRUSHBRIGHTNESSNOISE = 10 // getRandomFromInterval(5, 15);
  BRUSHCOLORNOISE = 20 // getRandomFromInterval(5, 15);  // mit 20 besser
  BRUSHANGLENOISE = PI / 40 // getRandomFromInterval(PI / 100, PI / 40);
  FIBRECURVETIGHTNESS = 2 // getRandomFromInterval(2, 5);
  FIBREBRIGHTNESSNOISE = 4 // getRandomFromInterval(4, 15);
  FIBRESTROKESIZENOISE = 0.2;
  FIBRESTARTLENGTHNOISE = 10 // getRandomFromInterval(10, 30);
  FIBREBREADTHNOISE = 0.02 // getRandomFromInterval(1, 5); cool 0.2
  FIBREROTATIONNOISE = PI / 100;
  FIBREOPACITYNOISEBASE = 120 // 120-


  color1b = saturateColorStatic(brightenColorStatic(color1, GRIDBRIGHTNESSDIFF), GRIDBRIGHTNESSDIFF);
  color2b = saturateColorStatic(brightenColorStatic(color2, GRIDBRIGHTNESSDIFF), GRIDBRIGHTNESSDIFF);

  // lineColor1 = brightenColorStatic(color1, +60);
  // lineColor1b = brightenColorStatic(color1b, +60);
  // lineColor1 = color(20, 150);
  // lineColor1b = color(20, 150);
  lineColor1 = color(color2);
  lineColor1b = color(color2b);

  canvasData = {
    custom_width: width,
    custom_height: height,
    posX: 0,
    posY: 0,
    colorObject: color(230),
    opacity: 100,
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
    margin: -50,
    fillColorNoise: 50,
    fillColorOpacityMax: 10,
    noStroke: true,
    strokeWeight: 1,
    strokeColorNoise: 0,
    strokeOpacityMax: 250,
    numberQuantisizer: 4,
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

  let CanvasAgentData = {
    posXImage: 0,
    posYImage: 0,
    customWidth: width,
    customHeight: height,
    colorObject: color(100, 100, 100),
    stepSize: 10 * SCALING_FACTOR,  // 10 is hero
    agentSize: 1 * SCALING_FACTOR,
    opacityLevel: 10,
    // opacityLevel2: 20,
    lineLength: 15 * SCALING_FACTOR,
    loopSize: 10000,
    numberAgents: 5,
  }

  canvas = new CanvasOverlay(canvasData);
  canvasAgent = new DumbAgent(CanvasAgentData);
  agentPaintbrush = new DumbAgent(agentPaintbrushData);
  backgroundSphere = new paintedSphere(backgroundSphereData);
  frontGrid = new IntersectGrid(frontGridData);
  backGrid = new IntersectGrid(backGridData);

}


function draw() {

  // orbitControl(1, 1, 0.1);
  ambientLight(255, 255, 255);
  ambientMaterial(255);

  // Clear buffer each frame
  buffer.clear();
  // Transform (scale) all the drawings
  buffer.scale(scaleRatio);

  // Make all the drawing to the buffer instead of canvas 
  buffer.background(200);
  backgroundSphere.show();
  // canvasAgent.show();
  backGrid.show();
  canvas.show();
  frontGrid.show();
  // agentPaintbrush.show();

  // document
  // absolute value / exportRatio
  // buffer.rect(3900 / exportRatio, 500, 20, 20);

  // Draw buffer to canvas
  image(buffer, -width / 2, - height / 2);

  noLoop();

}

