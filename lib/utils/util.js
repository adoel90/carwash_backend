import moment from "moment";
import fs from "fs";

/*--- format string template to not print undefined variable ---*/
export function stringFormat(string) {
	let res = string[0];
	for (var i=1; i<string.length; i++) {
		if (typeof arguments[i] !== 'undefined' && arguments[i] !== null)
		res += arguments[i];
		res += string[i];
	}
	return res;
}

export function rewriteImage(data) {
	if(!data){
		return null;
	}
	
	let path = data.path;
	let mime = data.mimetype.split("/");
	let filename = moment(new Date).format("x")+"."+mime[1];
	let newPath = __dirname+"/../../public/"+filename;

	fs.rename(path, newPath, (err) => {
		if(err){
			console.log(err);
		}
	});
	return filename;
}