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

		if(data.o_status) {
			user.owner = data.o_status;
		}

		if(data.o_id) {
			user.owner_id = data.o_id;
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
			name : data.mod_name,
			group : data.mod_group,
			path : data.mod_path
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
			charge : data.ct_charge,
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
			status : true,
			category : data.mn_category
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
			id : data.ts_id,
			date : data.ts_date,
			queue : data.ts_queue,
			total : data.ts_total,
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
			status : true,
			owner : data.o_status
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

		if(data.store_charge) {
			store.charge = data.store_charge
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
			date : moment(data.p_date).format("DD MMM YYYY")
		}

		return promo;
	}

	reportMember (data) {
		let reportMember = {
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
			created_at: moment(data.created_at).format("DD MMM YYYY"),
			status : true
		}

		if(data.ct_id){
			reportMember.card.type = this.card(data);
		}

		if(data.deleted) {
			reportMember.status = false;
		}

		return reportMember;
	}

	tierPrice (data) {
		let tierData = {
			price : data.tier_price,
			bonus : data.tier_bonus
		}

		return tierData;
	}

	storeTransaction(data) {
		let store = {
			id: data.ts_id,
			date: data.ts_date,
			total: parseInt(data.ts_total),
			store: data.store_id,
		}

		if(data.m_name) {
			store.member = this.member(data);
		}

		return store;
	}

	storeTransactionItem(data) {
		let transactionItem = {
			id: data.ts_id,
			date: data.ts_date,
			total: parseInt(data.ts_total),
			store: data.store_id,
		}

		if(data.m_name) {
			transactionItem.member = this.member(data);
		}

		if(data.mn_name) {
			transactionItem.menu = this.menu(data);
		}

		return transactionItem;
	}

	staffStoreReport(data){
		let staffStore = {
			id : data.ts_id,
			queue : data.ts_queue,
			level : data.level,
			status : true,
			date : moment(data.ts_date).format("DD MMM YYYY hh:mm:ss"),
			total : data.ts_total,
			user : data.created_at
		}

		if(data.m_name) {
			staffStore.member = this.member(data);
		}

		if(data.store_id) {
			staffStore.store = this.store(data);
		}

		if(data.deleted_at || data.users_deleted) {
			staffStore.status = false;
		}

		if(data.ul_name){
			staffStore.level = this.accessLevel(data);
		}

		return staffStore;
	}

	userReport(data){
		let userReport = {
			id : data.log_id,
			transaction_date : data.log_date,
			description : data.log_description,
			total : parseInt(data.log_value),
			total_before : parseInt(data.log_before),
			user : data.created_at
		}

		if(data.m_name) {
			userReport.member = this.member(data);
		}

		if(data.store_id) {
			userReport.store = this.store(data);
		}

		if(data.deleted_at || data.users_deleted) {
			userReport.status = false;
		}

		if(data.ul_name){
			userReport.level = this.accessLevel(data);
		}

		return userReport;
	}

	itemMenu (data) {
		let itemMenu = [];
		for(let i=0; i<data.length; i++) {
			let menu = {
				id : data[i].mn_id,
				quantity : data[i].ti_quantity,
				price : parseInt(data[i].ti_price),
				name : data[i].ti_item
			}

			itemMenu.push(menu);
		}

		return itemMenu;
	}

	reportOwner (data) {
		let reportOwner = {
			users: this.user(data),
			store: this.store(data)
		}

		return reportOwner;
	}

	generateCardId(type) {
		var leng, randomInt = '', number = '123456789',
        dateNow = new Date().toJSON().slice(0, 10).replace(/-/g, '');

		type <= 10 ? leng = 4 : leng = 3

		for (var i = 0; i <= leng; i++) {
			randomInt += number.charAt(Math.floor(Math.random() * number.length));
		}
		
		return '00'+type+dateNow+randomInt;
	}
}