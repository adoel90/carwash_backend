"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Model = undefined;

var _db = require("../utils/db");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = exports.Model = function Model() {
	_classCallCheck(this, Model);

	this.db = new _db.Db();
	this.db.init();
};