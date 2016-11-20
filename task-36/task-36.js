
function Map(row,col) {
	this.row = row;
	this.col = col;
	this.wall = null;
}
//创建地图
Map.prototype.createMap= function() {
	var map = $("table"),
		row_str = "",
		col_str = "";
	for(var i = 0; i < this.row; i++) {
		row_str += "<td></td>"			
	}
	for(var j = 0; j < this.col; j++) {
		col_str += "<tr>" + row_str + "</tr>"
	}
	map.innerHTML = col_str;
};

Map.prototype.getWall = function(x,y){
	if((x <= this.row && x >= 1) && (y <= this.col && y >= 1)) {
		this.wall = $$("tr")[y-1].querySelectorAll("td")[x-1];
	} else {
		 this.wall = null;
	}
	return this.wall;
}

Map.prototype.renderWall = function() {
	this.wall.className = "wall";
}

Map.prototype.isWall = function(x,y) {
	if(this.isOver(x,y)) {
		return false;
	}
	return this.getWall(x,y).className === "wall";
}

Map.prototype.isOver = function(x,y) {
	return x > this.row || x < 1 || y > this.col|| y < 1
}

Map.prototype.randomWall = function() {
	var total = $$("td"),time = 10;
	while(time > 0) {
	len = Math.floor(Math.random()*total.length);
	this.wall = total[len];
	this.renderWall();
	time--;
	}
}



function Block(x,y) {
	this.x = x;				//当前x的坐标
	this.y = y;				//当前y的坐标
	this.direction = "TOP"; 			//自身的方向
	this.id = null;				//自身的dom
	this.deg = 0;				//旋转角度
	this.moveX = x; 			//移动后x的坐标
	this.moveY = y;			//移动后y的坐标
	this.behavior =					
	 ["TOP","RIG","BOT","LEF"];				//获得地图的行列属性
}
//确定方向在数组第一个
Block.prototype.confirmIndex = function() {
	var index = this.behavior.indexOf(this.direction),
		flag;
	flag = this.behavior.splice(0,index);
	this.behavior = this.behavior.concat(flag);
};

//旋转并更新方向
Block.prototype.turnDirection = function(deg,index) {
	this.confirmIndex();
	this.direction = this.behavior[index];
	this.deg += deg;
	this.rotateAnimation();
};

//旋转动画
Block.prototype.rotateAnimation = function() {
	this.id.style.transform="rotate(" +  this.deg + "deg)";
}

//是否需要旋转
Block.prototype.isRotate = function(direction) {
	if(direction == this.direction) {
		return true;
	}
}
//根据当前方向移动后的坐标
Block.prototype.moveDirection = function() {
	switch(this.direction) {
		case "TOP":this.move(0,-1); break;
		case "RIG":this.move(1,0);	break;
		case "BOT":this.move(0,1);	break;
		case "LEF":this.move(-1,0);	break;
	}
}
//移动后的坐标
Block.prototype.move= function(x,y) {
	this.moveX = this.x + x;
	this.moveY = this.y + y;
}
//开始移动
Block.prototype.moveBlock = function() {
	if(this.isMove()) {
		this.moveAnimation();
		this.x = this.moveX;
		this.y = this.moveY;
	}  else {
		this.moveX = this.x;
		this.moveY = this.y;
	}
}
//判断是否能前进
Block.prototype.isMove = function() {
	if(this.moveX > map.row || this.moveX < 1 ) {
		return false;
	} 
	if(this.moveY > map.col || this.moveY < 1) {
		return false;
	}
	if(map.getWall(this.moveX,this.moveY).className == "wall") {
		return false;
	}
	return true;
}
//移动动画
Block.prototype.moveAnimation = function() {
	 this.id.style.left =(this.moveX-1)*52+1.5+ "px";
 	 this.id.style.top = (this.moveY-1)*52+1.5 + "px";
}

