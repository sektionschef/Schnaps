// these are the variables you can use as inputs to your algorithms
// console.log("fxhash: " + fxhash)   // the 64 chars hex number fed to your algorithm
// console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function 
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
window.$fxhashFeatures = {
    // "Number of elements": NUMBEROFELEMENTS,
    // "Paired boxes": PAIRING_COUNT,
    // "Palette": chosenPalette.name,
    // "Camera flight": chosenCameraFlight.name,
    // "Paint frame": label_feature(BORDER_FRAME, BORDER_FRAME_MIN, BORDER_FRAME_MAX),
    // "Brush region": label_feature(BRUSH_SIZE, BRUSH_SIZE_MIN, BRUSH_SIZE_MAX),
    // "Brush size": label_feature(PRIMARY_STROKE_WEIGHT, PRIMARY_STROKE_WEIGHT_MIN, PRIMARY_STROKE_WEIGHT_MAX),
    // "Brush tightness": label_feature(BRUSH_TIGHTNESS, BRUSH_TIGHTNESS_MIN, BRUSH_TIGHTNESS_MAX),
    // "Line stroke weight": label_feature(STROKE_SIZE, STROKE_SIZE_MIN, STROKE_SIZE_MAX),
}


// this code writes the values to the DOM as an example
// const containero = document.createElement("div")
// containero.innerText = `
//   random hash: ${fxhash} \n
//   some pseudo random values: [${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()}, ... ]\n
// `
// document.body.prepend(containero)