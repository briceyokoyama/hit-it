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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PlayBall = __webpack_require__(/*! ./play_ball */ "./src/play_ball.js");
const Target = __webpack_require__(/*! ./target */ "./src/target.js");
const Obstacle = __webpack_require__(/*! ./obstacle */ "./src/obstacle.js");

document.addEventListener("DOMContentLoaded", () => {

  let start = document.getElementById("start-button");
  start.addEventListener('click', startGame);

  const handleClick = (e) => {
    clicks++;
    // console.log("x: ", e.clientX, " y: ", e.clientY);
    let rect = e.target.getBoundingClientRect();
    pb.determineMovement(e.clientX - rect.left, e.clientY - rect.top);
    canvasEl.removeEventListener('click', handleClick);
  }

  const startGame = () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];

    canvasEl.style.display = "inline";
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
   
    requestAnimationFrame(doStuff);
  }
})

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

  collisionLeft(ball) {
    let slope = ball.vel[1]/ball.vel[0];
    let wallDim = this.pos[0] - this.width/2;
    let intersectionPT = ball.prevPos[1] + slope * (wallDim - ball.prevPos[0]);
    let yLowerBound = this.pos[1] - this.height/2;
    let yUpperBound = this.pos[1] + this.height/2;
    if (ball.prevPos[0] < wallDim) {
      if (ball.pos[0] > wallDim) {
        if(intersectionPT > yLowerBound && intersectionPT < yUpperBound) {
          ball.pos[0] = wallDim;
          ball.pos[1] = intersectionPT;
          ball.vel[0] = -ball.vel[0]
          return true;
        }
      }
    }
    return false;
  }

  collisionRight(ball) {
    let slope = ball.vel[1]/ball.vel[0];
    let wallDim = this.pos[0] + this.width/2;
    let intersectionPT = ball.prevPos[1] + slope * (wallDim - ball.prevPos[0]);
    let yLowerBound = this.pos[1] - this.height/2;
    let yUpperBound = this.pos[1] + this.height/2;
    if (ball.prevPos[0] > wallDim) {
      if (ball.pos[0] < wallDim) {
        if(intersectionPT > yLowerBound && intersectionPT < yUpperBound) {
          ball.pos[0] = wallDim;
          ball.pos[1] = intersectionPT;
          ball.vel[0] = -ball.vel[0]
          return true;
        }
      }
    }
    return false;
  }

  collisionTop(ball) {
    let invSlope = ball.vel[0]/ball.vel[1];
    let wallDim = this.pos[1] - this.height/2;
    let intersectionPT = ball.prevPos[0] + invSlope * (wallDim - ball.prevPos[1]);
    let xLowerBound = this.pos[0] - this.width/2;
    let xUpperBound = this.pos[0] + this.width/2;
    if (ball.prevPos[1] < wallDim) {
      if (ball.pos[1] > wallDim) {
        if(intersectionPT > xLowerBound && intersectionPT < xUpperBound) {
          ball.pos[0] = intersectionPT;
          ball.pos[1] = wallDim;
          ball.vel[1] = -ball.vel[1]
          return true;
        }
      }
    }
    return false;
  }

  collisionBot(ball) {
    let invSlope = ball.vel[0]/ball.vel[1];
    let wallDim = this.pos[1] + this.height/2;
    let intersectionPT = ball.prevPos[0] + invSlope * (wallDim - ball.prevPos[1]);
    let xLowerBound = this.pos[0] - this.width/2;
    let xUpperBound = this.pos[0] + this.width/2;
    if (ball.prevPos[1] > wallDim) {
      if (ball.pos[1] < wallDim) {
        if(intersectionPT > xLowerBound && intersectionPT < xUpperBound) {
          ball.pos[0] = intersectionPT;
          ball.pos[1] = wallDim;
          ball.vel[1] = -ball.vel[1]
          return true;
        }
      }
    }
    return false;
  }

  checkCollisions(ball) {
    if (this.collisionLeft(ball) || this.collisionRight(ball) || this.collisionTop(ball) || this.collisionBot(ball)) {
      return true;
    }
    return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zpbmdfb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9vYnN0YWNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheV9iYWxsLmpzIiwid2VicGFjazovLy8uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3RDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTs7QUFFckM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLEtBQUs7QUFDakMsOEJBQThCLE9BQU87QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyxDOzs7Ozs7Ozs7OztBQ3BGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4Qjs7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEI7Ozs7Ozs7Ozs7O0FDeEdBLHFCQUFxQixtQkFBTyxDQUFDLCtDQUFpQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgUGxheUJhbGwgPSByZXF1aXJlKFwiLi9wbGF5X2JhbGxcIik7XHJcbmNvbnN0IFRhcmdldCA9IHJlcXVpcmUoXCIuL3RhcmdldFwiKTtcclxuY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKFwiLi9vYnN0YWNsZVwiKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuXHJcbiAgbGV0IHN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1idXR0b25cIik7XHJcbiAgc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XHJcbiAgICBjbGlja3MrKztcclxuICAgIC8vIGNvbnNvbGUubG9nKFwieDogXCIsIGUuY2xpZW50WCwgXCIgeTogXCIsIGUuY2xpZW50WSk7XHJcbiAgICBsZXQgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgcGIuZGV0ZXJtaW5lTW92ZW1lbnQoZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBlLmNsaWVudFkgLSByZWN0LnRvcCk7XHJcbiAgICBjYW52YXNFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhbnZhc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjYW52YXNcIilbMF07XHJcblxyXG4gICAgY2FudmFzRWwuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICBjYW52YXNFbC5oZWlnaHQgPSA2MDA7XHJcbiAgICBjYW52YXNFbC53aWR0aCA9IDYwMDtcclxuICAgIGxldCBjdHggPSBjYW52YXNFbC5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBsZXQgb2JzID0gW107XHJcblxyXG4gICAgY29uc3QgcGIgPSBuZXcgUGxheUJhbGwoXHJcbiAgICAgIHsgcG9zOiBbMzAsIDMwXSwgdmVsOiBbMCwgMF0sIHJhZGl1czogNSwgY29sb3I6IFwiIzU1YWFjY1wifVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXQgPSBuZXcgVGFyZ2V0KFxyXG4gICAgICB7IHBvczogWzMwMCwgMzAwXX1cclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgb2JzMSA9IG5ldyBPYnN0YWNsZShcclxuICAgICAgeyBwb3M6IFs0MDAsIDMwMF0sIGhlaWdodDogMzAwLCB3aWR0aDogMjAsIGFuZ2xlOiAwLCBjb2xvcjogXCIjRjczOUEzXCJ9XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IG9iczIgPSBuZXcgT2JzdGFjbGUoXHJcbiAgICAgIHsgcG9zOiBbMjAwLCAzMDBdLCBoZWlnaHQ6IDMwMCwgd2lkdGg6IDIwLCBhbmdsZTogMCwgY29sb3I6IFwiI0Y3MzlBM1wifVxyXG4gICAgKTtcclxuXHJcbiAgICBvYnMucHVzaChvYnMxKTtcclxuICAgIG9icy5wdXNoKG9iczIpO1xyXG5cclxuICAgIGNhbnZhc0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2spXHJcbiAgICBsZXQgZGlzdDtcclxuICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICBsZXQgY2xpY2tzID0gMDtcclxuXHJcbiAgICBjb25zdCBkb1N0dWZmID0gKCkgPT4ge1xyXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xyXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCJcclxuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xyXG4gIFxyXG4gICAgICBpZiAocGIucG9zWzBdICsgcGIudmVsWzBdID4gY2FudmFzRWwud2lkdGggfHwgcGIucG9zWzBdICsgcGIudmVsWzBdIDwgMCkge1xyXG4gICAgICAgIHBiLnZlbFswXSA9IC1wYi52ZWxbMF07XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgaWYgKHBiLnBvc1sxXSArIHBiLnZlbFsxXSA+IGNhbnZhc0VsLndpZHRoIHx8IHBiLnBvc1sxXSArIHBiLnZlbFsxXSA8IDApIHtcclxuICAgICAgICBwYi52ZWxbMV0gPSAtcGIudmVsWzFdO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIG9icy5mb3JFYWNoKG9iID0+IHtcclxuICAgICAgICBvYi5jaGVja0NvbGxpc2lvbnMocGIpO1xyXG4gICAgICAgIG9iLmRyYXcoY3R4KTtcclxuICAgICAgfSlcclxuICBcclxuICAgICAgZGlzdCA9IHBiLmdldERpc3RhbmNlKHRhcmdldCk7XHJcbiAgICAgIHRhcmdldC5kcmF3KGN0eCk7XHJcbiAgICAgIHBiLmRyYXcoY3R4KTtcclxuICAgICAgY3R4LnRleHRBbGlnbiA9IFwiZW5kXCI7XHJcbiAgICAgIGN0eC5mb250ID0gJzI0cHggQXJpYWwnO1xyXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgIGN0eC5maWxsVGV4dChgZGlzdDogJHtkaXN0fWAsIDU4NSwgMjUpO1xyXG4gICAgICBjdHguZmlsbFRleHQoYGNsaWNrczogJHtjbGlja3N9YCwgNTg1LCA2MCk7XHJcbiAgICAgIGlmIChwYi5tb3ZlKCkpIHtcclxuICAgICAgICBjYW52YXNFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrKTtcclxuICAgICAgfTtcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvU3R1ZmYpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkb1N0dWZmKTtcclxuICB9XHJcbn0pIiwiY2xhc3MgTW92aW5nT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy52ZWwgPSBvcHRpb25zLnZlbDtcclxuICAgIHRoaXMucmFkaXVzID0gb3B0aW9ucy5yYWRpdXM7XHJcbiAgICB0aGlzLmNvbG9yID0gb3B0aW9ucy5jb2xvcjtcclxuICAgIHRoaXMubW92ZSA9IHRoaXMubW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5kcmF3ID0gdGhpcy5kcmF3LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnByZXZQb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMuZnJpY3Rpb24gPSAuOTggLy8wLjkgd2FzIHRoZSBmaXJzdCB2YWx1ZVxyXG4gIH1cclxuXHJcbiAgZHJhdyhjdHgpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYyhcclxuICAgICAgdGhpcy5wb3NbMF0sXHJcbiAgICAgIHRoaXMucG9zWzFdLFxyXG4gICAgICB0aGlzLnJhZGl1cyxcclxuICAgICAgMCxcclxuICAgICAgMiAqIE1hdGguUEksXHJcbiAgICAgIGZhbHNlXHJcbiAgICApO1xyXG5cclxuICAgIGN0eC5maWxsKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgdGhpcy5wcmV2UG9zID0gdGhpcy5wb3M7XHJcbiAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIHRoaXMudmVsWzBdLCB0aGlzLnBvc1sxXSArIHRoaXMudmVsWzFdXTtcclxuICAgIHRoaXMudmVsID0gW3RoaXMudmVsWzBdKnRoaXMuZnJpY3Rpb24sIHRoaXMudmVsWzFdKnRoaXMuZnJpY3Rpb25dO1xyXG4gICAgaWYgKE1hdGguc3FydChNYXRoLnBvdyh0aGlzLnZlbFswXSwgMikgKyBNYXRoLnBvdyh0aGlzLnZlbFsxXSwgMikpIDwgLjEpIHtcclxuICAgICAgdGhpcy52ZWxbMF0gPSAwO1xyXG4gICAgICB0aGlzLnZlbFsxXSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudmVsWzBdID09PSAwICYmIHRoaXMudmVsWzFdID09PSAwO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb3ZpbmdPYmplY3Q7IiwiY2xhc3MgT2JzdGFjbGUge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xyXG4gICAgdGhpcy53aWR0aCA9IG9wdGlvbnMud2lkdGg7XHJcbiAgICB0aGlzLmFuZ2xlID0gb3B0aW9ucy5hbmdsZTtcclxuICAgIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjdHgpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0pO1xyXG4gICAgY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKC10aGlzLnBvc1swXSwgLXRoaXMucG9zWzFdKTtcclxuICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc1swXSAtIHRoaXMud2lkdGgvMiwgdGhpcy5wb3NbMV0gLSB0aGlzLmhlaWdodC8yLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcbiAgICBjdHgucm90YXRlKC10aGlzLmFuZ2xlICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKC10aGlzLnBvc1swXSwgLXRoaXMucG9zWzFdKTtcclxuICB9XHJcblxyXG4gIGNvbGxpc2lvbkxlZnQoYmFsbCkge1xyXG4gICAgbGV0IHNsb3BlID0gYmFsbC52ZWxbMV0vYmFsbC52ZWxbMF07XHJcbiAgICBsZXQgd2FsbERpbSA9IHRoaXMucG9zWzBdIC0gdGhpcy53aWR0aC8yO1xyXG4gICAgbGV0IGludGVyc2VjdGlvblBUID0gYmFsbC5wcmV2UG9zWzFdICsgc2xvcGUgKiAod2FsbERpbSAtIGJhbGwucHJldlBvc1swXSk7XHJcbiAgICBsZXQgeUxvd2VyQm91bmQgPSB0aGlzLnBvc1sxXSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICBsZXQgeVVwcGVyQm91bmQgPSB0aGlzLnBvc1sxXSArIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICBpZiAoYmFsbC5wcmV2UG9zWzBdIDwgd2FsbERpbSkge1xyXG4gICAgICBpZiAoYmFsbC5wb3NbMF0gPiB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB5TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHlVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICBiYWxsLnBvc1swXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICBiYWxsLnBvc1sxXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgYmFsbC52ZWxbMF0gPSAtYmFsbC52ZWxbMF1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uUmlnaHQoYmFsbCkge1xyXG4gICAgbGV0IHNsb3BlID0gYmFsbC52ZWxbMV0vYmFsbC52ZWxbMF07XHJcbiAgICBsZXQgd2FsbERpbSA9IHRoaXMucG9zWzBdICsgdGhpcy53aWR0aC8yO1xyXG4gICAgbGV0IGludGVyc2VjdGlvblBUID0gYmFsbC5wcmV2UG9zWzFdICsgc2xvcGUgKiAod2FsbERpbSAtIGJhbGwucHJldlBvc1swXSk7XHJcbiAgICBsZXQgeUxvd2VyQm91bmQgPSB0aGlzLnBvc1sxXSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICBsZXQgeVVwcGVyQm91bmQgPSB0aGlzLnBvc1sxXSArIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICBpZiAoYmFsbC5wcmV2UG9zWzBdID4gd2FsbERpbSkge1xyXG4gICAgICBpZiAoYmFsbC5wb3NbMF0gPCB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB5TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHlVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICBiYWxsLnBvc1swXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICBiYWxsLnBvc1sxXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgYmFsbC52ZWxbMF0gPSAtYmFsbC52ZWxbMF1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uVG9wKGJhbGwpIHtcclxuICAgIGxldCBpbnZTbG9wZSA9IGJhbGwudmVsWzBdL2JhbGwudmVsWzFdO1xyXG4gICAgbGV0IHdhbGxEaW0gPSB0aGlzLnBvc1sxXSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSBiYWxsLnByZXZQb3NbMF0gKyBpbnZTbG9wZSAqICh3YWxsRGltIC0gYmFsbC5wcmV2UG9zWzFdKTtcclxuICAgIGxldCB4TG93ZXJCb3VuZCA9IHRoaXMucG9zWzBdIC0gdGhpcy53aWR0aC8yO1xyXG4gICAgbGV0IHhVcHBlckJvdW5kID0gdGhpcy5wb3NbMF0gKyB0aGlzLndpZHRoLzI7XHJcbiAgICBpZiAoYmFsbC5wcmV2UG9zWzFdIDwgd2FsbERpbSkge1xyXG4gICAgICBpZiAoYmFsbC5wb3NbMV0gPiB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB4TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHhVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICBiYWxsLnBvc1swXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgYmFsbC5wb3NbMV0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgYmFsbC52ZWxbMV0gPSAtYmFsbC52ZWxbMV1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uQm90KGJhbGwpIHtcclxuICAgIGxldCBpbnZTbG9wZSA9IGJhbGwudmVsWzBdL2JhbGwudmVsWzFdO1xyXG4gICAgbGV0IHdhbGxEaW0gPSB0aGlzLnBvc1sxXSArIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSBiYWxsLnByZXZQb3NbMF0gKyBpbnZTbG9wZSAqICh3YWxsRGltIC0gYmFsbC5wcmV2UG9zWzFdKTtcclxuICAgIGxldCB4TG93ZXJCb3VuZCA9IHRoaXMucG9zWzBdIC0gdGhpcy53aWR0aC8yO1xyXG4gICAgbGV0IHhVcHBlckJvdW5kID0gdGhpcy5wb3NbMF0gKyB0aGlzLndpZHRoLzI7XHJcbiAgICBpZiAoYmFsbC5wcmV2UG9zWzFdID4gd2FsbERpbSkge1xyXG4gICAgICBpZiAoYmFsbC5wb3NbMV0gPCB3YWxsRGltKSB7XHJcbiAgICAgICAgaWYoaW50ZXJzZWN0aW9uUFQgPiB4TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHhVcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICBiYWxsLnBvc1swXSA9IGludGVyc2VjdGlvblBUO1xyXG4gICAgICAgICAgYmFsbC5wb3NbMV0gPSB3YWxsRGltO1xyXG4gICAgICAgICAgYmFsbC52ZWxbMV0gPSAtYmFsbC52ZWxbMV1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDb2xsaXNpb25zKGJhbGwpIHtcclxuICAgIGlmICh0aGlzLmNvbGxpc2lvbkxlZnQoYmFsbCkgfHwgdGhpcy5jb2xsaXNpb25SaWdodChiYWxsKSB8fCB0aGlzLmNvbGxpc2lvblRvcChiYWxsKSB8fCB0aGlzLmNvbGxpc2lvbkJvdChiYWxsKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JzdGFjbGU7IiwiY29uc3QgTW92aW5nT2JqZWN0ID0gcmVxdWlyZSgnLi9tb3Zpbmdfb2JqZWN0Jyk7XHJcblxyXG5jbGFzcyBQbGF5QmFsbCBleHRlbmRzIE1vdmluZ09iamVjdCB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucylcclxuICAgIHRoaXMuZGV0ZXJtaW5lTW92ZW1lbnQgPSB0aGlzLmRldGVybWluZU1vdmVtZW50LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm1pbkNsaWNrRGlzdCA9IDhcclxuICB9XHJcblxyXG4gIGRldGVybWluZU1vdmVtZW50KHhDbGljaywgeUNsaWNrKSB7XHJcbiAgICBsZXQgeERpZmYgPSB0aGlzLnBvc1swXSAtIHhDbGljaztcclxuICAgIGxldCB5RGlmZiA9IHRoaXMucG9zWzFdIC0geUNsaWNrO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyh4RGlmZikgPCB0aGlzLm1pbkNsaWNrRGlzdCkge1xyXG4gICAgICB4RGlmZiA9IHhEaWZmL01hdGguYWJzKHhEaWZmKSp0aGlzLm1pbkNsaWNrRGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTWF0aC5hYnMoeURpZmYpIDwgdGhpcy5taW5DbGlja0Rpc3QpIHtcclxuICAgICAgeURpZmYgPSB5RGlmZi9NYXRoLmFicyh5RGlmZikqdGhpcy5taW5DbGlja0Rpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1hZyA9IDEvKE1hdGgucG93KHhEaWZmLCAyKSArIE1hdGgucG93KHlEaWZmLCAyKSk7XHJcbiAgICBsZXQgdW5pdERpciA9IFt4RGlmZiwgeURpZmZdO1xyXG4gICAgdGhpcy52ZWxbMF0gPSB1bml0RGlyWzBdICogbWFnICogODUwO1xyXG4gICAgdGhpcy52ZWxbMV0gPSB1bml0RGlyWzFdICogbWFnICogODUwO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGlzdGFuY2UodGFyZ2V0KSB7XHJcbiAgICBsZXQgeERpZmYgPSBNYXRoLmFicyh0aGlzLnBvc1swXSAtIHRhcmdldC5wb3NbMF0pO1xyXG4gICAgbGV0IHlEaWZmID0gTWF0aC5hYnModGhpcy5wb3NbMV0gLSB0YXJnZXQucG9zWzFdKTtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoeERpZmYqeERpZmYgKyB5RGlmZip5RGlmZikudG9GaXhlZCgzKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheUJhbGw7IiwiY2xhc3MgVGFyZ2V0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy52ZWwgPSBbMCwgMF07XHJcbiAgICB0aGlzLnJhZGl1cyA9IDg7XHJcbiAgICB0aGlzLmNvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIHRoaXMucG9zWzBdLFxyXG4gICAgICB0aGlzLnBvc1sxXSxcclxuICAgICAgdGhpcy5yYWRpdXMsXHJcbiAgICAgIDAsXHJcbiAgICAgIDIgKiBNYXRoLlBJLFxyXG4gICAgICBmYWxzZVxyXG4gICAgKTtcclxuXHJcbiAgICBjdHguZmlsbCgpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYXJnZXQ7Il0sInNvdXJjZVJvb3QiOiIifQ==