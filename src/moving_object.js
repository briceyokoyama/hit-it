class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.prevPos = options.pos;
    this.friction = .98 //0.9 was the first value
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  move() {
    this.prevPos = this.pos;
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.vel = [this.vel[0]*this.friction, this.vel[1]*this.friction];
    if (Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)) < .1) {
      this.vel[0] = 0;
      this.vel[1] = 0;
    }

    return this.vel[0] === 0 && this.vel[1] === 0;
  }

  hitBoundary(canvasEl) {
    if (this.pos[0] + this.vel[0] > canvasEl.width || this.pos[0] + this.vel[0] < 0) {
      this.makeBounceSound();
      this.vel[0] = -this.vel[0];
      return [];
    }
    if (this.pos[1] + this.vel[1] > canvasEl.height || this.pos[1] + this.vel[1] < 0) {
      this.makeBounceSound();
      this.vel[1] = -this.vel[1];
      return [];
    }
  }

  collisionLeft(ob) {

    let slope = this.vel[1]/this.vel[0];

    if (ob.angle === 0) {
      let wallDim = ob.pos[0] - ob.width/2;
      let intersectionPT = this.prevPos[1] + slope * (wallDim - this.prevPos[0]);
      let yLowerBound = ob.pos[1] - ob.height/2;
      let yUpperBound = ob.pos[1] + ob.height/2;
      if (this.prevPos[0] < wallDim) {
        if (this.pos[0] > wallDim) {
          if(intersectionPT > yLowerBound && intersectionPT < yUpperBound) {
            this.pos[0] = wallDim;
            this.pos[1] = intersectionPT;
            this.vel[0] = -this.vel[0]
            return true;
          }
        }
      }
    return false;
    } else {
      let wallSlope = (ob.ytopLeftPt - ob.ybottomLeftPt) / (ob.xtopLeftPt - ob.xbottomLeftPt);
      let intersectionX = ((slope*this.pos[0] - this.pos[1]) - (wallSlope*ob.xbottomLeftPt - ob.ybottomLeftPt))/(slope - wallSlope);
      let intersectionY = slope*intersectionX - (slope*this.pos[0] - this.pos[1]);

      let yPrevDiff;
      let yCurrDiff;

      if (intersectionY > ob.ytopLeftPt && intersectionY < ob.ybottomLeftPt && this.prevPos[0] < intersectionX && this.pos[0] > intersectionX) {
        yPrevDiff = this.prevPos[1] - intersectionY;
        yCurrDiff = this.pos[1] - intersectionY;
        if(yPrevDiff*yCurrDiff <= 0) {
          this.pos[0] = intersectionX;
          this.pos[1] = intersectionY;
          this.vel[0] = -this.vel[0]
          return true;
        }
      }
      return false;
    }
  }

  collisionRight(ob) {

    let slope = this.vel[1]/this.vel[0];

    if (ob.angle === 0) {
      let wallDim = ob.pos[0] + ob.width/2;
      let intersectionPT = this.prevPos[1] + slope * (wallDim - this.prevPos[0]);
      let yLowerBound = ob.pos[1] - ob.height/2;
      let yUpperBound = ob.pos[1] + ob.height/2;
      if (this.prevPos[0] > wallDim) {
        if (this.pos[0] < wallDim) {
          if(intersectionPT > yLowerBound && intersectionPT < yUpperBound) {
            this.pos[0] = wallDim;
            this.pos[1] = intersectionPT;
            this.vel[0] = -this.vel[0]
            return true;
          }
        }
      }
      return false;
    } else {
      let wallSlope = (ob.ytopRightPt - ob.ybottomRightPt) / (ob.xtopRightPt - ob.xbottomRightPt);
      let intersectionX = ((slope*this.pos[0] - this.pos[1]) - (wallSlope*ob.xbottomRightPt - ob.ybottomRightPt))/(slope - wallSlope);
      let intersectionY = slope*intersectionX - (slope*this.pos[0] - this.pos[1]);

      let yPrevDiff;
      let yCurrDiff;

      if (intersectionY > ob.ytopRightPt && intersectionY < ob.ybottomRightPt && this.prevPos[0] > intersectionX && this.pos[0] < intersectionX) {
        yPrevDiff = this.prevPos[1] - intersectionY;
        yCurrDiff = this.pos[1] - intersectionY;
        if(yPrevDiff*yCurrDiff <= 0) {
          this.pos[0] = intersectionX;
          this.pos[1] = intersectionY;
          this.vel[0] = -this.vel[0]
          return true;
        }
      }
      return false;
    }
  }

  collisionTop(obstacle) {
    let invSlope = this.vel[0]/this.vel[1];
    let wallDim = obstacle.pos[1] - obstacle.height/2;
    let intersectionPT = this.prevPos[0] + invSlope * (wallDim - this.prevPos[1]);
    let xLowerBound = obstacle.pos[0] - obstacle.width/2;
    let xUpperBound = obstacle.pos[0] + obstacle.width/2;
    if (this.prevPos[1] < wallDim) {
      if (this.pos[1] > wallDim) {
        if(intersectionPT > xLowerBound && intersectionPT < xUpperBound) {
          this.pos[0] = intersectionPT;
          this.pos[1] = wallDim;
          this.vel[1] = -this.vel[1]
          return true;
        }
      }
    }
    return false;
  }

  collisionBot(obstacle) {
    let invSlope = this.vel[0]/this.vel[1];
    let wallDim = obstacle.pos[1] + obstacle.height/2;
    let intersectionPT = this.prevPos[0] + invSlope * (wallDim - this.prevPos[1]);
    let xLowerBound = obstacle.pos[0] - obstacle.width/2;
    let xUpperBound = obstacle.pos[0] + obstacle.width/2;
    if (this.prevPos[1] > wallDim) {
      if (this.pos[1] < wallDim) {
        if(intersectionPT > xLowerBound && intersectionPT < xUpperBound) {
          this.pos[0] = intersectionPT;
          this.pos[1] = wallDim;
          this.vel[1] = -this.vel[1]
          return true;
        }
      }
    }
    return false;
  }

  checkCollisions(obstacle) {
    if (this.collisionLeft(obstacle) || this.collisionRight(obstacle) || this.collisionTop(obstacle) || this.collisionBot(obstacle)) {
      this.makeBounceSound();
      return [];
    }
    return false;
  }

  makeBounceSound() {
    let audio = document.getElementById("audio-player")
    audio.src = "./assets/sound/bounce.wav";
    audio.play();
  }
}

module.exports = MovingObject;