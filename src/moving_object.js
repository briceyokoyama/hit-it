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

  hitObstacle(obstacle) {

  }

  collisionLeft(obstacle) {
    let slope = this.vel[1]/this.vel[0];
    let wallDim = obstacle.pos[0] - obstacle.width/2;
    let intersectionPT = this.prevPos[1] + slope * (wallDim - this.prevPos[0]);
    let yLowerBound = obstacle.pos[1] - obstacle.height/2;
    let yUpperBound = obstacle.pos[1] + obstacle.height/2;
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
  }

  collisionRight(obstacle) {
    let slope = this.vel[1]/this.vel[0];
    let wallDim = obstacle.pos[0] + obstacle.width/2;
    let intersectionPT = this.prevPos[1] + slope * (wallDim - this.prevPos[0]);
    let yLowerBound = obstacle.pos[1] - obstacle.height/2;
    let yUpperBound = obstacle.pos[1] + obstacle.height/2;
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
      let audio = document.getElementById("audio-player")
      audio.src = "../assets/sound/bounce.wav";
      audio.play();
      return [];
    }
    return false;
  }

  makeBounceSound() {
    let audio = document.getElementById("audio-player")
    audio.src = "../assets/sound/bounce.wav";
    audio.play();
  }

  createSparks(pos) {

  }
}

module.exports = MovingObject;