function keyPressed() {
  let i = 0;
  for (let elem in ruleset) {
    if (key === JSON.stringify(i + 1)) {
      let x = mouseX - wnx / 2;
      let y = mouseY - wny / 2;
      allPos[elem].push({
        x: x,
        y: y
      });
      let type = elem;
      cells[type].push(new Cell(x, y, type, ruleset));
    }
    i++;
  }
}
