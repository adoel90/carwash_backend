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

	/*** Insert cafe transaction ***/
	insertCafeTransaction(param){
		this.db.insert("transaction_cafe", param, "tc_id");

		return this.db.execute(true);
	}

	/*** Insert cafe transaction menu ***/
	insertCafeTransactionMenu(tc_id, menu) {
		this.db.init();
		for(let i=0; i<menu.length; i++){
			let param = {
				tc_id : tc_id,
				mn_id : menu[i].id,
				tcm_quantity : menu[i].quantity,
				tcm_price : menu[i].price
			}
			this.db.insert("transaction_cafe_menu", param);
			this.db.push(true);
		}

		return this.db.executeMany();
	}
}