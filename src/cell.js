class Cell {
  constructor(x, y, type, rules_) {
    let m = 0;
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);

    this.timeOff = 0;

    this.hungerDelay = random(80, 120);
    this.hunger = 0;

    this.des = createVector(0, 0);
    this.size = cellSize;
    this.separation = this.size + 1;

    this.maxForce = 0.5;
    this.maxVelocity = 0.8;

    this.type = type;
    this.id = '#' + JSON.stringify(round(random(1000000, 9999999)));

    this.state = 'Living';
    this.perception = rules_[type].perception || this.size * 2;

    this.heartbeat = 0;
    this.freq = random(rules_[type].heartbeat[0] || 40, rules_[type].heartbeat[1] || 50);
    this.amp = 1;

    // let c;
    // if (type === 'blue') {
    //   c = color(0, 200, 255, 200);
    // } else if (type === 'red') {
    //   c = color(255, 100, 0, 200);
    // } else if (type === 'green') {
    //   c = color(0, 255, 200, 200);
    // } else if (type === 'yellow') {
    //   c = color(255, 230, 50, 200);
    // } else if (type === 'violet') {
    //   c = color(205, 0, 255, 200);
    // }
    if (rules_[type].color === undefined) {
      let r = random(0, 255);
      let g = random(0, 255);
      let b = random(0, 255);
      let a = 200;
      rules_[type].color = [r, g, b, a];
      //this.color = color(r, g, b, a);
    }
    let r = rules_[type].color[0];
    let g = rules_[type].color[1];
    let b = rules_[type].color[2];
    let a = 200;
    this.color = color(r, g, b, a);


  }
  setDes(x, y) {
    this.des.x = x;
    this.des.y = y;
  }
  applyForce(x, y) {
    this.acc.add(createVector(x, y));
  }
  separate(cells, rad = 16) {
    let others = [];
    for (let elem in cells) {

      others = others.concat(cells[elem]);
    }

    let perceptionRadius = rad;
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
        //diff.mult(Math.sqrt(d));
        //console.log(this)
        steering.add(diff);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxVelocity * 30);
      steering.sub(this.vel);
      steering.limit(this.maxForce * 30);
    }
    this.acc.add(steering);
  }
  interact(others, rules) {
    let timeOff = 0;
    for (let rule in rules) {
      if (rule === this.type) {
        let r = rules[rule];

        // let closest = this.allInProximity(others, this.perception);
        let closest;
        // Handle follow rule
        if (r.follow !== undefined) {
          for (let c = 0; c < r.follow.length; c++) {
            let type = r.follow[c];
            closest = this.allInProximity(others[type], this.perception);
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
        }
        if (r.flee !== undefined) {
          // Handle flee rule
          for (let c = 0; c < r.flee.length; c++) {

            let type = r.flee[c];
            closest = this.allInProximity(others[type], this.perception);
            for (let j = 0; j < closest.length; j++) {
              let cell = closest[j];

              if (type === cell.type) {
                let change = createVector(0, 0);
                // Flee

                change.add(-1 * (cell.pos.x - this.pos.x), -1 * (cell.pos.y - this.pos.y)); // Flee
                let diff = p5.Vector.sub(change, this.pos);
                this.acc.add(diff.setMag(-this.maxForce * this.heartbeat));
              }

            }

          }
        }
        if (r.create !== undefined) {
          // Handle create rule
          let count = 0;
          for (let c = 0; c < r.create.length; c++) {
            let type = r.create[c].type;
            this.birthRate = r.create[c].rate;
            // Birth
            if (this.timeOff >= this.birthRate) {
              let m = 100000;
              this.acc.add(random(-m, m), random(-m, m));
              let oldpos = this.pos;
              //this.update(time, i);

              others[type].push(new Cell(oldpos.x + (Math.floor(random(-1, 1)) * this.size / 2), oldpos.y + (Math.floor(random(-1, 1)) * this.size / 2), type, rules));
              count++;

            }



          }
          if (count >= r.create.length) {
            this.timeOff = 0;
          }
          this.timeOff++;
        }
        if (r.kill !== undefined) {
          // Handle create rule
          for (let c = 0; c < r.kill.length; c++) {
            let type = r.kill[c];
            closest = this.allInProximity(others[type], this.size / 2 + 2);
            for (let j = 0; j < closest.length; j++) {
              let cell = closest[j];

              if (type === cell.type) {

                // Kil/ eat cell
                if (this.hunger >= this.hungerDelay) {
                  let m = 10;
                  this.acc.add(random(-m, m), random(-m, m));

                  cell.state = 'DEAD';
                  this.hunger = 0;
                }
              }

            }

          }
          this.hunger++;
        }
      }
    }
    //this.update(time, i);

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
      //this.pos.x = -wnx / 2 + margin * 2;
      count++;
    } else if (this.pos.y <= -wny / 2 + margin) {
      //cells[this.type].splice(i, 1);
      this.state = 'DEAD';
      //this.pos.y = wny / 2 - margin * 2;
      count++;
    } else if (this.pos.y >= wny / 2 - margin) {
      //cells[this.type].splice(i, 1);
      this.state = 'DEAD';
      //this.pos.y = -wny / 2 + margin * 2;
      count++;
    }
    return count++;
  }
  calcHeartBeat(time) {
    let v = (this.amp / 2) * sin(this.freq * 0.006 * time) + (this.amp / 2);
    if (v <= 0) {
      return 0;
    } else {
      return v;
    }
  }
  update(time) {
    // Acc, vel, pos physiscs
    this.acc.setMag(this.maxForce);
    this.vel.add(this.acc);
    this.vel.mult(this.maxVelocity)
    this.pos.add(this.vel);

    // Velocity loss to simulate fluid resistance
    this.vel.mult(0.9);
    this.acc.mult(0);
    this.heartbeat = this.calcHeartBeat(time);

  }
  allInProximity(list, max) {
    let ans = [];
    for (let i = 0; i < list.length; i++) {
      let cell = list[i];
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
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.heartbeat / (this.amp) * 130 + 125);
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
