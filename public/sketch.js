// trace, debug, info, warn, error
// const SWITCH_LOGGING_LEVEL = "warn";
const SWITCH_LOGGING_LEVEL = "info";
// const SWITCH_LOGGING_LEVEL = "debug";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = CANVAS_WIDTH;

// GRID
const POINT_COUNT_MIN = 5
const POINT_COUNT_MAX = 25
const PAIRING_COUNT_MIN = 4;
const PAIRING_COUNT_MAX = 10;
const MAX_HEIGHT = 200;
const MIN_HEIGHT = 40;
const MINIMIMUM_DISTANCE = CANVAS_WIDTH / 20;

const COUNT_OF_POINTS_X = Math.floor(getRandomFromInterval(POINT_COUNT_MIN, POINT_COUNT_MAX));
const COUNT_OF_POINTS_Y = Math.floor(getRandomFromInterval(POINT_COUNT_MIN, POINT_COUNT_MAX));
const PAIRING_COUNT = Math.floor(getRandomFromInterval(PAIRING_COUNT_MIN, PAIRING_COUNT_MAX));
const GRID = COUNT_OF_POINTS_X + "x" + COUNT_OF_POINTS_Y;

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

let PALETTES = [
  {
    name: "Mel Brooks",
    top_color: "#EFF6EE",
    inside_color: "#9197AE",
    background_color: "#273043"
  },
  {
    name: "Slawa Ukrajini",
    top_color: "#ffd700",
    inside_color: "#0057b7",
    background_color: "#2e3033"
  },
  {
    name: "Bobbycorn",
    top_color: "#F5F5F5",
    inside_color: "#087E8B",
    background_color: "#3C3C3C"
  },
  {
    name: "Maypole",
    top_color: "#EDF7F6",
    inside_color: "#F19953",
    background_color: "#2660A4"
  },
  {
    name: "Manfred Bauer",
    top_color: "#00d1c9",
    inside_color: "#FFD899",
    background_color: "#EF5B5B"
  },
  {
    name: "Butterfred",
    top_color: "#B8F2E6",
    inside_color: "#fffefa",
    background_color: "#FFA69E"
  },
  {
    name: "Gianni",
    top_color: "#fff4b5",
    inside_color: "#d1d1d1",
    background_color: "#39403b",
  },
  {
    name: "Ian",
    top_color: "#071108",
    inside_color: "#364652",
    background_color: "#BFB1C1"
  },
  {
    name: "Ginger",
    top_color: "#41EAD4",
    inside_color: "#093961",
    background_color: "#c46673",
  },
  {
    name: "Simone Minestrone",
    top_color: "#62B6CB",
    inside_color: "#1B4965",
    background_color: "#BEE9E8",
  },
  {
    name: "Hunger",
    top_color: "#FF2626",
    inside_color: "#000000",
    background_color: "#FFE6E6",
  },
  {
    name: "Shakespeare",
    top_color: "#398AB9",
    inside_color: "#1C658C",
    background_color: "#D8D2CB",
  },
  {
    name: "Ladies night",
    top_color: "#3b96f7",
    inside_color: "#FF5C7A",
    background_color: "#D5CAC3",
  },
  {
    name: "Stumpergasse",
    top_color: "#FFD32D",
    inside_color: "#302b2b",
    background_color: "#ebebeb",
  },
  {
    name: "Sneaker",
    top_color: "#94B49F",
    inside_color: "#B4CFB0",
    background_color: "#E5E3C9",
  },
]

let cameraFlights = [
  {
    name: "Top/Left -> Center",
    camera_start_x: - CANVAS_WIDTH / 1.5,
    camera_start_y: - CANVAS_HEIGHT / 1.5,

    camera_stop_x: 0,
    camera_stop_y: 0,
  },
  {
    name: "Bottom/Right -> Center",
    camera_start_x: CANVAS_WIDTH / 1.5,
    camera_start_y: CANVAS_HEIGHT / 1.5,

    camera_stop_x: 0,
    camera_stop_y: 0,
  },
  {
    name: "Left -> Right",
    camera_start_x: - CANVAS_WIDTH,
    camera_start_y: 0,

    camera_stop_x: CANVAS_WIDTH / 2,
    camera_stop_y: 0,
  },
  {
    name: "Right -> Left",
    camera_start_x: CANVAS_WIDTH,
    camera_start_y: 0,

    camera_stop_x: - CANVAS_WIDTH / 2,
    camera_stop_y: 0,
  },
]

