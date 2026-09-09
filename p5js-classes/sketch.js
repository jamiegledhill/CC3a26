// array to hold all the shapes
let allShapes = [];
let prevMouseX, prevMouseY;
let buttons, sounds; freqs = [110.00, 130.81, 146.83, 164.81, 196.00, 220.00]
function setup() {
  createCanvas(windowWidth, windowHeight);
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  sounds = [];
  for (let i = 0; i < freqs.length; i++) {
    let sound = new SquareSound(freqs[i]);
    sounds.push(sound);
  }
  buttons = [];
  let buttonOffset = (width - freqs.length * SoundButton.Width) / 2;
  for(i = 0; i < freqs.length; i++){
    let button = new SoundButton(
      i, // index
      buttonOffset + i * SoundButton.Width, // x
      height - SoundButton.Height, // y
      color(random(255), random(255), random(255)), // colour
      sounds[i].env
    );
    buttons.push(button);
  }
  _renderer.canvas.addEventListener("soundButtonPressed", (event) => {
    let t = new Triangle(
      event.detail.x, // x
      event.detail.y, // y
      random(-10, 10), // vx
      random(-10, 10 ), // vy
      random(2, 4), // lifetime
      random(10, 100), // size
      event.detail.colour, // fillColour
    );
    allShapes.push(t);
  });
}
function draw() {
  background(0);
  // interaction
  /*if (mouseIsPressed) {
    if (prevMouseX !== mouseX || prevMouseY !== mouseY) {
      mouseDownOnce = true;
      let dx = mouseX - prevMouseX;
      let normalizedDx = map(dx, -width, width, -100, 100);
      let dy = mouseY - prevMouseY;
      let normalizedDy = map(dy, -height, height, -100, 100);
      let c = new Triangle(
        mouseX, // x
        mouseY, // y
        // random(-10, 10), // vx
        // random(-10, 10 ), // vy
        normalizedDx, // vx
        normalizedDy, // vy
        random(2, 4), // lifetime
        random(10, 100), // size
        color(random(255), random(255), random(255)), // fillColour
      );
      allShapes.push(c);
    }
  }
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  */
  // update
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].update();
  }
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].update();
    if (allShapes[i].dead) {
      allShapes.splice(i, 1);
      i--;
    }
  }
  // draw
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].draw();
  }
  const ctx = canvas.getContext("2d");
  ctx.setLineDash([2, 5]); 
  for (let i = 0; i < allShapes.length; i++) {
    if (i < allShapes.length - 1) {
      stroke(255 * (1 - allShapes[i].ratio));
      strokeWeight(2 * (1 - allShapes[i].ratio));
      line(
        allShapes[i].x,
        allShapes[i].y,
        allShapes[i + 1].x,
        allShapes[i + 1].y,
      );
    }
    allShapes[i].draw();
  }
}
