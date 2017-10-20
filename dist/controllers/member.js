"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MemberController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _member = require("../models/member");

var _card = require("../models/card");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MemberController = exports.MemberController = function (_Controller) {
	_inherits(MemberController, _Controller);

	function MemberController() {
		_classCallCheck(this, MemberController);

		return _possibleConstructorReturn(this, (MemberController.__proto__ || Object.getPrototypeOf(MemberController)).call(this));
	}

	/*
 ** Get member list
 ** GET :: /member/list
 */


	_createClass(MemberController, [{
		key: "memberList",
		value: function memberList(param) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				memberModel.getMemberList(param.limit, param.offset).then(function (member) {
					var result = {
						row: member[0][0].count,
						data: []
					};

					for (var i = 0; i < member[1].length; i++) {
						result.data.push(_this2.build.member(member[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new member
  ** POST :: /member/create
  */

	}, {
		key: "createMember",
		value: function createMember(param) {
			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();
				var cardModel = new _card.CardModel();

				var cardParam = {
					c_id: cardModel.generateCardId(param.card),
					ct_id: param.card
				};

				cardModel.getCardTypeById(param.card).then(function (card_type) {
					cardModel.insertCard(cardParam).then(function (card) {
						var memberParam = {
							m_name: param.name,
							m_phone: param.phone,
							m_email: param.email,
							m_address: param.address,
							m_balance: param.balance,
							c_id: card.c_id
						};
						memberModel.insertMember(memberParam).then(function (member) {
							return resolve(true);
						}).catch(function (err) {
							return reject(err);
						});
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					if (err.code == 0) {
						return reject(20);
					}
					return reject(err);
				});
			});
		}

		/*
  ** Update member data
  ** PUT :: /member/update
  */

	}, {
		key: "updateMember",
		value: function updateMember(param) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				var memberParam = {
					m_name: param.name,
					m_phone: param.phone,
					m_email: param.email,
					m_address: param.address,
					updated_at: _this3.moment(new Date()).format()
				};

				memberModel.updateMember(param.id, memberParam).then(function (member) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Delete member
  ** PUT :: /member/delete
  */

	}, {
		key: "deleteMember",
		value: function deleteMember(param) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				var memberParam = {
					deleted_at: _this4.moment(new Date()).format()
				};

				memberModel.updateMember(param.id, memberParam).then(function (member) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Authenticate member by card id
  ** POST :: /member/authenticate
  */

	}, {
		key: "memberAuthenticate",
		value: function memberAuthenticate(param) {
			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				memberModel.getMemberByCardId(param.c_id).then(function (member) {}).catch(function (err) {
					return reject(err);
				});
			});
		}
	}]);

	return MemberController;
}(_controller.Controller);