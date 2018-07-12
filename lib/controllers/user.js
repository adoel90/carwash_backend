import { Controller } from "./controller";
import { Token } from "../utils/token";

import { UserModel } from "../models/user";
import { AccessModel } from "../models/access";

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
			let accessModel = new AccessModel();
			let token = new Token();

			userModel.getUserByUsername(param.username).then((user) => {
				accessModel.getAccessModule(user.ul_id).then((access) => {
					param.password = this.encrypt(param.password);
					if(user.u_password != param.password){
						return reject(11);
					}
	
					let userData = this.build.user(user);
	
					let result = {
						accessToken : token.encode(user),
						data : userData
					};
					result.data.module = [];
					for(let i=0; i<access.length; i++) {
						result.data.module.push(this.build.module(access[i]));
					}
					return resolve(result);
				}).catch((err) => {
					return reject(err);
				});
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
	** Get user detail
	** GET :: /user/detail
	*/
	userDetail(param) {
		return new Promise((resolve, reject) => {
			let userModel = new UserModel();

			userModel.getUserById(param.id).then((user) => {
				let result = this.build.user(user);
				
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

			userModel.getUser(param.name, param.access, param.active, param.limit, param.offset).then((user) => {
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
      
      userModel.getUserListUsername().then((username) => {
        var u_username = param.username.toLowerCase();

        for (let i = 0; i < username.length; i++) {
          if (u_username != username[i]) {
            var userParam = {
              u_name : param.name,
              u_username : u_username,
              u_email : param.email,
              u_password : this.encrypt(param.password),
              ul_id : param.level
            }
          } else {
            return reject(12);
          }
        }
        
        userModel.insertUser(userParam).then((user) => {
          return resolve(user);
        }).catch((err) => {
          if(err.code == 23505) {
            return reject(12);
          }
          return reject(err);
        });
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
				u_username : param.username.toLowerCase(),
				u_email : param.email,
				ul_id : param.level,
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
	** Change user status
	** PUT :: /user/status
	*/
	deleteUser(param) {
		return new Promise((resolve, reject) => {
			let userModel = new UserModel();

			userModel.getUserStatusById(param.id).then((user) => {
				let userParam = {
					deleted_at : user.deleted_at ? null : this.moment(new Date).format()
				}

				userModel.updateUser(param.id, userParam).then(() => {
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