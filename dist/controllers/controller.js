"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _response = require("../utils/response");

var _build = require("../utils/build");

var _util = require("../utils/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = exports.Controller = function () {
	function Controller() {
		_classCallCheck(this, Controller);

		this.build = new _build.Build();
		this.moment = _moment2.default;
		this.rewriteImage = _util.rewriteImage;
		this.buildRange = _util.buildRange;
		this.buildRangeMember = _util.buildRangeMember;
	}

	_createClass(Controller, [{
		key: "encrypt",
		value: function encrypt(data) {
			return _crypto2.default.createHash("sha1").update(data).digest("hex");
		}
	}]);

	return Controller;
}();