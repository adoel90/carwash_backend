import fs from "fs";
import moment, { lang } from "moment";
import config from "../../config.json";

export class Build {
	constructor(){

	}

	checkImage(filename){
		if(fs.existsSync(__dirname+"/../../public/"+filename)){
			return config.server.host+"public/"+filename;
		}else{
			return null;
		}
	}

	user(data){
		let user = {
			id : data.u_id,
			name : data.u_name,
			username : data.u_username,
			email : data.u_email,
			status : true
		}

		if(data.deleted_at || data.users_deleted) {
			user.status = false;
		}

		if(data.ul_name){
			user.level = this.accessLevel(data);
		}

		return user;
	}

	accessLevel(data) {
		let access = {
			id : data.ul_id,
			name : data.ul_name,
			status : true
		}

		if(data.deleted_at) {
			access.status = false;
		}
		return access;
	}

	module(data) {
		let module = {
			id : data.mod_id,
			name : data.mod_name
		}

		return module;
	}

	member(data){
		let member = {
			id : data.m_id,
			name : data.m_name,
			phone : data.m_phone,
			email : data.m_email,
			address : data.m_address,
			balance : data.m_balance,
			payment : data.m_payment,
			card : {
				id : data.c_id
			},
			status : true
		}

		if(data.ct_id){
			member.card.type = this.card(data);
		}

		if(data.deleted) {
			member.status = false;
		}

		return member;
	}

	card(data){
		let card = {
			id : data.ct_id,
			name : data.ct_name,
			min : data.ct_min,
			bonus : data.ct_bonus,
			refund : data.ct_refund,
			status : true
		}

		if(data.deleted_at) {
			card.status = false;
		}

		return card;
	}

	serviceType(data) {
		let type = {
			id : data.srvt_id,
			name : data.srvt_name,
			status : true
		}

		if(data.deleted_at) {
			type.status = false;
		}

		return type;
	}

	storeType(data){
		let type = {
			id : data.cf_id,
			name : data.cf_name,
			status : true
		}

		if(data.deleted_at) {
			type.status = false
		}

		return type;
	}

	menu(data){
		let menu = {
			id : data.mn_id,
			name : data.mn_name,
			price : data.mn_price,
			description : data.mn_desc,
			image : this.checkImage(data.mn_img),
			status : true
		}

		if(data.deleted_at) {
			menu.status = false;
		}

		return menu;
	}

	service(data){
		let service = {
			id : data.srv_id,
			name : data.srv_name,
			price : data.srv_price,
			description : data.srv_desc,
			image : this.checkImage(data.srv_img),
			status : true
		}

		if(data.deleted_at) {
			service.status = false;
		}

		return service;
	}

	transactionStore(data) {
		let transaction = {
			id : data.tc_id,
			date : data.tc_date,
			queue : data.tc_queue,
			total : data.tc_total,
			member : this.member(data)
		}

		return transaction;
	}

	transactionService(data) {
		let transaction = {
			id : data.tsrv_id,
			date : data.tsrv_date,
			queue : data.tsrv_queue,
			total : data.tsrv_price,
			member : this.member(data)
		}

		return transaction;
	}

	reportRangeDate(start, end, data) {
		let result = [];
		start = moment(start);
		end = moment(end);
		let diff = end.diff(start, "days");

		let c = 0;
		for(let i=0; i<=diff; i++){
			let total = 0;
			if(moment(data[c].date).format("DDMMYYYY") == moment(start).format("DDMMYYYY")){
				total = data[c].sum;
				c++;
			}
			result.push({
				date : moment(start).format("DD-MM-YYYY"),
				total : total
			});
			start = moment(start).add(1, "days");
		}

		return result;
	}

	topup(data) {
		let topup = {
			id : data.tp_id,
			date : data.tp_date,
			total : data.tp_value,
			payment : data.tp_payment
		}

		return topup;
	}

	/*** Employee access ***/
	employeeAccess(code) {
		code += 1;
		let name = ["Deactive", "Admin", "Kasir"];

		return name[code];
	}

	/*** Employee list ***/
	employee(data){
		let user = {
			id : data.emp_id,
			name : data.emp_name,
			username : data.emp_username,
			email : data.emp_email,
			vendor : data.cf_id,
			access : {
				code : parseInt(data.emp_access),
				name : this.employeeAccess(data.emp_access)
			},
			status : true
		}

		if(data.deleted_at) {
			user.status = false;
		}

		// if(data.ul_name){
		// 	user.level = this.accessLevel(data);
		// }

		return user;
	}
	
	store(data){
		let store = {
			id : data.store_id,
			name : data.store_name,
			status : true
		}

		if (data.cstore_id && data.cstore_name) {
			let category = {
				cstore_id : data.cstore_id,
				cstore_name : data.cstore_name
			}

			store.type = this.categoryStore(category);
		}

		if (data.u_id && data.u_name) {
			let user = {
				u_id : data.u_id,
				u_name : data.u_name
			}

			store.user = this.user(user);
		}

		if(data.deleted_at) {
			store.status = false
		}

		return store;
	}

	categoryStore(data){
		let cstore = {
			id : data.cstore_id,
			name : data.cstore_name
		}

		return cstore;
	}

	staff(data){
		let user = {
			id : data.u_id,
			name : data.u_name,
			username : data.u_username,
			email : data.u_email,
			store : data.store_id,
			level : data.level,
			status : true
		}

		if(data.deleted_at || data.users_deleted) {
			user.status = false;
		}

		if(data.ul_name){
			user.level = this.accessLevel(data);
		}

		return user;
	}

	promo(data) {
		let promo = {
			id : data.p_id,
			price : data.p_price,
			date : data.p_date
		}

		return promo;
	}
}