"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Routes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formidable = require("formidable");

var _formidable2 = _interopRequireDefault(_formidable);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _json2xls = require("json2xls");

var _json2xls2 = _interopRequireDefault(_json2xls);

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Routes = exports.Routes = function () {
	function Routes() {
		_classCallCheck(this, Routes);

		this.form = new _formidable2.default.IncomingForm();
		this.upload = (0, _multer2.default)({ dest: __dirname + '/../../public/' });
	}

	_createClass(Routes, [{
		key: "incomingForm",
		value: function incomingForm() {
			return new _formidable2.default.IncomingForm();
		}
	}, {
		key: "checkParameters",
		value: function checkParameters(parameter) {
			for (var i in parameter) {
				if (typeof parameter[i] === "undefined") {
					console.log(i);
					return false;
				}
			}
			return true;
		}
	}, {
		key: "success",
		value: function success(res) {
			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			return res.status(200).send({ status: 200, message: message, result: data });
		}
	}, {
		key: "error",
		value: function error(res, code) {
			var error = _response.Response.code(code);
			console.log(code);
			return res.status(error.get("status")).send({ status: error.get("status"), message: error.get("message") });
		}
	}, {
		key: "render",
		value: function render(res, page, data) {
			return res.render("../print/" + page, data);
		}
	}, {
		key: "convertToXls",
		value: function convertToXls(res, data) {
			res.xls('data.xlsx', data);
		}
	}]);

	return Routes;
}();