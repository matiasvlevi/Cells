// ----- PARAMETERS -----

// Spawn area bounds 
let sy = 430;
let sx = 430;

// Cell size (diameter)
let cellSize = 6;

// Cell separation (collision radius)
let separation = cellSize + 1;

// Cell population for each type
let population = 25;

// Hearbeat is an array of two values representing minimum heartbeat rate & maximum heartbeatrate
// See rules/rules.js to change for each individual cell

// Perception radius (vision of other cells)
// See rules/rules.js to change for each individual cell

// acc is a value that defines the max acceleration a cell can achieve
// See rules/rules.js to change for each individual cell

// vel is a value that defines the max velocity a cell can achieve
// See rules/rules.js to change for each individual cell


// Wheter or not to display perception radius
let dev = false;

// Wheter or not to display population graph
let allowgraph = false;
let ruleset = {
  A: {
    color: [0, 100, 255],
    heartbeat: [100, 200],
    perception: 64,
    acc: 0.3,
    vel: 1,
    follow: [
      'B'
    ]
  },
  B: {
    color: [255, 100, 0],
    heartbeat: [100, 200],
    perception: 24,
    acc: 0.6,
    vel: 1,
    flee: [
      'A'
    ]
  }
}
