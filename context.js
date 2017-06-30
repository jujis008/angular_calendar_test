//一个简单的设置其上下文的颜色风格的函数
function changeColor(color){ 
	this.style.color = color;
}
//在window对象上调用这个函数将会出错，因为window没有style对象
changeColor("white");
//得到一个id为"main"的对象
var main = document.getElementById("main");
//用call方法改变它的颜色为黑
//call方法将第一个参数设置为上下文，
//并其它所有参数传递给函数
changeColor.call(main, "black");
//一个设置body元素的颜色的函数
function setBodyColor(){
	//apply方法设置上下文为body元素
	//第一个参数为设置的上下文,
	//第二个参数是一个被作为参数传递给函数的数组
	// of arguments that gets passed to the function
	changeColor.apply(document.body, arguments);
}
setBodyColor("black");
