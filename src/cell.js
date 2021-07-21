class Cell {
  constructor(x, y, type) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);

    this.heartbeat = 0;
    this.freq = random(100, 160);

    this.des = createVector(random(-s * 2, s * 2), random(-s * 2, s * 2));
    this.size = 6;

    this.maxForce = 2;
    this.maxVelocity = 2;

    this.separation = 6;

    this.type = type;
    this.id = '#' + JSON.stringify(round(random(1000000, 9999999)));

    this.perception = 256;
    let c;
    if (type === 'blue') {
      c = color(0, 200, 255, 200);
    } else if (type === 'red') {
      c = color(255, 100, 0, 200);
    } else if (type === 'green') {
      c = color(0, 255, 200, 200);
    } else if (type === 'yellow') {
      c = color(255, 230, 50, 200);
    }
    this.color = c;
  }
  setDes(x, y) {
    this.des.x = x;
    this.des.y = y;
  }
  applyForce(x, y) {
    this.acc.add(createVector(x, y));
  }
  separate(others) {
    let perceptionRadius = this.separation;
    let steering = createVector();
    let total = 0;
    for (let other of others) {
      let d = dist(
        this.pos.x,
        this.pos.y,
        other.pos.x,
        other.pos.y
      );

      if (other.id !== this.id && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.mult(d * d);
        steering.add(diff);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxVelocity);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    this.acc.add(steering);
  }
  interact(others, rules) {
    for (let rule in rules) {
      if (rule === this.type) {
        let r = rules[rule];

        let closest = this.findClosest(others, this.perception);
        let change = createVector(0, 0);
        for (let c = 0; c < r.follow.length; c++) {
          let type = r.follow[c];
          if (type === closest.type) {
            // Go follow
            change.add(closest.pos.x, closest.pos.y);
            let diff = p5.Vector.sub(change, this.pos);
            change.mult(0);
            this.acc.add(diff.setMag(this.maxForce * this.heartbeat));
          }
        }
        for (let c = 0; c < r.flee.length; c++) {
          let type = r.follow[c];
          closest = this.findClosest(others, this.perception / 2);
          if (closest !== 'empty') {
            if (type === closest.type) {
              // Flee
              change.add(-1 * (closest.pos.x - this.pos.x), -1 * (closest.pos.y - this.pos.y)); // Flee
              let diff = p5.Vector.sub(change, this.pos);
              change.mult(0);
              this.acc.add(diff.setMag(this.maxForce * this.heartbeat));
            }
          }
        }
        change.add(this.pos.x + random(-this.search, this.search), this.pos.y + random(-this.search, this.search));
        let diff = p5.Vector.sub(change, this.pos);
        change.mult(0);
        this.acc.add(diff.setMag(this.maxForce * this.heartbeat));
      }
    }
  }
  update(time) {
    let diff = p5.Vector.sub(this.des, this.pos);
    this.acc.add(diff.setMag(this.maxForce));
    this.acc.normalize();
    this.acc.setMag(this.maxForce);
    // Acc, vel, pos physiscs
    this.vel.add(this.acc);
    this.vel.setMag(this.maxVelocity)
    this.pos.add(this.vel);
    this.acc.mult(0);
    // Velocity loss to simulate fluid resistance
    this.vel.mult(0.999);
    this.heartbeat = 0.5 * sin(this.freq * 0.006 * time) + 0.5
  }
  findClosest(others, max) {
    let record = 10000;
    let bestIndex = 0;
    for (let i = 0; i < others.length; i++) {
      let cell = others[i];
      if (this.id !== cell.id) {
        let d = dist(this.pos.x, this.pos.y, cell.pos.x, cell.pos.y);
        if (d <= record && d <= max) {
          record = d;
          bestIndex = i;
        }
      }
    }
    let ans;
    if (record === 10000) {
      ans = 'empty';
    } else {
      ans = others[bestIndex];
    }
    return ans;
  }

  render() {
    push();
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.heartbeat * 130 + 125);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
    if (dev === true) {
      stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], 2)
      fill(255, 255, 255, 3)
      ellipse(this.pos.x, this.pos.y, this.perception * 2, this.perception * 2);
      stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], 50)
      line(this.pos.x, this.pos.y, this.pos.x + (this.vel.y * 16), this.pos.y + (this.acc.y * 16));
    }
    pop();
  }
}
