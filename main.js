let wnx = window.innerWidth;
let wny = window.innerHeight - 18;
let render = true;
let cycles = 1;

let time = 0;
let count = 0;
let index = 0;
let sim = true;

let STATS = {}
let g;


function setup() {
  createCanvas(wnx, wny);
  reset(ruleset);
  g = new Graph(-wnx / 2, -wny / 2, population * 2);
}

let statTimer = 0;

function draw() {
  background(34);
  translate(wnx / 2, wny / 2)
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
    if (statTimer >= 10) {
      let out = recordStats();
      for (let i = 0; i < out.length; i++) {
        g.addValue(out[i].type, out[i].pop, ruleset[out[i].type].color);
      }
      statTimer = 0;
    }
    time++;

    statTimer++;

  }
  if (allowgraph) {
    g.render();
  }
}
