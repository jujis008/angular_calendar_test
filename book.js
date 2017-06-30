var Book = (function(){
	var bookNum = 0;
	function checkBook(name){

	}

	function _book(newId, newName, newPrice) {
		var name, price;
		function checkId(id) {

		}

		this.getName = function() {};
		this.getPrice = function(){};
		this.setName = function(){};
		this.setPrice = function(){};

		this.Id = newId;

		this.copy = function(){};

		bookNum++;

		if (bookNum > 100) {
			throw new Error("only have 100 books");
		};
		this.setName(name);
		this.setPrice(price);

	}
	_book.prototype = {
		isJsBook: false,
		display: function() {}
	};

	return _book;
})();