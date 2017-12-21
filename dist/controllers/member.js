"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MemberController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = require("../utils/token");

var _controller = require("./controller");

var _member = require("../models/member");

var _card = require("../models/card");

var _cafe = require("../models/cafe");

var _service = require("../models/service");

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
 ** GET :: /member
 */


	_createClass(MemberController, [{
		key: "memberAll",
		value: function memberAll(param) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				memberModel.getMember(param.name).then(function (member) {
					var result = [];

					for (var i = 0; i < member.length; i++) {
						result.push(_this2.build.member(member[i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get member list
  ** GET :: /member/list
  */

	}, {
		key: "memberList",
		value: function memberList(param) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				memberModel.getMemberList(param.limit, param.offset, param.name).then(function (member) {
					var result = {
						row: member[0][0].count,
						member: []
					};

					for (var i = 0; i < member[1].length; i++) {
						result.member.push(_this3.build.member(member[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/* 
  ** Get member detail data
  ** GET :: /member/detail
  */

	}, {
		key: "memberDetail",
		value: function memberDetail(param) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();
				var cafeModel = new _cafe.CafeModel();
				var serviceModel = new _service.ServiceModel();

				memberModel.getMemberById(param.id).then(function (member) {
					var result = _this4.build.member(member);
					if (!param.transaction) {
						return resolve(result);
					}

					result.transaction = [];
					serviceModel.getServiceTransaction(param.id).then(function (service) {
						cafeModel.getCafeTransaction(param.id).then(function (cafe) {
							for (var i = 0; i < service.length; i++) {
								var a = _this4.build.transactionService(service[i]);
								a.timestamp = _this4.moment(a.date).format("x");
								a.type = "service";
								result.transaction.push(a);
							}
							for (var _i = 0; _i < cafe.length; _i++) {
								var _a = _this4.build.transactionCafe(cafe[_i]);
								_a.timestamp = _this4.moment(_a.date).format("x");
								_a.type = "cafe";
								result.transaction.push(_a);
							}

							result.transaction.sort(function (a, b) {
								return a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0;
							});
							return resolve(result);
						}).catch(function (err) {
							return reject(err);
						});
					}).catch(function (err) {
						return reject(err);
					});
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
			var _this5 = this;

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
							m_balance: parseFloat(card_type.ct_min) + parseFloat(card_type.ct_bonus),
							m_payment: param.payment,
							c_id: card.c_id
						};
						memberModel.insertMember(memberParam).then(function (member) {
							memberModel.getMemberById(member.m_id).then(function (m) {
								member = _this5.build.member(m);
								return resolve(member);
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
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				var memberParam = {
					m_name: param.name,
					m_phone: param.phone,
					m_email: param.email,
					m_address: param.address,
					updated_at: _this6.moment(new Date()).format()
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
			var _this7 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				var memberParam = {
					deleted_at: _this7.moment(new Date()).format()
				};

				memberModel.updateMember(param.id, memberParam).then(function (member) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Change member status
  ** PUT :: /member/status
  */

	}, {
		key: "changeMemberStatus",
		value: function changeMemberStatus(param) {
			var _this8 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				memberModel.getMemberById(param.id).then(function (member) {
					var memberParam = {
						deleted_at: member.deleted ? null : _this8.moment(new Date()).format()
					};
					memberModel.updateMember(param.id, memberParam).then(function () {
						return resolve(true);
					}).catch(function (err) {
						return reject(err);
					});
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
			var _this9 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();
				var token = new _token.Token();

				memberModel.getMemberByCardId(param.c_id).then(function (member) {
					if (member.card_delete || member.member_delete) {
						return reject(21);
					}
					var memberToken = {
						id: member.m_id,
						card: member.c_id,
						type: member.ct_id,
						expired: _this9.moment(new Date()).add("10", "minutes")
					};

					var result = {
						accessToken: token.encode(memberToken),
						member: _this9.build.member(member)
					};

					return resolve(result);
				}).catch(function (err) {
					if (err.code == 0) {
						return reject(30);
					}
					return reject(err);
				});
			});
		}

		/*
  ** Topup member balance
  ** POST :: /member/topup
  */

	}, {
		key: "topupMember",
		value: function topupMember(param) {
			var _this10 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();
				var cardModel = new _card.CardModel();

				param.balance = parseFloat(param.balance);
				memberModel.getMemberById(param.id).then(function (member) {
					cardModel.getCardTypeById(param.type).then(function (card) {
						if (param.balance < card.ct_min) {
							return reject(32);
						}
						var bonus = parseInt(param.balance / parseFloat(card.ct_min));
						param.balance += parseFloat(card.ct_bonus * bonus);
						var tpParam = {
							m_id: param.id,
							tp_value: param.balance,
							tp_before: member.m_balance,
							tp_payment: param.payment
						};
						memberModel.insertTopup(tpParam).then(function (topup) {
							memberModel.increaseBalance(param.id, param.balance).then(function () {
								member = _this10.build.member(member);
								member.balance = parseFloat(member.balance) + parseFloat(param.balance);
								member.transaction = topup.tp_id;
								return resolve(member);
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
			});
		}

		/*
  ** Change member card
  ** PUT :: /member/card/change
  */

	}, {
		key: "changeCard",
		value: function changeCard(param) {
			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();
				var cardModel = new _card.CardModel();

				var cardParam = {
					c_id: cardModel.generateCardId(param.card),
					ct_id: param.card
				};
				cardModel.insertCard(cardParam).then(function (card) {
					var memberParam = {
						c_id: cardParam.c_id
					};
					memberModel.updateMember(param.member, memberParam).then(function (member) {
						return resolve(true);
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Refund member card
  ** POST :: /member/refund
  */

	}, {
		key: "refundMember",
		value: function refundMember(param) {
			var _this11 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();
				var cardModel = new _card.CardModel();

				cardModel.getCardById(param.card).then(function (card) {
					if (!card.ct_refund) {
						return reject(22);
					}
					memberModel.getMemberById(card.m_id).then(function (member) {
						var memberParam = {
							c_id: null,
							m_balance: 0
						};
						var tpParam = {
							m_id: member.m_id,
							tp_value: parseFloat(member.m_balance) * -1,
							tp_before: member.m_balance,
							tp_payment: -1
						};
						memberModel.updateMember(card.m_id, memberParam).then(function () {
							var cardParam = {
								deleted_at: _this11.moment(new Date()).format()
							};
							memberModel.insertTopup(tpParam).then(function (topup) {
								cardModel.updateCard(param.card, cardParam).then(function () {
									return resolve(topup.tp_id);
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
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get topup data
  ** GET :: /member/topup/print
  */

	}, {
		key: "topupData",
		value: function topupData(param) {
			var _this12 = this;

			return new Promise(function (resolve, reject) {
				var memberModel = new _member.MemberModel();

				memberModel.getTopup(param.id).then(function (topup) {
					var member = _this12.build.member(topup);
					member.before = topup.tp_before;
					member.topup = topup.tp_value;
					member.payment = topup.tp_payment;

					return resolve(member);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}
	}]);

	return MemberController;
}(_controller.Controller);