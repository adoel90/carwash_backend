
export class Response {
	constructor(){

	}

	static code(code){
		let error = new Map();
		switch(code){
			case 0 : {
				error.set("status", 403);
				error.set("message", "You are unauthorized to access this API");
				break;
			}

			// Response users error
			case 1 : {
				error.set("status", 400);
				error.set("message", "Missing request parameter(s)");
				break;
			}
			case 10 : {
				error.set("status", 403);
				error.set("message", "User doesn't exit or not active");
				break;
			}
			case 11 : {
				error.set("status", 403);
				error.set("message", "Your current password is incorrect");
				break;
			}

			// Response server error
			default : {
				error.set("status", 500);
				error.set("message", "Server connection unexpected error");
				break;	
			}
		}

		return error;
	}
}