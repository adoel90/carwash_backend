import { Model } from "./model";

export class UserModel extends Model {
	constructor(){
		super();
	}

	/* Get user by user_id and level_access */
	getUserByAccessId(data) {
		this.db.init();
		this.db.select("users");
		this.db.whereAny("users.u_id", data.u_id);
		this.db.where("ul_id", data.ul_id);
		
		return this.db.execute(true);
	}
	
	/* Get user by Access Level */
	getUserByLevelAccess(id) {
		this.db.init();
		this.db.select("users");
		this.db.where("ul_id", id);
		this.db.order("u_id");
		
		return this.db.execute();
	}

	getUserById(u_id) {
		this.db.init();
		this.db.select("users");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		this.db.where("u_id", u_id);

		return this.db.execute(true);
	}

	getUserStatusById(u_id) {
		this.db.init();
		this.db.select("users");
		this.db.where("u_id", u_id);

		return this.db.execute(true);
	}

	/*** Get user by username ***/
	getUserByUsername(username){
		this.db.select("users");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		this.db.where("u_username", username);
		this.db.whereIsNull("users.deleted_at");

		return this.db.execute(true);
	}

	/*** Get user by username All ***/
	getUserByUsernameUnique(username){
		this.db.init();
		this.db.select("users");
		this.db.where("lower(u_username)", username.toLowerCase());

		return this.db.execute();
	}

	/*** Get user by username All ***/
	getUserByUsernameAll(username){
		this.db.select("users");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		this.db.where("u_username", username);

		return this.db.execute(true);
	}

	getUser(name, access, active) {
		this.db.init();
		this.db.select("users", "users.*, user_level.ul_id, user_level.ul_name");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		if(name) {
			this.db.whereLike("lower(u_name)", "%"+name.toLowerCase()+"%");
		}
		if(access) {
			this.db.where("users.ul_id", access);
		}
		if(active) {
			this.db.whereIsNull("users.deleted_at");
		}
		this.db.order("u_id");

		return this.db.execute();
	}

	/*** Get user list ***/
	getUserList(limit, offset){
		this.db.init();
		this.db.select("users", "count(*)");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		// this.db.whereIsNull("deleted_at");		
		this.db.push();

		this.db.select("users");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Insert user data ***/
	insertUser(param) {
		this.db.init();
		this.db.insert("users", param, "u_id");

		return this.db.execute(true);
	}

	/*** Insert user vendor data ***/
	insertUserVendor(param) {
		this.db.init();
		this.db.insert("users", param, "u_id");

		return this.db.execute(true);
	}

	/*** Update user data ***/
	updateUser(id, param) {
		this.db.init();
		this.db.update("users", param);
		this.db.where("u_id", id);

		return this.db.execute();
	}
}