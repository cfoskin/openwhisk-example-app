function reverse(params){
	var name = params.name.split("").reverse().join("");
	return {result: name};
}; 

exports.main = reverse;
