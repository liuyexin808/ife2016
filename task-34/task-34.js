
function Map() {
	this.row = 10;
	this.col = 10;
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
		case "TOP": 
			this.move(0,-1);
			break;
		case "RIG":
			this.move(1,0);
			break;
		case "BOT":
			this.move(0,1);
			break;
		case "LEF":
			this.move(-1,0);
			break;
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
		head = document.createElement("div"),
     	body = document.createElement("div");
     head.id ="head";
     body.id= "block";
     table.appendChild(body);
 	 body.appendChild(head);
 	 this.id = $("#block");
 	 this.moveAnimation();
 }
 function Move(status) {
 	block.moveStatus()
 }
//事件执行函数
function executeFunction() {
	var sel = $("select"),
		val = sel[sel.selectedIndex].id;
	switch (val) {
		case "GO":
			block.moveStatus();
			break;
		case "TUN LEF":
			block.turnLeft();
			break;
		case "TUN RIG":
			block.turnRight();
			break;
		case "TUN BAC":
			block.turnBack();
			break;
		case "TRA LEF":
			block.move(-1,0);
			break;
		case "TRA RIG":
			block.move(1,0);
			break;
		case "TRA TOP":
			block.move(0,-1);
			break;
		case "TRA BOT":
			block.move(0,1);
			break;
		case "MOV LEF":
			while(!block.isRotate("LEF")) {
				block.turnRight()
			}
			block.moveStatus();
		break;
		case "MOV TOP":
			while(!block.isRotate("TOP")) {
				block.turnRight()
			}
			block.moveStatus();
		break;
		case "MOV RIG":
			while(!block.isRotate("RIG")) {
				block.turnRight()
			}
			block.moveStatus();
		break;
		case "MOV BOT":
			while(!block.isRotate("BOT")) {
				block.turnRight()
			}
			block.moveStatus();
		break;
	}
	block.moveStart();
}

function init() {
	var btn = $("button");
	addEvent(btn,"click",executeFunction)
}

init();
