/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PlayBall = __webpack_require__(/*! ./play_ball */ "./src/play_ball.js");
const Target = __webpack_require__(/*! ./target */ "./src/target.js");
const Obstacle = __webpack_require__(/*! ./obstacle */ "./src/obstacle.js");
const Spark = __webpack_require__(/*! ./spark */ "./src/spark.js");

class Game {
  constructor(options) {
    this.pb = new PlayBall({ pos: [30, 30], vel: [0, 0], radius: 5, color: "#55aacc"});
    this.target = new Target({ pos: [300, 300]})
    this.obstacles = [];
    this.sparks = [];
    this.dist = this.pb.getDistance(this.target);
    this.clicks = 0;

    this.addObstacles();
  }

  addObstacles() {
    const obs1 = new Obstacle(
      { pos: [400, 300], height: 300, width: 20, angle: 0, color: "#F739A3"}
    );
  
    const obs2 = new Obstacle(
      { pos: [200, 300], height: 20, width: 150, angle: 0, color: "#F739A3"}
    );
  
    this.obstacles.push(obs1);
    this.obstacles.push(obs2);
  }

  addClick() {
    this.clicks += 1;
  }

  draw(canvasEl, ctx) {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    this.obstacles.forEach(ob => {
      ob.draw(ctx);
    })

    this.sparks.forEach(spark => {
      spark.draw(ctx);
    })

    this.target.draw(ctx);
    this.pb.draw(ctx);
    ctx.textAlign = "end";
    ctx.font = '18px Orbitron';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`dist: ${this.dist}`, 585, 25);
    ctx.fillText(`clicks: ${this.clicks}`, 585, 60);
  }

  checkCollisions(canvasEl, ctx) {
    let newSparks;
    this.pb.hitBoundary(canvasEl);

    this.obstacles.forEach(ob => {
      // this.sparks.push(...this.pb.checkCollisions(ob));
      this.pb.checkCollisions(ob);
    })
  }

  calcDist() {
    this.dist = this.pb.getDistance(this.target);
  }
}

module.exports = Game;

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx, canvasEl) {
    this.ctx = ctx;
    this.game = game;
    this.canvasEl = canvasEl;
    this.doStuff = this.doStuff.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  start() {
    this.doStuff();
  }

  end() {
    return ({
      distance: this.game.distance,
      clicks: this.game.clicks
    })
  }

  handleClick(e) {
    this.game.addClick();
    let rect = e.target.getBoundingClientRect();
    this.game.pb.determineMovement(e.clientX - rect.left, e.clientY - rect.top);
    this.canvasEl.removeEventListener('click', this.handleClick);
  }

  doStuff() {
    this.game.checkCollisions(this.canvasEl, this.ctx);
    this.game.calcDist();
    this.game.draw(this.canvasEl, this.ctx);
    
    if (this.game.pb.move()) {
      this.canvasEl.addEventListener('click', this.handleClick);
    };

    requestAnimationFrame(this.doStuff);
  }
}

module.exports = GameView;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// const PlayBall = require("./play_ball");
// const Target = require("./target");
// const Obstacle = require("./obstacle");
const Game = __webpack_require__(/*! ./game */ "./src/game.js");
const GameView = __webpack_require__(/*! ./game_view */ "./src/game_view.js");

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

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
      let xPrevDiff = this.prevPos[0] - intersectionX;
      let xCurrDiff = this.pos[0] - intersectionX;
      let yPrevDiff = this.prevPos[1] - intersectionY;
      let yCurrDiff = this.pos[1] - intersectionY;

      // if (intersectionY > ob.ytopLeftPt && intersectionY < ob.ybottomLeftPt && xPrevDiff*xCurrDiff <= 0 && yPrevDiff*yCurrDiff <= 0) {
      if (intersectionY > ob.ytopLeftPt && intersectionY < ob.ybottomLeftPt && xPrevDiff*xCurrDiff <= 0 && yPrevDiff*yCurrDiff <= 0) {
        debugger;
        let xAngle = 180 - 2*ob.angle;
        let xComp1 = this.vel[0] * Math.cos(this.getRadians(xAngle));
        let xComp2 = this.vel[0] * Math.sin(this.getRadians(xAngle));

        let yAngle = 90 - 2*ob.angle;
        let yComp1 = this.vel[1] * Math.cos(this.getRadians(yAngle));
        let yComp2 = this.vel[1] * Math.sin(this.getRadians(yAngle));

        this.vel[0] = xComp1 + yComp1;
        this.vel[1] = xComp2 + yComp2;
        this.pos[0] = intersectionX + this.vel[0]*0.01;
        this.pos[1] = intersectionY + this.vel[1]*0.01;
        return true;
  
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
      let xPrevDiff = this.prevPos[0] - intersectionX;
      let xCurrDiff = this.pos[0] - intersectionX;


      // if (intersectionY > ob.ytopRightPt && intersectionY < ob.ybottomRightPt && this.prevPos[0] > intersectionX && this.pos[0] < intersectionX) {
      if (intersectionY > ob.ytopRightPt && intersectionY < ob.ybottomRightPt && xPrevDiff*xCurrDiff <= 0) {
        let yPrevDiff = this.prevPos[1] - intersectionY;
        let yCurrDiff = this.pos[1] - intersectionY;
        if(yPrevDiff*yCurrDiff <= 0) {
          debugger;
          let xAngle = 180 - 2*ob.angle;
          let xComp1 = this.vel[0] * Math.cos(this.getRadians(xAngle));
          let xComp2 = this.vel[0] * Math.sin(this.getRadians(xAngle));

          let yAngle = 90 - 2*ob.angle;
          let yComp1 = this.vel[1] * Math.cos(this.getRadians(yAngle));
          let yComp2 = this.vel[1] * Math.sin(this.getRadians(yAngle));

          this.vel[0] = xComp1 + yComp1;
          this.vel[1] = xComp2 + yComp2;
          this.pos[0] = intersectionX + this.vel[0]*0.01;
          this.pos[1] = intersectionY + this.vel[1]*0.01;
          return true;
        }
      }
      return false;
    }
  }

  collisionTop(ob) {

    if (ob.angle === 0) {
      let invSlope = this.vel[0]/this.vel[1];
      let wallDim = ob.pos[1] - ob.height/2;
      let intersectionPT = this.prevPos[0] + invSlope * (wallDim - this.prevPos[1]);
      let xLowerBound = ob.pos[0] - ob.width/2;
      let xUpperBound = ob.pos[0] + ob.width/2;
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
    } else {
      let slope = this.vel[1]/this.vel[0]
      let wallSlope = (ob.ytopRightPt - ob.ytopLeftPt) / (ob.xtopRightPt - ob.xtopLeftPt);
      let intersectionX = ((slope*this.pos[0] - this.pos[1]) - (wallSlope*ob.xtopLeftPt - ob.ytopLeftPt))/(slope - wallSlope);
      let intersectionY = slope*intersectionX - (slope*this.pos[0] - this.pos[1]);
      let xPrevDiff = this.prevPos[0] - intersectionX;
      let xCurrDiff = this.pos[0] - intersectionX;

      if (intersectionY > ob.ytopRightPt && intersectionY < ob.ytopLeftPt && xPrevDiff*xCurrDiff <= 0) {
        let yPrevDiff = this.prevPos[1] - intersectionY;
        let yCurrDiff = this.pos[1] - intersectionY;
        if(yPrevDiff*yCurrDiff <= 0) {
          let xAngle = -2*ob.angle;
          let xComp1 = this.vel[0] * Math.cos(this.getRadians(xAngle));
          let xComp2 = this.vel[0] * Math.sin(this.getRadians(xAngle));

          let yAngle = 270 - 2*ob.angle;
          let yComp1 = this.vel[1] * Math.cos(this.getRadians(yAngle));
          let yComp2 = this.vel[1] * Math.sin(this.getRadians(yAngle));

          this.vel[0] = xComp1 + yComp1;
          this.vel[1] = xComp2 + yComp2;
          this.pos[0] = intersectionX + this.vel[0]*0.01;
          this.pos[1] = intersectionY + this.vel[1]*0.01;
          return true;
        }
      }
      return false;
    }
  }

  collisionBot(ob) {

    if (ob.angle === 0) {
      let invSlope = this.vel[0]/this.vel[1];
      let wallDim = ob.pos[1] + ob.height/2;
      let intersectionPT = this.prevPos[0] + invSlope * (wallDim - this.prevPos[1]);
      let xLowerBound = ob.pos[0] - ob.width/2;
      let xUpperBound = ob.pos[0] + ob.width/2;
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
    } else {
      let slope = this.vel[1]/this.vel[0]
      let wallSlope = (ob.ybottomRightPt - ob.ybottomLeftPt) / (ob.xbottomRightPt - ob.xbottomLeftPt);
      let intersectionX = ((slope*this.pos[0] - this.pos[1]) - (wallSlope*ob.xbottomLeftPt - ob.ybottomLeftPt))/(slope - wallSlope);
      let intersectionY = slope*intersectionX - (slope*this.pos[0] - this.pos[1]);
      let xPrevDiff = this.prevPos[0] - intersectionX;
      let xCurrDiff = this.pos[0] - intersectionX;

      if (intersectionY > ob.ybottomRightPt && intersectionY < ob.ybottomLeftPt && xPrevDiff*xCurrDiff <= 0) {
        let yPrevDiff = this.prevPos[1] - intersectionY;
        let yCurrDiff = this.pos[1] - intersectionY;
        if(yPrevDiff*yCurrDiff <= 0) {
          let xAngle = -2*ob.angle;
          let xComp1 = this.vel[0] * Math.cos(this.getRadians(xAngle));
          let xComp2 = this.vel[0] * Math.sin(this.getRadians(xAngle));

          let yAngle = 270 - 2*ob.angle;
          let yComp1 = this.vel[1] * Math.cos(this.getRadians(yAngle));
          let yComp2 = this.vel[1] * Math.sin(this.getRadians(yAngle));

          this.vel[0] = xComp1 + yComp1;
          this.vel[1] = xComp2 + yComp2;
          this.pos[0] = intersectionX + this.vel[0]*0.01;
          this.pos[1] = intersectionY + this.vel[1]*0.01;
          return true;
        }
      }
      return false;
    }
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

  getRadians(angle) {
    return angle * Math.PI/180
  }
}

