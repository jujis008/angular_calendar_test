//类Lecture的构造器
//使用两个字符串参数，name和teacher
function Lecture(name, teacher) {
	//把它们作为对象的本地属性保存
	this.name = name;
	this.teacher = teacher;
}

//类Lecture的方法，生成一个显示该课程信息的字符串
Lecture.prototype.display = function() {
	return this.teacher + " is teaching " + this.name;
}

//类Schedule的构造器
//使用一个lectures类型的数组作为参数
function Schedule(lectures) {
	this.lectures = lectures;
}

//类Schedule的方法，用来构造一个描述该课程表的字符串
Schedule.prototype.display = function() {
	var str = "";
	//遍历每门课程，累加构成信息字符串
	for(var i = 0; i < this.lectures.length; i++ ) {
		str+= this.lectures[i].display() + " ";
	}
	return str;
}

//创建一个新的课表对象，存于变量mySchedule中
var mySchedule = new Schedule([
	new Lecture("Gym", "Mr. Smith"),
	new Lecture("Math", "Mrs. Jones"),
	new Lecture("English", "Mrs. Smith")
	]);
console.log(mySchedule.display());