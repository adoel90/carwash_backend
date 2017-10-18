import { Model } from "./model";

export class UserModel extends Model {
	constructor(){
		super();
	}

	getUserByUsername(username){
		this.db.select("users");
		this.db.join("user_level", "user_level.ul_id = users.ul_id");
		this.db.where("u_username", username);

		return this.db.execute(true);
	}
}