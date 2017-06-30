//id为"main"的一个元素
var obj = document.getElementById("main");
//用来绑定items数组
var items = ["click", "keypress"];
//遍历items中的每一项
for(var i = 0; i < items.length; i++) {
	//用自执行的匿名函数来激发作用域
	(function(){
		//在些作用域内存储值
		var item = items[i];
		//为obj元素绑定函数
		obj["on"+item] = function() {
			//item引用一个父级的变量，
			s//该变量在此for循环的上文中已被成功地scoped(?)
			console.log("Thanks for your " + item);
		}
	})();
}