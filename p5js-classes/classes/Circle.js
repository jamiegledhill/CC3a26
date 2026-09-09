class Circle extends Shape {
  draw() {
    fill(this.fillColour);
    noStroke();
    // stroke(this.strokeColour);
    // strokeWeight(this.strokeThickness);
    ellipse(this.x, this.y, this.size);
  }
}