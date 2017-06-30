//class inheritance.类式继承
function Superclass() {
	this.superValue = true;
};

Superclass.prototype.getSuperValue = function() {
	return this.superValue;
};

function Subclass() {
	this.subValue = false;
};

Subclass.prototype = new Superclass(); //类式继承
Subclass.prototype.getSubValue = function() {
	return this.subValue;
};
var instance = new Subclass();
console.log(instance.getSuperValue());
console.log(instance.getSubValue());

//constructir inheritance
function Superclass(id) {
	this.books = ['javascript', 'js', 'css'];
	this.id = id;
}

Superclass.prototype.showBooks = function() {
	console.log(this.books);
}

function Subclass(id) {
	Superclass.call(this, id); //构造方法继承
}

var instance1 = new Subclass(10);
var instance2 = new Subclass(11);
instance1.books.push('Design pattern');
console.log(instance1.books);
console.log(instance1.id);
console.log(instance2.books);
console.log(instance2.id);
instance1.showBooks(); //TypeError: 

//组合继承
function Superclass(name) {
	this.name = name;
	this.books = ['javascript', 'js', 'css'];
}

Superclass.prototype.getName = function() {
	console.log(this.name);
}

function Subclass(name, time) {
	Superclass.call(this, name);
	this.time = time;
}

Subclass.prototype = new Superclass();
Subclass.prototype.getTime = function() {
	console.log(this.time);
}

var instance1 = new Subclass('js book', 2015);
var instance2 = new Subclass('css book', 2016);
console.log(instance1.books);
instance1.getTime();
instance1.getName();

console.log(instance2.books);
instance2.getTime();
instance2.getName();

//原型式继承
function inheritObject(o) {
	//声明一个过渡函数对象
	function F() {}
	//过渡函数对象继承父对象
	F.prototype = o;
	return new F();
}
var books = {
	name: 'js book',
	alikebooks: ['css books', 'html books']
};

var newBooks = inheritObject(books);
newBooks.name = 'ajax books';
newBooks.alikebooks.push('xml books');

var otherBooks = inheritObject(books);
otherBooks.name = 'flash books';
otherBooks.alikebooks.push('actionscript books');

console.log(newBooks.name);
console.log(newBooks.alikebooks);

console.log(otherBooks.name);
console.log(otherBooks.alikebooks);

console.log(books.name);
console.log(books.alikebooks);