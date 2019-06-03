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
    // this.sparks.push(...this.pb.hitBoundary(canvasEl));
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

  let start = document.getElementById("start-button");
  start.addEventListener('click', startGame);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmluZ19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5X2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NwYXJrLmpzIiwid2VicGFjazovLy8uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3RDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsK0JBQVM7O0FBRS9CO0FBQ0E7QUFDQSw0QkFBNEIseURBQXlEO0FBQ3JGLDhCQUE4QixpQkFBaUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLDRCQUE0QixZQUFZO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0I7Ozs7Ozs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsaUJBQWlCLG1CQUFPLENBQUMsdUNBQWE7O0FBRXRDOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7Ozs7O0FDblJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEI7Ozs7Ozs7Ozs7O0FDckNBLHFCQUFxQixtQkFBTyxDQUFDLCtDQUFpQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ2xDQSxxQkFBcUIsbUJBQU8sQ0FBQywrQ0FBaUI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjb25zdCBQbGF5QmFsbCA9IHJlcXVpcmUoXCIuL3BsYXlfYmFsbFwiKTtcclxuY29uc3QgVGFyZ2V0ID0gcmVxdWlyZShcIi4vdGFyZ2V0XCIpO1xyXG5jb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoXCIuL29ic3RhY2xlXCIpO1xyXG5jb25zdCBTcGFyayA9IHJlcXVpcmUoXCIuL3NwYXJrXCIpO1xyXG5cclxuY2xhc3MgR2FtZSB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wYiA9IG5ldyBQbGF5QmFsbCh7IHBvczogWzMwLCAzMF0sIHZlbDogWzAsIDBdLCByYWRpdXM6IDUsIGNvbG9yOiBcIiM1NWFhY2NcIn0pO1xyXG4gICAgdGhpcy50YXJnZXQgPSBuZXcgVGFyZ2V0KHsgcG9zOiBbMzAwLCAzMDBdfSlcclxuICAgIHRoaXMub2JzdGFjbGVzID0gW107XHJcbiAgICB0aGlzLnNwYXJrcyA9IFtdO1xyXG4gICAgdGhpcy5kaXN0ID0gdGhpcy5wYi5nZXREaXN0YW5jZSh0aGlzLnRhcmdldCk7XHJcbiAgICB0aGlzLmNsaWNrcyA9IDA7XHJcblxyXG4gICAgdGhpcy5hZGRPYnN0YWNsZXMoKTtcclxuICB9XHJcblxyXG4gIGFkZE9ic3RhY2xlcygpIHtcclxuICAgIGNvbnN0IG9iczEgPSBuZXcgT2JzdGFjbGUoXHJcbiAgICAgIHsgcG9zOiBbNDAwLCAzMDBdLCBoZWlnaHQ6IDMwMCwgd2lkdGg6IDIwLCBhbmdsZTogMCwgY29sb3I6IFwiI0Y3MzlBM1wifVxyXG4gICAgKTtcclxuICBcclxuICAgIGNvbnN0IG9iczIgPSBuZXcgT2JzdGFjbGUoXHJcbiAgICAgIHsgcG9zOiBbMjAwLCAzMDBdLCBoZWlnaHQ6IDIwLCB3aWR0aDogMTUwLCBhbmdsZTogMCwgY29sb3I6IFwiI0Y3MzlBM1wifVxyXG4gICAgKTtcclxuICBcclxuICAgIHRoaXMub2JzdGFjbGVzLnB1c2gob2JzMSk7XHJcbiAgICB0aGlzLm9ic3RhY2xlcy5wdXNoKG9iczIpO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNsaWNrcyArPSAxO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjYW52YXNFbCwgY3R4KSB7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiXHJcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzRWwud2lkdGgsIGNhbnZhc0VsLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5vYnN0YWNsZXMuZm9yRWFjaChvYiA9PiB7XHJcbiAgICAgIG9iLmRyYXcoY3R4KTtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5zcGFya3MuZm9yRWFjaChzcGFyayA9PiB7XHJcbiAgICAgIHNwYXJrLmRyYXcoY3R4KTtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy50YXJnZXQuZHJhdyhjdHgpO1xyXG4gICAgdGhpcy5wYi5kcmF3KGN0eCk7XHJcbiAgICBjdHgudGV4dEFsaWduID0gXCJlbmRcIjtcclxuICAgIGN0eC5mb250ID0gJzE4cHggT3JiaXRyb24nO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgY3R4LmZpbGxUZXh0KGBkaXN0OiAke3RoaXMuZGlzdH1gLCA1ODUsIDI1KTtcclxuICAgIGN0eC5maWxsVGV4dChgY2xpY2tzOiAke3RoaXMuY2xpY2tzfWAsIDU4NSwgNjApO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDb2xsaXNpb25zKGNhbnZhc0VsLCBjdHgpIHtcclxuICAgIC8vIHRoaXMuc3BhcmtzLnB1c2goLi4udGhpcy5wYi5oaXRCb3VuZGFyeShjYW52YXNFbCkpO1xyXG4gICAgdGhpcy5wYi5oaXRCb3VuZGFyeShjYW52YXNFbCk7XHJcblxyXG4gICAgdGhpcy5vYnN0YWNsZXMuZm9yRWFjaChvYiA9PiB7XHJcbiAgICAgIC8vIHRoaXMuc3BhcmtzLnB1c2goLi4udGhpcy5wYi5jaGVja0NvbGxpc2lvbnMob2IpKTtcclxuICAgICAgdGhpcy5wYi5jaGVja0NvbGxpc2lvbnMob2IpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNhbGNEaXN0KCkge1xyXG4gICAgdGhpcy5kaXN0ID0gdGhpcy5wYi5nZXREaXN0YW5jZSh0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY2xhc3MgR2FtZVZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCwgY2FudmFzRWwpIHtcclxuICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuY2FudmFzRWwgPSBjYW52YXNFbDtcclxuICAgIHRoaXMuZG9TdHVmZiA9IHRoaXMuZG9TdHVmZi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5kb1N0dWZmKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDbGljayhlKSB7XHJcbiAgICB0aGlzLmdhbWUuYWRkQ2xpY2soKTtcclxuICAgIGxldCByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICB0aGlzLmdhbWUucGIuZGV0ZXJtaW5lTW92ZW1lbnQoZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBlLmNsaWVudFkgLSByZWN0LnRvcCk7XHJcbiAgICB0aGlzLmNhbnZhc0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XHJcbiAgfVxyXG5cclxuICBkb1N0dWZmKCkge1xyXG4gICAgdGhpcy5nYW1lLmNoZWNrQ29sbGlzaW9ucyh0aGlzLmNhbnZhc0VsLCB0aGlzLmN0eCk7XHJcbiAgICB0aGlzLmdhbWUuY2FsY0Rpc3QoKTtcclxuICAgIHRoaXMuZ2FtZS5kcmF3KHRoaXMuY2FudmFzRWwsIHRoaXMuY3R4KTtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuZ2FtZS5wYi5tb3ZlKCkpIHtcclxuICAgICAgdGhpcy5jYW52YXNFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5kb1N0dWZmKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZVZpZXc7IiwiLy8gY29uc3QgUGxheUJhbGwgPSByZXF1aXJlKFwiLi9wbGF5X2JhbGxcIik7XHJcbi8vIGNvbnN0IFRhcmdldCA9IHJlcXVpcmUoXCIuL3RhcmdldFwiKTtcclxuLy8gY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKFwiLi9vYnN0YWNsZVwiKTtcclxuY29uc3QgR2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XHJcbmNvbnN0IEdhbWVWaWV3ID0gcmVxdWlyZShcIi4vZ2FtZV92aWV3XCIpO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG5cclxuICBsZXQgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWJ1dHRvblwiKTtcclxuICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZSk7XHJcbn0pXHJcblxyXG5jb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FudmFzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImNhbnZhc1wiKVswXVxyXG5cclxuICBsZXQgc3RhcnRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1tZW51XCIpO1xyXG4gIHN0YXJ0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgY2FudmFzRWwuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgY2FudmFzRWwuaGVpZ2h0ID0gNjAwO1xyXG4gIGNhbnZhc0VsLndpZHRoID0gNjAwO1xyXG4gIGxldCBjdHggPSBjYW52YXNFbC5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcclxuICBuZXcgR2FtZVZpZXcoZ2FtZSwgY3R4LCBjYW52YXNFbCkuc3RhcnQoKTtcclxuXHJcbn0iLCJjbGFzcyBNb3ZpbmdPYmplY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLnZlbCA9IG9wdGlvbnMudmVsO1xyXG4gICAgdGhpcy5yYWRpdXMgPSBvcHRpb25zLnJhZGl1cztcclxuICAgIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yO1xyXG4gICAgdGhpcy5tb3ZlID0gdGhpcy5tb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcclxuICAgIHRoaXMucHJldlBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy5mcmljdGlvbiA9IC45OCAvLzAuOSB3YXMgdGhlIGZpcnN0IHZhbHVlXHJcbiAgfVxyXG5cclxuICBkcmF3KGN0eCkge1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKFxyXG4gICAgICB0aGlzLnBvc1swXSxcclxuICAgICAgdGhpcy5wb3NbMV0sXHJcbiAgICAgIHRoaXMucmFkaXVzLFxyXG4gICAgICAwLFxyXG4gICAgICAyICogTWF0aC5QSSxcclxuICAgICAgZmFsc2VcclxuICAgICk7XHJcblxyXG4gICAgY3R4LmZpbGwoKTtcclxuICB9XHJcblxyXG4gIG1vdmUoKSB7XHJcbiAgICB0aGlzLnByZXZQb3MgPSB0aGlzLnBvcztcclxuICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdICsgdGhpcy52ZWxbMF0sIHRoaXMucG9zWzFdICsgdGhpcy52ZWxbMV1dO1xyXG4gICAgdGhpcy52ZWwgPSBbdGhpcy52ZWxbMF0qdGhpcy5mcmljdGlvbiwgdGhpcy52ZWxbMV0qdGhpcy5mcmljdGlvbl07XHJcbiAgICBpZiAoTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMudmVsWzBdLCAyKSArIE1hdGgucG93KHRoaXMudmVsWzFdLCAyKSkgPCAuMSkge1xyXG4gICAgICB0aGlzLnZlbFswXSA9IDA7XHJcbiAgICAgIHRoaXMudmVsWzFdID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy52ZWxbMF0gPT09IDAgJiYgdGhpcy52ZWxbMV0gPT09IDA7XHJcbiAgfVxyXG5cclxuICBoaXRCb3VuZGFyeShjYW52YXNFbCkge1xyXG4gICAgaWYgKHRoaXMucG9zWzBdICsgdGhpcy52ZWxbMF0gPiBjYW52YXNFbC53aWR0aCB8fCB0aGlzLnBvc1swXSArIHRoaXMudmVsWzBdIDwgMCkge1xyXG4gICAgICB0aGlzLm1ha2VCb3VuY2VTb3VuZCgpO1xyXG4gICAgICB0aGlzLnZlbFswXSA9IC10aGlzLnZlbFswXTtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucG9zWzFdICsgdGhpcy52ZWxbMV0gPiBjYW52YXNFbC5oZWlnaHQgfHwgdGhpcy5wb3NbMV0gKyB0aGlzLnZlbFsxXSA8IDApIHtcclxuICAgICAgdGhpcy5tYWtlQm91bmNlU291bmQoKTtcclxuICAgICAgdGhpcy52ZWxbMV0gPSAtdGhpcy52ZWxbMV07XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbGxpc2lvbkxlZnQob2IpIHtcclxuXHJcbiAgICBsZXQgc2xvcGUgPSB0aGlzLnZlbFsxXS90aGlzLnZlbFswXTtcclxuXHJcbiAgICBpZiAob2IuYW5nbGUgPT09IDApIHtcclxuICAgICAgbGV0IHdhbGxEaW0gPSBvYi5wb3NbMF0gLSBvYi53aWR0aC8yO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSB0aGlzLnByZXZQb3NbMV0gKyBzbG9wZSAqICh3YWxsRGltIC0gdGhpcy5wcmV2UG9zWzBdKTtcclxuICAgICAgbGV0IHlMb3dlckJvdW5kID0gb2IucG9zWzFdIC0gb2IuaGVpZ2h0LzI7XHJcbiAgICAgIGxldCB5VXBwZXJCb3VuZCA9IG9iLnBvc1sxXSArIG9iLmhlaWdodC8yO1xyXG4gICAgICBpZiAodGhpcy5wcmV2UG9zWzBdIDwgd2FsbERpbSkge1xyXG4gICAgICAgIGlmICh0aGlzLnBvc1swXSA+IHdhbGxEaW0pIHtcclxuICAgICAgICAgIGlmKGludGVyc2VjdGlvblBUID4geUxvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB5VXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc1swXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICAgIHRoaXMudmVsWzBdID0gLXRoaXMudmVsWzBdXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHdhbGxTbG9wZSA9IChvYi55dG9wTGVmdFB0IC0gb2IueWJvdHRvbUxlZnRQdCkgLyAob2IueHRvcExlZnRQdCAtIG9iLnhib3R0b21MZWZ0UHQpO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWCA9ICgoc2xvcGUqdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSkgLSAod2FsbFNsb3BlKm9iLnhib3R0b21MZWZ0UHQgLSBvYi55Ym90dG9tTGVmdFB0KSkvKHNsb3BlIC0gd2FsbFNsb3BlKTtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblkgPSBzbG9wZSppbnRlcnNlY3Rpb25YIC0gKHNsb3BlKnRoaXMucG9zWzBdIC0gdGhpcy5wb3NbMV0pO1xyXG4gICAgICBsZXQgeFByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcclxuICAgICAgbGV0IHhDdXJyRGlmZiA9IHRoaXMucG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcclxuICAgICAgbGV0IHlQcmV2RGlmZiA9IHRoaXMucHJldlBvc1sxXSAtIGludGVyc2VjdGlvblk7XHJcbiAgICAgIGxldCB5Q3VyckRpZmYgPSB0aGlzLnBvc1sxXSAtIGludGVyc2VjdGlvblk7XHJcblxyXG4gICAgICAvLyBpZiAoaW50ZXJzZWN0aW9uWSA+IG9iLnl0b3BMZWZ0UHQgJiYgaW50ZXJzZWN0aW9uWSA8IG9iLnlib3R0b21MZWZ0UHQgJiYgeFByZXZEaWZmKnhDdXJyRGlmZiA8PSAwICYmIHlQcmV2RGlmZip5Q3VyckRpZmYgPD0gMCkge1xyXG4gICAgICBpZiAoaW50ZXJzZWN0aW9uWSA+IG9iLnl0b3BMZWZ0UHQgJiYgaW50ZXJzZWN0aW9uWSA8IG9iLnlib3R0b21MZWZ0UHQgJiYgeFByZXZEaWZmKnhDdXJyRGlmZiA8PSAwICYmIHlQcmV2RGlmZip5Q3VyckRpZmYgPD0gMCkge1xyXG4gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIGxldCB4QW5nbGUgPSAxODAgLSAyKm9iLmFuZ2xlO1xyXG4gICAgICAgIGxldCB4Q29tcDEgPSB0aGlzLnZlbFswXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcclxuICAgICAgICBsZXQgeENvbXAyID0gdGhpcy52ZWxbMF0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeEFuZ2xlKSk7XHJcblxyXG4gICAgICAgIGxldCB5QW5nbGUgPSA5MCAtIDIqb2IuYW5nbGU7XHJcbiAgICAgICAgbGV0IHlDb21wMSA9IHRoaXMudmVsWzFdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xyXG4gICAgICAgIGxldCB5Q29tcDIgPSB0aGlzLnZlbFsxXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZWxbMF0gPSB4Q29tcDEgKyB5Q29tcDE7XHJcbiAgICAgICAgdGhpcy52ZWxbMV0gPSB4Q29tcDIgKyB5Q29tcDI7XHJcbiAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25YICsgdGhpcy52ZWxbMF0qMC4wMTtcclxuICAgICAgICB0aGlzLnBvc1sxXSA9IGludGVyc2VjdGlvblkgKyB0aGlzLnZlbFsxXSowLjAxO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gIFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbGxpc2lvblJpZ2h0KG9iKSB7XHJcblxyXG4gICAgbGV0IHNsb3BlID0gdGhpcy52ZWxbMV0vdGhpcy52ZWxbMF07XHJcblxyXG4gICAgaWYgKG9iLmFuZ2xlID09PSAwKSB7XHJcbiAgICAgIGxldCB3YWxsRGltID0gb2IucG9zWzBdICsgb2Iud2lkdGgvMjtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzFdICsgc2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1swXSk7XHJcbiAgICAgIGxldCB5TG93ZXJCb3VuZCA9IG9iLnBvc1sxXSAtIG9iLmhlaWdodC8yO1xyXG4gICAgICBsZXQgeVVwcGVyQm91bmQgPSBvYi5wb3NbMV0gKyBvYi5oZWlnaHQvMjtcclxuICAgICAgaWYgKHRoaXMucHJldlBvc1swXSA+IHdhbGxEaW0pIHtcclxuICAgICAgICBpZiAodGhpcy5wb3NbMF0gPCB3YWxsRGltKSB7XHJcbiAgICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHlMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeVVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NbMF0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgICB0aGlzLnBvc1sxXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgICB0aGlzLnZlbFswXSA9IC10aGlzLnZlbFswXVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHdhbGxTbG9wZSA9IChvYi55dG9wUmlnaHRQdCAtIG9iLnlib3R0b21SaWdodFB0KSAvIChvYi54dG9wUmlnaHRQdCAtIG9iLnhib3R0b21SaWdodFB0KTtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblggPSAoKHNsb3BlKnRoaXMucG9zWzBdIC0gdGhpcy5wb3NbMV0pIC0gKHdhbGxTbG9wZSpvYi54Ym90dG9tUmlnaHRQdCAtIG9iLnlib3R0b21SaWdodFB0KSkvKHNsb3BlIC0gd2FsbFNsb3BlKTtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblkgPSBzbG9wZSppbnRlcnNlY3Rpb25YIC0gKHNsb3BlKnRoaXMucG9zWzBdIC0gdGhpcy5wb3NbMV0pO1xyXG4gICAgICBsZXQgeFByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcclxuICAgICAgbGV0IHhDdXJyRGlmZiA9IHRoaXMucG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcclxuXHJcblxyXG4gICAgICAvLyBpZiAoaW50ZXJzZWN0aW9uWSA+IG9iLnl0b3BSaWdodFB0ICYmIGludGVyc2VjdGlvblkgPCBvYi55Ym90dG9tUmlnaHRQdCAmJiB0aGlzLnByZXZQb3NbMF0gPiBpbnRlcnNlY3Rpb25YICYmIHRoaXMucG9zWzBdIDwgaW50ZXJzZWN0aW9uWCkge1xyXG4gICAgICBpZiAoaW50ZXJzZWN0aW9uWSA+IG9iLnl0b3BSaWdodFB0ICYmIGludGVyc2VjdGlvblkgPCBvYi55Ym90dG9tUmlnaHRQdCAmJiB4UHJldkRpZmYqeEN1cnJEaWZmIDw9IDApIHtcclxuICAgICAgICBsZXQgeVByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcclxuICAgICAgICBsZXQgeUN1cnJEaWZmID0gdGhpcy5wb3NbMV0gLSBpbnRlcnNlY3Rpb25ZO1xyXG4gICAgICAgIGlmKHlQcmV2RGlmZip5Q3VyckRpZmYgPD0gMCkge1xyXG4gICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICBsZXQgeEFuZ2xlID0gMTgwIC0gMipvYi5hbmdsZTtcclxuICAgICAgICAgIGxldCB4Q29tcDEgPSB0aGlzLnZlbFswXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcclxuICAgICAgICAgIGxldCB4Q29tcDIgPSB0aGlzLnZlbFswXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcclxuXHJcbiAgICAgICAgICBsZXQgeUFuZ2xlID0gOTAgLSAyKm9iLmFuZ2xlO1xyXG4gICAgICAgICAgbGV0IHlDb21wMSA9IHRoaXMudmVsWzFdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xyXG4gICAgICAgICAgbGV0IHlDb21wMiA9IHRoaXMudmVsWzFdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xyXG5cclxuICAgICAgICAgIHRoaXMudmVsWzBdID0geENvbXAxICsgeUNvbXAxO1xyXG4gICAgICAgICAgdGhpcy52ZWxbMV0gPSB4Q29tcDIgKyB5Q29tcDI7XHJcbiAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblggKyB0aGlzLnZlbFswXSowLjAxO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25ZICsgdGhpcy52ZWxbMV0qMC4wMTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25Ub3Aob2IpIHtcclxuXHJcbiAgICBpZiAob2IuYW5nbGUgPT09IDApIHtcclxuICAgICAgbGV0IGludlNsb3BlID0gdGhpcy52ZWxbMF0vdGhpcy52ZWxbMV07XHJcbiAgICAgIGxldCB3YWxsRGltID0gb2IucG9zWzFdIC0gb2IuaGVpZ2h0LzI7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IHRoaXMucHJldlBvc1swXSArIGludlNsb3BlICogKHdhbGxEaW0gLSB0aGlzLnByZXZQb3NbMV0pO1xyXG4gICAgICBsZXQgeExvd2VyQm91bmQgPSBvYi5wb3NbMF0gLSBvYi53aWR0aC8yO1xyXG4gICAgICBsZXQgeFVwcGVyQm91bmQgPSBvYi5wb3NbMF0gKyBvYi53aWR0aC8yO1xyXG4gICAgICBpZiAodGhpcy5wcmV2UG9zWzFdIDwgd2FsbERpbSkge1xyXG4gICAgICAgIGlmICh0aGlzLnBvc1sxXSA+IHdhbGxEaW0pIHtcclxuICAgICAgICAgIGlmKGludGVyc2VjdGlvblBUID4geExvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB4VXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgICB0aGlzLnBvc1sxXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICAgIHRoaXMudmVsWzFdID0gLXRoaXMudmVsWzFdXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgc2xvcGUgPSB0aGlzLnZlbFsxXS90aGlzLnZlbFswXVxyXG4gICAgICBsZXQgd2FsbFNsb3BlID0gKG9iLnl0b3BSaWdodFB0IC0gb2IueXRvcExlZnRQdCkgLyAob2IueHRvcFJpZ2h0UHQgLSBvYi54dG9wTGVmdFB0KTtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblggPSAoKHNsb3BlKnRoaXMucG9zWzBdIC0gdGhpcy5wb3NbMV0pIC0gKHdhbGxTbG9wZSpvYi54dG9wTGVmdFB0IC0gb2IueXRvcExlZnRQdCkpLyhzbG9wZSAtIHdhbGxTbG9wZSk7XHJcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25ZID0gc2xvcGUqaW50ZXJzZWN0aW9uWCAtIChzbG9wZSp0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKTtcclxuICAgICAgbGV0IHhQcmV2RGlmZiA9IHRoaXMucHJldlBvc1swXSAtIGludGVyc2VjdGlvblg7XHJcbiAgICAgIGxldCB4Q3VyckRpZmYgPSB0aGlzLnBvc1swXSAtIGludGVyc2VjdGlvblg7XHJcblxyXG4gICAgICBpZiAoaW50ZXJzZWN0aW9uWSA+IG9iLnl0b3BSaWdodFB0ICYmIGludGVyc2VjdGlvblkgPCBvYi55dG9wTGVmdFB0ICYmIHhQcmV2RGlmZip4Q3VyckRpZmYgPD0gMCkge1xyXG4gICAgICAgIGxldCB5UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMV0gLSBpbnRlcnNlY3Rpb25ZO1xyXG4gICAgICAgIGxldCB5Q3VyckRpZmYgPSB0aGlzLnBvc1sxXSAtIGludGVyc2VjdGlvblk7XHJcbiAgICAgICAgaWYoeVByZXZEaWZmKnlDdXJyRGlmZiA8PSAwKSB7XHJcbiAgICAgICAgICBsZXQgeEFuZ2xlID0gLTIqb2IuYW5nbGU7XHJcbiAgICAgICAgICBsZXQgeENvbXAxID0gdGhpcy52ZWxbMF0gKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnMoeEFuZ2xlKSk7XHJcbiAgICAgICAgICBsZXQgeENvbXAyID0gdGhpcy52ZWxbMF0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeEFuZ2xlKSk7XHJcblxyXG4gICAgICAgICAgbGV0IHlBbmdsZSA9IDI3MCAtIDIqb2IuYW5nbGU7XHJcbiAgICAgICAgICBsZXQgeUNvbXAxID0gdGhpcy52ZWxbMV0gKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XHJcbiAgICAgICAgICBsZXQgeUNvbXAyID0gdGhpcy52ZWxbMV0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XHJcblxyXG4gICAgICAgICAgdGhpcy52ZWxbMF0gPSB4Q29tcDEgKyB5Q29tcDE7XHJcbiAgICAgICAgICB0aGlzLnZlbFsxXSA9IHhDb21wMiArIHlDb21wMjtcclxuICAgICAgICAgIHRoaXMucG9zWzBdID0gaW50ZXJzZWN0aW9uWCArIHRoaXMudmVsWzBdKjAuMDE7XHJcbiAgICAgICAgICB0aGlzLnBvc1sxXSA9IGludGVyc2VjdGlvblkgKyB0aGlzLnZlbFsxXSowLjAxO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbGxpc2lvbkJvdChvYikge1xyXG5cclxuICAgIGlmIChvYi5hbmdsZSA9PT0gMCkge1xyXG4gICAgICBsZXQgaW52U2xvcGUgPSB0aGlzLnZlbFswXS90aGlzLnZlbFsxXTtcclxuICAgICAgbGV0IHdhbGxEaW0gPSBvYi5wb3NbMV0gKyBvYi5oZWlnaHQvMjtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzBdICsgaW52U2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1sxXSk7XHJcbiAgICAgIGxldCB4TG93ZXJCb3VuZCA9IG9iLnBvc1swXSAtIG9iLndpZHRoLzI7XHJcbiAgICAgIGxldCB4VXBwZXJCb3VuZCA9IG9iLnBvc1swXSArIG9iLndpZHRoLzI7XHJcbiAgICAgIGlmICh0aGlzLnByZXZQb3NbMV0gPiB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9zWzFdIDwgd2FsbERpbSkge1xyXG4gICAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB4TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHhVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zWzBdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICAgIHRoaXMucG9zWzFdID0gd2FsbERpbTtcclxuICAgICAgICAgICAgdGhpcy52ZWxbMV0gPSAtdGhpcy52ZWxbMV1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBzbG9wZSA9IHRoaXMudmVsWzFdL3RoaXMudmVsWzBdXHJcbiAgICAgIGxldCB3YWxsU2xvcGUgPSAob2IueWJvdHRvbVJpZ2h0UHQgLSBvYi55Ym90dG9tTGVmdFB0KSAvIChvYi54Ym90dG9tUmlnaHRQdCAtIG9iLnhib3R0b21MZWZ0UHQpO1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWCA9ICgoc2xvcGUqdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSkgLSAod2FsbFNsb3BlKm9iLnhib3R0b21MZWZ0UHQgLSBvYi55Ym90dG9tTGVmdFB0KSkvKHNsb3BlIC0gd2FsbFNsb3BlKTtcclxuICAgICAgbGV0IGludGVyc2VjdGlvblkgPSBzbG9wZSppbnRlcnNlY3Rpb25YIC0gKHNsb3BlKnRoaXMucG9zWzBdIC0gdGhpcy5wb3NbMV0pO1xyXG4gICAgICBsZXQgeFByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcclxuICAgICAgbGV0IHhDdXJyRGlmZiA9IHRoaXMucG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcclxuXHJcbiAgICAgIGlmIChpbnRlcnNlY3Rpb25ZID4gb2IueWJvdHRvbVJpZ2h0UHQgJiYgaW50ZXJzZWN0aW9uWSA8IG9iLnlib3R0b21MZWZ0UHQgJiYgeFByZXZEaWZmKnhDdXJyRGlmZiA8PSAwKSB7XHJcbiAgICAgICAgbGV0IHlQcmV2RGlmZiA9IHRoaXMucHJldlBvc1sxXSAtIGludGVyc2VjdGlvblk7XHJcbiAgICAgICAgbGV0IHlDdXJyRGlmZiA9IHRoaXMucG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcclxuICAgICAgICBpZih5UHJldkRpZmYqeUN1cnJEaWZmIDw9IDApIHtcclxuICAgICAgICAgIGxldCB4QW5nbGUgPSAtMipvYi5hbmdsZTtcclxuICAgICAgICAgIGxldCB4Q29tcDEgPSB0aGlzLnZlbFswXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcclxuICAgICAgICAgIGxldCB4Q29tcDIgPSB0aGlzLnZlbFswXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcclxuXHJcbiAgICAgICAgICBsZXQgeUFuZ2xlID0gMjcwIC0gMipvYi5hbmdsZTtcclxuICAgICAgICAgIGxldCB5Q29tcDEgPSB0aGlzLnZlbFsxXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcclxuICAgICAgICAgIGxldCB5Q29tcDIgPSB0aGlzLnZlbFsxXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcclxuXHJcbiAgICAgICAgICB0aGlzLnZlbFswXSA9IHhDb21wMSArIHlDb21wMTtcclxuICAgICAgICAgIHRoaXMudmVsWzFdID0geENvbXAyICsgeUNvbXAyO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25YICsgdGhpcy52ZWxbMF0qMC4wMTtcclxuICAgICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uWSArIHRoaXMudmVsWzFdKjAuMDE7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tDb2xsaXNpb25zKG9ic3RhY2xlKSB7XHJcbiAgICBpZiAodGhpcy5jb2xsaXNpb25MZWZ0KG9ic3RhY2xlKSB8fCB0aGlzLmNvbGxpc2lvblJpZ2h0KG9ic3RhY2xlKSB8fCB0aGlzLmNvbGxpc2lvblRvcChvYnN0YWNsZSkgfHwgdGhpcy5jb2xsaXNpb25Cb3Qob2JzdGFjbGUpKSB7XHJcbiAgICAgIHRoaXMubWFrZUJvdW5jZVNvdW5kKCk7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG1ha2VCb3VuY2VTb3VuZCgpIHtcclxuICAgIGxldCBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXVkaW8tcGxheWVyXCIpXHJcbiAgICBhdWRpby5zcmMgPSBcIi4vYXNzZXRzL3NvdW5kL2JvdW5jZS53YXZcIjtcclxuICAgIGF1ZGlvLnBsYXkoKTtcclxuICB9XHJcblxyXG4gIGdldFJhZGlhbnMoYW5nbGUpIHtcclxuICAgIHJldHVybiBhbmdsZSAqIE1hdGguUEkvMTgwXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmluZ09iamVjdDsiLCJjbGFzcyBPYnN0YWNsZSB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XHJcbiAgICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aDtcclxuICAgIHRoaXMuYW5nbGUgPSBvcHRpb25zLmFuZ2xlO1xyXG4gICAgdGhpcy5jb2xvciA9IG9wdGlvbnMuY29sb3I7XHJcbiAgICB0aGlzLnhtaWRMZWZ0UHQgPSB0aGlzLnBvc1swXSAtIHRoaXMud2lkdGgvMipNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy55bWlkTGVmdFB0ID0gdGhpcy5wb3NbMV0gKyB0aGlzLndpZHRoLzIqTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueGJvdHRvbUxlZnRQdCA9IHRoaXMueG1pZExlZnRQdCArIHRoaXMuaGVpZ2h0LzIqTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueWJvdHRvbUxlZnRQdCA9IHRoaXMueW1pZExlZnRQdCArIHRoaXMuaGVpZ2h0LzIqTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueHRvcExlZnRQdCA9IHRoaXMueG1pZExlZnRQdCAtIHRoaXMuaGVpZ2h0LzIqTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueXRvcExlZnRQdCA9IHRoaXMueW1pZExlZnRQdCAtIHRoaXMuaGVpZ2h0LzIqTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueG1pZFJpZ2h0UHQgPSB0aGlzLnBvc1swXSArIHRoaXMud2lkdGgvMipNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy55bWlkUmlnaHRQdCA9IHRoaXMucG9zWzFdIC0gdGhpcy53aWR0aC8yKk1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnhib3R0b21SaWdodFB0ID0gdGhpcy54bWlkUmlnaHRQdCArIHRoaXMuaGVpZ2h0LzIqTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICAgIHRoaXMueWJvdHRvbVJpZ2h0UHQgPSB0aGlzLnltaWRSaWdodFB0ICsgdGhpcy5oZWlnaHQvMipNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xyXG4gICAgdGhpcy54dG9wUmlnaHRQdCA9IHRoaXMueG1pZFJpZ2h0UHQgLSB0aGlzLmhlaWdodC8yKk1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XHJcbiAgICB0aGlzLnl0b3BSaWdodFB0ID0gdGhpcy55bWlkUmlnaHRQdCAtIHRoaXMuaGVpZ2h0LzIqTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdKTtcclxuICAgIGN0eC5yb3RhdGUoLXRoaXMuZ2V0UmFkaWFucygpKTtcclxuICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zWzBdLCAtdGhpcy5wb3NbMV0pO1xyXG4gICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zWzBdIC0gdGhpcy53aWR0aC8yLCB0aGlzLnBvc1sxXSAtIHRoaXMuaGVpZ2h0LzIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdKTtcclxuICAgIGN0eC5yb3RhdGUodGhpcy5nZXRSYWRpYW5zKCkpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSgtdGhpcy5wb3NbMF0sIC10aGlzLnBvc1sxXSk7XHJcbiAgfVxyXG5cclxuICBnZXRSYWRpYW5zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYW5nbGUgKiBNYXRoLlBJLzE4MFxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYnN0YWNsZTsiLCJjb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKCcuL21vdmluZ19vYmplY3QnKTtcclxuXHJcbmNsYXNzIFBsYXlCYWxsIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKVxyXG4gICAgdGhpcy5kZXRlcm1pbmVNb3ZlbWVudCA9IHRoaXMuZGV0ZXJtaW5lTW92ZW1lbnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMubWluQ2xpY2tEaXN0ID0gOFxyXG4gIH1cclxuXHJcbiAgZGV0ZXJtaW5lTW92ZW1lbnQoeENsaWNrLCB5Q2xpY2spIHtcclxuICAgIGxldCB4RGlmZiA9IHRoaXMucG9zWzBdIC0geENsaWNrO1xyXG4gICAgbGV0IHlEaWZmID0gdGhpcy5wb3NbMV0gLSB5Q2xpY2s7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKHhEaWZmKSA8IHRoaXMubWluQ2xpY2tEaXN0KSB7XHJcbiAgICAgIHhEaWZmID0geERpZmYvTWF0aC5hYnMoeERpZmYpKnRoaXMubWluQ2xpY2tEaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChNYXRoLmFicyh5RGlmZikgPCB0aGlzLm1pbkNsaWNrRGlzdCkge1xyXG4gICAgICB5RGlmZiA9IHlEaWZmL01hdGguYWJzKHlEaWZmKSp0aGlzLm1pbkNsaWNrRGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbWFnID0gMS8oTWF0aC5wb3coeERpZmYsIDIpICsgTWF0aC5wb3coeURpZmYsIDIpKTtcclxuICAgIGxldCB1bml0RGlyID0gW3hEaWZmLCB5RGlmZl07XHJcbiAgICB0aGlzLnZlbFswXSA9IHVuaXREaXJbMF0gKiBtYWcgKiA4NTA7XHJcbiAgICB0aGlzLnZlbFsxXSA9IHVuaXREaXJbMV0gKiBtYWcgKiA4NTA7XHJcbiAgfVxyXG5cclxuICBnZXREaXN0YW5jZSh0YXJnZXQpIHtcclxuICAgIGxldCB4RGlmZiA9IE1hdGguYWJzKHRoaXMucG9zWzBdIC0gdGFyZ2V0LnBvc1swXSk7XHJcbiAgICBsZXQgeURpZmYgPSBNYXRoLmFicyh0aGlzLnBvc1sxXSAtIHRhcmdldC5wb3NbMV0pO1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh4RGlmZip4RGlmZiArIHlEaWZmKnlEaWZmKS50b0ZpeGVkKDMpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5QmFsbDsiLCJjb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKFwiLi9tb3Zpbmdfb2JqZWN0XCIpO1xyXG5cclxuY2xhc3MgU3BhcmsgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIl07XHJcbiAgICB0aGlzXHJcbiAgICBzZXRJbnRlcnZhbCh0aGlzLmNoYW5nZUNvbG9yLCA1MDApO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQ29sb3IoKSB7XHJcbiAgICBsZXQgY29sb3JTdHIgPSBcIiNcIjtcclxuXHJcbiAgICB3aGlsZSAoY29sb3JTdHIubGVuZ3RoIDwgNikge1xyXG4gICAgICBjb2xvclN0ciArPSB0aGlzLmNvbG9yU2V0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLmNvbG9yU2V0Lmxlbmd0aCldO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29sb3IgPSBjb2xvclN0cjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3Bhcms7IiwiY2xhc3MgVGFyZ2V0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy52ZWwgPSBbMCwgMF07XHJcbiAgICB0aGlzLnJhZGl1cyA9IDg7XHJcbiAgICB0aGlzLmNvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIHRoaXMucG9zWzBdLFxyXG4gICAgICB0aGlzLnBvc1sxXSxcclxuICAgICAgdGhpcy5yYWRpdXMsXHJcbiAgICAgIDAsXHJcbiAgICAgIDIgKiBNYXRoLlBJLFxyXG4gICAgICBmYWxzZVxyXG4gICAgKTtcclxuXHJcbiAgICBjdHguZmlsbCgpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYXJnZXQ7Il0sInNvdXJjZVJvb3QiOiIifQ==