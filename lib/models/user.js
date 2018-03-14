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

	getUserById(u_id) {
		this.db.init();
		this.db.select("users");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		this.db.where("u_id", u_id);

		return this.db.execute(true);
	}

	/*** Get user by username ***/
	getUserByUsername(username){
		this.db.select("users");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		this.db.where("u_username", username);
		// this.db.whereIsNull("deleted_at");

		return this.db.execute(true);
	}

	getUser(name) {
		this.db.init();
		this.db.select("users", "users.deleted_at as users_deleted, *");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		this.db.where("users.ul_id", "4", "AND", "!=");
		if(name) {
			this.db.whereLike("lower(u_name)", "%"+name.toLowerCase()+"%");
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
		this.db.insert("users", param);

		return this.db.execute();
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