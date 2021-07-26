
let func = "x + 2 * y - 1";
let font;

function preload() {
  font = loadFont("assets/JetBrainsMono-Light.ttf");
}

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB);
}

function plot(f) {
  strokeWeight(0.9);
  for (let i = -4; i < 5; ++i) {
    stroke(map(i, 4, -4, 260, 460), 100, 70);
    fill(map(i, 4, -4, 260, 460), 100, 70);
    line(-400, 200 - i * 50, -100 - 100 * i, 400, -200 - i * 50, -100 - 100 * i);

    push();
    translate(0, -i * 50 + 10, -100 - 100 * i);
    text(`z=${-i-1}`, 0, 0);
    pop();
  }
  stroke('black');
  for (let x = -4; x <= 4; x += 0.1) {
    for (let y = -4; y <= 4; y += 0.1) {
      let z = eval(f);
      point(x * 100, y * 100, z * 100);
    }
  }
}

function draw() {
  background(240);
  textFont(font);

  orbitControl(2, 2, 0.2);

  stroke(0);
  line(-300, 0, 0, 300, 0, 0);
  fill('black');
  push();
    translate(300, 10, 0);
    text("+x", 0, 0);
    translate(-600, 10, 0);
    text("-x", 0, 0);
  pop();

  line(0, -300, 0, 0, 300, 0);
  push();
    translate(0, 300, 10);
    text("+y", 0, 0);
    translate(0, -600, 10);
    text("-y", 0, 0);
  pop();

  line(0, 0, -300, 0, 0, 300);
  push();
    translate(0, 0, 300);
    text("+z", 0, 0);
    translate(0, 0, -600);
    text("-z", 0, 0);
  pop();
  
  plot(func);
}
