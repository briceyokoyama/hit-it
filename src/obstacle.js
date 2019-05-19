class Obstacle {
  constructor(options) {
    this.pos = options.pos;
    this.height = options.height;
    this.width = options.width;
    this.angle = options.angle;
    this.color = options.color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.translate(-this.pos[0], -this.pos[1]);
    ctx.fillRect(this.pos[0] - this.width/2, this.pos[1] - this.height/2, this.width, this.height);
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-this.angle * Math.PI / 180);
    ctx.translate(-this.pos[0], -this.pos[1]);
  }

  collisionLeft(ball) {
    let slope = ball.vel[1]/ball.vel[0];
    let wallDim = this.pos[0] - this.width/2;
    let intersectionPT = ball.prevPos[1] + slope * (wallDim - ball.prevPos[0]);
    let yLowerBound = this.pos[1] - this.height/2;
    let yUpperBound = this.pos[1] + this.height/2;
    if (ball.prevPos[0] < wallDim) {
      if (ball.pos[0] > wallDim) {
        if(intersectionPT > yLowerBound && intersectionPT < yUpperBound) {
          ball.pos[0] = wallDim;
          ball.pos[1] = intersectionPT;
          ball.vel[0] = -ball.vel[0]
          return true;
        }
      }
    }
    return false;
  }

  collisionRight(ball) {
    let slope = ball.vel[1]/ball.vel[0];
    let wallDim = this.pos[0] + this.width/2;
    let intersectionPT = ball.prevPos[1] + slope * (wallDim - ball.prevPos[0]);
    let yLowerBound = this.pos[1] - this.height/2;
    let yUpperBound = this.pos[1] + this.height/2;
    if (ball.prevPos[0] > wallDim) {
      if (ball.pos[0] < wallDim) {
        if(intersectionPT > yLowerBound && intersectionPT < yUpperBound) {
          ball.pos[0] = wallDim;
          ball.pos[1] = intersectionPT;
          ball.vel[0] = -ball.vel[0]
          return true;
        }
      }
    }
    return false;
  }

  collisionTop(ball) {
    let invSlope = ball.vel[0]/ball.vel[1];
    let wallDim = this.pos[1] - this.height/2;
    let intersectionPT = ball.prevPos[0] + invSlope * (wallDim - ball.prevPos[1]);
    let xLowerBound = this.pos[0] - this.width/2;
    let xUpperBound = this.pos[0] + this.width/2;
    if (ball.prevPos[1] < wallDim) {
      if (ball.pos[1] > wallDim) {
        if(intersectionPT > xLowerBound && intersectionPT < xUpperBound) {
          ball.pos[0] = intersectionPT;
          ball.pos[1] = wallDim;
          ball.vel[1] = -ball.vel[1]
          return true;
        }
      }
    }
    return false;
  }

  collisionBot(ball) {
    let invSlope = ball.vel[0]/ball.vel[1];
    let wallDim = this.pos[1] + this.height/2;
    let intersectionPT = ball.prevPos[0] + invSlope * (wallDim - ball.prevPos[1]);
    let xLowerBound = this.pos[0] - this.width/2;
    let xUpperBound = this.pos[0] + this.width/2;
    if (ball.prevPos[1] > wallDim) {
      if (ball.pos[1] < wallDim) {
        if(intersectionPT > xLowerBound && intersectionPT < xUpperBound) {
          ball.pos[0] = intersectionPT;
          ball.pos[1] = wallDim;
          ball.vel[1] = -ball.vel[1]
          return true;
        }
      }
    }
    return false;
  }

  checkCollisions(ball) {
    if (this.collisionLeft(ball) || this.collisionRight(ball) || this.collisionTop(ball) || this.collisionBot(ball)) {
      return true;
    }
    return false;
  }
}

module.exports = Obstacle;