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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calendar = exports.Calendar = function () {
    function Calendar(options) {
        _classCallCheck(this, Calendar);

        var defaults = {
            "initDate": new Date(),
            callback: function callback() {}
        };
        var opt = Object.assign({}, defaults, options);
        this.opt = opt;
        var year = opt.initDate.getFullYear();
        var month = opt.initDate.getMonth();
        this.year = year;
        this.month = month;
        this.calenderSec = document.querySelector(".calender_sec");
        this.calenderPlugin = document.querySelector(".calender_plugin");
        this.calenderMonth = document.querySelector(".calender_month");
        this.title = document.querySelector(".calender_title");
        this.calenderHead = document.querySelector(".calender_head");
        this.getDays(year, month);
        this.starMonthDay(year, month);
        this.randerMonth(year, month);
        this.show();
        this.hide();
        this.bindEvent();
        this.randerStarDay(year, month);
        this.randerCurrentMonth(year, month);
        this.updateTitle(year, month);
    }

    _createClass(Calendar, [{
        key: "updateTitle",
        value: function updateTitle(year, month) {
            this.title.innerHTML = year + "年" + (month + 1) + "月";
        }
    }, {
        key: "getDays",
        value: function getDays(year, month) {
            var days = 0;
            var arr31 = [1, 3, 5, 7, 8, 10, 12];
            var arr30 = [4, 6, 9, 11];
            if (month == 2) {
                if (month % 4 == 0 && month % 100 != 0 || month % 400 == 0) {
                    days = 29;
                } else {
                    days = 28;
                }
            } else {
                if (arr31.indexOf(month) > -1) {
                    days = 31;
                } else {
                    days = 30;
                }
            }
            return days;
        }
    }, {
        key: "starMonthDay",
        value: function starMonthDay(year, month) {
            var weeks = new Date(year, month, 1).getDay();
            return weeks;
        }
    }, {
        key: "randerStarDay",
        value: function randerStarDay(year, month) {
            var starDayWeek = this.starMonthDay(year, month);
            var prevMonthDay = this.getDays(year, month);
            var str = "",
                i = "";

            for (i = 0; i < starDayWeek; i++) {
                str += "<span class=\"disable_color select_day\">" + (prevMonthDay - starDayWeek + i + 1) + "</span>";
            }
            return str;
        }
    }, {
        key: "randerMonth",
        value: function randerMonth(year, month) {
            var currentDays = this.getDays(year, month + 1);
            var str = "";
            for (var i = 1; i <= currentDays; i++) {
                str += "<span class=\"select_day\">" + i + "</span>";
            }
            return str;
        }
    }, {
        key: "randerCurrentMonth",
        value: function randerCurrentMonth(year, month) {
            var starD = this.randerStarDay(year, month);
            var currentD = this.randerMonth(year, month);
            this.calenderMonth.innerHTML = starD + currentD;
        }
    }, {
        key: "bindEvent",
        value: function bindEvent() {
            var _this = this;

            this.calenderHead.addEventListener("click", function (e) {
                var target = e.target;
                if (target.tagName == "I" && target.classList.contains("back")) {
                    _this.hide();
                }
                if (target.tagName == "I" && target.classList.contains("success")) {
                    console.log(_this.tagNames);
                    _this.tagNames.innerHTML = _this.click_time;
                    console.log(_this.click_time);
                    _this.hide();
                }
            });
            this.calenderSec.addEventListener("click", function (e) {
                var target = e.target;
                var innerHtml = '';

                var remove_color = _this.calenderMonth.childNodes;
                for (var i = 0; i < remove_color.length; i++) {
                    if (remove_color[i].classList.contains("check_color")) {
                        remove_color[i].classList.remove("check_color");
                    }
                }
                if (target.tagName == "SPAN" && target.classList.contains("select_day")) {
                    innerHtml = target.innerHTML;
                    target.classList.add("check_color");
                    _this.click_time = _this.year + "/" + (_this.month + 1) + "/" + innerHtml;
                }
                if (target.tagName == "I" && target.classList.contains("lefts")) {
                    var data = new Date(_this.year, _this.month - 1);
                    var prevYear = data.getFullYear();
                    var prevMonth = data.getMonth();
                    console.log(prevYear);
                    console.log(prevMonth);
                    _this.randerCurrentMonth(prevYear, prevMonth);
                    _this.updateTitle(prevYear, prevMonth);
                    _this.year = prevYear;
                    _this.month = prevMonth;
                }
                if (target.tagName == "I" && target.classList.contains("rights")) {
                    var _data = new Date(_this.year, _this.month + 1);
                    var nextYear = _data.getFullYear();
                    var nextMonth = _data.getMonth();
                    console.log(nextYear);
                    console.log(nextMonth);
                    _this.randerCurrentMonth(nextYear, nextMonth);
                    _this.updateTitle(nextYear, nextMonth);
                    _this.year = nextYear;
                    _this.month = nextMonth;
                }
            }, false);
        }
    }, {
        key: "show",
        value: function show(tagNames) {
            this.tagNames = tagNames;
            this.calenderPlugin.classList.add("plugin_active");
        }
    }, {
        key: "hide",
        value: function hide() {
            this.calenderPlugin.classList.remove("plugin_active");
        }
    }]);

    return Calendar;
}();

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toops = __webpack_require__(0);

