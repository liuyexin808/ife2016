function Block(x,y) {
	this.x=x		//当前x的坐标
	this.y=y		//当前y的坐标
	this.direction= "TOP"; 	//自身的方向
	this.id = null;		//自身的dom
	this.deg = 0;		//旋转角度
	this.moveX = x; 	//移动后x的坐标
	this.moveY = y;		//移动后y的坐标
	this.behavior =					
	 ["TOP","RIG","BOT","LEF"];				
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

//判断是否可以修墙
Block.prototype.isBuild = function() {
	if(map.wall != null && map.wall.className != "wall") {
	return true;
	} 
	return false;
}
//开始修墙
Block.prototype.buildWall = function() {
	if(this.isBuild()) {
		map.renderWall();
	} else {
		console.log("不能建造");
	}
}
//判断是否可以粉刷
Block.prototype.isColor = function() {
	if(map.wall != null && map.wall.className == "wall") {
	return true; 
	} 
	return false;
}
//开始粉刷
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

var block = new Block(1,1); 
block.createBlock();