"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Excel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["", "", ""], ["", "", ""]);

var _exceljs = require("exceljs");

var _exceljs2 = _interopRequireDefault(_exceljs);

var _util = require("../utils/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Excel = exports.Excel = function () {
	function Excel() {
		_classCallCheck(this, Excel);

		this._column = "A";
		this._row = 1;
		this._headers = [];
		this._columns = [];
		this._data = [];
		this._rowspan = 0;
	}

	_createClass(Excel, [{
		key: "currentCell",
		value: function currentCell() {
			return (0, _util.stringFormat)(_templateObject, this._column, this._row);
		}
	}, {
		key: "currentRow",
		value: function currentRow() {
			return this._row;
		}
	}, {
		key: "currentColumn",
		value: function currentColumn() {
			return this._column;
		}
	}, {
		key: "nextCell",
		value: function nextCell(column, row) {
			var c = this._column;
			var r = this._row;
			if (column) {
				c = this.nextColumn(column);
			}
			if (row) {
				r = this.nextRow(row);
			}

			return (0, _util.stringFormat)(_templateObject, c, r);
		}
	}, {
		key: "nextRow",
		value: function nextRow() {
			var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			return this._row + length;
		}
	}, {
		key: "nextColumn",
		value: function nextColumn() {
			var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			return String.fromCharCode(this._column.charCodeAt(0) + length);
		}
	}, {
		key: "toNextColumn",
		value: function toNextColumn() {
			var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			this._column = String.fromCharCode(this._column.charCodeAt(0) + length);
			return this._column;
		}
	}, {
		key: "toNextRow",
		value: function toNextRow() {
			var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			this._row += length;
			return this._row;
		}
	}, {
		key: "firstColumn",
		value: function firstColumn() {
			this._column = "A";
			return this._column;
		}
	}, {
		key: "checkChild",
		value: function checkChild() {
			for (var i = 0; i < this._columns.length; i++) {
				if (this._columns[i].child) {
					this._rowspan = 1;
				}
			}
		}
	}, {
		key: "setColumn",
		value: function setColumn(columns) {
			this._columns = columns;
		}
	}, {
		key: "setData",
		value: function setData(data) {
			this._data = data;
		}
	}, {
		key: "createHeader",
		value: function createHeader() {
			var rowspan = this.checkChild();
			this.column_keys = [];
			console.log(this.worksheet.getColumn('C'));
			for (var i = 0; i < this._columns.length; i++) {
				var cell = this.currentCell();
				this.worksheet.getCell(cell).value = this._columns[i].name;
				this.worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center' };
				if (this._columns[i].key) {
					this.column_keys.push(this._columns[i].key);
				}
				if (this._rowspan > 0 && !this._columns[i].child) {
					var nextCell = this.nextCell(null, this._rowspan);
					this.worksheet.mergeCells(cell + ":" + nextCell);
				}
				if (this._columns[i].child) {
					var _nextCell = this.nextCell(this._columns[i].child.length - 1, null);
					this.worksheet.mergeCells(cell + ":" + _nextCell);
					cell = this.nextCell(1, null);
					for (var j = 0; j < this._columns[i].child.length; j++) {
						cell = this.nextCell(j, 1);
						this.worksheet.getCell(cell).value = this._columns[i].child[j].name;
						this.worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center' };
						this.worksheet.getColumn(this.currentColumn()).width = this._columns[i].child[j].width;
						this.column_keys.push(this._columns[i].child[j].key);
					}
				}
				this.toNextColumn();
			}
		}
	}, {
		key: "placeData",
		value: function placeData() {
			this.toNextRow(this._rowspan + 1);
			this.firstColumn();
			for (var i = 0; i < this._data.length; i++) {
				for (var j = 0; j < this.column_keys.length; j++) {
					var cell = this.currentCell();
					this.worksheet.getCell(cell).value = this._data[i][this.column_keys[j]];
					this.worksheet.getColumn(this.currentColumn()).width = this._data[i][this.column_keys[j]].length;
					this.toNextColumn();
				}
				this.toNextRow();
				this.firstColumn();
			}
		}
	}, {
		key: "generateExcel",
		value: function generateExcel(filename) {
			var _this = this;

			var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "xlsx";

			return new Promise(function (resolve, reject) {
				var workbook = new _exceljs2.default.Workbook();
				_this.worksheet = workbook.addWorksheet("Sheet 1");
				_this.createHeader();
				_this.placeData();

				workbook.xlsx.writeFile(filename + "." + type).then(function () {
					resolve(true);
				}).catch(function (err) {
					reject(err);
				});
			});
		}
	}]);

	return Excel;
}();