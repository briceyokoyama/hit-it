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

  hitObstacle(obstacle) {

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
      let audio = document.getElementById("audio-player")
      audio.src = "../assets/sound/bounce.wav";
      audio.play();
      return [];
    }
    return false;
  }

  makeBounceSound() {
    let audio = document.getElementById("audio-player")
    audio.src = "../assets/sound/bounce.wav";
    audio.play();
  }

  createSparks(pos) {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmluZ19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5X2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NwYXJrLmpzIiwid2VicGFjazovLy8uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3RDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsK0JBQVM7O0FBRS9CO0FBQ0E7QUFDQSw0QkFBNEIseURBQXlEO0FBQ3JGLDhCQUE4QixpQkFBaUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLDRCQUE0QixZQUFZO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0I7Ozs7Ozs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsaUJBQWlCLG1CQUFPLENBQUMsdUNBQWE7O0FBRXRDOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSw4Qjs7Ozs7Ozs7Ozs7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ3JCQSxxQkFBcUIsbUJBQU8sQ0FBQywrQ0FBaUI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQjs7Ozs7Ozs7Ozs7QUNsQ0EscUJBQXFCLG1CQUFPLENBQUMsK0NBQWlCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCOzs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgUGxheUJhbGwgPSByZXF1aXJlKFwiLi9wbGF5X2JhbGxcIik7XHJcbmNvbnN0IFRhcmdldCA9IHJlcXVpcmUoXCIuL3RhcmdldFwiKTtcclxuY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKFwiLi9vYnN0YWNsZVwiKTtcclxuY29uc3QgU3BhcmsgPSByZXF1aXJlKFwiLi9zcGFya1wiKTtcclxuXHJcbmNsYXNzIEdhbWUge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucGIgPSBuZXcgUGxheUJhbGwoeyBwb3M6IFszMCwgMzBdLCB2ZWw6IFswLCAwXSwgcmFkaXVzOiA1LCBjb2xvcjogXCIjNTVhYWNjXCJ9KTtcclxuICAgIHRoaXMudGFyZ2V0ID0gbmV3IFRhcmdldCh7IHBvczogWzMwMCwgMzAwXX0pXHJcbiAgICB0aGlzLm9ic3RhY2xlcyA9IFtdO1xyXG4gICAgdGhpcy5zcGFya3MgPSBbXTtcclxuICAgIHRoaXMuZGlzdCA9IHRoaXMucGIuZ2V0RGlzdGFuY2UodGhpcy50YXJnZXQpO1xyXG4gICAgdGhpcy5jbGlja3MgPSAwO1xyXG5cclxuICAgIHRoaXMuYWRkT2JzdGFjbGVzKCk7XHJcbiAgfVxyXG5cclxuICBhZGRPYnN0YWNsZXMoKSB7XHJcbiAgICBjb25zdCBvYnMxID0gbmV3IE9ic3RhY2xlKFxyXG4gICAgICB7IHBvczogWzQwMCwgMzAwXSwgaGVpZ2h0OiAzMDAsIHdpZHRoOiAyMCwgYW5nbGU6IDAsIGNvbG9yOiBcIiNGNzM5QTNcIn1cclxuICAgICk7XHJcbiAgXHJcbiAgICBjb25zdCBvYnMyID0gbmV3IE9ic3RhY2xlKFxyXG4gICAgICB7IHBvczogWzIwMCwgMzAwXSwgaGVpZ2h0OiAzMDAsIHdpZHRoOiAyMCwgYW5nbGU6IDAsIGNvbG9yOiBcIiNGNzM5QTNcIn1cclxuICAgICk7XHJcbiAgXHJcbiAgICB0aGlzLm9ic3RhY2xlcy5wdXNoKG9iczEpO1xyXG4gICAgdGhpcy5vYnN0YWNsZXMucHVzaChvYnMyKTtcclxuICB9XHJcblxyXG4gIGFkZENsaWNrKCkge1xyXG4gICAgdGhpcy5jbGlja3MgKz0gMTtcclxuICB9XHJcblxyXG4gIGRyYXcoY2FudmFzRWwsIGN0eCkge1xyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNFbC53aWR0aCwgY2FudmFzRWwuaGVpZ2h0KTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIlxyXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMub2JzdGFjbGVzLmZvckVhY2gob2IgPT4ge1xyXG4gICAgICBvYi5kcmF3KGN0eCk7XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuc3BhcmtzLmZvckVhY2goc3BhcmsgPT4ge1xyXG4gICAgICBzcGFyay5kcmF3KGN0eCk7XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMudGFyZ2V0LmRyYXcoY3R4KTtcclxuICAgIHRoaXMucGIuZHJhdyhjdHgpO1xyXG4gICAgY3R4LnRleHRBbGlnbiA9IFwiZW5kXCI7XHJcbiAgICBjdHguZm9udCA9ICcxOHB4IE9yYml0cm9uJztcclxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcclxuICAgIGN0eC5maWxsVGV4dChgZGlzdDogJHt0aGlzLmRpc3R9YCwgNTg1LCAyNSk7XHJcbiAgICBjdHguZmlsbFRleHQoYGNsaWNrczogJHt0aGlzLmNsaWNrc31gLCA1ODUsIDYwKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQ29sbGlzaW9ucyhjYW52YXNFbCwgY3R4KSB7XHJcbiAgICAvLyB0aGlzLnNwYXJrcy5wdXNoKC4uLnRoaXMucGIuaGl0Qm91bmRhcnkoY2FudmFzRWwpKTtcclxuICAgIHRoaXMucGIuaGl0Qm91bmRhcnkoY2FudmFzRWwpO1xyXG5cclxuICAgIHRoaXMub2JzdGFjbGVzLmZvckVhY2gob2IgPT4ge1xyXG4gICAgICAvLyB0aGlzLnNwYXJrcy5wdXNoKC4uLnRoaXMucGIuY2hlY2tDb2xsaXNpb25zKG9iKSk7XHJcbiAgICAgIHRoaXMucGIuY2hlY2tDb2xsaXNpb25zKG9iKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjYWxjRGlzdCgpIHtcclxuICAgIHRoaXMuZGlzdCA9IHRoaXMucGIuZ2V0RGlzdGFuY2UodGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNsYXNzIEdhbWVWaWV3IHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCBjdHgsIGNhbnZhc0VsKSB7XHJcbiAgICB0aGlzLmN0eCA9IGN0eDtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmNhbnZhc0VsID0gY2FudmFzRWw7XHJcbiAgICB0aGlzLmRvU3R1ZmYgPSB0aGlzLmRvU3R1ZmYuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIHRoaXMuZG9TdHVmZigpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2xpY2soZSkge1xyXG4gICAgdGhpcy5nYW1lLmFkZENsaWNrKCk7XHJcbiAgICBsZXQgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgdGhpcy5nYW1lLnBiLmRldGVybWluZU1vdmVtZW50KGUuY2xpZW50WCAtIHJlY3QubGVmdCwgZS5jbGllbnRZIC0gcmVjdC50b3ApO1xyXG4gICAgdGhpcy5jYW52YXNFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgZG9TdHVmZigpIHtcclxuICAgIHRoaXMuZ2FtZS5jaGVja0NvbGxpc2lvbnModGhpcy5jYW52YXNFbCwgdGhpcy5jdHgpO1xyXG4gICAgdGhpcy5nYW1lLmNhbGNEaXN0KCk7XHJcbiAgICB0aGlzLmdhbWUuZHJhdyh0aGlzLmNhbnZhc0VsLCB0aGlzLmN0eCk7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLmdhbWUucGIubW92ZSgpKSB7XHJcbiAgICAgIHRoaXMuY2FudmFzRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZG9TdHVmZik7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVWaWV3OyIsIi8vIGNvbnN0IFBsYXlCYWxsID0gcmVxdWlyZShcIi4vcGxheV9iYWxsXCIpO1xyXG4vLyBjb25zdCBUYXJnZXQgPSByZXF1aXJlKFwiLi90YXJnZXRcIik7XHJcbi8vIGNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZShcIi4vb2JzdGFjbGVcIik7XHJcbmNvbnN0IEdhbWUgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xyXG5jb25zdCBHYW1lVmlldyA9IHJlcXVpcmUoXCIuL2dhbWVfdmlld1wiKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuXHJcbiAgbGV0IHN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1idXR0b25cIik7XHJcbiAgc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xyXG59KVxyXG5cclxuY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNhbnZhc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjYW52YXNcIilbMF1cclxuXHJcbiAgbGV0IHN0YXJ0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtbWVudVwiKTtcclxuICBzdGFydE1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIGNhbnZhc0VsLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xyXG4gIGNhbnZhc0VsLmhlaWdodCA9IDYwMDtcclxuICBjYW52YXNFbC53aWR0aCA9IDYwMDtcclxuICBsZXQgY3R4ID0gY2FudmFzRWwuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbiAgbmV3IEdhbWVWaWV3KGdhbWUsIGN0eCwgY2FudmFzRWwpLnN0YXJ0KCk7XHJcblxyXG59IiwiY2xhc3MgTW92aW5nT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy52ZWwgPSBvcHRpb25zLnZlbDtcclxuICAgIHRoaXMucmFkaXVzID0gb3B0aW9ucy5yYWRpdXM7XHJcbiAgICB0aGlzLmNvbG9yID0gb3B0aW9ucy5jb2xvcjtcclxuICAgIHRoaXMubW92ZSA9IHRoaXMubW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5kcmF3ID0gdGhpcy5kcmF3LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnByZXZQb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMuZnJpY3Rpb24gPSAuOTggLy8wLjkgd2FzIHRoZSBmaXJzdCB2YWx1ZVxyXG4gIH1cclxuXHJcbiAgZHJhdyhjdHgpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYyhcclxuICAgICAgdGhpcy5wb3NbMF0sXHJcbiAgICAgIHRoaXMucG9zWzFdLFxyXG4gICAgICB0aGlzLnJhZGl1cyxcclxuICAgICAgMCxcclxuICAgICAgMiAqIE1hdGguUEksXHJcbiAgICAgIGZhbHNlXHJcbiAgICApO1xyXG5cclxuICAgIGN0eC5maWxsKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgdGhpcy5wcmV2UG9zID0gdGhpcy5wb3M7XHJcbiAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIHRoaXMudmVsWzBdLCB0aGlzLnBvc1sxXSArIHRoaXMudmVsWzFdXTtcclxuICAgIHRoaXMudmVsID0gW3RoaXMudmVsWzBdKnRoaXMuZnJpY3Rpb24sIHRoaXMudmVsWzFdKnRoaXMuZnJpY3Rpb25dO1xyXG4gICAgaWYgKE1hdGguc3FydChNYXRoLnBvdyh0aGlzLnZlbFswXSwgMikgKyBNYXRoLnBvdyh0aGlzLnZlbFsxXSwgMikpIDwgLjEpIHtcclxuICAgICAgdGhpcy52ZWxbMF0gPSAwO1xyXG4gICAgICB0aGlzLnZlbFsxXSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudmVsWzBdID09PSAwICYmIHRoaXMudmVsWzFdID09PSAwO1xyXG4gIH1cclxuXHJcbiAgaGl0Qm91bmRhcnkoY2FudmFzRWwpIHtcclxuICAgIGlmICh0aGlzLnBvc1swXSArIHRoaXMudmVsWzBdID4gY2FudmFzRWwud2lkdGggfHwgdGhpcy5wb3NbMF0gKyB0aGlzLnZlbFswXSA8IDApIHtcclxuICAgICAgdGhpcy5tYWtlQm91bmNlU291bmQoKTtcclxuICAgICAgdGhpcy52ZWxbMF0gPSAtdGhpcy52ZWxbMF07XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBvc1sxXSArIHRoaXMudmVsWzFdID4gY2FudmFzRWwuaGVpZ2h0IHx8IHRoaXMucG9zWzFdICsgdGhpcy52ZWxbMV0gPCAwKSB7XHJcbiAgICAgIHRoaXMubWFrZUJvdW5jZVNvdW5kKCk7XHJcbiAgICAgIHRoaXMudmVsWzFdID0gLXRoaXMudmVsWzFdO1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaXRPYnN0YWNsZShvYnN0YWNsZSkge1xyXG5cclxuICB9XHJcblxyXG4gIGNvbGxpc2lvbkxlZnQob2JzdGFjbGUpIHtcclxuICAgIGxldCBzbG9wZSA9IHRoaXMudmVsWzFdL3RoaXMudmVsWzBdO1xyXG4gICAgbGV0IHdhbGxEaW0gPSBvYnN0YWNsZS5wb3NbMF0gLSBvYnN0YWNsZS53aWR0aC8yO1xyXG4gICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzFdICsgc2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1swXSk7XHJcbiAgICBsZXQgeUxvd2VyQm91bmQgPSBvYnN0YWNsZS5wb3NbMV0gLSBvYnN0YWNsZS5oZWlnaHQvMjtcclxuICAgIGxldCB5VXBwZXJCb3VuZCA9IG9ic3RhY2xlLnBvc1sxXSArIG9ic3RhY2xlLmhlaWdodC8yO1xyXG4gICAgaWYgKHRoaXMucHJldlBvc1swXSA8IHdhbGxEaW0pIHtcclxuICAgICAgaWYgKHRoaXMucG9zWzBdID4gd2FsbERpbSkge1xyXG4gICAgICAgIGlmKGludGVyc2VjdGlvblBUID4geUxvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB5VXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NbMF0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25QVDtcclxuICAgICAgICAgIHRoaXMudmVsWzBdID0gLXRoaXMudmVsWzBdXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbGxpc2lvblJpZ2h0KG9ic3RhY2xlKSB7XHJcbiAgICBsZXQgc2xvcGUgPSB0aGlzLnZlbFsxXS90aGlzLnZlbFswXTtcclxuICAgIGxldCB3YWxsRGltID0gb2JzdGFjbGUucG9zWzBdICsgb2JzdGFjbGUud2lkdGgvMjtcclxuICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IHRoaXMucHJldlBvc1sxXSArIHNsb3BlICogKHdhbGxEaW0gLSB0aGlzLnByZXZQb3NbMF0pO1xyXG4gICAgbGV0IHlMb3dlckJvdW5kID0gb2JzdGFjbGUucG9zWzFdIC0gb2JzdGFjbGUuaGVpZ2h0LzI7XHJcbiAgICBsZXQgeVVwcGVyQm91bmQgPSBvYnN0YWNsZS5wb3NbMV0gKyBvYnN0YWNsZS5oZWlnaHQvMjtcclxuICAgIGlmICh0aGlzLnByZXZQb3NbMF0gPiB3YWxsRGltKSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc1swXSA8IHdhbGxEaW0pIHtcclxuICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHlMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeVVwcGVyQm91bmQpIHtcclxuICAgICAgICAgIHRoaXMucG9zWzBdID0gd2FsbERpbTtcclxuICAgICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICB0aGlzLnZlbFswXSA9IC10aGlzLnZlbFswXVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25Ub3Aob2JzdGFjbGUpIHtcclxuICAgIGxldCBpbnZTbG9wZSA9IHRoaXMudmVsWzBdL3RoaXMudmVsWzFdO1xyXG4gICAgbGV0IHdhbGxEaW0gPSBvYnN0YWNsZS5wb3NbMV0gLSBvYnN0YWNsZS5oZWlnaHQvMjtcclxuICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IHRoaXMucHJldlBvc1swXSArIGludlNsb3BlICogKHdhbGxEaW0gLSB0aGlzLnByZXZQb3NbMV0pO1xyXG4gICAgbGV0IHhMb3dlckJvdW5kID0gb2JzdGFjbGUucG9zWzBdIC0gb2JzdGFjbGUud2lkdGgvMjtcclxuICAgIGxldCB4VXBwZXJCb3VuZCA9IG9ic3RhY2xlLnBvc1swXSArIG9ic3RhY2xlLndpZHRoLzI7XHJcbiAgICBpZiAodGhpcy5wcmV2UG9zWzFdIDwgd2FsbERpbSkge1xyXG4gICAgICBpZiAodGhpcy5wb3NbMV0gPiB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB4TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHhVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgdGhpcy52ZWxbMV0gPSAtdGhpcy52ZWxbMV1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uQm90KG9ic3RhY2xlKSB7XHJcbiAgICBsZXQgaW52U2xvcGUgPSB0aGlzLnZlbFswXS90aGlzLnZlbFsxXTtcclxuICAgIGxldCB3YWxsRGltID0gb2JzdGFjbGUucG9zWzFdICsgb2JzdGFjbGUuaGVpZ2h0LzI7XHJcbiAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSB0aGlzLnByZXZQb3NbMF0gKyBpbnZTbG9wZSAqICh3YWxsRGltIC0gdGhpcy5wcmV2UG9zWzFdKTtcclxuICAgIGxldCB4TG93ZXJCb3VuZCA9IG9ic3RhY2xlLnBvc1swXSAtIG9ic3RhY2xlLndpZHRoLzI7XHJcbiAgICBsZXQgeFVwcGVyQm91bmQgPSBvYnN0YWNsZS5wb3NbMF0gKyBvYnN0YWNsZS53aWR0aC8yO1xyXG4gICAgaWYgKHRoaXMucHJldlBvc1sxXSA+IHdhbGxEaW0pIHtcclxuICAgICAgaWYgKHRoaXMucG9zWzFdIDwgd2FsbERpbSkge1xyXG4gICAgICAgIGlmKGludGVyc2VjdGlvblBUID4geExvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB4VXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25QVDtcclxuICAgICAgICAgIHRoaXMucG9zWzFdID0gd2FsbERpbTtcclxuICAgICAgICAgIHRoaXMudmVsWzFdID0gLXRoaXMudmVsWzFdXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNoZWNrQ29sbGlzaW9ucyhvYnN0YWNsZSkge1xyXG4gICAgaWYgKHRoaXMuY29sbGlzaW9uTGVmdChvYnN0YWNsZSkgfHwgdGhpcy5jb2xsaXNpb25SaWdodChvYnN0YWNsZSkgfHwgdGhpcy5jb2xsaXNpb25Ub3Aob2JzdGFjbGUpIHx8IHRoaXMuY29sbGlzaW9uQm90KG9ic3RhY2xlKSkge1xyXG4gICAgICBsZXQgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1ZGlvLXBsYXllclwiKVxyXG4gICAgICBhdWRpby5zcmMgPSBcIi4uL2Fzc2V0cy9zb3VuZC9ib3VuY2Uud2F2XCI7XHJcbiAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJvdW5jZVNvdW5kKCkge1xyXG4gICAgbGV0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdWRpby1wbGF5ZXJcIilcclxuICAgIGF1ZGlvLnNyYyA9IFwiLi4vYXNzZXRzL3NvdW5kL2JvdW5jZS53YXZcIjtcclxuICAgIGF1ZGlvLnBsYXkoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVNwYXJrcyhwb3MpIHtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmluZ09iamVjdDsiLCJjbGFzcyBPYnN0YWNsZSB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XHJcbiAgICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aDtcclxuICAgIHRoaXMuYW5nbGUgPSBvcHRpb25zLmFuZ2xlO1xyXG4gICAgdGhpcy5jb2xvciA9IG9wdGlvbnMuY29sb3I7XHJcbiAgfVxyXG5cclxuICBkcmF3KGN0eCkge1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcbiAgICBjdHgucm90YXRlKHRoaXMuYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zWzBdLCAtdGhpcy5wb3NbMV0pO1xyXG4gICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zWzBdIC0gdGhpcy53aWR0aC8yLCB0aGlzLnBvc1sxXSAtIHRoaXMuaGVpZ2h0LzIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdKTtcclxuICAgIGN0eC5yb3RhdGUoLXRoaXMuYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zWzBdLCAtdGhpcy5wb3NbMV0pO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYnN0YWNsZTsiLCJjb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKCcuL21vdmluZ19vYmplY3QnKTtcclxuXHJcbmNsYXNzIFBsYXlCYWxsIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKVxyXG4gICAgdGhpcy5kZXRlcm1pbmVNb3ZlbWVudCA9IHRoaXMuZGV0ZXJtaW5lTW92ZW1lbnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMubWluQ2xpY2tEaXN0ID0gOFxyXG4gIH1cclxuXHJcbiAgZGV0ZXJtaW5lTW92ZW1lbnQoeENsaWNrLCB5Q2xpY2spIHtcclxuICAgIGxldCB4RGlmZiA9IHRoaXMucG9zWzBdIC0geENsaWNrO1xyXG4gICAgbGV0IHlEaWZmID0gdGhpcy5wb3NbMV0gLSB5Q2xpY2s7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKHhEaWZmKSA8IHRoaXMubWluQ2xpY2tEaXN0KSB7XHJcbiAgICAgIHhEaWZmID0geERpZmYvTWF0aC5hYnMoeERpZmYpKnRoaXMubWluQ2xpY2tEaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChNYXRoLmFicyh5RGlmZikgPCB0aGlzLm1pbkNsaWNrRGlzdCkge1xyXG4gICAgICB5RGlmZiA9IHlEaWZmL01hdGguYWJzKHlEaWZmKSp0aGlzLm1pbkNsaWNrRGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbWFnID0gMS8oTWF0aC5wb3coeERpZmYsIDIpICsgTWF0aC5wb3coeURpZmYsIDIpKTtcclxuICAgIGxldCB1bml0RGlyID0gW3hEaWZmLCB5RGlmZl07XHJcbiAgICB0aGlzLnZlbFswXSA9IHVuaXREaXJbMF0gKiBtYWcgKiA4NTA7XHJcbiAgICB0aGlzLnZlbFsxXSA9IHVuaXREaXJbMV0gKiBtYWcgKiA4NTA7XHJcbiAgfVxyXG5cclxuICBnZXREaXN0YW5jZSh0YXJnZXQpIHtcclxuICAgIGxldCB4RGlmZiA9IE1hdGguYWJzKHRoaXMucG9zWzBdIC0gdGFyZ2V0LnBvc1swXSk7XHJcbiAgICBsZXQgeURpZmYgPSBNYXRoLmFicyh0aGlzLnBvc1sxXSAtIHRhcmdldC5wb3NbMV0pO1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh4RGlmZip4RGlmZiArIHlEaWZmKnlEaWZmKS50b0ZpeGVkKDMpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5QmFsbDsiLCJjb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKFwiLi9tb3Zpbmdfb2JqZWN0XCIpO1xyXG5cclxuY2xhc3MgU3BhcmsgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIl07XHJcbiAgICB0aGlzXHJcbiAgICBzZXRJbnRlcnZhbCh0aGlzLmNoYW5nZUNvbG9yLCA1MDApO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQ29sb3IoKSB7XHJcbiAgICBsZXQgY29sb3JTdHIgPSBcIiNcIjtcclxuXHJcbiAgICB3aGlsZSAoY29sb3JTdHIubGVuZ3RoIDwgNikge1xyXG4gICAgICBjb2xvclN0ciArPSB0aGlzLmNvbG9yU2V0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLmNvbG9yU2V0Lmxlbmd0aCldO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29sb3IgPSBjb2xvclN0cjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3Bhcms7IiwiY2xhc3MgVGFyZ2V0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy52ZWwgPSBbMCwgMF07XHJcbiAgICB0aGlzLnJhZGl1cyA9IDg7XHJcbiAgICB0aGlzLmNvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIHRoaXMucG9zWzBdLFxyXG4gICAgICB0aGlzLnBvc1sxXSxcclxuICAgICAgdGhpcy5yYWRpdXMsXHJcbiAgICAgIDAsXHJcbiAgICAgIDIgKiBNYXRoLlBJLFxyXG4gICAgICBmYWxzZVxyXG4gICAgKTtcclxuXHJcbiAgICBjdHguZmlsbCgpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYXJnZXQ7Il0sInNvdXJjZVJvb3QiOiIifQ==