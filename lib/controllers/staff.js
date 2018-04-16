import { Controller } from "./controller";
import { StaffModel } from "../models/staff";
import { StoreModel } from '../models/store';
import { UserModel } from '../models/user';

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
            let userModel = new UserModel();

            let paramStaff = {
                u_name : param.name,
                u_username : param.username.toLowerCase(),
                u_password : this.encrypt(param.password),
                u_email : param.email,
                ul_id : param.level
            }
            
            staffModel.createStaff(paramStaff).then((staff) => {
                let staffStore = {
                    u_id : staff.u_id,
                    store_id : param.store
                }
                
                storeModel.createOwnerStore(staffStore).then(() => {
                    return resolve(true);
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                if(err.code == 23505) {
                    return reject(12);
                }
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
                u_username : param.username.toLowerCase(),
                u_email : param.email,
                ul_id : param.level,
                updated_at : this.moment(new Date).format()
            }
            if(param.password) {
				paramStaff.u_password = this.encrypt(param.password);
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

    /*
    ** Add Job Position
    ** POST :: /store/staff/job
    */
    addJob(param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();

            let requiredData = {
                u_id : param.staff,
                store_id : param.store
            }

            staffModel.addJob(requiredData).then(() => {
                return resolve(true);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Change Job Position
    ** PUT :: /store/staff/job/update
    */
    changeJob (param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();

            let requiredData = {
                u_id : param.staff,
                store_id : param.store
            }

            staffModel.changeJob(requiredData, param.id).then(() => {
                return resolve(true);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Delete Job Position
    ** DELETE :: /store/staff/job/delete
    */
    deleteJob (param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();

            staffModel.deleteJob(param.id).then(() => {
                return resolve(true);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Get report staff by transaction
    ** GET :: /store/staff/report
    */
    getReportStaffByTransaction(param) {
        return new Promise((resolve, reject) => {
            let staffModel = new StaffModel();
            let userModel = new UserModel();

            staffModel.getReportStaffByTransaction(param.staff, param.store, param.start_date, param.end_date).then((staff) => {
                let result = {
                    count: staff[0][0].count,
                    data: []
                }

                if(staff[1].length > 0) {
                    for(let i=0; i<staff[1].length; i++) {
                        staffModel.getDetailTransactionItem(staff[1][i].ts_id).then((item) => {
                            userModel.getUserById(staff[1][i].created_by).then((user) => {
                                let u = this.build.staffStoreReport(staff[1][i]);
                                u.user = this.build.user(user);
                                u.item = this.build.itemMenu(item);
                                result.data.push(u);
        
                                if(result.data.length >= staff[1].length) {
                                    if(param.print){
                                        result = {
                                            title : "Laporan Staff",
                                            sub_title : this.moment(param.start_date).format("DD MMM YYYY")+" sampai "+this.moment(param.end_date).format("DD MMM YYYY"),
                                            table : {
                                                header : {
                                                    "1" : [{
                                                        name : "Tanggal"
                                                    },{
                                                        name : "Nama Staff"
                                                    },{
                                                        name : "Nama Member"
                                                    },{
                                                        name : "No. Kartu"
                                                    },{
                                                        name : "Total"
                                                    }]
                                                },
                                                data : []
                                            }
                                        }
                    
                                        for(let i=0; i<staff[1].length; i++){
                                            result.table.data.push([
                                                this.moment(staff[1][i].ts_date).format("DD MMM YYYY"),
                                                user.u_name,
                                                staff[1][i].m_name,
                                                staff[1][i].c_id,
                                                this.parseCurrency(staff[1][i].ts_total, true)
                                            ]);
                                        }
                                    }
                    
                                    return resolve(result);
                                }
                            }).catch((err) => {
                                return reject(err);
                            });
                        }).catch((err) => {
                            return reject(err);
                        });
                    }
                } else {
                    return resolve(result);
                }
            }).catch((err) => {
                return reject(err);
            });
        });
    }
}