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
					data : []
				};

				for(let i=0; i<user[1].length; i++){
					result.data.push(this.build.user(user[1][i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}