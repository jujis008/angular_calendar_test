var CheckObject = {
	checkName: function() {

	},
	checkEmail: function(){

	},
	checkPassword: function() {

	}
};

//
var CheckObject1 = function(){

};
CheckObject1.checkName = function() {

}
CheckObject1.checkEmail = function() {

}
CheckObject1.checkPassword = function() {

}

//refactor
//without class 
var CheckObject2 = function() {
	return {
		checkName : function() {

		},
		checkEmail : function() {

		},
		checkPassword : function() {

		}
	}
}
var a = CheckObject2();
a.checkEmail();

//with class and need to use new object
var CheckObject3 = function() {
	return {
		this.checkName : function() {

		},
		this.checkEmail : function() {

		},
		this.checkPassword : function() {

		}
	}
}
var b = new CheckObject3();
b.checkEmail();
//consume too much resource

var CheckObject4 = function() {}
CheckObject4.prototype.checkName = function() {

}
CheckObject4.prototype.checkEmail = function() {

}
CheckObject4.prototype.checkPassword = function() {

}

//same with above
var CheckObject5 = function() {

}
//make call in chained
CheckObject5.prototype = {
	checkName : function() {
		return this;
	}, 
	checkEmail : function() {
		return this;
	},
	checkPassword : function() {
		return this;
	}
}

var a = new CheckObject5();
a.checkName().checkEmail().checkPassword();

Function.prototype.checkEmail = function() {

}

var f = new function() {

}
f.checkEmail();


Function.prototype.addMethod = function(name, fn) {
	this[name] = fn;
}
var methods = function() {

};

var methods = new Function();
methods.addMethod('checkName', function() {

});
methods.checkName();
methods.checkEmail();

// call in chained
Function.prototype.addMethod(name, fn) {
	this[name] = fn;
	return this;
}
var methods = function() {

}
methods.addMethod('checkName', function(){

}).addMethod('checkEmail', function() {

});


methods.addMethod('checkName', function() {
	return this;
}).addMethod('checkEmail', function() {

});
methods.checkName().checkEmail();

//
Function.prototype.addMethod = function(name, fn) {
	this.prototype[name] = fn;
}

var Methods = function() {

};
methods.addMethod('checkName', function() {

}).addMethod('checkEmail', function() {

});

var m = new Methods();
m.checkEmail();