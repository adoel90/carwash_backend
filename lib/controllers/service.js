import { Controller } from "./controller";

import { ServiceModel } from "../models/service";

export class ServiceController extends Controller {
	constructor(){
		super();
	}

	/*
	** Get service type
	** GET :: /service/type
	*/
	serviceType(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			serviceModel.getServiceType().then((type) => {
				let result = [];
				for(let i=0; i<type.length; i++){
					result.push(this.build.serviceType(type[i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Get service type list
	** GET :: /service/type/list
	*/
	serviceTypeList(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			serviceModel.getServiceTypeList(param.limit, param.offset).then((type) => {
				let result = {
					row : type[0][0].count,
					data : []
				}

				for(let i=0; i<type[1].length; i++){
					result.data.push(this.build.serviceType(type[1][i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Create new service type
	** POST :: /service/type/create
	*/
	createServiceType(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			let serviceParam = {
				srvt_name : param.name
			}
			serviceModel.insertServiceType(serviceParam).then((type) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Update service type data
	** PUT :: /service/type/update
	*/
	updateServiceType(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			let serviceParam = {
				srvt_name : param.name,
				update_at : this.moment(new Date).format()
			}
			serviceModel.updateServiceType(param.id, serviceParam).then((type) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Delete service type data
	** PUT :: /service/type/delete
	*/
	deleteServiceType(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			let serviceParam = {
				deleted_at : this.moment(new Date).format()
			}
			serviceModel.updateServiceType(param.id, serviceParam).then((type) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}