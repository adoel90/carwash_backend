import { Model } from './model';

export class StoreModel extends Model {
      constructor() {
            super();
      }
      
      /*** Get Store List ***/
      getStoreList (id, active) {
            this.db.init();
		this.db.select("store", "count(*)");
		this.db.join("store_category", "store_category.cstore_id = store.cstore_id", "LEFT");
		this.db.join("owner", "store.store_id = owner.store_id", "LEFT");
		this.db.join("users", "users.u_id = owner.u_id", "LEFT");
		if(id) {
			this.db.where("owner.u_id", id);
		}
		if(active) {
			this.db.whereIsNull("store.deleted_at");
		}
		this.db.push();

		this.db.select("store", "store.*, owner.*, store_category.*, users.u_id, users.u_name, store.deleted_at");
		this.db.order("store.store_id");
            this.db.push();

            return this.db.executeMany();
      }

      /*** Get Detail Store ***/
      getDetailStoreById (id) {
            this.db.init();
		this.db.select("store", "store.*, owner.*, store_category.*, users.u_id, users.u_name, store.deleted_at");
		this.db.join("store_category", "store_category.cstore_id = store.cstore_id", "LEFT");
		this.db.join("owner", "store.store_id = owner.store_id", "LEFT");
		this.db.join("users", "users.u_id = owner.u_id", "LEFT");
            this.db.where("store.store_id", id);

            return this.db.execute(true);
	}
	
	/*** Get Detail Store for Delete ***/
      getDetailStoreByIdDelete (id) {
            this.db.init();
		this.db.select("store", "store.deleted_at");
		this.db.join("store_category", "store_category.cstore_id = store.cstore_id", "LEFT");
		this.db.join("owner", "store.store_id = owner.store_id", "LEFT");
		this.db.join("users", "users.u_id = owner.u_id", "LEFT");
            this.db.where("store.store_id", id);

            return this.db.execute(true);
      }
      
      /*** Create New Store ***/
      createStore (data) {
            this.db.init();
            this.db.insert("store", data, "store_id");

            return this.db.execute(true);
	}
	
	/*** Create multiple store ***/
	createOwnerStore (data) {
		this.db.init();
		this.db.insert("owner", data);

		return this.db.execute();
	}

      /*** Update Store Data ***/
      updateStore (data, id) {
            this.db.init();
            this.db.update("store", data);
            this.db.where("store_id", id);

            return this.db.execute();
      }

      /*** Get store queue ***/
      getStoreQueue(store_id) {
		return new Promise((resolve, reject) => {
			this.db.init();
			this.db.select("store");
			this.db.where("store_id", store_id);
			this.db.execute(true).then((store) => {
				let q = parseInt(store.store_queue) + 1;
				let u = {
					store_queue : q
				}
				this.db.init();
				this.db.update("store", u);
				this.db.where("store_id", store_id);

				this.db.execute().then(() => {
					return resolve(q);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
      }
      
      /*** Insert store transaction ***/
	insertStoreTransaction(param){
		this.db.insert("transaction_store", param, "ts_id");

		return this.db.execute(true);
      }
      
      /*** Insert store transaction menu ***/
	insertStoreTransactionMenu(ts_id, menu) {
		this.db.init();
		for(let i=0; i<menu.length; i++){
			let param = {
				ts_id : ts_id,
				mn_id : menu[i].id,
				ti_quantity : menu[i].quantity,
				ti_price : menu[i].price,
				ti_item : menu[i].name
			}
			this.db.insert("transaction_item", param);
			this.db.push(true);
		}

		return this.db.executeMany();
      }
      
      /*** Get store transaction by id ***/
	getStoreTransactionById(id){
		this.db.init();
		this.db.select("transaction_store");
		this.db.join("member", "member.m_id = transaction_store.m_id");
		this.db.where("ts_id", id);

		return this.db.execute(true);
      }
      
      /*** Get store transaction menu by id ***/
	getStoreTransactionMenuById(ts_id) {
		this.db.init();
		this.db.select("transaction_item");
		this.db.join("menu", "menu.mn_id = transaction_item.mn_id");
		this.db.join("store", "store.store_id = menu.store_id");
		this.db.where("ts_id", ts_id);

		return this.db.execute();
      }
      
      /*** Report owner store by Type ***/
	getGraphReportTransactionByType(type, start, end, store) {
		this.db.init();
		this.db.select("transaction_store", "date(ts_date), sum(ts_total)");
		this.db.group("date(ts_date)");
		this.db.order("date(ts_date)");
		this.db.whereBetween("date(ts_date)", start, end);
		if(store){
			this.db.where("store_id", store);
		}
		
		return this.db.execute();
	}

	/*** Report detail transaction per-store ***/
	getReportDetailByStore(store, start, end) {
		this.db.init();
		this.db.select("transaction_store", "count(*)");
		this.db.join("member", "member.m_id = transaction_store.m_id", "LEFT");
		this.db.join("card", "card.c_id = member.c_id", "LEFT");
		this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
		this.db.where("store_id", store);
		if(start && end) {
			this.db.whereBetween("date(ts_date)", start, end);
		}
		this.db.push();

		this.db.select("transaction_store");
		this.db.order("transaction_store.ts_date", true);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Report detail transaction item per-store ***/
	getReportDetailItemByStore(store, start, end) {
		this.db.init();
		this.db.select("transaction_item", "count(*)");
		this.db.join("menu", "menu.mn_id = transaction_item.mn_id");
		this.db.join("transaction_store", "transaction_store.ts_id = transaction_item.ts_id");
		this.db.join("member", "member.m_id = transaction_store.m_id", "LEFT");
		this.db.join("card", "card.c_id = member.c_id", "LEFT");
		this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
		this.db.where("transaction_store.store_id", store);
		if(start && end) {
			this.db.whereBetween("date(ts_date)", start, end);
		}
		this.db.push();

		this.db.select("transaction_item");
		this.db.order("transaction_store.ts_date", true);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Get Store Category List ***/
	getStoreCategoryList() {
		this.db.init();
		this.db.select("store_category");

		return this.db.execute();
	}

	/*** Get store transaction data ***/
	getStoreTransaction(m_id) {
		this.db.init();
		this.db.select("transaction_store");
		if(m_id) {
			this.db.where("m_id", m_id);
		}

		return this.db.execute();
	}

	/*** Get store by user ***/
	getStoreByUserId(id) {
		this.db.init();
		this.db.select("owner");
		this.db.join("store", "store.store_id = owner.store_id");
		this.db.where("owner.u_id", id);
		this.db.order("o_id");

		return this.db.execute();
	}
}