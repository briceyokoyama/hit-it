// const PlayBall = require("./play_ball");
// const Target = require("./target");
// const Obstacle = require("./obstacle");
const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {

  const start = document.getElementById("start-button");
  const about = document.getElementById("about-button");
  const highScores = document.getElementById("high-score-button");
  start.addEventListener("click", startGame);
  about.addEventListener("click", showAbout);
  highScores.addEventListener("click", showHighScores);
})

const startGame = () => {
  const canvasEl = document.getElementsByTagName("canvas")[0]
  const endGameButton = document.getElementById("end-game-button");
  const startMenu = document.getElementById("start-menu");
  endGameButton.style.display = "inline";
  startMenu.style.display = "none";
  canvasEl.style.display = "inline";
  canvasEl.height = 600;
  canvasEl.width = 600;
  const ctx = canvasEl.getContext("2d");

  const game = new Game();
  let gameView = new GameView(game, ctx, canvasEl);
  gameView.start();
  endGameButton.addEventListener("click", endGame(gameView));
}

const endGame = () => {
  return (gameView) => {
    const canvasEl = document.getElementsByTagName("canvas")[0]
    const endGameButton = document.getElementById("end-game-button");
    const startMenu = document.getElementById("start-menu");
    endGameButton.style.display = "none";
    startMenu.style.display = "flex";
    canvasEl.style.display = "none";
    let [clicks, score] = gameView.end();
    gameView = {};
    endGameButton.removeEventListener("click", endGame);
  }
}

const showAbout = () => {
  const startMenu = document.getElementById("start-menu")
  const aboutMenu = document.getElementById("about-menu");
  const closeButton = document.getElementById("close-button");
  startMenu.style.display = "none";
  aboutMenu.style.display = "flex";
  closeButton.addEventListener("click", hideAbout);
}

const hideAbout = () => {
  const aboutMenu = document.getElementById("about-menu");
  const startMenu = document.getElementById("start-menu");
  const closeButton = document.getElementById("close-button");
  aboutMenu.style.display = "none";
  startMenu.style.display = "flex";
  closeButton.removeEventListener("click", hideAbout);
}

const showHighScores = () => {
  const aboutMenu = document.getElementById("about-menu");
  const highScoreMenu = document.getElementById("high-score-menu");
  const closeButton = document.getElementById("close-hs-button");
  aboutMenu.style.display = "none";
  highScoreMenu.style.display = "flex";
  closeButton.addEventListener("click", hideHighScores);
}

const hideHighScores = () => {
  const aboutMenu = document.getElementById("about-menu");
  const highScoreMenu = document.getElementById("high-score-menu");
  const closeButton = document.getElementById("close-hs-button");
  highScoreMenu.style.display = "none";
  aboutMenu.style.display = "flex";
  closeButton.removeEventListener("click", hideHighScores);
}