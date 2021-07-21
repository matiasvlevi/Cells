let wnx = window.innerWidth;
let wny = window.innerHeight;

let population = 100;

let cells = {
  blue: [],
  red: [],
  green: [],
  yellow: []
}

let allPos = {
  blue: [],
  red: [],
  green: [],
  yellow: []
}

let s = 50;
let dev = false;

let time = 0;
let count = 0;
let index = 0;

function reset(seed) {
  time = 0;
  count = 0;
  cells = {
    blue: [],
    red: [],
    green: [],
    yellow: []
  }
  if (seed !== undefined) {
    allPos = seed.positions;
  } else {
    allPos = {
      blue: [],
      red: [],
      green: [],
      yellow: []
    }
  }
  for (let pos in allPos) {
    let elem = allPos[pos];
    let nb
    if (seed == undefined) {
      nb = population;
    } else {
      nb = elem.length;
    }
    for (let i = 0; i < nb; i++) {
      let type = pos;
      if (seed === undefined) {
        let x = random(-s, s);
        let y = random(-s, s);
        allPos[pos].push({
          x: x,
          y: y
        });
        cells[type].push(new Cell(x, y, type));
      } else {
        cells[type].push(new Cell(allPos[pos][i].x, allPos[pos][i].y, type));
      }

    }
  }
}
let render = true;
let cycles = 1;

function setup() {
  createCanvas(wnx, wny);
  reset();
}


function draw() {
  background(34);
  translate(wnx / 2, wny / 2)
  for (let h = 0; h < cycles; h++) {
    let all = cells.red.concat(cells.green.concat(cells.blue.concat(cells.yellow)));

    for (let type in cells) {
      for (let i = 0; i < cells[type].length; i++) {
        let cell = cells[type][i];
        if (cell.state === 'Living') {
          cell.separate(all);
          cell.interact(all, rules, time, i);
          if (render == true) {
            cell.render();
          }
          count = cell.checkState(i, count);
        }
      }
    }

    if (count >= allPos.blue.length + allPos.green.length + allPos.red.length + allPos.yellow.length - 20) {
      console.log('Simulation ' + index + ' finished at ' + time + 'ms')
      console.log('Here is the seed:')
      console.log({ positions: allPos, rules: rules });
      index++;
      reset();

    }
    time++;
  }
}
