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

// Wheter or not to display perception radius
let dev = false;

// Wheter or not to display population graph
let allowgraph = false;