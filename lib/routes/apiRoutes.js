import express from "express";
import crypto from "crypto";

import { verifyToken } from "../middleware/auth";
import { verifyMemberToken } from "../middleware/auth";
import { Routes } from "./routes";

import { IndexController } from "../controllers/index";
import { UserController } from "../controllers/user";
import { MemberController } from "../controllers/member";
import { CardController } from "../controllers/card";
import { ServiceController } from "../controllers/service";
import { CafeController } from "../controllers/cafe";
import { ReportController } from "../controllers/report";

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

		this.app.get("/", (req, res) => {
			try{
				return this.success(res);
			}catch(err){
				return this.error(res);
			}
		});
		
		/*--- Start User routes ---*/
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
			})
		});

		this.app.get("/user/list", verifyToken, (req, res) => {
			let param = {
				limit : req.query.limit ? req.query.limit : 10,
				offset : req.query.offset ? req.query.offset : 0
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			userController.userList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End User routes ---*/

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

		this.app.post("/member/create", verifyToken, (req, res) => {
			let param = {
				name : req.body.name,
				phone : req.body.phone ? req.body.phone : null,
				email : req.body.email ? req.body.email : null,
				address : req.body.address ? req.body.address : null,
				card : req.body.card
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
				phone : req.body.phone ? req.body.phone : null,
				email : req.body.email ? req.body.email : null,
				address : req.body.address ? req.body.address : null,
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
				balance : req.body.balance
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
				bonus : req.body.bonus,
				refund : req.body.refund ? req.body.refund : false,
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
		/*--- End Card routes ---*/

		/*--- Start Service routes ---*/
		this.app.get("/service/type", verifyToken, (req, res) => {
			let param = {

			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.serviceType(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/service/type/list", verifyToken, (req, res) => {
			let param = {
				limit : req.query.limit ? req.query.limit : 10,
				offset : req.query.offset ? req.query.offset : 0
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.serviceTypeList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/service/type/create", verifyToken, (req, res) => {
			let param = {
				name : req.body.name
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.createServiceType(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/service/type/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.updateServiceType(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});

		});

		this.app.put("/service/type/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.deleteServiceType(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});

		});

		this.app.put("/service/type/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.changeServiceTypeStatus(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});

		});

		this.app.get("/service", verifyToken, (req, res) => {
			let param = {
				type : req.query.type
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.service(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/service/list", verifyToken, (req, res) => {
			let param = {
				type : req.query.type,
				limit : req.query.limit ? req.query.limit : 10,
				offset : req.query.offset ? req.query.offset : 0
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.serviceList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/service/create", verifyToken, this.upload.single("image"), (req, res) => {
			let param = {
				type : req.body.type,
				name : req.body.name,
				price : req.body.price,
				desc : req.body.description ? req.body.description : null,
				img : req.file ? req.file : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.createService(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/service/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name,
				price : req.body.price,
				desc : req.body.description ? req.body.description : null,
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.updateService(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/service/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.deleteService(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/service/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.changeServiceStatus(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/service/transaction/create", verifyMemberToken, (req, res) => {
			let param = {
				member : res.locals.member.id,
				service : req.body.service
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			serviceController.createServiceTransaction(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Service routes ---*/

		/*--- Start Cafe routes ---*/
		this.app.get("/cafe/type", verifyToken, (req, res) => {
			let param = {

			}

			cafeController.cafeType(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/cafe/type/list", verifyToken, (req, res) => {
			let param = {
				limit : req.query.limit ? req.query.limit : 10,
				offset : req.query.offset ? req.query.offset : 0
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.cafeTypeList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/cafe/type/create", verifyToken, (req, res) => {
			let param = {
				name : req.body.name
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.createCafe(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/cafe/type/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.updateCafe(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/cafe/type/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.deleteCafe(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/cafe/type/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.changeCafeStatus(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/cafe/menu", verifyToken, (req, res) => {
			let param = {
				cf_id : req.query.cafe
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.cafeMenu(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/cafe/menu/list", verifyToken, (req, res) => {
			let param = {
				cf_id : req.query.cafe,
				limit : req.query.limit ? req.query.limit : 10,
				offset : req.query.offset ? req.query.offset : 0,
				name : req.query.name ? req.query.name : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.cafeMenuList(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/cafe/menu/create", verifyToken, this.upload.single('image'), (req, res) => {
			let param = {
				cf_id : req.body.cafe,
				name : req.body.name,
				price : req.body.price,
				desc : req.body.description ? req.body.description : null,
				image : req.file ? req.file : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.createCafeMenu(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/cafe/menu/update", verifyToken, (req, res) => {
			let param = {
				id : req.body.id,
				name : req.body.name,
				price : req.body.price,
				desc : req.body.description ? req.body.description : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.updateCafeMenu(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/cafe/menu/delete", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.deleteCafeMenu(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.put("/cafe/menu/status", verifyToken, (req, res) => {
			let param = {
				id : req.body.id
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.changeCafeMenuStatus(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.post("/cafe/transaction/create", verifyMemberToken, (req, res) => {
			let param = {
				member : res.locals.member.id,
				menu : req.body.menu
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			cafeController.createCafeTransaction(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		/*--- End Service routes ---*/


		/*--- Start Report routes ---*/
		this.app.get("/report/transaction/cafe", verifyToken, (req, res) => {
			let param = {
				start_date : req.query.start_date,
				end_date : req.query.end_date,
				cafe : req.query.cafe ? req.query.cafe : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			reportController.cafeTransactionReport(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/report/transaction/service", verifyToken, (req, res) => {
			let param = {
				start_date : req.query.start_date,
				end_date : req.query.end_date,
				service : req.query.service ? req.query.service : null
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			reportController.serviceTransactionReport(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});

		this.app.get("/report/summary/cafe", verifyToken, (req, res) => {
			let param = {
				start_date : req.query.start_date,
				end_date : req.query.end_date
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			reportController.cafeSummaryReport(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			})
		});

		this.app.get("/report/summary/service", verifyToken, (req, res) => {
			let param = {
				start_date : req.query.start_date,
				end_date : req.query.end_date
			}

			if(!this.checkParameters(param)){
				return this.error(res, 1);
			}

			reportController.serviceSummaryReport(param).then((data) => {
				return this.success(res, data);
			}).catch((err) => {
				return this.error(res, err);
			});
		});
		/*--- End Report routes ---*/

		return this.app;
	}
}