export class Build {
	constructor(){

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
			name : data.ct_name
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

	buildType(data){
		let type = {
			id : data.cf_id,
			name : data.cf_name
		}

		return type;
	}
}