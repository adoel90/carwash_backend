import { Controller } from "./controller";
import { Token } from "../utils/token";

import { UserModel } from "../models/user";

export class UserController extends Controller {
	constructor(){
		super();
	}

	/*
	** Authenticate user to get access token
	** POST :: /user/authenticate
	*/
	authenticate(param){
		return new Promise((resolve, reject) => {
			let userModel = new UserModel();
			let token = new Token();

			userModel.getUserByUsername(param.username).then((user) => {
				param.password = this.encrypt(param.password);
				if(user.u_password != param.password){
					return reject(11);
				}

				let userData = this.build.user(user);

				let result = {
					accessToken : token.encode(user),
					user : userData					
				};
				return resolve(result);
			}).catch((err) => {

				if(err.code == 0){
					return reject(10);
				}else{
					return reject(err);
				}
			});
		});
	}

	/*
	** Get users list
	** GET :: /user/list
	*/
	userList(param){
		return new Promise((resolve, reject) => {
			let userModel = new UserModel();
			
			userModel.getUserList(param.limit, param.offset).then((user) => {
				let result = {
					row : user[0][0].count,
					user : []
				};

				for(let i=0; i<user[1].length; i++){
					result.user.push(this.build.user(user[1][i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Get all user
	** GET :: /user
	*/
	allUser(param) {
		return new Promise((resolve, reject) => {
			let userModel = new UserModel();

			userModel.getUser(param.name).then((user) => {
				let result = [];
				for(let i=0; i<user.length; i++){
					result.push(this.build.user(user[i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Create new user
	** POST :: /user/create
	*/
	createUser(param) {
		return new Promise((resolve, reject) => {
			let userModel = new UserModel();

			let userParam = {
				u_name : param.name,
				u_username : param.username,
				u_email : param.email,
				u_password : this.encrypt(param.password),
				ul_id : param.level,
				cf_id : param.cafe
			}
			userModel.insertUser(userParam).then(() => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Update user data
	** PUT :: /user/update
	*/
	updateUser(param) {
		return new Promise((resolve, reject) => {
			let userModel = new UserModel();

			let userParam = {
				u_name : param.name,
				u_username : param.username,
				u_email : param.email,
				ul_id : param.level,
				cf_id : param.cafe,
				updated_at : this.moment(new Date).format()
			}
			if(param.password) {
				userParam.u_password = this.encrypt(param.password);
			}
			userModel.updateUser(param.id, userParam).then(() => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Delete user data
	** PUT :: /user/delete
	*/
	deleteUser(param) {
		return new Promise((resolve, reject) => {
			let userModel = new UserModel();

			let userParam = {
				deleted_at : this.moment(new Date).format()
			}
			userModel.updateUser(param.id, userParam).then(() => {
				return resolve(true); 
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}