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
  } else if (key === '5') {
    let x = mouseX - wnx / 2;
    let y = mouseY - wny / 2;
    allPos.red.push({
      x: x,
      y: y
    });
    let type = 'violet'
    cells[type].push(new Cell(x, y, type));
  }
}
