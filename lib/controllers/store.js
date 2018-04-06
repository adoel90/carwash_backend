import { Controller } from './controller';
import { StoreModel } from '../models/store';
import { MenuModel } from '../models/menu';
import { MemberModel } from '../models/member';

export class StoreController extends Controller {
      constructor() {
            super();
      }
      
      /*
      ** Get list store
      ** GET :: /store/list
      */
      getStoreList (param) {
            return new Promise((resolve, reject) => {
                  let storeModel = new StoreModel();

                  storeModel.getStoreList(param.id, param.active).then((store) => {
                        let result = {
                              row : store[0][0].count,
                              store : []
                        }

                        for(let i=0; i<store[1].length; i++) {
                              result.store.push(this.build.store(store[1][i]));
                        }

                        return resolve(result);
                  }).catch((err) => {
                        return reject(err);
                  });
            });
      }

      /*
      ** Get detail store
      ** GET :: /store/detail
      */
      getStoreDetail (param) {
           return new Promise((resolve, reject) => {
                 let storeModel = new StoreModel();

                 storeModel.getDetailStoreById(param.id).then((store) => {
			     let result = this.build.store(store);

                       return resolve(result);
                 }).catch((err) => {
                       return reject(err);
                 });
           });
      }

      /*
      ** Create new store
      ** POST :: /store/create
      */
      createNewStore (param) {
            return new Promise((resolve, reject) => {
                  let storeModel = new StoreModel();

                  let paramStore = {
                        store_name : param.name,
                        cstore_id : param.category
                  }

                  storeModel.createStore(paramStore).then((store) => {
				let ownerStore = {
					u_id : param.user,
					store_id : store.store_id,
					o_status : true
				}

				storeModel.createOwnerStore(ownerStore).then(() => {
					return resolve(true);
				}).catch((err) => {
					return reject(err);
				});
                  }).catch((err) => {
                        return reject(err);
                  });
            });
      }

      /*
      ** Update store data
      ** PUT :: /store/update
      */
      updateStore (param) {
            return new Promise((resolve, reject) => {
                  let storeModel = new StoreModel();

                  let paramStore = {
                        store_name : param.name,
				cstore_id : param.category,
				store_charge : param.charge
                  }

                  storeModel.updateStore(paramStore, param.id).then((store) => {
                        return resolve(true);
                  }).catch((err) => {
                        return reject(err);
                  });
            })
      }

