
let func = "x*x+y*y-x*x*y*y";
let f_x = "2*x-2*x*y*y";
let f_y = "2*y-2*x*x*y";
let font;

function preload() {
  font = loadFont("assets/JetBrainsMono-Light.ttf");
}

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB);
}

function calc_grad(x, y) {
  return [eval(f_x), eval(f_y)];
}

function calc_func(x, y) {
  return eval(func);
}

function quad_at(x, y, step) {
  let ht = float(calc_func(x, y)) * constrain(map(mouseY, height / 4, 3 * height / 4, 1, 0), 0, 1);
  let grad = calc_grad(x, y);
  let len = sqrt(grad[0] * grad[0] + grad[1] * grad[1] + 1.0);
  let invLen = 1.0 / len;
  normal(grad[0] * invLen, grad[1] * invLen, invLen);
  vertex(x - step, y - step, ht - step * grad[0] - step * grad[1]);
  vertex(x - step, y + step, ht - step * grad[0] + step * grad[1]);
  vertex(x + step, y + step, ht + step * grad[0] + step * grad[1]);
  vertex(x - step, y - step, ht - step * grad[0] - step * grad[1])
  vertex(x + step, y - step, ht + step * grad[0] - step * grad[1]);
  vertex(x + step, y + step, ht + step * grad[0] + step * grad[1]);
}

function draw() {
  background(200);
  textFont(font);

  orbitControl(2, 2, 0.2);

  rotateX(PI/4);
  rotateZ(PI/4);

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

  scale(150, 150, 150);
  normalMaterial();
  let step = constrain(map(mouseX, 0, width, 0.5, 0.05), 0.05, 0.5);
  beginShape(TRIANGLES);
  for (let x = -1.5; x <= 1.5; x += step) {
    for (let y = -1.5; y <= 1.5; y += step) {
      quad_at(x, y, step * 0.5);
    }
  }
  endShape();
}
