/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function ajax(options) {
    var defaults = {
        type: "get",
        url: "",
        params: "",
        callback: function callback() {}
    };
    var obj = Object.assign({}, defaults, options);
    var xhr = new XMLHttpRequest();
    if (obj.type == "get" && obj.params) {
        var param_str = "";
        for (var i in obj.params) {
            param_str += i + "=" + obj.params[i];
        }
        xhr.open(obj.type, obj.url + param_str, true);
        xhr.send();
    } else {
        xhr.open(obj.type, obj.url, true);
        xhr.send(obj.params);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                obj.callback(JSON.parse(xhr.responseText));
            } else {
                alert("失败");
            }
        }
    };
}

//function jsonp(url,callback){
//    let sElement=document.creatElement("script");
//    window[fn]=fullback(callback){
//        callback;
//    }
//    sElement.src=url+"callback=fn"
//    document.body.appendChild(sElement)
//
//}
//跨域请求封装
function jsonp(url, callback) {
    window.jsonp_callback = function (data) {
        callback(data);
    };
    var s = document.createElement('script');

    s.src = url + "&callback=jsonp_callback";
    document.querySelector('body').appendChild(s);
}

function getParams(str) {
    var urlParams = decodeURI(location.search).split("?")[1];
    var arr = urlParams.split("&");
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var arrChlid = arr[i].split("=");
        obj[arrChlid[0]] = arrChlid[1];
    }
    if (str) {
        return obj[str];
    } else {
        return obj;
    }
}

function Loading() {
    var tpl = "<div class=\"spinner\">\n                <div class=\"spinner-container container1\">\n                    <div class=\"circle1\"></div>\n                    <div class=\"circle2\"></div>\n                    <div class=\"circle3\"></div>\n                    <div class=\"circle4\"></div>\n                </div>\n                <div class=\"spinner-container container2\">\n                    <div class=\"circle1\"></div>\n                    <div class=\"circle2\"></div>\n                    <div class=\"circle3\"></div>\n                    <div class=\"circle4\"></div>\n                </div>\n                <div class=\"spinner-container container3\">\n                    <div class=\"circle1\"></div>\n                    <div class=\"circle2\"></div>\n                    <div class=\"circle3\"></div>\n                    <div class=\"circle4\"></div>\n                </div>\n            </div>";
    var load = document.createElement('div');
    load.className = 'loading';
    load.innerHTML = tpl;

    this.startLoading = function (container) {
        var parentDom = void 0;
        if (typeof container == 'string') {
            parentDom = document.querySelector(container);
        } else if ((typeof container === "undefined" ? "undefined" : _typeof(container)) == 'object') {
            parentDom = container;
        } else {
            parentDom = document.querySelector('.container');
        }
        this.parentDom = parentDom;
        parentDom.appendChild(load);
    };

    this.stopLoading = function () {
        this.parentDom.removeChild(load);
    };
}
var loading = new Loading();
exports.ajax = ajax;
exports.getParams = getParams;
exports.loading = loading;
exports.jsonp = jsonp;

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var SlideSelector = function SlideSelector() {};

