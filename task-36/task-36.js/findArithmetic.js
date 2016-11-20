//储存路径数据
var path = [];

//开启列表
var openList = (function() {
	var olist = [],G,H,F;
	return {
		//获取列表的长度
		getLength:function() {
			return olist.length;
		},
		//添加坐标
		add:function(point) {
			olist.push(point);
		},
		//移除第一个坐标
		remove:function(){
			olist.shift();
		},
		//查询列表中最小的F值
		findMin:function() {
			olist.sort(function(a,b){
				return a.F - b.F;
			});
			return olist[0];
		},
		//判断是否在开启列表
		isInlist:function(point) {
			return olist.some(function(item){
				return item.x === point.x && item.y === point.y
			})
		},
		//在开启列表后，
		inPoint:function(currentPoint,point){
			if(point.x === currentPoint.x || point.y === currentPoint.y) {
				G = 10;
			} else {
				G = 14;
			}
			//如果当前坐标到这个坐标的G值小于这个坐标的G值
			//则重新赋值G,F和添加父节点
			if(point.G > currentPoint.G + G) {
				point.G = currentPoint.G + G;
				point.F = point.H + point.G;
				point.parent = currentPoint;
			}

		},
		//不在开启列表中
		noInPoint:function(currentPoint,point,end){
			//如果在关闭列表中,返回
			if(closeList.isInList(point)) {
				return false;
			} 
			//如果坐标大于地图边界,返回
			if(map.isOver(point.x,point.y)){
				return false;
			}
			//如果坐标是墙,返回
			if(map.isWall(point.x,point.y)) {
				return false;
			}
			//斜角G值等于14,相邻等于10
			if(point.x === currentPoint.x || point.y === currentPoint.y) {
				G = 10;
			} else {
				G = 14;
			}
			//如果斜角相邻的两个坐标是墙,返回,防止斜穿墙
			if(G == 14) {
				if(map.isWall(point.x+1,point.y) && map.isWall(point.x,point.y-1) || map.isWall(point.x,point.y+1)) {
				return false;
				} 
				if(map.isWall(point.x-1,point.y) && map.isWall(point.x,point.y-1) || map.isWall(point.x,point.y+1)) {
				return false;
				}
			}
			//给坐标的G,H,F赋值,并设置父节点,加入开启列表
			point.G = G;
			point.H = Math.abs(point.x - end.x)*10 + Math.abs(point.y - end.y)*10;
			point.F = point.G + point.H;
			point.parent = currentPoint;
			olist.push(point);
		},
		//判断目标坐标是否在开启列表中
		foundPoint:function(end) {
			return olist.some(function(item){
				return item.x == end.x && item.y == end.y
			})
		},
		//获取目标的坐标的父节点
		getEnd:function(end) {
			olist.forEach(function(item){
				if(item.x == end.x && item.y == end.y) {
					 end.parent = item.parent;
				}
			})
		},
		//初始化
		init:function() {
			olist = [];
		}
	}
})();

//关闭列表
var closeList = (function() {
	var colist = [];
	return {
		//添加坐标
		add:function(point){
			colist.push(point);
		},
		//判断是否在列表中
		isInList:function(point) {
			return colist.some(function(item){
				return item.x == point.x && item.y == point.y
			})
		},
		//从目标坐标获取父节点的值,也就是所需要的路径
		getPath:function(end) {
			if(end.parent) {
				path.unshift(end.parent);
				this.getPath(end.parent);
			}
		},
		//初始化
		init:function(){
			colist = [];
		}
	}
})();

//寻路算法
function findPath(start,end) {
	var currentPoint;
	init();
	//开始坐标添加进开启列表
	openList.add(start);
	while (!openList.foundPoint(end)) {
		//从开启列表中查询F值最小的坐标为当前坐标
		currentPoint =  openList.findMin();
		//从开始列表是移除F值最小的坐标
		openList.remove();
		//添加进关闭列表,不再做判断
		closeList.add(currentPoint);
		//获取当前坐标周围8个点的坐标,并每个做判断
		getPoint(currentPoint).forEach(function(item){
			//是否在开启列表中
			if(openList.isInlist(item)){
				//在开启列表中执行的函数
				openList.inPoint(currentPoint,item);
			} else {
				//不在开启列表执行的函数
				openList.noInPoint(currentPoint,item,end);
			}
		});
		//如果开启列表的长度为空,则找寻不到目标,退出
		if(!openList.getLength()) {
			alert("无法到达目标点");
			break;
		}
	}
	//获取目标的父节点
	openList.getEnd(end)
	//获取路径
	closeList.getPath(end);
	path.push(end);
}

//获取当前坐标周围的坐标
function getPoint(currentPoint) {
	var cx = currentPoint.x,
		cy = currentPoint.y,
		arr = [
	{x:cx+1,y:cy+1},
	{x:cx+1,y:cy},
	{x:cx+1,y:cy-1},
	{x:cx,y:cy+1},
	{x:cx,y:cy-1},
	{x:cx-1,y:cy+1},
	{x:cx-1,y:cy},
	{x:cx-1,y:cy-1}
	];
	return arr;
}

//初始化
function init() {
	closeList.init();
	openList.init();
	path = [];
}





//用于执行动画的命令
var data = [];

//获取路径的命令
function getPathOrder(){
	var x,y;
	for(var i = path.length -1;i > 0; i--) {
		x = path[i].x - path[i-1].x;
		y = path[i].y - path[i-1].y;
		data.unshift([x,y]);
	}
}
//移动动画
function moveToAnimation() {
	var order = data.shift();
	if(order === undefined) {
		return 
	}
	if(!isStraight(order)) {
		order = changeStraight(order);
	}
	order = changeMoveOrder(order);
	command.second = order;
	command.third = 1;
	command.movWay();
	setTimeout(moveToAnimation,500);
}
//判断命令是否是斜角
function isStraight(order) {
	if(order[0] != 0 && order[1] != 0) {
		return false;
	}
	return true;
}
//分解斜角命令为直线命令
function changeStraight(order) {
	var order_1 = [order[0],0],
		order_2 = [0,order[1]];
	if(map.isWall(block.x+order_1[0],block.y+order_1[1])) {
		order = order_2;
		data.unshift(order_1);
	} else {
		order = order_1;
		data.unshift(order_2);
	}
	return order;
}
//改变成可以执行的命令
function changeMoveOrder(order) {
	switch(order.join(",")){
		case "0,1": order = "BOT";break;
		case "0,-1": order = "TOP";break;
		case "1,0" : order = "RIG";break;
		case "-1,0": order = "LEF";break;
	}	
		return order;
}
