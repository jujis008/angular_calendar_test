//生成做加法的新函数的函数
function addGenerator(num) {
	//返回一个简单函数用来计算两个数的加法，
	//其中第一个数字从生成器中借用
	return function(toAdd) {
		return num + toAdd;
	};
}
//addFive现在是接受一个参数的函数，
//此函数将给参数加5，返回结果数字
var addFive = addGenerator( 5 );
//这里我们可以看到，当传给它参数4的时候
//函数addFive的结果为9
console.log( addFive( 4 ) == 9 );

//创建一个用作包装的匿名函数
(function(){
	//这个变量通常情况下应该是全局的
	var msg = "Thanks for visiting";
	//为全局对象绑定新的函数
	window.onunload = function(){
		//使用了“隐藏”的变量
		console.log(msg);
	};
	//关闭匿名函数并执行之
})();