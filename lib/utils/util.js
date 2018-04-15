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

export function buildRange(type, start, end) {
	let build = {};
	let inc = null;
	start = moment(start);
	end = moment(end);

	let diff = null;
	if(type == "day"){
		inc = "days";
		type = "DD MMM YYYY";
	}else if(type == "month"){
		inc = "month";
		type = "MMM YYYY";
	}else if(type == "year") {
		inc = "year";
		type = "YYYY";
	}
	start = moment(end).add(-11, inc);
	diff = end.diff(start, inc);


	build[moment(start).format(type)] = {
		transaction : 0
	}
	for(let i=0; i<diff; i++){
		start = moment(start).add(1, inc);
		build[moment(start).format(type)] = {
			transaction : 0
		};
	}

	return build;
}

export function buildRangeMember(type, start, end) {
	let build = {};
	let inc = null;
	start = moment(start);
	end = moment(end);

	let diff = null;
	if(type == "day"){
		inc = "days";
		type = "DD MMM YYYY";
	}else if(type == "month"){
		inc = "month";
		type = "MMM YYYY";
	}else if(type == "year") {
		inc = "year";
		type = "YYYY";
	}
	start = moment(end).add(-11, inc);
	diff = end.diff(start, inc);


	build[moment(start).format(type)] = {
		saldo : 0
	}
	for(let i=0; i<diff; i++){
		start = moment(start).add(1, inc);
		build[moment(start).format(type)] = {
			saldo : 0
		};
	}

	return build;
}

export function parseCurrency(data, dollars=false) {
	if(!data){
		data = 0;
	}
	data = parseFloat(data);
	if(dollars){
		data = data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		data = "Rp. "+data;
	}
	return data;
}