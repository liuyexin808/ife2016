
function Map() {
	this.row = 15;
	this.col = 15;
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
function Block(x,y) {
	this.x = x;				//当前x的坐标
	this.y = y;				//当前y的坐标
	this.status = "TOP"; 			//自身的方向
	this.id = null;				//自身的dom
	this.deg = 0;				//旋转角度
	this.moveX = x; 			//移动后x的坐标
	this.moveY = y;			//移动后y的坐标
	this.behavior =					
	 ["TOP","RIG","BOT","LEF"];	
	Map.call(this); 			//获得地图的行列属性
}
//确定方向在数组第一个
Block.prototype.confirmIndex = function() {
	var index = this.behavior.indexOf(this.status),
		flag;
	flag = this.behavior.splice(0,index);
	this.behavior = this.behavior.concat(flag);
};
//90°旋转并更新方向
Block.prototype.turnRight = function() {
	this.confirmIndex();
	this.status = this.behavior[1];
	this.deg += 90;
	this.rotateAnimation();
};
//180°旋转并更新方向
Block.prototype.turnBack = function() {
	this.confirmIndex();
	this.status = this.behavior[2];
	this.deg += 180;
	this.rotateAnimation();
};
//-90°旋转并更新方向
Block.prototype.turnLeft = function() {
	this.confirmIndex();
	this.status = this.behavior[3];
	this.deg += -90;
	this.rotateAnimation();
};
//旋转动画
Block.prototype.rotateAnimation = function() {
	this.id.style.transform="rotate(" +  this.deg + "deg)";
}

//是否需要旋转
Block.prototype.isRotate = function(status) {
	if(status == this.status) {
		return true;
	}
}
//根据当前方向移动后的坐标
Block.prototype.moveStatus = function() {
	switch(this.status) {
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
Block.prototype.moveStart = function() {
	if(this.isMove()) {
		this.moveAnimation();
		this.x = this.moveX;
		this.y = this.moveY;
	} else {
		return;
	}
}
//判断是否能前进
Block.prototype.isMove = function() {
	if( this.moveX > this.row || this.moveX < 1 ) {
		return false;
	} 
	if(this.moveY > this.col || this.moveY < 1) {
		return false;
	}
	return true;
}
//移动动画
Block.prototype.moveAnimation = function() {
	 this.id.style.left =(this.moveX-1)*52+1.5+ "px";
 	 this.id.style.top = (this.moveY-1)*52+1.5 + "px";
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
	this.info = $("#info"); 
	this.value = null;
	this.way = null;
	this.status = null;
	this.time = null;
}

Command.prototype.changeNumber = function() {
	var str = "";
	this.getNumber();
	for(var i = 2; i < this.number+1; i++) {
		str += "<li>" + i + "</li>";
	}
	$("#side").innerHTML = "<div class='wrap'><li>1</li>"+str +"</div>";
}

Command.prototype.getText = function() {
	this.data = this.id.value.split("\n");
	this.data = this.data.map(function(item){
		return item.trim();
	});
}

Command.prototype.getNumber = function() {
	var enter = this.id.value.match(/\n/g);
	if(enter == null) {
		this.number = 1
	} else {
		this.number = enter.length +1;
	}
}
Command.prototype.isError = function() {
	var reg1 = /^(TRA|MOV)\s(TOP|RIG|BOT|LEF|)(\s\d*)?$/;
		reg2 = /^(GO)(\s\d*)?$/;
		reg3 =/^(TUN)\s(RIG|LEF|BAC)(\s\d*)?$/;
		this.value = this.data[this.index-1];
	if(reg1.test(this.value) || reg2.test(this.value) || reg3.test(this.value)) {
		return true;
	} else {
		return false;
	}
}

Command.prototype.getOrder = function() {
	var arr = this.value.split(" ");
	if(arr[0] == "GO") {
		this.way = arr[0];
		this.time = arr[1] ? arr[1] : 1;
	} else {
		this.way = arr[0];
		this.status = arr[1];
		this.time =  arr[2] ? arr[2] : 1;
	}
}

Command.prototype.movWay = function() {
	while(this.time > 0) {
		while(!block.isRotate(this.status)) {
			block.turnRight()
		}
		block.moveStatus();
		block.moveStart();
		this.time--;
	}
}

Command.prototype.tunWay = function() {	
	switch(this.status) {
		case "LEF":block.turnLeft();break;
		case "RIG":block.turnRight();break;
		case "BAC":block.turnBack();break;				
	}
}

Command.prototype.traWay = function() {
	while (this.time > 0) {
		switch(this.status) {
			case "LEF":block.move(-1,0);break;
			case "RIG":block.move(1,0);break;
			case "TOP":block.move(0,-1);break;
			case "BOT":block.move(0,1);break;
			}
		block.moveStart();
		this.time--
	}
}

Command.prototype.goWay = function() {
	while(this.time > 0) {
		block.moveStatus();
		block.moveStart();
		this.time--;
	}
}

Command.prototype.numberAnimation = function() {
	var number = $("#side").querySelectorAll("li");
	if(this.isError()) {
		number[this.index-1].className = "correct";
		this.info.className = "info_correct"
		this.info.innerHTML = "命令行" + this.index + ": 执行正确"
	} else {
		number[this.index-1].className = "incorrect";
		this.info.className = "info_incorrect"
		this.info.innerHTML = "命令行" + this.index + ": 执行错误"
	}
}

Command.prototype.reset = function() {
	var number = $("#side").querySelectorAll("li");
		len = number.length;
	for(var i = 0; i < len;i++) {
		number[i].className = "";
	}
	this.info.className = ""
	this.info.innerHTML = "程序执行结束"
	command.index = 1;
}


function excuteFun() {
	timer = null;
	command.getText();
	timer = setInterval(excuteAnimation,1000);
}

function excuteAnimation() {
	if(command.index > command.number) {
			command.reset();
			clearInterval(timer);
			return;
		}
	if(command.isError()) {
		command.numberAnimation();
		command.getOrder();
		switch(command.way) {
			case "TUN":command.tunWay();break;
			case "TRA":command.traWay();break;
			case "MOV":command.movWay();break;
			case "GO":command.goWay();break;		
		}
		command.index++;
	} else {
		command.numberAnimation();
		command.index++;
		return;
	}
}

function refreshFun() {
	$("#side").innerHTML = "<li>1</li>"
	command.id.value = "";
	command.index = 1;
	command.number = 1;
}

function init() {
	addEvent($("#command"),"input",function(event) {command.changeNumber();})
	addEvent($("#command"),"scroll",function(){$(".wrap").style.top = -this.scrollTop + "px";})
	addEvent($("#refresh"),"click",refreshFun)
	addEvent($("#excute"),"click",excuteFun)
}

init();