module.exports = MovingObject;

/***/ }),

/***/ "./src/obstacle.js":
/*!*************************!*\
  !*** ./src/obstacle.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Obstacle {
  constructor(options) {
    this.pos = options.pos;
    this.height = options.height;
    this.width = options.width;
    this.angle = options.angle;
    this.color = options.color;
    this.xmidLeftPt = this.pos[0] - this.width/2*Math.cos(this.getRadians(this.angle));
    this.ymidLeftPt = this.pos[1] + this.width/2*Math.sin(this.getRadians(this.angle));
    this.xbottomLeftPt = this.xmidLeftPt + this.height/2*Math.sin(this.getRadians(this.angle));
    this.ybottomLeftPt = this.ymidLeftPt + this.height/2*Math.cos(this.getRadians(this.angle));
    this.xtopLeftPt = this.xmidLeftPt - this.height/2*Math.sin(this.getRadians(this.angle));
    this.ytopLeftPt = this.ymidLeftPt - this.height/2*Math.cos(this.getRadians(this.angle));
    this.xmidRightPt = this.pos[0] + this.width/2*Math.cos(this.getRadians(this.angle));
    this.ymidRightPt = this.pos[1] - this.width/2*Math.sin(this.getRadians(this.angle));
    this.xbottomRightPt = this.xmidRightPt + this.height/2*Math.sin(this.getRadians(this.angle));
    this.ybottomRightPt = this.ymidRightPt + this.height/2*Math.cos(this.getRadians(this.angle));
    this.xtopRightPt = this.xmidRightPt - this.height/2*Math.sin(this.getRadians(this.angle));
    this.ytopRightPt = this.ymidRightPt - this.height/2*Math.cos(this.getRadians(this.angle));
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-this.getRadians());
    ctx.translate(-this.pos[0], -this.pos[1]);
    ctx.fillRect(this.pos[0] - this.width/2, this.pos[1] - this.height/2, this.width, this.height);
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.getRadians());
    ctx.translate(-this.pos[0], -this.pos[1]);
  }

  getRadians() {
    return this.angle * Math.PI/180
  }
}

module.exports = Obstacle;

/***/ }),

/***/ "./src/play_ball.js":
/*!**************************!*\
  !*** ./src/play_ball.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");

class PlayBall extends MovingObject {
  constructor(options) {
    super(options)
    this.determineMovement = this.determineMovement.bind(this);
    this.minClickDist = 8
  }

  determineMovement(xClick, yClick) {
    let xDiff = this.pos[0] - xClick;
    let yDiff = this.pos[1] - yClick;

    if (Math.abs(xDiff) < this.minClickDist) {
      xDiff = xDiff/Math.abs(xDiff)*this.minClickDist;
    }

    if (Math.abs(yDiff) < this.minClickDist) {
      yDiff = yDiff/Math.abs(yDiff)*this.minClickDist;
    }

    let mag = 1/(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    let unitDir = [xDiff, yDiff];
    this.vel[0] = unitDir[0] * mag * 850;
    this.vel[1] = unitDir[1] * mag * 850;
  }

  getDistance(target) {
    let xDiff = Math.abs(this.pos[0] - target.pos[0]);
    let yDiff = Math.abs(this.pos[1] - target.pos[1]);
    return Math.sqrt(xDiff*xDiff + yDiff*yDiff).toFixed(3);
  }
}

module.exports = PlayBall;

/***/ }),

/***/ "./src/spark.js":
/*!**********************!*\
  !*** ./src/spark.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");

class Spark extends MovingObject {
  constructor(options) {
    this.colorSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    this
    setInterval(this.changeColor, 500);
  }

  changeColor() {
    let colorStr = "#";

    while (colorStr.length < 6) {
      colorStr += this.colorSet[Math.floor(Math.random()*this.colorSet.length)];
    }

    this.color = colorStr;
  }
}

module.exports = Spark;

/***/ }),

