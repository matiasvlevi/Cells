class Graph {
  constructor(x, y) {
    this.pos = createVector(x, y, max);
    this.w = 600;
    this.h = 200;
    this.max = 300;
    this.values = {};
    this.colors = {};
  }
  addValue(name, val, color) {
    if (this.values[name] === undefined) {
      this.values[name] = [];
      this.colors[name] = color;
      this.values[name].push(val);
    } else {
      this.values[name].push(val);
    }
  }
  clear() {
    this.values = {};
    this.colors = {};
  }
  render() {
    push();
    fill(0, 0, 0, 100);
    noStroke();
    rect(this.pos.x, this.pos.y, this.w, this.h);

    noFill();

    for (let value in this.values) {
      let val = this.values[value];
      let c = this.colors[value];
      stroke(c[0], c[1], c[2], 100);
      strokeWeight(1);

      beginShape();

      for (let j = 0; j < val.length; j++) {

        let x = j + this.pos.x;
        let y = this.h * (1 - val[j] / this.max) + this.pos.y;
        vertex(x, y);

      }
      endShape();

    }
    let i = 0;
    for (let value in this.colors) {
      let c = this.colors[value];
      textSize(8);
      fill(c[0], c[1], c[2]);
      text(value, this.pos.x + 10, 15 * i + this.pos.y + 20);
      let val = this.values[value];
      let x = val.length - 1 + this.pos.x;
      let y = this.h * (1 - val[val.length - 1] / this.max) + this.pos.y;

      noStroke();
      text(val[val.length - 1], x, y);
      i++
    }

    pop();
  }
}