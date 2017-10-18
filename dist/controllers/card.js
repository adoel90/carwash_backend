"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CardController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _card = require("../models/card");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardController = exports.CardController = function (_Controller) {
	_inherits(CardController, _Controller);

	function CardController() {
		_classCallCheck(this, CardController);

		return _possibleConstructorReturn(this, (CardController.__proto__ || Object.getPrototypeOf(CardController)).call(this));
	}

	/*
 ** Get list of card type
 ** GET :: /card/type
 */


	_createClass(CardController, [{
		key: "cardType",
		value: function cardType() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var cardModel = new _card.CardModel();

				cardModel.getCardType().then(function (card) {
					var result = [];
					for (var i = 0; i < card.length; i++) {
						result.push(_this2.build.card(card[i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}
	}]);

	return CardController;
}(_controller.Controller);