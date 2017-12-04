import { Model } from "./model";

export class MenuModel extends Model {
	constructor(){
		super();
	}

	/*** Get cafe menu ***/
	getCafeMenu(cf_id){
		this.db.select("menu");
		this.db.where("cf_id", cf_id);
		// this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get cafe menu by mn_id ***/
	getCafeMenuById(mn_id) {
		this.db.init();
		this.db.select("menu");
		this.db.where("mn_id", mn_id);

		return this.db.execute(true);
	}


	/*** Get cafe menu list ***/
	getCafeMenuList(cf_id, limit, offset, mn_name){
		this.db.select("menu", "count(*)");
		this.db.where("cf_id", cf_id);
		// this.db.whereIsNull("deleted_at");
		if(mn_name){
			this.db.whereLike("mn_name", "%"+mn_name+"%");
		}
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

	/*** Find menu by many mn_id ***/
	findMenuById(mn_id){
		console.log(mn_id);
		this.db.init();
		this.db.select("menu");
		this.db.whereAny("mn_id", mn_id);

		return this.db.execute();
	}
}