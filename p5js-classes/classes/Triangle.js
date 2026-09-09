class Triangle extends Shape {
  draw() {
    fill(this.fillColour);
    noStroke();
    let angle = atan2(this.vy * this.polarity.y, this.vx * this.polarity.x);
    push();
    translate(this.x, this.y);
    rotate(angle+PI*0.5); // rotate the triangle to point in the direction of its velocity
    // translate(this.x, this.y);
    triangle(
      0, - this.size, // top vertex
      0- this.size / 2, 0 + this.size / 2, // bottom left vertex
      0 + this.size / 2, 0 + this.size / 2 // bottom right vertex
    );
    pop();
  }
}
