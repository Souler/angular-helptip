/*! Helptip v1.0.1 - © Upplication 2016 */
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

	__webpack_require__(1)
	__webpack_require__(2)
	__webpack_require__(3)
	__webpack_require__(5)

	__webpack_require__(6)
	.module('upp.helptip', [])
	.provider('helptipConfig', __webpack_require__(7))
	.directive('helptip', __webpack_require__(8))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/angular.js";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/angular-translate.js";

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var HelptipConfig = function() {
	    this._className = 'helptip'
	    this._useTranslate = true
	    this._timeout = 500
	}

	HelptipConfig.prototype.className = function(val) {
	    if (val !== undefined)
	        this._className = String(val)
	    return this._className
	}

	HelptipConfig.prototype.useTranslate = function(val) {
	    if (val !== undefined)
	        this._useTranslate = !!val
	    return this._useTranslate
	}

	HelptipConfig.prototype.timeout = function(val) {
	    if (val !== undefined && !isNaN(val))
	        this._timeout = Number(val)
	    return this._timeout
	}

	HelptipConfig.prototype.$get = function() {
	    return this
	}

	module.exports = new HelptipConfig()

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(6)

	var HelptipDirective = function($document, $injector, $timeout, helptipConfig) {
	    return {
	        restrict: 'A',
	        scope: {
	            message: '@helptip',
	            translate: '@?helptipTranslate',
	            timeout: '@?helptipTimeout'
	        },
	        link: function(scope, element) {

	            if (!scope.message)
	                return

	            var dom = document.querySelector('.' + helptipConfig.className())

	            if (dom == null) {
	                dom = angular.element('<div>')
	                    .addClass('helptip')
	                    .css('position', 'absolute')
	                    .css('top', 0)
	                    .css('left', 0)
	                    .css('visibility', 'hidden')
	                    .css('pointer-events', 'none')
	                    .css('z-index', 9999)

	                $document.find('body').append(dom)
	            } else
	                dom = angular.element(dom)

	            var leaveTimeout = null

	            var message = null
	            var updateMessage = function() {
	                var message = scope.message
	                var useTranslate = !(scope.translate === false || scope.translate === 'false')

	                if (useTranslate && helptipConfig.useTranslate() && $injector.has('$translate'))
	                    message = $injector.get('$translate').instant(message)

	                if (message && message.length > 0)
	                    return message
	                else
	                    return null
	            }

	            var create = function() {

	                if (leaveTimeout != null) {
	                    $timeout.cancel(leaveTimeout)
	                    leaveTimeout = null
	                }

	                message = updateMessage()
	                dom.html(message)
	            }

	            var update = function(e) {
	                if (message == null)
	                    return

	                var xStart = e.pageX
	                var xLength = dom[0].offsetWidth
	                var xEnd = e.pageX + xLength
	                var xMax = window.innerWidth
	                var yStart = e.pageY
	                var yLength = dom[0].offsetHeight
	                var yEnd = e.pageY + yLength
	                var yMax = window.innerHeight

	                // Default behaviour (not near limits)
	                var x = xStart
	                var y = yStart

	                if (xEnd >= xMax)
	                    x = xStart - xLength

	                if (yEnd >= yMax)
	                    y = yStart - yLength

	                dom.toggleClass('top', yEnd >= yMax)
	                dom.toggleClass('bottom', yEnd < yMax)
	                dom.toggleClass('left', xEnd >= xMax)
	                dom.toggleClass('right', xEnd < xMax)

	                dom.css('left', x + 'px')
	                    .css('top', y + 'px')
	                    .css('visibility', 'visible')
	            }

	            var remove = function() {
	                if (scope.timeout !== undefined) {
	                    var timeout = Number(scope.timeout)
	                    if (timeout <= 0)
	                        timeout = helptipConfig.timeout()
	                    leaveTimeout = $timeout(function() {
	                        dom.css('visibility', 'hidden')
	                            .css('top', 0)
	                            .css('left', 0)
	                        leaveTimeout = null
	                    }, timeout)
	                } else {
	                    dom.css('visibility', 'hidden')
	                        .css('top', 0)
	                        .css('left', 0)
	                }
	            }

	            element
	            .on('mouseenter', create)
	            .on('mousemove', update)
	            .on('mouseleave', remove)
	            .bind('$destroy', remove)
	        }
	    }
	}

	HelptipDirective.$inject = ["$document", "$injector", "$timeout", "helptipConfig"]

	module.exports = HelptipDirective

/***/ }
/******/ ]);