"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Db = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["SELECT ", " FROM ", " ", ""], ["SELECT ", " FROM ", " ", ""]),
    _templateObject2 = _taggedTemplateLiteral(["", " JOIN ", " ", " ON ", ""], ["", " JOIN ", " ", " ON ", ""]),
    _templateObject3 = _taggedTemplateLiteral([" ", ""], [" ", ""]),
    _templateObject4 = _taggedTemplateLiteral([" ", " ", " ", " ", ""], [" ", " ", " ", " ", ""]),
    _templateObject5 = _taggedTemplateLiteral(["WHERE ", "", "", ""], ["WHERE ", "", "", ""]),
    _templateObject6 = _taggedTemplateLiteral([" ", " ", "=", ""], [" ", " ", "=", ""]),
    _templateObject7 = _taggedTemplateLiteral(["WHERE ", "=", ""], ["WHERE ", "=", ""]),
    _templateObject8 = _taggedTemplateLiteral([" ", " ", " like ", ""], [" ", " ", " like ", ""]),
    _templateObject9 = _taggedTemplateLiteral(["WHERE ", " like ", ""], ["WHERE ", " like ", ""]),
    _templateObject10 = _taggedTemplateLiteral([" ", " ", " between '", "' and '", "'"], [" ", " ", " between '", "' and '", "'"]),
    _templateObject11 = _taggedTemplateLiteral(["WHERE ", " between '", "' and '", "'"], ["WHERE ", " between '", "' and '", "'"]),
    _templateObject12 = _taggedTemplateLiteral([" ", " ", " is not NULL"], [" ", " ", " is not NULL"]),
    _templateObject13 = _taggedTemplateLiteral(["WHERE ", " is not NULL"], ["WHERE ", " is not NULL"]),
    _templateObject14 = _taggedTemplateLiteral([" ", " ", " is NULL"], [" ", " ", " is NULL"]),
    _templateObject15 = _taggedTemplateLiteral(["WHERE ", " is NULL"], ["WHERE ", " is NULL"]),
    _templateObject16 = _taggedTemplateLiteral(["GROUP BY ", ""], ["GROUP BY ", ""]),
    _templateObject17 = _taggedTemplateLiteral(["ORDER BY ", " ", ""], ["ORDER BY ", " ", ""]),
    _templateObject18 = _taggedTemplateLiteral(["LIMIT ", " OFFSET ", ""], ["LIMIT ", " OFFSET ", ""]),
    _templateObject19 = _taggedTemplateLiteral(["LIMIT ", ""], ["LIMIT ", ""]),
    _templateObject20 = _taggedTemplateLiteral(["INSERT INTO ", "(", ") VALUES (", ")"], ["INSERT INTO ", "(", ") VALUES (", ")"]),
    _templateObject21 = _taggedTemplateLiteral([" RETURNING ", ""], [" RETURNING ", ""]),
    _templateObject22 = _taggedTemplateLiteral(["", "=", ""], ["", "=", ""]),
    _templateObject23 = _taggedTemplateLiteral(["UPDATE ", " SET ", ""], ["UPDATE ", " SET ", ""]),
    _templateObject24 = _taggedTemplateLiteral(["DELETE FROM ", ""], ["DELETE FROM ", ""]),
    _templateObject25 = _taggedTemplateLiteral(["", " ", ""], ["", " ", ""]),
    _templateObject26 = _taggedTemplateLiteral(["", " ", " ", " ", " ", " ", ""], ["", " ", " ", " ", " ", " ", ""]);

