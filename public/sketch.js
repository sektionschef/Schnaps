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
  logging.info("Noise seed: " + NOISESEED);
  noiseSeed(NOISESEED);

  GRIDVISIBLE = false  // getRandomFromList([true, false]);
  RANDOMSPHERES = getRandomFromList([true, false]);
  CANVASAGENT = getRandomFromList([true, false]);
  PALETTE = getRandomFromList(["greyscale", "full color complimentary", "full color triadic", "weak color complimentary", "weak color triadic", "dark color complimentary", "dark color triadic"]);
  console.log("PALETTE: " + PALETTE);
  CANVASROUGHNESS = getRandomFromInterval(60, 90);
  FRONTNUMBERRECTS = 5 //getRandomFromInterval(10, 17); // 20  // 30
  BACKNUMBERRECTS = getRandomFromInterval(10, 17); // 20
  NUMBERPAINTLAYERS = getRandomFromList([2]);  // 2-3??  // best 2
  GRIDBRIGHTNESSDIFF = -10;  // fix
  BRUSHLENGTHANDBREADTH = getRandomFromInterval(25, 35);  // 30 best
  BRUSHSTROKESIZE = 2 // getRandomFromInterval(1, );
  BRUSHBRIGHTNESSNOISE = 10 // getRandomFromInterval(5, 15);
  if (PALETTE != "greyscale") {
    BRUSHCOLORNOISE = getRandomFromInterval(15, 25);  // mit 20 besser
  } else if (PALETTE == "greyscale") {
    BRUSHCOLORNOISE = 0;
  }
  FIBREBRIGHTNESSNOISE = 4 // fix // getRandomFromInterval(4, 15);
  BRUSHANGLENOISE = getRandomFromInterval(PI / 80, PI / 40);  // best PI / 40
  // FIBRECURVETIGHTNESS = 2 // getRandomFromInterval(2, 5);
  FIBRESTROKESIZENOISE = 0.2;  // fix // 0.2
  FIBRESTARTLENGTHNOISE = 10 // fix getRandomFromInterval(10, 30);
  FIBREBREADTHNOISE = 0.2 // getRandomFromInterval(1, 5); cool 0.2
  FIBREROTATIONNOISE = PI / 100;
  FIBREOPACITYNOISEBASE = 120 // 120-

  colorPalette = new ColorPalette();

  color1 = colorPalette.primaryColor;
  color2 = colorPalette.secondaryColor;

  logging.debug("color1:")
  logging.debug(color1);
  logging.debug("color2:")
  logging.debug(color2);


  color1b = saturateColorStatic(brightenColorStatic(color1, GRIDBRIGHTNESSDIFF), GRIDBRIGHTNESSDIFF);
  color2b = saturateColorStatic(brightenColorStatic(color2, GRIDBRIGHTNESSDIFF), GRIDBRIGHTNESSDIFF);

  // lineColor1 = brightenColorStatic(color1, +60);
  // lineColor1b = brightenColorStatic(color1b, +60);
  // lineColor1 = color(20, 150);
  // lineColor1b = color(20, 150);
  lineColor1 = color(color2);
  lineColor1b = color(color2b);

  canvasData = {
    custom_width: exportPaper.width,
    custom_height: exportPaper.height,
    posX: 0,
    posY: 0,
    colorObject: color(230),
    opacity: 100,
  }

  agentPaintData1 = {
    customWidth: exportPaper.width,
    customHeight: exportPaper.height,
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
    customWidth: exportPaper.width,
    customHeight: exportPaper.height,
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

  colorMode(HSB);

  let canvasColor = fromHSBtoRGB(color(hue(color1), 20, CANVASROUGHNESS));
  colorMode(RGB);

  backgroundSphereData = {
    custom_width: exportPaper.width,
    custom_height: exportPaper.height,
    posX: 0,
    posY: 0,
    // colorObject: color(255),  // cool
    // colorObject: color(255, 232, 189),  // cool
    colorObject: canvasColor,
    margin: -50,
    fillColorNoise: 50,
    fillColorOpacityMax: 10,
    noStroke: true,
    strokeWeight: 1,
    strokeColorNoise: 0,
    strokeOpacityMax: 250,
    numberQuantisizer: 4,
  }

  frontGridData = {
    minSize: 200 / exportRatio,  // 50
    maxSize: 800 / exportRatio,  // 200
    numberRects: FRONTNUMBERRECTS,
    firstLevelColors: [color1],
    secondLevelColors: [color2],
    lineColor: lineColor1,
    padding: 200 / exportRatio,
  }

  backGridData = {
    minSize: 100,  // 100
    maxSize: 300,  // 500
    numberRects: BACKNUMBERRECTS,
    firstLevelColors: [color2b],
    secondLevelColors: [color1b],
    lineColor: lineColor1b,
    padding: 50,
  }

  CanvasAgentData = {
    posXImage: 0,
    posYImage: 0,
    customWidth: exportPaper.width,
    customHeight: exportPaper.height,
    colorObject: color(100),
    stepSize: 10,  // 10 is hero
    agentSize: 2,
    opacityLine: 5,
    opacityPoint: 5,
    lineLength: 20,
    loopSize: 10000,
    numberAgents: 5,
  }

  randomSphereData = {
    minSize: 100,  // 100
    maxSize: 300,  // 500
    numberSpheres: 6,
    colorObject: color(30, 30),
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

  buffer.clear();
  buffer.scale(scaleRatio);

  buffer.background(200);
  // backgroundSphere.show();
  // if (CANVASAGENT == true) {
  //   canvasAgent.show();
  // }
  // backGrid.show();
  // if (RANDOMSPHERES == true) {
  //   randomSpheres.show();
  // }
  // canvas.show();
  // agentPaint1.show();
  // agentPaint2.show();
  frontGrid.show();

  // document
  // absolute value / exportRatio
  // rectMode(CENTER);
  // buffer.rect(3900 / exportRatio, 2000 / exportRatio, 60 / exportRatio, 60 / exportRatio);

  image(buffer, -width / 2, - height / 2);

  noLoop();

  fxpreview()

}

