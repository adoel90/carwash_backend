import { Model } from "./model";

export class CafeModel extends Model {
	constructor(){
		super();
	}

	/*** Get cafe type ***/
	getCafeType(){
		this.db.select("cafe");
		this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get cafe type list ***/
	getCafeTypeList(limit, offset){
		this.db.select("cafe", "count(*)");
		this.db.whereIsNull("deleted_at");
		this.db.push();

		this.db.select("cafe");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Insert cafe data ***/
	insertCafe(param){
		this.db.insert("cafe", param);

		return this.db.execute();
	}

	/*** Update cafe data ***/
	updateCafe(cf_id, param){
		this.db.update("cafe", param);
		this.db.where("cf_id", cf_id);

		return this.db.execute();
	}
}