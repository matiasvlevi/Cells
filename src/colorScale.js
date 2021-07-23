function redScale(z) {
  let d = 3;
  let r = 9;
  let o = -0.61;
  if (z >= 0 && z <= 1) {
    return 255 * Math.exp(-d * (z - 1 - o) * (z - 1 - o)) - r;
  } else {
    return 255;
  }
}

function greenScale(z) {
  let d = 3;
  let o = -0.05;
  if (z >= 0 && z <= 1) {
    return 255 * Math.exp(-d * (z - o) * (z - o));
  } else {
    return 255;
  }
}

function blueScale(z) {
  let d = 3;
  let o = 0.5;

  if (z >= 0 && z <= 1) {
    return 255 * Math.exp(-d * Math.pow(z - 0.5 - o, 2));
  } else {
    return 255;
  }

}

function colorScale(z) {
  return [redScale(z), greenScale(z), blueScale(z)];
}
