function reset(rules, positions) {
  if (loadedRules) {
    time = 0;
    count = 0;
    cells = {}
    if (positions !== undefined) {
      allPos = positions;
    } else {
      allPos = {}
    }
    let index = 1;
    for (let pos in rules) {
      if (allPos[pos] === undefined) {
        allPos[pos] = [];

      }
      if (rules[pos] !== undefined) {
        cells[pos] = [];
        STATS[pos] = [];
      }

      let elem = allPos[pos];
      let nb;
      if (positions === undefined) {
        nb = population;
      } else {
        nb = elem.length;
      }
      for (let i = 0; i < nb; i++) {
        let type = pos;
        if (positions === undefined) {
          let x = 0;
          let y = 0;
          let ran = random(-1, 1)
          if (ran > 0) {
            x = random(-sx / (2 * index), sx / (2 * index))
            y = random(-sy / (2 * index), sy / (2 * index))
          } else {
            x = random(-sx / (2 * index), sx / (2 * index));
            y = random(-sy / (2 * index), sy / (2 * index))
          }

          allPos[type].push({
            x: x,
            y: y
          });
          cells[type].push(new Cell(x, y, type, rules));
        } else {
          cells[type].push(new Cell(allPos[pos][i].x, allPos[pos][i].y, type, rules));
        }

      }
      //index--;
    }
    recordStats()
  }
}

function recordStats() {
  let statArr = [];
  for (let elem in cells) {
    STATS[elem].push(cells[elem].length);
    statArr.push({ type: elem, pop: cells[elem].length });
  }
  return statArr;
}

function spawn(pop) {
  let t = 160;
  for (let type in ruleset) {
    for (let i = 0; i < pop; i++) {
      cells[type].push(new Cell(random(-t, t), random(-t, t), type, ruleset));
    }
  }
}