var _calendar = __webpack_require__(1);

console.log(_toops.loading);
function init() {
    //let loade=document.querySelector(".loading");
    _toops.loading.startLoading("body");
    listRander();
    showMark();
    backIndex();
    setTime();
    filter();
}

function setTime() {
    var checkIn = document.querySelector(".check_in");
    var checkLeave = document.querySelector(".check_leave");
    checkIn.innerHTML = (0, _toops.getParams)("dateLiveIn");
    checkLeave.innerHTML = (0, _toops.getParams)("dateLeave");
    modifydate(checkIn, checkLeave);
}

function modifydate(checkIn, checkLeave) {
    var calenderPlugin = document.querySelector(".calender_plugin");
    var selectDate = document.querySelector(".list_sec .title");
    var moduleCalendar = new _calendar.Calendar();
    checkIn.onclick = function () {
        moduleCalendar.show(checkIn);
    };
    checkLeave.onclick = function () {
        moduleCalendar.show(checkLeave);
    };
}

function listRander() {
    var listWarpper = document.querySelector(".list_warpper");
    var hotelDetails = document.querySelector(".hotel_details");
    var listStr = "";
    (0, _toops.ajax)({
        url: "../../data/hotel.json",
        callback: function callback(data) {
            _toops.loading.stopLoading();
            var listDate = data.data;
            for (var i = 0; i < listDate.length; i++) {
                listStr += "<dl class=\"hotel_list\" data-region=\"" + listDate[i].district + "\" data-hotelId=\"" + listDate[i].hotel_id + "\" data-distance=\"" + listDate[i].distance + "\" data-star=\"" + listDate[i].star + "\" data-rank=\"" + listDate[i].rank + "\" data-price=\"" + listDate[i].price + "\">\n                            <dt><img src=\"" + listDate[i].image + "\" alt=\"\"/></dt><dd><p>" + listDate[i].name + "</p>\n                            <p>\n                                <span>4.7\u5206<i>\u793C</i></span>\n                                <span>\uFFE5" + listDate[i].price + "</span>\n                                <span>\u8D77</span>\n                            </p>\n                            <p>\n                                <span class=\"clear \">" + listDate[i].star + "</span>\n                                <span class=\"iconfont\">&#xe621;</span>\n                                <span class=\"iconfont\">&#xe623;</span>\n                            </p>\n                            <p>\n                                <span>" + listDate[i].addr + "</span>\n                                <span>" + listDate[i].distance / 1000 + "km</span>\n                            </p>\n                        </dd>\n                    </dl>";
            }
            hotelDetails.innerHTML = listStr;
            goToDetail(listDate);
        }
    });
}

function showMark() {
    var listStars = document.querySelector(".listStars");
    var listStarsUl = document.querySelectorAll(".listStars ul");
    var listFoot = document.querySelectorAll(".list_foot li");

    var _loop = function _loop(i) {
        listFoot[i].onclick = function () {
            for (var _i = 0; _i < listStarsUl.length; _i++) {
                listStarsUl[_i].classList.remove("activeChild");
            }
            if (listStars.classList.contains("activeStar") && listFoot[i].className == "tagStar") {
                listStars.classList.remove("activeStar");
                listFoot[i].querySelectorAll("span")[1].innerHTML = "&#xe66b;";
                listFoot[i].className = "";
            } else {
                for (var j = 0; j < siblings(listFoot[i]).length; j++) {
                    siblings(listFoot[i])[j].querySelectorAll("span")[1].innerHTML = "&#xe66b;";
                    siblings(listFoot[i])[j].className = "";
                }
                listFoot[i].querySelectorAll("span")[1].innerHTML = "&#xe626;";
                listFoot[i].className = "tagStar";
                listStars.classList.add("activeStar");
                listStarsUl[i].classList.add("activeChild");
            }
        };
    };

    for (var i = 0; i < listFoot.length; i++) {
        _loop(i);
    }
}

