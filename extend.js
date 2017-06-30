//依据参数列表来严格地检查一个变量列表的类型
function strict(types, args) {
	//确保参数的数目和类型核匹配
	if (types.length != args.length) {
		throw "Invalid number of argurments. Expected " + types.length + ", received " + args.length + " instead.";
	};

	//遍历每一个参数，检查基类型
	for (var i = 0; i < args.length; i++) {
		//如JavaScript某一项类型不匹配，则抛出异常
		if (args[i].constructor != types[i]) {
			throw "Invalid argument type. Expected " + types[i].name +", received " + args[i].constructor.name + " instead.";
		};
	};
}

function userList(prefix, num, users) {
	strict([String, Number, Array], argurments);
	for (var i = 0; i < num.length; i++) {
		print(prefix + ": " + users[i]);
	};
}
