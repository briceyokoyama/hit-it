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
    this.score = Infinity;

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
    ctx.fillText(`score: ${this.score}`, 585, 25);
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
    this.score = this.clicks ? (this.dist * this.clicks).toFixed(3) : Infinity;
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
  endGameButton.style.position = "relative";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmluZ19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5X2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NwYXJrLmpzIiwid2VicGFjazovLy8uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3RDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsK0JBQVM7O0FBRS9CO0FBQ0E7QUFDQSw0QkFBNEIseURBQXlEO0FBQ3JGLDhCQUE4QixpQkFBaUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFdBQVc7QUFDdEMsNEJBQTRCLFlBQVk7QUFDeEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCOzs7Ozs7Ozs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQjs7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLDZCQUFRO0FBQzdCLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7Ozs7O0FDblJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEI7Ozs7Ozs7Ozs7O0FDckNBLHFCQUFxQixtQkFBTyxDQUFDLCtDQUFpQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ2xDQSxxQkFBcUIsbUJBQU8sQ0FBQywrQ0FBaUI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjb25zdCBQbGF5QmFsbCA9IHJlcXVpcmUoXCIuL3BsYXlfYmFsbFwiKTtcclxuY29uc3QgVGFyZ2V0ID0gcmVxdWlyZShcIi4vdGFyZ2V0XCIpO1xyXG5jb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoXCIuL29ic3RhY2xlXCIpO1xyXG5jb25zdCBTcGFyayA9IHJlcXVpcmUoXCIuL3NwYXJrXCIpO1xyXG5cclxuY2xhc3MgR2FtZSB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wYiA9IG5ldyBQbGF5QmFsbCh7IHBvczogWzMwLCAzMF0sIHZlbDogWzAsIDBdLCByYWRpdXM6IDUsIGNvbG9yOiBcIiM1NWFhY2NcIn0pO1xyXG4gICAgdGhpcy50YXJnZXQgPSBuZXcgVGFyZ2V0KHsgcG9zOiBbMzAwLCAzMDBdfSlcclxuICAgIHRoaXMub2JzdGFjbGVzID0gW107XHJcbiAgICB0aGlzLnNwYXJrcyA9IFtdO1xyXG4gICAgdGhpcy5kaXN0ID0gdGhpcy5wYi5nZXREaXN0YW5jZSh0aGlzLnRhcmdldCk7XHJcbiAgICB0aGlzLmNsaWNrcyA9IDA7XHJcbiAgICB0aGlzLnNjb3JlID0gSW5maW5pdHk7XHJcblxyXG4gICAgdGhpcy5hZGRPYnN0YWNsZXMoKTtcclxuICB9XHJcblxyXG4gIGFkZE9ic3RhY2xlcygpIHtcclxuICAgIGNvbnN0IG9iczEgPSBuZXcgT2JzdGFjbGUoXHJcbiAgICAgIHsgcG9zOiBbNDAwLCAzMDBdLCBoZWlnaHQ6IDMwMCwgd2lkdGg6IDIwLCBhbmdsZTogMCwgY29sb3I6IFwiI0Y3MzlBM1wifVxyXG4gICAgKTtcclxuICBcclxuICAgIGNvbnN0IG9iczIgPSBuZXcgT2JzdGFjbGUoXHJcbiAgICAgIHsgcG9zOiBbMjAwLCAzMDBdLCBoZWlnaHQ6IDIwLCB3aWR0aDogMTUwLCBhbmdsZTogMCwgY29sb3I6IFwiI0Y3MzlBM1wifVxyXG4gICAgKTtcclxuICBcclxuICAgIHRoaXMub2JzdGFjbGVzLnB1c2gob2JzMSk7XHJcbiAgICB0aGlzLm9ic3RhY2xlcy5wdXNoKG9iczIpO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNsaWNrcyArPSAxO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjYW52YXNFbCwgY3R4KSB7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiXHJcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzRWwud2lkdGgsIGNhbnZhc0VsLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5vYnN0YWNsZXMuZm9yRWFjaChvYiA9PiB7XHJcbiAgICAgIG9iLmRyYXcoY3R4KTtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5zcGFya3MuZm9yRWFjaChzcGFyayA9PiB7XHJcbiAgICAgIHNwYXJrLmRyYXcoY3R4KTtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy50YXJnZXQuZHJhdyhjdHgpO1xyXG4gICAgdGhpcy5wYi5kcmF3KGN0eCk7XHJcbiAgICBjdHgudGV4dEFsaWduID0gXCJlbmRcIjtcclxuICAgIGN0eC5mb250ID0gJzE4cHggT3JiaXRyb24nO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgY3R4LmZpbGxUZXh0KGBzY29yZTogJHt0aGlzLnNjb3JlfWAsIDU4NSwgMjUpO1xyXG4gICAgY3R4LmZpbGxUZXh0KGBjbGlja3M6ICR7dGhpcy5jbGlja3N9YCwgNTg1LCA2MCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0NvbGxpc2lvbnMoY2FudmFzRWwsIGN0eCkge1xyXG4gICAgbGV0IG5ld1NwYXJrcztcclxuICAgIHRoaXMucGIuaGl0Qm91bmRhcnkoY2FudmFzRWwpO1xyXG5cclxuICAgIHRoaXMub2JzdGFjbGVzLmZvckVhY2gob2IgPT4ge1xyXG4gICAgICAvLyB0aGlzLnNwYXJrcy5wdXNoKC4uLnRoaXMucGIuY2hlY2tDb2xsaXNpb25zKG9iKSk7XHJcbiAgICAgIHRoaXMucGIuY2hlY2tDb2xsaXNpb25zKG9iKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjYWxjRGlzdCgpIHtcclxuICAgIHRoaXMuZGlzdCA9IHRoaXMucGIuZ2V0RGlzdGFuY2UodGhpcy50YXJnZXQpO1xyXG4gICAgdGhpcy5zY29yZSA9IHRoaXMuY2xpY2tzID8gKHRoaXMuZGlzdCAqIHRoaXMuY2xpY2tzKS50b0ZpeGVkKDMpIDogSW5maW5pdHk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY2xhc3MgR2FtZVZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCwgY2FudmFzRWwpIHtcclxuICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuY2FudmFzRWwgPSBjYW52YXNFbDtcclxuICAgIHRoaXMuZG9TdHVmZiA9IHRoaXMuZG9TdHVmZi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5kb1N0dWZmKCk7XHJcbiAgfVxyXG5cclxuICBlbmQoKSB7XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgZGlzdGFuY2U6IHRoaXMuZ2FtZS5kaXN0YW5jZSxcclxuICAgICAgY2xpY2tzOiB0aGlzLmdhbWUuY2xpY2tzXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2xpY2soZSkge1xyXG4gICAgdGhpcy5nYW1lLmFkZENsaWNrKCk7XHJcbiAgICBsZXQgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgdGhpcy5nYW1lLnBiLmRldGVybWluZU1vdmVtZW50KGUuY2xpZW50WCAtIHJlY3QubGVmdCwgZS5jbGllbnRZIC0gcmVjdC50b3ApO1xyXG4gICAgdGhpcy5jYW52YXNFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgZG9TdHVmZigpIHtcclxuICAgIHRoaXMuZ2FtZS5jaGVja0NvbGxpc2lvbnModGhpcy5jYW52YXNFbCwgdGhpcy5jdHgpO1xyXG4gICAgdGhpcy5nYW1lLmNhbGNEaXN0KCk7XHJcbiAgICB0aGlzLmdhbWUuZHJhdyh0aGlzLmNhbnZhc0VsLCB0aGlzLmN0eCk7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLmdhbWUucGIubW92ZSgpKSB7XHJcbiAgICAgIHRoaXMuY2FudmFzRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZG9TdHVmZik7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVWaWV3OyIsIi8vIGNvbnN0IFBsYXlCYWxsID0gcmVxdWlyZShcIi4vcGxheV9iYWxsXCIpO1xyXG4vLyBjb25zdCBUYXJnZXQgPSByZXF1aXJlKFwiLi90YXJnZXRcIik7XHJcbi8vIGNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZShcIi4vb2JzdGFjbGVcIik7XHJcbmNvbnN0IEdhbWUgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xyXG5jb25zdCBHYW1lVmlldyA9IHJlcXVpcmUoXCIuL2dhbWVfdmlld1wiKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICBjb25zdCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnV0dG9uXCIpO1xyXG4gIGNvbnN0IGFib3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dC1idXR0b25cIik7XHJcbiAgY29uc3QgaGlnaFNjb3JlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaC1zY29yZS1idXR0b25cIik7XHJcbiAgc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0R2FtZSk7XHJcbiAgYWJvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dBYm91dCk7XHJcbiAgaGlnaFNjb3Jlcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2hvd0hpZ2hTY29yZXMpO1xyXG59KVxyXG5cclxuY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNhbnZhc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjYW52YXNcIilbMF1cclxuICBjb25zdCBlbmRHYW1lQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbmQtZ2FtZS1idXR0b25cIik7XHJcbiAgY29uc3Qgc3RhcnRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1tZW51XCIpO1xyXG4gIGVuZEdhbWVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgZW5kR2FtZUJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcclxuICBzdGFydE1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIGNhbnZhc0VsLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xyXG4gIGNhbnZhc0VsLmhlaWdodCA9IDYwMDtcclxuICBjYW52YXNFbC53aWR0aCA9IDYwMDtcclxuICBjb25zdCBjdHggPSBjYW52YXNFbC5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gIGNvbnN0IGdhbWUgPSBuZXcgR2FtZSgpO1xyXG4gIGxldCBnYW1lVmlldyA9IG5ldyBHYW1lVmlldyhnYW1lLCBjdHgsIGNhbnZhc0VsKTtcclxuICBnYW1lVmlldy5zdGFydCgpO1xyXG4gIGVuZEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVuZEdhbWUoZ2FtZVZpZXcpKTtcclxufVxyXG5cclxuY29uc3QgZW5kR2FtZSA9ICgpID0+IHtcclxuICByZXR1cm4gKGdhbWVWaWV3KSA9PiB7XHJcbiAgICBjb25zdCBjYW52YXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FudmFzXCIpWzBdXHJcbiAgICBjb25zdCBlbmRHYW1lQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbmQtZ2FtZS1idXR0b25cIik7XHJcbiAgICBjb25zdCBzdGFydE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LW1lbnVcIik7XHJcbiAgICBlbmRHYW1lQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIHN0YXJ0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICBjYW52YXNFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBsZXQgW2NsaWNrcywgc2NvcmVdID0gZ2FtZVZpZXcuZW5kKCk7XHJcbiAgICBnYW1lVmlldyA9IHt9O1xyXG4gICAgZW5kR2FtZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZW5kR2FtZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBzaG93QWJvdXQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgc3RhcnRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1tZW51XCIpXHJcbiAgY29uc3QgYWJvdXRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dC1tZW51XCIpO1xyXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1idXR0b25cIik7XHJcbiAgc3RhcnRNZW51LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICBhYm91dE1lbnUuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlQWJvdXQpO1xyXG59XHJcblxyXG5jb25zdCBoaWRlQWJvdXQgPSAoKSA9PiB7XHJcbiAgY29uc3QgYWJvdXRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dC1tZW51XCIpO1xyXG4gIGNvbnN0IHN0YXJ0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtbWVudVwiKTtcclxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtYnV0dG9uXCIpO1xyXG4gIGFib3V0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgc3RhcnRNZW51LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICBjbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZUFib3V0KTtcclxufVxyXG5cclxuY29uc3Qgc2hvd0hpZ2hTY29yZXMgPSAoKSA9PiB7XHJcbiAgY29uc3QgYWJvdXRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dC1tZW51XCIpO1xyXG4gIGNvbnN0IGhpZ2hTY29yZU1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2gtc2NvcmUtbWVudVwiKTtcclxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtaHMtYnV0dG9uXCIpO1xyXG4gIGFib3V0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgaGlnaFNjb3JlTWVudS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVIaWdoU2NvcmVzKTtcclxufVxyXG5cclxuY29uc3QgaGlkZUhpZ2hTY29yZXMgPSAoKSA9PiB7XHJcbiAgY29uc3QgYWJvdXRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dC1tZW51XCIpO1xyXG4gIGNvbnN0IGhpZ2hTY29yZU1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2gtc2NvcmUtbWVudVwiKTtcclxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtaHMtYnV0dG9uXCIpO1xyXG4gIGhpZ2hTY29yZU1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIGFib3V0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVIaWdoU2NvcmVzKTtcclxufSIsImNsYXNzIE1vdmluZ09iamVjdCB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMudmVsID0gb3B0aW9ucy52ZWw7XHJcbiAgICB0aGlzLnJhZGl1cyA9IG9wdGlvbnMucmFkaXVzO1xyXG4gICAgdGhpcy5jb2xvciA9IG9wdGlvbnMuY29sb3I7XHJcbiAgICB0aGlzLm1vdmUgPSB0aGlzLm1vdmUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZHJhdyA9IHRoaXMuZHJhdy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5wcmV2UG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLmZyaWN0aW9uID0gLjk4IC8vMC45IHdhcyB0aGUgZmlyc3QgdmFsdWVcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIHRoaXMucG9zWzBdLFxyXG4gICAgICB0aGlzLnBvc1sxXSxcclxuICAgICAgdGhpcy5yYWRpdXMsXHJcbiAgICAgIDAsXHJcbiAgICAgIDIgKiBNYXRoLlBJLFxyXG4gICAgICBmYWxzZVxyXG4gICAgKTtcclxuXHJcbiAgICBjdHguZmlsbCgpO1xyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIHRoaXMucHJldlBvcyA9IHRoaXMucG9zO1xyXG4gICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gKyB0aGlzLnZlbFswXSwgdGhpcy5wb3NbMV0gKyB0aGlzLnZlbFsxXV07XHJcbiAgICB0aGlzLnZlbCA9IFt0aGlzLnZlbFswXSp0aGlzLmZyaWN0aW9uLCB0aGlzLnZlbFsxXSp0aGlzLmZyaWN0aW9uXTtcclxuICAgIGlmIChNYXRoLnNxcnQoTWF0aC5wb3codGhpcy52ZWxbMF0sIDIpICsgTWF0aC5wb3codGhpcy52ZWxbMV0sIDIpKSA8IC4xKSB7XHJcbiAgICAgIHRoaXMudmVsWzBdID0gMDtcclxuICAgICAgdGhpcy52ZWxbMV0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnZlbFswXSA9PT0gMCAmJiB0aGlzLnZlbFsxXSA9PT0gMDtcclxuICB9XHJcblxyXG4gIGhpdEJvdW5kYXJ5KGNhbnZhc0VsKSB7XHJcbiAgICBpZiAodGhpcy5wb3NbMF0gKyB0aGlzLnZlbFswXSA+IGNhbnZhc0VsLndpZHRoIHx8IHRoaXMucG9zWzBdICsgdGhpcy52ZWxbMF0gPCAwKSB7XHJcbiAgICAgIHRoaXMubWFrZUJvdW5jZVNvdW5kKCk7XHJcbiAgICAgIHRoaXMudmVsWzBdID0gLXRoaXMudmVsWzBdO1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wb3NbMV0gKyB0aGlzLnZlbFsxXSA+IGNhbnZhc0VsLmhlaWdodCB8fCB0aGlzLnBvc1sxXSArIHRoaXMudmVsWzFdIDwgMCkge1xyXG4gICAgICB0aGlzLm1ha2VCb3VuY2VTb3VuZCgpO1xyXG4gICAgICB0aGlzLnZlbFsxXSA9IC10aGlzLnZlbFsxXTtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uTGVmdChvYikge1xyXG5cclxuICAgIGxldCBzbG9wZSA9IHRoaXMudmVsWzFdL3RoaXMudmVsWzBdO1xyXG5cclxuICAgIGlmIChvYi5hbmdsZSA9PT0gMCkge1xyXG4gICAgICBsZXQgd2FsbERpbSA9IG9iLnBvc1swXSAtIG9iLndpZHRoLzI7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IHRoaXMucHJldlBvc1sxXSArIHNsb3BlICogKHdhbGxEaW0gLSB0aGlzLnByZXZQb3NbMF0pO1xyXG4gICAgICBsZXQgeUxvd2VyQm91bmQgPSBvYi5wb3NbMV0gLSBvYi5oZWlnaHQvMjtcclxuICAgICAgbGV0IHlVcHBlckJvdW5kID0gb2IucG9zWzFdICsgb2IuaGVpZ2h0LzI7XHJcbiAgICAgIGlmICh0aGlzLnByZXZQb3NbMF0gPCB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9zWzBdID4gd2FsbERpbSkge1xyXG4gICAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB5TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHlVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zWzBdID0gd2FsbERpbTtcclxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25QVDtcclxuICAgICAgICAgICAgdGhpcy52ZWxbMF0gPSAtdGhpcy52ZWxbMF1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgd2FsbFNsb3BlID0gKG9iLnl0b3BMZWZ0UHQgLSBvYi55Ym90dG9tTGVmdFB0KSAvIChvYi54dG9wTGVmdFB0IC0gb2IueGJvdHRvbUxlZnRQdCk7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25YID0gKChzbG9wZSp0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKSAtICh3YWxsU2xvcGUqb2IueGJvdHRvbUxlZnRQdCAtIG9iLnlib3R0b21MZWZ0UHQpKS8oc2xvcGUgLSB3YWxsU2xvcGUpO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWSA9IHNsb3BlKmludGVyc2VjdGlvblggLSAoc2xvcGUqdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSk7XHJcbiAgICAgIGxldCB4UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xyXG4gICAgICBsZXQgeEN1cnJEaWZmID0gdGhpcy5wb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xyXG4gICAgICBsZXQgeVByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcclxuICAgICAgbGV0IHlDdXJyRGlmZiA9IHRoaXMucG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcclxuXHJcbiAgICAgIC8vIGlmIChpbnRlcnNlY3Rpb25ZID4gb2IueXRvcExlZnRQdCAmJiBpbnRlcnNlY3Rpb25ZIDwgb2IueWJvdHRvbUxlZnRQdCAmJiB4UHJldkRpZmYqeEN1cnJEaWZmIDw9IDAgJiYgeVByZXZEaWZmKnlDdXJyRGlmZiA8PSAwKSB7XHJcbiAgICAgIGlmIChpbnRlcnNlY3Rpb25ZID4gb2IueXRvcExlZnRQdCAmJiBpbnRlcnNlY3Rpb25ZIDwgb2IueWJvdHRvbUxlZnRQdCAmJiB4UHJldkRpZmYqeEN1cnJEaWZmIDw9IDAgJiYgeVByZXZEaWZmKnlDdXJyRGlmZiA8PSAwKSB7XHJcbiAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgbGV0IHhBbmdsZSA9IDE4MCAtIDIqb2IuYW5nbGU7XHJcbiAgICAgICAgbGV0IHhDb21wMSA9IHRoaXMudmVsWzBdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xyXG4gICAgICAgIGxldCB4Q29tcDIgPSB0aGlzLnZlbFswXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcclxuXHJcbiAgICAgICAgbGV0IHlBbmdsZSA9IDkwIC0gMipvYi5hbmdsZTtcclxuICAgICAgICBsZXQgeUNvbXAxID0gdGhpcy52ZWxbMV0gKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XHJcbiAgICAgICAgbGV0IHlDb21wMiA9IHRoaXMudmVsWzFdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xyXG5cclxuICAgICAgICB0aGlzLnZlbFswXSA9IHhDb21wMSArIHlDb21wMTtcclxuICAgICAgICB0aGlzLnZlbFsxXSA9IHhDb21wMiArIHlDb21wMjtcclxuICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblggKyB0aGlzLnZlbFswXSowLjAxO1xyXG4gICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uWSArIHRoaXMudmVsWzFdKjAuMDE7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uUmlnaHQob2IpIHtcclxuXHJcbiAgICBsZXQgc2xvcGUgPSB0aGlzLnZlbFsxXS90aGlzLnZlbFswXTtcclxuXHJcbiAgICBpZiAob2IuYW5nbGUgPT09IDApIHtcclxuICAgICAgbGV0IHdhbGxEaW0gPSBvYi5wb3NbMF0gKyBvYi53aWR0aC8yO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSB0aGlzLnByZXZQb3NbMV0gKyBzbG9wZSAqICh3YWxsRGltIC0gdGhpcy5wcmV2UG9zWzBdKTtcclxuICAgICAgbGV0IHlMb3dlckJvdW5kID0gb2IucG9zWzFdIC0gb2IuaGVpZ2h0LzI7XHJcbiAgICAgIGxldCB5VXBwZXJCb3VuZCA9IG9iLnBvc1sxXSArIG9iLmhlaWdodC8yO1xyXG4gICAgICBpZiAodGhpcy5wcmV2UG9zWzBdID4gd2FsbERpbSkge1xyXG4gICAgICAgIGlmICh0aGlzLnBvc1swXSA8IHdhbGxEaW0pIHtcclxuICAgICAgICAgIGlmKGludGVyc2VjdGlvblBUID4geUxvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB5VXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc1swXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICAgIHRoaXMudmVsWzBdID0gLXRoaXMudmVsWzBdXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgd2FsbFNsb3BlID0gKG9iLnl0b3BSaWdodFB0IC0gb2IueWJvdHRvbVJpZ2h0UHQpIC8gKG9iLnh0b3BSaWdodFB0IC0gb2IueGJvdHRvbVJpZ2h0UHQpO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWCA9ICgoc2xvcGUqdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSkgLSAod2FsbFNsb3BlKm9iLnhib3R0b21SaWdodFB0IC0gb2IueWJvdHRvbVJpZ2h0UHQpKS8oc2xvcGUgLSB3YWxsU2xvcGUpO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWSA9IHNsb3BlKmludGVyc2VjdGlvblggLSAoc2xvcGUqdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSk7XHJcbiAgICAgIGxldCB4UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xyXG4gICAgICBsZXQgeEN1cnJEaWZmID0gdGhpcy5wb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xyXG5cclxuXHJcbiAgICAgIC8vIGlmIChpbnRlcnNlY3Rpb25ZID4gb2IueXRvcFJpZ2h0UHQgJiYgaW50ZXJzZWN0aW9uWSA8IG9iLnlib3R0b21SaWdodFB0ICYmIHRoaXMucHJldlBvc1swXSA+IGludGVyc2VjdGlvblggJiYgdGhpcy5wb3NbMF0gPCBpbnRlcnNlY3Rpb25YKSB7XHJcbiAgICAgIGlmIChpbnRlcnNlY3Rpb25ZID4gb2IueXRvcFJpZ2h0UHQgJiYgaW50ZXJzZWN0aW9uWSA8IG9iLnlib3R0b21SaWdodFB0ICYmIHhQcmV2RGlmZip4Q3VyckRpZmYgPD0gMCkge1xyXG4gICAgICAgIGxldCB5UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMV0gLSBpbnRlcnNlY3Rpb25ZO1xyXG4gICAgICAgIGxldCB5Q3VyckRpZmYgPSB0aGlzLnBvc1sxXSAtIGludGVyc2VjdGlvblk7XHJcbiAgICAgICAgaWYoeVByZXZEaWZmKnlDdXJyRGlmZiA8PSAwKSB7XHJcbiAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgIGxldCB4QW5nbGUgPSAxODAgLSAyKm9iLmFuZ2xlO1xyXG4gICAgICAgICAgbGV0IHhDb21wMSA9IHRoaXMudmVsWzBdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xyXG4gICAgICAgICAgbGV0IHhDb21wMiA9IHRoaXMudmVsWzBdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xyXG5cclxuICAgICAgICAgIGxldCB5QW5nbGUgPSA5MCAtIDIqb2IuYW5nbGU7XHJcbiAgICAgICAgICBsZXQgeUNvbXAxID0gdGhpcy52ZWxbMV0gKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XHJcbiAgICAgICAgICBsZXQgeUNvbXAyID0gdGhpcy52ZWxbMV0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XHJcblxyXG4gICAgICAgICAgdGhpcy52ZWxbMF0gPSB4Q29tcDEgKyB5Q29tcDE7XHJcbiAgICAgICAgICB0aGlzLnZlbFsxXSA9IHhDb21wMiArIHlDb21wMjtcclxuICAgICAgICAgIHRoaXMucG9zWzBdID0gaW50ZXJzZWN0aW9uWCArIHRoaXMudmVsWzBdKjAuMDE7XHJcbiAgICAgICAgICB0aGlzLnBvc1sxXSA9IGludGVyc2VjdGlvblkgKyB0aGlzLnZlbFsxXSowLjAxO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbGxpc2lvblRvcChvYikge1xyXG5cclxuICAgIGlmIChvYi5hbmdsZSA9PT0gMCkge1xyXG4gICAgICBsZXQgaW52U2xvcGUgPSB0aGlzLnZlbFswXS90aGlzLnZlbFsxXTtcclxuICAgICAgbGV0IHdhbGxEaW0gPSBvYi5wb3NbMV0gLSBvYi5oZWlnaHQvMjtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzBdICsgaW52U2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1sxXSk7XHJcbiAgICAgIGxldCB4TG93ZXJCb3VuZCA9IG9iLnBvc1swXSAtIG9iLndpZHRoLzI7XHJcbiAgICAgIGxldCB4VXBwZXJCb3VuZCA9IG9iLnBvc1swXSArIG9iLndpZHRoLzI7XHJcbiAgICAgIGlmICh0aGlzLnByZXZQb3NbMV0gPCB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9zWzFdID4gd2FsbERpbSkge1xyXG4gICAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB4TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHhVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zWzBdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICAgIHRoaXMucG9zWzFdID0gd2FsbERpbTtcclxuICAgICAgICAgICAgdGhpcy52ZWxbMV0gPSAtdGhpcy52ZWxbMV1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBzbG9wZSA9IHRoaXMudmVsWzFdL3RoaXMudmVsWzBdXHJcbiAgICAgIGxldCB3YWxsU2xvcGUgPSAob2IueXRvcFJpZ2h0UHQgLSBvYi55dG9wTGVmdFB0KSAvIChvYi54dG9wUmlnaHRQdCAtIG9iLnh0b3BMZWZ0UHQpO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWCA9ICgoc2xvcGUqdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSkgLSAod2FsbFNsb3BlKm9iLnh0b3BMZWZ0UHQgLSBvYi55dG9wTGVmdFB0KSkvKHNsb3BlIC0gd2FsbFNsb3BlKTtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblkgPSBzbG9wZSppbnRlcnNlY3Rpb25YIC0gKHNsb3BlKnRoaXMucG9zWzBdIC0gdGhpcy5wb3NbMV0pO1xyXG4gICAgICBsZXQgeFByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcclxuICAgICAgbGV0IHhDdXJyRGlmZiA9IHRoaXMucG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcclxuXHJcbiAgICAgIGlmIChpbnRlcnNlY3Rpb25ZID4gb2IueXRvcFJpZ2h0UHQgJiYgaW50ZXJzZWN0aW9uWSA8IG9iLnl0b3BMZWZ0UHQgJiYgeFByZXZEaWZmKnhDdXJyRGlmZiA8PSAwKSB7XHJcbiAgICAgICAgbGV0IHlQcmV2RGlmZiA9IHRoaXMucHJldlBvc1sxXSAtIGludGVyc2VjdGlvblk7XHJcbiAgICAgICAgbGV0IHlDdXJyRGlmZiA9IHRoaXMucG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcclxuICAgICAgICBpZih5UHJldkRpZmYqeUN1cnJEaWZmIDw9IDApIHtcclxuICAgICAgICAgIGxldCB4QW5nbGUgPSAtMipvYi5hbmdsZTtcclxuICAgICAgICAgIGxldCB4Q29tcDEgPSB0aGlzLnZlbFswXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcclxuICAgICAgICAgIGxldCB4Q29tcDIgPSB0aGlzLnZlbFswXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcclxuXHJcbiAgICAgICAgICBsZXQgeUFuZ2xlID0gMjcwIC0gMipvYi5hbmdsZTtcclxuICAgICAgICAgIGxldCB5Q29tcDEgPSB0aGlzLnZlbFsxXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcclxuICAgICAgICAgIGxldCB5Q29tcDIgPSB0aGlzLnZlbFsxXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcclxuXHJcbiAgICAgICAgICB0aGlzLnZlbFswXSA9IHhDb21wMSArIHlDb21wMTtcclxuICAgICAgICAgIHRoaXMudmVsWzFdID0geENvbXAyICsgeUNvbXAyO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25YICsgdGhpcy52ZWxbMF0qMC4wMTtcclxuICAgICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uWSArIHRoaXMudmVsWzFdKjAuMDE7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uQm90KG9iKSB7XHJcblxyXG4gICAgaWYgKG9iLmFuZ2xlID09PSAwKSB7XHJcbiAgICAgIGxldCBpbnZTbG9wZSA9IHRoaXMudmVsWzBdL3RoaXMudmVsWzFdO1xyXG4gICAgICBsZXQgd2FsbERpbSA9IG9iLnBvc1sxXSArIG9iLmhlaWdodC8yO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSB0aGlzLnByZXZQb3NbMF0gKyBpbnZTbG9wZSAqICh3YWxsRGltIC0gdGhpcy5wcmV2UG9zWzFdKTtcclxuICAgICAgbGV0IHhMb3dlckJvdW5kID0gb2IucG9zWzBdIC0gb2Iud2lkdGgvMjtcclxuICAgICAgbGV0IHhVcHBlckJvdW5kID0gb2IucG9zWzBdICsgb2Iud2lkdGgvMjtcclxuICAgICAgaWYgKHRoaXMucHJldlBvc1sxXSA+IHdhbGxEaW0pIHtcclxuICAgICAgICBpZiAodGhpcy5wb3NbMV0gPCB3YWxsRGltKSB7XHJcbiAgICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHhMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeFVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25QVDtcclxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgICB0aGlzLnZlbFsxXSA9IC10aGlzLnZlbFsxXVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHNsb3BlID0gdGhpcy52ZWxbMV0vdGhpcy52ZWxbMF1cclxuICAgICAgbGV0IHdhbGxTbG9wZSA9IChvYi55Ym90dG9tUmlnaHRQdCAtIG9iLnlib3R0b21MZWZ0UHQpIC8gKG9iLnhib3R0b21SaWdodFB0IC0gb2IueGJvdHRvbUxlZnRQdCk7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25YID0gKChzbG9wZSp0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKSAtICh3YWxsU2xvcGUqb2IueGJvdHRvbUxlZnRQdCAtIG9iLnlib3R0b21MZWZ0UHQpKS8oc2xvcGUgLSB3YWxsU2xvcGUpO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWSA9IHNsb3BlKmludGVyc2VjdGlvblggLSAoc2xvcGUqdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSk7XHJcbiAgICAgIGxldCB4UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xyXG4gICAgICBsZXQgeEN1cnJEaWZmID0gdGhpcy5wb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xyXG5cclxuICAgICAgaWYgKGludGVyc2VjdGlvblkgPiBvYi55Ym90dG9tUmlnaHRQdCAmJiBpbnRlcnNlY3Rpb25ZIDwgb2IueWJvdHRvbUxlZnRQdCAmJiB4UHJldkRpZmYqeEN1cnJEaWZmIDw9IDApIHtcclxuICAgICAgICBsZXQgeVByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcclxuICAgICAgICBsZXQgeUN1cnJEaWZmID0gdGhpcy5wb3NbMV0gLSBpbnRlcnNlY3Rpb25ZO1xyXG4gICAgICAgIGlmKHlQcmV2RGlmZip5Q3VyckRpZmYgPD0gMCkge1xyXG4gICAgICAgICAgbGV0IHhBbmdsZSA9IC0yKm9iLmFuZ2xlO1xyXG4gICAgICAgICAgbGV0IHhDb21wMSA9IHRoaXMudmVsWzBdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xyXG4gICAgICAgICAgbGV0IHhDb21wMiA9IHRoaXMudmVsWzBdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xyXG5cclxuICAgICAgICAgIGxldCB5QW5nbGUgPSAyNzAgLSAyKm9iLmFuZ2xlO1xyXG4gICAgICAgICAgbGV0IHlDb21wMSA9IHRoaXMudmVsWzFdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xyXG4gICAgICAgICAgbGV0IHlDb21wMiA9IHRoaXMudmVsWzFdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xyXG5cclxuICAgICAgICAgIHRoaXMudmVsWzBdID0geENvbXAxICsgeUNvbXAxO1xyXG4gICAgICAgICAgdGhpcy52ZWxbMV0gPSB4Q29tcDIgKyB5Q29tcDI7XHJcbiAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblggKyB0aGlzLnZlbFswXSowLjAxO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25ZICsgdGhpcy52ZWxbMV0qMC4wMTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0NvbGxpc2lvbnMob2JzdGFjbGUpIHtcclxuICAgIGlmICh0aGlzLmNvbGxpc2lvbkxlZnQob2JzdGFjbGUpIHx8IHRoaXMuY29sbGlzaW9uUmlnaHQob2JzdGFjbGUpIHx8IHRoaXMuY29sbGlzaW9uVG9wKG9ic3RhY2xlKSB8fCB0aGlzLmNvbGxpc2lvbkJvdChvYnN0YWNsZSkpIHtcclxuICAgICAgdGhpcy5tYWtlQm91bmNlU291bmQoKTtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJvdW5jZVNvdW5kKCkge1xyXG4gICAgbGV0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdWRpby1wbGF5ZXJcIilcclxuICAgIGF1ZGlvLnNyYyA9IFwiLi9hc3NldHMvc291bmQvYm91bmNlLndhdlwiO1xyXG4gICAgYXVkaW8ucGxheSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmFkaWFucyhhbmdsZSkge1xyXG4gICAgcmV0dXJuIGFuZ2xlICogTWF0aC5QSS8xODBcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW92aW5nT2JqZWN0OyIsImNsYXNzIE9ic3RhY2xlIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcclxuICAgIHRoaXMud2lkdGggPSBvcHRpb25zLndpZHRoO1xyXG4gICAgdGhpcy5hbmdsZSA9IG9wdGlvbnMuYW5nbGU7XHJcbiAgICB0aGlzLmNvbG9yID0gb3B0aW9ucy5jb2xvcjtcclxuICAgIHRoaXMueG1pZExlZnRQdCA9IHRoaXMucG9zWzBdIC0gdGhpcy53aWR0aC8yKk1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnltaWRMZWZ0UHQgPSB0aGlzLnBvc1sxXSArIHRoaXMud2lkdGgvMipNYXRoLnNpbih0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy54Ym90dG9tTGVmdFB0ID0gdGhpcy54bWlkTGVmdFB0ICsgdGhpcy5oZWlnaHQvMipNYXRoLnNpbih0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy55Ym90dG9tTGVmdFB0ID0gdGhpcy55bWlkTGVmdFB0ICsgdGhpcy5oZWlnaHQvMipNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy54dG9wTGVmdFB0ID0gdGhpcy54bWlkTGVmdFB0IC0gdGhpcy5oZWlnaHQvMipNYXRoLnNpbih0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy55dG9wTGVmdFB0ID0gdGhpcy55bWlkTGVmdFB0IC0gdGhpcy5oZWlnaHQvMipNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy54bWlkUmlnaHRQdCA9IHRoaXMucG9zWzBdICsgdGhpcy53aWR0aC8yKk1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnltaWRSaWdodFB0ID0gdGhpcy5wb3NbMV0gLSB0aGlzLndpZHRoLzIqTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueGJvdHRvbVJpZ2h0UHQgPSB0aGlzLnhtaWRSaWdodFB0ICsgdGhpcy5oZWlnaHQvMipNYXRoLnNpbih0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy55Ym90dG9tUmlnaHRQdCA9IHRoaXMueW1pZFJpZ2h0UHQgKyB0aGlzLmhlaWdodC8yKk1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnh0b3BSaWdodFB0ID0gdGhpcy54bWlkUmlnaHRQdCAtIHRoaXMuaGVpZ2h0LzIqTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueXRvcFJpZ2h0UHQgPSB0aGlzLnltaWRSaWdodFB0IC0gdGhpcy5oZWlnaHQvMipNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjdHgpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0pO1xyXG4gICAgY3R4LnJvdGF0ZSgtdGhpcy5nZXRSYWRpYW5zKCkpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSgtdGhpcy5wb3NbMF0sIC10aGlzLnBvc1sxXSk7XHJcbiAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NbMF0gLSB0aGlzLndpZHRoLzIsIHRoaXMucG9zWzFdIC0gdGhpcy5oZWlnaHQvMiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0pO1xyXG4gICAgY3R4LnJvdGF0ZSh0aGlzLmdldFJhZGlhbnMoKSk7XHJcbiAgICBjdHgudHJhbnNsYXRlKC10aGlzLnBvc1swXSwgLXRoaXMucG9zWzFdKTtcclxuICB9XHJcblxyXG4gIGdldFJhZGlhbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbmdsZSAqIE1hdGguUEkvMTgwXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9ic3RhY2xlOyIsImNvbnN0IE1vdmluZ09iamVjdCA9IHJlcXVpcmUoJy4vbW92aW5nX29iamVjdCcpO1xyXG5cclxuY2xhc3MgUGxheUJhbGwgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpXHJcbiAgICB0aGlzLmRldGVybWluZU1vdmVtZW50ID0gdGhpcy5kZXRlcm1pbmVNb3ZlbWVudC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5taW5DbGlja0Rpc3QgPSA4XHJcbiAgfVxyXG5cclxuICBkZXRlcm1pbmVNb3ZlbWVudCh4Q2xpY2ssIHlDbGljaykge1xyXG4gICAgbGV0IHhEaWZmID0gdGhpcy5wb3NbMF0gLSB4Q2xpY2s7XHJcbiAgICBsZXQgeURpZmYgPSB0aGlzLnBvc1sxXSAtIHlDbGljaztcclxuXHJcbiAgICBpZiAoTWF0aC5hYnMoeERpZmYpIDwgdGhpcy5taW5DbGlja0Rpc3QpIHtcclxuICAgICAgeERpZmYgPSB4RGlmZi9NYXRoLmFicyh4RGlmZikqdGhpcy5taW5DbGlja0Rpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKHlEaWZmKSA8IHRoaXMubWluQ2xpY2tEaXN0KSB7XHJcbiAgICAgIHlEaWZmID0geURpZmYvTWF0aC5hYnMoeURpZmYpKnRoaXMubWluQ2xpY2tEaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBtYWcgPSAxLyhNYXRoLnBvdyh4RGlmZiwgMikgKyBNYXRoLnBvdyh5RGlmZiwgMikpO1xyXG4gICAgbGV0IHVuaXREaXIgPSBbeERpZmYsIHlEaWZmXTtcclxuICAgIHRoaXMudmVsWzBdID0gdW5pdERpclswXSAqIG1hZyAqIDg1MDtcclxuICAgIHRoaXMudmVsWzFdID0gdW5pdERpclsxXSAqIG1hZyAqIDg1MDtcclxuICB9XHJcblxyXG4gIGdldERpc3RhbmNlKHRhcmdldCkge1xyXG4gICAgbGV0IHhEaWZmID0gTWF0aC5hYnModGhpcy5wb3NbMF0gLSB0YXJnZXQucG9zWzBdKTtcclxuICAgIGxldCB5RGlmZiA9IE1hdGguYWJzKHRoaXMucG9zWzFdIC0gdGFyZ2V0LnBvc1sxXSk7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHhEaWZmKnhEaWZmICsgeURpZmYqeURpZmYpLnRvRml4ZWQoMyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlCYWxsOyIsImNvbnN0IE1vdmluZ09iamVjdCA9IHJlcXVpcmUoXCIuL21vdmluZ19vYmplY3RcIik7XHJcblxyXG5jbGFzcyBTcGFyayBleHRlbmRzIE1vdmluZ09iamVjdCB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5jb2xvclNldCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCBcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiXTtcclxuICAgIHRoaXNcclxuICAgIHNldEludGVydmFsKHRoaXMuY2hhbmdlQ29sb3IsIDUwMCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VDb2xvcigpIHtcclxuICAgIGxldCBjb2xvclN0ciA9IFwiI1wiO1xyXG5cclxuICAgIHdoaWxlIChjb2xvclN0ci5sZW5ndGggPCA2KSB7XHJcbiAgICAgIGNvbG9yU3RyICs9IHRoaXMuY29sb3JTZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuY29sb3JTZXQubGVuZ3RoKV07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yU3RyO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTcGFyazsiLCJjbGFzcyBUYXJnZXQge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLnZlbCA9IFswLCAwXTtcclxuICAgIHRoaXMucmFkaXVzID0gODtcclxuICAgIHRoaXMuY29sb3IgPSBcIiNmZmZmZmZcIjtcclxuICAgIHRoaXMuZHJhdyA9IHRoaXMuZHJhdy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjdHgpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYyhcclxuICAgICAgdGhpcy5wb3NbMF0sXHJcbiAgICAgIHRoaXMucG9zWzFdLFxyXG4gICAgICB0aGlzLnJhZGl1cyxcclxuICAgICAgMCxcclxuICAgICAgMiAqIE1hdGguUEksXHJcbiAgICAgIGZhbHNlXHJcbiAgICApO1xyXG5cclxuICAgIGN0eC5maWxsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRhcmdldDsiXSwic291cmNlUm9vdCI6IiJ9