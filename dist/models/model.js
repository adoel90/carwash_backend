"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Model = undefined;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _db = require("../utils/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = exports.Model = function Model() {
	_classCallCheck(this, Model);

	this.db = new _db.Db();
	this.db.init();
	this.db.initBatch();
	this.moment = _moment2.default;
};