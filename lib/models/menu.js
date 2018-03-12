import { Model } from "./model";

export class MenuModel extends Model {
	constructor(){
		super();
	}

	/*** Get store menu ***/
	getStoreMenu(store_id){
		this.db.select("menu");
		this.db.where("store_id", store_id);
		// this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get store menu by mn_id ***/
	getStoreMenuById(mn_id) {
		this.db.init();
		this.db.select("menu");
		this.db.where("mn_id", mn_id);

		return this.db.execute(true);
	}


	/*** Get store menu list ***/
	getStoreMenuList(store_id, mn_name){
		this.db.select("menu", "count(*)");
		this.db.where("store_id", store_id);
		// this.db.whereIsNull("deleted_at");
		if(mn_name){
			this.db.whereLike("mn_name", "%"+mn_name+"%");
		}
		this.db.push();

		this.db.select("menu");
		this.db.push();

		return this.db.executeMany();
	}

	/*** Insert store menu data ***/
	insertStoreMenu(param){
		this.db.init();
		this.db.insert("menu", param);

		return this.db.execute();
	}


	/*** Update store menu data ***/
	updateStoreMenu(mn_id, param){
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
		this.db.init();
		this.db.select("menu");
		this.db.whereAny("mn_id", mn_id);

		return this.db.execute();
	}
}