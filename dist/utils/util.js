'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.stringFormat = stringFormat;

/*--- format string template to not print undefined variable ---*/
function stringFormat(string) {
	var res = string[0];
	for (var i = 1; i < string.length; i++) {
		if (typeof arguments[i] !== 'undefined') res += arguments[i];
		res += string[i];
	}
	return res;
}