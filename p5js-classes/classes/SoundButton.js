class SoundButton {
  static Width = 200;
  static Height = 100;
  constructor(index, x, y, colour, env) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.passiveColour = color(red(colour) * 0.5, green(colour) * 0.5, blue(colour) * 0.5);
    this.activeColour = colour;
    this.colour = this.passiveColour;
    this.env = env;
  }
  buttonPressed() {
    this.colour = this.activeColour;
    this.env.triggerAttack();
    const evt = new CustomEvent("soundButtonPressed", {
      detail: {
        x: this.x,
        y: height / 2,
        colour: color(red(this.colour) * noise(millis()), green(this.colour) *  noise(millis()), blue(this.colour) * noise(millis())),
        index: this.index,
      },
    });
    _renderer.canvas.dispatchEvent(evt);
  }
  buttonReleased() {
    this.colour = this.passiveColour;
    this.env.triggerRelease();
    const evt = new CustomEvent("soundButtonReleased", {
      detail: {
        index: this.index,
      },
    });
    _renderer.canvas.dispatchEvent(evt);
  }
  update(){
    if(mouseIsPressed && mouseX > this.x && mouseX < this.x + SoundButton.Width && mouseY > this.y && mouseY < this.y + SoundButton.Height){
      this.buttonPressed();
    }
    if(!mouseIsPressed){
      this.buttonReleased();
    }
  }
  draw(){
    fill(this.colour);
    noStroke();
    rect(this.x, this.y, SoundButton.Width, SoundButton.Height);
  }
}
