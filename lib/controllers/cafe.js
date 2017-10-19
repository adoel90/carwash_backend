import { Controller } from "./controller";

import { CafeModel } from "../models/cafe";
import { MenuModel } from "../models/menu";

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
					data : []
				}

				for(let i=0; i<cafe[1].length; i++){
					result.data.push(this.build.cafeType(cafe[1][i]));
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

			menuModel.getCafeMenuList(param.cf_id, param.limit, param.offset).then((menu) => {
				let result = {
					row : menu[0][0].count,
					data : []
				}

				for(let i=0; i<menu[1].length; i++){
					result.data.push(this.build.menu(menu[1][i]));
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

			let menuParam = {
				cf_id : param.cf_id,
				mn_name : param.name,
				mn_price : param.price,
				mn_desc : param.desc,
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
}