module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/home/components/cell/index.js":
/*!*********************************************!*\
  !*** ./pages/home/components/cell/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/ipsbasak/Desktop/TGA/news-posts-tga/pages/home/components/cell/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function isClient() {
  return false;
}

const getAllHiddenItems = () => {
  const hiddenIds = isClient() && window.localStorage.getItem('hiddenRowIds') || '';
  return hiddenIds.split('|');
};

class Cell extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "isHiddenItem", currentObjId => {
      const allHiddenItems = getAllHiddenItems() || [];

      if (allHiddenItems.indexOf(currentObjId) === -1) {
        return false;
      }

      return true;
    });

    _defineProperty(this, "updateHiddenItems", newItem => {
      const hiddenIds = isClient() && window.localStorage.getItem('hiddenRowIds');
      const newList = hiddenIds ? `${hiddenIds}|${newItem}` : newItem;
      isClient() && window.localStorage.setItem('hiddenRowIds', newList);
    });

    _defineProperty(this, "onClickHide", e => {
      this.updateHiddenItems(e.target && e.target.id);
      this.setState({
        hidden: true
      });
    });
  }

  render() {
    const {
      hit = {}
    } = this.props;
    const {
      num_comments,
      title,
      created_at,
      url,
      author,
      objectID
    } = hit;
    const isHidden = this.isHiddenItem(objectID);
    let differenceHrs;
    const displayUrl = url && url.split('://')[1] && url.split('://')[1].split('/')[0];
    const withoutWWW = displayUrl && displayUrl.replace('www.', '');

    try {
      const currentTime = new Date();
      const d = new Date(created_at);
      const currentDate = new Date();
      differenceHrs = `${parseInt((currentDate - d) / (60 * 60 * 1000))} hours ago`;
    } catch (e) {
      differenceHrs = '';
    }

    return __jsx("div", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 7
      }
    }, __jsx("span", {
      style: {
        width: '100px',
        display: 'inline-block'
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 9
      }
    }, isHidden ? '-' : num_comments || 0), __jsx("span", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }
    }, " ", title), __jsx("span", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 9
      }
    }, " (", withoutWWW, ")"), __jsx("span", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 9
      }
    }, " by ", author), __jsx("span", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }
    }, " ", differenceHrs, " "), __jsx("button", {
      id: objectID,
      onClick: this.onClickHide,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 9
      }
    }, isHidden ? '[]' : '[hide]'));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Cell);

/***/ }),

/***/ "./pages/home/components/row/index.js":
/*!********************************************!*\
  !*** ./pages/home/components/row/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cell */ "./pages/home/components/cell/index.js");
var _jsxFileName = "/Users/ipsbasak/Desktop/TGA/news-posts-tga/pages/home/components/row/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const Row = props => {
  const {
    hits,
    onMoreClick,
    onTopClick,
    onNewClick
  } = props;
  let cellValue = '';
  const styles = {
    maxWidth: '1400px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'left'
  };

  const style1 = _objectSpread({}, styles, {
    backgroundColor: '#e8e2e1'
  });

  const style2 = _objectSpread({}, styles, {
    backgroundColor: '#e3c4b6'
  });

  const rowHeader = __jsx("li", {
    key: "rowHeader",
    className: "header",
    style: _objectSpread({}, styles, {
      backgroundColor: 'orange'
    }),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 5
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  }, "Y "), __jsx("button", {
    onClick: onTopClick,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }, "top"), __jsx("button", {
    onClick: onNewClick,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }
  }, "new"));

  const rows = hits.map((hit, index) => {
    const rowStyle = index % 2 ? style1 : style2;
    return __jsx("li", {
      style: rowStyle,
      key: `row_${index}`,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 7
      }
    }, __jsx(_cell__WEBPACK_IMPORTED_MODULE_1__["default"], {
      hit: hit,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }
    }));
  });

  const moreFooter = __jsx("li", {
    key: "moreFooter",
    className: "footer",
    style: _objectSpread({}, styles, {
      backgroundColor: 'orange'
    }),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 5
    }
  }, __jsx("button", {
    onClick: onMoreClick,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, "MORE"));

  return [rowHeader, rows, moreFooter];
};

