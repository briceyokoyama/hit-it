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
      { pos: [200, 300], height: 300, width: 20, angle: 10, color: "#F739A3"}
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

  collisionLeft(obstacle) {
    let slope = this.vel[1]/this.vel[0];
    let xmidPoint = obstacle.pos[0] - obstacle.width / 2 * Math.cos(obstacle.angle);
    let ymidPoint = obstacle.pos[1] - obstacle.width / 2 * Math.sin(obstacle.angle);
    let xbottomCorner = xmidPoint + obstacle.height / 2 * Math.sin(obstacle.angle);
    let ybottomCorner = ymidPoint + obstacle.height / 2 * Math.cos(obstacle.angle);
    let xtopCorner = xmidPoint - obstacle.height / 2 * Math.sin(obstacle.angle);
    let ytopCorner = ymidPoint - obstacle.height / 2 * Math.cos(obstacle.angle);

    let intersectionPT = this.prevPos[1] + slope * (wallDim - this.prevPos[0]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmluZ19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5X2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NwYXJrLmpzIiwid2VicGFjazovLy8uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3RDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsK0JBQVM7O0FBRS9CO0FBQ0E7QUFDQSw0QkFBNEIseURBQXlEO0FBQ3JGLDhCQUE4QixpQkFBaUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLDRCQUE0QixZQUFZO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0I7Ozs7Ozs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsaUJBQWlCLG1CQUFPLENBQUMsdUNBQWE7O0FBRXRDOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7Ozs7O0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQjs7Ozs7Ozs7Ozs7QUNyQkEscUJBQXFCLG1CQUFPLENBQUMsK0NBQWlCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEI7Ozs7Ozs7Ozs7O0FDbENBLHFCQUFxQixtQkFBTyxDQUFDLCtDQUFpQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1Qjs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3QiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNvbnN0IFBsYXlCYWxsID0gcmVxdWlyZShcIi4vcGxheV9iYWxsXCIpO1xyXG5jb25zdCBUYXJnZXQgPSByZXF1aXJlKFwiLi90YXJnZXRcIik7XHJcbmNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZShcIi4vb2JzdGFjbGVcIik7XHJcbmNvbnN0IFNwYXJrID0gcmVxdWlyZShcIi4vc3BhcmtcIik7XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBiID0gbmV3IFBsYXlCYWxsKHsgcG9zOiBbMzAsIDMwXSwgdmVsOiBbMCwgMF0sIHJhZGl1czogNSwgY29sb3I6IFwiIzU1YWFjY1wifSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IG5ldyBUYXJnZXQoeyBwb3M6IFszMDAsIDMwMF19KVxyXG4gICAgdGhpcy5vYnN0YWNsZXMgPSBbXTtcclxuICAgIHRoaXMuc3BhcmtzID0gW107XHJcbiAgICB0aGlzLmRpc3QgPSB0aGlzLnBiLmdldERpc3RhbmNlKHRoaXMudGFyZ2V0KTtcclxuICAgIHRoaXMuY2xpY2tzID0gMDtcclxuXHJcbiAgICB0aGlzLmFkZE9ic3RhY2xlcygpO1xyXG4gIH1cclxuXHJcbiAgYWRkT2JzdGFjbGVzKCkge1xyXG4gICAgY29uc3Qgb2JzMSA9IG5ldyBPYnN0YWNsZShcclxuICAgICAgeyBwb3M6IFs0MDAsIDMwMF0sIGhlaWdodDogMzAwLCB3aWR0aDogMjAsIGFuZ2xlOiAwLCBjb2xvcjogXCIjRjczOUEzXCJ9XHJcbiAgICApO1xyXG4gIFxyXG4gICAgY29uc3Qgb2JzMiA9IG5ldyBPYnN0YWNsZShcclxuICAgICAgeyBwb3M6IFsyMDAsIDMwMF0sIGhlaWdodDogMzAwLCB3aWR0aDogMjAsIGFuZ2xlOiAxMCwgY29sb3I6IFwiI0Y3MzlBM1wifVxyXG4gICAgKTtcclxuICBcclxuICAgIHRoaXMub2JzdGFjbGVzLnB1c2gob2JzMSk7XHJcbiAgICB0aGlzLm9ic3RhY2xlcy5wdXNoKG9iczIpO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNsaWNrcyArPSAxO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjYW52YXNFbCwgY3R4KSB7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiXHJcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzRWwud2lkdGgsIGNhbnZhc0VsLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5vYnN0YWNsZXMuZm9yRWFjaChvYiA9PiB7XHJcbiAgICAgIG9iLmRyYXcoY3R4KTtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5zcGFya3MuZm9yRWFjaChzcGFyayA9PiB7XHJcbiAgICAgIHNwYXJrLmRyYXcoY3R4KTtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy50YXJnZXQuZHJhdyhjdHgpO1xyXG4gICAgdGhpcy5wYi5kcmF3KGN0eCk7XHJcbiAgICBjdHgudGV4dEFsaWduID0gXCJlbmRcIjtcclxuICAgIGN0eC5mb250ID0gJzE4cHggT3JiaXRyb24nO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgY3R4LmZpbGxUZXh0KGBkaXN0OiAke3RoaXMuZGlzdH1gLCA1ODUsIDI1KTtcclxuICAgIGN0eC5maWxsVGV4dChgY2xpY2tzOiAke3RoaXMuY2xpY2tzfWAsIDU4NSwgNjApO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDb2xsaXNpb25zKGNhbnZhc0VsLCBjdHgpIHtcclxuICAgIC8vIHRoaXMuc3BhcmtzLnB1c2goLi4udGhpcy5wYi5oaXRCb3VuZGFyeShjYW52YXNFbCkpO1xyXG4gICAgdGhpcy5wYi5oaXRCb3VuZGFyeShjYW52YXNFbCk7XHJcblxyXG4gICAgdGhpcy5vYnN0YWNsZXMuZm9yRWFjaChvYiA9PiB7XHJcbiAgICAgIC8vIHRoaXMuc3BhcmtzLnB1c2goLi4udGhpcy5wYi5jaGVja0NvbGxpc2lvbnMob2IpKTtcclxuICAgICAgdGhpcy5wYi5jaGVja0NvbGxpc2lvbnMob2IpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNhbGNEaXN0KCkge1xyXG4gICAgdGhpcy5kaXN0ID0gdGhpcy5wYi5nZXREaXN0YW5jZSh0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY2xhc3MgR2FtZVZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCwgY2FudmFzRWwpIHtcclxuICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuY2FudmFzRWwgPSBjYW52YXNFbDtcclxuICAgIHRoaXMuZG9TdHVmZiA9IHRoaXMuZG9TdHVmZi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5kb1N0dWZmKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDbGljayhlKSB7XHJcbiAgICB0aGlzLmdhbWUuYWRkQ2xpY2soKTtcclxuICAgIGxldCByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICB0aGlzLmdhbWUucGIuZGV0ZXJtaW5lTW92ZW1lbnQoZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBlLmNsaWVudFkgLSByZWN0LnRvcCk7XHJcbiAgICB0aGlzLmNhbnZhc0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XHJcbiAgfVxyXG5cclxuICBkb1N0dWZmKCkge1xyXG4gICAgdGhpcy5nYW1lLmNoZWNrQ29sbGlzaW9ucyh0aGlzLmNhbnZhc0VsLCB0aGlzLmN0eCk7XHJcbiAgICB0aGlzLmdhbWUuY2FsY0Rpc3QoKTtcclxuICAgIHRoaXMuZ2FtZS5kcmF3KHRoaXMuY2FudmFzRWwsIHRoaXMuY3R4KTtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuZ2FtZS5wYi5tb3ZlKCkpIHtcclxuICAgICAgdGhpcy5jYW52YXNFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5kb1N0dWZmKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZVZpZXc7IiwiLy8gY29uc3QgUGxheUJhbGwgPSByZXF1aXJlKFwiLi9wbGF5X2JhbGxcIik7XHJcbi8vIGNvbnN0IFRhcmdldCA9IHJlcXVpcmUoXCIuL3RhcmdldFwiKTtcclxuLy8gY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKFwiLi9vYnN0YWNsZVwiKTtcclxuY29uc3QgR2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XHJcbmNvbnN0IEdhbWVWaWV3ID0gcmVxdWlyZShcIi4vZ2FtZV92aWV3XCIpO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG5cclxuICBsZXQgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWJ1dHRvblwiKTtcclxuICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZSk7XHJcbn0pXHJcblxyXG5jb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FudmFzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImNhbnZhc1wiKVswXVxyXG5cclxuICBsZXQgc3RhcnRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1tZW51XCIpO1xyXG4gIHN0YXJ0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgY2FudmFzRWwuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgY2FudmFzRWwuaGVpZ2h0ID0gNjAwO1xyXG4gIGNhbnZhc0VsLndpZHRoID0gNjAwO1xyXG4gIGxldCBjdHggPSBjYW52YXNFbC5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcclxuICBuZXcgR2FtZVZpZXcoZ2FtZSwgY3R4LCBjYW52YXNFbCkuc3RhcnQoKTtcclxuXHJcbn0iLCJjbGFzcyBNb3ZpbmdPYmplY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLnZlbCA9IG9wdGlvbnMudmVsO1xyXG4gICAgdGhpcy5yYWRpdXMgPSBvcHRpb25zLnJhZGl1cztcclxuICAgIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yO1xyXG4gICAgdGhpcy5tb3ZlID0gdGhpcy5tb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcclxuICAgIHRoaXMucHJldlBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy5mcmljdGlvbiA9IC45OCAvLzAuOSB3YXMgdGhlIGZpcnN0IHZhbHVlXHJcbiAgfVxyXG5cclxuICBkcmF3KGN0eCkge1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKFxyXG4gICAgICB0aGlzLnBvc1swXSxcclxuICAgICAgdGhpcy5wb3NbMV0sXHJcbiAgICAgIHRoaXMucmFkaXVzLFxyXG4gICAgICAwLFxyXG4gICAgICAyICogTWF0aC5QSSxcclxuICAgICAgZmFsc2VcclxuICAgICk7XHJcblxyXG4gICAgY3R4LmZpbGwoKTtcclxuICB9XHJcblxyXG4gIG1vdmUoKSB7XHJcbiAgICB0aGlzLnByZXZQb3MgPSB0aGlzLnBvcztcclxuICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdICsgdGhpcy52ZWxbMF0sIHRoaXMucG9zWzFdICsgdGhpcy52ZWxbMV1dO1xyXG4gICAgdGhpcy52ZWwgPSBbdGhpcy52ZWxbMF0qdGhpcy5mcmljdGlvbiwgdGhpcy52ZWxbMV0qdGhpcy5mcmljdGlvbl07XHJcbiAgICBpZiAoTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMudmVsWzBdLCAyKSArIE1hdGgucG93KHRoaXMudmVsWzFdLCAyKSkgPCAuMSkge1xyXG4gICAgICB0aGlzLnZlbFswXSA9IDA7XHJcbiAgICAgIHRoaXMudmVsWzFdID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy52ZWxbMF0gPT09IDAgJiYgdGhpcy52ZWxbMV0gPT09IDA7XHJcbiAgfVxyXG5cclxuICBoaXRCb3VuZGFyeShjYW52YXNFbCkge1xyXG4gICAgaWYgKHRoaXMucG9zWzBdICsgdGhpcy52ZWxbMF0gPiBjYW52YXNFbC53aWR0aCB8fCB0aGlzLnBvc1swXSArIHRoaXMudmVsWzBdIDwgMCkge1xyXG4gICAgICB0aGlzLm1ha2VCb3VuY2VTb3VuZCgpO1xyXG4gICAgICB0aGlzLnZlbFswXSA9IC10aGlzLnZlbFswXTtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucG9zWzFdICsgdGhpcy52ZWxbMV0gPiBjYW52YXNFbC5oZWlnaHQgfHwgdGhpcy5wb3NbMV0gKyB0aGlzLnZlbFsxXSA8IDApIHtcclxuICAgICAgdGhpcy5tYWtlQm91bmNlU291bmQoKTtcclxuICAgICAgdGhpcy52ZWxbMV0gPSAtdGhpcy52ZWxbMV07XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbGxpc2lvbkxlZnQob2JzdGFjbGUpIHtcclxuICAgIGxldCBzbG9wZSA9IHRoaXMudmVsWzFdL3RoaXMudmVsWzBdO1xyXG4gICAgbGV0IHhtaWRQb2ludCA9IG9ic3RhY2xlLnBvc1swXSAtIG9ic3RhY2xlLndpZHRoIC8gMiAqIE1hdGguY29zKG9ic3RhY2xlLmFuZ2xlKTtcclxuICAgIGxldCB5bWlkUG9pbnQgPSBvYnN0YWNsZS5wb3NbMV0gLSBvYnN0YWNsZS53aWR0aCAvIDIgKiBNYXRoLnNpbihvYnN0YWNsZS5hbmdsZSk7XHJcbiAgICBsZXQgeGJvdHRvbUNvcm5lciA9IHhtaWRQb2ludCArIG9ic3RhY2xlLmhlaWdodCAvIDIgKiBNYXRoLnNpbihvYnN0YWNsZS5hbmdsZSk7XHJcbiAgICBsZXQgeWJvdHRvbUNvcm5lciA9IHltaWRQb2ludCArIG9ic3RhY2xlLmhlaWdodCAvIDIgKiBNYXRoLmNvcyhvYnN0YWNsZS5hbmdsZSk7XHJcbiAgICBsZXQgeHRvcENvcm5lciA9IHhtaWRQb2ludCAtIG9ic3RhY2xlLmhlaWdodCAvIDIgKiBNYXRoLnNpbihvYnN0YWNsZS5hbmdsZSk7XHJcbiAgICBsZXQgeXRvcENvcm5lciA9IHltaWRQb2ludCAtIG9ic3RhY2xlLmhlaWdodCAvIDIgKiBNYXRoLmNvcyhvYnN0YWNsZS5hbmdsZSk7XHJcblxyXG4gICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzFdICsgc2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1swXSk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJldlBvc1swXSA8IHdhbGxEaW0pIHtcclxuICAgICAgaWYgKHRoaXMucG9zWzBdID4gd2FsbERpbSkge1xyXG4gICAgICAgIGlmKGludGVyc2VjdGlvblBUID4geUxvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB5VXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NbMF0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25QVDtcclxuICAgICAgICAgIHRoaXMudmVsWzBdID0gLXRoaXMudmVsWzBdXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbGxpc2lvblJpZ2h0KG9ic3RhY2xlKSB7XHJcbiAgICBsZXQgc2xvcGUgPSB0aGlzLnZlbFsxXS90aGlzLnZlbFswXTtcclxuICAgIGxldCB3YWxsRGltID0gb2JzdGFjbGUucG9zWzBdICsgb2JzdGFjbGUud2lkdGgvMjtcclxuICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IHRoaXMucHJldlBvc1sxXSArIHNsb3BlICogKHdhbGxEaW0gLSB0aGlzLnByZXZQb3NbMF0pO1xyXG4gICAgbGV0IHlMb3dlckJvdW5kID0gb2JzdGFjbGUucG9zWzFdIC0gb2JzdGFjbGUuaGVpZ2h0LzI7XHJcbiAgICBsZXQgeVVwcGVyQm91bmQgPSBvYnN0YWNsZS5wb3NbMV0gKyBvYnN0YWNsZS5oZWlnaHQvMjtcclxuICAgIGlmICh0aGlzLnByZXZQb3NbMF0gPiB3YWxsRGltKSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc1swXSA8IHdhbGxEaW0pIHtcclxuICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHlMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeVVwcGVyQm91bmQpIHtcclxuICAgICAgICAgIHRoaXMucG9zWzBdID0gd2FsbERpbTtcclxuICAgICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICB0aGlzLnZlbFswXSA9IC10aGlzLnZlbFswXVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25Ub3Aob2JzdGFjbGUpIHtcclxuICAgIGxldCBpbnZTbG9wZSA9IHRoaXMudmVsWzBdL3RoaXMudmVsWzFdO1xyXG4gICAgbGV0IHdhbGxEaW0gPSBvYnN0YWNsZS5wb3NbMV0gLSBvYnN0YWNsZS5oZWlnaHQvMjtcclxuICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IHRoaXMucHJldlBvc1swXSArIGludlNsb3BlICogKHdhbGxEaW0gLSB0aGlzLnByZXZQb3NbMV0pO1xyXG4gICAgbGV0IHhMb3dlckJvdW5kID0gb2JzdGFjbGUucG9zWzBdIC0gb2JzdGFjbGUud2lkdGgvMjtcclxuICAgIGxldCB4VXBwZXJCb3VuZCA9IG9ic3RhY2xlLnBvc1swXSArIG9ic3RhY2xlLndpZHRoLzI7XHJcbiAgICBpZiAodGhpcy5wcmV2UG9zWzFdIDwgd2FsbERpbSkge1xyXG4gICAgICBpZiAodGhpcy5wb3NbMV0gPiB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB4TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHhVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgdGhpcy52ZWxbMV0gPSAtdGhpcy52ZWxbMV1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uQm90KG9ic3RhY2xlKSB7XHJcbiAgICBsZXQgaW52U2xvcGUgPSB0aGlzLnZlbFswXS90aGlzLnZlbFsxXTtcclxuICAgIGxldCB3YWxsRGltID0gb2JzdGFjbGUucG9zWzFdICsgb2JzdGFjbGUuaGVpZ2h0LzI7XHJcbiAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSB0aGlzLnByZXZQb3NbMF0gKyBpbnZTbG9wZSAqICh3YWxsRGltIC0gdGhpcy5wcmV2UG9zWzFdKTtcclxuICAgIGxldCB4TG93ZXJCb3VuZCA9IG9ic3RhY2xlLnBvc1swXSAtIG9ic3RhY2xlLndpZHRoLzI7XHJcbiAgICBsZXQgeFVwcGVyQm91bmQgPSBvYnN0YWNsZS5wb3NbMF0gKyBvYnN0YWNsZS53aWR0aC8yO1xyXG4gICAgaWYgKHRoaXMucHJldlBvc1sxXSA+IHdhbGxEaW0pIHtcclxuICAgICAgaWYgKHRoaXMucG9zWzFdIDwgd2FsbERpbSkge1xyXG4gICAgICAgIGlmKGludGVyc2VjdGlvblBUID4geExvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB4VXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25QVDtcclxuICAgICAgICAgIHRoaXMucG9zWzFdID0gd2FsbERpbTtcclxuICAgICAgICAgIHRoaXMudmVsWzFdID0gLXRoaXMudmVsWzFdXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNoZWNrQ29sbGlzaW9ucyhvYnN0YWNsZSkge1xyXG4gICAgaWYgKHRoaXMuY29sbGlzaW9uTGVmdChvYnN0YWNsZSkgfHwgdGhpcy5jb2xsaXNpb25SaWdodChvYnN0YWNsZSkgfHwgdGhpcy5jb2xsaXNpb25Ub3Aob2JzdGFjbGUpIHx8IHRoaXMuY29sbGlzaW9uQm90KG9ic3RhY2xlKSkge1xyXG4gICAgICB0aGlzLm1ha2VCb3VuY2VTb3VuZCgpO1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBtYWtlQm91bmNlU291bmQoKSB7XHJcbiAgICBsZXQgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1ZGlvLXBsYXllclwiKVxyXG4gICAgYXVkaW8uc3JjID0gXCIuL2Fzc2V0cy9zb3VuZC9ib3VuY2Uud2F2XCI7XHJcbiAgICBhdWRpby5wbGF5KCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmluZ09iamVjdDsiLCJjbGFzcyBPYnN0YWNsZSB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XHJcbiAgICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aDtcclxuICAgIHRoaXMuYW5nbGUgPSBvcHRpb25zLmFuZ2xlO1xyXG4gICAgdGhpcy5jb2xvciA9IG9wdGlvbnMuY29sb3I7XHJcbiAgfVxyXG5cclxuICBkcmF3KGN0eCkge1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcbiAgICBjdHgucm90YXRlKC10aGlzLmFuZ2xlICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKC10aGlzLnBvc1swXSwgLXRoaXMucG9zWzFdKTtcclxuICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc1swXSAtIHRoaXMud2lkdGgvMiwgdGhpcy5wb3NbMV0gLSB0aGlzLmhlaWdodC8yLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcbiAgICBjdHgucm90YXRlKHRoaXMuYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zWzBdLCAtdGhpcy5wb3NbMV0pO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYnN0YWNsZTsiLCJjb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKCcuL21vdmluZ19vYmplY3QnKTtcclxuXHJcbmNsYXNzIFBsYXlCYWxsIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKVxyXG4gICAgdGhpcy5kZXRlcm1pbmVNb3ZlbWVudCA9IHRoaXMuZGV0ZXJtaW5lTW92ZW1lbnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMubWluQ2xpY2tEaXN0ID0gOFxyXG4gIH1cclxuXHJcbiAgZGV0ZXJtaW5lTW92ZW1lbnQoeENsaWNrLCB5Q2xpY2spIHtcclxuICAgIGxldCB4RGlmZiA9IHRoaXMucG9zWzBdIC0geENsaWNrO1xyXG4gICAgbGV0IHlEaWZmID0gdGhpcy5wb3NbMV0gLSB5Q2xpY2s7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKHhEaWZmKSA8IHRoaXMubWluQ2xpY2tEaXN0KSB7XHJcbiAgICAgIHhEaWZmID0geERpZmYvTWF0aC5hYnMoeERpZmYpKnRoaXMubWluQ2xpY2tEaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChNYXRoLmFicyh5RGlmZikgPCB0aGlzLm1pbkNsaWNrRGlzdCkge1xyXG4gICAgICB5RGlmZiA9IHlEaWZmL01hdGguYWJzKHlEaWZmKSp0aGlzLm1pbkNsaWNrRGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbWFnID0gMS8oTWF0aC5wb3coeERpZmYsIDIpICsgTWF0aC5wb3coeURpZmYsIDIpKTtcclxuICAgIGxldCB1bml0RGlyID0gW3hEaWZmLCB5RGlmZl07XHJcbiAgICB0aGlzLnZlbFswXSA9IHVuaXREaXJbMF0gKiBtYWcgKiA4NTA7XHJcbiAgICB0aGlzLnZlbFsxXSA9IHVuaXREaXJbMV0gKiBtYWcgKiA4NTA7XHJcbiAgfVxyXG5cclxuICBnZXREaXN0YW5jZSh0YXJnZXQpIHtcclxuICAgIGxldCB4RGlmZiA9IE1hdGguYWJzKHRoaXMucG9zWzBdIC0gdGFyZ2V0LnBvc1swXSk7XHJcbiAgICBsZXQgeURpZmYgPSBNYXRoLmFicyh0aGlzLnBvc1sxXSAtIHRhcmdldC5wb3NbMV0pO1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh4RGlmZip4RGlmZiArIHlEaWZmKnlEaWZmKS50b0ZpeGVkKDMpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5QmFsbDsiLCJjb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKFwiLi9tb3Zpbmdfb2JqZWN0XCIpO1xyXG5cclxuY2xhc3MgU3BhcmsgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIl07XHJcbiAgICB0aGlzXHJcbiAgICBzZXRJbnRlcnZhbCh0aGlzLmNoYW5nZUNvbG9yLCA1MDApO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQ29sb3IoKSB7XHJcbiAgICBsZXQgY29sb3JTdHIgPSBcIiNcIjtcclxuXHJcbiAgICB3aGlsZSAoY29sb3JTdHIubGVuZ3RoIDwgNikge1xyXG4gICAgICBjb2xvclN0ciArPSB0aGlzLmNvbG9yU2V0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLmNvbG9yU2V0Lmxlbmd0aCldO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29sb3IgPSBjb2xvclN0cjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3Bhcms7IiwiY2xhc3MgVGFyZ2V0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy52ZWwgPSBbMCwgMF07XHJcbiAgICB0aGlzLnJhZGl1cyA9IDg7XHJcbiAgICB0aGlzLmNvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIHRoaXMucG9zWzBdLFxyXG4gICAgICB0aGlzLnBvc1sxXSxcclxuICAgICAgdGhpcy5yYWRpdXMsXHJcbiAgICAgIDAsXHJcbiAgICAgIDIgKiBNYXRoLlBJLFxyXG4gICAgICBmYWxzZVxyXG4gICAgKTtcclxuXHJcbiAgICBjdHguZmlsbCgpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYXJnZXQ7Il0sInNvdXJjZVJvb3QiOiIifQ==