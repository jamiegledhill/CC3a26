class Shape {
    // field declarations - careful not to use reserved p5.js keywords
    size;
    fillColour;
    strokeColour = 0;
    strokeThickness = 1;
    vx;
    vy;
    x;
    y;
    lifetime;
    birthTime;
    timeAlive;
    originalStates;
    dead = false;
    drag = 0.9;
    polarity;
    constructor(x, y, vx, vy, lifetime, size, fillColour) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.lifetime = lifetime * 1000;
        this.size = size;
        this.fillColour = fillColour;
        this.birthTime = millis();
        this.originalStates = {size: this.size, vx: this.vx, vy: this.vy};
        this.polarity = {x:1, y:1};
    }
    // method declarations
    update(){
        // calculate how long the shape has been alive
        this.timeAlive = millis() - this.birthTime;
        this.ratio = this.timeAlive / this.lifetime; // 0 to 1 from birth to death
        if(this.ratio >= 1){
            this.dead = true;
        }
        this.size = this.originalStates.size * (1 - this.ratio) // shrink the shape over time
        // // update the velocity of the shape based on drag
        // // this.vx *= this.drag;
        // // this.vy *= this.drag;
        // // or update based on time
        this.vx = this.originalStates.vx * (1 - this.ratio);
        this.vy = this.originalStates.vy  * (1 - this.ratio);
        // update the position of the shape based on its velocity
        
        this.x += this.vx * this.polarity.x;
        this.y += this.vy * this.polarity.y;
        // reflect the shape off the edges of the canvas
        if (this.x < 0 + this.size/2 || this.x > width - this.size/2) {
            this.vx *= -1;
            // record the polarity 
            this.polarity.x *= -1;
        }
        if (this.y < 0 + this.size/2 || this.y > height - this.size/2) {
            this.vy *= -1;
            // record the polarity
            this.polarity.y *= -1;
        }
        // update colour based on time alive
        let r = red(this.fillColour);
        let g = green(this.fillColour);
        let b = blue(this.fillColour);
        this.fillColour = color(r, g, b, 255 * (1 - this.ratio));
    }
    draw(){
    }
}