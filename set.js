function Set(){
	this.values = {};
	this.n = 0;
	this.add.apply(this, arguments);
}

Set.prototype.add = function() {
	for(var i=0; i<arguments.length; i++){
		var val = arguments[i];
		var str = Set._v2s(val);
		if(! this.value.hasOwnProperties(str)){
			this.values[str++];
			this.n++;
		}
	}
}

Set.prototype.remove = function() {
	
}