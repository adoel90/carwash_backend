"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MemberModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MemberModel = exports.MemberModel = function (_Model) {
	_inherits(MemberModel, _Model);

	function MemberModel() {
		_classCallCheck(this, MemberModel);

		return _possibleConstructorReturn(this, (MemberModel.__proto__ || Object.getPrototypeOf(MemberModel)).call(this));
	}

	/*** Get member list ***/


	_createClass(MemberModel, [{
		key: "getMemberList",
		value: function getMemberList(limit, offset, name) {
			this.db.select("member", "count(*)");
			if (name) {
				this.db.whereLike("lower(m_name)", "%" + name.toLowerCase() + "%");
			}
			// this.db.whereIsNull("member.deleted_at");
			this.db.push();

			this.db.select("member", "member.deleted_at as deleted, *");
			this.db.join("card", "card.c_id = member.c_id");
			this.db.join("card_type", "card.ct_id = card_type.ct_id");
			this.db.limit(limit, offset);
			this.db.order("m_id");
			this.db.push();

			return this.db.executeMany();
		}
	}, {
		key: "getMember",
		value: function getMember(name) {
			this.db.select("member", "member.deleted_at as deleted, *");
			this.db.join("card", "card.c_id = member.c_id");
			this.db.join("card_type", "card.ct_id = card_type.ct_id");
			if (name) {
				this.db.whereLike("lower(m_name)", "%" + name.toLowerCase() + "%");
			}
			// this.db.whereIsNull("member.deleted_at");
			this.db.order("m_id");
			this.db.push();

			return this.db.execute();
		}

		/*** Insert member data ***/

	}, {
		key: "insertMember",
		value: function insertMember(param) {
			this.db.insert("member", param, "m_id");

			return this.db.execute(true);
		}

		/*** Update member data ***/

	}, {
		key: "updateMember",
		value: function updateMember(m_id, param) {
			this.db.update("member", param);
			this.db.where("m_id", m_id);

			return this.db.execute();
		}

		/*** Get member by c_id ***/

	}, {
		key: "getMemberByCardId",
		value: function getMemberByCardId(c_id) {
			this.db.init();
			this.db.select("member", "card.deleted_at as card_delete, member.deleted_at as member_delete, *");
			this.db.join("card", "card.c_id = member.c_id");
			this.db.join("card_type", "card.ct_id = card_type.ct_id");
			this.db.where("member.c_id", c_id);

			return this.db.execute(true);
		}

		/*** Get member by m_id ***/

	}, {
		key: "getMemberById",
		value: function getMemberById(m_id) {
			this.db.init();
			this.db.select("member", "member.deleted_at as deleted, *");
			this.db.where("m_id", m_id);
			this.db.join("card", "card.c_id = member.c_id");
			this.db.join("card_type", "card_type.ct_id = card.ct_id");

			return this.db.execute(true);
		}

		/*** Increase member balance ***/

	}, {
		key: "increaseBalance",
		value: function increaseBalance(m_id, balance) {
			this.db.init();
			this.db.setQuery("UPDATE member SET m_balance = m_balance + $1 where m_id = $2", [balance, m_id]);

			return this.db.execute();
		}

		/*** Decrease member balance ***/

	}, {
		key: "decreaseBalance",
		value: function decreaseBalance(m_id, balance) {
			this.db.setQuery("UPDATE member SET m_balance = m_balance - $1 where m_id = $2", [balance, m_id]);

			return this.db.execute();
		}

		/*** Insert topup data ***/

	}, {
		key: "insertTopup",
		value: function insertTopup(param) {
			this.db.init();
			this.db.insert("topup", param, "tp_id");

			return this.db.execute(true);
		}

		/*** Get topup data ***/

	}, {
		key: "getTopup",
		value: function getTopup(tp_id) {
			this.db.init();
			this.db.select("topup");
			this.db.join("member", "member.m_id = topup.m_id");
			this.db.where("tp_id", tp_id);

			return this.db.execute(true);
		}
	}, {
		key: "getTopupCount",
		value: function getTopupCount() {
			this.db.init();
			this.db.select("topup", "count(*)");
			this.db.whereBetween("date(tp_date)", "2018-04-12", "2018-04-12");

			return this.db.execute();
		}

		/*** Get topup transaction ***/

	}, {
		key: "getTopupTransaction",
		value: function getTopupTransaction(m_id) {
			this.db.init();
			this.db.select("topup");
			this.db.where("m_id", m_id);

			return this.db.execute();
		}

		/*** Get Tier List ***/

	}, {
		key: "getTier",
		value: function getTier() {
			this.db.init();
			this.db.select("tier");

			return this.db.execute();
		}
	}]);

	return MemberModel;
}(_model.Model);