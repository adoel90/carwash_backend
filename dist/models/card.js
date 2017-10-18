"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CardModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardModel = exports.CardModel = function (_Model) {
	_inherits(CardModel, _Model);

	function CardModel() {
		_classCallCheck(this, CardModel);

		return _possibleConstructorReturn(this, (CardModel.__proto__ || Object.getPrototypeOf(CardModel)).call(this));
	}

	/*** Generate card id ***/


	_createClass(CardModel, [{
		key: "generateCardId",
		value: function generateCardId(type) {
			var c_id = this.moment(new Date()).format("x");

			if (type < 10) {
				type = "00" + parseInt(type);
			} else if (type >= 10 && type < 100) {
				type = "0" + parseInt(type);
			}

			return type + c_id;
		}

		/*** Insert card data ***/

	}, {
		key: "insertCard",
		value: function insertCard(param) {
			this.db.insert("card", param, "c_id");

			return this.db.execute(true);
		}

		/*** Get card type by ct_id ***/

	}, {
		key: "getCardTypeById",
		value: function getCardTypeById(ct_id) {
			this.db.select("card_type");
			this.db.where("ct_id", ct_id);

			return this.db.execute(true);
		}
	}]);

	return CardModel;
}(_model.Model);