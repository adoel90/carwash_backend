import fs from "fs";
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
			email : data.u_email	 
		}

		if(data.ul_name){
			user.level = {
				id : data.ul_id,
				name : data.ul_name
			}
		}

		return user;
	}

	member(data){
		let member = {
			id : data.m_id,
			name : data.m_name,
			phone : data.m_phone,
			email : data.m_email,
			address : data.m_address,
			balance : data.m_balance,
			card : {
				id : data.c_id
			}
		}

		if(data.ct_id){
			member.card.type = this.card(data);
		}

		return member;
	}

	card(data){
		let card = {
			id : data.ct_id,
			name : data.ct_name,
			min : data.ct_min,
			bonus : data.ct_bonus
		}

		return card;
	}

	serviceType(data) {
		let type = {
			id : data.srvt_id,
			name : data.srvt_name
		}

		return type;
	}

	cafeType(data){
		let type = {
			id : data.cf_id,
			name : data.cf_name
		}

		return type;
	}

	menu(data){
		let menu = {
			id : data.mn_id,
			name : data.mn_name,
			price : data.mn_price,
			description : data.mn_desc,
			image : this.checkImage(data.mn_img)
		}

		return menu;
	}

	service(data){
		let service = {
			id : data.srv_id,
			name : data.srv_name,
			price : data.srv_price,
			description : data.srv_desc,
			image : this.checkImage(data.srv_img)
		}

		return service;
	}

	transactionCafe(data) {
		let transaction = {
			id : data.tc_id,
			date : data.tc_date,
			member : this.member(data)
		}

		return transaction;
	}
}