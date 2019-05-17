const PlayBall = require("./play_ball");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.height = 600;
  canvasEl.width = 600;
  let ctx = canvasEl.getContext("2d");
  

  const pb = new PlayBall(
    { pos: [30, 30], vel: [0, 0], radius: 5, color: "#00FF00"}
  );

  const handleClick = (e) => {
    pb.determineMovement(e.clientX, e.clientY);
    canvasEl.removeEventListener('click', handleClick);
  }

  canvasEl.addEventListener('click', handleClick)

  const doStuff = () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    pb.draw(ctx);
    if (pb.move()) {
      canvasEl.addEventListener('click', handleClick);
    };
    requestAnimationFrame(doStuff);
  }

  requestAnimationFrame(doStuff);
})