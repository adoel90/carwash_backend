import { Controller } from "./controller";

import { CafeModel } from "../models/cafe";

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
			let cafeModel = new CafeModel;

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
			let cafeModel = new CafeModel;

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
			let cafeModel = new CafeModel;

			let cafeParam = {
				cf_name : param.name
			}
			cafeModel.updateCafe(param.id, cafeParam).then((cafe) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}