      /*
	** Delete store data
	** PUT :: /store/delete
	*/
	deleteStore(param){
		return new Promise((resolve, reject) => {
			let storeModel = new StoreModel();

			let paramStore = {
				deleted_at : this.moment(new Date).format()
                  }
                  
			storeModel.updateStore(paramStore, param.id).then((store) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Change store status
	** PUT :: /store/status
	*/
	changeStoreStatus(param) {
		return new Promise((resolve, reject) => {
			let storeModel = new StoreModel();

			storeModel.getDetailStoreById(param.id).then((store) => {
				let paramStore = {
					deleted_at : store.deleted_at ? null : this.moment(new Date).format()
                        }
                        
				storeModel.updateStore(paramStore, param.id).then(() => {
					return resolve(true);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
      }

      /*
      ** Get store menu
      ** GET :: /store/menu/list
      */
      getStoreMenuList(param) {
            return new Promise((resolve, reject) => {
                  let menuModel = new MenuModel();

                  menuModel.getStoreMenuList(param.store_id, param.name, param.active).then((menu) => {
                        let result = {
                              row : menu[0][0].count,
                              menu : []
                        }

                        for(let i=0; i<menu[1].length; i++){
                              result.menu.push(this.build.menu(menu[1][i]));
                        }

                        return resolve(result);
                  }).catch((err) => {
                        return reject(err);
                  });
            })
	}
	
	/*
      ** Get store menu
      ** GET :: /store/menu/detail
      */
	getStoreMenuDetail(param) {
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			menuModel.getStoreMenuDetail(param.id).then((menu) => {
				let result = this.build.menu(menu);

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		})
	}

      /*
	** Create new store menu
	** POST :: /store/menu/create
	*/
	createStoreMenu(param){
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			let image = this.rewriteImage(param.image);
			let menuParam = {
				store_id : param.store_id,
				mn_name : param.name,
				mn_price : param.price,
				mn_desc : param.desc,
				mn_img : image,
				mn_category : param.category
                  }
                  
			menuModel.insertStoreMenu(menuParam).then((data) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
      }
      
      /*
	** Update store menu data
	** PUT :: /store/menu/update
	*/
	updateStoreMenu(param){
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			let menuParam = {
				mn_name : param.name,
				mn_price : param.price,
				mn_desc : param.desc,
				mn_category : param.category,
				updated_at : this.moment(new Date).format()
			}

			if(param.image) {
				menuParam.mn_img = this.rewriteImage(param.image);
			}

			menuModel.updateStoreMenu(param.id, menuParam).then((data) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
      }
      
      /*
	** Delete store menu data
	** PUT :: /store/menu/delete
	*/
	deleteStoreMenu(param){
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			let menuParam = {
				deleted_at : this.moment(new Date).format()
			}
                  
                  menuModel.updateStoreMenu(param.id, menuParam).then((data) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
      }
      
      /*
	** Change store menu status
	** PUT :: /store/menu/status
	*/
	changeStoreMenuStatus(param) {
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			menuModel.getStoreMenuById(param.id).then((menu) => {
				let menuParam = {
					deleted_at : menu.deleted_at ? null : this.moment(new Date).format()
                        }
                        
				menuModel.updateStoreMenu(param.id, menuParam).then(() => {
					return resolve(true);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
      }
      
      /*
	** Create new store transaction
	** POST :: /store/transaction/create
	*/
	createStoreTransaction(param){
		return new Promise((resolve, reject) => {
			let storeModel = new StoreModel();
			let menuModel = new MenuModel();
			let memberModel = new MemberModel();

			let findMenu = [];
			for(let i=0; i< param.menu.length; i++){
				findMenu.push(param.menu[i].id);
			}

                  let store = null;
                  
                  memberModel.getMemberById(param.member).then((member) => {
				let balance = member.m_balance;
				let total = 0;
                        
                        menuModel.findMenuById(findMenu).then((menu) => {
					for(let i=0; i<menu.length; i++){
						for(let j=0; j<param.menu.length; j++){
							if(param.menu[j].id == menu[i].mn_id){
								let price;
								if(param.increase) {
									price = param.menu[j].price+((param.menu[j].price*parseInt(param.discount))/100);
								} else {
									price = param.menu[j].price-((param.menu[j].price*parseInt(param.discount))/100);
								}
								total += (price * param.menu[j].quantity);
								if((balance - total) < 0){
									return reject(31);
								}
								store = menu[i].store_id;

								param.menu[j].price = price;
							}
						}
                              }
                              
                              storeModel.getStoreQueue(store).then((queue) => {
						let transParam = {
							m_id : member.m_id,
							ts_total : total,
							ts_queue : queue,
							store_id : param.store
						}

                                    storeModel.insertStoreTransaction(transParam).then((transaction) => {
							storeModel.insertStoreTransactionMenu(transaction.ts_id, param.menu).then(() => {
								memberModel.decreaseBalance(transParam.m_id, total).then(() => {
									let result = this.build.member(member);
									result.transaction = transaction.ts_id;
									result.balance -= total;
	
									return resolve(result);
								}).catch((err) => {
									return reject(err);
								});
							}).catch((err) => {
								return reject(err);
							});
						}).catch((err) => {
							return reject(err);
						});
					}).catch((err) => {
						return reject(err);
					});
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
      }
      
      /*
	** Get store transaction print data
	** GET :: /store/transaction/print
	*/
	storeTransactionDetail(param) {
		return new Promise((resolve, reject) => {
			let storeModel = new StoreModel();

			storeModel.getStoreTransactionById(param.id).then((transaction) => {
				let result = this.build.transactionStore(transaction);
				storeModel.getStoreTransactionMenuById(param.id).then((menu) => {
					result.menu = [];
					let storeQueue;
					let dateTime;

					for(let i=0; i<menu.length; i++){
						let mn = this.build.menu(menu[i]);
						mn.store = this.build.storeType(menu[i]);
						storeQueue = menu[i].store_queue;
						dateTime = menu[i].created_at;
						result.menu.push(mn);
					}

					result.queue = storeQueue;
					result.date = dateTime;

					return resolve(result);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
      }
      
      /*
	** Get report transaction per-store
	** GET :: /store/report
	*/
	storeReport(param) {
		return new Promise((resolve, reject) => {
			let storeModel = new StoreModel();

			let result = this.buildRange(param.type, param.start_date, param.end_date);
			let format = "DD MMM YYYY";
			if (param.type == "month") {
				format = "MMM YYYY";
			} else if(param.type == "year") {
				format = "YYYY";
			}

			storeModel.getGraphReportTransactionByType(param.type, param.start_date, param.end_date, param.store).then((reportStore) => {
				for(let i=0; i<reportStore.length; i++){
					let date = this.moment(reportStore[i].date).format(format); 
					if(result[date]){
						result[date].transaction += parseFloat(reportStore[i].sum);
					}
				}

				let data = [];
				for(let i in result) {
					result[i].name = i;
					data.push(result[i]);
				}
				
				return resolve(data);
			}).catch((err) => {
				return reject(err);
			});
		})
	}

	/*
	** Get store category list
	** GET :: /store/category
	*/
	getStoreCategoryList(param) {
		return new Promise((resolve, reject) => {
			let storeModel = new StoreModel();

			storeModel.getStoreCategoryList().then((category) => {
				let result = [];
				
				for(let i=0; i<category.length; i++) {
					result.push(this.build.categoryStore(category[i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}