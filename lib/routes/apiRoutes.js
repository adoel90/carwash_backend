import express from "express";
import crypto from "crypto";

import { verifyToken } from "../middleware/auth";
import { Routes } from "./routes";

import { IndexController } from "../controllers/index";
import { UserController } from "../controllers/user";
import { MemberController } from "../controllers/member";

export class ApiRoutes extends Routes{
	constructor(){
		super();
		this.app = express.Router();
	}

	routes(){
		let indexController = new IndexController();
		let userController = new UserController();
		let memberController = new MemberController();

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
		this.app.get("/member/list", verifyToken, (req, res) => {
			let param = {
				limit : req.query.limit ? req.query.limit : 10,
				offset : req.query.offset ? req.query.offset : 0
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
				balance : req.body.balance,
				type : req.body.type,
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
		/*--- End Member routes ---*/

		return this.app;
	}
}