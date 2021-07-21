let wnx = window.innerWidth;
let wny = window.innerHeight;


let nb = 0;

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

let s = 200;
let dev = false;

function keyPressed() {
  if (key === '1') {
    let x = mouseX - wnx / 2;
    let y = mouseY - wny / 2;
    allPos.red.push({
      x: x,
      y: y
    });
    let type = 'red'
    cells[type].push(new Cell(x, y, type));
  } else if (key === '2') {
    let x = mouseX - wnx / 2;
    let y = mouseY - wny / 2;
    allPos.red.push({
      x: x,
      y: y
    });
    let type = 'green'
    cells[type].push(new Cell(x, y, type));
  } else if (key === '3') {
    let x = mouseX - wnx / 2;
    let y = mouseY - wny / 2;
    allPos.red.push({
      x: x,
      y: y
    });
    let type = 'blue'
    cells[type].push(new Cell(x, y, type));
  } else if (key === '4') {
    let x = mouseX - wnx / 2;
    let y = mouseY - wny / 2;
    allPos.red.push({
      x: x,
      y: y
    });
    let type = 'yellow'
    cells[type].push(new Cell(x, y, type));
  }
}

function setup() {
  createCanvas(wnx, wny);
  for (let i = 0; i < nb; i++) {
    let x = random(-s, s);
    let y = random(-s, s);
    allPos.red.push({
      x: x,
      y: y
    });
    let type = 'red'
    cells[type].push(new Cell(x, y, type));
  }
  for (let i = 0; i < nb; i++) {
    let x = random(-s, s);
    let y = random(-s, s);
    allPos.blue.push({
      x: x,
      y: y
    });
    let type = 'blue';
    cells[type].push(new Cell(x, y, type));
  }
  for (let i = 0; i < nb; i++) {
    let x = random(-s, s);
    let y = random(-s, s);
    allPos.green.push({
      x: x,
      y: y
    });
    let type = 'green';
    cells[type].push(new Cell(x, y, type));
  }
  for (let i = 0; i < nb; i++) {
    let x = random(-s / 4, s / 4);
    let y = random(-s / 4, s / 4);
    allPos.yellow.push({
      x: x,
      y: y
    });
    let type = 'yellow';
    cells[type].push(new Cell(x, y, type));
  }
  console.log('Here is the seed')
  console.log({ positions: allPos, rules: rules });
}

let time = 0;

function draw() {
  background(34);
  translate(wnx / 2, wny / 2)
  let all = cells.red.concat(cells.green.concat(cells.blue.concat(cells.yellow)));
  for (let i = 0; i < cells.blue.length; i++) {
    cells.blue[i].interact(all, rules);
    cells.blue[i].separate(all);
    //  cells.blue[i].setDes();
    cells.blue[i].update(time);
    cells.blue[i].render();
  }
  for (let i = 0; i < cells.green.length; i++) {
    cells.green[i].interact(all, rules);
    cells.green[i].separate(all);
    //  cells.red[i].setDes();
    cells.green[i].update(time);
    cells.green[i].render();
  }
  for (let i = 0; i < cells.red.length; i++) {
    cells.red[i].interact(all, rules);
    cells.red[i].separate(all);
    //  cells.red[i].setDes();
    cells.red[i].update(time);
    cells.red[i].render();
  }
  for (let i = 0; i < cells.yellow.length; i++) {
    cells.yellow[i].interact(all, rules);
    cells.yellow[i].separate(all);
    //  cells.red[i].setDes();
    cells.yellow[i].update(time);
    cells.yellow[i].render();
  }
  time++;
}
