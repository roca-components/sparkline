/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _element = __webpack_require__(2);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _element2.default; /* eslint-env browser */

	document.registerElement("spark-line", {
		prototype: _element2.default.prototype,
		extends: "ol"
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sparkline = __webpack_require__(3);

	var _sparkline2 = _interopRequireDefault(_sparkline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


	var Sparkline = function (_HTMLOListElement) {
		_inherits(Sparkline, _HTMLOListElement);

		function Sparkline() {
			_classCallCheck(this, Sparkline);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Sparkline).apply(this, arguments));
		}

		_createClass(Sparkline, [{
			key: "createdCallback",
			value: function createdCallback() {
				this.viz = document.createElement("pre");
				this.insertBefore(this.viz, this.firstChild);

				this.update = this.update.bind(this);

				// monitor content changes
				var observer = new MutationObserver(this.update);
				observer.observe(this, { childList: true });
			}
		}, {
			key: "attachedCallback",
			value: function attachedCallback() {
				this.update();
			}
		}, {
			key: "update",
			value: function update() {
				var items = this.querySelectorAll("li");
				var numbers = [].map.call(items, function (item) {
					return parseFloat(item.textContent);
				});

				this.viz.textContent = (0, _sparkline2.default)(numbers);
			}
		}]);

		return Sparkline;
	}(HTMLOListElement);

	exports.default = Sparkline;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = sparkline;
	// `series` is an array of values
	// `width` (optional) is the number of characters to use (two dots each)
	//
	// adapted from @potch:
	// https://gist.github.com/potch/ee16dfec3266c50d2f93
	function sparkline(series, width) {
		var len = series.length;
		width = width * 2 || Math.floor(len / 2) * 2;
		var chunk = len / width;
		var scaled = [];
		for (var i = 0; i < width; i++) {
			var start = Math.round(i * chunk);
			var end = Math.min(Math.round(i * chunk + chunk), len);
			var c = series.slice(start, end);
			var ca = c.reduce(function (_, v) {
				return _ + v;
			}, 0) / c.length;
			scaled.push(ca);
		}

		var min = scaled.reduce(function (_, v) {
			return Math.min(_, v);
		}, Infinity);
		var max = scaled.reduce(function (_, v) {
			return Math.max(_, v);
		}, -Infinity);

		var range = max - min;
		var binned = scaled.map(function (v) {
			return Math.round((v - min) / range * 3);
		});

		var res = [];
		for (var i = 0; i < binned.length; i += 2) {
			var a = 3 - binned[i];
			var b = 3 - binned[i + 1];
			var n = undefined;
			if (a === 3) {
				if (b === 3) {
					n = 0x28C0;
				} else {
					n = 0x2840 + (4 << b + 1);
				}
			} else {
				if (b === 3) {
					n = 0x2880 + (1 << a);
				} else {
					n = 0x2800 + (1 << a) + (1 << b + 3);
				}
			}
			res.push(String.fromCodePoint(n));
		}
		return res.join("");
	}

/***/ }
/******/ ]);