function resets() {
    var listFoot = document.querySelectorAll(".list_foot li");
    for (var i = 0; i < listFoot.length; i++) {
        listFoot[i].className = "";
        listFoot[i].querySelectorAll("span")[1].innerHTML = "&#xe66b;";
    }
}

function filter() {
    var listStars = document.querySelector(".listStars");
    listStars.addEventListener("click", function (e) {
        var target = e.target;
        switch (target.tagName) {
            case "SPAN":
                target = target.parentNode;
                break;
            case "LI":
                break;
            case "DIV":
                if (target.classList.contains("activeStar")) {
                    target.classList.remove("activeStar");
                    resets();
                }
                return;
                break;
            default:
                console.log("mfkfmsd");
        }
        if (target.parentNode.classList.contains("arrange")) {
            for (var k = 0; k < siblings(target).length; k++) {
                siblings(target)[k].querySelectorAll("span")[1].innerHTML = "&#xe6be;";
                siblings(target)[k].className = "";
            }
            target.className = "checkBox";
            target.querySelectorAll("span")[1].innerHTML = "&#xe60e;";
            var arrange = target.getAttribute("arrange");
            orderBy(arrange);
        } else {
            if (target.className == "") {
                target.className = "checkBox";
                if (target.querySelectorAll("span").length > 0) {
                    target.querySelectorAll("span")[1].innerHTML = "&#xe60e;";
                }
            } else {
                target.className = "";
                if (target.querySelectorAll("span").length > 0) {
                    target.querySelectorAll("span")[1].innerHTML = "&#xe6be;";
                }
            }
        }
        screen(collect());
    }, false);
}

function orderBy(arrange) {
    var hotelDetails = document.querySelector(".hotel_details");
    var dls = Array.from(hotelDetails.querySelectorAll("dl"));
    dls = dls.sort(function (a, b) {
        if (arrange == "low_price") {
            return a.getAttribute("date-price") - b.getAttribute("date-price");
        } else if (arrange == "stars") {
            return a.getAttribute("date-rank") - b.getAttribute("date-rank");
        } else {
            return a.getAttribute("date-distance") - b.getAttribute("date-distance");
        }
    });
    dls.forEach(function (ele, index) {
        hotelDetails.appendChild(ele);
    });
}

function collect() {
    var region = document.querySelector(".listStars .region").querySelectorAll(".checkBox");
    var star = document.querySelector(".listStars .ranks").querySelectorAll(".checkBox");
    var screenItems = {
        region: [],
        star: []
    };
    for (var i = 0; i < region.length; i++) {
        screenItems.region.push(region[i].getAttribute("region"));
    }
    for (var k = 0; k < star.length; k++) {
        screenItems.star.push(star[k].getAttribute("rank"));
    }
    for (var j in screenItems) {
        if (screenItems[j].length == 0) {
            delete screenItems[j];
        }
    }
    return screenItems;
}

function screen(obj) {
    var warp = document.querySelector(".hotel_details");
    var dls = warp.querySelectorAll("dl");
    for (var i = 0; i < dls.length; i++) {
        dls[i].classList.remove("hides");
    }
    for (var _i2 = 0; _i2 < dls.length; _i2++) {
        for (var s in obj) {
            if (obj[s].indexOf(dls[_i2].getAttribute("data-" + s)) == -1) {
                dls[_i2].classList.add("hides");
            }
        }
    }
}

function goToDetail(listDate) {
    var hotelList = document.querySelector(".hotel_details");
    var dlLis = hotelList.querySelectorAll(".hotel_list");
    var dateLeave = document.querySelector(".check_in").innerHTML;
    var dateLiveIn = document.querySelector(".check_leave").innerHTML;

    var _loop2 = function _loop2(i) {
        dlLis[i].onclick = function () {
            var attr = dlLis[i].getAttribute("data-hotelId");
            location.href = encodeURI("detail.html?dateLiveIn=" + dateLiveIn + "&dateLeave=" + dateLeave + "&id=" + attr);
        };
    };

    for (var i = 0; i < dlLis.length; i++) {
        _loop2(i);
    }
}

function backIndex() {
    var backIndex = document.querySelector("#backIndex");
    backIndex.onclick = function () {
        location.href = "index.html";
    };
}

function siblings(elm) {
    var a = [];
    var p = elm.parentNode.children;
    for (var i = 0, pl = p.length; i < pl; i++) {
        if (p[i] !== elm) a.push(p[i]);
    }
    return a;
}
init();

/***/ })

/******/ });