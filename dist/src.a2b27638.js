// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");
var body = document.getElementsByTagName("body");

// ---------------------------
// creating playboard region
// if screen width is very large, playboard region is 60%
// else playboard region is 100%
// ---------------------------
var playBoard = document.createElement("div");
playBoard.setAttribute("id", "playBoard");
body[0].append(playBoard);

// ---------------------------
// creating rod1
// ---------------------------
var rod1 = document.createElement("div");
rod1.setAttribute("id", "rod1");
rod1.setAttribute("class", "rod rod-top");
rod1.innerText = "Rod 1";
playBoard.append(rod1);

// ---------------------------
// creating rod2
// ---------------------------
var rod2 = document.createElement("div");
rod2.setAttribute("id", "rod2");
rod2.setAttribute("class", "rod rod-bottom");
rod2.innerText = "Rod2";
playBoard.append(rod2);

// ---------------------------
// creating ball
// ---------------------------
var ball = document.createElement("div");
ball.setAttribute("id", "ballBox");
playBoard.append(ball);
var innerBall = document.createElement("div");
innerBall.setAttribute("id", "ball");
innerBall.setAttribute("class", "animate-ball");
ball.append(innerBall);

// ---------------------------
// creating region to be displayed at the beginning and end of the game
// ---------------------------
var msg = document.createElement("div");
msg.setAttribute("id", "msg");
body[0].append(msg);

// let playBoard = document.getElementById("playBoard");
// let rod1 = document.getElementById("rod1");
// let rod2 = document.getElementById("rod2");
// let ball = document.getElementById("ballBox");
// let msg = document.getElementById("msg");

var start;
var score_rod1;
var score_rod2;
var horizontal_direction;
var vertical_direction;

// ---------------------------
// fetching highest score till now
// ---------------------------
// localStorage.removeItem("highestScore");
// localStorage.removeItem("highestScorer");
var highestScore = localStorage.getItem("highestScore");
var highestScorer = localStorage.getItem("highestScorer");

// ---------------------------
// initial stage of game
// ---------------------------
initialize(highestScorer);
var playBoard_cordinates = playBoard.getBoundingClientRect();

// ---------------------------
// for starting game on pressing enter
// and mving the rod left and right
// rods can be moved left using 'a' or 'Left Arrow'
// rods can be moved right using 'd' or 'Right Arrow'
// ---------------------------
document.addEventListener("keydown", function (event) {
  // console.log(event.code);
  if (!start && event.code === "Enter") {
    msg.style.display = "none";
    if (highestScore) {
      alert("Highest Score : " + highestScore + "\nPlayer Name : " + highestScorer);
    } else {
      alert("This is your first game \nUse A and D Keys to move Rod 1 \nUse Left Arrow and Right Arrow Keys to move Rod 2");
    }
    gameStart();
  }
  if (start && event.code === "KeyA") {
    var coordinates = rod1.getBoundingClientRect();
    // console.log(coordinates);
    var leftMargin = parseInt(rod1.style.marginLeft, 10);
    if (coordinates.left > playBoard_cordinates.left) {
      rod1.style.marginLeft = leftMargin - 25 + "px";
    }
  } else if (start && event.code === "ArrowLeft") {
    var _coordinates = rod2.getBoundingClientRect();
    // console.log(coordinates);
    var _leftMargin = parseInt(rod2.style.marginLeft, 10);
    if (_coordinates.left > playBoard_cordinates.left) {
      rod2.style.marginLeft = _leftMargin - 25 + "px";
    }
  } else if (start && event.code === "KeyD") {
    var _coordinates2 = rod1.getBoundingClientRect();
    // console.log(coordinates);
    var _leftMargin2 = parseInt(rod1.style.marginLeft, 10);
    if (_coordinates2.right < playBoard_cordinates.right) {
      rod1.style.marginLeft = _leftMargin2 + 25 + "px";
      // console.log(window.getComputedStyle(rod1).marginLeft);
    }
  } else if (start && event.code === "ArrowRight") {
    var _coordinates3 = rod2.getBoundingClientRect();
    // console.log(coordinates);
    var _leftMargin3 = parseInt(rod2.style.marginLeft, 10);
    if (_coordinates3.right < playBoard_cordinates.right) {
      rod2.style.marginLeft = _leftMargin3 + 25 + "px";
    }
  }
});

