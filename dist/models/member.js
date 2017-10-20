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
		value: function getMemberList(limit, offset) {
			this.db.select("member", "count(*)");
			this.db.push();

			this.db.select("member");
			this.db.join("card", "card.c_id = member.c_id");
			this.db.join("card_type", "card.ct_id = card_type.ct_id");
			this.db.limit(limit, offset);
			this.db.push();

			return this.db.executeMany();
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
			this.db.select("member");
			this.db.where("c_id", c_id);

			return this.db.execute(true);
		}

		/*** Increase member balance ***/

	}, {
		key: "increaseBalance",
		value: function increaseBalance(c_id, balance) {
			this.db.setQuery("UPDATE member SET m_balance = m_balance + $1", [balance]);

			return this.db.execute();
		}
	}]);

	return MemberModel;
}(_model.Model);