// variable stuff
let cameraDefault;
let SCALING_FACTOR = 1;
let rescaling_width;
let rescaling_height;
let preview_called = false;
let grid;
let chosenCameraFlight = getRandomFromList(cameraFlights);
let chosenPalette = getRandomFromList(PALETTES);
const TOP_COLOR = chosenPalette.top_color;
const INSIDE_COLOR = chosenPalette.inside_color;
const BACKGROUND_COLOR = chosenPalette.background_color;



logging.info("FXHASH: " + fxhash);
logging.info("Grid: " + GRID);
logging.info("Paired boxes: " + PAIRING_COUNT);
logging.info("Palette: " + chosenPalette.name);
logging.info("Camera flight: " + chosenCameraFlight.name);
logging.info("Paint frame: " + label_feature(BORDER_FRAME, BORDER_FRAME_MIN, BORDER_FRAME_MAX)); //+ Math.round(BORDER_FRAME));
logging.info("Brush region: " + label_feature(BRUSH_SIZE, BRUSH_SIZE_MIN, BRUSH_SIZE_MAX)); //+ Math.round(BRUSH_SIZE));
logging.info("Brush size: " + label_feature(PRIMARY_STROKE_WEIGHT, PRIMARY_STROKE_WEIGHT_MIN, PRIMARY_STROKE_WEIGHT_MAX)); //+ Math.round(PRIMARY_STROKE_WEIGHT));
logging.info("Brush tightness: " + label_feature(BRUSH_TIGHTNESS, BRUSH_TIGHTNESS_MIN, BRUSH_TIGHTNESS_MAX));// + Math.round(BRUSH_TIGHTNESS));
logging.info("Line Stroke weight: " + label_feature(STROKE_SIZE, STROKE_SIZE_MIN, STROKE_SIZE_MAX));// + Math.round((STROKE_SIZE + Number.EPSILON) * 100) / 100);

function preload() {
  // font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
  logging.setLevel(SWITCH_LOGGING_LEVEL);

  distanceBetweenLines = map(STROKE_SIZE, STROKE_SIZE_MIN, STROKE_SIZE_MAX, 10, 40);  // 20 - 40

  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL).parent('canvasHolder');
  grid = new Grid(COUNT_OF_POINTS_X, COUNT_OF_POINTS_Y, MINIMIMUM_DISTANCE, PAIRING_COUNT, MAX_HEIGHT, MIN_HEIGHT);

  cameraDefault = [chosenCameraFlight.camera_start_x / SCALING_FACTOR, chosenCameraFlight.camera_start_y / SCALING_FACTOR, height * 1.5 / SCALING_FACTOR, 0, 0, 0, 0, 1, 0];
  cameraStepSize = CANVAS_WIDTH / 216;

  resize_canvas();
}


function draw() {

  cameraDefault = [chosenCameraFlight.camera_start_x / SCALING_FACTOR, chosenCameraFlight.camera_start_y / SCALING_FACTOR, height * 1.35 / SCALING_FACTOR, 0, 0, 0, 0, 1, 0];

  if (
    chosenCameraFlight.camera_start_x != chosenCameraFlight.camera_stop_x |
    chosenCameraFlight.camera_start_y != chosenCameraFlight.camera_stop_y
  ) {
    if (chosenCameraFlight.camera_start_x <= chosenCameraFlight.camera_stop_x) {
      chosenCameraFlight.camera_start_x += cameraStepSize;
    } else {
      chosenCameraFlight.camera_start_x -= cameraStepSize;
    }
    if (chosenCameraFlight.camera_start_y <= chosenCameraFlight.camera_stop_y) {
      chosenCameraFlight.camera_start_y += cameraStepSize;
    } else {
      chosenCameraFlight.camera_start_y -= cameraStepSize;
    }
    camera(...cameraDefault);
  }

  orbitControl(1, 1, 0.1);

  ambientLight(255, 255, 255);

  ambientMaterial(255);

  background(BACKGROUND_COLOR);

  // grid.show_grid_debug();
  grid.show_boxes();
  grid.check_boxes_complete();

  if (grid.boxes_completely_run == true && preview_called == false) {
    logging.debug("all work is done");
    fxpreview();
    preview_called = true;
  }

}

