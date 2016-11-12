
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
	this.x = x;
	this.y = y;
	this.status = "up"; 			//自身的状态
	this.id = null;
	this.deg = 0;				//旋转角度
	this.moveX = this.x; 			//x移动后的坐标
	this.moveY = this.y;			//y移动后的坐标
	this.behavior =					
	 ["up","right","down","left"];	
	Map.call(this); 			//获得地图的行列属性
}

//确定状态在数组第一个
Block.prototype.confirmIndex = function() {
	var index = this.behavior.indexOf(this.status),
		flag;
	flag = this.behavior.splice(0,index);
	this.behavior = this.behavior.concat(flag);
};
Block.prototype.turnRight = function() {
	this.confirmIndex();
	this.status = this.behavior[1];
	this.deg += 90;
	this.rotateAnimationRoate();
};
Block.prototype.turnBack = function() {
	this.confirmIndex();
	this.status = this.behavior[2];
	this.deg += 180;
	this.rotateAnimationRoate();
};
Block.prototype.turnLeft = function() {
	this.confirmIndex();
	this.status = this.behavior[3];
	this.deg += -90;
	this.rotateAnimationRoate()
};
Block.prototype.rotateAnimationRoate = function() {
	this.id.style.transform="rotate(" +  this.deg + "deg)"
}
//根据当前状态设置前进后的x,y坐标
Block.prototype.moveDistance = function() {
	switch(this.status) {
		case "up": 
			this.moveX = this.x;
			this.moveY = this.y - 1;
			break;
		case "right":
			this.moveX = this.x + 1;
			this.moveY = this.y;
			break;
		case "down":
			this.moveX = this.x;
			this.moveY = this.y + 1;
			break;
		case "left":
			this.moveX = this.x-1;
			this.moveY = this.y;
			break;
	}
}
//开始前进
Block.prototype.moveGo = function() {
	this.moveDistance();
	if(this.canMove()) {
		this.removeBlock();
		this.createBlock();
		this.x = this.moveX;
		this.y = this.moveY;
	} else {
		return;
	}
}
//判断是否能前进
Block.prototype.canMove = function() {
	if( this.moveX > this.row || this.moveX < 1 ) {
		return false;
	} 
	if(this.moveY > this.col || this.moveY < 1) {
		return false;
	}
	return true;
}

//创建Block
Block.prototype.createBlock = function() {
	var block_y = $$("tr")[this.moveY-1],
		block = block_y.querySelectorAll("td")[this.moveX-1],
		head = document.createElement("div");
     	body = document.createElement("div");
     head.id ="head";
     body.id= "block"
     block.appendChild(body);
 	 body.appendChild(head);
 	 this.id = $("#block");
 	 this.rotateAnimationRoate();
 }

//移除Block
Block.prototype.removeBlock = function() {
	var block_y = $$("tr")[this.y-1],
		block = block_y.querySelectorAll("td")[this.x-1];
	block.innerHTML = "";
}


function executeFunction() {
	var sel = $("select"),
		val = sel[sel.selectedIndex].id;
	switch (val) {
		case "GO":
			block.moveGo();
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
	}
}

function init() {
	var btn = $("button");
	addEvent(btn,"click",executeFunction)
}

init();
