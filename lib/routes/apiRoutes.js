import express from "express";

import { verifyToken, verifyCafeToken } from "../middleware/auth";
import { verifyMemberToken } from "../middleware/auth";
import { Routes } from "./routes";

import { IndexController } from "../controllers";
import { UserController } from "../controllers/user";
import { MemberController } from "../controllers/member";
import { CardController } from "../controllers/card";
import { ServiceController } from "../controllers/service";
import { CafeController } from "../controllers/cafe";
import { ReportController } from "../controllers/report";
import { AccessController } from "../controllers/access";
import { EmployeeController } from "../controllers/employee";
import { StoreController } from '../controllers/store';
import { StaffController } from '../controllers/staff';
import { PromoController } from '../controllers/promo';
import { SaldoController } from '../controllers/saldo';

export class ApiRoutes extends Routes{
	constructor(){
		super();
		this.app = express.Router();
	}

	routes(){
		let indexController = new IndexController();
		let userController = new UserController();
		let memberController = new MemberController();
		let cardController = new CardController();
		let serviceController = new ServiceController();
		let cafeController = new CafeController();
		let reportController = new ReportController();
		let accessController = new AccessController();
		let employeeController = new EmployeeController();
		let storeController = new StoreController();
		let staffController = new StaffController();
    let promoController = new PromoController();
    let saldoController = new SaldoController();

		this.app.get("/", (req, res) => {
			try{
				return this.success(res);
			}catch(err){
				return this.error(res);
			}
		});
		
		/* Start Admin user routes */
		this.app.post("/user/authenticate", (req, res) => {
			let param = {
				username : req.body.username,
				password : req.body.password
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			userController.authenticate(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/user/list", verifyToken, (req, res) => {
			let param = {
				name : req.query.name ? req.query.name : null,
				access : req.query.access ? req.query.access : null,
				active : req.query.active ? req.query.active : null,
				limit : req.query.limit ? req.query.limit : 10,
				offset : req.query.offset ? req.query.offset : 0
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			userController.allUser(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/user/detail", verifyToken, (req, res) => {
			let param = {
				id : req.query.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, err);
			}

			userController.userDetail(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/user/create", verifyToken, (req, res) => {
			let param = {
				username : req.body.username,
				password : req.body.password,
				name : req.body.name,
				email : req.body.email ? req.body.email : null,
				level : req.body.level
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			userController.createUser(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/user/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				username : req.body.username,
				password : req.body.password ? req.body.password : null,
				name : req.body.name,
				email : req.body.email ? req.body.email : null,
				level : req.body.level
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			userController.updateUser(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/user/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			userController.deleteUser(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/* End Admin user routes */

		/*--- Start Admin Access routes ---*/
		this.app.get("/access/list", verifyToken, (req, res) => {
			let param = {
				active : req.query.active ? req.query.active : null
			};

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			accessController.getAllAccess(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/access/detail", verifyToken, (req, res) => {
			let param = {
				id : req.query.id
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			accessController.accessDetail(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});	
		});

		this.app.post("/access/create", verifyToken, (req, res) => {
			let param = {
				name : req.body.name,
				module : req.body.module
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}
			if(!Array.isArray(param.module) || param.module.length < 1){
				return this.error(res, 1);
			}

			accessController.createAccess(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/access/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name,
				module : req.body.module
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}
			if(!Array.isArray(param.module) || param.module.length < 1){
				return this.error(res, 1);
			}

			accessController.updateAccess(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/access/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			accessController.statusAccess(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/module", verifyToken, (req, res) => {
			let param = {}

			accessController.allModule(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Admin Access routes ---*/

		/*--- Start Admin Store routes ---*/
		this.app.get("/store/list", verifyToken, (req, res) => {
			let param = {
				id: req.query.id ? req.query.id : null,
				active: req.query.active ? req.query.active : null,
				user: res.locals.user
			};

			storeController.getStoreList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/detail", verifyToken, (req,res) => {
			let param = {
				id : req.query.id ? req.query.id : null
			}

			storeController.getStoreDetail(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/store/create", verifyToken, (req, res) => {
			let param = {
				name : req.body.name,
				category : req.body.category,
				user : req.body.user
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.createNewStore(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name,
				category : req.body.category,
				charge : req.body.charge ? req.body.charge : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.updateStore(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.deleteStore(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.changeStoreStatus(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Admin Store routes ---*/

		/*--- Start Admin Category Store routes ---*/
		this.app.get("/store/category", verifyToken, (req, res) => {
			let param = {}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			storeController.getStoreCategoryList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Admin Category Store routes ---*/

		/*--- Start Discount Store routes */
		this.app.get("/store/discount", verifyToken, (req, res) => {
			let param = {
				id : req.query.id,
				active : req.query.active ? req.query.active : false
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			promoController.getPromo(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/discount/list", verifyToken, (req, res) => {
			let param = {
				id : req.query.id,
				start_date : req.query.start_date ? req.query.start_date : null,
				end_date : req.query.end_date ? req.query.end_date : null,
				active : req.query.active ? req.query.active : false
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			promoController.getPromoList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/discount/detail", verifyToken, (req, res) => {
			let param = {
				id : req.query.id
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			promoController.getPromoDetail(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/store/discount/create", verifyToken, (req, res) => {
			let param = {
				store : req.body.store,
				price : req.body.price,
				date : req.body.date ? req.body.date : null
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			promoController.createNewPromo(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/discount/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				price : req.body.price
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			promoController.updatePromo(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/discount/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			promoController.deletePromo(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/discount/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			promoController.changeStatusPromo(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Discount Store routes */

		/*--- Start Staff Store routes ---*/
		this.app.get("/store/staff/list", verifyToken, (req, res) => {
			let param = {
				id : req.query.id,
				active : req.query.active ? req.query.active : null
			};

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.getStaffList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/staff/detail", verifyToken, (req, res) => {
			let param = {
				id : req.query.id
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.getStaffDetail(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		
		this.app.post("/store/staff/create", verifyToken, (req, res) => {
			let param = {
				name : req.body.name,
				username : req.body.username,
				password : req.body.password,
				email : req.body.email ? req.body.email : null,
				level : req.body.level,
				store : req.body.store
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.createNewStaff(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/staff/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name,
				username : req.body.username,
				password : req.body.password ? req.body.password : null,
				email : req.body.email ? req.body.email : null,
				level : req.body.level
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.updateStaff(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/staff/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.deleteStaff(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/staff/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.changeStaffStatus(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/store/staff/job/create", verifyToken, (req, res) => {
			let param = {
				staff : req.body.staff,
				store : req.body.store
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.addJob(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/staff/job/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				staff : req.body.staff,
				store : req.body.store
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.changeJob(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.delete("/store/staff/job/delete", verifyToken, (req,res) => {
			let param = {
				id : req.query.id
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.deleteJob(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/staff/report", verifyToken, (req, res) => {
			let param = {
				staff: req.query.staff ? req.query.staff : null,
				store: req.query.store ? req.query.store : null,
				start_date: req.query.start_date ? req.query.start_date : null,
				end_date: req.query.end_date ? req.query.end_date : null,
				print : req.query.print ? req.query.print : false,
				convert : req.query.convert ? req.query.convert : false
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.getReportStaffByTransaction(param).then((data) => {
				if(param.print) {
					return this.render(res, "reportUser", data);
				} else if(param.convert) {
					return this.convertToXls(res, data);
				} else {
					return this.success(res, data);
				}
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/staff/report/detail", verifyToken, (req, res) => {
			let param = {
				id : req.query.id ? req.query.id : null,
				staff: req.query.staff ? req.query.staff : null,
				store: req.query.store ? req.query.store : null,
				start_date: req.query.start_date ? req.query.start_date : null,
				end_date: req.query.end_date ? req.query.end_date : null,
				print : req.query.print ? req.query.print : false,
				convert : req.query.convert ? req.query.convert : false
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			staffController.getReportStaffByTransactionDetail(param).then((data) => {
				if(param.print) {
					return this.render(res, "reportUser", data);
				} else if(param.convert) {
					return this.convertToXls(res, data);
				} else {
					return this.success(res, data);
				}
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Staff Store routes ---*/

		/*--- Start Menu Store routes ---*/
		this.app.get("/store/menu/list", verifyToken, (req, res) => {
			let param = {
				store_id : req.query.store,
				name : req.query.name ? req.query.name : null,
				active : req.query.active ? req.query.active : null,
				print : req.query.print ? req.query.print : false,
				convert : req.query.convert ? req.query.convert : false
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.getStoreMenuList(param).then((data) => {
				if(param.print) {
					return this.render(res, "menu", data);
				} else if(param.convert) {
					return this.convertToXls(res, data);
				} else {
					return this.success(res, data);
				}
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/menu/detail", verifyToken, (req, res) => {
			let param = {
				id : req.query.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.getStoreMenuDetail(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/store/menu/create", verifyToken, this.upload.single('image'), (req, res) => {
			let param = {
				store_id : req.body.store,
				name : req.body.name,
				price : req.body.price,
				desc : req.body.description ? req.body.description : null,
				image : req.file ? req.file : null,
				category : req.body.category ? req.body.category : false
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.createStoreMenu(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/menu/update", verifyToken, this.upload.single("image"), (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name,
				price : req.body.price,
				desc : req.body.description ? req.body.description : null,
				image : req.file ? req.file : null,
				category : req.body.category ? req.body.category : false
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.updateStoreMenu(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/menu/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.deleteStoreMenu(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/store/menu/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.changeStoreMenuStatus(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Menu Store routes ---*/

		/*--- Start Owner Store routes ---*/
		this.app.post("/store/transaction/create", verifyMemberToken, (req, res) => {
			let param = {
				member : res.locals.member.id,
				menu : req.body.menu,
				store : req.body.store,
				discount : req.body.discount ? req.body.discount : 0,
				increase : req.body.increase ? req.body.increase : false,
				staff : req.body.staff ? req.body.staff : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.createStoreTransaction(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/transaction/print", verifyToken, (req, res) => {
			let param = {
				id : req.query.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}
			
			storeController.storeTransactionDetail(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/report", verifyToken, (req, res) => {
			let param = {
				type : req.query.type ? req.query.type : "month",
				start_date : req.query.start_date,
				end_date : req.query.end_date,
				store : req.query.store ? req.query.store : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			storeController.storeReport(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/report/transactions", verifyToken, (req, res) => {
			let param = {
				store: req.query.store,
				start_date: req.query.start_date ? req.query.start_date : null,
				end_date: req.query.end_date ? req.query.end_date : null,
				print: req.query.print ? req.query.print : false,
				convert : req.query.convert ? req.query.convert : false
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			storeController.storeReportTransactions(param).then((data) => {
				if(param.print) {
					return this.render(res, "reportTransactions", data)
				} else if(param.convert) {
					return this.convertToXls(res, data);
				} else {
					return this.success(res, data);
				}
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/store/report/transactions/item", verifyToken, (req, res) => {
			let param = {
				store: req.query.store,
				start_date: req.query.start_date ? req.query.start_date : null,
				end_date: req.query.end_date ? req.query.end_date : null,
				print: req.query.print ? req.query.print : false,
				convert : req.query.convert ? req.query.convert : false
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			storeController.storeReportTransactionsItem(param).then((data) => {
				if(param.print) {
					return this.render(res, "reportTransactions", data)
				} else if(param.convert) {
					return this.convertToXls(res, data);
				} else {
					return this.success(res, data);
				}
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Owner Store routes ---*/

		/*--- Start Member routes ---*/
		this.app.get("/member", verifyToken, (req, res) => {
			let param = {
				name : req.query.name ? req.query.name : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.memberAll(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/member/list", verifyToken, (req, res) => {
			let param = {
				limit : req.query.limit ? req.query.limit : 10,
				offset : req.query.offset ? req.query.offset : 0,
				name : req.query.name ? req.query.name : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.memberList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/member/detail", verifyToken, (req, res) => {
			let param = {
				id : req.query.id,
				transaction : req.query.transaction == "true" ? true : false
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.memberDetail(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/member/create", verifyToken, (req, res) => {
			let param = {
				name : req.body.name,
				phone : req.body.phone ? req.body.phone : null,
				email : req.body.email ? req.body.email : null,
				address : req.body.address ? req.body.address : null,
				card : req.body.card,
				payment : req.body.payment,
				staff : req.body.staff ? req.body.staff : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.createMember(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/member/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name,
				saldo : req.body.saldo ? req.body.saldo : null,
				phone : req.body.phone ? req.body.phone : null,
				email : req.body.email ? req.body.email : null,
				address : req.body.address ? req.body.address : null,
				user : res.locals.user.u_id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.updateMember(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/member/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.deleteMember(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/member/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.changeMemberStatus(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/member/authenticate", (req, res) => {
			let param = {
				c_id : req.body.card
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.memberAuthenticate(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/member/topup", verifyMemberToken, (req, res) => {
			let param = {
				id : res.locals.member.id,
				type : res.locals.member.type,
				balance : req.body.balance,
				payment : req.body.payment,
				staff : req.body.staff ? req.body.staff : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.topupMember(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/member/topup/print", verifyToken, (req, res) => {
			let param = {
				id : req.query.id
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			memberController.topupData(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/member/refund", verifyToken, (req, res) => {
			let param = {
				/* id : res.locals.member.id,
				card : res.locals.member.card,
				type : res.locals.member.type */
				card : req.body.card,
				staff : req.body.staff ? req.body.staff : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			};

			memberController.refundMember(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/member/card/change", verifyToken, (req, res) => {
			let param = {
				member : req.body.member,
				card : req.body.card
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			memberController.changeCard(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			})
		});

		this.app.delete("/member/remove", verifyToken, (req, respo) => {
			memberController.removeMember(req.query.ct_id).then((data) => {
				return this.success(respo, data);
			}).catch((err) => {
				return this.error(respo, err);
			});
		});
		/*--- End Member routes ---*/

		/*--- Start Card routes ---*/
		this.app.get("/card/type", (req, res) => {
			let param = {};

			cardController.cardType(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/card/type/list", verifyToken, (req, res) => {
			let param = {
				limit : req.query.limit ? req.query.limit : 10,
				offset : req.query.offset ? req.query.offset : 0
			};

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cardController.cardTypeList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/card/type/create", verifyToken, (req, res) => {
			let param = {
				name : req.body.name,
				min : req.body.minimum,
				bonus : req.body.bonus,
				refund : req.body.refund ? req.body.refund : false,
				charge : req.body.charge ? req.body.charge : false
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cardController.createCardType(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/card/type/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name,
				min : req.body.minimum,
				bonus : req.body.bonus ? req.body.bonus : false,
				refund : req.body.refund ? req.body.refund : false,
				charge : req.body.charge ? req.body.charge : false
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cardController.updateCardType(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/card/type/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cardController.deleteCardType(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/card/type/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cardController.updateCardTypeStatus(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/card/list/generate/id", verifyToken, (req, res) => {
			let param = {
				type : req.query.type
			}

			if (!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			cardController.generateCardId(param.type).then((data) => {
				return this.success(res, data);
			});
		});
		/*--- End Card routes ---*/

		/*--- Start Report routes ---*/
		this.app.get("/report/member/list", verifyToken, (req, res) => {
			let param = {
				start_date : req.query.start_date,
				end_date : req.query.end_date,
				print : req.query.print ? req.query.print : false,
				convert : req.query.convert ? req.query.convert : false
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			reportController.getReportMember(param).then((data) => {
				if(param.print) {
					return this.render(res, "member", data);
				} else if(param.convert) {
					return this.convertToXls(res, data);
				} else {
					return this.success(res, data);
				}
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/report/member/graph", verifyToken, (req, res) => {
			let param = {
				type : req.query.type ? req.query.type : "month",
				start_date : req.query.start_date,
				end_date : req.query.end_date
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			reportController.getReportMemberGraph(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/report/owner", verifyToken, (req, res) => {
			let param = {
				start_date : req.query.start_date,
        		end_date : req.query.end_date,
        		convert : req.query.convert ? req.query.convert : false
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			reportController.getReportOwner(param).then((data) => {
				if(param.convert) {
					return this.convertToXls(res, data);
				} else {
					return this.success(res, data);
				}
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/report/user", verifyToken, (req, res) => {
			let param = {
				start_date : req.query.start_date,
				end_date : req.query.end_date,
				user : req.query.user ? req.query.user : null,
				print : req.query.print ? req.query.print : false,
				convert : req.query.convert ? req.query.convert : false
			}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			reportController.getReportUser(param).then((data) => {
				if(param.print){
					return this.render(res, "reportUser", data);
				} else if(param.convert) {
					return this.convertToXls(res, data);
				} else {
					return this.success(res, data);
				}
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Report routes ---*/

		/*--- Start Tier routes ---*/
		this.app.get("/tier/list", verifyToken, (req, res) => {
			let param = {}

			if(!this.checkParameters(param)) {
				return this.error(res, 1);
			}

			memberController.getTierList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
    /*--- End Tier routes ---*/
    
    /* Start Saldo Route */
    this.app.get("/saldo/list", verifyToken, (req, res) => {
      let param = {
        limit : req.query.limit ? req.query.limit : 3
      }

      saldoController.getAll(param.limit).then((data) => {
        return this.success(res, data);
      }).catch((err) => {
        return this.error(res, err);
      });
	});
	
	this.app.get('/saldo/detail', verifyToken, (req, res) => {
		let param = {
			type: req.query.type
		}

		if (!this.checkParameters(param)) {
			return this.error(res, 1);
		}

		saldoController.getOne(param.type).then((data) => {
			return this.success(res, data);
		}).catch((err) => {
			return this.error(res, err);
		});
	})

    this.app.post("/saldo/create", verifyToken, (req, res) => {
      let param = {
        saldo: req.body.saldo
      }

      if (!this.checkParameters(param)) {
        return this.error(res, 1);
      }

      saldoController.insert(param.saldo).then((data) => {
        return this.success(res, data);
      }).catch((err) => {
        return this.error(res, err);
      });
    });

    this.app.put("/saldo/update", verifyToken, (req, res) => {
      let param = {
        id: req.body.id,
        saldo: req.body.saldo
      }

      if (!this.checkParameters(param)) {
        return this.error(res, 1);
      }

      saldoController.update(param).then((data) => {
        return this.success(res, data);
      }).catch((err) => {
        return this.error(res, err);
      });
	});
	
	this.app.delete("/saldo/delete", verifyToken, (req, res) => {
		let param = {
			id: req.body.id,
		}

		if (!this.checkParameters(param)) {
			return this.error(res, 1);
		}

		saldoController.destroy(param.id).then((result) => {
			return this.success(res, result);
		}).catch((err) => {
			return this.error(res, err);
		});
	});
    /* End Saldo Route */

	return this.app;
	}
}