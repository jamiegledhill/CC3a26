class SquareSound {
    constructor(frequency) {
        this.osc = new p5.SqrOsc(frequency);
        this.env = new p5.Envelope();
        this.osc.amp(this.env);
        this.env.setADSR(0.1, 0.5, 0.5, 0.2);
        this.env.setRange(1.0, 0.0);
        this.osc.start();
    }
}