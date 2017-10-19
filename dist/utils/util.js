"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.stringFormat = stringFormat;
exports.rewriteImage = rewriteImage;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*--- format string template to not print undefined variable ---*/
function stringFormat(string) {
	var res = string[0];
	for (var i = 1; i < string.length; i++) {
		if (typeof arguments[i] !== 'undefined' && arguments[i] !== null) res += arguments[i];
		res += string[i];
	}
	return res;
}

function rewriteImage(data) {
	if (!data) {
		return null;
	}

	var path = data.path;
	var mime = data.mimetype.split("/");
	var filename = (0, _moment2.default)(new Date()).format("x") + "." + mime[1];
	var newPath = "public/" + filename;

	_fs2.default.rename(path, newPath, function (err) {
		if (err) {
			console.log(err);
		}
	});
	return filename;
}