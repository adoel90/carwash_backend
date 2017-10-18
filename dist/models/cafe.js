"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CafeModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CafeModel = exports.CafeModel = function (_Model) {
	_inherits(CafeModel, _Model);

	function CafeModel() {
		_classCallCheck(this, CafeModel);

		return _possibleConstructorReturn(this, (CafeModel.__proto__ || Object.getPrototypeOf(CafeModel)).call(this));
	}

	/*** Get cafe type ***/


	_createClass(CafeModel, [{
		key: "getCafeType",
		value: function getCafeType() {
			this.db.select("cafe");
			this.db.whereIsNull("deleted_at");

			return this.db.execute();
		}

		/*** Get cafe type list ***/

	}, {
		key: "getCafeTypeList",
		value: function getCafeTypeList(limit, offset) {
			this.db.select("cafe", "count(*)");
			this.db.whereIsNull("deleted_at");
			this.db.push();

			this.db.select("cafe");
			this.db.limit(limit, offset);
			this.db.push();

			return this.db.executeMany();
		}

		/*** Insert cafe data ***/

	}, {
		key: "insertCafe",
		value: function insertCafe(param) {
			this.db.insert("cafe", param);

			return this.db.execute();
		}
	}]);

	return CafeModel;
}(_model.Model);