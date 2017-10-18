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
}