// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
const SWITCH_LOGGING_LEVEL = "info";
// const SWITCH_LOGGING_LEVEL = "debug";


let scaleRatio;
let exportRatio;
let buffer;
let canvas;
let exportPaper = {
  width: 4000,
  height: 4000
}
let rescaling_width;
let rescaling_height;

let fxhash_number;

logging.info("FXHASH: " + fxhash);
// logging.info("Grid: " + GRID);

function preload() {
}

function setup() {
  logging.setLevel(SWITCH_LOGGING_LEVEL);

  scaleDynamically();

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

  logging.debug("color1:")
  logging.debug(color1);
  logging.debug("color2:")
  logging.debug(color2);


  GRIDVISIBLE = false;
  RANDOMSPHERES = false;
  CANVASAGENT = false;

  FRONTNUMBERRECTS = 20  // 30
  BACKNUMBERRECTS = 10 // 20
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

  agentPaintData1 = {
    customWidth: width,
    customHeight: height,
    posXImage: 0,
    posYImage: 0,
    colorObject: color(color1),
    stepSize: 3,
    agentSize: 2,
    opacityLine: 2,
    opacityPoint: 0.2,
    lineLength: 20,
    loopSize: 100,
    numberAgents: 135,
  }

  agentPaintData2 = {
    customWidth: width,
    customHeight: height,
    posXImage: 0,
    posYImage: 0,
    colorObject: color(color2),
    stepSize: 3,
    agentSize: 2,
    opacityLine: 2,
    opacityPoint: 0.2,
    lineLength: 20,
    loopSize: 100,
    numberAgents: 135,
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
    colorObject: color(100),
    stepSize: 10,  // 10 is hero
    agentSize: 2,
    opacityLine: 10,
    opacityPoint: 5,
    lineLength: 20,
    loopSize: 10000,
    numberAgents: 5,
  }

  let randomSphereData = {
    minSize: 100,  // 100
    maxSize: 300,  // 500
    numberSpheres: 10,
    colorObject: color(20),
    padding: 50,
  }

  canvas = new CanvasOverlay(canvasData);
  canvasAgent = new DumbAgent(CanvasAgentData);
  agentPaint1 = new DumbAgent(agentPaintData1);
  agentPaint2 = new DumbAgent(agentPaintData2);
  backgroundSphere = new paintedSphere(backgroundSphereData);
  frontGrid = new IntersectGrid(frontGridData);
  backGrid = new IntersectGrid(backGridData);
  randomSpheres = new RandomPaintedSpheres(randomSphereData);

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
  if (CANVASAGENT == true) {
    canvasAgent.show();
  }
  backGrid.show();
  if (RANDOMSPHERES == true) {
    randomSpheres.show();
  }
  canvas.show();
  frontGrid.show();
  agentPaint1.show();
  agentPaint2.show();

  // document
  // absolute value / exportRatio
  // buffer.rect(3900 / exportRatio, 500, 20, 20);

  // Draw buffer to canvas
  image(buffer, -width / 2, - height / 2);

  noLoop();

}

