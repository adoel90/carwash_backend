"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MenuModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuModel = exports.MenuModel = function (_Model) {
	_inherits(MenuModel, _Model);

	function MenuModel() {
		_classCallCheck(this, MenuModel);

		return _possibleConstructorReturn(this, (MenuModel.__proto__ || Object.getPrototypeOf(MenuModel)).call(this));
	}

	/*** Get store menu ***/


	_createClass(MenuModel, [{
		key: "getStoreMenu",
		value: function getStoreMenu(store_id) {
			this.db.select("menu");
			this.db.where("store_id", store_id);
			// this.db.whereIsNull("deleted_at");

			return this.db.execute();
		}

		/*** Get store menu by mn_id ***/

	}, {
		key: "getStoreMenuById",
		value: function getStoreMenuById(mn_id) {
			this.db.init();
			this.db.select("menu");
			this.db.where("mn_id", mn_id);

			return this.db.execute(true);
		}

		/*** Get store menu list ***/

	}, {
		key: "getStoreMenuList",
		value: function getStoreMenuList(store_id, mn_name, active) {
			this.db.select("menu", "count(*)");
			this.db.where("store_id", store_id);
			// this.db.whereIsNull("deleted_at");
			if (mn_name) {
				this.db.whereLike("mn_name", "%" + mn_name + "%");
			}
			if (active) {
				this.db.whereIsNull("deleted_at");
			}
			this.db.push();

			this.db.select("menu");
			this.db.order("mn_id");
			this.db.push();

			return this.db.executeMany();
		}

		/*** Get store menu detail ***/

	}, {
		key: "getStoreMenuDetail",
		value: function getStoreMenuDetail(id) {
			this.db.init();
			this.db.select("menu");
			this.db.where("mn_id", id);
			this.db.order("mn_id");
			this.db.push();

			return this.db.execute(true);
		}

		/*** Insert store menu data ***/

	}, {
		key: "insertStoreMenu",
		value: function insertStoreMenu(param) {
			this.db.init();
			this.db.insert("menu", param);

			return this.db.execute();
		}

		/*** Update store menu data ***/

	}, {
		key: "updateStoreMenu",
		value: function updateStoreMenu(mn_id, param) {
			this.db.update("menu", param);
			this.db.where("mn_id", mn_id);

			return this.db.execute();
		}

		/*** Get menu by mn_id ***/

	}, {
		key: "getMenuById",
		value: function getMenuById(mn_id) {
			this.db.select("menu");
			this.db.where("mn_id", mn_id);

			return this.db.execute(true);
		}

		/*** Find menu by many mn_id ***/

	}, {
		key: "findMenuById",
		value: function findMenuById(mn_id) {
			this.db.init();
			this.db.select("menu");
			this.db.whereAny("mn_id", mn_id);

			return this.db.execute();
		}
	}]);

	return MenuModel;
}(_model.Model);