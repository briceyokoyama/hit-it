const MovingObject = require('./moving_object');

class PlayBall extends MovingObject {
  constructor(options) {
    super(options)
    this.determineMovement = this.determineMovement.bind(this);
  }

  determineMovement(xClick, yClick) {
    let xDiff = this.pos[0] - xClick;
    let yDiff = this.pos[1] - yClick;
    let mag = 1/(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    let unitDir = [xDiff, yDiff];
    this.vel[0] = unitDir[0] * mag * 850;
    this.vel[1] = unitDir[1] * mag * 850;
    // console.log(this.vel);
    // debugger;
    // console.log("x diff: ", (pos[0] - xClick));
    // console.log("y diff: ", (pos[1] - yClick));
    // console.log("x vel: ", this.vel[0]);
    // console.log("y vel: ", this.vel[1]);
  }
}

module.exports = PlayBall;