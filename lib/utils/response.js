
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
			case 1 : {
				error.set("status", 400);
				error.set("message", "Missing request parameter(s)");
				break;
			}
			case 2 : {
				error.set("status", 403);
				error.set("message", "Your authentication has been expired, try to login again");
				break;
			}
			case 3 : {
				error.set("status", 403);
				error.set("message", "This API require member access token not user access token");
				break;
			}

			// Response users error
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

			// Response card error
			case 20: {
				error.set("status", 400);
				error.set("message", "Card type doesn't exist");
				break;
			}

			// Response member error
			case 30: {
				error.set("status", 400);
				error.set("message", "Member doesn't exit or not active");
				break;
			}
			case 31: {
				error.set("status", 400);
				error.set("message", "Insufficient member balance");
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