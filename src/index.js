const PlayBall = require("./play_ball");
const Target = require("./target");
const Obstacle = require("./obstacle");

document.addEventListener("DOMContentLoaded", () => {

  let start = false;

  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.style.display = "block";
  canvasEl.height = 600;
  canvasEl.width = 600;
  let ctx = canvasEl.getContext("2d");
  let obs = [];

  const pb = new PlayBall(
    { pos: [30, 30], vel: [0, 0], radius: 5, color: "#55aacc"}
  );

  const target = new Target(
    { pos: [300, 300]}
  );

  const obs1 = new Obstacle(
    { pos: [400, 300], height: 300, width: 20, angle: 0, color: "#F739A3"}
  );

  const obs2 = new Obstacle(
    { pos: [200, 300], height: 300, width: 20, angle: 0, color: "#F739A3"}
  );

  obs.push(obs1);
  obs.push(obs2);

  const handleClick = (e) => {
    clicks++;
    // console.log("x: ", e.clientX, " y: ", e.clientY);
    let rect = e.target.getBoundingClientRect();
    pb.determineMovement(e.clientX - rect.left, e.clientY - rect.top);
    canvasEl.removeEventListener('click', handleClick);
  }

  canvasEl.addEventListener('click', handleClick)
  let dist;
  let score = 0;
  let clicks = 0;

  const doStuff = () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    if (pb.pos[0] + pb.vel[0] > canvasEl.width || pb.pos[0] + pb.vel[0] < 0) {
      pb.vel[0] = -pb.vel[0];
    }

    if (pb.pos[1] + pb.vel[1] > canvasEl.width || pb.pos[1] + pb.vel[1] < 0) {
      pb.vel[1] = -pb.vel[1];
    }

    obs.forEach(ob => {
      ob.checkCollisions(pb);
      ob.draw(ctx);
    })

    dist = pb.getDistance(target);
    target.draw(ctx);
    pb.draw(ctx);
    ctx.textAlign = "end";
    ctx.font = '24px Arial';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`dist: ${dist}`, 585, 25);
    ctx.fillText(`clicks: ${clicks}`, 585, 60);
    if (pb.move()) {
      canvasEl.addEventListener('click', handleClick);
    };
    requestAnimationFrame(doStuff);
  }

  const startGame = () => {
    
  }
  requestAnimationFrame(doStuff);
})