Block.prototype.isBuild = function() {
	if(map.wall != null && map.wall.className != "wall") {
	return true;
	} 
	return false;
}

Block.prototype.buildWall = function() {
	if(this.isBuild()) {
		map.renderWall();
	} else {
		console.log("不能建造");
	}
}

Block.prototype.isColor = function() {
	if(map.wall != null && map.wall.className == "wall") {
	return true; 
	} 
	return false;
}

Block.prototype.colorWall = function() {
	if(this.isColor()) {
		map.wall.style.backgroundColor = command.second;
	} else {
		console.log("不能粉刷");
	}
}


//创建Block
Block.prototype.createBlock = function() {
	var table = $("table"),
		head = document.createElement("div");
     	body = document.createElement("div");
     head.id ="head";
     body.id= "block";
     table.appendChild(body);
 	 body.appendChild(head);
 	 this.id = $("#block");
 	 this.moveAnimation();
 }


function Command() {
	this.data = [];
	this.index = 1;
	this.number = 1;
	this.id = $("#command");
	this.value = null;
	this.first = null;
	this.second = null;
	this.third = null;
	this.end = null;
}

Command.prototype.changeNumber = function() {
	var str = "";
	this.getNumber();
	for(var i = 2; i < this.number+1; i++) {
		str += "<li>" + i + "</li>";
	}
	$("#side").innerHTML = "<li>1</li>"+str;
}

Command.prototype.getNumber = function() {
	var enter = this.id.value.match(/\n/g);
	if(enter == null) {
		this.number = 1
	} else {
		this.number = enter.length +1;
	}
}

Command.prototype.getText = function() {
	this.data = this.id.value.split("\n");
	this.data = this.data.map(function(item){
		return item.trim();
	});
}


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

Command.prototype.tunWay = function() {	
	switch(this.second) {
		case "LEF":block.turnDirection(-90,3);break;
		case "RIG":block.turnDirection(90,1);break;
		case "BAC":block.turnDirection(180,2);break;				
	}
}

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

Command.prototype.goWay = function() {
	while(this.third > 0) {
		block.moveDirection();
		block.moveBlock();
		this.third--;
	}
}

Command.prototype.buildWay = function() {
	block.moveDirection();
	map.getWall(block.moveX,block.moveY);
	block.buildWall();
}

Command.prototype.colorWay = function() {
	block.moveDirection();
	map.getWall(block.moveX,block.moveY);
	block.colorWall();
}

Command.prototype.moveTo = function() {
	var start = {x:block.x,y:block.y};
		this.end = this.getEndPoint();
	findPath(start,this.end);
	getPathOrder();
	moveToAnimation();
}

Command.prototype.getEndPoint = function() {
	var end = this.third.split(",");
	return {
		x:+end[0],
		y:+end[1]
	};
}

Command.prototype.numberAnimation = function(flag) {
	var number = $("#side").querySelectorAll("li");
	if(this.index === 1) {
		number[this.index-1].className = flag;
	} else {
	number[this.index-1].className =  flag;
	number[this.index-2].className = "";
	}
}

Command.prototype.rest = function() {
	var number = $("#side").querySelectorAll("li");
	[].slice.call(number);
	number.forEach(function(item){
		item.className = "";
	}) 
	this.index = 1;
}

Command.prototype.refresh = function() {
	$("#side").innerHTML = "<li>1</li>"
	this.id.value = "";
	this.index = 1;
	this.number = 1;
}

Command.prototype.init = function() {
	this.id.value = 
	"MOV BOT 2\nGO 3\nTUN RIG\nTRA RIG 3\nBUILD\nBRU #A11111\nMOV TO 11,11"
	;
	this.changeNumber();
}

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

function throttle(method,context) {
	clearTimeout(timer);
	timer = setTimeout(function() {
		method.call(context);
	},500)
}

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
			e.className ="";
		} else {
			e.className ="wall";
		}
	}
})


