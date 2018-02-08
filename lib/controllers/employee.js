import { Controller } from "./controller";

import { EmployeeModel } from "../models/employee";
import { resolve } from "url";

export class EmployeeController extends Controller {
    constructor() {
        super();
    }

    /*
    ** Get all employee
    ** GET :: /cafe/employee/list
    */
    employeeList(param) {
        return new Promise((resolve, reject) => {
            let employeeModel = new EmployeeModel();

            employeeModel.listEmployee(param).then((employee) => {
                let result = {
					row : employee[0][0].count,
					employee : []
				}

                for(let i=0; i<employee[1].length; i++) {
                    result.employee.push(this.build.employee(employee[1][i]));
                }

                return resolve(result);
            }).catch((err) => {
                return reject(err);
            })
        })
    }

    /*
    ** Get detail employee
    ** GET :: /cafe/employee/detail
    */
    employeeDetail(param) {
        return new Promise((resolve, reject) => {
            let employeeModel = new EmployeeModel();

            employeeModel.getEmployeeById(param).then((employee) => {
                return resolve(true);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Create new employee
    ** POST :: /cafe/employee/create
    */
    createEmployee(param) {
        return new Promise((resolve, reject) => {
            let employeeModel = new EmployeeModel();
            
            let paramEmployee = {
                emp_name : param.name,
				emp_email : param.email,
				emp_username : param.username,
				emp_password : this.encrypt(param.password),
				emp_access : param.access,
				cf_id : param.cafe
            }

            employeeModel.createEmployee(paramEmployee).then(() => {
                return resolve(true);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Update employee
    ** PUT :: /cafe/employee/update
    */
    updateEmployee(param) {
        return new Promise((resolve, reject) => {
            let employeeModel = new EmployeeModel();

            let paramEmployee = {
                emp_name : param.name,
				emp_email : param.email,
				emp_username : param.username,
				emp_password : this.encrypt(param.password),
				emp_access : param.access,
				cf_id : param.cafe
            }

            employeeModel.updateEmployee(paramEmployee, param.id).then(() => {
                return resolve(true);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Delete employee
    ** DELETE :: /cafe/employee/delete
    */
    deleteEmployee(param) {
        return new Promise((resolve, reject) => {
            let employeeModel = new EmployeeModel();

            let paramEmployee = {
                cf_id : param.cafe,
				deleted_at : this.moment(new Date).format()
            }
            
            employeeModel.deleteEmployee(paramEmployee, param.id).then(() => {
                return resolve(true);
            }).catch((err) => {
                return reject(err);
            });
        });
    }
}