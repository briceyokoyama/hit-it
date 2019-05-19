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

  let start = false;

  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.style.display = "block";
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

  const handleClick = (e) => {
    clicks++;
    // console.log("x: ", e.clientX, " y: ", e.clientY);
    let rect = e.target.getBoundingClientRect();
    pb.determineMovement(e.clientX - rect.left, e.clientY - rect.top);
    canvasEl.removeEventListener('click', handleClick);
  }

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

  const startGame = () => {
    
  }
  requestAnimationFrame(doStuff);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zpbmdfb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9vYnN0YWNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheV9iYWxsLmpzIiwid2VicGFjazovLy8uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3RDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTs7QUFFckM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixLQUFLO0FBQy9CLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUMsQzs7Ozs7Ozs7Ozs7QUNuRkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7OztBQ3hHQSxxQkFBcUIsbUJBQU8sQ0FBQywrQ0FBaUI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQjs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3QiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNvbnN0IFBsYXlCYWxsID0gcmVxdWlyZShcIi4vcGxheV9iYWxsXCIpO1xyXG5jb25zdCBUYXJnZXQgPSByZXF1aXJlKFwiLi90YXJnZXRcIik7XHJcbmNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZShcIi4vb2JzdGFjbGVcIik7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcblxyXG4gIGxldCBzdGFydCA9IGZhbHNlO1xyXG5cclxuICBjb25zdCBjYW52YXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FudmFzXCIpWzBdO1xyXG4gIGNhbnZhc0VsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgY2FudmFzRWwuaGVpZ2h0ID0gNjAwO1xyXG4gIGNhbnZhc0VsLndpZHRoID0gNjAwO1xyXG4gIGxldCBjdHggPSBjYW52YXNFbC5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgbGV0IG9icyA9IFtdO1xyXG5cclxuICBjb25zdCBwYiA9IG5ldyBQbGF5QmFsbChcclxuICAgIHsgcG9zOiBbMzAsIDMwXSwgdmVsOiBbMCwgMF0sIHJhZGl1czogNSwgY29sb3I6IFwiIzU1YWFjY1wifVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRhcmdldCA9IG5ldyBUYXJnZXQoXHJcbiAgICB7IHBvczogWzMwMCwgMzAwXX1cclxuICApO1xyXG5cclxuICBjb25zdCBvYnMxID0gbmV3IE9ic3RhY2xlKFxyXG4gICAgeyBwb3M6IFs0MDAsIDMwMF0sIGhlaWdodDogMzAwLCB3aWR0aDogMjAsIGFuZ2xlOiAwLCBjb2xvcjogXCIjRjczOUEzXCJ9XHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb2JzMiA9IG5ldyBPYnN0YWNsZShcclxuICAgIHsgcG9zOiBbMjAwLCAzMDBdLCBoZWlnaHQ6IDMwMCwgd2lkdGg6IDIwLCBhbmdsZTogMCwgY29sb3I6IFwiI0Y3MzlBM1wifVxyXG4gICk7XHJcblxyXG4gIG9icy5wdXNoKG9iczEpO1xyXG4gIG9icy5wdXNoKG9iczIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XHJcbiAgICBjbGlja3MrKztcclxuICAgIC8vIGNvbnNvbGUubG9nKFwieDogXCIsIGUuY2xpZW50WCwgXCIgeTogXCIsIGUuY2xpZW50WSk7XHJcbiAgICBsZXQgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgcGIuZGV0ZXJtaW5lTW92ZW1lbnQoZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBlLmNsaWVudFkgLSByZWN0LnRvcCk7XHJcbiAgICBjYW52YXNFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrKTtcclxuICB9XHJcblxyXG4gIGNhbnZhc0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2spXHJcbiAgbGV0IGRpc3Q7XHJcbiAgbGV0IHNjb3JlID0gMDtcclxuICBsZXQgY2xpY2tzID0gMDtcclxuXHJcbiAgY29uc3QgZG9TdHVmZiA9ICgpID0+IHtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzRWwud2lkdGgsIGNhbnZhc0VsLmhlaWdodCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCJcclxuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXNFbC53aWR0aCwgY2FudmFzRWwuaGVpZ2h0KTtcclxuXHJcbiAgICBpZiAocGIucG9zWzBdICsgcGIudmVsWzBdID4gY2FudmFzRWwud2lkdGggfHwgcGIucG9zWzBdICsgcGIudmVsWzBdIDwgMCkge1xyXG4gICAgICBwYi52ZWxbMF0gPSAtcGIudmVsWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYi5wb3NbMV0gKyBwYi52ZWxbMV0gPiBjYW52YXNFbC53aWR0aCB8fCBwYi5wb3NbMV0gKyBwYi52ZWxbMV0gPCAwKSB7XHJcbiAgICAgIHBiLnZlbFsxXSA9IC1wYi52ZWxbMV07XHJcbiAgICB9XHJcblxyXG4gICAgb2JzLmZvckVhY2gob2IgPT4ge1xyXG4gICAgICBvYi5jaGVja0NvbGxpc2lvbnMocGIpO1xyXG4gICAgICBvYi5kcmF3KGN0eCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRpc3QgPSBwYi5nZXREaXN0YW5jZSh0YXJnZXQpO1xyXG4gICAgdGFyZ2V0LmRyYXcoY3R4KTtcclxuICAgIHBiLmRyYXcoY3R4KTtcclxuICAgIGN0eC50ZXh0QWxpZ24gPSBcImVuZFwiO1xyXG4gICAgY3R4LmZvbnQgPSAnMjRweCBBcmlhbCc7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XHJcbiAgICBjdHguZmlsbFRleHQoYGRpc3Q6ICR7ZGlzdH1gLCA1ODUsIDI1KTtcclxuICAgIGN0eC5maWxsVGV4dChgY2xpY2tzOiAke2NsaWNrc31gLCA1ODUsIDYwKTtcclxuICAgIGlmIChwYi5tb3ZlKCkpIHtcclxuICAgICAgY2FudmFzRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljayk7XHJcbiAgICB9O1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvU3R1ZmYpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gICAgXHJcbiAgfVxyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShkb1N0dWZmKTtcclxufSkiLCJjbGFzcyBNb3ZpbmdPYmplY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLnZlbCA9IG9wdGlvbnMudmVsO1xyXG4gICAgdGhpcy5yYWRpdXMgPSBvcHRpb25zLnJhZGl1cztcclxuICAgIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yO1xyXG4gICAgdGhpcy5tb3ZlID0gdGhpcy5tb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcclxuICAgIHRoaXMucHJldlBvcyA9IG9wdGlvbnMucG9zO1xyXG4gICAgdGhpcy5mcmljdGlvbiA9IC45OCAvLzAuOSB3YXMgdGhlIGZpcnN0IHZhbHVlXHJcbiAgfVxyXG5cclxuICBkcmF3KGN0eCkge1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKFxyXG4gICAgICB0aGlzLnBvc1swXSxcclxuICAgICAgdGhpcy5wb3NbMV0sXHJcbiAgICAgIHRoaXMucmFkaXVzLFxyXG4gICAgICAwLFxyXG4gICAgICAyICogTWF0aC5QSSxcclxuICAgICAgZmFsc2VcclxuICAgICk7XHJcblxyXG4gICAgY3R4LmZpbGwoKTtcclxuICB9XHJcblxyXG4gIG1vdmUoKSB7XHJcbiAgICB0aGlzLnByZXZQb3MgPSB0aGlzLnBvcztcclxuICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdICsgdGhpcy52ZWxbMF0sIHRoaXMucG9zWzFdICsgdGhpcy52ZWxbMV1dO1xyXG4gICAgdGhpcy52ZWwgPSBbdGhpcy52ZWxbMF0qdGhpcy5mcmljdGlvbiwgdGhpcy52ZWxbMV0qdGhpcy5mcmljdGlvbl07XHJcbiAgICBpZiAoTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMudmVsWzBdLCAyKSArIE1hdGgucG93KHRoaXMudmVsWzFdLCAyKSkgPCAuMSkge1xyXG4gICAgICB0aGlzLnZlbFswXSA9IDA7XHJcbiAgICAgIHRoaXMudmVsWzFdID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy52ZWxbMF0gPT09IDAgJiYgdGhpcy52ZWxbMV0gPT09IDA7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmluZ09iamVjdDsiLCJjbGFzcyBPYnN0YWNsZSB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcclxuICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XHJcbiAgICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aDtcclxuICAgIHRoaXMuYW5nbGUgPSBvcHRpb25zLmFuZ2xlO1xyXG4gICAgdGhpcy5jb2xvciA9IG9wdGlvbnMuY29sb3I7XHJcbiAgfVxyXG5cclxuICBkcmF3KGN0eCkge1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcbiAgICBjdHgucm90YXRlKHRoaXMuYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zWzBdLCAtdGhpcy5wb3NbMV0pO1xyXG4gICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zWzBdIC0gdGhpcy53aWR0aC8yLCB0aGlzLnBvc1sxXSAtIHRoaXMuaGVpZ2h0LzIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdKTtcclxuICAgIGN0eC5yb3RhdGUoLXRoaXMuYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zWzBdLCAtdGhpcy5wb3NbMV0pO1xyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uTGVmdChiYWxsKSB7XHJcbiAgICBsZXQgc2xvcGUgPSBiYWxsLnZlbFsxXS9iYWxsLnZlbFswXTtcclxuICAgIGxldCB3YWxsRGltID0gdGhpcy5wb3NbMF0gLSB0aGlzLndpZHRoLzI7XHJcbiAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSBiYWxsLnByZXZQb3NbMV0gKyBzbG9wZSAqICh3YWxsRGltIC0gYmFsbC5wcmV2UG9zWzBdKTtcclxuICAgIGxldCB5TG93ZXJCb3VuZCA9IHRoaXMucG9zWzFdIC0gdGhpcy5oZWlnaHQvMjtcclxuICAgIGxldCB5VXBwZXJCb3VuZCA9IHRoaXMucG9zWzFdICsgdGhpcy5oZWlnaHQvMjtcclxuICAgIGlmIChiYWxsLnByZXZQb3NbMF0gPCB3YWxsRGltKSB7XHJcbiAgICAgIGlmIChiYWxsLnBvc1swXSA+IHdhbGxEaW0pIHtcclxuICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHlMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeVVwcGVyQm91bmQpIHtcclxuICAgICAgICAgIGJhbGwucG9zWzBdID0gd2FsbERpbTtcclxuICAgICAgICAgIGJhbGwucG9zWzFdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICBiYWxsLnZlbFswXSA9IC1iYWxsLnZlbFswXVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25SaWdodChiYWxsKSB7XHJcbiAgICBsZXQgc2xvcGUgPSBiYWxsLnZlbFsxXS9iYWxsLnZlbFswXTtcclxuICAgIGxldCB3YWxsRGltID0gdGhpcy5wb3NbMF0gKyB0aGlzLndpZHRoLzI7XHJcbiAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSBiYWxsLnByZXZQb3NbMV0gKyBzbG9wZSAqICh3YWxsRGltIC0gYmFsbC5wcmV2UG9zWzBdKTtcclxuICAgIGxldCB5TG93ZXJCb3VuZCA9IHRoaXMucG9zWzFdIC0gdGhpcy5oZWlnaHQvMjtcclxuICAgIGxldCB5VXBwZXJCb3VuZCA9IHRoaXMucG9zWzFdICsgdGhpcy5oZWlnaHQvMjtcclxuICAgIGlmIChiYWxsLnByZXZQb3NbMF0gPiB3YWxsRGltKSB7XHJcbiAgICAgIGlmIChiYWxsLnBvc1swXSA8IHdhbGxEaW0pIHtcclxuICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHlMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeVVwcGVyQm91bmQpIHtcclxuICAgICAgICAgIGJhbGwucG9zWzBdID0gd2FsbERpbTtcclxuICAgICAgICAgIGJhbGwucG9zWzFdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICBiYWxsLnZlbFswXSA9IC1iYWxsLnZlbFswXVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25Ub3AoYmFsbCkge1xyXG4gICAgbGV0IGludlNsb3BlID0gYmFsbC52ZWxbMF0vYmFsbC52ZWxbMV07XHJcbiAgICBsZXQgd2FsbERpbSA9IHRoaXMucG9zWzFdIC0gdGhpcy5oZWlnaHQvMjtcclxuICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IGJhbGwucHJldlBvc1swXSArIGludlNsb3BlICogKHdhbGxEaW0gLSBiYWxsLnByZXZQb3NbMV0pO1xyXG4gICAgbGV0IHhMb3dlckJvdW5kID0gdGhpcy5wb3NbMF0gLSB0aGlzLndpZHRoLzI7XHJcbiAgICBsZXQgeFVwcGVyQm91bmQgPSB0aGlzLnBvc1swXSArIHRoaXMud2lkdGgvMjtcclxuICAgIGlmIChiYWxsLnByZXZQb3NbMV0gPCB3YWxsRGltKSB7XHJcbiAgICAgIGlmIChiYWxsLnBvc1sxXSA+IHdhbGxEaW0pIHtcclxuICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHhMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeFVwcGVyQm91bmQpIHtcclxuICAgICAgICAgIGJhbGwucG9zWzBdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICBiYWxsLnBvc1sxXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICBiYWxsLnZlbFsxXSA9IC1iYWxsLnZlbFsxXVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25Cb3QoYmFsbCkge1xyXG4gICAgbGV0IGludlNsb3BlID0gYmFsbC52ZWxbMF0vYmFsbC52ZWxbMV07XHJcbiAgICBsZXQgd2FsbERpbSA9IHRoaXMucG9zWzFdICsgdGhpcy5oZWlnaHQvMjtcclxuICAgIGxldCBpbnRlcnNlY3Rpb25QVCA9IGJhbGwucHJldlBvc1swXSArIGludlNsb3BlICogKHdhbGxEaW0gLSBiYWxsLnByZXZQb3NbMV0pO1xyXG4gICAgbGV0IHhMb3dlckJvdW5kID0gdGhpcy5wb3NbMF0gLSB0aGlzLndpZHRoLzI7XHJcbiAgICBsZXQgeFVwcGVyQm91bmQgPSB0aGlzLnBvc1swXSArIHRoaXMud2lkdGgvMjtcclxuICAgIGlmIChiYWxsLnByZXZQb3NbMV0gPiB3YWxsRGltKSB7XHJcbiAgICAgIGlmIChiYWxsLnBvc1sxXSA8IHdhbGxEaW0pIHtcclxuICAgICAgICBpZihpbnRlcnNlY3Rpb25QVCA+IHhMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeFVwcGVyQm91bmQpIHtcclxuICAgICAgICAgIGJhbGwucG9zWzBdID0gaW50ZXJzZWN0aW9uUFQ7XHJcbiAgICAgICAgICBiYWxsLnBvc1sxXSA9IHdhbGxEaW07XHJcbiAgICAgICAgICBiYWxsLnZlbFsxXSA9IC1iYWxsLnZlbFsxXVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjaGVja0NvbGxpc2lvbnMoYmFsbCkge1xyXG4gICAgaWYgKHRoaXMuY29sbGlzaW9uTGVmdChiYWxsKSB8fCB0aGlzLmNvbGxpc2lvblJpZ2h0KGJhbGwpIHx8IHRoaXMuY29sbGlzaW9uVG9wKGJhbGwpIHx8IHRoaXMuY29sbGlzaW9uQm90KGJhbGwpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYnN0YWNsZTsiLCJjb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKCcuL21vdmluZ19vYmplY3QnKTtcclxuXHJcbmNsYXNzIFBsYXlCYWxsIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKVxyXG4gICAgdGhpcy5kZXRlcm1pbmVNb3ZlbWVudCA9IHRoaXMuZGV0ZXJtaW5lTW92ZW1lbnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMubWluQ2xpY2tEaXN0ID0gOFxyXG4gIH1cclxuXHJcbiAgZGV0ZXJtaW5lTW92ZW1lbnQoeENsaWNrLCB5Q2xpY2spIHtcclxuICAgIGxldCB4RGlmZiA9IHRoaXMucG9zWzBdIC0geENsaWNrO1xyXG4gICAgbGV0IHlEaWZmID0gdGhpcy5wb3NbMV0gLSB5Q2xpY2s7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKHhEaWZmKSA8IHRoaXMubWluQ2xpY2tEaXN0KSB7XHJcbiAgICAgIHhEaWZmID0geERpZmYvTWF0aC5hYnMoeERpZmYpKnRoaXMubWluQ2xpY2tEaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChNYXRoLmFicyh5RGlmZikgPCB0aGlzLm1pbkNsaWNrRGlzdCkge1xyXG4gICAgICB5RGlmZiA9IHlEaWZmL01hdGguYWJzKHlEaWZmKSp0aGlzLm1pbkNsaWNrRGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbWFnID0gMS8oTWF0aC5wb3coeERpZmYsIDIpICsgTWF0aC5wb3coeURpZmYsIDIpKTtcclxuICAgIGxldCB1bml0RGlyID0gW3hEaWZmLCB5RGlmZl07XHJcbiAgICB0aGlzLnZlbFswXSA9IHVuaXREaXJbMF0gKiBtYWcgKiA4NTA7XHJcbiAgICB0aGlzLnZlbFsxXSA9IHVuaXREaXJbMV0gKiBtYWcgKiA4NTA7XHJcbiAgfVxyXG5cclxuICBnZXREaXN0YW5jZSh0YXJnZXQpIHtcclxuICAgIGxldCB4RGlmZiA9IE1hdGguYWJzKHRoaXMucG9zWzBdIC0gdGFyZ2V0LnBvc1swXSk7XHJcbiAgICBsZXQgeURpZmYgPSBNYXRoLmFicyh0aGlzLnBvc1sxXSAtIHRhcmdldC5wb3NbMV0pO1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh4RGlmZip4RGlmZiArIHlEaWZmKnlEaWZmKS50b0ZpeGVkKDMpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5QmFsbDsiLCJjbGFzcyBUYXJnZXQge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XHJcbiAgICB0aGlzLnZlbCA9IFswLCAwXTtcclxuICAgIHRoaXMucmFkaXVzID0gODtcclxuICAgIHRoaXMuY29sb3IgPSBcIiNmZmZmZmZcIjtcclxuICAgIHRoaXMuZHJhdyA9IHRoaXMuZHJhdy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjdHgpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYyhcclxuICAgICAgdGhpcy5wb3NbMF0sXHJcbiAgICAgIHRoaXMucG9zWzFdLFxyXG4gICAgICB0aGlzLnJhZGl1cyxcclxuICAgICAgMCxcclxuICAgICAgMiAqIE1hdGguUEksXHJcbiAgICAgIGZhbHNlXHJcbiAgICApO1xyXG5cclxuICAgIGN0eC5maWxsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRhcmdldDsiXSwic291cmNlUm9vdCI6IiJ9