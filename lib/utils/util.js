
/*--- format string template to not print undefined variable ---*/
export function stringFormat(string) {
	let res = string[0];
	for (var i=1; i<string.length; i++) {
		if (typeof arguments[i] !== 'undefined')
		res += arguments[i];
		res += string[i];
	}
	return res;
}