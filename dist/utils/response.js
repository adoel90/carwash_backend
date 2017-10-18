"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function () {
	function Response() {
		_classCallCheck(this, Response);
	}

	_createClass(Response, null, [{
		key: "code",
		value: function code(_code) {
			var error = new Map();
			switch (_code) {
				case 0:
					{
						error.set("status", 403);
						error.set("message", "You are unauthorized to access this API");
						break;
					}

				// Response users error
				case 1:
					{
						error.set("status", 400);
						error.set("message", "Missing request parameter(s)");
						break;
					}
				case 10:
					{
						error.set("status", 403);
						error.set("message", "User doesn't exit or not active");
						break;
					}
				case 11:
					{
						error.set("status", 403);
						error.set("message", "Your current password is incorrect");
						break;
					}

				// Response server error
				default:
					{
						error.set("status", 500);
						error.set("message", "Server connection unexpected error");
						break;
					}
			}

			return error;
		}
	}]);

	return Response;
}();

exports.Response = Response;