import { Controller } from "./controller";

import { ServiceModel } from "../models/service";
import { MemberModel } from "../models/member";

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
					type : []
				}

				for(let i=0; i<type[1].length; i++){
					result.type.push(this.build.serviceType(type[1][i]));
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

	/*
	** Get service data
	** GET :: /service
	*/
	service(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			serviceModel.getService(param.type).then((service) => {
				let result = [];
				for(let i=0; i<service.length; i++){
					result.push(this.build.service(service[i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Get list of service data
	** GET :: /service/list
	*/
	serviceList(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			serviceModel.getServiceList(param.type, param.limit, param.offset).then((service) => {
				let result = {
					row : service[0][0].count,
					service : []
				};

				for(let i=0; i<service[1].length; i++){
					result.service.push(this.build.service(service[1][i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Create new service
	** GET :: /service/create
	*/
	createService(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			let image = this.rewriteImage(param.img);
			let serviceParam = {
				srvt_id : param.type,
				srv_name : param.name,
				srv_price : param.price,
				srv_desc : param.desc,
				srv_img : image
			}
			serviceModel.insertService(serviceParam).then((service) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Update service data
	** PUT :: /service/update
	*/
	updateService(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			let serviceParam = {
				srv_name : param.name,
				srv_price : param.price,
				srv_desc : param.desc,
				updated_at : this.moment(new Date).format()
			}
			serviceModel.updateService(param.id, serviceParam).then((service) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Delete service data
	** PUT :: /service/delete
	*/
	deleteService(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();

			let serviceParam = {
				deleted_at : this.moment(new Date).format()
			}
			serviceModel.updateService(param.id, serviceParam).then((service) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Create service transaction
	** POST ::: /service/transaction/create
	*/
	createServiceTransaction(param){
		return new Promise((resolve, reject) => {
			let serviceModel = new ServiceModel();
			let memberModel = new MemberModel();

			memberModel.getMemberById(param.member).then((member) => {
				serviceModel.getServiceById(param.service).then((service) => {
					if(member.m_balance < service.srv_price){
						return reject(31);
					}

					let transParam = {
						m_id : param.member,
						srv_id : service.srv_id,
						tsrv_date : this.moment(new Date).format(),
						tsrv_price : service.srv_price
					}
					serviceModel.insertServiceTransaction(transParam).then((transaction) => {
						memberModel.decreaseBalance(transParam.m_id, transParam.tsrv_price).then((balance) => {
							let result = this.build.member(member);
							result.balance -= service.srv_price;
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
		});
	}
}