var _util = require("./util");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Db = function () {
	function Db() {
		_classCallCheck(this, Db);
	}

	_createClass(Db, [{
		key: "consturctor",
		value: function consturctor() {
			this.util = new Util();
			this.init();
		}
	}, {
		key: "init",
		value: function init() {
			this.query = null;
			this.q_select = null;
			this.q_join = null;
			this.q_where = null;
			this.q_group = null;
			this.q_order = null;
			this.q_limit = null;
			this.q_insert = null;
			this.q_update = null;
			this.q_delete = null;
			this.q_data = {};
			this.execQuery = false;
		}
	}, {
		key: "initBatch",
		value: function initBatch() {
			this.q_batch = [];
		}
	}, {
		key: "select",
		value: function select(table) {
			var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";
			var alias = arguments[2];

			this.q_select = (0, _util.stringFormat)(_templateObject, fields, table, alias);
		}
	}, {
		key: "join",
		value: function join(table, on) {
			var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
			var alias = arguments[3];

			var join_type = ["LEFT", "RIGHT", "INNER"];
			var q_join = null;
			if (!join_type.includes(type.toUpperCase())) {
				type = "";
			}

			q_join = (0, _util.stringFormat)(_templateObject2, type.toUpperCase(), table, alias, on);
			if (this.q_join) {
				this.q_join += (0, _util.stringFormat)(_templateObject3, q_join);
			} else {
				this.q_join = q_join;
			}
		}
	}, {
		key: "where",
		value: function where(field, value) {
			var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "AND";
			var equal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "=";

			if (!this.q_data) {
				this.q_data = {};
			}

			var v = "$(" + field.replace(".", "_") + ")";
			this.q_data[field.replace(".", "_")] = value;
			if (this.q_where) {
				this.q_where += (0, _util.stringFormat)(_templateObject4, operator, field, equal, v);
			} else {
				this.q_where = (0, _util.stringFormat)(_templateObject5, field, equal, v);
			}
		}
	}, {
		key: "whereAny",
		value: function whereAny(field, value) {
			var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "AND";

			if (!this.q_data) {
				this.q_data = {};
			}

			var v = "any(array" + JSON.stringify(value).replace(/"/g, "'") + ")";
			if (this.q_where) {
				this.q_where += (0, _util.stringFormat)(_templateObject6, operator, field, v);
			} else {
				this.q_where = (0, _util.stringFormat)(_templateObject7, field, v);
			}
		}
	}, {
		key: "whereLike",
		value: function whereLike(field, value) {
			var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "AND";

			if (!this.q_data) {
				this.q_data = {};
			}

			var v = "$(" + field.replace(".", "_").replace("(", "_").replace(")", "") + ")";
			this.q_data[field.replace(".", "_").replace("(", "_").replace(")", "")] = value;
			if (this.q_where) {
				this.q_where += (0, _util.stringFormat)(_templateObject8, operator, field, v);
			} else {
				this.q_where = (0, _util.stringFormat)(_templateObject9, field, v);
			}
		}
	}, {
		key: "whereBetween",
		value: function whereBetween(field, start, end) {
			var operator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "AND";

			if (!this.q_data) {
				this.q_data = {};
			}

			if (this.q_where) {
				this.q_where += (0, _util.stringFormat)(_templateObject10, operator, field, start, end);
			} else {
				this.q_where = (0, _util.stringFormat)(_templateObject11, field, start, end);
			}
		}
	}, {
		key: "whereNotNull",
		value: function whereNotNull(field) {
			var operator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "AND";

			if (this.q_where) {
				this.q_where += (0, _util.stringFormat)(_templateObject12, operator, field);
			} else {
				this.q_where = (0, _util.stringFormat)(_templateObject13, field);
			}
		}
	}, {
		key: "whereIsNull",
		value: function whereIsNull(field) {
			var operator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "AND";

			if (this.q_where) {
				this.q_where += (0, _util.stringFormat)(_templateObject14, operator, field);
			} else {
				this.q_where = (0, _util.stringFormat)(_templateObject15, field);
			}
		}
	}, {
		key: "group",
		value: function group(by) {
			this.q_group = (0, _util.stringFormat)(_templateObject16, by);
		}
	}, {
		key: "order",
		value: function order(by) {
			var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var order_type = "ASC";
			if (reverse) {
				order_type = "DESC";
			}

			this.q_order = (0, _util.stringFormat)(_templateObject17, by, order_type);
		}
	}, {
		key: "limit",
		value: function limit(_limit, offset) {
			if (_limit !== null && offset !== null) {
				this.q_limit = (0, _util.stringFormat)(_templateObject18, _limit, offset);
			} else {
				this.q_limit = (0, _util.stringFormat)(_templateObject19, _limit);
			}
		}
	}, {
		key: "setQuery",
		value: function setQuery(query, data) {
			this.query = query;
			this.q_data = data;
			this.execQuery = true;
		}
	}, {
		key: "insert",
		value: function insert(table, param, primary_key) {
			var fields = [];
			var values = [];
			if (!this.q_data) {
				this.q_data = {};
			}
			for (var key in param) {
				fields.push(key);
				values.push("$(" + key + ")");
				this.q_data[key] = param[key];
			}
			this.q_insert = (0, _util.stringFormat)(_templateObject20, table, fields.join(), values.join());
			if (primary_key) {
				this.q_insert += (0, _util.stringFormat)(_templateObject21, primary_key);
			}
		}
	}, {
		key: "update",
		value: function update(table, param) {
			var update_set = [];
			if (!this.q_data) {
				this.q_data = {};
			}
			for (var key in param) {
				var v = "$(" + key + ")";
				this.q_data[key] = param[key];
				update_set.push((0, _util.stringFormat)(_templateObject22, key, v));
			}

			this.q_update = (0, _util.stringFormat)(_templateObject23, table, update_set.join());
		}
	}, {
		key: "delete",
		value: function _delete(table) {
			this.q_delete = (0, _util.stringFormat)(_templateObject24, table);
		}
	}, {
		key: "push",
		value: function push() {
			var flush = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			this.q_batch.push(this.execute());
			if (flush) {
				this.q_data = {};
			}
		}
	}, {
		key: "build_query",
		value: function build_query() {
			if (!this.execQuery) {
				if (this.q_insert) {
					this.query = this.q_insert;
				} else if (this.q_update && this.q_where) {
					this.query = (0, _util.stringFormat)(_templateObject25, this.q_update, this.q_where);
				} else if (this.q_delete && this.q_where) {
					this.query = (0, _util.stringFormat)(_templateObject25, this.q_delete, this.q_where);
				} else {
					this.query = (0, _util.stringFormat)(_templateObject26, this.q_select, this.q_join, this.q_where, this.q_group, this.q_order, this.q_limit);
				}
			}

			return this.query;
		}
	}, {
		key: "execute",
		value: function execute() {
			var one = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			this.build_query();

			var query = this.query;
			var data = this.q_data;
			if (debug) {
				console.log(query, data);
			}

			if (one) {
				return dbConn.one(query, data);
			} else {
				return dbConn.any(query, data);
			}
		}
	}, {
		key: "executeMany",
		value: function executeMany() {
			var queries = this.q_batch;
			return dbConn.tx(function (t) {
				return this.batch(queries);
			});
		}
	}]);

	return Db;
}();

exports.Db = Db;