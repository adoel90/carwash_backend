'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CardModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('./model');

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
		key: 'generateCardId',
		value: function generateCardId(type) {
			// let c_id = this.moment(new Date).format("x");

			// if(type<10){
			// 	type = "00"+parseInt(type);
			// }else if(type >= 10 && type < 100){
			// 	type = "0"+parseInt(type);
			// }

			// return type+c_id;

			var leng,
			    randomInt = '',
			    number = '123456789',
			    dateNow = new Date().toJSON().slice(0, 10).replace(/-/g, '');

			type <= 10 ? leng = 4 : leng = 3;

			for (var i = 0; i <= leng; i++) {
				randomInt += number.charAt(Math.floor(Math.random() * number.length));
			}

			var result = '00' + type + dateNow + randomInt,
			    ct_id = type <= 10 ? parseInt(result, 10).toString().charAt(0) : parseInt(result, 10).toString().substr(0, 2),
			    param = {
				c_id: result,
				ct_id: ct_id
			};

			this.db.insert('card', param, 'c_id');
			return this.db.execute();
		}
	}, {
		key: 'getLastRow',
		value: function getLastRow(limit) {
			this.db.init();
			this.db.select("card");
			this.db.order("created_at", true);
			this.db.limit(limit);

			return this.db.execute();
		}
	}, {
		key: 'getCardById',
		value: function getCardById(c_id) {
			this.db.init();
			this.db.select("card");
			this.db.join("card_type", "card_type.ct_id = card.ct_id");
			this.db.join("member", "member.c_id = card.c_id");
			this.db.where("card.c_id", c_id);

			return this.db.execute(true);
		}

		/*** Insert card data ***/

	}, {
		key: 'insertCard',
		value: function insertCard(param) {
			this.db.insert("card", param, "c_id");

			return this.db.execute(true);
		}

		/*** Get card type ***/

	}, {
		key: 'getCardType',
		value: function getCardType() {
			this.db.init();
			this.db.select("card_type");
			// this.db.whereIsNull("deleted_at");

			return this.db.execute();
		}

		/*** Get card type by ct_id ***/

	}, {
		key: 'getCardTypeById',
		value: function getCardTypeById(ct_id) {
			this.db.init();
			this.db.select("card_type");
			this.db.where("ct_id", ct_id);

			return this.db.execute(true);
		}

		/*** Get card type list ***/

	}, {
		key: 'getCardTypeList',
		value: function getCardTypeList(limit, offset) {
			this.db.init();
			this.db.select("card_type", "count(*)");
			// this.db.whereIsNull("deleted_at");
			this.db.push();

			this.db.select("card_type");
			this.db.limit(limit, offset);
			this.db.push();

			return this.db.executeMany();
		}

		/*** Insert card type data ***/

	}, {
		key: 'insertCardType',
		value: function insertCardType(param) {
			this.db.insert("card_type", param);

			return this.db.execute();
		}

		/*** Update card type data ***/

	}, {
		key: 'updateCardType',
		value: function updateCardType(ct_id, param) {
			this.db.update("card_type", param);
			this.db.where("ct_id", ct_id);

			return this.db.execute();
		}

		/*** Update card data ***/

	}, {
		key: 'updateCard',
		value: function updateCard(c_id, param) {
			this.db.update("card", param);
			this.db.where("c_id", c_id);

			return this.db.execute();
		}
	}]);

	return CardModel;
}(_model.Model);