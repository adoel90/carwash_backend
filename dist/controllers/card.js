"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CardController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _card = require("../models/card");

var _member = require("../models/member");

var _log = require("../models/log");

var _os = require("os");

var _fs = require("fs");

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
 ** Get card type
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

		/*
  ** Get list of card type
  ** GET :: /card/type/list
  */

	}, {
		key: "cardTypeList",
		value: function cardTypeList(param) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var cardModel = new _card.CardModel();

				cardModel.getCardTypeList(param.limit, param.offset).then(function (card) {
					var result = {
						row: card[0][0].count,
						card: []
					};
					for (var i = 0; i < card[1].length; i++) {
						result.card.push(_this3.build.card(card[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new card type
  ** POST :: /card/type/create
  */

	}, {
		key: "createCardType",
		value: function createCardType(param) {
			return new Promise(function (resolve, reject) {
				var cardModel = new _card.CardModel();

				var cardParam = {
					ct_name: param.name,
					ct_min: param.min,
					ct_bonus: param.bonus,
					ct_refund: param.refund,
					ct_charge: param.charge
				};

				cardModel.insertCardType(cardParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Update card type data
  ** PUT :: /card/type/update
  */

	}, {
		key: "updateCardType",
		value: function updateCardType(param) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var cardModel = new _card.CardModel();

				var cardParam = {
					ct_name: param.name,
					ct_min: param.min,
					ct_bonus: param.bonus,
					ct_refund: param.refund,
					ct_charge: param.charge,
					updated_at: _this4.moment(new Date()).format()
				};
				cardModel.updateCardType(param.id, cardParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Delete card type data
  ** PUT :: /card/type/delete
  */

	}, {
		key: "deleteCardType",
		value: function deleteCardType(param) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				var cardModel = new _card.CardModel();

				var cardParam = {
					deleted_at: _this5.moment(new Date()).format()
				};
				cardModel.updateCardType(param.id, cardParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Change card type deleted status
  ** PUT :: /card/type/status
  */

	}, {
		key: "updateCardTypeStatus",
		value: function updateCardTypeStatus(param) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var cardModel = new _card.CardModel();

				cardModel.getCardTypeById(param.id).then(function (type) {
					var cardParam = {
						deleted_at: type.deleted_at ? null : _this6.moment(new Date()).format()
					};
					cardModel.updateCardType(param.id, cardParam).then(function (data) {
						return resolve(true);
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/**
  ** Generate card id by type
  ** POST :: /card/list/generate/id
  */

	}, {
		key: "generateCardId",
		value: function generateCardId(param) {
			return new Promise(function (resolve, reject) {
				var Member = new _member.MemberModel();
				var Log = new _log.LogModel();
				var Card = new _card.CardModel();
				for (var i = 0; i < 10; i++) {
					Card.getCardTypeById(param).then(function (type) {
						Card.generateCardId(type.ct_id).then(function (data) {
							var memberParam = {
								c_id: data[0].c_id
							};
							Member.insertMember(memberParam).then(function (member) {
								var logParam = {
									m_id: member.m_id,
									log_value: parseFloat(0) + parseFloat(0),
									log_before: 0,
									log_payment: null,
									created_by: null,
									log_description: "Buat Member"
								};
								Log.createLogUser(logParam).then(function () {
									Card.getLastRow('10').then(function (result) {
										return resolve(result);
									});
								}).catch(function (err) {
									return reject(err);
								});
							}).catch(function (err) {
								return reject(err);
							});
						}).catch(function (err) {
							return reject(err);
						});
					}).catch(function (err) {
						return reject(err);
					});
				}
			});
		}
	}]);

	return CardController;
}(_controller.Controller);