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

	/*** Get cafe menu ***/


	_createClass(MenuModel, [{
		key: "getCafeMenu",
		value: function getCafeMenu(cf_id) {
			this.db.select("menu");
			this.db.where("cf_id", cf_id);
			this.db.whereIsNull("deleted_at");

			return this.db.execute();
		}

		/*** Get cafe menu by mn_id ***/

	}, {
		key: "getCafeMenuById",
		value: function getCafeMenuById(mn_id) {
			this.db.init();
			this.db.select("menu");
			this.db.where("mn_id", mn_id);

			return this.db.execute(true);
		}

		/*** Get cafe menu list ***/

	}, {
		key: "getCafeMenuList",
		value: function getCafeMenuList(cf_id, limit, offset, mn_name) {
			this.db.select("menu", "count(*)");
			this.db.where("cf_id", cf_id);
			this.db.whereIsNull("deleted_at");
			if (mn_name) {
				this.db.whereLike("mn_name", "%" + mn_name + "%");
			}
			this.db.push();

			this.db.select("menu");
			this.db.limit(limit, offset);
			this.db.push();

			return this.db.executeMany();
		}

		/*** Insert cafe menu data ***/

	}, {
		key: "insertCafeMenu",
		value: function insertCafeMenu(param) {
			this.db.insert("menu", param);

			return this.db.execute();
		}

		/*** Update cafe menu data ***/

	}, {
		key: "updateCafeMenu",
		value: function updateCafeMenu(mn_id, param) {
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
			console.log(mn_id);
			this.db.init();
			this.db.select("menu");
			this.db.whereAny("mn_id", mn_id);

			return this.db.execute();
		}
	}]);

	return MenuModel;
}(_model.Model);