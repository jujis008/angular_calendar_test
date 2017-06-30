//得到id为"main"的元素
var obj = document.getElementById("main");
//改变它的边框样式
obj.style.border = "1px solid red";
//初始化一个1秒钟以后被调用的回调函数
setTimeout(function() {
	//此函数将隐藏该元素
	obj.style.display = "none";
}, 1000);
//用来延迟显示消息的通用函数
function delayedAlert(msg, time) {
	//初始化一个被封套的函数
	setTimeout(function(){
		//此函数使用了来自封套它的函数的变量msg
		console.log(msg);
	}, time);
}
//调用函数delayedAlert，带两个参数
delayedAlert("Welcome!", 2000);

