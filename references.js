var obj = new Object();
//设置obj为一个空对象
var objRef = obj;
//objRef现在引用了别的对象
//修改原始对象的属性
obj.oneProperty = true;
//我们可以发现该变化在两个变量中都可以看到
//(因为他们引用了同一个对象)
console.log(obj.oneProperty === objRef.oneProperty);


//创建一组项目的数组
var items = new Array("one", "two", "three");
//创建一个对项目数组的引用
var itemsRef = items;
//给原始数组添加一项
items.push("four");
//两个数组的长度应该相同，
//因为它们都指向相同的数组对象
console.log(items.length === itemsRef.length);


// 设置items为一个字符串的数组(对象)
var items = new Array("one", "two", "three");
// 设置itemsRef为对items的引用
var itemsRef = items;
//让items指向一个新的对象
items = new Array("new", "array");
// items和itemsRef现在指向不同的对象
// items指向new Array( "new", "array" )
// itemsRef则指向new Array( "one", "two",
console.log(items !== itemsRef);