function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#FF00FF");
  angleMode(DEGREES);
  colorMode(HSB);
  const cellCount = 60;
  const wallDepth = cellCount / 12;
  const cellSize = width * 2 / cellCount;
  const wallHeight = wallDepth * 2;
  setGradient(0, 0, width, height, color("#FF0081"), color("#8F2AA3"));
  drawWalls(cellSize, wallDepth, wallHeight);
  noLoop();
}

function drawWalls(cellSize, wallDepth, wallHeight) {
  const baseColor = color("#42C6FF");
  noStroke();
  push();
  translate(width/2, -height);
  rotate(45);
  for (var x = 0; x < width * 3; x += cellSize) {
    for (var y = 0; y < height * 3; y += cellSize) {
      drawWallTop(cellSize + 1, wallDepth, x, y, baseColor);
      drawWallLightSide(cellSize, wallDepth, wallHeight, x, y, shade(baseColor, 60));
      drawWallDarkSide(cellSize, wallDepth, wallHeight, x, y, shade(baseColor, 30));
    }
  }
  pop();
}

function drawWallTop(cellSize, wallDepth, x, y, color) {
  push();
  fill(color);
  translate(x, y);
  beginShape();
  vertex(0, 0);
  vertex(0, cellSize);
  vertex(wallDepth, cellSize);
  vertex(wallDepth, wallDepth);
  vertex(cellSize, wallDepth);
  vertex(cellSize, 0);
  endShape(CLOSE);
  pop();
}

function drawWallLightSide(cellSize, wallDepth, wallHeight, x, y, color) {
  push();
  fill(color);
  translate(x + wallDepth, y + wallDepth);
  beginShape();
  vertex(0, 0);
  vertex(0, cellSize - wallDepth);
  vertex(wallHeight, cellSize - wallDepth);
  vertex(wallHeight, wallHeight);
  endShape(CLOSE);
  pop();
}

function drawWallDarkSide(cellSize, wallDepth, wallHeight, x, y, color) {
  push();
  fill(color);
  translate(x + wallDepth, y + wallDepth);
  beginShape();
  vertex(0, 0);
  vertex(cellSize - wallDepth, 0);
  vertex(cellSize - wallDepth, wallHeight);
  vertex(wallHeight, wallHeight);
  endShape(CLOSE);
  pop();
}

function setGradient(x, y, w, h, c1, c2) {
  for (var i = x; i < x+w; i++) {
    var inter = map(i, x, x+w, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(i, y, i, y+h);
  }
}

function shade(baseColor, amount) {
  return color(hue(baseColor), saturation(baseColor) - amount/2, amount);
}