/* harmony default export */ __webpack_exports__["default"] = (Row);

/***/ }),

/***/ "./pages/home/components/table/index.js":
/*!**********************************************!*\
  !*** ./pages/home/components/table/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../row */ "./pages/home/components/row/index.js");
var _jsxFileName = "/Users/ipsbasak/Desktop/TGA/news-posts-tga/pages/home/components/table/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Table = props => {
  const {
    hits,
    onMoreClick,
    onNewClick,
    onTopClick,
    pageNumber
  } = props;
  return __jsx("div", {
    style: {
      textAlign: 'center'
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 5
    }
  }, __jsx(_row__WEBPACK_IMPORTED_MODULE_1__["default"], {
    hits: hits,
    onMoreClick: onMoreClick,
    onNewClick: onNewClick,
    onTopClick: onTopClick,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Table);

/***/ }),

/***/ "./pages/home/index.js":
/*!*****************************!*\
  !*** ./pages/home/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-fetch */ "node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEqual */ "lodash/isEqual");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _home_components_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../home/components/table */ "./pages/home/components/table/index.js");
var _jsxFileName = "/Users/ipsbasak/Desktop/TGA/news-posts-tga/pages/home/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class HackerApp extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "getAPIData", (newUrl, newPage) => {
      node_fetch__WEBPACK_IMPORTED_MODULE_1___default()(`${newUrl}${newPage}`).then(res => res.json().then(response => {
        this.setState({
          hits: response.hits,
          page: newPage,
          url: newUrl
        });
      }));
    });

    _defineProperty(this, "onMoreClick", () => {
      const {
        url,
        page
      } = this.state;
      this.getAPIData(url, page + 1);
    });

    _defineProperty(this, "onNewClick", () => {
      this.getAPIData(`https://hn.algolia.com/api/v1/search_by_date?hitsPerPage=30&page=`, 0);
    });

    _defineProperty(this, "onTopClick", () => {
      this.getAPIData(`https://hn.algolia.com/api/v1/search?hitsPerPage=30&page=`, 0);
    });

    this.state = {
      page: 0,
      hits: null,
      url: 'https://hn.algolia.com/api/v1/search?hitsPerPage=30&page='
    };
  }

  static async fetchData(url) {
    const ApiResponse = await node_fetch__WEBPACK_IMPORTED_MODULE_1___default()(url);
    const response = await ApiResponse.json();
    return {
      initialHits: response.hits
    };
  }

  static getInitialProps({
    req,
    res
  }) {
    return this.fetchData(`https://hn.algolia.com/api/v1/search?hitsPerPage=30&page=0`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (lodash_isEqual__WEBPACK_IMPORTED_MODULE_2___default()(nextProps, this.props) && lodash_isEqual__WEBPACK_IMPORTED_MODULE_2___default()(nextState, this.state)) {
      return false;
    }

    return true;
  }

  render() {
    const {
      initialHits
    } = this.props;
    const {
      page,
      hits
    } = this.state;
    return __jsx("div", {
      className: "App",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 7
      }
    }, __jsx(_home_components_table__WEBPACK_IMPORTED_MODULE_3__["default"], {
      hits: hits || initialHits,
      onMoreClick: this.onMoreClick,
      onNewClick: this.onNewClick,
      onTopClick: this.onTopClick,
      pageNumber: page,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (HackerApp);

/***/ }),

/***/ 4:
/*!***********************************!*\
  !*** multi ./pages/home/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ipsbasak/Desktop/TGA/news-posts-tga/pages/home/index.js */"./pages/home/index.js");


/***/ }),

/***/ "lodash/isEqual":
/*!*********************************!*\
  !*** external "lodash/isEqual" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/isEqual");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=home.js.map