function reverse(params){
	var result = params.name.split("").reverse().join("");
	return {result};
}; 

exports.main = reverse;