SlideSelector.prototype = {
    tpl: function tpl(title, list) {
        return '<div class="slide-wrapper">\n                <div class="header">\n                    <span class="cancel">\u53D6\u6D88</span>\n                    <span class="title">' + title + '</span>\n                    <span class="done">\u786E\u5B9A</span>\n                </div>\n                <div class="slide-items">\n                    <ul>\n                        ' + list.map(function (value, index) {
            return '<li class="slide-item">' + value + '</li>';
        }).join('') + '\n                    </ul>\n                </div>\n            </div>';
    },
    init: function init() {
        var defaults = {
            container: document.body,
            list: [1, 2, 3],
            title: '选择数据'
        };
        var options = this.options;
        options = Object.assign({}, defaults, options);
        this.container = typeof options.container == 'string' ? document.querySelector(options.container) : options.container;

        this.options = options;

        var slideContainer = this.container.querySelector('.slide-selector');
        if (slideContainer) {
            this.slideContainer = slideContainer;
        } else {
            var _slideContainer = document.createElement('div');
            _slideContainer.className = 'slide-selector none';
            this.container.appendChild(_slideContainer);
            this.slideContainer = _slideContainer;
        }
    },
    render: function render() {
        var opt = this.options;
        this.slideContainer.innerHTML = this.tpl(opt.title, opt.list);
    },
    bindEvent: function bindEvent() {
        var _this = this;

        this.cancel.addEventListener('click', function () {
            _this.hide();
        }, false);
        this.done.addEventListener('click', function () {
            _this.selected_value && _this.options.callback(_this.selected_value);
            _this.hide();
        }, false);
        this.wrap.addEventListener(this.transEnd, function () {
            //animationEnd
            if (_this.onhide) {
                _this.remove();
            }
        }, false);

        var slide_item = this.wrap.querySelectorAll('.slide-item');
        this.wrap.querySelector('.slide-items').addEventListener('click', function (e) {
            var target = e.target;

            if (target.tagName == 'LI') {
                for (var i = 0; i < slide_item.length; i++) {
                    slide_item[i].classList.remove('slide-selected');
                }
                target.classList.add('slide-selected');

                _this.selected_value = target.innerHTML;
            }
        }, false);
    },
    transEnd: function () {
        var bs = document.createElement('bootstrap');
        var transitions = {
            'WebkitTransform': 'webkitTransitionEnd',
            'OTransform': 'oTransitionEnd',
            'MozTransform': 'TransitionEnd',
            'MsTransform': 'msTransitionEnd',
            'transform': 'transitionEnd'
        };
        for (var k in transitions) {
            if (bs.style[k] != undefined) {
                return transitions[k];
            }
        }
    }(),
    show: function show(options) {
        this.options = options;
        //根据show传进来的配置进行后续操作
        this.init();

        this.render();

        this.slideContainer.classList.remove('none');

        this.selected_value = null;

        var wrap = this.slideContainer.querySelector('.slide-wrapper');
        this.cancel = wrap.querySelector('.cancel');
        this.done = wrap.querySelector('.done');

        this.wrap = wrap;
        setTimeout(function () {
            wrap.classList.add('slide-wrapper-show');
        }, 10);

        this.bindEvent();
    },

    hide: function hide() {
        this.onhide = true;
        this.wrap.classList.remove('slide-wrapper-show');
    },
    remove: function remove() {
        this.slideContainer.classList.add('none');
        this.onhide = false;
    }

};

exports.SlideSelector = SlideSelector;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toops = __webpack_require__(0);

var _selector = __webpack_require__(5);

function init() {
    back();
    selsect();
    //hideSelect();
}

function back() {
    var backIndex = document.querySelector("#backIndex");
    backIndex.onclick = function () {
        location.href = "detail.html?dateLiveIn=3月28日&dateLeave=3月30日";
        console.log("0");
    };
}

function selsect() {
    var slideSelector = new _selector.SlideSelector();
    var checkCount = document.querySelector(".check_count");
    checkCount.addEventListener("click", function () {
        slideSelector.show({
            list: [1, 2, 3, 4, 5, 6],
            callback: function callback(data) {
                checkCount.innerHTML = data;
                var check_user_info = document.querySelector(".check_user_info");
                var str = "<h2>\u5165\u4F4F\u4EBA\u4FE1\u606F</h2>";
                for (var i = 0; i < data * 1; i++) {
                    str += "<ul>\n                                <li>\n                                    <label for=\"\">\n                                        \u59D3\u540D\n                                        <input type=\"text\" placeholder=\"\u6BCF\u95F4\u53EA\u9700\u586B\u5199\u4E00\u4E2A\u59D3\u540D\"/>\n                                    </label>\n                                </li>\n                                <li>\n                                    <label for=\"\">\n                                        \u8BC1\u4EF6\n                                        <input type=\"text\" placeholder=\"\u5165\u4F4F\u4EBA\u8EAB\u4EFD\u8BC1/\u62A4\u7167\u53F7\"/>\n                                    </label>\n                                    <span>x</span>\n                                </li>\n                            </ul>";
                }
                check_user_info.innerHTML = str;
            }
        });
    }, false);
}

function hideSelect() {
    var slideSelector = document.querySelector(".slide_selector");
    slideSelector.addEventListener("click", function (e) {
        var target = e.target;
        if (target.tagName == "DIV" && target.classList.contains("slide_selector")) {
            slideSelector.classList.add("none");
        }
        if (target.tagName == "I" && target.classList.contains("cancel")) {
            slideSelector.classList.add("none");
        }
    }, false);
}

init();

/***/ })

/******/ });