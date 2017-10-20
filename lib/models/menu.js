import { Model } from "./model";

export class MenuModel extends Model {
	constructor(){
		super();
	}

	/*** Get cafe menu ***/
	getCafeMenu(cf_id){
		this.db.select("menu");
		this.db.where("cf_id", cf_id);
		this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get cafe menu list ***/
	getCafeMenuList(cf_id, limit, offset){
		this.db.select("menu", "count(*)");
		this.db.where("cf_id", cf_id);
		this.db.whereIsNull("deleted_at");
		this.db.push();

		this.db.select("menu");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Insert cafe menu data ***/
	insertCafeMenu(param){
		this.db.insert("menu", param);

		return this.db.execute();
	}


	/*** Update cafe menu data ***/
	updateCafeMenu(mn_id, param){
		this.db.update("menu", param);
		this.db.where("mn_id", mn_id);

		return this.db.execute();
	}

	/*** Get menu by mn_id ***/
	getMenuById(mn_id){
		this.db.select("menu");
		this.db.where("mn_id", mn_id);

		return this.db.execute(true);
	}
}