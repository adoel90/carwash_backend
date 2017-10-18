"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.IndexController = undefined;

var _controller = require("./controller");

var _token = require("../utils/token");

var _excel = require("../utils/excel");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndexController = exports.IndexController = function (_Controller) {
	_inherits(IndexController, _Controller);

	function IndexController() {
		_classCallCheck(this, IndexController);

		return _possibleConstructorReturn(this, (IndexController.__proto__ || Object.getPrototypeOf(IndexController)).call(this));
	}

	return IndexController;
}(_controller.Controller);