/***/ "./src/target.js":
/*!***********************!*\
  !*** ./src/target.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Target {
  constructor(options) {
    this.pos = options.pos;
    this.vel = [0, 0];
    this.radius = 8;
    this.color = "#ffffff";
    this.draw = this.draw.bind(this);
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
}

module.exports = Target;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmluZ19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5X2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NwYXJrLmpzIiwid2VicGFjazovLy8uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3RDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsK0JBQVM7O0FBRS9CO0FBQ0E7QUFDQSw0QkFBNEIseURBQXlEO0FBQ3JGLDhCQUE4QixpQkFBaUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLDRCQUE0QixZQUFZO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0I7Ozs7Ozs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsaUJBQWlCLG1CQUFPLENBQUMsdUNBQWE7O0FBRXRDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCOzs7Ozs7Ozs7OztBQ25SQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ3JDQSxxQkFBcUIsbUJBQU8sQ0FBQywrQ0FBaUI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQjs7Ozs7Ozs7Ozs7QUNsQ0EscUJBQXFCLG1CQUFPLENBQUMsK0NBQWlCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCOzs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgUGxheUJhbGwgPSByZXF1aXJlKFwiLi9wbGF5X2JhbGxcIik7XHJcbmNvbnN0IFRhcmdldCA9IHJlcXVpcmUoXCIuL3RhcmdldFwiKTtcclxuY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKFwiLi9vYnN0YWNsZVwiKTtcclxuY29uc3QgU3BhcmsgPSByZXF1aXJlKFwiLi9zcGFya1wiKTtcclxuXHJcbmNsYXNzIEdhbWUge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucGIgPSBuZXcgUGxheUJhbGwoeyBwb3M6IFszMCwgMzBdLCB2ZWw6IFswLCAwXSwgcmFkaXVzOiA1LCBjb2xvcjogXCIjNTVhYWNjXCJ9KTtcclxuICAgIHRoaXMudGFyZ2V0ID0gbmV3IFRhcmdldCh7IHBvczogWzMwMCwgMzAwXX0pXHJcbiAgICB0aGlzLm9ic3RhY2xlcyA9IFtdO1xyXG4gICAgdGhpcy5zcGFya3MgPSBbXTtcclxuICAgIHRoaXMuZGlzdCA9IHRoaXMucGIuZ2V0RGlzdGFuY2UodGhpcy50YXJnZXQpO1xyXG4gICAgdGhpcy5jbGlja3MgPSAwO1xyXG5cclxuICAgIHRoaXMuYWRkT2JzdGFjbGVzKCk7XHJcbiAgfVxyXG5cclxuICBhZGRPYnN0YWNsZXMoKSB7XHJcbiAgICBjb25zdCBvYnMxID0gbmV3IE9ic3RhY2xlKFxyXG4gICAgICB7IHBvczogWzQwMCwgMzAwXSwgaGVpZ2h0OiAzMDAsIHdpZHRoOiAyMCwgYW5nbGU6IDAsIGNvbG9yOiBcIiNGNzM5QTNcIn1cclxuICAgICk7XHJcbiAgXHJcbiAgICBjb25zdCBvYnMyID0gbmV3IE9ic3RhY2xlKFxyXG4gICAgICB7IHBvczogWzIwMCwgMzAwXSwgaGVpZ2h0OiAyMCwgd2lkdGg6IDE1MCwgYW5nbGU6IDAsIGNvbG9yOiBcIiNGNzM5QTNcIn1cclxuICAgICk7XHJcbiAgXHJcbiAgICB0aGlzLm9ic3RhY2xlcy5wdXNoKG9iczEpO1xyXG4gICAgdGhpcy5vYnN0YWNsZXMucHVzaChvYnMyKTtcclxuICB9XHJcblxyXG4gIGFkZENsaWNrKCkge1xyXG4gICAgdGhpcy5jbGlja3MgKz0gMTtcclxuICB9XHJcblxyXG4gIGRyYXcoY2FudmFzRWwsIGN0eCkge1xyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNFbC53aWR0aCwgY2FudmFzRWwuaGVpZ2h0KTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIlxyXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMub2JzdGFjbGVzLmZvckVhY2gob2IgPT4ge1xyXG4gICAgICBvYi5kcmF3KGN0eCk7XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuc3BhcmtzLmZvckVhY2goc3BhcmsgPT4ge1xyXG4gICAgICBzcGFyay5kcmF3KGN0eCk7XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMudGFyZ2V0LmRyYXcoY3R4KTtcclxuICAgIHRoaXMucGIuZHJhdyhjdHgpO1xyXG4gICAgY3R4LnRleHRBbGlnbiA9IFwiZW5kXCI7XHJcbiAgICBjdHguZm9udCA9ICcxOHB4IE9yYml0cm9uJztcclxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcclxuICAgIGN0eC5maWxsVGV4dChgZGlzdDogJHt0aGlzLmRpc3R9YCwgNTg1LCAyNSk7XHJcbiAgICBjdHguZmlsbFRleHQoYGNsaWNrczogJHt0aGlzLmNsaWNrc31gLCA1ODUsIDYwKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQ29sbGlzaW9ucyhjYW52YXNFbCwgY3R4KSB7XHJcbiAgICBsZXQgbmV3U3BhcmtzO1xyXG4gICAgdGhpcy5wYi5oaXRCb3VuZGFyeShjYW52YXNFbCk7XHJcblxyXG4gICAgdGhpcy5vYnN0YWNsZXMuZm9yRWFjaChvYiA9PiB7XHJcbiAgICAgIC8vIHRoaXMuc3BhcmtzLnB1c2goLi4udGhpcy5wYi5jaGVja0NvbGxpc2lvbnMob2IpKTtcclxuICAgICAgdGhpcy5wYi5jaGVja0NvbGxpc2lvbnMob2IpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNhbGNEaXN0KCkge1xyXG4gICAgdGhpcy5kaXN0ID0gdGhpcy5wYi5nZXREaXN0YW5jZSh0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY2xhc3MgR2FtZVZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCwgY2FudmFzRWwpIHtcclxuICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuY2FudmFzRWwgPSBjYW52YXNFbDtcclxuICAgIHRoaXMuZG9TdHVmZiA9IHRoaXMuZG9TdHVmZi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5kb1N0dWZmKCk7XHJcbiAgfVxyXG5cclxuICBlbmQoKSB7XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgZGlzdGFuY2U6IHRoaXMuZ2FtZS5kaXN0YW5jZSxcclxuICAgICAgY2xpY2tzOiB0aGlzLmdhbWUuY2xpY2tzXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2xpY2soZSkge1xyXG4gICAgdGhpcy5nYW1lLmFkZENsaWNrKCk7XHJcbiAgICBsZXQgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgdGhpcy5nYW1lLnBiLmRldGVybWluZU1vdmVtZW50KGUuY2xpZW50WCAtIHJlY3QubGVmdCwgZS5jbGllbnRZIC0gcmVjdC50b3ApO1xyXG4gICAgdGhpcy5jYW52YXNFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgZG9TdHVmZigpIHtcclxuICAgIHRoaXMuZ2FtZS5jaGVja0NvbGxpc2lvbnModGhpcy5jYW52YXNFbCwgdGhpcy5jdHgpO1xyXG4gICAgdGhpcy5nYW1lLmNhbGNEaXN0KCk7XHJcbiAgICB0aGlzLmdhbWUuZHJhdyh0aGlzLmNhbnZhc0VsLCB0aGlzLmN0eCk7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLmdhbWUucGIubW92ZSgpKSB7XHJcbiAgICAgIHRoaXMuY2FudmFzRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZG9TdHVmZik7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVWaWV3OyIsIi8vIGNvbnN0IFBsYXlCYWxsID0gcmVxdWlyZShcIi4vcGxheV9iYWxsXCIpO1xyXG4vLyBjb25zdCBUYXJnZXQgPSByZXF1aXJlKFwiLi90YXJnZXRcIik7XHJcbi8vIGNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZShcIi4vb2JzdGFjbGVcIik7XHJcbmNvbnN0IEdhbWUgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xyXG5jb25zdCBHYW1lVmlldyA9IHJlcXVpcmUoXCIuL2dhbWVfdmlld1wiKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuXHJcbiAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWJ1dHRvblwiKTtcclxuICBjb25zdCBhYm91dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWJvdXQtYnV0dG9uXCIpO1xyXG4gIGNvbnN0IGhpZ2hTY29yZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2gtc2NvcmUtYnV0dG9uXCIpO1xyXG4gIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydEdhbWUpO1xyXG4gIGFib3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93QWJvdXQpO1xyXG4gIGhpZ2hTY29yZXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dIaWdoU2NvcmVzKTtcclxufSlcclxuXHJcbmNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICBjb25zdCBjYW52YXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FudmFzXCIpWzBdXHJcbiAgY29uc3QgZW5kR2FtZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW5kLWdhbWUtYnV0dG9uXCIpO1xyXG4gIGNvbnN0IHN0YXJ0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtbWVudVwiKTtcclxuICBlbmRHYW1lQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xyXG4gIHN0YXJ0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgY2FudmFzRWwuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgY2FudmFzRWwuaGVpZ2h0ID0gNjAwO1xyXG4gIGNhbnZhc0VsLndpZHRoID0gNjAwO1xyXG4gIGNvbnN0IGN0eCA9IGNhbnZhc0VsLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbiAgbGV0IGdhbWVWaWV3ID0gbmV3IEdhbWVWaWV3KGdhbWUsIGN0eCwgY2FudmFzRWwpO1xyXG4gIGdhbWVWaWV3LnN0YXJ0KCk7XHJcbiAgZW5kR2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZW5kR2FtZShnYW1lVmlldykpO1xyXG59XHJcblxyXG5jb25zdCBlbmRHYW1lID0gKCkgPT4ge1xyXG4gIHJldHVybiAoZ2FtZVZpZXcpID0+IHtcclxuICAgIGNvbnN0IGNhbnZhc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjYW52YXNcIilbMF1cclxuICAgIGNvbnN0IGVuZEdhbWVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVuZC1nYW1lLWJ1dHRvblwiKTtcclxuICAgIGNvbnN0IHN0YXJ0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtbWVudVwiKTtcclxuICAgIGVuZEdhbWVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgc3RhcnRNZW51LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIGNhbnZhc0VsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGxldCBbY2xpY2tzLCBzY29yZV0gPSBnYW1lVmlldy5lbmQoKTtcclxuICAgIGdhbWVWaWV3ID0ge307XHJcbiAgICBlbmRHYW1lQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlbmRHYW1lKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHNob3dBYm91dCA9ICgpID0+IHtcclxuICBjb25zdCBzdGFydE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LW1lbnVcIilcclxuICBjb25zdCBhYm91dE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0LW1lbnVcIik7XHJcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWJ1dHRvblwiKTtcclxuICBzdGFydE1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIGFib3V0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVBYm91dCk7XHJcbn1cclxuXHJcbmNvbnN0IGhpZGVBYm91dCA9ICgpID0+IHtcclxuICBjb25zdCBhYm91dE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0LW1lbnVcIik7XHJcbiAgY29uc3Qgc3RhcnRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1tZW51XCIpO1xyXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1idXR0b25cIik7XHJcbiAgYWJvdXRNZW51LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICBzdGFydE1lbnUuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gIGNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlQWJvdXQpO1xyXG59XHJcblxyXG5jb25zdCBzaG93SGlnaFNjb3JlcyA9ICgpID0+IHtcclxuICBjb25zdCBhYm91dE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0LW1lbnVcIik7XHJcbiAgY29uc3QgaGlnaFNjb3JlTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaC1zY29yZS1tZW51XCIpO1xyXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1ocy1idXR0b25cIik7XHJcbiAgYWJvdXRNZW51LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICBoaWdoU2NvcmVNZW51LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZUhpZ2hTY29yZXMpO1xyXG59XHJcblxyXG5jb25zdCBoaWRlSGlnaFNjb3JlcyA9ICgpID0+IHtcclxuICBjb25zdCBhYm91dE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0LW1lbnVcIik7XHJcbiAgY29uc3QgaGlnaFNjb3JlTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaC1zY29yZS1tZW51XCIpO1xyXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1ocy1idXR0b25cIik7XHJcbiAgaGlnaFNjb3JlTWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgYWJvdXRNZW51LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICBjbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZUhpZ2hTY29yZXMpO1xyXG59IiwiY2xhc3MgTW92aW5nT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy52ZWwgPSBvcHRpb25zLnZlbDtcclxuICAgIHRoaXMucmFkaXVzID0gb3B0aW9ucy5yYWRpdXM7XHJcbiAgICB0aGlzLmNvbG9yID0gb3B0aW9ucy5jb2xvcjtcclxuICAgIHRoaXMubW92ZSA9IHRoaXMubW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5kcmF3ID0gdGhpcy5kcmF3LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnByZXZQb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMuZnJpY3Rpb24gPSAuOTggLy8wLjkgd2FzIHRoZSBmaXJzdCB2YWx1ZVxyXG4gIH1cclxuXHJcbiAgZHJhdyhjdHgpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYyhcclxuICAgICAgdGhpcy5wb3NbMF0sXHJcbiAgICAgIHRoaXMucG9zWzFdLFxyXG4gICAgICB0aGlzLnJhZGl1cyxcclxuICAgICAgMCxcclxuICAgICAgMiAqIE1hdGguUEksXHJcbiAgICAgIGZhbHNlXHJcbiAgICApO1xyXG5cclxuICAgIGN0eC5maWxsKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgdGhpcy5wcmV2UG9zID0gdGhpcy5wb3M7XHJcbiAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIHRoaXMudmVsWzBdLCB0aGlzLnBvc1sxXSArIHRoaXMudmVsWzFdXTtcclxuICAgIHRoaXMudmVsID0gW3RoaXMudmVsWzBdKnRoaXMuZnJpY3Rpb24sIHRoaXMudmVsWzFdKnRoaXMuZnJpY3Rpb25dO1xyXG4gICAgaWYgKE1hdGguc3FydChNYXRoLnBvdyh0aGlzLnZlbFswXSwgMikgKyBNYXRoLnBvdyh0aGlzLnZlbFsxXSwgMikpIDwgLjEpIHtcclxuICAgICAgdGhpcy52ZWxbMF0gPSAwO1xyXG4gICAgICB0aGlzLnZlbFsxXSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudmVsWzBdID09PSAwICYmIHRoaXMudmVsWzFdID09PSAwO1xyXG4gIH1cclxuXHJcbiAgaGl0Qm91bmRhcnkoY2FudmFzRWwpIHtcclxuICAgIGlmICh0aGlzLnBvc1swXSArIHRoaXMudmVsWzBdID4gY2FudmFzRWwud2lkdGggfHwgdGhpcy5wb3NbMF0gKyB0aGlzLnZlbFswXSA8IDApIHtcclxuICAgICAgdGhpcy5tYWtlQm91bmNlU291bmQoKTtcclxuICAgICAgdGhpcy52ZWxbMF0gPSAtdGhpcy52ZWxbMF07XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBvc1sxXSArIHRoaXMudmVsWzFdID4gY2FudmFzRWwuaGVpZ2h0IHx8IHRoaXMucG9zWzFdICsgdGhpcy52ZWxbMV0gPCAwKSB7XHJcbiAgICAgIHRoaXMubWFrZUJvdW5jZVNvdW5kKCk7XHJcbiAgICAgIHRoaXMudmVsWzFdID0gLXRoaXMudmVsWzFdO1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25MZWZ0KG9iKSB7XHJcblxyXG4gICAgbGV0IHNsb3BlID0gdGhpcy52ZWxbMV0vdGhpcy52ZWxbMF07XHJcblxyXG4gICAgaWYgKG9iLmFuZ2xlID09PSAwKSB7XHJcbiAgICAgIGxldCB3YWxsRGltID0gb2IucG9zWzBdIC0gb2Iud2lkdGgvMjtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzFdICsgc2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1swXSk7XHJcbiAgICAgIGxldCB5TG93ZXJCb3VuZCA9IG9iLnBvc1sxXSAtIG9iLmhlaWdodC8yO1xyXG4gICAgICBsZXQgeVVwcGVyQm91bmQgPSBvYi5wb3NbMV0gKyBvYi5oZWlnaHQvMjtcclxuICAgICAgaWYgKHRoaXMucHJldlBvc1swXSA8IHdhbGxEaW0pIHtcclxuICAgICAgICBpZiAodGhpcy5wb3NbMF0gPiB3YWxsRGltKSB7XHJcbiAgICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHlMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeVVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NbMF0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgICB0aGlzLnBvc1sxXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgICB0aGlzLnZlbFswXSA9IC10aGlzLnZlbFswXVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCB3YWxsU2xvcGUgPSAob2IueXRvcExlZnRQdCAtIG9iLnlib3R0b21MZWZ0UHQpIC8gKG9iLnh0b3BMZWZ0UHQgLSBvYi54Ym90dG9tTGVmdFB0KTtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblggPSAoKHNsb3BlKnRoaXMucG9zWzBdIC0gdGhpcy5wb3NbMV0pIC0gKHdhbGxTbG9wZSpvYi54Ym90dG9tTGVmdFB0IC0gb2IueWJvdHRvbUxlZnRQdCkpLyhzbG9wZSAtIHdhbGxTbG9wZSk7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25ZID0gc2xvcGUqaW50ZXJzZWN0aW9uWCAtIChzbG9wZSp0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKTtcclxuICAgICAgbGV0IHhQcmV2RGlmZiA9IHRoaXMucHJldlBvc1swXSAtIGludGVyc2VjdGlvblg7XHJcbiAgICAgIGxldCB4Q3VyckRpZmYgPSB0aGlzLnBvc1swXSAtIGludGVyc2VjdGlvblg7XHJcbiAgICAgIGxldCB5UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMV0gLSBpbnRlcnNlY3Rpb25ZO1xyXG4gICAgICBsZXQgeUN1cnJEaWZmID0gdGhpcy5wb3NbMV0gLSBpbnRlcnNlY3Rpb25ZO1xyXG5cclxuICAgICAgLy8gaWYgKGludGVyc2VjdGlvblkgPiBvYi55dG9wTGVmdFB0ICYmIGludGVyc2VjdGlvblkgPCBvYi55Ym90dG9tTGVmdFB0ICYmIHhQcmV2RGlmZip4Q3VyckRpZmYgPD0gMCAmJiB5UHJldkRpZmYqeUN1cnJEaWZmIDw9IDApIHtcclxuICAgICAgaWYgKGludGVyc2VjdGlvblkgPiBvYi55dG9wTGVmdFB0ICYmIGludGVyc2VjdGlvblkgPCBvYi55Ym90dG9tTGVmdFB0ICYmIHhQcmV2RGlmZip4Q3VyckRpZmYgPD0gMCAmJiB5UHJldkRpZmYqeUN1cnJEaWZmIDw9IDApIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICBsZXQgeEFuZ2xlID0gMTgwIC0gMipvYi5hbmdsZTtcclxuICAgICAgICBsZXQgeENvbXAxID0gdGhpcy52ZWxbMF0gKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnMoeEFuZ2xlKSk7XHJcbiAgICAgICAgbGV0IHhDb21wMiA9IHRoaXMudmVsWzBdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xyXG5cclxuICAgICAgICBsZXQgeUFuZ2xlID0gOTAgLSAyKm9iLmFuZ2xlO1xyXG4gICAgICAgIGxldCB5Q29tcDEgPSB0aGlzLnZlbFsxXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcclxuICAgICAgICBsZXQgeUNvbXAyID0gdGhpcy52ZWxbMV0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XHJcblxyXG4gICAgICAgIHRoaXMudmVsWzBdID0geENvbXAxICsgeUNvbXAxO1xyXG4gICAgICAgIHRoaXMudmVsWzFdID0geENvbXAyICsgeUNvbXAyO1xyXG4gICAgICAgIHRoaXMucG9zWzBdID0gaW50ZXJzZWN0aW9uWCArIHRoaXMudmVsWzBdKjAuMDE7XHJcbiAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25ZICsgdGhpcy52ZWxbMV0qMC4wMTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICBcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25SaWdodChvYikge1xyXG5cclxuICAgIGxldCBzbG9wZSA9IHRoaXMudmVsWzFdL3RoaXMudmVsWzBdO1xyXG5cclxuICAgIGlmIChvYi5hbmdsZSA9PT0gMCkge1xyXG4gICAgICBsZXQgd2FsbERpbSA9IG9iLnBvc1swXSArIG9iLndpZHRoLzI7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IHRoaXMucHJldlBvc1sxXSArIHNsb3BlICogKHdhbGxEaW0gLSB0aGlzLnByZXZQb3NbMF0pO1xyXG4gICAgICBsZXQgeUxvd2VyQm91bmQgPSBvYi5wb3NbMV0gLSBvYi5oZWlnaHQvMjtcclxuICAgICAgbGV0IHlVcHBlckJvdW5kID0gb2IucG9zWzFdICsgb2IuaGVpZ2h0LzI7XHJcbiAgICAgIGlmICh0aGlzLnByZXZQb3NbMF0gPiB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9zWzBdIDwgd2FsbERpbSkge1xyXG4gICAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB5TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHlVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zWzBdID0gd2FsbERpbTtcclxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25QVDtcclxuICAgICAgICAgICAgdGhpcy52ZWxbMF0gPSAtdGhpcy52ZWxbMF1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCB3YWxsU2xvcGUgPSAob2IueXRvcFJpZ2h0UHQgLSBvYi55Ym90dG9tUmlnaHRQdCkgLyAob2IueHRvcFJpZ2h0UHQgLSBvYi54Ym90dG9tUmlnaHRQdCk7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25YID0gKChzbG9wZSp0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKSAtICh3YWxsU2xvcGUqb2IueGJvdHRvbVJpZ2h0UHQgLSBvYi55Ym90dG9tUmlnaHRQdCkpLyhzbG9wZSAtIHdhbGxTbG9wZSk7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25ZID0gc2xvcGUqaW50ZXJzZWN0aW9uWCAtIChzbG9wZSp0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKTtcclxuICAgICAgbGV0IHhQcmV2RGlmZiA9IHRoaXMucHJldlBvc1swXSAtIGludGVyc2VjdGlvblg7XHJcbiAgICAgIGxldCB4Q3VyckRpZmYgPSB0aGlzLnBvc1swXSAtIGludGVyc2VjdGlvblg7XHJcblxyXG5cclxuICAgICAgLy8gaWYgKGludGVyc2VjdGlvblkgPiBvYi55dG9wUmlnaHRQdCAmJiBpbnRlcnNlY3Rpb25ZIDwgb2IueWJvdHRvbVJpZ2h0UHQgJiYgdGhpcy5wcmV2UG9zWzBdID4gaW50ZXJzZWN0aW9uWCAmJiB0aGlzLnBvc1swXSA8IGludGVyc2VjdGlvblgpIHtcclxuICAgICAgaWYgKGludGVyc2VjdGlvblkgPiBvYi55dG9wUmlnaHRQdCAmJiBpbnRlcnNlY3Rpb25ZIDwgb2IueWJvdHRvbVJpZ2h0UHQgJiYgeFByZXZEaWZmKnhDdXJyRGlmZiA8PSAwKSB7XHJcbiAgICAgICAgbGV0IHlQcmV2RGlmZiA9IHRoaXMucHJldlBvc1sxXSAtIGludGVyc2VjdGlvblk7XHJcbiAgICAgICAgbGV0IHlDdXJyRGlmZiA9IHRoaXMucG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcclxuICAgICAgICBpZih5UHJldkRpZmYqeUN1cnJEaWZmIDw9IDApIHtcclxuICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgbGV0IHhBbmdsZSA9IDE4MCAtIDIqb2IuYW5nbGU7XHJcbiAgICAgICAgICBsZXQgeENvbXAxID0gdGhpcy52ZWxbMF0gKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnMoeEFuZ2xlKSk7XHJcbiAgICAgICAgICBsZXQgeENvbXAyID0gdGhpcy52ZWxbMF0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeEFuZ2xlKSk7XHJcblxyXG4gICAgICAgICAgbGV0IHlBbmdsZSA9IDkwIC0gMipvYi5hbmdsZTtcclxuICAgICAgICAgIGxldCB5Q29tcDEgPSB0aGlzLnZlbFsxXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcclxuICAgICAgICAgIGxldCB5Q29tcDIgPSB0aGlzLnZlbFsxXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcclxuXHJcbiAgICAgICAgICB0aGlzLnZlbFswXSA9IHhDb21wMSArIHlDb21wMTtcclxuICAgICAgICAgIHRoaXMudmVsWzFdID0geENvbXAyICsgeUNvbXAyO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25YICsgdGhpcy52ZWxbMF0qMC4wMTtcclxuICAgICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uWSArIHRoaXMudmVsWzFdKjAuMDE7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uVG9wKG9iKSB7XHJcblxyXG4gICAgaWYgKG9iLmFuZ2xlID09PSAwKSB7XHJcbiAgICAgIGxldCBpbnZTbG9wZSA9IHRoaXMudmVsWzBdL3RoaXMudmVsWzFdO1xyXG4gICAgICBsZXQgd2FsbERpbSA9IG9iLnBvc1sxXSAtIG9iLmhlaWdodC8yO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSB0aGlzLnByZXZQb3NbMF0gKyBpbnZTbG9wZSAqICh3YWxsRGltIC0gdGhpcy5wcmV2UG9zWzFdKTtcclxuICAgICAgbGV0IHhMb3dlckJvdW5kID0gb2IucG9zWzBdIC0gb2Iud2lkdGgvMjtcclxuICAgICAgbGV0IHhVcHBlckJvdW5kID0gb2IucG9zWzBdICsgb2Iud2lkdGgvMjtcclxuICAgICAgaWYgKHRoaXMucHJldlBvc1sxXSA8IHdhbGxEaW0pIHtcclxuICAgICAgICBpZiAodGhpcy5wb3NbMV0gPiB3YWxsRGltKSB7XHJcbiAgICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHhMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeFVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25QVDtcclxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgICB0aGlzLnZlbFsxXSA9IC10aGlzLnZlbFsxXVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHNsb3BlID0gdGhpcy52ZWxbMV0vdGhpcy52ZWxbMF1cclxuICAgICAgbGV0IHdhbGxTbG9wZSA9IChvYi55dG9wUmlnaHRQdCAtIG9iLnl0b3BMZWZ0UHQpIC8gKG9iLnh0b3BSaWdodFB0IC0gb2IueHRvcExlZnRQdCk7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25YID0gKChzbG9wZSp0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKSAtICh3YWxsU2xvcGUqb2IueHRvcExlZnRQdCAtIG9iLnl0b3BMZWZ0UHQpKS8oc2xvcGUgLSB3YWxsU2xvcGUpO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWSA9IHNsb3BlKmludGVyc2VjdGlvblggLSAoc2xvcGUqdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSk7XHJcbiAgICAgIGxldCB4UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xyXG4gICAgICBsZXQgeEN1cnJEaWZmID0gdGhpcy5wb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xyXG5cclxuICAgICAgaWYgKGludGVyc2VjdGlvblkgPiBvYi55dG9wUmlnaHRQdCAmJiBpbnRlcnNlY3Rpb25ZIDwgb2IueXRvcExlZnRQdCAmJiB4UHJldkRpZmYqeEN1cnJEaWZmIDw9IDApIHtcclxuICAgICAgICBsZXQgeVByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcclxuICAgICAgICBsZXQgeUN1cnJEaWZmID0gdGhpcy5wb3NbMV0gLSBpbnRlcnNlY3Rpb25ZO1xyXG4gICAgICAgIGlmKHlQcmV2RGlmZip5Q3VyckRpZmYgPD0gMCkge1xyXG4gICAgICAgICAgbGV0IHhBbmdsZSA9IC0yKm9iLmFuZ2xlO1xyXG4gICAgICAgICAgbGV0IHhDb21wMSA9IHRoaXMudmVsWzBdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xyXG4gICAgICAgICAgbGV0IHhDb21wMiA9IHRoaXMudmVsWzBdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xyXG5cclxuICAgICAgICAgIGxldCB5QW5nbGUgPSAyNzAgLSAyKm9iLmFuZ2xlO1xyXG4gICAgICAgICAgbGV0IHlDb21wMSA9IHRoaXMudmVsWzFdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xyXG4gICAgICAgICAgbGV0IHlDb21wMiA9IHRoaXMudmVsWzFdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xyXG5cclxuICAgICAgICAgIHRoaXMudmVsWzBdID0geENvbXAxICsgeUNvbXAxO1xyXG4gICAgICAgICAgdGhpcy52ZWxbMV0gPSB4Q29tcDIgKyB5Q29tcDI7XHJcbiAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblggKyB0aGlzLnZlbFswXSowLjAxO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25ZICsgdGhpcy52ZWxbMV0qMC4wMTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25Cb3Qob2IpIHtcclxuXHJcbiAgICBpZiAob2IuYW5nbGUgPT09IDApIHtcclxuICAgICAgbGV0IGludlNsb3BlID0gdGhpcy52ZWxbMF0vdGhpcy52ZWxbMV07XHJcbiAgICAgIGxldCB3YWxsRGltID0gb2IucG9zWzFdICsgb2IuaGVpZ2h0LzI7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IHRoaXMucHJldlBvc1swXSArIGludlNsb3BlICogKHdhbGxEaW0gLSB0aGlzLnByZXZQb3NbMV0pO1xyXG4gICAgICBsZXQgeExvd2VyQm91bmQgPSBvYi5wb3NbMF0gLSBvYi53aWR0aC8yO1xyXG4gICAgICBsZXQgeFVwcGVyQm91bmQgPSBvYi5wb3NbMF0gKyBvYi53aWR0aC8yO1xyXG4gICAgICBpZiAodGhpcy5wcmV2UG9zWzFdID4gd2FsbERpbSkge1xyXG4gICAgICAgIGlmICh0aGlzLnBvc1sxXSA8IHdhbGxEaW0pIHtcclxuICAgICAgICAgIGlmKGludGVyc2VjdGlvblBUID4geExvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB4VXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgICB0aGlzLnBvc1sxXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICAgIHRoaXMudmVsWzFdID0gLXRoaXMudmVsWzFdXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgc2xvcGUgPSB0aGlzLnZlbFsxXS90aGlzLnZlbFswXVxyXG4gICAgICBsZXQgd2FsbFNsb3BlID0gKG9iLnlib3R0b21SaWdodFB0IC0gb2IueWJvdHRvbUxlZnRQdCkgLyAob2IueGJvdHRvbVJpZ2h0UHQgLSBvYi54Ym90dG9tTGVmdFB0KTtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblggPSAoKHNsb3BlKnRoaXMucG9zWzBdIC0gdGhpcy5wb3NbMV0pIC0gKHdhbGxTbG9wZSpvYi54Ym90dG9tTGVmdFB0IC0gb2IueWJvdHRvbUxlZnRQdCkpLyhzbG9wZSAtIHdhbGxTbG9wZSk7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25ZID0gc2xvcGUqaW50ZXJzZWN0aW9uWCAtIChzbG9wZSp0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKTtcclxuICAgICAgbGV0IHhQcmV2RGlmZiA9IHRoaXMucHJldlBvc1swXSAtIGludGVyc2VjdGlvblg7XHJcbiAgICAgIGxldCB4Q3VyckRpZmYgPSB0aGlzLnBvc1swXSAtIGludGVyc2VjdGlvblg7XHJcblxyXG4gICAgICBpZiAoaW50ZXJzZWN0aW9uWSA+IG9iLnlib3R0b21SaWdodFB0ICYmIGludGVyc2VjdGlvblkgPCBvYi55Ym90dG9tTGVmdFB0ICYmIHhQcmV2RGlmZip4Q3VyckRpZmYgPD0gMCkge1xyXG4gICAgICAgIGxldCB5UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMV0gLSBpbnRlcnNlY3Rpb25ZO1xyXG4gICAgICAgIGxldCB5Q3VyckRpZmYgPSB0aGlzLnBvc1sxXSAtIGludGVyc2VjdGlvblk7XHJcbiAgICAgICAgaWYoeVByZXZEaWZmKnlDdXJyRGlmZiA8PSAwKSB7XHJcbiAgICAgICAgICBsZXQgeEFuZ2xlID0gLTIqb2IuYW5nbGU7XHJcbiAgICAgICAgICBsZXQgeENvbXAxID0gdGhpcy52ZWxbMF0gKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnMoeEFuZ2xlKSk7XHJcbiAgICAgICAgICBsZXQgeENvbXAyID0gdGhpcy52ZWxbMF0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeEFuZ2xlKSk7XHJcblxyXG4gICAgICAgICAgbGV0IHlBbmdsZSA9IDI3MCAtIDIqb2IuYW5nbGU7XHJcbiAgICAgICAgICBsZXQgeUNvbXAxID0gdGhpcy52ZWxbMV0gKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XHJcbiAgICAgICAgICBsZXQgeUNvbXAyID0gdGhpcy52ZWxbMV0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XHJcblxyXG4gICAgICAgICAgdGhpcy52ZWxbMF0gPSB4Q29tcDEgKyB5Q29tcDE7XHJcbiAgICAgICAgICB0aGlzLnZlbFsxXSA9IHhDb21wMiArIHlDb21wMjtcclxuICAgICAgICAgIHRoaXMucG9zWzBdID0gaW50ZXJzZWN0aW9uWCArIHRoaXMudmVsWzBdKjAuMDE7XHJcbiAgICAgICAgICB0aGlzLnBvc1sxXSA9IGludGVyc2VjdGlvblkgKyB0aGlzLnZlbFsxXSowLjAxO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrQ29sbGlzaW9ucyhvYnN0YWNsZSkge1xyXG4gICAgaWYgKHRoaXMuY29sbGlzaW9uTGVmdChvYnN0YWNsZSkgfHwgdGhpcy5jb2xsaXNpb25SaWdodChvYnN0YWNsZSkgfHwgdGhpcy5jb2xsaXNpb25Ub3Aob2JzdGFjbGUpIHx8IHRoaXMuY29sbGlzaW9uQm90KG9ic3RhY2xlKSkge1xyXG4gICAgICB0aGlzLm1ha2VCb3VuY2VTb3VuZCgpO1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBtYWtlQm91bmNlU291bmQoKSB7XHJcbiAgICBsZXQgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1ZGlvLXBsYXllclwiKVxyXG4gICAgYXVkaW8uc3JjID0gXCIuL2Fzc2V0cy9zb3VuZC9ib3VuY2Uud2F2XCI7XHJcbiAgICBhdWRpby5wbGF5KCk7XHJcbiAgfVxyXG5cclxuICBnZXRSYWRpYW5zKGFuZ2xlKSB7XHJcbiAgICByZXR1cm4gYW5nbGUgKiBNYXRoLlBJLzE4MFxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb3ZpbmdPYmplY3Q7IiwiY2xhc3MgT2JzdGFjbGUge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xyXG4gICAgdGhpcy53aWR0aCA9IG9wdGlvbnMud2lkdGg7XHJcbiAgICB0aGlzLmFuZ2xlID0gb3B0aW9ucy5hbmdsZTtcclxuICAgIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yO1xyXG4gICAgdGhpcy54bWlkTGVmdFB0ID0gdGhpcy5wb3NbMF0gLSB0aGlzLndpZHRoLzIqTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueW1pZExlZnRQdCA9IHRoaXMucG9zWzFdICsgdGhpcy53aWR0aC8yKk1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnhib3R0b21MZWZ0UHQgPSB0aGlzLnhtaWRMZWZ0UHQgKyB0aGlzLmhlaWdodC8yKk1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnlib3R0b21MZWZ0UHQgPSB0aGlzLnltaWRMZWZ0UHQgKyB0aGlzLmhlaWdodC8yKk1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnh0b3BMZWZ0UHQgPSB0aGlzLnhtaWRMZWZ0UHQgLSB0aGlzLmhlaWdodC8yKk1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnl0b3BMZWZ0UHQgPSB0aGlzLnltaWRMZWZ0UHQgLSB0aGlzLmhlaWdodC8yKk1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnhtaWRSaWdodFB0ID0gdGhpcy5wb3NbMF0gKyB0aGlzLndpZHRoLzIqTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueW1pZFJpZ2h0UHQgPSB0aGlzLnBvc1sxXSAtIHRoaXMud2lkdGgvMipNYXRoLnNpbih0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy54Ym90dG9tUmlnaHRQdCA9IHRoaXMueG1pZFJpZ2h0UHQgKyB0aGlzLmhlaWdodC8yKk1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnlib3R0b21SaWdodFB0ID0gdGhpcy55bWlkUmlnaHRQdCArIHRoaXMuaGVpZ2h0LzIqTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueHRvcFJpZ2h0UHQgPSB0aGlzLnhtaWRSaWdodFB0IC0gdGhpcy5oZWlnaHQvMipNYXRoLnNpbih0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy55dG9wUmlnaHRQdCA9IHRoaXMueW1pZFJpZ2h0UHQgLSB0aGlzLmhlaWdodC8yKk1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgfVxyXG5cclxuICBkcmF3KGN0eCkge1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcbiAgICBjdHgucm90YXRlKC10aGlzLmdldFJhZGlhbnMoKSk7XHJcbiAgICBjdHgudHJhbnNsYXRlKC10aGlzLnBvc1swXSwgLXRoaXMucG9zWzFdKTtcclxuICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc1swXSAtIHRoaXMud2lkdGgvMiwgdGhpcy5wb3NbMV0gLSB0aGlzLmhlaWdodC8yLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcbiAgICBjdHgucm90YXRlKHRoaXMuZ2V0UmFkaWFucygpKTtcclxuICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zWzBdLCAtdGhpcy5wb3NbMV0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmFkaWFucygpIHtcclxuICAgIHJldHVybiB0aGlzLmFuZ2xlICogTWF0aC5QSS8xODBcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JzdGFjbGU7IiwiY29uc3QgTW92aW5nT2JqZWN0ID0gcmVxdWlyZSgnLi9tb3Zpbmdfb2JqZWN0Jyk7XHJcblxyXG5jbGFzcyBQbGF5QmFsbCBleHRlbmRzIE1vdmluZ09iamVjdCB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucylcclxuICAgIHRoaXMuZGV0ZXJtaW5lTW92ZW1lbnQgPSB0aGlzLmRldGVybWluZU1vdmVtZW50LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm1pbkNsaWNrRGlzdCA9IDhcclxuICB9XHJcblxyXG4gIGRldGVybWluZU1vdmVtZW50KHhDbGljaywgeUNsaWNrKSB7XHJcbiAgICBsZXQgeERpZmYgPSB0aGlzLnBvc1swXSAtIHhDbGljaztcclxuICAgIGxldCB5RGlmZiA9IHRoaXMucG9zWzFdIC0geUNsaWNrO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyh4RGlmZikgPCB0aGlzLm1pbkNsaWNrRGlzdCkge1xyXG4gICAgICB4RGlmZiA9IHhEaWZmL01hdGguYWJzKHhEaWZmKSp0aGlzLm1pbkNsaWNrRGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTWF0aC5hYnMoeURpZmYpIDwgdGhpcy5taW5DbGlja0Rpc3QpIHtcclxuICAgICAgeURpZmYgPSB5RGlmZi9NYXRoLmFicyh5RGlmZikqdGhpcy5taW5DbGlja0Rpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1hZyA9IDEvKE1hdGgucG93KHhEaWZmLCAyKSArIE1hdGgucG93KHlEaWZmLCAyKSk7XHJcbiAgICBsZXQgdW5pdERpciA9IFt4RGlmZiwgeURpZmZdO1xyXG4gICAgdGhpcy52ZWxbMF0gPSB1bml0RGlyWzBdICogbWFnICogODUwO1xyXG4gICAgdGhpcy52ZWxbMV0gPSB1bml0RGlyWzFdICogbWFnICogODUwO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGlzdGFuY2UodGFyZ2V0KSB7XHJcbiAgICBsZXQgeERpZmYgPSBNYXRoLmFicyh0aGlzLnBvc1swXSAtIHRhcmdldC5wb3NbMF0pO1xyXG4gICAgbGV0IHlEaWZmID0gTWF0aC5hYnModGhpcy5wb3NbMV0gLSB0YXJnZXQucG9zWzFdKTtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoeERpZmYqeERpZmYgKyB5RGlmZip5RGlmZikudG9GaXhlZCgzKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheUJhbGw7IiwiY29uc3QgTW92aW5nT2JqZWN0ID0gcmVxdWlyZShcIi4vbW92aW5nX29iamVjdFwiKTtcclxuXHJcbmNsYXNzIFNwYXJrIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIFwiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCJdO1xyXG4gICAgdGhpc1xyXG4gICAgc2V0SW50ZXJ2YWwodGhpcy5jaGFuZ2VDb2xvciwgNTAwKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUNvbG9yKCkge1xyXG4gICAgbGV0IGNvbG9yU3RyID0gXCIjXCI7XHJcblxyXG4gICAgd2hpbGUgKGNvbG9yU3RyLmxlbmd0aCA8IDYpIHtcclxuICAgICAgY29sb3JTdHIgKz0gdGhpcy5jb2xvclNldFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5jb2xvclNldC5sZW5ndGgpXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3JTdHI7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNwYXJrOyIsImNsYXNzIFRhcmdldCB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMudmVsID0gWzAsIDBdO1xyXG4gICAgdGhpcy5yYWRpdXMgPSA4O1xyXG4gICAgdGhpcy5jb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgdGhpcy5kcmF3ID0gdGhpcy5kcmF3LmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBkcmF3KGN0eCkge1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKFxyXG4gICAgICB0aGlzLnBvc1swXSxcclxuICAgICAgdGhpcy5wb3NbMV0sXHJcbiAgICAgIHRoaXMucmFkaXVzLFxyXG4gICAgICAwLFxyXG4gICAgICAyICogTWF0aC5QSSxcclxuICAgICAgZmFsc2VcclxuICAgICk7XHJcblxyXG4gICAgY3R4LmZpbGwoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0OyJdLCJzb3VyY2VSb290IjoiIn0=