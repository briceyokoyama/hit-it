// const PlayBall = require("./play_ball");
// const Target = require("./target");
// const Obstacle = require("./obstacle");
const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {

  let start = document.getElementById("start-button");
  let about = document.getElementById("about-button");
  start.addEventListener('click', startGame);
  about.addEventListener('click', showAbout);
})

const startGame = () => {
  const canvasEl = document.getElementsByTagName("canvas")[0]

  let startMenu = document.getElementById("start-menu");
  startMenu.style.display = "none";
  canvasEl.style.display = "inline";
  canvasEl.height = 600;
  canvasEl.width = 600;
  let ctx = canvasEl.getContext("2d");

  let game = new Game();
  new GameView(game, ctx, canvasEl).start();
}

const showAbout = () => {
  let startMenu = document.getElementById("start-menu")
  let aboutMenu = document.getElementById("about-menu");
  let aboutButton = document.getElementById("close-button");
  startMenu.style.display = "none";
  aboutMenu.style.display = "flex";
  aboutButton.addEventListener('click', hideAbout);
}

const hideAbout = () => {
  let aboutMenu = document.getElementById("about-menu");
  let startMenu = document.getElementById("start-menu");
  let aboutButton = document.getElementById("close-button");
  aboutMenu.style.display = "none";
  startMenu.style.display = "flex";
  aboutButton.removeEventListener('click', hideAbout);
}