// ---------------------------
// start game, controlling the movement of ball
// ---------------------------
function gameStart() {
  start = true;
  innerBall.setAttribute("class", "animate-ball");
  requestAnimationFrame(function () {
    moveBall();
  });
}
function moveBall() {
  var ball_coordinates = ball.getBoundingClientRect();
  var rod1_coordinates = rod1.getBoundingClientRect();
  var rod2_coordinates = rod2.getBoundingClientRect();
  // console.log(ball_coordinates);
  // console.log(rod1_coordinates);
  // console.log(rod2_coordinates);

  if (ball_coordinates.top <= rod1_coordinates.bottom && ball_coordinates.left >= rod1_coordinates.left && ball_coordinates.right <= rod1_coordinates.right) {
    vertical_direction = 1;
    score_rod1++;
  } else if (ball_coordinates.top <= playBoard_cordinates.top) {
    var winner = "Rod 2";
    var winnerScore = score_rod2;
    gameOver(winner, winnerScore);
    return;
  }
  if (ball_coordinates.bottom >= rod2_coordinates.top && ball_coordinates.left >= rod2_coordinates.left && ball_coordinates.right <= rod2_coordinates.right) {
    vertical_direction = -1;
    score_rod2++;
  } else if (ball_coordinates.bottom >= playBoard_cordinates.bottom) {
    var _winner = "Rod 1";
    var _winnerScore = score_rod1;
    gameOver(_winner, _winnerScore);
    return;
  }
  if (ball_coordinates.bottom <= playBoard_cordinates.bottom && ball_coordinates.top >= playBoard_cordinates.top) {
    var x = Math.floor(Math.random() * 10) + 2;
    var y = Math.floor(Math.random() * 10) + 2;
    // console.log("playboard left: " + playBoard_cordinates.left);

    var leftMargin = parseInt(ball.style.marginLeft);
    console.log(x * horizontal_direction, y * vertical_direction);
    // let new_left = ball_coordinates.left + x * horizontal_direction + "px";
    var new_top = ball_coordinates.top + y * vertical_direction + "px";
    console.log("Before => left: " + ball.style.left + ", top:" + ball_coordinates.top);

    // ball.style.left = new_left;
    ball.style.top = new_top;
    if (ball_coordinates.left <= playBoard_cordinates.left) {
      horizontal_direction = 1;
    } else if (ball_coordinates.right >= playBoard_cordinates.right) {
      horizontal_direction = -1;
    }
    ball.style.marginLeft = leftMargin + x * horizontal_direction + "px";
    ball_coordinates = ball.getBoundingClientRect();
    console.log("After => left: " + ball.style.left + ", top:" + ball_coordinates.top);
    requestAnimationFrame(function () {
      moveBall();
    });
  }
}

// ---------------------------
// when the game is over
// ---------------------------
function gameOver(winner, winnerScore) {
  // console.log("over " + end);
  msg.innerText = "Game Over!!!";
  msg.style.display = "flex";
  if (winnerScore > highestScore) {
    highestScore = winnerScore;
    highestScorer = winner;
    localStorage.setItem("highestScore", winnerScore);
    localStorage.setItem("highestScorer", winner);
  }
  setTimeout(function () {
    alert("Game is Over!!! \n" + "Winner is " + winner + " with score of " + winnerScore);
    initialize(winner);
  }, 1000);
}

// ---------------------------
// for settting the initial stage of game
// ---------------------------
function initialize(winner) {
  start = false;
  score_rod1 = 0;
  score_rod2 = 0;
  horizontal_direction = 1;
  rod1.style.left = "50%";
  rod1.style.marginLeft = "-100px";
  rod2.style.left = "50%";
  rod2.style.marginLeft = "-100px";
  var rod1_coordinates = rod1.getBoundingClientRect();
  var rod2_coordinates = rod2.getBoundingClientRect();
  innerBall.removeAttribute("class", "animate-ball");
  ball.style.left = "50%";
  ball.style.marginLeft = "-10px";
  if (winner === "Rod 2") {
    // console.log(rod1_coordinates.bottom);
    ball.style.top = rod1_coordinates.bottom + "px";
  } else {
    // console.log(rod2_coordinates.top);
    ball.style.top = rod2_coordinates.top - 20 + "px";
  }
  msg.innerText = "Press Enter to Start Game";
}

// ---------------------------
// creating html page by javascript
// ---------------------------

// let app = document.getElementById("app");

// let playBoard = document.createElement("div");
// playBoard.setAttribute("id", "playBoard");
// app.append(playBoard);

// let rod1 = document.createElement("div");
// rod1.setAttribute("id", "rod1");
// rod1.style.height = "20px";
// rod1.style.width = "200px";
// rod1.style.borderRadius = "25px";
// rod1.style.position = "absolute";
// rod1.style.left = "50%";
// rod1.style.marginLeft = "-100px";
// rod1.style.backgroundColor = "rgb(21 111 231)";
// rod1.style.color = "white";
// rod1.style.display = "flex";
// rod1.style.justifyContent = "center";
// rod1.style.alignItems = "center";
// rod1.innerText = "Rod 1";
// playBoard.appendChild(rod1);

// let rod2 = document.createElement("div");
// rod2.setAttribute("id", "rod2");
// rod2.style.height = "20px";
// rod2.style.width = "200px";
// rod2.style.borderRadius = "25px";
// rod2.style.position = "absolute";
// rod2.style.left = "50%";
// rod2.style.marginLeft = "-100px";
// rod2.style.bottom = "0px";
// rod2.style.backgroundColor = "rgb(220 29 220)";
// rod2.style.color = "white";
// rod2.style.display = "flex";
// rod2.style.justifyContent = "center";
// rod2.style.alignItems = "center";
// rod2.innerText = "Rod 2";
// playBoard.appendChild(rod2);

// let ball = document.createElement("div");
// ball.setAttribute("id", "ball");
// ball.style.height = "20px";
// ball.style.width = "20px";
// ball.style.position = "absolute";
// ball.style.left = "50%";
// ball.style.marginLeft = "-10px";
// ball.style.bottom = "20px";
// playBoard.appendChild(ball);

// let ball = document.createElement("div");
// ball.setAttribute("id", "ball");
// ball.style.height = "100%";
// ball.style.width = "100%";
// ball.style.borderRadius = "50%";
// // ball.style.position = "fixed";
// ball.style.backgroundColor = "red";
// ball.appendChild(ball);

// let msg = document.createElement("div");
// msg.setAttribute("id", "msg");
// msg.innerText = "Press Enter to Start Game";
// msg.style.height = "100%";
// msg.style.width = "100%";
// msg.style.backgroundColor = "grey";
// msg.style.position = "absolute";
// msg.style.display = "flex";
// msg.style.justifyContent = "center";
// msg.style.alignItems = "center";
// msg.style.opacity = "0.5";
// msg.style.fontSize = "2rem";
// msg.style.zIndex = "1";
// app.appendChild(msg);
},{"./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46337" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map