import { Controller } from "./controller";

import { CafeModel } from "../models/cafe";
import { MenuModel } from "../models/menu";
import { MemberModel } from "../models/member";

export class CafeController extends Controller {
	constructor(){
		super();
	}

	/*
	** Get cafe type
	** GET :: /cafe/type
	*/
	cafeType(param){
		return new Promise((resolve, reject) => {
			let cafeModel = new CafeModel();

			cafeModel.getCafeType().then((cafe) => {
				let result = [];

				for(let i=0; i<cafe.length; i++){
					result.push(this.build.cafeType(cafe[i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Get list of cafe type
	** GET :: /cafe/type/list
	*/
	cafeTypeList(param){
		return new Promise((resolve, reject) => {
			let cafeModel = new CafeModel();

			cafeModel.getCafeTypeList(param.limit, param.offset).then((cafe) => {
				let result = {
					row : cafe[0][0].count,
					cafe : []
				}

				for(let i=0; i<cafe[1].length; i++){
					result.cafe.push(this.build.cafeType(cafe[1][i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Create new cafe type
	** POST :: /cafe/type/create
	*/
	createCafe(param){
		return new Promise((resolve, reject) => {
			let cafeModel = new CafeModel();

			let cafeParam = {
				cf_name : param.name
			}
			cafeModel.insertCafe(cafeParam).then((cafe) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Update cafe type data
	** PUT :: /cafe/type/update
	*/
	updateCafe(param){
		return new Promise((resolve, reject) => {
			let cafeModel = new CafeModel();

			let cafeParam = {
				cf_name : param.name,
				updated_at : this.moment(new Date).format()
			}
			cafeModel.updateCafe(param.id, cafeParam).then((cafe) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Delete cafe type data
	** PUT :: /cafe/type/delete
	*/
	deleteCafe(param){
		return new Promise((resolve, reject) => {
			let cafeModel = new CafeModel();

			let cafeParam = {
				deleted_at : this.moment(new Date).format()
			}
			cafeModel.updateCafe(param.id, cafeParam).then((cafe) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Change cafe type status
	** PUT :: /cafe/type/status
	*/
	changeCafeStatus(param) {
		return new Promise((resolve, reject) => {
			let cafeModel = new CafeModel();

			cafeModel.getCafeTypeById(param.id).then((cafe) => {
				let cafeParam = {
					deleted_at : cafe.deleted_at ? null : this.moment(new Date).format()
				}
				cafeModel.updateCafe(param.id, cafeParam).then(() => {
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
	** Get cafe menu
	** GET :: /cafe/menu
	*/
	cafeMenu(param){
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			menuModel.getCafeMenu(param.cf_id).then((menu) => {
				let result = [];
				for(let i=0; i<menu.length; i++){
					result.push(this.build.menu(menu[i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Get cafe menu list
	** GET :: /cafe/menu/list
	*/
	cafeMenuList(param){
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			menuModel.getCafeMenuList(param.cf_id, param.limit, param.offset, param.name).then((menu) => {
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
		});
	}

	/*
	** Create new cafe menu
	** POST :: /cafe/menu/create
	*/
	createCafeMenu(param){
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			let image = this.rewriteImage(param.image);
			let menuParam = {
				cf_id : param.cf_id,
				mn_name : param.name,
				mn_price : param.price,
				mn_desc : param.desc,
				mn_img : image
			}
			menuModel.insertCafeMenu(menuParam).then((data) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Update cafe menu data
	** PUT :: /cafe/menu/update
	*/
	updateCafeMenu(param){
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			let menuParam = {
				mn_name : param.name,
				mn_price : param.price,
				mn_desc : param.desc,
				updated_at : this.moment(new Date).format()
			}

			if(param.image) {
				menuParam.mn_img = this.rewriteImage(param.image);
			}

			menuModel.updateCafeMenu(param.id, menuParam).then((data) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Delete cafe menu data
	** PUT :: /cafe/menu/delete
	*/
	deleteCafeMenu(param){
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			let menuParam = {
				deleted_at : this.moment(new Date).format()
			}
			menuModel.updateCafeMenu(param.id, menuParam).then((data) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Change cafe menu status
	** PUT :: /cafe/menu/status
	*/
	changeCafeMenuStatus(param) {
		return new Promise((resolve, reject) => {
			let menuModel = new MenuModel();

			menuModel.getCafeMenuById(param.id).then((menu) => {
				let menuParam = {
					deleted_at : menu.deleted_at ? null : this.moment(new Date).format()
				}
				menuModel.updateCafeMenu(param.id, menuParam).then(() => {
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
	** Create new cafe transaction
	** POST :: /cafe/transaction/create
	*/
	createCafeTransaction(param){
		return new Promise((resolve, reject) => {
			let cafeModel = new CafeModel();
			let menuModel = new MenuModel();
			let memberModel = new MemberModel();

			let findMenu = [];
			for(let i=0; i< param.menu.length; i++){
				findMenu.push(param.menu[i].id);
			}

			let cafe = null;

			memberModel.getMemberById(param.member).then((member) => {
				let balance = member.m_balance;
				let total = 0;
				menuModel.findMenuById(findMenu).then((menu) => {
					for(let i=0; i<menu.length; i++){
						for(let j=0; j<param.menu.length; j++){
							if(param.menu[j].id == menu[i].mn_id){
								total += (menu[i].mn_price * param.menu[j].quantity);
								if((balance - total) < 0){
									return reject(31);
								}
								cafe = menu[i].cf_id;

								param.menu[j].price = menu[i].mn_price;
							}
						}
					}

					cafeModel.getCafeQueue(cafe).then((queue) => {
						let transParam = {
							m_id : member.m_id,
							tc_total : total,
							tc_queue : queue
						}
						cafeModel.insertCafeTransaction(transParam).then((transaction) => {
							cafeModel.insertCafeTransactionMenu(transaction.tc_id, param.menu).then(() => {
								memberModel.decreaseBalance(transParam.m_id, total).then(() => {
									let result = this.build.member(member);
									result.transaction = transaction.tc_id;
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
			})
			/*memberModel.getMemberById(param.member).then((member) => {
				menuModel.getMenuById(param.menu).then((menu) => {
					if(member.m_balance < menu.mn_price){
						return reject(31);
					}
					
					let transParam = {
						m_id : member.m_id,
						mn_id : menu.mn_id,
						tc_quantity : param.quantity,
						tc_price : menu.mn_price
					}
					let total = (transParam.tc_quantity * transParam.tc_price);
					cafeModel.insertCafeTransaction(transParam).then((transaction) => {
						memberModel.decreaseBalance(transParam.m_id, total).then(() => {
							let result = this.build.member(member);
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
			});*/
		});
	}

	/*
	** Get cafe transaction print data
	** GET :: /cafe/transaction/print
	*/
	cafeTransactionDetail(param) {
		return new Promise((resolve, reject) => {
			let cafeModel = new CafeModel();

			cafeModel.getCafeTransactionById(param.id).then((transaction) => {
				let result = this.build.transactionCafe(transaction);
				cafeModel.getCafeTransactionMenuById(param.id).then((menu) => {
					result.menu = [];
					for(let i=0; i<menu.length; i++){
						let mn = this.build.menu(menu[i]);
						mn.cafe = this.build.cafeType(menu[i]);
						result.menu.push(mn);
					}
					return resolve(result);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}