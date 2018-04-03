import { Controller } from "./controller";
import { StaffModel } from "../models/staff";
import { StoreModel } from '../models/store';

export class StaffController extends Controller {
    constructor() {
        super();
    }

    /*
    ** Get Staff List
    ** GET :: /store/staff/list
    */
    getStaffList(param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();

            staffModel.listStaff(param.id, param.active).then((staff) => {
                let result = {
                    row : staff[0][0].count,
                    staff : []
                }

                for(let i=0; i<staff[1].length; i++) {
                    result.staff.push(this.build.user(staff[1][i]))
                }

                return resolve(result);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Get staff detail
    ** GET :: /store/staff/detail
    */
    getStaffDetail (param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();

            staffModel.getStaffById(param.id).then((staff) => {
                let result = this.build.user(staff);

                return resolve(result);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Create new staff
    ** POST :: /store/staff/create
    */
    createNewStaff (param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();
            let storeModel = new StoreModel();

            let paramStaff = {
                u_name : param.name,
                u_username : param.username,
                u_password : param.password,
                u_email : param.email,
                ul_id : param.level
            }

            staffModel.createStaff(paramStaff).then((staff) => {
                let staffStore = {
					u_id : staff.u_id,
                    store_id : param.store,
                    o_id : false
                }
                
                storeModel.createOwnerStore(staffStore).then(() => {
					return resolve(true);
				}).catch((err) => {
					return reject(err);
				});
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Update staff
    ** PUT :: /store/staff/update
    */
    updateStaff (param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();

            let paramStaff = {
                u_name : param.name,
                u_username : param.username,
                u_password : param.password,
                u_email : param.email,
                ul_id : param.level,
                updated_at : this.moment(new Date).format()
            }

            staffModel.updateStaff(paramStaff, param.id).then(() => {
                return resolve(true);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Delete staff
    ** PUT :: /store/staff/delete
    */
    deleteStaff (param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();

            let paramStaff = {
                deleted_at : this.moment(new Date).format()
            }

            staffModel.updateStaff(paramStaff, param.id).then(() => {
                return resolve(true);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Change staff status
    ** PUT :: /store/staff/status
    */
    changeStaffStatus (param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();

            staffModel.findStaff(param.id).then((staff) => {
                let paramStaff = {
                    deleted_at : staff.deleted_at ? null : this.moment(new Date).format()
                }

                staffModel.updateStaff(paramStaff, param.id).then(() => {
                    return resolve(true);
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        });
    }
}