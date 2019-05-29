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
      { pos: [200, 300], height: 300, width: 20, angle: 0, color: "#F739A3"}
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
    let wallDim = obstacle.pos[0] - obstacle.width/2;
    let intersectionPT = this.prevPos[1] + slope * (wallDim - this.prevPos[0]);
    let yLowerBound = obstacle.pos[1] - obstacle.height/2;
    let yUpperBound = obstacle.pos[1] + obstacle.height/2;
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
    audio.src = "https://raw.githubusercontent.com/briceyokoyama/hit-it/master/assets/sound/bounce.wav";
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
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.translate(-this.pos[0], -this.pos[1]);
    ctx.fillRect(this.pos[0] - this.width/2, this.pos[1] - this.height/2, this.width, this.height);
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-this.angle * Math.PI / 180);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmluZ19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5X2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NwYXJrLmpzIiwid2VicGFjazovLy8uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3RDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsK0JBQVM7O0FBRS9CO0FBQ0E7QUFDQSw0QkFBNEIseURBQXlEO0FBQ3JGLDhCQUE4QixpQkFBaUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLDRCQUE0QixZQUFZO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0I7Ozs7Ozs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsaUJBQWlCLG1CQUFPLENBQUMsdUNBQWE7O0FBRXRDOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCOzs7Ozs7Ozs7OztBQy9JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEI7Ozs7Ozs7Ozs7O0FDckJBLHFCQUFxQixtQkFBTyxDQUFDLCtDQUFpQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ2xDQSxxQkFBcUIsbUJBQU8sQ0FBQywrQ0FBaUI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjb25zdCBQbGF5QmFsbCA9IHJlcXVpcmUoXCIuL3BsYXlfYmFsbFwiKTtcclxuY29uc3QgVGFyZ2V0ID0gcmVxdWlyZShcIi4vdGFyZ2V0XCIpO1xyXG5jb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoXCIuL29ic3RhY2xlXCIpO1xyXG5jb25zdCBTcGFyayA9IHJlcXVpcmUoXCIuL3NwYXJrXCIpO1xyXG5cclxuY2xhc3MgR2FtZSB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wYiA9IG5ldyBQbGF5QmFsbCh7IHBvczogWzMwLCAzMF0sIHZlbDogWzAsIDBdLCByYWRpdXM6IDUsIGNvbG9yOiBcIiM1NWFhY2NcIn0pO1xyXG4gICAgdGhpcy50YXJnZXQgPSBuZXcgVGFyZ2V0KHsgcG9zOiBbMzAwLCAzMDBdfSlcclxuICAgIHRoaXMub2JzdGFjbGVzID0gW107XHJcbiAgICB0aGlzLnNwYXJrcyA9IFtdO1xyXG4gICAgdGhpcy5kaXN0ID0gdGhpcy5wYi5nZXREaXN0YW5jZSh0aGlzLnRhcmdldCk7XHJcbiAgICB0aGlzLmNsaWNrcyA9IDA7XHJcblxyXG4gICAgdGhpcy5hZGRPYnN0YWNsZXMoKTtcclxuICB9XHJcblxyXG4gIGFkZE9ic3RhY2xlcygpIHtcclxuICAgIGNvbnN0IG9iczEgPSBuZXcgT2JzdGFjbGUoXHJcbiAgICAgIHsgcG9zOiBbNDAwLCAzMDBdLCBoZWlnaHQ6IDMwMCwgd2lkdGg6IDIwLCBhbmdsZTogMCwgY29sb3I6IFwiI0Y3MzlBM1wifVxyXG4gICAgKTtcclxuICBcclxuICAgIGNvbnN0IG9iczIgPSBuZXcgT2JzdGFjbGUoXHJcbiAgICAgIHsgcG9zOiBbMjAwLCAzMDBdLCBoZWlnaHQ6IDMwMCwgd2lkdGg6IDIwLCBhbmdsZTogMCwgY29sb3I6IFwiI0Y3MzlBM1wifVxyXG4gICAgKTtcclxuICBcclxuICAgIHRoaXMub2JzdGFjbGVzLnB1c2gob2JzMSk7XHJcbiAgICB0aGlzLm9ic3RhY2xlcy5wdXNoKG9iczIpO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNsaWNrcyArPSAxO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjYW52YXNFbCwgY3R4KSB7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiXHJcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzRWwud2lkdGgsIGNhbnZhc0VsLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5vYnN0YWNsZXMuZm9yRWFjaChvYiA9PiB7XHJcbiAgICAgIG9iLmRyYXcoY3R4KTtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5zcGFya3MuZm9yRWFjaChzcGFyayA9PiB7XHJcbiAgICAgIHNwYXJrLmRyYXcoY3R4KTtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy50YXJnZXQuZHJhdyhjdHgpO1xyXG4gICAgdGhpcy5wYi5kcmF3KGN0eCk7XHJcbiAgICBjdHgudGV4dEFsaWduID0gXCJlbmRcIjtcclxuICAgIGN0eC5mb250ID0gJzE4cHggT3JiaXRyb24nO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgY3R4LmZpbGxUZXh0KGBkaXN0OiAke3RoaXMuZGlzdH1gLCA1ODUsIDI1KTtcclxuICAgIGN0eC5maWxsVGV4dChgY2xpY2tzOiAke3RoaXMuY2xpY2tzfWAsIDU4NSwgNjApO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDb2xsaXNpb25zKGNhbnZhc0VsLCBjdHgpIHtcclxuICAgIGxldCBuZXdTcGFya3M7XHJcbiAgICB0aGlzLnBiLmhpdEJvdW5kYXJ5KGNhbnZhc0VsKTtcclxuXHJcbiAgICB0aGlzLm9ic3RhY2xlcy5mb3JFYWNoKG9iID0+IHtcclxuICAgICAgLy8gdGhpcy5zcGFya3MucHVzaCguLi50aGlzLnBiLmNoZWNrQ29sbGlzaW9ucyhvYikpO1xyXG4gICAgICB0aGlzLnBiLmNoZWNrQ29sbGlzaW9ucyhvYik7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY2FsY0Rpc3QoKSB7XHJcbiAgICB0aGlzLmRpc3QgPSB0aGlzLnBiLmdldERpc3RhbmNlKHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCJjbGFzcyBHYW1lVmlldyB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgY3R4LCBjYW52YXNFbCkge1xyXG4gICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5jYW52YXNFbCA9IGNhbnZhc0VsO1xyXG4gICAgdGhpcy5kb1N0dWZmID0gdGhpcy5kb1N0dWZmLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLmRvU3R1ZmYoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUNsaWNrKGUpIHtcclxuICAgIHRoaXMuZ2FtZS5hZGRDbGljaygpO1xyXG4gICAgbGV0IHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHRoaXMuZ2FtZS5wYi5kZXRlcm1pbmVNb3ZlbWVudChlLmNsaWVudFggLSByZWN0LmxlZnQsIGUuY2xpZW50WSAtIHJlY3QudG9wKTtcclxuICAgIHRoaXMuY2FudmFzRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcclxuICB9XHJcblxyXG4gIGRvU3R1ZmYoKSB7XHJcbiAgICB0aGlzLmdhbWUuY2hlY2tDb2xsaXNpb25zKHRoaXMuY2FudmFzRWwsIHRoaXMuY3R4KTtcclxuICAgIHRoaXMuZ2FtZS5jYWxjRGlzdCgpO1xyXG4gICAgdGhpcy5nYW1lLmRyYXcodGhpcy5jYW52YXNFbCwgdGhpcy5jdHgpO1xyXG4gICAgXHJcbiAgICBpZiAodGhpcy5nYW1lLnBiLm1vdmUoKSkge1xyXG4gICAgICB0aGlzLmNhbnZhc0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmRvU3R1ZmYpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lVmlldzsiLCIvLyBjb25zdCBQbGF5QmFsbCA9IHJlcXVpcmUoXCIuL3BsYXlfYmFsbFwiKTtcclxuLy8gY29uc3QgVGFyZ2V0ID0gcmVxdWlyZShcIi4vdGFyZ2V0XCIpO1xyXG4vLyBjb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoXCIuL29ic3RhY2xlXCIpO1xyXG5jb25zdCBHYW1lID0gcmVxdWlyZShcIi4vZ2FtZVwiKTtcclxuY29uc3QgR2FtZVZpZXcgPSByZXF1aXJlKFwiLi9nYW1lX3ZpZXdcIik7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcblxyXG4gIGxldCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnV0dG9uXCIpO1xyXG4gIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lKTtcclxufSlcclxuXHJcbmNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICBjb25zdCBjYW52YXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FudmFzXCIpWzBdXHJcblxyXG4gIGxldCBzdGFydE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LW1lbnVcIik7XHJcbiAgc3RhcnRNZW51LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICBjYW52YXNFbC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICBjYW52YXNFbC5oZWlnaHQgPSA2MDA7XHJcbiAgY2FudmFzRWwud2lkdGggPSA2MDA7XHJcbiAgbGV0IGN0eCA9IGNhbnZhc0VsLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xyXG4gIG5ldyBHYW1lVmlldyhnYW1lLCBjdHgsIGNhbnZhc0VsKS5zdGFydCgpO1xyXG5cclxufSIsImNsYXNzIE1vdmluZ09iamVjdCB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMudmVsID0gb3B0aW9ucy52ZWw7XHJcbiAgICB0aGlzLnJhZGl1cyA9IG9wdGlvbnMucmFkaXVzO1xyXG4gICAgdGhpcy5jb2xvciA9IG9wdGlvbnMuY29sb3I7XHJcbiAgICB0aGlzLm1vdmUgPSB0aGlzLm1vdmUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZHJhdyA9IHRoaXMuZHJhdy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5wcmV2UG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLmZyaWN0aW9uID0gLjk4IC8vMC45IHdhcyB0aGUgZmlyc3QgdmFsdWVcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIHRoaXMucG9zWzBdLFxyXG4gICAgICB0aGlzLnBvc1sxXSxcclxuICAgICAgdGhpcy5yYWRpdXMsXHJcbiAgICAgIDAsXHJcbiAgICAgIDIgKiBNYXRoLlBJLFxyXG4gICAgICBmYWxzZVxyXG4gICAgKTtcclxuXHJcbiAgICBjdHguZmlsbCgpO1xyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIHRoaXMucHJldlBvcyA9IHRoaXMucG9zO1xyXG4gICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gKyB0aGlzLnZlbFswXSwgdGhpcy5wb3NbMV0gKyB0aGlzLnZlbFsxXV07XHJcbiAgICB0aGlzLnZlbCA9IFt0aGlzLnZlbFswXSp0aGlzLmZyaWN0aW9uLCB0aGlzLnZlbFsxXSp0aGlzLmZyaWN0aW9uXTtcclxuICAgIGlmIChNYXRoLnNxcnQoTWF0aC5wb3codGhpcy52ZWxbMF0sIDIpICsgTWF0aC5wb3codGhpcy52ZWxbMV0sIDIpKSA8IC4xKSB7XHJcbiAgICAgIHRoaXMudmVsWzBdID0gMDtcclxuICAgICAgdGhpcy52ZWxbMV0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnZlbFswXSA9PT0gMCAmJiB0aGlzLnZlbFsxXSA9PT0gMDtcclxuICB9XHJcblxyXG4gIGhpdEJvdW5kYXJ5KGNhbnZhc0VsKSB7XHJcbiAgICBpZiAodGhpcy5wb3NbMF0gKyB0aGlzLnZlbFswXSA+IGNhbnZhc0VsLndpZHRoIHx8IHRoaXMucG9zWzBdICsgdGhpcy52ZWxbMF0gPCAwKSB7XHJcbiAgICAgIHRoaXMubWFrZUJvdW5jZVNvdW5kKCk7XHJcbiAgICAgIHRoaXMudmVsWzBdID0gLXRoaXMudmVsWzBdO1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wb3NbMV0gKyB0aGlzLnZlbFsxXSA+IGNhbnZhc0VsLmhlaWdodCB8fCB0aGlzLnBvc1sxXSArIHRoaXMudmVsWzFdIDwgMCkge1xyXG4gICAgICB0aGlzLm1ha2VCb3VuY2VTb3VuZCgpO1xyXG4gICAgICB0aGlzLnZlbFsxXSA9IC10aGlzLnZlbFsxXTtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uTGVmdChvYnN0YWNsZSkge1xyXG4gICAgbGV0IHNsb3BlID0gdGhpcy52ZWxbMV0vdGhpcy52ZWxbMF07XHJcbiAgICBsZXQgd2FsbERpbSA9IG9ic3RhY2xlLnBvc1swXSAtIG9ic3RhY2xlLndpZHRoLzI7XHJcbiAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSB0aGlzLnByZXZQb3NbMV0gKyBzbG9wZSAqICh3YWxsRGltIC0gdGhpcy5wcmV2UG9zWzBdKTtcclxuICAgIGxldCB5TG93ZXJCb3VuZCA9IG9ic3RhY2xlLnBvc1sxXSAtIG9ic3RhY2xlLmhlaWdodC8yO1xyXG4gICAgbGV0IHlVcHBlckJvdW5kID0gb2JzdGFjbGUucG9zWzFdICsgb2JzdGFjbGUuaGVpZ2h0LzI7XHJcbiAgICBpZiAodGhpcy5wcmV2UG9zWzBdIDwgd2FsbERpbSkge1xyXG4gICAgICBpZiAodGhpcy5wb3NbMF0gPiB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB5TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHlVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnBvc1swXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICB0aGlzLnBvc1sxXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgdGhpcy52ZWxbMF0gPSAtdGhpcy52ZWxbMF1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uUmlnaHQob2JzdGFjbGUpIHtcclxuICAgIGxldCBzbG9wZSA9IHRoaXMudmVsWzFdL3RoaXMudmVsWzBdO1xyXG4gICAgbGV0IHdhbGxEaW0gPSBvYnN0YWNsZS5wb3NbMF0gKyBvYnN0YWNsZS53aWR0aC8yO1xyXG4gICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzFdICsgc2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1swXSk7XHJcbiAgICBsZXQgeUxvd2VyQm91bmQgPSBvYnN0YWNsZS5wb3NbMV0gLSBvYnN0YWNsZS5oZWlnaHQvMjtcclxuICAgIGxldCB5VXBwZXJCb3VuZCA9IG9ic3RhY2xlLnBvc1sxXSArIG9ic3RhY2xlLmhlaWdodC8yO1xyXG4gICAgaWYgKHRoaXMucHJldlBvc1swXSA+IHdhbGxEaW0pIHtcclxuICAgICAgaWYgKHRoaXMucG9zWzBdIDwgd2FsbERpbSkge1xyXG4gICAgICAgIGlmKGludGVyc2VjdGlvblBUID4geUxvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB5VXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NbMF0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25QVDtcclxuICAgICAgICAgIHRoaXMudmVsWzBdID0gLXRoaXMudmVsWzBdXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbGxpc2lvblRvcChvYnN0YWNsZSkge1xyXG4gICAgbGV0IGludlNsb3BlID0gdGhpcy52ZWxbMF0vdGhpcy52ZWxbMV07XHJcbiAgICBsZXQgd2FsbERpbSA9IG9ic3RhY2xlLnBvc1sxXSAtIG9ic3RhY2xlLmhlaWdodC8yO1xyXG4gICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzBdICsgaW52U2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1sxXSk7XHJcbiAgICBsZXQgeExvd2VyQm91bmQgPSBvYnN0YWNsZS5wb3NbMF0gLSBvYnN0YWNsZS53aWR0aC8yO1xyXG4gICAgbGV0IHhVcHBlckJvdW5kID0gb2JzdGFjbGUucG9zWzBdICsgb2JzdGFjbGUud2lkdGgvMjtcclxuICAgIGlmICh0aGlzLnByZXZQb3NbMV0gPCB3YWxsRGltKSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc1sxXSA+IHdhbGxEaW0pIHtcclxuICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHhMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeFVwcGVyQm91bmQpIHtcclxuICAgICAgICAgIHRoaXMucG9zWzBdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICB0aGlzLnBvc1sxXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICB0aGlzLnZlbFsxXSA9IC10aGlzLnZlbFsxXVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25Cb3Qob2JzdGFjbGUpIHtcclxuICAgIGxldCBpbnZTbG9wZSA9IHRoaXMudmVsWzBdL3RoaXMudmVsWzFdO1xyXG4gICAgbGV0IHdhbGxEaW0gPSBvYnN0YWNsZS5wb3NbMV0gKyBvYnN0YWNsZS5oZWlnaHQvMjtcclxuICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IHRoaXMucHJldlBvc1swXSArIGludlNsb3BlICogKHdhbGxEaW0gLSB0aGlzLnByZXZQb3NbMV0pO1xyXG4gICAgbGV0IHhMb3dlckJvdW5kID0gb2JzdGFjbGUucG9zWzBdIC0gb2JzdGFjbGUud2lkdGgvMjtcclxuICAgIGxldCB4VXBwZXJCb3VuZCA9IG9ic3RhY2xlLnBvc1swXSArIG9ic3RhY2xlLndpZHRoLzI7XHJcbiAgICBpZiAodGhpcy5wcmV2UG9zWzFdID4gd2FsbERpbSkge1xyXG4gICAgICBpZiAodGhpcy5wb3NbMV0gPCB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB4TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHhVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgdGhpcy52ZWxbMV0gPSAtdGhpcy52ZWxbMV1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDb2xsaXNpb25zKG9ic3RhY2xlKSB7XHJcbiAgICBpZiAodGhpcy5jb2xsaXNpb25MZWZ0KG9ic3RhY2xlKSB8fCB0aGlzLmNvbGxpc2lvblJpZ2h0KG9ic3RhY2xlKSB8fCB0aGlzLmNvbGxpc2lvblRvcChvYnN0YWNsZSkgfHwgdGhpcy5jb2xsaXNpb25Cb3Qob2JzdGFjbGUpKSB7XHJcbiAgICAgIHRoaXMubWFrZUJvdW5jZVNvdW5kKCk7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG1ha2VCb3VuY2VTb3VuZCgpIHtcclxuICAgIGxldCBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXVkaW8tcGxheWVyXCIpXHJcbiAgICBhdWRpby5zcmMgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9icmljZXlva295YW1hL2hpdC1pdC9tYXN0ZXIvYXNzZXRzL3NvdW5kL2JvdW5jZS53YXZcIjtcclxuICAgIGF1ZGlvLnBsYXkoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW92aW5nT2JqZWN0OyIsImNsYXNzIE9ic3RhY2xlIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcclxuICAgIHRoaXMud2lkdGggPSBvcHRpb25zLndpZHRoO1xyXG4gICAgdGhpcy5hbmdsZSA9IG9wdGlvbnMuYW5nbGU7XHJcbiAgICB0aGlzLmNvbG9yID0gb3B0aW9ucy5jb2xvcjtcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdKTtcclxuICAgIGN0eC5yb3RhdGUodGhpcy5hbmdsZSAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSgtdGhpcy5wb3NbMF0sIC10aGlzLnBvc1sxXSk7XHJcbiAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NbMF0gLSB0aGlzLndpZHRoLzIsIHRoaXMucG9zWzFdIC0gdGhpcy5oZWlnaHQvMiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0pO1xyXG4gICAgY3R4LnJvdGF0ZSgtdGhpcy5hbmdsZSAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSgtdGhpcy5wb3NbMF0sIC10aGlzLnBvc1sxXSk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9ic3RhY2xlOyIsImNvbnN0IE1vdmluZ09iamVjdCA9IHJlcXVpcmUoJy4vbW92aW5nX29iamVjdCcpO1xyXG5cclxuY2xhc3MgUGxheUJhbGwgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpXHJcbiAgICB0aGlzLmRldGVybWluZU1vdmVtZW50ID0gdGhpcy5kZXRlcm1pbmVNb3ZlbWVudC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5taW5DbGlja0Rpc3QgPSA4XHJcbiAgfVxyXG5cclxuICBkZXRlcm1pbmVNb3ZlbWVudCh4Q2xpY2ssIHlDbGljaykge1xyXG4gICAgbGV0IHhEaWZmID0gdGhpcy5wb3NbMF0gLSB4Q2xpY2s7XHJcbiAgICBsZXQgeURpZmYgPSB0aGlzLnBvc1sxXSAtIHlDbGljaztcclxuXHJcbiAgICBpZiAoTWF0aC5hYnMoeERpZmYpIDwgdGhpcy5taW5DbGlja0Rpc3QpIHtcclxuICAgICAgeERpZmYgPSB4RGlmZi9NYXRoLmFicyh4RGlmZikqdGhpcy5taW5DbGlja0Rpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKHlEaWZmKSA8IHRoaXMubWluQ2xpY2tEaXN0KSB7XHJcbiAgICAgIHlEaWZmID0geURpZmYvTWF0aC5hYnMoeURpZmYpKnRoaXMubWluQ2xpY2tEaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBtYWcgPSAxLyhNYXRoLnBvdyh4RGlmZiwgMikgKyBNYXRoLnBvdyh5RGlmZiwgMikpO1xyXG4gICAgbGV0IHVuaXREaXIgPSBbeERpZmYsIHlEaWZmXTtcclxuICAgIHRoaXMudmVsWzBdID0gdW5pdERpclswXSAqIG1hZyAqIDg1MDtcclxuICAgIHRoaXMudmVsWzFdID0gdW5pdERpclsxXSAqIG1hZyAqIDg1MDtcclxuICB9XHJcblxyXG4gIGdldERpc3RhbmNlKHRhcmdldCkge1xyXG4gICAgbGV0IHhEaWZmID0gTWF0aC5hYnModGhpcy5wb3NbMF0gLSB0YXJnZXQucG9zWzBdKTtcclxuICAgIGxldCB5RGlmZiA9IE1hdGguYWJzKHRoaXMucG9zWzFdIC0gdGFyZ2V0LnBvc1sxXSk7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHhEaWZmKnhEaWZmICsgeURpZmYqeURpZmYpLnRvRml4ZWQoMyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlCYWxsOyIsImNvbnN0IE1vdmluZ09iamVjdCA9IHJlcXVpcmUoXCIuL21vdmluZ19vYmplY3RcIik7XHJcblxyXG5jbGFzcyBTcGFyayBleHRlbmRzIE1vdmluZ09iamVjdCB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5jb2xvclNldCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCBcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiXTtcclxuICAgIHRoaXNcclxuICAgIHNldEludGVydmFsKHRoaXMuY2hhbmdlQ29sb3IsIDUwMCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VDb2xvcigpIHtcclxuICAgIGxldCBjb2xvclN0ciA9IFwiI1wiO1xyXG5cclxuICAgIHdoaWxlIChjb2xvclN0ci5sZW5ndGggPCA2KSB7XHJcbiAgICAgIGNvbG9yU3RyICs9IHRoaXMuY29sb3JTZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuY29sb3JTZXQubGVuZ3RoKV07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yU3RyO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTcGFyazsiLCJjbGFzcyBUYXJnZXQge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLnZlbCA9IFswLCAwXTtcclxuICAgIHRoaXMucmFkaXVzID0gODtcclxuICAgIHRoaXMuY29sb3IgPSBcIiNmZmZmZmZcIjtcclxuICAgIHRoaXMuZHJhdyA9IHRoaXMuZHJhdy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjdHgpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYyhcclxuICAgICAgdGhpcy5wb3NbMF0sXHJcbiAgICAgIHRoaXMucG9zWzFdLFxyXG4gICAgICB0aGlzLnJhZGl1cyxcclxuICAgICAgMCxcclxuICAgICAgMiAqIE1hdGguUEksXHJcbiAgICAgIGZhbHNlXHJcbiAgICApO1xyXG5cclxuICAgIGN0eC5maWxsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRhcmdldDsiXSwic291cmNlUm9vdCI6IiJ9