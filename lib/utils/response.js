
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
				error.set("message", "User doesn't exist or not active");
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
			case 21: {
				error.set("status", 400);
				error.set("message", "Card is blocked or deleted");
				break;
			}
			case 22: {
				error.set("status", 400);
				error.set("message", "Card is not refundable");
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
			case 32: {
				error.set("status", 400);
				error.set("message", "Topup balance below topup minimum");
				break;
			}
			case 33: {
				error.set("status", 400);
				error.set("message", "Member is blocked or deleted");
				break;
			}

			// Response cafe error
			case 40: {
				error.set("status", 403);
				error.set("message", "You do not have permission to access this page");
				break;
			}

			case 41: {
				error.set("status", 403);
				error.set("message", "Employee it's doesn't exists");
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