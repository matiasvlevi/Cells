class Cell {
  constructor(x, y, type) {
    let m = 0;
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);

    this.heartbeat = 0;
    this.freq = random(100, 160);

    this.des = createVector(0, 0);
    this.size = 6;

    this.maxForce = 5;
    this.maxVelocity = 2;

    this.separation = 6;

    this.type = type;
    this.id = '#' + JSON.stringify(round(random(1000000, 9999999)));

    this.state = 'Living';

    this.perception = 32;
    let c;
    if (type === 'blue') {
      c = color(0, 200, 255, 200);
    } else if (type === 'red') {
      c = color(255, 100, 0, 200);
    } else if (type === 'green') {
      c = color(0, 255, 200, 200);
    } else if (type === 'yellow') {
      c = color(255, 230, 50, 200);
    } else if (type === 'violet') {
      c = color(205, 0, 255, 200);
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
      steering.setMag(this.maxVelocity * 10000);
      steering.sub(this.vel);
      steering.limit(this.maxForce * 10000);
    }
    this.acc.add(steering);
  }
  interact(others, rules, time, i) {
    for (let rule in rules) {
      if (rule === this.type) {
        let r = rules[rule];

        let closest = this.allInProximity(others, this.perception);

        for (let c = 0; c < r.follow.length; c++) {
          let type = r.follow[c];
          for (let j = 0; j < closest.length; j++) {
            let cell = closest[j];
            if (type === cell.type) {
              let change = createVector(0, 0);
              // Go follow
              change.add(cell.pos.x, cell.pos.y);
              let diff = p5.Vector.sub(change, this.pos);
              this.acc.add(diff.setMag(this.maxForce * this.heartbeat));

            }
          }
        }
        for (let c = 0; c < r.flee.length; c++) {
          let type = r.flee[c];
          for (let j = 0; j < closest.length; j++) {
            let cell = closest[j];

            if (type === cell.type) {
              let change = createVector(0, 0);
              // Flee

              change.add(-1 * (cell.pos.x - this.pos.x), -1 * (cell.pos.y - this.pos.y)); // Flee
              let diff = p5.Vector.sub(change, this.pos);
              this.acc.add(diff.setMag(this.maxForce * -this.heartbeat));
            }

          }

        }
      }
    }
    this.update(time, i);
    this.acc.mult(0);
  }
  checkState(i, count) {
    let margin = 20;
    if (this.pos.x <= -wnx / 2 + margin) {
      //cells[this.type].splice(i, 1);
      this.state = 'DEAD';
      count++;
    } else if (this.pos.x >= wnx / 2 - margin) {
      //cells[this.type].splice(i, 1);
      this.state = 'DEAD';
      count++;
    } else if (this.pos.y <= -wny / 2 + margin) {
      //cells[this.type].splice(i, 1);
      this.state = 'DEAD';
      count++;
    } else if (this.pos.y >= wny / 2 - margin) {
      //cells[this.type].splice(i, 1);
      this.state = 'DEAD';
      count++;
    }
    return count++;
  }
  update(time) {
    // Acc, vel, pos physiscs
    this.vel.add(this.acc);
    this.vel.setMag(this.maxVelocity)
    this.pos.add(this.vel);

    // Velocity loss to simulate fluid resistance
    this.vel.mult(0.9999);
    this.heartbeat = 0.5 * sin(this.freq * 0.006 * time) + 0.5;

  }
  allInProximity(others, max) {
    let ans = [];
    for (let i = 0; i < others.length; i++) {
      let cell = others[i];
      if (this.id !== cell.id) {
        let d = dist(this.pos.x, this.pos.y, cell.pos.x, cell.pos.y);
        if (d <= max) {
          ans.push(cell);
        }
      }
    }
    return ans;
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
