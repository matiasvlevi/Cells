let wnx = window.innerWidth;
let wny = window.innerHeight;
let ruleset; //parseRule('A>B;B<A');
let render = true;
let cycles = 2;

let selectedRuleset = 3;
let sx = wnx / 4;
let sy = wny / 3;
let dev = false;

let time = 0;
let count = 0;
let index = 0;
let sim = true;

let maxVel = 1;
let maxForce = 0.4;

let cellSize = 3;
let perception = 24;
let population = 25;
let separation = 3;

let STATS = {}
let g;

function sandboxMode() {
  sim = false;
  population = 0;
  cellSize = 32;
  perception = 64
}

function setup() {
  createCanvas(wnx, wny);
  reset(ruleset);
  g = new Graph(-wnx / 2, -wny / 2, population * 2);
}

let statTimer = 0;

function draw() {
  background(34);
  translate(wnx / 2, wny / 2)
  if (loadedRules) {
    for (let h = 0; h < cycles; h++) {

      for (let type in cells) {
        for (let i = 0; i < cells[type].length; i++) {
          let cell = cells[type][i];
          if (cell.state === 'Living') {
            cell.separate(cells, separation);
            cell.interact(cells, ruleset);
            cell.update(time);
            if (render == true) {
              if (h === 0) {
                cell.render();
              }

            }
            count = cell.checkState(i, count);
          }
        }
      }
      for (let type in cells) {

        for (let i = 0; i < cells[type].length; i++) {
          let cell = cells[type][i];
          if (cell.state === 'DEAD') {
            cells[type].splice(i, 1);
          }
        }

      }
      // if (statTimer >= 10) {
      //   let out = recordStats();
      //   for (let i = 0; i < out.length; i++) {
      //     g.addValue(out[i].type, out[i].pop, ruleset[out[i].type].color);
      //   }
      //   statTimer = 0;
      // }
      time++;
      //statTimer++;
    }
    //g.render();
  }
}
