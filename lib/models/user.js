import { Model } from "./model";

export class UserModel extends Model {
	constructor(){
		super();
	}

	getUserByUsername(username){
		this.db.select("users");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		this.db.where("u_username", username);
		// this.db.whereIsNull("deleted_at");

		return this.db.execute(true);
	}

	getUserList(limit, offset){
		this.db.select("users", "count(*)");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		// this.db.whereIsNull("deleted_at");		
		this.db.push();

		this.db.select("users");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}
}