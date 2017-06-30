var Book = function(id, bookname, price) {
	this.id = id;
	this.name = name;
	this.price = price;
}

//or 
Book.prototype.display = function () {

};

//or
Book.prototype = {
	display: function() {

	}, 
	//....
};

var book = new Book(10, 'jsdp', 30);
console.log(book.bookname);

