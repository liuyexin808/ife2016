function Command() {
	this.data = [];         //储存数据
	this.index = 1;		//数据索引
	this.number = 1;	//数字编号
	this.id = $("#command");//文本的Dom
	this.value = null;	//文本的内容
	this.first = null;	//第一段命令
	this.second = null;	//第二段命令
	this.third = null;	//第三段命令
	this.end = null;	//目标的坐标
}

//改变数字编号
Command.prototype.changeNumber = function() {
	var str = "";
	this.getNumber();
	for(var i = 2; i < this.number+1; i++) {
		str += "<li>" + i + "</li>";
	}
	$("#side").innerHTML = "<li>1</li>"+str;
}

//获取数字编号
Command.prototype.getNumber = function() {
	var enter = this.id.value.match(/\n/g);
	if(enter == null) {
		this.number = 1
	} else {
		this.number = enter.length +1;
	}
}
//获取文本内容
Command.prototype.getText = function() {
	this.data = this.id.value.split("\n");
	this.data = this.data.map(function(item){
		return item.trim();
	});
}
//判断文本内容是否符合规则
Command.prototype.isError = function() {
	var reg1 = /^(TRA|MOV)\s(TOP|RIG|BOT|LEF|)(\s\d*)?$/;
		reg2 = /^(GO)(\s\d*)?$/;
		reg3 =/^(TUN|BRU)\s(RIG|LEF|BAC|#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3})$/;
		reg4 =/^(BUILD)$/;
		reg5 =/^(MOV\sTO)\s(\d+,\d+)$/
		this.value = this.data[this.index-1];
	if(reg1.test(this.value) || reg2.test(this.value) 
		|| reg3.test(this.value) || reg4.test(this.value)|| reg5.test(this.value)) {
		return true;
	} else {
		return false;
	}
}
//获取拆分后的命令
Command.prototype.getOrder = function() {
	var arr = this.value.split(" ");
	if(arr[0] == "GO") {
		this.first = arr[0];
		this.third = arr[1] ? arr[1] : 1;
	} else {
		this.first = arr[0];
		this.second = arr[1];
		this.third =  arr[2] ? arr[2] : 1;
	}
}
//MOV命令
Command.prototype.movWay = function() {
	if(this.second === "TO") {
		this.moveTo();
	}
	while(this.third > 0) {
		while(!block.isRotate(this.second)) {
			block.turnDirection(90,1);
		}
		block.moveDirection();
		block.moveBlock();
		this.third--;
	}
}
//TUN命令
Command.prototype.tunWay = function() {	
	switch(this.second) {
		case "LEF":block.turnDirection(-90,3);break;
		case "RIG":block.turnDirection(90,1);break;
		case "BAC":block.turnDirection(180,2);break;				
	}
}
//TRA命令
Command.prototype.traWay = function() {
	while (this.third > 0) {
		switch(this.second) {
			case "LEF":block.move(-1,0);break;
			case "RIG":block.move(1,0);break;
			case "TOP":block.move(0,-1);break;
			case "BOT":block.move(0,1);break;
			}
		block.moveBlock();
		this.third--
	}
}
//GO命令
Command.prototype.goWay = function() {
	while(this.third > 0) {
		block.moveDirection();
		block.moveBlock();
		this.third--;
	}
}
//BUILD命令
Command.prototype.buildWay = function() {
	block.moveDirection();
	map.getWall(block.moveX,block.moveY);
	block.buildWall();
}
//BRC命令
Command.prototype.colorWay = function() {
	block.moveDirection();
	map.getWall(block.moveX,block.moveY);
	block.colorWall();
}

//到达指定坐标命令
Command.prototype.moveTo = function() {
	var start = {x:block.x,y:block.y};
		this.end = this.getEndPoint();
	findPath(start,this.end);
	getPathOrder();
	moveToAnimation();
}
//获取目标的坐标
Command.prototype.getEndPoint = function() {
	var end = this.third.split(",");
	return {
		x:+end[0],
		y:+end[1]
	};
}
//数字编号动画
Command.prototype.numberAnimation = function(flag) {
	var number = $("#side").querySelectorAll("li");
	if(this.index === 1) {
		number[this.index-1].className = flag;
	} else {
	number[this.index-1].className =  flag;
	number[this.index-2].className = "";
	}
}
//重置
Command.prototype.rest = function() {
	var number = $("#side").querySelectorAll("li");
	[].slice.call(number);
	number.forEach(function(item){
		item.className = "";
	}) 
	this.index = 1;
}
//清除文本内容
Command.prototype.refresh = function() {
	$("#side").innerHTML = "<li>1</li>"
	this.id.value = "";
	this.index = 1;
	this.number = 1;
}
//初始化文本内容
Command.prototype.init = function() {
	this.id.value = 
	"MOV BOT 2\nGO 5\nTUN RIG\nTRA RIG 3\nBUILD\nBRU #A11111\nTRA BOT 5\nMOV TO 9,3"
	;
	this.changeNumber();
}

//执行命令
Command.prototype.excuteOrder = function(){
	switch(this.first) {
		case "TUN":command.tunWay();break;
		case "TRA":command.traWay();break;
		case "MOV":command.movWay();break;
		case "GO":command.goWay();break;
		case "BUILD":command.buildWay();break;
		case "BRU": command.colorWay();break;
	}
}

var timer = null;
//执行动画
function excuteAnimation() {
	if(command.index > command.number) {
		return;
	}
	if(command.isError()) {
		command.numberAnimation("correct");
		command.getOrder();
		command.excuteOrder();
	} else {
		command.numberAnimation("incorrect");
		return;
	}
	command.index++;
	timer = setTimeout(excuteAnimation,500);
}
//函数节流
function throttle(method,context) {
	clearTimeout(timer);
	timer = setTimeout(function() {
		method.call(context);
	},500)
}



//事件绑定
function event_init(){
addEvent($("#refresh"),"click",function(){
	command.refresh();
});
addEvent($("#excute"),"click",function(){
	command.rest();
	command.getText();
	throttle(excuteAnimation);
});
addEvent($("#command"),"input",function(){
	command.changeNumber();
});
addEvent($("#bulid"),"click",function(){
	map.randomWall();
});
addEvent($("table"),"click",function(event){
	var e = event.target;
	if(e && e.nodeName.toLowerCase() === "td"){
		if(e.className === "wall") {
			e.removeAttribute("style");
			e.removeAttribute("class");
		} else {
			e.className ="wall";
		}
	}
})
}

var command = new Command();
command.init();
event_init();

