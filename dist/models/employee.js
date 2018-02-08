"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmployeeModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmployeeModel = exports.EmployeeModel = function (_Model) {
    _inherits(EmployeeModel, _Model);

    function EmployeeModel() {
        _classCallCheck(this, EmployeeModel);

        return _possibleConstructorReturn(this, (EmployeeModel.__proto__ || Object.getPrototypeOf(EmployeeModel)).call(this));
    }

    /* Get list employee */


    _createClass(EmployeeModel, [{
        key: "listEmployee",
        value: function listEmployee(param) {
            this.db.init();
            this.db.select("employee", "count(*)");
            this.db.push();

            this.db.select("employee");
            this.db.limit(param.limit, param.offset);
            this.db.push();

            return this.db.executeMany();
        }

        /* Get employee by ID */

    }, {
        key: "getEmployeeById",
        value: function getEmployeeById(id) {
            this.db.init();
            this.db.select("employee");
            this.db.where("emp_id", id);

            return this.db.execute();
        }

        /* Get employee by username */

    }, {
        key: "getEmployeeByUsername",
        value: function getEmployeeByUsername(param) {
            this.db.init();
            this.db.select("employee");
            this.db.where("emp_username", param);

            return this.db.execute(true);
        }

        /* Create new employee */

    }, {
        key: "createEmployee",
        value: function createEmployee(param) {
            this.db.init();
            this.db.insert("employee", param);

            return this.db.execute();
        }

        /* Update employee */

    }, {
        key: "updateEmployee",
        value: function updateEmployee(param, id) {
            this.db.init();
            this.db.update("employee", param);
            this.db.where("emp_id", id);

            return this.db.execute();
        }

        /* Delete employee */

    }, {
        key: "deleteEmployee",
        value: function deleteEmployee(param, id) {
            this.db.init();
            this.db.update("employee", param);
            this.db.where("emp_id", id);

            return this.db.execute();
        }
    }]);

    return EmployeeModel;
}(_model.Model);