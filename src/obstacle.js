class Obstacle {
  constructor(options) {
    this.pos = options.pos;
    this.height = options.height;
    this.width = options.width;
    this.angle = options.angle;
    this.color = options.color;
    this.xmidLeftPt = this.pos[0] - this.width/2*Math.cos(this.angle);
    this.ymidLeftPt = this.pos[1] - this.width/2*Math.sin(this.angle);
    this.xbottomLeftPt = this.xmidLeftPt + this.height/2*Math.sin(this.angle);
    this.ybottomLeftPt = this.ymidLeftPt + this.height/2*Math.cos(this.angle);
    this.xtopLeftPt = this.xmidLeftPt - this.height/2*Math.sin(this.angle);
    this.ytopLeftPt = this.ymidLeftPt - this.height/2*Math.cos(this.angle);
    this.xmidRightPt = this.pos[0] + this.width/2*Math.cos(this.angle);
    this.ymidRightPt = this.pos[1] + this.width/2*Math.sin(this.angle);
    this.xbottomRightPt = this.xmidRightPt + this.height/2*Math.sin(this.angle);
    this.ybottomRightPt = this.ymidRightPt + this.height/2*Math.cos(this.angle);
    this.xtopRightPt = this.xmidRightPt - this.height/2*Math.sin(this.angle);
    this.ytopRightPt = this.ymidRightPt - this.height/2*Math.cos(this.angle);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-this.angle * Math.PI / 180);
    ctx.translate(-this.pos[0], -this.pos[1]);
    ctx.fillRect(this.pos[0] - this.width/2, this.pos[1] - this.height/2, this.width, this.height);
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.translate(-this.pos[0], -this.pos[1]);
  }
}

module.exports = Obstacle;